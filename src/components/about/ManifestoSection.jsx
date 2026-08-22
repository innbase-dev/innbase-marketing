import Reveal from "@/components/Reveal";
import { MANIFESTO_LINES } from "@/data/aboutData";

export default function ManifestoSection() {
  return (
    <section className="sec manifesto" id="believe">
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="sec-eyebrow">What we believe</span>
          <h2 className="sec-h2">
            A hotel owner shouldn&apos;t need to be everywhere to know what&apos;s happening.
          </h2>
        </Reveal>
        <Reveal className="manifesto-list reveal-stag reveal">
          {MANIFESTO_LINES.map((line, i) => (
            <p className="manifesto-line" key={i}>
              {line}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
