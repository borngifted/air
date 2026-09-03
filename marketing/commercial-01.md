# AIR Commercial 01 — Clear the Air

**Asset ID prefix:** `AIR-C01`
**Anchor project:** MOKIPOPS Living Brand Reel (`mokipops-reel`, 70 commits)
**Status:** script — not yet approved for generation

---

## Core audience

People who already use AI a little and feel behind anyway. Late twenties to
fifties, creative or small-business, ten tabs open, three half-finished
subscriptions. They are not afraid of AI. **They are tired of it.**

Secondary: anyone who has been told they should "get into AI" and has no idea
where the door is.

## Communication goal

Move the viewer from *"I need to catch up on tools"* to *"I need to decide what
I'm making."* One reframe. Nothing else.

## Emotional shift

**Overwhelm → stillness → resolve.**

Not overwhelm → excitement. Excitement is what the rest of the category sells,
and it is why people are exhausted. AIR sells relief.

## Visual treatment

Dark green ground (`#132a24`) almost throughout. The clutter arrives as **pale
cards and text fragments** — never glowing UI, never blue, never neon. Think
paper and light, not screens and circuits.

The turn is a **hard cut to silence and stillness**, not a dissolve. Everything
stops at once.

One object survives: a single pale card holding one sentence. Bright green
(`#18C98B`) appears only at the end, on the call to action. Lime (`#D8FF45`) is
used exactly once, on the final word.

No robots. No brains. No circuit boards. No code rain.

## Shot list — 30-second master

| # | Dur | Shot | Notes |
| --- | ---: | --- | --- |
| 1 | 0–3s | Close on a person's face, three-quarter, lit warm from one side. Still. Eyes moving as things pass. | The only human anchor. Hold it. |
| 2 | 3–9s | Same face, now surrounded by drifting pale cards — tool names, tutorial titles, notifications. They accumulate. | Cards enter faster than the eye can read. That's the point. |
| 3 | 9–13s | Wider. The person is nearly obscured. Cards overlap into noise. Audio peaks. | Density, not speed. |
| 4 | 13–14s | **Hard cut. Total silence. Everything gone.** Person alone on flat dark green. | One frame of black between 3 and 4. |
| 5 | 14–18s | Person closes eyes. Breathes. Opens them. | Real duration. Do not rush this. |
| 6 | 18–22s | One pale card drifts in and settles. On it, handwritten: *"a one-page explainer my neighbour can actually read."* | Handwriting, not type. Human mark. |
| 7 | 22–26s | Person picks it up. Small nod. Ghost of a smile. | Resolve, not triumph. |
| 8 | 26–30s | Card fills frame → AIR mark → end card. | |

## Voiceover

> *(0–3s)* — silence
>
> *(3–9s)* You've been told to learn twelve tools.
>
> *(9–13s)* Automate everything. Get certified. Keep up.
>
> *(13–18s)* — silence —
>
> *(18–24s)* AI readiness doesn't start with more tools. It starts with one
> question: **what are you actually trying to make?**
>
> *(26–30s)* Clear the air. Start with what matters.

**Delivery:** low, unhurried, close-mic. Not an announcer. Someone who has been
where the viewer is. The silence from 13–18s is the most important direction in
this script — do not fill it.

## On-screen text

| Time | Text | Treatment |
| --- | ---: | --- |
| 3–13s | Tool names drifting: *Learn 12 AI tools · Build an agent · Master prompts · Get certified · Automate everything · Keep up* | Pale, small, overlapping, never fully legible |
| 18–22s | *"a one-page explainer my neighbour can actually read"* | Handwritten on the card |
| 26–28s | **CLEAR THE AIR.** | Large, tight, pale |
| 28–30s | **Find your way with AIR.** / AIR mark / *sponsored by Digi2U.org* | Lime on "AIR" only |

## Sound direction

- **0–3s** — room tone. Almost nothing.
- **3–13s** — layered notification chimes, keyboard, UI blips, muffled tutorial
  voices. Builds to uncomfortable. Never quite music.
- **13s** — **total cut.** Not a fade. A cut.
- **13–18s** — one breath. Room tone returns, wider and calmer.
- **18–30s** — a single sustained low note enters under the VO and grows. Warm,
  acoustic-adjacent. Resolves on the end card.

**Do not** use a trap beat, a synth riser, or a whoosh transition. The category
is saturated with them and they signal hype.

## ComfyUI reference-image prompts

Generate stills for shots 1, 4, 6, 8. Landscape 1920×1080 and vertical 1080×1920.

**Shot 1 / 5 — the face**
```
close portrait, three-quarter angle, person in their thirties, warm single-source
side light, deep green background, calm expression, slight fatigue around the eyes,
photographic, 85mm, shallow depth of field, muted film grain, negative space
camera left for text
```
LoRA: `Noerman_African_American_Lifelike` — the campaign should reflect Digi2U's
actual Flint/Genesee community rather than defaulting to stock casting.

**Shot 3 — the clutter**
```
same person nearly obscured by overlapping pale paper cards floating in air,
cards carry small text, shallow depth, dark green void background, cinematic,
volumetric haze, no screens, no glowing interfaces, no neon
```

**Shot 6 — the one card**
```
single pale cream index card resting in soft light against deep green void,
handwritten ballpoint text, macro, shallow focus, dust motes, quiet, minimal
```

**Negative for all:** `robot, android, glowing brain, circuit board, neural
network graphic, blue neon, cyberpunk, holographic UI, code rain, matrix,
futuristic HUD, chrome, lens flare, stock-photo businessman`

## Higgsfield motion prompts

Using the chained start/end-frame method proven in `affirmations`
(`nano_banana_pro` stills → **Seedance 2.0** `start_image` → `end_image`,
each clip ending where the next begins).

| Clip | Start frame | End frame | Motion prompt | Dur |
| --- | --- | --- | --- | ---: |
| A | Shot-1 still | Shot-3 still | *slow push in, pale cards drifting into frame from all sides, gradual accumulation, subject holds still* | 6s |
| B | Shot-3 still | Shot-4 still | *all elements exit instantly, cards vanish, camera settles, absolute stillness* | 2s |
| C | Shot-4 still | Shot-5 still | *subject closes eyes, exhales, opens eyes, micro-expression only, locked camera* | 4s |
| D | Shot-5 still | Shot-6 still | *single card drifts down and settles into frame, everything else static* | 4s |
| E | Shot-6 still | Shot-8 still | *slow rise, card fills frame, dissolve to mark* | 4s |

Clip B is the hardest and most important. If Seedance won't hold a clean stop,
**cut it in the edit instead** — one frame of black between A and C achieves the
same thing more reliably. Do not spend credits fighting it.

## Editing notes

- The cut at 13s must land on a **frame of black**, single frame, no fade.
- Resist trimming the 13–18s stillness. It will feel too long in the edit and
  exactly right on a phone.
- Clutter cards should never be individually readable. If a viewer can read one,
  they stop watching to read it.
- End card holds 3 full seconds. Do not clip it for length.

## Call to action

**Find your way with AIR.**
Secondary line, smaller: *AI Readiness · sponsored by Digi2U.org*

## Versions

| Version | Spec | What changes |
| --- | --- | --- |
| **30s master** | 1920×1080, 24fps | As scripted |
| **15s cutdown** | 1920×1080 | Shots 2, 4, 5, 6, 8. Open on clutter already at peak. VO: lines 2 and 4 only. |
| **9:16 vertical** | 1080×1920 | Reframe to the face; clutter enters top and bottom. Text moves to lower third above the UI safe zone. |
| **16:9 landscape** | 1920×1080 | Master. |
| **Silent captioned** | 1080×1080 and 1080×1350 | VO becomes full-frame text cards between shots. The 13s silence becomes a **held black card** — same beat, visual form. |

## Accessibility notes

- **Burned-in captions on the silent version**, pale on dark green, minimum 44px
  at 1080 width.
- Closed captions on all versions including the VO and a `[silence]` cue at 13s —
  the silence is content and a deaf viewer must know it is deliberate.
- Audio description track: describe the accumulation and the disappearance.
- Clutter text must **never** be the only carrier of meaning. The visual density
  communicates it; nobody needs to read the words.
- Contrast: pale `#f7fff8` on green `#132a24` is ~14.9:1. Never put `#18C98B`
  text on pale.
- No strobing. Card accumulation must stay under 3 flashes per second.

## Social caption

> You don't need twelve tools.
> You need one clear idea.
>
> AIR — AI Readiness. Free, for everyone from 8 to 100.
> Explore. Create. Build.
>
> Sponsored by @digi2u
>
> #AIReadiness #ClearTheAir #Digi2U

## Thumbnail / poster concept

Deep green field. The person's face pushed to the right third, looking left into
empty space. In that empty space, one small pale card. Nothing else.

Overlay, tight and heavy: **CLEAR THE AIR** — with "AIR" in lime.

The poster's job is to look like the *opposite* of every other AI ad in the feed.
Where they are dense, bright, and blue, this is sparse, dark, and green.

---

## Production dependencies

- ComfyUI on the Windows RTX 4090 (LAN) — **not yet reachable**
- Higgsfield — live, 1,160 credits
- LoRA `Noerman_African_American_Lifelike` — on this Mac, needs transfer to the
  Windows box
- Casting decision: whose face? Real person or generated?
- VO talent: undecided
