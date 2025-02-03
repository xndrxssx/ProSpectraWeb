/*
  Warnings:

  - You are about to drop the column `model` on the `predictivemodel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `predictivemodel` DROP COLUMN `model`,
    ADD COLUMN `model_binary` VARCHAR(191) NULL;
