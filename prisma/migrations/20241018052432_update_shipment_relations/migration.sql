/*
  Warnings:

  - You are about to drop the `courier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `shipment` DROP FOREIGN KEY `shipment_ibfk_2`;

-- DropForeignKey
ALTER TABLE `shipment` DROP FOREIGN KEY `shipment_ibfk_3`;

-- DropTable
DROP TABLE `courier`;

-- CreateTable
CREATE TABLE `shipto` (
    `shipto_id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(50) NULL,
    `first_name` VARCHAR(50) NULL,
    `last_name` VARCHAR(50) NULL,
    `email` VARCHAR(100) NULL,
    `phone_number` VARCHAR(50) NULL,
    `pincode` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `locality` VARCHAR(50) NULL,
    `address_line_1` VARCHAR(50) NULL,
    `address_line_2` VARCHAR(50) NULL,

    PRIMARY KEY (`shipto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipfrom` (
    `shipfrom_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50) NULL,
    `last_name` VARCHAR(50) NULL,
    `email` VARCHAR(100) NULL,
    `phone_number` VARCHAR(50) NULL,
    `pincode` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `locality` VARCHAR(50) NULL,
    `address_line_1` VARCHAR(50) NULL,
    `address_line_2` VARCHAR(50) NULL,

    PRIMARY KEY (`shipfrom_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `couriers` (
    `courier_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `vehicle_id` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `rating` DECIMAL(3, 2) NULL,
    `status` ENUM('ON_DELIVERY', 'OFFLINE') NOT NULL DEFAULT 'OFFLINE',
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `surname` VARCHAR(100) NULL,

    PRIMARY KEY (`courier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `shipment` ADD CONSTRAINT `shipment_ibfk_2` FOREIGN KEY (`from_address_id`) REFERENCES `shipfrom`(`shipfrom_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shipment` ADD CONSTRAINT `shipment_ibfk_3` FOREIGN KEY (`to_address_id`) REFERENCES `shipto`(`shipto_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
