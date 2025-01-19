/*
  Warnings:

  - You are about to drop the column `attribute` on the `spectrumdata` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `spectrumdata` table. All the data in the column will be lost.
  - Added the required column `dataset` to the `SpectrumData` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE `TargetData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attribute` VARCHAR(191) NOT NULL,
    `y` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
