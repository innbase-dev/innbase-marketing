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
      url: "https://innbase.co/contact",
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://innbase.co/legal",
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
