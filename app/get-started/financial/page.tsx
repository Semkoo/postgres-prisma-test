import { FinancialForm } from "@/core/GetStarted/FinancialForm";
import React from "react";

export default function FinancialPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Get Started</h1>
      <FinancialForm />
    </div>
  );
}
