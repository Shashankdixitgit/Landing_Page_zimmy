import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Creators from "@/components/Creators";
import ResearchDemo from "@/components/ResearchDemo";
import Ladder from "@/components/Ladder";
import Flow from "@/components/Flow";
import Founders from "@/components/Founders";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Creators />
        <ResearchDemo />
        <Ladder />
        <Flow />
        <Founders />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
