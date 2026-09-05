import { COOKIE_NAME, ONE_YEAR_MS, OAUTH_STATE_COOKIE, decodeOAuthState, encodeOAuthState } from "@shared/const";
import { buildOAuthLoginUrl } from "@shared/oauth";
import { parse as parseCookieHeader } from "cookie";
import type { Express, Request, Response } from "express";
import { randomUUID } from "node:crypto";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { ENV } from "./env";
import { sdk } from "./sdk";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

function externalOrigin(req: Request) {
  const configured = process.env.PUBLIC_API_ORIGIN?.replace(/\/$/, "");
  if (configured) return configured;
  const forwarded = req.headers["x-forwarded-proto"];
  const protocol = typeof forwarded === "string" ? forwarded.split(",")[0] : req.protocol;
  return `${protocol}://${req.get("host")}`;
}

function safeFrontendReturn(raw?: string) {
  if (!raw) return undefined;
  const allowed = [process.env.FRONTEND_ORIGIN, "https://borngifted.github.io/air/"]
    .filter((value): value is string => Boolean(value));
  try {
    const target = new URL(raw);
    return allowed.some(value => {
      const base = new URL(value);
      return target.origin === base.origin && target.pathname.startsWith(base.pathname);
    }) ? target.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/start", (req: Request, res: Response) => {
    const returnTo = safeFrontendReturn(getQueryParam(req, "returnTo"));
    if (!returnTo) {
      res.status(400).json({ error: "valid returnTo is required" });
      return;
    }

    const nonce = randomUUID();
    const redirectUri = `${externalOrigin(req)}/api/oauth/callback`;
    const state = encodeOAuthState({ redirectUri, nonce, returnTo });
    res.cookie(OAUTH_STATE_COOKIE, nonce, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 600_000,
    });

    res.redirect(302, buildOAuthLoginUrl(ENV.oAuthPortalUrl, ENV.appId, redirectUri, state));
  });

  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    const { nonce, returnTo } = decodeOAuthState(state);
    const expectedNonce = parseCookieHeader(req.headers.cookie ?? "")[OAUTH_STATE_COOKIE];
    if (!nonce || nonce !== expectedNonce) {
      res.status(403).json({ error: "invalid oauth state" });
      return;
    }
    res.clearCookie(OAUTH_STATE_COOKIE, { path: "/", secure: true, sameSite: "none" });

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      const frontendReturn = safeFrontendReturn(returnTo);
      if (frontendReturn) {
        const destination = new URL(frontendReturn);
        destination.hash = new URLSearchParams({ air_session: sessionToken }).toString();
        res.redirect(302, destination.toString());
        return;
      }
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
