-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(255),
    "accessToken" TEXT,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "surname" VARCHAR(255) NOT NULL,
    "identity_no" TEXT NOT NULL,
    "portfolio" JSONB NOT NULL,
    "total_account" DECIMAL(10,2) NOT NULL,
    "main_account" DECIMAL(10,2) NOT NULL,
    "mod_account" DECIMAL(10,2) NOT NULL,
    "is_percentage" BOOLEAN NOT NULL,
    "percentage" DECIMAL(10,2) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_identity_no_key" ON "User"("identity_no");
