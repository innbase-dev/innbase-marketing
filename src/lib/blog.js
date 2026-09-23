import { isValidElement } from "react";
import { MARKETING_DESTINATIONS } from "@/data/marketingDestinations";
import { AUTHORS, BLOG, CATEGORIES } from "@/data/blog/blogData";
import { RAW_POSTS } from "@/data/blog/posts";
import { SITE_NAME, SITE_URL, absoluteUrl, buildSocialMetadata, toPlainText } from "@/lib/seo";

/* -------------------------------------------------------------------------- */
/* Small helpers                                                              */
/* -------------------------------------------------------------------------- */

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-09-16" -> "16 September 2026" (stable on server and client). */
export function formatDate(isoDate) {
  return dateFormat.format(new Date(`${isoDate}T00:00:00Z`));
}

/** Full ISO timestamp for schema and Open Graph, in West Africa Time. */
export function isoTimestamp(isoDate) {
  return `${isoDate}T08:00:00+01:00`;
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isParagraph(item) {
  return typeof item === "string" || isValidElement(item);
}

/** Blocks may be plain strings/JSX (paragraphs) or { type, ... } objects. */
function normalizeBody(body) {
  const seen = new Set(["faq", "main"]);
  return body.map((item) => {
    if (isParagraph(item)) return { type: "p", text: item };
    if (item.type === "h2" || item.type === "h3") {
      const base = slugify(toPlainText(item.text)) || "section";
      let id = base;
      for (let n = 2; seen.has(id); n += 1) id = `${base}-${n}`;
      seen.add(id);
      return { ...item, id };
    }
    return item;
  });
}

function blockText(block) {
  switch (block.type) {
    case "p":
    case "h2":
    case "h3":
      return toPlainText(block.text);
    case "callout":
      return `${block.title || ""} ${toPlainText(block.text)}`;
    case "quote":
      return `${toPlainText(block.text)} ${block.cite || ""}`;
    case "ul":
    case "ol":
      return block.items.map(toPlainText).join(" ");
    case "steps":
      return block.items.map((s) => `${s.title} ${toPlainText(s.body)}`).join(" ");
    case "table":
      return [block.caption, ...block.head, ...block.rows.flat()].filter(Boolean).join(" ");
    case "product":
      return toPlainText(block.text);
    case "figure":
      return block.caption || "";
    default:
      return "";
  }
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/* -------------------------------------------------------------------------- */
/* Validation: fail the build on broken content, warn on weak SEO             */
/* -------------------------------------------------------------------------- */

const RESERVED_SLUGS = ["category", "feed.xml", "og", "page", "tag", "rss"];
const REQUIRED = ["slug", "headline", "emphasis", "seoTitle", "description", "excerpt", "category", "author", "publishedAt", "body", "cover"];

function validatePosts(raws) {
  const errors = [];
  const warnings = [];
  const slugs = new Set();
  const categoryIds = new Set(CATEGORIES.map((c) => c.id));

  raws.forEach((raw, index) => {
    const label = `post #${index + 1} (${raw.slug || "no slug"})`;
    const fail = (message) => errors.push(`${label}: ${message}`);
    const warn = (message) => warnings.push(`${label}: ${message}`);

    REQUIRED.forEach((key) => {
      if (raw[key] == null || raw[key] === "") fail(`missing "${key}"`);
    });
    if (!raw.slug) return;

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(raw.slug)) fail("slug must be lowercase words joined by hyphens");
    if (RESERVED_SLUGS.includes(raw.slug)) fail(`"${raw.slug}" is a reserved slug`);
    if (slugs.has(raw.slug)) fail("duplicate slug");
    slugs.add(raw.slug);

    if (raw.category && !categoryIds.has(raw.category)) fail(`unknown category "${raw.category}"`);
    if (raw.author && !AUTHORS[raw.author]) fail(`unknown author "${raw.author}"`);

    if (!raw.cover?.src || !raw.cover?.alt) fail("cover needs an image source and meaningful alt text");
    if (!Number.isInteger(raw.cover?.width) || raw.cover.width <= 0 || !Number.isInteger(raw.cover?.height) || raw.cover.height <= 0) {
      fail("cover needs positive integer width and height");
    }

    const iso = /^\d{4}-\d{2}-\d{2}$/;
    if (raw.publishedAt && !iso.test(raw.publishedAt)) fail("publishedAt must be YYYY-MM-DD");
    if (raw.updatedAt && !iso.test(raw.updatedAt)) fail("updatedAt must be YYYY-MM-DD");
    if (raw.updatedAt && raw.publishedAt && raw.updatedAt < raw.publishedAt) fail("updatedAt is earlier than publishedAt");

    (raw.relatedProducts || []).forEach((id) => {
      if (!MARKETING_DESTINATIONS[id]) fail(`unknown related product "${id}"`);
    });
    (raw.body || []).forEach((block) => {
      if (block.type === "product" && !MARKETING_DESTINATIONS[block.id]) fail(`unknown product block "${block.id}"`);
      if (block.type === "figure" && !block.alt) fail("every figure needs alt text");
    });

    const h2Count = (raw.body || []).filter((b) => b.type === "h2").length;
    if (h2Count < 2) warn("fewer than two h2 sections; add structure for readers and search engines");
    if (raw.seoTitle && raw.seoTitle.length + " | Innbase".length > 62) warn(`title tag is ${raw.seoTitle.length + 10} characters; keep it near 60 or less`);
    if (raw.description && (raw.description.length < 110 || raw.description.length > 165)) warn(`meta description is ${raw.description.length} characters; aim for 110–160`);
    if (raw.excerpt && raw.excerpt.length > 190) warn("excerpt is long for a card");
  });

  if (warnings.length && process.env.NODE_ENV !== "production") {
    console.warn(`[blog] SEO notes:\n  - ${warnings.join("\n  - ")}`);
  }
  if (errors.length) {
    throw new Error(`[blog] Content problems:\n  - ${errors.join("\n  - ")}`);
  }
}

/* -------------------------------------------------------------------------- */
/* Post model                                                                 */
/* -------------------------------------------------------------------------- */

const CATEGORY_BY_ID = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, { ...c, path: `${BLOG.path}/category/${c.id}` }]),
);

function enrich(raw) {
  const body = normalizeBody(raw.body);
  const headings = body
    .filter((block) => block.type === "h2")
    .map(({ id, text }) => ({ id, text: toPlainText(text) }));
  const faqs = raw.faqs || [];
  if (faqs.length) headings.push({ id: "faq", text: "Common questions" });

  const text = [
    raw.headline,
    raw.emphasis,
    ...(raw.takeaways || []),
    ...body.map(blockText),
    ...faqs.map((f) => `${f.q} ${toPlainText(f.a)}`),
  ].join(" ");
  const wordCount = countWords(text);

  return {
    ...raw,
    body,
    faqs,
    headings,
    title: `${raw.headline} ${raw.emphasis}`,
    updatedAt: raw.updatedAt || raw.publishedAt,
    path: `${BLOG.path}/${raw.slug}`,
    category: CATEGORY_BY_ID[raw.category],
    author: AUTHORS[raw.author],
    tags: raw.tags || [],
    takeaways: raw.takeaways || [],
    relatedProducts: raw.relatedProducts || [],
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / 200)),
  };
}

let cache;
function load() {
  if (!cache) {
    validatePosts(RAW_POSTS);
    cache = RAW_POSTS.map(enrich).sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0));
  }
  return cache;
}

export function getPosts() {
  return load();
}

export function getPost(slug) {
  return load().find((post) => post.slug === slug);
}

export function getCategories() {
  return CATEGORIES.map((c) => ({
    ...CATEGORY_BY_ID[c.id],
    count: load().filter((post) => post.category.id === c.id).length,
  }));
}

export function getCategory(id) {
  return getCategories().find((category) => category.id === id);
}

export function getPostsByCategory(id) {
  return load().filter((post) => post.category.id === id);
}

/** Same topic first, then shared tags, then newest. */
export function getRelatedPosts(post, limit = 3) {
  return load()
    .filter((other) => other.slug !== post.slug)
    .map((other) => {
      const shared = other.tags.filter((tag) => post.tags.includes(tag)).length;
      return { other, score: (other.category.id === post.category.id ? 10 : 0) + shared };
    })
    .sort((a, b) => b.score - a.score || (a.other.publishedAt < b.other.publishedAt ? 1 : -1))
    .slice(0, limit)
    .map(({ other }) => other);
}

/** Topic pages need enough posts to be worth indexing. */
export function isTopicIndexable(category) {
  return category.count >= BLOG.minPostsForTopicPage;
}

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */

const RSS_ALTERNATE = { "application/rss+xml": [{ url: BLOG.feedPath, title: `${BLOG.name} RSS feed` }] };

export function ogImageFor(slug, version) {
  const path = slug ? `${BLOG.path}/og/${slug}` : `${BLOG.path}/og`;
  return absoluteUrl(version ? `${path}?v=${version}` : path);
}

function ogImage(slug, version, alt) {
  return { url: ogImageFor(slug, version), width: 1200, height: 630, alt };
}

export function buildBlogIndexMetadata({ title, description, path, robots, imageAlt }) {
  return {
    title,
    description,
    alternates: { canonical: path, types: RSS_ALTERNATE },
    ...(robots ? { robots } : {}),
    ...buildSocialMetadata({
      title,
      description,
      path,
      image: ogImage(null, null, imageAlt || "The Innbase blog: hotel operations, explained plainly"),
    }),
  };
}

export function buildPostMetadata(post) {
  const url = absoluteUrl(post.path);
  const image = ogImage(post.slug, post.updatedAt, `${post.title}, a guide from the Innbase blog`);
  return {
    title: post.seoTitle,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author.name, url: post.author.url }],
    alternates: { canonical: post.path, types: RSS_ALTERNATE },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: "en_NG",
      title: post.title,
      description: post.description,
      url,
      images: [image],
      publishedTime: isoTimestamp(post.publishedAt),
      modifiedTime: isoTimestamp(post.updatedAt),
      authors: [post.author.url],
      section: post.category.name,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Structured data (schema.org JSON-LD)                                       */
/* -------------------------------------------------------------------------- */

const ORG_REF = { "@id": `${SITE_URL}/#organization` };
const blogId = () => `${absoluteUrl(BLOG.path)}#blog`;

export function breadcrumbListJsonLd(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

function authorJsonLd(author) {
  return { "@type": author.type, name: author.name, url: author.url };
}

function postSummaryJsonLd(post) {
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(post.path)}#article`,
    headline: post.title,
    url: absoluteUrl(post.path),
    datePublished: isoTimestamp(post.publishedAt),
    dateModified: isoTimestamp(post.updatedAt),
    image: ogImageFor(post.slug, post.updatedAt),
  };
}

export function blogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": blogId(),
    url: absoluteUrl(BLOG.path),
    name: BLOG.name,
    description: BLOG.description,
    inLanguage: BLOG.language,
    publisher: ORG_REF,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    blogPost: load().map(postSummaryJsonLd),
  };
}

export function topicJsonLd(category, posts) {
  const url = absoluteUrl(category.path);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#topic`,
    url,
    name: `${category.name}: ${BLOG.name}`,
    description: category.description,
    inLanguage: BLOG.language,
    isPartOf: { "@id": blogId() },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(post.path),
        name: post.title,
      })),
    },
  };
}

export function postJsonLd(post) {
  const url = absoluteUrl(post.path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: post.title,
    description: post.description,
    image: [ogImageFor(post.slug, post.updatedAt)],
    datePublished: isoTimestamp(post.publishedAt),
    dateModified: isoTimestamp(post.updatedAt),
    author: authorJsonLd(post.author),
    publisher: ORG_REF,
    isPartOf: { "@id": blogId() },
    articleSection: post.category.name,
    keywords: post.tags.join(", "),
    wordCount: post.wordCount,
    inLanguage: BLOG.language,
  };
}

export function postFaqJsonLd(post) {
  if (!post.faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: toPlainText(item.a) },
    })),
  };
}
