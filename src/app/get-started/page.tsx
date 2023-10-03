import { Metadata } from "next";
import { ContactForm } from "~/core/GetStarted/ContactForm";
import { getLead } from "~/core/GetStarted/actions";

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Get Started - Contact Info",
  description: "Get started with your application - Contact Info",
};

export default async function ContactPage() {
  const { data } = await getLead();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Step 1: Contact Info</h1>
      <ContactForm
        contact={{
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",
          email: data?.email || "",
          phone: data?.phone || "",
        }}
      />
    </div>
  );
}
