import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Footer() {
    return (
        <footer className="f2-footer">
            <div className="wrap f2-cta">
                <div>
                    <span className="f2-eyebrow">Ready when you are</span>
                    <h3 className="f2-cta-h">
                        Give every shift a clearer story.
                    </h3>
                    <p className="f2-cta-p">
                        See how Innbase keeps the people behind every great
                        stay in sync.
                    </p>
                </div>
                <Link className="btn btn-brass" href="/contact">
                    Book a demo <span aria-hidden="true">↗</span>
                </Link>
            </div>
            <div className="wrap f2-grid">
                <div className="f2-brand">
                    <Link href="/" className="nav-wordmark" aria-label="Innbase home">
                        <BrandMark />
                    </Link>
                    <p>
                        The operating system for the people behind every great
                        stay.
                    </p>
                    <span className="f2-brand-note">Built in Nigeria · made for hospitality</span>
                </div>
                <div className="f2-col">
                    <h4>
                        <span
                            className="f2-dot"
                            style={{ background: "var(--sage)" }}
                        />
                        Product
                    </h4>
                    <Link href="/#product">Payments</Link>
                    <Link href="/#product">Point of sale</Link>
                    <Link href="/#product">Inventory</Link>
                    <Link href="/#product">Shift management</Link>
                    <Link href="/guest-companion">Guest Companion</Link>
                    <Link href="/assistant">AI Assistant</Link>
                </div>
                <div className="f2-col">
                    <h4>
                        <span
                            className="f2-dot"
                            style={{ background: "var(--apricot)" }}
                        />
                        Explore
                    </h4>
                    <Link href="/#roles">Hotels &amp; guesthouses</Link>
                    <Link href="/#roles">Restaurants</Link>
                    <Link href="/#roles">Bars &amp; lounges</Link>
                    <Link href="/#roles">Multi-property</Link>
                    <Link href="/about">Why Innbase</Link>
                    <Link href="/#stories">Customer stories</Link>
                </div>
                <div className="f2-col">
                    <h4>
                        <span
                            className="f2-dot"
                            style={{ background: "#d8b894" }}
                        />
                        Decide
                    </h4>
                    <Link href="/pricing">Pricing</Link>
                    <Link href="/#demo">Live demo</Link>
                    <Link href="/#faq">FAQs</Link>
                    <Link href="/#reconciliation">Trust &amp; security</Link>
                    <Link href="/legal">Terms &amp; privacy</Link>
                </div>
                <div className="f2-col">
                    <h4>
                        <span
                            className="f2-dot"
                            style={{ background: "#d7b6d9" }}
                        />
                        Contact
                    </h4>
                    <Link href="/contact">Book a Demo</Link>
                    <Link href="/contact">Talk to sales</Link>
                    <Link href="/contact">Support</Link>
                    <a href="mailto:hello@innbase.co">hello@innbase.co</a>
                    <a href="https://app.innbase.co/login">Log in ↗</a>
                </div>
            </div>
            <div className="wrap f2-bottom">
                <span className="mono">© 2026 Innbase</span>
                <span className="f2-status mono">
                    <span className="f2-status-dot" />
                    All systems reconciled
                </span>
                <span className="mono origin">
                    Nigeria · hospitality, connected.
                </span>
                <span className="f2-bottom-links">
                    <Link href="/legal#privacy">Privacy</Link>
                    <Link href="/legal#terms">Terms</Link>
                </span>
            </div>
        </footer>
    );
}
