import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResearchDemo from "@/components/ResearchDemo";
import Services from "@/components/Services";
import Ladder from "@/components/Ladder";
import Flow from "@/components/Flow";
import Reel from "@/components/Reel";
import Technology from "@/components/Technology";
import Comparison from "@/components/Comparison";
import Solutions from "@/components/Solutions";
import Creators from "@/components/Creators";
import Founders from "@/components/Founders";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import TalkChip from "@/components/TalkChip";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ResearchDemo />
        <Services />
        <Ladder />
        <Flow />
        <Reel />
        <Technology />
        <Comparison />
        <Solutions />
        <Creators />
        <Founders />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <TalkChip />
    </>
  );
}
