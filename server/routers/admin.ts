import { desc, eq, sql } from "drizzle-orm";
import { communityComments, communityPosts, contentReports, lessons, mediaAssets, trainerResources, users } from "../../drizzle/schema";
import { getDb } from "../db";
import { adminProcedure, router } from "../_core/trpc";
import { z } from "zod";

async function tableCount(table: typeof users | typeof communityPosts | typeof communityComments | typeof contentReports | typeof lessons | typeof mediaAssets | typeof trainerResources) {
  const db = await getDb();
  if (!db) return 0;
  const [row] = await db.select({ count: sql<number>`count(*)` }).from(table);
  return Number(row?.count ?? 0);
}

export const adminRouter = router({
  overview: adminProcedure.query(async () => {
    const [members, posts, comments, reports, lessonCount, videos, resources] = await Promise.all([
      tableCount(users),
      tableCount(communityPosts),
      tableCount(communityComments),
      tableCount(contentReports),
      tableCount(lessons),
      tableCount(mediaAssets),
      tableCount(trainerResources),
    ]);
    return { members, posts, comments, reports, lessonCount, videos, resources };
  }),
  reports: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select({
      id: contentReports.id,
      reporterName: users.displayName,
      targetType: contentReports.targetType,
      targetId: contentReports.targetId,
      reason: contentReports.reason,
      status: contentReports.status,
      createdAt: contentReports.createdAt,
      targetTitle: sql<string>`case when ${contentReports.targetType} = 'post' then coalesce((select title from communityPosts where communityPosts.id = ${contentReports.targetId}), 'Post unavailable') else 'Reported reply' end`,
      targetPostId: sql<number>`case when ${contentReports.targetType} = 'post' then ${contentReports.targetId} else coalesce((select postId from communityComments where communityComments.id = ${contentReports.targetId}), 0) end`,
    }).from(contentReports).innerJoin(users, eq(contentReports.reporterId, users.id)).orderBy(desc(contentReports.createdAt));
  }),
  resolveReport: adminProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["resolved", "dismissed"]) })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database unavailable");
    await db.update(contentReports).set({ status: input.status, resolvedAt: new Date() }).where(eq(contentReports.id, input.id));
    return { success: true } as const;
  }),
});
