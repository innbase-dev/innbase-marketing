const FAQS = [
  {
    q: "How does the referral program work?",
    a: "Share your referral link or tell a hotel to mention your name when they get in touch with Innbase. Once they sign up and become a paying customer, you earn a reward.",
  },
  {
    q: "Do they have to use my link to count?",
    a: "No. The link just makes it easier for us to connect the referral to you. If they contact Innbase another way, ask them to mention your name and we'll link it manually.",
  },
  {
    q: "When do I get paid?",
    a: "Your reward becomes available once the hotel makes its first payment. From there you can withdraw any time — there's no waiting period.",
  },
  {
    q: "How much can I earn per hotel?",
    a: "You earn ₦20,000 when a hotel you introduce becomes a paying customer and we confirm the referral. Your earned rewards appear in the Rewards page.",
  },
  {
    q: "Why does a referral say 'Attribution pending'?",
    a: "This means we're still confirming that a referral was introduced by you. It usually resolves within a day or two.",
  },
  {
    q: "Is there a limit to how much I can withdraw at once?",
    a: "Withdrawals take your full available balance in one request — there's no partial withdrawal.",
  },
];

export default function HelpPage() {
  return (
    <div>
      <div className="pf-greeting">
        <h1>Help</h1>
        <p>How the referral program works, and how to reach us.</p>
      </div>

      <div className="pf-section-title"><h2>Frequently asked</h2></div>
      <div style={{ marginBottom: 36 }}>
        {FAQS.map((f) => (
          <div key={f.q} className="pf-help-item">
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      <div className="pf-section-title"><h2>Still need something?</h2></div>
      <div className="pf-list">
        <div className="pf-account-row">
          <span>Email support</span>
          <a href="mailto:hello@innbase.co">hello@innbase.co</a>
        </div>
        <div className="pf-account-row">
          <span>WhatsApp</span>
          <span>Chat with us in-app</span>
        </div>
      </div>
    </div>
  );
}
