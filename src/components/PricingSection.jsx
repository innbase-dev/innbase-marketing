import Icon from "./Icon";
import Reveal from "./Reveal";

const PLANS = [
  { name: "Boutique — ₦24,000/mo", desc: "Up to 10 staff. For small hotels running a lean team." },
  { name: "Base — ₦48,000/mo", desc: "Up to 20 staff. For growing independent hotels." },
  { name: "Growth — ₦99,000/mo", desc: "Up to 50 staff, plus Guest Companion." },
  { name: "Enterprise — let's talk", desc: "Multi-property and custom operational needs." },
];

export default function PricingSection() {
  return (
    <section className="sec price-sec" id="pricing">
      <div
        className="sec-blob"
        style={{
          width: 460,
          height: 380,
          background: "radial-gradient(circle,var(--amber) 0%,transparent 70%)",
          opacity: ".08",
          top: "-90px",
          right: "-120px",
        }}
      />
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="sec-eyebrow">Pricing</span>
          <h2 className="sec-h2">Pay for the hotel you run.</h2>
          <p className="sec-sub">
            Four plans, priced by the size of your team — Boutique from ₦24,000/mo up to
            Enterprise. No per-user charges, no card to start.
          </p>
        </Reveal>

        <Reveal as="div" className="price-card reveal">
          <div className="price-main">
            <span className="price-badge">
              <Icon name="sparkles" className="icon" style={{ width: 11, height: 11 }} />
              Boutique from ₦24,000/mo
            </span>
            <h3>Start where you are. Grow when your hotel does.</h3>
            <p>
              Every plan runs the complete Innbase platform — point of sale, payments,
              reconciliation, and staff management. Larger plans add capacity, Guest Companion,
              and priority support as your team grows.
            </p>
            <a href="/pricing" className="btn btn-brass">
              See plans &amp; pricing
            </a>
          </div>
          <div className="price-list">
            {PLANS.map((p) => (
              <div className="price-line" key={p.name}>
                <span className="pl-ic">
                  <Icon name="check" className="icon" />
                </span>
                <span>
                  <b>{p.name}</b>
                  <small>{p.desc}</small>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
