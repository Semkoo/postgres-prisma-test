"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useForm, useFormContext } from "react-hook-form";
import Link from "next/link";
import { FinancialValidationSchema, financialFormSchema } from "./types";
import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setFinancialLead } from "./actions";
import { useToast } from "~/components/ui/use-toast";

const initialState: FinancialValidationSchema = {
  businessIncomePerMonth: 0,
  businessTaxPercentage: 0,
};

export const FinancialFields = () => {
  const form = useFormContext();

  return (
    <div className="mb-6 grid gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="businessIncomePerMonth"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            <FormLabel>Business Income Per Month</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="0"
                {...rest}
                onChange={(e) => {
                  const value = e.target.value;
                  const number = Number(value);
                  onChange(number);
                }}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="businessTaxPercentage"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            <FormLabel>Business Tax Percentage</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="0"
                {...rest}
                onChange={(e) => {
                  const value = e.target.value;
                  const number = Number(value);
                  onChange(number);
                }}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export function FinancialForm({
  businessFinancialInfo = initialState,
}: {
  businessFinancialInfo?: FinancialValidationSchema;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<FinancialValidationSchema>({
    resolver: zodResolver(financialFormSchema),
    defaultValues: businessFinancialInfo,
  });

  // 2. Define a submit handler.
  function onSubmit(values: FinancialValidationSchema) {
    startTransition(async () => {
      try {
        const { data } = await setFinancialLead(values, pathname);

        if (data === null) {
          throw new Error("Failed to update lead.");
        }

        router.push("/get-started/confirmation");
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
        <FinancialFields />
        <div className="flex gap-6">
          <Link
            href="/get-started/business"
            className={buttonVariants({
              variant: "secondary",
              className: "w-full",
            })}
          >
            Previous Step: Business Info
          </Link>

          <Button type="submit" className="w-full" disabled={isPending}>
            Next Step: Confirmation
          </Button>
        </div>
      </form>
    </Form>
  );
}
