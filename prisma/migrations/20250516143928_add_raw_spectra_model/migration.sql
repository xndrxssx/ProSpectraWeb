-- CreateTable
CREATE TABLE `RawSpectrum` (
    `id` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `wavelengths` VARCHAR(191) NOT NULL,
    `intensity` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NOT NULL,
    `varietyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RawSpectrum` ADD CONSTRAINT `RawSpectrum_varietyId_fkey` FOREIGN KEY (`varietyId`) REFERENCES `Variety`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
