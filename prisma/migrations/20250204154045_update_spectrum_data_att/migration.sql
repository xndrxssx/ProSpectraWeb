/*
  Warnings:

  - Added the required column `image` to the `SpectrumData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `spectrumdata` ADD COLUMN `image` JSON NOT NULL;
