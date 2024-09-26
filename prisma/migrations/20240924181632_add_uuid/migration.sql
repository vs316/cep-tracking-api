/*
  Warnings:

  - Made the column `address_line_1` on table `address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `address` MODIFY `address_line_1` VARCHAR(255) NOT NULL;
