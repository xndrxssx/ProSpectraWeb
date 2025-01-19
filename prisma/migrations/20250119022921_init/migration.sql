/*
  Warnings:

  - Made the column `graph` on table `predictivemodel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `predictivemodel` MODIFY `graph` JSON NOT NULL;
