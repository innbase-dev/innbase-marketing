import { ImageResponse } from "next/og";
import { CardVisual, loadFonts, size, contentType } from "@/lib/blogOgImage";
import { BLOG } from "@/data/blog/blogData";

export const runtime = "nodejs";
export const revalidate = false; // content only changes on deploy
export { size, contentType };

export async function GET() {
  const fonts = await loadFonts();
  return new ImageResponse(
    (
      <CardVisual
        eyebrow="THE INNBASE BLOG"
        headline="Hotel operations,"
        emphasis="explained plainly."
        meta={BLOG.path.replace("/", "innbase.co/")}
      />
    ),
    { ...size, fonts },
  );
}
