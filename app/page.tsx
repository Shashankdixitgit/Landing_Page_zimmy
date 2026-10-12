import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Philosophy from "@/components/Philosophy";
import BeforeAfter from "@/components/BeforeAfter";
import Journey from "@/components/Journey";
import WhyNow from "@/components/WhyNow";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Philosophy />
        <BeforeAfter />
        <Journey />
        <WhyNow />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
