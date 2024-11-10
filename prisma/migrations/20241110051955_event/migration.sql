/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_user_id_fkey`;

-- DropTable
DROP TABLE `Event`;

-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL DEFAULT '0',
    `date` DATETIME(0) NOT NULL DEFAULT (now(3)),
    `filePath` VARCHAR(191) NOT NULL DEFAULT '0',
    `createdAt` DATETIME(0) NOT NULL DEFAULT (now(3)),
    `updatedAt` DATETIME(0) NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `events_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
