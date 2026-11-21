import { CheckCheck, Megaphone, Search } from "lucide-react";
import { Nav, Footer } from "@/components/v16/Chrome";
import Proof from "@/components/v15/Proof";
import Questions from "@/components/v16/Questions";
import Reveal from "@/components/v15/Reveal";
import ChatHero from "@/components/v16/ChatHero";
import CampaignCards from "@/components/v16/CampaignCards";
import ExampleThread from "@/components/v16/ExampleThread";
import AskConsole from "@/components/v16/AskConsole";
import BusyWeek from "@/components/v16/BusyWeek";
import OneRead from "@/components/v16/OneRead";
import StartClosing from "@/components/v16/StartClosing";

/**
 * The chat-box page at hitrate.sh/v16: "run your entire marketing from a single chat box".
 *
 * Kept short on purpose (Shashank: "super clean, never overwhelming"), and each
 * section says one thing:
 * 1. the chat box, with the campaigns as chips under it;
 * 2. the belief and the three things you get;
 * 3. every campaign as a card you can start from;
 * 4. one example chat, to show how a chat runs (one ask, then one question at
 *    a time, every step waiting for your OK);
 * 5. questions, and a last nudge back to the box.
 * The research → script → test video → launch story is told once, in (4). It
 * used to be told four times, by four animations (AskConsole, BusyWeek and
 * OneRead were removed for that, 20 Nov 2026).
 *
 * Only /v16 renders this (noindex; hitrate.sh/ keeps its own home page). It must
 * sit inside <SkyTheme> with app/v15/v15.css loaded (app/v16/layout.tsx does both).
 *
 * The chat box and the campaign cards both hand off to the app's chat workspace
 * (app.hitrate.sh/research), which signs the visitor in and runs.
 */

export const HOME_TITLE = "HitRate: run your entire marketing from a single chat box";
export const HOME_DESCRIPTION =
  "Run your app's marketing from one chat box. Start with Meta ads or creator marketing (early access): research, a script or brief, a test video, then the launch, with your OK at every step.";

/**
 * Every answer here has to match what the app does today:
 * - live: research (your app, your closest competitors, their top videos and ads
 *   from the last 60 days), scripts and creator briefs;
 * - early access: the AI test video (one per account), Meta ads (once the ad
 *   account is connected) and finding and inviting creators;
 * - coming: UGC, email, WhatsApp and posting to your own accounts.
 * App teams start on a paid pilot, never "free".
 */
const QA = [
  {
    q: "Is it really just a chat box?",
    a: "Yes, for the main job. You say what you want and pick a campaign: Meta ads or creator marketing to start. A workspace opens with HitRate's questions on the left, one at a time, and the live work on the right. In that one chat it researches your category and writes the script or the creator brief. For a Meta ad it also makes an AI test video and builds the ad; for creators it finds people who fit and drafts their invites (both in early access). In the pilot, the founders work with you too.",
  },
  {
    q: "What can it do today?",
    a: "Live: read your app from its site or store page, find your closest competitors, rank their winning videos and ads from the last 60 days, and write a script or a creator brief for your app. Early access: an AI test video of your script (one per account); a Meta ad built on your own ad account once you connect it; and finding creators who fit and drafting their invites. Coming next: UGC, email campaigns, WhatsApp and posting to your own accounts.",
  },
  {
    q: "How do I start, and what does it cost?",
    a: "Type what you want in the chat box at the top of this page and pick a campaign, then sign in with Google or an email code. HitRate starts with your app's link and asks for the rest one question at a time. App teams start on a paid four-week founding pilot ($1,500), done with the founders; the pricing page has the details.",
  },
  {
    q: "Will it spend or send anything on its own?",
    a: "No. Every script, video, ad and invite waits for your OK. A Meta ad is built paused on your own ad account and only starts after you confirm the daily budget and the dates. In the chat, creator invites go out only when you approve them. Posting, email and WhatsApp aren't live yet, and they'll work the same way.",
  },
  {
    q: "Why would a chat box beat a marketing team?",
    a: "It doesn't beat a team at taste. It beats one at the part that is just work: reading your competitors' recent videos and ads, writing the first draft, and making a cheap test before anyone spends on a style nobody has proved.",
  },
  {
    q: "Who is this for?",
    a: "Consumer app teams, starting with AI and consumer app startups: small teams without a marketing department of their own.",
  },
  {
    q: "Can it guarantee results?",
    a: "No one honestly can. It starts from videos already winning in your category and tests before you spend, so you are not starting from a guess.",
  },
];

/** `home` is where the logo in the top bar points, and where its Campaigns menu links go: "/v16". */
export default function ChatHome({ home }: { home: string }) {
  return (
    <>
      <Nav home={home} />
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
            { Icon: Megaphone, big: "Two to start", small: "Meta ads and creator marketing, in early access. UGC, email and WhatsApp next." },
            { Icon: CheckCheck, big: "Your yes", small: "before anything posts, spends or sends" },
          ]}
        />

        <CampaignCards />

        {/* id="how": an anchor for "How it works" links to this page (/v16#how). */}
        <section id="how" className="bg-[#fafafa] px-5 py-24 sm:py-32">
          <Reveal className="mx-auto max-w-[640px] text-center">
            <p className="text-[12.5px] font-medium uppercase tracking-[0.12em] text-[var(--bd-faint)]">How a chat runs · illustrative example</p>
            <h2 className="serif mt-3 text-balance text-[34px] leading-tight text-[var(--bd-ink)] sm:text-[44px]">You ask once. It asks the rest.</h2>
            <p className="mx-auto mt-4 max-w-[500px] text-balance text-[15px] text-[var(--bd-muted)]">
              One sentence starts the chat. Then HitRate does the work and asks one question at a time, and you answer with a click. Pathly is a made-up career app with made-up numbers; the reels are real, by @unscripted.nishant.
            </p>
            <div className="mt-10">
              <ExampleThread />
            </div>
          </Reveal>
        </section>

        {/* The earlier /v16 sections, back in their original order after the example thread. */}
        <AskConsole />
        <BusyWeek />
        <OneRead />

        <Questions id="faq" items={QA} />
        <StartClosing />
      </main>
      <Footer />
    </>
  );
}
