import Link from "next/link";

const post = {
  slug: "hotel-occupancy-adr-revpar",
  headline: "Occupancy, ADR and RevPAR,",
  emphasis: "explained for small hotels",
  seoTitle: "Hotel Occupancy, ADR and RevPAR Explained",
  description:
    "How to calculate occupancy rate, average daily rate (ADR) and RevPAR for a Nigerian hotel, with worked naira examples and what each number tells you.",
  excerpt:
    "Three numbers tell you how hard your rooms are working. Here is how to calculate each one in naira, and what to do when they disagree.",
  category: "operations",
  tags: ["hotel KPIs", "occupancy rate", "ADR", "RevPAR", "rooms"],
  publishedAt: "2026-11-21",
  author: "team",
  aiQuestion: "Using my hotel's room numbers, how do I calculate occupancy, ADR and RevPAR, and which one should I watch?",
  cover: {
    src: "/images/blog/hotel-occupancy-adr-revpar.webp",
    alt: "A luggage trolley loaded with a suitcase and a holdall as guests arrive for the night.",
    width: 1600,
    height: 1200,
    tone: "sage",
  },
  takeaways: [
    "Occupancy = rooms sold ÷ rooms available. It tells you how full you were.",
    "ADR = room revenue ÷ rooms sold. It tells you what each sold room earned.",
    "RevPAR = room revenue ÷ rooms available. It combines the two, so it is the fairest single measure.",
    "Use the same rules every night: which rooms count as available, and which revenue counts as room revenue.",
  ],
  body: [
    "A 20-room hotel in Ibadan sells 16 rooms on Friday at an average of ₦45,000. The owner calls it a good night. The manager says rates were too low. They are both reading one number, occupancy, and arguing about another. Three simple measures settle the question: occupancy, average daily rate (ADR) and revenue per available room (RevPAR).",

    { type: "h2", text: "What is hotel occupancy rate?" },
    "Occupancy rate is the share of your available rooms that were sold for a night. Divide rooms sold by rooms available, then multiply by 100.",
    {
      type: "callout",
      title: "Formula",
      text: "Occupancy (%) = rooms sold ÷ rooms available × 100",
    },
    "In the example, 16 rooms sold out of 20 available is 80% occupancy. Occupancy tells you how full you were. It says nothing about the price you sold at.",

    { type: "h2", text: "What is ADR (average daily rate)?" },
    "ADR is the average room revenue earned for each room sold. Divide room revenue by the number of rooms sold.",
    {
      type: "callout",
      title: "Formula",
      text: "ADR = room revenue ÷ rooms sold",
    },
    "Sixteen rooms bringing in ₦720,000 gives an ADR of ₦45,000. ADR tells you about pricing. It ignores the rooms that stayed empty.",

    { type: "h2", text: "What is RevPAR, and why does it matter most?" },
    "RevPAR, or revenue per available room, divides room revenue by every room you could have sold, not only the rooms you did sell. You can also get it by multiplying ADR by occupancy.",
    {
      type: "callout",
      title: "Formula",
      text: "RevPAR = room revenue ÷ rooms available, or ADR × occupancy",
    },
    "For the Ibadan hotel: ₦720,000 ÷ 20 rooms = ₦36,000 RevPAR. RevPAR is the fairest single number because a hotel can only raise it in two ways: sell more rooms, or sell them for more.",

    { type: "h2", text: "A worked example: two Fridays compared" },
    "Here is the same hotel on two Fridays. Which one was better?",
    {
      type: "table",
      caption: "Two Fridays at a 20-room hotel",
      head: ["", "Friday A", "Friday B"],
      rows: [
        ["Rooms available", "20", "20"],
        ["Rooms sold", "16", "12"],
        ["Room revenue", "₦720,000", "₦780,000"],
        ["Occupancy", "80%", "60%"],
        ["ADR", "₦45,000", "₦65,000"],
        ["RevPAR", "₦36,000", "₦39,000"],
      ],
    },
    "Friday A looks busier. Friday B earned more from the same 20 rooms, with four fewer rooms to clean, stock and service. Neither occupancy nor ADR alone tells you that. RevPAR does.",
    "It is not the whole story, though. Guests in four extra rooms may also have eaten in the restaurant or used the bar. If they did, compare total revenue as well before you decide that higher rates are always the answer.",

    { type: "h2", text: "Which rooms count as available?" },
    "Most disagreements about these numbers come from counting, not arithmetic. Agree the rules once, write them down and use them every night:",
    {
      type: "ul",
      items: [
        "Rooms out of order for repairs: most hotels take them out of rooms available while they cannot be sold, and note why.",
        "Complimentary rooms: count them as sold with zero revenue, or leave them out of both figures. Pick one approach and keep it.",
        "Day use and short stays: decide whether they count as a room night, and record them separately so they don’t distort ADR.",
        "Room revenue: the room rate only. Keep food, drinks, laundry and taxes out of it.",
      ],
    },
    <>
      Rooms that are blocked without a reason quietly lower your RevPAR. Our{" "}
      <Link href="/blog/hotel-room-readiness-checklist">room readiness checklist</Link> helps the
      front desk and housekeeping agree which rooms can really be sold tonight.
    </>,

    { type: "h2", text: "How often should a hotel track these numbers?" },
    "Calculate all three every night, and look at them weekly and monthly. Compare like with like: this Friday with last Friday, this December with last December. A single night tells you very little. A trend over four weeks tells you whether your pricing, your occupancy or your room availability needs attention.",
    {
      type: "callout",
      tone: "watch",
      title: "Watch for this",
      text: "If occupancy rises while RevPAR falls, you are probably discounting to fill rooms. That is sometimes the right call on a slow night, but it should be a decision, not a habit.",
    },

    {
      type: "product",
      id: "rooms",
      text: "Innbase keeps every room’s status in one shared record, so the front desk and housekeeping agree which rooms can be sold before anyone counts them.",
    },
  ],
  faqs: [
    {
      q: "What is a good occupancy rate for a hotel in Nigeria?",
      a: "It depends on location, season and price point, so compare against your own history first. A rising RevPAR is a better sign of health than any single occupancy figure.",
    },
    {
      q: "What is the difference between ADR and RevPAR?",
      a: "ADR divides room revenue by rooms sold. RevPAR divides the same revenue by all rooms available, so it also reflects empty rooms. RevPAR equals ADR multiplied by occupancy.",
    },
    {
      q: "Should restaurant and bar sales be included in RevPAR?",
      a: "No. RevPAR uses room revenue only. Track food, drink and other revenue separately, or use a total revenue measure alongside RevPAR.",
    },
    {
      q: "Do out-of-order rooms count as available?",
      a: "Many hotels remove rooms that genuinely cannot be sold. Whatever you choose, apply the same rule every night and record the reason, or your numbers will not compare.",
    },
  ],
  relatedProducts: ["rooms", "owners"],
};

export default post;
