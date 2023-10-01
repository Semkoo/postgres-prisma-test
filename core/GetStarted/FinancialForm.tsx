"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  businessIncomePerMonth: z
    .number()
    .min(1, { message: "Business name is required" }),
  businessTaxPercentage: z
    .number()
    .min(1, { message: "Business city is required" }),
});

type ValidationSchema = z.infer<typeof formSchema>;




export function FinancialForm() {
  // 1. Define your form.
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessIncomePerMonth: 0,
      businessTaxPercentage: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: ValidationSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="businessIncomePerMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Income Per Month</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessTaxPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Tax Percentage</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => form.reset}
          >
            Previous Step: Business Info
          </Button>
          <Button type="submit" className="w-full">
            Next Step: Confirmation
          </Button>
        </div>
      </form>
    </Form>
  );
}
