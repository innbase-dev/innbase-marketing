import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { PRINCIPLES } from "@/data/aboutData";

function Sparkle({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className={className}
        >
            <path d="M12 0l2.2 8.8L23 12l-8.8 2.2L12 24l-2.2-8.8L1 12l8.8-2.2L12 0z" />
        </svg>
    );
}

export default function PhilosophySection() {
    return (
        <section className="principles-sec" id="philosophy">
            <div className="corner-block tl" aria-hidden="true" />
            <div className="corner-block br" aria-hidden="true" />
            <div className="orbit" aria-hidden="true" />
            <Sparkle className="sparkle" />

            <div className="wrap">
                <div className="principles-head">
                    <Reveal className="sec-head reveal" style={{ maxWidth: 640 }}>
                        <span className="sec-eyebrow">Principles</span>
                        <h2 className="sec-h2">
                            A few <u>convictions we don&apos;t compromise on</u>.
                        </h2>
                        <p className="sec-sub">
                            These aren&apos;t values on a wall. They&apos;re
                            decisions we make every time we sit down to build
                            something.
                        </p>
                    </Reveal>

                    <a href="#letter" className="principles-cta">
                        Read the founders&apos; letter
                        <Icon name="arrow-right" className="icon" />
                    </a>
                </div>

                <Reveal className="principle-scatter reveal-stag reveal">
                    {PRINCIPLES.map((p) => (
                        <div className="p-card" key={p.title}>
                            <span className="p-ico">
                                <Icon name={p.icon} className="icon" />
                            </span>
                            <div className="p-title">{p.title}</div>
                            <p className="p-body">{p.body}</p>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
