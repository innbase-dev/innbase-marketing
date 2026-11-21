import Link from "next/link";

const post = {
  slug: "hotel-guest-preferences-data-protection",
  headline: "Remembering guest preferences",
  emphasis: "without breaking their trust",
  seoTitle: "Hotel Guest Preferences and Data Protection",
  description:
    "How Nigerian hotels can record guest preferences that improve each stay, while respecting consent and the Nigeria Data Protection Act 2023.",
  excerpt:
    "Guests love being remembered, and hate feeling watched. Here is what to record about returning guests, how to ask, and what to leave out.",
  category: "operations",
  tags: ["guest preferences", "guest experience", "data protection", "NDPA", "returning guests"],
  publishedAt: "2026-11-21",
  author: "team",
  aiQuestion: "Which guest preferences should my hotel record, and how do we ask for consent in a way guests are comfortable with?",
  cover: {
    src: "/images/blog/hotel-guest-preferences-data-protection.webp",
    alt: "A hotel bed with two pillows and a pair of slippers on the rug.",
    width: 1600,
    height: 1200,
    tone: "sage",
  },
  takeaways: [
    "Record preferences that change the stay, such as a quiet room or a high floor, not everything you notice.",
    "Tell guests what you keep and why, and let them change their mind.",
    "Only staff who need a preference to serve the guest should see it.",
    "Keep health information and anything sensitive out of everyday notes.",
  ],
  body: [
    "Mrs Bello has stayed with you three times. Each time she asks for a quiet room away from the lift, and each time a different receptionist learns this from scratch. The receptionist who remembered her has moved on, and so has what she knew. Your best receptionist remembers everyone. The hotel should too, with the guest’s agreement.",

    { type: "h2", text: "Which guest preferences are worth recording?" },
    "Record what changes how you prepare the stay. A good test: would the room, the welcome or the service be different if the team knew this before arrival?",
    {
      type: "table",
      caption: "Preferences worth keeping, and notes to leave out",
      head: ["Worth recording", "Leave out of everyday notes"],
      rows: [
        ["Quiet room, away from the lift", "Opinions about the guest"],
        ["High or low floor", "Who they arrived with"],
        ["Firm or soft pillow", "Health conditions, unless the guest asks you to record them and you handle them as sensitive"],
        ["Express or assisted check-in", "Religious or political beliefs"],
        ["Preferred room type", "Anything the guest would be surprised to read"],
      ],
    },
    "That last line is the best rule of all. If a guest asked to see their profile, would they be pleased or uncomfortable? Write only what passes that test.",

    { type: "h2", text: "What does Nigerian data protection law say?" },
    "Guest preferences are personal data, so the Nigeria Data Protection Act 2023 applies. The Act was signed in June 2023, and the Nigeria Data Protection Commission’s General Application and Implementation Directive, which explains how it applies in practice, took effect in September 2025. In plain terms, a hotel should:",
    {
      type: "ul",
      items: [
        "Have a lawful basis for keeping each piece of information. For optional preferences, the guest’s consent is usually the clearest.",
        "Tell guests what you collect, why and for how long.",
        "Collect only what you need for the stated purpose.",
        "Let guests withdraw consent and ask what you hold about them.",
        "Get consent before using personal data for direct marketing, and take extra care with sensitive data such as health information.",
        "Keep the data secure, and limit who can see it.",
      ],
    },
    {
      type: "callout",
      title: "Not legal advice",
      text: "This is a practical summary, not legal advice. Your obligations depend on your size and how you process data. Ask a data protection professional to review your privacy notice and processes.",
    },

    { type: "h2", text: "How should you ask a guest for consent?" },
    "Ask simply, at a natural moment, and make it easy to say no. Check-in and the end of a first stay both work well. For example:",
    {
      type: "quote",
      text: "Would you like us to remember your room preferences for next time? We’ll keep them for our front desk team only, and you can ask us to remove them whenever you like.",
    },
    "Record the answer, the date and how it was given. If the guest says no, the stay should be just as good. Consent that is a condition of service isn’t really consent.",

    { type: "h2", text: "Who in the hotel should see guest preferences?" },
    "Only the people who need them to serve the guest. The front desk needs room preferences. Housekeeping may need to know about the pillow. The night security guard doesn’t need either. Limiting access isn’t bureaucracy. It is what makes it safe to remember things at all.",
    "Two habits help: keep preferences in one place rather than in personal notebooks and WhatsApp chats, and remove a staff member’s access the day they leave.",

    { type: "h2", text: "What happens when a guest changes their mind?" },
    "Remove the preferences you were keeping on the basis of their consent, and confirm that you have done so. Records you need for other reasons, such as the booking and payment history, are kept under their own rules. The guest is simply treated as a first-time guest for preferences from then on.",
    <>
      Remembering preferences works best alongside good request handling. Read{" "}
      <Link href="/blog/handle-guest-requests-whatsapp-calls-front-desk">
        how to handle guest requests from WhatsApp, calls and the front desk
      </Link>{" "}
      for the day-to-day side.
    </>,

    {
      type: "product",
      id: "guestIntelligence",
      text: "Innbase Guest Intelligence is being built around consent: guests choose what is remembered, staff see preferences only when access is given, and a guest can withdraw at any time.",
    },
  ],
  faqs: [
    {
      q: "Do hotels in Nigeria need consent to store guest preferences?",
      a: "Hotels need a lawful basis for processing personal data under the Nigeria Data Protection Act 2023. For optional preferences, consent is usually the clearest basis. Take professional advice on your specific processes.",
    },
    {
      q: "Can a hotel use guest data for marketing?",
      a: "Only with the right basis. Under the Commission’s 2025 directive, direct marketing requires consent, and guests should be able to opt out easily.",
    },
    {
      q: "Should hotels record guests’ health information?",
      a: "Only if the guest asks you to and there is a clear reason, such as a serious allergy for the kitchen. Treat it as sensitive data, with explicit consent and limited access.",
    },
    {
      q: "What should a hotel do if a guest asks what data it holds?",
      a: "Respond promptly, show them what you hold about them, and correct or delete it where appropriate. Keep a note of the request and your response.",
    },
  ],
  relatedProducts: ["guestIntelligence", "hotels"],
};

export default post;
