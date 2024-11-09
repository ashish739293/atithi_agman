-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NULL,
    `email` VARCHAR(191) NULL DEFAULT '0',
    `username` VARCHAR(191) NULL DEFAULT '0',
    `password` VARCHAR(191) NULL DEFAULT '0',
    `mobile` VARCHAR(191) NULL DEFAULT '0',
    `type` VARCHAR(191) NULL DEFAULT '0',
    `pincode` INTEGER NULL DEFAULT 0,
    `address_1` VARCHAR(191) NULL DEFAULT 'NA',
    `address_2` VARCHAR(191) NULL DEFAULT 'NA',
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
