import Link from "next/link";

const post = {
  slug: "reconcile-pos-terminal-settlements",
  headline: "POS money arrived short?",
  emphasis: "How to reconcile terminal settlements",
  seoTitle: "How to Reconcile POS Terminal Settlements",
  description:
    "Why POS settlements in Nigerian hotels and bars rarely match the day’s card sales, and a simple routine for reconciling terminal reports, receipts and bank credits.",
  excerpt:
    "The terminal says ₦486,000. The bank credited ₦483,570, a day later. Here is how to explain the difference instead of worrying about it.",
  category: "payments",
  tags: ["POS", "card payments", "reconciliation", "settlement", "bar"],
  publishedAt: "2026-11-21",
  author: "team",
  aiQuestion: "How do I reconcile my hotel’s POS terminal sales with what the bank actually settles?",
  cover: {
    src: "/images/blog/reconcile-pos-terminal-settlements.svg",
    alt: "A card payment terminal printing a receipt, with an arrow to a bank building and a calendar page, representing POS settlement.",
    width: 1600,
    height: 1200,
    tone: "oat",
  },
  takeaways: [
    "Card sales, the terminal’s report and the bank’s settlement are three different records. Compare them in that order.",
    "Settlements often arrive later, and net of charges. Expect a known, explainable difference.",
    "Reconcile by terminal and by day, and keep failed or reversed transactions on their own list.",
    "An unexplained difference that repeats is a pattern worth investigating.",
  ],
  body: [
    "On Saturday, the bar’s POS terminal shows ₦486,000 in card payments. On Monday, the bank credit is ₦483,570. Is ₦2,430 missing? Usually not. Card payments travel through several hands before they reach your account, and each step has its own timing and charges. Reconciliation is how you prove the difference is the one you expected.",

    { type: "h2", text: "Why doesn’t the POS settlement match the day’s card sales?" },
    "The most common reasons are ordinary, and you can explain each one:",
    {
      type: "ul",
      items: [
        "Timing: settlement usually reaches your account later than the sale, and weekend sales may arrive together on a weekday.",
        "Charges: the acquirer’s fees are often deducted before the money is credited.",
        "Cut-off times: a sale just before midnight may belong to the next settlement day.",
        "Failed or reversed transactions: the guest was debited but the payment didn’t complete, or it was reversed later.",
        "Several terminals: credits from two terminals can land as one figure, or in different accounts.",
      ],
    },
    "Ask your bank or acquirer for your settlement timing, cut-off time and charges in writing. You can’t reconcile against rules you don’t know.",

    { type: "h2", text: "Which records do you need?" },
    {
      type: "table",
      caption: "Three records of the same card payments",
      head: ["Record", "Where it comes from", "What it tells you"],
      rows: [
        ["Card sales", "Your sales record for each shift", "What your team says was paid by card"],
        ["Terminal report", "The POS terminal’s end-of-day summary", "What the terminal approved"],
        ["Settlement", "Your bank statement or acquirer report", "What actually reached your account"],
      ],
    },

    { type: "h2", text: "How do you reconcile POS settlements?" },
    {
      type: "steps",
      items: [
        {
          title: "Close each terminal every day",
          body: "Print or save the end-of-day report for each terminal at the same time every night. Keep it with the shift’s records.",
        },
        {
          title: "Match card sales to the terminal report",
          body: "Compare your recorded card sales with the terminal total. A gap here is a recording problem: a sale entered as cash, or a card payment never recorded.",
        },
        {
          title: "Match the terminal report to the settlement",
          body: "When the credit arrives, compare it with the terminal total for the settlement period. Subtract the expected charges.",
        },
        {
          title: "List what’s left",
          body: "Anything unexplained goes on a list with the date, terminal, amount and likely cause. Failed and reversed transactions get their own list.",
        },
        {
          title: "Follow up with the acquirer",
          body: "For missing settlements or charges that don’t match your agreement, raise a complaint with your bank or acquirer, with the terminal ID, date and receipt details.",
        },
      ],
    },

    { type: "h2", text: "A worked example" },
    {
      type: "table",
      caption: "Saturday’s card payments, reconciled on Monday",
      head: ["Line", "Amount"],
      rows: [
        ["Card sales recorded by the bar", "₦486,000"],
        ["Terminal end-of-day report", "₦486,000"],
        ["Less: charges per the acquirer’s report", "₦2,430"],
        ["Expected settlement", "₦483,570"],
        ["Bank credit received Monday", "₦483,570"],
        ["Unexplained difference", "₦0"],
      ],
    },
    "The charges here are only an example. Use the figures on your own acquirer’s settlement report, and check them against the rate in your agreement from time to time.",

    { type: "h2", text: "What about guests who were debited but not served?" },
    "When a guest says their account was debited but your terminal shows the payment failed, don’t take a second payment until you’ve checked. Note the time, amount and terminal ID, and ask the guest to keep their bank alert. If the debit was not completed, it is usually reversed by the guest’s bank. If your terminal shows it as approved, it will appear in your settlement. Either way, you’ll have a record to point to.",
    <>
      The same habit works for transfers and cash. Our guide to{" "}
      <Link href="/blog/hotel-pos-cash-transfer-shift-close">closing a shift across cash, POS and transfers</Link>{" "}
      shows how to bring all three together.
    </>,

    {
      type: "product",
      id: "payments",
      text: "Innbase keeps card, cash and transfer payments with the orders they belong to, so each shift’s card total is ready to compare with the terminal report.",
    },
  ],
  faqs: [
    {
      q: "How long does POS settlement take in Nigeria?",
      a: "It depends on your bank or acquirer. Ask them for your settlement timing and cut-off time in writing, and reconcile against those rules.",
    },
    {
      q: "Why is my POS settlement less than my sales?",
      a: "Usually because charges are deducted before settlement, or some sales fall into a different settlement day. Failed or reversed transactions can also explain a difference.",
    },
    {
      q: "What should I do if a POS settlement never arrives?",
      a: "Raise a complaint with your bank or acquirer, giving the terminal ID, date, amounts and receipts. Keep a copy of every report.",
    },
    {
      q: "Should I reconcile each terminal separately?",
      a: "Yes. Reconciling by terminal makes it much easier to see where a difference came from, especially with several outlets.",
    },
  ],
  relatedProducts: ["payments", "sales"],
};

export default post;
