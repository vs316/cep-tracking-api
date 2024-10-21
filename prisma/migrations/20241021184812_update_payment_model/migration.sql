/*
  Warnings:

  - You are about to drop the column `updated_at` on the `payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `couriers` MODIFY `name` VARCHAR(100) NULL,
    MODIFY `vehicle_id` VARCHAR(100) NULL,
    MODIFY `phone_number` VARCHAR(20) NULL,
    MODIFY `status` ENUM('ON_DELIVERY', 'OFFLINE') NULL DEFAULT 'OFFLINE',
    MODIFY `gender` ENUM('MALE', 'FEMALE') NULL,
    MODIFY `email` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `updated_at`;
