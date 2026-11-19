import Image from "next/image";
import { ArrowUpRight, Clapperboard, FlaskConical, PenLine, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { DEMO_HREF } from "../ui";
import Reveal from "./Reveal";

/**
 * Right under the hero: the one belief behind HitRate, who to talk to, and the
 * three things you get. No user counts or ratings: HitRate is in early access
 * and the page only says what is true today.
 */
export type Get = { Icon: LucideIcon; big: string; small: string };

const GETS: Get[] = [
  { Icon: Clapperboard, big: "Winning videos", small: "your competitors', country by country" },
  { Icon: PenLine, big: "Scripts", small: "from the winners, in a calendar" },
  { Icon: FlaskConical, big: "AI test videos", small: "early access · nothing posts without your OK" },
];

export default function Proof({ title, gets = GETS }: { title?: ReactNode; gets?: Get[] }) {
  return (
    <section className="px-5 pb-8 pt-4">
      <Reveal className="mx-auto max-w-[720px] text-center">
        <h2 className="serif text-balance text-[30px] leading-[1.18] text-[var(--bd-ink)] sm:text-[38px]">
          {title ?? (
            <>
              Brands don&rsquo;t need more videos.
              <br className="hidden sm:block" /> They need to know which video to pay for.
            </>
          )}
        </h2>

        <a href={DEMO_HREF} className="group mt-6 inline-flex items-center gap-3 text-left">
          <Image
            src="/v16/founder-face.jpg"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-[0_1px_3px_rgb(0_0_0/0.15)]"
          />
          <span>
            <span className="block text-[14px] font-semibold text-[var(--bd-ink)]">Talk to a founder</span>
            <span className="flex items-center gap-1 text-[13px] text-[var(--bd-muted)] group-hover:text-[var(--bd-ink)]">
              Book a 30-minute demo <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </span>
        </a>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-[860px]">
        <ul className="grid border-y border-[var(--bd-line)] sm:grid-cols-3 sm:divide-x sm:divide-[var(--bd-line)]">
          {gets.map(({ Icon, big, small }) => (
            <li key={big} className="flex flex-col items-center px-6 py-8 text-center max-sm:border-b max-sm:border-[var(--bd-line)] max-sm:last:border-b-0">
              <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-white text-[var(--bd-ink)] shadow-[0_1px_2px_rgb(17_17_17/0.06),0_0_0_1px_rgb(17_17_17/0.06),0_8px_18px_-8px_rgb(17_17_17/0.18)]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <p className="serif mt-5 text-[30px] leading-none text-[var(--bd-ink)]">{big}</p>
              <p className="mx-auto mt-2.5 max-w-[230px] text-balance text-[13.5px] text-[var(--bd-muted)]">{small}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
