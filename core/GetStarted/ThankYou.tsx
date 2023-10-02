"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useEffect, useRef } from "react";
import { Mailbox } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ThankYou() {
  const router = useRouter();
  const refRedirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (refRedirectTimer.current) {
      clearTimeout(refRedirectTimer.current);
    }

    refRedirectTimer.current = setTimeout(() => {
      router.push("/");
    }, 30000);
  }, []);

  return (
    <MaxWidthWrapper className="flex-col items-center justify-center">
      <Mailbox className="mb-4 h-32 w-32" />

      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight  md:text-2xl lg:mb-16 xl:text-4xl">
        We have received your request!
      </h1>

      <div>
        <div className="mb-6 text-sm font-bold  sm:text-base">
          What&apos;s next?
        </div>
        <p className="md:text-lg xl:text-xl">
          You&apos;ve done your part, now we&apos;ll do ours! Your request will
          be received by a member of our team who will review your information
          and contact you to further discuss your project! As well to arrange a
          site visit if required!
        </p>

        <p className="mt-4 md:text-lg xl:text-xl">
          We look forward to working with you!
        </p>
        <p className="mt-4 md:text-lg xl:text-xl">- Brand.</p>
      </div>
    </MaxWidthWrapper>
  );
}
