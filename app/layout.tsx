import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument",
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
    <html
      lang="en"
      className={`${geist.variable} ${bricolage.variable} ${instrument.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
