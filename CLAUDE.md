# AiR Claude Code Instructions

AiR is a free, mindset-first AI learning and community platform for learners beginning at age eight. The product teaches four durable human moves—**Clear, Direct, Judge, and Make**—through courses, interactive lessons, a member community, a camera studio, and facilitator presentation tools.

AiR is fully self-hosted. It depends only on open, replaceable services: Google for sign-in, any MySQL 8 compatible database, any S3-compatible bucket, and any Node.js host. There is no third-party platform SDK, identity portal, or proxy in the stack.

## Non-negotiable product rules

1. Keep language understandable to an eight-year-old without making the brand childish. Use short sentences, concrete verbs, visible states, and one clear next action.
2. Do not add an audio player, podcast, radio experience, or MP3 content. AiR is video-led and action-led.
3. Preserve the dark-first theme, optional light theme, high contrast, and the AiR logo’s background-matched negative spaces in the lowercase **i** and inner **A/R** geometry.
4. Keep the African American male hero and lesson-video subject in the current media assignments.
5. Keep Google-only member entry. The server talks to Google's OAuth 2.0 / OpenID Connect endpoints directly and accepts only verified Google identities. `openId` (`google:<Google account id>`) remains the authoritative identity key; never merge accounts automatically by email.
6. Keep administrator authorization server-side. A Google account is not an administrator unless its persisted AiR user role is `admin`. The only automatic promotion is the configured owner (`OWNER_OPEN_ID` or `OWNER_EMAIL`).
7. Keep camera and hand tracking local to the browser. Do not upload camera frames without a new, explicit user-controlled feature and consent flow.
8. Do not fabricate testimonials, reviews, ratings, learner activity, or community posts.
9. Preserve the public static curriculum fallback when the production API is unavailable.
10. Store user-uploaded file bytes in S3-compatible storage, not in the database or local deployment filesystem.
11. Do not reintroduce any vendor-specific runtime, SDK, or hosted proxy. New integrations must be plain HTTP or a standard, self-configurable SDK.

## Primary commands

```bash
pnpm install --frozen-lockfile
pnpm check          # TypeScript
pnpm test           # Vitest (36 tests)
pnpm build          # full-stack server + client into dist/
pnpm build:pages    # static GitHub Pages client into dist/public
pnpm pages:publish  # copy the Pages build to the repository root
pnpm dev
```

## Architecture map

| Area | Location |
|---|---|
| React routes and UI | `client/src/` |
| Global design system | `client/src/index.css` |
| Runtime config for the static site | `client/public/air-config.js` → `window.AIR_CONFIG.apiOrigin` |
| Google sign-in (server) | `server/_core/googleAuth.ts`, `server/_core/oauth.ts` |
| Sessions | `server/_core/session.ts` |
| Allowed return / CORS origins | `server/_core/returnUrl.ts` |
| Environment | `server/_core/env.ts` |
| tRPC application router | `server/routers.ts` and `server/routers/` |
| Database access | `server/db.ts`, `server/communityDb.ts` |
| Uploaded media (S3) | `server/storage.ts` |
| Curriculum seed content | `server/content.ts` |
| Database schema and migrations | `drizzle/` |
| Shared auth helpers | `shared/auth.ts`, `shared/const.ts` |
| Public GitHub Pages fallback | `client/src/lib/staticCatalog.ts` |
| Media registry | `client/src/lib/assets.ts` (served from `/media/`) |
| Source media files | `media/` (repository root) |
| Build packaging | `scripts/copy-media.mjs`, `scripts/publish-pages.mjs` |
| Container image | `Dockerfile` |

## Deployment boundaries

GitHub Pages hosts the public React frontend at `https://aireadiness.me/` (custom domain via the root `CNAME` file; `borngifted.github.io/air/` forwards there) from the repository root on `main`. The Node/tRPC backend is deployed separately by the AiR team on any Node host; its HTTPS origin goes into the root `air-config.js` (no rebuild needed) or `VITE_API_ORIGIN` at build time. Authentication, database operations, uploads, community mutations, progress, trainer resources, and administrator functions require the backend.

Read `docs/independent-hosting.md` before changing deployment, authentication, assets, or database behavior.
