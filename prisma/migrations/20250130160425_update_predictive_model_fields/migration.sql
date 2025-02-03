/*
  Warnings:

  - Added the required column `model_binary` to the `PredictiveModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `predictivemodel` ADD COLUMN `model_binary` LONGBLOB NOT NULL;
