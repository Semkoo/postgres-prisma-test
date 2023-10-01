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
  businessName: z.string().min(1, { message: "Business name is required" }),
  businessCity: z.string().min(1, { message: "Business city is required" }),
  businessWebsite: z.string(),
  businessEmail: z.string().min(1, { message: "Business email is required" }),
});

type ValidationSchema = z.infer<typeof formSchema>;

export function ConfirmationForm() {
  // 1. Define your form.
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessCity: "",
      businessWebsite: "",
      businessEmail: "",
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
        <div className="flex gap-6">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => form.reset}
          >
            Previous Step: Contact Info
          </Button>
          <Button type="submit" className="w-full">
            Next Step: Financial Info
          </Button>
        </div>
      </form>
    </Form>
  );
}
