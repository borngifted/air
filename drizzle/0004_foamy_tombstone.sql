CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(160) NOT NULL,
	`idea` text NOT NULL,
	`audience` text NOT NULL,
	`success` text NOT NULL,
	`status` enum('idea','building','completed') NOT NULL DEFAULT 'idea',
	`notes` json NOT NULL,
	`resultText` mediumtext NOT NULL,
	`resultUrl` text NOT NULL,
	`reflections` json NOT NULL,
	`version` int NOT NULL DEFAULT 1,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `projects_user_updated_idx` ON `projects` (`userId`,`updatedAt`);