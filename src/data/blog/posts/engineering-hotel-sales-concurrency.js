const post = {
  "slug": "engineering-hotel-sales-concurrency",
  "headline": "Two attendants. One last item.",
  "emphasis": "The architecture has to choose.",
  "seoTitle": "Engineering Concurrency-Safe Hotel Sales | Innbase",
  "description": "Inside Innbase engineering: what chaotic hotel sales taught us about single-transaction execution, inventory consistency, payment evidence and idempotency.",
  "excerpt": "Two workstations sell the final bottle at once. A transfer arrives late. A cashier retries. We designed for the messy version of the day.",
  "category": "engineering",
  "tags": [
    "engineering",
    "innbase",
    "hotel operations",
    "software architecture",
    "reliability engineering"
  ],
  "publishedAt": "2026-10-09",
  "updatedAt": "2026-10-09",
  "author": "team",
  "aiQuestion": "What is concurrency control in hotel sales software?",
  "cover": {
    "src": "/images/blog/engineering-hotel-sales-concurrency.svg",
    "alt": "Innbase editorial illustration about two attendants. one last item. the architecture has to choose., using linked records and hospitality symbols.",
    "width": 1600,
    "height": 1200,
    "tone": "sage"
  },
  "takeaways": [
    "A sale requires one canonical business command, not loosely coordinated writes.",
    "Payment, stock and ledger state cannot be treated as unrelated successes.",
    "Concurrency and replay tests expose failures that happy-path demos cannot."
  ],
  "body": [
    "Two workstations sell the final bottle at once. A transfer arrives late. A cashier retries. We designed for the messy version of the day.",
    {
      "type": "h2",
      "text": "Our test scenario was an actual shift, not a diagram"
    },
    "We modelled a crowded bar and front desk: several attendants, several workstations, successive orders, cash, POS, transfers, partial payments, corrections, duplicate attempts and intermittent connectivity. Staff do not wait for each other to finish typing. The last bottle may be requested twice before either screen refreshes.",
    "That is where a simple CRUD design reveals its weakness: every subsystem can report success independently while the business outcome is contradictory.",
    {
      "type": "h2",
      "text": "Define the sale as one business decision"
    },
    "Innbase’s canonical CompleteSale design centres on one business command and one PostgreSQL unit of work. Inventory and Payment participate through published ports; the domain aggregate determines the outcome, while the operational ledger record and transactional outbox are committed atomically.",
    "The aim is not to squeeze an entire business into one object. It is to stop a sale being considered complete while its authoritative consequences disagree.",
    {
      "type": "h2",
      "text": "Why idempotency requires a fingerprint"
    },
    "If a cashier taps twice after a network pause, we want a consistent response for the same operation. But using the same idempotency key for a different cart or payment instruction must not silently reuse the first result. We therefore worked on scoped and fingerprinted idempotency: identity and business intent both matter.",
    "A good replay test repeats the exact command, then changes one meaningful field and confirms the system rejects a conflicting reuse.",
    {
      "type": "h2",
      "text": "Money is not a floating-point afterthought"
    },
    "Payment amounts need authoritative quoting and exact money representation. The price the client displays cannot become the sole source of truth if discounts, tax or quantity changed. Refunds and corrections must respect prior movements and concurrent actions.",
    "The architectural question is always: which component has the authority to decide the amount, and where is that decision recorded?",
    {
      "type": "h2",
      "text": "Offline does not mean unrestricted authority"
    },
    "A device disconnected from the server may capture an intended action, but cached product availability and cached permissions are not proof that a fresh sale can be committed. We separated offline provenance from final server-side authority, and explored what can be queued without creating imaginary stock or money.",
    "If a retry or recovery is needed, retain the original actor, workstation and command identity so investigators can understand how the result happened.",
    {
      "type": "h2",
      "text": "Where we drew the certification line"
    },
    "We have advanced these designs through focused slices addressing execution contracts, commerce persistence, refund concurrency, authoritative quoting and offline authority. That is not equivalent to claiming every extreme traffic case has passed a completed production stress certification.",
    "The lesson is to preserve one canonical financial truth, show uncertainty explicitly and keep hammering the collisions. In hospitality, the rare timing bug is often waiting for the busiest Saturday night.",
    {
      "type": "callout",
      "title": "Engineering note",
      "text": "Concurrency and replay tests expose failures that happy-path demos cannot."
    },
    {
      "type": "h2",
      "text": "Keep reading"
    },
    {
      "type": "p",
      "text": "This is one part of a connected operating day. Read our related guide, “Why hotel bank transfers go unmatched and how to fix the trail”, for the next operational perspective."
    }
  ],
  "faqs": [
    {
      "q": "What is concurrency control in hotel sales software?",
      "a": "Concurrency control prevents simultaneous orders and corrections from producing contradictory inventory, payment or ledger outcomes."
    },
    {
      "q": "Why use one transaction for a completed sale?",
      "a": "An atomic unit of work helps commit the authoritative sale outcome, financial ledger and outbox together instead of leaving mismatched partial results."
    }
  ]
};

export default post;
