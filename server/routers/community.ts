import { z } from "zod";
import { createComment, createPost, getPost, hideComment, hidePost, listChannels, listCommunityMembers, listPosts, reportContent, toggleReaction, updatePost } from "../communityDb";
import { assertCommunitySafe } from "../safety";
import { protectedProcedure, router } from "../_core/trpc";

const category = z.enum(["practice", "question", "reflection", "win"]);
const reaction = z.enum(["support", "insight", "celebrate", "curious"]);

export const communityRouter = router({
  channels: protectedProcedure.query(() => listChannels()),
  members: protectedProcedure.query(() => listCommunityMembers()),
  list: protectedProcedure
    .input(z.object({ lessonId: z.number().int().positive().optional(), channelId: z.number().int().positive().optional(), category: category.optional() }).optional())
    .query(({ ctx, input }) => listPosts(ctx.user.id, input)),
  detail: protectedProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(({ ctx, input }) => getPost(input.id, ctx.user.id)),
  create: protectedProcedure
    .input(z.object({ channelId: z.number().int().positive(), lessonId: z.number().int().positive().optional(), pathId: z.number().int().positive().optional(), category, title: z.string().trim().min(3).max(180), body: z.string().trim().min(3).max(6000) }))
    .mutation(({ ctx, input }) => {
      assertCommunitySafe(`${input.title} ${input.body}`);
      return createPost(ctx.user.id, input);
    }),
  update: protectedProcedure
    .input(z.object({ id: z.number().int().positive(), title: z.string().trim().min(3).max(180), body: z.string().trim().min(3).max(6000) }))
    .mutation(({ ctx, input }) => {
      assertCommunitySafe(`${input.title} ${input.body}`);
      return updatePost(ctx.user.id, input.id, input.title, input.body);
    }),
  comment: protectedProcedure
    .input(z.object({ postId: z.number().int().positive(), parentId: z.number().int().positive().optional(), body: z.string().trim().min(2).max(2000) }))
    .mutation(({ ctx, input }) => {
      assertCommunitySafe(input.body);
      return createComment(ctx.user.id, input.postId, input.body, input.parentId);
    }),
  react: protectedProcedure
    .input(z.object({ targetType: z.enum(["post", "comment"]), targetId: z.number().int().positive(), kind: reaction }))
    .mutation(({ ctx, input }) => toggleReaction(ctx.user.id, input.targetType, input.targetId, input.kind)),
  hidePost: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => hidePost(ctx.user, input.id)),
  hideComment: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => hideComment(ctx.user, input.id)),
  report: protectedProcedure
    .input(z.object({ targetType: z.enum(["post", "comment"]), targetId: z.number().int().positive(), reason: z.string().trim().min(3).max(240) }))
    .mutation(({ ctx, input }) => reportContent(ctx.user.id, input.targetType, input.targetId, input.reason)),
});
