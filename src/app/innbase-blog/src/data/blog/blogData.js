// Blog configuration: the blog's own identity, its authors, and its topics.
// Posts live in ./posts and are indexed in ./posts/index.js.

import { SITE_URL } from "@/lib/seo";

export const BLOG = {
  path: "/blog",
  name: "The Innbase blog",
  // Title tag for /blog. The root layout appends " | Innbase".
  seoTitle: "Hotel Operations Blog for Nigerian Hospitality",
  description:
    "Practical guides on payment reconciliation, bar stock control, shift handovers, and guest requests for hotels, restaurants, and bars in Nigeria.",
  feedPath: "/blog/feed.xml",
  language: "en-NG",
  // Topic pages with fewer posts than this are kept out of search results
  // (noindex) and out of the sitemap until they have enough to be useful.
  minPostsForTopicPage: 2,
};

// One author entry per byline. Swap in a named person (with a profile URL)
// as soon as you have one; posts only reference the id.
export const AUTHORS = {
  team: {
    id: "team",
    name: "The Innbase team",
    type: "Organization",
    url: `${SITE_URL}/about`,
    bio: "We build Innbase, the operating system for hospitality, in Nigeria.",
  },
};

// icon names come from components/marketing/landing/LandingIcon.jsx
export const CATEGORIES = [
  {
    id: "payments",
    name: "Payments & revenue",
    seoTitle: "Hotel Payments & Revenue Guides",
    icon: "payments",
    headline: "Follow the money,",
    emphasis: "from sale to bank.",
    description:
      "How to match sales to payments, find where revenue slips away, and close each day with numbers you can explain.",
    intro:
      "Cash, POS, and bank transfers all land in different places. These guides show hotels, restaurants, and bars how to bring them back together, spot the gaps early, and keep a clear record of every decision.",
  },
  {
    id: "stock",
    name: "Stock & inventory",
    seoTitle: "Hotel Bar & Restaurant Stock Guides",
    icon: "inventory",
    headline: "Know what’s on the shelf,",
    emphasis: "and what should be.",
    description:
      "Counts, transfers, and variances for hotel bars, kitchens, and stores, explained so you can act on the gap.",
    intro:
      "A stock count is only useful next to the number you expected to find. These guides cover how to count, how to calculate a variance, and how to work out what it is telling you before you react.",
  },
  {
    id: "operations",
    name: "Shifts & guest service",
    seoTitle: "Hotel Shift & Guest Service Guides",
    icon: "shifts",
    headline: "A busy property,",
    emphasis: "in step.",
    description:
      "Handovers, guest requests, and the everyday routines that keep a busy property moving together.",
    intro:
      "Most service problems are handover problems: something important stayed in one person’s head. These guides look at the routines, checklists, and habits that keep every team and every guest request connected.",
  },
];
