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
    "AiR — AI Readiness is a free, mindset-first learning community for ages eight through adulthood. Learners practice four human moves—Clear, Direct, Judge, and Make—to use AI purposefully, check its work, protect their information, and create something useful.",
  socialBio: ["Complex AI work. Simple human moves.", "Free AI-readiness learning for ages 8 to adult.", "Clear. Direct. Judge. Make."],
};

export const HERO = {
  pill: "Free for everyone",
  eyebrow: "Ages 8 to adult",
  title: ["Stop learning AI.", "Learn to move with it."],
  lead: "AI is moving fast—but you don’t have to feel left behind.",
  body: "AiR is a free, hands-on AI learning community for students, families, educators, creators, entrepreneurs, working adults, returning citizens, and anyone ready to build new skills.",
  reassurance: "You don’t need to be a tech genius. You don’t need expensive equipment. And you definitely don’t need to memorize every new AI tool.",
  close: "You just need a mission—and the willingness to make your first move.",
  join: "Join AiR free",
  choose: "Choose your path",
};

export const WHAT_IS_AIR = {
  eyebrow: "What is AiR?",
  title: ["AI is fast.", "Your judgment is the real work."],
  intro: "AiR stands for AI Readiness. It is a mindset-first learning program that teaches people how to use artificial intelligence with purpose, confidence, creativity, and good judgment.",
  breakdown: "AiR makes complicated AI work easier to understand by breaking it down into four simple human moves:",
  moves: "Clear. Direct. Judge. Make.",
  helpsYouDecide: [
    "What you want AI to help you accomplish",
    "How to give AI clear directions",
    "How to check whether the answer is accurate, fair, safe, and useful",
    "How to turn an AI-generated idea into something real",
  ],
  close: "AI can create a draft, suggest an idea, organize information, or speed up a task. But you are still the one in charge.",
};

export const WHY_AIR = {
  eyebrow: "Why AiR exists",
  title: ["You are not", "too late."],
  intro: "A lot of people hear about AI and immediately feel pressure. They may think:",
  fears: [
    "Everybody knows more about AI than I do.",
    "I’m already too late.",
    "AI is going to replace me.",
    "I need to learn every tool.",
    "I’m not good with technology.",
    "This isn’t for people like me.",
  ],
  shift: "AiR changes that mindset.",
  body: [
    "You do not have to know everything about AI. You need to know how to ask better questions, check the information, make smart decisions, and use the technology to move your life forward.",
    "Whether you are finishing a school assignment, developing a business, searching for a job, creating content, organizing your ideas, or starting over after incarceration, AiR helps you take one clear step at a time.",
  ],
  close: "No hype. No pressure. No secret tricks. Just real skills you can use.",
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
      tagline: "Start with your purpose.",
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
      tagline: "Tell AI what you actually need.",
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
      tagline: "Check before you trust.",
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
      principle: "The greater the consequence, the more carefully you should check.",
      move: "Challenge the result before accepting it.",
      close: "Confidence is not evidence.",
    },
    {
      number: "04",
      slug: "make",
      title: "Make",
      tagline: "Turn the idea into something useful.",
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
      move: "Finish something small enough to test.",
      exampleLabel: "Remember",
      example: ["Your first version does not have to be perfect. It has to be useful enough to help you learn what comes next."],
      close: "Put it in the world.",
    },
  ],
};

export type LearningPath = {
  slug: "explore" | "create" | "build";
  title: string;
  tagline: string;
  intro: string;
  learn: string[];
  note?: string;
  bestFor: string;
  cta: string;
};

export const PATHS: { eyebrow: string; title: string[]; intro: string; paths: LearningPath[] } = {
  eyebrow: "Choose your AiR path",
  title: ["Start where", "you are."],
  intro: "There is no single “right” way to begin. Choose the path that fits where you are right now.",
  paths: [
    {
      slug: "explore",
      title: "Explore",
      tagline: "See what AI can do.",
      intro: "This path is great for younger learners, first-time users, families, and anyone curious about AI.",
      learn: [
        "Understand AI in plain language",
        "Ask useful questions",
        "Create stories, pictures, plans, and ideas",
        "Recognize when AI makes a mistake",
        "Protect your privacy",
        "Use AI with a trusted adult or instructor",
      ],
      bestFor: "Beginners and learners who want to start simple.",
      cta: "Start exploring",
    },
    {
      slug: "create",
      title: "Create",
      tagline: "Turn your ideas into something real.",
      intro: "This path helps students, artists, content creators, and community storytellers use AI to develop and improve original work.",
      learn: [
        "Brainstorm stronger ideas",
        "Write and revise content",
        "Plan videos and presentations",
        "Develop visual concepts",
        "Organize creative projects",
        "Compare multiple options",
        "Keep your personal voice in the work",
      ],
      note: "AI should support your creativity—not erase what makes your work yours.",
      bestFor: "Creators, storytellers, artists, and students with ideas to develop.",
      cta: "Start creating",
    },
    {
      slug: "build",
      title: "Build",
      tagline: "Use AI to move your goals forward.",
      intro: "This path helps entrepreneurs, professionals, job seekers, working adults, and returning citizens apply AI to real-life opportunities.",
      learn: [
        "Develop a business idea",
        "Research customers and industries",
        "Create business plans and proposals",
        "Improve a résumé or professional profile",
        "Prepare for interviews",
        "Organize daily tasks",
        "Create marketing content",
        "Improve customer communication",
        "Build practical workflows",
        "Turn experience into new opportunities",
      ],
      bestFor: "People who want to build income, employment, a business, or a stronger future.",
      cta: "Start building",
    },
  ],
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

export const HOW_IT_WORKS = {
  eyebrow: "How AiR learning works",
  title: ["Progress,", "not perfection."],
  steps: [
    { title: "Short lessons", body: "Learn one useful idea at a time without being buried in technical language." },
    { title: "Hands-on practice", body: "Use the AiR method to solve problems connected to school, work, creativity, business, or community life." },
    { title: "Live learning", body: "Join instructors and other learners for demonstrations, conversations, and group activities." },
    { title: "Community feedback", body: "Show what you made, explain what changed, and receive useful feedback." },
    { title: "Real-world projects", body: "Create something that can be tested, improved, and used outside the lesson." },
    { title: "No grades. No pressure.", body: "AiR is about progress, not perfection or popularity." },
  ],
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

export const FAQ: Array<{ q: string; a: string }> = [
  { q: "Is AiR free?", a: "Yes. AiR is designed as a free AI-readiness learning community." },
  { q: "Who can participate?", a: "AiR welcomes learners from age eight through adulthood. Programs and activities may be adjusted for different ages and experience levels." },
  { q: "Do I need AI experience?", a: "No. Beginners are welcome. We start with simple language and practical activities." },
  { q: "Do I need to know how to code?", a: "No. Coding may be explored in certain activities, but it is not required to begin." },
  { q: "Do I need my own computer?", a: "Not always. Some AiR activities can be completed through conversation, paper exercises, group instruction, or shared devices. Specific program locations may have different equipment arrangements." },
  { q: "Is AiR only for students?", a: "No. AiR is for students, families, educators, creators, entrepreneurs, working adults, community organizations, and returning citizens." },
  { q: "Will AiR teach me every AI tool?", a: "No—and that is intentional. AI tools change constantly. AiR teaches you how to think, direct, check, and create across different tools." },
  { q: "Can AI do my schoolwork for me?", a: "AI can help you understand a topic, practice, organize ideas, and improve your work. It should not replace your learning or be used to misrepresent work as your own. Always follow your school’s AI policy." },
  { q: "Is everything AI generates accurate?", a: "No. AI can produce incorrect, incomplete, biased, or fabricated information. AiR teaches you to check before you trust." },
  { q: "Can AiR help me start a business?", a: "AiR can help you develop ideas, research questions, organize plans, create drafts, and improve business communication. Results depend on your decisions, effort, resources, market conditions, and follow-through." },
  { q: "Is AiR helpful for someone returning home after incarceration?", a: "Yes. AiR provides a supportive entry point for rebuilding digital confidence, preparing for work, communicating professionally, organizing goals, and developing legitimate business opportunities." },
  { q: "Does AiR provide legal, medical, or financial advice?", a: "No. AI-generated information and AiR educational activities should not replace qualified professional advice." },
];

export const FINAL_CTA = {
  eyebrow: "Ready to make your first move?",
  title: ["You do not need to", "learn everything today."],
  steps: ["Choose one mission.", "Give clear direction.", "Check the result.", "Make something useful."],
  way: "That’s the AiR way.",
  moves: "Clear. Direct. Judge. Make.",
  tagline: "Stop learning AI. Learn to move with it.",
  bring: "Bring AiR to your school or community",
};

export const PARTNER = {
  eyebrow: "Partner with AiR",
  title: ["Expand responsible", "AI learning."],
  intro: "Schools, nonprofits, community organizations, workforce programs, libraries, businesses, faith communities, and reentry organizations can partner with AiR to expand responsible AI learning.",
  listLabel: "Partnership opportunities may include:",
  opportunities: [
    "Student workshops",
    "Educator training",
    "Family AI-readiness sessions",
    "Entrepreneurship workshops",
    "Workforce-development programs",
    "Returning-citizen learning sessions",
    "Community AI labs",
    "Creative and media projects",
    "Custom group learning experiences",
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
    "Today is not about learning every AI tool. It is about learning what only you can decide.",
    "We will choose one mission, give AI clear direction, check what comes back, and make one useful thing.",
    "AI can help create the draft. You decide what is accurate, responsible, and ready to use.",
    "Let’s make a move.",
  ],
};

export const FOOTER = {
  name: "AiR — AI Readiness",
  tagline: "Stop learning AI. Learn to move with it.",
  line: "Free community learning for ages 8 to adult.",
  partnership: "Presented in partnership with",
  links: [
    { label: "Explore", href: "/curriculum#explore" },
    { label: "Create", href: "/curriculum#create" },
    { label: "Build", href: "/curriculum#build" },
    { label: "Partner", href: "/partner" },
    { label: "Contact", href: "/partner#contact" },
  ],
  copyright: "© 2026 AiR — AI Readiness. All rights reserved.",
};
