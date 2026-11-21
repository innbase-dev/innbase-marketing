import Link from "next/link";

const post = {
  slug: "hotel-loyalty-programme-cost",
  headline: "Does a loyalty programme pay?",
  emphasis: "Work out the cost before you launch",
  seoTitle: "Hotel and Bar Loyalty Programmes: Cost It First",
  description:
    "How hotels, restaurants and bars in Nigeria can design a simple loyalty programme, calculate what each reward really costs and avoid the usual mistakes.",
  excerpt:
    "A free meal after five visits sounds generous. Is it affordable? Here is how to cost a loyalty reward against the spend that earns it, in naira.",
  category: "payments",
  tags: ["loyalty programme", "regular guests", "restaurant", "bar", "revenue"],
  publishedAt: "2026-11-21",
  author: "team",
  aiQuestion: "How do I work out whether a loyalty reward at my hotel restaurant or bar is affordable?",
  cover: {
    src: "/images/blog/hotel-loyalty-programme-cost.webp",
    alt: "A pair of hotel slippers beside a drawstring gift pouch: a small reward for a returning guest.",
    width: 1600,
    height: 1200,
    tone: "oat",
  },
  takeaways: [
    "Cost a reward at what it costs you, not at its menu price.",
    "Compare that cost with the spend that earns it. That share is the real price of the programme.",
    "Base rewards on recorded sales, not stamp cards, so nobody has to argue about them.",
    "Start small, measure for three months, and only then expand.",
  ],
  body: [
    "Your bar has regulars who come every Friday. Your restaurant has families who come every Sunday. They are already loyal. A loyalty programme should give them one more reason to choose you, without quietly giving away margin you can’t afford. That starts with arithmetic, not with a card design.",

    { type: "h2", text: "What is a loyalty programme for a hotel, restaurant or bar?" },
    "A loyalty programme rewards guests for coming back or spending more. The reward might be a free meal after a number of visits, credit after a level of spending, a room upgrade or free Wi-Fi. The rule, the reward and how it is redeemed are yours to choose. The common types are:",
    {
      type: "table",
      caption: "Common loyalty programme types",
      head: ["Type", "Example", "Good for"],
      rows: [
        ["Visit frequency", "Free meal after 5 visits", "Restaurants and bars with regulars"],
        ["Cumulative spend", "₦10,000 credit after ₦150,000 spent", "Mixed spenders over time"],
        ["Spend threshold", "Upgrade on any stay over ₦200,000", "Encouraging bigger single visits"],
        ["Credit back", "5% of each bill as credit", "Simple, predictable programmes"],
      ],
    },

    { type: "h2", text: "How do you calculate what a reward really costs?" },
    "Use the cost to you, not the menu price. A ₦12,000 meal on the menu might cost you ₦5,000 in food and labour. A room upgrade costs little on a quiet night, and the full difference in rate on a busy one. Then compare that cost with the spend that earned it.",
    {
      type: "callout",
      title: "Formula",
      text: "Reward cost share (%) = cost of the reward ÷ spend needed to earn it × 100",
    },
    "Here is a worked example for a hotel restaurant, where the average visit is ₦15,000:",
    {
      type: "table",
      caption: "Costing three possible rewards",
      head: ["Rule", "Spend to earn it", "Reward cost to you", "Cost share"],
      rows: [
        ["Free meal after 5 visits", "₦75,000", "₦5,000", "6.7%"],
        ["Free meal after 3 visits", "₦45,000", "₦5,000", "11.1%"],
        ["₦10,000 credit after ₦100,000", "₦100,000", "₦10,000", "10%"],
      ],
    },
    "A 6.7% cost share might be easy to absorb. Above 10%, check it against your margin before launching. And remember that some of that spend would have happened anyway. The programme only pays for itself if it brings guests back more often or makes them spend more.",

    { type: "h2", text: "How do you know if it’s working?" },
    "Measure before and after. Pick a few numbers and track them monthly:",
    {
      type: "ul",
      items: [
        "How often members return, compared with before they joined.",
        "Average spend per visit for members and non-members.",
        "Rewards earned, rewards redeemed and their total cost.",
        "How many members are still active after three months.",
      ],
    },
    "Be honest about what the numbers show. If members visit no more often than before, the programme is a discount, not a loyalty programme.",

    { type: "h2", text: "What are the most common loyalty programme mistakes?" },
    {
      type: "ul",
      items: [
        "Stamp cards that guests lose and staff can stamp for friends.",
        "Asking guests to download an app before they can join.",
        "Rewards so far away that nobody reaches them.",
        "Rewards so close that they cost more than they bring in.",
        "No record of who redeemed what, so the cost is invisible.",
      ],
    },
    "The most reliable programmes are built on what you already record. If every sale is recorded and linked to a guest, by phone number for example, nobody needs a card and nobody needs to argue about stamps.",
    {
      type: "callout",
      tone: "watch",
      title: "Mind the data",
      text: "A phone number is personal data. Ask before you record it for a loyalty programme, explain what you use it for, and get consent before sending marketing messages.",
    },
    <>
      Read{" "}
      <Link href="/blog/hotel-guest-preferences-data-protection">
        remembering guest preferences without breaking their trust
      </Link>{" "}
      for how to ask.
    </>,

    { type: "h2", text: "Where should a small hotel start?" },
    "Start with one simple rule, one reward and one outlet, often the bar or restaurant where guests visit most often. Run it for three months, measure it, then decide. A small programme you understand beats a big one you can’t cost.",

    {
      type: "product",
      id: "loyalty",
      text: "Innbase Loyalty is in design. It is being designed to reward real recorded spend, recognise guests by phone number and show each reward’s cost before anyone redeems it. We’re looking for design partners.",
    },
  ],
  faqs: [
    {
      q: "What is a good loyalty reward for a hotel bar?",
      a: "Something guests value that costs you relatively little, such as a free drink or snack after a set number of visits. Cost it at your cost, not the menu price.",
    },
    {
      q: "How much should a loyalty programme cost?",
      a: "Many businesses aim to keep the cost of rewards to a small share of the spend that earns them. Work out your own figure from your margins, and review it after three months.",
    },
    {
      q: "Do loyalty programmes need an app?",
      a: "No. Many work well with a phone number at the till, which guests already share, as long as you ask for consent and explain how it is used.",
    },
    {
      q: "Should loyalty points expire?",
      a: "An expiry date keeps the cost predictable and encourages guests to return. State it clearly when guests join.",
    },
  ],
  relatedProducts: ["loyalty", "sales"],
};

export default post;
