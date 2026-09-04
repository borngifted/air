import {
  boolean,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  displayName: varchar("displayName", { length: 80 }),
  headline: varchar("headline", { length: 120 }),
  bio: text("bio"),
  publicRole: mysqlEnum("publicRole", ["learner", "parent", "educator", "creator", "community_leader"])
    .default("learner")
    .notNull(),
  learningMode: mysqlEnum("learningMode", ["explore", "create", "build"])
    .default("explore")
    .notNull(),
  currentPathSlug: varchar("currentPathSlug", { length: 80 }),
  onboardingComplete: boolean("onboardingComplete").default(false).notNull(),
  safetyAcknowledged: boolean("safetyAcknowledged").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const learningPaths = mysqlTable("learningPaths", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  number: varchar("number", { length: 8 }).notNull(),
  title: varchar("title", { length: 120 }).notNull(),
  kicker: varchar("kicker", { length: 120 }).notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  promise: varchar("promise", { length: 220 }).notNull(),
  accent: varchar("accent", { length: 16 }).default("#18C98B").notNull(),
  sortOrder: int("sortOrder").notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  sortOrderIdx: index("learningPaths_sortOrder_idx").on(table.sortOrder),
}));

export const mediaAssets = mysqlTable("mediaAssets", {
  id: int("id").autoincrement().primaryKey(),
  kind: mysqlEnum("kind", ["video", "image", "document"]).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  storageKey: varchar("storageKey", { length: 512 }).notNull().unique(),
  mimeType: varchar("mimeType", { length: 120 }).notNull(),
  byteSize: int("byteSize").notNull(),
  durationSeconds: int("durationSeconds"),
  visibility: mysqlEnum("visibility", ["members", "trainers", "public"])
    .default("members")
    .notNull(),
  uploadedBy: int("uploadedBy").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const learningModules = mysqlTable("learningModules", {
  id: int("id").autoincrement().primaryKey(),
  pathId: int("pathId").notNull().references(() => learningPaths.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 160 }).notNull(),
  summary: text("summary").notNull(),
  sortOrder: int("sortOrder").notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  pathOrderIdx: index("learningModules_path_order_idx").on(table.pathId, table.sortOrder),
}));

export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  pathId: int("pathId").notNull().references(() => learningPaths.id, { onDelete: "cascade" }),
  moduleId: int("moduleId").notNull().references(() => learningModules.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  number: varchar("number", { length: 8 }).notNull(),
  title: varchar("title", { length: 160 }).notNull(),
  kicker: varchar("kicker", { length: 160 }).notNull(),
  summary: text("summary").notNull(),
  story: text("story").notNull(),
  bigIdea: text("bigIdea").notNull(),
  learnerPromise: varchar("learnerPromise", { length: 240 }).notNull(),
  videoAssetId: int("videoAssetId").references(() => mediaAssets.id, { onDelete: "set null" }),
  videoPosterUrl: text("videoPosterUrl"),
  durationMinutes: int("durationMinutes").default(12).notNull(),
  sortOrder: int("sortOrder").notNull(),
  discussionPrompt: text("discussionPrompt").notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  pathOrderIdx: index("lessons_path_order_idx").on(table.pathId, table.sortOrder),
  moduleOrderIdx: index("lessons_module_order_idx").on(table.moduleId, table.sortOrder),
}));

export type CheckpointOption = { label: string; value: string; feedback?: string };

export const lessonCheckpoints = mysqlTable("lessonCheckpoints", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  kind: mysqlEnum("kind", ["prediction", "choice", "reflection", "exercise", "commitment"]).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  prompt: text("prompt").notNull(),
  helperText: text("helperText"),
  options: json("options").$type<CheckpointOption[]>(),
  atSeconds: int("atSeconds"),
  sortOrder: int("sortOrder").notNull(),
  isRequired: boolean("isRequired").default(true).notNull(),
}, table => ({
  lessonOrderIdx: index("lessonCheckpoints_lesson_order_idx").on(table.lessonId, table.sortOrder),
  lessonOrderUnique: uniqueIndex("lessonCheckpoints_lesson_order_unique").on(table.lessonId, table.sortOrder),
}));

export const pathEnrollments = mysqlTable("pathEnrollments", {
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  pathId: int("pathId").notNull().references(() => learningPaths.id, { onDelete: "cascade" }),
  mode: mysqlEnum("mode", ["explore", "create", "build"]).default("explore").notNull(),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
}, table => ({
  pk: primaryKey({ columns: [table.userId, table.pathId] }),
}));

export const lessonProgress = mysqlTable("lessonProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  lessonId: int("lessonId").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  status: mysqlEnum("status", ["not_started", "in_progress", "completed"])
    .default("not_started")
    .notNull(),
  mode: mysqlEnum("mode", ["explore", "create", "build"]).default("explore").notNull(),
  lastCheckpointOrder: int("lastCheckpointOrder").default(0).notNull(),
  startedAt: timestamp("startedAt"),
  lastViewedAt: timestamp("lastViewedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
}, table => ({
  userLessonUnique: uniqueIndex("lessonProgress_user_lesson_unique").on(table.userId, table.lessonId),
  userStatusIdx: index("lessonProgress_user_status_idx").on(table.userId, table.status),
}));

export const checkpointResponses = mysqlTable("checkpointResponses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  checkpointId: int("checkpointId").notNull().references(() => lessonCheckpoints.id, { onDelete: "cascade" }),
  response: text("response").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  userCheckpointUnique: uniqueIndex("checkpointResponses_user_checkpoint_unique").on(table.userId, table.checkpointId),
}));

export const lessonExercises = mysqlTable("lessonExercises", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  mode: mysqlEnum("mode", ["explore", "create", "build"]).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  prompt: text("prompt").notNull(),
  instructions: text("instructions").notNull(),
  evidenceLabel: varchar("evidenceLabel", { length: 180 }).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
}, table => ({
  lessonModeUnique: uniqueIndex("lessonExercises_lesson_mode_unique").on(table.lessonId, table.mode),
}));

export const exerciseSubmissions = mysqlTable("exerciseSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  exerciseId: int("exerciseId").notNull().references(() => lessonExercises.id, { onDelete: "cascade" }),
  response: text("response").notNull(),
  status: mysqlEnum("status", ["draft", "completed"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  userExerciseUnique: uniqueIndex("exerciseSubmissions_user_exercise_unique").on(table.userId, table.exerciseId),
}));

export const learnerArtifacts = mysqlTable("learnerArtifacts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  lessonId: int("lessonId").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 180 }).notNull(),
  body: text("body"),
  linkUrl: text("linkUrl"),
  visibility: mysqlEnum("visibility", ["private", "community"]).default("private").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const communityChannels = mysqlTable("communityChannels", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 40 }).default("spark").notNull(),
  access: mysqlEnum("access", ["members", "trainers"]).default("members").notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => ({
  orderIdx: index("communityChannels_order_idx").on(table.sortOrder),
}));

export const communityPosts = mysqlTable("communityPosts", {
  id: int("id").autoincrement().primaryKey(),
  authorId: int("authorId").notNull().references(() => users.id, { onDelete: "cascade" }),
  channelId: int("channelId").references(() => communityChannels.id, { onDelete: "set null" }),
  lessonId: int("lessonId").references(() => lessons.id, { onDelete: "set null" }),
  pathId: int("pathId").references(() => learningPaths.id, { onDelete: "set null" }),
  category: mysqlEnum("category", ["practice", "question", "reflection", "win"]).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  body: text("body").notNull(),
  status: mysqlEnum("status", ["published", "hidden"]).default("published").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  createdAtIdx: index("communityPosts_createdAt_idx").on(table.createdAt),
  lessonIdx: index("communityPosts_lesson_idx").on(table.lessonId),
  channelCreatedIdx: index("communityPosts_channel_created_idx").on(table.channelId, table.createdAt),
}));

export const communityComments = mysqlTable("communityComments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull().references(() => communityPosts.id, { onDelete: "cascade" }),
  authorId: int("authorId").notNull().references(() => users.id, { onDelete: "cascade" }),
  parentId: int("parentId"),
  body: text("body").notNull(),
  status: mysqlEnum("status", ["published", "hidden"]).default("published").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  postCreatedIdx: index("communityComments_post_created_idx").on(table.postId, table.createdAt),
  parentIdx: index("communityComments_parent_idx").on(table.parentId),
}));

export const communityReactions = mysqlTable("communityReactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetType: mysqlEnum("targetType", ["post", "comment"]).notNull(),
  targetId: int("targetId").notNull(),
  kind: mysqlEnum("kind", ["support", "insight", "celebrate", "curious"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => ({
  targetIdx: index("communityReactions_target_idx").on(table.targetType, table.targetId),
  memberReactionUnique: uniqueIndex("communityReactions_member_target_kind_unique").on(table.userId, table.targetType, table.targetId, table.kind),
}));

export const contentReports = mysqlTable("contentReports", {
  id: int("id").autoincrement().primaryKey(),
  reporterId: int("reporterId").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetType: mysqlEnum("targetType", ["post", "comment"]).notNull(),
  targetId: int("targetId").notNull(),
  reason: varchar("reason", { length: 240 }).notNull(),
  status: mysqlEnum("status", ["open", "resolved", "dismissed"]).default("open").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
}, table => ({
  statusIdx: index("contentReports_status_idx").on(table.status, table.createdAt),
}));

export const trainerResources = mysqlTable("trainerResources", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  type: mysqlEnum("type", ["facilitator_guide", "framework", "exercise", "delivery_note", "source", "video_guide"]).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  summary: text("summary").notNull(),
  body: text("body").notNull(),
  sourceUrl: text("sourceUrl"),
  relatedLessonId: int("relatedLessonId").references(() => lessons.id, { onDelete: "set null" }),
  sortOrder: int("sortOrder").default(0).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => ({
  typeOrderIdx: index("trainerResources_type_order_idx").on(table.type, table.sortOrder),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type LearningPath = typeof learningPaths.$inferSelect;
export type LearningModule = typeof learningModules.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type LessonCheckpoint = typeof lessonCheckpoints.$inferSelect;
export type LessonExercise = typeof lessonExercises.$inferSelect;
export type CommunityPost = typeof communityPosts.$inferSelect;
export type CommunityComment = typeof communityComments.$inferSelect;
export type CommunityChannel = typeof communityChannels.$inferSelect;
export type TrainerResource = typeof trainerResources.$inferSelect;
