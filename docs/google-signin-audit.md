# AiR Google Sign-In Audit

## Current production flow

AiR starts authentication at the published backend, preserves a nonce-bound return state, and hands the browser to the canonical Manus login route. The callback exchanges the authorization code, upserts the member, and returns the browser to the GitHub Pages frontend with the existing cross-origin session-token bridge intact.

## Provider finding

The current Manus login page visibly presents **Continue with Google** as its first provider action, followed by Microsoft, Apple, email, and passkey options. The rendered Google control is a client-handled button rather than a static provider-specific hyperlink or form action. No supported provider-selection query parameter is exposed in the official AiR OAuth integration guidance or visible button markup.

## Implemented production contract

AiR preserves the existing OAuth callback, nonce validation, session minting, and `openId` identity mapping. Every visible member and administrator entry now uses a reusable **Continue with Google** control and routes to the hosted sign-in screen where Google is the first action, rather than inventing an undocumented direct Google endpoint.

The callback now requires the verified login method to be `google`. Choosing a different provider returns the member to AiR with a clear **Choose Continue with Google** message. Existing progress and community data remain keyed to the verified `openId`. AiR never silently merges identities by email: if the normalized Google email is already stored against a different `openId`, the callback stops and asks the member to contact an administrator.

## Existing account continuity audit

The production database currently contains **one member account**, and its normalized login method is already **Google**. The duplicate normalized-email query returned no conflicts. Therefore, changing every visible member entry to **Continue with Google** preserves the only existing member’s `openId`, profile, progress, community activity, and administrator role without introducing an email-based merge. AiR will continue to use the provider-verified `openId` as its identity key and will not silently merge a different provider account by email.

## Anonymous build verification

The backend-connected GitHub Pages artifact was rebuilt with both the `/air/` base-path flag and the client-visible Pages media flag. Anonymous desktop checks confirmed that the global header displays **Continue with Google**, the hero displays **Join free with Google**, and the official Google mark remains readable on the dark AiR surface. Packaged header, hero, campaign, and footer media resolve through `/air/media/` rather than managed-storage URLs.

The direct `/air/community` route settled into the protected member gate without exposing community data. Both the header and gate used the shared **Continue with Google** control, and the gate stated in age-eight-readable language that Google opens the secure sign-in page and AiR never sees the member’s Google password.

Focused 390 × 844 mobile captures verified the homepage in both dark and light modes. The responsive header retained its theme-aware AiR mark and compact navigation, while the hero showed a large white **Join free with Google** control with the official multicolor Google mark. The control stayed within the mobile viewport, preserved readable contrast, and did not compete with the age-eight-readable hero message.

The mobile dark community gate displayed the Google control at a comfortable touch size, kept the short privacy explanation fully readable, and exposed no member content. The mobile light administrator page displayed the same Google control and explicitly instructed administrators to use the Google account connected to their role; the page exposed no protected administrator tools before authentication.

The production backend start route was opened with the live GitHub Pages community return URL. It redirected to the canonical hosted identity page with **Continue with Google** as the first provider action, followed by Microsoft, Apple, email, and passkey. The URL preserved `https://airplatform-6feozlue.manus.space/api/oauth/callback` and a signed state containing `https://borngifted.github.io/air/community`. No provider button was clicked and no credentials were entered during this verification.

## Final live verification

GitHub Pages built commit `4e068abf2f47eb0828178b07a88975387a1dc556`. The deployed JavaScript bundle contains the shared **Continue with Google** control, the Google-only callback error message, and the production AiR API origin. The live homepage displays **Continue with Google** in the header and **Join free with Google** in the hero while preserving the official AiR media and theme-aware marks.

The live `/air/community` route exposed no posts before authentication and displayed the shared Google control plus the password-privacy explanation. Selecting that control opened the canonical hosted identity page with **Continue with Google** first and preserved both the stable AiR callback and the exact `/air/community` return route. No Google button was pressed and no credentials were submitted during this release check.

The managed production administrator route rendered its light-theme Google sign-in page correctly in a clean mobile browser profile. A direct mobile capture of the managed `/community` route produced a blank warm background, so that route requires a focused managed-host diagnosis even though the same protected gate works on GitHub Pages and the production `auth.me` endpoint correctly returns an anonymous session.

Follow-up inspection showed that the blank managed `/community` frame is the short loading state before the managed site automatically opens secure sign-in; it is not a failed page render. The route then reached the canonical hosted identity page with **Continue with Google** first and the stable AiR callback. GitHub Pages intentionally keeps its explanatory member gate visible until the visitor selects the Google control. The managed administrator route remains a visible Google sign-in page so administrators can confirm they are using the account tied to their role.

## Sources checked

The audit reviewed the project OAuth implementation, the official Manus OAuth integration guidance, the live `https://manus.im/login` page, the rendered Google button metadata, and the Manus account help article describing supported login methods and identity permanence.
