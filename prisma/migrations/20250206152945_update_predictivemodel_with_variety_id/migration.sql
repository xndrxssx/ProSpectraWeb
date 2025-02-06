/*
  Warnings:

  - You are about to alter the column `image` on the `spectrumdata` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `variety_id` to the `PredictiveModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `predictivemodel` ADD COLUMN `variety_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `spectrumdata` MODIFY `image` JSON NOT NULL;
