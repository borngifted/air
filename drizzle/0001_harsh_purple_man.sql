CREATE TABLE `checkpointResponses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`checkpointId` int NOT NULL,
	`response` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `checkpointResponses_id` PRIMARY KEY(`id`),
	CONSTRAINT `checkpointResponses_user_checkpoint_unique` UNIQUE(`userId`,`checkpointId`)
);
--> statement-breakpoint
CREATE TABLE `communityComments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`authorId` int NOT NULL,
	`body` text NOT NULL,
	`status` enum('published','hidden') NOT NULL DEFAULT 'published',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `communityComments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `communityPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`authorId` int NOT NULL,
	`lessonId` int,
	`pathId` int,
	`category` enum('practice','question','reflection','win') NOT NULL,
	`title` varchar(180) NOT NULL,
	`body` text NOT NULL,
	`status` enum('published','hidden') NOT NULL DEFAULT 'published',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `communityPosts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contentReports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reporterId` int NOT NULL,
	`targetType` enum('post','comment') NOT NULL,
	`targetId` int NOT NULL,
	`reason` varchar(240) NOT NULL,
	`status` enum('open','resolved','dismissed') NOT NULL DEFAULT 'open',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`resolvedAt` timestamp,
	CONSTRAINT `contentReports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `learnerArtifacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`body` text,
	`linkUrl` text,
	`visibility` enum('private','community') NOT NULL DEFAULT 'private',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learnerArtifacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `learningPaths` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(80) NOT NULL,
	`number` varchar(8) NOT NULL,
	`title` varchar(120) NOT NULL,
	`kicker` varchar(120) NOT NULL,
	`summary` text NOT NULL,
	`description` text NOT NULL,
	`promise` varchar(220) NOT NULL,
	`accent` varchar(16) NOT NULL DEFAULT '#18C98B',
	`sortOrder` int NOT NULL,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learningPaths_id` PRIMARY KEY(`id`),
	CONSTRAINT `learningPaths_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `lessonCheckpoints` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lessonId` int NOT NULL,
	`kind` enum('prediction','choice','reflection','exercise','commitment') NOT NULL,
	`title` varchar(180) NOT NULL,
	`prompt` text NOT NULL,
	`helperText` text,
	`options` json,
	`atSeconds` int,
	`sortOrder` int NOT NULL,
	`isRequired` boolean NOT NULL DEFAULT true,
	CONSTRAINT `lessonCheckpoints_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessonProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` int NOT NULL,
	`status` enum('not_started','in_progress','completed') NOT NULL DEFAULT 'not_started',
	`mode` enum('explore','create','build') NOT NULL DEFAULT 'explore',
	`lastCheckpointOrder` int NOT NULL DEFAULT 0,
	`startedAt` timestamp,
	`lastViewedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `lessonProgress_id` PRIMARY KEY(`id`),
	CONSTRAINT `lessonProgress_user_lesson_unique` UNIQUE(`userId`,`lessonId`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pathId` int NOT NULL,
	`slug` varchar(100) NOT NULL,
	`number` varchar(8) NOT NULL,
	`title` varchar(160) NOT NULL,
	`kicker` varchar(160) NOT NULL,
	`summary` text NOT NULL,
	`story` text NOT NULL,
	`bigIdea` text NOT NULL,
	`learnerPromise` varchar(240) NOT NULL,
	`videoAssetId` int,
	`videoPosterUrl` text,
	`durationMinutes` int NOT NULL DEFAULT 12,
	`sortOrder` int NOT NULL,
	`discussionPrompt` text NOT NULL,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`),
	CONSTRAINT `lessons_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `mediaAssets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`kind` enum('video','image','document') NOT NULL,
	`title` varchar(180) NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`storageKey` varchar(512) NOT NULL,
	`mimeType` varchar(120) NOT NULL,
	`byteSize` int NOT NULL,
	`durationSeconds` int,
	`visibility` enum('members','trainers','public') NOT NULL DEFAULT 'members',
	`uploadedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mediaAssets_id` PRIMARY KEY(`id`),
	CONSTRAINT `mediaAssets_storageKey_unique` UNIQUE(`storageKey`)
);
--> statement-breakpoint
CREATE TABLE `pathEnrollments` (
	`userId` int NOT NULL,
	`pathId` int NOT NULL,
	`mode` enum('explore','create','build') NOT NULL DEFAULT 'explore',
	`enrolledAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `pathEnrollments_userId_pathId_pk` PRIMARY KEY(`userId`,`pathId`)
);
--> statement-breakpoint
CREATE TABLE `trainerResources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(120) NOT NULL,
	`type` enum('facilitator_guide','framework','exercise','delivery_note','source','video_guide') NOT NULL,
	`title` varchar(200) NOT NULL,
	`summary` text NOT NULL,
	`body` text NOT NULL,
	`sourceUrl` text,
	`relatedLessonId` int,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trainerResources_id` PRIMARY KEY(`id`),
	CONSTRAINT `trainerResources_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `displayName` varchar(80);--> statement-breakpoint
ALTER TABLE `users` ADD `headline` varchar(120);--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `publicRole` enum('learner','parent','educator','creator','community_leader') DEFAULT 'learner' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `learningMode` enum('explore','create','build') DEFAULT 'explore' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `currentPathSlug` varchar(80);--> statement-breakpoint
ALTER TABLE `users` ADD `onboardingComplete` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `safetyAcknowledged` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `checkpointResponses` ADD CONSTRAINT `checkpointResponses_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `checkpointResponses` ADD CONSTRAINT `checkpointResponses_checkpointId_lessonCheckpoints_id_fk` FOREIGN KEY (`checkpointId`) REFERENCES `lessonCheckpoints`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `communityComments` ADD CONSTRAINT `communityComments_postId_communityPosts_id_fk` FOREIGN KEY (`postId`) REFERENCES `communityPosts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `communityComments` ADD CONSTRAINT `communityComments_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `communityPosts` ADD CONSTRAINT `communityPosts_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `communityPosts` ADD CONSTRAINT `communityPosts_lessonId_lessons_id_fk` FOREIGN KEY (`lessonId`) REFERENCES `lessons`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `communityPosts` ADD CONSTRAINT `communityPosts_pathId_learningPaths_id_fk` FOREIGN KEY (`pathId`) REFERENCES `learningPaths`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contentReports` ADD CONSTRAINT `contentReports_reporterId_users_id_fk` FOREIGN KEY (`reporterId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learnerArtifacts` ADD CONSTRAINT `learnerArtifacts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learnerArtifacts` ADD CONSTRAINT `learnerArtifacts_lessonId_lessons_id_fk` FOREIGN KEY (`lessonId`) REFERENCES `lessons`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessonCheckpoints` ADD CONSTRAINT `lessonCheckpoints_lessonId_lessons_id_fk` FOREIGN KEY (`lessonId`) REFERENCES `lessons`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessonProgress` ADD CONSTRAINT `lessonProgress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessonProgress` ADD CONSTRAINT `lessonProgress_lessonId_lessons_id_fk` FOREIGN KEY (`lessonId`) REFERENCES `lessons`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_pathId_learningPaths_id_fk` FOREIGN KEY (`pathId`) REFERENCES `learningPaths`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_videoAssetId_mediaAssets_id_fk` FOREIGN KEY (`videoAssetId`) REFERENCES `mediaAssets`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mediaAssets` ADD CONSTRAINT `mediaAssets_uploadedBy_users_id_fk` FOREIGN KEY (`uploadedBy`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pathEnrollments` ADD CONSTRAINT `pathEnrollments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pathEnrollments` ADD CONSTRAINT `pathEnrollments_pathId_learningPaths_id_fk` FOREIGN KEY (`pathId`) REFERENCES `learningPaths`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `trainerResources` ADD CONSTRAINT `trainerResources_relatedLessonId_lessons_id_fk` FOREIGN KEY (`relatedLessonId`) REFERENCES `lessons`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `communityComments_post_created_idx` ON `communityComments` (`postId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `communityPosts_createdAt_idx` ON `communityPosts` (`createdAt`);--> statement-breakpoint
CREATE INDEX `communityPosts_lesson_idx` ON `communityPosts` (`lessonId`);--> statement-breakpoint
CREATE INDEX `contentReports_status_idx` ON `contentReports` (`status`,`createdAt`);--> statement-breakpoint
CREATE INDEX `learningPaths_sortOrder_idx` ON `learningPaths` (`sortOrder`);--> statement-breakpoint
CREATE INDEX `lessonCheckpoints_lesson_order_idx` ON `lessonCheckpoints` (`lessonId`,`sortOrder`);--> statement-breakpoint
CREATE INDEX `lessonProgress_user_status_idx` ON `lessonProgress` (`userId`,`status`);--> statement-breakpoint
CREATE INDEX `lessons_path_order_idx` ON `lessons` (`pathId`,`sortOrder`);--> statement-breakpoint
CREATE INDEX `trainerResources_type_order_idx` ON `trainerResources` (`type`,`sortOrder`);