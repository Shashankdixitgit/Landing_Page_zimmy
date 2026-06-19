import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import Founders from "@/components/Founders";
import CreatorKit from "@/components/CreatorKit";
import Testimonials from "@/components/Testimonials";
import Flow from "@/components/Flow";
import Technology from "@/components/Technology";
import Comparison from "@/components/Comparison";
import Solutions from "@/components/Solutions";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Founders />
        <CreatorKit />
        <Testimonials />
        <Flow />
        <Technology />
        <Comparison />
        <Solutions />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
