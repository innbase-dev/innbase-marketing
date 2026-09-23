import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared by app/blog/opengraph-image.jsx and app/blog/og/[slug]/route.js so
// the index card and every post card come from one visual, not two that can
// drift apart. Kept out of `lib/` because it imports next/og, which only
// resolves in the Node/Edge image-generation runtime, not in RSC.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

let fontsPromise;
export function loadFonts() {
  if (!fontsPromise) {
    const dir = join(process.cwd(), "public", "fonts");
    fontsPromise = Promise.all([
      readFile(join(dir, "instrument-sans-500.woff")),
      readFile(join(dir, "instrument-sans-600.woff")),
      readFile(join(dir, "instrument-sans-700.woff")),
      readFile(join(dir, "instrument-serif-italic.woff")),
    ]).then(([sans500, sans600, sans700, serifItalic]) => [
      { name: "Sans", data: sans500, weight: 500, style: "normal" },
      { name: "Sans", data: sans600, weight: 600, style: "normal" },
      { name: "Sans", data: sans700, weight: 700, style: "normal" },
      { name: "Serif", data: serifItalic, weight: 400, style: "italic" },
    ]);
  }
  return fontsPromise;
}

const INK = "#101714";
const PAPER = "#f8f9f6";
const APRICOT = "#f3bc80";
const SAGE = "rgba(248, 249, 246, 0.6)";

/**
 * @param {{ eyebrow: string, headline: string, emphasis: string, meta: string }} props
 */
export function CardVisual({ eyebrow, headline, emphasis, meta }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "76px 88px",
        background: INK,
        backgroundImage:
          "radial-gradient(circle at 84% 12%, rgba(243,188,128,0.16), rgba(243,188,128,0) 60%)",
        fontFamily: "Sans",
        color: PAPER,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 34, height: 2, background: APRICOT, display: "flex" }} />
        <span
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: APRICOT,
            display: "flex",
          }}
        >
          {eyebrow}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, display: "flex" }}>
          {headline}
        </span>
        <span
          style={{
            fontFamily: "Serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 74,
            lineHeight: 1.08,
            color: APRICOT,
            display: "flex",
          }}
        >
          {emphasis}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 24,
          color: SAGE,
        }}
      >
        <span style={{ display: "flex", fontWeight: 600, color: PAPER }}>Innbase</span>
        <span style={{ display: "flex" }}>{meta}</span>
      </div>
    </div>
  );
}
