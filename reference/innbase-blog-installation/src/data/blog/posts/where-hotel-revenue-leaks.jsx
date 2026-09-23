import Link from "next/link";

export default {
  slug: "where-hotel-revenue-leaks",
  headline: "Seven places hotel revenue leaks",
  emphasis: "and how to check each one",
  seoTitle: "Where Hotel Revenue Leaks: 7 Places to Check",
  description:
    "Unrecorded sales, unmatched transfers, missed room extras, and stock that vanishes. Seven places hotel and restaurant revenue leaks, with a simple check for each.",
  excerpt:
    "Most leaks aren’t dramatic. They are small gaps between what was sold, what was recorded, and what reached the bank. Here is where to look first.",
  category: "payments",
  tags: ["revenue leakage", "hotel management", "internal controls"],
  publishedAt: "2026-09-09",
  updatedAt: "2026-09-09",
  author: "team",
  cover: {
    kind: "ledger",
    label: "WHERE THE GAP SITS",
    rows: [
      ["Sold and recorded", "₦412,000"],
      ["Received and matched", "₦398,500"],
    ],
    status: "Gap to explain: ₦13,500",
    flag: true,
  },
  takeaways: [
    "Revenue rarely disappears in one moment. It slips through small gaps between sale, record, and bank.",
    "Each of the seven leaks below has one check you can run this week.",
    "Treat every gap as a question about the process before it becomes a question about a person.",
    "Start with two checks: a two-person cash count, and a weekly list of transfers with no sale.",
  ],
  body: [
    "Revenue rarely disappears in one dramatic moment. It slips through small gaps: an order that was never rung up, a transfer nobody matched, a bottle poured and never sold. None of them looks serious alone. Together, they can change what a good month feels like.",
    "Use this list as a walkthrough. For each place, you’ll find what the leak looks like and one check you can run this week.",

    { type: "h2", text: "Sales that never reach the record" },
    "A drink is served, a meal is sent out, a guest is charged in cash, and nobody enters it. It happens most in the busiest hour, when someone says “I’ll ring it in later” and later never comes.",
    <>
      <b>Check it:</b> compare what stock says was used against what the sales record says was
      sold, for the same few days. Any item that left without a sale is worth a conversation.
    </>,

    { type: "h2", text: "Payments nobody matched" },
    "A transfer arrives with no sale attached, or a sale is marked paid with no payment behind it. Left alone, both pile up until nobody remembers what they were for.",
    <>
      <b>Check it:</b> list the last seven days of bank credits and look for any without a
      matching sale. Our guide to{" "}
      <Link href="/blog/reconcile-bank-transfers-hotel-restaurant">
        reconciling bank transfers at a hotel restaurant
      </Link>{" "}
      walks through the routine.
    </>,

    { type: "h2", text: "Cash that isn’t counted the same way twice" },
    "Cash is the easiest money to lose track of, because it leaves no trail of its own. If it is counted once, by one person, at an unpredictable time, there is nothing to check it against.",
    <>
      <b>Check it:</b> count cash at the start and end of each shift with a second person, and
      compare the closing count with the cash sales in your record.
    </>,

    { type: "h2", text: "Discounts and complimentary items with no reason" },
    "Discounts, staff meals, and “on the house” rounds are normal in hospitality. The leak is when they are given without a name or a reason attached, so no one can tell a generous gesture from a habit.",
    <>
      <b>Check it:</b> require a reason and an approver for every discount and complimentary item,
      then review the weekly total by person and by outlet.
    </>,

    { type: "h2", text: "Room extras that never reach the folio" },
    "Minibar items, laundry, an extra guest, a late checkout, an airport pickup. Each is small, and each has to travel from the person who provided it to the guest’s bill.",
    <>
      <b>Check it:</b> at checkout, walk through a short list of extras for each room. Once a
      week, pick ten checked-out stays and compare their folios with housekeeping and laundry
      notes.
    </>,

    { type: "h2", text: "Stock that leaves without a sale" },
    "Free pours, breakage that was never logged, transfers between the store and the bar that nobody wrote down, deliveries that arrive short. The bottle is gone, and there is no sale to explain it.",
    <>
      <b>Check it:</b> run a regular count and compare it with what you expected to find. Our{" "}
      <Link href="/blog/how-to-run-a-bar-stock-count">bar stock count guide</Link> shows how.
    </>,

    { type: "h2", text: "Bookings that don’t match what was paid" },
    "A phone booking at a private rate, a discount for a regular guest, a deposit that was received but never applied to the final bill. The room was sold, but not at the price your record shows.",
    <>
      <b>Check it:</b> for a sample of recent stays, compare the agreed rate and the deposit with
      what was finally collected.
    </>,

    { type: "h2", text: "Where to start" },
    "You don’t need to fix seven things at once. Pick two: one count and one match. A two-person cash count and a weekly list of transfers with no sale need no new tools, and between them they cover the places money most often slips.",
    "Track how many gaps you find and how many you close each week. The number should shrink. If it doesn’t, it is the routine that needs attention, not the people running it.",
    {
      type: "product",
      id: "owners",
      text: "Owners and managers see the same connected record as the team. Sales, payments, stock, and shifts sit together, so every gap has a trail to follow.",
    },
  ],
  faqs: [
    {
      q: "What is revenue leakage in a hotel?",
      a: "Revenue leakage is money your property earned but didn’t collect, record, or keep. Examples include a sale that wasn’t entered, a payment that wasn’t matched, a room extra that wasn’t billed, or stock that left without being sold.",
    },
    {
      q: "How much revenue does a typical hotel lose?",
      a: "There isn’t one reliable number, and it is worth being wary of anyone who quotes one. It depends on your volume, your controls, and how you measure. The useful figure is your own: the total value of the gaps you find in a month.",
    },
    {
      q: "Where should a small hotel start?",
      a: "Start with the two checks that need no new tools: a two-person cash count at shift close, and a weekly list of bank transfers with no matching sale.",
    },
  ],
  relatedProducts: ["owners", "payments"],
};
