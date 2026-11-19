import { Newsreader } from "next/font/google";
import "./v15.css";

/**
 * /v15 runs its own look: a soft sky, one serif for headlines (Newsreader),
 * Inter for everything else, black buttons and quiet white cards. The idea is a
 * calm, editorial page where one input does the talking. Everything is scoped
 * under .bd so the rest of the site keeps its own theme.
 */
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--f-serif",
  display: "swap",
  axes: ["opsz"],
});

export default function V15Layout({ children }: { children: React.ReactNode }) {
  return <div className={`bd ${serif.variable}`}>{children}</div>;
}
