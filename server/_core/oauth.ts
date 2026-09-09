import { COOKIE_NAME, ONE_YEAR_MS, OAUTH_STATE_COOKIE, decodeOAuthState, encodeOAuthState } from "@shared/const";
import { hasConflictingIdentity, type AuthReturnError } from "@shared/auth";
import { parse as parseCookieHeader } from "cookie";
import type { Express, Request, Response } from "express";
import { randomUUID } from "node:crypto";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { ENV } from "./env";
import {
  GoogleClaimsValidationError,
  buildGoogleAuthUrl,
  exchangeGoogleCode,
  verifyGoogleIdToken,
} from "./googleAuth";
import { resolveAllowedReturns, safeReturnUrl } from "./returnUrl";
import { signSession } from "./session";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

function externalOrigin(req: Request) {
  if (ENV.publicApiOrigin) return ENV.publicApiOrigin;
  const forwarded = req.headers["x-forwarded-proto"];
  const protocol = typeof forwarded === "string" ? forwarded.split(",")[0] : req.protocol;
  return `${protocol}://${req.get("host")}`;
}

function safeFrontendReturn(raw?: string) {
  return safeReturnUrl(raw, resolveAllowedReturns({
    frontendOrigin: ENV.frontendOrigin,
    publicApiOrigin: ENV.publicApiOrigin,
  }));
}

function returnAuthError(res: Response, returnTo: string | undefined, code: AuthReturnError) {
  const frontendReturn = safeFrontendReturn(returnTo);
  if (!frontendReturn) {
    res.status(code === "identity_conflict" ? 409 : 403).json({ error: code });
    return;
  }
  const destination = new URL(frontendReturn);
  destination.hash = new URLSearchParams({ air_auth_error: code }).toString();
  res.redirect(302, destination.toString());
}

function isSameOrigin(req: Request, target: string) {
  try {
    return new URL(target).origin === externalOrigin(req);
  } catch {
    return false;
  }
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/start", (req: Request, res: Response) => {
    const returnTo = safeFrontendReturn(getQueryParam(req, "returnTo"));
    if (!returnTo) {
      res.status(400).json({ error: "valid returnTo is required" });
      return;
    }
    if (!ENV.googleClientId || !ENV.googleClientSecret) {
      res.status(503).json({ error: "Google sign-in is not configured (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)" });
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

    res.redirect(302, buildGoogleAuthUrl({
      clientId: ENV.googleClientId,
      redirectUri,
      state,
      nonce,
    }));
  });

  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    const providerError = getQueryParam(req, "error");

    if (!state) {
      res.status(400).json({ error: "state is required" });
      return;
    }

    const { nonce, returnTo, redirectUri } = decodeOAuthState(state);
    const expectedNonce = parseCookieHeader(req.headers.cookie ?? "")[OAUTH_STATE_COOKIE];
    if (!nonce || nonce !== expectedNonce) {
      res.status(403).json({ error: "invalid oauth state" });
      return;
    }
    res.clearCookie(OAUTH_STATE_COOKIE, { path: "/", secure: true, sameSite: "none" });

    if (providerError || !code) {
      // The member closed or cancelled the Google screen.
      returnAuthError(res, returnTo, "sign_in_cancelled");
      return;
    }

    try {
      const { idToken } = await exchangeGoogleCode({
        code,
        redirectUri,
        clientId: ENV.googleClientId,
        clientSecret: ENV.googleClientSecret,
      });

      let identity;
      try {
        identity = await verifyGoogleIdToken(idToken, { clientId: ENV.googleClientId, nonce });
      } catch (error) {
        if (error instanceof GoogleClaimsValidationError && error.code === "email_unverified") {
          returnAuthError(res, returnTo, "email_unverified");
          return;
        }
        throw error;
      }

      const matchingEmailUsers = await db.getUsersByNormalizedEmail(identity.email);
      if (hasConflictingIdentity(matchingEmailUsers, identity.openId)) {
        returnAuthError(res, returnTo, "identity_conflict");
        return;
      }

      await db.upsertUser({
        openId: identity.openId,
        name: identity.name,
        email: identity.email,
        loginMethod: "google",
        lastSignedIn: new Date(),
      });

      const sessionToken = await signSession(
        { openId: identity.openId, name: identity.name ?? "" },
        { expiresInMs: ONE_YEAR_MS },
      );

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      const frontendReturn = safeFrontendReturn(returnTo);
      if (frontendReturn) {
        const destination = new URL(frontendReturn);
        if (!isSameOrigin(req, frontendReturn)) {
          // Cross-origin frontend (GitHub Pages): hand the session over in the
          // URL fragment, which never reaches any server log.
          destination.hash = new URLSearchParams({ air_session: sessionToken }).toString();
        }
        res.redirect(302, destination.toString());
        return;
      }
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      returnAuthError(res, returnTo, "sign_in_failed");
    }
  });
}
