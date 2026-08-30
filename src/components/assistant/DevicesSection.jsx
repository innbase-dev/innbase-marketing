import Image from "next/image";
import Icon from "../Icon";
import Reveal from "../Reveal";

/**
 * Option D — "wherever your staff already are", device mockups.
 * Adopted direction: real product screenshots (Housekeeping mobile,
 * Live Room Board desktop) framed in thin-bezel Android / MacBook
 * chrome, instead of the earlier hand-drawn .dv-* mockups. Voice has
 * no screenshot yet, so it reuses the Android frame with an
 * illustrative "listening" sheet, same as before.
 */
export default function DevicesSection() {
    return (
        <section className="sec sec-alt" id="devices-shots">
            <div className="wrap">
                <Reveal
                    className="sec-head center reveal"
                    style={{ maxWidth: 640 }}
                >
                    <span className="sec-eyebrow">
                        Wherever your staff already are
                    </span>
                    <h2 className="sec-h2">
                        No new device to buy.
                        <br />
                        No new app to install.
                    </h2>
                    <p className="sec-sub center">
                        At the front desk, walking the halls, or checking a
                        phone — the assistant is just there.
                    </p>
                </Reveal>

                <Reveal className="va-grid reveal-stag reveal">
                    {/* PHONE */}
                    <div className="va-card">
                        <div className="va-stage">
                            <div className="grid-dots" />
                            <div className="android-frame">
                                <div className="screen">
                                    <span className="punch-hole" />
                                    <Image
                                        src="/images/devices-housekeeping-mobile.png"
                                        alt="Housekeeping mobile app"
                                        fill
                                        sizes="(max-width: 860px) 90vw, 360px"
                                        style={{
                                            objectFit: "cover",
                                            objectPosition: "top center",
                                        }}
                                    />
                                </div>
                            </div>
                            <span className="va-tag-float va-tag-1">
                                <span
                                    className="dot"
                                    style={{
                                        background: "var(--amber-bright)",
                                    }}
                                />
                                Queue synced
                            </span>
                            <span className="va-tag-float va-tag-2">
                                <span
                                    className="dot"
                                    style={{ background: "var(--teal-bright)" }}
                                />
                                Live
                            </span>
                            <div className="va-mask" />
                        </div>
                        <div className="va-body">
                            <h3>Phone</h3>
                            <p>
                                Housekeeping and front desk staff open the
                                same assistant from the phones already in
                                their pockets — no separate install.
                            </p>
                        </div>
                    </div>

                    {/* DESKTOP */}
                    <div className="va-card">
                        <div className="va-stage">
                            <div className="grid-dots" />
                            <div className="macbook-frame">
                                <div className="macbook-screen">
                                    <span className="cam" />
                                    <div className="screen-inner">
                                        <Image
                                            src="/images/devices-live-room-board-desktop.png"
                                            alt="Live Room Board desktop"
                                            fill
                                            sizes="(max-width: 860px) 90vw, 620px"
                                            style={{
                                                objectFit: "cover",
                                                objectPosition: "top center",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="macbook-base" />
                            </div>
                            <div className="va-mask" />
                        </div>
                        <div className="va-body">
                            <h3>Desktop</h3>
                            <p>
                                Managers get the full room board and
                                reconciliation view at the front desk, side
                                by side with everything else they run.
                            </p>
                        </div>
                    </div>

                    {/* VOICE */}
                    <div className="va-card">
                        <div className="va-stage">
                            <div className="grid-dots" />
                            <div className="android-frame">
                                <div className="screen">
                                    <span className="punch-hole" />
                                    <div className="voice-sheet">
                                        <span className="va-mic-badge">
                                            <Icon name="mic" className="icon" />
                                        </span>
                                        <div className="wave-bars">
                                            {[
                                                40, 80, 55, 95, 60, 85, 45,
                                            ].map((h, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        height: `${h}%`,
                                                        animationDelay: `${i * 0.1}s`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <span className="voice-listening">
                                            <span className="ld" />
                                            Listening…
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="va-mask" />
                        </div>
                        <div className="va-body">
                            <h3>Voice</h3>
                            <p>
                                Say what happened and Innbase logs it — no
                                screen required while hands are full.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
