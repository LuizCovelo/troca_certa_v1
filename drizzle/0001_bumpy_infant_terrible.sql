CREATE TABLE `maintenanceHistory` (
	`id` varchar(64) NOT NULL,
	`vehicleId` varchar(64) NOT NULL,
	`maintenanceTypeId` varchar(64) NOT NULL,
	`kmAtMaintenance` int NOT NULL,
	`datePerformed` timestamp NOT NULL,
	`cost` decimal(10,2),
	`notes` text,
	`mechanic` varchar(100),
	`reminderSent` boolean DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `maintenanceHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenanceReminders` (
	`id` varchar(64) NOT NULL,
	`vehicleId` varchar(64) NOT NULL,
	`maintenanceTypeId` varchar(64) NOT NULL,
	`nextDueKm` int,
	`nextDueDate` timestamp,
	`status` enum('pending','sent','completed','snoozed') DEFAULT 'pending',
	`reminderSentAt` timestamp,
	`lastUpdated` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `maintenanceReminders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenanceTypes` (
	`id` varchar(64) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`recommendedIntervalKm` int,
	`recommendedIntervalDays` int,
	`category` enum('oil','filter','tire','brake','fluid','inspection','other') NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `maintenanceTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mechanicClients` (
	`id` varchar(64) NOT NULL,
	`mechanicId` varchar(64) NOT NULL,
	`clientName` varchar(100) NOT NULL,
	`clientEmail` varchar(320),
	`clientPhone` varchar(20),
	`vehicles` json,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `mechanicClients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notificationsLog` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`vehicleId` varchar(64),
	`maintenanceTypeId` varchar(64),
	`type` enum('email','whatsapp','sms') NOT NULL,
	`status` enum('sent','failed','pending') DEFAULT 'pending',
	`message` text,
	`sentAt` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `notificationsLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`vehicleId` varchar(64),
	`reportType` enum('monthly','annual','custom') NOT NULL,
	`fileUrl` text,
	`generatedAt` timestamp DEFAULT (now()),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptionPlans` (
	`id` varchar(64) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`price` decimal(10,2) NOT NULL,
	`currency` varchar(3) DEFAULT 'BRL',
	`maxVehicles` int NOT NULL,
	`stripePriceId` varchar(255),
	`features` json,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `subscriptionPlans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`brand` varchar(100) NOT NULL,
	`model` varchar(100) NOT NULL,
	`year` int NOT NULL,
	`licensePlate` varchar(20),
	`currentKm` int NOT NULL,
	`color` varchar(50),
	`fuelType` enum('gasoline','diesel','ethanol','hybrid','electric') NOT NULL,
	`imageUrl` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vehicles_id` PRIMARY KEY(`id`),
	CONSTRAINT `vehicles_licensePlate_unique` UNIQUE(`licensePlate`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','mechanic','company') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `plan` enum('free','basic','premium','company','mechanic_basic','mechanic_pro') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `stripeSubscriptionId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionStatus` enum('active','canceled','past_due','unpaid','none') DEFAULT 'none';--> statement-breakpoint
ALTER TABLE `users` ADD `notificationPreference` enum('email','whatsapp','both') DEFAULT 'both';--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);