"use client";

import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { Mailbox } from "lucide-react";
import { ConfirmationValidationSchema } from "./types";
import { UserAuthForm } from "../Auth/UserAuthForm";
import { Separator } from "~/components/ui/separator";

export default function ThankYou({
  lead,
}: {
  lead: ConfirmationValidationSchema;
}) {
  return (
    <MaxWidthWrapper className="flex-col items-center justify-center">
      <div className="mt-10 grid gap-1 md:grid-cols-3">
        <div>
          <Mailbox className="mb-4 h-24 w-24" />

          <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight  md:text-2xl lg:mb-16 xl:text-4xl">
            We have received your request! {lead?.firstName ?? ""}
          </h1>

          <div>
            <div className="mb-6 text-sm font-bold  sm:text-base">
              What&apos;s next?
            </div>
            <p className="md:text-lg xl:text-xl">
              You&apos;ve done your part, now we&apos;ll do ours! Your request
              will be received by a member of our team who will review your
              information and contact you to further discuss your project! As
              well to arrange a site visit if required!
            </p>

            <p className="mt-4 md:text-lg xl:text-xl">
              We look forward to working with you!
            </p>
            <p className="mt-4 md:text-lg xl:text-xl">- Brand.</p>
          </div>
        </div>

        <Separator orientation="vertical" className="mx-auto hidden md:flex" />

        <div className="w-full md:py-10">
          <h1 className="mb-4 text-xl font-bold leading-none tracking-tight ">
            Create your account to get started!
          </h1>

          <UserAuthForm
            email={lead.email}
            name={`${lead.firstName} ${lead.lastName}`}
            type="create-account"
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
