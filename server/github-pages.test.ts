import { describe, expect, it } from "vitest";
import { staticCatalog } from "../client/src/lib/staticCatalog";
import { shouldUseStaticCatalog } from "../client/src/lib/publicCatalogFallback";
import { decodeOAuthState, encodeOAuthState } from "../shared/const";
import { buildOAuthLoginUrl } from "../shared/oauth";

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

  it("builds the canonical Manus login URL instead of the removed app-auth route", () => {
    const loginUrl = new URL(buildOAuthLoginUrl(
      "https://manus.im",
      "air-app-id",
      "https://airplatform-6feozlue.manus.space/api/oauth/callback",
      "signed-state",
    ));

    expect(loginUrl.origin).toBe("https://manus.im");
    expect(loginUrl.pathname).toBe("/login");
    expect(loginUrl.searchParams.get("app_id")).toBe("air-app-id");
    expect(loginUrl.searchParams.get("redirect_url")).toBe(
      "https://airplatform-6feozlue.manus.space/api/oauth/callback",
    );
    expect(loginUrl.searchParams.get("state")).toBe("signed-state");
    expect(loginUrl.searchParams.has("type")).toBe(false);
  });

  it("connects the configured GitHub frontend origin to the published catalog API", async () => {
    const frontendOrigin = process.env.FRONTEND_ORIGIN;
    const publicApiOrigin = process.env.PUBLIC_API_ORIGIN;

    expect(frontendOrigin).toBe("https://borngifted.github.io/air/");
    expect(publicApiOrigin).toBe("https://airplatform-6feozlue.manus.space");

    const origin = new URL(frontendOrigin!).origin;
    const response = await fetch(
      `${publicApiOrigin}/api/trpc/catalog.list?input=%7B%22json%22%3Anull%7D`,
      { headers: { Origin: origin } },
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("access-control-allow-origin")).toBe(origin);
    const payload = await response.json() as { result?: { data?: { json?: unknown[] } } };
    expect(payload.result?.data?.json).toHaveLength(4);
  }, 20_000);
});
