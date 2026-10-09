import { ImageResponse } from "next/og";

export const alt = "Zimmy: creators found, deals done, every sale tracked.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NIGHT = "#19292d";
const SNOW = "#ffffff";
const MUTED = "rgba(255,255,255,0.85)";
const ACCENT = "#f2493a";
const SKY = "linear-gradient(180deg, #2e78b8 0%, #4f97cf 40%, #8cc0e4 75%, #cfe6ef 100%)";

// Illustrative creator cards, same look as the hero.
const CARDS = [
  { a: "#4cc9f0", b: "#3a0ca3", d: "#0b0a24", status: "Negotiating", left: 40, top: 120, rotate: "-9deg", z: 1 },
  { a: "#ffb703", b: "#fb5607", d: "#2a0d05", status: "Live · tracking", left: 200, top: 70, rotate: "0deg", z: 3 },
  { a: "#ff99c8", b: "#a05195", d: "#1e0c1f", status: "Shortlisted", left: 360, top: 120, rotate: "9deg", z: 2 },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: SKY,
          color: SNOW,
          padding: 64,
          position: "relative",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", width: 600, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                width: 48,
                height: 48,
                borderRadius: 13,
                background: ACCENT,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="27" height="27" viewBox="0 0 24 24" fill="#fff">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
            </div>
            <div style={{ fontSize: 34, fontWeight: 800 }}>zimmy</div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: 1.6,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            The AI operator for influencer marketing
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 22,
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: -2.6,
            }}
          >
            <span style={{ width: "100%" }}>Creators found.</span>
            <span style={{ width: "100%" }}>Deals done.</span>
            <span>Every sale tracked.</span>
          </div>
        </div>

        {/* RIGHT: creator cards */}
        <div style={{ display: "flex", position: "relative", flex: 1 }}>
          {CARDS.map((c) => (
            <div
              key={c.status}
              style={{
                position: "absolute",
                left: c.left,
                top: c.top,
                width: 200,
                height: 356,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 18,
                borderRadius: 22,
                border: "1px solid rgba(255,255,255,0.14)",
                background: `radial-gradient(120% 70% at 30% 18%, ${c.a} 0%, rgba(0,0,0,0) 60%), radial-gradient(90% 60% at 85% 70%, ${c.b} 0%, rgba(0,0,0,0) 70%), ${c.d}`,
                transform: `rotate(${c.rotate})`,
                boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  background: c.status.startsWith("Live") ? "#d6f5c9" : "rgba(255,255,255,0.92)",
                  color: NIGHT,
                  fontSize: 15,
                  fontWeight: 700,
                  borderRadius: 999,
                  padding: "6px 14px",
                }}
              >
                {c.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
