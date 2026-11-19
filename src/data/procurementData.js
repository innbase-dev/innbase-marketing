// Procurement page content. Every supplier, person, account and amount is a
// sample. The control desk acts out how Innbase Procurement is designed to
// work: suppliers start pending and are approved per property; the bank
// returns the real account name; a second person approves bank details;
// one approved account per supplier per property; a change needs a fresh
// name check and a fresh approval; payments happen in the hotel's own bank
// and Innbase records a claim that stays unverified; a transfer reference
// can't be recorded twice; receipts are encrypted and released only after
// a clean malware scan, with every opening logged. Innbase never initiates,
// holds or moves supplier payments.

export const SUPPLIER = "Eko Beverages Ltd";
export const PROPERTY = "Main hotel";
export const AMOUNT = "₦640,000";
export const TRANSFER_REF = "TRF-88231";

export const SCENARIOS = [
  { key: "new", label: "A new supplier" },
  { key: "pay", label: "Paying a supplier" },
  { key: "change", label: "“We’ve changed banks”" },
];

export const CONTROL_SPLIT = {
  innbase: [
    "Who counts as an approved supplier for each property",
    "Which bank account is approved, and who approved it",
    "The record of each payment your team reports",
    "The receipt behind it, encrypted and scanned",
    "Who opened that receipt, and when",
  ],
  bank: [
    "The transfer itself",
    "Your money, start to finish",
    "Authorising the payment in your banking app",
  ],
};

export const PROCUREMENT_ROLES = [
  { title: "Purchasing registers the supplier.", body: "Name, category and contact, once. A new supplier starts as pending, not approved." },
  { title: "The owner approves them for the property.", body: "Each property decides who it buys from. Approval for one hotel doesn’t approve them for another." },
  { title: "Accounts adds the bank details.", body: "The bank returns the account name on file, so everyone can see whether it matches the supplier." },
  { title: "A second person approves the account.", body: "Whoever entered the details can’t approve them. Changes go through the same check again." },
  { title: "Accounts records each payment.", body: "After paying from your bank, the transfer and its receipt are recorded against the supplier." },
];

export const PROCUREMENT_FAQ = [
  { q: "When can we use it?", a: "Procurement is in development. Join the pilot list and we’ll contact you when pilot places open." },
  { q: "Does Innbase pay our suppliers?", a: "No, and it never will. You pay suppliers from your own bank. Innbase decides who counts as an approved supplier, checks their bank details and keeps the record and proof of each payment." },
  { q: "What happens when a supplier sends new bank details?", a: "The new account goes through the full check again: the bank returns the account name, and a second person has to approve it. Until then, the account you already approved stays the only approved one, and the old details stay in the history." },
  { q: "Is our financial information safe?", a: "Bank details and receipts are encrypted. Every receipt is checked for malware and stays locked until it passes, and every time someone opens one, it’s recorded." },
  { q: "Can we track purchase orders and deliveries?", a: "Not in the first release, which starts with suppliers, bank details and payment proof. Tell us how you order today; it shapes what comes next." },
];
