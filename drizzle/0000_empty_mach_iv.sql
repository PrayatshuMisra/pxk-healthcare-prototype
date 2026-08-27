CREATE TABLE `screeningRecords` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `publicId` varchar(36) NOT NULL,
  `status` enum('draft','completed','discarded') NOT NULL DEFAULT 'draft',
  `scenarioId` enum('respiratory','digestive','dental','general') NOT NULL,
  `language` enum('en','kn','tulu','kok') NOT NULL DEFAULT 'en',
  `concernText` text,
  `answersJson` text NOT NULL,
  `currentStep` int NOT NULL DEFAULT 0,
  `consentVersion` varchar(24) NOT NULL,
  `consentedAt` timestamp NOT NULL,
  `nlpSummary` text,
  `nlpMatchedTermsJson` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `screeningRecords_id` PRIMARY KEY(`id`),
  CONSTRAINT `screeningRecords_publicId_unique` UNIQUE(`publicId`)
);
--> statement-breakpoint
CREATE INDEX `screeningRecords_user_status_idx` ON `screeningRecords` (`userId`,`status`);
--> statement-breakpoint
CREATE INDEX `screeningRecords_user_updated_idx` ON `screeningRecords` (`userId`,`updatedAt`);
