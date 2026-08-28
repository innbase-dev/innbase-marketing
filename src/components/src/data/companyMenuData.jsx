import { FOUNDERS } from "./aboutData";
import { CASE_STUDIES } from "./caseStudies";
import { REASONS, REASON_ORDER } from "./contactData";

export const COMPANY_MENU_ITEMS = [
  {
    key: "about",
    href: "/about",
    icon: "sparkles",
    iconBg: "var(--amber-soft)",
    iconFg: "var(--amber-bright)",
    accent: "var(--amber-bright)",
    title: "About",
    stat: "Why we're building this",
    preview: {
      title: "About — who's building Innbase",
      caption: (
        <>
          Two founders, one product mind and one engineering mind, building the hotel software{" "}
          <b>we wish existed.</b>
        </>
      ),
      rows: FOUNDERS.map((f) => ({
        ava: f.color,
        square: true,
        label: f.name,
        chipBg: "rgba(255,255,255,.08)",
        chipColor: "#9ca3af",
        chip: f.role,
      })),
    },
  },
  {
    key: "customers",
    href: "/#stories",
    icon: "users",
    iconBg: "var(--teal-soft)",
    iconFg: "var(--teal-bright)",
    accent: "var(--teal-bright)",
    title: "Customers",
    stat: `${CASE_STUDIES.length} pilot properties`,
    preview: {
      title: "Customers — pilot properties, real numbers",
      caption: (
        <>
          Five weeks in, and the ledger finally agrees with itself —{" "}
          <b>here&apos;s what changed for them.</b>
        </>
      ),
      rows: CASE_STUDIES.slice(0, 3).map((c) => ({
        ava: c.markColor,
        square: true,
        label: c.name,
        chipBg: "rgba(255,255,255,.08)",
        chipColor: "#9ca3af",
        chip: c.metricBig,
      })),
    },
  },
  {
    key: "contact",
    href: "/contact",
    icon: "message-circle",
    iconBg: "rgba(96,165,250,.1)",
    iconFg: "#60a5fa",
    accent: "#60a5fa",
    title: "Contact",
    stat: "Talk to the right person",
    preview: {
      title: "Contact — tell us what brings you here",
      caption: (
        <>
          Sales, support, partnerships, or something else —{" "}
          <b>we route it to the right person.</b>
        </>
      ),
      rows: REASON_ORDER.slice(0, 3).map((key) => {
        const r = REASONS[key];
        return {
          ava: "rgba(255,255,255,.1)",
          square: true,
          label: r.label,
          chipBg: "rgba(255,255,255,.08)",
          chipColor: "#9ca3af",
          chip: r.labelSub,
        };
      }),
    },
  },
  {
    key: "legal",
    href: "/legal",
    icon: "shield-check",
    iconBg: "rgba(214,138,240,.12)",
    iconFg: "#d68af0",
    accent: "#d68af0",
    title: "Legal",
    stat: "Terms, Privacy & GDPR",
    preview: {
      title: "Legal — terms, privacy & GDPR",
      caption: (
        <>
          How Innbase works with your hotel&apos;s data, and the rights you have —{" "}
          <b>all in one place.</b>
        </>
      ),
      rows: [
        {
          ava: "rgba(255,255,255,.1)",
          square: true,
          label: "Terms of Service",
          chipBg: "rgba(255,255,255,.08)",
          chipColor: "#9ca3af",
          chip: "15 sections",
        },
        {
          ava: "rgba(255,255,255,.1)",
          square: true,
          label: "Privacy Policy",
          chipBg: "rgba(255,255,255,.08)",
          chipColor: "#9ca3af",
          chip: "11 sections",
        },
        {
          ava: "rgba(255,255,255,.1)",
          square: true,
          label: "GDPR & Data Rights",
          chipBg: "rgba(255,255,255,.08)",
          chipColor: "#9ca3af",
          chip: "10 sections",
        },
      ],
    },
  },
];

export const COMPANY_MENU_QUICK_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#roles", label: "Who it's for" },
];
