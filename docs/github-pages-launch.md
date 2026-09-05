# AiR GitHub Pages Launch

AiR’s public frontend is deployed to **[https://borngifted.github.io/air/](https://borngifted.github.io/air/)** from the repository root on `main`, which is the Pages source already enabled for this repository. The release process builds the React application with the `/air/` base path, downloads the public media release into the deployment artifact, creates a `404.html` SPA fallback, and copies the deployable artifact to the repository root alongside the editable source.

## What GitHub Hosts

GitHub Pages serves the public brand experience, all four learning-path overviews, twelve lesson summaries, campaign images, the African American male hero video, theme behavior, and launch-status guidance. Public curriculum data has a typed static fallback generated from the same authoritative `server/content.ts` curriculum used by the database seeder.

## Why AiR Still Needs a Server

GitHub Pages cannot run Express, tRPC, OAuth callbacks, MySQL/TiDB, protected media signing, S3 uploads, or community mutations. Those features remain in the AiR Node server. To enable member accounts on the GitHub frontend, publish the AiR full-stack server at a stable HTTPS origin, then provide this value when packaging the Pages build:

| Variable | Value |
|---|---|
| `VITE_API_ORIGIN` | The stable HTTPS origin of the published AiR server, without a trailing slash; leave empty for the public-learning launch |

The server should receive these production environment values:

| Variable | Value |
|---|---|
| `FRONTEND_ORIGIN` | `https://borngifted.github.io/air/` |
| `PUBLIC_API_ORIGIN` | The same stable HTTPS server origin used for `VITE_API_ORIGIN` |

After changing `VITE_API_ORIGIN`, rebuild the Pages artifact, replace the deployable files in `docs/`, commit, and push to `main`. The Pages frontend sends tRPC calls to that server. Sign-in begins on the server, returns through its OAuth callback, and then hands the signed session back to the Pages route through a URL fragment that the client immediately removes and stores in session storage.

## Media

The `air-pages-media-v1` GitHub release is the source bundle for public logos, posters, MP4 files, and campaign images. The release packaging step downloads those files into the generated root `media/` artifact so the final site serves them with browser-compatible content types. The editable application source continues to reference centralized asset paths rather than importing media into React modules.

## Deep Links

The packaged artifact copies `index.html` to `404.html`. Wouter is configured with `import.meta.env.BASE_URL`, so direct visits such as `/air/curriculum`, `/air/paths/clear`, and `/air/launch` return to the React router correctly.

## Local Verification

```bash
GITHUB_PAGES=true VITE_GITHUB_PAGES=true VITE_API_ORIGIN='' pnpm build:pages
gh release download air-pages-media-v1 --repo borngifted/air --dir dist/public/media --clobber
cp dist/public/index.html dist/public/404.html
touch dist/public/.nojekyll
GITHUB_PAGES=true VITE_GITHUB_PAGES=true VITE_API_ORIGIN='' pnpm exec vite preview --host 0.0.0.0 --port 4173
```

With no API origin, public learning remains available and protected actions route to `/air/launch` instead of failing. This is intentional: private learner and community data must never be stored in the public Pages repository.

## Branch-based release

The connected GitHub App can push repository content but cannot create workflow files or change Pages settings. The supported launch therefore uses the repository’s already active GitHub Pages branch source, `main /`:

1. Build and verify the `/air/` artifact.
2. Preserve the editable application source and Markdown documents.
3. Replace only root `index.html`, `404.html`, `.nojekyll`, `assets/`, and `media/` with the verified artifact.
4. Commit and push `main`.
5. GitHub Pages automatically rebuilds from its existing `main /` source.

The deployable root `media/` files are generated copies of the `air-pages-media-v1` release assets.

## Verification record

The production-mode artifact was tested at the real `/air/` base path before deployment. `/air/`, `/air/curriculum`, and `/air/paths/clear` rendered the complete branded homepage, all four paths, and the Clear lesson summary list from the static curriculum fallback. `/air/learn/clear-the-air` reopened directly and showed the intended free-member access gate rather than a blank page or server 404. The join action routed to `/air/launch`, where the page clearly separates the live public curriculum from backend-dependent member tools.

Direct checks of `/air/community`, `/air/trainers`, and `/air/studio` each reopened the appropriate member gate; `/air/admin/login` reopened the distinct administrator sign-in page. After the Pages media bundle was staged inside the artifact, the global and administrator logos loaded with correct browser content types. The admin surface remained readable in both themes.

Focused 390 × 844 mobile captures were completed in dark and light modes. The header logo retained its background-matched negative spaces, the responsive menu controls stayed clear, the African American male hero media remained visible behind the hero treatment, and the primary actions stayed within the viewport. A desktop light-mode check confirmed the packaged logo and hero media rendered from `/air/media/` while the static curriculum remained available.

Focused mobile captures of the campaign section confirmed the **Move with it** and **Check before you trust** Higgsfield visuals load from the packaged Pages media directory with readable overlays, rounded-card geometry, and correctly positioned calls to action. The adjacent community campaign card was also present in the responsive stack.

The focused community-card capture confirmed **Make it together** renders with the full multi-generation learning group, readable overlay, and transition into the static curriculum. A light-mode footer capture confirmed the white AiR mark remains crisp against black with its i, A, and R negative spaces matching the footer background; footer copy and navigation also remained readable at the mobile breakpoint.

The first screenshot matrix revealed that administrator sign-in retained its dark surface after the light switch. The CSS was corrected and new desktop and 390 × 844 mobile captures confirmed a genuine warm light background, white administrator card, dark legible headings, visible two-part AiR marks, and a high-contrast green sign-in action. The dark administrator treatment remains unchanged.

All eleven packaged media routes returned HTTP 200 with browser-compatible types: SVG and PNG logos, JPEG poster, four MP4 files, the African American male course poster, and three PNG campaign images. This verifies the Pages artifact serves actual media rather than GitHub attachment responses or HTML fallbacks.

Additional light-theme campaign captures at 1280 × 720 and 390 × 844 confirmed the warm paper background, dark headings, green accent, all visible campaign imagery, readable overlays, and responsive stacking. The first campaign card remains the mobile lead while the desktop composition shows the wide **Move with it** card beside **Check before you trust**.

Dark-theme footer captures at 1280 × 720 and 390 × 844 confirmed the white AiR mark remains crisp against black and its lowercase i center plus inner A and R shapes match the footer background. Footer copy, navigation, attribution, and the green community band remained legible at both breakpoints.

## Live deployment verification

GitHub Pages built commit `36cd90e4bfce50ecc04970680f2b8ae484c9ea25` successfully from the existing `main /` source. The public homepage at `https://borngifted.github.io/air/` rendered the dark-first brand experience, African American male hero media, all three campaign placements, static curriculum cards, theme control, and background-matched header/footer marks. The direct `/air/curriculum` URL reopened without a 404 and displayed all four paths plus Explore, Create, and Build entry modes.

The deployed `/air/paths/clear` deep link rendered the complete Clear overview and all three lesson summaries. The deployed `/air/launch` route rendered the branded launch-status state and clearly distinguished the live public curriculum from account, community, upload, and administrator capabilities that require the secure AiR server.

The live `/air/community` deep link rendered the intended free-member access gate instead of failing. The live `/air/admin/login` deep link rendered the distinct administrator sign-in design with both AiR marks, theme control, and launch-safe sign-in action.

Phone-sized captures of the deployed homepage in dark and light modes confirmed the responsive AiR header, theme-aware negative-space mark, African American male hero media, age-eight-readable headline, supporting copy, and primary actions render correctly. The live light-mode administrator switch also produced the corrected warm light surface and white sign-in card.

All eleven deployed `/air/media/` routes returned HTTP 200 with the correct browser MIME types for SVG, PNG, JPEG, and MP4 assets. This includes the hero video and poster, African American male course video/poster, all three campaign images, and both logo formats.

The deployed `/air/learn/clear-the-air` deep link reopened the intended free-member gate instead of a 404. The deployed `/air/trainers` route reopened the trainer-specific access state and correctly explained that facilitator materials require sign-in through the secure server.

The deployed `/air/studio` camera route also reopened the intended free-member access gate with the complete branded shell. Together, the live lesson, community, trainer, camera, and administrator URLs confirm that protected deep links degrade safely on GitHub Pages until the production API bridge is connected.

## Connected backend build

The Pages artifact was rebuilt with `VITE_API_ORIGIN=https://airplatform-6feozlue.manus.space`. Its generated JavaScript bundle contains that exact origin and serves from `/air/assets/` as `text/javascript`. A local production preview rendered the complete homepage and all four curriculum cards. Because the temporary preview origin is intentionally outside production CORS, the public catalog request failed safely and the new static-catalog fallback restored all public learning content instead of showing an empty state.
