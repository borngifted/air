import { beforeEach, describe, expect, it, vi } from "vitest";
import { TRPCError } from "@trpc/server";
import type { Project } from "../drizzle/schema";
import type { TrpcContext } from "./_core/context";
import {
  emptyProjectNotes,
  projectWorkInput,
  reviewSteps,
} from "@shared/projects";

const state = vi.hoisted(() => ({ projects: [] as Project[] }));
vi.mock("./projectDb", () => {
  const getProject = async (userId: number, id: number) => {
    const project = state.projects.find(
      p => p.id === id && p.userId === userId
    );
    if (!project) throw new TRPCError({ code: "NOT_FOUND" });
    return structuredClone(project);
  };
  return {
    getProject,
    listProjects: async (userId: number) =>
      state.projects.filter(p => p.userId === userId),
    createProject: async (userId: number, input: object) => {
      const project = {
        ...input,
        id: state.projects.length + 1,
        userId,
        status: "idea",
        version: 1,
        notes: { ...emptyProjectNotes },
        reflections: {},
        resultText: "",
        resultUrl: "",
        completedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Project;
      state.projects.push(project);
      return structuredClone(project);
    },
    updateProject: async (
      userId: number,
      id: number,
      version: number,
      changes: object
    ) => {
      const existing = await getProject(userId, id);
      if (existing.version !== version)
        throw new TRPCError({ code: "CONFLICT" });
      const next = { ...existing, ...changes, version: version + 1 };
      state.projects = state.projects.map(p => (p.id === id ? next : p));
      return structuredClone(next);
    },
  };
});
import { projectsRouter } from "./routers/projects";
const caller = (id: number | null) =>
  projectsRouter.createCaller({ user: id ? { id } : null } as TrpcContext);
const idea = {
  title: "Garden guide",
  idea: "Make a useful guide for new gardeners.",
  audience: "New gardeners",
  success: "Help people choose their first plants.",
};
const work = {
  notes: {
    clear: "I chose a guide for first-time gardeners.",
    direct: "I used photos and simple instructions.",
    judge: "A friend tried it and I fixed two unclear steps.",
    make: "I arranged the pages and added a checklist.",
  },
  resultText:
    "My garden guide: choose a sunny spot, plant seeds, water gently.",
  resultUrl: "",
};
beforeEach(() => {
  state.projects = [];
});

describe("private project lifecycle", () => {
  it("requires sign-in for reading and creating projects", async () => {
    await expect(caller(null).list()).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
    await expect(caller(null).create(idea)).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
    await expect(
      caller(null).saveWork({ id: 1, version: 1, work })
    ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
  it("saves an idea, builds a result, and preserves five reverse-order reflections", async () => {
    const api = caller(1);
    let p = await api.create(idea);
    expect(p.status).toBe("idea");
    p = await api.saveIdea({ id: p.id, version: p.version, idea, start: true });
    p = await api.saveWork({ id: p.id, version: p.version, work });
    expect((await api.get({ id: p.id })).resultText).toBe(work.resultText);
    p = await api.saveWork({
      id: p.id,
      version: p.version,
      work,
      finish: true,
    });
    expect(p.status).toBe("completed");
    expect(p.completedAt).toBeInstanceOf(Date);
    expect(reviewSteps.map(s => s.id)).toEqual([
      "result",
      "make",
      "judge",
      "direct",
      "clear",
    ]);
    for (const step of reviewSteps)
      p = await api.reflect({
        id: p.id,
        version: p.version,
        step: step.id,
        answer: `I learned why ${step.id} helped my project.`,
      });
    expect(Object.keys(p.reflections)).toHaveLength(5);
    p = await api.reopen({ id: p.id, version: p.version });
    expect(p.status).toBe("building");
    expect(Object.keys(p.reflections)).toHaveLength(5);
    expect(p.resultText).toBe(work.resultText);
  });
  it("does not expose or mutate another member's project, including for an admin", async () => {
    const p = await caller(1).create(idea);
    const other = projectsRouter.createCaller({
      user: { id: 2, role: "admin" },
    } as TrpcContext);
    expect(await other.list()).toEqual([]);
    for (const action of [
      () => other.get({ id: p.id }),
      () => other.saveIdea({ id: p.id, version: p.version, idea }),
      () => other.saveWork({ id: p.id, version: p.version, work }),
      () =>
        other.reflect({
          id: p.id,
          version: p.version,
          step: "result",
          answer: "This should never save",
        }),
      () => other.reopen({ id: p.id, version: p.version }),
    ]) {
      await expect(action()).rejects.toMatchObject({ code: "NOT_FOUND" });
    }
  });
  it("blocks premature review, empty completion, and stale writes", async () => {
    const api = caller(1);
    let p = await api.create(idea);
    await expect(
      api.reflect({
        id: p.id,
        version: p.version,
        step: "result",
        answer: "I learned something",
      })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(
      api.saveWork({ id: p.id, version: p.version, work })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    p = await api.saveIdea({ id: p.id, version: p.version, idea, start: true });
    await expect(
      api.saveWork({
        id: p.id,
        version: p.version,
        work: { ...work, resultText: "" },
        finish: true,
      })
    ).rejects.toThrow("Add your finished result");
    await expect(
      api.saveWork({
        id: p.id,
        version: p.version,
        work: { ...work, notes: emptyProjectNotes },
        finish: true,
      })
    ).rejects.toThrow("Add a short note");
    await api.saveWork({ id: p.id, version: p.version, work });
    await expect(
      api.saveWork({
        id: p.id,
        version: p.version,
        work: { ...work, resultText: "Overwrite" },
      })
    ).rejects.toMatchObject({ code: "CONFLICT" });
    expect((await api.get({ id: p.id })).resultText).toBe(work.resultText);
  });
  it("rejects executable and credential-bearing result links and oversized input", async () => {
    for (const resultUrl of [
      "javascript:alert(1)",
      "data:text/html,hi",
      "http://example.com",
      "https://user:password@example.com",
    ])
      expect(projectWorkInput.safeParse({ ...work, resultUrl }).success).toBe(
        false
      );
    expect(
      projectWorkInput.safeParse({
        ...work,
        resultUrl: "https://example.com/project",
      }).success
    ).toBe(true);
    await expect(
      caller(1).create({ ...idea, title: "x".repeat(161) })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
