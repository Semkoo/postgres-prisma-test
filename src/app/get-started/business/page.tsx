import { BusinessForm } from "~/core/GetStarted/BusinessForm";
import { getLead } from "~/core/GetStarted/actions";
import { EnumStepStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Get Started - Business Info",
  description: "Get started with your application - Business Info",
};

export default async function BusinessPage() {
  const { data } = await getLead();

  if (data === null || data?.stepStatus !== EnumStepStatus.CONTACT_INFO) {
    redirect("/get-started");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Step 2: Business Info</h1>
      <BusinessForm
        business={{
          businessName: data?.businessName ?? "",
          businessCity: data?.businessCity ?? "",
          businessWebsite: data?.businessWebsite ?? "",
          businessEmail: data?.businessEmail ?? "",
        }}
      />
    </div>
  );
}
