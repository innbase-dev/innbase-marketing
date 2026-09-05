import Image from "next/image";
import Icon from "@/components/Icon";
import { GC_MODULE_STRIP, GC_SHOWCASE_IMAGES } from "@/data/guestCompanionData";
import LogoStrip from "../LogoStrip";

export default function GcHero() {
    return (
        <>
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
                    {GC_SHOWCASE_IMAGES.map((img) => (
                        <div className="gc-showcase-item" key={img.src}>
                            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 760px) 78vw, 44vw" priority />
                        </div>
                    ))}
                </div>
            </header>

            <div className="strip">
                <LogoStrip />
            </div>
        </>
    );
}
