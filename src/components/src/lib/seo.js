import { isValidElement, Children } from "react";

/**
 * Single source of truth for the production origin. Used for canonicals,
 * JSON-LD @id/url fields, and OG/Twitter absolute URLs so it only ever
 * needs to change in one place.
 */
export const SITE_URL = "https://innbase.co";
export const SITE_NAME = "Innbase";

/**
 * Converts a JSX node (e.g. an FAQ answer authored with <b> emphasis) into
 * plain text suitable for JSON-LD, by walking React children directly
 * (no react-dom/server — that's disallowed from Server Component modules
 * and would drag a rendering dependency into the RSC graph for no reason).
 * This lets structured data be generated FROM the same data the page
 * actually renders, instead of a hand-written copy that can silently drift
 * out of sync with the visible content.
 */
export function toPlainText(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join("");
  if (isValidElement(node)) {
    return Children.toArray(node.props.children).map(toPlainText).join("");
  }
  return "";
}

/** Builds an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

/**
 * Standard Open Graph image block. Because Next.js merges each route's
 * `metadata.openGraph` object shallowly (a child's `openGraph` REPLACES the
 * parent's rather than merging key-by-key), every page that defines its own
 * openGraph must re-include the image or it silently loses it. Centralizing
 * it here means that can't happen by omission again.
 */
export const DEFAULT_OG_IMAGE = {
  url: absoluteUrl("/og-image.png"),
  width: 1200,
  height: 630,
  alt: "Innbase — the AI operating system for hospitality",
};

/**
 * Builds a complete, self-contained Open Graph + Twitter metadata pair for
 * a page. Every field is explicit on purpose: since Next.js overwrites
 * (rather than merges) these nested objects per-route, a page that only
 * sets `title` here would otherwise lose siteName/type/images.
 */
export function buildSocialMetadata({ title, description, path, image }) {
  const url = absoluteUrl(path);
  const ogImage = image || DEFAULT_OG_IMAGE;
  return {
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

/**
 * BreadcrumbList JSON-LD for a one-level-deep marketing page. Safe to emit
 * even without a visible on-page breadcrumb trail — Google supports
 * breadcrumb structured data independent of visible UI, as long as it
 * accurately reflects the site's real hierarchy (which this does: every
 * subpage sits directly under Home).
 */
export function breadcrumbJsonLd(pageName, path) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: absoluteUrl(path),
      },
    ],
  };
}

/** Renders one or more JSON-LD objects as script tags. */
export function JsonLd({ data }) {
  const items = Array.isArray(data) ? data : [data];
  return items.map((item, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ));
}
