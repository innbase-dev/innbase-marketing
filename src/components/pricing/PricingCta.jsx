import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function PricingCta() {
    return (
        <section className="cta-band" id="cta">
            <div className="hero-glow">
                <div className="blob b1" style={{ opacity: ".16" }} />
            </div>
            <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
                <Reveal as="h2" className="reveal">
                    Find the plan that fits
                    <br />
                    the hotel you run.
                </Reveal>
                <Reveal
                    as="p"
                    className="reveal"
                    style={{ transitionDelay: ".08s" }}
                >
                    Talk it through on a demo call — we&apos;ll help you pick
                    the right plan and get your first workspace running in an
                    afternoon.
                </Reveal>
                <Reveal
                    className="cta-ctas reveal"
                    style={{ transitionDelay: ".16s" }}
                >
                    <Link href="/#cta" className="btn btn-brass">
                        Book a demo
                    </Link>
                    <a
                        href="mailto:hello@innbase.co?subject=Question%20about%20Innbase%20pricing"
                        className="btn btn-ghost-dark"
                    >
                        Ask about pricing
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
