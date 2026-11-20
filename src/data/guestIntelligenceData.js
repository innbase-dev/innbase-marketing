// Guest Intelligence page content. Every guest, person and date is a sample.
// The profile desk acts out how Innbase Guest Intelligence is designed to
// work: four hotel-local preference types (room environment, floor, pillow,
// check-in style); each fact keeps its source (told to staff, or shared by
// the guest herself); only staff an administrator has given access can see
// them; only the guest can consent, from her own verified Guest Companion
// session, to her preferences being used to personalise her stays, and she
// can withdraw; preferences stay with the hotel; "returning guest" comes
// from completed bookings. Health, dietary, religious and other sensitive
// details are not collected, and nothing is used for marketing.

export const GUEST = "Amaka Bello";

export const PREFERENCE_TYPES = [
  { type: "Room", values: "Quiet" },
  { type: "Floor", values: "High or low" },
  { type: "Pillow", values: "Firm or soft" },
  { type: "Check-in", values: "Express or assisted" },
];

export const BOUNDARIES = [
  { title: "It stays with your hotel.", body: "Preferences belong to the property that recorded them. They are not shared with other hotels." },
  { title: "Nothing sensitive.", body: "Health, dietary, religious and other sensitive details are deliberately left out." },
  { title: "Not for marketing.", body: "Preferences are for the stay. They aren’t used to send promotions." },
  { title: "No guesses dressed as facts.", body: "No spend estimates or VIP scores. “Returning guest” comes from completed bookings, and when the history is incomplete it says so." },
];

export const GI_ROLES = [
  { title: "The front desk notes what the guest asks for.", body: "“A quiet room, please” becomes a preference on her profile, marked as told to the front desk." },
  { title: "The guest can add her own.", body: "From Guest Companion on her phone, marked as shared by her, so everyone knows where it came from." },
  { title: "Only the guest can agree to personalisation.", body: "From her own verified session, after seeing your notice. Staff can’t agree on her behalf." },
  { title: "An administrator decides who can see it.", body: "Access to guest preferences is given to staff deliberately, not by default." },
  { title: "The next stay starts from what you know.", body: "When she returns, the team sees her preferences and her completed stays before she has to ask." },
];

export const GI_FAQ = [
  { q: "How can our property join the pilot?", a: "Join the guest intelligence pilot list to discuss how your team records preferences and how guests give permission at your property." },
  { q: "What kinds of preferences does it remember?", a: "The first release covers room environment (a quiet room), floor (high or low), pillow (firm or soft) and check-in style (express or assisted). It deliberately leaves out health, dietary and other sensitive details." },
  { q: "Isn’t remembering guests a bit intrusive?", a: "Every preference shows whether the guest told your team or shared it herself, only staff you choose can see it, and personalising her stays needs her agreement, which she can withdraw at any time." },
  { q: "Can guests tell us their preferences themselves?", a: "Yes. Through Guest Companion, guests can share what they prefer and decide whether you may use it to personalise their stays." },
  { q: "Are a guest’s preferences shared with other hotels?", a: "No. Preferences are recorded for your hotel only." },
];
