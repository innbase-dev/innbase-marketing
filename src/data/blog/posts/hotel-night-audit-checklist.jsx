import Link from "next/link";

const post = {
  slug: "hotel-night-audit-checklist",
  headline: "What is a night audit?",
  emphasis: "A checklist for small hotels",
  seoTitle: "Hotel Night Audit Checklist for Small Hotels",
  description:
    "What a hotel night audit is, who should do it and a step-by-step checklist for small Nigerian hotels: rooms, charges, cash, POS, transfers and exceptions.",
  excerpt:
    "The night audit is where today’s trading becomes a record you can trust tomorrow. Here is what to check, in what order, and what to do with the gaps.",
  category: "payments",
  tags: ["night audit", "checklist", "front desk", "reconciliation", "hotel operations"],
  publishedAt: "2026-11-21",
  author: "team",
  aiQuestion: "What should my night auditor check each night at a small hotel, and in what order?",
  cover: {
    src: "/images/blog/hotel-night-audit-checklist.webp",
    alt: "A hotel front desk with paperwork, a card tray and a tablet, and a guest’s suitcase beside it.",
    width: 1600,
    height: 1200,
    tone: "oat",
  },
  takeaways: [
    "The night audit closes the hotel’s trading day and checks that rooms, charges and payments agree.",
    "Work in a fixed order: rooms, then charges, then payments, then exceptions.",
    "Every difference gets a reason and a name, not a quiet adjustment.",
    "The morning manager should be able to read the audit in five minutes.",
  ],
  body: [
    "At 2 a.m. the lobby is quiet, but the day isn’t finished. Room 12 checked out without settling the bar bill, a ₦25,000 transfer arrived with no reference, and the POS total doesn’t match the receipts in the drawer. The night audit is the routine that finds those things before they turn into tomorrow’s argument.",

    { type: "h2", text: "What is a hotel night audit?" },
    "A night audit is the daily check that closes the hotel’s trading day. The auditor confirms that every occupied room is charged, every charge is recorded once, every payment is accounted for and every difference is written down. Large hotels have a dedicated night auditor. In a small hotel, it is usually the night receptionist or duty manager, working from a checklist.",
    "The goal isn’t to make the numbers balance. It is to make sure that tomorrow’s team starts from what is true.",

    { type: "h2", text: "When should the night audit happen?" },
    "Pick a fixed cut-off, often between midnight and 2 a.m., when arrivals have slowed and the restaurant and bar have closed. Whatever time you choose, keep it the same every night. A consistent cut-off is what makes one day comparable with the next.",

    { type: "h2", text: "The night audit checklist" },
    {
      type: "steps",
      items: [
        {
          title: "Check every room’s status",
          body: "Walk through the room list. Is every occupied room really occupied, and every departure really gone? Look for no-shows, late arrivals still expected and rooms marked out of order.",
        },
        {
          title: "Post room charges",
          body: "Make sure each occupied room has tonight’s rate, at the agreed price. Check that discounts and complimentary rooms were approved, and by whom.",
        },
        {
          title: "Close the outlets",
          body: "Confirm the restaurant and bar have closed every order. Open tabs and unpaid room charges are the most common source of missing money.",
        },
        {
          title: "Count and compare cash",
          body: "Count the cash with a second person if you can. Compare it with the cash sales recorded for the day, and note the difference, however small.",
        },
        {
          title: "Compare POS and transfers",
          body: "Total the POS receipts and compare them with the terminal’s end-of-day report. List bank transfers received and match each one to a sale or booking.",
        },
        {
          title: "Write up the exceptions",
          body: "Every difference gets a line: what it is, the amount, the likely reason and who will follow up. Don’t adjust a figure to make it fit.",
        },
        {
          title: "Hand over",
          body: "Leave a short summary for the morning manager: rooms sold, revenue by type, cash position and the exception list.",
        },
      ],
    },

    { type: "h2", text: "What does a night audit summary include?" },
    "A useful summary fits on one page. Keep it the same shape every night so the manager can spot changes quickly.",
    {
      type: "table",
      caption: "A one-page night audit summary",
      head: ["Section", "What to show"],
      rows: [
        ["Rooms", "Rooms available, sold, complimentary and out of order"],
        ["Revenue", "Rooms, restaurant, bar and other, kept separate"],
        ["Payments", "Cash counted, POS total, transfers matched and unmatched"],
        ["Balances", "Guests checked out with money still owed, and open tabs"],
        ["Exceptions", "Each difference, its amount, reason and owner"],
      ],
    },
    <>
      Matching transfers is usually the slowest part of the audit. Our guide to{" "}
      <Link href="/blog/reconcile-bank-transfers-hotel-restaurant">reconciling bank transfers</Link>{" "}
      sets out a routine that works for the restaurant as well as the front desk.
    </>,

    { type: "h2", text: "What are the most common night audit problems?" },
    {
      type: "ul",
      items: [
        "A guest checked out but the room still shows as occupied, so the rate is charged twice.",
        "A room charge from the bar was never posted to the room.",
        "A transfer screenshot was accepted as payment, but no money has arrived.",
        "The POS report and the receipts differ because a sale was voided on one but not the other.",
        "Cash is short by a small amount every night on the same shift.",
      ],
    },
    {
      type: "callout",
      tone: "watch",
      title: "Keep the tone right",
      text: "A night audit difference is a question, not an accusation. Most are timing or entry mistakes. Write down what you found, and let the morning manager decide what happens next.",
    },

    { type: "h2", text: "Does a small hotel really need a night audit?" },
    "Yes, and arguably more than a large one. In a small hotel, the same person often takes the booking, sells the drink and receives the payment. A short, fixed routine at the end of each day is the simplest control you have. Fifteen minutes a night is cheaper than a month-end search for missing money.",

    {
      type: "product",
      id: "payments",
      text: "Innbase keeps each payment with the order it belongs to. Transfers are applied only when the reference matches exactly, and anything uncertain waits for a manager, so the audit starts from facts.",
    },
  ],
  faqs: [
    {
      q: "Who should do the night audit in a small hotel?",
      a: "Usually the night receptionist or duty manager. Ideally, someone who did not take most of the day’s payments checks them, or a second person reviews the summary in the morning.",
    },
    {
      q: "How long does a night audit take?",
      a: "For a small hotel with a clear checklist, 15 to 30 minutes. It takes longer when transfers have no references or outlets close late with open orders.",
    },
    {
      q: "What should the night auditor do if cash doesn’t balance?",
      a: "Record the difference and the count, recount with a second person if possible, and leave it for the manager. Never adjust the figures or top up the drawer to hide a gap.",
    },
    {
      q: "Is the night audit the same as a shift handover?",
      a: "No. A handover passes open work to the next team. The night audit closes the trading day and checks the figures. Most hotels need both.",
    },
  ],
  relatedProducts: ["payments", "shifts"],
};

export default post;
