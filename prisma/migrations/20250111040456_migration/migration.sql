/*
  Warnings:

  - You are about to drop the `attribute` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `attribute` DROP FOREIGN KEY `Attribute_varietyId_fkey`;

-- AlterTable
ALTER TABLE `variety` ADD COLUMN `attributes` JSON NOT NULL;

-- DropTable
DROP TABLE `attribute`;
