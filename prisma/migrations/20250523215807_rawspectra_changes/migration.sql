/*
  Warnings:

  - You are about to alter the column `content` on the `spectra` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- DropIndex
DROP INDEX `RawSpectrum_varietyId_fkey` ON `rawspectrum`;

-- AlterTable
ALTER TABLE `spectra` MODIFY `content` JSON NOT NULL;
