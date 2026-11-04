import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorsHero from "@/components/creators/CreatorsHero";
import HowItWorks from "@/components/creators/HowItWorks";
import { PlanSection, ProofSection, FaqSection, CloseSection } from "@/components/creators/CreatorsSections";

const TITLE = "HitRate for creators: know why your posts work";
const DESCRIPTION = "Your last 60 days, read against your own median. Your first 7 days, written.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title: "HitRate for creators", description: DESCRIPTION },
};

export default function CreatorsPage() {
  return (
    <>
      <Navbar overHero={false} onCreators />
      <main>
        <CreatorsHero />
        <HowItWorks />
        <PlanSection />
        <ProofSection />
        <FaqSection />
        <CloseSection />
      </main>
      <Footer />
    </>
  );
}
