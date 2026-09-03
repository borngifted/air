# AIR — AI Readiness

Interactive presentation for **AIR**, sponsored by **Digi2U.org**.

**Live:** https://borngifted.github.io/air/

## Method

One self-contained `index.html`. Single `<style>` block, single `<script>`,
**zero external requests**, no build step, no dependencies. The AIR logo is
inlined as SVG and recoloured through CSS custom properties, so the mark scales
and themes without a second file.

Same method as `acai-main-site`, `identity-transfer`, and `soul-metadata` —
open the file anywhere and it works, with or without a network.

## Interactive

- **Clear the Air** — tap to cross out the noise you're carrying; the counter
  tracks what's left.
- **Mission builder** — fill three blanks, get your sentence back.

Both are keyboard accessible with `aria-pressed` and a live region. Motion
honours `prefers-reduced-motion`.

## Brand

| Token | Hex |
| --- | --- |
| `--air-green` | `#132a24` — from the logo, canonical |
| `--air-pale` | `#f7fff8` |
| `--air-bright` | `#18C98B` |
| `--air-lime` | `#D8FF45` |

## Editing

Everything is in `index.html`. The Clear-the-Air prompts live in the `NOISE`
array in the script block. Case studies are plain markup in the `#proof`
section.

Docs: `../AIR_BRAND.md`, `../AIR_PROJECT_INVENTORY.md`,
`../AIR_EXPERIENCE_MAP.md`, `../AIR_EXPERIENCE_01.md`
