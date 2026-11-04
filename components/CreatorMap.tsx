import Reveal from "./Reveal";
import DOTS from "@/lib/worldDots.json";

// Equirectangular: x = lon + 170 (0..360), y = 78 - lat (0..134). Dots come from Natural Earth land data.
const W = 360;
const H = 134;
const x = (lon: number) => ((lon + 170) / W) * 100;
const y = (lat: number) => ((78 - lat) / H) * 100;

type Pin = { lon: number; lat: number; market: string; wins: string; mobile?: boolean };

// One winning hook per market, named after the hook types HitRate tags. Illustrative, not real data.
const PINS: Pin[] = [
  { lon: -74.0, lat: 40.7, market: "US", wins: "Bold claim", mobile: true },
  { lon: -46.6, lat: -23.5, market: "Brazil", wins: "Result first", mobile: true },
  { lon: -0.1, lat: 51.5, market: "UK", wins: "Contrarian take", mobile: true },
  { lon: 3.4, lat: 6.5, market: "Nigeria", wins: "Question hook" },
  { lon: 72.8, lat: 19.1, market: "India", wins: "Personal story", mobile: true },
  { lon: 139.7, lat: 35.7, market: "Japan", wins: "Pattern interrupt" },
  { lon: 151.2, lat: -33.9, market: "Australia", wins: "Outcome promise" },
];

export default function CreatorMap() {
  return (
    <section id="markets" className="overflow-hidden px-5 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="display text-[36px] text-ink sm:text-[50px]">
          What wins in every market
          <br />
          your users are in.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-muted">
          Pick the markets your users are in, and HitRate shows the videos and ads winning there,
          so you start from formats that already work.
        </p>
      </Reveal>

      {/* tilted map; pins stand upright on it */}
      <div className="relative mx-auto mt-14 -ml-[30%] w-[160%] max-w-none [perspective:1400px] sm:mx-auto sm:w-full sm:max-w-[1150px]">
        <div className="relative [transform:rotateX(22deg)] [transform-style:preserve-3d]">
          <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" aria-hidden>
            {(DOTS as [number, number][]).map(([lon, lat], i) => (
              <circle key={i} cx={lon + 170} cy={78 - lat} r={0.72} fill="#b9c6c9" />
            ))}
          </svg>

          <Reveal stagger={0.05} className="absolute inset-0" aria-hidden>
            {PINS.map((p, i) => {
              return (
                <div
                  key={p.market}
                  className={`absolute ${p.mobile ? "" : "hidden sm:block"}`}
                  style={{ left: `${x(p.lon)}%`, top: `${y(p.lat)}%` }}
                >
                  {/* stand the pin up against the tilt, anchored at its base */}
                  <div className="floaty -translate-x-1/2 -translate-y-full [transform-origin:bottom] [transform:rotateX(-22deg)]" style={{ animationDelay: `${(i % 7) * 0.5}s` }}>
                    <div className="flex flex-col items-center">
                      <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-white bg-mint px-3 py-1.5 text-[11.5px] shadow-[0_8px_20px_-6px_rgb(25_41_45/0.45)] sm:px-3.5 sm:py-2 sm:text-[13px]">
                        <span className="font-semibold text-accent">{p.market}</span>
                        <span className="text-ink/70">{p.wins}</span>
                      </span>
                      <span className="h-5 w-[2px] rounded-full bg-gradient-to-b from-white to-[#b9c6c9] sm:h-8" />
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_4px_rgb(15_122_82/0.15)]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
      <p className="mt-6 text-center text-[12.5px] text-muted">Illustrative example</p>
    </section>
  );
}
