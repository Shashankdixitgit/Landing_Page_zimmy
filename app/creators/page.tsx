import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Creators from "@/components/Creators";
import CreatorSteps from "@/components/CreatorSteps";
import CreatorFAQ from "@/components/CreatorFAQ";
import CreatorJoin from "@/components/CreatorJoin";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zimmy for creators: your next post, already proven",
  description: "See what's taking off in your niche, post it, and get paid by brands that fit your audience.",
};

export default function CreatorsPage() {
  return (
    <>
      <Navbar overHero={false} />
      <main>
        <Creators asHero />
        <CreatorSteps />
        <CreatorFAQ />
        <CreatorJoin />
      </main>
      <Footer />
    </>
  );
}
