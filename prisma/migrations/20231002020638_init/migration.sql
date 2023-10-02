/*
  Warnings:

  - You are about to drop the `GetStartedLead` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GetStartedLead";

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "businessName" TEXT,
    "businessCity" TEXT,
    "businessWebsite" TEXT,
    "businessEmail" TEXT,
    "businessIncomePerMonth" INTEGER,
    "businessTaxPercentage" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
