import type { CheckpointOption } from "../drizzle/schema";

// The twelve lessons are situations, not explanations. Source of truth: docs/air-learning-protocol.md.
// Each lesson walks you into a room, gives you ten seconds to choose, takes something away,
// asks you to leave evidence, and runs the same choice again. Nobody explains AI.

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

// Three ways into the same situation. None is easier or smarter.
// explore = alone, with what is on the table. create = with one real person. build = you run it for a room.
const modes = (
  explore: Omit<SeedExercise, "mode">,
  create: Omit<SeedExercise, "mode">,
  build: Omit<SeedExercise, "mode">,
): SeedExercise[] => [
  { mode: "explore", ...explore },
  { mode: "create", ...create },
  { mode: "build", ...build },
];

// The chain: Unknown → Choice → Attempt → Friction → Discovery → Creation → Change.
// unknown: your first move, before anyone says anything.
// choice: three spots on the floor. Ten seconds. Feedback is what happens next, not who is right.
// friction: the thing you reached for is gone. Leave evidence of what you did.
// creation: the attempt, with the condition still on.
// change: run the opening choice again. Whether you moved is the data.
const checkpoints = (input: {
  unknown: string;
  choices: CheckpointOption[];
  friction: string;
  creation: string;
  change: string;
}): SeedCheckpoint[] => [
  {
    kind: "prediction",
    title: "Unknown",
    prompt: input.unknown,
    helperText: "Nobody is explaining anything. Write what you actually reached for.",
    atSeconds: 0,
  },
  {
    kind: "choice",
    title: "Choice",
    prompt: "Three spots on the floor. Ten seconds. Choose.",
    options: input.choices,
    atSeconds: 45,
  },
  {
    kind: "reflection",
    title: "Friction",
    prompt: input.friction,
    helperText: "Leave evidence: a screenshot, a voice note, the thing you threw away.",
    atSeconds: 105,
  },
  {
    kind: "exercise",
    title: "Creation",
    prompt: input.creation,
    helperText: "Finish something. Ugly counts. Unfinished does not.",
    atSeconds: 180,
  },
  {
    kind: "commitment",
    title: "Change",
    prompt: input.change,
    helperText: "Same choice as the start. Whether you moved is the lesson.",
    atSeconds: 240,
  },
];

const stations = (myself: string, withAi: string, letAi: string): CheckpointOption[] => [
  { label: "Do it myself", value: "myself", feedback: myself },
  { label: "Do it with AI", value: "with-ai", feedback: withAi },
  { label: "Let AI do it", value: "let-ai", feedback: letAi },
];

const walls = (statement: string): CheckpointOption[] => [
  { label: `I know · ${statement}`, value: "know", feedback: "Noted. Stand there. Photo taken." },
  { label: `I think I know · ${statement}`, value: "think", feedback: "Noted. Stand there. Photo taken." },
  { label: `I have no idea · ${statement}`, value: "no-idea", feedback: "Noted. Stand there. Photo taken." },
];

export const curriculum: SeedPath[] = [
  {
    slug: "clear",
    number: "01",
    title: "Clear",
    kicker: "Walk in. Choose.",
    summary: "Three situations that show what you reach for before anyone says a word.",
    description: "No welcome speech. A table, a challenge sentence, and ten seconds. What you pick up first is the data. Then it gets taken away.",
    promise: "Leave with a photo of where you stood, one real person on the other side of one sentence, and a second photo that shows whether you moved.",
    accent: "#D8FF45",
    modules: [
      {
        slug: "clear-the-noise",
        title: "The floor",
        summary: "Three stations, one sentence, one real person.",
        lessons: [
          {
            slug: "clear-the-air",
            number: "01.1",
            title: "Ten Seconds",
            kicker: "Three spots on the floor",
            summary: "Walk in. Three spots on the floor. Pick one in ten seconds. Then make one thing for one real person.",
            story: "You walk into a room with no chairs in rows. Tape on the floor marks three spots: DO IT MYSELF, DO IT WITH AI, LET AI DO IT. Markers, cardboard, a phone with AI open, a phone with nothing open. One card on the table reads: make one thing today that helps one real person. Someone counts down from ten. Nobody says anything else.",
            bigIdea: "You have ten seconds. Choose. Where you stand is the only answer anyone records.",
            learnerPromise: "You leave with a photo of where you stood, the thing you made, and a second photo taken after.",
            durationMinutes: 9,
            discussionPrompt: "Post the two photos. Start and end. Say nothing about which spot is right.",
            checkpoints: checkpoints({
              unknown: "The card says: make one thing today that helps one real person. What did you pick up first? Name the object, not the plan.",
              choices: stations(
                "Fine. The markers are on the table. The phone with AI is face down.",
                "Fine. The phone with AI is yours. Write your first request to it word for word before you send it.",
                "Fine. Type the card into AI, send it, and put the phone down. Do not touch it until it is done.",
              ),
              friction: "Whatever you reached for first is gone now. AI, search, or the markers. What did you do in the first sixty seconds without it?",
              creation: "Make one thing for one real person using only what is left on the table. Name the person and describe what you made.",
              change: "Three spots on the floor again. Ten seconds. Where do you stand now, and is it the same spot?",
            }),
            exercises: modes(
              { title: "Alone, with the table", prompt: "Set the three spots on your own floor. Choose in ten seconds.", instructions: "Put three pieces of paper on the floor. Count down out loud. Stand on one. Then make one thing for one real person in fifteen minutes. Photograph where you stood before and after.", evidenceLabel: "My two photos and the thing I made" },
              { title: "With one real person", prompt: "Run the ten seconds with someone who did not choose you.", instructions: "Both of you choose a spot without looking at each other. Make one thing together. Halfway through, take away whichever tool you both reached for. Keep going.", evidenceLabel: "Where we stood, what we lost, what we finished" },
              { title: "Run it for a room", prompt: "Tape the three stations and count down for a group.", instructions: "No welcome speech. Point at the floor. Count from ten. Photograph the room. Give the challenge card once. Forty-five minutes later, repeat the exact choice and photograph again.", evidenceLabel: "Room photo at 0:00 and at 0:45" },
            ),
          },
          {
            slug: "machines-make-guesses",
            number: "01.2",
            title: "What Made This?",
            kicker: "Controlled confusion",
            summary: "You get a mysterious output and no story about where it came from. Figure out what happened.",
            story: "An envelope is on the table. Inside is a picture, a paragraph, and a short video clip. Nobody tells you what made them, who made them, or whether they are true. Five teams got the same envelope. Your job is not to name a piece of software. Your job is to figure out what happened. Search, ask a person, ask AI, inspect the file, recreate it, or decide the question itself is wrong.",
            bigIdea: "You are not asked to name the tool. You are asked to find out what happened, any way you can.",
            learnerPromise: "You leave with your first three moves written down, in order, and what you decided about the envelope.",
            durationMinutes: 10,
            discussionPrompt: "Post your first three moves in order. Then post what you decided about the envelope. No verdicts on other teams.",
            checkpoints: checkpoints({
              unknown: "The envelope is open. Write your first move before you make it. Search, ask a person, ask AI, inspect the file, or something else.",
              choices: walls("Something in this envelope was made by a machine."),
              friction: "Your first move is now not allowed. If you searched, search is gone. If you asked AI, AI is gone. What is your second move?",
              creation: "Write one sentence that says what happened to this envelope, and one sentence that says how you know.",
              change: "Same statement. Same three walls. Something in this envelope was made by a machine. Where do you stand now?",
            }),
            exercises: modes(
              { title: "Alone, with the envelope", prompt: "Give yourself a mystery you did not make.", instructions: "Ask someone to hand you one picture, one paragraph, and one clip without saying where they came from. Write your first three moves before you make them. Then make them.", evidenceLabel: "My three moves and my one-sentence finding" },
              { title: "With one real person", prompt: "Same envelope, two people, different first moves.", instructions: "Open the envelope together. Each of you makes a different first move and cannot copy the other. Compare what each move revealed. Decide together, or disagree in writing.", evidenceLabel: "Two first moves and what each one found" },
              { title: "Run it for a room", prompt: "Five teams, one envelope, no explanation.", instructions: "Prepare one mysterious output. Hand every team the same thing. Say only: figure out what happened. Watch for the first action, the first AI request, and who asks another person. Never confirm the answer.", evidenceLabel: "First action of each team, word for word" },
            ),
          },
          {
            slug: "choose-one-mission",
            number: "01.3",
            title: "One Real Person",
            kicker: "The pin on the map",
            summary: "You cannot help everyone today. Put a pin on one person. Then find out you were guessing.",
            story: "There is a map of your neighborhood on the wall and a jar of pins. The instruction card says: put one pin where one real person needs one thing. Not a group. Not the world. One person. Beside the map is a phone. As soon as your pin is in, the card underneath says: text them now and ask what is actually hard.",
            bigIdea: "One pin. One real person. Then you have to ask them, and the answer is not what you wrote.",
            learnerPromise: "You leave with one sentence with a real person in it, and the message they sent back.",
            durationMinutes: 11,
            discussionPrompt: "Post your sentence before the text and your sentence after. Let the difference speak.",
            checkpoints: checkpoints({
              unknown: "Pins in hand. Who did you point at first? Write their name or role and the one thing you think they need.",
              choices: stations(
                "Fine. Write the sentence yourself: I want to make ___ so that ___ can ___.",
                "Fine. Tell AI about the person and let it draft the sentence. Cross out anything the person did not say.",
                "Fine. Ask AI who needs help in your neighborhood. Read what it gives you. Then look at the map again.",
              ),
              friction: "Now text the person, or someone who knows them, and ask what is hard right now. What came back, and what did it break in your sentence?",
              creation: "Rewrite the sentence with what they told you. One person, one change, one reason.",
              change: "Back to the map. Would you put the pin in the same place? Say where it goes now and why it moved or did not.",
            }),
            exercises: modes(
              { title: "Alone, with the map", prompt: "Draw your street. Put one pin in.", instructions: "Sketch the people you actually see in a week. Pick one. Write the sentence. Then send them one message asking what is hard. Wait for the reply before you change anything.", evidenceLabel: "My sentence, their reply, my new sentence" },
              { title: "With one real person", prompt: "Put the pin on the person sitting next to you.", instructions: "Ask them what is hard this week. No advice. No solutions. Write the sentence with them watching. They get to cross out anything wrong.", evidenceLabel: "The sentence they let stand" },
              { title: "Run it for a room", prompt: "One map, one jar of pins, no speech.", instructions: "Put a map and pins on the wall before anyone arrives. Watch who pins fast, who pins a group, who asks permission. After the pins are in, reveal the card: text them now. Record who does.", evidenceLabel: "Pin photo and the count of people who sent a message" },
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
    kicker: "No prompts allowed",
    summary: "Three situations where you have to steer something that cannot see what you see.",
    description: "A partner behind a screen. A sealed envelope. An instruction that cannot be followed. Each time, the thing you would normally use to get your way is taken off the table.",
    promise: "Leave with a drawing you directed blind, an envelope that changed the answer, and something nobody has seen before.",
    accent: "#18C98B",
    modules: [
      {
        slug: "give-direction",
        title: "Behind the screen",
        summary: "Direct without seeing. Direct without examples. Direct without written prompts.",
        lessons: [
          {
            slug: "be-the-director",
            number: "02.1",
            title: "Back to Back",
            kicker: "They cannot see your picture",
            summary: "Sit back to back. Get someone to draw what is in your head. Then try it on AI with the same words.",
            story: "Two chairs, back to back. You hold a picture. Your partner holds a blank page and a marker. You have three minutes to get them to draw your picture without showing it. Then you turn to a screen with AI open and give it the exact same words you just used. Two drawings land on the table. Neither is your picture.",
            bigIdea: "The person behind you cannot see your picture. Neither can the screen. Same words, both times.",
            learnerPromise: "You leave with two drawings, the words you used, and the word you had to cut.",
            durationMinutes: 12,
            discussionPrompt: "Post both drawings and the original side by side. Say which words worked on both, and which worked on neither.",
            checkpoints: checkpoints({
              unknown: "Picture in hand, partner behind you. What was the first word out of your mouth? Write it exactly.",
              choices: stations(
                "Fine. You draw it yourself from your own directions, read back to you by someone else.",
                "Fine. Your partner draws. Then AI draws from your exact words. Put both on the table.",
                "Fine. Give AI the picture and ask it for the directions. Then read those to your partner and see what they draw.",
              ),
              friction: "Adjectives are gone. No big, small, pretty, dark. Direct the drawing again using only nouns, positions, and numbers. What changed in the drawing?",
              creation: "Write the set of directions that got the closest drawing. Keep it under sixty words.",
              change: "Three spots again. Next time you need a picture out of your head, where do you stand? Same spot as the start?",
            }),
            exercises: modes(
              { title: "Alone, with a mirror", prompt: "Record yourself directing, then draw from the recording.", instructions: "Pick a picture. Record a voice note describing it without naming what it is. Tomorrow, draw from the recording without looking at the picture. Then give the transcript to AI.", evidenceLabel: "Picture, my drawing, the AI drawing" },
              { title: "With one real person", prompt: "Back to back, three minutes, one marker.", instructions: "Do it twice. Second time, no adjectives. Then give the same directions to AI. Lay all three drawings on the table with the original and say nothing for one minute.", evidenceLabel: "Four images on one table" },
              { title: "Run it for a room", prompt: "Pairs back to back, one screen per pair.", instructions: "Hand every pair a different picture. Three minutes to direct, then the same words into AI. Collect the drawings on one wall. Remove adjectives for round two. Photograph the wall after each round.", evidenceLabel: "Wall photo, round one and round two" },
            ),
          },
          {
            slug: "give-useful-context",
            number: "02.2",
            title: "The Sealed Envelope",
            kicker: "Same question, different card",
            summary: "Three people ask the same question. Each holds a different sealed card. The answers do not match.",
            story: "You get a question on a slip of paper: what should I wear tomorrow? You also get a sealed envelope. Do not open it yet. Ask the question, of a person or a screen, and write down the answer. Now open the envelope. Inside is one card: a snowy playground, a wedding, a hospital waiting room. Ask again with the card in your hand. Two other people did the same thing with different cards.",
            bigIdea: "The envelope changes the answer. Only you decide which card goes in, and which card stays sealed.",
            learnerPromise: "You leave with an answer before the envelope, an answer after, and one card you refused to hand over.",
            durationMinutes: 11,
            discussionPrompt: "Post the before answer and the after answer. Do not post the card you kept sealed. Say only that you kept one.",
            checkpoints: checkpoints({
              unknown: "Question in hand, envelope sealed. Who or what did you ask first, and what did you get?",
              choices: stations(
                "Fine. Open the envelope. Answer the question yourself with the card in hand.",
                "Fine. Open the envelope. Tell AI only what is on the card, then ask again.",
                "Fine. Give AI the question and the whole envelope. Notice what it uses and what it ignores.",
              ),
              friction: "One card in the pile is private. A password, an address, a diagnosis. It is not allowed in the answer. What did you do with it?",
              creation: "Write the three cards that actually changed the answer, and the one you kept sealed.",
              change: "New question, new envelope. Before you open it, where do you stand? Same spot as the first question?",
            }),
            exercises: modes(
              { title: "Alone, with one question", prompt: "Ask the same question three times with three different cards.", instructions: "Write a simple question. Make three cards: place, person, purpose. Ask once per card. Put the three answers side by side. Circle the words that changed.", evidenceLabel: "Three answers, circled" },
              { title: "With one real person", prompt: "You hold the cards. They ask the question.", instructions: "Hand them one card at a time while they ask a person or a screen. Include one card they must not hand over. Watch what they do with it. Swap roles.", evidenceLabel: "Which card they refused, and what I did when it was my turn" },
              { title: "Run it for a room", prompt: "Three groups, one question, three envelopes.", instructions: "Every group gets the same question and a different sealed card. Collect the answers on one wall before anyone reveals a card. Then reveal. Slip one private card into one envelope and watch.", evidenceLabel: "Wall of answers and the group that handled the private card" },
            ),
          },
          {
            slug: "ask-for-options",
            number: "02.3",
            title: "Never Seen Before",
            kicker: "Impossible instructions",
            summary: "Make something you have never seen. You may use AI. You may not ask it for an example.",
            story: "The card says: make something you have never seen before. Almost everyone opens a search bar or asks AI to show them something. When they do, someone stops them: if you are looking at somebody else's solution, how are you going to make something you have never seen? Then AI comes back with one condition. You cannot ask it to show you an example. It can only ask you questions.",
            bigIdea: "Make something you have never seen. AI is here, but it is not allowed to show you anything.",
            learnerPromise: "You leave with one thing that did not exist this morning and the questions that got you there.",
            durationMinutes: 10,
            discussionPrompt: "Post the thing. Then post the three questions that moved it. Not the answers.",
            checkpoints: checkpoints({
              unknown: "Make something you have never seen before. Where did your hand go first? Search bar, AI, paper, or somewhere else?",
              choices: stations(
                "Fine. Paper and whatever is on the table. No screens for ten minutes.",
                "Fine. AI can ask you questions. It cannot show you a single example. Ask it to start.",
                "Fine. Tell AI to make it. Then look at what came back and say whether you have seen it before.",
              ),
              friction: "Examples are gone. No references, no searches, no show-me. What did you do in the first two minutes without them?",
              creation: "Make the thing. Then answer, in one line: has anyone seen this before? Be honest.",
              change: "Same card tomorrow. Make something you have never seen. Where do you stand before you start?",
            }),
            exercises: modes(
              { title: "Alone, no references", prompt: "Ten minutes. No screen. Something new.", instructions: "Set a timer. Make something with what is within reach. If you catch yourself picturing something you have seen, change one thing about it. Photograph the result.", evidenceLabel: "The thing and the one change I made" },
              { title: "With one real person", prompt: "Let the other person play the AI that cannot answer.", instructions: "They can only ask you questions for ten minutes. No suggestions, no examples. You make. Then swap. Record the three questions that changed the most.", evidenceLabel: "Three questions that changed it" },
              { title: "Run it for a room", prompt: "The card, the stop, and the condition.", instructions: "Hand out the card. Wait for the first search. Stop it out loud, once. Then open AI with the one condition: it may only ask. Collect everything made on one table. Ask no one to explain.", evidenceLabel: "Table photo and the count of people who searched first" },
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
    kicker: "Nobody says who is right",
    summary: "Three situations where the room has to decide without anyone confirming the answer.",
    description: "A document with a seam in it. Four corners of a room. A thing you made in the wrong hands. Every time, you walk somewhere, and the photo is the only record.",
    promise: "Leave with a seam you found on your own, two corner photos, and one revision made by someone else's hands.",
    accent: "#FF8A6B",
    modules: [
      {
        slug: "challenge-the-result",
        title: "The walls",
        summary: "Stand where you belong. Nobody says who is right. Photograph the room. Repeat.",
        lessons: [
          {
            slug: "spot-the-guess",
            number: "03.1",
            title: "Find the Seam",
            kicker: "Nobody told you it is wrong",
            summary: "Five teams get the same confident document. Nobody says there is anything wrong with it.",
            story: "A one-page document sits on every table. It reads well. It has a date, a name, a number, and a quote. Nobody tells you it contains anything wrong. Nobody tells you it is right. The card says only: decide whether you would hand this to the person it is about. You can search, ask a person, ask AI, or recreate it. Somewhere in it is a seam.",
            bigIdea: "Nobody told you anything is wrong. You have to decide whether to hand it over anyway.",
            learnerPromise: "You leave with the seam you found, how you found it, and your handover decision.",
            durationMinutes: 12,
            discussionPrompt: "Post the seam and how you found it. Do not post whether the other teams found it.",
            checkpoints: checkpoints({
              unknown: "The document is in front of you. Before you check anything, would you hand it over? Say yes or no, then write the first thing you looked at.",
              choices: walls("This document is accurate."),
              friction: "Your first checking move is gone. If you searched, no search. If you asked AI, no AI. Find the seam a different way. What did you try?",
              creation: "Mark the seam. Write one line saying what you would do with the document now: hand it over, fix it, or bin it.",
              change: "Same statement, same walls. This document is accurate. Where do you stand now?",
            }),
            exercises: modes(
              { title: "Alone, with one page", prompt: "Get a page you did not write and did not check.", instructions: "Ask AI for a one-page summary of something you know well. Do not tell yourself anything is wrong. Read it as the person it is about. Mark the first place you stopped.", evidenceLabel: "The page with one mark on it" },
              { title: "With one real person", prompt: "Swap pages. Find each other's seam.", instructions: "Each of you gets a confident page about a topic the other knows. No hints. Ten minutes. Then trade what you found. Decide together which pages get handed over.", evidenceLabel: "Two pages, two seams, two decisions" },
              { title: "Run it for a room", prompt: "One document, five teams, three walls.", instructions: "Prepare a page with one invented detail. Say nothing about it. Read the statement and let the room walk to a wall. Photograph. After twenty minutes, read it again. Photograph. Never confirm the seam.", evidenceLabel: "Two wall photos and the count of teams that handed it over" },
            ),
          },
          {
            slug: "check-the-stakes",
            number: "03.2",
            title: "Four Corners",
            kicker: "Walk to where it belongs",
            summary: "Four corners. Someone reads a task. You walk. Nobody says whether you walked to the right one.",
            story: "Each corner of the room has a word: PRACTICE, VERIFY, PAUSE, HUMAN ONLY. Someone reads a task out loud. A nickname for the team. A dosage for a sick kid. Tomorrow's tryout time. A reply to an angry customer. After each one, you walk to a corner. Nobody says which corner is right. Someone takes a photo. Then the tasks get read again, in a different order.",
            bigIdea: "Four corners. A task is read. You walk. The photo is the only record.",
            learnerPromise: "You leave with two photos of the room and one task you moved corners on.",
            durationMinutes: 13,
            discussionPrompt: "Post the task that moved you between corners. Say what happened between the two readings.",
            checkpoints: checkpoints({
              unknown: "First task: a friend asks AI for a medicine dose for their kid. Which corner did your feet go to before you thought about it?",
              choices: [
                { label: "Practice", value: "practice", feedback: "Noted. Stand there. Photo taken." },
                { label: "Verify", value: "verify", feedback: "Noted. Stand there. Photo taken." },
                { label: "Pause", value: "pause", feedback: "Noted. Stand there. Photo taken." },
                { label: "Human only", value: "human", feedback: "Noted. Stand there. Photo taken." },
              ],
              friction: "The corner you walked to most is now closed. Same tasks are read again. Where did you go instead, and which task made that hardest?",
              creation: "Write four tasks from your own week, one per corner. Then swap two of them and say what would have to be true for the swap to hold.",
              change: "The first task is read again. The medicine dose. Which corner now, and is it the same one?",
            }),
            exercises: modes(
              { title: "Alone, four sticky notes", prompt: "Put the corners on your own wall.", instructions: "Write ten real tasks from this week. Read each aloud and stick it in a corner without stopping to think. Tomorrow, do it again in a different order. Compare.", evidenceLabel: "Two wall photos, one day apart" },
              { title: "With one real person", prompt: "Read for each other. Walk before you think.", instructions: "Take turns reading tasks. The listener walks immediately. No talking between tasks. Afterwards, find the two tasks you disagreed on and do not resolve them.", evidenceLabel: "The two tasks we still disagree on" },
              { title: "Run it for a room", prompt: "Four corners, twelve tasks, two rounds.", instructions: "Label the corners before anyone arrives. Read twelve tasks with no comment. Photograph after each. Close the most popular corner and read them again. Photograph. Say nothing about which corner was right.", evidenceLabel: "Corner photos, round one and round two" },
            ),
          },
          {
            slug: "make-it-fit-people",
            number: "03.3",
            title: "Wrong Hands",
            kicker: "Give it to the person it was not for",
            summary: "Hand what you made to someone it was never for. Watch. Say nothing.",
            story: "You made a thing for someone. It works. Now a card tells you who gets it next: a grandmother who reads slowly, an eight-year-old, a tired caregiver at midnight, a first-time visitor on a slow phone. You hand it over and you are not allowed to explain it. You watch their hands and their face. Where they stop is the seam.",
            bigIdea: "Hand it to the wrong person. Do not explain. Where they stop is where you work next.",
            learnerPromise: "You leave with the place they stopped and one change made because of it.",
            durationMinutes: 12,
            discussionPrompt: "Post the before and the after. Say who had it in their hands and where they stopped.",
            checkpoints: checkpoints({
              unknown: "Card drawn: a grandmother who reads slowly. Before you hand your thing over, what did you want to change first?",
              choices: stations(
                "Fine. Hand it over as it is. Watch. Change it yourself afterwards.",
                "Fine. Ask AI to read it as the person on the card and tell you where it would stop. Then hand it to the real person.",
                "Fine. Ask AI to rewrite it for the card. Hand that version over without reading it first.",
              ),
              friction: "You are not allowed to speak while they use it. No pointing, no hints. What did they do in the first thirty seconds, and where did they stop?",
              creation: "Make one change because of where they stopped. Only one. Describe it.",
              change: "New card. New person. Before you hand it over, where do you stand? Same as the first time?",
            }),
            exercises: modes(
              { title: "Alone, with a card", prompt: "Draw a card and read your own thing as that person.", instructions: "Write four people on four cards. Draw one. Read your thing out loud in their voice, at their speed, on their device. Stop where they would stop. Change that one place.", evidenceLabel: "Where I stopped and what I changed" },
              { title: "With one real person", prompt: "Give it to someone it was not made for.", instructions: "Find a person who matches a card. Hand it over. Say nothing. Time how long before they stop or ask. Change one thing. Hand it over again.", evidenceLabel: "Time to first stop, before and after" },
              { title: "Run it for a room", prompt: "Everything made today changes hands.", instructions: "Collect every finished thing. Redistribute so nobody holds their own, each with a card. Makers watch and cannot speak. After ten minutes, things go back. One change each. Redistribute again.", evidenceLabel: "Count of things that changed hands twice, and one photo per round" },
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
    kicker: "Run it again",
    summary: "Three situations that end with something finished and a second attempt on record.",
    description: "Ten minutes, paper only. A handoff where you cannot speak. A delivery to a real person, then the exact same challenge run again. The second attempt is the only proof anything changed.",
    promise: "Leave with a finished first version, a set of steps a stranger ran, and two attempts side by side.",
    accent: "#F7FFF8",
    modules: [
      {
        slug: "put-it-in-the-world",
        title: "The second attempt",
        summary: "Make it. Hand it off. Deliver it. Then do it again and see who moved.",
        lessons: [
          {
            slug: "make-a-first-version",
            number: "04.1",
            title: "Ten Minutes, Paper Only",
            kicker: "Screens go face down",
            summary: "All screens face down. Ten minutes. Make the first version with paper. Then AI can only ask.",
            story: "A timer is set for ten minutes. Every screen in the room is face down. Paper, tape, markers, cardboard, and the person you are making it for. Make the first version of your thing before the timer goes. When it rings, the screens turn over with one condition: AI cannot answer you for the next fifteen minutes. It can only ask you questions about what you made.",
            bigIdea: "Ten minutes. Paper only. Then AI can only ask you questions about what is on the table.",
            learnerPromise: "You leave with a paper version someone can hold and the question that changed it most.",
            durationMinutes: 11,
            discussionPrompt: "Post a photo of the paper version. Then post the one question that changed it. Not the answer.",
            checkpoints: checkpoints({
              unknown: "Timer starts. Screens face down. What did you pick up first, and what did you make in the first two minutes?",
              choices: stations(
                "Fine. Paper for ten minutes, then keep going on paper. Screens stay down.",
                "Fine. Paper for ten minutes. Then AI may only ask questions for fifteen. Write your first exchange.",
                "Fine. Turn a screen over now, describe the paper version, and ask AI to build it. Then compare the two.",
              ),
              friction: "The timer rang. AI is up but cannot answer. Write the first question it asked you and what you did to the paper version because of it.",
              creation: "Finish the first version. Something a person can hold, read, or try in under a minute. Describe it in three lines.",
              change: "Timer reset. Screens down again. Where do you stand before it starts? Same spot as the first round?",
            }),
            exercises: modes(
              { title: "Alone, timer on", prompt: "Ten minutes, paper, then fifteen minutes of questions only.", instructions: "Phone face down. Make it with paper. When the timer rings, open AI and tell it: only ask me questions about this. Answer three. Change the paper. Photograph both versions.", evidenceLabel: "Paper version one and paper version two" },
              { title: "With one real person", prompt: "Make it in front of the person it is for.", instructions: "They sit across from you and cannot help. Ten minutes on paper. Then they, not AI, may only ask questions for ten minutes. Change one thing. Hand it to them.", evidenceLabel: "What they asked and what I changed" },
              { title: "Run it for a room", prompt: "Every screen face down. One timer. One condition.", instructions: "Set the timer where everyone can see it. Say: ten minutes, paper only. Watch who freezes without a screen. When it rings, say: screens up, AI can only ask. Collect the paper versions on one table.", evidenceLabel: "Table photo and the count of people who froze" },
            ),
          },
          {
            slug: "build-your-way",
            number: "04.2",
            title: "Say Nothing",
            kicker: "A stranger runs your steps",
            summary: "Write your steps. Hand them to someone who was not there. Watch them try. You cannot speak.",
            story: "You did something that worked. Now write it down as steps on one card and hand the card to someone who was not in the room. They try to do it while you watch. You are not allowed to speak, point, or touch anything. Every place they stop, hesitate, or do it wrong goes on a second card. That second card is the real lesson.",
            bigIdea: "Hand over the card. Say nothing. Every place they stop is a step you forgot to write.",
            learnerPromise: "You leave with a card a stranger ran and the list of places they stopped.",
            durationMinutes: 12,
            discussionPrompt: "Post your card and the stop list. Do not post the improved card yet.",
            checkpoints: checkpoints({
              unknown: "Card in hand, stranger sitting down. Before they start, which step are you most worried about? Write it.",
              choices: stations(
                "Fine. Write the steps yourself. Hand them over. Silence.",
                "Fine. Ask AI to write the steps from your description. Hand over what it wrote without editing. Silence.",
                "Fine. Ask AI to run the steps for you and describe what it did. Then hand the card to a person and compare.",
              ),
              friction: "The stranger stopped. You cannot speak. What did they do at the stop, and what did you do with your hands?",
              creation: "Rewrite the card using only what you saw. Keep the step that was a human decision as a human decision.",
              change: "A second stranger. Same card. Where do you stand before you hand it over? Same spot as the first time?",
            }),
            exercises: modes(
              { title: "Alone, tomorrow", prompt: "Write the steps today. Run them tomorrow as if you had never seen them.", instructions: "Write the card. Put it away. Tomorrow, follow it exactly, doing nothing it does not say. Mark every place you had to remember instead of read.", evidenceLabel: "The card and the places I had to remember" },
              { title: "With one real person", prompt: "Hand the card to someone who was not there.", instructions: "Sit on your hands. Watch. Write every stop on a second card. When they finish, or give up, ask nothing. Rewrite the card. Find a second person.", evidenceLabel: "Stop list from person one, stop list from person two" },
              { title: "Run it for a room", prompt: "Every card changes hands. Every maker is silent.", instructions: "Collect all cards. Redistribute so nobody holds their own. Makers stand behind runners and may not speak. Ten minutes. Collect the stop lists on one wall. Redistribute again after rewrites.", evidenceLabel: "Wall of stop lists, round one and round two" },
            ),
          },
          {
            slug: "put-it-in-the-world",
            number: "04.3",
            title: "The Second Attempt",
            kicker: "Deliver it. Then run the whole thing again.",
            summary: "Deliver the thing to the real person today. Then the same challenge is run again from the start.",
            story: "The person you made it for is real, and today is the day. You hand it over and ask one question: what do you think this is for? You are not allowed to explain first. You write down what they say. Then the room resets. Three spots on the floor. The same challenge card. Ten seconds. Everything you did before, you do again, and someone compares the two photos.",
            bigIdea: "Deliver it today. Ask one question. Then the whole thing runs again and the photos get compared.",
            learnerPromise: "You leave with one real person's answer and two runs of the same challenge side by side.",
            durationMinutes: 10,
            discussionPrompt: "Post what the person said it was for. Then post your first-run and second-run photos. Say who moved.",
            checkpoints: checkpoints({
              unknown: "The person is in front of you. Before you hand it over, what did you want to say first? Write the sentence you did not get to say.",
              choices: stations(
                "Fine. Hand it over in person. Ask the one question. Write the answer down word for word.",
                "Fine. Hand it over. Then give AI their answer and yours, and let it ask you what to do next.",
                "Fine. Ask AI to write the message that delivers it. Send that. Wait for the reply before you touch anything.",
              ),
              friction: "They said what they thought it was for. It was not what you meant, or it was. Either way, what did you do in the next minute?",
              creation: "Run the challenge again from the start. Same card, same ten seconds, same tools. Describe what you made this time in three lines.",
              change: "Two photos. First run and second run. Did you move? Say where you stood both times and what you will run next week.",
            }),
            exercises: modes(
              { title: "Alone, one delivery", prompt: "Give it to the person today. Ask one question.", instructions: "No explaining first. Ask: what do you think this is for? Write the answer. Then set the timer and do the whole challenge again from paper. Photograph both versions.", evidenceLabel: "Their answer and my two versions" },
              { title: "With one real person", prompt: "Deliver each other's thing to its real person.", instructions: "Swap. You deliver theirs, they deliver yours. Each asks the one question and brings the answer back. Then both of you run the challenge again from the start.", evidenceLabel: "The answer I brought back and the answer they brought me" },
              { title: "Run it for a room", prompt: "Deliveries, then the exact opening again.", instructions: "Everyone delivers today or sends it now. Collect the answers on a wall. Then say: three stations, ten seconds, choose. Read the same five wall statements. Photograph. Put the two photos side by side where everyone can see.", evidenceLabel: "Answer wall and the two room photos side by side" },
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
    title: "The AiR Learning Protocol: one rule, six actions",
    summary: "The rule is do not explain AI. The method is Expose, Disrupt, Explore, Collide, Reflect, Evolve.",
    body: `# The AiR Learning Protocol\n\n**One rule: don't explain AI.** No presentation. No "What is AI?" lesson. No vocabulary sheet. No tutorial. Create situations. Watch what people do. Capture their decisions. Then change the situation so they have to decide again.\n\n## Six actions\n\n**Expose** how people currently think without asking them to explain it. **Disrupt** by removing their normal solution. **Explore** with materials, people, AI, cameras, objects, and very few instructions. **Collide** ideas and people that would not normally meet. **Reflect** by leaving evidence, not filling a worksheet. **Evolve** by running the challenge again and seeing whether behavior changed.\n\n## The chain\n\nSchool runs Information → Instruction → Assignment → Answer → Grade. AiR runs Unknown → Choice → Attempt → Friction → Discovery → Creation → Change. You are an Environment Designer, not a teacher.\n\n## The test\n\nCould this activity exist in a normal classroom? If yes, redesign it. Full text: docs/air-learning-protocol.md.`,
    sortOrder: 1,
  },
  {
    slug: "facilitating-ages-eight-to-adult",
    type: "delivery_note" as const,
    title: "The same room for eight-year-olds and adults",
    summary: "The situation stays the same. Only the challenge sentence and the consequence change.",
    body: `# The Same Room, Ages Eight to Adult\n\nAn eight-year-old and a lawyer both walk to one of three spots on the floor in ten seconds. The floor does not change. The challenge sentence does. For a child: a sign for the corner store. For an adult: a summary a client will act on.\n\n## Three ways in, none easier\n\n**Alone, with what is on the table.** **With one real person.** **Run it for a room.** Never describe one as the beginner level. They are different doors into the same decision.\n\n## Mixed ages\n\nPair people who would not choose each other. Let the younger person spot where the older person's thing stops making sense. Let the older person hand over the tool they reached for first. Photograph who leads.`,
    sortOrder: 2,
  },
  {
    slug: "five-beat-lesson",
    type: "facilitator_guide" as const,
    title: "Run of show: ninety minutes, no speech",
    summary: "Expose at 0:00, Disrupt at 0:25, Collide at 0:40, Flip at 0:55, Reflect at 1:10, Evolve at 1:20.",
    body: `# Run of Show\n\n**0:00 Expose.** No welcome. Point at the floor. Three stations, ten seconds, choose. Photograph.\n\n**0:02 Expose.** Read five statements. People walk to I KNOW, I THINK I KNOW, I HAVE NO IDEA. Say nothing about who is right. Photograph after each.\n\n**0:08 Explore.** Read the challenge once. Use anything in this room. Stop talking. Capture the first action and the first AI request, word for word.\n\n**0:25 Disrupt.** Remove whatever most people reached for. Say it once. No reason.\n\n**0:40 Collide.** Re-pair people who would not choose each other. Both must be able to say why the thing is good.\n\n**0:55 Flip.** For fifteen minutes AI cannot answer. It can only ask.\n\n**1:10 Reflect.** No worksheet. Leave evidence: screenshots, voice notes, the thing you threw away.\n\n**1:20 Evolve.** Repeat the exact opening. Three stations, ten seconds. Same five statements. Photograph. Compare.\n\n**1:28 Close.** One sentence: the photos are the lesson. Leave. Never cut Expose or Evolve. Full handbook: docs/environment-designer-training.md.`,
    sortOrder: 3,
  },
  {
    slug: "no-device-ai-literacy",
    type: "exercise" as const,
    title: "Core situations",
    summary: "Three stations, the walls, controlled confusion, impossible instructions, AI cannot answer.",
    body: `# Core Situations\n\n**Three stations.** DO IT MYSELF, DO IT WITH AI, LET AI DO IT on the floor. Ten seconds. Photograph. Repeat forty-five minutes later.\n\n**The walls.** I KNOW, I THINK I KNOW, I HAVE NO IDEA. Read: AI understands you. AI is creative. AI will replace jobs. AI makes you smarter. AI can have original ideas. People stand. Photograph. Repeat.\n\n**Controlled confusion.** Five teams get the same mysterious output and no story. The job is to figure out what happened, any way they can.\n\n**Impossible instructions.** Make something you have never seen before. Stop the first search out loud. Then AI with one condition: it may not show an example.\n\n**AI cannot answer.** Fifteen minutes where AI may only ask questions.\n\n**Four corners.** PRACTICE, VERIFY, PAUSE, HUMAN ONLY. Read tasks. People walk. Photograph. Close the popular corner and read again.`,
    sortOrder: 4,
  },
  {
    slug: "community-safety-for-younger-learners",
    type: "delivery_note" as const,
    title: "Community Safety for Younger Learners",
    summary: "Facilitator and moderator practices for privacy-minimizing, constructive participation.",
    body: `# Community Safety\n\nRemind learners to use a display name and never post a full name, school, address, phone number, daily schedule, password, or private image. Photos of the room show feet and walls, not faces, unless every person in the frame said yes. Private lesson evidence stays private unless a learner deliberately writes a separate community post.\n\nModel response language: **I noticed… I wondered… One thing I would try…** Redirect judgment of people toward what was made and what was chosen. Nobody says who stood in the right spot. Escalate concerning content to the platform administrator rather than investigating publicly.`,
    sortOrder: 5,
  },
  {
    slug: "interactive-video-production-guide",
    type: "video_guide" as const,
    title: "The video is the walk-in, not the lesson",
    summary: "Each lesson video shows the room and stops before anyone explains anything.",
    body: `# The Video Is the Walk-In\n\nA lesson video shows the room: the tape on the floor, the table, the card, the countdown. It stops the moment a choice is needed. It never explains what AI is, never shows a correct answer, and never shows a person at the front of the room talking.\n\nPlace checkpoints where the viewer has to decide: at the countdown, at the disrupt, at the flip, and at the second run. Every video needs accurate captions, a readable transcript, a meaningful poster frame, and a text-only route to the same situation. If a cut can be replaced by a slide, cut it.`,
    sortOrder: 6,
  },
  {
    slug: "source-frameworks",
    type: "source" as const,
    title: "Source Frameworks and Further Reading",
    summary: "Authoritative references supporting AiR’s human-centered, critical, and child-centered approach.",
    body: `# Source Frameworks\n\nUNESCO’s student framework contributes the human-centered, ethical, applied, and creative progression. NIST contributes risk-calibrated review and trustworthy-AI thinking. Stanford contributes functional, ethical, rhetorical, and pedagogical literacies. TeachAI contributes durable skills and future-ready attitudes. AIR’s AI by 8 initiative supports storytelling, literacy integration, play, and unplugged learning. UNICEF contributes child-centered safety, privacy, fairness, transparency, well-being, and inclusion. Dweck contributes the power of yet. AiR turns all of it into situations rather than lessons.`,
    sourceUrl: "https://www.unesco.org/en/articles/ai-competency-framework-students",
    sortOrder: 7,
  },
] as const;
