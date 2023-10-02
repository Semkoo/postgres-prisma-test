import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Table from "@/components/table";
import TablePlaceholder from "@/components/table-placeholder";
import ExpandingArrow from "@/components/expanding-arrow";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <MaxWidthWrapper className="relative flex min-h-screen flex-col items-center justify-center">
      <Link
        href="https://vercel.com/templates/next.js/postgres-prisma"
        className="group mt-20 flex space-x-1 rounded-full bg-white/30 px-10 py-2 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-lg active:shadow-sm sm:mt-0"
      >
        <p>Deploy your own to Vercel</p>
        <ExpandingArrow />
      </Link>
      <h1 className="bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text pb-8 pt-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Next-Gen <br /> <span className="text-[#ff0000]">Brand.</span> <br />{" "}
      </h1>
      <Suspense fallback={<TablePlaceholder />}>
        <Table />
      </Suspense>
      <p className="mt-6 w-full max-w-lg text-center font-light text-gray-600">
        <Link
          href="https://vercel.com/postgres"
          className="font-medium underline underline-offset-4 transition-colors hover:text-black"
        >
          Vercel Postgres
        </Link>{" "}
        demo with{" "}
        <Link
          href="https://prisma.io"
          className="font-medium underline underline-offset-4 transition-colors hover:text-black"
        >
          Prisma
        </Link>{" "}
        as the ORM. <br /> Built with{" "}
        <Link
          href="https://nextjs.org/docs"
          className="font-medium underline underline-offset-4 transition-colors hover:text-black"
        >
          Next.js App Router
        </Link>
        .
      </p>

      <div className="mt-10 flex w-full max-w-xl justify-center space-x-5 border-t border-gray-300 pt-10 text-gray-600">
        <Link
          href="https://postgres-starter.vercel.app/"
          className="font-medium underline underline-offset-4 transition-colors hover:text-black"
        >
          Starter
        </Link>
        <Link
          href="https://postgres-kysely.vercel.app/"
          className="font-medium underline underline-offset-4 transition-colors hover:text-black"
        >
          Kysely
        </Link>
        <Link
          href="https://postgres-drizzle.vercel.app/"
          className="font-medium underline underline-offset-4 transition-colors hover:text-black"
        >
          Drizzle
        </Link>
      </div>

      <div className="flex w-full justify-between px-20 py-10 sm:absolute sm:bottom-0">
        <Link href="https://vercel.com">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
        <Link
          href="https://github.com/Semkoo/postgres-prisma-test"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
