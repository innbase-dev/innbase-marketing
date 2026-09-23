import Link from "next/link";

export default {
  slug: "shift-handover-checklist-hotel-restaurant",
  headline: "A shift handover checklist",
  emphasis: "for hotels and restaurants",
  seoTitle: "Shift Handover Checklist for Hotels and Restaurants",
  description:
    "A practical shift handover checklist for hotels, restaurants, and bars: cash, open tabs, room status, guest requests, and stock, plus tips to make it stick.",
  excerpt:
    "A good handover means the next team starts from what is true, not from what they can guess. Use this checklist for the front desk, restaurant, and bar.",
  category: "operations",
  tags: ["shift handover", "checklist", "front desk", "hotel staff"],
  publishedAt: "2026-08-19",
  updatedAt: "2026-09-04",
  author: "team",
  cover: {
    kind: "handover",
    label: "CLOSING HANDOVER",
    items: [
      ["Cash counted and signed", true],
      ["Open tabs listed", true],
      ["Room 204 late checkout", true],
      ["Bar stock counted", false],
    ],
  },
  takeaways: [
    "A handover should answer three questions: what is done, what is still open, and what is unusual.",
    "Use one checklist per area: front desk, restaurant and bar, housekeeping and maintenance, and cash.",
    "Keep it short, face to face, and written down. Ten minutes is enough.",
    "If it matters after you leave, it goes in the record, not in your head.",
  ],
  body: [
    "The most expensive words in a hotel are “I thought you knew.” A shift ends, a new team arrives, and something important stays behind in someone’s head: a late checkout, an unpaid tab, a guest still waiting on a request.",
    "A handover is the fix, and it is cheaper than the mistakes it prevents. This checklist covers the four areas that matter most.",

    { type: "h2", text: "What a handover needs to answer" },
    "Whatever the department, the outgoing team should be able to answer three questions for the team arriving:",
    {
      type: "ol",
      items: [
        "What is done? Sales closed, rooms turned over, counts finished.",
        "What is still open? Tabs, requests, repairs, and anything promised to a guest.",
        "What is unusual? Anything the next team would be surprised to find.",
      ],
    },

    { type: "h2", text: "The checklist" },
    { type: "h3", text: "Front desk" },
    {
      type: "ul",
      items: [
        "Arrivals and departures still expected, with any special notes.",
        "Rooms occupied, ready, and blocked, and the reason for each block.",
        "Late checkouts and extensions that were agreed.",
        "Guest requests still open, and who owns each one.",
        "Messages, keys, and deposits to pass on.",
      ],
    },
    { type: "h3", text: "Restaurant and bar" },
    {
      type: "ul",
      items: [
        "Open tabs listed by table, with amounts.",
        "Sales closed and the payment method recorded for each.",
        "High-value stock counted and any variance noted.",
        "Items out of stock or running low.",
        "Reservations, events, or large groups expected next.",
      ],
    },
    { type: "h3", text: "Housekeeping and maintenance" },
    {
      type: "ul",
      items: [
        "Rooms cleaned, pending, or blocked, with the reason.",
        "Maintenance issues opened, in progress, and closed.",
        "Supplies running low, such as linen and toiletries.",
      ],
    },
    { type: "h3", text: "Cash and payments" },
    {
      type: "ul",
      items: [
        "Cash counted by two people and signed for.",
        "POS and transfer totals by payment method.",
        "Transfers with no matching sale, listed for follow-up.",
        "Any float, advance, or supplier payment still owed.",
      ],
    },

    { type: "h2", text: "Keep it face to face, short, and written" },
    "Ten minutes is a good target. Walk through what is open and what is unusual rather than reading out everything that went well. Ask the incoming person to say back the two or three most important items, so you know they landed. Then write it down, and have both people sign off.",
    {
      type: "callout",
      title: "One rule to hold on to",
      text: "If it still matters after you leave, it goes in the record. Nothing important should live only in someone’s head.",
    },

    { type: "h2", text: "Why handovers fail" },
    {
      type: "ul",
      items: [
        "They are only verbal, so details fade within the hour.",
        "Open items have no owner, so everyone assumes someone else has them.",
        "The list is too long, and nobody reads it to the end.",
        "Nobody checks whether the handover is actually used.",
      ],
    },

    { type: "h2", text: "Start small" },
    <>
      You don’t need a perfect template on day one. Pick the five items your team forgets most
      often, use them for two weeks, and add to the list only when something slips through. The
      same discipline helps the money side: a closing{" "}
      <Link href="/blog/reconcile-bank-transfers-hotel-restaurant">reconciliation routine</Link>{" "}
      belongs on the cash checklist.
    </>,
    {
      type: "product",
      id: "shifts",
      text: "Innbase gives every shift a closeout that the next team can follow, with each person’s role and the open items in one place.",
    },
  ],
  faqs: [
    {
      q: "What should be included in a hotel shift handover?",
      a: "At minimum: arrivals and departures, room status, open guest requests, open tabs, cash and payment totals, stock notes, and anything unusual. Assign an owner to every open item.",
    },
    {
      q: "How long should a shift handover take?",
      a: "About ten minutes for most teams. If it takes much longer, the list is probably too long or the open items aren’t being recorded during the shift.",
    },
    {
      q: "Should handovers be written or verbal?",
      a: "Both. Talk it through so questions get asked, and write it down so it survives the shift.",
    },
  ],
  relatedProducts: ["shifts", "rooms"],
};
