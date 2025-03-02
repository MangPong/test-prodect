-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profileId` INTEGER NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `User_username_email_phone_key`(`username`, `email`, `phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `photoIDcard` VARCHAR(191) NOT NULL,
    `relationship` VARCHAR(191) NOT NULL,
    `phoneRelationship` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contactInfo` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSell_username_key`(`username`),
    UNIQUE INDEX `UserSell_email_key`(`email`),
    UNIQUE INDEX `UserSell_phone_key`(`phone`),
    UNIQUE INDEX `UserSell_username_email_phone_key`(`username`, `email`, `phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileSell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL DEFAULT '',
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL DEFAULT '',
    `phoneNumber` VARCHAR(191) NULL DEFAULT '',
    `email` VARCHAR(191) NULL DEFAULT '',
    `address` VARCHAR(191) NOT NULL,
    `bank` VARCHAR(191) NULL DEFAULT '',
    `accountNumber` VARCHAR(191) NULL DEFAULT '',
    `profileImage` VARCHAR(191) NULL DEFAULT '',
    `photoIdCard` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProfileSell_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormSell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userSellId` INTEGER NOT NULL,
    `nameDormitory` VARCHAR(191) NOT NULL,
    `typeDormitory` VARCHAR(191) NOT NULL,
    `addressDormitory` VARCHAR(191) NOT NULL,
    `dormitoryDetails` VARCHAR(191) NULL,
    `facilities` VARCHAR(191) NOT NULL,
    `roomNumber` INTEGER NOT NULL,
    `distanceDormitory` DOUBLE NOT NULL,
    `roomDeposit` DOUBLE NOT NULL,
    `priceMonth` DOUBLE NOT NULL,
    `priceElectricity` DOUBLE NOT NULL,
    `priceWater` DOUBLE NOT NULL,
    `priceWifi` DOUBLE NOT NULL,
    `priceOther` DOUBLE NOT NULL,
    `photoDormitory` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileSell` ADD CONSTRAINT `ProfileSell_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserSell`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormSell` ADD CONSTRAINT `FormSell_userSellId_fkey` FOREIGN KEY (`userSellId`) REFERENCES `UserSell`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
