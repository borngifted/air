CREATE TABLE `communityChannels` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(80) NOT NULL,
	`name` varchar(120) NOT NULL,
	`description` text NOT NULL,
	`icon` varchar(40) NOT NULL DEFAULT 'spark',
	`access` enum('members','trainers') NOT NULL DEFAULT 'members',
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `communityChannels_id` PRIMARY KEY(`id`),
	CONSTRAINT `communityChannels_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `communityReactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`targetType` enum('post','comment') NOT NULL,
	`targetId` int NOT NULL,
	`kind` enum('support','insight','celebrate','curious') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `communityReactions_id` PRIMARY KEY(`id`),
	CONSTRAINT `communityReactions_member_target_kind_unique` UNIQUE(`userId`,`targetType`,`targetId`,`kind`)
);
--> statement-breakpoint
ALTER TABLE `communityComments` ADD `parentId` int;--> statement-breakpoint
ALTER TABLE `communityPosts` ADD `channelId` int;--> statement-breakpoint
ALTER TABLE `communityReactions` ADD CONSTRAINT `communityReactions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `communityChannels_order_idx` ON `communityChannels` (`sortOrder`);--> statement-breakpoint
CREATE INDEX `communityReactions_target_idx` ON `communityReactions` (`targetType`,`targetId`);--> statement-breakpoint
ALTER TABLE `communityPosts` ADD CONSTRAINT `communityPosts_channelId_communityChannels_id_fk` FOREIGN KEY (`channelId`) REFERENCES `communityChannels`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `communityComments_parent_idx` ON `communityComments` (`parentId`);--> statement-breakpoint
CREATE INDEX `communityPosts_channel_created_idx` ON `communityPosts` (`channelId`,`createdAt`);