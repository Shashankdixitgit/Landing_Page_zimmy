import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorsHero from "@/components/creators/CreatorsHero";
import HowItWorks from "@/components/creators/HowItWorks";
import { PlanSection, ProofSection, FaqSection, CloseSection } from "@/components/creators/CreatorsSections";

const TITLE = "HitRate for creators: know why your posts work";
// No number: a scan reads 30 posts on most platforms but up to 100 on X, and the
// sample report under the hero is an X account rated on 49. Same words as the app.
const DESCRIPTION = "Your latest posts, read against your own median. Your first 7 days, written.";

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
