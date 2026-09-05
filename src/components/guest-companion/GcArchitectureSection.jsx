import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function GcArchitectureSection() {
    return (
        <section className="sec sec-alt" id="architecture">
            <div className="wrap">
                <Reveal className="sec-head center reveal" style={{ maxWidth: 680 }}>
                    <span className="sec-eyebrow">The bigger picture</span>
                    <h2 className="sec-h2">Two assistants. One operational core.</h2>
                    <p className="sec-sub center">
                        Innbase connects the hotel on both sides of the operation — one assistant facing your team,
                        one facing your guests, both drawing from the same live record of what&apos;s happening.
                    </p>
                </Reveal>

                {/* Same frame as the homepage's HeroDashboard (.hero-visual > .hero-dash) —
                    here it holds a real product screenshot of the Guest Companion admin,
                    faded out at the bottom edge with .gc-arch-fade so it reads as sinking
                    into the section that follows rather than ending on a hard crop. */}
                <div className="hero-visual gc-arch-visual reveal" style={{ transitionDelay: ".1s" }}>
                    <div className="hero-dash gc-arch-fade">
                        <Image
                            src="/images/guest-companion-overview.webp"
                            alt="Innbase Guest Companion admin — Overview dashboard showing online guests, open orders, pending requests, recent activity and top selling items"
                            width={1894}
                            height={979}
                            sizes="(max-width: 1024px) 100vw, 1180px"
                            className="hero-shot-img"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}