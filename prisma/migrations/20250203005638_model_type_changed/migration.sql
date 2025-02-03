/*
  Warnings:

  - You are about to drop the column `model_binary` on the `predictivemodel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `predictivemodel` DROP COLUMN `model_binary`,
    ADD COLUMN `model` VARCHAR(191) NULL;
