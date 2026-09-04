import { z } from "zod";
import { getPublicProfile, updateMemberProfile } from "../db";
import { assertSafeDisplayName } from "../safety";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";

const profileInput = z.object({
  displayName: z.string().trim().min(2).max(40),
  publicRole: z.enum(["learner", "parent", "educator", "creator", "community_leader"]),
  learningMode: z.enum(["explore", "create", "build"]),
  headline: z.string().trim().max(120).optional(),
  bio: z.string().trim().max(600).optional(),
  currentPathSlug: z.string().trim().max(80).optional(),
  safetyAcknowledged: z.boolean(),
  onboardingComplete: z.boolean(),
});

export const profileRouter = router({
  update: protectedProcedure.input(profileInput).mutation(({ ctx, input }) => {
    assertSafeDisplayName(input.displayName);
    return updateMemberProfile(ctx.user.id, input);
  }),
  public: publicProcedure
    .input(z.object({ userId: z.number().int().positive() }))
    .query(({ input }) => getPublicProfile(input.userId)),
});
