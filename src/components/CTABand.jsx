import Reveal from "./Reveal";

export default function CTABand() {
  return (
    <section className="cta-band" id="cta">
      <div className="hero-glow">
        <div className="blob b1" style={{ opacity: ".12" }} />
      </div>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <Reveal as="h2" className="reveal">
          Stop guessing.
          <br />
          Start knowing.
        </Reveal>
        <Reveal as="p" className="reveal" style={{ transitionDelay: ".08s" }}>
          We&apos;re onboarding a small group of Nigerian hotels &amp; bars this quarter. Set up
          your first workspace in an afternoon — no card, no consultants, no six-week rollout.
        </Reveal>
        <Reveal className="cta-ctas reveal" style={{ transitionDelay: ".16s" }}>
          <a href="mailto:hello@innbase.co?subject=Innbase%20demo%20request" className="btn btn-brass">
            Book a Demo
          </a>
          <a href="mailto:hello@innbase.co?subject=Question%20about%20Innbase" className="btn btn-ghost-dark">
            Talk to us
          </a>
        </Reveal>
        <Reveal
          className="hero-note reveal"
          style={{ transitionDelay: ".24s", justifyContent: "center" }}
        >
          <span className="live-dot" />
          NO CARD REQUIRED · LIMITED PILOT SLOTS THIS QUARTER
        </Reveal>
      </div>
    </section>
  );
}
