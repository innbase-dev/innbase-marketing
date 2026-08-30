import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function OaCta() {
    return (
        <section className="cta-band" id="cta">
            <div className="hero-glow">
                <div className="blob b1" style={{ opacity: ".16" }} />
            </div>
            <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
                <Reveal as="h2" className="reveal">
                    Give your team one more pair of hands.
                </Reveal>
                <Reveal as="p" className="reveal" style={{ transitionDelay: ".08s" }}>
                    See how the Operational Assistant fits into the way your hotel already runs — no card, no
                    long rollout.
                </Reveal>
                <Reveal className="cta-ctas reveal" style={{ transitionDelay: ".16s" }}>
                    <Link href="/#product" className="btn btn-brass">
                        See Innbase in action
                    </Link>
                    <a
                        href="mailto:hello@innbase.co?subject=Question%20about%20the%20Operational%20Assistant"
                        className="btn btn-ghost-dark"
                    >
                        Talk to the team
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
