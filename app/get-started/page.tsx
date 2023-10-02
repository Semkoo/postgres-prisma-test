import { ContactForm } from "@/core/GetStarted/ContactForm";
import { getLead } from "@/core/GetStarted/actions";

import React from "react";

export default async function ContactPage() {
  const { data } = await getLead();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Step 1: Contact Info</h1>
      <ContactForm
        contact={{
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",
          email: data?.email || "",
          phone: data?.phone || "",
        }}
      />
    </div>
  );
}
