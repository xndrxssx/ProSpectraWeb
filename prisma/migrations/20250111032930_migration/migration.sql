/*
  Warnings:

  - Made the column `description` on table `variety` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `variety` MODIFY `description` VARCHAR(191) NOT NULL;
