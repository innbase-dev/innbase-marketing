"use client";

import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

/**
 * "Wherever your staff already are" — device showcase.
 *
 * Three cards (Phone, Desktop, Voice) reusing the Android thin-bezel frame
 * for Phone & Voice, and an iPad frame (sized up for legibility) for
 * Desktop. Product screenshots render true-to-reality inside each frame:
 * object-fit: contain preserves the screenshot's real aspect ratio with no
 * forced crop or stretch, and any resulting letterbox space is tucked
 * behind the .va-mask gradient at the bottom of the stage.
 */
export default function StaffEverywhereSection() {
    return (
        <section className="sec" id="wherever-staff-are">
            <div className="wrap">
                <Reveal className="sec-head center reveal" style={{ maxWidth: 640, marginBottom: 48 }}>
                    <span className="sec-eyebrow">
                        Wherever your staff already are
                    </span>
                    <h2 className="sec-h2">
                        No new device to buy.
                        <br />
                        No new app to install.
                    </h2>
                    <p className="sec-sub">
                        At the front desk, walking the halls, or checking a
                        phone — the assistant is just there.
                    </p>
                </Reveal>

                <Reveal className="va-grid reveal-stag reveal">
                    {/* Phone */}
                    <div className="va-card">
                        <div className="va-stage">
                            <div className="grid-dots" />
                            <div className="android-frame">
                                <div className="screen">
                                    <span className="punch-hole" />
                                    <img
                                        src="/images/housekeeping-mobile.png"
                                        alt="Housekeeping mobile app showing the active cleaning queue"
                                    />
                                </div>
                            </div>
                            <span className="va-tag-float va-tag-1">
                                <span
                                    className="dot"
                                    style={{ background: "var(--amber-bright)" }}
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
                                Housekeeping and front desk staff open the same
                                assistant from the phones already in their
                                pockets — no separate install.
                            </p>
                        </div>
                    </div>

                    {/* Desktop */}
                    <div className="va-card">
                        <div className="va-stage">
                            <div className="grid-dots" />
                            <div className="ipad-frame">
                                <div className="ipad-screen">
                                    <span className="cam" />
                                    <div className="screen-inner">
                                        <img
                                            src="/images/live-room-board-desktop.png"
                                            alt="Live room board showing housekeeping status across every room"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="va-mask" />
                        </div>
                        <div className="va-body">
                            <h3>Desktop</h3>
                            <p>
                                Managers get the full room board and
                                reconciliation view at the front desk, side by
                                side with everything else they run.
                            </p>
                        </div>
                    </div>

                    {/* Voice */}
                    <div className="va-card">
                        <div className="va-stage">
                            <div className="grid-dots" />
                            <div className="android-frame">
                                <div className="screen">
                                    <span className="punch-hole" />
                                    <div className="voice-sheet">
                                        <span className="va-mic-badge">
                                            <Icon
                                                name="mic"
                                                className="icon"
                                                style={{ width: 18, height: 18 }}
                                            />
                                        </span>
                                        <div className="wave-bars">
                                            <span style={{ height: "40%", animationDelay: "0s" }} />
                                            <span style={{ height: "80%", animationDelay: ".1s" }} />
                                            <span style={{ height: "55%", animationDelay: ".2s" }} />
                                            <span style={{ height: "95%", animationDelay: ".3s" }} />
                                            <span style={{ height: "60%", animationDelay: ".4s" }} />
                                            <span style={{ height: "85%", animationDelay: ".5s" }} />
                                            <span style={{ height: "45%", animationDelay: ".6s" }} />
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
