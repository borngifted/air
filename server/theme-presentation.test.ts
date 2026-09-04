import { describe, expect, it } from "vitest";
import { clampPresentationIndex, formatPresentationTime, resolveAirTheme, sceneFromHandX } from "../shared/presentation";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { cameraFailureMessage, cameraIsAvailable, handTrackingMessage } from "../shared/camera";

function memberContext(): TrpcContext {
  return {
    user: { id: 31, openId: "member-31", email: null, name: "Member", loginMethod: "test", role: "user", displayName: "Member", headline: null, bio: null, publicRole: "educator", learningMode: "create", currentPathSlug: "clear", onboardingComplete: true, safetyAcknowledged: true, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("theme and presentation helpers", () => {
  it("respects a stored theme before system preference", () => {
    expect(resolveAirTheme("dark", true)).toBe("dark");
    expect(resolveAirTheme("light", false)).toBe("light");
    expect(resolveAirTheme(null, true)).toBe("light");
  });

  it("maps hand position and controls to safe scene indexes", () => {
    expect(sceneFromHandX(0, 13)).toBe(0);
    expect(sceneFromHandX(.5, 13)).toBe(6);
    expect(sceneFromHandX(2, 13)).toBe(12);
    expect(clampPresentationIndex(-4, 13)).toBe(0);
    expect(clampPresentationIndex(40, 13)).toBe(12);
  });

  it("formats a classroom timer without negative values", () => {
    expect(formatPresentationTime(300)).toBe("05:00");
    expect(formatPresentationTime(9)).toBe("00:09");
    expect(formatPresentationTime(-2)).toBe("00:00");
  });
});

describe("administrator workspace boundary", () => {
  it("blocks a normal member before administrator overview logic runs", async () => {
    const caller = appRouter.createCaller(memberContext());
    await expect(caller.admin.overview()).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(caller.admin.reports()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("camera permission fallback messages", () => {
  it("detects a device without browser camera support", () => {
    expect(cameraIsAvailable(undefined)).toBe(false);
    expect(cameraIsAvailable({ getUserMedia: async () => new MediaStream() })).toBe(true);
  });

  it("gives plain-language denied and missing-camera guidance", () => {
    expect(cameraFailureMessage("NotAllowedError")).toContain("not allowed");
    expect(cameraFailureMessage("NotFoundError")).toContain("No camera");
    expect(cameraFailureMessage("UnknownError")).toContain("try again");
  });

  it("reports automatic hand-tracking loading, active, and fallback states", () => {
    expect(handTrackingMessage("loading")).toContain("Getting private hand tracking ready");
    expect(handTrackingMessage("active", true)).toContain("Move your palm left or right");
    expect(handTrackingMessage("active", false)).toContain("active on this device");
    expect(handTrackingMessage("unavailable")).toContain("buttons, and keyboard still work");
  });
});
