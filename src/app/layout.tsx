import "./globals.css";
import { cn } from "~/lib/utils";
import { Inter } from "next/font/google";
import Navbar from "~/components/Navbar";
import SessionProvider from "~/core/Auth/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "~/core/Auth/authOptions";
import { Toaster } from "~/components/ui/toaster";

export const metadata = {
  title: "Vercel Postgres Demo with Prisma & Server Actions",
  description:
    "A simple Next.js app with Vercel Postgres as the database and Prisma as the ORM",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "grainy min-h-screen font-sans antialiased",
          inter.variable,
        )}
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
