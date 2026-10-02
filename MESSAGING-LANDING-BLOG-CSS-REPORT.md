# Messaging landing page + blog CSS production audit

Date: 2026-10-02

## Delivered

- Added a first-class `/platform/messaging` marketing route.
- Added an on-brand Messaging page using the current forest / cream / Instrument Serif marketing system.
- Added a responsive, interactive communications-workspace illustration based on the supplied Messaging product reference.
- Messaging page covers:
  - Guest Companion, WhatsApp, and SMS conversations in one communications workspace.
  - Conversation ownership / assignment.
  - Guest and stay context beside the thread.
  - Creating a task from a conversation without losing the source context.
  - The relationship between Guest Companion -> Messaging -> Tasks.
- Added page metadata, canonical URL, SoftwareApplication JSON-LD, sitemap entry, product-nav entry, footer entry, and a reusable Messaging icon mapping.

## Blog CSS diagnosis

The source archive contained three blog component/CSS trees:

1. `src/components/marketing/blog/*` — the tree actually imported by all `/blog` routes.
2. `src/components/blog/*` — legacy, unreferenced copy.
3. `src/components/marketing/marketing/blog/*` — legacy nested copy.

The three `Blog.module.css` files were not identical. That is a maintenance/regression hazard even though current route imports resolve to the first tree.

The two unreferenced legacy trees were removed. There is now one canonical blog component/CSS implementation:

`src/components/marketing/blog/Blog.module.css`

## Production verification

The current `innbase.co` production alias resolves to the latest `innbase-marketing` Vercel production deployment.

That deployment currently loads a hashed blog CSS chunk containing the refreshed rules for:

- the full-width article/sidebar grid (`grid-template-columns:minmax(0,1fr) minmax(280px,340px)`),
- the 18px article body type and corrected article spacing specificity,
- 44px share controls,
- the dedicated `copyBtn` sizing,
- the `Explore with AI` panel,
- the new article illustration / `object-fit: contain` rules.

The production HTML also uses the corresponding current CSS-module class names. This means the live deployment is **not currently serving an old blog CSS asset**. A forced no-cache or dynamic-rendering workaround would therefore attack the wrong layer and was intentionally not added.

## Validation performed

- TypeScript parser / JSX syntax check on the new Messaging route and components: PASS.
- CSS parse using `tinycss2` on Messaging CSS, canonical Blog CSS, and global marketing CSS: PASS, zero parser errors.
- Source scan for legacy blog imports after consolidation: PASS, none remain.
- Route/navigation/sitemap source consistency checks: PASS.
- Current production deployment + emitted blog CSS chunk inspected through Vercel: PASS; refreshed CSS confirmed in the live asset.

## Validation limitation

A fresh local `next build` could not be executed in the working container because the project dependencies were not present and the container's npm registry access was unavailable. No dependency or lockfile changes were made. The supplied project should therefore run its normal `npm ci && npm run build` gate in the deployment/CI environment before promotion.
