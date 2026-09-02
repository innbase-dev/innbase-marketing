export const PLANS = [
  {
    plan: "1",
    name: "Boutique",
    tagline: "For independent hotels running a lean operation.",
    price: "₦24,000",
    daily: "≈ ₦800/day",
    cap: "Up to 10 staff",
    cta: "btn-ghost-dark",
    featured: false,
    features: [
      "Complete hotel operations",
      "Sales, payments & reconciliation",
      "Inventory & stock control",
      "Bookings, guests & rooms",
      "Staff, shifts & closeout",
      "AI Operational Assistant included",
    ],
  },
  {
    plan: "2",
    name: "Base",
    tagline: "For growing hotels with a larger operational team.",
    price: "₦60,000",
    daily: "≈ ₦2,000/day",
    cap: "Up to 20 staff",
    cta: "btn-brass",
    featured: true,
    features: [
      "Everything in Boutique",
      "Up to 20 staff",
      "Expanded AI capacity",
      "Greater operational capacity",
      "AI Operational Assistant included",
    ],
  },
  {
    plan: "3",
    name: "Growth",
    tagline: "For established hotels extending operations and the guest experience.",
    price: "₦150,000",
    daily: "≈ ₦5,000/day",
    cap: "Up to 50 staff",
    cta: "btn-ghost-dark",
    featured: false,
    features: [
      "Everything in Base",
      "Guest Companion for your guests",
      "Guest self-service & hotel services",
      "Higher AI capacity",
      "Enhanced support",
    ],
  },
];

export const QUICK_PICK_NOTES = {
  1: "",
  2: "",
  3: "",
  4: "Growth covers up to 50 — for more, talk to sales.",
};

// 50+ still points at the Growth plan card.
export const QUICK_PICK_TARGET = {
  1: "1",
  2: "2",
  3: "3",
  4: "3",
};

export const COMPARE_ROWS = [
  {
    section: "Hotel Operations",
  },
  {
    feature: "Bookings",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Guests",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Rooms",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Housekeeping",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Maintenance",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Tasks",
    same: true,
    values: [true, true, true],
  },

  {
    section: "Sales & Commerce",
  },
  {
    feature: "Point of sale",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Open Tabs",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Payments",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Transactions",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Reconciliation",
    same: true,
    values: [true, true, true],
  },

  {
    section: "Inventory",
  },
  {
    feature: "Stock Items",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Stock Count",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Movement Log",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Variance Center",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Transfers",
    same: true,
    values: [true, true, true],
  },

  {
    section: "Workforce",
  },
  {
    feature: "Staff",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Shifts",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Closeout",
    same: true,
    values: [true, true, true],
  },

  {
    section: "Management",
  },
  {
    feature: "Dashboard",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Operations",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Alerts & Incidence",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Insights",
    same: true,
    values: [true, true, true],
  },
  {
    feature: "Reports",
    same: true,
    values: [true, true, true],
  },

  {
    section: "Intelligence",
  },
  {
    feature: "AI Operational Assistant",
    same: false,
    values: ["Limited", "Limited", "Higher capacity"],
  },

  {
    section: "Guest Experience",
  },
  {
    feature: "Guest Companion",
    same: false,
    values: [false, false, true],
  },
  {
    feature: "Guest self-service & hotel services",
    same: false,
    values: [false, false, true],
  },

  {
    section: "Support",
  },
  {
    feature: "Support level",
    same: false,
    values: ["Standard", "Standard", "Enhanced"],
  },
];

export const CONTRAST_NEVER = [
  "A hard cutoff mid-shift",
  "A surprise charge on your invoice",
  "Your plan changing without you",
  "A meter you have to watch yourself",
];

export const CONTRAST_ACTUAL = [
  "Quiet, internal usage monitoring",
  "A real person reaches out first",
  "You decide when to move up",
  "Nothing changes until you say so",
];