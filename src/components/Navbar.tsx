import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { LoginButton } from "~/core/Auth/Auth";
import { cn } from "~/lib/utils";
import UserAccountNav from "~/core/Auth/UserAccountNav";

import { getCurrentUser } from "~/core/Auth/session";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            <span>Brand.</span>
          </Link>

          <div className="flex items-center space-x-4 ">
            <Link
              href="/get-started"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
              )}
            >
              Get Started
            </Link>
            {!user ? (
              <LoginButton />
            ) : (
              <UserAccountNav
                name={user?.name ?? "Your Account"}
                imageUrl={user?.image ?? ""}
              />
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
