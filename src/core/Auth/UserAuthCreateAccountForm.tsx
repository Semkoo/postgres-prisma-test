"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
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
import { UserRegisterValidationSchema, userRegisterSchema } from "./types";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUp } from "./actions";

const initialState: UserRegisterValidationSchema = {
  email: "",
  name: "",
  password: "",
  verifyPassword: "",
};

export default function UserAuthCreateAccountForm({
  email = "",
  name = "",
  isGitHubLoading,
  onTransition,
}: {
  email?: string;
  name?: string;
  isGitHubLoading: boolean;
  onTransition: (aValue: boolean) => void;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserRegisterValidationSchema>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      ...initialState,
      name,
      email,
    },
  });

  async function onSubmit(registerData: UserRegisterValidationSchema) {
    startTransition(async () => {
      try {
        onTransition(true);
        const { data } = await signUp(registerData);

        if (data === null) {
          throw new Error("Sign up failed.");
        }

        router.push("/login");
      } catch (error) {
        onTransition(false);
        toast({
          title: "Something went wrong.",
          description: "Your sign in request failed. Please try again.",
          variant: "destructive",
        });

        router.refresh();
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              disabled={isPending || isGitHubLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Wick" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

            <FormField
              control={form.control}
              name="verifyPassword"
              disabled={isPending || isGitHubLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
    </>
  );
}
