/*
  Warnings:

  - You are about to drop the column `timestamp` on the `rawspectrum` table. All the data in the column will be lost.
  - You are about to alter the column `wavelengths` on the `rawspectrum` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `variety` on the `spectra` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `conversion` to the `RawSpectrum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `RawSpectrum` table without a default value. This is not possible if the table is not empty.
  - Made the column `filter` on table `spectra` required. This step will fail if there are existing NULL values in that column.
  - Made the column `graph` on table `spectra` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `rawspectrum` DROP FOREIGN KEY `RawSpectrum_varietyId_fkey`;

-- AlterTable
ALTER TABLE `rawspectrum` DROP COLUMN `timestamp`,
    ADD COLUMN `conversion` VARCHAR(191) NOT NULL,
    ADD COLUMN `data` DATETIME(3) NOT NULL,
    MODIFY `wavelengths` JSON NOT NULL;

-- AlterTable
ALTER TABLE `spectra` MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `variety` INTEGER NOT NULL,
    MODIFY `filter` VARCHAR(191) NOT NULL,
    MODIFY `graph` VARCHAR(191) NOT NULL;
