// Loyalty page content. Loyalty is in design: there is no backend yet, only
// workspace designs. Everything here is a concept shown as it is being
// designed, with a sample guest and sample figures. The vocabulary follows
// the designed workspace (innbase apps/web/features/loyalty): programme
// types (visit frequency, cumulative spend, spend threshold, spend credit),
// reward types (discount, hotel credit, free product or service, Wi-Fi
// access, room upgrade, other perk), redemption modes (automatically
// available, cashier applies, customer requests) and the counter flow
// (sale completed → ask for a phone number → perk shown). No figure here is
// a forecast; the explorer only divides a reward's sample cost by the
// sample spend that earned it.

export const GUEST = "Ifeoma N.";
export const PHONE = "0803 ••• 4417";

// Sample sales, in order, one per visit.
export const SALES = [42500, 18000, 27500, 61000, 15500, 82000, 24000, 52500];

export const PROGRAMMES = [
  {
    key: "visits",
    label: "Visit frequency",
    short: "Visits",
    describe: (t) => `Visit ${t} times`,
    options: [3, 5, 8],
    initial: 5,
    optionLabel: (t) => `${t} visits`,
  },
  {
    key: "cumulative",
    label: "Cumulative spend",
    short: "Spend over time",
    describe: (t) => `Spend ${naira(t)} over time`,
    options: [100000, 150000, 250000],
    initial: 150000,
    optionLabel: (t) => naira(t),
  },
  {
    key: "threshold",
    label: "Spend threshold",
    short: "One big visit",
    describe: (t) => `Spend ${naira(t)} or more in one visit`,
    options: [30000, 50000, 75000],
    initial: 75000,
    optionLabel: (t) => naira(t),
  },
];

// `cost` is a sample cost to the property, not a price.
export const REWARDS = [
  { key: "wifi", label: "Free Wi-Fi access", cost: 1500 },
  { key: "meal", label: "Free meal", cost: 12000 },
  { key: "credit", label: "₦10,000 hotel credit", cost: 10000 },
  { key: "upgrade", label: "Room upgrade", cost: 20000 },
];

export const MODES = [
  { key: "auto", label: "Automatically", detail: "Applied the moment the guest qualifies." },
  { key: "cashier", label: "Cashier applies", detail: "Staff see it at checkout and choose when to apply it." },
  { key: "request", label: "Guest asks", detail: "Applied only when the guest asks for it." },
];

export const CONTRASTS = [
  { old: "Stamp cards get lost.", now: "Spend is counted from the sale.", body: "Perks are designed to be earned from sales already recorded in Innbase. Nothing to stamp, nothing to tally, nothing to argue about at the till." },
  { old: "Nobody downloads the app.", now: "The phone number is the card.", body: "One question at the counter: “Can I have your number?” No account to create, no app to install, no card to carry." },
  { old: "Discounts leak quietly.", now: "You see the cost first.", body: "Every programme shows what its reward costs you next to the spend that earned it, before anyone redeems anything." },
];

export const LOYALTY_ROLES = [
  { title: "You set the programme.", body: "The spend or visits that qualify, the reward, whether it expires, and how it is redeemed." },
  { title: "The till records the sale.", body: "As it does today. Loyalty is designed to read the sale, not to add a step to it." },
  { title: "The cashier asks for a number.", body: "One field. A returning guest is recognised, and any perk they have earned shows up on screen." },
  { title: "The guest just comes back.", body: "No app and no account. Their visits add up whether or not they remember to ask." },
  { title: "You see what it cost.", body: "Perks earned, perks redeemed and what each one cost, next to the spend behind it." },
];

export const PARTNER_STEPS = [
  { title: "Tell us how you reward regulars today.", body: "The free drink at the bar, the upgrade at the desk, the discount nobody wrote down." },
  { title: "Try the designs with your team.", body: "Walk through programmes and the counter flow with the people who would use them." },
  { title: "Be first to use it.", body: "Design partners shape the first version and are first in line when it is ready." },
];

export const LOYALTY_FAQ = [
  { q: "When can we use it?", a: "Loyalty is in design. Design partners help decide how the first version works, and are first to use it." },
  { q: "Loyalty schemes never take off here. Why would this one?", a: "Most ask guests to do something: download, sign up, carry a card. This is designed to ask only for a phone number they already give you." },
  { q: "Will it cost me more than it brings in?", a: "That depends on your guests and the rules you set, and nobody can promise it in advance. Loyalty is designed so you set every rule and see what each reward costs next to the spend that earned it." },
  { q: "Which rewards can we offer?", a: "The designs include discounts, hotel credit, a free product or service, Wi-Fi access, a room upgrade or another perk of your own, with programmes based on visits, total spend, a single big visit or credit back on spend." },
  { q: "What does a design partner do?", a: "Share how you reward regulars today, try early designs and tell us what would make a difference. It takes a few conversations, not a project." },
];

export function naira(n) {
  return `₦${Math.round(n).toLocaleString("en-NG")}`;
}
