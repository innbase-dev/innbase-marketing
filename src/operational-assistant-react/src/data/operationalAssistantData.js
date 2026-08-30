// Content for /operational-assistant. Kept data-driven (rather than inline
// JSX) for the repeated-card sections, mirroring the pattern used by
// aboutData.js (WHO_FOR_CARDS, FOUNDERS, etc.) — components stay dumb,
// content stays easy to edit without touching markup.

export const OA_MODULE_STRIP = [
    { icon: "banknote", label: "Payments" },
    { icon: "clipboard-list", label: "Inventory" },
    { icon: "calendar-clock", label: "Shift" },
    { icon: "door-open", label: "Guests" },
];

export const OA_PROBLEM_FLOW = {
    before: [
        "Guest mentions the issue",
        "Staff notes it on paper",
        "Waits till end of shift",
        "Maybe gets entered later",
    ],
    after: ["Guest mentions the issue", "Staff tells Innbase", "Task exists — instantly"],
};

export const OA_IDENTITY_CARDS = [
    {
        icon: "message-circle",
        title: "It understands plain, everyday language",
        body: "No commands to memorize. Staff describe things the way they'd naturally say them.",
        lines: [{ from: "you", text: "The guest in 302 says the shower has no pressure." }],
    },
    {
        icon: "zap",
        title: "It turns requests into real action",
        body: "Tasks get created and records get updated inside Innbase — not on a piece of paper.",
        lines: [{ from: "bot", text: "Logged, and notified Tunde Plumbing Works. Status: Waiting for Artisan." }],
    },
    {
        icon: "search-check",
        title: "It answers questions on the spot",
        body: "No walking to the office, no waiting for someone to check. Ask, and get today's answer.",
        lines: [
            { from: "you", text: "Which rooms have open issues right now?" },
            { from: "bot", text: "Room 105 and Room 302 — both waiting on their artisan." },
        ],
    },
];

// The day-in-the-life timeline: one continuous thread (Room 105 / Kunle AC
// Repairs) running across a single day, so the scenarios read as one real
// shift rather than five disconnected demos.
export const OA_SCENARIOS = [
    {
        time: "07:30",
        role: "Morning briefing · Manager",
        user: "What needs attention this morning?",
        bot: "Room 105's AC is still waiting on Kunle to confirm, and Room 212's water heater has an artisan on-site now. Everything else is on track.",
        caption: "Start the day already knowing what happened overnight — no calling round for updates.",
    },
    {
        time: "09:15",
        role: "Front desk",
        user: "Log it — AC in 105 isn't cooling, guest just mentioned it.",
        bot: "Logged, and I've notified Kunle AC Repairs. Status: Waiting for Artisan.",
        caption: "A guest mention becomes a real, tracked issue in seconds — not a sticky note.",
    },
    {
        time: "12:40",
        role: "Maintenance",
        user: "Any update from Kunle on Room 105?",
        bot: "Not yet — still waiting for confirmation. It's been 4 hours since we called.",
        caption: "Anyone can check on progress without calling the vendor themselves.",
    },
    {
        time: "16:20",
        role: "Manager check-in",
        user: "Show me everything still open today.",
        bot: "3 open: Room 105 (waiting on artisan), Room 212 (artisan on-site), and 1 housekeeping check.",
        caption: "A full picture of the day, without chasing every department for updates.",
    },
    {
        time: "22:10",
        role: "Shift close",
        user: "What still needs attention before I close?",
        bot: "Room 212's heater is fixed and closed. Room 105 is still waiting on Kunle — flagged for the morning team.",
        caption: "Handover happens cleanly — the next shift starts with the full picture, not a guess.",
    },
];

export const OA_ROLE_CARDS = [
    {
        icon: "phone-call",
        title: "Front desk",
        fix: "Can ask Innbase to log requests, create tasks, and check guest or room information.",
    },
    {
        icon: "clipboard-list",
        title: "Housekeeping & maintenance",
        fix: "Can ask what needs attention right now, and update the status of their own tasks.",
    },
    {
        icon: "shield-check",
        title: "Manager",
        fix: "Can ask for summaries across departments, and reassign or escalate tasks.",
    },
    {
        icon: "building-2",
        title: "Owner",
        fix: "Can ask what's happening across the whole hotel — from the front desk or from home.",
    },
];

// smartphone / monitor / mic aren't in the shared Icon.jsx map yet, so
// OaDeviceSection renders these three with small local inline glyphs
// rather than guessing at iconsax-react export names.
export const OA_DEVICE_CARDS = [
    { icon: "smartphone", title: "Phone", body: "On the move, between rooms and floors" },
    { icon: "monitor", title: "Desktop", body: "At the front desk or in the back office" },
    { icon: "mic", title: "Voice — coming soon", body: "Hands-free, for when your hotel is ready" },
];

export const OA_IMPACT_CARDS = [
    {
        icon: "clipboard-list",
        title: "Less admin work",
        body: "Staff spend less time entering, searching for, and re-typing the same information.",
    },
    {
        icon: "zap",
        title: "Faster response",
        body: "A request becomes a task immediately — not something waiting to be remembered.",
    },
    {
        icon: "shield-check",
        title: "Nothing gets lost",
        body: "Requests live inside Innbase, not scattered across notebooks and WhatsApp chats.",
    },
    {
        icon: "door-open",
        title: "More time for guests",
        body: "The real win isn't the AI — it's your team spending less time on paperwork, and more on your guests.",
    },
];

export const OA_FAQ = [
    {
        q: "Will this replace my staff?",
        a: (
            <>
                No. It&apos;s a tool your staff use, not a replacement for them. It handles the repetitive typing
                and logging — <b>your team still makes every decision.</b>
            </>
        ),
    },
    {
        q: "Do I need to train my staff to use it?",
        a: (
            <>
                No special training. Staff type or ask questions the same way they&apos;d describe them to a
                colleague — <b>there&apos;s no new system to learn.</b>
            </>
        ),
    },
    {
        q: "What if a staff member asks it to do something they're not allowed to do?",
        a: (
            <>
                It only acts within what that staff member is already authorized to do on Innbase.{" "}
                <b>A front-desk request can&apos;t become a manager-level action.</b>
            </>
        ),
    },
    {
        q: "Does it cost extra?",
        a: (
            <>
                No — the Operational Assistant is <b>included on every Innbase plan</b>, with no credit counter
                or usage meter to watch.
            </>
        ),
    },
    {
        q: "Can it get things wrong?",
        a: (
            <>
                It can misunderstand a request — when it&apos;s unsure, it asks first rather than guessing. And
                every action it takes is logged in Innbase, so <b>nothing happens invisibly.</b>
            </>
        ),
    },
];
