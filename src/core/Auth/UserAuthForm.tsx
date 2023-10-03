"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { Loader2, Github } from "lucide-react";

import { cn } from "~/lib/utils";

import { buttonVariants } from "~/components/ui/button";
import { useState } from "react";
import UserAuthLoginForm from "./UserAuthLoginForm";
import UserAuthCreateAccountForm from "./UserAuthCreateAccountForm";

export function UserAuthForm(
  props:
    | {
        type: "login";
        className?: string;
      }
    | {
        type: "create-account";
        className?: string;
        email?: string;
        name?: string;
      },
) {
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <div className={cn("grid gap-6", props.className)}>
      {props.type === "create-account" ? (
        <UserAuthCreateAccountForm
          isGitHubLoading={isGitHubLoading}
          onTransition={(aValue) => {
            setIsPending(aValue);
          }}
          email={props.email}
          name={props.name}
        />
      ) : (
        <UserAuthLoginForm
          isGitHubLoading={isGitHubLoading}
          onTransition={(aValue) => {
            setIsPending(aValue);
          }}
        />
      )}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true);
          signIn("github");
        }}
        disabled={isPending || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  );
}
