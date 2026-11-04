import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import MissionValues from "@/components/about/MissionValues";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About HitRate",
  description:
    "HitRate helps consumer app teams find which short video will bring users before they spend on it.",
  openGraph: {
    title: "About HitRate",
    description: "Test video ads with AI before paying creators.",
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
