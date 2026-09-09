# AiR Google Sign-In

## Summary

AiR signs members in with Google directly. The AiR server owns the whole flow: it builds the Google authorization URL, receives the callback, exchanges the code with Google's token endpoint, verifies the returned ID token, and issues its own session. No third-party identity portal, SDK, or proxy participates.

## Flow

1. Every visible member and administrator entry uses the shared **Continue with Google** control, which sends the browser to `GET /api/oauth/start?returnTo=<current page>`.
2. The server checks `returnTo` against the declared origins (`FRONTEND_ORIGIN`, `PUBLIC_API_ORIGIN`, and the GitHub Pages site), mints a one-time nonce, stores it in the `__Host-oauth_state` cookie (`Secure`, `HttpOnly`, `SameSite=None`, ten minutes), and redirects to `https://accounts.google.com/o/oauth2/v2/auth` with `client_id`, `redirect_uri`, `response_type=code`, `scope=openid email profile`, the signed `state`, and the same `nonce`.
3. Google returns the browser to `GET /api/oauth/callback?code=…&state=…`. A missing state returns 400; a state whose nonce does not match the cookie returns 403.
4. The server exchanges the code at `https://oauth2.googleapis.com/token` using the client secret and the exact redirect URI carried in `state`.
5. The ID token is verified against Google's JWKS (`https://www.googleapis.com/oauth2/v3/certs`): signature, issuer (`https://accounts.google.com` or `accounts.google.com`), audience (the AiR client ID), nonce, non-empty `sub`, and `email_verified = true`. An unverified email is refused with a clear message.
6. The AiR identity key is `google:<sub>`. If another row already holds the same normalized email under a different `openId`, sign-in is refused with the identity-conflict message; accounts are never merged by email automatically.
7. The member row is upserted with name, email, `loginMethod = "google"`, and last sign-in time. The configured owner (`OWNER_OPEN_ID` or `OWNER_EMAIL`) is promoted to `admin`; nobody else is.
8. The server signs an AiR session JWT (HS256, `JWT_SECRET`, issuer `air`, one year) carrying only `openId` and `name`. Same-origin deployments receive it as an `HttpOnly` cookie. The cross-origin GitHub Pages frontend receives it in the URL fragment, stores it in `sessionStorage` under `air_session`, removes it from the address bar, and forwards it as a Bearer token.

## Outcomes shown to members

| Code | Message |
|---|---|
| `email_unverified` | Your Google email must be verified before you can join AiR. |
| `identity_conflict` | That email is already connected to another AiR sign-in. Ask an AiR administrator for help. |
| `sign_in_cancelled` | Sign-in did not finish. Choose Continue with Google to try again. |
| `sign_in_failed` | Sign-in did not work this time. Try again in a moment. |

## Automated coverage

`server/google-auth.test.ts` covers the authorization URL, claim validation (issuer, audience, nonce, subject, verified email), the token exchange request and its failure path, and AiR session signing and rejection. `server/github-pages.test.ts` covers return-URL allowlisting, CORS origin derivation, OAuth state round-tripping, conflict handling, and every member-facing message. `server/auth.logout.test.ts` covers cookie clearing.

## Manual verification

Open the site, choose **Continue with Google**, and confirm the browser lands on `accounts.google.com` with the AiR client ID and your server's callback in the URL. Do not enter credentials during a smoke test. After a real sign-in, confirm `/dashboard` loads, the `users` row has `loginMethod = google` and an `openId` beginning with `google:`, and that the owner row has `role = admin`.
