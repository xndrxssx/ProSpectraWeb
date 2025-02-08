/*
  Warnings:

  - You are about to drop the column `variety_id` on the `predictivemodel` table. All the data in the column will be lost.
  - Added the required column `variety` to the `PredictiveModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `predictivemodel` DROP COLUMN `variety_id`,
    ADD COLUMN `variety` VARCHAR(191) NOT NULL;
