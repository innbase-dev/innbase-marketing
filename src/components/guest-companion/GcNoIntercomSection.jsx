import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { GC_NO_INTERCOM_CARDS } from "@/data/guestCompanionData";

export default function GcNoIntercomSection() {
    return (
        <section className="sec" id="no-intercom">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Works with the hotel you already have</span>
                    <h2 className="sec-h2">You don&apos;t need an intercom in every room.</h2>
                    <p className="sec-sub">
                        Guest Companion gives guests a simple way to reach the hotel from their own phone. A QR code
                        in the room, at the table, or around the property opens their hotel experience instantly —
                        the guest gets a simple screen, your team gets an operational request.
                    </p>
                </Reveal>

                <Reveal className="problem-grid reveal-stag reveal">
                    {GC_NO_INTERCOM_CARDS.map((c) => (
                        <div className="problem-card" key={c.title}>
                            <span className="p-ico">
                                <Icon name={c.icon} className="icon" />
                            </span>
                            <h3>{c.title}</h3>
                            <p>{c.body}</p>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
