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
  title: "Zimmy: The AI Operator for Influencer Marketing",
  description:
    "Zimmy runs your influencer marketing end-to-end: it finds the right creators, handles outreach and negotiation, writes the scripts, and ties every post to real revenue. You approve every step.",
  metadataBase: new URL("https://www.zimmy.art"),
  openGraph: {
    title: "Zimmy: The AI Operator for Influencer Marketing",
    description:
      "Creators found, signed, scripted and tracked to revenue, by one AI operator. You approve every step.",
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
