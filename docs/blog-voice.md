# Innbase blog: voice and publishing guide

These are the rules the Innbase blog follows, taken from the posts that read best (bank transfers, stock count, shift handover). Use them for every new post.

## Who we write for

People who run hotels, restaurants and bars in Nigeria: owners, general managers, front desk and accounts staff. They are busy, practical and sceptical of software promises. They read on a phone, often between tasks.

## Voice

- **Plain and warm.** Write as a calm, experienced operations manager would explain something to a colleague. Use short sentences, everyday words and no jargon. When an industry term is needed (ADR, PMS), say what it means the first time.
- **Specific, local and believable.** Open with a scene: a table, a room number, a naira amount, a time of night. "Table 8 pays ₦18,000 by transfer" beats "a customer makes a payment". Use Nigerian places, names and payment habits (transfers, POS, WhatsApp bookings, power cuts).
- **Fair to staff.** A gap is a question, not an accusation. Every post that discusses missing money or mistakes includes that tone, often in a "Keep the tone right" callout.
- **Honest about Innbase.** The blog teaches first. Product mentions come late, in a single `product` block, and describe only what Innbase does, or is being built or designed to do. For features that aren't released, say "is being built to" or "is in design". Never imply a capability that doesn't exist. Never claim match percentages, learning matchers or statement imports.
- **No hype.** Leave out "revolutionise", "seamless", "game-changing" and exclamation marks.

## Structure that works for readers, search and AI answers

1. **Opening scene** (2–4 sentences) that names the problem.
2. **Question-shaped H2s** that match what people type or ask an assistant: "What is a night audit?", "How long should you hold a room?". Answer in the first sentence under each heading, then explain.
3. **One formula, table or checklist** that a reader can copy. Formulas go in a `callout` titled "Formula". Worked examples use naira and show the arithmetic.
4. **Takeaways** (3–4 lines) that stand alone. Assistants often quote these.
5. **Internal links** to one or two related posts, in a sentence, not a "Keep reading" block.
6. **One product block**, accurate to the feature's current stage.
7. **FAQs** (3–4) answering real follow-up questions in 1–2 sentences each. They become FAQ structured data.

Aim for 900–1,300 words. If a section doesn't help someone act, cut it.

## Mechanics

- British spelling (programme, organise), curly quotes and apostrophes, "₦18,000" with a comma, and times as "1:40 a.m.".
- `seoTitle` stays at 52 characters or fewer, because " | Innbase" is appended. `description` is 110–160 characters, and `excerpt` is 190 characters or fewer.
- Tags describe the topic ("night audit", "POS"). Don't use "innbase" or other filler tags.
- Every cover is an isometric scene from the Innbase illustration library that relates to the post’s theme, never a flat or generated graphic. Export it as a transparent 1600×1200 WebP with the art centred, filling about 84% of the width or 82% of the height (`public/images/blog/<slug>.webp`). Use each scene once, and avoid the dark-palette scenes, which disappear on the dark article hero. The alt text describes what is drawn.
- Legal and regulatory statements are checked against a primary or reputable source at the time of writing and flagged as "not legal advice" where relevant. Avoid figures that change often, such as fees and settlement times. Tell readers to confirm them with their bank or provider.

## Checklist before publishing

- [ ] Every claim about Innbase matches the feature's current stage.
- [ ] Every worked example adds up.
- [ ] Every internal link resolves.
- [ ] `npm run build` passes, and the blog's SEO notes show no warnings for the post.
- [ ] The post reads well on a 390px-wide phone.
