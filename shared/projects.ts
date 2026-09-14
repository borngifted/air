import { z } from "zod";

export const buildSteps = [
  {
    id: "clear",
    title: "Choose one clear idea",
    prompt: "What are you making, and who is it for?",
    lesson: "choose-one-mission",
  },
  {
    id: "direct",
    title: "Give it direction",
    prompt: "What tools, instructions, or materials did you use?",
    lesson: "give-useful-context",
  },
  {
    id: "judge",
    title: "Check and improve",
    prompt: "What did you test or change? How do you know it works?",
    lesson: "spot-the-guess",
  },
  {
    id: "make",
    title: "Finish your result",
    prompt: "How did you put the pieces together? What did you leave out?",
    lesson: "make-a-first-version",
  },
] as const;
export const reviewSteps = [
  {
    id: "result",
    title: "Start with what you made",
    prompt: "How does the finished result help the person you made it for?",
  },
  {
    id: "make",
    title: "Look at the pieces",
    prompt:
      "Which part made the biggest difference? Explain how you put it together.",
  },
  {
    id: "judge",
    title: "Find the change that helped",
    prompt: "What did you change after checking your work? Why was it better?",
  },
  {
    id: "direct",
    title: "Trace your directions",
    prompt:
      "Which instruction, tool, or material helped most? What would you try next time?",
  },
  {
    id: "clear",
    title: "Return to your idea",
    prompt:
      "Explain the whole process to someone trying this for the first time. What would you do first?",
  },
] as const;
export const reviewId = z.enum(["result", "make", "judge", "direct", "clear"]);
export type ReviewId = z.infer<typeof reviewId>;
export type ProjectNotes = Record<(typeof buildSteps)[number]["id"], string>;
export type ProjectReflections = Partial<Record<ReviewId, string>>;
export const emptyProjectNotes: ProjectNotes = {
  clear: "",
  direct: "",
  judge: "",
  make: "",
};

export const ideaInput = z.object({
  title: z.string().trim().min(3, "Give your project a name.").max(160),
  idea: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your idea.")
    .max(4000),
  audience: z.string().trim().min(2, "Who is this for?").max(500),
  success: z
    .string()
    .trim()
    .min(5, "Describe what a useful result will do.")
    .max(1000),
});
const note = z.string().trim().max(6000);
export const projectWorkInput = z.object({
  notes: z.object({ clear: note, direct: note, judge: note, make: note }),
  resultText: z.string().trim().max(30000),
  resultUrl: z.union([
    z.literal(""),
    z
      .url()
      .max(2000)
      .refine(value => {
        const url = new URL(value);
        return url.protocol === "https:" && !url.username && !url.password;
      }, "Use a full https:// link without a password."),
  ]),
});
export type ProjectWork = z.infer<typeof projectWorkInput>;
export function completionProblem(work: ProjectWork): string | null {
  if (!work.resultText && !work.resultUrl)
    return "Add your finished result or a link before finishing.";
  const missing = buildSteps.find(
    step => work.notes[step.id].trim().length < 10
  );
  return missing
    ? `Add a short note for “${missing.title}” so you can learn from it later.`
    : null;
}
