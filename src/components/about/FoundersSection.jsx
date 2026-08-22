import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { FOUNDERS } from "@/data/aboutData";

export default function FoundersSection() {
  return (
    <section className="sec" id="founders">
      <div className="dot-grain" />
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="sec-eyebrow">Who&apos;s building it</span>
          <h2 className="sec-h2">Two people, two disciplines, one product.</h2>
          <p className="sec-sub">
            Innbase isn&apos;t a faceless software company. It&apos;s built by two founders who
            split the work along product and engineering, and agree on almost everything else.
          </p>
        </Reveal>

        <Reveal className="founder-grid reveal-stag reveal">
          {FOUNDERS.map((f) => (
            <article className="founder-card" key={f.name}>
              <div className="founder-top">
                <span className="founder-photo" style={{ background: f.color }}>
                  {f.initials}
                </span>
                <div>
                  <div className="founder-name">{f.name}</div>
                  <div className="founder-role">{f.role}</div>
                </div>
              </div>
              <p className="founder-focus">
                <b>{f.focusLabel}</b>
                {f.focus}
              </p>
              <p className="founder-quote">{f.quote}</p>
              <span className="founder-placeholder-tag">
                <Icon name="pencil-line" className="icon" style={{ width: 11, height: 11 }} />
                Placeholder — pending approval
              </span>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
