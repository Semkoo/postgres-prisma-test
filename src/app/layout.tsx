import "./globals.css";
import { cn } from "~/lib/utils";
import { Inter } from "next/font/google";
import Navbar from "~/components/Navbar";
import SessionProvider from "~/core/Auth/SessionProvider";

// export const metadata = {
//   title: "Vercel Postgres Demo with Prisma",
//   description:
//     "A simple Next.js app with Vercel Postgres as the database and Prisma as the ORM",
// };

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
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}