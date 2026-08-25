# About page — final (v3)

This supersedes the earlier draft entirely. Drop these into `apps/web/` at
the matching paths — it's a straight replacement, not a merge.

## What's in this build

Three sections were rebuilt to match the approved reference (the
mission/stats/banner block, the dark diagonal principles grid, and the
founder quote cards). Everything else is restored to your original,
unmodified files — the earlier draft's extra patterns (flow timeline,
identity marquee, who-for carousel, manifesto carousel, disclosure
accordion, bold founder portraits) are all removed, per "discard the
rest."

| File | Status |
|---|---|
| `app/about/page.js` | Rebuilt — same section order as the original, minus the standalone manifesto section |
| `data/aboutData.js` | Restored — the original 5 exports only, no additions |
| `components/about/AboutHero.jsx` | **Unchanged**, your original file |
| `components/about/WhyExistsSection.jsx` | Rebuilt — now the mission section: original copy + a bordered stat grid + `MissionBanner` |
| `components/about/MissionBanner.jsx` | New — client component, cycles through 3 of the 5 `MANIFESTO_LINES` (the other 2 no longer appear anywhere on the page) |
| `components/about/WhoForSection.jsx` | **Unchanged**, your original file |
| `components/about/FoundersSection.jsx` | Rebuilt — photo-left/quote-right cards, matching the testimonial reference |
| `components/about/PhilosophySection.jsx` | Rebuilt — dark diagonal principle cards, matching the features-block reference (component name kept as-is so `page.js`'s import doesn't need touching) |
| `components/about/AfricaSection.jsx` | **Unchanged**, your original file |
| `components/about/LetterSection.jsx` | **Unchanged**, your original file |
| `components/about/AboutCta.jsx` | **Unchanged**, your original file |
| `styles/globals.css` | Your original file + one additive block at the end (mission stats/banner, principles, founder cards). No leftover CSS from the earlier draft. |

## Two things worth deciding before you ship

1. **`.fq-sign` cursive font** — currently `Segoe Script, Brush Script MT,
   cursive` as a safe system fallback. Swap in a real script webfont
   (e.g. via `next/font`) once one's picked; the class is isolated so
   it's a one-line change.
2. **`principles-cta` destination** — currently links to `#letter`
   (scrolls down to the founders' letter on this same page). Point it
   wherever it should actually go if that's not it.

## Data no longer used on this page

`FLOW_STEPS` is still imported (its `.length` drives the "9 touchpoints"
stat), but the step-by-step list itself isn't rendered anywhere anymore.
2 of the 5 `MANIFESTO_LINES` aren't shown anywhere. Both arrays are kept
in the data file since removing them would be a breaking change if
another page imports from the same file — but flagging in case you'd
rather trim them.
