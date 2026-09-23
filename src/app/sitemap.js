import { LANDING_PAGES } from "@/data/marketingLandingPages";
import { SITE_URL } from "@/lib/seo";
import { BLOG } from "@/data/blog/blogData";
import { getCategories, getPosts, isTopicIndexable } from "@/lib/blog";

// Only entries whose content genuinely changes on a predictable cadence get
// a `lastModified` of "now" (evaluated once, at build time, since this
// route has no dynamic APIs forcing per-request rendering — so it reflects
// deploy time, not a live clock). Legal text doesn't move on the same
// schedule as marketing pages, so it isn't given a weekly-freshness signal
// it can't back up; omitting lastModified there lets Google use its own
// crawl-observed date instead of a guessed one.
const buildTime = new Date();

export default function sitemap() {
  return [
    {
      url: "https://innbase.co",
      lastModified: buildTime,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://innbase.co/pricing",
      lastModified: buildTime,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://innbase.co/about",
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://innbase.co/guest-companion",
      lastModified: buildTime,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: "https://innbase.co/assistant",
      lastModified: buildTime,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://innbase.co/contact",
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://innbase.co/refer",
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://innbase.co/legal",
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...LANDING_PAGES.map(({ href }) => ({
      url: `${SITE_URL}${href}`,
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}${BLOG.path}`,
      lastModified: buildTime,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getCategories().filter(isTopicIndexable).map((category) => ({
      url: `${SITE_URL}${category.path}`,
      lastModified: buildTime,
      changeFrequency: "weekly",
      priority: 0.6,
    })),
    // Authored dates avoid presenting every build as an article rewrite.
    ...getPosts().map((post) => ({
      url: `${SITE_URL}${post.path}`,
      lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
      changeFrequency: "monthly",
      priority: 0.65,
      images: [`${SITE_URL}${post.cover.src}`],
    })),
  ];
}
