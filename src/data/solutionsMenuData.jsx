export const SOLUTIONS_MENU_ITEMS = [
    {
        key: "hotels",
        href: "/#roles",
        icon: "building-2",
        iconBg: "var(--sage-soft)",
        iconFg: "var(--sage)",
        accent: "var(--sage)",
        title: "Hotels & guesthouses",
        stat: "A clearer day, shift by shift",
        preview: {
            title: "Hotels — every handover in view",
            caption: (
                <>
                    From front desk to bar, the whole stay shares one live
                    record — <b>without adding more admin.</b>
                </>
            ),
            rows: [
                { ava: "#dbead6", label: "Front desk", chipBg: "#e8f2e4", chipColor: "#416d4a", chip: "Connected" },
                { ava: "#f3bc80", label: "Housekeeping", chipBg: "#fff0df", chipColor: "#8d5b2d", chip: "12 rooms" },
                { ava: "#b7d5a9", label: "Night shift", chipBg: "#e8f2e4", chipColor: "#416d4a", chip: "Closed" },
            ],
        },
    },
    {
        key: "restaurants",
        href: "/#roles",
        icon: "briefcase",
        iconBg: "var(--apricot-soft)",
        iconFg: "var(--apricot)",
        accent: "var(--apricot)",
        title: "Restaurants",
        stat: "Every till, table & shift",
        preview: {
            title: "Restaurants — close with confidence",
            caption: (
                <>
                    Sales, cash and stock stay together from first order to
                    close-out — <b>no end-of-night archaeology.</b>
                </>
            ),
            rows: [
                { ava: "#f3bc80", label: "Dinner service", chipBg: "#fff0df", chipColor: "#8d5b2d", chip: "₦1.28m" },
                { ava: "#dbead6", label: "Till 03", chipBg: "#e8f2e4", chipColor: "#416d4a", chip: "Matched" },
                { ava: "#e9d7bd", label: "Bar stock", chipBg: "#f6eee5", chipColor: "#73573b", chip: "On count" },
            ],
        },
    },
    {
        key: "bars",
        href: "/#roles",
        icon: "martini",
        iconBg: "rgba(183,213,169,.22)",
        iconFg: "#6f9c7b",
        accent: "#6f9c7b",
        title: "Bars & lounges",
        stat: "Stock that tells the truth",
        preview: {
            title: "Bars — know what moved",
            caption: (
                <>
                    Every pour is tied to a sale and a shift, so variance comes
                    with <b>a place to start looking.</b>
                </>
            ),
            rows: [
                { ava: "#b7d5a9", label: "Tequila reposado", chipBg: "#e8f2e4", chipColor: "#416d4a", chip: "Counted" },
                { ava: "#f3bc80", label: "Friday close", chipBg: "#fff0df", chipColor: "#8d5b2d", chip: "5 min" },
                { ava: "#d7e1d7", label: "Variance", chipBg: "#edf2ec", chipColor: "#5d6c61", chip: "Explained" },
            ],
        },
    },
    {
        key: "multi-property",
        href: "/#roles",
        icon: "layer",
        iconBg: "rgba(243,188,128,.2)",
        iconFg: "#b87845",
        accent: "#b87845",
        title: "Multi-property",
        stat: "One view, every operation",
        preview: {
            title: "Multi-property — one operating picture",
            caption: (
                <>
                    Compare properties without asking each manager for a new
                    spreadsheet — <b>the same truth travels with you.</b>
                </>
            ),
            rows: [
                { ava: "#dbead6", label: "Lagos Mainland", chipBg: "#e8f2e4", chipColor: "#416d4a", chip: "Healthy" },
                { ava: "#f3bc80", label: "Ughelli, Delta State", chipBg: "#fff0df", chipColor: "#8d5b2d", chip: "2 flags" },
                { ava: "#d7e1d7", label: "Port Harcourt", chipBg: "#edf2ec", chipColor: "#5d6c61", chip: "Synced" },
            ],
        },
    },
];

export const SOLUTIONS_MENU_QUICK_LINKS = [
    { href: "/guest-companion", label: "Guest Companion" },
    { href: "/assistant", label: "AI Assistant" },
    { href: "/pricing", label: "See pricing" },
    { href: "/contact", label: "Talk to sales" },
];
