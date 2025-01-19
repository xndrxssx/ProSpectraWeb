-- CreateTable
CREATE TABLE `PredictiveModel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attribute` VARCHAR(191) NOT NULL,
    `X_features` VARCHAR(191) NOT NULL,
    `hyperparameters` JSON NOT NULL,
    `metrics` JSON NOT NULL,
    `graph` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
