// Payments & reconciliation page content. Every order, person and amount is a
// sample. The demo acts out how Innbase Payments works (innbase
// apps/api/src/payments):
// - A bank-transfer claim is recorded as "awaiting verification". It is not
//   payment evidence and never moves what is settled or outstanding.
// - Incoming transfers arrive from a connected payment provider as external
//   transactions. They are matched to an order only when the rule is certain:
//   a reference equal to the order's payment reference matches; a different
//   reference contradicts and is excluded; two possible orders with the same
//   amount are ambiguous and are never auto-allocated.
// - Ambiguous or unmatched transfers go to a person, who resolves them
//   explicitly against the flagged exception. That decision stays on record.
// - Owed, claimed, verified and settled are kept as separate figures.
// No confidence percentages, no learning matcher and no bank-statement import:
// none of those exist.

export const PAY_SCENARIOS = [
  { key: "exact", label: "The reference matches" },
  { key: "ambiguous", label: "Two tables, one amount" },
  { key: "claim", label: "“I’ve sent it”" },
];

export const FOUR_FIGURES = [
  { title: "Owed", body: "What the order still needs. It only goes down when money is seen, or cash is counted at the till." },
  { title: "Claimed", body: "What a guest or cashier says has been sent. Recorded, kept, and never treated as paid." },
  { title: "Verified", body: "Money Innbase has actually seen arrive, from a connected provider or counted in cash." },
  { title: "Settled", body: "Verified money applied to the order, by an exact match or a named person’s decision." },
];

export const PAY_ROLES = [
  { title: "The cashier records the sale and how it was paid.", body: "Cash, card at the terminal, or a bank transfer the guest says they’ve made." },
  { title: "The money arrives where it always does.", body: "Transfers reach Innbase through your connected payment provider, with their reference." },
  { title: "Innbase applies what it can be sure of.", body: "An exact reference match settles the order. Anything less certain waits for a person." },
  { title: "A manager resolves the exceptions.", body: "They choose the order, and the decision stays with the record." },
  { title: "Closeout starts from facts.", body: "The next shift sees what is settled, what is claimed and what is still owed." },
];

export const PAY_FAQ = [
  { q: "Does Innbase mark a transfer as paid because a guest shows a screenshot?", a: "No. A claim is recorded as a claim. The order stays owed until the transfer itself is seen and matched, or a manager resolves it." },
  { q: "How does Innbase decide which order a transfer belongs to?", a: "By rules, not guesses. If the transfer’s reference matches the order’s payment reference exactly, it is applied. If the reference points elsewhere, it isn’t. If two orders could own it, it goes to a person." },
  { q: "Which payment methods does it cover?", a: "Cash counted at the till, card payments at a terminal, and bank transfers. Transfers are verified through a connected payment provider, which we set up with you property by property." },
  { q: "Can it import our bank statements?", a: "Not today. Payments works from what your team records and from transfers received through a connected payment provider." },
  { q: "Who can resolve a payment by hand?", a: "People you authorise. Every manual resolution is tied to the exception it closes and to the person who made it." },
];
