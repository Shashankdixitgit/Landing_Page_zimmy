import type { Metadata } from "next";
import { CheckCheck, MessageSquare, Search } from "lucide-react";
import { Nav, Footer } from "@/components/v15/Chrome";
import Proof from "@/components/v15/Proof";
import Questions from "@/components/v15/Questions";
import Closing from "@/components/v15/Closing";
import Reveal from "@/components/v15/Reveal";
import ChatHero from "@/components/v16/ChatHero";
import ExampleThread from "@/components/v16/ExampleThread";
import AskConsole from "@/components/v16/AskConsole";
import BusyWeek from "@/components/v16/BusyWeek";
import OneRead from "@/components/v16/OneRead";

/**
 * /v16: the /v10 thesis (run your whole marketing operation from one chat box)
 * in /v15's sky-and-serif look. The hero is a working chat box: a question is
 * met with "first, your app's link", and the link is read on the spot. Same
 * product facts and statuses as /v10 and the home page.
 *
 * robots: noindex, so it never competes with the real home page.
 */
export const metadata: Metadata = {
  title: "HitRate: run your entire marketing operation from a single chat box",
  description:
    "One chat box that reads your category first, then finds what's winning, writes the scripts and lays out the week. AI test videos and posting are in early access. Nothing goes out without your OK.",
  robots: { index: false, follow: false },
};

const QA = [
  {
    q: "Is it really just a chat box?",
    a: "That's where it's going. Today the research runs in the HitRate app, with its own pages for competitors, scripts and the calendar, and in the pilot the founders run it with you: you ask, they come back with the answer.",
  },
  {
    q: "What can it do today?",
    a: "Live: read your app, find the apps your users also watch, show their winning videos and ads country by country, write scripts from them and lay out a calendar. Early access: make your version as a short AI-made creator video and post it. Coming soon: taking a proven style to real creators and Meta ads, and reading installs by style.",
  },
  {
    q: "How do I start, and what does it cost?",
    a: "Paste your app's website above, then fill in a short sign-up (eight quick steps). A founder replies by email within 48 hours. App teams start on a paid four-week founding pilot ($1,500), done with the founders; the pricing page has the details.",
  },
  {
    q: "Does it post on its own?",
    a: "No. Every script, video and post waits for your approval, and nothing goes out from your accounts until you say yes.",
  },
  {
    q: "Why would a chat box beat a marketing team?",
    a: "It doesn't beat a team at taste. It beats one at the part that is just work: reading your competitors' recent videos, keeping a calendar honest, and making a cheap test before anyone spends on a style nobody has proved.",
  },
  {
    q: "Who is this for?",
    a: "Consumer app teams, starting with AI and consumer app startups: small teams where marketing is one person's half-job.",
  },
  {
    q: "Can it guarantee results?",
    a: "No one honestly can. It starts from videos already winning in your category and tests before you spend, so you are not starting from a guess.",
  },
];

export default function V16() {
  return (
    <>
      <Nav home="/v16" />
      <main>
        <ChatHero />
        <Proof
          title={
            <>
              Marketing is one person&rsquo;s half-job.
              <br className="hidden sm:block" /> This box does the half that&rsquo;s just work.
            </>
          }
          gets={[
            { Icon: Search, big: "One read", small: "of your category, before a word is written" },
            { Icon: MessageSquare, big: "Five jobs", small: "live today, four more on the way" },
            { Icon: CheckCheck, big: "Your yes", small: "before anything goes out" },
          ]}
        />

        <section className="px-5 py-24 sm:py-32">
          <Reveal className="mx-auto max-w-[640px] text-center">
            <p className="text-[12.5px] font-medium uppercase tracking-[0.12em] text-[var(--bd-faint)]">Illustrative example</p>
            <h2 className="serif mt-3 text-balance text-[34px] leading-tight text-[var(--bd-ink)] sm:text-[44px]">A whole marketing week, in one thread</h2>
            <p className="mx-auto mt-4 max-w-[480px] text-balance text-[15px] text-[var(--bd-muted)]">
              Pathly is a made-up career app and its numbers are made up; the reels are real, by @unscripted.nishant. Each answer shows whether that part of HitRate is live today.
            </p>
            <div className="mt-10">
              <ExampleThread />
            </div>
          </Reveal>
        </section>

        <AskConsole />
        <BusyWeek />
        <OneRead />
        <Questions items={QA} />
        <Closing
          title="Your marketing, from one box"
          sub="Paste your app&rsquo;s website. We read it here, then a short sign-up."
          button="Read my app"
        />
      </main>
      <Footer />
    </>
  );
}
