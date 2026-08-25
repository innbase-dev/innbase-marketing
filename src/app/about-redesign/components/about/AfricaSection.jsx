import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

function PinIcon() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
                d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <circle cx="12" cy="9.5" r="2.4" fill="currentColor" />
        </svg>
    );
}

export default function AfricaSection() {
    return (
        <section className="sec-tight" id="africa">
            <div className="wrap">
                <div className="africa-grid">
                    <div>
                        <Reveal className="sec-head reveal">
                            <span className="sec-eyebrow">
                                Where we&apos;re building from
                            </span>
                            <h2 className="sec-h2">
                                Built in Africa, for the way African hotels
                                actually operate.
                            </h2>
                            <p className="sec-sub">
                                Innbase is being built from Nigeria, for hotels
                                here first. But the operational reality
                                we&apos;re designing for — cash, transfers,
                                phone bookings, busy shifts, owners who
                                can&apos;t be everywhere — isn&apos;t unique to
                                one country.
                            </p>
                        </Reveal>

                        <Reveal className="africa-row reveal">
                            <span className="africa-chip now">
                                Nigeria — where we build today
                            </span>
                            <span className="africa-arrow">
                                <Icon
                                    name="arrow-right"
                                    className="icon"
                                    style={{ width: 14, height: 14 }}
                                />
                            </span>
                            <span className="africa-chip next">
                                A wider African hospitality industry — where
                                we&apos;re headed
                            </span>
                        </Reveal>

                        <p className="africa-note">
                            This is a statement of ambition, not a claim of
                            where we operate today. We&apos;d rather be honest
                            about that than impressive about it.
                        </p>
                    </div>

                    <Reveal
                        className="africa-visual reveal"
                        style={{ transitionDelay: ".1s" }}
                    >
                        <div className="africa-visual-grid" aria-hidden="true" />
                        <span className="africa-pin">
                            <span className="africa-pin-ring" />
                            <span className="africa-pin-ring delay" />
                            <span className="africa-pin-core">
                                <PinIcon />
                            </span>
                        </span>
                        <span className="africa-visual-label">
                            Lagos, Nigeria
                        </span>
                        <span className="africa-visual-tag">
                            Map — to be added
                        </span>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
