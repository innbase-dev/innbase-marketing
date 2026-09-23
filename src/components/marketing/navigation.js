import { MARKETING_DESTINATIONS, PLATFORM_DESTINATIONS, SOLUTION_DESTINATIONS } from "@/data/marketingDestinations";

export const NAV_GROUPS = [
  {
    id: "product", label: "Product", kicker: "THE INNBASE PLATFORM", title: "Everything your hotel needs to run well.", intro: "One operating system for the people behind every sale, shift, and stay.",
    groups: [
      { title: "RUN THE OPERATION", links: [["Payments & reconciliation", MARKETING_DESTINATIONS.payments.href, "Follow the money"], ["Point of sale", MARKETING_DESTINATIONS.sales.href, "From order to closeout"], ["Inventory", MARKETING_DESTINATIONS.inventory.href, "Give every bottle a record"], ["Staff & shifts", MARKETING_DESTINATIONS.shifts.href, "Hand over with clarity"], ["Rooms & guest folios", MARKETING_DESTINATIONS.rooms.href, "Keep every stay together"]] },
      { title: "EXTEND THE EXPERIENCE", links: [["Guest Companion", "/guest-companion", "For the people you welcome"], ["AI Operational Assistant", "/assistant", "For the people on your team"], ["Explore the demo", "/#demo", "See how the pieces connect"]] },
    ],
  },
  {
    id: "solutions", label: "Solutions", kicker: "BUILT AROUND YOUR DAY", title: "Your kind of hospitality. Your way of working.", intro: "From the first check-in to the last shift handover, bring the moving parts together.",
    groups: [
      { title: "BY BUSINESS", links: [["Hotels & guesthouses", MARKETING_DESTINATIONS.hotels.href, "The whole stay, connected"], ["Restaurants", MARKETING_DESTINATIONS.restaurants.href, "Service that stays in sync"], ["Bars & lounges", MARKETING_DESTINATIONS.bars.href, "Sales, stock, and closeout"], ["Multiple properties", MARKETING_DESTINATIONS.properties.href, "Room for a larger operation"]] },
      { title: "BY RESPONSIBILITY", links: [["Owners & managers", MARKETING_DESTINATIONS.owners.href, "Understand the whole operation"], ["Front desk & guest teams", "/guest-companion#experience", "Turn requests into service"], ["Housekeeping & maintenance", "/assistant#demo", "Keep work moving"], ["Find your plan", "/pricing#plans", "Sized to your team"]] },
    ],
  },
  {
    id: "resources", label: "Resources", kicker: "GET TO KNOW INNBASE", title: "A little context. A clearer next step.", intro: "Explore the product, understand the details, or talk to the people building it.",
    groups: [
      { title: "EXPLORE", links: [["How it works", "/#demo", "Walk through a sample shift"], ["Customer stories", "/#stories", "Experiences from the pilot properties"], ["Pricing questions", "/pricing#faq", "The details in plain sight"], ["Refer a hotel", "/refer", "Earn ₦20,000 per referral"], ["Why we’re building", "/about#story", "The thinking behind Innbase"], ["Our team", "/about#team", "Meet the founders"]] },
      { title: "HELP & TRUST", links: [["Blog","/blog","Tips, Guides, and News"], ["Contact & support", "/contact", "Get to the right conversation"], ["Privacy & data rights", "/legal#privacy", "Understand your data"], ["Terms of service", "/legal#terms", "Know where you stand"], ["Fair usage", "/legal#fair-usage", "How we manage capacity"]] },
    ],
  },
];

export const FOOTER_GROUPS = [
  { title: "Platform", links: PLATFORM_DESTINATIONS.map(({ label, href }) => [label, href]) },
  { title: "Solutions", links: SOLUTION_DESTINATIONS.map(({ label, href }) => [label, href]) },
  { title: "Explore", links: [["Pricing", "/pricing"], ["Blog", "/blog"], ["Product demo", "/#demo"], ["Customer stories", "/#stories"], ["Refer a hotel", "/refer"], ["About Innbase", "/about"], ["Meet the team", "/about#team"], ["FAQs", "/#faq"], ["Fair usage", "/legal#fair-usage"]] },
  { title: "Let’s talk", links: [["Book a demo", "/contact"], ["Contact & support", "/contact"], ["Partnerships", "/contact?reason=partnership"], ["hello@innbase.co", "mailto:hello@innbase.co"], ["WhatsApp ↗", "https://wa.me/2349064169441"], ["Log in ↗", "https://app.innbase.co/login"]] },
];
