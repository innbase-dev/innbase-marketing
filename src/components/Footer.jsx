import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="f2-footer">
            <div className="wrap f2-cta">
                <div>
                    <span className="f2-eyebrow">Ready when you are</span>
                    <h3 className="f2-cta-h">
                        Stop guessing what happened at 2am.
                    </h3>
                </div>
                <Link className="btn btn-brass" href="/#cta">
                    Get a demo
                </Link>
            </div>
            <div className="wrap f2-grid">
                <div className="f2-brand">
                    <Link
                        href="/"
                        className="nav-wordmark"
                        aria-label="Innbase home"
                    >
                        <Image
                            src="/images/innbase-light.svg"
                            alt="Innbase"
                            width={132}
                            height={32}
                        />
                    </Link>
                    <p>
                        Every sale, payment, and shift — reconciled
                        automatically.
                    </p>
                </div>
                <div className="f2-col">
                    <h4>
                        <span
                            className="f2-dot"
                            style={{ background: "#2dd4bf" }}
                        />
                        Platform
                    </h4>
                    <Link href="/#product">Payments</Link>
                    <Link href="/#product">Inventory</Link>
                    <Link href="/#product">Shift Management</Link>
                    <Link href="/#product">Guest Folios</Link>
                    <Link href="/assistant">AI Assistant</Link>
                    <Link href="/guest-companion">Guest Companion</Link>
                </div>
                <div className="f2-col">
                    <h4>
                        <span
                            className="f2-dot"
                            style={{ background: "#fbbf24" }}
                        />
                        Solutions
                    </h4>
                    <Link href="/#roles">For Hotels &amp; Resorts</Link>
                    <Link href="/#roles">For Restaurants</Link>
                    <Link href="/#roles">For Bars &amp; Nightlife</Link>
                    <Link href="/#reconciliation">Trust &amp; Security</Link>
                </div>
                <div className="f2-col">
                    <h4>
                        <span
                            className="f2-dot"
                            style={{ background: "#60a5fa" }}
                        />
                        Resources
                    </h4>
                    <Link href="/pricing">Pricing</Link>
                    <Link href="/#quote">Customer Stories</Link>
                    <Link href="/#faq">FAQs</Link>
                    <Link href="/about">About</Link>
                </div>
                <div className="f2-col">
                    <h4>
                        <span
                            className="f2-dot"
                            style={{ background: "#d68af0" }}
                        />
                        Contact &amp; Legal
                    </h4>
                    <Link href="/contact">Book a Demo</Link>
                    <Link href="/contact">Contact Sales</Link>
                    <Link href="/legal#privacy">Legal &amp; Privacy</Link>
                    <a href="mailto:hello@innbase.co">hello@innbase.co</a>
                </div>
            </div>
            <div className="wrap f2-bottom">
                <span className="mono">© 2026 Innbase</span>
                <span className="f2-status mono">
                    <span className="f2-status-dot" />
                    All systems reconciled
                </span>
                <span className="mono origin">
                    Built for hotels &amp; bars across Nigeria.
                </span>
            </div>
        </footer>
    );
}
