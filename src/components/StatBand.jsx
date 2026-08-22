import Reveal from "./Reveal";
import CountUp from "./CountUp";

const STATS = [
  { count: 96, suffix: "%", label: "Average auto-match confidence" },
  { count: 100, suffix: "%", label: "Of transactions traced to a source" },
  { count: 5, suffix: " min", label: "Median shift close-out time" },
  { count: 1, suffix: "", label: "Dashboard for owner, manager & bar" },
];

export default function StatBand() {
  return (
    <section className="stat-band">
      <div
        className="sec-blob"
        style={{
          width: 640,
          height: 220,
          background: "radial-gradient(circle,var(--amber) 0%,transparent 70%)",
          opacity: ".1",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
      <div className="wrap" style={{ padding: "64px var(--pad-x)" }}>
        <Reveal className="stat-grid reveal-stag reveal">
          {STATS.map((s) => (
            <div className="stat-item" key={s.label}>
              <div className="sv tnum">
                <CountUp as="span" target={s.count} suffix={s.suffix} />
              </div>
              <div className="sl">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
