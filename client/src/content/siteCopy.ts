// Public-site copy for AiR — AI Readiness. Edit words here, not in the pages.

export const SITE = {
  name: "AiR — AI Readiness",
  tagline: "Stop learning AI. Learn to move with it.",
  domain: "aireadiness.me",
  websiteUrl: "https://aireadiness.me",
  partnerName: "Digi2U.org",
  partnerUrl: "https://digi2u.org",
  // All contact / partnership buttons go here until AiR has its own inbox.
  contactUrl: "https://digi2u.org/contact-us/",
  shortDescription:
    "AiR — AI Readiness is a free learning protocol for ages eight through adulthood. We do not explain AI. We create situations, watch what you do, capture your decisions, and change the situation so you have to decide again. The goal is adaptive thinking.",
  socialBio: ["We don’t explain AI. We create situations.", "Free for ages 8 to adult.", "Expose. Disrupt. Explore. Collide. Reflect. Evolve."],
};

export const HERO = {
  pill: "Free for everyone",
  eyebrow: "Ages 8 to adult",
  rule: "Start with one rule: we don’t explain AI.",
  prompt: "You have 10 seconds. Choose.",
  challenge: "The challenge: make one thing today that helps one real person.",
  stations: [
    { id: "myself", title: "Do it myself", line: "No AI. Hands, paper, people." },
    { id: "with", title: "Do it with AI", line: "AI is one tool on the table." },
    { id: "ai", title: "Let AI do it", line: "Hand it over and see." },
  ] as const,
  afterChoice: "Noted. Nobody will tell you if that was right.",
  afterChoiceBody: "Try one challenge. Then come back and choose again. Whether you move is the lesson.",
  again: "Choose again",
  returning: (station: string) => `Last time you chose “${station}.”`,
  moved: "You moved. That is the data.",
  same: "Same choice. Also data.",
  timeUp: "Time’s up. Not choosing is a choice too.",
  join: "Join AiR free",
  see: "See the protocol",
};

// The one rule, in the words we use in the room.
export const RULE = {
  eyebrow: "The rule",
  title: ["We don’t", "explain AI."],
  nots: ["No presentation.", "No “What is AI?” lesson.", "No vocabulary sheet.", "No tutorial.", "Nobody at the front of the room explaining prompting."],
  instead: ["Create situations.", "Watch what people do.", "Capture their decisions.", "Change the situation so they have to decide again."],
  close: "The teaching material comes from what happens in the room, not from information prepared beforehand.",
};

// The six actions. Every AiR session runs this loop.
export const ACTIONS = {
  eyebrow: "The method",
  title: ["Six actions.", "One loop."],
  intro: "Not a lesson plan. A loop you can run in any room, with any people, with whatever is on the table.",
  steps: [
    { name: "Expose", line: "Reveal how you think now, without asking you to explain it.", detail: "You get an unfamiliar problem. We watch what you reach for first." },
    { name: "Disrupt", line: "Take away your normal solution.", detail: "Everyone grabs ChatGPT? ChatGPT is gone. Everyone wants search? No search. You lean on written prompts? No written prompts." },
    { name: "Explore", line: "Lots of materials. Very few instructions.", detail: "People, AI, cameras, objects, markers, computers. Whatever is in the room is fair game." },
    { name: "Collide", line: "Put ideas together that never meet.", detail: "A filmmaker works with a sports kid. Someone who draws works with someone who hates drawing. A human answer collides with an AI answer." },
    { name: "Reflect", line: "Not a worksheet. Evidence.", detail: "Voice notes, screenshots, the attempts you threw away, recordings, drawings, prompts, conversations." },
    { name: "Evolve", line: "Run the same challenge again.", detail: "Did your behavior change? That is the only way we know a mindset moved." },
  ],
  close: "Don’t ask questions. Create decisions.",
};

// The room is the interface.
export const ROOM = {
  eyebrow: "The room is the interface",
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
  eyebrow: "Situations",
  title: ["Conditions,", "not content."],
  intro: "Each situation is a set of conditions a facilitator puts in a room. What happens next is the material. Run one. Watch. Change one condition. Run it again.",
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
    label: "The test for every activity",
    question: "Could this activity exist in a normal classroom?",
    rule: "If the answer is yes, redesign it.",
  },
};

// What we watch. Behavior, not answers.
export const EVIDENCE = {
  eyebrow: "What we watch",
  title: ["Behavior,", "not answers."],
  intro: "We are not grading you. We are watching how you learn. That is the research that builds AiR.",
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
export const PROTOCOL = {
  eyebrow: "The AiR Learning Protocol",
  title: ["Not a curriculum.", "A protocol."],
  school: { label: "School usually runs", chain: ["Information", "Instruction", "Assignment", "Answer", "Grade"], roles: ["Teacher", "Student"] },
  air: { label: "AiR runs", chain: ["Unknown", "Choice", "Attempt", "Friction", "Discovery", "Creation", "Change"], roles: ["Environment designer", "Explorer"] },
  body: [
    "The facilitator’s job is to design conditions where discovery happens. AI is not the subject. AI is one of the things inside the environment.",
    "The real thing being built is adaptive thinking. If AiR is supposed to change how people think, the way they learn has to change first.",
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

export const METHOD: { eyebrow: string; title: string[]; moves: Move[] } = {
  eyebrow: "The AiR method",
  title: ["Four moves.", "Every task."],
  moves: [
    {
      number: "01",
      slug: "clear",
      title: "Clear",
      tagline: "Get one thing in your head instead of eleven.",
      intro: "Before opening an AI tool, decide what you are trying to accomplish.",
      promptLabel: "Ask yourself:",
      prompts: ["Who am I helping?", "What problem am I solving?", "What should be better when I finish?", "What does a good result look like?"],
      principle: "A tool is not the goal. Your mission is the goal.",
      move: "Choose one person and one useful change.",
      exampleLabel: "Example",
      example: [
        "Instead of saying, “Help me start a business,” say, “Help me create a simple weekend lawn-care service for senior citizens in my neighborhood.”",
      ],
      close: "Purpose before tools.",
    },
    {
      number: "02",
      slug: "direct",
      title: "Direct",
      tagline: "Tell it exactly what you want, like a smart friend who has never met you.",
      intro: "AI works better when you provide clear instructions, useful details, limits, and a finish line.",
      promptLabel: "Tell it:",
      prompts: [
        "What you want completed",
        "Who the work is for",
        "What information it should use",
        "What tone or style you want",
        "What it should avoid",
        "What the finished result should include",
      ],
      principle: "A prompt is not a magic spell. It is a working brief.",
      move: "Give the machine a clear assignment.",
      exampleLabel: "Example",
      example: [
        "“Create a one-page flyer for a student car-washing business. Write it for neighbors and families. Include three service options, simple pricing, and a call to schedule an appointment.”",
      ],
      close: "Clarity before cleverness.",
    },
    {
      number: "03",
      slug: "judge",
      title: "Judge",
      tagline: "Never trust the first answer. Push back.",
      intro: "AI can sound confident and still be wrong. You must check important facts, dates, sources, calculations, recommendations, and claims before using or sharing them.",
      promptLabel: "Ask:",
      prompts: [
        "Is this information accurate?",
        "Where did it come from?",
        "Is the source trustworthy?",
        "Is anything missing?",
        "Could this be unfair or biased?",
        "Does it reveal private information?",
        "Could someone be harmed by this answer?",
        "Does the result actually fit my purpose?",
      ],
      principle: "The greater the consequence, the more carefully you should check. This is the move that makes you the builder, not the passenger.",
      move: "Challenge the result before accepting it.",
      close: "Confidence is not evidence.",
    },
    {
      number: "04",
      slug: "make",
      title: "Make",
      tagline: "Finish something. Let a real person use it.",
      intro: "Don’t get stuck preparing forever. Create a small version, test it, improve it, and share it with someone you trust.",
      promptLabel: "You might make:",
      prompts: [
        "A presentation",
        "A study guide",
        "A résumé",
        "A business name",
        "A flyer",
        "A budget",
        "A short video",
        "A product idea",
        "A social media plan",
        "A community resource",
        "A personal action plan",
      ],
      principle: "Quantity breeds quality. Make many small versions. Most will be noise. One will be the signal.",
      move: "Finish something small enough to test.",
      exampleLabel: "Remember",
      example: ["Your first version does not have to be perfect. It has to be useful enough to help you learn what comes next."],
      close: "Put it in the world.",
    },
  ],
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

export const HOW = {
  eyebrow: "How it works",
  title: ["One mission.", "One move at a time."],
  steps: [
    { title: "Choose one mission", body: "Pick one person to help and one thing to make better. That is your mission. Everything starts there.", beats: [] },
    { title: "Make one move", body: "Open a short video lesson. Each lesson is one move. Twelve lessons cover all four moves, and every lesson follows the same five beats.", beats: ["See it", "Name it", "Try it", "Check it", "Share it"] },
    { title: "Show what changed", body: "Post what you made in the community. Say what you tried and what you would change. Real people reply. No grades. No scores.", beats: [] },
  ],
  mission: {
    label: "Clear is one sentence.",
    parts: ["I want to make", "so that", "can"],
    examples: [
      "I want to make a schedule app so that my mom can stop texting me forty times a day.",
      "I want to make a video so that next year’s freshmen understand the tryout rules.",
      "I want to make a Spanish version of the handbook so that my grandmother can read it.",
    ],
    note: "You do not need a big idea. You need a real person on the other side of that sentence.",
    cta: "Drop a pin: write your one thing",
    href: "/ideas",
  },
  start: "Start with lesson one",
  all: "See all twelve lessons",
  photoCaption: "Learning together. One idea, one move, one useful thing.",
};

export const SAFETY = {
  eyebrow: "AI safety: move smart",
  title: ["More consequence", "means more pause."],
  intro: "AI can be helpful, but it has limits.",
  rules: [
    { title: "Protect your privacy", body: "Do not share passwords, Social Security numbers, home addresses, private medical information, bank details, confidential business information, or other sensitive data." },
    { title: "Check important information", body: "AI can invent facts, sources, names, quotations, and statistics. Verify important information with trustworthy sources." },
    { title: "Watch for bias", body: "AI-generated answers can repeat stereotypes or leave out important perspectives. Ask what may be missing and who might be affected." },
    { title: "Keep humans involved", body: "AI should not make serious medical, legal, financial, educational, employment, or safety decisions for you." },
    { title: "Think before you post", body: "Review AI-generated writing, images, audio, and video before sharing them. Make sure the content is accurate, appropriate, and respectful." },
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

export const FAQ: Array<{ q: string; a: string }> = [
  { q: "Is AiR free?", a: "Yes. AiR is designed as a free AI-readiness learning community." },
  { q: "Who can participate?", a: "AiR welcomes learners from age eight through adulthood. Programs and activities may be adjusted for different ages and experience levels." },
  { q: "Do I need AI experience?", a: "No. Nobody explains AI to you here anyway. You walk into a situation and decide what to do." },
  { q: "Do I need to know how to code?", a: "No. Coding may be explored in certain activities, but it is not required to begin." },
  { q: "Do I need my own computer?", a: "Not always. Some AiR activities can be completed through conversation, paper exercises, group instruction, or shared devices. Specific program locations may have different equipment arrangements." },
  { q: "Is AiR only for students?", a: "No. AiR is for students, families, educators, creators, entrepreneurs, working adults, community organizations, and returning citizens." },
  { q: "Will AiR teach me the AI tools?", a: "No. We don’t explain AI. Tools change every month. We put you in situations where you have to decide when to use one, when to put it down, and how to check what it gives you." },
  { q: "So what do I actually do at AiR?", a: "You choose. You try. You hit friction. You find something out. You make a thing. Then you run it again and see what changed." },
  { q: "Is there a test?", a: "No. We watch what you do: your first move, what you throw away, what you save, and what you do differently the second time. That is not a grade. It is how we learn what works." },
  { q: "Isn’t using AI cheating?", a: "Using a calculator on a test where it is not allowed is cheating. Using one to build a bridge is engineering. AiR is the bridge class. Always follow your school’s AI policy." },
  { q: "Isn’t AI going to take my job anyway?", a: "Maybe some jobs. It will not take the job of the person who knows what to build and can check the result. That is the job we practice." },
  { q: "Can AI do my schoolwork for me?", a: "AI can help you understand a topic, practice, organize ideas, and improve your work. It should not replace your learning or be used to misrepresent work as your own. Always follow your school’s AI policy." },
  { q: "Is everything AI generates accurate?", a: "No. AI can produce incorrect, incomplete, biased, or fabricated information. AiR teaches you to check before you trust." },
  { q: "Can AiR help me start a business?", a: "AiR can help you develop ideas, research questions, organize plans, create drafts, and improve business communication. Results depend on your decisions, effort, resources, market conditions, and follow-through." },
  { q: "Is AiR helpful for someone returning home after incarceration?", a: "Yes. AiR provides a supportive entry point for rebuilding digital confidence, preparing for work, communicating professionally, organizing goals, and developing legitimate business opportunities." },
  { q: "Does AiR provide legal, medical, or financial advice?", a: "No. AI-generated information and AiR educational activities should not replace qualified professional advice." },
];

export const FINAL_CTA = {
  eyebrow: "Ready?",
  title: ["Don’t ask questions.", "Create decisions."],
  steps: ["Walk into a situation.", "Choose.", "Hit friction.", "Make something.", "Run it again."],
  way: "That’s the AiR way.",
  moves: "Expose. Disrupt. Explore. Collide. Reflect. Evolve.",
  tagline: "Stop learning AI. Learn to move with it.",
  bring: "Bring AiR to your room",
};

export const PARTNER = {
  eyebrow: "Partner with AiR",
  title: ["Expand responsible", "AI learning."],
  intro: "AiR needs rooms, not classrooms. Schools, nonprofits, libraries, rec centers, workforce programs, faith communities, and reentry organizations can host a session or train their own environment designers.",
  listLabel: "What a partnership can look like:",
  opportunities: [
    "A one-day AiR session in your space",
    "Training your staff as environment designers",
    "A room you keep: walls, stations, objects, QR codes",
    "Family sessions where kids and adults choose side by side",
    "Workforce and reentry cohorts that run the loop weekly",
    "A shared dataset: photos of the room, before and after",
    "Creative and media collisions with local makers",
  ],
  become: "Become an AiR partner",
  request: "Request a program",
};

export const CONTACT = {
  eyebrow: "Contact AiR",
  title: ["Let’s make", "a move."],
  intro: "Want to learn more, host a session, volunteer, teach, partner, or bring AiR to your community?",
  cta: "Contact the AiR team",
};

export const EVENT_INTRO = {
  eyebrow: "What an AiR session sounds like",
  lines: [
    "Welcome to AiR.",
    "Nobody is going to explain AI to you today.",
    "There are three spots on the floor. You have ten seconds. Choose.",
    "Now here is the challenge. Use anything in this room.",
    "In forty-five minutes we do the choice again.",
  ],
};

export const FOOTER = {
  name: "AiR — AI Readiness",
  tagline: "Stop learning AI. Learn to move with it.",
  line: "Free community learning for ages 8 to adult.",
  partnership: "Presented in partnership with",
  learn: [
    { label: "The rule", href: "/#rule" },
    { label: "Six actions", href: "/#actions" },
    { label: "Situations", href: "/situations" },
    { label: "Why AiR exists", href: "/why" },
    { label: "Who AiR is for", href: "/for" },
  ],
  more: [
    { label: "Community", href: "/community" },
    { label: "Lessons (members)", href: "/curriculum" },
    { label: "Camera studio", href: "/studio" },
    { label: "For trainers", href: "/trainers" },
    { label: "Partner with AiR", href: "/partner" },
    { label: "Contact", href: "/partner#contact" },
  ],
  copyright: "© 2026 AiR — AI Readiness. All rights reserved.",
};
