import type { Metadata } from "next";
import { Nav, Footer } from "@/components/v15/Chrome";
import Hero from "@/components/v15/Hero";
import Proof from "@/components/v15/Proof";
import ExampleRun from "@/components/v15/ExampleRun";
import HowItWorks from "@/components/v15/HowItWorks";
import Questions from "@/components/v15/Questions";
import Closing from "@/components/v15/Closing";

/**
 * /v15: the home page in a calm, editorial look. A morning sky, a serif
 * headline and one input that reads your app on the spot and shows the run.
 * Same product and the same facts as hitrate.sh; only the presentation is new.
 *
 * robots: noindex, so it never competes with the real home page.
 */
export const metadata: Metadata = {
  title: "HitRate: find the videos already winning for apps like yours",
  description:
    "Paste your app link. HitRate finds the videos and ads already winning for your competitors and writes scripts from them. In early access, it tests your version with AI-made creator videos before you pay real creators.",
  robots: { index: false, follow: false },
};

export default function V15() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Proof />
        <ExampleRun />
        <HowItWorks />
        <Questions />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
