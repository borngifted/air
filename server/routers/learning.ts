import { z } from "zod";
import {
  completeLesson,
  enrollInPath,
  getMemberDashboard,
  saveArtifact,
  saveCheckpointResponse,
  saveExerciseSubmission,
} from "../db";
import { protectedProcedure, router } from "../_core/trpc";

const mode = z.enum(["explore", "create", "build"]);

export const learningRouter = router({
  dashboard: protectedProcedure.query(({ ctx }) => getMemberDashboard(ctx.user.id)),
  enroll: protectedProcedure
    .input(z.object({ pathSlug: z.string().min(1).max(80), mode }))
    .mutation(({ ctx, input }) => enrollInPath(ctx.user.id, input.pathSlug, input.mode)),
  saveCheckpoint: protectedProcedure
    .input(z.object({ checkpointId: z.number().int().positive(), response: z.string().trim().min(1).max(3000), mode }))
    .mutation(({ ctx, input }) => saveCheckpointResponse(ctx.user.id, input.checkpointId, input.response, input.mode)),
  saveExercise: protectedProcedure
    .input(z.object({ exerciseId: z.number().int().positive(), response: z.string().trim().min(1).max(8000), completed: z.boolean() }))
    .mutation(({ ctx, input }) => saveExerciseSubmission(ctx.user.id, input.exerciseId, input.response, input.completed)),
  completeLesson: protectedProcedure
    .input(z.object({ lessonId: z.number().int().positive(), mode }))
    .mutation(({ ctx, input }) => completeLesson(ctx.user.id, input.lessonId, input.mode)),
  saveArtifact: protectedProcedure
    .input(z.object({
      lessonId: z.number().int().positive(),
      title: z.string().trim().min(2).max(180),
      body: z.string().trim().max(12000).optional(),
      linkUrl: z.string().url().max(2000).optional(),
      visibility: z.enum(["private", "community"]),
    }))
    .mutation(({ ctx, input }) => saveArtifact(ctx.user.id, input)),
});
