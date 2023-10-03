import { redirect } from "next/navigation";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { authOptions } from "~/core/Auth/authOptions";
import { getCurrentUser } from "~/core/Auth/session";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <MaxWidthWrapper>
      <div className="mt-4 text-3xl font-semibold">Welcome to Dashboard</div>
    </MaxWidthWrapper>
  );
}
