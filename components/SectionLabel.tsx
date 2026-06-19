export default function SectionLabel({
  n,
  children,
  dark = false,
}: {
  n: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 px-1 py-1 pr-3.5 text-[12.5px] font-bold uppercase tracking-[0.14em] ${
        dark ? "border-cream/30 text-cream/80" : "border-ink bg-cream text-ink/80"
      }`}
    >
      <span
        className={`grid h-6 w-6 place-items-center rounded-full text-[12px] ${
          dark ? "bg-cream text-ink" : "bg-accent text-white"
        }`}
      >
        {n}
      </span>
      {children}
    </span>
  );
}
