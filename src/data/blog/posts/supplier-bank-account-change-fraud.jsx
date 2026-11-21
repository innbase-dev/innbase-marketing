const post = {
  slug: "supplier-bank-account-change-fraud",
  headline: "“We’ve changed our bank account”:",
  emphasis: "how hotels protect supplier payments",
  seoTitle: "Supplier Bank Account Change Fraud: Hotel Guide",
  description:
    "How hotels, restaurants and bars can stop supplier payment fraud: verifying bank account changes, checking account names and approving payments with two people.",
  excerpt:
    "A message arrives from your drinks supplier with new bank details. It looks right. Here is how to check it before a single naira leaves your account.",
  category: "payments",
  tags: ["procurement", "supplier payments", "fraud prevention", "approvals", "hotel finance"],
  publishedAt: "2026-11-21",
  author: "team",
  aiQuestion: "What checks should my hotel do before changing a supplier’s bank account or paying a new supplier?",
  cover: {
    src: "/images/blog/supplier-bank-account-change-fraud.webp",
    alt: "A letter in an open envelope beside a fountain pen: a message with new payment details.",
    width: 1600,
    height: 1200,
    tone: "sage",
  },
  takeaways: [
    "Never change a supplier’s bank details on the strength of a message alone. Call back on a number you already hold.",
    "Check that the account name matches the supplier before every first payment.",
    "Separate the person who adds or changes a supplier from the person who approves payment.",
    "Keep proof of every payment and every bank detail change.",
  ],
  body: [
    "The message comes from your drinks supplier’s usual email address, or a WhatsApp number with their logo. “Please note our new account details for all future payments.” The invoice is real, the amount is right, and the accounts officer is busy. This is how supplier payment fraud usually works. It doesn’t break in. It asks politely.",

    { type: "h2", text: "What is supplier bank account change fraud?" },
    "It happens when someone persuades a business to send a genuine supplier payment to the wrong account. The fraudster may have access to the supplier’s email, may copy their branding, or may be someone inside either business. The supplier is still owed the money, so the hotel can end up paying twice.",

    { type: "h2", text: "What are the warning signs?" },
    {
      type: "ul",
      items: [
        "A request to change bank details that arrives by email or chat, especially just before a payment is due.",
        "Urgency: “pay today or the delivery stops”.",
        "An account name that differs from the supplier’s registered name, or a personal account for a company.",
        "Slight changes to an email address or phone number.",
        "A request to keep the change quiet or to skip the usual process.",
      ],
    },

    { type: "h2", text: "How should a hotel verify a bank account change?" },
    {
      type: "steps",
      items: [
        {
          title: "Don’t reply to the message",
          body: "Contact the supplier using a phone number you already had on file, not one given in the request.",
        },
        {
          title: "Confirm with someone you know",
          body: "Speak to your usual contact, and ask them to confirm the new account number and name.",
        },
        {
          title: "Check the account name",
          body: "Before paying, check that the name your banking app shows for the account matches the supplier’s registered business name. A mismatch is a stop sign.",
        },
        {
          title: "Have a second person approve the change",
          body: "The person who enters the new details shouldn’t be the person who approves them.",
        },
        {
          title: "Keep the evidence",
          body: "Record who requested the change, how it was verified, who approved it and when.",
        },
      ],
    },

    { type: "h2", text: "Why should two people approve supplier payments?" },
    "Most supplier fraud succeeds because one person can do everything: add a supplier, change its bank details and send the payment. Splitting those steps is the single most effective control a small hotel has. It doesn’t need extra staff. The general manager or owner approves what the accounts officer prepares.",
    {
      type: "table",
      caption: "A simple separation of duties",
      head: ["Step", "Who does it", "Who approves it"],
      rows: [
        ["Add a new supplier", "Purchasing or accounts", "General manager"],
        ["Change bank details", "Accounts, after a call-back", "General manager or owner"],
        ["Prepare a payment", "Accounts", "General manager"],
        ["Send the payment", "Whoever holds bank access", "Only after approval is recorded"],
      ],
    },
    {
      type: "callout",
      title: "The one-line version",
      text: "One person can’t add, change and pay. Every change is verified by phone. Every payment has proof.",
    },

    { type: "h2", text: "What proof of payment should you keep?" },
    "Keep the bank’s transfer confirmation showing the date, amount, receiving account name and reference, linked to the invoice it paid. When a supplier says they haven’t been paid, you can show exactly where the money went within minutes. Screenshots on one person’s phone are not a filing system.",

    { type: "h2", text: "What if the money has already gone?" },
    "Act quickly. Call your bank straight away and ask them to try to recall or freeze the transfer, then report the fraud to the police. Tell the genuine supplier, record exactly what happened and review which step was skipped. Speed matters, because the chance of recovering funds falls as time passes.",
    {
      type: "callout",
      tone: "watch",
      title: "Keep the tone right",
      text: "A staff member who paid a convincing fake request was probably deceived, not dishonest. Fix the process first. Blame makes the next mistake less likely to be reported.",
    },

    {
      type: "product",
      id: "procurement",
      text: "Innbase Procurement is being built for these controls: approved suppliers, an account-name check on bank changes, two-person approval and proof attached to every payment. Your bank still moves the money.",
    },
  ],
  faqs: [
    {
      q: "How can I confirm a supplier’s new bank account is genuine?",
      a: "Call the supplier on a number you already had, confirm the new details with someone you know, and check the account name shown by your bank matches the supplier’s registered name.",
    },
    {
      q: "Should a small hotel use two-person approval for payments?",
      a: "Yes. It is the most effective protection against supplier fraud and errors, and it only needs a second person to review and approve.",
    },
    {
      q: "What should I do if I paid a fraudster?",
      a: "Contact your bank immediately to request a recall, report it to the police, inform the genuine supplier, and keep a full record of what happened.",
    },
    {
      q: "Is a WhatsApp message enough to change supplier bank details?",
      a: "No. Treat any change request as unverified until you have confirmed it by calling back on a number already on file.",
    },
  ],
  relatedProducts: ["procurement", "owners"],
};

export default post;
