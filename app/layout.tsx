import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HitRate: Creator marketing anyone can run",
  description:
    "HitRate shows you the videos winning in your category, gets creators to make yours, and tells you which creator made you money.",
  metadataBase: new URL("https://hitrate.sh"),
  openGraph: {
    title: "HitRate: Creator marketing anyone can run",
    description:
      "See what's winning. Get creators to make it. Know who made you money.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
