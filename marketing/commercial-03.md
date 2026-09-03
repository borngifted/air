# AIR Commercial 03 — Made for Every Mind

**Asset ID prefix:** `AIR-C03`
**Anchor project:** Digi2U 2026 (`digi2u-2026`) — programs across ages and disciplines
**Status:** script — not yet approved for generation

---

## Core audience

Everyone, deliberately. But the persuadable viewer is the one who thinks AI
belongs to somebody else — too old, too young, not technical, not creative
enough, "not for people like me."

Secondary: educators, grandparents, and community programme leads deciding
whether to bring AIR to a room of mixed ages.

## Communication goal

Prove that AI readiness is not gated by age, profession, or technical
background — by showing one idea surviving five pairs of hands.

## Emotional shift

**Exclusion → belonging.**

The viewer should end thinking *"I could start where I am."* Not *"look how
clever these people are."*

## Visual treatment

The **relay**. One creative spark passes between five people across generations,
changing form each time but staying recognisably the same idea.

The connective device: **a shape drawn in lime (`#D8FF45`)**. It begins as a
child's crayon scribble and ends as a finished piece of public work — but the
silhouette is always readable as the same shape.

Warm, varied locations. Five distinct light qualities so each handoff feels like
a different life, not a set.

Match cuts do the work: the shape exits one frame and enters the next in the same
screen position.

## Shot list — 30-second master

| # | Dur | Shot | Notes |
| --- | ---: | --- | --- |
| 1 | 0–4s | **Eight-year-old**, floor of a living room, crayon. Draws a rough shape — a bird, a house, something with a clear silhouette. Holds it up. | Genuine child mark-making. Not "cute". |
| 2 | 4–5s | Match cut: the drawing exits frame right. | |
| 3 | 5–10s | **Teenager**, bedroom, tablet. The same shape now vectorised, being pushed around. They tilt their head, undo, try again. | The undo is important. |
| 4 | 10–15s | **Entrepreneur**, small shop or studio. The shape is now on a poster, a label, a window decal. They step back and assess. | |
| 5 | 15–20s | **Educator**, classroom or community room. The shape on a screen behind them, being used to explain something to a small group. | People visible listening. |
| 6 | 20–25s | **Elder**, workshop or kitchen table, hands weathered. They add something by hand — a mark, a texture, a correction — to a printed version. | The oldest hands make the last change. |
| 7 | 25–28s | Pull back: the finished thing in the world. A wall, a window, a screen in a community space. People passing it. | |
| 8 | 28–30s | End card. | |

## Voiceover

> *(0–5s)* It starts with somebody who doesn't know the rules yet.
>
> *(5–15s)* Then somebody who wants to push it. Somebody who has to sell it.
>
> *(15–25s)* Somebody who has to explain it. And somebody who's seen enough to
> know what's missing.
>
> *(25–30s)* Eight to a hundred. Curiosity has no age limit.

**Delivery:** generous, rhythmic, building. This is the warmest of the five. It
can carry more music than the others.

**Alternative:** VO delivered by **five different voices**, one per person, each
speaking their own line, with the final line spoken by the child and the elder
together. Costs more to produce. Worth testing — it makes the point structurally
rather than just saying it.

## On-screen text

| Time | Text | Treatment |
| --- | ---: | --- |
| 0–4s | *8* | Small, corner, lime |
| 5–10s | *16* | Same position |
| 10–15s | *34* | |
| 15–20s | *52* | |
| 20–25s | *herself* — **not a number** | The elder is not given an age. Deliberate: the point is not "old", it's "experienced". |
| 28–30s | **EXPLORE. CREATE. BUILD.** / AIR mark / *sponsored by Digi2U.org* | Three words, three beats |

## Sound direction

- Single musical bed, continuous, building through the relay. Warm, acoustic,
  percussive — hand percussion, plucked strings, something with human error in
  the timing.
- **Each handoff adds one instrument.** By shot 7 the full ensemble plays. The
  arrangement literally accumulates.
- Room tone changes with each location — carpet, then hard bedroom surfaces, then
  shop reverb, then a room with people in it, then a quiet workshop.
- No swell at the end. It arrives and settles.

## ComfyUI reference-image prompts

**Shot 1 — the child**
```
child around eight years old lying on a living room floor drawing with crayon on
paper, overhead three-quarter angle, warm domestic light, concentration, natural
and unposed, photographic, documentary style, shallow depth of field
```

**Shot 3 — the teenager**
```
teenager in a bedroom working on a tablet with a stylus, screen glow mixed with
window light, focused, slightly slouched, real teenage bedroom clutter,
photographic, natural
```

**Shot 4 — the entrepreneur**
```
person in their thirties standing back to assess a printed poster in a small
independent shop, hands on hips, daylight through a shopfront window, real small
business interior, photographic
```

**Shot 5 — the educator**
```
educator in a community room presenting to a small seated group, screen behind
them, mid-gesture, warm practical lighting, engaged listeners visible,
documentary photography
```

**Shot 6 — the elder**
```
older person's weathered hands adding a hand-drawn mark to a printed sheet on a
workshop bench, close macro, warm side light, wood grain, tools out of focus,
dignified, photographic
```

**Casting direction:** LoRA `Noerman_African_American_Lifelike` and
`EbonyGoldAI` across the relay. Digi2U serves Flint and Genesee County. A
commercial about "every mind" that shows one demographic contradicts itself in
its own frames. **This must be checked at review** — see Challenge the Result.

**Negative for all:** `robot, glowing brain, circuit board, blue neon,
holographic UI, stock-photo diversity poster, corporate, staged smiling at
camera, clip art, oversaturated`

## Higgsfield motion prompts

| Clip | Start | End | Motion prompt | Dur |
| --- | --- | --- | --- | ---: |
| A | Shot-1 still | Shot-1 end | *child finishes drawing and lifts the paper toward camera, natural movement* | 4s |
| B | Shot-3 start | Shot-3 end | *stylus moves across tablet, subject tilts head, slight lean back* | 5s |
| C | Shot-4 still | Shot-4 end | *subject takes one step back from the poster, weight shift, assessing* | 5s |
| D | Shot-5 still | Shot-5 end | *educator gestures toward the screen, listeners turn slightly* | 5s |
| E | Shot-6 still | Shot-6 end | *hands add a single mark to paper, macro, minimal camera drift* | 5s |
| F | Shot-6 end | Shot-7 still | *pull back and out, revealing the finished work in a public space* | 3s |

**Match-cut requirement:** the lime shape must exit and enter at the **same screen
position** across A→B→C→D→E. Generate each still with the shape composed at a
consistent point in frame so the cuts land. This is easier to control in ComfyUI
composition than to fix in Higgsfield motion — set it at the still stage.

## Editing notes

- The match cuts are the entire structure. If the shape jumps position, the relay
  reads as five unrelated shots.
- **Never cut back.** The relay only moves forward. No returning to the child.
- Each person gets roughly equal screen time. The moment one dominates, it becomes
  a story about that person instead of about passing.
- The elder's hand-made mark should be the **last change** to the artwork —
  ending on analogue after an AI-assisted journey is the argument.

## Call to action

**Explore. Create. Build.**
Secondary: *AIR — AI Readiness · sponsored by Digi2U.org*

## Versions

| Version | Spec | What changes |
| --- | --- | --- |
| **30s master** | 1920×1080, 24fps | As scripted |
| **15s cutdown** | 1920×1080 | Child → teenager → elder → world. Three handoffs, not five. VO: first and last lines. |
| **9:16 vertical** | 1080×1920 | Reframe each to a portrait of hands-and-face. Match cuts move to vertical centre. Strongest of the five in vertical — the relay reads naturally as a scroll. |
| **16:9 landscape** | 1920×1080 | Master. |
| **Silent captioned** | 1080×1080 / 1080×1350 | Ages appear as large numbers between shots. Final card: EXPLORE / CREATE / BUILD as three cuts. |

## Accessibility notes

- Burned-in captions on silent versions, min 44px at 1080.
- Closed captions on all versions; if the five-voice option is used, **identify
  each speaker** in the captions.
- Audio description: name each person's age and setting — the relay's meaning is
  entirely visual and a blind viewer needs it stated.
- The lime shape must never be the **only** way to follow the story. The VO
  carries the progression independently.
- Ages on screen: minimum 60px, high contrast.
- No strobing across the match cuts — allow at least 8 frames per shot.

## Social caption

> An eight-year-old starts it.
> A teenager pushes it.
> Someone sells it. Someone explains it.
> And someone who's seen enough fixes what's missing.
>
> Same idea. Five pairs of hands.
>
> AIR — AI Readiness. 8 to 100. Sponsored by @digi2u
>
> #EveryMind #AIReadiness #Digi2U

## Thumbnail / poster concept

A five-panel vertical strip — one hand from each generation, top to bottom,
each holding the same lime shape at a different stage of finish. Child's crayon
at the top, weathered hands at the bottom.

Overlay: **8 → 100**

No faces. Hands only. It reads instantly at thumbnail size and avoids the
stock-photo trap of five people smiling at a camera.

---

## Production dependencies

- ComfyUI on the Windows 4090 — not yet reachable
- Higgsfield — live
- **Five-voice VO decision** — affects casting and budget
- **The lime shape must be designed first.** Everything else composes around it.
  One asset, six states, from crayon to finished. Recommend drawing it by hand
  and vectorising rather than generating it.
- Casting review for genuine representation — flagged above
