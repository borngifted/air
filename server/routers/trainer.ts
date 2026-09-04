import { z } from "zod";
import { getTrainerResourceBySlug, listTrainerResources, upsertTrainerResource } from "../db";
import { adminProcedure, protectedProcedure, router } from "../_core/trpc";

const resourceInput = z.object({
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/),
  type: z.enum(["facilitator_guide", "framework", "exercise", "delivery_note", "source", "video_guide"]),
  title: z.string().trim().min(3).max(200),
  summary: z.string().trim().min(3).max(1000),
  body: z.string().trim().min(10).max(50000),
  sourceUrl: z.string().url().max(2000).optional(),
  relatedLessonId: z.number().int().positive().optional(),
  sortOrder: z.number().int().min(0).max(1000),
});

export const trainerRouter = router({
  list: protectedProcedure.query(() => listTrainerResources()),
  detail: protectedProcedure
    .input(z.object({ slug: z.string().min(1).max(120) }))
    .query(({ input }) => getTrainerResourceBySlug(input.slug)),
  upsert: adminProcedure.input(resourceInput).mutation(({ input }) => upsertTrainerResource(input)),
});
