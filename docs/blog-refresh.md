# Innbase blog refresh

## Source of truth

This update uses the two current uploads together: `marketing(1).zip` for the project root/public assets and `src(20260922-220056).zip` for `src/`. No earlier marketing application's source was merged into this delivery.

| Input | SHA-256 |
| --- | --- |
| marketing(1).zip | 98997045de4bcf4626e24feb6d842b1fdcb65525544092beaa0e7fc7b35a88df |
| src(20260922-220056).zip | bad15fac4bbe48be06c6f3e863ed0a94f3a355930d3708277ed64da54c489596 |

The source archive's `app/`, `components/`, `data/` and other directories belong **inside `src/`**. The active blog components are in `src/components/marketing/blog`; posts remain in `src/data/blog/posts`.

## Requested changes

1. **Full-width layout.** The article's fixed 720px + 280px columns left unused space inside the 1280px container. A fluid article column, 340px sidebar and responsive gap now occupy the complete container. The hero is fluid too. Tablet/mobile layouts collapse to one column; the sidebar's desktop flex basis no longer forces empty 260px-tall mobile panels.
2. **Six original illustrations.** Each article now uses a topic-specific transparent isometric illustration: hotel revenue gaps, payment matching, bar counts, stock variance, shift handover and guest requests. Muted sage, forest, ivory and stone; restrained apricot accents; a visible floor and paper grain. All are 1600×1200 WebP with alpha, meaningful alt text, responsive image sizing and `object-fit: contain`. Covers are shared across featured, listing and article placements. Only above-the-fold covers load eagerly. Original PNGs and generation prompts accompany the illustration bundle.
3. **Consistent sharing controls.** Every share action uses the same 44px height, 13px text and line height. The copy button has a stable width for its success state, accessible feedback and a focused, selected URL if clipboard access is denied. The stronger scoped selector prevents the global button font reset from overriding these sizes.
4. **Explore this topic with AI.** Readers choose “Explain it simply”, “Make a checklist” or “Plan for my hotel”, then open ChatGPT in a new tab. Each prefilled question includes the article's title, canonical URL, summary, takeaways and a specific topic question. Prompts request simple English and Nigerian hotel examples, and instruct the assistant to say when it cannot open the article. This is an external, prefilled ChatGPT link; it does not call an AI API or embed a chatbot. Only public article context is included.

## Integration fixes found while verifying

- Installed the supplied Instrument font files in `public/fonts`, where the blog's OG renderer expects them.
- Removed unsupported `size`/`contentType` exports from ordinary OG route handlers. The image helper still supplies the correct 1200×630 dimensions.
- Moved the supplied standalone installation package from `src/app/innbase-blog` to `reference/innbase-blog-installation`. Leaving it under `app` created unintended nested routes. Its files are preserved unchanged.
- Moved the unreferenced, incomplete main-app router mirror from `src/trpc` to `reference/unused-app-trpc`. It imported unavailable main-app features. The active referral client in `src/lib/trpc` remains in place. Only the reference folder is excluded from lint/type checking; active application checks remain enabled.
- Connected the blog to Resources, the Explore footer group and the sitemap. Posts use their authored update dates and list their new cover image URLs in the sitemap.
- Unknown article/topic/OG slugs go through explicit `notFound()` guards. Known content remains prerendered. This avoids Next 16.3.2's internal `NoFallbackError` logging for `dynamicParams=false`.

Article body text, pricing, referral logic, the shared `marketing.css`, dependencies and lockfile are unchanged.

## Verification

- `npm run build`: pass, including TypeScript and all prerendered blog routes.
- `npm run lint`: pass, zero errors and zero warnings.
- `npm test`: 14 unit tests and 37 browser tests passed.
- After the final mobile sidebar and missing-slug refinements, the six focused blog browser tests passed again. No `NoFallbackError` appeared in that run.
- All six posts and three categories return 200; missing content and the former accidental nested route return 404. RSS contains all six articles. All seven OG endpoints return 1200×630 PNGs.
- Verified layouts at 320, 390, 768 and 1440px; container alignment and share control sizing also checked at 1920px.
- Keyboard-operated AI choices, prompt context/encoding, clipboard success/failure and image loading passed.
- Automated WCAG A/AA checks found no violations in the refreshed article's main content. Desktop and mobile screenshots were visually reviewed.
- Existing Platform/Solutions pages, public referral routes, signed-out Clerk boundaries and fixture-backed referral workflows passed. This does not certify live signed-in Clerk sessions, real payouts or the remote production backend.

The files are ready for review and integration. Nothing was deployed.

## Applying the update

Use the focused patch if your working repository has moved beyond the two supplied archives. From the marketing project root:

```bash
git apply --check /path/to/innbase-blog-refresh.patch
git apply /path/to/innbase-blog-refresh.patch
npm ci
npm run build
npm run lint
npx playwright install chromium
npm test
```

The patch includes the image/font binaries and reference-folder moves. Review a failed `--check` against your current files; do not overwrite newer work to force it through. The patch bundle also includes changed files and a manifest for manual comparison. A simple overlay does not perform directory moves: follow the manifest for those paths.

The full project archive is the complete updated snapshot assembled from the two uploads. It excludes dependencies, build outputs, local environment files and test runtime output. Install dependencies before running it.

## Adding a post

Create and register the post under `src/data/blog/posts`. Give `cover` a local `src`, descriptive `alt`, positive integer `width` and `height`, and `tone` (`sage` or `oat`). Add a short, practical `aiQuestion` for its topic; otherwise the article title is used. Keep illustration text out of the raster artwork so headlines remain accessible, responsive HTML.
