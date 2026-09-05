export const GOOGLE_SIGN_IN_LABEL = "Continue with Google";

export type AuthReturnError = "google_required" | "identity_conflict";

export function deriveLoginMethod(
  platforms: unknown,
  fallback: string | null | undefined,
): string | null {
  if (fallback && fallback.length > 0) {
    const normalizedFallback = fallback.trim().toUpperCase();
    if (normalizedFallback === "REGISTERED_PLATFORM_EMAIL") return "email";
    if (normalizedFallback === "REGISTERED_PLATFORM_GOOGLE") return "google";
    if (normalizedFallback === "REGISTERED_PLATFORM_APPLE") return "apple";
    if (normalizedFallback === "REGISTERED_PLATFORM_MICROSOFT" || normalizedFallback === "REGISTERED_PLATFORM_AZURE") return "microsoft";
    if (normalizedFallback === "REGISTERED_PLATFORM_GITHUB") return "github";
    return fallback.trim().toLowerCase();
  }
  if (!Array.isArray(platforms) || platforms.length === 0) return null;
  const set = new Set<string>(platforms.filter((value): value is string => typeof value === "string"));
  if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
  if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
  if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
  if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE")) return "microsoft";
  if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
  const first = Array.from(set)[0];
  return first ? first.toLowerCase() : null;
}

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
  return null;
}
