// Booking engine page content. Every room, guest and amount here is a
// sample. The interactive desk acts out how Innbase Booking is designed to
// work: one supply for rooms and room types, holds that end at a time the
// property sets, transfer claims that wait for verification, and
// confirmation without a deposit only on approved credit.

export const NIGHTS = ["Thu", "Fri", "Sat", "Sun"];

// The guest's request: Deluxe, Friday and Saturday nights.
export const REQUEST_NIGHTS = ["Fri", "Sat"];

export const ROOMS = [
  { id: "101", type: "Standard", rate: 30000, booked: { Thu: "Okafor", Fri: "Okafor" } },
  { id: "102", type: "Standard", rate: 30000, booked: { Sat: "Mensah" } },
  { id: "203", type: "Deluxe", rate: 45000, booked: { Sat: "Adeyemi", Sun: "Adeyemi" } },
  { id: "204", type: "Deluxe", rate: 45000, booked: { Thu: "Eze" } },
  { id: "206", type: "Deluxe", rate: 45000, booked: { Fri: "Ibrahim", Sat: "Ibrahim" } },
  { id: "301", type: "Suite", rate: 80000, booked: {} },
];

export const HELD_ROOM = "204";
export const GUEST = "Amaka Bello";
export const DEPOSIT = "₦45,000";
export const TOTAL = "₦90,000";
export const HOLD_ENDS = "6:00 pm";

// Hero board: the same sample weekend, after the booking is confirmed.
export const HERO_BOOKED = { room: "204", nights: REQUEST_NIGHTS, label: "Bello" };

export const DESK_STEPS = ["Enquiry", "Hold", "Payment", "Confirmed"];

export const CONFIRMATION_ROUTES = [
  {
    key: "deposit",
    title: "A deposit that has arrived.",
    body: "Cash recorded by someone with authority counts straight away. A bank transfer or POS payment counts once it has been verified, not when the guest says it has been sent.",
    chain: ["On hold", "Transfer claimed", "Verified", "Confirmed"],
  },
  {
    key: "hold",
    title: "A hold with an end time.",
    body: "Give the guest time to pay without giving the room away. When the time your property sets runs out, the room goes back on sale.",
    chain: ["On hold", "Time runs out", "Back on sale"],
  },
  {
    key: "credit",
    title: "Credit someone approved.",
    body: "Corporate and VIP guests can be confirmed without a deposit, but only when someone with authority approves it. The amount stays owed to the hotel.",
    chain: ["Approved", "Confirmed", "Still owed"],
  },
];

export const DESK_ROLES = [
  { title: "The front desk takes the request.", body: "By phone, on WhatsApp or at the desk, every enquiry is answered from the same live availability." },
  { title: "The room is held, with an end time.", body: "Your property sets how long a hold lasts, so a held room never quietly becomes a free one." },
  { title: "Accounts confirms the money.", body: "Transfers and POS payments are verified before the booking counts as confirmed." },
  { title: "A manager approves the exceptions.", body: "Confirming without a deposit, or on a corporate account, needs someone with the authority to say yes." },
  { title: "Checkout closes the stay.", body: "When the guest checks out, the stay’s Guest Companion access closes with it." },
];

export const BOOKING_FAQ = [
  { q: "When can we use it?", a: "Innbase Booking is in development and being tested ahead of a pilot with selected properties. Join the pilot list and we’ll contact you when places open. Nothing changes in your current setup until you decide." },
  { q: "We take most bookings by phone and WhatsApp. Is it built for that?", a: "Yes. The first release is built for the bookings your team takes by phone, on WhatsApp and at the desk, all checked against one live availability." },
  { q: "Can guests book online by themselves?", a: "Not in the first release, which starts with the bookings your team takes. Tell us how your guests book today; it shapes what comes next." },
  { q: "Do we have to stop using booking sites?", a: "No. Keep the channels that bring you guests. The first release doesn’t connect to booking sites, so tell us which ones you rely on." },
  { q: "What happens when a guest says they’ve sent the transfer?", a: "The payment is recorded as a claim. The room stays held, not confirmed, until the transfer is verified. If the money never arrives, the hold still ends on time." },
];
