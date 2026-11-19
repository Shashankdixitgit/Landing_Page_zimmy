import { Newsreader } from "next/font/google";
import "../v15/v15.css";

/**
 * /v16 wears /v15's look (sky, Newsreader serif, black buttons, white cards) for
 * the chat-box thesis. Same scoped stylesheet, so the two stay in step.
 */
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--f-serif",
  display: "swap",
  axes: ["opsz"],
});

export default function V16Layout({ children }: { children: React.ReactNode }) {
  return <div className={`bd ${serif.variable}`}>{children}</div>;
}
