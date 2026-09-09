import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SignJWT } from "jose";
import {
  GOOGLE_AUTH_URL,
  GOOGLE_TOKEN_URL,
  GoogleClaimsValidationError,
  assertGoogleClaims,
  buildGoogleAuthUrl,
  exchangeGoogleCode,
  toAirOpenId,
} from "./_core/googleAuth";
import { signSession, verifySession } from "./_core/session";
import { ENV } from "./_core/env";

const CLIENT_ID = "1234.apps.googleusercontent.com";
const NONCE = "one-time-nonce";

function claims(overrides: Record<string, unknown> = {}) {
  return {
    iss: "https://accounts.google.com",
    aud: CLIENT_ID,
    sub: "108123456789012345678",
    nonce: NONCE,
    email: "member@example.com",
    email_verified: true,
    name: "AiR Member",
    picture: "https://lh3.googleusercontent.com/a/photo",
    ...overrides,
  };
}

describe("direct Google sign-in", () => {
  it("builds the Google authorization URL with the AiR callback, state and nonce", () => {
    const url = new URL(buildGoogleAuthUrl({
      clientId: CLIENT_ID,
      redirectUri: "https://api.example.org/api/oauth/callback",
      state: "signed-state",
      nonce: NONCE,
    }));
    expect(`${url.origin}${url.pathname}`).toBe(GOOGLE_AUTH_URL);
    expect(url.searchParams.get("client_id")).toBe(CLIENT_ID);
    expect(url.searchParams.get("redirect_uri")).toBe("https://api.example.org/api/oauth/callback");
    expect(url.searchParams.get("response_type")).toBe("code");
    expect(url.searchParams.get("scope")).toBe("openid email profile");
    expect(url.searchParams.get("state")).toBe("signed-state");
    expect(url.searchParams.get("nonce")).toBe(NONCE);
    expect(url.hostname.endsWith("google.com")).toBe(true);
  });

  it("accepts a verified Google identity and derives a stable AiR openId", () => {
    const identity = assertGoogleClaims(claims(), { clientId: CLIENT_ID, nonce: NONCE });
    expect(identity.openId).toBe("google:108123456789012345678");
    expect(identity.email).toBe("member@example.com");
    expect(identity.name).toBe("AiR Member");
    expect(toAirOpenId("42")).toBe("google:42");
  });

  it("accepts both Google issuer spellings", () => {
    expect(() => assertGoogleClaims(claims({ iss: "accounts.google.com" }), { clientId: CLIENT_ID, nonce: NONCE })).not.toThrow();
  });

  it("rejects tokens for another app, another issuer, or another browser", () => {
    const expected = { clientId: CLIENT_ID, nonce: NONCE };
    expect(() => assertGoogleClaims(claims({ aud: "other-app" }), expected))
      .toThrow(GoogleClaimsValidationError);
    expect(() => assertGoogleClaims(claims({ iss: "https://evil.example.com" }), expected))
      .toThrow(GoogleClaimsValidationError);
    expect(() => assertGoogleClaims(claims({ nonce: "replayed" }), expected))
      .toThrow(GoogleClaimsValidationError);
    expect(() => assertGoogleClaims(claims({ sub: "" }), expected))
      .toThrow(GoogleClaimsValidationError);
  });

  it("requires a verified Google email", () => {
    const expected = { clientId: CLIENT_ID, nonce: NONCE };
    try {
      assertGoogleClaims(claims({ email_verified: false }), expected);
      throw new Error("expected rejection");
    } catch (error) {
      expect(error).toBeInstanceOf(GoogleClaimsValidationError);
      expect((error as GoogleClaimsValidationError).code).toBe("email_unverified");
    }
    expect(() => assertGoogleClaims(claims({ email: undefined }), expected)).toThrow(GoogleClaimsValidationError);
  });

  it("exchanges the authorization code at Google's token endpoint", async () => {
    let captured: { url: string; body: URLSearchParams } | null = null;
    const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
      captured = { url: String(input), body: new URLSearchParams(String(init?.body)) };
      return new Response(JSON.stringify({ id_token: "header.payload.signature" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;

    const result = await exchangeGoogleCode({
      code: "auth-code",
      redirectUri: "https://api.example.org/api/oauth/callback",
      clientId: CLIENT_ID,
      clientSecret: "secret",
      fetchImpl,
    });

    expect(result.idToken).toBe("header.payload.signature");
    expect(captured!.url).toBe(GOOGLE_TOKEN_URL);
    expect(captured!.body.get("grant_type")).toBe("authorization_code");
    expect(captured!.body.get("code")).toBe("auth-code");
    expect(captured!.body.get("redirect_uri")).toBe("https://api.example.org/api/oauth/callback");
  });

  it("surfaces a failed token exchange instead of signing anyone in", async () => {
    const fetchImpl = (async () => new Response(JSON.stringify({ error: "invalid_grant" }), { status: 400 })) as typeof fetch;
    await expect(exchangeGoogleCode({
      code: "bad",
      redirectUri: "https://api.example.org/api/oauth/callback",
      clientId: CLIENT_ID,
      clientSecret: "secret",
      fetchImpl,
    })).rejects.toThrow(/invalid_grant/);
  });
});

describe("AiR session tokens", () => {
  const previousSecret = ENV.cookieSecret;

  beforeEach(() => {
    ENV.cookieSecret = "test-secret-that-is-long-enough-for-hs256-signing";
  });

  afterEach(() => {
    ENV.cookieSecret = previousSecret;
  });

  it("signs and verifies a session that carries only openId and name", async () => {
    const token = await signSession({ openId: "google:42", name: "AiR Member" });
    await expect(verifySession(token)).resolves.toEqual({ openId: "google:42", name: "AiR Member" });
  });

  it("rejects tokens signed with another secret or another issuer", async () => {
    const forged = await new SignJWT({ openId: "google:42", name: "x" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer("air")
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode("a-different-secret-that-is-also-long-enough"));
    await expect(verifySession(forged)).resolves.toBeNull();

    const wrongIssuer = await new SignJWT({ openId: "google:42", name: "x" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer("someone-else")
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(ENV.cookieSecret));
    await expect(verifySession(wrongIssuer)).resolves.toBeNull();
    await expect(verifySession(undefined)).resolves.toBeNull();
  });
});
