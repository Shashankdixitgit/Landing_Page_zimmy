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
  title: "Zimmy: Find your winning video before you pay for it",
  description:
    "Zimmy finds the video formats already winning for your competitors and tests your own versions cheaply with AI. It shows which ones bring in real customers, so your creator and ad budgets go only behind what's proven.",
  metadataBase: new URL("https://www.zimmy.art"),
  openGraph: {
    title: "Zimmy: Find your winning video before you pay for it",
    description:
      "See the videos already winning for your competitors, test your own versions cheaply with AI, and scale only what's proven. Free to start.",
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
