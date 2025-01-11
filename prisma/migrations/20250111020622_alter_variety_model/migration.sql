/*
  Warnings:

  - You are about to drop the column `attributes` on the `variety` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `variety` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `variety` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Variety_name_key` ON `variety`;

-- AlterTable
ALTER TABLE `variety` DROP COLUMN `attributes`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- CreateTable
CREATE TABLE `Attribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `varietyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Attribute` ADD CONSTRAINT `Attribute_varietyId_fkey` FOREIGN KEY (`varietyId`) REFERENCES `Variety`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
