import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zimmy: Agentic AI Influencer Marketing, Run End-to-End",
  description:
    "Zimmy is the agentic AI that runs your influencer marketing end-to-end, creator discovery, outreach, negotiation, scripts, and clean revenue attribution. You stay in control.",
  metadataBase: new URL("https://zimmy.ai"),
  openGraph: {
    title: "Zimmy: Agentic AI Influencer Marketing",
    description:
      "Your entire influencer program, run by one AI operator. Discovery, outreach, scripts, and attribution, end to end.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={interTight.className}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
