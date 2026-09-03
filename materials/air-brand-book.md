# AIR — Brand Reference

**AIR — AI Readiness**, sponsored by **Digi2U.org**
Established 2026-09-02. Source of truth for colour, mark, and voice.

---

## The mark

`Main_logo/AiR_Logo-MAIN.svg` — vector, 2048×2048 viewBox, two colours only.
`Main_logo/AiR_Logo-MAIN.png` — 1926×1135 raster.

A heavy forward-italic **A + i + R**. The lowercase `i` is formed in the negative
space between the A and the R, its dot a filled circle. The slant does the work:
it reads as motion before it reads as letters.

What it communicates, in the order a viewer gets it:

1. **Forward motion** — the italic is aggressive, not decorative
2. **Open space** — the counters are wide; the mark breathes
3. **Clarity** — two colours, no gradient, no effect
4. **Confidence** — weight without ornament

Do not add a gradient, glow, bevel, outline, or drop shadow. Do not set the mark
on a busy image without a solid field behind it. Do not recolour the `i`.

## Colour — resolved

The handoff proposed `#192A24` for dark green. **The logo file uses `#132a24`.**
Ruling: **the logo is canonical.**

| Token | Hex | Role |
| --- | --- | --- |
| `--air-green` | **`#132a24`** | Primary. Backgrounds, the mark, body text on pale. |
| `--air-pale` | **`#f7fff8`** | Ground. Page background, the mark's counter-space. |
| `--air-bright` | `#18C98B` | Accent. Actions, active states, progress, the "go" signal. |
| `--air-lime` | `#D8FF45` | Highlight. Used sparingly — one element per screen at most. |

**Honest note:** only `#132a24` and `#f7fff8` appear in any existing asset. The
bright green and lime are palette extensions from the handoff and have not been
validated against a produced design. They are adopted here, but the first time
they appear in a real layout, check them rather than trusting this table.

### Using them

- **Dark mode is the default.** `#132a24` ground, `#f7fff8` text. The mark was
  drawn dark-on-pale, so on a dark ground use the pale lockup.
- **Bright green is a verb.** It marks the thing you can act on. If everything
  is bright green, nothing is.
- **Lime is a shout.** One per screen. It is the loudest thing in the system and
  loses all force when repeated.
- Never place `#18C98B` text on `#D8FF45`, or either on the other — the contrast
  fails and it is unreadable for low-vision users.

### Contrast, checked

| Pair | Ratio | Verdict |
| --- | ---: | --- |
| `#f7fff8` on `#132a24` | ~14.9:1 | passes AAA, the workhorse pairing |
| `#18C98B` on `#132a24` | ~6.4:1 | passes AA for body, AAA for large text |
| `#D8FF45` on `#132a24` | ~12.6:1 | passes AAA — good for a single loud element |
| `#132a24` on `#18C98B` | ~6.4:1 | passes AA — use for buttons with dark labels |
| `#18C98B` on `#f7fff8` | ~2.3:1 | **fails** — never body text on pale |

That last row matters. Bright green reads well on the dark ground and badly on
the pale one. On pale backgrounds, actions should use `#132a24` with a bright
green underline or fill, not bright green text.

## Type

Not specified in the handoff, and no typeface is embedded in any AIR asset.
Recommendation, pending your ruling:

- **Display** — a tight, heavy grotesque with real italic weight, to echo the
  mark's slant. Set headlines large, tight, and few.
- **Body** — a plain, highly legible sans at generous size. AIR serves 8-year-olds
  and 100-year-olds; small type fails both ends.
- **Minimum body size 17px.** Line length under 66 characters.

Whatever is chosen must ship with a real fallback stack. AIR pages should work
with no network.

## Voice

Short sentences. Verbs first. Second person.

**Use:** mission · challenge · make · explore · try this · see what happens ·
clear the clutter · challenge the result · make it useful · put it in the world

**Never:** learning objectives · assessment criteria · competency framework ·
instructional delivery · participants will demonstrate · leverage · utilize ·
best-in-class

The test: read it aloud to a twelve-year-old and a sixty-year-old. If either
would not say it that way, rewrite it.

## The three levels

Never presented as difficulty tiers, never gated by age.

| Level | Who picks it | What changes |
| --- | --- | --- |
| **Explore** | first time, or with a kid, or just looking | fewer decisions, more guidance, a finished thing at the end |
| **Create** | most people, most of the time | real decisions, real tradeoffs, own subject matter |
| **Build** | wants to go under the hood | workflow, automation, code, production systems |

A learner may switch levels inside a single experience. Explore is not a lesser
version — it is a different entry to the same finished work.

## Naming

**AIR** in caps in body text. **AIR — AI Readiness** on first mention in any
public-facing piece. Always credit **sponsored by Digi2U.org** in footers and
end cards.

The wordmark file spells it `AiR` (lowercase i) — that is the *mark*, not the
text. Written prose uses AIR.

## What AIR must never look like

An LMS. If a screen has a progress bar, a percentage, a badge, a certificate, or
the word "module," it has failed the brief.
