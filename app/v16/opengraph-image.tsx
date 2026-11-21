import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CAMPAIGNS, campaignOf } from "@/lib/campaigns";

/**
 * The picture a link to hitrate.sh/v16 shows when shared (Slack, X, LinkedIn...).
 * It draws /v16's hero: a light sky, the category line in the Newsreader serif,
 * and the chat box with the campaign chips under it.
 *
 * /v16 only. Every other page keeps the root's share image (app/opengraph-image.tsx).
 */
export const alt = "HitRate: run your entire marketing from a single chat box.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#111111";
const MUTED = "#63666a";
const LINE = "rgba(17,17,17,0.08)";
const GREEN = "#1f9d63";
// A plain linear sky: the image renderer (Satori) handles linear gradients reliably.
const SKY = "linear-gradient(180deg, #bcd3e2 0%, #d7e5ee 50%, #f2f6f8 100%)";

/** The startable campaigns, in the chat box's order (Meta ads first, shown as picked). */
const CHIPS = CAMPAIGNS.map((c) => c.label);

/**
 * Newsreader, the serif of the site's headlines. The image renderer can't use
 * the web font the pages load (that one is woff2, which it doesn't read), so a
 * TrueType copy sits in assets/fonts: the 72pt "display" cut, regular weight,
 * from Google Fonts. It's under the SIL Open Font License
 * (https://openfontlicense.org), which allows bundling it like this.
 * If the file can't be read, the image still renders, in the default sans-serif.
 *
 * Handing the renderer our own font replaces its built-in sans-serif (Geist)
 * rather than adding to it, so Geist is read back in from where Next.js ships it
 * and used for everything that isn't a headline. If a Next.js update ever moves
 * that file, the small text simply falls back to the serif too.
 *
 * Each path is written out in full inside the readFile call, not passed in as a
 * variable: when the site is built, Next.js works out which files a route needs
 * by reading the code, and it can only follow a path it can see. A variable path
 * can make it pack the whole project into this route.
 */
const toArrayBuffer = (buf: Buffer | null): ArrayBuffer | null =>
  buf ? (buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer) : null;

export default async function OpengraphImage() {
  const [serifFile, sansFile] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Newsreader72pt-Regular.ttf")).catch(() => null),
    readFile(join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf")).catch(() => null),
  ]);
  const serif = toArrayBuffer(serifFile);
  const sans = toArrayBuffer(sansFile);
  const headline = serif ? "Newsreader" : "sans-serif";
  const fonts = serif
    ? [
        { name: "Newsreader", data: serif, weight: 400 as const, style: "normal" as const },
        ...(sans ? [{ name: "Geist", data: sans, weight: 400 as const, style: "normal" as const }] : []),
      ]
    : undefined;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // centred top to bottom, so the sky frames the box evenly
          justifyContent: "center",
          background: SKY,
          color: INK,
          padding: "40px 64px",
          fontFamily: serif && sans ? "Geist" : headline,
        }}
      >
        {/* the mark and name */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="44" height="44" viewBox="0 0 48 48">
            <path d="M6 40 V33 A5 5 0 0 1 16 33 V40 M16 40 V26 A6 6 0 0 1 28 26 V40" fill="none" stroke="#19292d" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 40 V17 A7 7 0 0 1 42 17 V40" fill="none" stroke="#2fb57a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 32, fontFamily: headline, letterSpacing: -0.5 }}>HitRate</div>
        </div>

        {/* the category line, in the serif */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 30,
            fontSize: 68,
            lineHeight: 1.04,
            letterSpacing: -1.6,
            fontFamily: headline,
          }}
        >
          <span>Run your entire marketing</span>
          <span>from a single chat box</span>
        </div>

        {/* the chat box on a white card, with the campaign chips under it, as on the page */}
        <div style={{ display: "flex", flexDirection: "column", width: 840, marginTop: 38 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#ffffff",
              borderRadius: 26,
              border: `1px solid ${LINE}`,
              boxShadow: "0 24px 50px -24px rgba(17,17,17,0.35)",
              padding: "22px 22px 16px 26px",
            }}
          >
            {/* Meta ads' own placeholder (the campaign picked when the page opens), so the picture matches the page */}
            <div style={{ display: "flex", fontSize: 21, color: "#767676" }}>{campaignOf("ads").placeholder}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 26 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* green only marks what's live */}
                <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: GREEN }} />
                <div style={{ display: "flex", fontSize: 18, color: MUTED }}>Research and scripts live today · nothing spends without your OK</div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 46,
                  height: 46,
                  borderRadius: 999,
                  background: INK,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 16 }}>
            {CHIPS.map((t, i) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "9px 18px",
                  fontSize: 18,
                  borderRadius: 14,
                  background: i === 0 ? "#ffffff" : "rgba(255,255,255,0.7)",
                  border: i === 0 ? `1.5px solid ${INK}` : `1px solid ${LINE}`,
                  color: i === 0 ? INK : MUTED,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
