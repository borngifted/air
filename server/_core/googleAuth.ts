import { createRemoteJWKSet, decodeJwt, jwtVerify, type JWTPayload } from "jose";

/**
 * Direct Google sign-in. AiR talks to Google's OAuth 2.0 / OpenID Connect
 * endpoints itself; no third-party identity portal sits in between.
 *
 * Flow: /api/oauth/start builds the Google authorization URL with a one-time
 * nonce -> Google sends the browser back to /api/oauth/callback with a code ->
 * the server exchanges the code for an ID token -> the ID token signature,
 * issuer, audience, nonce, and verified email are all checked before a member
 * record is created or updated.
 */

export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";
export const GOOGLE_ISSUERS = ["https://accounts.google.com", "accounts.google.com"] as const;
export const GOOGLE_SCOPES = "openid email profile";

/** Prefix that marks a member identity as a Google account id. */
export const GOOGLE_OPEN_ID_PREFIX = "google:";

export type GoogleIdentity = {
  /** Stable AiR identity key derived from the Google account id (`sub`). */
  openId: string;
  /** Google's stable account id. */
  sub: string;
  email: string;
  name: string | null;
  picture: string | null;
};

export type GoogleClaimsError =
  | "invalid_issuer"
  | "invalid_audience"
  | "invalid_nonce"
  | "missing_subject"
  | "email_unverified";

export class GoogleClaimsValidationError extends Error {
  constructor(public readonly code: GoogleClaimsError) {
    super(`Google ID token rejected: ${code}`);
  }
}

export function buildGoogleAuthUrl(input: {
  clientId: string;
  redirectUri: string;
  state: string;
  nonce: string;
}) {
  const url = new URL(GOOGLE_AUTH_URL);
  url.searchParams.set("client_id", input.clientId);
  url.searchParams.set("redirect_uri", input.redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", GOOGLE_SCOPES);
  url.searchParams.set("state", input.state);
  url.searchParams.set("nonce", input.nonce);
  url.searchParams.set("prompt", "select_account");
  return url.toString();
}

export function toAirOpenId(sub: string) {
  return `${GOOGLE_OPEN_ID_PREFIX}${sub}`;
}

/**
 * Pure claim checks that run after the signature has been verified. Kept
 * separate so they can be unit-tested without network access.
 */
export function assertGoogleClaims(
  payload: JWTPayload & { email?: unknown; email_verified?: unknown; nonce?: unknown; name?: unknown; picture?: unknown },
  expected: { clientId: string; nonce: string },
): GoogleIdentity {
  if (!payload.iss || !(GOOGLE_ISSUERS as readonly string[]).includes(payload.iss)) {
    throw new GoogleClaimsValidationError("invalid_issuer");
  }
  const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!audiences.includes(expected.clientId)) {
    throw new GoogleClaimsValidationError("invalid_audience");
  }
  if (typeof payload.nonce !== "string" || payload.nonce !== expected.nonce) {
    throw new GoogleClaimsValidationError("invalid_nonce");
  }
  if (typeof payload.sub !== "string" || payload.sub.length === 0) {
    throw new GoogleClaimsValidationError("missing_subject");
  }
  const emailVerified = payload.email_verified === true || payload.email_verified === "true";
  if (typeof payload.email !== "string" || payload.email.length === 0 || !emailVerified) {
    throw new GoogleClaimsValidationError("email_unverified");
  }
  return {
    openId: toAirOpenId(payload.sub),
    sub: payload.sub,
    email: payload.email,
    name: typeof payload.name === "string" && payload.name.length > 0 ? payload.name : null,
    picture: typeof payload.picture === "string" ? payload.picture : null,
  };
}

type TokenResponse = { id_token?: string; access_token?: string; error?: string; error_description?: string };

export async function exchangeGoogleCode(input: {
  code: string;
  redirectUri: string;
  clientId: string;
  clientSecret: string;
  fetchImpl?: typeof fetch;
}): Promise<{ idToken: string }> {
  const fetchImpl = input.fetchImpl ?? fetch;
  const body = new URLSearchParams({
    code: input.code,
    client_id: input.clientId,
    client_secret: input.clientSecret,
    redirect_uri: input.redirectUri,
    grant_type: "authorization_code",
  });
  const response = await fetchImpl(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = (await response.json().catch(() => ({}))) as TokenResponse;
  if (!response.ok || !data.id_token) {
    throw new Error(`Google token exchange failed (${response.status}): ${data.error ?? "unknown"} ${data.error_description ?? ""}`.trim());
  }
  return { idToken: data.id_token };
}

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;
function getGoogleJwks() {
  if (!jwks) jwks = createRemoteJWKSet(new URL(GOOGLE_JWKS_URL));
  return jwks;
}

export async function verifyGoogleIdToken(
  idToken: string,
  expected: { clientId: string; nonce: string },
): Promise<GoogleIdentity> {
  const { payload } = await jwtVerify(idToken, getGoogleJwks(), {
    issuer: [...GOOGLE_ISSUERS],
    audience: expected.clientId,
  });
  return assertGoogleClaims(payload, expected);
}

/** Debug helper for logs: never trust this without verifyGoogleIdToken. */
export function peekGoogleIdToken(idToken: string) {
  try {
    return decodeJwt(idToken);
  } catch {
    return null;
  }
}
