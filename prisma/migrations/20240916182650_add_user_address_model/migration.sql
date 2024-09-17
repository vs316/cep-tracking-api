-- CreateTable
CREATE TABLE `address` (
    `address_id` INTEGER NOT NULL AUTO_INCREMENT,
    `address_line_1` VARCHAR(255) NULL,
    `address_line_2` VARCHAR(255) NULL,
    `locality` VARCHAR(100) NULL,
    `city` VARCHAR(100) NULL,
    `state` VARCHAR(100) NULL,
    `pincode` VARCHAR(10) NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`address_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `shipment_id` INTEGER NULL,
    `amount` DECIMAL(10, 2) NULL,
    `payment_method` VARCHAR(50) NULL,
    `payment_status` VARCHAR(50) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,

    INDEX `shipment_id`(`shipment_id`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipment` (
    `shipment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `from_address_id` INTEGER NULL,
    `to_address_id` INTEGER NULL,
    `shipment_type` VARCHAR(50) NULL,
    `status` VARCHAR(50) NULL,
    `is_draft` BOOLEAN NULL DEFAULT false,
    `is_finalized` BOOLEAN NULL DEFAULT false,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,

    INDEX `from_address_id`(`from_address_id`),
    INDEX `to_address_id`(`to_address_id`),
    INDEX `shipment_ibfk_1`(`user_id`),
    PRIMARY KEY (`shipment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipmentcase` (
    `case_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `shipment_id` INTEGER NULL,
    `case_status` VARCHAR(50) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,

    INDEX `shipment_id`(`shipment_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`case_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipmentdocument` (
    `document_id` INTEGER NOT NULL AUTO_INCREMENT,
    `shipment_id` INTEGER NULL,
    `document_type` VARCHAR(50) NULL,
    `document_file` BLOB NULL,

    INDEX `shipment_id`(`shipment_id`),
    PRIMARY KEY (`document_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipmentitem` (
    `shipment_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `shipment_id` INTEGER NULL,
    `item_description` VARCHAR(255) NULL,
    `quantity` INTEGER NULL,
    `weight` DECIMAL(10, 2) NULL,
    `value` DECIMAL(10, 2) NULL,

    INDEX `shipment_id`(`shipment_id`),
    PRIMARY KEY (`shipment_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipmentnotification` (
    `notification_id` INTEGER NOT NULL AUTO_INCREMENT,
    `shipment_id` INTEGER NULL,
    `notification_type` VARCHAR(50) NULL,
    `sent_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `shipment_id`(`shipment_id`),
    PRIMARY KEY (`notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipmentservice` (
    `shipment_service_id` INTEGER NOT NULL AUTO_INCREMENT,
    `shipment_id` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,
    `service_name` VARCHAR(255) NOT NULL,
    `service_description` TEXT NULL,
    `service_price` DECIMAL(10, 2) NOT NULL,
    `service_status` ENUM('pending', 'in_progress', 'completed', 'cancelled') NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `shipment_id`(`shipment_id`),
    PRIMARY KEY (`shipment_service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `phoneVerified` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipment`(`shipment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shipment` ADD CONSTRAINT `shipment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shipment` ADD CONSTRAINT `shipment_ibfk_2` FOREIGN KEY (`from_address_id`) REFERENCES `address`(`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shipment` ADD CONSTRAINT `shipment_ibfk_3` FOREIGN KEY (`to_address_id`) REFERENCES `address`(`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shipmentcase` ADD CONSTRAINT `shipmentcase_ibfk_2` FOREIGN KEY (`shipment_id`) REFERENCES `shipment`(`shipment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shipmentdocument` ADD CONSTRAINT `shipmentdocument_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipment`(`shipment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shipmentitem` ADD CONSTRAINT `shipmentitem_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipment`(`shipment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shipmentnotification` ADD CONSTRAINT `shipmentnotification_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipment`(`shipment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shipmentservice` ADD CONSTRAINT `shipmentservice_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipment`(`shipment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
