# Innbase redesign correction

September 9, 2026

## The previous delivery

The earlier refactor changed the palette, typography, and shared styling while leaving most production page compositions intact. It did not carry the approved Guest Companion hero, two-sided demo, and Pricing presentation into Next.js. Calling that a complete implementation of the approved creative direction was too generous.

This revision replaces the routed page compositions and supporting stylesheet. It is a source implementation, not a verified production deployment.

## Implemented changes

| Area | Changes |
| --- | --- |
| Home `/` | Editorial hero with room photography and a layered operations snapshot; interactive sale trail, payment-match review, and stock-variance examples; alternating product explanations; business-specific sections; redesigned pilot stories and pricing summary. |
| Guest Companion `/guest-companion` | The approved “Great hospitality. One tap closer.” direction: room photograph, tilted phone, request notification, six service tabs, and guest/team views. Requests move through receipt, acceptance, and completion. Hero service links select a scenario; examples can be reset. |
| Pricing `/pricing` | The approved editorial opening, staff selector, recommendation badges, plan cards, Enterprise band, differences-only comparison, image-led capacity section, and FAQ. Production prices are retained. |
| Assistant `/assistant` | Layered question-and-task hero and a five-moment day-in-the-life demo. Visitors initiate example requests and reveal a linked maintenance record. Permissions, roles, device support, and FAQs remain visible. Voice is still coming soon. |
| About `/about` | Story-led opening, room imagery, editorial explanation of the problem, local operational context, principles, text-based founder profiles, and the existing founders’ letter. No substitute founder portraits. |
| Contact `/contact` | Conversation-led layout, four enquiry types, sales/support/partnership fields, plan-aware links, message review, and explicit email/WhatsApp handoff. |
| Legal `/legal` | New document index and reading layout. Terms, Privacy, GDPR, and Fair Usage retain their document hashes and use native expandable subsections. Policy text is unchanged. |
| Navigation | Product, Solutions, and Resources mega menus with editorial introductions, grouped links, and descriptions. Mobile disclosure, mutually exclusive menus, Escape handling, and focus return are implemented. |
| Footer | Closing invitation and populated Platform, Solutions, Explore, and Let’s talk groups, including product, business, pricing, stories, support, account, and legal destinations. |
| Visual system | New buttons, type hierarchy, spacing, section composition, image treatments, product UI illustrations, focus styles, responsive rules, and reduced-motion handling. |

## Actual interactivity

- **Guest Companion:** six scenarios, each with preview, received, in-progress, and completed stages. Examples do not imply that a real payment has been taken.
- **Home:** expand a sale’s record trail; confirm or flag a payment match; edit a bottle count to see a shortage, excess, or balanced count.
- **Assistant:** five sample conversations, a revealable source record, and resets. These are deterministic examples, not live AI.
- **Pricing:** four staff bands, with Enterprise recommended for 51+ accounts. A switch hides shared comparison rows. Plan CTAs carry the selection to Contact.
- **Contact:** builds an encoded message and displays it for review. The visitor sends it from their email app or WhatsApp.
- **Navigation and demo tabs:** keyboard handlers and visible focus styles are present. FAQs, pilot stories, and legal sections use native expandable controls.

## Contact behavior correction

The supplied Contact form prevented normal submission, generated a random enquiry reference, and displayed “Message received.” It had no delivery call.

This revision removes that false success state. It does **not** add an email service, CRM integration, or server endpoint. It prepares an enquiry for the visitor to send and says so explicitly.

## Preserved content and terms

These files remain byte-for-byte identical to the production upload:

- `package.json` and `package-lock.json`
- `src/data/pricingPlans.jsx` and `src/data/pricingFaqData.js`
- `src/data/legalData.jsx`
- `src/data/aboutData.js`
- `src/data/contactData.js`
- `src/data/caseStudies.js`

Monthly prices remain **₦24,000 / ₦60,000 / ₦150,000** for Boutique / Base / Growth. The earlier pricing HTML used **₦24,000 / ₦48,000 / ₦99,000**; those lower preview prices were not adopted.

The official supplied SVG remains the brand mark. The approved room image is included as a WebP asset. Active pages no longer require the absent property photographs or screenshots used by the old image compositions. Testimonials and pilot results come from the production source; this redesign did not independently verify them.

The seven route URLs, canonical metadata, pricing and FAQ structured data, GTM configuration, consent integration, and chat integration are retained. About now emits its previously defined founder structured data. Referenced social-image, favicon, and manifest assets are included. An invalid string `onLoad` handler on a root stylesheet link was replaced with normal stylesheet loading.

## Retired implementation

The old `globals.css` presentation and the `brand-refresh.css` override layer have been removed, along with unreferenced legacy page components, old menus, the image fallback component, and obsolete supporting data files.

The continuously scrolling property-name strip, aggregate stat band, automatically cycling demos, and case-study carousel are not retained as those same widgets. The previous automated maintenance-workspace showcase and its inactive supporting source are replaced by the five guided Assistant examples. Pilot stories and testimonials have a new reading layout; demonstrations are user-driven. The original production upload remains the baseline for retired source material.

Some preserved content modules still contain unused legacy exports. Those do not render missing images or add old components to active routes. Package dependencies were kept at their supplied versions rather than pruned without a successful installation and build.

## Validation and limits

Completed:

- Babel parsing of reachable JavaScript and JSX modules.
- Local import resolution and undefined-identifier checks.
- Component-tree checks for seven routes: one main heading, one main landmark, unique IDs, image existence, internal routes/anchors, and parseable JSON-LD.
- Event-handler checks for guest flows, assistant examples, pricing bands, comparison filtering, payment review, stock validation, contact message encoding, and navigation disclosures.
- Byte comparisons of preserved commercial, legal, founder, contact, and pilot-story data against production.

Component checks used **mocked framework APIs**. They are not equivalent to React DOM rendering or a Next.js build. No browser rendering, mobile viewport inspection, accessibility certification, performance benchmark, external integration test, or deployment is claimed.

The production build remains **unverified**. Dependency installation in the authoring environment was previously blocked by a usage limit. The build command returned:

```text
> next build --webpack
sh: 1: next: not found
```

Install the locked dependencies and complete a production build and browser review before treating this revision as launch-ready. Visual superiority and conversion improvement are design goals; this source work alone does not establish them through testing or measurement.
