import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

export default function AfricaSection() {
    return (
        <section className="sec-tight" id="africa">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">
                        Where we&apos;re building from
                    </span>
                    <h2 className="sec-h2">
                        Built in Africa, for the way African hotels actually
                        operate.
                    </h2>
                    <p className="sec-sub">
                        Innbase is being built from Nigeria, for hotels here
                        first. But the operational reality we&apos;re designing
                        for — cash, transfers, phone bookings, busy shifts,
                        owners who can&apos;t be everywhere — isn&apos;t unique
                        to one country.
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
                        A wider African hospitality industry — where we&apos;re
                        headed
                    </span>
                </Reveal>
                <p className="africa-note">
                    This is a statement of ambition, not a claim of where we
                    operate today. We&apos;d rather be honest about that than
                    impressive about it.
                </p>
            </div>
        </section>
    );
}
