import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.meta.description}`;

// The share card: the name in the display serif on the bond ground, with the
// redline under it. Same palette as the page, no gradients.
export default async function Image() {
  const serif = await fetch(
    new URL(
      "https://cdn.jsdelivr.net/fontsource/fonts/source-serif-4@latest/latin-400-normal.ttf",
    ),
  ).then((r) => r.arrayBuffer());
  const mono = await fetch(
    new URL(
      "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.ttf",
    ),
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F1EEE8",
          padding: "72px",
          fontFamily: "Source Serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Plex Mono",
            fontSize: 22,
            letterSpacing: "0.04em",
            color: "#6B6660",
          }}
        >
          mohitxmaurya.vercel.app
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              letterSpacing: "-0.018em",
              color: "#1A1714",
              lineHeight: 1.1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              width: 300,
              height: 4,
              background: "#B8322A",
              marginTop: 28,
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Plex Mono",
              fontSize: 26,
              color: "#44403A",
              marginTop: 32,
              lineHeight: 1.5,
            }}
          >
            Full stack engineer in Bengaluru
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Plex Mono",
            fontSize: 22,
            letterSpacing: "0.04em",
            color: "#2B5171",
          }}
        >
          Loylty Rewardz · before, ContraVault AI
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Source Serif", data: serif, style: "normal", weight: 400 },
        { name: "Plex Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
