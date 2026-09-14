import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import type { Server } from "node:http";
import { ENV } from "./_core/env";
import { COOKIE_NAME, decodeOAuthState, encodeOAuthState } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
vi.mock("./db", () => ({
  getUsersByNormalizedEmail: vi.fn(async () => []),
  upsertUser: vi.fn(async () => undefined),
  getUserByOpenId: vi.fn(async () => ({ id: 1 })),
}));
vi.mock("./_core/googleAuth", async importOriginal => ({
  ...(await importOriginal<typeof import("./_core/googleAuth")>()),
  exchangeGoogleCode: vi.fn(async () => ({ idToken: "verified-in-test" })),
  verifyGoogleIdToken: vi.fn(async () => ({
    openId: "google:42",
    name: "Maker",
    email: "maker@example.com",
  })),
}));
import { registerOAuthRoutes } from "./_core/oauth";
import * as db from "./db";
import { exchangeGoogleCode } from "./_core/googleAuth";
let server: Server;
let origin: string;
const original = { ...ENV };
beforeEach(async () => {
  vi.clearAllMocks();
  vi.mocked(db.getUserByOpenId).mockResolvedValue({ id: 1 } as never);
  const app = express();
  registerOAuthRoutes(app);
  server = await new Promise<Server>(resolve => {
    const s = app.listen(0, "127.0.0.1", () => resolve(s));
  });
  origin = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  Object.assign(ENV, {
    googleClientId: "test.apps.googleusercontent.com",
    googleClientSecret: "test-secret",
    cookieSecret: "test-session-secret-with-more-than-32-characters",
    databaseUrl: "mysql://test",
    frontendOrigin: origin,
    publicApiOrigin: origin,
  });
});
afterEach(async () => {
  Object.assign(ENV, original);
  await new Promise<void>((resolve, reject) =>
    server.close(e => (e ? reject(e) : resolve()))
  );
});
async function start() {
  const response = await fetch(
    `${origin}/api/oauth/start?returnTo=${encodeURIComponent(origin + "/dashboard")}`,
    { redirect: "manual" }
  );
  return {
    response,
    state: new URL(response.headers.get("location")!).searchParams.get(
      "state"
    )!,
    cookie: response.headers.get("set-cookie")!.split(";")[0],
  };
}
const callback = (state: string, cookie: string, extra = "code=test-code") =>
  fetch(
    `${origin}/api/oauth/callback?state=${encodeURIComponent(state)}&${extra}`,
    { redirect: "manual", headers: { cookie } }
  );
describe("Google OAuth HTTP flow", () => {
  it("uses a local-compatible state cookie and returns a persisted member to the dashboard", async () => {
    const { response, state, cookie } = await start();
    expect(response.status).toBe(302);
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
    expect(response.headers.get("set-cookie")).toContain("SameSite=Lax");
    expect(response.headers.get("set-cookie")).not.toContain("Secure");
    const result = await callback(state, cookie);
    expect(result.headers.get("location")).toBe(origin + "/dashboard");
    expect(result.headers.get("set-cookie")).toContain(COOKIE_NAME);
    expect(db.upsertUser).toHaveBeenCalledWith(
      expect.objectContaining({ openId: "google:42", loginMethod: "google" })
    );
  });
  it("rejects missing, malformed and tampered browser state before exchanging a code", async () => {
    const { state, cookie } = await start();
    for (const [value, sentCookie] of [
      [state, ""],
      ["not-base64", cookie],
      [
        encodeOAuthState({
          ...decodeOAuthState(state),
          returnTo: origin + "/projects",
        }),
        cookie,
      ],
      [
        encodeOAuthState({
          ...decodeOAuthState(state),
          redirectUri: "https://evil.example/callback",
        }),
        cookie,
      ],
    ])
      expect((await callback(value, sentCookie)).status).toBe(403);
    expect(exchangeGoogleCode).not.toHaveBeenCalled();
  });
  it("returns a cancellation message without creating a session", async () => {
    const { state, cookie } = await start();
    const result = await callback(state, cookie, "error=access_denied");
    expect(result.headers.get("location")).toContain(
      "air_auth_error=sign_in_cancelled"
    );
    expect(db.upsertUser).not.toHaveBeenCalled();
  });
  it("does not issue a session if persistence failed", async () => {
    const { state, cookie } = await start();
    vi.mocked(db.getUserByOpenId).mockResolvedValue(undefined);
    const result = await callback(state, cookie);
    expect(result.headers.get("location")).toContain(
      "air_auth_error=sign_in_failed"
    );
    expect(result.headers.get("set-cookie")).not.toContain(COOKIE_NAME);
  });
  it("reports incomplete setup before sending users to Google", async () => {
    ENV.databaseUrl = "";
    expect(
      (
        await fetch(
          `${origin}/api/oauth/start?returnTo=${encodeURIComponent(origin + "/dashboard")}`
        )
      ).status
    ).toBe(503);
  });
  it("keeps secure cross-origin sessions and valid HTTP development cookies", () => {
    expect(
      getSessionCookieOptions({ protocol: "https", headers: {} } as never)
    ).toMatchObject({ secure: true, sameSite: "none", httpOnly: true });
    expect(
      getSessionCookieOptions({ protocol: "http", headers: {} } as never)
    ).toMatchObject({ secure: false, sameSite: "lax", httpOnly: true });
  });
});
