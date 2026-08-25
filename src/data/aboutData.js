export const FLOW_STEPS = [
    "Guest checks in",
    "Room occupied",
    "Meal ordered",
    "Bottle sold",
    "Payment made",
    "Shift closes",
    "Stock moves",
    "Supplier delivers",
    "Money enters the bank",
];

export const WHO_FOR_CARDS = [
    {
        icon: "phone-call",
        title: "The phone booking",
        pain: "No portal, no app — just a call.",
        fix: "Innbase logs it the same way it logs everything else, so it's never a gap in the record.",
    },
    {
        icon: "banknote",
        title: "The cash payment",
        pain: "Not every guest pays digitally.",
        fix: "Cash still gets counted, matched against what was sold, and closed out properly.",
    },
    {
        icon: "message-circle",
        title: "The WhatsApp confirmation",
        pain: "Bookings move fast, informally.",
        fix: "The system keeps up without forcing your front desk to learn a new habit.",
    },
    {
        icon: "home",
        title: "The owner checking from home",
        pain: "You can't be on every floor, every shift.",
        fix: "One place to see what's actually happening right now — not what someone tells you later.",
    },
];

export const FOUNDERS = [
    {
        initials: "EO",
        color: "var(--brass)",
        image: "/images/efe-o.jpeg",
        name: "Efe Ojadua",
        role: "CEO",
        linkedin: "https://linkedin.com/in/ojadua-efe",
        focusLabel: "Focus:",
        focus:
            " product, strategy, and company direction — deciding what Innbase should do, and just as importantly, what it shouldn't.",
        quote: "technology has to align with business reality or it's useless",
    },
    {
        initials: "CO",
        color: "var(--teal)",
        name: "Chibeze Ochonogor",
        role: "CTO",
        linkedin: "https://linkedin.com/in/chibeze-ochonogor",
        focusLabel: "Focus:",
        focus:
            " engineering and technical direction — making sure what gets built actually holds up on a busy Friday night.",
        quote: "A simple solution to a complex problem always shines",
    },
];

export const PRINCIPLES = [
    {
        icon: "search-check",
        title: "Truth over assumptions",
        body: "If something happened in your hotel, the system should help you trace it — not paper over it with a best guess.",
    },
    {
        icon: "zap",
        title: "Simple enough for the busiest shift",
        body: "A system isn't useful if your staff can't understand it in the middle of a full house on a Saturday night.",
    },
    {
        icon: "building-2",
        title: "Built for reality",
        body: "Cash, transfers, phone bookings, handovers — the product should reflect how hotels actually operate, not how we wish they did.",
    },
    {
        icon: "sparkles",
        title: "AI should explain, not invent",
        body: "AI should help people understand their operation faster — never silently change the underlying truth of what happened.",
    },
    {
        icon: "receipt-text",
        title: "Every number should have a story",
        body: "A figure on a dashboard should be explainable in one tap — who, what, when, and why it landed where it did.",
    },
];

export const MANIFESTO_LINES = [
    <>
        Staff shouldn&apos;t have to <b>defend themselves</b> with incomplete information.
    </>,
    <>
        A cashier should know exactly <b>what they&apos;re responsible for</b> — nothing more, nothing
        less.
    </>,
    <>
        A stock manager should be able to <b>explain every variance</b>, not just report it.
    </>,
    <>
        A guest&apos;s payment should <b>never become a mystery</b> — to the front desk or to the
        owner.
    </>,
    <>
        An owner should be able to understand the business <b>without calling five people.</b>
    </>,
];
