-- CreateTable
CREATE TABLE "GetStartedLead" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessCity" TEXT NOT NULL,
    "businessWebsite" TEXT NOT NULL,
    "businessEmail" TEXT NOT NULL,
    "businessIncomePerMonth" INTEGER NOT NULL,
    "businessTaxPercentage" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GetStartedLead_pkey" PRIMARY KEY ("id")
);
