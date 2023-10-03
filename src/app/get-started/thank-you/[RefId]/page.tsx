import { redirect } from "next/navigation";
import ThankYou from "~/core/GetStarted/ThankYou";
import { getLead } from "~/core/GetStarted/actions";
import { ConfirmationValidationSchema } from "~/core/GetStarted/types";

export const dynamic = "force-dynamic";

export default async function ThankYouPage({
  params: { RefId },
}: {
  params: { RefId: string };
}) {
  if (RefId === undefined || RefId === null || RefId === "") {
    redirect("/get-started");
  }

  const { data } = await getLead(RefId);

  if (data === null) {
    redirect("/get-started");
  }

  return <ThankYou lead={data as ConfirmationValidationSchema} />;
}
