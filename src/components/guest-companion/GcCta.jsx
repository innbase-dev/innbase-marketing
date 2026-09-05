import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function GcCta() {
    return (
        <section className="cta-band" id="cta">
            <div className="hero-glow">
                <div className="blob b2" style={{ opacity: ".18" }} />
            </div>
            <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
                <Reveal as="h2" className="reveal">
                    Ready to give your guests a simpler way to reach you?
                </Reveal>
                <Reveal as="p" className="reveal" style={{ transitionDelay: ".08s" }}>
                    See Guest Companion running on a real property — no card, no long rollout, just a QR code and a
                    conversation about your operation.
                </Reveal>
                <Reveal className="cta-ctas reveal" style={{ transitionDelay: ".16s" }}>
                    <Link href="/contact" className="btn btn-brass">
                        See Guest Companion in action
                    </Link>
                    <a
                        href="mailto:hello@innbase.co?subject=Question%20about%20Guest%20Companion"
                        className="btn btn-ghost-dark"
                    >
                        Talk to the team
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
