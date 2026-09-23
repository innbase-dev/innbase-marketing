// Small, client-safe link catalogue shared by navigation and landing pages.
// Keep full landing-page copy out of this file: the megamenu imports it.
export const PLATFORM_DESTINATIONS = [
  { id: "payments", label: "Payments & reconciliation", href: "/platform/payments", description: "Follow a sale through to its payment.", icon: "payments" },
  { id: "sales", label: "Point of sale", href: "/platform/point-of-sale", description: "Keep orders, tabs and payments together.", icon: "sales" },
  { id: "inventory", label: "Inventory & stock", href: "/platform/inventory", description: "Understand what came in and what went out.", icon: "inventory" },
  { id: "shifts", label: "Staff & shifts", href: "/platform/staff-and-shifts", description: "Leave the next team a clearer starting point.", icon: "shifts" },
  { id: "rooms", label: "Rooms & guests", href: "/platform/rooms-and-guests", description: "Keep the details of each stay together.", icon: "rooms" },
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
