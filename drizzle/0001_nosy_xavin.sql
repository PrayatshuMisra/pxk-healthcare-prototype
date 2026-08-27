CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`appointmentRef` varchar(32) NOT NULL,
	`userId` int NOT NULL,
	`doctorId` varchar(64) NOT NULL,
	`scheduledAt` timestamp NOT NULL,
	`status` enum('confirmed','cancelled','completed') NOT NULL DEFAULT 'confirmed',
	`screeningRecordId` varchar(36),
	`patientNote` text,
	`consentVersion` varchar(24) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`),
	CONSTRAINT `appointments_appointmentRef_unique` UNIQUE(`appointmentRef`)
);
--> statement-breakpoint
CREATE TABLE `patientProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`displayName` varchar(100) NOT NULL,
	`ageYears` int NOT NULL,
	`gender` varchar(32) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `patientProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `patientProfiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE INDEX `appointments_user_status_idx` ON `appointments` (`userId`,`status`);--> statement-breakpoint
CREATE INDEX `appointments_doctor_slot_idx` ON `appointments` (`doctorId`,`scheduledAt`);--> statement-breakpoint
CREATE INDEX `patientProfiles_user_idx` ON `patientProfiles` (`userId`);