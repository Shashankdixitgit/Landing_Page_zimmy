import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResearchDemo from "@/components/ResearchDemo";
import CreatorMap from "@/components/CreatorMap";
import Ladder from "@/components/Ladder";
import Flow from "@/components/Flow";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ResearchDemo />
        <CreatorMap />
        <Ladder />
        <Flow />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
