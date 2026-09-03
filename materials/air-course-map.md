# AIR — Experience Map

Phase 2 deliverable. Built on `AIR_PROJECT_INVENTORY.md`.

---

## The recommended structure

**Not eight weeks. Six experiences, entered in any order, plus one that has to
come first.**

The audit changed the proposed journey. The original outline had eight steps,
several of which are attitudes rather than activities — *See the Possibility* and
*Choose Your Mission* are things that happen **inside** an experience, not
sessions of their own. Made into standalone steps they become lectures, which
the brief rules out.

What the projects actually support is **six making sessions**, each ending in a
finished thing, plus a short opener that is not a lesson at all.

| # | Experience | Case study | Original step it absorbs |
| --- | --- | --- | --- |
| **00** | **Clear the Air** *(the opener — 20 min, no project)* | — | 1 |
| **01** | **Say It So They Get It** | ACAI Home Help | 3 + 6 |
| **02** | **Five Pages Out of Twenty** | Digi2U 2026 | 2 + 5 |
| **03** | **Make It Look Like You Meant It** | R&R Brand Book | 5 |
| **04** | **Show Me the Scene** | Narcissistic Insanity | 4 |
| **05** | **Stop Doing It By Hand** | MOKIPOPS Reel | 7 |
| **06** | **Put It in the World** | Demo Reel + Affirm' | 8 |

**Why order barely matters.** Each is self-contained and ends in something
finished. A person who only ever does 01 has still made a thing that helps
somebody. That is the whole promise — not completion of a syllabus.

**Why 00 comes first.** Everything else assumes you have one goal in mind. If
someone arrives carrying eleven open tabs and a vague sense of falling behind,
they will pick the wrong mission and blame themselves. Twenty minutes of
clearing costs nothing and changes every session after it.

---

## Experience 00 — Clear the Air

**Not a lesson. A clearing.** No project, no tool, no output beyond one written
sentence.

The learner lists every AI thing they have been told they should be doing.
Crosses out everything that is somebody else's goal. Crosses out everything that
is a tool name rather than an outcome. Whatever survives gets written as one
sentence beginning **"I want to make ___ so that ___ can ___."**

That sentence is the ticket into every other experience.

**Explore** — say it out loud to somebody instead of writing it.
**Create** — write it, then cut it in half.
**Build** — write three, then rank by who is actually waiting for it.

**Clear the Air moment:** the belief that falling behind on tools is the problem.
The people doing the best AI work are not using the most tools.

---

## Experience 01 — Say It So They Get It

> *A nonprofit needs to explain a program to the community.*

**Case study: ACAI Home Help.** A Michigan benefits programme, written in
language the people who need it cannot read, rebuilt so they can.

**Why this is the strongest opener.** It carries a **documented critique cycle** —
the README's *"July 10 critique — resolved"* section. The form now confirms
receipt before showing success, with an error fallback pointing to a phone
number. That is a real human decision about a real failure mode, made for an
audience who cannot afford a silent error. Most curricula have to invent that
moment. Here it is in the commit history.

It also carries the strongest **Challenge the Result** material in the portfolio,
because the audience is old, stressed, often disabled, and often on a phone. Any
sloppiness is immediately consequential.

**Mission:** take something official and unreadable, and make one page that a
worried person understands in a single read.

**AI's honest role:** rewriting and simplifying. **Human's:** deciding what
matters most, and what happens when it breaks.

Full write-up in `AIR_EXPERIENCE_01.md`.

---

## Experience 02 — Five Pages Out of Twenty

> *Someone needs to turn scattered information into an accessible resource.*

**Case study: Digi2U 2026.** ~20 pages condensed to 5. **Nothing deleted** —
detail moved into lightboxes. The homepage rebuilt as a nine-beat story:
*Opportunity → Mission → Programs → Hands On → Impact → Voices → Vision →
Community → Join.*

**The lesson:** condensing is not deleting. Everything true stayed true; it moved
behind a click. The skill is deciding what earns the first screen.

**Mission:** take something with too many pages and make one page that carries
all of it — with the detail one click away, not gone.

**Clear the Air:** "more information is more helpful." Twenty pages of true
information that nobody reads helps no one.

**Human before tool:** AI can compress text. It cannot decide that *Voices of
Impact* should come after *Impact* rather than before, because that is a judgment
about how belief is built in a reader.

**Paths** — *Explore:* one cluttered flyer, one sentence that matters most.
*Create:* a real multi-page document to one page, detail behind clicks.
*Build:* reproduce the video pipeline — tone-map 10-bit HLG to Rec.709 under 3 MB.

**Note:** the repo does not document AI involvement. Teach this as a
**structure and editorial** case, not an AI case, until confirmed.

---

## Experience 03 — Make It Look Like You Meant It

> *A small business needs a clear promotional visual.*

**Case study: R&R Global Logistics Brand Book.** Twelve full-viewport screens,
scroll-driven, GSAP and Lenis, and — the part that matters most — *keyboard
navigable, reduced-motion aware.*

**Why this one has no AI in it, on purpose.** It is the proof that **design
judgment is the skill and the tool is incidental.** A learner who thinks AI makes
things look good needs to see something that looks good because a person made
decisions.

**Mission:** take something you made that works but looks unconsidered, and make
deliberate choices about hierarchy, contrast, alignment, repetition, proximity,
whitespace, type, and colour.

**Challenge the Result** lands hardest here: honouring `prefers-reduced-motion`
on a motion-heavy site is a real cost paid for people who get sick from parallax.
Nobody would notice if it were skipped. It wasn't.

**Paths** — *Explore:* three rules a favourite brand never breaks.
*Create:* a one-page brand sheet, then apply it to something existing.
*Build:* scroll-triggered motion that honours reduced-motion — then turn the
setting on and verify.

---

## Experience 04 — Show Me the Scene

> *A filmmaker needs to develop or visualize a scene.*

**Case study: Narcissistic Insanity VFX Hub.** Forty shots, priority-sorted, six
recurring FX systems, an AGI character with **ElevenLabs voice across 39 cues**,
and a Higgsfield character-image plan.

**Why it teaches well:** the film is *about* an AI character, and AI made the
character's voice. Tool and subject are the same material — which forces the
question of when that is powerful and when it is a shortcut.

**Mission:** take an idea that only exists in your head and make six frames
somebody else can understand.

**Clear the Air:** the belief that you need the whole film. You need six frames.

**Human before tool:** which shots are previs-critical, which effects group into
a system, what the character sounds like. The AGI voice was *chosen* — a
different voice would make a different film.

**Paths** — *Explore:* storyboard one scene as six frames.
*Create:* a shot list tagged by what needs help.
*Build:* a character reference sheet with consistent identity across angles, then
chain frames into motion using the **`affirmations` method** — `start_image` →
`end_image` interpolation, each clip ending where the next begins.

---

## Experience 05 — Stop Doing It By Hand

> *A creator has too many tools and no consistent workflow.*

**Case study: MOKIPOPS Living Brand Reel.** 70 commits. `content.json` holds the
content, `build.py` renders the page, `add.py` adds a video or track or image and
encodes it automatically. The brand kit is enforced **in the renderer**, so it
cannot drift.

**The lesson:** the brand kit being in the build is the whole idea. You cannot
accidentally break a rule that a program applies for you.

**Mission:** find the thing you do repeatedly and make it take one command.

**Clear the Air:** "automation is for programmers." Separating your content from
your presentation is an organising idea, not a coding one — a folder and a
naming convention is a real version of it.

**Paths** — *Explore:* list every tool used on a recent project, cross out
everything used once.
*Create:* a three-step process you can hand to somebody else — run it twice.
*Build:* content file, renderer, one publish command.

---

## Experience 06 — Put It in the World

> *A student needs to present their abilities to an employer.*

**Case studies: Demo Reel and Affirm'.**

*Demo Reel* — 1:09, real credits (*The Conspirators*, *Double Cross* S5 on ALLBLK,
*A Stranger In My Bed*, *Passengers*), original score generated for the cut.
Selection is the craft: 1:09 out of years of work.

*Affirm'* — poses via Higgsfield `nano_banana_pro`, one master plus twelve
reference-locked variants; motion via Seedance 2.0 `start_image` → `end_image`
interpolation, chained. Ambitious AI use, shipped and public.

**Mission:** finish one thing and give it to a real person. Not a folder. A link.

**Clear the Air:** "it's not ready." A 1:09 reel is not everything he has made.
It is what he chose.

**Challenge the Result** — before it goes out: is it accurate, does it credit
correctly, is it accessible, does it work on a phone, would you send it to
someone whose opinion you care about?

**Paths** — *Explore:* show a finished thing to one person and write down what
they said.
*Create:* publish one thing with a real URL.
*Build:* publish it self-contained so it cannot break when a service disappears.

---

## Case studies mapped to the ten scenarios

| Scenario from the brief | Experience | Case study |
| --- | --- | --- |
| Student presents abilities to an employer | 06 | Demo Reel |
| Small business needs a clear promotional visual | 03 | R&R Brand Book |
| Nonprofit explains a program to the community | **01** | **ACAI** |
| Filmmaker develops or visualizes a scene | 04 | Narcissistic Insanity |
| Family restores or reinterprets a photograph | 04 *(Explore)* | Affirm' method |
| Creator has too many tools, no workflow | 05 | MOKIPOPS |
| Educator explains a complicated idea simply | 02 | Digi2U |
| Scattered information → accessible resource | 02 | Digi2U |
| Community organization needs a campaign | 06 | Affirm' |
| Evaluate whether AI output is accurate and useful | **01** | **ACAI critique cycle** |

Ten scenarios, six experiences, every one anchored to a real repository.

---

## What is deliberately absent

No certificates, grades, tests, badges, percentages, streaks, modules, or
lectures. No prompt libraries to memorise. No tour of twelve platforms.

Progress is visible as **things you have made**, and nothing else.

---

## Recommended build order

1. **`AIR_EXPERIENCE_01.md`** — ACAI, complete *(Phase 3)*
2. **Interactive prototype** of Experience 01 *(Phase 4)*
3. Experiences 02–06 written, once 01's shape is validated in use
4. Experience 00 last — the opener is easiest to write after the rest exist

Writing 01 before the others is deliberate. It is the hardest one, and if its
shape holds, the remaining five follow the same skeleton.
