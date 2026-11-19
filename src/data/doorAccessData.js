// Door Access page content. Every guest, room, person and time is a sample.
// The demo acts out how Innbase Door Access is designed to work: an access
// decision that checks the booking, its assigned room, its payment, any known
// risk and the stay's window; one recorded grant per guest and stay that a
// repeated request can't duplicate; a manager's exception that is named,
// limited to the stay and property, and can't override a cancellation or a
// known risk. The lock and phone-key steps depend on an integration partner
// and are being built, so the demo marks them as such.

export const GUEST = "Tunde Adeyemi";
export const ROOM = "108";
export const WINDOW = "Fri 2:00 pm → Sun 11:00 am";

export const ACCESS_SCENARIOS = [
  { key: "late", label: "A late arrival" },
  { key: "unpaid", label: "Payment hasn’t landed" },
  { key: "cancelled", label: "A cancelled booking" },
];

export const PLAN_B = [
  { title: "Your locks", body: "Door Access is being built for connected smart locks, through an integration partner that supports a range of lock makers. Traditional key or keycard locks would need upgrading. We look at your doors before you commit to anything." },
  { title: "Power and internet", body: "Every property needs a fallback for when the power or the connection goes. We agree yours with you before anything goes live, so your team always has a way to let a guest in." },
  { title: "Exceptions", body: "A named manager can let a guest in before the payment lands, for that stay only. Nobody can override a cancelled booking or a known risk." },
  { title: "The record", body: "Every grant is recorded once, for one guest, one room and one stay, with who approved any exception." },
];

export const DOOR_ROLES = [
  { title: "The front desk confirms the stay.", body: "The booking is confirmed, paid and assigned a room, as it is today." },
  { title: "Innbase checks before it grants.", body: "Booking, room, payment, known risk and the dates of the stay are all checked before access is granted." },
  { title: "The guest arrives on their own time.", body: "Access is valid for that room and that stay, from check-in time to checkout." },
  { title: "A manager handles the exceptions.", body: "Only a named manager can approve access before the payment lands, and only for that stay." },
  { title: "Checkout ends it.", body: "Access is built to end with the stay, so the next guest gets a room nobody else can open." },
];

export const DOOR_FAQ = [
  { q: "When can we use it?", a: "Door Access is in development. The access decision and the grant record are built; the connection to your locks is being built with our integration partner. Join the pilot list and we’ll contact you when places open." },
  { q: "Does it work with the locks we already have?", a: "It is being built for connected smart locks, through an integration partner that supports a range of lock makers. Traditional key or keycard locks would need upgrading. We’ll look at your doors before you commit to anything." },
  { q: "What if the power or the internet goes down?", a: "Every property needs a fallback, and we agree yours before anything goes live, so your team always has a way to let a guest in." },
  { q: "Can a guest who hasn’t paid get in?", a: "Not by default. Access needs a confirmed payment, unless a named manager approves an exception for that stay. Nobody can override a cancelled booking or a known risk." },
];
