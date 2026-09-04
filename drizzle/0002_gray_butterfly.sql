CREATE TABLE `exerciseSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`exerciseId` int NOT NULL,
	`response` text NOT NULL,
	`status` enum('draft','completed') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `exerciseSubmissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `exerciseSubmissions_user_exercise_unique` UNIQUE(`userId`,`exerciseId`)
);
--> statement-breakpoint
CREATE TABLE `learningModules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pathId` int NOT NULL,
	`slug` varchar(100) NOT NULL,
	`title` varchar(160) NOT NULL,
	`summary` text NOT NULL,
	`sortOrder` int NOT NULL,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learningModules_id` PRIMARY KEY(`id`),
	CONSTRAINT `learningModules_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `lessonExercises` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lessonId` int NOT NULL,
	`mode` enum('explore','create','build') NOT NULL,
	`title` varchar(180) NOT NULL,
	`prompt` text NOT NULL,
	`instructions` text NOT NULL,
	`evidenceLabel` varchar(180) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	CONSTRAINT `lessonExercises_id` PRIMARY KEY(`id`),
	CONSTRAINT `lessonExercises_lesson_mode_unique` UNIQUE(`lessonId`,`mode`)
);
--> statement-breakpoint
ALTER TABLE `lessons` ADD `moduleId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `lessonCheckpoints` ADD CONSTRAINT `lessonCheckpoints_lesson_order_unique` UNIQUE(`lessonId`,`sortOrder`);--> statement-breakpoint
ALTER TABLE `exerciseSubmissions` ADD CONSTRAINT `exerciseSubmissions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `exerciseSubmissions` ADD CONSTRAINT `exerciseSubmissions_exerciseId_lessonExercises_id_fk` FOREIGN KEY (`exerciseId`) REFERENCES `lessonExercises`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learningModules` ADD CONSTRAINT `learningModules_pathId_learningPaths_id_fk` FOREIGN KEY (`pathId`) REFERENCES `learningPaths`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessonExercises` ADD CONSTRAINT `lessonExercises_lessonId_lessons_id_fk` FOREIGN KEY (`lessonId`) REFERENCES `lessons`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `learningModules_path_order_idx` ON `learningModules` (`pathId`,`sortOrder`);--> statement-breakpoint
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_moduleId_learningModules_id_fk` FOREIGN KEY (`moduleId`) REFERENCES `learningModules`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `lessons_module_order_idx` ON `lessons` (`moduleId`,`sortOrder`);