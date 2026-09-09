import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { ForbiddenError } from "@shared/_core/errors";
import { parse as parseCookieHeader } from "cookie";
import type { Request } from "express";
import { SignJWT, jwtVerify } from "jose";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { ENV } from "./env";

/**
 * AiR issues and verifies its own session tokens. A session is a signed JWT
 * (HS256, JWT_SECRET) that carries only the member's openId and display name.
 */

export const SESSION_ISSUER = "air";
const MIN_SECRET_LENGTH = 32;

export type SessionPayload = {
  openId: string;
  name: string;
};

function getSessionSecret() {
  const secret = ENV.cookieSecret;
  if (secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`JWT_SECRET must be at least ${MIN_SECRET_LENGTH} characters long`);
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(
  payload: SessionPayload,
  options: { expiresInMs?: number } = {},
): Promise<string> {
  const issuedAt = Date.now();
  const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
  const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1000);

  return new SignJWT({ openId: payload.openId, name: payload.name })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(SESSION_ISSUER)
    .setIssuedAt(Math.floor(issuedAt / 1000))
    .setExpirationTime(expirationSeconds)
    .sign(getSessionSecret());
}

export async function verifySession(
  token: string | undefined | null,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), {
      algorithms: ["HS256"],
      issuer: SESSION_ISSUER,
    });
    const openId = payload.openId;
    if (typeof openId !== "string" || openId.length === 0) return null;
    const name = typeof payload.name === "string" ? payload.name : "";
    return { openId, name };
  } catch (error) {
    console.warn("[Auth] Session verification failed", String(error));
    return null;
  }
}

export function readSessionToken(req: Request): string | undefined {
  // 1. Prefer the session cookie (same-site full-stack deployments).
  const cookies = parseCookieHeader(req.headers.cookie ?? "");
  const fromCookie = cookies[COOKIE_NAME];
  if (fromCookie) return fromCookie;

  // 2. Fall back to a Bearer token. The GitHub Pages frontend lives on another
  //    origin, so it keeps the session in sessionStorage and forwards it here.
  const authHeader = req.headers.authorization;
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return undefined;
}

export async function authenticateRequest(req: Request): Promise<User> {
  const session = await verifySession(readSessionToken(req));
  if (!session) throw ForbiddenError("Invalid session");

  const user = await db.getUserByOpenId(session.openId);
  if (!user) throw ForbiddenError("User not found");

  await db.upsertUser({ openId: user.openId, lastSignedIn: new Date() });
  return user;
}
