# AiR: Flow With AI

**Source of truth for the whole AiR program, as of 2026-09-15.** Every page, lesson, trainer resource, and activity is checked against this document. It replaces the AiR Learning Protocol (`air-learning-protocol.md`, now superseded). The two PDFs it is transcribed from ship with the site at `/media/AiR_Flow_With_AI_One_Hour_Class.pdf` and `/media/AiR_Competition_Instructor_Talking_Points.pdf`.

**Theme: Clear the AiR. Then Make Something.**

## Simple purpose

AiR teaches students how to communicate with artificial intelligence, not simply how to use it.

Students learn four easy moves:

| Move | Student-friendly meaning |
|---|---|
| **CLEAR** | Know what you want. Decide exactly what you want. |
| **DIRECT** | Explain it clearly to AI. Give AI clear instructions. |
| **JUDGE** | Check what AI got right or wrong. |
| **MAKE** | Improve and complete the result until it is useful. |

> AI creates the draft. You provide the direction, judgment, and final decision.

## The one-hour high school experience

| | |
|---|---|
| Participants | 20 students |
| Teams | 4 teams of 5 students, 1 captain each |
| Opening and team setup | 15 minutes |
| Core lesson | 45 minutes |

### 0–5 minutes: Welcome and team formation

As students enter, display two images on the board: one distinctive car and one distinctive house.

Say: **“Today, you are not just learning about AI. You are competing to see which team can communicate with it most effectively.”**

Divide into four teams of five. Each team chooses a team name, selects a captain, sits or stands together, and chooses the car or the house challenge. The captain keeps the team organized, but every student must participate.

### 5–15 minutes: Explain the AiR mission

Ask: **“If AI is so smart, why doesn’t it always give us exactly what we want?”** Allow two or three answers.

Explain: **“AI cannot read your mind. The result is only as clear as the direction you give it. Learning to flow with AI means knowing what you want, communicating it clearly, checking the result, and improving it.”**

Introduce the four moves (table above).

Quick example.
Weak prompt: “Create a cool car.”
Clearer prompt: “Create a red two-door sports car with black wheels, a low roof, narrow headlights, tinted windows, and a large rear spoiler.”

Ask: **“Which prompt gives AI a better chance of creating the right car, and why?”**

### 15–20 minutes: Explain the Prompt Relay

Each team must use AI to recreate the car or house on the board. The goal is not to make something attractive. The goal is the closest match to the reference image.

The challenge:
- Teams may study the reference image.
- They cannot upload or photograph the image for AI.
- They must recreate it using written prompts only.
- Every student must contribute.
- Teams receive a limited number of AI generations.
- The closest final result wins.

Say: **“Seeing something is easy. Clearly communicating what you see takes observation, teamwork, and judgment.”**

### 20–35 minutes: The Prompt Relay

Each student takes one role.

| Student | Role | Move | Job |
|---|---|---|---|
| 1 | **The Observer** | Clear | Studies the image: What is it? Main shape? Colors? What makes it distinctive? What is in the background? Cannot write the whole prompt alone; helps the team decide what matters most. |
| 2 | **The Designer** | Direct | Turns the observations into the first prompt using the structure: “Create a [subject] that is [color and shape]. It has [important features]. Show it from [view or angle]. Place it against [background]. Use a [realistic, illustrated, futuristic, or other] style.” |
| 3 | **The AI Operator** | Make | Enters the prompt and displays the first result. The team compares it with the reference. |
| 4 | **The Quality Checker** | Judge | Asks: What did AI get right? What did AI miss? What is the biggest difference? What should be added, removed, or changed? Must give specific corrections, not “it doesn’t look right.” |
| 5 | **The Finisher** | Improve | Writes the revision prompt with the team: “Keep the same car, but make the roof lower, change the wheels to black, make the headlights narrower, remove the background buildings, and show the car from the front-left angle.” The team generates its revised image. |

The captain keeps everyone involved, watches the time, makes sure instructions are specific, selects the team’s final image, and gives the short presentation. If time permits, teams rotate roles for one final revision.

### 35–45 minutes: Final revision

Before generating, each team answers:
1. What is the largest difference between our image and the reference?
2. What exact words could correct it?
3. What should remain unchanged?
4. Are we improving the image, or accidentally making it worse?

Coaching cue: **“Keep everything else the same, but…”** Controlling AI often means focused changes instead of starting over.

If a team says “make it better,” ask: “What one exact change do you want?” If AI gets it wrong, say: “The mistake shows what your directions were missing.”

### 45–52 minutes: Team presentations

Each captain gets about one minute:
- What did your team try to create?
- What was your first prompt?
- What did AI misunderstand?
- How did your team improve the prompt?
- What did you learn about communicating with AI?

Display the reference and each team’s final image side by side.

### 52–56 minutes: Score and celebrate

| Category | Points |
|---|---|
| Similarity to the reference image | 10 |
| Clear and detailed prompting | 5 |
| Improvement between attempts | 5 |
| Teamwork and participation | 5 |
| Explanation of their process | 5 |
| **Total** | **30** |

Three recognitions: **AiR Challenge Champion** (closest overall match), **Best Prompt Engineers** (clearest instructions), **Best AI Comeback** (greatest improvement from first to final image). Small prizes: certificates, snacks, AiR wristbands, or the winning image featured on the AiR website or social media, with school and parent approval.

### 56–60 minutes: Connect AiR to real life

The same four moves work beyond image generation.

| Personal life | School | Future careers |
|---|---|---|
| Plan a personal goal · Create a workout or meal plan · Organize a schedule · Develop a creative hobby · Compare choices before a decision | Understand difficult subjects · Create study guides · Practice for tests · Brainstorm project ideas · Improve writing without letting AI do all the thinking | Explore careers · Practice interviews · Build résumés · Design products · Develop business ideas · Create marketing campaigns · Solve workplace problems |

Safety reminder: **Never automatically trust an AI answer. Check important information, protect personal information, follow school rules, and use your own judgment.**

### Closing activity: the One-Move Challenge

Each student completes: **“This week, I can use AI to help me __________.”** Invite four or five to share.

Close: **“You do not need to become an AI expert today. You need to know your purpose, give clear direction, challenge the result, and make something useful. That is how you flow with AI.”**

Final call-and-response:
- Instructor: “What comes before the tool?” Students: **“Purpose!”**
- Instructor: “Who makes the final decision?” Students: **“We do!”**
- Instructor: “Clear the AiR…” Students: **“…then make something!”**

## What this means for the product

- The public site tells the Flow With AI story: the mission, the four moves, the one-hour class, the Prompt Relay, scoring, real life, and the close. Home is `client/src/pages/Home.tsx`; copy lives in `client/src/content/siteCopy.ts`.
- `/class` is the full one-hour plan with instructor talking points and both PDFs for download.
- The twelve member lessons in `server/content.ts` teach the four moves as defined here, three lessons per move, anchored on the Prompt Relay and carried into personal life, school, and careers.
- Trainer resources (`trainerResourceSeeds`) hold the run of show, roles, scoring, and adaptations for other ages.
- The former protocol activities (three stations, the walls, and friends) remain at `/situations` as optional facilitator warm-ups. They are not the method.
