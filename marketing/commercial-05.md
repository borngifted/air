# AIR Commercial 05 — Put It in the World

**Asset ID prefix:** `AIR-C05`
**Anchor projects:** Demo Reel (`demo-reel`) · Affirm' — Spoken by Hand (`affirmations`)
**Status:** script — not yet approved for generation. **This is the campaign closer.**

---

## Core audience

The person with eleven unfinished things. Has learned the tools, watched the
tutorials, made experiments — and shipped nothing. Creatives, students, career
changers, anyone whose work lives in a folder.

Secondary: people at the end of the AIR journey deciding whether to publish.

## Communication goal

Convert capability into publication. The viewer should feel the specific
discomfort of unfinished work, then the specific relief of one thing being *out*.

## Emotional shift

**Potential → completion.**

The most emotionally direct of the five. It is allowed to be moving. This is the
one that should make someone actually do something today.

## Visual treatment

**One idea, one continuous journey.** No relay, no critique, no clutter.

Follows a single piece of work through every stage the AIR process describes —
thought, sketch, brief, AI exploration, critique, revision, publication — and
ends with it **in a real place, being seen by a real stranger.**

The last shot is the whole commercial. Everything before it is setup.

Visually: the work itself stays consistent so it's traceable, while everything
around it changes — surfaces, light, hands, rooms, finally public space.

Warmest and most cinematic of the five. Longer lenses, shallower focus, more
natural light.

## Shot list — 30-second master

| # | Dur | Shot | Notes |
| --- | ---: | --- | --- |
| 1 | 0–3s | Close: a person staring at nothing. Thinking. Fingers tapping. | The pre-idea state. Everyone knows it. |
| 2 | 3–6s | A rough sketch on the back of an envelope. Bad, quick, honest. | Genuinely rough. Not designer-rough. |
| 3 | 6–9s | Handwritten note: *"who is this for?"* — and beneath it, a name. | The human-before-tool beat, in one shot. |
| 4 | 9–13s | Screen, off-centre and partly out of focus: variations generating. Four, eight, twelve. | AI's only appearance. Small, brief, not the hero. |
| 5 | 13–16s | The person shaking their head slightly. Deleting most of them. | Judgment. |
| 6 | 16–19s | Hands revising. Something being made *smaller*, *plainer*. | Restraint as craft. |
| 7 | 19–23s | The finished thing, held up, assessed. A breath. | The moment before publishing. |
| 8 | 23–27s | **The work in the world** — on a wall, a window, a community noticeboard, a screen in a public room. | |
| 9 | 27–29s | **A stranger stops and looks at it.** They read. Something registers. | The payoff. Everything is for this. |
| 10 | 29–30s | End card. | |

## Voiceover

> *(0–6s)* Everybody has the idea.
>
> *(6–13s)* Fewer people write down who it's for.
>
> *(13–19s)* Fewer still throw most of it away.
>
> *(19–27s)* And almost nobody finishes.
>
> *(27–30s)* Ideas need more than potential. Put yours in motion.

**Delivery:** the warmest of the five, but never sentimental. The line *"and
almost nobody finishes"* should land as fact, not accusation — the viewer should
recognise themselves without feeling attacked.

## On-screen text

| Time | Text | Treatment |
| --- | ---: | --- |
| 3–6s | — none — | Let the sketch be a sketch |
| 6–9s | *who is this for?* | Handwritten, in shot |
| 13–16s | *keep one* | Small, lime, appears as the deletions happen |
| 27–29s | — none — | **Never put text over the stranger.** The moment carries itself. |
| 29–30s | **PUT IT IN THE WORLD.** / AIR mark / *AI Readiness · sponsored by Digi2U.org* | Full sponsor lockup — campaign closer |

## Sound direction

- **0–6s** — near silence. A room. A pen.
- **6–13s** — a single note enters, tentative. Music that hasn't decided yet.
- **13–19s** — the note finds a rhythm as the work gets edited. Percussion joins,
  restrained.
- **19–27s** — full arrangement, warm, forward. This is the only place in the
  campaign where the music is allowed to lift.
- **27–29s** — **everything drops to room tone** as the stranger stops. Street
  sound. Footsteps. Nothing else.
- **29–30s** — one final chord under the end card.

That drop at 27s is the most important sound decision in the campaign. The music
builds for eight seconds and then gets out of the way for the only moment that
matters.

## ComfyUI reference-image prompts

**Shot 1 — the thinker**
```
person seated alone in a quiet room, staring past camera, thinking, hand resting
near their face, soft window light, muted interior, photographic, 85mm, shallow
depth of field, contemplative, unposed
```
LoRA: `Noerman_African_American_Lifelike`

**Shot 2 — the sketch**
```
rough ballpoint sketch on the back of a used envelope, on a wooden table, close
macro, raking window light, genuinely amateur drawing, coffee ring, honest
```

**Shot 3 — the note**
```
handwritten note on lined paper reading a question, pen resting beside it, warm
overhead light, macro, shallow focus, personal
```

**Shot 7 — assessing the finished work**
```
person holding up a finished printed poster at arm's length, examining it,
side-lit, small studio or kitchen, expression of quiet assessment, photographic,
documentary
```

**Shot 8 — in the world**
```
printed poster mounted on a community noticeboard in a public space, real
weathered urban wall, daylight, people out of focus in the background,
documentary photography, wide angle, natural
```

**Shot 9 — the stranger**
```
a passer-by stopped in front of a poster on a wall, reading it, seen from behind
and slightly to the side, natural daylight, candid street photography, not posed,
face partly visible in profile
```

**Negative for all:** `robot, glowing brain, circuit board, blue neon, holographic
UI, stock-photo posing, smiling at camera, corporate, oversaturated, clip art`

## Higgsfield motion prompts

Chained start/end-frame — the `affirmations` method, which this commercial also
name-checks as a case study.

| Clip | Start | End | Motion prompt | Dur |
| --- | --- | --- | --- | ---: |
| A | Shot-1 still | Shot-2 still | *subject shifts, looks down, hand reaches toward the table* | 5s |
| B | Shot-3 still | Shot-4 still | *pen sets down, rack focus from paper to a screen behind* | 4s |
| C | Shot-5 still | Shot-6 still | *hands move over the surface, elements being removed, deliberate pace* | 5s |
| D | Shot-6 still | Shot-7 still | *hands lift the finished sheet up into the light* | 4s |
| E | Shot-8 still | Shot-9 still | *locked camera on the poster, a figure walks into frame from the right and stops* | 5s |

**Clip E is the money shot and the hardest.** A person walking in and *stopping*
naturally is a difficult generation. Two fallbacks, in order of preference:

1. **Shoot it practically.** Print the poster, put it on a real wall, film someone
   walking up. Cheapest, most honest, and almost certainly better.
2. Generate the empty-wall plate and the person-at-wall frame separately, and
   cross-dissolve.

Do not burn a large credit batch fighting clip E. **The practical version is the
right answer.**

## Editing notes

- Shot 4 (the AI generating) must be **under four seconds and partly out of
  focus.** The campaign's whole thesis is that this is the least interesting part.
- Shot 5's deletion beat needs to read clearly — the viewer must see most of the
  work thrown away.
- **Shot 9 is untouchable.** No text, no music, no cut away. Two full seconds of
  a stranger reading. Every instinct will say tighten it. It is the entire point
  of AIR.
- Full sponsor lockup on this one — it closes the campaign.

## Call to action

**AIR — AI Readiness, sponsored by Digi2U.org.**
Above it: *Ideas need more than potential. Put yours in motion.*

## Versions

| Version | Spec | What changes |
| --- | --- | --- |
| **30s master** | 1920×1080, 24fps | As scripted |
| **15s cutdown** | 1920×1080 | Shots 2, 4, 6, 8, 9. VO: *"Everybody has the idea. Almost nobody finishes."* Then the stranger. |
| **9:16 vertical** | 1080×1920 | Shots 8 and 9 reframe to vertical — a poster on a wall is naturally vertical. Strongest ending of the five in-feed. |
| **16:9 landscape** | 1920×1080 | Master. |
| **Silent captioned** | 1080×1080 / 1080×1350 | VO as cards. **Shot 9 stays silent and uncaptioned** — the image is the line. |

## Accessibility notes

- Burned-in captions on silent versions, pale on dark, min 44px at 1080.
- Closed captions on all versions, including `[music fades]` at 27s — the drop is
  content.
- **Audio description for shot 9 is essential and must be written carefully:**
  *"A stranger walks past, stops, and reads the poster."* A blind viewer gets the
  entire payoff from that one sentence. Do not let it be an afterthought.
- The handwritten note in shot 3 must be legible at 1080 and repeated in captions.
- Shot 9 must not be the only carrier of the CTA — the end card states it.
- No strobing in the generation montage (shot 4). Hold each variation at least 6
  frames.

## Social caption

> Everybody has the idea.
> Fewer write down who it's for.
> Fewer still throw most of it away.
>
> Almost nobody finishes.
>
> AIR — AI Readiness. Free, 8 to 100. Sponsored by @digi2u
>
> #PutItInTheWorld #AIReadiness #Digi2U

## Thumbnail / poster concept

Shot 9, cropped tight: the poster on the wall and the back of one stranger's head
and shoulder, looking at it.

No face. No text on the image. The viewer's eye goes where the stranger's does.

Overlay, small, bottom-left: **SOMEBODY STOPPED.**

It is the quietest thumbnail of the five and will likely outperform the others,
because it is the only one that shows a *result* rather than a *promise*.

---

## Production dependencies

- ComfyUI on the Windows 4090 — not yet reachable
- Higgsfield — live
- **A real printed poster and a real wall** for shots 8 and 9. Strongly
  recommended over generation. One afternoon, a printer, and a location.
- **The work itself must be designed first** — the thing being made through the
  commercial has to be a real, finishable piece. Recommend making it an actual
  AIR Experience 01 output: a one-page explainer for a real local service. Then
  the commercial documents something true rather than staging it.
