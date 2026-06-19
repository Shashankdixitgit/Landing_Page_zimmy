import { ImageResponse } from "next/og";

export const alt =
  "Zimmy — your entire influencer program, run by one AI operator.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#15120b";
const PAPER = "#fbf4e0";
const ACCENT = "#f23a35";

const CARDS = [
  {
    tag: "RESULT · 01",
    stat: "12×",
    label: "faster to launch a campaign",
    brand: "Eddy Finance",
    bg: "#ffd66b",
    rotate: "-5deg",
    top: 2,
    left: 70,
  },
  {
    tag: "RESULT · 02",
    stat: "+128%",
    label: "attributed revenue",
    brand: "Supatest",
    bg: "#9be7c4",
    rotate: "4deg",
    top: 168,
    left: 180,
  },
  {
    tag: "RESULT · 03",
    stat: "−41%",
    label: "lower cost per acquisition",
    brand: "Agnost AI",
    bg: "#ffb8d1",
    rotate: "-2deg",
    top: 330,
    left: 40,
  },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          color: INK,
          padding: 56,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 600,
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                width: 48,
                height: 48,
                borderRadius: 13,
                background: ACCENT,
                border: `3px solid ${INK}`,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="27" height="27" viewBox="0 0 24 24" fill="#fff">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800 }}>zimmy</div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 44,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: "#6b675c",
            }}
          >
            <div
              style={{
                display: "flex",
                background: ACCENT,
                color: "#fff",
                borderRadius: 999,
                padding: "4px 13px",
                border: `2px solid ${INK}`,
              }}
            >
              New
            </div>
            <div style={{ display: "flex" }}>Agentic AI × Done-for-you</div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 26,
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -2.2,
            }}
          >
            <span style={{ marginRight: 16 }}>
              Your entire influencer program, run by
            </span>
            <span style={{ color: ACCENT }}>one AI operator.</span>
          </div>
        </div>

        {/* RIGHT — floating stat cards */}
        <div style={{ display: "flex", position: "relative", flex: 1 }}>
          {CARDS.map((c) => (
            <div
              key={c.tag}
              style={{
                position: "absolute",
                top: c.top,
                left: c.left,
                display: "flex",
                flexDirection: "column",
                width: 290,
                background: c.bg,
                border: `3px solid ${INK}`,
                borderRadius: 20,
                padding: 22,
                boxShadow: `8px 8px 0 ${INK}`,
                transform: `rotate(${c.rotate})`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "rgba(21,18,11,0.7)",
                }}
              >
                {c.tag}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 52,
                  fontWeight: 800,
                  letterSpacing: -2,
                  marginTop: 8,
                }}
              >
                {c.stat}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 16,
                  marginTop: 6,
                  color: "rgba(21,18,11,0.78)",
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 20,
                  fontWeight: 800,
                  marginTop: 18,
                }}
              >
                {c.brand}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
