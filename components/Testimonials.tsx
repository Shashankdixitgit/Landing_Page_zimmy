import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const ITEMS = [
  {
    stat: "3.2×",
    statLabel: "more creators shipped",
    quote:
      "Zimmy felt like hiring a full influencer team overnight. We handed it the brief and it ran a campaign across dozens of creators.",
    name: "Maya Chen",
    role: "Head of Growth · Cardboard",
    bg: "bg-yellow",
  },
  {
    stat: "2.4×",
    statLabel: "return on creator spend",
    quote:
      "The scripts matched each creator's voice so well that engagement jumped, and we never touched a single DM.",
    name: "Daniel Brooks",
    role: "Marketing Lead · Agnost AI",
    bg: "bg-mint",
  },
  {
    stat: "+132%",
    statLabel: "revenue in a quarter",
    quote:
      "It took over the manual outreach and negotiation, so we could focus on strategy, and revenue jumped over the quarter.",
    name: "Priya Nair",
    role: "Growth · Supatest",
    bg: "bg-pink",
  },
  {
    stat: "9 days",
    statLabel: "to first campaign live",
    quote:
      "From kickoff to our first creators going live took barely a week, and the BigQuery attribution is finally clean.",
    name: "Sam Whitfield",
    role: "Performance · Docterz",
    bg: "bg-sky",
  },
];

export default function Testimonials() {
  return (
    <section id="proof" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel n="②">Receipts</SectionLabel>
          <h2 className="mt-6 max-w-2xl text-[34px] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[48px]">
            What our customers <span className="mark">say.</span>
          </h2>
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 grid gap-5 sm:grid-cols-2">
          {ITEMS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-[var(--radius-card)] border-2 border-ink bg-cream p-7 shadow-hard"
            >
              <div
                className={`inline-flex w-fit items-baseline gap-2 rounded-xl border-2 border-ink ${t.bg} px-4 py-2`}
              >
                <span className="text-[30px] font-bold leading-none tracking-[-0.03em] text-ink">
                  {t.stat}
                </span>
                <span className="text-[13px] font-semibold text-ink/70">
                  {t.statLabel}
                </span>
              </div>

              <blockquote className="mt-6 flex-1 text-[16.5px] font-medium leading-relaxed text-ink/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 border-t-2 border-ink/10 pt-5">
                <p className="text-[15px] font-bold text-ink">{t.name}</p>
                <p className="text-[13px] text-muted">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
