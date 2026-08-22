import Image from "next/image";

export default function Footer() {
  return (
    <footer className="f2-footer">
      <div className="wrap f2-cta">
        <div>
          <span className="f2-eyebrow">Ready when you are</span>
          <h3 className="f2-cta-h">Stop guessing what happened at 2am.</h3>
        </div>
        <a className="btn btn-brass" href="#cta">
          Get a demo
        </a>
      </div>
      <div className="wrap f2-grid">
        <div className="f2-brand">
          <a href="#main" className="nav-wordmark" aria-label="Innbase home">
            <Image src="/images/innbase-light.svg" alt="logo" width={132} height={32} />
            <span className="sr-only">Innbase</span>
          </a>
          <p>Every sale, payment, and shift — reconciled automatically.</p>
        </div>
        <div className="f2-col">
          <h4>
            <span className="f2-dot" style={{ background: "#2dd4bf" }} />
            Product
          </h4>
          <a href="#product">Payments</a>
          <a href="#product">Inventory</a>
          <a href="#product">Shift</a>
          <a href="#product">Guests</a>
        </div>
        <div className="f2-col">
          <h4>
            <span className="f2-dot" style={{ background: "#fbbf24" }} />
            Explore
          </h4>
          <a href="#reconciliation">Why it&apos;s trustworthy</a>
          <a href="#demo">Live demo</a>
          <a href="#quote">Customers</a>
          <a href="#roles">Who it&apos;s for</a>
        </div>
        <div className="f2-col">
          <h4>
            <span className="f2-dot" style={{ background: "#60a5fa" }} />
            Decide
          </h4>
          <a href="pricing.html">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#stories">Pilot results</a>
          <a href="#cta">Book a demo</a>
        </div>
        <div className="f2-col">
          <h4>
            <span className="f2-dot" style={{ background: "#d68af0" }} />
            Contact
          </h4>
          <a href="mailto:hello@innbase.co">hello@innbase.co</a>
          <a href="mailto:hello@innbase.co?subject=Innbase%20demo%20request">Request a demo</a>
          <a href="auth.html">Log in</a>
        </div>
      </div>
      <div className="wrap f2-bottom">
        <span className="mono">© 2026 Innbase</span>
        <span className="f2-status mono">
          <span className="f2-status-dot" />
          All systems reconciled
        </span>
        <span className="mono">Built for hotels &amp; bars across Nigeria.</span>
      </div>
    </footer>
  );
}
