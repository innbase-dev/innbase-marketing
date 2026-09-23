import Link from "next/link";

const post = {
  slug: "how-to-run-a-bar-stock-count",
  headline: "How to run a bar stock count",
  emphasis: "that finds the gap",
  seoTitle: "How to Run a Bar Stock Count That Finds the Gap",
  description:
    "How to count bar stock in a hotel or lounge: when to count, who should count, the expected-versus-counted formula, and how to read the variance you find.",
  excerpt:
    "A count only helps if you know what you expected to find. Here is how to count bar stock, work out the variance, and decide what to do about it.",
  category: "stock",
  tags: ["stock count", "bar inventory", "variance", "hotel bar"],
  publishedAt: "2026-09-02",
  updatedAt: "2026-09-02",
  author: "team",
  aiQuestion: "How can my bar team run a reliable stock count, record movements and compare the count with our records?",
  cover: {
    src: "/images/blog/bar-stock-count.webp",
    alt: "Six bottles on a small bar shelf beside a stock-count checklist and pencil.",
    width: 1600,
    height: 1200,
    tone: "sage",
  },
  takeaways: [
    "A count tells you what is on the shelf. You need a second number, what should be there, to know if it is right.",
    "Variance = counted − expected. A negative number means less stock than expected.",
    "Count high-value items every shift, and everything on a fixed weekly rhythm.",
    "Have someone who doesn’t sell the stock do the counting, with a second person watching.",
  ],
  body: [
    "A stock count tells you what is on the shelf. It doesn’t tell you whether that is right. To know that, you need a second number: what should be on the shelf, given what came in and what was sold. The difference between the two is the variance, and it is one of the most useful numbers a bar produces.",

    { type: "h2", text: "The formula behind every count" },
    "For any item, the number you expect to find is what you started with, plus what came in, minus what went out.",
    {
      type: "callout",
      tone: "formula",
      title: "Expected and variance",
      text: (
        <>
          Expected = opening stock + purchases + transfers in − sales − transfers out.
          <br />
          Variance = counted − expected.
        </>
      ),
    },
    "Take one brand of spirit. You opened the day with 24 bottles, received 12, transferred 2 to the restaurant, and sold 30 bottles’ worth of drinks. You expect 24 + 12 − 2 − 30 = 4 bottles. You count 3. Your variance is −1: one bottle less than expected.",
    "If you sell by the measure, convert to bottles first. A 75cl bottle poured in 5cl measures gives 15 measures, so 45 measures sold is three bottles. Use your own pour size.",

    { type: "h2", text: "When to count" },
    "Count more often where a gap costs more. A workable rhythm for a hotel bar:",
    {
      type: "ul",
      items: [
        "High-value items such as spirits and champagne: at every shift close.",
        "The whole bar: once a week, at the same time on the same day.",
        "The whole bar, with a second person: at the end of every month.",
      ],
    },
    "Counting a few items often finds problems faster than counting everything rarely, because there are fewer movements to untangle.",

    { type: "h2", text: "Who should count" },
    "The person counting shouldn’t be the person selling the stock. Ask someone from outside the bar, such as a supervisor or the duty manager, to count, with the bartender or a second person watching.",
    "Where you can, count blind: record what you find without looking at the expected number first. It stops counts from drifting towards the answer everyone is hoping for.",

    { type: "h2", text: "How to count, step by step" },
    {
      type: "steps",
      items: [
        {
          title: "Pause movement",
          body: "No transfers, deliveries, or requisitions while you count. If something has to move, write it down first.",
        },
        {
          title: "Count full bottles",
          body: "Count sealed bottles by item, and keep the storeroom and the bar as separate counts.",
        },
        {
          title: "Estimate open bottles",
          body: "Agree a method, such as tenths of a bottle or weighing, and use it every time. Both people should agree each estimate.",
        },
        {
          title: "Write it down as you go",
          body: "Record each count straight away, by item and by location. A count remembered is a count changed.",
        },
        {
          title: "Compare with expected",
          body: "Only now compare the counted number with the expected one, and record the variance for each item.",
        },
      ],
    },

    { type: "h2", text: "Reading the variance" },
    <>
      The pattern of the gaps says more than the total. See our guide to{" "}
      <Link href="/blog/what-is-stock-variance">reading a stock variance</Link> for the full
      picture; this table is a starting point.
    </>,
    {
      type: "table",
      caption: "Common variance patterns and where to look first",
      head: ["What you see", "Common causes", "Check first"],
      rows: [
        [
          "Small shortages across many items",
          "Pour sizes drifting, spillage, breakage not logged",
          "Pour sizes and the breakage log",
        ],
        [
          "A shortage on one high-value item",
          "Sales not entered, free pours, a transfer not recorded",
          "Sales entries and transfers for that item",
        ],
        [
          "A surplus",
          "A delivery or transfer not recorded, or a sale entered but not poured",
          "Delivery notes and transfer records",
        ],
        [
          "The same gap every week",
          "A process problem rather than a one-off",
          "How the count itself is done",
        ],
      ],
    },

    { type: "h2", text: "What to do with the number" },
    "Don’t chase a perfect zero. Spillage, pour differences, and estimating open bottles mean a small variance is normal. Instead:",
    {
      type: "ul",
      items: [
        "Track your variance for a few weeks to learn what normal looks like for each category.",
        "Set a tolerance for each category, and investigate anything outside it.",
        "Put a value on the gap by multiplying units by cost, so you look at the expensive items first.",
        "Write down what you found and what you decided, so the next count starts with that context.",
      ],
    },
    {
      type: "product",
      id: "inventory",
      text: "Innbase records purchases, transfers, sales, and counts together, so the expected number is ready when you start counting.",
    },
  ],
  faqs: [
    {
      q: "How often should a hotel bar count stock?",
      a: "Count high-value spirits at every shift close, and do a full count weekly and at month end. Counting fewer items more often finds problems faster than one large count.",
    },
    {
      q: "What is an acceptable stock variance?",
      a: "There is no universal figure. Track your own variance for a few weeks to find your normal range, then investigate anything outside it. A perfect zero every time is rare, since spillage and pour differences add up.",
    },
    {
      q: "What is a blind stock count?",
      a: "The counter records what they find without seeing the expected number. It stops counts from drifting towards the answer people expect.",
    },
  ],
  relatedProducts: ["inventory", "sales"],
};

export default post;
