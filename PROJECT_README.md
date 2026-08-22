# Innbase — Next.js port

A fully-responsive Next.js/React conversion of the original static Innbase
landing page, matching the source design 1:1.

## Stack

- **Next.js 16** (App Router, JS)
- **Tailwind CSS v4** — imported in `globals.css`; the original design's own
  hand-built CSS is kept alongside it (rather than rewritten as utility
  classes) so the visual output stays pixel-identical to the source HTML.
- **framer-motion** — powers scroll-reveal (`Reveal.jsx`), the count-up stats
  (`CountUp.jsx`), and in-view detection for the auto-cycling demo tabs /
  bento-grid spotlight.
- **@headlessui/react v2** — powers the FAQ accordion (`Disclosure`).
- **iconsax-react** — every icon in the original (lucide) has been mapped to
  its closest Iconsax equivalent in `src/components/Icon.jsx`.

## Structure

```
src/
  app/
    layout.js        Metadata, JSON-LD, global chrome
    page.js           Assembles every section in order
    globals.css        Full ported design system + Tailwind import
  components/          One component per concern (Navbar, Hero, ProductSection, ...)
  data/                 Static content arrays (FAQ copy, demo mock data, case studies, ledger ticker)
```

## Before you deploy

Drop the real image/icon assets into `public/images` and `public/` — see
`public/images/README.txt` for the exact filenames expected by the
components. Without them the `<img>` tags will just 404 quietly.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Notable behavior ports

- **Scroll reveal / stagger** — the original's IntersectionObserver +
  `.reveal` / `.reveal-stag` CSS classes are preserved verbatim in
  `globals.css`; `Reveal.jsx` now toggles the `in` class via framer-motion's
  `useInView` instead of a manual observer.
- **Bento-grid spotlight cycling** (`ProductSection.jsx`) — the "how it
  works" cards auto-highlight in sequence, pause on hover, and clicking a
  card jumps the live demo below to the matching tab (via `DemoContext`).
  The original's DOM-flying "packet" micro-animation between the Payments
  and Guests cards was simplified to a synchronized value/color transition
  telling the same story, to avoid a fragile, tightly-coupled DOM animation.
- **Live demo tabs** (`DemoSection.jsx`) — auto-cycle every 9s until the user
  interacts (click, pointer-down, or arrow-key nav), same as the original.
- **Case-study carousel** — native horizontal scroll with prev/next buttons
  that disable at the ends, same as the original.
- **FAQ accordion** — rebuilt on HeadlessUI's `Disclosure` instead of native
  `<details>`; a couple of CSS selectors were duplicated (`[open]` →
  `.open`) to keep the exact same open/closed styling.
