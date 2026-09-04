import type { CheckpointOption } from "../drizzle/schema";

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
    title: "Try one useful move",
    prompt: input.exercise,
    helperText: "Start small. A clear first version beats a perfect idea in your head.",
    atSeconds: 180,
  },
  {
    kind: "commitment",
    title: "Choose what happens next",
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
    kicker: "Purpose before tools",
    summary: "Turn noise, hype, and worry into one human goal you can act on.",
    description: "You do not need every AI tool. You need to know who you want to help, what should change, and what the machine is actually being asked to do.",
    promise: "Leave with one clear mission and a simple explanation of what AI can—and cannot—know.",
    accent: "#D8FF45",
    modules: [
      {
        slug: "clear-the-noise",
        title: "Clear the noise",
        summary: "Three short moves that replace pressure with purpose.",
        lessons: [
          {
            slug: "clear-the-air",
            number: "01.1",
            title: "Clear the Air",
            kicker: "Start with what matters",
            summary: "Cross out the tools and name the change you actually want to make.",
            story: "Imagine carrying a backpack filled with every AI tip, app, warning, and magic prompt you have heard. It gets so heavy that you cannot move. Clearing the air means taking everything out, keeping one real goal, and leaving the rest on the floor for now.",
            bigIdea: "A tool is not a goal. A useful mission names a person, a change, and a reason.",
            learnerPromise: "Write one sentence that tells you exactly why you want to use AI.",
            durationMinutes: 9,
            discussionPrompt: "What did you cross out, and what one goal was still worth carrying?",
            checkpoints: checkpoints({
              prediction: "If every AI app disappeared tomorrow, what would you still want to make or help someone do?",
              choices: [
                { label: "Learn every new app", value: "tools", feedback: "That adds weight before choosing a destination." },
                { label: "Help one person do one thing", value: "purpose", feedback: "Yes. A human outcome gives the tools a job." },
                { label: "Wait until I feel ready", value: "wait", feedback: "Readiness grows by making one small move." },
              ],
              reflection: "Which AI message has made you feel rushed, late, or not smart enough?",
              exercise: "Finish this sentence: I want to make ___ so that ___ can ___.",
              commitment: "What is one ten-minute step you can take toward that mission?",
            }),
            exercises: modes(
              { title: "Say the mission", prompt: "Say who you want to help and what should change.", instructions: "Tell a partner or write one sentence. Remove every tool name. Keep only the person and outcome.", evidenceLabel: "My one-sentence mission" },
              { title: "Cut the list", prompt: "Turn a crowded AI wish list into one mission.", instructions: "List five things you think you should do with AI. Cross out tool names and other people's goals. Rewrite the strongest survivor as a mission.", evidenceLabel: "The mission I chose" },
              { title: "Rank real demand", prompt: "Find the mission with a real person waiting for it.", instructions: "Write three possible missions. For each, name the person, present problem, and useful change. Rank them by real need rather than novelty.", evidenceLabel: "My ranked mission decision" },
            ),
          },
          {
            slug: "machines-make-guesses",
            number: "01.2",
            title: "Machines Make Guesses",
            kicker: "Patterns are not truth",
            summary: "See AI as a fast pattern-maker, not a mind that knows what is true.",
            story: "If you read one hundred stories that begin, ‘Once upon a time,’ you could guess what kind of words might come next. AI does something much bigger and faster: it finds patterns in enormous amounts of data and predicts a likely next piece. A good guess can still be wrong.",
            bigIdea: "AI predicts patterns. It does not understand your life, care about the result, or automatically know the truth.",
            learnerPromise: "Explain AI to someone younger without calling it magic or a brain.",
            durationMinutes: 10,
            discussionPrompt: "What is one time a confident guess could cause a real problem?",
            checkpoints: checkpoints({
              prediction: "When an AI sounds confident, how sure do you think it is?",
              choices: [
                { label: "It knows because it sounds certain", value: "certainty", feedback: "Confident language is a style, not proof." },
                { label: "It is making a pattern-based prediction", value: "prediction", feedback: "Exactly. Useful prediction still needs checking." },
                { label: "It can read my mind", value: "mind", feedback: "It only has the context you provide and patterns it learned." },
              ],
              reflection: "What is the difference between a likely answer and a true answer?",
              exercise: "Write a two-sentence explanation of AI using the words pattern, guess, and check.",
              commitment: "The next time AI gives you a fact, how will you check it?",
            }),
            exercises: modes(
              { title: "Finish the pattern", prompt: "Spot how prediction works.", instructions: "Ask someone to finish three familiar patterns, then invent a pattern where the obvious guess is wrong. Connect that surprise to AI output.", evidenceLabel: "My pattern explanation" },
              { title: "Likely is not true", prompt: "Compare fluent language with evidence.", instructions: "Ask an AI a question you can verify. Highlight every claim. Mark which claims have evidence and which only sound plausible.", evidenceLabel: "My claim check" },
              { title: "Change the context", prompt: "Test how context changes prediction.", instructions: "Give the same task three different context blocks. Compare what changes, what remains generic, and what the system invents.", evidenceLabel: "My context experiment" },
            ),
          },
          {
            slug: "choose-one-mission",
            number: "01.3",
            title: "Choose One Mission",
            kicker: "Person · problem · change",
            summary: "Turn a vague idea into a mission you can test with a real person.",
            story: "A flashlight can light only one patch of a dark room at a time. A mission works the same way. ‘Help my community’ points everywhere. ‘Help a new neighbor find tomorrow’s food pantry hours in under one minute’ gives everyone a place to aim.",
            bigIdea: "Specific does not make a mission smaller. It makes the next useful action visible.",
            learnerPromise: "Choose a person, a problem, and a change you can observe.",
            durationMinutes: 11,
            discussionPrompt: "Who is your mission for, and how will you know the work helped?",
            checkpoints: checkpoints({
              prediction: "Which is easier to act on: ‘make education better’ or ‘help one student understand fractions tonight’? Why?",
              choices: [
                { label: "A broad idea that helps everyone", value: "broad", feedback: "Broad intentions can hide the first action." },
                { label: "A specific person and observable change", value: "specific", feedback: "Yes. Specific missions can be tested and improved." },
                { label: "The newest AI trend", value: "trend", feedback: "Trends do not tell you who needs what." },
              ],
              reflection: "Whose day would be different if your idea worked?",
              exercise: "Name one person, their current problem, and the change you want them to experience.",
              commitment: "What question can you ask that person before making anything?",
            }),
            exercises: modes(
              { title: "One person card", prompt: "Draw or describe one person you want to help.", instructions: "Give them a first name, a situation, and one thing they need. Do not use private real-world details.", evidenceLabel: "My person and need" },
              { title: "Mission interview", prompt: "Replace assumptions with one conversation.", instructions: "Ask a real person what is hard now, what they have tried, and what a useful change would look like. Rewrite your mission after listening.", evidenceLabel: "My revised mission" },
              { title: "Define the success signal", prompt: "Make the outcome observable.", instructions: "Write a mission, a before state, an after state, and one simple signal that would show whether the work helped.", evidenceLabel: "My success signal" },
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
    kicker: "Clarity before cleverness",
    summary: "Give AI the context, task, boundaries, and check a good teammate would need.",
    description: "A prompt is not a magic spell. It is a working brief. Great direction makes the goal, audience, constraints, and unknowns visible.",
    promise: "Leave with a reusable brief that makes better drafts and exposes missing information.",
    accent: "#18C98B",
    modules: [
      {
        slug: "give-direction",
        title: "Give direction",
        summary: "Learn to brief, constrain, and explore instead of hoping for magic words.",
        lessons: [
          {
            slug: "be-the-director",
            number: "02.1",
            title: "Be the Director",
            kicker: "You choose what good means",
            summary: "Direct AI like a creative team: explain the job, audience, feeling, and finish line.",
            story: "A movie director does not shout, ‘Make it amazing!’ and walk away. They explain the scene, what the audience should feel, where the camera belongs, and what must stay true. AI needs direction for the same reason: it cannot see the picture in your head.",
            bigIdea: "The human defines the purpose and quality bar. The machine helps produce options.",
            learnerPromise: "Turn a vague request into a clear creative direction.",
            durationMinutes: 12,
            discussionPrompt: "What human decision improved your direction the most?",
            checkpoints: checkpoints({
              prediction: "What would happen if a director told every actor only, ‘Do it better’?",
              choices: [
                { label: "Everyone would know exactly what to do", value: "know", feedback: "People and machines need a shared picture of the goal." },
                { label: "They would make different guesses", value: "guess", feedback: "Right. Vague direction creates accidental results." },
                { label: "The newest camera would solve it", value: "camera", feedback: "A better tool cannot replace a missing decision." },
              ],
              reflection: "What part of your goal can only you decide?",
              exercise: "Rewrite ‘make this better’ with an audience, purpose, feeling, and finish line.",
              commitment: "What quality will you refuse to trade away?",
            }),
            exercises: modes(
              { title: "Direct a drawing", prompt: "Give another person directions for a picture they cannot see.", instructions: "Describe the subject, mood, important details, and what to avoid. Compare their result with what you imagined.", evidenceLabel: "The direction I improved" },
              { title: "Write the director brief", prompt: "Brief a real piece of work.", instructions: "Name the audience, desired action, tone, must-include information, and one example of success.", evidenceLabel: "My director brief" },
              { title: "Create a quality rubric", prompt: "Turn taste into visible criteria.", instructions: "Write five checks another person could use to judge the work without asking what you meant.", evidenceLabel: "My quality rubric" },
            ),
          },
          {
            slug: "give-useful-context",
            number: "02.2",
            title: "Give Useful Context",
            kicker: "Share what changes the answer",
            summary: "Provide the background that matters without dumping every detail.",
            story: "If someone asks, ‘What should I wear?’ you cannot help until you know whether they are going to a snowy playground, a wedding, or bed. Context is the part of the story that changes the useful answer.",
            bigIdea: "Good context reduces guessing. More context is not always better; relevant context is.",
            learnerPromise: "Choose the facts that change the answer and leave private details out.",
            durationMinutes: 11,
            discussionPrompt: "Which piece of context changed your result most, and what did you keep private?",
            checkpoints: checkpoints({
              prediction: "What is the smallest detail that could completely change an answer?",
              choices: [
                { label: "The audience and situation", value: "audience", feedback: "Yes. Who, where, and why often change everything." },
                { label: "A private password", value: "password", feedback: "Private data should never be used as helpful context." },
                { label: "A random long document", value: "random", feedback: "Length is not the same as relevance." },
              ],
              reflection: "What does the helper need to know, and what do they not need to know?",
              exercise: "Write three context facts that change the answer and one private detail you will leave out.",
              commitment: "Before your next prompt, what context question will you ask yourself?",
            }),
            exercises: modes(
              { title: "Change one detail", prompt: "See how one fact changes advice.", instructions: "Use a simple question such as what to pack. Change only the place, person, or purpose and compare the answer.", evidenceLabel: "The detail that changed the answer" },
              { title: "Context filter", prompt: "Sort useful, irrelevant, and private information.", instructions: "List ten possible details for your task. Mark each Keep, Skip, or Protect. Use only the Keep group in your brief.", evidenceLabel: "My context filter" },
              { title: "Build a context template", prompt: "Make reusable context easy to supply.", instructions: "Create labeled fields for audience, current state, sources, constraints, and private-data exclusions.", evidenceLabel: "My reusable context template" },
            ),
          },
          {
            slug: "ask-for-options",
            number: "02.3",
            title: "Ask for Options",
            kicker: "Do not marry the first draft",
            summary: "Generate several directions, compare them, and combine the strongest parts.",
            story: "When choosing a name for a team, the first idea often feels special only because it arrived first. Ten options let you notice patterns, compare tradeoffs, and build something better than any single starting point.",
            bigIdea: "AI is strongest as an option engine. Human judgment chooses, combines, and rejects.",
            learnerPromise: "Create a small set of meaningfully different options and explain your choice.",
            durationMinutes: 10,
            discussionPrompt: "What did the rejected options teach you about what you actually wanted?",
            checkpoints: checkpoints({
              prediction: "Why can the first good-looking answer be dangerous?",
              choices: [
                { label: "It can stop us from exploring", value: "stop", feedback: "Exactly. Fast fluency can create false certainty." },
                { label: "First answers are always wrong", value: "always", feedback: "Not always. The risk is choosing before comparing." },
                { label: "Options make decisions impossible", value: "impossible", feedback: "A small, diverse set makes tradeoffs easier to see." },
              ],
              reflection: "What would make two options meaningfully different rather than lightly reworded?",
              exercise: "Ask for three options that use different strategies, then name one strength from each.",
              commitment: "What rule will you use to choose or combine the options?",
            }),
            exercises: modes(
              { title: "Three ways", prompt: "Solve one small problem three different ways.", instructions: "Make one safe choice, one playful choice, and one surprising choice. Circle the useful part of each.", evidenceLabel: "My three options" },
              { title: "Option matrix", prompt: "Compare alternatives against the same goal.", instructions: "Generate three distinct approaches. Score each for audience fit, clarity, effort, and risk. Combine only if the pieces still fit.", evidenceLabel: "My option decision" },
              { title: "Diversity constraint", prompt: "Force the search space to widen.", instructions: "Define three different strategies before generating. Reject outputs that differ only in wording, then document the tradeoff each strategy makes.", evidenceLabel: "My strategy comparison" },
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
    kicker: "Confidence is not evidence",
    summary: "Inspect facts, risk, bias, privacy, accessibility, and audience fit before you decide.",
    description: "The output is not the decision. Judgment means checking what the machine guessed, what the situation requires, and who carries the consequence if the work is wrong.",
    promise: "Leave with a repeatable review habit that gets stronger as the stakes rise.",
    accent: "#FF8A6B",
    modules: [
      {
        slug: "challenge-the-result",
        title: "Challenge the result",
        summary: "Turn critical thinking into a practical review routine.",
        lessons: [
          {
            slug: "spot-the-guess",
            number: "03.1",
            title: "Spot the Guess",
            kicker: "Find the seams",
            summary: "Notice specific details, missing sources, and smooth language that may hide an invention.",
            story: "A detective does not decide a story is true because it sounds neat. They look for details that appeared without evidence, ask what is missing, and compare the story with reliable sources. AI review works the same way.",
            bigIdea: "The most dangerous error is often a specific detail that sounds normal and was never supplied.",
            learnerPromise: "Mark claims that need checking and explain why they deserve attention.",
            durationMinutes: 12,
            discussionPrompt: "Which detail looked trustworthy at first but changed when you checked it?",
            checkpoints: checkpoints({
              prediction: "Which words or numbers in an AI answer should make you slow down?",
              choices: [
                { label: "Specific dates, names, numbers, and quotes", value: "specifics", feedback: "Yes. Specific claims need specific evidence." },
                { label: "Only spelling mistakes", value: "spelling", feedback: "Fluent writing can still contain serious factual errors." },
                { label: "Nothing if it sounds professional", value: "professional", feedback: "Professional tone is not a source." },
              ],
              reflection: "What information did the answer seem to know even though you never provided it?",
              exercise: "Highlight three checkable claims and write the source you would use for each.",
              commitment: "What claim will you verify before using the work?",
            }),
            exercises: modes(
              { title: "Fact or guess", prompt: "Sort simple statements by whether you can check them.", instructions: "Choose a short answer. Underline facts, circle opinions, and put a question mark beside unsupported specifics.", evidenceLabel: "My marked-up answer" },
              { title: "Claim ledger", prompt: "Make verification visible.", instructions: "Create a table with claim, source, result, and action. Remove or rewrite anything you cannot support.", evidenceLabel: "My claim ledger" },
              { title: "Adversarial review", prompt: "Try to prove your favorite output wrong.", instructions: "List five failure hypotheses, seek disconfirming evidence, and record which claims survive the challenge.", evidenceLabel: "My adversarial review" },
            ),
          },
          {
            slug: "check-the-stakes",
            number: "03.2",
            title: "Check the Stakes",
            kicker: "More consequence, more pause",
            summary: "Match the level of human review to the harm a wrong answer could cause.",
            story: "Choosing a silly nickname and choosing a medicine dose are both decisions, but a mistake does not cost the same. The higher the consequence, the more evidence, expert help, privacy protection, and human control you need.",
            bigIdea: "AI use should slow down as consequences rise. Sometimes the best decision is not to use it.",
            learnerPromise: "Sort tasks by consequence and choose an appropriate level of human control.",
            durationMinutes: 13,
            discussionPrompt: "What task belongs in the human-led zone, and what consequence put it there?",
            checkpoints: checkpoints({
              prediction: "Which mistake would matter more: a funny color suggestion or a false health instruction? Why?",
              choices: [
                { label: "Practice and edit", value: "practice", feedback: "Good for low-stakes creative exploration." },
                { label: "Verify with reliable sources", value: "verify", feedback: "Necessary when facts influence real decisions." },
                { label: "Keep a qualified human in charge", value: "human", feedback: "Right for health, safety, rights, and other high-consequence decisions." },
              ],
              reflection: "Who would carry the harm if this output were wrong?",
              exercise: "Place three tasks into low, medium, or high consequence and explain the review each needs.",
              commitment: "What is one task you will keep human-led?",
            }),
            exercises: modes(
              { title: "Consequence ladder", prompt: "Put everyday tasks on a low-to-high ladder.", instructions: "Sort a joke, homework explanation, event time, medical advice, and emergency decision. Explain one placement.", evidenceLabel: "My consequence ladder" },
              { title: "Review plan", prompt: "Design the human check before generating.", instructions: "For a real task, name possible harm, affected people, required source, reviewer, and stop condition.", evidenceLabel: "My risk review plan" },
              { title: "Decision boundary", prompt: "Define what the system may and may not decide.", instructions: "Write allowed support, prohibited decisions, escalation triggers, audit evidence, and accountable human owner.", evidenceLabel: "My decision boundary" },
            ),
          },
          {
            slug: "make-it-fit-people",
            number: "03.3",
            title: "Make It Fit People",
            kicker: "Useful to whom?",
            summary: "Check whether the work is clear, fair, accessible, private, and right for the actual audience.",
            story: "A sign can contain every correct word and still fail if the letters are too small for the person who needs it, the language assumes knowledge they do not have, or the instructions require a device they cannot use. Correct is only one part of useful.",
            bigIdea: "Quality lives in the relationship between the work and the person using it.",
            learnerPromise: "Review one artifact through the eyes, needs, and constraints of another person.",
            durationMinutes: 12,
            discussionPrompt: "What did you change after looking at the work through someone else’s experience?",
            checkpoints: checkpoints({
              prediction: "Can something be factually correct and still be harmful or unusable?",
              choices: [
                { label: "Yes—fit includes access, tone, bias, and privacy", value: "yes", feedback: "Exactly. Accuracy is necessary but not sufficient." },
                { label: "No—correct words work for everyone", value: "no", feedback: "People have different contexts, abilities, and risks." },
                { label: "Only the design matters", value: "design", feedback: "Design matters, but so do truth, dignity, access, and consequences." },
              ],
              reflection: "What assumption does your draft make about the person using it?",
              exercise: "Choose one audience need and revise the work to serve it better.",
              commitment: "Who will you ask to test the result before release?",
            }),
            exercises: modes(
              { title: "Different shoes", prompt: "Look at one message from another person’s point of view.", instructions: "Choose a child, older adult, tired caregiver, or first-time visitor. Name one thing that would confuse or exclude them.", evidenceLabel: "The change I noticed" },
              { title: "Human fit review", prompt: "Review for clarity, access, representation, privacy, and tone.", instructions: "Use the five checks, revise the weakest area, then ask one matching person to react.", evidenceLabel: "My human-fit revision" },
              { title: "Inclusive acceptance tests", prompt: "Turn inclusion into verifiable conditions.", instructions: "Write tests for keyboard use, zoom, reading level, low bandwidth, alternate input, privacy, and representative examples.", evidenceLabel: "My inclusive acceptance tests" },
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
    kicker: "Finish the loop",
    summary: "Create a first version, turn what works into a repeatable process, and release it to a real person.",
    description: "Learning becomes readiness when an idea leaves your head, meets the world, receives feedback, and becomes better. The goal is useful motion, not endless preparation.",
    promise: "Leave with one finished artifact, one repeatable workflow, and one real human response.",
    accent: "#F7FFF8",
    modules: [
      {
        slug: "put-it-in-the-world",
        title: "Put it in the world",
        summary: "Make, systematize, and release work that serves someone.",
        lessons: [
          {
            slug: "make-a-first-version",
            number: "04.1",
            title: "Make a First Version",
            kicker: "Small enough to finish",
            summary: "Shrink the mission until you can make, test, and improve something today.",
            story: "If you want to build a whole playground, start by drawing one safe slide and letting someone try the idea. A first version is not the final promise. It is the smallest real thing that teaches you what to do next.",
            bigIdea: "The first version should be complete enough to test and small enough to finish.",
            learnerPromise: "Define and make a testable first version instead of planning forever.",
            durationMinutes: 11,
            discussionPrompt: "What did your first version teach you that planning could not?",
            checkpoints: checkpoints({
              prediction: "What can a rough real version teach that an idea cannot?",
              choices: [
                { label: "How a person actually uses it", value: "use", feedback: "Yes. Reality reveals confusion, friction, and value." },
                { label: "That it must already be perfect", value: "perfect", feedback: "A first version exists to create evidence, not perfection." },
                { label: "Which tool is most popular", value: "popular", feedback: "Popularity does not show whether your mission works." },
              ],
              reflection: "What can you remove without losing the core promise?",
              exercise: "Write what version one includes, excludes, and must prove.",
              commitment: "When will another person see the first version?",
            }),
            exercises: modes(
              { title: "Paper first", prompt: "Make the idea with paper, blocks, or three sentences.", instructions: "Create a tiny version someone can point at, read, or try in ten minutes.", evidenceLabel: "My first version" },
              { title: "Minimum useful version", prompt: "Cut scope while preserving the promise.", instructions: "List every feature. Keep only what the user needs for the first useful outcome. Build and test that slice.", evidenceLabel: "My tested first version" },
              { title: "Prototype the riskiest assumption", prompt: "Build evidence before infrastructure.", instructions: "Name the assumption that could invalidate the mission. Create the smallest experiment that tests it with a real user.", evidenceLabel: "My assumption test" },
            ),
          },
          {
            slug: "build-your-way",
            number: "04.2",
            title: "Build Your Way",
            kicker: "Turn success into a system",
            summary: "Capture the steps, decisions, and checks that made the work useful.",
            story: "A good recipe does not say, ‘Make delicious soup.’ It names ingredients, order, checks, and what to do when something looks wrong. A workflow turns one lucky success into something you or a teammate can repeat.",
            bigIdea: "Automation begins with a clear human process. Do not automate confusion.",
            learnerPromise: "Turn one successful attempt into a simple, repeatable workflow.",
            durationMinutes: 12,
            discussionPrompt: "Which step should remain a human decision even if the rest becomes faster?",
            checkpoints: checkpoints({
              prediction: "What happens when you automate a messy process?",
              choices: [
                { label: "The mess happens faster", value: "mess", feedback: "Exactly. Speed multiplies both clarity and confusion." },
                { label: "The system invents a good process", value: "invent", feedback: "Automation needs explicit steps and decision rules." },
                { label: "People are no longer responsible", value: "responsible", feedback: "A human still owns the outcome and the boundary." },
              ],
              reflection: "Which step worked because of your judgment rather than the tool?",
              exercise: "Write your process as five steps with one check and one human decision.",
              commitment: "What will you run a second time to see if the process holds?",
            }),
            exercises: modes(
              { title: "Teach the recipe", prompt: "Explain your process so someone else can try it.", instructions: "Use five picture-or-word steps. Ask a partner to follow them and mark where they get stuck.", evidenceLabel: "My five-step recipe" },
              { title: "Workflow card", prompt: "Separate inputs, making steps, review, and release.", instructions: "Document the trigger, required information, generation step, human review, revision, and delivery.", evidenceLabel: "My repeatable workflow" },
              { title: "System with boundaries", prompt: "Design a workflow that makes responsibility visible.", instructions: "Define inputs, transformations, approval gates, logs, fallbacks, privacy limits, and accountable owner.", evidenceLabel: "My bounded system design" },
            ),
          },
          {
            slug: "put-it-in-the-world",
            number: "04.3",
            title: "Put It in the World",
            kicker: "A real person must see it",
            summary: "Release the work, invite useful feedback, and decide what the next version needs.",
            story: "A paper airplane teaches nothing while it sits folded on a desk. When you throw it, the air shows whether it glides, dives, or turns. Putting work into the world lets a real person become the air that teaches you.",
            bigIdea: "Finished means delivered to the person it was made for, not hidden in a folder.",
            learnerPromise: "Share one useful artifact, gather one human response, and choose the next improvement.",
            durationMinutes: 10,
            discussionPrompt: "What did a real person notice, and what will you change because of it?",
            checkpoints: checkpoints({
              prediction: "When does a project begin teaching you the most?",
              choices: [
                { label: "When a real person tries it", value: "person", feedback: "Yes. Use creates evidence." },
                { label: "When the folder name is perfect", value: "folder", feedback: "Organization helps, but delivery completes the learning loop." },
                { label: "When nobody can criticize it", value: "nobody", feedback: "Avoiding response also avoids improvement." },
              ],
              reflection: "What fear or unfinished detail is keeping the work hidden?",
              exercise: "Choose one person, one delivery method, and one question you want them to answer.",
              commitment: "Write the exact day and action for release.",
            }),
            exercises: modes(
              { title: "Show one person", prompt: "Share your work with one trusted person.", instructions: "Ask, ‘What do you think this is for?’ Listen without explaining first. Write what you learned.", evidenceLabel: "What my person noticed" },
              { title: "Release and learn", prompt: "Deliver the artifact to its intended audience.", instructions: "Check facts, access, credits, privacy, and mobile use. Share it, ask one focused question, and plan one revision.", evidenceLabel: "My release reflection" },
              { title: "Production handoff", prompt: "Release with ownership and recovery in place.", instructions: "Document version, dependencies, monitoring signal, rollback plan, accessibility check, feedback channel, and next owner.", evidenceLabel: "My production handoff" },
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
    title: "The AiR Method: Purpose → Direction → Judgment → Release",
    summary: "The core teaching framework behind every AiR learning path.",
    body: `# The AiR Method\n\nAiR treats AI literacy as a repeatable human practice rather than a tour of tools. Every session should move through four questions: **What human change matters? What direction does the system need? What must a person inspect and decide? How will the work meet the world?**\n\n## The teaching rule\n\nStart concrete. Name one idea. Make one move. Look again. Share what changed. For younger learners, use a story or object before technical vocabulary. For experienced learners, keep the same structure and increase the consequence, ambiguity, and systems depth.\n\n## Evidence of learning\n\nDo not ask only whether the learner can repeat a definition. Look for a mission, brief, marked-up output, revised artifact, workflow, or real human response.`,
    sortOrder: 1,
  },
  {
    slug: "facilitating-ages-eight-to-adult",
    type: "delivery_note" as const,
    title: "Facilitating Ages Eight to Adult",
    summary: "Adapt one mindset lesson for children, families, mixed-age groups, and adult professionals.",
    body: `# Facilitating Ages Eight to Adult\n\nThe concept should stay the same while the entry changes. An eight-year-old can understand that a confident guess may be wrong. An adult can apply the same idea to a legal summary, budget forecast, or public campaign.\n\n## Use three layers\n\n**Explore** uses stories, sorting, drawing, speaking, and partner work. **Create** uses a real project and meaningful audience. **Build** adds systems, automation, production constraints, and governance. Never describe Explore as easier or Build as smarter. They are different doors into the same human decision.\n\n## Mixed-age pairing\n\nAsk the younger learner to identify confusing language and the older learner to explain the hidden context. Reverse roles when generating examples: younger learners often produce less conventional options.`,
    sortOrder: 2,
  },
  {
    slug: "five-beat-lesson",
    type: "facilitator_guide" as const,
    title: "Run Any AiR Lesson in Five Beats",
    summary: "A reusable facilitation plan for See it, Name it, Try it, Check it, and Share it.",
    body: `# The Five-Beat Lesson\n\n## 1. See it\n\nOpen with a familiar situation and ask for predictions before explaining.\n\n## 2. Name it\n\nGive the one big idea in plain words. Introduce no more than three new terms.\n\n## 3. Try it\n\nOffer Explore, Create, and Build routes. Keep the first action under ten minutes.\n\n## 4. Check it\n\nAsk what could be wrong, missing, unfair, private, inaccessible, or high-consequence.\n\n## 5. Share it\n\nInvite learners to describe what changed in their thinking rather than perform success. End with one next move.`,
    sortOrder: 3,
  },
  {
    slug: "no-device-ai-literacy",
    type: "exercise" as const,
    title: "No-Device AI Literacy Activities",
    summary: "Teach prediction, context, bias, review, and iteration with paper, movement, and conversation.",
    body: `# No-Device Activities\n\n**Pattern predictor:** complete familiar patterns, then reveal a surprising final piece. Discuss likely versus true.\n\n**Context cards:** give three groups the same question with one different audience card. Compare answers.\n\n**Human review relay:** teams pass a draft through fact, fit, privacy, and accessibility stations.\n\n**Consequence corners:** label room corners Practice, Verify, Pause, and Human-Led. Read scenarios and ask learners to move, then defend their choice.\n\n**Release circle:** each learner shows one small artifact and asks one focused feedback question.`,
    sortOrder: 4,
  },
  {
    slug: "community-safety-for-younger-learners",
    type: "delivery_note" as const,
    title: "Community Safety for Younger Learners",
    summary: "Facilitator and moderator practices for privacy-minimizing, constructive participation.",
    body: `# Community Safety\n\nRemind learners to use a display name and never post a full name, school, address, phone number, daily schedule, password, or private image. Private lesson reflections stay private unless a learner deliberately writes a separate community post.\n\nModel response language: **I noticed… I wondered… One idea to try…** Redirect judgment of people toward discussion of work and choices. Escalate concerning content to the platform administrator rather than investigating publicly.`,
    sortOrder: 5,
  },
  {
    slug: "interactive-video-production-guide",
    type: "video_guide" as const,
    title: "Interactive Video Production Guide",
    summary: "Plan short lesson chapters with captions, transcripts, pause points, and actions.",
    body: `# Interactive Video Guide\n\nKeep a lesson video focused on one idea. Open with the story, name the big idea, demonstrate one contrast, and stop before the learner becomes passive. Author checkpoints at moments where a prediction, decision, or inspection matters.\n\nEvery video needs accurate captions, a readable transcript, a meaningful poster frame, and a text-based path to the same learning outcome. Keep the lesson video, transcript, and activity aligned around one outcome.`,
    sortOrder: 6,
  },
  {
    slug: "source-frameworks",
    type: "source" as const,
    title: "Source Frameworks and Further Reading",
    summary: "Authoritative references supporting AiR’s human-centered, critical, and child-centered approach.",
    body: `# Source Frameworks\n\nUNESCO’s student framework contributes the human-centered, ethical, applied, and creative progression. NIST contributes risk-calibrated review and trustworthy-AI thinking. Stanford contributes functional, ethical, rhetorical, and pedagogical literacies. TeachAI contributes durable skills and future-ready attitudes. AIR’s AI by 8 initiative supports storytelling, literacy integration, play, and unplugged learning. UNICEF contributes child-centered safety, privacy, fairness, transparency, well-being, and inclusion.`,
    sourceUrl: "https://www.unesco.org/en/articles/ai-competency-framework-students",
    sortOrder: 7,
  },
] as const;
