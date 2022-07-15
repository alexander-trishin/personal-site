-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `email_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `password_hash` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `avatar_url` VARCHAR(191) NULL,
    `normalized_email` VARCHAR(191) NOT NULL,
    `normalized_username` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_normalized_email_key`(`normalized_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserClaim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `claim_type` VARCHAR(191) NOT NULL,
    `claim_value` VARCHAR(191) NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLogin` (
    `provider` VARCHAR(191) NOT NULL,
    `provider_key` VARCHAR(191) NOT NULL,
    `provider_display_name` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `UserLogin_provider_provider_key_key`(`provider`, `provider_key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserToken` (
    `provider` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `UserToken_user_id_provider_name_key`(`user_id`, `provider`, `name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `UserRole_user_id_role_id_key`(`user_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `normalized_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_normalized_name_key`(`normalized_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoleClaim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `claim_type` VARCHAR(191) NOT NULL,
    `claim_value` VARCHAR(191) NULL,
    `role_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
