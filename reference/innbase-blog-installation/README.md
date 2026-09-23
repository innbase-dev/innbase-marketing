# The Innbase blog — what's in this package

A full `/blog` section built to match the existing marketing site's brand,
component patterns, and SEO conventions. Everything here was written, run
in `next dev`, and screenshotted (desktop + mobile) against your actual
`marketing.css` and `MarketingShell` before being packaged.

## How to install

This zip mirrors your repo's folder structure. Copy everything under `src/`
and `public/` into the matching paths in your project, then:

```
npm install   # no new dependencies were added — nothing to add here
npm run dev
```

Two files already exist in your repo and were **edited**, not replaced —
see "Edited files" below before overwriting them, in case you've since
changed them yourself.

## New routes

| Route                        | What it is                                   |
| ----------------------------- | --------------------------------------------- |
| `/blog`                       | Blog home: hero, topic filter, featured post, grid |
| `/blog/[slug]`                | A single post                                 |
| `/blog/category/[category]`   | One topic's posts                             |
| `/blog/feed.xml`               | RSS 2.0 feed                                  |
| `/blog/og` , `/blog/og/[slug]` | Dynamic 1200×630 OG images (PNG)              |

All content routes are statically generated (`dynamicParams = false` +
`generateStaticParams`), same as your existing `/platform/[slug]` pattern.

## New files

```
src/data/blog/
  blogData.js            Blog identity, authors, the 3 topics
  posts/index.js          Registers every post (add new posts here)
  posts/*.jsx              6 articles (~700–1,400 words each)

src/lib/
  blog.js                 Post model: validation, reading time, headings,
                           metadata builders, JSON-LD builders
  blogOgImage.jsx          Shared visual for the OG image routes

src/components/marketing/blog/
  Blog.module.css          All blog-specific CSS (scoped; never touches
                            marketing.css — same pattern as
                            MiniLandingPage.module.css)
  BlogHome.jsx              Blog home AND category page (same component,
                             `category` prop toggles the copy)
  PostPage.jsx               Single-post layout
  PostBody.jsx                Renders each content block type
  PostCover.jsx                4 illustrated cover styles (ledger, stock,
                                handover, chat) — no photos, matches the
                                product's existing "sample shift" art
  PostCard.jsx, Breadcrumb.jsx, FeedLink.jsx, TableOfContents.jsx,
  ShareLinks.jsx              Smaller pieces used by the above

src/app/blog/
  page.js                       /blog
  [slug]/page.js                 /blog/:slug
  category/[category]/page.js     /blog/category/:category
  feed.xml/route.js                RSS
  og/route.js, og/[slug]/route.js   OG images

public/fonts/
  instrument-sans-{500,600,700}.woff, instrument-serif-italic.woff
  Needed ONLY by the OG image routes (ImageResponse can't use next/font).
  SIL Open Font License — safe to ship. Your zip had no public/ folder at
  all, so this also seeds it; if you already have one, just add this
  fonts/ subfolder into it.
```

## Edited files

- **`src/components/marketing/navigation.js`** — added one link ("The
  Innbase blog") to the Resources mega-menu, and one link ("Blog") to the
  footer's Explore column. Nothing else in the file changed.
- **`src/app/sitemap.js`** — added the blog index, indexable category
  pages, and every post (each with its own real `updatedAt` date, not
  build time). Three new imports at the top, one new array spread at the
  bottom. Nothing existing was removed or reordered.

Diff both against your current versions before overwriting, in case
you've touched them since this was built.

## Design decisions worth knowing about

- **No new dependencies.** Your `PROJECT_README.md`/lockfile said not to
  touch `package.json`, so there's no MDX — posts are plain `.jsx` data
  files with a typed block schema (`{ type: "callout" | "table" | "steps"
  | "product" | ... }`). Adding a post means adding one file + one line in
  `posts/index.js`.
- **Content validation at build time.** `lib/blog.js` throws a build
  error if a post has a bad slug, an unknown category/author, a broken
  `relatedProducts` id, etc. — and warns (non-fatal) about weak SEO
  (title too long, thin sections, missing structure).
- **No fake stats.** Every post is practical, procedural, and specific
  to hotel/restaurant/bar operations — no invented customer numbers or
  outcome claims.
- **No newsletter form.** Your Contact page deliberately has no fake
  success state, so the blog's only conversion points are an RSS feed and
  a `mailto:` "suggest a topic" link — nothing that pretends to submit
  server-side.
- **Thin-topic handling.** `BLOG.minPostsForTopicPage` (currently 2, and
  every topic already clears it) keeps a topic page reachable but
  `noindex`ed and out of the sitemap until it has enough posts to be
  worth a search snippet.
- **JSON-LD is generated from the same data the page renders** (`Blog`,
  `BlogPosting`, `FAQPage`, `BreadcrumbList`, `CollectionPage`) — via
  `lib/seo.js`'s existing `toPlainText()` helper — so structured data
  can't silently drift from the visible copy.
- **Cover art, not photos.** Each post has a small illustrated "record"
  (a ledger, a stock count, a handover checklist, a chat bubble) in the
  same visual language as your homepage's product illustrations, so the
  blog needed zero image assets of its own.

## Known gaps / things to double-check before shipping

- **Author bylines.** Every post currently credits "The Innbase team."
  Swap in real names via `AUTHORS` in `blogData.js` whenever you're
  ready — nothing else needs to change.
- **Copy review.** Read the six posts for tone and accuracy. I wrote
  them from the site's own voice and general hospitality-operations
  practice, not from Innbase customer data — there are no fabricated
  statistics, but you know your product and customers better than I do.
- **Production build.** I could only verify this in `next dev` here —
  this sandbox can't reach `fonts.googleapis.com`, so a full `next build`
  fails on your existing `next/font/google` calls in `layout.js` (a
  pre-existing constraint, not something this change caused). Run
  `next build` yourself once this is merged in.
- **`/blog/og` fonts.** If you ever rename or remove
  `public/fonts/instrument-*.woff`, update the paths in `blogOgImage.jsx`
  to match.
