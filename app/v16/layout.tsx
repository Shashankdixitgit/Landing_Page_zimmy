import "../v15/v15.css";
import SkyTheme from "@/components/v16/SkyTheme";

/**
 * /v16 wears /v15's look (sky, Newsreader serif, black buttons, white cards) for
 * the chat-box thesis. Same scoped stylesheet, so the two stay in step.
 */
export default function V16Layout({ children }: { children: React.ReactNode }) {
  return <SkyTheme>{children}</SkyTheme>;
}
