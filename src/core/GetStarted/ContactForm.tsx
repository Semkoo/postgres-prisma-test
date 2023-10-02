"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
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
import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ContactValidationSchema, contactFormSchema } from "./types";
import { setContactLead } from "./actions";

const initialState: ContactValidationSchema = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export const ContactFields = () => {
  const form = useFormContext();

  return (
    <div className="mb-6 grid gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="John" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Wick" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="john.wick@email.com" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="(123) 999 4000" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export function ContactForm({
  contact = initialState,
}: {
  contact?: ContactValidationSchema;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<ContactValidationSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contact,
  });

  // 2. Define a submit handler.
  function onSubmit(values: ContactValidationSchema) {
    startTransition(async () => {
      try {
        await setContactLead(values, pathname);
        router.push("/get-started/business");
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ContactFields />
        <div className="flex gap-6">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => form.reset}
          >
            Clear
          </Button>
          <Button type="submit" className="w-full" disabled={isPending}>
            Next Step: Business Info
          </Button>
        </div>
      </form>
    </Form>
  );
}
