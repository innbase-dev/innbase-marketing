import Link from "next/link";

const post = {
  slug: "hotel-late-arrival-check-in",
  headline: "Late arrivals at 2 a.m.:",
  emphasis: "how to check guests in safely",
  seoTitle: "Hotel Late Arrival Check-In: A Safe Process",
  description:
    "A practical process for late-night hotel arrivals: confirming the booking, payment and identity, handing over room access, and what to record for the morning.",
  excerpt:
    "The guest’s flight landed late, the night porter is alone, and the booking note says “paid”. Here is a calm, safe way to check in a late arrival.",
  category: "operations",
  tags: ["late check-in", "night shift", "front desk", "room access", "guest safety"],
  publishedAt: "2026-11-21",
  author: "team",
  aiQuestion: "What should my night staff check before giving a late-arriving guest access to their room?",
  cover: {
    src: "/images/blog/hotel-late-arrival-check-in.svg",
    alt: "A hotel room door with a lit keypad under a crescent moon, beside a phone showing a key, representing late-night check-in.",
    width: 1600,
    height: 1200,
    tone: "oat",
  },
  takeaways: [
    "Before handing over a key, confirm three things: the booking, the payment and the guest’s identity.",
    "Late arrivals should follow the same rules as daytime ones, with fewer people to ask.",
    "Agree in advance who the night staff can call, and what they can decide alone.",
    "Record what was checked and what was left open, so the morning team isn’t guessing.",
  ],
  body: [
    "It is 1:40 a.m. A guest arrives from the airport, tired, with a booking “paid by transfer”. The night porter is alone at the desk. He can’t see the payment and doesn’t want to keep a paying guest waiting in the lobby. What he does next decides whether the morning starts calmly or with a problem.",

    { type: "h2", text: "Why are late arrivals risky?" },
    "At night, the people who usually confirm things are asleep: the manager who approves exceptions, the accountant who checks transfers, the reservations team who took the booking. Night staff are left to decide alone, under pressure from a tired guest. Most late arrivals are exactly who they say they are. The process exists for the few that aren’t, and to protect your staff from having to guess.",

    { type: "h2", text: "What should night staff check before giving a key?" },
    {
      type: "steps",
      items: [
        {
          title: "The booking",
          body: "Is there a booking for this guest, for tonight, for this room type? Check it hasn’t been cancelled or moved, and that the room is ready.",
        },
        {
          title: "The payment",
          body: "Has the deposit or full payment actually been received, or only claimed? If it hasn’t arrived, follow the agreed rule for unpaid arrivals rather than deciding on the spot.",
        },
        {
          title: "The guest",
          body: "Check a valid photo ID against the name on the booking. If someone else made the booking, confirm they are the guest named on it.",
        },
        {
          title: "The room access",
          body: "Issue a key or code for that room only, for that stay only. Note the time it was issued.",
        },
      ],
    },

    { type: "h2", text: "What if the payment hasn’t arrived?" },
    "This is the most common late-night problem, especially with bank transfers made shortly before arrival. Agree the rule in daylight, so night staff aren’t making it up at 2 a.m. Common options:",
    {
      type: "ul",
      items: [
        "Take payment at the desk by card or a transfer you can see arrive, then check the guest in.",
        "Allow check-in on a named manager’s approval, recorded with the reason, and with the balance clearly marked as still owed.",
        "Offer a different, smaller room the guest can pay for now, if one is available.",
      ],
    },
    "What matters is that an exception is a decision someone owns, not a favour that disappears. If a manager approves it, the record should say who approved it, for which stay, and that the money is still owed.",
    <>
      A screenshot is not proof that money has arrived. Our guide to{" "}
      <Link href="/blog/why-hotel-bank-transfers-go-unmatched">unmatched bank transfers</Link> explains
      why.
    </>,

    { type: "h2", text: "Who can night staff call?" },
    "Give the night team a short list: who to call for payment questions, who for security and who for maintenance. Agree which decisions they can make alone, such as moving a guest to an equivalent room, and which always need a call, such as checking someone in without payment. A laminated card at the desk is enough.",

    { type: "h2", text: "What should be recorded for the morning?" },
    {
      type: "table",
      caption: "A late arrival record",
      head: ["Record", "Example"],
      rows: [
        ["Arrival time", "1:40 a.m."],
        ["Booking and room", "Booking BK-2214, Room 108"],
        ["Identity checked", "Yes, photo ID matches the booking"],
        ["Payment status", "Deposit verified; balance of ₦27,500 due at checkout"],
        ["Exceptions", "None, or who approved what"],
        ["Access issued", "Key card for Room 108 until Sunday 11 a.m."],
      ],
    },
    <>
      Add late arrivals to your{" "}
      <Link href="/blog/shift-handover-checklist-hotel-restaurant">shift handover checklist</Link> so
      the morning team knows who arrived overnight and what is still open.
    </>,

    { type: "h2", text: "When should room access end?" },
    "Access should end with the stay. Key cards and codes that keep working after checkout are a common, avoidable risk. Set them to expire at checkout time, collect physical keys, and remove access straight away if a booking is cancelled or a guest is moved.",
    {
      type: "callout",
      tone: "watch",
      title: "Keep the tone right",
      text: "Checking a booking and an ID isn’t distrust. It protects the guest as much as the hotel. Explain it simply, and most guests will thank you for it.",
    },

    {
      type: "product",
      id: "doorAccess",
      text: "Innbase Door Access is being built to tie room access to the stay itself: granted when the booking, room and payment check out, and ended when the stay ends.",
    },
  ],
  faqs: [
    {
      q: "Should a hotel check in a late guest whose payment hasn’t arrived?",
      a: "Follow an agreed rule. Either take payment at the desk, or check them in only on a named manager’s approval with the balance recorded as still owed.",
    },
    {
      q: "What ID should a hotel ask for at check-in?",
      a: "A valid government-issued photo ID, such as a national ID card, international passport or driver’s licence, checked against the booking name.",
    },
    {
      q: "Can a night porter handle check-in alone?",
      a: "Yes, with a clear checklist, a list of who to call and limits on what they can decide alone. The process should protect them from having to guess.",
    },
    {
      q: "When should a guest’s key stop working?",
      a: "At checkout time, or immediately if the booking is cancelled or the guest moves rooms.",
    },
  ],
  relatedProducts: ["doorAccess", "rooms"],
};

export default post;
