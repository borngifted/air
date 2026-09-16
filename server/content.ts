import type { CheckpointOption } from "../drizzle/schema";

// The twelve member lessons teach the four moves of AiR: Flow With AI.
// Source of truth: docs/air-flow-with-ai.md. Each move has three lessons. Every lesson
// is practiced first in the Prompt Relay (recreate a car or a house with written prompts
// only), then carried into personal life, school, and future careers.

export type SeedCheckpoint = {
  kind: "prediction" | "choice" | "reflection" | "exercise" | "commitment";
  title: string;
  prompt: string;
  helperText?: string;
  options?: CheckpointOption[];
  atSeconds?: number;
};

export type SeedExercise = {
  mode: "explore" | "create" | "build";
  title: string;
  prompt: string;
  instructions: string;
  evidenceLabel: string;
};

export type SeedLesson = {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  summary: string;
  story: string;
  bigIdea: string;
  learnerPromise: string;
  durationMinutes: number;
  discussionPrompt: string;
  checkpoints: SeedCheckpoint[];
  exercises: SeedExercise[];
};

export type SeedModule = {
  slug: string;
  title: string;
  summary: string;
  lessons: SeedLesson[];
};

export type SeedPath = {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  summary: string;
  description: string;
  promise: string;
  accent: string;
  modules: SeedModule[];
};

// Three levels inside every lesson. explore = guided, a finished thing at the end.
// create = a real project with a real audience. build = a workflow for a real goal.
const modes = (
  explore: Omit<SeedExercise, "mode">,
  create: Omit<SeedExercise, "mode">,
  build: Omit<SeedExercise, "mode">,
): SeedExercise[] => [
  { mode: "explore", ...explore },
  { mode: "create", ...create },
  { mode: "build", ...build },
];

const checkpoints = (input: {
  prediction: string;
  choices: CheckpointOption[];
  reflection: string;
  exercise: string;
  commitment: string;
}): SeedCheckpoint[] => [
  {
    kind: "prediction",
    title: "Before we begin",
    prompt: input.prediction,
    helperText: "There is no grade here. Make your best guess, then stay curious.",
    atSeconds: 0,
  },
  {
    kind: "choice",
    title: "Make the call",
    prompt: "Which move fits best?",
    options: input.choices,
    atSeconds: 45,
  },
  {
    kind: "reflection",
    title: "Notice your thinking",
    prompt: input.reflection,
    helperText: "One or two honest sentences are enough.",
    atSeconds: 105,
  },
  {
    kind: "exercise",
    title: "Try the move",
    prompt: input.exercise,
    helperText: "Start small. A clear first version beats a perfect idea in your head.",
    atSeconds: 180,
  },
  {
    kind: "commitment",
    title: "This week",
    prompt: input.commitment,
    helperText: "Make the next move specific enough to do.",
    atSeconds: 240,
  },
];

export const curriculum: SeedPath[] = [
  {
    slug: "clear",
    number: "01",
    title: "Clear",
    kicker: "Know what you want",
    summary: "Decide exactly what you want before anyone types. The Observer’s move.",
    description: "AI cannot read your mind. The result is only as clear as the direction you give it. Clear is the move where you study what you are trying to make and decide what matters most.",
    promise: "Leave able to look at anything, a picture, a goal, an assignment, and say exactly what matters most about it.",
    accent: "#D8FF45",
    modules: [
      {
        slug: "clear-the-noise",
        title: "The Observer",
        summary: "Know what you want. See it clearly. Decide what matters most.",
        lessons: [
          {
            slug: "clear-the-air",
            number: "01.1",
            title: "A Cool Car Is Not a Prompt",
            kicker: "Decide exactly what you want",
            summary: "Why AI does not give you what you want, and the one sentence that fixes it.",
            story: "If AI is so smart, why doesn’t it always give us exactly what we want? Picture two teams at the board. One types “Create a cool car.” The other types “Create a red two-door sports car with black wheels, a low roof, narrow headlights, tinted windows, and a large rear spoiler.” Both hit enter. Only one team knew what they wanted before they typed.",
            bigIdea: "AI cannot read your mind. The result is only as clear as the direction you give it.",
            learnerPromise: "Turn a vague wish into a clear description of exactly what you want.",
            durationMinutes: 9,
            discussionPrompt: "Which prompt gives AI a better chance of creating the right car, and why?",
            checkpoints: checkpoints({
              prediction: "Two teams type “a cool car” and “a red two-door sports car with a large rear spoiler.” Which team gets closer to what they pictured?",
              choices: [
                { label: "Type fast and fix it later", value: "fast", feedback: "Every generation you spend guessing is one you cannot spend improving." },
                { label: "Decide exactly what you want first", value: "clear", feedback: "Yes. Clear is the first move because it makes every other move possible." },
                { label: "Ask AI to decide what is cool", value: "ai", feedback: "Then it decides for you. You provide the direction, judgment, and final decision." },
              ],
              reflection: "Think of the last time AI gave you something you did not want. What did you leave out of the ask?",
              exercise: "Rewrite “make me a cool car” as one sentence that names color, shape, three features, and a background.",
              commitment: "Name one thing you want AI’s help with this week and write exactly what you want before you open any tool.",
            }),
            exercises: modes(
              { title: "Weak to clear", prompt: "Turn three weak prompts into clear ones.", instructions: "Start with “a cool house,” “a nice logo,” and “a good study plan.” Rewrite each so a stranger could picture the exact result. Underline every specific word you added.", evidenceLabel: "My three clear prompts" },
              { title: "Clear for a real person", prompt: "Decide exactly what you want for something you actually need.", instructions: "Pick a real task: a flyer, a schedule, a message. Write what you want in one paragraph: who it is for, what it must include, what it must not include, and what done looks like.", evidenceLabel: "My clear description" },
              { title: "The team brief", prompt: "Write the description a team could work from without you.", instructions: "For a real project, write the outcome, the audience, three must-haves, two must-nots, and the finish line. Hand it to someone and ask what is still unclear.", evidenceLabel: "My brief and the question it raised" },
            ),
          },
          {
            slug: "machines-make-guesses",
            number: "01.2",
            title: "The Observer",
            kicker: "Study the image",
            summary: "Study the reference like the Observer: what is it, shape, colors, what stands out, background.",
            story: "In the Prompt Relay, Student 1 is the Observer. The reference image is on the board. The Observer cannot upload it or photograph it for AI. They can only look and tell the team what they see: What is it? What is its main shape? What colors are present? What makes it distinctive? What is in the background? Seeing something is easy. Saying what you see takes practice.",
            bigIdea: "Seeing something is easy. Clearly communicating what you see takes observation, teamwork, and judgment.",
            learnerPromise: "Describe an image so precisely that a teammate could sketch it without looking.",
            durationMinutes: 10,
            discussionPrompt: "What detail did you notice only after you tried to describe the image out loud?",
            checkpoints: checkpoints({
              prediction: "Look at any picture for ten seconds. How many specific details do you think you can name without looking again?",
              choices: [
                { label: "Say the first thing you notice and move on", value: "first", feedback: "The first thing is usually the subject. AI needs the shape, colors, features, and background too." },
                { label: "Run the five Observer questions", value: "observer", feedback: "Yes. What is it, main shape, colors, what makes it distinctive, what is in the background." },
                { label: "Upload the photo instead", value: "upload", feedback: "In the relay that is not allowed. In real life you will often have to describe what is not in front of you." },
              ],
              reflection: "Which of the five questions was hardest to answer? Why?",
              exercise: "Pick a photo. Answer the five Observer questions in writing. Cover the photo and read your answers back.",
              commitment: "This week, describe one thing you see, a room, a product, a place, using all five questions before you ask AI for anything.",
            }),
            exercises: modes(
              { title: "Back-to-back describe", prompt: "Describe a picture to a partner who cannot see it.", instructions: "Sit back to back. Use the five Observer questions. Your partner sketches. Compare the sketch with the picture and circle what your words missed.", evidenceLabel: "The sketch and what my words missed" },
              { title: "Observe your own project", prompt: "Describe the finished thing you want before you make it.", instructions: "For a real project, write what it is, its main shape or structure, its colors or tone, what makes it distinctive, and the setting it lives in. Keep it under 120 words.", evidenceLabel: "My observation of the finished thing" },
              { title: "Observation checklist", prompt: "Build a reusable observation checklist for your kind of work.", instructions: "Adapt the five questions to your field: a product, a document, a design, a plan. Test the checklist on two real examples and note what it still misses.", evidenceLabel: "My checklist and its two tests" },
            ),
          },
          {
            slug: "choose-one-mission",
            number: "01.3",
            title: "Decide What Matters Most",
            kicker: "You cannot say everything",
            summary: "The Observer cannot write the whole prompt alone. The team decides what matters most.",
            story: "There are a hundred things you could say about the house on the board: the red door, the two chimneys, the round window, the porch, the oak tree, the cloud shaped like a fish. The relay gives you a limited number of generations. The Observer’s real job is not to list everything. It is to help the team decide which five details matter most, and to let the fish-shaped cloud go.",
            bigIdea: "Knowing what you want includes knowing what matters most. Choose the details that make it recognizable.",
            learnerPromise: "Rank details by how much they change the result, and cut the rest.",
            durationMinutes: 11,
            discussionPrompt: "What did your team cut, and did the final image miss it?",
            checkpoints: checkpoints({
              prediction: "You can only tell AI five things about the house. Which five make it the most recognizable?",
              choices: [
                { label: "List every detail you can see", value: "everything", feedback: "Long lists bury the important parts. AI treats a fish-shaped cloud and a red door as equals." },
                { label: "Rank details by how much they change the picture", value: "rank", feedback: "Yes. Shape, main color, and the one distinctive feature usually come first." },
                { label: "Let the loudest teammate decide", value: "loud", feedback: "Every student contributes. The captain makes sure of it." },
              ],
              reflection: "When you make something, what do you tend to over-describe, and what do you forget?",
              exercise: "Write ten details about a picture. Rank them. Cross out the bottom five. Write the prompt from the top five.",
              commitment: "Before your next real task, write the three things that matter most and the two things you will let go.",
            }),
            exercises: modes(
              { title: "Top five", prompt: "Cut a long description down to what matters.", instructions: "Describe a picture with ten details. Ask a partner to rank them by importance. Compare rankings. Agree on five. Notice what you both cut.", evidenceLabel: "Our top five and what we cut" },
              { title: "Must-haves for a real project", prompt: "Decide what your project cannot succeed without.", instructions: "List everything you want your project to have. Mark each Must, Nice, or Later. Rewrite your description using only the Musts.", evidenceLabel: "My Must list" },
              { title: "Priorities with a real person", prompt: "Let the person the work is for rank the details.", instructions: "Show your Must list to the person it is for. Ask them to reorder it. Record what they moved to the top and what they did not care about.", evidenceLabel: "Their ranking and what surprised me" },
            ),
          },
        ],
      },
    ],
  },
  {
    slug: "direct",
    number: "02",
    title: "Direct",
    kicker: "Explain it clearly to AI",
    summary: "Give AI clear instructions using the Designer’s structure. The Designer’s move.",
    description: "A prompt is not a magic spell. It is a set of directions for something that cannot see what you see. Direct is the move where you turn observations into the first prompt.",
    promise: "Leave with a prompt structure you can use for an image, an essay, a schedule, or a plan.",
    accent: "#18C98B",
    modules: [
      {
        slug: "give-direction",
        title: "The Designer",
        summary: "Explain it clearly. Use the structure. Make every generation count.",
        lessons: [
          {
            slug: "be-the-director",
            number: "02.1",
            title: "The Designer’s Structure",
            kicker: "Subject, look, features, angle, background, style",
            summary: "Turn the team’s observations into the first prompt with a six-part structure.",
            story: "Student 2 is the Designer. The Observer has said what matters. Now someone has to write it down so AI can act on it. The Designer uses one structure every time: Create a [subject] that is [color and shape]. It has [important features]. Show it from [view or angle]. Place it against [background]. Use a [realistic, illustrated, futuristic, or other] style. Six blanks. Fill them and you have a prompt.",
            bigIdea: "Explain it clearly to AI. Six blanks, filled in order, beat a clever sentence every time.",
            learnerPromise: "Write a first prompt from observations using the six-part structure.",
            durationMinutes: 12,
            discussionPrompt: "Which blank was hardest to fill, and what did your team put there?",
            checkpoints: checkpoints({
              prediction: "Which is more useful to AI: “make it look amazing” or “show it from the front-left against an empty road”? Why?",
              choices: [
                { label: "Write one long creative sentence", value: "creative", feedback: "Creativity belongs in the details, not in the structure. Structure keeps you from forgetting the angle." },
                { label: "Fill the six blanks in order", value: "structure", feedback: "Yes. Subject, color and shape, features, angle, background, style." },
                { label: "Type the Observer’s notes as they are", value: "notes", feedback: "Notes are for the team. The prompt is for the machine. Translate them." },
              ],
              reflection: "Which blank do you usually forget when you ask AI for something?",
              exercise: "Fill the six blanks for the car or house on the board. Read the finished prompt out loud to a teammate.",
              commitment: "Use the six-part structure for your next real request, even if it is not an image.",
            }),
            exercises: modes(
              { title: "Six blanks", prompt: "Write a first prompt for a picture using the structure.", instructions: "Pick any picture. Fill the six blanks. Have a partner read the prompt and draw what they picture. Compare with the original.", evidenceLabel: "My six-blank prompt and the drawing it made" },
              { title: "Structure for a real project", prompt: "Adapt the six blanks to what you are actually making.", instructions: "For a flyer, essay, or plan, rename the blanks: what it is, tone, must-include parts, point of view, where it will be used, format. Fill them. That is your prompt.", evidenceLabel: "My adapted structure, filled in" },
              { title: "Team prompt template", prompt: "Make a template your team can reuse.", instructions: "Write the six-blank structure for your kind of work with an example beside each blank. Test it with two people who were not there when you wrote it.", evidenceLabel: "My template and the two test results" },
            ),
          },
          {
            slug: "give-useful-context",
            number: "02.2",
            title: "Say It So AI Can See It",
            kicker: "Details that change the result",
            summary: "The words that change the picture: color, shape, angle, background, style. And what does not.",
            story: "Two prompts describe the same house. One says “a nice house with a door and windows.” The other says “a two-story white farmhouse with a red front door, two brick chimneys, a wraparound porch, seen from the street, with an oak tree on the left, in a realistic style.” AI can see the second house. It can only guess at the first. The difference is not length. It is which details you chose.",
            bigIdea: "Useful details change the result. Filler words do not. Say the things AI would otherwise have to guess.",
            learnerPromise: "Choose the details that change the result and leave out the ones that do not.",
            durationMinutes: 11,
            discussionPrompt: "Which single word in your prompt changed the picture the most?",
            checkpoints: checkpoints({
              prediction: "Which word changes an image more: “nice” or “red”? Which changes it more: “house” or “farmhouse”?",
              choices: [
                { label: "Add more adjectives like amazing and beautiful", value: "adjectives", feedback: "AI cannot draw “amazing.” It can draw “red,” “low,” and “narrow.”" },
                { label: "Name things AI would otherwise guess", value: "guess", feedback: "Yes. Color, shape, count, angle, background, style. If you do not say it, AI decides." },
                { label: "Paste in everything you know", value: "everything", feedback: "Length is not clarity. Extra details compete with the important ones." },
              ],
              reflection: "What did AI guess in your last result because you did not say it?",
              exercise: "Take a prompt and swap one word at a time: color, angle, background. Note what changes each time.",
              commitment: "This week, before you send a prompt, list three things AI would have to guess and add them.",
            }),
            exercises: modes(
              { title: "One-word swap", prompt: "Change one detail and watch the result move.", instructions: "Write a clear prompt. Generate or sketch it. Change only the color. Then only the angle. Then only the background. Keep the three results side by side.", evidenceLabel: "Three results and the word that changed each" },
              { title: "Context for a real task", prompt: "Give AI the facts that change your real result.", instructions: "For a message, plan, or design, list ten possible details. Mark each Changes the result, Does not matter, or Private. Use only the first group. Never include the third.", evidenceLabel: "My sorted details and the prompt I sent" },
              { title: "Context template", prompt: "Build a reusable context block for your work.", instructions: "Create labeled fields: audience, purpose, must-include, must-avoid, format, examples of good. Add a privacy rule. Use it on two tasks and record what it caught.", evidenceLabel: "My context template" },
            ),
          },
          {
            slug: "ask-for-options",
            number: "02.3",
            title: "Limited Generations",
            kicker: "Make every attempt count",
            summary: "Teams get a limited number of generations. Written prompts only. Every try has to teach you something.",
            story: "In the relay, every team gets a limited number of AI generations. No uploading the reference. No photographing it. Written prompts only. That limit is the lesson. When you cannot try fifty times, you stop guessing and start directing. A first attempt is not a wasted attempt if it shows you exactly what your words were missing.",
            bigIdea: "A limit on attempts turns guessing into directing. Make each prompt something you can learn from.",
            learnerPromise: "Plan a first prompt and a revision so two attempts do the work of ten.",
            durationMinutes: 10,
            discussionPrompt: "If you had only two generations, what would you put in the first one, and what would you save for the second?",
            checkpoints: checkpoints({
              prediction: "Your team has three generations. Do you spend the first on a full detailed prompt or a quick test? Why?",
              choices: [
                { label: "Fire off quick prompts and see what sticks", value: "spray", feedback: "With limited tries, spraying spends the budget before you learn anything." },
                { label: "Make the first prompt complete, then revise on purpose", value: "plan", feedback: "Yes. A complete first prompt shows you exactly what to change. A vague one shows you nothing." },
                { label: "Save all generations for the end", value: "hoard", feedback: "You cannot judge and improve what you have not seen. Use the first one early." },
              ],
              reflection: "When you have unlimited tries, do you direct more carefully or less?",
              exercise: "Write a first prompt and, before generating, write the revision you expect to need. Compare after.",
              commitment: "This week, give yourself a limit of two attempts on one real task and write both prompts before you start.",
            }),
            exercises: modes(
              { title: "Two tries", prompt: "Recreate a picture in exactly two prompts.", instructions: "Write prompt one using the structure. Generate or sketch. Write one revision. Generate again. Put reference, first, and final side by side.", evidenceLabel: "Reference, first, final" },
              { title: "Attempt budget for a real project", prompt: "Plan your attempts before you spend them.", instructions: "For a real task, decide how many drafts you will allow. Write what each draft is for: first draft to see, second to fix the biggest gap, third to finish. Stick to it.", evidenceLabel: "My attempt plan and what each draft taught me" },
              { title: "Written prompts only", prompt: "Describe something you cannot show.", instructions: "Pick a product, place, or design you can see but cannot upload. Get AI to recreate it in three prompts or fewer using words alone. Record which words did the most work.", evidenceLabel: "My three prompts and the words that worked" },
            ),
          },
        ],
      },
    ],
  },
  {
    slug: "judge",
    number: "03",
    title: "Judge",
    kicker: "Check what AI got right or wrong",
    summary: "Compare the result with what you wanted and name the differences. The Quality Checker’s move.",
    description: "The first image is a draft. Judge is the move where you put the result beside the reference and say, specifically, what AI got right, what it missed, and what changed.",
    promise: "Leave with a checking habit: right, missed, biggest difference, add or remove or change.",
    accent: "#FF8A6B",
    modules: [
      {
        slug: "challenge-the-result",
        title: "The Quality Checker",
        summary: "Check the result. Name the biggest difference. Judge against the goal, not taste.",
        lessons: [
          {
            slug: "spot-the-guess",
            number: "03.1",
            title: "The Quality Checker",
            kicker: "Right, missed, changed",
            summary: "The four Checker questions: What did AI get right? Miss? Biggest difference? Add, remove, or change?",
            story: "Student 4 is the Quality Checker. The first image is on the screen next to the reference. The Checker is not allowed to say “it doesn’t look right.” The Checker has to say what: “The wheels are silver, not black. The roof is too tall. It added buildings behind the car. It got the red and the spoiler right.” Specific corrections are the only kind the Finisher can use.",
            bigIdea: "Check what AI got right or wrong. “It doesn’t look right” is not a correction. Name the difference.",
            learnerPromise: "Compare a result with the goal and write specific corrections a teammate could act on.",
            durationMinutes: 12,
            discussionPrompt: "What did AI get right that you almost overlooked because you were looking for mistakes?",
            checkpoints: checkpoints({
              prediction: "AI shows you a car. Before you look for mistakes, what is the first thing you should check?",
              choices: [
                { label: "Say whether you like it", value: "like", feedback: "Liking it is taste. The Checker compares it with the reference." },
                { label: "Run the four Checker questions", value: "checker", feedback: "Yes. Right, missed, biggest difference, add or remove or change." },
                { label: "Start over with a new prompt", value: "restart", feedback: "Starting over throws away what AI got right. Judge first, then improve." },
              ],
              reflection: "When you review your own work, do you name specific problems or just feel that something is off?",
              exercise: "Compare any AI result with what you asked for. Write two things it got right and the single biggest difference.",
              commitment: "This week, before you accept anything AI gives you, write one line for each of the four Checker questions.",
            }),
            exercises: modes(
              { title: "Side by side", prompt: "Check an AI image against its reference.", instructions: "Put a reference and an AI result side by side. Answer the four questions in writing. Circle the one correction that would change the image most.", evidenceLabel: "My four answers and the circled correction" },
              { title: "Check a real draft", prompt: "Judge an AI draft you actually need.", instructions: "Ask AI for something real: a message, a plan, an outline. Check it against your clear description. Mark right, missed, biggest difference, and what to add, remove, or change.", evidenceLabel: "My marked-up draft" },
              { title: "Checker’s ledger", prompt: "Make checking visible for a team.", instructions: "Build a simple table: what we asked for, what we got, right, missed, biggest difference, correction. Use it on three outputs and hand it to whoever writes the revision.", evidenceLabel: "My ledger with three rows" },
            ),
          },
          {
            slug: "check-the-stakes",
            number: "03.2",
            title: "The Largest Difference",
            kicker: "Find the biggest gap first",
            summary: "Find the largest difference before the small ones. Then check harder when the stakes are higher.",
            story: "Before the final generation, every team answers one question first: What is the largest difference between our image and the reference? Not the ten small ones. The one big one. A car with the wrong body shape does not get fixed by changing the wheels. And when the result is not a car but a medicine dose, a legal form, or a fact for an essay, the same habit gets stricter: never automatically trust an AI answer. Check important information.",
            bigIdea: "Fix the largest difference first. The more a mistake would cost, the harder you check.",
            learnerPromise: "Find the biggest gap before the small ones and match how hard you check to what is at stake.",
            durationMinutes: 13,
            discussionPrompt: "What was the largest difference in your image, and did your team spot it first or last?",
            checkpoints: checkpoints({
              prediction: "The car has the wrong shape, silver wheels, and an extra building. Which do you fix first? Why?",
              choices: [
                { label: "Fix the small details, they are easier", value: "small", feedback: "Easy fixes on a wrong shape spend generations without closing the gap." },
                { label: "Name the largest difference and fix that first", value: "largest", feedback: "Yes. Shape before wheels. The big gap decides whether it is recognizable." },
                { label: "Trust it if it looks professional", value: "trust", feedback: "Never automatically trust an AI answer. Polished is not the same as right." },
              ],
              reflection: "Which mistake would cost more: a wrong wheel color or a wrong date on a permission slip? What changes about how you check?",
              exercise: "List every difference between a result and its reference. Circle the largest. Write the one correction for it.",
              commitment: "This week, for one important AI answer, check the key fact against a source you trust before you use it.",
            }),
            exercises: modes(
              { title: "Biggest gap", prompt: "Find the one difference that matters most.", instructions: "Compare a result with its reference. Write all the differences on sticky notes. Move the largest to the top. Fix only that one and compare again.", evidenceLabel: "My sticky notes, sorted" },
              { title: "Stakes ladder", prompt: "Sort real tasks by what a mistake would cost.", instructions: "Write five things you might ask AI for: a team name, a study guide, an event time, a health question, a money decision. Put them on a ladder from low to high stakes. Write how you would check each.", evidenceLabel: "My stakes ladder" },
              { title: "Review plan", prompt: "Decide how a real result will be checked before you generate it.", instructions: "For a real task, write what could go wrong, who it affects, what source verifies it, who reviews it, and when you would stop and get a human expert.", evidenceLabel: "My review plan" },
            ),
          },
          {
            slug: "make-it-fit-people",
            number: "03.3",
            title: "Closest Match, Not Prettiest",
            kicker: "Judge against the goal",
            summary: "The closest final image wins, not the prettiest. Judge the result against the goal and the person it is for.",
            story: "One team’s car is gorgeous: chrome, sunset, motion blur. It is also blue with four doors, and the reference was a red two-door. Another team’s car is plain and almost exactly right. The plain one wins. In the relay, the goal is the closest match. In real life, the goal is the person the work is for: the grandmother who has to read it, the coach who has to use it, the customer who has to understand it.",
            bigIdea: "Judge against the goal, not your taste. The closest match to what was needed wins.",
            learnerPromise: "Review a result through the goal and the person it is for, not through what looks impressive.",
            durationMinutes: 12,
            discussionPrompt: "Did your team ever prefer a prettier image over a closer one? What did you decide?",
            checkpoints: checkpoints({
              prediction: "One image is beautiful but wrong. One is plain but close. Which wins the relay, and why does that matter outside the relay?",
              choices: [
                { label: "Pick the one that looks best", value: "pretty", feedback: "Pretty is taste. The scoring is similarity to the reference." },
                { label: "Pick the closest match to the goal", value: "closest", feedback: "Yes. Then improve it. You can make the right car prettier; you cannot make the wrong car right." },
                { label: "Pick the one the captain likes", value: "captain", feedback: "The captain selects the final image, but by the rules: closest match." },
              ],
              reflection: "Who is the work actually for, and what would they notice first?",
              exercise: "Take a result. Name the person it is for. Write one thing that would confuse them and one thing that fits them well.",
              commitment: "This week, before you finish something, ask one person it is for what they think it is for. Listen without explaining.",
            }),
            exercises: modes(
              { title: "Pretty vs. close", prompt: "Choose between two results on purpose.", instructions: "Take two AI results for one prompt. Score each on similarity to the goal, then on how much you like it. Pick by similarity. Say what you gave up.", evidenceLabel: "My two scores and my choice" },
              { title: "Different shoes", prompt: "Judge your real draft as the person it is for.", instructions: "Read your draft as a child, an older adult, a tired parent, or a first-time visitor. Name one thing that would confuse or exclude them. Fix that first.", evidenceLabel: "The change I made for them" },
              { title: "Fit review", prompt: "Review for clarity, access, fairness, privacy, and tone.", instructions: "Use five checks: clear to the audience, usable on their device, fair to everyone shown, free of private details, right tone. Revise the weakest, then ask one matching person to react.", evidenceLabel: "My fit review and their reaction" },
            ),
          },
        ],
      },
    ],
  },
  {
    slug: "make",
    number: "04",
    title: "Make",
    kicker: "Improve and complete the result",
    summary: "Write the revision prompt, keep what works, change what the Checker named, and present it. The Finisher’s move.",
    description: "The real learning happens when you judge the draft and improve it. Make is the move where you write the revision, finish the thing, and explain what you learned.",
    promise: "Leave with a finished result, a revision habit, and a one-minute explanation of how you got there.",
    accent: "#F7FFF8",
    modules: [
      {
        slug: "put-it-in-the-world",
        title: "The Finisher",
        summary: "Improve it. Keep everything else the same. Present it. Connect it to real life.",
        lessons: [
          {
            slug: "make-a-first-version",
            number: "04.1",
            title: "The Finisher",
            kicker: "Write the revision prompt",
            summary: "Turn the Checker’s corrections into a revision prompt that keeps what worked and fixes what did not.",
            story: "Student 5 is the Finisher. The Checker has named the differences. The Finisher writes the revision: “Keep the same car, but make the roof lower, change the wheels to black, make the headlights narrower, remove the background buildings, and show the car from the front-left angle.” Every correction becomes a phrase. Everything that was right stays. Then the team generates the revised image.",
            bigIdea: "Improve and complete the result. A revision prompt keeps what worked and names exactly what changes.",
            learnerPromise: "Write a revision prompt from a list of specific corrections.",
            durationMinutes: 11,
            discussionPrompt: "What was your team’s revision prompt, and what did it fix on the first try?",
            checkpoints: checkpoints({
              prediction: "The Checker says: wheels should be black, roof too tall, extra buildings. What are the first four words of your revision prompt?",
              choices: [
                { label: "Write a brand-new prompt from scratch", value: "scratch", feedback: "Starting over throws away the red and the spoiler that were already right." },
                { label: "Keep the same subject, then list the exact changes", value: "revise", feedback: "Yes. Keep the same car, but… then one phrase per correction." },
                { label: "Tell AI to make it better", value: "better", feedback: "“Better” is not a direction. What one exact change do you want?" },
              ],
              reflection: "When something is almost right, do you fix it or start over? What does that cost you?",
              exercise: "Turn three corrections into one revision prompt that starts with “Keep the same…, but…”",
              commitment: "This week, revise one AI result instead of regenerating it. Write the revision before you send it.",
            }),
            exercises: modes(
              { title: "Corrections to prompt", prompt: "Write a revision from a Checker’s list.", instructions: "Take four specific corrections. Write one revision prompt that keeps the subject and names each change as a phrase. Generate or sketch the result and compare.", evidenceLabel: "My revision prompt and the result" },
              { title: "Revise a real draft", prompt: "Improve something you actually need with one revision.", instructions: "Take an AI draft you have already checked. Write the revision: keep what worked, change the three biggest problems. Send it once. Compare before and after.", evidenceLabel: "Before, revision prompt, after" },
              { title: "Revision log", prompt: "Track what each revision fixed.", instructions: "For a real project, keep a log: attempt, what was wrong, revision prompt, what it fixed, what it broke. Three rows minimum. Notice which kinds of changes AI handles well.", evidenceLabel: "My revision log" },
            ),
          },
          {
            slug: "build-your-way",
            number: "04.2",
            title: "Keep Everything Else the Same, But…",
            kicker: "Focused changes, not restarts",
            summary: "Controlling AI means focused changes instead of starting over. Are you improving it or making it worse?",
            story: "Before the final generation, each team answers four questions: What is the largest difference? What exact words could correct it? What should remain unchanged? Are we improving the image, or accidentally making it worse? The last one matters most. A revision that fixes the roof and loses the spoiler is not an improvement. The coaching cue is six words: keep everything else the same, but.",
            bigIdea: "Keep everything else the same, but… Controlling AI often means one focused change instead of starting over.",
            learnerPromise: "Make one focused change at a time and check that it did not undo what was already right.",
            durationMinutes: 12,
            discussionPrompt: "Did a revision ever make your image worse? What did it lose, and how did you get it back?",
            checkpoints: checkpoints({
              prediction: "You have one generation left. The roof is wrong and the wheels are wrong. Do you fix both or one? Why?",
              choices: [
                { label: "Change everything at once", value: "everything", feedback: "Then you cannot tell which change helped and which one hurt." },
                { label: "Name what stays the same, then change what must change", value: "focused", feedback: "Yes. What should remain unchanged is a question, not an afterthought." },
                { label: "Regenerate and hope", value: "hope", feedback: "Hope is not a move. The mistake shows what your directions were missing." },
              ],
              reflection: "Think of something you improved by accident into something worse. What did you forget to protect?",
              exercise: "Answer the four revision questions for a real result. Write the revision so it names what stays and what changes.",
              commitment: "This week, make one change at a time to one thing, and check what stayed the same after each.",
            }),
            exercises: modes(
              { title: "One change", prompt: "Fix one thing and protect the rest.", instructions: "Take a result with two problems. Fix only the largest with a prompt that starts “Keep everything else the same, but…” Check that nothing else moved. Then fix the second.", evidenceLabel: "My two one-change revisions" },
              { title: "Four questions on a real project", prompt: "Answer the four questions before your next draft.", instructions: "For a real piece of work, write the largest difference, the exact words to correct it, what remains unchanged, and whether the change could make it worse. Then revise.", evidenceLabel: "My four answers and the revision" },
              { title: "Change control", prompt: "Make focused changes safe for a team.", instructions: "Design a simple rule set: one change per revision, a list of what must not move, a before-and-after check, and who approves. Run it on a real workflow twice.", evidenceLabel: "My change rules and two runs" },
            ),
          },
          {
            slug: "put-it-in-the-world",
            number: "04.3",
            title: "Present and Connect",
            kicker: "One minute. Then real life.",
            summary: "Present the process in one minute, then take the four moves into personal life, school, and careers.",
            story: "The captain gets one minute. What did your team try to create? What was your first prompt? What did AI misunderstand? How did you improve the prompt? What did you learn about communicating with AI? Reference and final image side by side. Then the class turns to real life: the same four moves plan a goal, build a study guide, practice an interview, design a product. This week, I can use AI to help me…",
            bigIdea: "You do not need to become an AI expert. Know your purpose, give clear direction, challenge the result, and make something useful.",
            learnerPromise: "Explain your process in one minute and name one real thing you will use the four moves for this week.",
            durationMinutes: 10,
            discussionPrompt: "Finish the sentence and post it: This week, I can use AI to help me…",
            checkpoints: checkpoints({
              prediction: "You have one minute to explain how your team got from the first prompt to the final image. What do you say first?",
              choices: [
                { label: "Show the final image and say it was hard", value: "hard", feedback: "The points are for explaining the process: first prompt, what AI misunderstood, how you improved it." },
                { label: "Answer the five presentation questions in order", value: "five", feedback: "Yes. Tried to create, first prompt, what AI misunderstood, how you improved it, what you learned." },
                { label: "Let AI write the presentation", value: "ai", feedback: "AI did not sit in your team. You provide the direction, judgment, and final decision." },
              ],
              reflection: "What comes before the tool? Who makes the final decision? Say your answers out loud.",
              exercise: "Write your one-minute presentation as five short answers. Time yourself reading it.",
              commitment: "Complete the sentence: This week, I can use AI to help me ______. Then do it, using all four moves.",
            }),
            exercises: modes(
              { title: "One minute", prompt: "Present a first-to-final story in sixty seconds.", instructions: "Put a first result and a final result side by side. Answer the five presentation questions out loud. Record it. Cut anything over one minute.", evidenceLabel: "My five answers" },
              { title: "One-move challenge", prompt: "Use the four moves on one real thing this week.", instructions: "Choose one item from personal life, school, or careers. Clear: write what you want. Direct: write the prompt. Judge: check it. Make: revise once. Share the result with the person it is for.", evidenceLabel: "My one-move challenge, all four moves" },
              { title: "Real-life relay", prompt: "Run the Prompt Relay on a real project with a team.", instructions: "Assign Observer, Designer, Operator, Checker, and Finisher on a real task: a flyer, a plan, a pitch. One first draft, one revision, one-minute presentation. Score it on the thirty-point rubric.", evidenceLabel: "Our relay: draft, revision, score" },
            ),
          },
        ],
      },
    ],
  },
];

export const trainerResourceSeeds = [
  {
    slug: "the-air-method",
    type: "framework" as const,
    title: "AiR: Flow With AI — the program",
    summary: "The four moves, the one-hour class, and the Prompt Relay. Theme: Clear the AiR. Then Make Something.",
    body: `# AiR: Flow With AI\n\nAiR teaches students how to communicate with artificial intelligence, not simply how to use it.\n\n## Four easy moves\n\n**CLEAR** — Know what you want. **DIRECT** — Explain it clearly to AI. **JUDGE** — Check what AI got right or wrong. **MAKE** — Improve and complete the result.\n\n> AI creates the draft. You provide the direction, judgment, and final decision.\n\n## The one-hour experience\n\nTwenty students, four teams of five, one captain each. Fifteen minutes to open and form teams, forty-five minutes of core lesson. Teams recreate a car or a house from a reference image using written prompts only, with a limited number of generations. Closest match wins on a thirty-point rubric.\n\n## The line you say first\n\n“Today, you are not just learning about AI. You are competing to see which team can communicate with it most effectively.”\n\nFull plan: docs/air-flow-with-ai.md. PDFs: /media/AiR_Flow_With_AI_One_Hour_Class.pdf and /media/AiR_Competition_Instructor_Talking_Points.pdf.`,
    sortOrder: 1,
  },
  {
    slug: "facilitating-ages-eight-to-adult",
    type: "delivery_note" as const,
    title: "Running the class for ages eight to adult",
    summary: "The one-hour class is written for high school. The moves and the relay adapt up and down.",
    body: `# Ages Eight to Adult\n\nThe class is written for high school. The four moves do not change with age; the reference image and the real-life connection do.\n\n**Ages 8–11.** Use a simple reference: a red house with a blue door and one tree. Teams of three: Observer, Designer, Checker; the instructor operates the generator. Two generations. Skip the rubric; give the three recognitions.\n\n**Middle school.** Full relay, four teams, limited generations, simplified rubric (similarity 10, prompting 5, improvement 5). Real life: school and hobbies.\n\n**High school.** As written.\n\n**Adults, workforce, and reentry.** Same relay, then swap the image for a real task in the second half: a résumé, a customer email, a business flyer. Same roles, same rubric, same one-minute presentation.\n\n**Mixed ages and families.** Pair an adult Observer with a young Designer, or the reverse. Every student contributes; the captain makes sure of it.`,
    sortOrder: 2,
  },
  {
    slug: "five-beat-lesson",
    type: "facilitator_guide" as const,
    title: "Instructor talking points: the one-hour class in order",
    summary: "Follow the class in order. Use short cues. Keep the teams moving.",
    body: `# Talking Points\n\n**0–5 · Welcome + form four teams.** Say: “Today you are not just learning about AI — you are competing to see which team can communicate with it most effectively.” 4 teams, 5 students each, 1 captain, car or house.\n\n**5–15 · The AiR mission.** Ask: “If AI is so smart, why doesn’t it always give us exactly what we want?” After 2–3 answers, say: “AI cannot read your mind. The result is only as clear as the direction you give it.” Introduce Clear, Direct, Judge, Make. Weak: “Create a cool car.” Clear: “Create a red two-door sports car with black wheels, a low roof, narrow headlights, tinted windows and a large rear spoiler.” Ask: “Which prompt gives AI a better chance — and why?”\n\n**15–20 · Explain the challenge.** Study the reference; do not upload or photograph it. Written prompts only. Every student contributes. Limited generations. Closest wins, not prettiest. Say: “Seeing something is easy. Clearly communicating what you see takes observation, teamwork and judgment.”\n\n**20–35 · The Prompt Relay.** 1 Observer (Clear). 2 Designer (Direct). 3 Operator (Make). 4 Checker (Judge). 5 Finisher (Improve). Captain: watch the time, involve everyone, select the final image, present.\n\n**35–45 · Final revision.** Largest difference? Exact words to correct it? What stays unchanged? Improving or making it worse? Cue: “Keep everything else the same, but…” If they say “make it better,” ask: “What one exact change do you want?” If AI gets it wrong: “The mistake shows what your directions were missing.”\n\n**45–52 · One-minute presentations.** Tried to create? First prompt? What AI misunderstood? How you improved it? What you learned? Reference and final side by side.\n\n**52–56 · Score + celebrate.** Similarity 10 · Prompting 5 · Improvement 5 · Teamwork 5 · Explanation 5 = 30. Recognize: AiR Challenge Champion · Best Prompt Engineers · Best AI Comeback.\n\n**56–60 · Real life + close.** Personal life, school, future careers. Safety reminder. “This week, I can use AI to help me ____.” Call-and-response: “What comes before the tool?” “Purpose!” “Who makes the final decision?” “We do!” “Clear the AiR…” “…then make something!”`,
    sortOrder: 3,
  },
  {
    slug: "no-device-ai-literacy",
    type: "exercise" as const,
    title: "Warm-ups and no-device options",
    summary: "Optional five-minute openers, and a paper version of the Prompt Relay for rooms without a generator.",
    body: `# Warm-ups and No-Device Options\n\n## Optional warm-ups (five minutes, before the class)\n\n**Three stations.** DO IT MYSELF · DO IT WITH AI · LET AI DO IT on the floor. “Ten seconds. Choose.” Photograph. Repeat at the end.\n\n**The walls.** I KNOW · I THINK I KNOW · I HAVE NO IDEA. Read: “AI understands you.” “AI is creative.” “AI will replace jobs.” People stand. Say nothing about who is right.\n\nThese come from an earlier version of AiR and are kept at /situations. They are not the method. Run the class.\n\n## Paper Prompt Relay (no generator)\n\nThe Operator is a person who draws only what the prompt says, nothing more. Observer describes, Designer writes the six-blank prompt, Operator draws it literally, Checker names the differences, Finisher writes the revision, Operator draws again. Score with the same rubric. Every missing detail shows up as a blank space on the page.`,
    sortOrder: 4,
  },
  {
    slug: "community-safety-for-younger-learners",
    type: "delivery_note" as const,
    title: "Community Safety for Younger Learners",
    summary: "Facilitator and moderator practices for privacy-minimizing, constructive participation.",
    body: `# Community Safety\n\nRemind learners to use a display name and never post a full name, school, address, phone number, daily schedule, password, or private image. Winning images may be featured on the AiR website or social media only with school and parent approval. Private lesson answers stay private unless a learner deliberately writes a separate community post.\n\nModel response language: **I noticed… I wondered… One thing I would try…** Redirect judgment of people toward what was made and what was chosen. Escalate concerning content to the platform administrator rather than investigating publicly.\n\nSafety reminder for every session: never automatically trust an AI answer. Check important information, protect personal information, follow school rules, and use your own judgment.`,
    sortOrder: 5,
  },
  {
    slug: "interactive-video-production-guide",
    type: "video_guide" as const,
    title: "Interactive Video Production Guide",
    summary: "Each lesson video shows one move inside the Prompt Relay, then stops for the learner to try it.",
    body: `# Interactive Video Guide\n\nKeep a lesson video on one move. Open with the relay moment (the Observer at the board, the Designer writing, the Checker beside the reference, the Finisher revising), name the move in plain words, show one weak-versus-clear contrast, and stop before the learner becomes passive. Author checkpoints where a prediction, decision, or check matters.\n\nEvery video needs accurate captions, a readable transcript, a meaningful poster frame, and a text-based path to the same outcome. Keep the video, transcript, and activity aligned around one move.`,
    sortOrder: 6,
  },
  {
    slug: "source-frameworks",
    type: "source" as const,
    title: "Source Frameworks and Further Reading",
    summary: "Authoritative references supporting AiR’s human-centered, critical, and child-centered approach.",
    body: `# Source Frameworks\n\nUNESCO’s student framework contributes the human-centered, ethical, applied, and creative progression. NIST contributes risk-calibrated review and trustworthy-AI thinking. Stanford contributes functional, ethical, rhetorical, and pedagogical literacies. TeachAI contributes durable skills and future-ready attitudes. AIR’s AI by 8 initiative supports storytelling, literacy integration, play, and unplugged learning. UNICEF contributes child-centered safety, privacy, fairness, transparency, well-being, and inclusion. Dweck contributes the power of yet. AiR turns all of it into four moves and one hour.`,
    sourceUrl: "https://www.unesco.org/en/articles/ai-competency-framework-students",
    sortOrder: 7,
  },
] as const;
