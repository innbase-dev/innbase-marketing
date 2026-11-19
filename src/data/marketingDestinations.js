// Small, client-safe link catalogue shared by navigation and landing pages.
// Keep full landing-page copy out of this file: the megamenu imports it.

// ── Release stages ──
// A page may only speak about a capability in the way its stage allows:
//   available       In production for customers. Present tense throughout.
//   early-access    Working end to end with selected pilot properties.
//   in-development  Being built. Sell the outcome; describe the capability as
//                   what it is built to do, never as a production guarantee.
//   in-design       Designed, build not started. Sell the outcome; recruit
//                   design partners.
// Moving a page to a later stage means reviewing its copy, not only this field.
export const RELEASE_STAGES = {
  available: { label: "Available now", cta: "Book a demo" },
  "early-access": { label: "Early Access", cta: "Join Early Access" },
  "in-development": { label: "In development", cta: "Join the pilot list" },
  "in-design": { label: "In design", cta: "Become a design partner" },
};

// Unpublished pages are hidden from navigation, the sitemap and their own URL.
// A preview deployment can show them (marked noindex) for review by setting
// NEXT_PUBLIC_SHOW_UNPUBLISHED_PAGES=true at build time.
export const SHOW_UNPUBLISHED = process.env.NEXT_PUBLIC_SHOW_UNPUBLISHED_PAGES === "true";

// Destinations without a `release` field are existing, available, published pages.
export function isPublished(destination) {
  return !destination?.release || destination.release.published === true;
}

export function isVisible(destination) {
  return Boolean(destination) && (isPublished(destination) || SHOW_UNPUBLISHED);
}

export function releaseStage(destination) {
  return destination?.release?.stage ?? "available";
}

// Each new page is published independently: flip its own `published` flag
// once its copy is approved for its stage.
export const PLATFORM_DESTINATIONS = [
  { id: "payments", label: "Payments & reconciliation", href: "/platform/payments", description: "Follow a sale through to its payment.", icon: "payments" },
  { id: "sales", label: "Point of sale", href: "/platform/point-of-sale", description: "Keep orders, tabs and payments together.", icon: "sales" },
  { id: "inventory", label: "Inventory & stock", href: "/platform/inventory", description: "Understand what came in and what went out.", icon: "inventory" },
  { id: "procurement", label: "Procurement & suppliers", href: "/platform/procurement", description: "Approved suppliers, verified bank details, proof of every payment.", icon: "procurement", release: { stage: "in-development", published: false } },
  { id: "shifts", label: "Staff & shifts", href: "/platform/staff-and-shifts", description: "Leave the next team a clearer starting point.", icon: "shifts" },
  { id: "rooms", label: "Rooms & guests", href: "/platform/rooms-and-guests", description: "Keep the details of each stay together.", icon: "rooms" },
  { id: "bookingEngine", label: "Booking engine", href: "/platform/booking-engine", description: "One room, one guest. Confirmed when the deposit lands.", icon: "bookingEngine", release: { stage: "in-development", published: false } },
  { id: "doorAccess", label: "Door access", href: "/platform/door-access", description: "Room access that starts with the stay and ends with it.", icon: "doorAccess", release: { stage: "in-development", published: false } },
  { id: "guestIntelligence", label: "Guest intelligence", href: "/platform/guest-intelligence", description: "Remember every guest, with their consent.", icon: "guestIntelligence", release: { stage: "in-development", published: false } },
  { id: "loyalty", label: "Loyalty", href: "/platform/loyalty", description: "Reward real spend and bring regulars back.", icon: "loyalty", release: { stage: "in-design", published: false } },
  { id: "messaging", label: "Integrated messaging", href: "/platform/messaging", description: "Bring guest conversations and operational follow-through together.", icon: "messaging" },
  { id: "guest", label: "Guest Companion", href: "/guest-companion", description: "Give guests a direct way to reach your team.", icon: "guest" },
  { id: "assistant", label: "AI Operational Assistant", href: "/assistant", description: "Ask questions about the work behind the stay.", icon: "assistant" },
];

export const SOLUTION_DESTINATIONS = [
  { id: "hotels", label: "Hotels & guesthouses", href: "/solutions/hotels-and-guesthouses", description: "Bring the front desk and back office together.", icon: "rooms" },
  { id: "restaurants", label: "Restaurants", href: "/solutions/restaurants", description: "Keep the records moving with the service.", icon: "restaurants" },
  { id: "bars", label: "Bars & lounges", href: "/solutions/bars-and-lounges", description: "Connect each round to stock and closeout.", icon: "bars" },
  { id: "properties", label: "Multiple properties", href: "/solutions/multiple-properties", description: "Discuss an Enterprise setup around your operation.", icon: "properties" },
  { id: "owners", label: "Owners & managers", href: "/solutions/owners-and-managers", description: "Get the context behind the numbers.", icon: "owners" },
];

export const MARKETING_DESTINATIONS = Object.fromEntries(
  [...PLATFORM_DESTINATIONS, ...SOLUTION_DESTINATIONS].map((item) => [item.id, item]),
);
