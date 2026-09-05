// Content for /guest-companion. Mirrors the pattern in
// operationalAssistantData.js — components stay dumb, content stays easy
// to edit without touching markup.

// Hero showcase — a full-bleed 3-image row (narrow–wide–narrow), not a
// product screenshot. Paths are local and intentionally don't resolve to a
// real file yet — same convention as OaHero's <Image src="/images/...">,
// per PROJECT_README.md: drop real property photography in before deploy.
export const GC_SHOWCASE_IMAGES = [
    { src: "/images/guest-companion-showcase-1.gif", alt: "A guest ordering from their phone at a hotel table" },
    { src: "/images/guest-companion-showcase-2.jpg", alt: "A hotel lobby with staff attending to a guest" },
    { src: "/images/guest-companion-showcase-3.jpg", alt: "A staff member confirming a guest request on a tablet" },
];

// Trust strip under the hero — same idea as OA_MODULE_STRIP, pointed at the
// modules a guest's request actually lands in on the hotel side.
export const GC_MODULE_STRIP = [
    { icon: "shopping-bag", label: "Sales" },
    { icon: "banknote", label: "Payments" },
    { icon: "door-open", label: "Guests" },
    { icon: "clipboard-list", label: "Tasks" },
];

// Before/after comparison — reuses the existing .problem-compare/.flow-block
// pattern (see globals-additions.css) built for exactly this shape of
// content, rather than introducing a new comparison layout.
export const GC_PROBLEM_FLOW = {
    before: [
        "Guest wants a bottle of water",
        "Hunts for a reception number",
        "Calls, explains, and waits",
        "Someone remembers to relay it",
    ],
    after: ["Guest scans the code", "Chooses what they need", "Request lands in Innbase"],
};

// "No intercom required" — reuses .problem-grid/.problem-card as-is.
export const GC_NO_INTERCOM_CARDS = [
    {
        icon: "call-slash",
        title: "No intercom required",
        body: "Guests use the phone already in their hand — nothing to install in the room, nothing to wire up.",
    },
    {
        icon: "mobile",
        title: "No app to download",
        body: "A QR code or link opens the companion instantly, right in the browser. No app store, no account to create.",
    },
    {
        icon: "scan",
        title: "Start with what you have",
        body: "A code in the room, at the table, or around the property is all it takes to go live.",
    },
];

// Guest moments — reuses .problem-grid/.problem-card too; six cards wrap
// cleanly into two rows of three at the same breakpoints as the 3-card
// version above, so no new grid CSS is needed for this section either.
export const GC_MOMENT_CARDS = [
    {
        icon: "coffee",
        title: "Food & Drinks",
        body: "Browse what's available and order straight from a phone — no waving down a waiter.",
    },
    {
        icon: "home",
        title: "Room Service",
        body: "Request anything the room needs without picking up a phone or calling reception.",
    },
    {
        icon: "broom",
        title: "Housekeeping",
        body: "Ask for towels, cleaning, or amenities whenever they're actually needed.",
    },
    {
        icon: "gear",
        title: "Maintenance",
        body: "Report something that needs attention without hunting for the right number.",
    },
    {
        icon: "building-2",
        title: "Hotel Services",
        body: "Whatever the property offers, guests can ask for it from one place.",
    },
    {
        icon: "message-question",
        title: "Contact the Hotel",
        body: "A direct channel for whenever a guest simply needs help.",
    },
];

// "From scan to service in seconds" — the 3-step walkthrough.
export const GC_STEPS = [
    {
        n: "01",
        title: "Scan",
        body: "The guest scans the code in their room, at the table, or around the property.",
    },
    {
        n: "02",
        title: "Choose",
        body: "They see what the hotel actually offers — food, drinks, services, requests.",
    },
    {
        n: "03",
        title: "Request",
        body: "One tap sends it. No calling around, no waiting to find the right person.",
    },
];

// The three contexts Guest Companion works in — deliberately not framed as
// a room-only product. Reuses .flow-chip/.flow-row as a plain chip list
// (no arrows between them, since these are parallel contexts, not steps).
export const GC_CONTEXTS = [
    { icon: "home", label: "In the room" },
    { icon: "coffee", label: "At the restaurant or bar" },
    { icon: "building-2", label: "Around the property" },
];

// The "operational magic" mock — a guest request shown as a real Innbase
// record, not a notification that disappears into WhatsApp.
export const GC_REQUEST_MOCK = {
    room: "Room 204",
    lines: [
        { k: "Item", v: "2 × Bottled Water" },
        { k: "Amount", v: "₦2,000" },
        { k: "Status", v: "New" },
    ],
};

export const GC_REQUEST_FLOW = [
    "Staff receives the request",
    "Order gets fulfilled",
    "Payment recorded",
    "Stays in the hotel's operational record",
];

// Outcomes — what the guest gets vs. what the hotel gets, side by side.
export const GC_OUTCOMES = {
    guest: [
        "A simple way to ask for anything",
        "Faster ordering, no waiting on hold",
        "Clear menus and services, no guesswork",
        "Nothing to install or sign up for",
    ],
    hotel: [
        "Requests arrive digitally, not by memory",
        "Less phone traffic at the front desk",
        "Fewer misunderstandings, fewer redos",
        "Every request connected to operations",
    ],
};

export const GC_FAQ = [
    {
        q: "Does the guest need to download an app?",
        a: (
            <>
                No. Guest Companion opens from a QR code or link, right in the browser —{" "}
                <b>there&apos;s nothing to install.</b>
            </>
        ),
    },
    {
        q: "Does every room need an intercom or new hardware?",
        a: (
            <>
                No. Guests use their own phone. A code in the room, at the table, or around the property is all it
                takes — <b>no wiring, no devices to buy.</b>
            </>
        ),
    },
    {
        q: "Can guests order food and drinks?",
        a: (
            <>
                Yes, wherever the hotel&apos;s outlets and inventory are configured to support it —{" "}
                <b>the same catalog your staff already sell from.</b>
            </>
        ),
    },
    {
        q: "Can requests be charged to the room?",
        a: (
            <>
                Where the hotel&apos;s Guest Companion setup and Innbase workflow support it, yes —{" "}
                <b>the charge lands on the same folio as everything else.</b>
            </>
        ),
    },
    {
        q: "Can walk-in guests use it too?",
        a: (
            <>
                Yes. Guest Companion isn&apos;t only for the room — it works at the table, the bar, or anywhere else
                a code is placed. <b>It&apos;s a hotel-wide channel, not a room-service menu.</b>
            </>
        ),
    },
    {
        q: "Does my staff need to learn a new system?",
        a: (
            <>
                No — requests flow into the same Innbase workspace your team already runs the hotel from.{" "}
                <b>One operational system, not two.</b>
            </>
        ),
    },
];
