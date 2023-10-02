import { BusinessForm } from "~/core/GetStarted/BusinessForm";
import { getLead } from "~/core/GetStarted/actions";
import { EnumStepStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

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
          businessName: data?.businessName || "",
          businessCity: data?.businessCity || "",
          businessWebsite: data?.businessWebsite || "",
          businessEmail: data?.businessEmail || "",
        }}
      />
    </div>
  );
}
