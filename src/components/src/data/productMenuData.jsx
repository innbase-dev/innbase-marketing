import { DEMO_DATA } from "./demoData";

export const PRODUCT_MENU_ITEMS = [
  {
    key: "payments",
    href: "/#product",
    icon: "banknote",
    iconBg: "var(--teal-soft)",
    iconFg: "var(--teal-bright)",
    accent: "var(--teal-bright)",
    title: "Payments",
    stat: "96% auto-matched",
    preview: {
      title: "Payments — reconciled live",
      caption: (
        <>
          Bank transfers, POS, and cash land in one queue. Innbase proposes the match —{" "}
          <b>you just approve it.</b>
        </>
      ),
      rows: DEMO_DATA.payments.rows.slice(0, 3),
    },
  },
  {
    key: "inventory",
    href: "/#product",
    icon: "package-search",
    iconBg: "rgba(248,113,113,.1)",
    iconFg: "#f87171",
    accent: "#fbbf24",
    title: "Inventory",
    stat: "2 need attention",
    preview: {
      title: "Inventory — flagged automatically",
      caption: (
        <>
          Every sale deducts stock in real time. Variance comes with{" "}
          <b>a likely cause attached.</b>
        </>
      ),
      rows: DEMO_DATA.inventory.rows.slice(0, 3),
    },
  },
  {
    key: "shift",
    href: "/#product",
    icon: "calendar-clock",
    iconBg: "rgba(96,165,250,.1)",
    iconFg: "#60a5fa",
    accent: "#60a5fa",
    title: "Shift",
    stat: "92% coverage",
    preview: {
      title: "Shift — coverage, mapped live",
      caption: (
        <>
          A live heatmap flags gaps, overtime, and double-bookings{" "}
          <b>before a guest notices.</b>
        </>
      ),
      rows: DEMO_DATA.shift.rows.slice(0, 3),
    },
  },
  {
    key: "guests",
    href: "/#product",
    icon: "door-open",
    iconBg: "var(--amber-soft)",
    iconFg: "var(--amber-bright)",
    accent: "var(--teal-bright)",
    title: "Guests",
    stat: "1 profile per guest",
    preview: {
      title: "Guests — one profile, every stay",
      caption: (
        <>
          Balance, open tab, and requests in one screen.{" "}
          <b>Reception never checks three systems.</b>
        </>
      ),
      rows: DEMO_DATA.guests.rows.slice(0, 3),
    },
  },
];

export const PRODUCT_MENU_QUICK_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/#roles", label: "Who it's for" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#reconciliation", label: "Why it's trustworthy" },
];
