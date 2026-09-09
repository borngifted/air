export const GOOGLE_SIGN_IN_LABEL = "Continue with Google";

export type AuthReturnError =
  | "google_required"
  | "identity_conflict"
  | "email_unverified"
  | "sign_in_cancelled"
  | "sign_in_failed";

export function isGoogleLoginMethod(loginMethod: string | null | undefined) {
  return loginMethod?.trim().toLowerCase() === "google";
}

export function hasConflictingIdentity(
  users: Array<{ openId: string }>,
  incomingOpenId: string,
) {
  return users.some(user => user.openId !== incomingOpenId);
}

export function getAuthReturnErrorMessage(code: string | null | undefined) {
  if (code === "google_required") return "Choose Continue with Google to join AiR.";
  if (code === "identity_conflict") return "That email is already connected to another AiR sign-in. Ask an AiR administrator for help.";
  if (code === "email_unverified") return "Your Google email must be verified before you can join AiR.";
  if (code === "sign_in_cancelled") return "Sign-in did not finish. Choose Continue with Google to try again.";
  if (code === "sign_in_failed") return "Sign-in did not work this time. Try again in a moment.";
  return null;
}
