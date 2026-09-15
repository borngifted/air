# The AiR Learning Protocol

Source of truth for what AiR is, as of 2026-09-15. Every page, activity, and lesson should be checked against this document. Where older material (the four-move curriculum, the twelve video lessons) disagrees with it, this document wins.

## One rule

**Don’t explain AI.**

No presentation. No “What is AI?” lesson. No vocabulary sheet. No tutorial. No instructor standing in front of the room explaining prompting.

Instead: create situations. Watch what people do. Capture their decisions. Then introduce interventions that force them to reconsider those decisions.

The teaching material comes from what happens in the room, not from information prepared beforehand.

## The method: six actions

| Action | What it means |
|---|---|
| **Expose** | Reveal how people currently think without asking them to explain it. Give them an unfamiliar problem and observe what they reach for. |
| **Disrupt** | Remove their normal solution. If everyone reaches for ChatGPT, take ChatGPT away. If everyone wants Google, remove search. If they rely on prompts, prohibit written prompts. |
| **Explore** | Give access to materials, people, AI, cameras, objects, markers, computers, whatever is available, with very few instructions. |
| **Collide** | Combine ideas that normally would not meet. A filmmaker works with someone into sports. Someone who draws works with someone who hates drawing. A human solution collides with an AI solution. |
| **Reflect** | Not a worksheet. People leave evidence: voice notes, screenshots, discarded attempts, recordings, drawings, prompts, conversations. |
| **Evolve** | Run the challenge again and see whether behavior changes. This is how you know a mindset shifted. |

**Don’t ask questions. Create decisions.**

## The protocol, against the usual shape of school

| | Chain | Roles |
|---|---|---|
| School | Information → Instruction → Assignment → Answer → Grade | Teacher → Student |
| AiR | Unknown → Choice → Attempt → Friction → Discovery → Creation → Change | Environment Designer → Explorer |

The facilitator designs conditions where discovery happens. AI is not the subject. AI is one of the things inside the environment. The real thing being developed is adaptive thinking.

## The test for every activity

> Could this activity exist in a normal classroom?

If yes, redesign it. If AiR is supposed to change how people think, the way they learn has to change first.

## Core situations

**Three stations.** Three spots on the floor: DO IT MYSELF, DO IT WITH AI, LET AI DO IT. “You have 10 seconds. Choose.” Record where everyone goes. Give a challenge. Repeat the exact choice 45 minutes later. The movement of the room is the data. No survey.

**The walls.** One wall says I KNOW, one says I THINK I KNOW, one says I HAVE NO IDEA. Read statements: “AI understands you.” “AI is creative.” “AI will replace jobs.” “AI makes you smarter.” “AI can have original ideas.” People stand where they belong. Do not say who is right. Photograph the room. Repeat later. The two photos show whether perspectives moved.

**Controlled confusion.** Five teams get the same mysterious output without being told how it was produced. The job is not to name the software. The job is to figure out what happened. Investigate any way: search, ask AI, inspect metadata, ask a person, recreate it, or decide the question itself is wrong. You are studying how they approach the unknown.

**Impossible instructions.** “Make something you’ve never seen before.” When someone searches for references, stop them: “If you’re looking at somebody else’s solution, how are you going to make something you’ve never seen?” Then give them AI with one condition: you cannot ask it to show you an example. AI becomes a thinking partner, not an imitation machine.

**AI cannot answer.** For fifteen minutes, AI is not allowed to answer. It can only ask. “Help me make a clothing brand.” → “Who should want to wear it?” → “What should someone feel when they see it?” → “What do you hate about existing clothing brands?” AI stops being the answer machine and becomes the thinking machine.

## What we capture

We do not grade. We observe the learning process. That observation is the research that builds AiR.

| Evidence | What it reveals |
|---|---|
| First action | Default problem-solving behavior |
| First AI request | How they conceptualize AI |
| Abandoned attempts | Experimentation tolerance |
| Tool switching | Adaptability |
| Questions asked of other people | Collaboration |
| What they save | What they value |
| Final decision | Judgment |
| Second attempt | Whether learning occurred |

People do not need to be told these are being watched.

## The room is the interface

No rows of chairs. Objects, QR codes, images, unfinished artwork, screens, headphones, strange instructions, physical spaces. The room asks for decisions before anyone speaks.

## What this changes in the product

- The public site runs situations (three stations, the walls) instead of explaining the method. See `client/src/pages/Home.tsx` and `client/src/content/siteCopy.ts`.
- `/situations` is the facilitator-facing library of conditions. `/why` holds the “born in winter” story for events.
- The twelve member lessons at `/curriculum` (four moves: Clear, Direct, Judge, Make) were rewritten as situations on 2026-09-15 in `server/content.ts`. Each checkpoint follows the chain Unknown → Choice → Friction → Creation → Change; the three levels are alone, with one real person, or run it for a room. The video is the walk-in, not the lesson.
- Facilitators are Environment Designers. Their training is in `docs/environment-designer-training.md`.
