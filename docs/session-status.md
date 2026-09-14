# AiR saved session status — 2026-09-14

## Confirmed product direction

Google-only member sign-in leads to the dashboard. Users save an idea, build their own result in a guided workspace, finish it, then review the actual process backward. Automatic AI generation is not part of this version.

## Completed locally

- Google OAuth fixes: browser-bound full state, local-compatible cookies, persisted-account check, dashboard return, and onboarding refresh.
- Private saved projects, version-checked writes, build notes, finished text/link, five reverse-order reflections, reopening, and text downloads.
- Draft restoration across in-app navigation and browser Back; cache/draft clearing on sign-out.
- Database migration and setup checker; localhost configuration template and deployment guide.
- Production startup fix: development-only imports excluded from server build.
- Production-compatible migration runner included in the Docker image.
- Free-tier Render blueprint with an explicit Free plan, generated session secret, migration-on-start, and manual releases.
- Shared verified TLS database options for TiDB, a five-connection pool, Render origin fallback, and a liveness endpoint.
- Setup and cost boundaries documented in `docs/free-tier-hosting.md`.

## Verified

- TypeScript check and 51 automated tests (including hosted database TLS configuration).
- Full-stack and GitHub Pages builds.
- Real MySQL project lifecycle, ownership checks, stale writes, and large Unicode results.
- Browser walkthrough using temporary sample data; desktop/mobile dark/light checks.
- Full production Docker image build, server startup, signed-out project protection, and migration execution twice against disposable MySQL.
- Updated free-tier Docker image built successfully; its exact migration-and-start command, health endpoint, setup checker, Render URL fallback, and repeated migration passed against a fresh disposable MySQL database. Cloud TiDB and real Google sign-in are still unverified.

Temporary verification servers and test containers have been stopped. Changes are saved in the working tree; no commit, push, or production deployment has been performed in this session.

## Remaining activation

The user identified GitHub account `borngifted` as their hosting setup. Repository: `https://github.com/borngifted/air`. Public frontend: GitHub Pages at `https://aireadiness.me/`.

The user chose a free-tier setup. Prepared Render Free plus TiDB Cloud Starter with a $0 spending limit. No hosting account, subscription, or paid resource has been created.

Chrome has two setup tabs in the AiR free hosting group, paused at GitHub authorization:

- Render requests identity verification and email-address read access for `borngifted`.
- TiDB Cloud requests email-address read-only access for `borngifted`.

Neither approval has been submitted. Browser rules require confirmation for new access grants. Ask for those specific authorizations or let the user complete them. Recheck the live screen before acting. Account terms, repository installation permissions, and any new password entry remain separate action-time decisions.

Next:

1. Complete approved Render/TiDB sign-in and free-plan onboarding; save reviewed code to GitHub and connect only `borngifted/air`.
2. Configure Google OAuth, a session signing secret, and exact public/frontend origins securely in the host's settings.
3. Deploy and verify cloud migrations. Use a same-site subdomain such as `app.aireadiness.me` before connecting GitHub Pages to avoid third-party-cookie failures. Preserve existing apex/www DNS records. Update the frontend API origin only after HTTPS and Google callbacks are ready.
4. Publish the changed frontend and complete a real Google sign-in with saved project verification.

Real Google credentials, production database details, and backend origin are not present in local configuration. Never ask the user to paste secret values into chat.
