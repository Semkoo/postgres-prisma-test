"use client";

import { cn } from "~/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const STEPS = [
  {
    label: "Contact Info",
    href: "/get-started",
  },
  {
    label: "Business Info",
    href: "/get-started/business",
  },
  {
    label: "Financial Info",
    href: "/get-started/financial",
  },
  {
    label: "Confirmation",
    href: "/get-started/confirmation",
  },
];

const Linked = ({
  href,
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  if (!href) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default function Stepper() {
  const pathname = usePathname();
  const currentStep = pathname.includes("thank-you")
    ? STEPS.length - 1
    : STEPS.findIndex((step) => step.href === pathname);

  return (
    <ol className="flex w-full items-center py-10 text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
      {STEPS.map((step, index) => {
        const isCurrentStep = index <= currentStep;

        return (
          <Linked
            href={isCurrentStep ? step.href : undefined}
            key={step.label}
            className={cn(
              "flex items-center",
              index !== STEPS.length - 1 &&
                "after:border-1 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 after:content-[''] dark:after:border-gray-700 sm:after:inline-block md:w-full xl:after:mx-10",
              currentStep === index &&
                "text-customSecondary dark:text-customSecondary",
              isCurrentStep && "text-customPrimary dark:text-customPrimary",
            )}
          >
            <li className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              {isCurrentStep ? (
                <svg
                  className="mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <span className="mr-2">{index + 1}</span>
              )}
              {step.label.split(" ")[0]}{" "}
              <span className="hidden sm:ml-2 sm:inline-flex">
                {step.label.split(" ")[1] || ""}
              </span>
            </li>
          </Linked>
        );
      })}
    </ol>
  );
}
