export default function LegalHero() {
    return (
        <header className="legal-head">
            <div className="dot-grain" />
            <div className="sec-blob" />
            <div className="wrap">
                <span className="eyebrow">
                    <span className="dot" />
                    Legal
                </span>
                <h1>Terms, Privacy &amp; GDPR — all in one place.</h1>
                <p>
                    How Innbase works with your hotel&apos;s data, what
                    you&apos;re agreeing to when you use it, and the rights you
                    have. No separate PDFs to hunt down.
                </p>
                <div className="legal-meta">
                    <span>
                        <span className="d" />
                        Last updated:{" "}
                        <span className="ph">
                            Effective date — to be finalized
                        </span>
                    </span>
                    <span>
                        Questions?{" "}
                        <a
                            href="mailto:hello@innbase.co?subject=Legal%20question"
                            style={{
                                color: "var(--text-dark)",
                                textDecoration: "underline",
                                textUnderlineOffset: "3px",
                            }}
                        >
                            hello@innbase.co
                        </a>
                    </span>
                </div>
            </div>
        </header>
    );
}
