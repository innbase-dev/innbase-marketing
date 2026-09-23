import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { CardVisual, loadFonts, size, contentType } from "@/lib/blogOgImage";
import { getPost, getPosts, formatDate } from "@/lib/blog";

export const runtime = "nodejs";
export const dynamicParams = false;
export const revalidate = false; // one image per slug, rebuilt only on deploy
export { size, contentType };

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function GET(_request, { params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const fonts = await loadFonts();
  return new ImageResponse(
    (
      <CardVisual
        eyebrow={post.category.name}
        headline={post.headline}
        emphasis={post.emphasis}
        meta={`${formatDate(post.publishedAt)} · ${post.readingMinutes} min read`}
      />
    ),
    { ...size, fonts },
  );
}
