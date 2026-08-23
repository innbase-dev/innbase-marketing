export default function LogoStrip() {
    return (
        <section
            style={{
                background: "var(--ink-soft)",
                padding: "34px 0 30px",
                borderBottom: "1px solid var(--ink-line)",
            }}
        >
            <div
                className="wrap trust-row"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 40,
                    justifyContent: "center",
                }}
            >
                <span className="trust-mark">The George Hotel</span>
                <span className="trust-mark">Grand Emperium Hotel</span>
                <span className="trust-mark">Lekki Shore Suites</span>
                <span className="trust-mark">The Bay Lounge</span>
                <span className="trust-mark">The Palm Room</span>
                <span className="trust-mark">Ilaje Boutique Inn</span>
            </div>
        </section>
    );
}
