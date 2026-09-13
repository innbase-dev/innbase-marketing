# Innbase marketing

A redesign of the seven-route Next.js marketing project based on the approved Guest Companion and Pricing concepts. Page compositions, imagery, product demonstrations, navigation, and the footer have been rebuilt.

See **REFRACTOR_REPORT.md** for the scope and validation limits.

## Run

The supplied manifest and lockfile are unchanged: Next.js 16.3.2 and React 19.2.8.

```bash
npm ci
npm run dev
```

For production:

```bash
npm run build
npm start
```

The build was **not completed in the authoring environment**. Dependency installation was blocked by a usage limit, and `npm run build` returned `next: not found`.

## Source map

| Location | Responsibility |
| --- | --- |
| `src/app/*/page.js` | Routes, metadata, and structured data |
| `src/app/layout.js` | Fonts, global metadata, consent, analytics, and chat |
| `src/app/marketing.css` | The new design system and responsive layouts |
| `src/components/marketing/MarketingShell.jsx` | Shared shell and full footer |
| `src/components/marketing/MarketingNav.jsx` | Mega menus and mobile disclosures |
| `src/components/marketing/navigation.js` | Navigation and footer destinations |
| `src/components/marketing/Primitives.jsx` | Buttons, headings, image, FAQ, and product relationship section |
| `src/components/marketing/*Page.jsx` | The seven page compositions |
| `src/components/marketing/GuestDemo.jsx` | Six guest-to-team request flows |
| `src/components/marketing/OperationsDemo.jsx` | Sales, payment review, and stock-count examples |
| `src/components/marketing/AssistantDemo.jsx` | Five illustrative assistant conversations |
| `src/components/marketing/CustomerStories.jsx` | Existing testimonials and pilot results |
| `src/data/` | Product copy, commercial terms, policies, and example data |
| `public/images/marketing/hotel-room.webp` | The actual image from the approved preview |
| `public/images/innbase-light.svg` | The official supplied Innbase logo |

## Behavior to know

- Demos use local illustrative data. They do not contact a hotel workspace, payment service, or AI provider.
- Pricing uses production data: Boutique **₦24,000**, Base **₦60,000**, Growth **₦150,000** per month. Enterprise is recommended above 50 staff accounts.
- Contact prepares a message for the visitor to send through email or WhatsApp. There is no submission backend or false delivery confirmation. Pricing links carry their plan into the form.
- Legal copy remains unchanged in `src/data/legalData.jsx`. Document hashes and native expandable sections support navigation.
- Pilot quotes and results are retained from the production source, without independent verification by this redesign.
- GTM remains conditional on `NEXT_PUBLIC_GTM_ID`; existing consent and chat integrations remain in the layout.

The active presentation no longer imports Tailwind utilities, Framer Motion, Headless UI, or Iconsax. Their dependencies remain in the unchanged manifest.

Hero images use eager loading and high fetch priority; supporting imagery is lazy-loaded, following the [Next.js Image API](https://nextjs.org/docs/app/api-reference/components/image).
