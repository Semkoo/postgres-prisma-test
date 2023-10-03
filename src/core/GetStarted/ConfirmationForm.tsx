"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button, buttonVariants } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ContactFields } from "./ContactForm";
import { BusinessFields } from "./BusinessForm";
import { Separator } from "~/components/ui/separator";
import { FinancialFields } from "./FinancialForm";
import { ConfirmationValidationSchema, confirmationFormSchema } from "./types";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateLead } from "./actions";
import { useToast } from "~/components/ui/use-toast";

const initialState: ConfirmationValidationSchema = {
  businessIncomePerMonth: 0,
  businessTaxPercentage: 0,
  businessName: "",
  businessCity: "",
  businessWebsite: "",
  businessEmail: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export function ConfirmationForm({
  lead = initialState,
}: {
  lead?: ConfirmationValidationSchema;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<ConfirmationValidationSchema>({
    resolver: zodResolver(confirmationFormSchema),
    defaultValues: lead,
  });

  // 2. Define a submit handler.
  function onSubmit(values: ConfirmationValidationSchema) {
    startTransition(async () => {
      try {
        const { data } = await updateLead(values, pathname);

        if (data === null) {
          throw new Error("Failed to update lead.");
        }

        router.push(`/get-started/thank-you/${data?.id}`);
      } catch (error) {
        toast({
          title: "Something went wrong.",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
        router.refresh();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ContactFields />
        <Separator className="pl-10 pr-10" />
        <BusinessFields />
        <Separator className="pl-10 pr-10" />
        <FinancialFields />
        <div className="flex gap-6">
          <Link
            href="/get-started"
            className={buttonVariants({
              variant: "secondary",
              className: "w-full",
            })}
          >
            Start Over
          </Link>
          <Button type="submit" className="w-full" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
