import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function AboutCta() {
    return (
        <section className="cta-band" id="cta">
            <div className="hero-glow">
                <div className="blob b1" style={{ opacity: ".16" }} />
            </div>
            <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
                <Reveal as="h2" className="reveal">
                    We&apos;ve shown you who we are.
                    <br />
                    Now come see what we&apos;re building.
                </Reveal>
                <Reveal
                    as="p"
                    className="reveal"
                    style={{ transitionDelay: ".08s" }}
                >
                    No card, no consultants, no six-week rollout — just an
                    honest look at whether Innbase fits how your hotel actually
                    runs.
                </Reveal>
                <Reveal
                    className="cta-ctas reveal"
                    style={{ transitionDelay: ".16s" }}
                >
                    <Link href="/#product" className="btn btn-brass">
                        See Innbase in action
                    </Link>
                    <a
                        href="mailto:hello@innbase.co?subject=Question%20about%20Innbase"
                        className="btn btn-ghost-dark"
                    >
                        Talk to the team
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
