import { describe, expect, it } from "vitest";
import { staticCatalog } from "../client/src/lib/staticCatalog";
import { decodeOAuthState, encodeOAuthState } from "../shared/const";

describe("GitHub Pages launch contract", () => {
  it("ships all four paths and twelve public lesson summaries without an API", () => {
    expect(staticCatalog).toHaveLength(4);
    const lessons = staticCatalog.flatMap(path => path.modules.flatMap(module => module.lessons));
    expect(lessons).toHaveLength(12);
    expect(new Set(lessons.map(lesson => lesson.slug)).size).toBe(12);
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
});
