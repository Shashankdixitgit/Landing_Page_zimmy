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
  title: "Zimmy: Creator marketing that sells",
  description:
    "Zimmy finds what is already selling in your niche, briefs vetted creators on proven hooks, runs the campaign and reports results. For D2C and consumer-app brands.",
  metadataBase: new URL("https://www.zimmy.art"),
  openGraph: {
    title: "Zimmy: Creator marketing that sells",
    description:
      "Zimmy finds what is already selling in your niche, briefs vetted creators on proven hooks, runs the campaign and reports results. For D2C and consumer-app brands.",
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
