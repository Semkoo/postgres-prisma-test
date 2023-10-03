import { Metadata } from "next";
import Link from "next/link";

import { UserAuthForm } from "~/core/Auth/UserAuthForm";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "~/core/Auth/authOptions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user) {
    redirect("/dashboard");
  }

  return (
    <MaxWidthWrapper className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to continue
          </p>
        </div>
        <UserAuthForm type="login" />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/get-started"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Get Started
          </Link>
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
