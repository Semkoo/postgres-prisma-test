import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import Stepper from "@/core/GetStarted/Stepper";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper className="py-10">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          We invest in the worlds potential
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
          Ready to get started? Fill out the form below to get started.
        </p>
      </div>

      <Stepper />
      <Separator className="mb-6" />

      <div>{children}</div>
    </MaxWidthWrapper>
  );
}
