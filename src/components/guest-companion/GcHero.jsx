import Image from "next/image";
import Icon from "@/components/Icon";
import { GC_MODULE_STRIP, GC_SHOWCASE_IMAGES } from "@/data/guestCompanionData";

// Desktop widths follow the showcase's narrow/wide/narrow flex ratio
// (27 / 44 / 27) so next/image requests an appropriately sized file for
// each panel instead of over-fetching the two narrow ones at the wide
// panel's size. Mobile is a single 78vw swipeable card for every panel
// (see .gc-showcase-item in globals.css), so that half of the tuple stays
// constant across all three.
const SHOWCASE_SIZES = [
    "(max-width: 760px) 78vw, 28vw",
    "(max-width: 760px) 78vw, 45vw",
    "(max-width: 760px) 78vw, 28vw",
];

export default function GcHero() {
    return (
        <header className="hero">
            <div className="hero-glow">
                <div className="blob b1" />
                <div className="blob b2" />
                <div className="blob b3" />
            </div>
            <div className="hero-dots" />
            <div className="wrap hero-inner">
                <div className="hero-content" style={{ maxWidth: 640 }}>
                    <span className="eyebrow reveal in">
                        <span className="dot" />
                        Innbase · Guest Companion
                    </span>
                    <h1 className="reveal in" style={{ transitionDelay: ".05s" }}>
                        Give every guest <em>a direct line to your hotel</em>.
                    </h1>
                    <p className="hero-sub reveal in" style={{ transitionDelay: ".14s" }}>
                        Food. Drinks. Room service. Housekeeping. Hotel services. Guests order and ask for
                        anything straight from their own phone — no intercom, no app to install, no phone call
                        to reception.
                    </p>
                    <div className="hero-ctas reveal in" style={{ transitionDelay: ".22s" }}>
                        <a href="#moments" className="btn btn-brass">
                            See how it works
                        </a>
                        <a href="/contact" className="btn btn-ghost-dark">
                            Talk to us
                        </a>
                    </div>
                    <div className="hero-note reveal in" style={{ transitionDelay: ".3s" }}>
                        <span className="live-dot" />
                        NO INTERCOM · NO APP DOWNLOAD · NO GUEST ACCOUNT
                    </div>
                </div>
            </div>

            {/* Full-bleed 3-image showcase — breaks out of .wrap on purpose,
                so it sits outside hero-inner rather than nested in it. */}
            <div className="gc-showcase reveal in" style={{ transitionDelay: ".3s" }}>
                {GC_SHOWCASE_IMAGES.map((img, i) => (
                    <div className="gc-showcase-item" key={img.src}>
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes={SHOWCASE_SIZES[i]}
                            priority={i === 1}
                            loading={i === 1 ? undefined : "eager"}
                        />
                    </div>
                ))}
            </div>

            <div className="strip">
                <div className="wrap strip-row">
                    <span className="strip-label">Every request lands in the Innbase you already run</span>
                    <div className="strip-chips">
                        {GC_MODULE_STRIP.map((m) => (
                            <span className="strip-chip" key={m.label}>
                                <Icon name={m.icon} className="icon" />
                                {m.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}