/*
  Warnings:

  - Added the required column `stepStatus` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumStepStatus" AS ENUM ('CONTACT_INFO', 'BUSINESS_INFO', 'FINANCIAL_INFO', 'CONFIRMATION');

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "stepStatus" "EnumStepStatus" NOT NULL;
