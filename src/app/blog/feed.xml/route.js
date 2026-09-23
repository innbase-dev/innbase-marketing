import { NextResponse } from "next/server";
import { BLOG } from "@/data/blog/blogData";
import { getPosts, isoTimestamp } from "@/lib/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

export const revalidate = false; // rebuilt only on deploy, same as the posts it lists

function escapeXml(value) {
  return String(value).replace(/[<>&'"]/g, (char) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[char]),
  );
}

// Plain-text excerpt as the item body: RSS <description> is read in feed
// readers and email digests where the site's CSS doesn't apply, so full HTML
// article markup would be more to maintain than it's worth here.
function itemXml(post) {
  const url = absoluteUrl(post.path);
  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(isoTimestamp(post.publishedAt)).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <author>${escapeXml(post.author.name)}</author>
      <category>${escapeXml(post.category.name)}</category>
    </item>`;
}

export async function GET() {
  const posts = getPosts();
  const lastBuildDate = posts.length ? new Date(isoTimestamp(posts[0].publishedAt)).toUTCString() : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BLOG.name)}</title>
    <link>${absoluteUrl(BLOG.path)}</link>
    <atom:link href="${absoluteUrl(BLOG.feedPath)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(BLOG.description)}</description>
    <language>${BLOG.language}</language>
    <generator>${escapeXml(SITE_NAME)}</generator>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${posts.map(itemXml).join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
