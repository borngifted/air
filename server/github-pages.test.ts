import { describe, expect, it } from "vitest";
import { staticCatalog } from "../client/src/lib/staticCatalog";
import { shouldUseStaticCatalog } from "../client/src/lib/publicCatalogFallback";
import { decodeOAuthState, encodeOAuthState } from "../shared/const";
import {
  getAuthReturnErrorMessage,
  GOOGLE_SIGN_IN_LABEL,
  hasConflictingIdentity,
  isGoogleLoginMethod,
} from "../shared/auth";
import { resolveAllowedOrigins, resolveAllowedReturns, safeReturnUrl } from "./_core/returnUrl";

describe("GitHub Pages launch contract", () => {
  it("ships all four paths and twelve public lesson summaries without an API", () => {
    expect(staticCatalog).toHaveLength(4);
    const lessons = staticCatalog.flatMap(path => path.modules.flatMap(module => module.lessons));
    expect(lessons).toHaveLength(12);
    expect(new Set(lessons.map(lesson => lesson.slug)).size).toBe(12);
  });

  it("keeps public learning available when the connected API is missing or unavailable", () => {
    expect(shouldUseStaticCatalog(false, false)).toBe(true);
    expect(shouldUseStaticCatalog(true, true)).toBe(true);
    expect(shouldUseStaticCatalog(true, false)).toBe(false);
  });

  it("preserves the approved Pages return route in OAuth state", () => {
    const state = encodeOAuthState({
      redirectUri: "https://api.example.com/api/oauth/callback",
      nonce: "one-time-nonce",
      returnTo: "https://borngifted.github.io/air/dashboard",
    });
    expect(decodeOAuthState(state)).toEqual({
      redirectUri: "https://api.example.com/api/oauth/callback",
      nonce: "one-time-nonce",
      returnTo: "https://borngifted.github.io/air/dashboard",
    });
  });

  it("only returns the browser to declared frontend origins", () => {
    const allowed = resolveAllowedReturns({
      frontendOrigin: "https://air.example.org/",
      publicApiOrigin: "https://api.example.org",
    });
    expect(allowed).toEqual([
      "https://air.example.org/",
      "https://api.example.org",
      "https://aireadiness.me/",
      "https://www.aireadiness.me/",
      "https://borngifted.github.io/air/",
    ]);

    expect(safeReturnUrl("https://aireadiness.me/dashboard", allowed))
      .toBe("https://aireadiness.me/dashboard");
    expect(safeReturnUrl("https://www.aireadiness.me/", allowed))
      .toBe("https://www.aireadiness.me/");

    expect(safeReturnUrl("https://borngifted.github.io/air/community", allowed))
      .toBe("https://borngifted.github.io/air/community");
    expect(safeReturnUrl("https://air.example.org/dashboard", allowed))
      .toBe("https://air.example.org/dashboard");
    expect(safeReturnUrl("https://api.example.org/learn/clear-the-air", allowed))
      .toBe("https://api.example.org/learn/clear-the-air");

    expect(safeReturnUrl("https://borngifted.github.io/other/", allowed)).toBeUndefined();
    expect(safeReturnUrl("https://evil.example.com/air/", allowed)).toBeUndefined();
    expect(safeReturnUrl("http://air.example.org/dashboard", allowed)).toBeUndefined();
    expect(safeReturnUrl("not a url", allowed)).toBeUndefined();
    expect(safeReturnUrl(undefined, allowed)).toBeUndefined();
  });

  it("derives the CORS allowlist from the same declared origins", () => {
    const origins = resolveAllowedOrigins(resolveAllowedReturns({ frontendOrigin: "https://air.example.org/" }));
    expect(origins.has("https://air.example.org")).toBe(true);
    expect(origins.has("https://aireadiness.me")).toBe(true);
    expect(origins.has("https://borngifted.github.io")).toBe(true);
    expect(origins.has("https://evil.example.com")).toBe(false);
  });
});

describe("Google sign-in contract", () => {
  it("recognizes the Google login method and the shared button label", () => {
    expect(isGoogleLoginMethod("google")).toBe(true);
    expect(isGoogleLoginMethod("Google ")).toBe(true);
    expect(isGoogleLoginMethod("microsoft")).toBe(false);
    expect(isGoogleLoginMethod(null)).toBe(false);
    expect(GOOGLE_SIGN_IN_LABEL).toBe("Continue with Google");
  });

  it("preserves the same openId and rejects a duplicate email on another identity", () => {
    expect(hasConflictingIdentity([{ openId: "google:member" }], "google:member")).toBe(false);
    expect(hasConflictingIdentity([{ openId: "existing-member" }], "google:new-member")).toBe(true);
    expect(hasConflictingIdentity([], "google:new-member")).toBe(false);
  });

  it("returns clear age-readable messages for every sign-in outcome", () => {
    expect(getAuthReturnErrorMessage("google_required")).toContain("Continue with Google");
    expect(getAuthReturnErrorMessage("identity_conflict")).toContain("AiR administrator");
    expect(getAuthReturnErrorMessage("email_unverified")).toContain("verified");
    expect(getAuthReturnErrorMessage("sign_in_cancelled")).toContain("Continue with Google");
    expect(getAuthReturnErrorMessage("sign_in_failed")).toContain("Try again");
    expect(getAuthReturnErrorMessage("unknown")).toBeNull();
  });
});
