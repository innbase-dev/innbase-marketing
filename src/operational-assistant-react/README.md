# Operational Assistant page — integration guide

Everything here was built against, and validated against, a full copy of the
real marketing repo (real `Icon.jsx`, `Reveal.jsx`, `FaqAccordion.jsx`,
`Navbar`, `Footer`, `globals.css`) — not written in isolation and hoped-for.
See "How this was validated" at the bottom for specifics.

## 1. Drop in the files

Copy these into the matching paths in your repo:

```
src/app/operational-assistant/page.js
src/components/operational-assistant/   (all 9 .jsx files)
src/data/operationalAssistantData.js
public/images/operational-assistant-bookings.png
```

Nothing here overwrites an existing file — `operational-assistant` is a new
route and a new component folder.

## 2. Append the CSS

Open `globals-additions.css` and paste its contents onto the end of your
`src/app/globals.css`. It's additions only — every class this page reuses
from your existing design system (`.hero-visual`, `.hero-dash`, `.role-grid`,
`.role-card`, `.problem-card`, `.how-card`, `.how-mock`, `.flow-row`,
`.flow-chip`, `.cta-band`, `.faq-*`, `.f2-*`, etc.) is left untouched — this
file only adds what's genuinely new to the system:

- `--app-*` custom properties (the product's real dark-theme tokens, scoped
  with a prefix confirmed unused elsewhere in your file)
- `.strip*` (the "already built into Payments/Inventory/Shift/Guests" bar)
- `.problem-compare`/`.flow-block*` (wraps your existing flow-chip pattern
  in a before/after comparison card)
- `.card-grid` (a 4-column variant so the impact section can reuse your
  existing `.problem-card`/`.p-ico` instead of a parallel card style)
- `.how-grid-3`/`.hm-line` (3-up variant of `.how-card`, chat-bubble line
  style for inside `.how-mock`)
- `.device-*` (the phone/desktop/voice row)
- `.hero-scene`/`.hero-shot-img`/`.float-card*` (the floating assistant
  cards around the hero screenshot)
- `.af-*`/`.scn-*` (the scenario-timeline mini product mockup — kept
  deliberately minimal, only what `OaScenarios` actually renders, not the
  fuller kit; see the comment at the top of that section if you want to
  extend it for a future product screenshot)

## 3. Optional: nav link

There's no existing nav entry pointing at this page — I didn't add one
since `productMenuData.jsx` didn't have a slot for it and that felt like
your call, not mine to make silently. Add a link wherever makes sense.

## 4. Icon.jsx note

`smartphone`, `monitor`, and `mic` (used by the device row) aren't in your
shared `Icon.jsx` map. Rather than guess at `iconsax-react` export names in
a file every page depends on, `OaDeviceSection.jsx` renders three small
local inline SVGs for just those three. If `iconsax-react` does export
close equivalents (likely something like `Mobile`, `Monitor`, `Microphone2`
— unconfirmed, I couldn't check the installed package version), you can
add them to `Icon.jsx`'s `ICONS` map and delete the local fallback.

## How this was validated

Since there's no way to run your actual Next.js build in this environment,
I built the highest-fidelity substitute I could:

- Copied your full repo, overlaid these new files on top of it, installed
  your real dependencies (`react`, `iconsax-react`, `framer-motion`,
  `@headlessui/react`) into that copy.
- Ran every `.jsx`/`.js` file through Babel to confirm they parse.
- Cross-checked every `className` used against your real `globals.css` +
  this package's additions — nothing missing, nothing duplicated.
- Cross-checked every `<Icon name="...">` call (including the dynamic ones
  driven by the data file) against your real `Icon.jsx` map.
- Rendered all 9 components through real `react-dom/server`, using your
  real `Icon`/`Reveal`/`FaqAccordion` components against the real npm
  packages (not mocks) — all render cleanly.
- Mounted `OaScenarios` in a live jsdom browser with real timers and drove
  it programmatically: confirmed the thinking-delay actually resolves,
  clicking a tab updates the right content, and a manual click correctly
  cancels autoplay (waited a full interval past the click to confirm it
  didn't fire again).
- Parsed `globals-additions.css` with PostCSS on its own and concatenated
  with your real `globals.css` (963 rules combined) to confirm no syntax
  conflicts.

The one thing I could not verify here: an actual `next build`/`next dev`
run, since this sandbox has no access to your installed toolchain image or
private registries. Worth a first real build+visual pass before shipping.
