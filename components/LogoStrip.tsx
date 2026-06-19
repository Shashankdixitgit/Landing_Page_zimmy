const BRANDS = ["Nuvora", "Brightwell", "Lumora", "Cedar & Co", "Verda", "Kindred"];

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
            <span
              key={b}
              className="whitespace-nowrap text-[19px] font-bold tracking-tight text-ink/35"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
