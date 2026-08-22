import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="f2-footer">
      <div className="wrap f2-cta">
        <div>
          <span className="f2-eyebrow">Ready when you are</span>
          <h3 className="f2-cta-h">Stop guessing what happened at 2am.</h3>
        </div>
        <Link className="btn btn-brass" href="/#cta">
          Get a demo
        </Link>
      </div>
      <div className="wrap f2-grid">
        <div className="f2-brand">
          <Link href="/" className="nav-wordmark" aria-label="Innbase home">
            <Image src="/images/innbase-light.svg" alt="Innbase" width={132} height={32} />
          </Link>
          <p>Every sale, payment, and shift — reconciled automatically.</p>
        </div>
        <div className="f2-col">
          <h4>
            <span className="f2-dot" style={{ background: "#2dd4bf" }} />
            Product
          </h4>
          <Link href="/#product">Payments</Link>
          <Link href="/#product">Inventory</Link>
          <Link href="/#product">Shift</Link>
          <Link href="/#product">Guests</Link>
        </div>
        <div className="f2-col">
          <h4>
            <span className="f2-dot" style={{ background: "#fbbf24" }} />
            Explore
          </h4>
          <Link href="/#reconciliation">Why it&apos;s trustworthy</Link>
          <Link href="/about">About</Link>
          <Link href="/#quote">Customers</Link>
          <Link href="/#roles">Who it&apos;s for</Link>
        </div>
        <div className="f2-col">
          <h4>
            <span className="f2-dot" style={{ background: "#60a5fa" }} />
            Decide
          </h4>
          <Link href="/pricing">Pricing</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/#stories">Pilot results</Link>
          <Link href="/#cta">Book a demo</Link>
        </div>
        <div className="f2-col">
          <h4>
            <span className="f2-dot" style={{ background: "#d68af0" }} />
            Legal &amp; contact
          </h4>
          <Link href="/legal#terms">Terms of Service</Link>
          <Link href="/legal#privacy">Privacy Policy</Link>
          <Link href="/legal#gdpr">GDPR &amp; Data Rights</Link>
          <Link href="/contact">Contact us</Link>
          <a href="mailto:hello@innbase.co">hello@innbase.co</a>
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
