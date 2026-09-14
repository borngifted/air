import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import * as db from "../projectDb";
import {
  completionProblem,
  ideaInput,
  projectWorkInput,
  reviewId,
} from "@shared/projects";
const identity = z.object({ id: z.number().int().positive() });
const revision = identity.extend({ version: z.number().int().positive() });

export const projectsRouter = router({
  list: protectedProcedure.query(({ ctx }) => db.listProjects(ctx.user.id)),
  get: protectedProcedure
    .input(identity)
    .query(({ ctx, input }) => db.getProject(ctx.user.id, input.id)),
  create: protectedProcedure
    .input(ideaInput)
    .mutation(({ ctx, input }) => db.createProject(ctx.user.id, input)),
  saveIdea: protectedProcedure
    .input(
      revision.extend({ idea: ideaInput, start: z.boolean().default(false) })
    )
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(ctx.user.id, input.id);
      if (project.status !== "idea")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The idea is saved. Continue in your project workspace.",
        });
      return db.updateProject(ctx.user.id, input.id, input.version, {
        ...input.idea,
        status: input.start ? "building" : "idea",
      });
    }),
  saveWork: protectedProcedure
    .input(
      revision.extend({
        work: projectWorkInput,
        finish: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(ctx.user.id, input.id);
      if (project.status !== "building")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Open the building step before saving work.",
        });
      const problem = input.finish ? completionProblem(input.work) : null;
      if (problem)
        throw new TRPCError({ code: "BAD_REQUEST", message: problem });
      return db.updateProject(ctx.user.id, input.id, input.version, {
        ...input.work,
        ...(input.finish
          ? { status: "completed", completedAt: new Date() }
          : {}),
      });
    }),
  reflect: protectedProcedure
    .input(
      revision.extend({
        step: reviewId,
        answer: z
          .string()
          .trim()
          .min(10, "Write a sentence about what you learned.")
          .max(6000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(ctx.user.id, input.id);
      if (project.status !== "completed")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Finish your result to unlock its learning review.",
        });
      return db.updateProject(ctx.user.id, input.id, input.version, {
        reflections: { ...project.reflections, [input.step]: input.answer },
      });
    }),
  reopen: protectedProcedure
    .input(revision)
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(ctx.user.id, input.id);
      if (project.status !== "completed")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This project is already open.",
        });
      // Preserve previous learning notes while the next revision is being built.
      return db.updateProject(ctx.user.id, input.id, input.version, {
        status: "building",
        completedAt: null,
      });
    }),
});
