import Icon from "../Icon";
import Reveal from "../Reveal";

/**
 * Option E — "why it matters", impact cards with alternating teal/amber
 * icon accents (handled by the :nth-child(odd/even) rule in globals.css).
 */
const IMPACTS = [
    {
        icon: "arrow-down",
        title: "Less writing things down",
        body: "Staff spend less time entering and searching for information.",
    },
    {
        icon: "zap",
        title: "Faster fixes",
        body: "A request becomes action right away, not a task someone has to remember.",
    },
    {
        icon: "list",
        title: "Nothing gets lost",
        body: "Information lives in Innbase, not scattered across notebooks and WhatsApp.",
    },
    {
        icon: "heart",
        title: "More time for guests",
        body: "Less time on admin means more time actually running the hotel.",
    },
];

export default function ImpactSection() {
    return (
        <section className="sec" id="impact-alt">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Why it matters</span>
                    <h2 className="sec-h2">
                        Your staff get their time back.
                    </h2>
                    <p className="sec-sub">
                        That&apos;s the whole point — not &quot;AI,&quot;
                        just less busywork.
                    </p>
                </Reveal>

                <Reveal className="impact-grid reveal-stag reveal">
                    {IMPACTS.map((it) => (
                        <div className="impact-card" key={it.title}>
                            <span className="c-ico">
                                <Icon name={it.icon} className="icon" />
                            </span>
                            <h3>{it.title}</h3>
                            <p>{it.body}</p>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
