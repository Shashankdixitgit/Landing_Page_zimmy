import { Camera, Mic, PenLine, Video } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";
import DOTS from "@/lib/worldDots.json";

// Equirectangular: x = lon + 170 (0..360), y = 78 - lat (0..134). Dots come from Natural Earth land data.
const W = 360;
const H = 134;
const x = (lon: number) => ((lon + 170) / W) * 100;
const y = (lat: number) => ((78 - lat) / H) * 100;

type Pin = { lon: number; lat: number; img?: string; icon?: typeof Video };

// Major creator markets. Illustrative: who and where Zimmy researches, not a member count.
const PINS: Pin[] = [
  { lon: -118.2, lat: 34.0, img: "jay" },
  { lon: -74.0, lat: 40.7, icon: Video },
  { lon: -79.4, lat: 43.7, img: "ben" },
  { lon: -99.1, lat: 19.4, icon: PenLine },
  { lon: -46.6, lat: -23.5, img: "mira" },
  { lon: -58.4, lat: -34.6, icon: Camera },
  { lon: -0.1, lat: 51.5, img: "sana" },
  { lon: 13.4, lat: 52.5, icon: Mic },
  { lon: -3.7, lat: 40.4, img: "noor" },
  { lon: 3.4, lat: 6.5, icon: Video },
  { lon: 36.8, lat: -1.3, img: "camper" },
  { lon: 55.3, lat: 25.2, icon: Camera },
  { lon: 72.8, lat: 19.1, img: "mira" },
  { lon: 77.2, lat: 28.6, icon: PenLine },
  { lon: 77.6, lat: 13.0, img: "jay" },
  { lon: 103.8, lat: 1.35, img: "noor" },
  { lon: 106.8, lat: -6.2, icon: Mic },
  { lon: 126.9, lat: 37.6, img: "sana" },
  { lon: 139.7, lat: 35.7, icon: Video },
  { lon: 151.2, lat: -33.9, img: "ben" },
];

export default function CreatorMap() {
  return (
    <section id="markets" className="overflow-hidden px-5 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="display text-[36px] text-ink sm:text-[50px]">
          Creators in every market
          <br />
          you sell to.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-muted">
          From India and the Gulf to Europe and the US, Zimmy researches what works locally and finds
          creators whose audience is already there.
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
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className={`absolute ${i % 2 ? "hidden sm:block" : ""}`}
                  style={{ left: `${x(p.lon)}%`, top: `${y(p.lat)}%` }}
                >
                  {/* stand the pin up against the tilt, anchored at its base */}
                  <div className="floaty -translate-x-1/2 -translate-y-full [transform-origin:bottom] [transform:rotateX(-22deg)]" style={{ animationDelay: `${(i % 7) * 0.5}s` }}>
                    <div className="flex flex-col items-center">
                      <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border-2 border-white bg-mint text-accent shadow-[0_8px_20px_-6px_rgb(25_41_45/0.45)] sm:h-12 sm:w-12">
                        {p.img ? (
                          <Image src={`/creators/${p.img}.jpg`} alt="" width={48} height={48} className="h-full w-full object-cover" />
                        ) : Icon ? (
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.9} />
                        ) : null}
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
