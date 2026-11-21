import Link from "next/link";

const post = {
  "slug": "bar-stock-packs-versus-units",
  "headline": "Ten packs are not ten bottles",
  "emphasis": "the inventory mistake that compounds",
  "seoTitle": "Hotel Bar Inventory: Packs vs Units Explained",
  "description": "Learn how to record hotel bar stock in packs and individual units, handle changing pack sizes and avoid expensive inventory variances.",
  "excerpt": "Ten packs of water arrive. Someone enters ten units. Your records are now wrong before the first bottle is sold.",
  "category": "stock",
  "tags": ["bar inventory", "stock units", "pack sizes", "receiving stock", "hotel bar"],
  "publishedAt": "2026-09-18",
  "updatedAt": "2026-11-21",
  "author": "team",
  "aiQuestion": "How do I convert stock packs to units?",
  "cover": {
    "src": "/images/blog/bar-stock-packs-versus-units.svg",
    "alt": "A shrink-wrapped pack of bottles with an arrow to three single bottles, showing that a pack and a unit are different counts.",
    "width": 1600,
    "height": 1200,
    "tone": "moss"
  },
  "takeaways": [
    "Record purchase packaging and countable units separately.",
    "Pack size belongs to the specific receipt, not a forever-hard-coded product assumption.",
    "Check unit conversions at receiving and transfers."
  ],
  "body": [
    "Ten packs of water arrive. Someone enters ten units. Your records are now wrong before the first bottle is sold.",
    {
      "type": "h2",
      "text": "How one receiving error becomes a stock mystery"
    },
    "A storekeeper receives ten packs of twelve bottles. The physical quantity is 120 bottles, but the entry says ten. Sales begin. Within a day the system may report negative stock, impossible variances or strange reorder signals. Staff then spend hours investigating a shortage that never happened.",
    "The arithmetic is simple: received base units = number of packs × units in each pack. The problem is deciding which quantity each screen is asking for.",
    {
      "type": "h2",
      "text": "The right way to model inventory units"
    },
    "Choose a base unit for each product, such as bottle, can, sachet or piece. Allow receiving in the supplier’s packaging unit while converting to base units transparently. Show the conversion before saving: “10 packs × 12 bottles = 120 bottles.”",
    "For example, ten cartons of soft drink containing 24 cans each represent 240 cans. Do not assume the same supplier will always send cartons of 24.",
    {
      "type": "h2",
      "text": "What happens when a pack size changes?"
    },
    "A new promotion may contain fourteen bottles instead of twelve. Keep the original receipt’s conversion factor with that receipt. Future deliveries can use a different factor. Retroactively rewriting old receipts would distort historical stock balances.",
    "The screen should ask only when needed, and remember the last used pack definition as a suggestion rather than a silent rule.",
    {
      "type": "h2",
      "text": "Where to place checks"
    },
    "At receiving, display pack count, units per pack and total units. At internal transfer, show the sending and receiving unit. At stock count, let staff count full packs and loose items, then translate both into the base-unit total.",
    "When the calculated quantity is unusually large or small, pause for a quick confirmation. A warning is cheaper than a month-end investigation.",
    {
      "type": "h2",
      "text": "How to correct a wrong receipt"
    },
    "Record an authorised correction with the original quantity, corrected quantity, reason and actor. Do not quietly replace the history if stock has already moved through sales or transfers.",
    "After correction, reconcile the current physical count with all intervening movements before declaring the variance closed.",
    {
      "type": "callout",
      "title": "Take this into your next shift",
      "text": "Check unit conversions at receiving and transfers."
    },
    <>
      Once packs and units are recorded correctly, <Link href="/blog/how-to-run-a-bar-stock-count">a bar stock count that finds the gap</Link> becomes far easier to trust.
    </>,
    {
      "type": "product",
      "id": "inventory",
      "text": "Innbase records stock received, transferred and adjusted in one movement log, so every change to the count has a source."
    }
  ],
  "faqs": [
    {
      "q": "How do I convert stock packs to units?",
      "a": "Multiply the number of packs by the units per pack. Ten packs of twelve bottles each equals 120 bottles."
    },
    {
      "q": "Should pack size be fixed for a product?",
      "a": "Not necessarily. Packaging can change by supplier or delivery, so retain the actual conversion on each receipt."
    }
  ]
};

export default post;
