import { Plus } from "lucide-react";
import Reveal from "./Reveal";

/** The home page's answers, word for word where they are already right. */
export const QA = [
  { q: "Who is HitRate for?", a: "Consumer app teams. We're starting with AI and consumer app startups." },
  {
    q: "What's live today?",
    a: "Paste your app link and see your competitors' winning videos and ads, a summary of your product from its store reviews, AI-written scripts and a content calendar. Early access: AI UGC test videos and posting them. Coming soon: scaling the winner through UGC, real creators and paid ads.",
  },
  {
    q: "Why test with AI UGC first?",
    a: "Most marketing spend goes on formats nobody knew would work until the money is already gone. AI UGC is a cheap way to find the winning format first. Real creators and paid ads are how you scale it.",
  },
  {
    q: "Whose accounts do the tests post from?",
    a: "Your own. Testing is in early access, so this starts once you're let in, and nothing posts until you approve it.",
  },
  { q: "Do I stay in control?", a: "Always. You approve every script, video and post before it goes out, and you decide which winner to scale." },
  {
    q: "Can HitRate guarantee results?",
    a: "No one honestly can. HitRate starts from videos already winning for your competitors and tests before you spend, so you are not starting from a guess.",
  },
];

export default function Questions({ items = QA }: { items?: { q: string; a: string }[] }) {
  return (
    <section className="px-5 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-[680px]">
        <h2 className="serif text-center text-[34px] leading-tight text-[var(--bd-ink)] sm:text-[44px]">Questions</h2>
        <div className="mt-10 divide-y divide-[var(--bd-line)] border-y border-[var(--bd-line)]">
          {items.map(({ q, a }) => (
            <details key={q} className="group py-1">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-[16px] font-medium text-[var(--bd-ink)]">
                {q}
                <Plus className="bd-plus h-4 w-4 shrink-0 text-[var(--bd-muted)] transition-transform duration-200" aria-hidden />
              </summary>
              <p className="pb-5 pr-8 text-[14.5px] leading-relaxed text-[var(--bd-muted)]">{a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
