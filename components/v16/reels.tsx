import Image from "next/image";
import { Play } from "lucide-react";
import { InstagramIcon } from "../v15/Brands";

/**
 * @unscripted.nishant's reels, as HitRate read them on 5 Sept 2026: 45 days of
 * posts against his usual of 20.7K views. Nishant is part of HitRate and the
 * company has the rights to use his videos, name and face. Covers live in
 * public/v16/nishant; each one opens the real reel on Instagram.
 */
export const NISHANT = {
  handle: "@unscripted.nishant",
  url: "https://www.instagram.com/unscripted.nishant/",
  name: "Nishant",
  followers: "106K",
  usual: "20.7K",
  niche: "Careers, jobs and AI tools",
  face: "/v16/nishant/face.jpg",
};

export type Reel = { code: string; kind: string; title: string; views: string; times: string };

export const REELS: Record<"jobs" | "certs" | "metro" | "salary" | "vlog", Reel> = {
  jobs: { code: "DbOC5gwsqOR", kind: "Tier list", title: "Ranking work-from-home job sites", views: "478K", times: "23×" },
  certs: { code: "DbgT_toMEm6", kind: "Tier list", title: "Ranking AI certificates", views: "152K", times: "7.4×" },
  metro: { code: "DbU3flmsOnp", kind: "Story", title: "A hackathon inside a metro", views: "48K", times: "2.3×" },
  salary: { code: "Dcn_SANsahn", kind: "Salary story", title: "The Microsoft offer", views: "46K", times: "2.6×" },
  vlog: { code: "DcYxc6vTdPE", kind: "Day in the life", title: "Room tour in Dubai", views: "34K", times: "1.7×" },
};

export const reelUrl = (r: Reel) => `https://www.instagram.com/p/${r.code}/`;
export const reelCover = (r: Reel) => `/v16/nishant/${r.code}.jpg`;

/**
 * A reel cover as a small 9:16 card: the real cover, the Instagram mark, and
 * optionally its views and how it did against his usual. Opens the reel.
 */
export function ReelCard({
  reel,
  className = "w-[74px]",
  stats = false,
  sizes = "120px",
  play = true,
  badge = true,
}: {
  reel: Reel;
  className?: string;
  stats?: boolean;
  sizes?: string;
  play?: boolean;
  /** The Instagram mark in the corner; off for thumbnails too small to carry it. */
  badge?: boolean;
}) {
  return (
    <a
      href={reelUrl(reel)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${reel.title}, a reel by ${NISHANT.handle}, ${reel.views} views. Opens on Instagram.`}
      className={`group relative block aspect-[9/16] shrink-0 overflow-hidden rounded-[12px] bg-[#dfe3e7] ${className}`}
    >
      <Image src={reelCover(reel)} alt="" fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" aria-hidden />
      {badge ? (
        <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-md bg-white/90" aria-hidden>
          <InstagramIcon className="h-3.5 w-3.5" />
        </span>
      ) : null}
      {play ? (
        <span className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#111]" aria-hidden>
          <Play className="ml-0.5 h-3 w-3" fill="currentColor" />
        </span>
      ) : null}
      {stats ? (
        <>
          <span className="absolute left-1.5 top-1.5 rounded-full bg-[#111] px-1.5 py-0.5 text-[10px] font-semibold text-white">{reel.times} usual</span>
          <span className="absolute bottom-1.5 left-1.5 text-[10.5px] font-medium text-white [text-shadow:0_1px_6px_rgb(0_0_0/0.5)]">{reel.views} views</span>
        </>
      ) : null}
    </a>
  );
}
