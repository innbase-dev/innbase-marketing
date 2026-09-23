import Link from "next/link";

const post = {
  slug: "reconcile-bank-transfers-hotel-restaurant",
  headline: "How to reconcile bank transfers",
  emphasis: "at a hotel restaurant",
  seoTitle: "Reconcile Bank Transfers at a Hotel Restaurant",
  description:
    "A daily routine for matching bank transfers to restaurant sales in a Nigerian hotel: what to record, how to match, and what to do with the gaps.",
  excerpt:
    "Every transfer alert is half a story. Here is a daily routine for pairing each one with the sale it paid for, and what to do when the two don’t agree.",
  category: "payments",
  tags: ["bank transfers", "reconciliation", "restaurant", "cash and POS"],
  publishedAt: "2026-09-16",
  updatedAt: "2026-09-18",
  author: "team",
  aiQuestion: "How can my hotel restaurant match each bank transfer to the right sale and follow up payments that do not match?",
  cover: {
    src: "/images/blog/bank-transfers.webp",
    alt: "Two restaurant receipts joined by a check mark beside a payment terminal and a place setting.",
    width: 1600,
    height: 1200,
    tone: "oat",
  },
  takeaways: [
    "A screenshot of a transfer is not proof of payment. The credit on your bank statement is.",
    "Match on amount, reference, and time, and never force a match that isn’t there.",
    "Keep two lists: sales without a payment, and payments without a sale. Write down every decision.",
    "Reconcile daily, while people still remember the details.",
  ],
  body: [
    "A guest at table 8 pays ₦18,000 by bank transfer, shows the waiter a screenshot, and heads upstairs. An hour later, a bank alert for ₦18,000 arrives. Are the two the same payment? Usually, yes. Sometimes, no. And the difference is where money goes missing.",
    "Reconciliation is the routine of checking. It sounds like accounting, but at a hotel restaurant it is a daily habit that takes about as long as a shift handover once your records are in order. This guide walks through a routine for restaurants and bars that take a mix of cash, POS, and bank transfers.",

    { type: "h2", text: "What reconciliation actually means" },
    "To reconcile is to compare two independent records of the same money, and explain every difference between them. In a restaurant, those two records are your sales record (what your team says was sold, and how it was paid) and your statements (what your bank and POS provider say actually arrived).",
    "The word that matters is independent. A waiter’s screenshot and the same waiter’s sales entry come from one person, so they can’t check each other. A bank statement can.",
    {
      type: "callout",
      title: "The one-line version",
      text: "Every sale should be paired with a payment, and every payment with a sale. Whatever is left over on either side is your work for the day.",
    },

    { type: "h2", text: "Record the right details at the moment of sale" },
    "Matching is only as good as what was written down when the order was taken. For every sale, make sure your team records:",
    {
      type: "ul",
      items: [
        "The order number, table, and the staff member who served it.",
        "The amount, including any service charge or discount.",
        "The payment method: cash, POS card, or bank transfer.",
        "For transfers, the reference or narration the guest used, and roughly what time they paid.",
      ],
    },
    "That last line is the one most teams skip. A transfer reference such as “DIN-1042” turns a guess into a match.",

    { type: "h2", text: "The daily routine, in five steps" },
    {
      type: "steps",
      items: [
        {
          title: "Close the sales for the shift",
          body: "Finish or void every open order before you start matching. Open tabs are the first source of confusion, because a payment can arrive for an order that hasn’t been closed yet.",
        },
        {
          title: "Split the day by payment method",
          body: "Total cash, POS, and transfers separately. Each one has its own proof: a cash count, a POS settlement report, and bank credits.",
        },
        {
          title: "Match transfers by amount, reference, and time",
          body: "Start with an exact amount and reference. Then try amount plus a short time window, since a transfer can land minutes after the sale. If two sales share an amount, use the reference or the table to tell them apart.",
        },
        {
          title: "List what didn’t match",
          body: "Keep two lists: sales with no payment, and payments with no sale. Don’t force a match to make the numbers tidy. An honest gap is more useful than a wrong pairing.",
        },
        {
          title: "Decide, then write down the decision",
          body: "For each item, choose one: confirmed (found later), follow up (ask the staff member or guest), or written off, with the name of the person who approved it. The note matters as much as the number.",
        },
      ],
    },

    { type: "h2", text: "A worked example" },
    "Here is one evening’s transfers for a hotel restaurant, matched line by line.",
    {
      type: "table",
      caption: "One evening’s transfers, matched against sales",
      head: ["Sale", "Amount", "Transfer received", "Result"],
      rows: [
        ["Order #1042, Table 8", "₦18,000", "₦18,000, reference DIN-1042", "Matched"],
        ["Order #1043, Table 2", "₦7,500", "₦7,500 at 21:14", "Matched by amount and time"],
        ["Order #1044, Table 5", "₦12,000", "Nothing received", "Follow up with the server"],
        ["No matching sale", "None", "₦25,000 received", "Check room deposits and other outlets"],
      ],
    },
    "Two of the four lines are settled in a minute each. The last two are the ones that matter, and they are the reason to reconcile every day instead of every month: the server still remembers table 5, and the guest who sent ₦25,000 is probably still in the building.",

    { type: "h2", text: "Why a transfer doesn’t match" },
    "When a line won’t match, the cause is usually one of these:",
    {
      type: "ul",
      items: [
        <>
          <b>Timing.</b> The credit lands after the shift closes, or the next morning. Match
          across a short window rather than a single shift.
        </>,
        <>
          <b>Combined or split payments.</b> One guest pays for two orders in a single transfer, or
          several guests split one bill.
        </>,
        <>
          <b>A missing or wrong reference.</b> The guest typed their own name instead of the order
          number.
        </>,
        <>
          <b>The wrong method.</b> The sale was entered as cash, but the guest paid by transfer, or
          the other way round.
        </>,
        <>
          <b>No money arrived.</b> A screenshot was shown, but nothing reached your account. Only a
          credit on your statement confirms payment.
        </>,
      ],
    },

    {
      type: "product",
      id: "payments",
      text: "Innbase keeps the sale, the payment, and the shift in one record. It suggests matches for you to review, and keeps a note of who confirmed each one.",
    },

    { type: "h2", text: "Cash and POS need the same habit" },
    "The routine above works for every payment method. For cash, count at shift close with a second person, and compare the total with what the record says was paid in cash. For POS, compare the day’s POS total with the provider’s settlement report. Settlements can arrive a day or more later, and often net of the provider’s charges, so expect the bank credit to differ from the sales total by a known amount.",

    { type: "h2", text: "Make it a habit, not a project" },
    "Pick a fixed time for reconciliation, such as the start of the morning shift. Give it to one person, and ask a second person to approve any write-off. Once a week, look at the count of unmatched items: it should be shrinking. If the same gap keeps appearing on one shift, one outlet, or one payment method, look at the pattern before you look at the people.",
    {
      type: "callout",
      tone: "watch",
      title: "Keep the tone right",
      text: "An unmatched item is a question, not an accusation. Most are timing, references, or a sale entered the wrong way. Ask first, and write down the answer.",
    },
    <>
      If a bar sits alongside your restaurant, pair this routine with a regular{" "}
      <Link href="/blog/how-to-run-a-bar-stock-count">stock count</Link>. Sales and stock tell the
      same story from two sides, and a gap in one often explains a gap in the other.
    </>,
  ],
  faqs: [
    {
      q: "How often should a hotel restaurant reconcile bank transfers?",
      a: "Daily is the goal, because staff and guests can still remember the details. If daily isn’t realistic yet, reconcile at least twice a week, and always before the month closes.",
    },
    {
      q: "Is a screenshot of a transfer proof of payment?",
      a: "No. A screenshot shows what a phone displayed. It doesn’t show that money reached your account. Confirm against a bank alert or your statement before treating a transfer as received.",
    },
    {
      q: "What if two sales have the same amount?",
      a: "Use the transfer reference, the time, or the table to tell them apart. If you can’t, list both as unmatched and ask the staff who handled them, rather than guessing.",
    },
    {
      q: "Do I need software to reconcile?",
      a: "A spreadsheet works while volumes are small: one row per sale, one per credit, and a column for the match. It gets hard to keep up when you have several outlets, staff on different shifts, and many transfers an hour. That is where a system that links the records for you saves time.",
    },
  ],
  relatedProducts: ["payments", "sales"],
};

export default post;
