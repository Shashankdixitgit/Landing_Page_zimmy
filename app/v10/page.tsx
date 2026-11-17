import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatHero from "@/components/v10/ChatHero";
import AskAnything from "@/components/v10/AskAnything";
import Replaces from "@/components/v10/Replaces";
import Control from "@/components/v10/Control";
import ChatFAQ from "@/components/v10/ChatFAQ";
import ChatCTA from "@/components/v10/ChatCTA";

/**
 * /v10 — a positioning variant of the home page.
 *
 * Same product, one thesis instead of three steps: you run your whole marketing
 * operation from a single chat box. Kept out of search (robots: noindex) so it
 * never competes with the real home page while it is being tested.
 */
export const metadata: Metadata = {
  title: "HitRate: run your whole marketing from one chat box",
  description:
    "Ask for it the way you would ask a team. HitRate finds the videos already winning in your category, writes the scripts, makes the test videos, posts the ones you approve, and tells you which one brought users.",
  robots: { index: false, follow: false },
};

export default function V10() {
  return (
    <>
      <Navbar />
      <main>
        <ChatHero />
        <AskAnything />
        <Replaces />
        <Control />
        <ChatFAQ />
        <ChatCTA />
      </main>
      <Footer />
    </>
  );
}
