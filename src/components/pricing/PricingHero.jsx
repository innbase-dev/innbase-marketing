export default function PricingHero() {
  return (
    <header className="hero">
      <div className="hero-glow">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>
      <div className="hero-dots" />
      <div className="wrap hero-inner">
        <div className="hero-content">
          <span className="eyebrow reveal in">
            <span className="dot" />
            Pricing
          </span>
          <h1 className="reveal in" style={{ transitionDelay: ".05s" }}>
            Pay for the hotel <em>you run</em>.
          </h1>
          <p className="hero-sub reveal in" style={{ transitionDelay: ".14s" }}>
            You don&apos;t need to pay for the hotel you hope to become — only the one you&apos;re
            running today. Three plans, priced only in Naira and sized to your staff, with the
            exact same platform underneath every tier. Move up only when your team actually
            grows.
          </p>
          <div className="hero-note reveal in" style={{ transitionDelay: ".22s" }}>
            <span className="live-dot" />
            NO PER-STAFF PRICING <span className="sep">·</span> NO CARD TO START{" "}
            <span className="sep">·</span> CANCEL ANY MONTH
          </div>
        </div>
      </div>
    </header>
  );
}
