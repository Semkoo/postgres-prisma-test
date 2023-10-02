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
import { BusinessValidationSchema, businessFormSchema } from "./types";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { setBusinessLead } from "./actions";
import Link from "next/link";

const initialState: BusinessValidationSchema = {
  businessName: "",
  businessCity: "",
  businessWebsite: "",
  businessEmail: "",
};

export const BusinessFields = () => {
  const form = useFormContext();

  return (
    <div className="mb-6 grid gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input placeholder="John" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="businessCity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business City</FormLabel>
            <FormControl>
              <Input placeholder="Wick" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="businessWebsite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Website</FormLabel>
            <FormControl>
              <Input placeholder="Wick" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="businessEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Email</FormLabel>
            <FormControl>
              <Input placeholder="Wick" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export function BusinessForm({
  business = initialState,
}: {
  business?: BusinessValidationSchema;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<BusinessValidationSchema>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: business,
  });

  // 2. Define a submit handler.
  function onSubmit(values: BusinessValidationSchema) {
    startTransition(async () => {
      try {
        await setBusinessLead(values, pathname);
        router.push("/get-started/financial");
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BusinessFields />
        <div className="flex gap-6">
          <Link
            href="/get-started"
            className={buttonVariants({
              variant: "secondary",
              className: "w-full",
            })}
          >
            Previous Step: Contact Info
          </Link>
          <Button type="submit" className="w-full" disabled={isPending}>
            Next Step: Financial Info
          </Button>
        </div>
      </form>
    </Form>
  );
}
