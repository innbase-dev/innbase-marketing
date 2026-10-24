const post = {
  "slug": "bar-stock-packs-versus-units",
  "headline": "Ten packs are not ten bottles",
  "emphasis": "the inventory mistake that compounds",
  "seoTitle": "Hotel Bar Inventory: Packs vs Units Explained",
  "description": "Learn how to record hotel bar stock in packs and individual units, handle changing pack sizes and avoid expensive inventory variances.",
  "excerpt": "Ten packs of water arrive. Someone enters ten units. Your records are now wrong before the first bottle is sold.",
  "category": "stock",
  "tags": [
    "stock",
    "innbase",
    "hotel operations",
    "Nigeria",
    "hotel management"
  ],
  "publishedAt": "2026-09-18",
  "updatedAt": "2026-10-24",
  "author": "team",
  "aiQuestion": "How do I convert stock packs to units?",
  "cover": {
    "src": "/images/blog/bar-stock-packs-versus-units.svg",
    "alt": "Innbase editorial illustration about ten packs are not ten bottles the inventory mistake that compounds, using linked records and hospitality symbols.",
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
    "A storekeeper receives ten packs of twelve bottles. The physical quantity is 120 bottles, but the entry says ten. Sales begin. Within a day the system may report:",
    {
      "type": "ul",
      "items": [
        "negative stock",
        "impossible variances",
        "strange reorder signals"
      ]
    },
    "Staff then spend hours investigating a shortage that never happened.",
    "The arithmetic is simple: received base units = number of packs \u00d7 units in each pack. The hard part is knowing which quantity each screen is asking for.",
    {
      "type": "h2",
      "text": "The right way to model inventory units"
    },
    "Choose a base unit for each product \u2014 bottle, can, sachet, or piece. Let staff receive in the supplier\u2019s packaging. Convert to base units on the way in. Show the conversion before saving: \u201c10 packs \u00d7 12 bottles = 120 bottles.\u201d",
    "For example, ten cartons of 24 cans each gives 240 cans total. Never assume the same supplier always sends cartons of 24.",
    {
      "type": "h2",
      "text": "What happens when a pack size changes?"
    },
    "A new promotion may contain fourteen bottles instead of twelve. Keep the original receipt\u2019s conversion factor with that receipt. Future deliveries can use a different factor. Do not rewrite old receipts \u2014 changing them would distort historical stock records.",
    "The screen should ask only when needed. Store the last pack definition as a suggestion, not a fixed rule.",
    {
      "type": "h2",
      "text": "Where to place checks"
    },
    "Check three points in the flow:",
    {
      "type": "ul",
      "items": [
        "Receiving \u2014 show pack count, units per pack, and total units.",
        "Internal transfer \u2014 show the sending unit and the receiving unit.",
        "Stock count \u2014 let staff count full packs and loose items, then convert both to base units."
      ]
    },
    "When a calculated quantity looks unusually large or small, pause for a quick confirmation. A warning is cheaper than a month-end investigation.",
    {
      "type": "h2",
      "text": "How to correct a wrong receipt"
    },
    "Record an authorised correction. Include:",
    {
      "type": "ul",
      "items": [
        "the original quantity",
        "the corrected quantity",
        "the reason for the change",
        "the name of the person making the correction"
      ]
    },
    "Do not quietly overwrite the history if stock has already moved through sales or transfers.",
    "After a correction, reconcile the physical count against all movements since the error. Only close the variance once the numbers agree.",
    {
      "type": "callout",
      "title": "Take this into your next shift",
      "text": "Check unit conversions at receiving and transfers."
    },
    {
      "type": "h2",
      "text": "Keep reading"
    },
    {
      "type": "p",
      "text": "This is one part of a connected operating day. Read our related guide, \u201cA leaking tap is never just a leaking tap\u201d, for the next operational perspective."
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
