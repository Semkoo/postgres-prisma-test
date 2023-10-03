import MaxWidthWrapper from "~/components/MaxWidthWrapper";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <MaxWidthWrapper>
      <div className="mt-4 text-3xl font-semibold">Welcome to Dashboard</div>
    </MaxWidthWrapper>
  );
}
