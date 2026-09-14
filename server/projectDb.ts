import { and, desc, eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { projects, type Project } from "../drizzle/schema";
import { getDb } from "./db";
import { emptyProjectNotes } from "@shared/projects";
import type { z } from "zod";
import type { ideaInput } from "@shared/projects";

async function database() {
  const db = await getDb();
  if (!db)
    throw new TRPCError({
      code: "SERVICE_UNAVAILABLE",
      message: "Your work could not be saved. Please try again shortly.",
    });
  return db;
}
export async function listProjects(userId: number) {
  const db = await database();
  return db
    .select({
      id: projects.id,
      title: projects.title,
      idea: projects.idea,
      status: projects.status,
      reflections: projects.reflections,
      updatedAt: projects.updatedAt,
    })
    .from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.updatedAt), desc(projects.id));
}
export async function getProject(userId: number, id: number) {
  const db = await database();
  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)))
    .limit(1);
  if (!project)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "This project could not be found in your workspace.",
    });
  return project;
}
export async function createProject(
  userId: number,
  input: z.infer<typeof ideaInput>
) {
  const db = await database();
  const [inserted] = await db
    .insert(projects)
    .values({
      ...input,
      userId,
      notes: { ...emptyProjectNotes },
      reflections: {},
      resultText: "",
      resultUrl: "",
    })
    .$returningId();
  return getProject(userId, inserted.id);
}
// Every write checks both ownership and the last version seen by the browser.
export async function updateProject(
  userId: number,
  id: number,
  version: number,
  changes: Partial<
    Pick<
      Project,
      | "title"
      | "idea"
      | "audience"
      | "success"
      | "status"
      | "notes"
      | "resultText"
      | "resultUrl"
      | "reflections"
      | "completedAt"
    >
  >
) {
  const db = await database();
  const [result] = await db
    .update(projects)
    .set({ ...changes, version: sql`${projects.version} + 1` })
    .where(
      and(
        eq(projects.id, id),
        eq(projects.userId, userId),
        eq(projects.version, version)
      )
    );
  if (!result.affectedRows)
    throw new TRPCError({
      code: "CONFLICT",
      message:
        "This project changed in another tab. Copy your unsaved notes, then reload to see the latest version.",
    });
  return getProject(userId, id);
}
