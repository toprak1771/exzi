/*
  Warnings:

  - You are about to drop the column `accessToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_percentage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `percentage` on the `User` table. All the data in the column will be lost.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "accessToken",
DROP COLUMN "amount",
DROP COLUMN "is_percentage",
DROP COLUMN "percentage",
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "portfolio" DROP NOT NULL,
ALTER COLUMN "total_account" DROP NOT NULL,
ALTER COLUMN "main_account" DROP NOT NULL,
ALTER COLUMN "mod_account" DROP NOT NULL;
