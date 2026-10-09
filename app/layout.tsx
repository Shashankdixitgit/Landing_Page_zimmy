import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SelectionFeedback from "@/components/SelectionFeedback";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zimmy: A recipe for viral content",
  description:
    "Zimmy finds the videos already winning in your niche, works out why, and helps you test and scale them: AI videos first, then real creators, then ads.",
  metadataBase: new URL("https://www.zimmy.art"),
  openGraph: {
    title: "Zimmy: A recipe for viral content",
    description:
      "Research what's already winning, decode why, test with AI, then scale with real creators and ads.",
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
        <SelectionFeedback />
        <Analytics />
      </body>
    </html>
  );
}
