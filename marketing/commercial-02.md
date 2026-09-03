# AIR Commercial 02 — Human Before Tool

**Asset ID prefix:** `AIR-C02`
**Anchor project:** ACAI Home Help (`acai-main-site`) — the *"July 10 critique — resolved"* form fix
**Status:** script — not yet approved for generation

---

## Core audience

People building something for someone else — nonprofit staff, educators, small
business owners, community organisers. They are not asking *"can AI do this?"*
They are asking *"is this good enough to put my name on?"*

Secondary: anyone who has quietly wondered whether the AI output they shipped was
actually right.

## Communication goal

Show that the valuable part of AI work is **the decision a human makes about
consequence.** Not the generation. The judgment.

## Emotional shift

**Efficiency → responsibility.**

The viewer should finish slightly more serious than they started, and feel that
seriousness as *dignity* rather than burden. Their judgment is the product.

## Visual treatment

Warmer than Commercial 01. Real interiors, real hands, real paper. Kitchen table
light. The AI interface appears **once, small, and off-centre** — never the hero,
never full frame.

The emotional core is a real scenario from ACAI: a caregiver fills in a form
about her mother and it silently fails.

Structure: **two versions of the same moment.** The first ends badly. The second
ends correctly. The difference is a person deciding.

## Shot list — 30-second master

| # | Dur | Shot | Notes |
| --- | ---: | --- | --- |
| 1 | 0–3s | Older woman at a kitchen table, phone in hand, reading. Afternoon light. | She is the whole reason this exists. |
| 2 | 3–6s | Her hands typing slowly into a form on the phone. Careful, one finger. | Show the effort. |
| 3 | 6–9s | She presses submit. Green tick appears. She sets the phone down. Small relief. | |
| 4 | 9–13s | **Wide. The phone on the table. Nothing happens. Light shifts — hours pass. No call.** | The gut-punch. Hold it. |
| 5 | 13–15s | Cut to a second person — the builder — at a laptop. Not celebrating. Frowning. | |
| 6 | 15–19s | Over the shoulder: they break the form deliberately. Disconnect the network. Submit. It still says success. They stop. | The realisation. |
| 7 | 19–23s | Hands rewriting. Now the screen shows an error and a phone number. | |
| 8 | 23–27s | Back to the kitchen table. Same woman, same form. It fails — and shows her a number. **She picks up the phone and dials.** | The fix, felt not explained. |
| 9 | 27–30s | End card. | |

## Voiceover

> *(0–6s)* She's not filling in a form. She's asking for help with her mother.
>
> *(6–13s)* The screen said it worked. It didn't.
>
> *(13–19s)* No tool caught that. **A person did** — by trying to break their own
> work.
>
> *(19–27s)* Now when it fails, it says so. And gives her a number.
>
> *(27–30s)* Before the prompt, there is a purpose.

**Delivery:** plain, warm, unsentimental. Never pitying toward the woman. She is
competent; the software failed her.

## On-screen text

| Time | Text | Treatment |
| --- | ---: | --- |
| 9–13s | *No call came.* | Small, pale, lower third. Held. |
| 15–19s | *Break your own work.* | Appears as they disconnect |
| 23–27s | — none — | Let the action carry it |
| 27–30s | **BEFORE THE PROMPT, THERE IS A PURPOSE.** / AIR mark / *sponsored by Digi2U.org* | |

## Sound direction

- **0–9s** — kitchen room tone. A clock. Distant traffic. No music.
- **9–13s** — everything drops to near-silence. One low sustained note enters,
  slightly wrong, unresolved. The sound of waiting.
- **13–19s** — room change: harder surfaces, keyboard, a chair. Note continues.
- **19–27s** — the note finally resolves as the fix lands.
- **27–30s** — warm, quiet close. No swell.

The unresolved note across 9–19s is the whole sound design. It should feel
slightly uncomfortable until the fix.

## ComfyUI reference-image prompts

**Shot 1 / 8 — the caregiver**
```
older woman seated at a kitchen table in warm afternoon light, holding a phone,
reading carefully, domestic interior, lived-in, photographic, 50mm, natural
window light, soft shadows, dignified, documentary style
```
LoRA: `Noerman_African_American_Lifelike` — ACAI serves Genesee County and Flint.
The casting should reflect that community, not a generic stock family.

**Shot 4 — the phone alone**
```
mobile phone face-up on a wooden kitchen table, screen dark, late afternoon light
raking across the surface, empty chair behind, stillness, melancholy, shallow
depth of field, no people
```

**Shot 5 / 6 — the builder**
```
person at a laptop in a small workspace, side light, focused and slightly
troubled expression, hands on keyboard, over-the-shoulder framing, screen not
legible, photographic, documentary
```

**Negative for all:** `robot, glowing brain, circuit board, blue neon, holographic
UI, futuristic interface, stock-photo smiling businesspeople, corporate office,
clip art, oversaturated`

## Higgsfield motion prompts

Chained start/end-frame per the `affirmations` method.

| Clip | Start | End | Motion prompt | Dur |
| --- | --- | --- | --- | ---: |
| A | Shot-1 still | Shot-2 still | *slow push in, subject looks down at phone, hands come into frame, natural micro-movement* | 6s |
| B | Shot-3 still | Shot-4 still | *hand sets phone down and exits frame, camera holds, light shifts warmer to cooler across the table* | 4s |
| C | Shot-5 still | Shot-6 still | *subtle lean toward screen, expression shifts from neutral to concern, minimal camera drift* | 4s |
| D | Shot-7 still | Shot-8 still | *cut on action — hands typing to hands reaching for phone, matched motion* | 4s |
| E | Shot-8 still | end card | *subject raises phone to ear, slow pull back, dissolve* | 3s |

**Note on clip B:** the light shift carrying hours of passing time is the single
most important motion in this commercial. If Seedance won't hold it, shoot or
composite it as a **time-lapse of light across a table** — a practical solution
that will likely look better anyway.

## Editing notes

- Shot 4 must be **uncomfortably long**. Four seconds of nothing. Every instinct
  in the edit will say trim it. Don't.
- Never show the woman upset. The failure is the software's, and her dignity is
  the point.
- The AI interface in shot 6 must be **unreadable**. The moment is about the
  builder's judgment, not the tool.
- No triumphant music when the fix lands. It's a correction, not a victory.

## Call to action

**Bring your idea. AIR helps you move it forward.**
Secondary: *AI Readiness · sponsored by Digi2U.org*

## Versions

| Version | Spec | What changes |
| --- | --- | --- |
| **30s master** | 1920×1080, 24fps | As scripted |
| **15s cutdown** | 1920×1080 | Shots 1, 3, 4, 6, 8, 9. VO: lines 2 and 5 only. The silence at shot 4 shortens to 2s but stays. |
| **9:16 vertical** | 1080×1920 | Tighter on hands and faces. Shot 4 reframes to a vertical of the phone on the table with empty space above. |
| **16:9 landscape** | 1920×1080 | Master. |
| **Silent captioned** | 1080×1080 / 1080×1350 | VO as text cards. Shot 4 gets a full-screen card: *"No call came."* held 3s. |

## Accessibility notes

- Burned-in captions, pale on dark, min 44px at 1080.
- Closed captions must include `[silence]` and `[low sustained tone]` — the sound
  design carries meaning.
- **Audio description essential:** a blind viewer cannot see that nothing happens
  in shot 4. Describe: *"The phone sits untouched. Light moves across the table.
  No one calls."*
- The commercial depicts a form failing. Do not make the on-screen error text the
  only signal — the woman reaching for the phone carries it visually.
- No strobing, no rapid cuts.

## Social caption

> The screen said it worked.
> It didn't.
>
> No tool caught that. A person did — by trying to break their own work.
>
> That's what AI readiness actually is.
>
> AIR — AI Readiness. Sponsored by @digi2u
>
> #HumanBeforeTool #AIReadiness #Digi2U

## Thumbnail / poster concept

The phone alone on the kitchen table, raking light, empty chair behind it. Deep
shadow. No people, no interface.

Overlay bottom-left, small: *"The screen said it worked."*
Below, heavier: **IT DIDN'T.**

Restraint is the hook. In a feed of bright AI promises, an empty table stops the
scroll.

---

## Production dependencies

- ComfyUI on the Windows 4090 — not yet reachable
- Higgsfield — live
- LoRA transfer to Windows box
- **Sensitivity check:** ACAI's real clients are vulnerable adults. Confirm with
  ACAI before implying their form ever failed a real person — the critique was
  found in review, and the commercial should be framed as *how the work is done*,
  not as a real client harm. **Flag for approval.**
