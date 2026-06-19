type Brand = {
  name: string;
  url: string;
  backer?: "YC" | "EF";
};

const BRANDS: Brand[] = [
  { name: "Cardboard", url: "https://www.usecardboard.com/", backer: "YC" },
  { name: "Agnost AI", url: "https://agnost.ai/", backer: "YC" },
  { name: "Supatest", url: "https://supatest.ai/" },
  { name: "Docterz", url: "https://docterz.in/" },
  { name: "Novelty", url: "https://www.novelty.sh/", backer: "EF" },
  { name: "Eddy Finance", url: "https://eddy.finance/" },
];

function BackerBadge({ backer }: { backer: "YC" | "EF" }) {
  return (
    <span className="inline-flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink/45">
      {backer === "YC" ? (
        <span
          aria-hidden
          className="inline-grid h-[13px] w-[13px] place-items-center rounded-[3px] bg-[#ed702e] text-[9px] font-bold leading-none text-white"
        >
          Y
        </span>
      ) : (
        <span
          aria-hidden
          className="inline-grid h-[13px] place-items-center rounded-[3px] bg-[#5b0dd5] px-[2.5px] text-[8px] font-extrabold leading-none text-[#ee7d55]"
        >
          EF
        </span>
      )}
      backed
    </span>
  );
}

export default function LogoStrip() {
  return (
    <section className="px-5 pb-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 rounded-2xl border-2 border-ink bg-cream px-6 py-5 shadow-hard md:flex-row md:gap-8">
        <p className="shrink-0 text-[12px] font-bold uppercase tracking-[0.14em] text-ink/60">
          Trusted by category-
          <br className="hidden md:block" />
          defining brands →
        </p>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-9 gap-y-3 md:justify-between">
          {BRANDS.map((b) => (
            <a
              key={b.name}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-end gap-1.5 whitespace-nowrap"
            >
              <span className="text-[19px] font-bold tracking-tight text-ink/35 transition-colors group-hover:text-ink">
                {b.name}
              </span>
              {b.backer ? (
                <span className="relative top-[2px]">
                  <BackerBadge backer={b.backer} />
                </span>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
