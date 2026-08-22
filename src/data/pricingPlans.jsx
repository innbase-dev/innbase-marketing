export const PLANS = [
  {
    plan: "1",
    name: "Boutique",
    tagline: "For small hotels and guesthouses just getting started.",
    price: "₦24,000",
    daily: "≈ ₦800/day",
    cap: "Up to 10 staff",
    cta: "btn-ghost-dark",
    featured: false,
    features: [
      "Point of sale, payments & reconciliation",
      "Staff management",
      "AI Operational Assistant included",
    ],
  },
  {
    plan: "2",
    name: "Base",
    tagline: "For growing independent hotels running a full team.",
    price: "₦48,000",
    daily: "≈ ₦1,600/day",
    cap: "Up to 20 staff",
    cta: "btn-ghost-dark",
    featured: false,
    features: ["Everything in Boutique", "More staff capacity", "AI Operational Assistant included"],
  },
  {
    plan: "3",
    name: "Growth",
    tagline: "For established hotels extending the experience to guests.",
    price: "₦99,000",
    daily: "≈ ₦3,300/day",
    cap: "Up to 50 staff",
    cta: "btn-brass",
    featured: true,
    features: [
      "Everything in Base",
      <>
        <b>Guest Companion</b> for your guests
      </>,
      "Higher AI capacity & enhanced support",
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
export const QUICK_PICK_TARGET = { 1: "1", 2: "2", 3: "3", 4: "3" };

export const COMPARE_ROWS = [
  {
    feature: "Staff accounts",
    same: false,
    values: ["10", "20", "50"],
  },
  { feature: "Point of sale", same: true, values: [true, true, true] },
  { feature: "Payments", same: true, values: [true, true, true] },
  { feature: "Reconciliation", same: true, values: [true, true, true] },
  { feature: "Staff management", same: true, values: [true, true, true] },
  {
    feature: "AI Operational Assistant",
    same: false,
    values: ["Included", "Included", "Higher capacity"],
  },
  { feature: "Guest Companion", same: false, values: [false, false, true] },
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
