import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { WHO_FOR_CARDS } from "@/data/aboutData";

export default function WhoForSection() {
    return (
        <section className="sec sec-alt" id="who-for">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">
                        Who we&apos;re building for
                    </span>
                    <h2 className="sec-h2">
                        Built for the people who actually run hotels.
                    </h2>
                    <p className="sec-sub">
                        Sometimes the booking comes from a phone call. Sometimes
                        payment is cash. Sometimes it&apos;s a bank transfer,
                        confirmed over WhatsApp. Sometimes the owner is checking
                        the numbers from home while the hotel is still running,
                        three departments deep into a Friday night.
                    </p>
                    <p className="sec-sub">
                        That&apos;s not an edge case to us. That&apos;s the
                        environment we&apos;re building for.
                    </p>
                </Reveal>

                <Reveal className="role-grid reveal-stag reveal">
                    {WHO_FOR_CARDS.map((c) => (
                        <div className="role-card" key={c.title}>
                            <span className="r-ico">
                                <Icon name={c.icon} className="icon" />
                            </span>
                            <h4>{c.title}</h4>
                            <div className="r-pain">{c.pain}</div>
                            <div className="r-fix">{c.fix}</div>
                        </div>
                    ))}
                </Reveal>

                <Reveal as="p" className="role-close reveal">
                    We build for the environment hotels actually operate in —{" "}
                    <span>not an idealized version of hospitality.</span>
                </Reveal>
            </div>
        </section>
    );
}
