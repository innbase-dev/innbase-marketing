# About page — v2 redesign

Drop these into `apps/web/` at the matching paths. Nothing here renames or
removes an existing export, route, or class — it's additive, so nothing
else on the site should regress.

## What changed, and why

| Section | Pattern used | Why |
|---|---|---|
| Hero | bold portrait placeholders, subtle float | keeps the honest "photo pending" tag, but gives the duo more visual weight |
| **New:** `AboutStats` | animated stat counter | 4 honest, non-vanity numbers derived straight from the data (2 founders, 9 touchpoints, 5 convictions, 1 country) — counts up on scroll, respects reduced motion |
| **New:** `IdentityMarquee` | animated "logo" showcase | Innbase has no client logos to show yet, so this is an infinite rhythm-strip of the brand's own phrases instead of a fabricated trust wall |
| Why Innbase exists | animated flow **timeline** | the 9-step chain now reads as a numbered, connected sequence with a drawing connector line, instead of a wrapped chip list |
| Who we're building for | cards + mobile **carousel** | desktop keeps the 4-card grid, tagged "friction / fix"; mobile becomes a swipeable, scroll-snapping strip instead of squeezing 4 cards into 2 columns |
| Founders | bold image placeholders + **pull quotes** | each founder gets a large portrait block (not just a small circle) and their quote gets proper pull-quote typography with a quotation glyph |
| Philosophy | **disclosure** accordion | reuses the site's existing `.faq-item` pattern natively (`<details>/<summary>`, zero extra JS) so the 5 convictions are readable one at a time |
| Manifesto | quote **carousel** | autoplaying, pausable, keyboard-accessible carousel with a stories-style segmented progress bar, instead of 5 stacked lines competing for attention |
| Africa | bold visual placeholder | a radar-pulse map marker stands in for the eventual illustrated map, paired with the existing "now → next" chip flow |
| Letter | quote watermark | a faint decorative quotation mark behind the salutation |

## Files

```
app/about/page.js                     — updated composition (adds AboutStats, IdentityMarquee)
data/aboutData.js                     — original exports preserved, + IDENTITY_MARQUEE
components/about/
  AboutHero.jsx                       — refined (floating duo visuals)
  AboutStats.jsx                      — new
  IdentityMarquee.jsx                 — new
  WhyExistsSection.jsx                — refined, uses FlowTimeline
  FlowTimeline.jsx                    — new
  WhoForSection.jsx                   — refined
  FoundersSection.jsx                 — refined
  PhilosophySection.jsx               — refined (disclosure)
  ManifestoSection.jsx                — refined, uses ManifestoCarousel
  ManifestoCarousel.jsx               — new (client component)
  AfricaSection.jsx                   — refined
  LetterSection.jsx                   — refined
  AboutCta.jsx                        — unchanged
  QuoteMark.jsx                       — new, shared decorative glyph
styles/globals.css                    — original file + one additive block at the end
```

## Assumptions worth checking against your actual `Icon.jsx` and `Reveal.jsx`

- `Icon` is only called with names already proven in the original About
  components (`phone-call`, `banknote`, `message-circle`, `home`,
  `search-check`, `zap`, `building-2`, `sparkles`, `receipt-text`,
  `pencil-line`, `arrow-right`). Anywhere a new glyph was needed
  (the disclosure toggle, the quote marks, the map pin), it's a small
  inline SVG defined right in the component instead of a guessed `Icon`
  name, so nothing new depends on your icon registry.
- `Reveal` is assumed to forward arbitrary props (`style`, `aria-*`) to
  the element it renders and to toggle an `.in` class on itself once
  visible — the same contract the existing About components already
  rely on.
- `ManifestoCarousel.jsx` is a client component (`"use client"`) since it
  needs state for autoplay/pause/keyboard nav; everything else stays a
  server component, matching the original file.
