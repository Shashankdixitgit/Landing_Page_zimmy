import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import MissionValues from "@/components/about/MissionValues";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About HitRate",
  description:
    "HitRate makes creator marketing anyone can run.",
  openGraph: {
    title: "About HitRate",
    description: "Creator marketing anyone can run.",
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
        <CTA />
      </main>
      <Footer />
    </>
  );
}
