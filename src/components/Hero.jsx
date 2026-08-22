import Icon from "./Icon";
import HeroDashboard from "./HeroDashboard";

export default function Hero() {
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
            Built for hotels &amp; bars that run on cash, shifts, and trust
          </span>
          <h1 className="reveal in" style={{ transitionDelay: ".05s" }}>
            One Hotel. One Story. One <em>Truth</em>.
          </h1>
          <p className="hero-sub reveal in" style={{ transitionDelay: ".14s" }}>
            Your hotel already generates all the information you need. It&apos;s just scattered
            across reception, the bar, inventory, payments, and shifts. Innbase connects those
            pieces into one operational truth, so when something goes wrong, you know exactly what
            happened.
          </p>
          <div className="hero-ctas reveal in" style={{ transitionDelay: ".22s" }}>
            <a href="#cta" className="btn btn-brass">
              Book a Demo
            </a>
            <a href="#demo" className="btn btn-ghost-dark">
              <Icon name="play-circle" className="icon" style={{ width: 16, height: 16 }} />
              Try the live demo
            </a>
          </div>
          <div className="hero-note reveal in" style={{ transitionDelay: ".3s" }}>
            <span className="live-dot" />
            NO CARD REQUIRED · SET UP IN AN AFTERNOON
          </div>
        </div>

        <HeroDashboard />
      </div>
    </header>
  );
}
