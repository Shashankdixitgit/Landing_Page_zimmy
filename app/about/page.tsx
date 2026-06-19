import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import MissionValues from "@/components/about/MissionValues";
import FounderNote from "@/components/about/FounderNote";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Zimmy",
  description:
    "Zimmy is built by the engineers and marketers behind Bentolabs and Emergent, with a founder who automated yearly campaign funnels worth up to $30M.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <MissionValues />
        <FounderNote />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
