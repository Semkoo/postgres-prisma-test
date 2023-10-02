import { ConfirmationForm } from "~/core/GetStarted/ConfirmationForm";
import { getLead } from "~/core/GetStarted/actions";
import { ConfirmationValidationSchema } from "~/core/GetStarted/types";
import { EnumStepStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

export default async function ConfirmationPage() {
  const { data } = await getLead();

  if (data === null || data?.stepStatus !== EnumStepStatus.FINANCIAL_INFO) {
    redirect("/get-started/financial");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Confirmation</h1>
      <ConfirmationForm lead={{ ...(data as ConfirmationValidationSchema) }} />
    </div>
  );
}
