import Link from "next/link";

const post = {
  slug: "restaurant-food-cost-percentage",
  headline: "How to calculate food cost percentage",
  emphasis: "for a hotel restaurant",
  seoTitle: "How to Calculate Restaurant Food Cost Percentage",
  description:
    "The food cost percentage formula, a worked naira example for a hotel kitchen, and how to cost a single dish so your menu prices cover rising ingredient costs.",
  excerpt:
    "When tomatoes, rice and cooking gas all go up in one month, your menu prices are probably wrong. Here is how to calculate food cost and check.",
  category: "stock",
  tags: ["food cost", "kitchen", "menu pricing", "inventory", "restaurant"],
  publishedAt: "2026-11-21",
  author: "team",
  aiQuestion: "How do I calculate food cost percentage for my hotel kitchen and use it to check my menu prices?",
  cover: {
    src: "/images/blog/restaurant-food-cost-percentage.svg",
    alt: "A plate of food on a kitchen scale beside a pie chart, representing food cost as a share of sales.",
    width: 1600,
    height: 1200,
    tone: "sage",
  },
  takeaways: [
    "Food cost % = (opening stock + purchases − closing stock) ÷ food sales × 100.",
    "Calculate it for the same period every time, usually weekly or monthly.",
    "Cost your top dishes individually, so you know which ones need a price change.",
    "A rising food cost percentage means prices, portions, waste or stock losses need attention.",
  ],
  body: [
    "Ingredient prices can move every month. If your jollof rice was priced when rice, tomatoes and cooking gas were cheaper, each plate may now earn far less than you think. Food cost percentage is the number that tells you, and it takes one stock count and one formula to calculate.",

    { type: "h2", text: "What is food cost percentage?" },
    "Food cost percentage is the share of your food sales that was spent on the ingredients used to make them. A food cost of 35% means that for every ₦10,000 of food sold, ₦3,500 went on ingredients.",

    { type: "h2", text: "How do you calculate food cost percentage?" },
    "First work out the cost of food used in the period, then divide it by food sales for the same period.",
    {
      type: "callout",
      title: "Formula",
      text: "Food cost % = (opening stock + purchases − closing stock) ÷ food sales × 100",
    },
    "Opening stock is the value of food in the store and kitchen at the start of the period. Purchases are everything you bought during it. Closing stock is what was left at the end. Together they give you the cost of food used.",

    { type: "h2", text: "A worked example" },
    {
      type: "table",
      caption: "One month in a hotel kitchen",
      head: ["Line", "Amount"],
      rows: [
        ["Opening stock (1 October)", "₦850,000"],
        ["Purchases in October", "₦2,400,000"],
        ["Closing stock (31 October)", "₦700,000"],
        ["Cost of food used", "₦2,550,000"],
        ["Food sales in October", "₦7,000,000"],
        ["Food cost percentage", "36.4%"],
      ],
    },
    "₦850,000 + ₦2,400,000 − ₦700,000 = ₦2,550,000. Divide by ₦7,000,000 food sales and the kitchen’s food cost is 36.4%.",

    { type: "h2", text: "What is a good food cost percentage?" },
    "Many restaurants aim for somewhere between 28% and 35%, but the right figure depends on your menu, prices and style of service. A hotel buffet, a grill and a fine-dining menu will all differ. Rather than chasing an industry number, set a target from your own margins and watch the trend. If it rises from 32% to 38% over two months, something has changed.",

    { type: "h2", text: "How do you cost a single dish?" },
    "The kitchen-wide figure tells you there is a problem. Costing individual dishes tells you where. List every ingredient in one portion, at today’s purchase price:",
    {
      type: "table",
      caption: "Costing one plate of jollof rice and chicken",
      head: ["Ingredient", "Quantity per plate", "Cost"],
      rows: [
        ["Rice", "200 g", "₦500"],
        ["Tomato and pepper base", "1 portion", "₦450"],
        ["Chicken", "1 piece", "₦1,600"],
        ["Oil, seasoning and gas", "Allowance", "₦350"],
        ["Plantain side", "1 portion", "₦300"],
        ["Total cost per plate", "", "₦3,200"],
      ],
    },
    "If the dish sells for ₦8,500, its food cost is ₦3,200 ÷ ₦8,500 = 37.6%. To bring it to 32%, the price would need to be about ₦10,000, or the portion or recipe would need to change. The prices in this table are only an example. Use your own invoices.",

    { type: "h2", text: "Why does food cost rise?" },
    {
      type: "ul",
      items: [
        "Supplier prices went up, but menu prices didn’t.",
        "Portions have grown, one generous serving at a time.",
        "Waste: food spoiled, over-prepared or returned.",
        "Stock losses: items leaving the store without a sale.",
        "Staff meals or complimentary dishes recorded as nothing at all.",
        "Sales not recorded, so the same food cost is spread over less revenue.",
      ],
    },
    <>
      A stock count is only useful next to what you expected to find. Read{" "}
      <Link href="/blog/what-is-stock-variance">what stock variance is and how to calculate it</Link>{" "}
      to work out where the difference went.
    </>,

    { type: "h2", text: "How often should a hotel kitchen check food cost?" },
    "Monthly at a minimum, and weekly if prices are moving quickly. Count stock at the same time each period, using the same units, and re-cost your best-selling dishes whenever a key ingredient changes price.",

    {
      type: "product",
      id: "inventory",
      text: "Innbase records stock received, moved and adjusted in one place, so opening and closing figures come from the same record your kitchen and store already use.",
    },
  ],
  faqs: [
    {
      q: "What is the formula for food cost percentage?",
      a: "Food cost percentage equals opening stock plus purchases minus closing stock, divided by food sales for the same period, multiplied by 100.",
    },
    {
      q: "What is a good food cost percentage for a restaurant?",
      a: "Many restaurants aim for roughly 28% to 35%, but the right target depends on your menu and prices. Track your own trend over time.",
    },
    {
      q: "Should drinks be included in food cost?",
      a: "No. Calculate beverage cost separately, because drinks usually have very different margins.",
    },
    {
      q: "How do I lower my food cost without raising prices?",
      a: "Check portion sizes, reduce waste, review supplier prices and make sure every dish sold is recorded. Recipe changes can help too.",
    },
  ],
  relatedProducts: ["inventory", "restaurants"],
};

export default post;
