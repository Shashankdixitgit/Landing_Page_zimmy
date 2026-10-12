import Reveal from "./Reveal";
import { SplitHead } from "./ui";

const PLANS = [
  { name: "Free", note: "See what works", price: "No card needed" },
  { name: "Standard plans", note: "Test and prove", price: "Price to be announced" },
  { name: "Custom", note: "Bigger teams", price: "Price to be announced" },
] as const;

const ROWS: [string, string, string, string][] = [
  ["Competitors' winning videos", "1 app, updated weekly", "Several apps, updated daily", "Several brands and countries"],
  ["Product summary and customer phrases", "Yes", "Yes", "Yes, shared with the team"],
  ["AI videos", "1 finished video (watermarked download)", "Set by plan", "Set by you"],
  ["Posting accounts", "—", "Set by plan, already-warmed accounts optional", "Set by you"],
  ["Content calendar, edited by typing", "Preview only", "Yes", "Yes"],
  ["AI agent updates on WhatsApp or email", "Weekly competitor email only", "Yes", "Yes"],
  ["Full analytics and sales data connection", "—", "Yes", "Yes"],
  ["Creator briefs and ads", "—", "Yes", "Yes, with approval roles"],
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-5 sm:py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Free to find.
                <br />
                Pay when you post.
              </>
            }
            sub="The insights and your first finished video are free. Posting is paid, because that's where real costs start. Prices are to be announced."
          />
        </Reveal>

        {/* desktop: one table */}
        <Reveal delay={0.1} className="mt-12 hidden overflow-hidden rounded-[22px] border border-line bg-surface md:block">
          <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr] border-b border-line">
            <div className="px-6 py-5 text-[13.5px] text-muted">What you get</div>
            {PLANS.map((p, i) => (
              <div key={p.name} className={`px-5 py-5 ${i === 1 ? "bg-mint" : ""}`}>
                <p className={`text-[15px] font-medium ${i === 1 ? "text-accent" : "text-ink"}`}>{p.name}</p>
                <p className="mt-0.5 text-[12.5px] text-muted">{p.price}</p>
              </div>
            ))}
          </div>
          {ROWS.map(([label, ...cells], r) => (
            <div
              key={label}
              className={`grid grid-cols-[1.3fr_1fr_1fr_1fr] ${r < ROWS.length - 1 ? "border-b border-line" : ""}`}
            >
              <div className="px-6 py-3.5 text-[14px] text-ink">{label}</div>
              {cells.map((c, i) => (
                <div key={i} className={`px-5 py-3.5 text-[14px] ${i === 1 ? "bg-mint/50" : ""} ${c === "—" ? "text-faint" : "text-ink/85"}`}>
                  {c}
                </div>
              ))}
            </div>
          ))}
        </Reveal>

        {/* mobile: one card per plan */}
        <Reveal stagger={0.08} className="mt-10 grid gap-4 md:hidden">
          {PLANS.map((p, i) => (
            <article key={p.name} className={`rounded-[22px] border p-5 ${i === 1 ? "border-[#d5ecd0] bg-[#f5fbf3]" : "border-line bg-surface"}`}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className={`text-[18px] font-medium ${i === 1 ? "text-accent" : "text-ink"}`}>{p.name}</h3>
                <span className="text-[12.5px] text-muted">{p.price}</span>
              </div>
              <dl className="mt-4 divide-y divide-line border-t border-line">
                {ROWS.map(([label, ...cells]) => (
                  <div key={label} className="flex justify-between gap-4 py-2.5 text-[13.5px]">
                    <dt className="text-muted">{label}</dt>
                    <dd className={`max-w-[48%] text-right ${cells[i] === "—" ? "text-faint" : "font-medium text-ink"}`}>{cells[i]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </Reveal>

        <p className="mt-4 text-center text-[12.5px] text-muted">Plan sizes and prices are still being set. No card needed to start.</p>
      </div>
    </section>
  );
}
