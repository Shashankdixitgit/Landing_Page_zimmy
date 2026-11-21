import { Newsreader } from "next/font/google";

/**
 * The v16 look (sky, Newsreader serif, black buttons, white cards) as a wrapper.
 * Every rule in app/v15/v15.css needs `.bd` on an ancestor, so this div is what
 * switches the look on, and the rest of the site keeps its own theme.
 *
 * The stylesheet itself is imported by the route that uses this
 * (app/v16/layout.tsx), because Next.js expects global CSS to come in from the
 * app folder.
 */
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--f-serif",
  display: "swap",
  axes: ["opsz"],
});

export default function SkyTheme({ children }: { children: React.ReactNode }) {
  return <div className={`bd ${serif.variable}`}>{children}</div>;
}
