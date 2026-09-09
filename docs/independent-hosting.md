# Hosting AiR independently

AiR runs anywhere Node.js runs. This guide lists every external service the platform needs, how to configure each one, and how to publish both halves of the product: the static public site on GitHub Pages and the full-stack server that powers member features.

## 1. What AiR depends on

| Need | Any of these work | Configured with |
|---|---|---|
| Member sign-in | Google Cloud OAuth client (free) | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` |
| Database | MySQL 8, MariaDB 10.6+, PlanetScale, TiDB Cloud, Railway MySQL, Aiven | `DATABASE_URL` |
| Uploaded course video | AWS S3, Cloudflare R2, Backblaze B2, DigitalOcean Spaces, MinIO | `S3_*` |
| Server hosting | Render, Railway, Fly.io, a VPS with Docker, Cloud Run | `Dockerfile` or `pnpm start` |
| Public site hosting | GitHub Pages (already enabled for `borngifted/air`, source `main /`) | `air-config.js` |

Nothing else is required. Analytics is optional.

## 2. Create the Google OAuth client

1. Open [Google Cloud Console](https://console.cloud.google.com/) and create (or pick) a project, for example `AiR Platform`.
2. **APIs & Services → OAuth consent screen.** Choose *External*, name the app **AiR**, add your support email, and add the scopes `openid`, `email`, `profile`. Publish the app when you are ready for anyone with a Google account to join.
3. **APIs & Services → Credentials → Create credentials → OAuth client ID.** Application type *Web application*.
4. Under **Authorized redirect URIs** add your server callback, exactly:
   `https://YOUR-API-HOST/api/oauth/callback`
   Add `http://localhost:3000/api/oauth/callback` as well for local development.
5. Copy the **Client ID** into `GOOGLE_CLIENT_ID` and the **Client secret** into `GOOGLE_CLIENT_SECRET`.

AiR verifies every Google ID token itself: signature against Google's published keys, issuer, audience (your client ID), the one-time nonce, and `email_verified`. No other identity provider is contacted.

## 3. Create the database

Create an empty MySQL-compatible database and put its connection string in `DATABASE_URL`:

```
mysql://USER:PASSWORD@HOST:3306/air?ssl={"rejectUnauthorized":true}
```

Apply the migrations in order (they live in `drizzle/0000_*.sql` … `drizzle/0003_*.sql`):

```bash
DATABASE_URL='mysql://…' pnpm db:migrate
```

Curriculum content is seeded automatically the first time the server reads the catalog.

## 4. Create the storage bucket

Create a private bucket and an access key with read/write permission on it.

| Provider | `S3_ENDPOINT` | `S3_REGION` | `S3_FORCE_PATH_STYLE` |
|---|---|---|---|
| AWS S3 | leave empty | the bucket region, e.g. `us-east-1` | `false` |
| Cloudflare R2 | `https://<account-id>.r2.cloudflarestorage.com` | `auto` | `false` |
| Backblaze B2 | `https://s3.<region>.backblazeb2.com` | the region | `false` |
| MinIO / self-hosted | your MinIO URL | `us-east-1` | `true` |

The database stores only object keys. Playback links are signed per request (15 minutes) by the protected `media.playback` procedure, so the bucket can stay private.

## 5. Choose the owner account

The first administrator is bootstrapped from configuration; every later administrator is promoted by updating the `role` column server-side.

- `OWNER_EMAIL=you@example.com` — the verified Google email that should be an administrator, **or**
- `OWNER_OPEN_ID=google:1234567890` — the Google account id (visible in the `users` table after the first sign-in).

## 6. Full environment

Copy `docs/environment.template.txt` to `.env` locally, or set the same names in your host's dashboard.

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | MySQL connection string |
| `JWT_SECRET` | yes | 32+ random characters; signs AiR sessions. `openssl rand -base64 48` |
| `GOOGLE_CLIENT_ID` | yes | OAuth client ID from step 2 |
| `GOOGLE_CLIENT_SECRET` | yes | OAuth client secret from step 2 |
| `PUBLIC_API_ORIGIN` | yes in production | Exact HTTPS origin of this server, e.g. `https://api.air.example.org` |
| `FRONTEND_ORIGIN` | yes in production | Where members are returned after sign-in, e.g. `https://borngifted.github.io/air/` |
| `OWNER_EMAIL` or `OWNER_OPEN_ID` | recommended | First administrator |
| `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | for uploads | Bucket credentials |
| `S3_ENDPOINT`, `S3_REGION`, `S3_FORCE_PATH_STYLE` | provider-specific | See step 4 |
| `PORT` | optional | Defaults to 3000 |
| `VITE_API_ORIGIN` | build-time, optional | Bakes the API origin into the static build; `air-config.js` can override it later |
| `VITE_ANALYTICS_ENDPOINT`, `VITE_ANALYTICS_WEBSITE_ID` | optional | Umami-compatible analytics |

The server allows cross-origin requests and sign-in returns only from `FRONTEND_ORIGIN`, `PUBLIC_API_ORIGIN`, and the GitHub Pages site.

## 7. Deploy the server

### With Docker (any host)

```bash
docker build -t air-platform .
docker run -p 3000:3000 --env-file .env air-platform
```

The image runs `node dist/index.js`, which serves the built client and the API from one process. Run `pnpm db:migrate` once against the production database before the first start (or add it as a release command).

### Without Docker

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

Render, Railway, and Fly.io all detect the `Dockerfile` automatically. Point a custom domain at the service and use that HTTPS origin as `PUBLIC_API_ORIGIN` and in the Google redirect URI.

## 8. Connect the public site

The GitHub Pages site reads one file at runtime: `air-config.js` at the repository root.

```js
window.AIR_CONFIG = { apiOrigin: "https://api.air.example.org" };
```

Edit that one line, commit, and push to `main`. No rebuild is needed; sign-in, saved progress, community, uploads, and admin tools switch on as soon as Pages redeploys. Leave the value empty to run the public learning site on its own.

To ship code changes to the public site:

```bash
pnpm build:pages      # builds with the /air/ base path and copies media/
pnpm pages:publish    # copies dist/public to the repository root, keeping your air-config.js
git add -A && git commit -m "Publish AiR site" && git push origin main
```

## 9. Moving existing members

Member identity is `users.openId`. Accounts created through the previous hosted identity provider have a different `openId` format from direct Google sign-in (`google:<Google account id>`). AiR never merges accounts by email on its own, so a returning member whose old row still exists would be shown the identity-conflict message.

Re-key those rows deliberately, one at a time, after confirming the person owns the Google account:

```sql
-- Find the Google account id from the new sign-in attempt in the server log, or
-- ask the member to sign in once on a fresh database and read users.openId.
UPDATE users SET openId = 'google:1234567890', loginMethod = 'google'
WHERE email = 'member@example.com' AND openId <> 'google:1234567890';
```

Progress, posts, comments, and roles follow the row, so nothing else needs to change. If you start from an empty database instead, members simply sign in again and the owner is promoted automatically by `OWNER_EMAIL`.

## 10. Verification checklist

Before shipping any change run `pnpm check`, `pnpm test`, `pnpm build`, and `pnpm build:pages`. Then recheck: unauthenticated public routes, a protected member route, the administrator route, dark and light themes, mobile navigation, logo negative spaces, hero identity, camera permission denial, hand-tracking fallback, and the Google sign-in screen without submitting credentials.
