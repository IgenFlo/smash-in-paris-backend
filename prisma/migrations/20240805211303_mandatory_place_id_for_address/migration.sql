/*
  Warnings:

  - Made the column `placeId` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Address` MODIFY `placeId` VARCHAR(191) NOT NULL;
