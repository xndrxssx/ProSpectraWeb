/*
  Warnings:

  - You are about to drop the column `conteudo` on the `spectra` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `spectra` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `spectra` table. All the data in the column will be lost.
  - You are about to drop the column `filtro` on the `spectra` table. All the data in the column will be lost.
  - You are about to drop the column `grafico` on the `spectra` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `spectra` table. All the data in the column will be lost.
  - You are about to drop the column `variedade` on the `spectra` table. All the data in the column will be lost.
  - Added the required column `content` to the `Spectra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datetime` to the `Spectra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Spectra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variety` to the `Spectra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `spectra` DROP COLUMN `conteudo`,
    DROP COLUMN `criadoEm`,
    DROP COLUMN `data`,
    DROP COLUMN `filtro`,
    DROP COLUMN `grafico`,
    DROP COLUMN `nome`,
    DROP COLUMN `variedade`,
    ADD COLUMN `content` JSON NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `datetime` DATETIME(3) NOT NULL,
    ADD COLUMN `filter` VARCHAR(191) NULL,
    ADD COLUMN `graph` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `variety` VARCHAR(191) NOT NULL;
