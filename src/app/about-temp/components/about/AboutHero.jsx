import Link from "next/link";

export default function AboutHero() {
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
                        Why we&apos;re building Innbase
                    </span>
                    <h1
                        className="reveal in"
                        style={{ transitionDelay: ".05s" }}
                    >
                        We&apos;re building the hotel software we{" "}
                        <em>wish existed</em>.
                    </h1>
                    <p
                        className="hero-sub reveal in"
                        style={{ transitionDelay: ".14s" }}
                    >
                        Innbase started with a simple frustration: hotels
                        generate enormous amounts of information every single
                        day — and almost none of it stays connected. We&apos;re
                        a small team trying to fix that, carefully, for the long
                        term.
                    </p>
                    <div
                        className="hero-ctas reveal in"
                        style={{ transitionDelay: ".22s" }}
                    >
                        <Link href="/#product" className="btn btn-brass">
                            See Innbase in action
                        </Link>
                        <a
                            href="mailto:hello@innbase.co?subject=Hello%20from%20the%20About%20page"
                            className="btn btn-ghost-dark"
                        >
                            Talk to the team
                        </a>
                    </div>
                    <div
                        className="hero-note reveal in"
                        style={{ transitionDelay: ".3s" }}
                    >
                        <span className="live-dot" />
                        ONE PRODUCT MIND · ONE ENGINEERING MIND · BUILT FROM
                        NIGERIA
                    </div>
                </div>

                <div
                    className="hero-duo reveal in"
                    style={{ transitionDelay: ".36s" }}
                >
                    <div className="hero-duo-grid">
                        <div className="hero-duo-face">
                            <span
                                className="hero-duo-initial"
                                style={{ background: "var(--brass)" }}
                            >
                                EO
                            </span>
                            <span className="hero-duo-name">
                                Efe Great Ojadua
                            </span>
                            <span className="hero-duo-role">CEO</span>
                        </div>
                        <div className="hero-duo-face">
                            <span
                                className="hero-duo-initial"
                                style={{ background: "var(--teal)" }}
                            >
                                CO
                            </span>
                            <span className="hero-duo-name">
                                Chibeze Endurance Ochonogor
                            </span>
                            <span className="hero-duo-role">CTO</span>
                        </div>
                    </div>
                    <div className="hero-duo-tag">
                        <span>Photos — to be added</span>
                        <span
                            className="mono"
                            style={{ color: "rgba(255,255,255,.35)" }}
                        >
                            FOUNDERS
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
