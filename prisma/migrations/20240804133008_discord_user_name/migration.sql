/*
  Warnings:

  - Added the required column `discordUserName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `discordUserName` VARCHAR(191) NOT NULL;
