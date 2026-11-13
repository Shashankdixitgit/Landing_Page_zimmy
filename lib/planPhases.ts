// The 60-day plan's shape, copied from the HitRate creator app (hitrate repo,
// lib/plan-phases.ts and PRO_PRICE_USD in lib/constants.ts). Keep the two in step.

export type Phase = {
  key: "experiment" | "double_down" | "scale" | "own";
  from: number;
  to: number;
  name: string;
  line: string;
};

export const PHASES: Phase[] = [
  {
    key: "experiment",
    from: 1,
    to: 15,
    name: "Experiment",
    line: "Fifteen posts. Most build on what already works for you; the rest each test one new thing.",
  },
  {
    key: "double_down",
    from: 16,
    to: 30,
    name: "Double down",
    line: "After day 15, what beat your median gets repeated and what did not is dropped.",
  },
  {
    key: "scale",
    from: 31,
    to: 45,
    name: "Scale",
    line: "The winners become series: the same subject with new hooks and new formats.",
  },
  {
    key: "own",
    from: 46,
    to: 60,
    name: "Own it",
    line: "The two or three subjects your audience follows you for, posted on a rhythm. That is your personal brand.",
  },
];

export const PLAN_DAYS = 60;
export const FREE_DAYS = 7;
/** The days written up front. Everything after waits for the day-15 read. */
export const WRITTEN_DAYS = 15;
export const PRO_PRICE_USD = 20;

/**
 * Founding mode: Pro sales are paused until Dodo enables live payments, and the
 * app gives signed-in owners days 8-15 free meanwhile. The app reads its own
 * PRO_SALES_PAUSED env (lib/founding.ts); this site cannot. Production opens
 * sales only when that env is set to 0 (live Dodo keys alone do not open them).
 * Flip this to false and redeploy this site in the same step as putting in the
 * live Dodo keys and setting the app's PRO_SALES_PAUSED=0, or the FAQ and the
 * Terms keep promising free days the app has started charging for.
 */
export const PRO_SALES_PAUSED = true;

/** What a scan reads (hitrate lib/scrape/types.ts POST_LIMIT): the newest 30 posts, 100 on X,
 *  going further back than 60 days when an account posts less often. */
export const POSTS_READ = 30;
export const POSTS_READ_X = 100;
/** How many signals each post is rated on (hitrate lib/constants.ts SIGNAL_COUNT). */
export const SIGNAL_COUNT = 74;

export const KIND_BY_DAY: ("proven" | "experiment")[] = [
  "proven", "proven", "experiment", "proven", "experiment", "proven", "experiment",
  "proven", "experiment", "proven", "proven", "experiment", "proven", "experiment", "proven",
];

export function phaseOf(day: number): Phase {
  return PHASES.find((p) => day >= p.from && day <= p.to) ?? PHASES[PHASES.length - 1];
}

/** The platforms the creator app reads, in its own order (hitrate lib/platforms.ts). */
export const PLATFORM_LIST = "X, TikTok, Instagram, LinkedIn and YouTube";
