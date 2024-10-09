/*
  Warnings:

  - You are about to drop the column `userId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the `shipmentcase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shipmentdocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shipmentnotification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shipmentservice` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `address` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_userId_fkey`;

-- DropForeignKey
ALTER TABLE `shipmentcase` DROP FOREIGN KEY `shipmentcase_ibfk_2`;

-- DropForeignKey
ALTER TABLE `shipmentdocument` DROP FOREIGN KEY `shipmentdocument_ibfk_1`;

-- DropForeignKey
ALTER TABLE `shipmentnotification` DROP FOREIGN KEY `shipmentnotification_ibfk_1`;

-- DropForeignKey
ALTER TABLE `shipmentservice` DROP FOREIGN KEY `shipmentservice_ibfk_1`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `userId`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `shipmentitem` ADD COLUMN `descriptionOfGoods` VARCHAR(255) NULL,
    ADD COLUMN `servicetype` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `uuid` VARCHAR(36) NOT NULL;

-- DropTable
DROP TABLE `shipmentcase`;

-- DropTable
DROP TABLE `shipmentdocument`;

-- DropTable
DROP TABLE `shipmentnotification`;

-- DropTable
DROP TABLE `shipmentservice`;

-- CreateTable
CREATE TABLE `Admin` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Admin_uuid_key`(`uuid`),
    UNIQUE INDEX `Admin_username_key`(`username`),
    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Courier` (
    `courier_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `vehicle_id` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `rating` DECIMAL(3, 2) NULL,
    `status` ENUM('ON_DELIVERY', 'OFFLINE') NOT NULL DEFAULT 'OFFLINE',

    PRIMARY KEY (`courier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `address_uuid_fkey` ON `address`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `user_uuid_key` ON `user`(`uuid`);

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_uuid_fkey` FOREIGN KEY (`uuid`) REFERENCES `user`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
