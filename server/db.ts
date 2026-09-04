import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  checkpointResponses,
  communityComments,
  communityPosts,
  exerciseSubmissions,
  InsertUser,
  learnerArtifacts,
  learningModules,
  learningPaths,
  lessonCheckpoints,
  lessonExercises,
  lessonProgress,
  lessons,
  mediaAssets,
  pathEnrollments,
  trainerResources,
  users,
} from "../drizzle/schema";
import { curriculum, trainerResourceSeeds } from "./content";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;
let contentSeedPromise: Promise<void> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;

  for (const field of textFields) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }

  values.lastSignedIn = user.lastSignedIn ?? new Date();
  updateSet.lastSignedIn = values.lastSignedIn;
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

async function runContentSeed() {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  for (let pathIndex = 0; pathIndex < curriculum.length; pathIndex += 1) {
    const path = curriculum[pathIndex]!;
    await db.insert(learningPaths).values({
      slug: path.slug,
      number: path.number,
      title: path.title,
      kicker: path.kicker,
      summary: path.summary,
      description: path.description,
      promise: path.promise,
      accent: path.accent,
      sortOrder: pathIndex + 1,
      isPublished: true,
    }).onDuplicateKeyUpdate({
      set: {
        number: path.number,
        title: path.title,
        kicker: path.kicker,
        summary: path.summary,
        description: path.description,
        promise: path.promise,
        accent: path.accent,
        sortOrder: pathIndex + 1,
        isPublished: true,
      },
    });
    const [pathRow] = await db.select().from(learningPaths).where(eq(learningPaths.slug, path.slug)).limit(1);
    if (!pathRow) continue;

    for (let moduleIndex = 0; moduleIndex < path.modules.length; moduleIndex += 1) {
      const module = path.modules[moduleIndex]!;
      await db.insert(learningModules).values({
        pathId: pathRow.id,
        slug: module.slug,
        title: module.title,
        summary: module.summary,
        sortOrder: moduleIndex + 1,
        isPublished: true,
      }).onDuplicateKeyUpdate({
        set: {
          pathId: pathRow.id,
          title: module.title,
          summary: module.summary,
          sortOrder: moduleIndex + 1,
          isPublished: true,
        },
      });
      const [moduleRow] = await db.select().from(learningModules).where(eq(learningModules.slug, module.slug)).limit(1);
      if (!moduleRow) continue;

      for (let lessonIndex = 0; lessonIndex < module.lessons.length; lessonIndex += 1) {
        const lesson = module.lessons[lessonIndex]!;
        await db.insert(lessons).values({
          pathId: pathRow.id,
          moduleId: moduleRow.id,
          slug: lesson.slug,
          number: lesson.number,
          title: lesson.title,
          kicker: lesson.kicker,
          summary: lesson.summary,
          story: lesson.story,
          bigIdea: lesson.bigIdea,
          learnerPromise: lesson.learnerPromise,
          durationMinutes: lesson.durationMinutes,
          sortOrder: lessonIndex + 1,
          discussionPrompt: lesson.discussionPrompt,
          isPublished: true,
        }).onDuplicateKeyUpdate({
          set: {
            pathId: pathRow.id,
            moduleId: moduleRow.id,
            number: lesson.number,
            title: lesson.title,
            kicker: lesson.kicker,
            summary: lesson.summary,
            story: lesson.story,
            bigIdea: lesson.bigIdea,
            learnerPromise: lesson.learnerPromise,
            durationMinutes: lesson.durationMinutes,
            sortOrder: lessonIndex + 1,
            discussionPrompt: lesson.discussionPrompt,
            isPublished: true,
          },
        });
        const [lessonRow] = await db.select().from(lessons).where(eq(lessons.slug, lesson.slug)).limit(1);
        if (!lessonRow) continue;

        for (let checkpointIndex = 0; checkpointIndex < lesson.checkpoints.length; checkpointIndex += 1) {
          const checkpoint = lesson.checkpoints[checkpointIndex]!;
          await db.insert(lessonCheckpoints).values({
            lessonId: lessonRow.id,
            kind: checkpoint.kind,
            title: checkpoint.title,
            prompt: checkpoint.prompt,
            helperText: checkpoint.helperText,
            options: checkpoint.options,
            atSeconds: checkpoint.atSeconds,
            sortOrder: checkpointIndex + 1,
            isRequired: true,
          }).onDuplicateKeyUpdate({
            set: {
              kind: checkpoint.kind,
              title: checkpoint.title,
              prompt: checkpoint.prompt,
              helperText: checkpoint.helperText,
              options: checkpoint.options,
              atSeconds: checkpoint.atSeconds,
              isRequired: true,
            },
          });
        }

        for (let exerciseIndex = 0; exerciseIndex < lesson.exercises.length; exerciseIndex += 1) {
          const exercise = lesson.exercises[exerciseIndex]!;
          await db.insert(lessonExercises).values({
            lessonId: lessonRow.id,
            mode: exercise.mode,
            title: exercise.title,
            prompt: exercise.prompt,
            instructions: exercise.instructions,
            evidenceLabel: exercise.evidenceLabel,
            sortOrder: exerciseIndex + 1,
          }).onDuplicateKeyUpdate({
            set: {
              title: exercise.title,
              prompt: exercise.prompt,
              instructions: exercise.instructions,
              evidenceLabel: exercise.evidenceLabel,
              sortOrder: exerciseIndex + 1,
            },
          });
        }
      }
    }
  }

  for (const resource of trainerResourceSeeds) {
    await db.insert(trainerResources).values({
      slug: resource.slug,
      type: resource.type,
      title: resource.title,
      summary: resource.summary,
      body: resource.body,
      sourceUrl: "sourceUrl" in resource ? resource.sourceUrl : null,
      sortOrder: resource.sortOrder,
      isPublished: true,
    }).onDuplicateKeyUpdate({
      set: {
        type: resource.type,
        title: resource.title,
        summary: resource.summary,
        body: resource.body,
        sourceUrl: "sourceUrl" in resource ? resource.sourceUrl : null,
        sortOrder: resource.sortOrder,
        isPublished: true,
      },
    });
  }
}

export async function ensureContentSeeded() {
  if (!contentSeedPromise) {
    contentSeedPromise = runContentSeed().catch(error => {
      contentSeedPromise = null;
      throw error;
    });
  }
  await contentSeedPromise;
}

export async function getPublicCatalog() {
  await ensureContentSeeded();
  const db = await getDb();
  if (!db) return [];
  const [paths, modules, lessonRows] = await Promise.all([
    db.select().from(learningPaths).where(eq(learningPaths.isPublished, true)).orderBy(asc(learningPaths.sortOrder)),
    db.select().from(learningModules).where(eq(learningModules.isPublished, true)).orderBy(asc(learningModules.sortOrder)),
    db.select().from(lessons).where(eq(lessons.isPublished, true)).orderBy(asc(lessons.sortOrder)),
  ]);
  return paths.map(path => ({
    ...path,
    modules: modules.filter(module => module.pathId === path.id).map(module => ({
      ...module,
      lessons: lessonRows.filter(lesson => lesson.moduleId === module.id),
    })),
  }));
}

export async function getLessonBySlug(slug: string, userId?: number) {
  await ensureContentSeeded();
  const db = await getDb();
  if (!db) return undefined;
  const [lesson] = await db.select().from(lessons).where(and(eq(lessons.slug, slug), eq(lessons.isPublished, true))).limit(1);
  if (!lesson) return undefined;
  const [[path], [module], checkpointRows, exerciseRows] = await Promise.all([
    db.select().from(learningPaths).where(eq(learningPaths.id, lesson.pathId)).limit(1),
    db.select().from(learningModules).where(eq(learningModules.id, lesson.moduleId)).limit(1),
    db.select().from(lessonCheckpoints).where(eq(lessonCheckpoints.lessonId, lesson.id)).orderBy(asc(lessonCheckpoints.sortOrder)),
    db.select().from(lessonExercises).where(eq(lessonExercises.lessonId, lesson.id)).orderBy(asc(lessonExercises.sortOrder)),
  ]);

  let progress = null;
  let responses: typeof checkpointResponses.$inferSelect[] = [];
  let submissions: typeof exerciseSubmissions.$inferSelect[] = [];
  if (userId) {
    [progress] = await db.select().from(lessonProgress).where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.lessonId, lesson.id))).limit(1);
    if (checkpointRows.length) {
      responses = await db.select().from(checkpointResponses).where(and(
        eq(checkpointResponses.userId, userId),
        inArray(checkpointResponses.checkpointId, checkpointRows.map(item => item.id)),
      ));
    }
    if (exerciseRows.length) {
      submissions = await db.select().from(exerciseSubmissions).where(and(
        eq(exerciseSubmissions.userId, userId),
        inArray(exerciseSubmissions.exerciseId, exerciseRows.map(item => item.id)),
      ));
    }
  }

  return { lesson, path, module, checkpoints: checkpointRows, exercises: exerciseRows, progress, responses, submissions };
}

export async function getMemberDashboard(userId: number) {
  const catalog = await getPublicCatalog();
  const db = await getDb();
  if (!db) return { catalog, progress: [], enrollments: [], artifacts: [] };
  const [progressRows, enrollmentRows, artifactRows] = await Promise.all([
    db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId)).orderBy(desc(lessonProgress.lastViewedAt)),
    db.select().from(pathEnrollments).where(eq(pathEnrollments.userId, userId)),
    db.select().from(learnerArtifacts).where(eq(learnerArtifacts.userId, userId)).orderBy(desc(learnerArtifacts.updatedAt)),
  ]);
  return { catalog, progress: progressRows, enrollments: enrollmentRows, artifacts: artifactRows };
}

export async function updateMemberProfile(userId: number, input: {
  displayName: string;
  publicRole: "learner" | "parent" | "educator" | "creator" | "community_leader";
  learningMode: "explore" | "create" | "build";
  headline?: string;
  bio?: string;
  currentPathSlug?: string;
  safetyAcknowledged?: boolean;
  onboardingComplete?: boolean;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(users).set({
    displayName: input.displayName,
    publicRole: input.publicRole,
    learningMode: input.learningMode,
    headline: input.headline ?? null,
    bio: input.bio ?? null,
    currentPathSlug: input.currentPathSlug ?? null,
    safetyAcknowledged: input.safetyAcknowledged ?? false,
    onboardingComplete: input.onboardingComplete ?? false,
  }).where(eq(users.id, userId));
  const [updated] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return updated;
}

export async function getPublicProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const [profile] = await db.select({
    id: users.id,
    displayName: users.displayName,
    headline: users.headline,
    bio: users.bio,
    publicRole: users.publicRole,
    createdAt: users.createdAt,
  }).from(users).where(eq(users.id, userId)).limit(1);
  if (!profile) return undefined;
  const [[completed], [postCount], [commentCount], recentPosts] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(lessonProgress).where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.status, "completed"))),
    db.select({ count: sql<number>`count(*)` }).from(communityPosts).where(and(eq(communityPosts.authorId, userId), eq(communityPosts.status, "published"))),
    db.select({ count: sql<number>`count(*)` }).from(communityComments).where(and(eq(communityComments.authorId, userId), eq(communityComments.status, "published"))),
    db.select({ id: communityPosts.id, title: communityPosts.title, category: communityPosts.category, createdAt: communityPosts.createdAt })
      .from(communityPosts)
      .where(and(eq(communityPosts.authorId, userId), eq(communityPosts.status, "published")))
      .orderBy(desc(communityPosts.createdAt))
      .limit(3),
  ]);
  return {
    ...profile,
    completedLessons: Number(completed?.count ?? 0),
    postCount: Number(postCount?.count ?? 0),
    commentCount: Number(commentCount?.count ?? 0),
    recentPosts,
  };
}

export async function enrollInPath(userId: number, pathSlug: string, mode: "explore" | "create" | "build") {
  await ensureContentSeeded();
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [path] = await db.select().from(learningPaths).where(eq(learningPaths.slug, pathSlug)).limit(1);
  if (!path) throw new Error("Learning path not found");
  await db.insert(pathEnrollments).values({ userId, pathId: path.id, mode }).onDuplicateKeyUpdate({ set: { mode } });
  await db.update(users).set({ currentPathSlug: pathSlug, learningMode: mode }).where(eq(users.id, userId));
  return path;
}

export async function saveCheckpointResponse(userId: number, checkpointId: number, response: string, mode: "explore" | "create" | "build") {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [checkpoint] = await db.select().from(lessonCheckpoints).where(eq(lessonCheckpoints.id, checkpointId)).limit(1);
  if (!checkpoint) throw new Error("Checkpoint not found");
  await db.insert(checkpointResponses).values({ userId, checkpointId, response }).onDuplicateKeyUpdate({ set: { response } });
  await db.insert(lessonProgress).values({
    userId,
    lessonId: checkpoint.lessonId,
    status: "in_progress",
    mode,
    lastCheckpointOrder: checkpoint.sortOrder,
    startedAt: new Date(),
    lastViewedAt: new Date(),
  }).onDuplicateKeyUpdate({
    set: { status: "in_progress", mode, lastCheckpointOrder: checkpoint.sortOrder, lastViewedAt: new Date() },
  });
  return { success: true } as const;
}

export async function saveExerciseSubmission(userId: number, exerciseId: number, response: string, completed: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(exerciseSubmissions).values({
    userId,
    exerciseId,
    response,
    status: completed ? "completed" : "draft",
  }).onDuplicateKeyUpdate({ set: { response, status: completed ? "completed" : "draft" } });
  return { success: true } as const;
}

export async function completeLesson(userId: number, lessonId: number, mode: "explore" | "create" | "build") {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const now = new Date();
  await db.insert(lessonProgress).values({
    userId,
    lessonId,
    status: "completed",
    mode,
    lastCheckpointOrder: 5,
    startedAt: now,
    lastViewedAt: now,
    completedAt: now,
  }).onDuplicateKeyUpdate({ set: { status: "completed", mode, lastCheckpointOrder: 5, lastViewedAt: now, completedAt: now } });
  const [lesson] = await db.select({ pathId: lessons.pathId }).from(lessons).where(eq(lessons.id, lessonId)).limit(1);
  if (lesson) {
    const [[pathTotal], [pathDone]] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(lessons).where(and(eq(lessons.pathId, lesson.pathId), eq(lessons.isPublished, true))),
      db.select({ count: sql<number>`count(*)` }).from(lessonProgress)
        .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
        .where(and(eq(lessonProgress.userId, userId), eq(lessons.pathId, lesson.pathId), eq(lessonProgress.status, "completed"))),
    ]);
    if (Number(pathTotal?.count ?? 0) > 0 && Number(pathDone?.count ?? 0) >= Number(pathTotal?.count ?? 0)) {
      await db.update(pathEnrollments).set({ completedAt: now }).where(and(eq(pathEnrollments.userId, userId), eq(pathEnrollments.pathId, lesson.pathId)));
    }
  }
  return { success: true } as const;
}

export async function saveArtifact(userId: number, input: {
  lessonId: number;
  title: string;
  body?: string;
  linkUrl?: string;
  visibility: "private" | "community";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(learnerArtifacts).values({ userId, ...input });
  return { id: Number(result[0].insertId) };
}

export async function createMediaAsset(input: typeof mediaAssets.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(mediaAssets).values(input);
  const id = Number(result[0].insertId);
  const [asset] = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1);
  return asset;
}

export async function getMediaAsset(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const [asset] = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1);
  return asset;
}

export async function listMediaAssets() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt));
}

export async function attachMediaToLesson(lessonId: number, mediaAssetId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(lessons).set({ videoAssetId: mediaAssetId }).where(eq(lessons.id, lessonId));
  return { success: true } as const;
}

export async function listTrainerResources() {
  await ensureContentSeeded();
  const db = await getDb();
  if (!db) return [];
  return db.select().from(trainerResources).where(eq(trainerResources.isPublished, true)).orderBy(asc(trainerResources.sortOrder));
}

export async function getTrainerResourceBySlug(slug: string) {
  await ensureContentSeeded();
  const db = await getDb();
  if (!db) return undefined;
  const [resource] = await db.select().from(trainerResources).where(and(eq(trainerResources.slug, slug), eq(trainerResources.isPublished, true))).limit(1);
  return resource;
}

export async function upsertTrainerResource(input: {
  slug: string;
  type: "facilitator_guide" | "framework" | "exercise" | "delivery_note" | "source" | "video_guide";
  title: string;
  summary: string;
  body: string;
  sourceUrl?: string;
  relatedLessonId?: number;
  sortOrder: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(trainerResources).values({ ...input, sourceUrl: input.sourceUrl ?? null, relatedLessonId: input.relatedLessonId ?? null, isPublished: true })
    .onDuplicateKeyUpdate({ set: { ...input, sourceUrl: input.sourceUrl ?? null, relatedLessonId: input.relatedLessonId ?? null, isPublished: true } });
  return getTrainerResourceBySlug(input.slug);
}
