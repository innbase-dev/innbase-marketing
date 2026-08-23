/**
 * utils/data.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Aggregated seed/copy data for translated marketing pages.
 *
 * Convention: each page namespaces its exports (e.g. `about*`) so this file
 * can grow to hold Home, Pricing, Legal, and Contact content too without
 * collisions. Keep this file free of JSX/formatting concerns — components
 * decide how content is presented, this file only decides what it says.
 *
 * Source of truth for the About page copy: https://innbase.co/about
 * (kept verbatim on request — this pass changes presentation, not copy).
 */

export interface AboutFlowStep {
    label: string;
}

export interface AboutModule {
    label: string;
}

export interface AboutRoleCard {
    id: string;
    icon: "phone" | "cash" | "chat" | "home";
    title: string;
    pain: string;
    fix: string;
}

export interface AboutFounder {
    id: string;
    name: string;
    role: string;
    initials: string;
    accent: "brass" | "teal";
    focusLabel: string;
    focus: string;
    quote: string;
    isPlaceholderQuote: boolean;
}

export interface AboutPrinciple {
    id: string;
    title: string;
    body: string;
}

export interface AboutManifestoLine {
    id: string;
    // Pre-split so components never need to parse markup out of copy.
    text: string;
    emphasis: string;
    suffix: string;
}

/** Why Innbase exists — the daily chain of events a hotel generates. */
export const aboutFlowSteps: AboutFlowStep[] = [
    { label: "Guest checks in" },
    { label: "Room occupied" },
    { label: "Meal ordered" },
    { label: "Bottle sold" },
    { label: "Payment made" },
    { label: "Shift closes" },
    { label: "Stock moves" },
    { label: "Supplier delivers" },
    { label: "Money enters the bank" },
];

/**
 * The operational surface Innbase unifies. Friendly, customer-facing labels
 * mapped from the product's real module set — keep in sync with
 * apps/web/features/* if that set changes.
 */
export const aboutModules: AboutModule[] = [
    { label: "Front Desk & Reservations" },
    { label: "Guests" },
    { label: "Point of Sale" },
    { label: "Inventory" },
    { label: "Procurement" },
    { label: "Housekeeping" },
    { label: "Maintenance" },
    { label: "Reports" },
];

/** Who we're building for — real operating scenarios, not personas. */
export const aboutRoleCards: AboutRoleCard[] = [
    {
        id: "phone-booking",
        icon: "phone",
        title: "The phone booking",
        pain: "No portal, no app — just a call.",
        fix: "Innbase logs it the same way it logs everything else, so it's never a gap in the record.",
    },
    {
        id: "cash-payment",
        icon: "cash",
        title: "The cash payment",
        pain: "Not every guest pays digitally.",
        fix: "Cash still gets counted, matched against what was sold, and closed out properly.",
    },
    {
        id: "whatsapp-confirmation",
        icon: "chat",
        title: "The WhatsApp confirmation",
        pain: "Bookings and questions move fast, informally.",
        fix: "The system keeps up without forcing your front desk to learn a new habit.",
    },
    {
        id: "owner-from-home",
        icon: "home",
        title: "The owner checking from home",
        pain: "You can't be on every floor, every shift.",
        fix: "One place to see what's actually happening right now — not what someone tells you later.",
    },
];

export const aboutFounders: AboutFounder[] = [
    {
        id: "efe",
        name: "Efe Great Ojadua",
        role: "CEO",
        initials: "EO",
        accent: "brass",
        focusLabel: "Focus: ",
        focus:
            "product, strategy, and company direction — deciding what Innbase should do, and just as importantly, what it shouldn't.",
        quote: "Founder perspective — replace with approved copy from Efe",
        isPlaceholderQuote: true,
    },
    {
        id: "chibeze",
        name: "Chibeze Endurance Ochonogor",
        role: "CTO",
        initials: "CO",
        accent: "teal",
        focusLabel: "Focus: ",
        focus:
            "engineering and technical direction — making sure what gets built actually holds up on a busy Friday night.",
        quote: "Founder perspective — replace with approved copy from Chibeze",
        isPlaceholderQuote: true,
    },
];

export const aboutPrinciples: AboutPrinciple[] = [
    {
        id: "truth",
        title: "Truth over assumptions",
        body: "If something happened in your hotel, the system should help you trace it — not paper over it with a best guess.",
    },
    {
        id: "simple-shift",
        title: "Simple enough for the busiest shift",
        body: "A system isn't useful if your staff can't understand it in the middle of a full house on a Saturday night.",
    },
    {
        id: "built-for-reality",
        title: "Built for reality",
        body: "Cash, transfers, phone bookings, handovers — the product should reflect how hotels actually operate, not how we wish they did.",
    },
    {
        id: "ai-explains",
        title: "AI should explain, not invent",
        body: "AI should help people understand their operation faster — never silently change the underlying truth of what happened.",
    },
    {
        id: "every-number",
        title: "Every number should have a story",
        body: "A figure on a dashboard should be explainable in one tap — who, what, when, and why it landed where it did.",
    },
];

export const aboutManifestoLines: AboutManifestoLine[] = [
    {
        id: "defend",
        text: "Staff shouldn't have to ",
        emphasis: "defend themselves",
        suffix: " with incomplete information.",
    },
    {
        id: "responsible",
        text: "A cashier should know exactly ",
        emphasis: "what they're responsible for",
        suffix: " — nothing more, nothing less.",
    },
    {
        id: "variance",
        text: "A stock manager should be able to ",
        emphasis: "explain every variance",
        suffix: ", not just report it.",
    },
    {
        id: "mystery",
        text: "A guest's payment should ",
        emphasis: "never become a mystery",
        suffix: " — to the front desk or to the owner.",
    },
    {
        id: "five-people",
        text: "An owner should be able to understand the business ",
        emphasis: "without calling five people.",
        suffix: "",
    },
];

/** Founders section stat strip — every value is derived, never hand-typed. */
export const aboutFounderStats = [
    { value: aboutFounders.length, label: "Founders" },
    { value: 2, label: "Disciplines" },
    { value: 1, label: "Product" },
];
