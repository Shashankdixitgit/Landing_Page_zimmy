import { DM_Sans, Sora, JetBrains_Mono } from "next/font/google";

/**
 * /v10 runs its own type system — Sora for display, DM Sans for body, JetBrains
 * Mono for the small uppercase labels. Scoped to this route so the rest of the
 * site keeps Inter and the light HitRate theme.
 */
const sora = Sora({ subsets: ["latin"], variable: "--f-sora", display: "swap", weight: ["400", "500", "600", "700"] });
const dm = DM_Sans({ subsets: ["latin"], variable: "--f-dm", display: "swap" });
const jet = JetBrains_Mono({ subsets: ["latin"], variable: "--f-jet", display: "swap", weight: ["400", "500"] });

export default function V10Layout({ children }: { children: React.ReactNode }) {
  return <div className={`okara ${sora.variable} ${dm.variable} ${jet.variable}`}>{children}</div>;
}
