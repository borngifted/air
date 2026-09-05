# AiR — AI Readiness

AiR is a free, mindset-first AI learning and community platform designed for learners beginning at age eight while preserving meaningful depth for adults, educators, creators, and teams.

> **Clear the noise. Give useful direction. Challenge the result. Put the work in the world.**

## What is included

| Area | Implementation |
|---|---|
| Public experience | Responsive landing page, brand story, curriculum catalog, and path detail pages |
| Brand and themes | Official-logo-first header and hero treatment, persistent accessible light/dark modes, and three Higgsfield campaign placements |
| Curriculum | Four learning paths, four modules, twelve lessons, sixty interactive checkpoints, and thirty-six mode-specific exercises |
| Lesson experience | Protected video lessons, stories, big ideas, saved checkpoints, Explore/Create/Build exercises, completion, next-lesson actions, and linked discussions |
| Accounts | Manus OAuth, automatic first-session onboarding, child-safe display names, learning preferences, and persistent profiles |
| Progress | Enrollments, resumable lesson status, checkpoint answers, exercise submissions, path completion, and artifacts |
| Community | Persistent topic rooms, social feed, reactions, threaded replies, recent member cues, profiles, reporting, moderation, and private-information checks |
| Trainer knowledge base | Separate protected route family with persistent facilitator guides, frameworks, exercises, delivery notes, video guidance, and source references |
| Course media | Admin-only MP4/WebM upload, S3 storage, database metadata, lesson attachment, visibility controls, and signed playback URLs |
| Camera studio | Explicit browser permission, private local preview, capture, retake, local download, turn-off, and optional on-device hand tracking |
| Presentation mode | Curriculum-driven teaching scenes, giant AiR mark, keyboard and pointer controls, fullscreen, speaker notes, timer, and optional hand control |
| Administrator experience | Separate sign-in route, protected overview, community safety queue, lesson media, trainer resources, and live teaching entry |

The product contains no sound-only program, player, route, or media type. Course media is video-led, with captions/transcripts and text-based alternatives specified in the trainer guidance.

## Curriculum

| Path | Lessons |
|---|---|
| Clear | Clear the Air; Machines Make Guesses; Choose One Mission |
| Direct | Be the Director; Give Useful Context; Ask for Options |
| Judge | Spot the Guess; Check the Stakes; Make It Fit People |
| Make | Make a First Version; Build Your Way; Put It in the World |

Every lesson uses the same five-beat rhythm: **See it, Name it, Try it, Check it, Share it**. Each lesson also provides Explore, Create, and Build exercises so learners can change the level of support without being ranked by age.

## Key routes

| Route | Purpose | Access |
|---|---|---|
| `/` | Public brand and mission | Public |
| `/curriculum` | Complete path catalog | Public |
| `/paths/:slug` | Public path overview | Public |
| `/onboarding` | Display name, role, mode, safety promise, and first path | Member |
| `/dashboard` | Resume learning, progress, paths, community, and profile | Member |
| `/learn/:slug` | Interactive video lesson | Member |
| `/community` | Practice-centered discussions | Member |
| `/community/:id` | Reactions and threaded conversation | Member |
| `/studio` | Private camera rehearsal and capture studio | Member |
| `/members/:id` | Privacy-minimizing learner profile | Member |
| `/trainers` | Separate trainer knowledge base | Member |
| `/present` | Live facilitator presentation mode | Member |
| `/admin/login` | Separate secure administrator entry | Public; role checked after sign-in |
| `/admin` | Administrator workspace | Administrator |
| `/admin/community` | Reports and community moderation | Administrator |
| `/admin/media` | Course-video upload and lesson attachment | Administrator |

## Technical architecture

The application uses React 19, Tailwind CSS 4, Wouter, tRPC 11, Express, Drizzle ORM, MySQL/TiDB, Manus OAuth, and managed S3 storage. Public curriculum data is read through typed procedures. Learner, community, trainer, and media operations use protected or administrator-only procedures.

Curriculum content is authoritatively defined in `server/content.ts` and idempotently persisted to the database. `learningPaths` are the canonical course entities; each contains modules, lessons, checkpoints, and exercises. User responses and progress are stored separately from the authored curriculum.

## Administrator workflow

Open `/admin/login` and use the normal secure account flow. The server checks the account’s administrator role before any administrator procedure runs. `/admin` provides entry points for community safety, course media, trainer resources, and presentation mode.

Open `/admin/media` to upload an MP4 or WebM file of up to 25 MB, choose its visibility, then select a stored video and attach it to a lesson. The lesson procedure returns signed playback URLs only after access checks. Open `/admin/community` to review reports, inspect the related conversation, hide content, and mark a report resolved or dismissed.

Trainer content is seeded into the separate `trainerResources` table. An administrator-only upsert procedure supports future editing interfaces without mixing trainer material into learner lessons. Trainers can launch `/present` from the knowledge-base hero. Presentation progress is intentionally separate from learner progress.

## Camera privacy

The camera is off until the member presses **Enable camera** and accepts the browser permission prompt. Video is requested with audio disabled. Frames and optional hand landmarks are processed on the current device. Nothing is uploaded or stored by AiR. A captured image can only leave the page when the member deliberately downloads it to their device; community sharing is not included in this release.

## Community rooms

The application seeds seven persistent rooms: Start Here, Clear, Direct, Check, Make, Wins + What I Learned, and Trainers Room. Posts belong to a room, while replies can form one-level threads. Four reaction types use plain learner-facing labels: **This helps**, **Good idea**, **Celebrate**, and **I wonder**. There are no follower counts or public rankings.

## Verification

The project passes TypeScript checking, **19 Vitest tests**, and the production build. Automated tests cover curriculum completeness, age-accessible copy constraints, progress calculation, resume logic, community safety, channels, reactions, threaded replies, theme selection, presentation sequencing, hand-to-scene mapping, automatic hand-tracking status, camera fallback messages, trainer authentication, administrator boundaries, media access, and logout behavior.

Responsive visual checks were completed at desktop, tablet, and mobile sizes across public, dashboard, lesson, community, camera, trainer, administrator, media, and presentation routes. The light/dark control was exercised interactively in the browser. Live camera approval remains a person-controlled browser action; unsupported, denied, missing-device, and unknown failure messages are covered by tests.

## Supporting documents

| Document | Purpose |
|---|---|
| `docs/AiR-Trainer-Knowledge-Base.md` | Standalone trainer handbook with the facilitation method and all twelve lesson guides |
| `docs/product-blueprint.md` | Product, brand, curriculum, community, onboarding, and trainer model |
| `docs/data-model.md` | Persistent data and privacy architecture |
| `docs/plain-language-review.md` | Age-eight copy acceptance criteria and verification |
| `docs/research-notes.md` | Research grounding and source map |
| `docs/source-audit.md` | Reuse decisions from the original GitHub repository |
| `docs/higgsfield-campaign-assets.md` | Generated campaign asset manifest and placement intent |
| `docs/enhancement-verification.md` | Theme, responsive, access, camera, presentation, and release verification notes |

## Local commands

```bash
pnpm dev
pnpm check
pnpm test
pnpm build
```

Database migrations are stored in `drizzle/`. Do not use destructive reset commands. New schema changes should be generated, reviewed, and applied in order.

## GitHub Pages launch

The public AiR frontend is deployed from the `docs/` directory on `main` to [https://borngifted.github.io/air/](https://borngifted.github.io/air/). The Pages build uses `/air/` routing, a static fallback for the complete public curriculum, a `404.html` SPA fallback, and public media packaged from the `air-pages-media-v1` release. Branch-based `main/docs` publishing is used because the connected GitHub App can push content but cannot create workflow files.

GitHub Pages is static hosting and cannot execute AiR’s Express, tRPC, OAuth, database, S3, or community backend. With no API origin, the public learning site remains available and protected actions show a clear launch-status page. To activate sign-in, saved progress, community, uploads, and administrator tools, publish the Node server separately and rebuild with `VITE_API_ORIGIN` set to its stable HTTPS origin. Full configuration and the `main/docs` release process are documented in `docs/github-pages-launch.md`.
