import Link from "next/link";

const post = {
  slug: "what-is-stock-variance",
  headline: "What a stock variance",
  emphasis: "is telling you",
  seoTitle: "What Is Stock Variance and How to Read It",
  description:
    "Stock variance is the gap between what you expected to find and what you counted. Learn the formula, the three families of cause, and how to investigate a gap.",
  excerpt:
    "A variance isn’t a verdict. It is a question about the gap between expected and counted stock. Here is how to read one before you react.",
  category: "stock",
  tags: ["stock variance", "shrinkage", "inventory control"],
  publishedAt: "2026-08-26",
  updatedAt: "2026-08-26",
  author: "team",
  aiQuestion: "How can I understand a difference between expected and counted stock, check the records and work out its value?",
  cover: {
    src: "/images/blog/stock-variance.webp",
    alt: "Two bottle trays, one with four bottles and one with three, with a magnifying glass over an empty position.",
    width: 1600,
    height: 1200,
    tone: "oat",
  },
  takeaways: [
    "Stock variance is counted stock minus expected stock, for one item and one period.",
    "Rule out recording errors first, process problems second, and loss last.",
    "Value the gap in naira so you look at the costly items before the cheap ones.",
    "A small, steady variance is a sign the system works. A sudden change is the thing to chase.",
  ],
  body: [
    <>
      Stock variance is the difference between the stock you counted and the stock you expected to
      find. If your records say there should be 24 bottles of a spirit on the shelf and you count
      23, the variance is −1. The formula is the same for every item:{" "}
      <b>variance = counted − expected</b>.
    </>,
    <>
      A negative variance means less stock than expected, and a positive one means more. Either is
      a signal to look closer. (If you are new to counting, start with our guide to{" "}
      <Link href="/blog/how-to-run-a-bar-stock-count">running a bar stock count</Link>.)
    </>,

    { type: "h2", text: "Variance as a percentage" },
    "A gap of one bottle means something different on an item you hold ten of than on one you hold two hundred of. To compare items fairly, express the variance as a percentage of what you expected:",
    {
      type: "callout",
      tone: "formula",
      title: "Variance percentage",
      text: "Variance % = (counted − expected) ÷ expected × 100",
    },
    "One bottle short of 24 is about −4%. One bottle short of 200 is −0.5%. Same gap, very different stories.",

    { type: "h2", text: "Three families of cause" },
    "Almost every variance comes from one of three places. Look at them in this order, because the first is the cheapest to fix and the last should only be your conclusion once the others are ruled out.",
    { type: "h3", text: "1. Recording errors" },
    "Something happened but wasn’t written down: a delivery, a transfer between store and bar, a sale, a breakage. The stock is where it should be. The record is wrong.",
    { type: "h3", text: "2. Process differences" },
    "The stock was used, but not in the way the record assumes. Pours run a little generous, a bottle is spilled, staff drinks or tasting samples aren’t logged, or two counters estimate open bottles differently.",
    { type: "h3", text: "3. Loss" },
    "Stock has left the property without being sold or recorded. This is what most people fear first, and it is the conclusion to reach last. If you accuse before you’ve ruled out the first two, you will be wrong often enough to damage trust in the count itself.",

    { type: "h2", text: "A four-question check for any gap" },
    {
      type: "ol",
      items: [
        "Were all deliveries and transfers for the period recorded?",
        "Were all sales for the period entered, including open tabs?",
        "Did the counters use the same units and the same method for open bottles?",
        "Was anything broken, comped, or used for staff meals or events?",
      ],
    },
    "If all four answers are yes and the gap remains, it is a real gap, and it now has a smaller list of possible causes.",

    { type: "h2", text: "Put a value on it" },
    "Multiply the variance in units by the cost price of the item. Two bottles of a low-cost mixer and two bottles of premium spirit are the same variance in units and very different problems in naira. Sort your variances by value and start at the top.",

    { type: "h2", text: "Read the trend, not just the count" },
    "A single count can mislead. Keep the last few variances for each item side by side. A small, steady variance usually means your process is sound. A sudden jump, or the same item short week after week, is what needs attention.",
    {
      type: "product",
      id: "inventory",
      text: "Innbase shows the difference between expected and actual stock while there is still a useful conversation to have, and keeps the note of what was decided.",
    },
  ],
  faqs: [
    {
      q: "Is a negative stock variance always theft?",
      a: "No. Most negative variances come from unrecorded movements, spillage, breakage, or different counting methods. Rule those out first, then look at loss.",
    },
    {
      q: "What is the difference between variance and shrinkage?",
      a: "Variance is the measured gap between counted and expected stock. Shrinkage is the part of a negative variance that represents stock genuinely lost, once recording errors and process differences have been ruled out.",
    },
    {
      q: "How do I calculate stock variance?",
      a: "Subtract the expected quantity from the counted quantity. For a percentage, divide that result by the expected quantity and multiply by 100.",
    },
  ],
  relatedProducts: ["inventory"],
};

export default post;
