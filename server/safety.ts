import { TRPCError } from "@trpc/server";

const privatePatterns = [
  /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i,
  /(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/,
  /\b(?:my\s+)?(?:home\s+)?address\s+is\b/i,
  /\bi\s+live\s+at\b/i,
  /\bmy\s+school\s+is\b/i,
  /https?:\/\//i,
];

export function assertCommunitySafe(text: string) {
  if (privatePatterns.some(pattern => pattern.test(text))) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Please remove contact details, addresses, school names, and outside links before sharing.",
    });
  }
}

export function assertSafeDisplayName(name: string) {
  if (privatePatterns.some(pattern => pattern.test(name)) || name.trim().split(/\s+/).length > 3) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Choose a short display name that does not include private details.",
    });
  }
}
