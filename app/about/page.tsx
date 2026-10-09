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
    "Zimmy is built by an operator from Emergent, Bentolabs and Entrepreneur First who automated yearly campaign funnels worth $30M+.",
  openGraph: {
    title: "About Zimmy",
    description: "Viral content, researched first. Built by an operator from Emergent, Bentolabs and Entrepreneur First.",
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
