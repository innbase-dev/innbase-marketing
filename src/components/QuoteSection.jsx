import Reveal from "./Reveal";

export default function QuoteSection() {
  return (
    <section className="sec quote-sec" id="quote">
      <div className="dot-grain" />
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="sec-eyebrow">In their words</span>
          <h2 className="sec-h2">The people counting the money, on the record.</h2>
        </Reveal>

        <Reveal as="figure" className="quote-hero reveal">
          <div className="q-glow" />
          <span className="qa-quote" style={{ fontSize: 144, marginTop: "-48px" }}>
            &ldquo;
          </span>
          <blockquote>
            Close-out used to be 45 minutes of counting and arguing. Now it&rsquo;s five minutes
            of confirming what Innbase already matched.{" "}
            <em>The first week honestly felt like cheating.</em>&rdquo;
          </blockquote>
          <figcaption className="quote-attr">
            <span className="qa-ava" style={{ background: "var(--amber)" }} aria-hidden="true">
              NA
            </span>
            <span className="author">
              <span className="qa-name">Ngozi Adewale</span>
              <span className="qa-role">General Manager, The George Hotel · Lagos Mainland</span>
            </span>
          </figcaption>
        </Reveal>

        <Reveal className="quote-grid reveal-stag reveal">
          <figure className="quote-card">
            <blockquote>
              &ldquo;The stock count finally defends my bartenders instead of accusing them. That
              changed the whole mood of a Friday night close.&rdquo;
            </blockquote>
            <figcaption className="quote-attr">
              <span className="qa-ava" style={{ background: "var(--teal)" }} aria-hidden="true">
                TB
              </span>
              <span className="author">
                <span className="qa-name">Tunde Bakare</span>
                <span className="qa-role">Owner, The Bay Lounge · Lekki Phase 1</span>
              </span>
            </figcaption>
          </figure>
          <figure className="quote-card">
            <blockquote>
              &ldquo;One screen shows the tab, the room charge, and what&rsquo;s outstanding. I
              stopped apologising to guests while I checked three systems.&rdquo;
            </blockquote>
            <figcaption className="quote-attr">
              <span className="qa-ava" style={{ background: "#60a5fa" }} aria-hidden="true">
                EO
              </span>
              <span className="author">
                <span className="qa-name">Emeka Obi</span>
                <span className="qa-role">Front Desk Lead, Grand Emperium Hotel · Port Harcourt</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
