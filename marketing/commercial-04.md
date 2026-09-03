# AIR Commercial 04 — Challenge the Result

**Asset ID prefix:** `AIR-C04`
**Anchor projects:** R&R Global Logistics Brand Book (`rrgls-brandbook`) — reduced-motion accessibility · ACAI critique cycle
**Status:** script — not yet approved for generation

---

## Core audience

People already generating with AI and shipping it. Designers, marketers,
students, small-business owners. **They are not sceptics — they are the
over-trusting.** They see a good-looking output and assume good.

Secondary: anyone who has felt vaguely uneasy about AI work but couldn't name why.

## Communication goal

Move the viewer from *"the AI made it, so it's done"* to *"the AI made a draft,
and I'm the editor."* Generation is the cheap part. Judgment is the product.

## Emotional shift

**Impressed → suspicious → capable.**

Critically, it must not end in cynicism. The viewer should feel *equipped*, not
warned off. The last beat is a person making something better, not rejecting AI.

## Visual treatment

**The slow reveal.** One image, held, examined.

Open on something genuinely beautiful — a polished campaign visual that would
pass in any feed. The camera pushes in slowly. As it does, **annotations appear
in lime** marking what's wrong. Not error-red. Editorial marks, like a designer's
redline over a proof.

Then a person enters and fixes it, on screen, deliberately.

The whole commercial happens on **one image**, which is the argument: you don't
need more outputs. You need to look harder at the one you have.

## Shot list — 30-second master

| # | Dur | Shot | Notes |
| --- | ---: | --- | --- |
| 1 | 0–4s | Full frame: a striking AI-generated campaign poster. Genuinely good. Let the viewer admire it. | It must actually look good or the reveal fails. |
| 2 | 4–8s | Slow push in. First lime annotation appears, circling text: *"reads as three different messages"* | Annotation is handwritten-style |
| 3 | 8–11s | Push continues. Second mark on a hand: *"six fingers"* | The classic tell. Quick. |
| 4 | 11–14s | Third mark on tiny illegible type: *"nobody can read this"* | |
| 5 | 14–17s | Fourth mark, wider: *"everyone in frame looks the same"* | The hardest one. Hold slightly longer. |
| 6 | 17–19s | Fifth, on a claim in the copy: *"where did this number come from?"* | |
| 7 | 19–23s | A person's hand enters frame and starts moving elements. Type gets bigger. Hierarchy resolves. | Real hand over the image. |
| 8 | 23–27s | The corrected version. Plainer. Clearer. Fewer elements. Obviously better. | It should look *less* impressive and *more* effective. |
| 9 | 27–30s | End card. | |

## Voiceover

> *(0–4s)* This took eleven seconds to make.
>
> *(4–14s)* It says three things at once. It has six fingers. And nobody can read
> the part that matters.
>
> *(14–19s)* Everyone in it looks the same. And that number? Nothing generated it
> but confidence.
>
> *(19–27s)* Generating is the easy part. **Deciding is the work.**
>
> *(27–30s)* Don't just accept the result. Direct it.

**Delivery:** dry, precise, faintly amused. Not scolding. The tone of a good
art director giving notes — direct, unbothered, useful.

## On-screen text

Annotations are the on-screen text. All in lime (`#D8FF45`), handwritten style,
appearing with a quick draw-on:

| Time | Annotation |
| --- | --- |
| 4–8s | *reads as three different messages* |
| 8–11s | *six fingers* |
| 11–14s | *nobody can read this* |
| 14–17s | *everyone here looks the same* |
| 17–19s | *where did this number come from?* |
| 27–30s | **DON'T JUST ACCEPT THE RESULT.** / AIR mark / *sponsored by Digi2U.org* |

## Sound direction

- **0–4s** — a single clean sustained tone. Confident. Slightly too perfect.
- **4–19s** — each annotation lands on a soft percussive mark — a pencil tick, a
  marker squeak. Five marks, five beats. The sustained tone gradually detunes.
- **19–23s** — tone stops. Paper and hand sounds only. Something being worked on.
- **23–30s** — a new tone, lower and properly in tune, resolving.

The detuning across 4–19s should be almost subliminal. The viewer should feel the
image souring before they consciously notice.

## ComfyUI reference-image prompts

**This commercial needs a deliberately flawed hero image.** That is unusual and
worth stating: generate it *without* the usual quality controls, then keep the
flaws.

**Shot 1 — the flawed poster (generate at draft settings, do not fix)**
```
polished commercial campaign poster, group of people, bold headline, product,
dramatic studio lighting, high production value, magazine advertising aesthetic
```
Run at **low steps, no hand-fixing, no upscale, no negative prompt for anatomy.**
Accept the first output that looks good at a glance. Six fingers and mangled small
type are the *deliverable*, not a failure.

**Shot 8 — the corrected version**
```
clean minimal campaign poster, single clear headline with strong hierarchy, one
subject, generous whitespace, restrained palette, legible type, professional
graphic design, print quality
```
Full quality pass. Upscale. This one should be genuinely well made.

**Casting note for shot 5's annotation to be honest:** the flawed original should
default to whatever the base model produces unguided — which is precisely how you
demonstrate the sameness problem. The corrected version should use
`Noerman_African_American_Lifelike` to show what directed casting looks like.
**This contrast is the most useful teaching moment in the whole campaign.**

**Negative (corrected version only):** `extra fingers, deformed hands, illegible
text, cluttered, low contrast, watermark`

## Higgsfield motion prompts

Mostly a **camera and compositing piece**, not a generation piece.

| Clip | Start | End | Motion prompt | Dur |
| --- | --- | --- | --- | ---: |
| A | Shot-1 still | Shot-4 still (same image, closer) | *very slow continuous push in on a static poster, no subject motion* | 14s |
| B | Shot-6 still | Shot-7 still | *hand enters frame from lower right and touches the surface* | 4s |
| C | Shot-7 still | Shot-8 still | *elements settle into new positions, type scales up, composition resolves* | 4s |

**Do the annotations in the edit, not in Higgsfield.** They need frame-accurate
timing to the sound design, and hand-drawn marks composited in post will look
better and cost nothing. Clip C may also be simpler as a crossfade between two
ComfyUI stills than as generated motion — **try the cheap version first.**

## Editing notes

- Shot 1 must hold long enough for genuine admiration. Four full seconds. If the
  viewer doesn't like it first, the reveal has nothing to land on.
- Annotations appear **one at a time**, never stacked in a rush. Each needs its
  own beat.
- The *"everyone here looks the same"* mark is the one people will remember. Give
  it an extra half-second.
- The corrected poster must look **calmer, not flashier.** If shot 8 is more
  impressive than shot 1, the argument inverts.
- No "before/after" split screen. It's a cliché and it lets the viewer off the
  hook — the point is that you have to look *at* the thing, not next to it.

## Call to action

**Think clearly. Create intentionally.**
Secondary: *AIR — AI Readiness · sponsored by Digi2U.org*

## Versions

| Version | Spec | What changes |
| --- | --- | --- |
| **30s master** | 1920×1080, 24fps | As scripted |
| **15s cutdown** | 1920×1080 | Three annotations only — *six fingers*, *nobody can read this*, *everyone looks the same*. Straight to the fix. |
| **9:16 vertical** | 1080×1920 | The poster becomes a vertical poster. Push-in still works. Annotations stack down the right edge. Very strong in-feed. |
| **16:9 landscape** | 1920×1080 | Master. |
| **Silent captioned** | 1080×1080 / 1080×1350 | **The strongest silent version of the five** — the annotations already are the text. Add only the VO's closing lines as cards. |

## Accessibility notes

- Annotations must be **large and high contrast**: lime `#D8FF45` on the image,
  with a subtle dark stroke so they hold over light areas. Min 44px at 1080.
- Closed captions must include the annotation text — a low-vision viewer may not
  read them on the image.
- **Audio description is critical here:** the entire commercial is visual
  critique. Describe each flaw explicitly: *"A hand in the poster has six
  fingers."*
- Do not rely on the detuning sound to carry meaning for deaf viewers — every
  flaw is annotated visually, which covers it.
- The push-in must be slow and steady. No shake, no jitter — vestibular safety.

## Social caption

> It took eleven seconds to make.
>
> It says three things at once. It has six fingers. Nobody can read the part that
> matters. And everyone in it looks the same.
>
> Generating is the easy part. Deciding is the work.
>
> AIR — AI Readiness. Sponsored by @digi2u
>
> #ChallengeTheResult #AIReadiness #Digi2U

## Thumbnail / poster concept

The flawed poster, full bleed — with **one** lime annotation visible, circling
the six-fingered hand, and nothing else.

The viewer's eye finds the circle, then the hand, then the mistake. They've done
the exercise before they've clicked.

Overlay, small, corner: **LOOK AGAIN.**

---

## Production dependencies

- ComfyUI on the Windows 4090 — not yet reachable
- Higgsfield — live, though this commercial needs it least
- **Annotation asset set** — five hand-drawn marks, made once, composited in edit
- **Ethical note flagged for approval:** the commercial deliberately generates an
  image with poor representation in order to critique it. That is defensible as
  teaching, but the flawed image must **never** be published standalone, in a
  thumbnail crop that loses the annotation, or in any context without its
  critique. Add to the approval checklist.
