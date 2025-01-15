-- CreateTable
CREATE TABLE `Spectra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `conteudo` JSON NOT NULL,
    `variedade` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `local` VARCHAR(191) NOT NULL,
    `filtro` VARCHAR(191) NULL,
    `grafico` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
