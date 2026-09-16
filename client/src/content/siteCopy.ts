// Public-site copy for AiR — AI Readiness. Edit words here, not in the pages.
// Source of truth: docs/air-flow-with-ai.md (the one-hour class and the four moves).

export const SITE = {
  name: "AiR — AI Readiness",
  tagline: "Clear the AiR. Then make something.",
  domain: "aireadiness.me",
  websiteUrl: "https://aireadiness.me",
  partnerName: "Digi2U.org",
  partnerUrl: "https://digi2u.org",
  // All contact / partnership buttons go here until AiR has its own inbox.
  contactUrl: "https://digi2u.org/contact-us/",
  shortDescription:
    "AiR — AI Readiness teaches students how to communicate with artificial intelligence, not simply how to use it. Four moves: Clear, Direct, Judge, Make. One hour, four teams, one Prompt Relay. AI creates the draft. You provide the direction, judgment, and final decision.",
  socialBio: ["Clear the AiR. Then make something.", "Four moves: Clear · Direct · Judge · Make.", "Free for ages 8 to adult."],
};

// The program files, served from /media so they can be downloaded from the site.
export const PROGRAM_FILES = {
  classPlan: { label: "AiR: Flow With AI · One-hour class plan (PDF)", file: "AiR_Flow_With_AI_One_Hour_Class.pdf" },
  talkingPoints: { label: "Instructor talking points (PDF)", file: "AiR_Competition_Instructor_Talking_Points.pdf" },
};

export const HERO = {
  pill: "Free for everyone",
  eyebrow: "AiR · Artificial Intelligence Readiness",
  title: ["Clear the AiR.", "Then make something."],
  intro: "AiR teaches you how to communicate with artificial intelligence, not simply how to use it.",
  rule: "AI creates the draft. You provide the direction, judgment, and final decision.",
  facts: [
    { value: "60", label: "minutes" },
    { value: "4", label: "teams of five" },
    { value: "4", label: "moves" },
    { value: "30", label: "points" },
  ],
  join: "Join AiR free",
  see: "See the one-hour class",
};

// The opening situation from the former protocol, kept as an optional warm-up on /situations.
export const STATIONS = {
  prompt: "You have 10 seconds. Choose.",
  challenge: "Warm-up: before the class starts, where do you stand?",
  stations: [
    { id: "myself", title: "Do it myself", line: "No AI. Hands, paper, people." },
    { id: "with", title: "Do it with AI", line: "AI is one tool on the table." },
    { id: "ai", title: "Let AI do it", line: "Hand it over and see." },
  ] as const,
  afterChoice: "Noted. Nobody will tell you if that was right.",
  afterChoiceBody: "Run the class. Then come back and choose again. Whether you move is worth noticing.",
  again: "Choose again",
  returning: (station: string) => `Last time you chose “${station}.”`,
  moved: "You moved. That is worth noticing.",
  same: "Same choice. Also worth noticing.",
  timeUp: "Time’s up. Not choosing is a choice too.",
};

// 5–15 minutes: the AiR mission. The one loud band on the page.
export const MISSION = {
  eyebrow: "The AiR mission",
  ask: "If AI is so smart, why doesn’t it always give us exactly what we want?",
  answer: "AI cannot read your mind. The result is only as clear as the direction you give it.",
  body: "Learning to flow with AI means knowing what you want, communicating it clearly, checking the result, and improving it.",
  exampleLabel: "Quick example",
  weak: { label: "Weak prompt", text: "Create a cool car." },
  clear: { label: "Clearer prompt", text: "Create a red two-door sports car with black wheels, a low roof, narrow headlights, tinted windows, and a large rear spoiler." },
  askAgain: "Which prompt gives AI a better chance of creating the right car, and why?",
};


export type Move = {
  number: string;
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  promptLabel: string;
  prompts: string[];
  principle?: string;
  move: string;
  exampleLabel?: string;
  example?: string[];
  close: string;
};


// The four moves, in the words of the one-hour class.
export const METHOD: { eyebrow: string; title: string[]; intro: string; moves: Move[]; close: string } = {
  eyebrow: "Four easy moves",
  title: ["Clear. Direct.", "Judge. Make."],
  intro: "Students learn four easy moves. The same four moves work for an image, an essay, a résumé, a schedule, or a business idea.",
  moves: [
    {
      number: "01",
      slug: "clear",
      title: "Clear",
      tagline: "Know what you want.",
      intro: "Decide exactly what you want before anyone types. In the Prompt Relay this is the Observer’s job: study the reference and decide what matters most.",
      promptLabel: "The Observer asks:",
      prompts: ["What is it?", "What is its main shape?", "What colors are present?", "What makes it distinctive?", "What is in the background?"],
      principle: "Seeing something is easy. Clearly communicating what you see takes observation, teamwork, and judgment.",
      move: "Decide what matters most.",
      exampleLabel: "Weak vs. clear",
      example: ["Weak: “Create a cool car.”", "Clear: “Create a red two-door sports car with black wheels, a low roof, narrow headlights, tinted windows, and a large rear spoiler.”"],
      close: "Purpose before the tool.",
    },
    {
      number: "02",
      slug: "direct",
      title: "Direct",
      tagline: "Explain it clearly to AI.",
      intro: "Give AI clear instructions. In the Prompt Relay this is the Designer’s job: turn the team’s observations into the first prompt.",
      promptLabel: "The Designer’s structure:",
      prompts: ["Create a [subject] that is [color and shape].", "It has [important features].", "Show it from [view or angle].", "Place it against [background].", "Use a [realistic, illustrated, futuristic, or other] style."],
      principle: "AI cannot read your mind. The result is only as clear as the direction you give it.",
      move: "Write the first prompt.",
      close: "Clarity before cleverness.",
    },
    {
      number: "03",
      slug: "judge",
      title: "Judge",
      tagline: "Check what AI got right or wrong.",
      intro: "The first image is a draft. In the Prompt Relay this is the Quality Checker’s job: compare the result with the reference and name the differences.",
      promptLabel: "The Quality Checker asks:",
      prompts: ["What did AI get right?", "What did AI miss?", "What is the biggest difference?", "What should be added, removed, or changed?"],
      principle: "Give specific corrections. “It doesn’t look right” is not a correction.",
      move: "Name what AI got right, missed, or changed.",
      close: "Confidence is not evidence.",
    },
    {
      number: "04",
      slug: "make",
      title: "Make",
      tagline: "Improve and complete the result.",
      intro: "Improve it until it is useful. In the Prompt Relay this is the Finisher’s job: write the revision prompt with the team and generate the final image.",
      promptLabel: "Before the final generation, answer:",
      prompts: ["What is the largest difference between our image and the reference?", "What exact words could correct it?", "What should remain unchanged?", "Are we improving it, or accidentally making it worse?"],
      principle: "Keep everything else the same, but… Controlling AI often means focused changes instead of starting over.",
      move: "Write the revision prompt.",
      exampleLabel: "Revision prompt",
      example: ["“Keep the same car, but make the roof lower, change the wheels to black, make the headlights narrower, remove the background buildings, and show the car from the front-left angle.”"],
      close: "The mistake shows what your directions were missing.",
    },
  ],
  close: "AI creates the draft. You provide the direction, judgment, and final decision.",
};

// The one-hour class, block by block. Home shows the timeline; /class shows everything.
export type ClassBlock = {
  slug: string;
  time: string;
  title: string;
  summary: string;
  say?: string;
  ask?: string;
  do: string[];
  note?: string;
};

export const CLASS: { eyebrow: string; title: string[]; intro: string; setup: { label: string; value: string }[]; blocks: ClassBlock[]; cta: string } = {
  eyebrow: "The one-hour class",
  title: ["Twenty students.", "Four teams. One hour."],
  intro: "AiR: Flow With AI is a one-hour high school experience. Fifteen minutes to open and form teams. Forty-five minutes of core lesson. It runs in any room with one screen and one AI image generator.",
  setup: [
    { label: "Participants", value: "20 students" },
    { label: "Teams", value: "4 teams of 5, one captain each" },
    { label: "Opening and team setup", value: "15 minutes" },
    { label: "Core lesson", value: "45 minutes" },
  ],
  blocks: [
    {
      slug: "welcome",
      time: "0–5",
      title: "Welcome and team formation",
      summary: "Two images on the board. Four teams. Pick a name, a captain, and the car or the house.",
      say: "Today, you are not just learning about AI. You are competing to see which team can communicate with it most effectively.",
      do: ["Display one distinctive car and one distinctive house as students enter.", "Divide 20 students into four teams of five.", "Each team chooses a name, selects a captain, sits or stands together, and picks the car or the house.", "The captain keeps the team organized, but every student must participate."],
    },
    {
      slug: "mission",
      time: "5–15",
      title: "Explain the AiR mission",
      summary: "One question, one answer, four moves, and a weak prompt beside a clear one.",
      ask: "If AI is so smart, why doesn’t it always give us exactly what we want?",
      say: "AI cannot read your mind. The result is only as clear as the direction you give it. Learning to flow with AI means knowing what you want, communicating it clearly, checking the result, and improving it.",
      do: ["Allow two or three students to answer the question.", "Introduce the four moves: Clear, Direct, Judge, Make.", "Show the weak prompt and the clearer prompt.", "Ask: which prompt gives AI a better chance of creating the right car, and why?"],
    },
    {
      slug: "challenge",
      time: "15–20",
      title: "Explain the Prompt Relay",
      summary: "Recreate the car or house with written prompts only. Closest match wins, not prettiest.",
      say: "Seeing something is easy. Clearly communicating what you see takes observation, teamwork, and judgment.",
      do: ["Teams may study the reference image.", "They cannot upload or photograph the image for AI.", "They must recreate it using written prompts only.", "Every student must contribute.", "Teams receive a limited number of AI generations.", "The closest final result wins."],
    },
    {
      slug: "relay",
      time: "20–35",
      title: "The Prompt Relay",
      summary: "Five roles, one per student: Observer, Designer, Operator, Checker, Finisher.",
      do: ["Observer (Clear) names shape, color, features, angle, and background.", "Designer (Direct) turns the observations into the first prompt.", "AI Operator (Make) enters the prompt and displays the first result.", "Quality Checker (Judge) names what AI got right, missed, or changed.", "Finisher (Improve) writes the revision prompt with the team."],
      note: "Captain: watch the time, involve everyone, select the final image, and present for the team. If time permits, rotate roles for one final revision.",
    },
    {
      slug: "revision",
      time: "35–45",
      title: "Final revision",
      summary: "One last generation. Four questions first. Then: keep everything else the same, but…",
      say: "Keep everything else the same, but…",
      do: ["What is the largest difference between our image and the reference?", "What exact words could correct it?", "What should remain unchanged?", "Are we improving the image, or accidentally making it worse?"],
      note: "If they say “make it better,” ask: “What one exact change do you want?” If AI gets it wrong, say: “The mistake shows what your directions were missing.”",
    },
    {
      slug: "present",
      time: "45–52",
      title: "Team presentations",
      summary: "One minute per captain. Reference and final image side by side.",
      do: ["What did your team try to create?", "What was your first prompt?", "What did AI misunderstand?", "How did your team improve the prompt?", "What did you learn about communicating with AI?"],
      note: "Display the reference and each team’s final image side by side. Keep each captain to about one minute.",
    },
    {
      slug: "score",
      time: "52–56",
      title: "Score and celebrate",
      summary: "Thirty points across five categories. Three recognitions.",
      do: ["Similarity to the reference image · 10", "Clear and detailed prompting · 5", "Improvement between attempts · 5", "Teamwork and participation · 5", "Explanation of their process · 5"],
      note: "Recognize the AiR Challenge Champion, the Best Prompt Engineers, and the Best AI Comeback.",
    },
    {
      slug: "real-life",
      time: "56–60",
      title: "Connect AiR to real life",
      summary: "The same four moves work beyond image generation. Then the One-Move Challenge.",
      say: "You do not need to become an AI expert today. You need to know your purpose, give clear direction, challenge the result, and make something useful. That is how you flow with AI.",
      do: ["Personal life, school, and future careers.", "Safety reminder: check important information, protect personal information, follow school rules, use your own judgment.", "Each student completes: “This week, I can use AI to help me ______.”", "Final call-and-response."],
    },
  ],
  cta: "Open the full class plan",
};

// 20–35 minutes: the Prompt Relay roles.
export const RELAY = {
  eyebrow: "The Prompt Relay",
  title: ["Five students.", "Five roles. One image."],
  intro: "Each team must use AI to recreate the car or house on the board. The goal is not to make something attractive. The goal is the closest match to the reference image.",
  rules: ["Study the reference image. Do not upload or photograph it for AI.", "Recreate it using written prompts only.", "Every student contributes. Teams receive limited generations.", "The closest final image wins, not simply the prettiest image."],
  roles: [
    { number: "1", role: "The Observer", move: "Clear", job: "Studies the image and decides what matters most: what it is, its main shape, its colors, what makes it distinctive, what is in the background. Cannot write the whole prompt alone." },
    { number: "2", role: "The Designer", move: "Direct", job: "Turns the team’s observations into the first prompt using the structure: subject, color and shape, important features, view or angle, background, style." },
    { number: "3", role: "The AI Operator", move: "Make", job: "Enters the prompt into the AI image generator and displays the first result. The team compares it with the reference." },
    { number: "4", role: "The Quality Checker", move: "Judge", job: "Asks what AI got right, what it missed, the biggest difference, and what should be added, removed, or changed. Specific corrections only." },
    { number: "5", role: "The Finisher", move: "Improve", job: "Works with the team to write the revision prompt. Keep the same subject, but change the exact things the Checker named. Generate the revised image." },
  ],
  captain: { title: "The captain", jobs: ["Keeps everyone involved.", "Watches the time.", "Makes sure instructions are specific.", "Selects the team’s final image.", "Gives the team’s short presentation."] },
  rotate: "If time permits, teams rotate roles for one final revision.",
  structure: {
    label: "The Designer’s structure",
    fields: [
      { key: "subject", label: "Subject", placeholder: "a two-door sports car" },
      { key: "look", label: "Color and shape", placeholder: "red, low and wide" },
      { key: "features", label: "Important features", placeholder: "black wheels, narrow headlights, tinted windows, a large rear spoiler" },
      { key: "angle", label: "View or angle", placeholder: "the front-left" },
      { key: "background", label: "Background", placeholder: "an empty road at sunset" },
      { key: "style", label: "Style", placeholder: "realistic" },
    ],
    build: (v: Record<string, string>) => `Create ${v.subject || "a [subject]"} that is ${v.look || "[color and shape]"}. It has ${v.features || "[important features]"}. Show it from ${v.angle || "[view or angle]"}. Place it against ${v.background || "[background]"}. Use a ${v.style || "[realistic, illustrated, futuristic, or other]"} style.`,
    copy: "Copy prompt",
    copied: "Copied",
    note: "Nothing you type here is sent anywhere. Paste the prompt into whatever image generator your room uses.",
  },
};

// 52–56 minutes: score and celebrate.
export const SCORING = {
  eyebrow: "Score and celebrate",
  title: ["Thirty points.", "Three recognitions."],
  intro: "Score each team using five simple categories. The first image is a draft; the points reward the judging and the improving, not just the picture.",
  rows: [
    { category: "Similarity to the reference image", points: 10 },
    { category: "Clear and detailed prompting", points: 5 },
    { category: "Improvement between attempts", points: 5 },
    { category: "Teamwork and participation", points: 5 },
    { category: "Explanation of their process", points: 5 },
  ],
  total: 30,
  recognitions: [
    { name: "AiR Challenge Champion", line: "Closest overall match" },
    { name: "Best Prompt Engineers", line: "Clearest instructions" },
    { name: "Best AI Comeback", line: "Greatest improvement from first to final image" },
  ],
  prizes: "Small prizes could include certificates, snacks, AiR wristbands, or the winning image featured on the AiR website or social media, with school and parent approval.",
};

// 56–60 minutes: the same four moves in real life.
export const REAL_LIFE = {
  eyebrow: "Connect AiR to real life",
  title: ["The same four moves", "work everywhere."],
  intro: "Image generation is the practice field. The four moves work the same way for a goal, a test, a résumé, or a business.",
  columns: [
    { title: "Personal life", items: ["Plan a personal goal", "Create a workout or meal plan", "Organize a schedule", "Develop a creative hobby", "Compare choices before making a decision"] },
    { title: "School", items: ["Understand difficult subjects", "Create study guides", "Practice for tests", "Brainstorm project ideas", "Improve your writing without letting AI do all the thinking"] },
    { title: "Future careers", items: ["Explore careers", "Practice interviews", "Build résumés", "Design products", "Develop business ideas", "Create marketing campaigns", "Solve workplace problems"] },
  ],
};

// The close: the One-Move Challenge and the call-and-response.
export const CLOSE = {
  eyebrow: "The One-Move Challenge",
  sentence: ["This week, I can use AI to help me", "."],
  invite: "Invite four or five students to share their answers.",
  pinLabel: "Write yours",
  pinHref: "/ideas",
  closing: "You do not need to become an AI expert today. You need to know your purpose, give clear direction, challenge the result, and make something useful. That is how you flow with AI.",
  callResponse: [
    { call: "What comes before the tool?", response: "Purpose!" },
    { call: "Who makes the final decision?", response: "We do!" },
    { call: "Clear the AiR…", response: "…then make something!" },
  ],
};


export const IDEA = {
  eyebrow: "The idea",
  title: ["AI is fast.", "Your judgment is the real work."],
  lever: ["AI is a lever.", "It is not a hand."],
  intro: "A hammer does not build a house. A hammer plus a person who knows what they want builds a house. Push nothing into AI, you get nothing. Push something clear into it, you get something enormous. AiR is the gym for the lever. Four moves, in order, every time, with any tool.",
  close: "The tools will change. These four moves stay useful. Each one is a decision only a human can make.",
  lessonsLabel: (count: number) => `See the ${count} lessons`,
};


export const WHY_AIR = {
  eyebrow: "Why AiR exists",
  title: ["You were born", "in winter."],
  intro: "Someone probably told you AI is coming for your job. They have the story backwards. Not because AI is harmless. Because of when you were born.",
  seasons: [
    { name: "Spring", line: "Everybody builds. New roads, new schools. Things feel solid." },
    { name: "Summer", line: "People get comfortable and ask if any of it means anything." },
    { name: "Fall", line: "Trust breaks down. Everybody picks a team." },
    { name: "Winter", line: "Everything hollow gets knocked down. Something new gets built in its place." },
  ],
  thisWinter: "History moves in seasons. This winter started in 2008. It is expected to end around 2033. If you were born near 2008, you have never lived through a normal year. Adults call that sad. It is the whole point of you.",
  lastSpring: {
    label: "The last winter ended in 1946. Look at what got built right after.",
    items: ["1947 · The transistor", "1955 · The polio vaccine", "1956 · The interstate highways", "1958 · NASA"],
    close: "Spring is not a nap. Spring is a construction site.",
  },
  builders: {
    label: "Who built the last spring?",
    people: [
      { name: "Martin Luther King Jr.", note: "17 when that winter ended" },
      { name: "Neil Armstrong", note: "16 when that winter ended" },
      { name: "Gordon Moore", note: "17 when that winter ended. Co-founded Intel." },
    ],
    close: "They were you. Sitting in a gym, being told the world was ending. Then they were the ones standing there with a blank page.",
  },
  shift: "Winter kids build spring.",
  body: [
    "The people who grow up while everything is being rebuilt are the ones who decide what the rebuilt thing looks like. Not because they are smarter. Because they are not attached to the old version.",
    "This is not a disadvantage. It is a superpower with bad marketing. And it is not only for teenagers. Anyone starting over, at any age, is standing on the same moving ground.",
  ],
  choice: {
    label: "In winter there are two kinds of people.",
    wait: { title: "Wait", vibe: "The group chat where nobody picks the restaurant.", behavior: "Keep your head down. Scroll. Let somebody else figure it out.", outcome: "You get somebody else’s spring." },
    plant: { title: "Plant", vibe: "The one person who drops a pin and says “be there at seven.”", behavior: "Make one small thing, on purpose, for a real person. Find out what happens.", outcome: "You build the spring." },
  },
  close: "Spring is coming. Nobody has the blueprints yet. You do.",
};

// The power of "yet". Tap a fixed sentence and watch it turn into a growth sentence.


export const YET = {
  eyebrow: "Try it",
  title: "Add one word.",
  intro: "A fixed mindset says “I can’t.” A growth mindset says “not yet.” Tap a sentence to change it.",
  statements: [
    { fixed: "I’m not a tech person, so I can’t do this.", growth: "I’m not a tech person yet. I can learn one move at a time." },
    { fixed: "The AI gave me a bad answer. I’m terrible at this.", growth: "The AI gave me a bad answer. I haven’t fixed my directions yet." },
    { fixed: "AI changes too fast for me.", growth: "I don’t know every tool yet. I don’t need to. I know the four moves." },
    { fixed: "I don’t know how to code, so I can’t build anything.", growth: "I don’t know how to code yet. I can still make something real this week." },
  ],
  note: "Abilities grow like muscles. Every hard try builds the connection.",
};


export type Level = {
  slug: "explore" | "create" | "build";
  title: string;
  tagline: string;
  intro: string;
  learn: string[];
  bestFor: string;
};


export const LEVELS: { eyebrow: string; title: string[]; intro: string; levels: Level[]; note: string; cta: string } = {
  eyebrow: "Choose your level",
  title: ["Same lessons.", "Your kind of support."],
  intro: "Every lesson has three levels. Pick the one that fits you today. Switch any time, inside any lesson. Nobody is ranked by age.",
  levels: [
    {
      slug: "explore",
      title: "Explore",
      tagline: "See what AI can do.",
      intro: "More guidance and a finished thing at the end. Great for a first time, for younger learners, or for learning with a kid.",
      learn: ["Understand AI in plain words", "Ask useful questions", "Spot when AI makes a mistake", "Keep your private details private"],
      bestFor: "Beginners, families, and anyone who wants to start simple.",
    },
    {
      slug: "create",
      title: "Create",
      tagline: "Turn an idea into something real.",
      intro: "A real project with real choices. You keep your own voice in the work and get feedback from a real person.",
      learn: ["Brainstorm stronger ideas", "Write, plan, and revise", "Compare options and choose", "Keep your voice in the work"],
      bestFor: "Students, creators, storytellers, and artists with ideas to develop.",
    },
    {
      slug: "build",
      title: "Build",
      tagline: "Use AI to move your goals forward.",
      intro: "Go under the hood. Workflows, research, plans, and production decisions for real opportunities.",
      learn: ["Develop a business or job plan", "Research customers and industries", "Improve a résumé or proposal", "Build a workflow you can repeat"],
      bestFor: "Entrepreneurs, job seekers, working adults, and returning citizens.",
    },
  ],
  note: "Not difficulty tiers. Age does not decide depth. An eight-year-old and a developer can both start in Explore. Every level ends in a finished thing.",
  cta: "Open the lessons",
};


export type Audience = {
  slug: string;
  label: string;
  headline: string[];
  intro: string[];
  listLabel: string;
  list: string[];
  after?: string[];
  close?: string;
  cta?: { label: string; href: string };
  extra?: { title: string; intro: string; list: string[]; close: string };
};


export const AUDIENCES: Audience[] = [
  {
    slug: "students",
    label: "Middle and high school students",
    headline: ["Your ideas already have power.", "AiR helps you level them up."],
    intro: [
      "AI is becoming part of school, work, entertainment, business, and everyday life. Knowing how to use it responsibly can help you become a stronger student, creator, problem-solver, and future leader.",
    ],
    listLabel: "With AiR, you can learn how to:",
    list: [
      "Break down difficult subjects",
      "Build personalized study guides",
      "Practice questions before a test",
      "Turn notes into clear summaries",
      "Brainstorm science fair or class project ideas",
      "Plan presentations",
      "Explore careers",
      "Create business concepts",
      "Write scripts and story outlines",
      "Develop social media campaigns",
      "Organize clubs and community projects",
      "Check whether online information is real",
    ],
    after: [
      "But real talk: using AI to do all your thinking for you is not the move.",
      "AiR teaches you how to use AI as a partner while keeping your own ideas, voice, judgment, and responsibility at the center.",
    ],
    close: "The goal isn’t to let AI replace your brain. The goal is to train your brain to use AI wisely.",
    extra: {
      title: "Projects students can build",
      intro: "You won’t only watch videos or listen to lectures. You’ll make things. Possible AiR projects include:",
      list: [
        "Create a study plan for your hardest class",
        "Design a business you can start with less than $100",
        "Build a résumé for your first job",
        "Develop a campaign around an issue in your community",
        "Create a short film concept",
        "Plan a school event",
        "Make a presentation about a career you want to explore",
        "Design a healthier weekly routine",
        "Build a website content plan",
        "Create a neighborhood resource guide",
        "Research scholarships and prepare an application checklist",
      ],
      close: "Start small. Test your work. Improve it. Then show what changed.",
    },
  },
  {
    slug: "parents",
    label: "Parents and caregivers",
    headline: ["Shared learning.", "Clear boundaries. No pressure."],
    intro: [
      "AI is already influencing how young people learn, communicate, search, create, and make decisions. AiR gives families a safe and practical way to learn together.",
    ],
    listLabel: "Parents and caregivers receive guidance for:",
    list: [
      "Talking with young people about AI",
      "Protecting personal and family information",
      "Identifying false or misleading content",
      "Setting healthy expectations for schoolwork",
      "Checking sources together",
      "Helping children use age-appropriate tools",
      "Encouraging creativity without encouraging shortcuts",
      "Understanding when human help is still necessary",
    ],
    close: "AiR does not treat young people like passive technology users. We help them become thoughtful decision-makers.",
  },
  {
    slug: "adults",
    label: "Adults",
    headline: ["You are not", "too late."],
    intro: ["AI is not only for programmers, large companies, or people who grew up using technology."],
    listLabel: "AiR helps adults use AI for practical everyday needs, including:",
    list: [
      "Writing professional emails",
      "Preparing résumés and cover letters",
      "Practicing for job interviews",
      "Organizing schedules and responsibilities",
      "Understanding complicated documents",
      "Developing presentations",
      "Researching new industries",
      "Planning a household budget",
      "Creating business and marketing materials",
      "Learning new workplace skills",
      "Turning years of experience into new opportunities",
    ],
    close: "You bring the life experience. AI can help you organize, develop, and communicate it.",
  },
  {
    slug: "returning-citizens",
    label: "Returning citizens",
    headline: ["Your past does not", "cancel your potential."],
    intro: [
      "Technology changes quickly. After incarceration, returning to a world filled with new platforms, automated systems, and AI can feel overwhelming. AiR creates a respectful starting point.",
      "There are no grades, no judgment, and no expectation that you already understand the technology. We begin with what you know, what you have experienced, and what you want to build next.",
    ],
    listLabel: "AiR can help returning citizens:",
    list: [
      "Build digital confidence",
      "Create or improve a résumé",
      "Explain transferable skills",
      "Prepare for interviews",
      "Research career and training options",
      "Draft professional emails",
      "Organize important questions for service providers",
      "Develop a legal business idea",
      "Create a basic business or marketing plan",
      "Plan products and services",
      "Build presentations and proposals",
      "Strengthen communication skills",
      "Identify information that should be verified",
      "Protect sensitive personal information",
    ],
    after: [
      "AI cannot erase barriers, guarantee employment, or make important decisions for you. But when used carefully, it can become a practical tool for preparation, communication, organization, and opportunity.",
    ],
    close: "Your experience has value. Let’s turn it into your next move.",
  },
  {
    slug: "entrepreneurs",
    label: "Entrepreneurs and small businesses",
    headline: ["Big idea?", "Let’s make it make sense."],
    intro: [
      "You do not need a huge team to organize your next business move. AiR teaches entrepreneurs how to use AI to support—not control—their businesses.",
    ],
    listLabel: "Learn how to:",
    list: [
      "Clarify your business concept",
      "Identify possible customers",
      "Research competitors",
      "Develop product and service descriptions",
      "Create brand messaging",
      "Draft proposals",
      "Build presentation outlines",
      "Plan social media content",
      "Write customer emails",
      "Develop frequently asked questions",
      "Organize workflows and task lists",
      "Compare possible strategies",
      "Review AI-generated material before publishing it",
    ],
    after: [
      "AiR also teaches an essential business rule: never place private customer information, passwords, protected business data, confidential contracts, or financial account information into an AI tool without understanding how that information may be stored or used.",
    ],
    close: "Move faster—but keep human judgment in charge.",
  },
  {
    slug: "educators",
    label: "Educators and trainers",
    headline: ["One method.", "Many learning environments."],
    intro: [
      "AiR gives educators a repeatable method that can work across different ages, reading levels, subjects, and levels of technical experience.",
    ],
    listLabel: "The program can support:",
    list: [
      "Classroom AI-readiness lessons",
      "After-school programs",
      "Career-readiness workshops",
      "Project-based learning",
      "Digital literacy programs",
      "Entrepreneurship education",
      "Family learning events",
      "Workforce-development training",
      "Reentry and returning-citizen programs",
      "Community technology workshops",
    ],
    after: [
      "Educators can use AiR to help learners choose a meaningful outcome, give clear directions, question and verify AI-generated information, create and test something useful, and reflect on what changed.",
      "The focus is not on memorizing a particular platform. Tools will change. Human judgment, curiosity, communication, and responsibility will continue to matter.",
    ],
    cta: { label: "Bring AiR to your classroom", href: "/partner" },
  },
  {
    slug: "community",
    label: "Community organizations",
    headline: ["Access,", "not hype."],
    intro: [
      "Community organizations need AI education that is useful, understandable, culturally relevant, and accessible.",
    ],
    listLabel: "AiR can support:",
    list: [
      "Nonprofit organizations",
      "Libraries",
      "Recreation centers",
      "Faith communities",
      "Youth programs",
      "Reentry organizations",
      "Workforce-development programs",
      "Neighborhood associations",
      "Community schools",
      "Small-business programs",
      "Makerspaces and creative studios",
    ],
    after: [
      "AiR sessions can take place in classrooms, libraries, community rooms, nonprofit workspaces, creative offices, and other trusted local environments. Participants can learn on shared devices, through group instruction, or with paper-based activities before working on a screen.",
    ],
    close: "The community becomes the lab. People build together, review one another’s work, and create outcomes that can help real people.",
    cta: { label: "Bring AiR to your community", href: "/partner" },
  },
];


export const WHAT_YOU_LEARN = {
  eyebrow: "What you will learn",
  title: ["Skills that outlast", "the tools."],
  intro: "AiR helps learners strengthen skills that remain useful even when AI tools change. You will practice how to:",
  skills: [
    "Set a clear goal",
    "Ask better questions",
    "Write better AI instructions",
    "Add useful context",
    "Define what a good result should include",
    "Compare different responses",
    "Recognize incomplete or inaccurate information",
    "Verify important claims",
    "Identify possible bias",
    "Protect personal information",
    "Revise weak results",
    "Keep your own voice",
    "Decide when not to use AI",
    "Turn an idea into a finished product",
    "Explain your choices to another person",
  ],
  close: "These are not just AI skills. They are communication, critical-thinking, creativity, business, and leadership skills.",
};


export const SAFETY = {
  eyebrow: "Safety reminder",
  title: ["Never automatically trust", "an AI answer."],
  intro: "Check important information, protect personal information, follow school rules, and use your own judgment.",
  rules: [
    { title: "Check important information", body: "AI can invent facts, sources, names, quotations, and statistics. Verify important information with trustworthy sources." },
    { title: "Protect personal information", body: "Do not share passwords, Social Security numbers, home addresses, private medical information, bank details, confidential business information, or other sensitive data." },
    { title: "Follow school rules", body: "Always follow your school’s AI policy. Using AI to understand and practice is different from using it to misrepresent work as your own." },
    { title: "Use your own judgment", body: "AI should not make serious medical, legal, financial, educational, employment, or safety decisions for you. You make the final decision." },
    { title: "Watch for bias", body: "AI-generated answers can repeat stereotypes or leave out important perspectives. Ask what may be missing and who might be affected." },
    { title: "Ask for help", body: "Young learners should use public AI tools with guidance from a parent, caregiver, educator, or another trusted adult." },
  ],
};


export const NOT_AIR = {
  eyebrow: "What AiR is not",
  title: ["A durable method,", "not a trend."],
  items: [
    "A get-rich-quick program",
    "A collection of “magic prompts”",
    "A promise that AI will solve every problem",
    "A program that encourages students to cheat",
    "A replacement for teachers, professionals, or human relationships",
    "A popularity contest",
    "A place where learners are made to feel behind",
    "A course built around one temporary AI platform",
  ],
  close: "AiR teaches a durable method that learners can use as technology continues to change.",
};

// Judge: read the "tells" in an AI draft the way an investigator reads a room.


export const SEAMS = {
  eyebrow: "Read the tells",
  title: ["An AI draft has", "body language too."],
  intro: "An investigator does not look for one magic sign of a lie. They look for spots where behavior shifts under pressure. An AI draft has the same spots: a confident detail with no source, a request that crosses a line, a promise nobody could keep. Tap each highlighted part.",
  signals: [
    { name: "Fit", question: "Does it answer the task for the people it is for?" },
    { name: "Evidence", question: "Which dates, names, numbers, or claims need checking?" },
    { name: "People", question: "Could this leave someone out, stereotype them, or mislead them?" },
    { name: "Privacy", question: "Did it expose private details without permission?" },
  ],
  draft: [
    { text: "We will host the neighborhood workshop next Tuesday at " },
    { text: "6:00 p.m. Free parking is behind the library.", tell: "evidence" },
    { text: " Everyone should " },
    { text: "bring their medical records", tell: "privacy" },
    { text: " so we can make a personal safety plan. " },
    { text: "Our tools guarantee 100% accurate results.", tell: "fit" },
  ],
  tells: {
    evidence: { title: "The detail tell", body: "It sounds sure about the time and the parking. Nobody checked the library schedule. Confident is not the same as true.", action: "Verify the details before you send." },
    privacy: { title: "The boundary tell", body: "It casually asks for private medical records. That crosses a line a careful person would never cross.", action: "Pause and protect. Never put private details into a public tool." },
    fit: { title: "The overconfidence tell", body: "“100% accurate” is a promise no tool can keep. Big words are covering a gap.", action: "Treat it as a draft, never as the answer." },
  },
  prompt: "Tap a highlighted part of the draft.",
};


// Optional warm-ups from the former protocol. Not the method; a facilitator may open with one.

export type Situation = {
  slug: string;
  name: string;
  kicker: string;
  setup: string;
  say: string;
  watch: string[];
  twist: string;
  again: string;
};


export const SITUATIONS: { eyebrow: string; title: string[]; intro: string; items: Situation[]; test: { label: string; question: string; rule: string } } = {
  eyebrow: "Optional warm-ups",
  title: ["Warm-ups", "before the class."],
  intro: "These short situations come from an earlier version of AiR. They are not the method. If you want five minutes of energy before the one-hour class, open with one, then run the Prompt Relay.",
  items: [
    {
      slug: "three-stations",
      name: "Three stations",
      kicker: "Expose · Evolve",
      setup: "Three spots in the room, marked on the floor: DO IT MYSELF. DO IT WITH AI. LET AI DO IT.",
      say: "“You have 10 seconds. Choose.”",
      watch: ["Where each person goes", "Who hesitates", "Who follows a friend"],
      twist: "Give them a real challenge for 45 minutes. Say nothing about the stations.",
      again: "Repeat the exact same choice. The movement of the room is your data. No survey needed.",
    },
    {
      slug: "the-walls",
      name: "The walls",
      kicker: "Expose · Reflect",
      setup: "Three walls: I KNOW. I THINK I KNOW. I HAVE NO IDEA.",
      say: "“AI understands you.” “AI is creative.” “AI will replace jobs.” “AI makes you smarter.” “AI can have original ideas.” Go stand where you belong.",
      watch: ["Where people stand", "Who moves when a friend moves", "Who stays alone"],
      twist: "Do not tell anyone whether they are right. Photograph the room.",
      again: "At the end, read the same statements. Photograph again. Now you can see whether perspectives moved.",
    },
    {
      slug: "controlled-confusion",
      name: "Controlled confusion",
      kicker: "Disrupt · Explore",
      setup: "Five teams get the same mysterious output. Nobody is told how it was made.",
      say: "“Your job is not to name the software. Your job is to figure out what happened.”",
      watch: ["Who searches", "Who asks AI", "Who inspects the file", "Who asks a person", "Who tries to recreate it", "Who decides the question itself is wrong"],
      twist: "School tries to remove confusion. We create safe confusion on purpose.",
      again: "Give a second mystery. See whether the first approach comes back or a new one shows up.",
    },
    {
      slug: "impossible-instructions",
      name: "Impossible instructions",
      kicker: "Disrupt · Collide",
      setup: "One instruction on the wall. Materials everywhere.",
      say: "“Make something you have never seen before.”",
      watch: ["Who searches for references first", "Who starts with their hands", "Who asks AI for an example"],
      twist: "Stop the searcher: “If you are looking at somebody else’s solution, how will you make something you have never seen?” Then hand them AI with one condition: you cannot ask it for an example.",
      again: "Now AI has to be a thinking partner, not an imitation machine. Watch whether the next request changes.",
    },
    {
      slug: "ai-cannot-answer",
      name: "AI cannot answer",
      kicker: "Disrupt · Reflect",
      setup: "Flip the relationship. For fifteen minutes, AI is not allowed to answer. It can only ask.",
      say: "You: “Help me make a clothing brand.” AI: “Who should want to wear it?” You answer. AI: “What should someone feel when they see it?” You answer. AI: “What do you hate about the brands that exist?”",
      watch: ["Who gets frustrated", "Who starts answering faster", "Whose idea gets sharper"],
      twist: "AI stops being the answer machine. It becomes the thinking machine.",
      again: "Give AI its answers back. See whether people still ask it to think with them.",
    },
    {
      slug: "collision",
      name: "Collision",
      kicker: "Collide",
      setup: "Pair people who would never work together. Give both a human tool and an AI tool.",
      say: "“Make one thing together. Both of you have to be able to explain why it is good.”",
      watch: ["Who leads", "Which tool gets picked first", "What gets thrown away"],
      twist: "Halfway through, swap the tools.",
      again: "Run it with a new partner. Compare what each person kept from the first round.",
    },
  ],
  test: {
    label: "Then run the class",
    question: "Clear the AiR. Then make something.",
    rule: "Four teams, one hour, one Prompt Relay.",
  },
};

// What we watch. Behavior, not answers.


export const ROOM = {
  eyebrow: "Warm-up: the walls",
  title: ["No rows", "of chairs."],
  intro: "Walk into AiR and there are objects, QR codes, images, unfinished artwork, screens, headphones, strange instructions, and open floor. Three walls have words on them.",
  walls: [
    { id: "know", label: "I know." },
    { id: "think", label: "I think I know." },
    { id: "noidea", label: "I have no idea." },
  ] as const,
  statements: ["AI understands you.", "AI is creative.", "AI will replace jobs.", "AI makes you smarter.", "AI can have original ideas."],
  instruction: "Read a statement. Put it on a wall. Nobody will tell you if you are right.",
  photo: "In the room we photograph where everyone stands. That photo is the dataset. Later we repeat it and see whether people moved.",
  saved: "Saved on this device. Come back after a challenge and place them again.",
  replay: "Place them again",
  compare: "Compared with last time",
  movedCount: (n: number) => (n === 0 ? "Nothing moved. Yet." : n === 1 ? "One statement moved." : `${n} statements moved.`),
};

// Situations: the challenge library. Conditions, not content.


export const EVIDENCE = {
  eyebrow: "What a facilitator can watch",
  title: ["Behavior,", "not answers."],
  intro: "Scoring uses the thirty-point rubric. While the relay runs, a facilitator can also notice these. They are not points; they are what to coach next.",
  rows: [
    { evidence: "Your first action", reveals: "Your default way of solving a problem" },
    { evidence: "Your first AI request", reveals: "How you think of AI" },
    { evidence: "Attempts you abandoned", reveals: "How much experimenting you can stand" },
    { evidence: "Tool switching", reveals: "Adaptability" },
    { evidence: "Questions you ask other people", reveals: "Collaboration" },
    { evidence: "What you save", reveals: "What you value" },
    { evidence: "Your final decision", reveals: "Judgment" },
    { evidence: "Your second attempt", reveals: "Whether learning happened" },
  ],
  close: "Nobody has to know these are being watched. There is no grade. There is only what you did, and what you do next time.",
};

// The protocol, against the usual shape of school.


export const FAQ: Array<{ q: string; a: string }> = [
  { q: "Is AiR free?", a: "Yes. AiR is designed as a free AI-readiness learning community." },
  { q: "What happens in the one-hour class?", a: "Four teams of five compete to recreate a car or a house with written prompts only. Every student takes a role in the Prompt Relay, teams revise once, captains present for one minute, and the closest match wins on a thirty-point rubric." },
  { q: "What are the four moves?", a: "Clear: know what you want. Direct: explain it clearly to AI. Judge: check what AI got right or wrong. Make: improve and complete the result." },
  { q: "Who can participate?", a: "AiR welcomes learners from age eight through adulthood. The one-hour class is written for high school; the moves and the relay adapt to younger and older groups." },
  { q: "Do I need AI experience?", a: "No. You need to be able to look at a picture and say what you see. The class teaches the rest." },
  { q: "Do I need to know how to code?", a: "No. Coding may be explored in certain activities, but it is not required to begin." },
  { q: "What equipment does the class need?", a: "One screen to display the reference images, one AI image generator the school allows, and a way for each team to enter prompts. Teams get a limited number of generations on purpose." },
  { q: "Is AiR only for students?", a: "No. AiR is for students, families, educators, creators, entrepreneurs, working adults, community organizations, and returning citizens." },
  { q: "Will AiR teach me the AI tools?", a: "AiR teaches you how to communicate with AI. Tools change; the four moves do not. The class uses whichever image generator your room has." },
  { q: "Is there a test?", a: "There is a competition. Teams are scored on similarity to the reference, clear prompting, improvement between attempts, teamwork, and explaining their process. Nobody is graded as a person." },
  { q: "Isn’t using AI cheating?", a: "Using a calculator on a test where it is not allowed is cheating. Using one to build a bridge is engineering. AiR is the bridge class. Always follow your school’s AI policy." },
  { q: "Can AI do my schoolwork for me?", a: "AI can help you understand a topic, practice, organize ideas, and improve your work. It should not replace your learning or be used to misrepresent work as your own. Always follow your school’s AI policy." },
  { q: "Is everything AI generates accurate?", a: "No. AI can produce incorrect, incomplete, biased, or fabricated information. Never automatically trust an AI answer. Check important information and use your own judgment." },
  { q: "Can AiR help me start a business?", a: "AiR can help you develop ideas, research questions, organize plans, create drafts, and improve business communication. Results depend on your decisions, effort, resources, market conditions, and follow-through." },
  { q: "Is AiR helpful for someone returning home after incarceration?", a: "Yes. AiR provides a supportive entry point for rebuilding digital confidence, preparing for work, communicating professionally, organizing goals, and developing legitimate business opportunities." },
  { q: "Does AiR provide legal, medical, or financial advice?", a: "No. AI-generated information and AiR educational activities should not replace qualified professional advice." },
];

export const FINAL_CTA = {
  eyebrow: "Ready?",
  title: ["Clear the AiR.", "Then make something."],
  steps: ["Know what you want.", "Explain it clearly.", "Check the result.", "Improve it.", "Present it."],
  way: "That is how you flow with AI.",
  moves: "Clear. Direct. Judge. Make.",
  tagline: "AI creates the draft. You make the final decision.",
  bring: "Bring the class to your school",
};

export const PARTNER = {
  eyebrow: "Partner with AiR",
  title: ["Bring the one-hour class", "to your room."],
  intro: "Schools, nonprofits, libraries, rec centers, workforce programs, faith communities, and reentry organizations can host AiR: Flow With AI or train their own instructors to run it.",
  listLabel: "What a partnership can look like:",
  opportunities: [
    "A one-hour AiR class in your space, run by an AiR instructor",
    "Training your staff to run the Prompt Relay themselves",
    "A competition day: several classes, one leaderboard",
    "Family sessions where kids and adults take relay roles side by side",
    "Workforce and reentry cohorts that run the four moves on real tasks",
    "The winning images featured on the AiR site, with school and parent approval",
  ],
  become: "Become an AiR partner",
  request: "Request a class",
};


export const CONTACT = {
  eyebrow: "Contact AiR",
  title: ["Let’s make", "a move."],
  intro: "Want to learn more, host a session, volunteer, teach, partner, or bring AiR to your community?",
  cta: "Contact the AiR team",
};


export const EVENT_INTRO = {
  eyebrow: "What the class sounds like",
  lines: [
    "Today, you are not just learning about AI. You are competing.",
    "If AI is so smart, why doesn’t it always give us exactly what we want?",
    "AI cannot read your mind. The result is only as clear as the direction you give it.",
    "Keep everything else the same, but…",
    "Clear the AiR. Then make something.",
  ],
};

export const FOOTER = {
  name: "AiR — AI Readiness",
  tagline: "Clear the AiR. Then make something.",
  line: "Free community learning for ages 8 to adult.",
  partnership: "Presented in partnership with",
  learn: [
    { label: "The one-hour class", href: "/class" },
    { label: "Four moves", href: "/#moves" },
    { label: "The Prompt Relay", href: "/#relay" },
    { label: "Why AiR exists", href: "/why" },
    { label: "Who AiR is for", href: "/for" },
  ],
  more: [
    { label: "Community", href: "/community" },
    { label: "Lessons (members)", href: "/curriculum" },
    { label: "Warm-ups", href: "/situations" },
    { label: "Camera studio", href: "/studio" },
    { label: "For trainers", href: "/trainers" },
    { label: "Partner with AiR", href: "/partner" },
    { label: "Contact", href: "/partner#contact" },
  ],
  copyright: "© 2026 AiR — AI Readiness. All rights reserved.",
};
