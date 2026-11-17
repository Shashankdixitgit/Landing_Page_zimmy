import Reveal from "../Reveal";

/**
 * Okara puts a hairline logo wall here ("trusted by 150,000+"). HitRate has no
 * customer count worth printing, so the same grid carries something true: the
 * places the box actually reads before it answers.
 */
const CELLS: [string, string][] = [
  ["App Store", "Your page, your reviews"],
  ["Google Play", "The same, on Android"],
  ["TikTok", "What's winning in your category"],
  ["Instagram Reels", "Formats that repeat"],
  ["YouTube Shorts", "Hooks that hold"],
  ["Ad libraries", "What competitors pay to run"],
];

export default function ReadsGrid() {
  return (
    <section className="border-b border-ok-hair">
      <Reveal className="ok-cells mx-auto grid max-w-[1180px] grid-cols-2 border-l border-t border-ok-hair md:grid-cols-3">
        <div className="col-span-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 p-7 md:col-span-3">
          <p className="ok-label text-ok-faint">Where the answers come from</p>
          <p className="text-[16px] leading-relaxed text-ok-text">
            It reads the places your users already watch — not a prompt.
          </p>
        </div>
        {CELLS.map(([name, sub]) => (
          <div key={name} className="p-7">
            <p className="text-[16px] font-medium text-ok-text">{name}</p>
            <p className="ok-label mt-2 text-ok-faint">{sub}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
