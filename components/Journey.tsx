import Reveal from "./Reveal";
import { SplitHead } from "./ui";

const STEPS = [
  {
    n: "1",
    title: "See what works",
    when: "First 5 minutes",
    body: "Paste your link. Zimmy works out your competitors and shows the 3–10 best creator videos and ads about them, each with its numbers and why it worked.",
    get: "Competitors' best videos and ads",
    ask: "A free sign-up, after the first 3",
  },
  {
    n: "2",
    title: "See your app in a video",
    when: "About 15 minutes",
    body: "Zimmy takes the winner that fits you best, adds an opening line from your own app reviews, and makes one finished AI video with real footage of your app.",
    get: "One finished AI video of your app",
    ask: "One tap",
  },
  {
    n: "3",
    title: "Plan your month",
    when: "About 10 minutes",
    body: "Pick a plan. A full posting calendar unlocks, planned to the day. Change it by typing, like “no posts on Diwali weekend”.",
    get: "A full calendar you edit by typing",
    ask: "Payment",
  },
  {
    n: "4",
    title: "Go live",
    when: "When accounts are ready",
    body: "Zimmy sets up and warms new TikTok, Instagram, YouTube and Facebook accounts, then posts on schedule. An AI agent sends you updates.",
    get: "Posts live, updates on WhatsApp or email",
    ask: "Nothing",
  },
  {
    n: "5",
    title: "Prove it",
    when: "First results",
    body: "See every winning video side by side across platforms, with a clear verdict per format: do more, tweak it or stop.",
    get: "Full analytics on every winner",
    ask: "Sales data, only after first results",
  },
  {
    n: "6",
    title: "Grow",
    when: "Ongoing",
    body: "Hand proven ideas to real creators with a brief that wrote itself, or export them as ready-to-run TikTok and Meta ads.",
    get: "Proven ideas for creators and ads",
    ask: "Budget and team",
  },
];

export default function Journey() {
  return (
    <section id="how" className="px-4 py-20 sm:px-5 sm:py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                How it works.
                <br />
                Give first, ask later.
              </>
            }
            sub="Every step gives you something before it asks for more. You see your competitors' best videos before we ask for anything."
          />
        </Reveal>

        <Reveal stagger={0.07} as="ol" className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="flex flex-col rounded-[22px] border border-line bg-surface p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-sky text-[13px] font-semibold text-[#235a80]">
                  {s.n}
                </span>
                <span className="rounded-md bg-soft px-2 py-0.5 text-[11.5px] font-medium text-muted">{s.when}</span>
              </div>
              <h3 className="display mt-5 text-[24px] text-ink">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
              <dl className="mt-auto grid gap-2 pt-6 text-[13.5px]">
                <div className="rounded-xl bg-mint px-3.5 py-2.5">
                  <dt className="text-[12px] font-medium text-accent">You get</dt>
                  <dd className="mt-0.5 font-medium text-ink">{s.get}</dd>
                </div>
                <div className="rounded-xl bg-soft px-3.5 py-2.5">
                  <dt className="text-[12px] font-medium text-muted">We ask</dt>
                  <dd className="mt-0.5 text-ink">{s.ask}</dd>
                </div>
              </dl>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
