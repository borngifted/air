import { z } from "zod";
import { getLessonBySlug, getPublicCatalog } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";

export const catalogRouter = router({
  list: publicProcedure.query(() => getPublicCatalog()),
  lesson: protectedProcedure
    .input(z.object({ slug: z.string().min(1).max(100) }))
    .query(({ ctx, input }) => getLessonBySlug(input.slug, ctx.user.id)),
});
