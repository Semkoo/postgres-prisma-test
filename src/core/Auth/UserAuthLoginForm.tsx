"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
import { UserAuthValidationSchema, userAuthSchema } from "./types";
import { useToast } from "~/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function UserAuthLoginForm({
  isGitHubLoading,
  onTransition,
}: {
  isGitHubLoading: boolean;
  onTransition: (aValue: boolean) => void;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, setIsPending] = useState(false);

  const form = useForm<UserAuthValidationSchema>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: UserAuthValidationSchema) {
    onTransition(true);
    setIsPending(true);
    const signInResult = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    });

    setIsPending(false);
    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            disabled={isPending || isGitHubLoading}
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
            name="password"
            disabled={isPending || isGitHubLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isPending || isGitHubLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
