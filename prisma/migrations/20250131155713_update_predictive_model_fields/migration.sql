/*
  Warnings:

  - Added the required column `model_name` to the `PredictiveModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `predictivemodel` ADD COLUMN `model_name` VARCHAR(191) NOT NULL;
