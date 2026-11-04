import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Creators from "@/components/Creators";
import CreatorSteps from "@/components/CreatorSteps";
import CreatorInsights from "@/components/CreatorInsights";
import CreatorFAQ from "@/components/CreatorFAQ";
import CreatorJoin from "@/components/CreatorJoin";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HitRate for creators: your next post, already proven",
  description: "Make what’s already working. Paid brand deals that fit your audience are coming soon.",
  openGraph: {
    title: "HitRate for creators: your next post, already proven",
    description: "Make what’s already working. Paid brand deals that fit your audience are coming soon.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HitRate for creators",
    description: "Make what’s already working. Paid brand deals that fit your audience are coming soon.",
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
