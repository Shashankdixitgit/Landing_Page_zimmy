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
  title: "HitRate: Test video ads with AI before paying creators",
  description:
    "HitRate helps consumer app teams find which short video will bring users before they spend on it. Paste your app link to see the videos and ads winning for your competitors.",
  metadataBase: new URL("https://hitrate.sh"),
  openGraph: {
    title: "HitRate: Test video ads with AI before paying creators",
    description:
      "Find what's winning for your competitors. Test your version with AI UGC. Scale the one that brings users.",
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
