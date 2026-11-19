export const REASONS = {
  sales: {
    icon: "sparkles",
    label: "Interested in Innbase",
    labelSub: "Explore the platform for your hotel",
    title: "Tell us about your hotel",
    sub: "A little context helps us route this to the right person and skip the back-and-forth.",
    messageLabel: "What would you like to improve?",
    placeholder: "e.g. We're losing track of bar stock and want better reconciliation...",
    submit: "Send enquiry",
    note: false,
  },
  support: {
    icon: "life-buoy",
    label: "Existing customer",
    labelSub: "Get help with your account",
    title: "Get help with your account",
    sub: "Tell us what's going on and we'll get back to you using the details you provide.",
    messageLabel: "Describe the issue",
    placeholder: "What happened, and what were you trying to do?",
    submit: "Send request",
    note: true,
  },
  "early-access": {
    icon: "sparkles",
    label: "Pilots & design partners",
    labelSub: "Try new features first",
    title: "Join a pilot",
    sub: "A small group of properties tries new features first, works directly with our team and helps decide what we build next.",
    messageLabel: "What would this change for your hotel?",
    placeholder: "e.g. We get late arrivals most weekends and our night desk is one person…",
    submit: "Request a place",
    note: false,
  },
  partnership: {
    icon: "handshake",
    label: "Partnership",
    labelSub: "Work or integrate with Innbase",
    title: "Let's work together",
    sub: "Tell us about your company and what kind of partnership you have in mind.",
    messageLabel: "Tell us more",
    placeholder: "What are you hoping to build or integrate with Innbase?",
    submit: "Send enquiry",
    note: false,
  },
  general: {
    icon: "message-circle",
    label: "Something else",
    labelSub: "General enquiry",
    title: "Send us a message",
    sub: "Not sure where this fits? Tell us what's on your mind and we'll route it to the right person.",
    messageLabel: "Your message",
    placeholder: "What can we help with?",
    submit: "Send message",
    note: false,
  },
};

export const REASON_ORDER = ["sales", "early-access", "support", "partnership", "general"];

// Features with a pilot list or design-partner programme. Keys match the
// `feature` query parameter set by each platform page's call to action.
export const PILOT_FEATURES = {
  "booking-engine": "Booking engine",
  "door-access": "Door access",
  "guest-intelligence": "Guest intelligence",
  loyalty: "Loyalty",
  procurement: "Procurement & suppliers",
};

export const IMPROVE_CHIPS = [
  "Inventory",
  "Sales / POS",
  "Bookings",
  "Payments & reconciliation",
  "Housekeeping",
  "Maintenance",
  "Operations generally",
  "Other",
];

export const ISSUE_TYPES = [
  "Technical issue",
  "Billing",
  "Account / access",
  "Product question",
  "Report a problem",
  "Something else",
];

export const PARTNER_TYPES = [
  "Payments / fintech integration",
  "POS or hardware integration",
  "Reseller / referral",
  "Investor",
  "Other",
];
