import Link from "next/link";

const post = {
  slug: "hotel-room-hold-deposit-policy",
  headline: "How long should you hold a room",
  emphasis: "before the deposit arrives?",
  seoTitle: "Hotel Room Holds and Deposit Policy: A Guide",
  description:
    "How to hold a room for a WhatsApp or phone booking without losing the sale: deposit deadlines, what to tell the guest and when to release the room.",
  excerpt:
    "A guest on WhatsApp says “hold it for me, I’ll send the deposit.” Here is how to hold the room fairly, set a deadline and release it without a row.",
  category: "operations",
  tags: ["bookings", "deposits", "room holds", "WhatsApp", "front desk"],
  publishedAt: "2026-11-21",
  author: "team",
  aiQuestion: "What room hold and deposit policy should my hotel use for bookings that come in on WhatsApp or by phone?",
  cover: {
    src: "/images/blog/hotel-room-hold-deposit-policy.svg",
    alt: "A calendar with one day held by a clock, beside a chat bubble and a room key, representing a timed room hold.",
    width: 1600,
    height: 1200,
    tone: "sage",
  },
  takeaways: [
    "A hold is a promise with an end time. Give every hold a deadline and tell the guest what it is.",
    "A booking is confirmed when the deposit is received, not when the guest says it has been sent.",
    "Release expired holds on time, and offer the guest the next available room.",
    "Write the policy down so every receptionist applies it the same way.",
  ],
  body: [
    "It’s Thursday evening. A guest messages on WhatsApp: “Please hold the deluxe for Saturday, I’ll send the deposit tomorrow.” An hour later, someone calls asking for the same room and offers to pay now. Who gets it? Without a clear hold policy, the answer depends on who picks up the phone.",

    { type: "h2", text: "What is a room hold?" },
    "A room hold, sometimes called a provisional or tentative booking, takes a room off sale for a limited time while the guest arranges payment. It protects the guest who asked first. It also costs you, because while the room is held, nobody else can book it. That is why every hold needs an end time.",

    { type: "h2", text: "How long should a hotel hold a room without a deposit?" },
    "There is no single right answer, but most small hotels choose a window measured in hours, not days, and shorten it as the stay gets closer. A practical starting point:",
    {
      type: "table",
      caption: "An example hold policy",
      head: ["When the stay starts", "Hold for", "Then"],
      rows: [
        ["More than a week away", "24 hours", "Release unless the deposit has been received"],
        ["Within a week", "6 hours", "Release unless the deposit has been received"],
        ["Tonight or tomorrow", "1 to 2 hours", "Release, or ask for payment on arrival only if you accept that risk"],
        ["Peak dates and events", "Shorter, or no hold", "Book only on deposit"],
      ],
    },
    "Adjust the times to your demand. The point is not the exact number of hours. It is that every receptionist uses the same rule and every guest is told the deadline at the start.",

    { type: "h2", text: "When is a booking actually confirmed?" },
    "A booking is confirmed when your hotel has received the deposit, not when the guest says it has been sent. A transfer screenshot is a claim. The credit in your account is the evidence. Until it arrives, the room is held, not booked.",
    {
      type: "callout",
      title: "The one-line version",
      text: "Held until a time you’ve stated. Confirmed when the money arrives. Released when the time runs out.",
    },
    <>
      Matching that deposit to the right booking is easier when the guest uses a reference. Our guide
      to <Link href="/blog/why-hotel-bank-transfers-go-unmatched">why transfers go unmatched</Link>{" "}
      explains what to ask for.
    </>,

    { type: "h2", text: "What should you tell the guest?" },
    "Say three things when you place the hold: the room and dates, the deposit amount and how to pay, and the exact time the hold ends. Put it in writing, in the same chat. For example:",
    {
      type: "quote",
      text: "We’re holding the Deluxe Room for Saturday 5 December, one night, at ₦55,000. To confirm, please transfer the ₦27,500 deposit to the account below with the reference BK-2214 by 6 p.m. today. After that we’ll release the room, but we’ll happily check availability again.",
    },
    "Clear wording prevents most disputes. A guest who knew the deadline is far less likely to be upset when the room is released.",

    { type: "h2", text: "What if two guests want the same room?" },
    "The guest with the active hold keeps it until the deadline. Tell the second guest honestly that the room is held, offer an alternative and offer to contact them if it is released. Never hold the same room for two people at once, and never quietly give a held room to whoever pays first. That is how double bookings start.",
    <>
      If double bookings are already a problem, read{" "}
      <Link href="/blog/preventing-hotel-double-bookings">how to prevent hotel double bookings</Link>{" "}
      alongside this guide.
    </>,

    { type: "h2", text: "How do you release a hold without upsetting the guest?" },
    {
      type: "steps",
      items: [
        { title: "Check once more", body: "Before releasing, check whether the deposit has arrived. Late transfers are common." },
        { title: "Release on time", body: "Release at the stated time. A hold that runs on indefinitely isn’t a policy." },
        { title: "Tell the guest", body: "Send a short, polite message saying the hold has ended and the room is back on sale." },
        { title: "Offer the next step", body: "If they still want to stay, check availability again and offer a new hold or immediate booking." },
      ],
    },

    { type: "h2", text: "What about corporate guests and regulars?" },
    "Some guests are trusted to pay later: a company with an agreement, or a long-standing regular. Treat them as an approved exception, not as a way around the policy. Record who approved the credit, the limit and when payment is due, so the booking is confirmed on agreed terms and everyone can see the amount is still owed.",

    {
      type: "product",
      id: "bookingEngine",
      text: "Innbase’s booking engine is being built around this rule: one room, one guest, with timed holds that end on schedule and confirmation when the deposit is verified.",
    },
  ],
  faqs: [
    {
      q: "Is a transfer screenshot enough to confirm a booking?",
      a: "No. Treat a screenshot as a claim and confirm the booking only when the deposit appears in your account.",
    },
    {
      q: "How much deposit should a hotel ask for?",
      a: "Many hotels ask for the first night or a percentage of the stay, often 50%. Choose an amount that covers the cost of the room going unsold, and state it clearly.",
    },
    {
      q: "Can a hotel cancel a booking if the deposit isn’t paid?",
      a: "If you told the guest the deadline and it has passed, you can release the hold. Write the policy down and share it before the guest commits.",
    },
    {
      q: "Should holds be shorter on busy dates?",
      a: "Yes. When demand is high, a long hold costs more because other guests are being turned away. Many hotels book only on deposit for peak dates.",
    },
  ],
  relatedProducts: ["bookingEngine", "rooms"],
};

export default post;
