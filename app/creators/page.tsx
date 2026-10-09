import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Creators from "@/components/Creators";
import CreatorSteps from "@/components/CreatorSteps";
import CreatorInsights from "@/components/CreatorInsights";
import CreatorFAQ from "@/components/CreatorFAQ";
import CreatorJoin from "@/components/CreatorJoin";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zimmy for creators: your next post, already proven",
  description: "Get paid brand deals that fit your audience, and learn why your best posts hit.",
  openGraph: {
    title: "Zimmy for creators: your next post, already proven",
    description: "Get paid brand deals that fit your audience, and learn why your best posts hit.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zimmy for creators",
    description: "Get paid brand deals that fit your audience, and learn why your best posts hit.",
  },
};

export default function CreatorsPage() {
  return (
    <>
      <Navbar overHero={false} onCreators />
      <main>
        <Creators asHero />
        <CreatorInsights />
        <CreatorSteps />
        <CreatorFAQ />
        <CreatorJoin />
      </main>
      <Footer />
    </>
  );
}
