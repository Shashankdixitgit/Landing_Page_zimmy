import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import MissionValues from "@/components/about/MissionValues";
import FounderNote from "@/components/about/FounderNote";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About HitRate",
  description:
    "HitRate is built by Abhisha Shrivastava and Shashank Dixit, who ran and automated creator marketing at Emergent, inside $90M+ a year of total marketing spend.",
  openGraph: {
    title: "About HitRate",
    description: "Creator marketing anyone can run. Built by two operators from Emergent.",
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
