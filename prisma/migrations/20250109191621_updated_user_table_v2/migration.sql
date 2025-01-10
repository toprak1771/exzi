/*
  Warnings:

  - Made the column `total_account` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "total_account" SET NOT NULL;
