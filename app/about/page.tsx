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
    "Zimmy is built by an IIT Madras graduate and operator from Emergent and Entrepreneur First who automated the creator pipeline and built analytics across $90M+ a year in marketing spend.",
  openGraph: {
    title: "About Zimmy",
    description: "Creator marketing anyone can run. Built by an operator from Emergent and Entrepreneur First.",
    type: "website",
  },
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
