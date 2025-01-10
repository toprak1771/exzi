-- AlterTable
ALTER TABLE "User" ADD COLUMN     "amount" DECIMAL(65,30),
ADD COLUMN     "mod_type" TEXT,
ADD COLUMN     "percentage" DECIMAL(65,30);
