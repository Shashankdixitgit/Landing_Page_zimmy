import type { Metadata } from "next";
import V10Nav from "@/components/v10/V10Nav";
import ChatHero from "@/components/v10/ChatHero";
import ReadsGrid from "@/components/v10/ReadsGrid";
import Steps from "@/components/v10/Steps";
import AskAnything from "@/components/v10/AskAnything";
import Replaces from "@/components/v10/Replaces";
import ChatFAQ from "@/components/v10/ChatFAQ";
import ChatCTA from "@/components/v10/ChatCTA";
import V10Footer from "@/components/v10/V10Footer";

/**
 * /v10 — a positioning variant of the home page.
 *
 * Same product, one thesis: you run your whole marketing operation from a
 * single chat box. Built in its own visual system (okara.ai's warm near-black,
 * Sora + DM Sans + JetBrains Mono, square corners) so it reads as a different
 * company's pitch, not a reskin of hitrate.sh — that is the point of the test.
 *
 * robots: noindex so it never competes with the real home page.
 */
export const metadata: Metadata = {
  title: "HitRate: the AI growth team in one chat box",
  description:
    "Enter your website. HitRate finds the videos already winning in your category, writes the scripts, makes the test videos, posts the ones you approve, and tells you which one brought users.",
  robots: { index: false, follow: false },
};

export default function V10() {
  return (
    <>
      <V10Nav />
      <main>
        <ChatHero />
        <ReadsGrid />
        <Steps />
        <AskAnything />
        <Replaces />
        <ChatFAQ />
        <ChatCTA />
      </main>
      <V10Footer />
    </>
  );
}
