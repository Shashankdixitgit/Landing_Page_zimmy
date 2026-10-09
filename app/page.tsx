import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Flow from "@/components/Flow";
import Reel from "@/components/Reel";
import Technology from "@/components/Technology";
import Comparison from "@/components/Comparison";
import Solutions from "@/components/Solutions";
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
        <Ticker />
        <Services />
        <Flow />
        <Reel />
        <Technology />
        <Comparison />
        <Solutions />
        <Founders />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
