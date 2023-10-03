import { FinancialForm } from "~/core/GetStarted/FinancialForm";
import { getLead } from "~/core/GetStarted/actions";
import { EnumStepStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Get Started - Financial Info",
  description: "Get started with your application - Financial Info",
};

export default async function FinancialPage() {
  const { data } = await getLead();

  if (data === null || data?.stepStatus !== EnumStepStatus.BUSINESS_INFO) {
    redirect("/get-started/business");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Step 3: Financial Info</h1>
      <FinancialForm
        businessFinancialInfo={{
          businessIncomePerMonth: data?.businessIncomePerMonth || 0,
          businessTaxPercentage: data?.businessTaxPercentage || 0,
        }}
      />
    </div>
  );
}
