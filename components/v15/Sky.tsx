import {
  Brain,
  BookOpen,
  Clapperboard,
  Dumbbell,
  Flame,
  Gamepad2,
  HeartPulse,
  Languages,
  Leaf,
  Moon,
  PiggyBank,
  Sparkles,
  Utensils,
  Wallet,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType, CSSProperties } from "react";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "./Brands";

/**
 * The hero's backdrop: a morning sky, and app icons floating around the
 * headline, some sharp and some out of focus. The default icons are made up (a
 * habit app, a budgeting app, a language app...), standing for the kind of app
 * HitRate is for; none is a real company's logo. A page can pass its own icons,
 * which take the same places.
 *
 * From tablet up the icons sit on a fixed 1440px stage centred on the page, so
 * they keep the same distance from the headline at every width; narrower windows
 * just crop the outer ones. Phones get three small icons near the top edge.
 */
/** brand: a platform mark, drawn a little larger since its shape has its own padding. */
export type SkyIcon = { Icon: LucideIcon | ComponentType<{ className?: string; strokeWidth?: number }>; bg: string; fg: string; brand?: boolean };

/**
 * Where each icon sits on the 1440px stage: x is its centre, y its top edge, in
 * px; then size, blur, tilt. Icons at y >= 600 hang from the hero's bottom edge.
 */
export type Spot = { x: number; y: number; size: number; blur?: number; r?: number; fade?: number };

/**
 * An icon shows only from the window width where it fits whole, with 16px to
 * spare, so none is ever cut off at the edge of the screen. Literal class names,
 * so Tailwind generates each one.
 */
function showFrom(s: Spot): string {
  const need = 2 * (Math.abs(s.x - 720) + s.size / 2 + 16);
  if (need <= 768) return "hidden md:grid";
  if (need <= 1024) return "hidden lg:grid";
  if (need <= 1152) return "hidden min-[1152px]:grid";
  if (need <= 1280) return "hidden xl:grid";
  if (need <= 1400) return "hidden min-[1400px]:grid";
  return "hidden 2xl:grid";
}

const SPOTS: Spot[] = [
  { x: 372, y: 86, size: 70, r: -8 },
  { x: 528, y: 66, size: 46, r: 6, blur: 0.6 },
  { x: 872, y: 58, size: 46, r: 8 },
  { x: 1020, y: 104, size: 66, r: -10 },
  { x: 1212, y: 182, size: 52, blur: 3, fade: 0.85 },
  { x: 180, y: 160, size: 52, blur: 2.6, r: 4 },
  { x: 214, y: 262, size: 58, r: -6, blur: 0.4 },
  { x: 1222, y: 300, size: 60, r: 7 },
  { x: 150, y: 384, size: 78, r: -10, blur: 0.4 },
  { x: 282, y: 470, size: 54, r: 8 },
  { x: 1300, y: 408, size: 76, r: 6, blur: 1.4 },
  { x: 1140, y: 476, size: 56, r: -4 },
  { x: 214, y: 640, size: 50, r: 6, blur: 2.6 },
  { x: 432, y: 700, size: 48, r: -6 },
  { x: 620, y: 742, size: 62, r: -4 },
  { x: 836, y: 748, size: 54, r: 10, blur: 0.8 },
  { x: 1000, y: 712, size: 42, r: -8 },
  { x: 1210, y: 640, size: 54, blur: 4, fade: 0.75 },
];

const APPS: SkyIcon[] = [
  { Icon: Sparkles, bg: "linear-gradient(150deg,#9b8cfb,#6b56ea)", fg: "#ffffff" },
  { Icon: YouTubeIcon, bg: "linear-gradient(150deg,#ffffff,#e9ebee)", fg: "#111", brand: true },
  { Icon: Flame, bg: "linear-gradient(150deg,#3b6f5e,#21443a)", fg: "#86e6b7" },
  { Icon: Clapperboard, bg: "linear-gradient(150deg,#ffffff,#d9dbde)", fg: "#3a3d42" },
  { Icon: TikTokIcon, bg: "linear-gradient(150deg,#ffffff,#eceef0)", fg: "#111", brand: true },
  { Icon: Brain, bg: "linear-gradient(150deg,#6e7178,#4a4d54)", fg: "#e8e9eb" },
  { Icon: BookOpen, bg: "linear-gradient(150deg,#ffffff,#e6e8eb)", fg: "#26282c" },
  { Icon: Wallet, bg: "linear-gradient(150deg,#ff8466,#ef5a3c)", fg: "#ffffff" },
  { Icon: Dumbbell, bg: "linear-gradient(150deg,#ecf86a,#cde03a)", fg: "#2b2c22" },
  { Icon: Gamepad2, bg: "linear-gradient(150deg,#45474c,#26282c)", fg: "#ffffff" },
  { Icon: HeartPulse, bg: "linear-gradient(150deg,#d05aa5,#a83d82)", fg: "#ffffff" },
  { Icon: Megaphone, bg: "linear-gradient(150deg,#55585e,#33363b)", fg: "#ffffff" },
  { Icon: Languages, bg: "linear-gradient(150deg,#7a7d83,#585b61)", fg: "#ffffff" },
  { Icon: Leaf, bg: "linear-gradient(150deg,#cfe9ff,#9fcdf3)", fg: "#2c6aa8" },
  { Icon: InstagramIcon, bg: "linear-gradient(150deg,#ffffff,#e9ebee)", fg: "#111", brand: true },
  { Icon: Utensils, bg: "linear-gradient(150deg,#ffffff,#e4e6e9)", fg: "#34363a" },
  { Icon: PiggyBank, bg: "linear-gradient(150deg,#ffffff,#e4e6e9)", fg: "#3a3c40" },
  { Icon: Moon, bg: "linear-gradient(150deg,#e9e6ff,#cfc9f5)", fg: "#7d74c9" },
];

/** Phones: three small icons along the top, clear of the eyebrow pill. */
const PHONE: { x: number; y: number; size: number; r: number; i: number }[] = [
  { x: 14, y: 78, size: 50, r: -8, i: 0 },
  { x: 52, y: 70, size: 36, r: 8, i: 2 },
  { x: 86, y: 96, size: 46, r: -10, i: 3 },
];

function tileStyle(size: number, icon: SkyIcon, place: CSSProperties, i: number, r = 0, blur?: number, fade?: number): CSSProperties {
  return {
    width: size,
    height: size,
    marginLeft: -size / 2,
    background: icon.bg,
    color: icon.fg,
    filter: blur ? `blur(${blur}px)` : undefined,
    opacity: fade,
    ...place,
    ...({ "--r": `${r}deg`, "--d": `${7 + (i % 5) * 1.3}s`, "--delay": `${-(i * 0.9)}s` } as CSSProperties),
  };
}

export default function Sky({
  quiet = false,
  icons = APPS,
  spots = SPOTS,
  base = 840,
}: {
  quiet?: boolean;
  icons?: SkyIcon[];
  spots?: Spot[];
  /** The hero height the bottom row was laid out for. */
  base?: number;
}) {
  return (
    <div className="bd-sky" data-quiet={quiet ? "" : undefined} aria-hidden>
      {/* low cloud banks */}
      <span className="bd-cloud" style={{ right: "-6%", top: "52%", width: "38%", height: "26%" }} />
      <span className="bd-cloud" style={{ right: "14%", top: "64%", width: "26%", height: "18%", opacity: 0.7 }} />
      <span className="bd-cloud" style={{ left: "-8%", top: "70%", width: "34%", height: "20%", opacity: 0.7 }} />
      <span className="bd-cloud" style={{ left: "-10%", top: "-14%", width: "36%", height: "36%", background: "#fffcf3", opacity: 0.7 }} />

      <div className="absolute inset-y-0 left-1/2 w-[1440px] -translate-x-1/2">
        {spots.map((s, i) => {
          const icon = icons[i % icons.length];
          return (
            // The bottom row hangs from the bottom edge, so when the hero grows
            // (a chat thread opens) it moves down with it.
            <span
              key={i}
              className={`bd-tile ${showFrom(s)}`}
              style={tileStyle(s.size, icon, { left: s.x, top: s.y >= 600 ? `calc(100% - ${base - s.y}px)` : s.y }, i, s.r, s.blur, s.fade)}
            >
              <icon.Icon strokeWidth={2.2} className={icon.brand ? "h-[62%] w-[62%]" : "h-[46%] w-[46%]"} />
            </span>
          );
        })}
      </div>

      {PHONE.map((s) => {
        const icon = icons[s.i % icons.length];
        return (
          <span key={s.i} className="bd-tile grid md:hidden" style={tileStyle(s.size, icon, { left: `${s.x}%`, top: s.y }, s.i, s.r)}>
            <icon.Icon strokeWidth={2.2} className={icon.brand ? "h-[62%] w-[62%]" : "h-[46%] w-[46%]"} />
          </span>
        );
      })}
    </div>
  );
}
