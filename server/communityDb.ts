import { and, asc, desc, eq, sql } from "drizzle-orm";
import { communityChannels, communityComments, communityPosts, communityReactions, contentReports, lessons, users } from "../drizzle/schema";
import { getDb } from "./db";

const channelSeeds = [
  { slug: "start-here", name: "Start Here", description: "Say hello. Share what you want to make better. Ask where to begin.", icon: "compass", sortOrder: 1, access: "members" as const },
  { slug: "clear", name: "Clear", description: "Choose one person to help and one change to make.", icon: "flag", sortOrder: 2, access: "members" as const },
  { slug: "direct", name: "Direct", description: "Practice giving AI clear steps and a clear finish line.", icon: "spark", sortOrder: 3, access: "members" as const },
  { slug: "judge", name: "Check", description: "Check facts, fairness, privacy, risk, and whether the answer fits.", icon: "eye", sortOrder: 4, access: "members" as const },
  { slug: "make", name: "Make", description: "Make a small first version. Test it. Make it better.", icon: "hammer", sortOrder: 5, access: "members" as const },
  { slug: "wins", name: "Wins + What I Learned", description: "Share what worked, what did not, and what you will try next.", icon: "trophy", sortOrder: 6, access: "members" as const },
  { slug: "trainers-room", name: "Trainers Room", description: "Ask teaching questions. Share what helped your group learn.", icon: "presentation", sortOrder: 7, access: "trainers" as const },
];

async function ensureChannels() {
  const db = await getDb();
  if (!db) return;
  for (const channel of channelSeeds) {
    await db.insert(communityChannels).values(channel).onDuplicateKeyUpdate({ set: { name: channel.name, description: channel.description, icon: channel.icon, sortOrder: channel.sortOrder, access: channel.access, isActive: true } });
  }
}

export async function listChannels() {
  const db = await getDb();
  if (!db) return [];
  await ensureChannels();
  return db.select({
    id: communityChannels.id,
    slug: communityChannels.slug,
    name: communityChannels.name,
    description: communityChannels.description,
    icon: communityChannels.icon,
    access: communityChannels.access,
    sortOrder: communityChannels.sortOrder,
    postCount: sql<number>`(select count(*) from communityPosts where communityPosts.channelId = communityChannels.id and communityPosts.status = 'published')`,
  }).from(communityChannels).where(eq(communityChannels.isActive, true)).orderBy(asc(communityChannels.sortOrder));
}

export async function listCommunityMembers() {
  const db = await getDb();
  if (!db) return [];
  return db.select({ id: users.id, displayName: users.displayName, publicRole: users.publicRole, lastSignedIn: users.lastSignedIn })
    .from(users).where(eq(users.onboardingComplete, true)).orderBy(desc(users.lastSignedIn)).limit(12);
}

export async function listPosts(viewerId: number, filters?: { lessonId?: number; channelId?: number; category?: "practice" | "question" | "reflection" | "win" }) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(communityPosts.status, "published")];
  if (filters?.lessonId) conditions.push(eq(communityPosts.lessonId, filters.lessonId));
  if (filters?.channelId) conditions.push(eq(communityPosts.channelId, filters.channelId));
  if (filters?.category) conditions.push(eq(communityPosts.category, filters.category));
  return db.select({
    id: communityPosts.id,
    authorId: communityPosts.authorId,
    authorName: users.displayName,
    authorRole: users.publicRole,
    channelId: communityPosts.channelId,
    channelSlug: communityChannels.slug,
    channelName: communityChannels.name,
    lessonId: communityPosts.lessonId,
    lessonTitle: lessons.title,
    category: communityPosts.category,
    title: communityPosts.title,
    body: communityPosts.body,
    createdAt: communityPosts.createdAt,
    updatedAt: communityPosts.updatedAt,
    commentCount: sql<number>`(select count(*) from communityComments where communityComments.postId = communityPosts.id and communityComments.status = 'published')`,
    supportCount: sql<number>`(select count(*) from communityReactions where communityReactions.targetType = 'post' and communityReactions.targetId = communityPosts.id and communityReactions.kind = 'support')`,
    insightCount: sql<number>`(select count(*) from communityReactions where communityReactions.targetType = 'post' and communityReactions.targetId = communityPosts.id and communityReactions.kind = 'insight')`,
    celebrateCount: sql<number>`(select count(*) from communityReactions where communityReactions.targetType = 'post' and communityReactions.targetId = communityPosts.id and communityReactions.kind = 'celebrate')`,
    curiousCount: sql<number>`(select count(*) from communityReactions where communityReactions.targetType = 'post' and communityReactions.targetId = communityPosts.id and communityReactions.kind = 'curious')`,
    viewerReacted: sql<number>`(select count(*) from communityReactions where communityReactions.targetType = 'post' and communityReactions.targetId = communityPosts.id and communityReactions.userId = ${viewerId})`,
  }).from(communityPosts)
    .innerJoin(users, eq(communityPosts.authorId, users.id))
    .leftJoin(communityChannels, eq(communityPosts.channelId, communityChannels.id))
    .leftJoin(lessons, eq(communityPosts.lessonId, lessons.id))
    .where(and(...conditions)).orderBy(desc(communityPosts.createdAt));
}

export async function getPost(id: number, viewerId?: number) {
  const db = await getDb();
  if (!db) return undefined;
  const [post] = await db.select({
    id: communityPosts.id,
    authorId: communityPosts.authorId,
    authorName: users.displayName,
    authorRole: users.publicRole,
    channelId: communityPosts.channelId,
    channelSlug: communityChannels.slug,
    channelName: communityChannels.name,
    lessonId: communityPosts.lessonId,
    lessonTitle: lessons.title,
    category: communityPosts.category,
    title: communityPosts.title,
    body: communityPosts.body,
    createdAt: communityPosts.createdAt,
    supportCount: sql<number>`(select count(*) from communityReactions where communityReactions.targetType = 'post' and communityReactions.targetId = communityPosts.id and communityReactions.kind = 'support')`,
    insightCount: sql<number>`(select count(*) from communityReactions where communityReactions.targetType = 'post' and communityReactions.targetId = communityPosts.id and communityReactions.kind = 'insight')`,
    celebrateCount: sql<number>`(select count(*) from communityReactions where communityReactions.targetType = 'post' and communityReactions.targetId = communityPosts.id and communityReactions.kind = 'celebrate')`,
    curiousCount: sql<number>`(select count(*) from communityReactions where communityReactions.targetType = 'post' and communityReactions.targetId = communityPosts.id and communityReactions.kind = 'curious')`,
    viewerReacted: sql<number>`(select count(*) from communityReactions where communityReactions.targetType = 'post' and communityReactions.targetId = communityPosts.id and communityReactions.userId = ${viewerId ?? 0})`,
  }).from(communityPosts)
    .innerJoin(users, eq(communityPosts.authorId, users.id))
    .leftJoin(communityChannels, eq(communityPosts.channelId, communityChannels.id))
    .leftJoin(lessons, eq(communityPosts.lessonId, lessons.id))
    .where(and(eq(communityPosts.id, id), eq(communityPosts.status, "published"))).limit(1);
  if (!post) return undefined;
  const comments = await db.select({
    id: communityComments.id,
    postId: communityComments.postId,
    parentId: communityComments.parentId,
    authorId: communityComments.authorId,
    authorName: users.displayName,
    authorRole: users.publicRole,
    body: communityComments.body,
    createdAt: communityComments.createdAt,
    reactionCount: sql<number>`(select count(*) from communityReactions where communityReactions.targetType = 'comment' and communityReactions.targetId = communityComments.id)`,
  }).from(communityComments)
    .innerJoin(users, eq(communityComments.authorId, users.id))
    .where(and(eq(communityComments.postId, id), eq(communityComments.status, "published")))
    .orderBy(asc(communityComments.createdAt));
  return { ...post, comments };
}

export async function createPost(authorId: number, input: { channelId: number; lessonId?: number; pathId?: number; category: "practice" | "question" | "reflection" | "win"; title: string; body: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(communityPosts).values({ authorId, ...input });
  return getPost(Number(result[0].insertId), authorId);
}

export async function createComment(authorId: number, postId: number, body: string, parentId?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(communityComments).values({ authorId, postId, body, parentId });
  return getPost(postId, authorId);
}

export async function toggleReaction(userId: number, targetType: "post" | "comment", targetId: number, kind: "support" | "insight" | "celebrate" | "curious") {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [existing] = await db.select({ id: communityReactions.id }).from(communityReactions).where(and(eq(communityReactions.userId, userId), eq(communityReactions.targetType, targetType), eq(communityReactions.targetId, targetId), eq(communityReactions.kind, kind))).limit(1);
  if (existing) {
    await db.delete(communityReactions).where(eq(communityReactions.id, existing.id));
    return { active: false } as const;
  }
  await db.insert(communityReactions).values({ userId, targetType, targetId, kind });
  return { active: true } as const;
}

export async function updatePost(authorId: number, id: number, title: string, body: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(communityPosts).set({ title, body }).where(and(eq(communityPosts.id, id), eq(communityPosts.authorId, authorId)));
  return getPost(id, authorId);
}

export async function hidePost(requester: { id: number; role: string }, id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const condition = requester.role === "admin" ? eq(communityPosts.id, id) : and(eq(communityPosts.id, id), eq(communityPosts.authorId, requester.id));
  await db.update(communityPosts).set({ status: "hidden" }).where(condition);
  return { success: true } as const;
}

export async function hideComment(requester: { id: number; role: string }, id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const condition = requester.role === "admin" ? eq(communityComments.id, id) : and(eq(communityComments.id, id), eq(communityComments.authorId, requester.id));
  await db.update(communityComments).set({ status: "hidden" }).where(condition);
  return { success: true } as const;
}

export async function reportContent(reporterId: number, targetType: "post" | "comment", targetId: number, reason: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(contentReports).values({ reporterId, targetType, targetId, reason });
  return { success: true } as const;
}
