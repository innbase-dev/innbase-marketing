# About page redesign — integration notes

## What changed, and why

The copy is untouched (pulled verbatim from the live page so nothing drifted
from what's already approved). What changed is how it's presented — each
section was matched to the format that actually suits its content, instead
of every section being a heading + paragraph + grid:

| Section        | Old pattern              | New pattern                                                                 |
|-----------------|---------------------------|-------------------------------------------------------------------------------|
| Hero            | Small avatar duo          | Bold 4:5 portrait placeholders (honest about "photos to be added," not shy about it) |
| —               | —                         | **New:** module marquee — the real product surface, as a connected strip     |
| Why it exists   | Wrapping chip row         | **Signature piece:** a scroll-drawn timeline connecting the day's 9 events into one "Reconciled" node — echoes the reconciliation language already used for the product itself |
| Who it's for    | Static cards              | Same cards, tightened structure (pain label always mono/caps, fix always sentence case) |
| Founders        | Cards                     | Cards + a 3-number stat strip ("2 Founders · 2 Disciplines · 1 Product") computed from the section's own heading, not hand-typed |
| Philosophy      | 5-card grid               | Numbered disclosure list — titles read as a scannable set of headlines, body text expands on demand |
| Manifesto       | Stacked lines             | Horizontal carousel, one belief per full-weight slide |
| Africa          | Static footnote           | Chips + a progressive-disclosure "why we phrase it this way" toggle |
| Letter          | Existing card              | Same card, refined type + a decorative quote mark |
| CTA             | Existing band              | Unchanged content, converted to the same component system |

The signature element is the timeline in "Why Innbase exists": it's the one
place the design takes a real swing, everything else stays disciplined on
purpose (per the brief's request for the Stripe/Ramp/Scale/Mews level of
restraint — one bold idea, not eight competing ones).

## Assumptions made

- **`Navbar`, `Footer`, and the shared `Icon` wrapper already exist** in
  `apps/web/components/` (they're referenced in the original `about.zip` but
  weren't part of the upload) — left untouched, `page.jsx` still imports them
  the same way.
- **`Reveal` was reimplemented**, not assumed. The original used a CSS-class
  + IntersectionObserver approach; the new one (`components/ui/Reveal.jsx`)
  uses `framer-motion` directly (already a dependency) with the same prop
  contract (`as`, `className`, `style`, plus a new `delay`), so it's a
  drop-in for any other page still using the old one.
- **New icons are hand-rolled inline SVGs** (`components/about/icons.jsx`)
  rather than guessed `iconsax-react` icon names, since the actual icon set
  available through your `Icon` wrapper wasn't in scope. Swap them for
  `<Icon name="..." />` once real icon names are confirmed — the props are
  compatible (they just render an `<svg>`).
- **The module marquee's labels are friendly renames of the real feature
  folders** (`guests`, `rooms`, `reservations`, `sales`→Point of Sale,
  `inventory`, `procurement`, `housekeeping`, `maintenance`, `reports`).
  `grn`, `alerts`, `companion`, and `settings` were left out as either too
  internal or not yet named for a public audience — easy to add back in
  `utils/data.ts` → `aboutModules` if you want them in.
- **No new stats were invented.** Every number on the page (2 founders, 2
  disciplines, 1 product, 9 events) is either a literal count from
  `utils/data.ts` or copied from the section's own existing headline —
  nothing here overclaims traction the company hasn't published.

## Integration steps

1. Copy `utils/data.ts` into your `utils/` directory (or merge into an
   existing `data.ts` if one exists — everything here is namespaced
   `about*` so it won't collide).
2. Copy `components/about/*` and `components/ui/*` in as-is.
3. Merge `styles/about-theme.css` into `globals.css` — see the comment at
   the top of that file for exactly where. It's additive only.
4. Replace `app/about/page.jsx` with the version here (only change from the
   original: one new import + `<ModuleMarquee />` inserted after the hero).
5. `Timeline`, `PhilosophySection`, `AfricaSection`, and `ManifestoSection`
   are client components (`"use client"`) since they carry state or
   scroll-triggered animation. Everything else stays a server component.

## Not included

The homepage, pricing, legal, and contact pages weren't touched — this pass
is scoped to `/about` only, per the brief.
