import Link from "next/link";

export default {
  slug: "handle-guest-requests-whatsapp-calls-front-desk",
  headline: "Handling guest requests",
  emphasis: "from WhatsApp, calls, and the desk",
  seoTitle: "How to Handle Guest Requests From WhatsApp and Calls",
  description:
    "Guest requests reach a hotel by WhatsApp, phone, and the front desk. Log each one in a single place, give it an owner, and close every one with the guest.",
  excerpt:
    "A request that arrives in three places is easy to lose in all of them. Here is how to give every request one record, one owner, and a clear finish.",
  category: "operations",
  tags: ["guest requests", "WhatsApp", "front desk", "guest experience"],
  publishedAt: "2026-08-12",
  updatedAt: "2026-08-12",
  author: "team",
  cover: {
    kind: "request",
    label: "GUEST REQUEST",
    guest: "Could we get two extra towels in 305?",
    reply: "On it. Housekeeping is bringing them now.",
    status: "In progress",
  },
  takeaways: [
    "Requests get lost when they arrive in several channels and live in none of them.",
    "Give every request one record, one owner, and one visible status.",
    "Acknowledge quickly, even when the fix takes longer.",
    "Review the pattern each week: repeated requests point to something worth fixing.",
  ],
  body: [
    "A guest asks the front desk for two extra towels. A few minutes later, they message housekeeping on WhatsApp because it feels faster. Then they call reception from the room phone to check. Three channels, one request. Unless someone connects them, either nobody does it, or two people do.",
    "This is one of the most common service gaps in a busy property, and it has little to do with how hard your team works. It is a record-keeping problem, and it has a simple fix.",

    { type: "h2", text: "Why requests get lost" },
    {
      type: "ul",
      items: [
        "They arrive in several places at once: the desk, the phone, WhatsApp, and passing conversations.",
        "Nobody is clearly the owner, so everyone assumes someone else has it.",
        "There is no visible status, so the next person can’t tell whether it is done.",
        "Nobody tells the guest what is happening, so they ask again through another channel.",
      ],
    },

    { type: "h2", text: "One record, one owner, one finish" },
    {
      type: "steps",
      items: [
        {
          title: "Log it once",
          body: "Wherever the request arrives, write it in one shared place with the room, the request, and the time. Whoever hears it first does this, not whoever it seems to belong to.",
        },
        {
          title: "Name an owner",
          body: "One person or one department, such as housekeeping, maintenance, or the kitchen. “The team” is not an owner.",
        },
        {
          title: "Show a status the whole team can see",
          body: "Received, in progress, done. Anyone who picks up the phone should be able to answer “where is my request?” without asking around.",
        },
        {
          title: "Reply to the guest on the channel they used",
          body: "If they wrote on WhatsApp, answer on WhatsApp. A short “On it, ten minutes” is enough.",
        },
        {
          title: "Close it and note the time",
          body: "Mark it done when the guest has what they asked for, and record when. That time is what you will review later.",
        },
      ],
    },

    { type: "h2", text: "Set response times you can keep" },
    "Agree how quickly each kind of request should be acknowledged and completed, and tell your team. These are examples to adjust to your property and staffing:",
    {
      type: "table",
      caption: "Example response targets by request type",
      head: ["Request", "Owner", "Example target"],
      rows: [
        ["Towels, toiletries, extra linen", "Housekeeping", "Delivered within 15 minutes"],
        ["Air conditioning, plumbing, power", "Maintenance", "Acknowledged in 10 minutes; fixed the same day, or a room change offered"],
        ["Food and drink to the room", "Restaurant", "Preparation time quoted when the order is accepted"],
        ["Late checkout or extension", "Front desk", "Answered before the guest’s planned checkout time"],
      ],
    },
    "Acknowledging fast matters even when the fix takes longer. A guest who knows a repair is in hand waits far more patiently than one who hears nothing.",

    { type: "h2", text: "Using WhatsApp without letting it run the operation" },
    "Guests like WhatsApp because it is familiar, and that is a good reason to be on it. Two habits keep it manageable:",
    {
      type: "ul",
      items: [
        "Use a dedicated hotel number, not a staff member’s personal phone, so the conversation stays with the property when people change shifts.",
        "Move every request out of the chat and into your shared record straight away. The chat is where it arrives; the record is where it gets done.",
      ],
    },

    { type: "h2", text: "Read the pattern each week" },
    "Once a week, look at what was requested and how long it took. If towels are the most common request, stock more. If air conditioning repairs are slow, look at the maintenance queue. Guests are telling you where the property is under strain, in a form you can act on.",
    <>
      Requests are also worth listing in your{" "}
      <Link href="/blog/shift-handover-checklist-hotel-restaurant">shift handover</Link>, so an open
      request never ends with the shift.
    </>,
    {
      type: "product",
      id: "guest",
      text: "Guest Companion gives guests a direct way to reach your team, and each request moves through receipt, acceptance, and completion in the same record as the work.",
    },
  ],
  faqs: [
    {
      q: "How do hotels manage guest requests from WhatsApp?",
      a: "Use a dedicated hotel number, and log every request in one shared place as soon as it arrives. Give each one an owner and a status, and reply to the guest on WhatsApp so they know it is in hand.",
    },
    {
      q: "What is a good response time for guest requests?",
      a: "It depends on the request. Acknowledge quickly in every case, then agree a completion target for each type, for example within 15 minutes for towels. A guest who knows it is in hand waits more patiently.",
    },
    {
      q: "Why do guest requests get missed?",
      a: "Usually because they arrive in several channels, have no clear owner, and have no visible status. Fixing the record fixes most of it.",
    },
  ],
  relatedProducts: ["guest", "rooms"],
};
