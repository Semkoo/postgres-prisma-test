"use client";

import { Button } from "~/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <Button variant="ghost" size="sm" onClick={async () => await signIn()}>
      Sign in
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button variant="ghost" size="sm" onClick={async () => await signOut()}>
      Sign Out
    </Button>
  );
};
