# AIR — Five Commercials

Phase 6 deliverable. Scripts complete; **nothing approved for final generation.**

**AIR — AI Readiness**, sponsored by **Digi2U.org**

---

## The set

| # | Title | Anchor project | Emotional shift | Closing line |
| --- | --- | --- | --- | --- |
| 01 | **Clear the Air** | MOKIPOPS Reel | overwhelm → stillness → resolve | *Clear the air. Start with what matters.* |
| 02 | **Human Before Tool** | ACAI Home Help | efficiency → responsibility | *Before the prompt, there is a purpose.* |
| 03 | **Made for Every Mind** | Digi2U 2026 | exclusion → belonging | *Eight to a hundred. Curiosity has no age limit.* |
| 04 | **Challenge the Result** | R&R Brand Book + ACAI | impressed → suspicious → capable | *Don't just accept the result. Direct it.* |
| 05 | **Put It in the World** | Demo Reel + Affirm' | potential → completion | *Ideas need more than potential. Put yours in motion.* |

Each has a 30s master, 15s cutdown, 9:16 vertical, 16:9 landscape, and a
silent-captioned social version.

---

## How the five work as a campaign

They are **not five variations on one message.** They form an argument, in order:

1. **01** removes the noise so a goal can exist
2. **02** establishes that the human decision is the valuable part
3. **03** removes the excuse that this is for other people
4. **04** teaches the skill that makes AI work trustworthy
5. **05** demands that something actually ship

Run in sequence, they take a viewer from paralysed to published. Run
individually, each still holds — but 05 is the closer and should never lead.

## Deliberate absences

No AI interface is ever the hero shot. No robots, glowing brains, circuit boards,
blue neon, code rain, or holographic UI appear anywhere in the set. Those are
banned in every ComfyUI negative prompt.

**Why:** the category's visual language sells the tool. AIR sells the person
using it. If our commercials look like everyone else's, the message contradicts
the frames.

## Tone guardrail

The brief asks for the ambition and emotional confidence of a world-class
motivational brand. It also forbids imitating anyone's protected identity.

The line held throughout: **short declarative sentences, second person, present
tense, no borrowed slogans, no borrowed typography, no borrowed music cues, no
athlete-hero framing.** AIR's distinctiveness comes from the *quiet* — where the
category shouts, AIR stops and holds a silence. That is an original position, not
a borrowed one.

---

## Production notes carried across all five

### Casting

Digi2U serves Flint and Genesee County. The LoRA
`Noerman_African_American_Lifelike` (and `EbonyGoldAI` where appropriate) should
be used across the campaign. A campaign about *every mind* that shows one
demographic argues against itself in its own frames.

**This is checked at approval, not assumed.**

### Practical over generated

Three shots in the set are cheaper, faster, and better shot practically than
generated:

| Shot | Why practical wins |
| --- | --- |
| C01 clip B — the hard stop | One frame of black in the edit beats fighting a model |
| C02 clip B — light moving across a table | A real time-lapse looks right; a generated one won't |
| C05 clip E — stranger stops at a poster | Print it, mount it, film someone. One afternoon. |

**Do not burn credits fighting these.** The instruction to prefer generation
does not survive contact with the fact that a person walking up to a wall is a
solved problem with a camera.

### Sound

Four of five use **silence as a structural element** — the 13s cut in 01, the
held nothing in 02, the music drop at 27s in 05. Captions must mark these
`[silence]`, because silence is content and a deaf viewer needs to know it is
deliberate.

No trap beats, no synth risers, no whoosh transitions. The category is saturated
with them and they read as hype.

### Accessibility

Every commercial carries burned-in captions on silent versions, closed captions
on all versions, and an audio description track. **02, 04 and 05 cannot be
understood without audio description** — their payoffs are visual events with no
dialogue. That is not an add-on; those AD scripts are part of the deliverable.

---

## Ethical flags requiring sign-off

**Commercial 02 — ACAI depiction.** The script dramatises a form failing a
caregiver. The real critique was found in internal review, not by a client being
harmed. Frame it as *how the work is done*, and confirm with ACAI before
publishing anything that could read as a real client failure.

**Commercial 04 — deliberately flawed image.** The script generates an image with
poor representation and anatomical errors in order to critique it. That is
defensible as teaching. The flawed image must **never** appear standalone, in a
thumbnail crop that loses the annotation, or in any context without its critique.

Both belong on the approval checklist before anything publishes.

---

## Asset naming

```
AIR-C0{n}-{seq}          e.g. AIR-C01-001
```

Version suffix `-v01`, `-v02`. Format suffix `-16x9`, `-9x16`, `-1x1`, `-4x5`,
`-silent`.

Folder per commercial, thirteen subfolders each:
`brief · script · storyboard · comfyui · higgsfield · video · audio · captions ·
thumbnails · social-copy · exports · approvals · analytics`

---

## Status

| Stage | State |
| --- | --- |
| Scripts | **complete — all five** |
| Storyboards | not started |
| ComfyUI reference frames | blocked — Windows 4090 not yet reachable on LAN |
| Higgsfield motion | **chaining test in progress** (4 clips + 3 transitions) |
| Edit, sound, captions | not started |
| Approvals | not started |
| Scheduling (Blotato) | not started |

**Nothing publishes without explicit human approval.** No social account is
connected to an automated path.
