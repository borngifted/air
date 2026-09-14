# Guided projects: make first, learn afterward

AiR now has a private project workspace. Users build their own result with the tools they choose. This feature does not generate an app, website, or finished artifact automatically.

## Member experience

1. **Sign in with Google.** Returning members go to their dashboard; first-time members complete the existing profile setup.
2. **Start an idea.** Add a name, describe the idea, choose who it helps, and describe a useful result. Save it and return later.
3. **Open the workspace.** Once the idea is ready, start building. Record short notes for Clear, Direct, Judge, and Make. Work can happen inside or outside AiR.
4. **Finish the result.** Paste the work, describe what was made, or add an HTTPS link. Completion requires a result and a short note for each part of the process.
5. **Learn backward.** Begin with the finished result, then review Make → Judge → Direct → Clear. Each prompt shows the member's actual project notes. Five saved reflections capture what worked and how to repeat it.
6. **Keep going.** Download the project and reflections as text, revisit a related lesson, or reopen the project to improve it. Reopening preserves existing work and reflections.

Routes: `/projects`, `/projects/new`, `/projects/:id`. The dashboard includes recent projects and a new-idea action.

## Storage and access

`projects` belongs to `users.id`. Each read/write uses the authenticated member ID; administrators have no implicit access to another member's project. Text results use `MEDIUMTEXT` to support the permitted 30,000 characters, including Unicode. Process notes and reflections are separate JSON fields.

Each update carries a version number. A stale write is rejected with a recovery message instead of overwriting a newer edit. The server enforces idea → building → completed transitions and rejects reflection submissions before completion. Only HTTPS result links without embedded credentials are accepted; result content is rendered as text, never executed.

The explicit Save actions persist to MySQL. Unsaved drafts are additionally kept in the current browser tab's session storage, scoped to the member, project, and version, so internal navigation and browser Back do not discard typing. Drafts are removed after saving and on sign-out; closing the tab ends this temporary storage. If browser storage is unavailable, account saves still work and the leave-page warning remains. After a conflict, copy any unsaved text before reloading a newer version.

Projects, result links, and reflections are not published to community feeds or public member profiles. An external result's own hosting service controls access to that external link.

## Activate Google sign-in and projects

The existing published site is static. Live member features require a Node server, Google OAuth credentials, and MySQL. These were not configured or deployed by this code change.

1. Copy `.env.example` to `.env` for local development. Set `DATABASE_URL`, a random 32+ character `JWT_SECRET`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET`. Never commit these values.
2. In Google Cloud, use a Web application OAuth client and register the callback exactly: `http://localhost:3000/api/oauth/callback` locally, or `https://YOUR-BACKEND/api/oauth/callback` in production. See [Google's server flow documentation](https://developers.google.com/identity/protocols/oauth2/web-server).
3. Set `PUBLIC_API_ORIGIN` to the backend origin and `FRONTEND_ORIGIN` to the frontend URL. The example uses `http://localhost:3000` for both. In production, use HTTPS and the real origins.
4. Run `pnpm db:migrate`. Migration `0004_foamy_tombstone.sql` adds the project table; it does not remove or reset existing tables.
5. Run `pnpm check:setup`. This checks required configuration, connects to the database, and checks the account/project tables without printing secrets. It checks credential presence, not whether Google accepts those credentials.
6. Build and deploy the full-stack server with the existing Dockerfile or `pnpm build` / `pnpm start`. For a separate GitHub Pages frontend, set its backend origin in the published `air-config.js`, then rebuild and publish the changed frontend using the existing release procedure.
7. Complete one real Google sign-in, onboarding, and project save on the deployed site. Repeat with a second account to confirm separation.

Project text and links do not require an AI provider or S3 bucket. The existing media-upload feature still requires its S3 settings. See `independent-hosting.md` for the full hosting instructions.

## Verification for this change

- TypeScript checking and 47 automated tests pass. New tests cover HTTP OAuth success/cancellation, full-state tampering, local cookies, missing persistence/configuration, private project access, invalid transitions, unsafe links, completion requirements, five reflections, and stale writes.
- All five migrations applied to a fresh local MySQL 8.4 database. The real database test passed creation, reloading, cross-account restrictions, a large Unicode result, completion, five persisted reflections, reopening, and stale-write protection.
- Browser checks used a separate, temporary sample-data server: create idea → start building → save → reload → finish → save all five reflections. Internal navigation and browser Back restored an unsaved reflection. Desktop (1440px) and phone (390px) layouts were inspected in dark/light themes. The test server is not part of the shipped app or its authentication.
- Resume follow-up: the server build removes development-only imports, and the container now includes a production-compatible migration command. A full Docker build passed; the image started with production dependencies, served the dashboard, rejected signed-out project access, and applied the MySQL migrations twice without errors.
- Both the full-stack production build and the GitHub Pages build pass. The existing large-bundle warning remains.
- Real Google credentials and the production backend were unavailable, so an actual Google account login and live deployment remain unverified.

To repeat the real database test against an already migrated, disposable local database named `air_test`:

```sh
DATABASE_URL='mysql://USER:PASSWORD@127.0.0.1:PORT/air_test' pnpm exec tsx scripts/verify-project-db.ts
```

The script refuses non-local databases and other database names. It removes only the two accounts it creates for its checks.
