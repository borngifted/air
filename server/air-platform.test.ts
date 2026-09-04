import { describe, expect, it } from "vitest";
import type { TrpcContext } from "./_core/context";
import { appRouter } from "./routers";
import { curriculum, trainerResourceSeeds } from "./content";
import { assertCommunitySafe, assertSafeDisplayName } from "./safety";
import { calculateCompletion, nextLessonId } from "../shared/learning";

function context(role: "user" | "admin" | null): TrpcContext {
  return {
    user: role ? {
      id: 10,
      openId: "test-member",
      email: "member@example.com",
      name: "Test Member",
      loginMethod: "test",
      role,
      displayName: "Sky",
      headline: null,
      bio: null,
      publicRole: "learner",
      learningMode: "explore",
      currentPathSlug: "clear",
      onboardingComplete: true,
      safetyAcknowledged: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    } : null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("AiR curriculum", () => {
  it("ships four paths and twelve complete lessons", () => {
    const lessons = curriculum.flatMap(path => path.modules.flatMap(module => module.lessons));
    expect(curriculum).toHaveLength(4);
    expect(lessons).toHaveLength(12);
    for (const lesson of lessons) {
      expect(lesson.checkpoints).toHaveLength(5);
      expect(lesson.exercises.map(item => item.mode).sort()).toEqual(["build", "create", "explore"]);
      expect(lesson.story.length).toBeGreaterThan(80);
      expect(lesson.summary.split(/\s+/).length).toBeLessThanOrEqual(24);
      expect(lesson.checkpoints.every(item => item.prompt.split(/\s+/).length <= 32)).toBe(true);
    }
  });

  it("keeps core learner copy concrete and free of unexplained specialist jargon", () => {
    const learnerCopy = curriculum.flatMap(path => path.modules.flatMap(module => module.lessons)).map(lesson => `${lesson.title} ${lesson.summary} ${lesson.story} ${lesson.bigIdea}`).join(" ").toLowerCase();
    for (const term of ["transformer architecture", "token embedding", "gradient descent", "backpropagation", "large language model inference"]) {
      expect(learnerCopy).not.toContain(term);
    }
  });

  it("contains no alternate sound-only media model", () => {
    const serialized = JSON.stringify({ curriculum, trainerResourceSeeds }).toLowerCase();
    expect(serialized).not.toContain(".mp3");
    expect(serialized).not.toContain("sound-only");
  });
});

describe("learning progress", () => {
  it("calculates bounded completion and resumes an in-progress lesson", () => {
    expect(calculateCompletion(3, 12)).toBe(25);
    expect(calculateCompletion(20, 12)).toBe(100);
    expect(calculateCompletion(0, 0)).toBe(0);
    expect(nextLessonId([1, 2, 3], [{ lessonId: 2, status: "in_progress" }])).toBe(2);
    expect(nextLessonId([1, 2, 3], [{ lessonId: 1, status: "completed" }])).toBe(2);
  });
});

describe("child-safe community", () => {
  it("allows constructive practice language", () => {
    expect(() => assertCommunitySafe("I tried a clearer brief and changed the audience.")) .not.toThrow();
  });

  it("blocks contact and location details", () => {
    expect(() => assertCommunitySafe("Email me at learner@example.com")).toThrow();
    expect(() => assertCommunitySafe("My school is River Road School")).toThrow();
    expect(() => assertSafeDisplayName("My Very Long Full Legal Name")).toThrow();
  });
});

describe("access boundaries", () => {
  it("prevents normal members from opening media administration", async () => {
    const caller = appRouter.createCaller(context("user"));
    await expect(caller.media.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("requires authentication for trainer resources", async () => {
    const caller = appRouter.createCaller(context(null));
    await expect(caller.trainer.list()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("rejects private details before creating a community post", async () => {
    const caller = appRouter.createCaller(context("user"));
    await expect(caller.community.create({ category: "practice", title: "My attempt", body: "Call me at 555-555-1212" }))
      .rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
