import Icon from "../Icon";
import Reveal from "../Reveal";

/**
 * Option D — "wherever your staff already are", device mockups.
 * Purely illustrative markup (no data binding needed), same approach as
 * HeroDashboard.jsx: hardcoded structure standing in for a real screenshot.
 * The .dv-* chrome is light-themed on purpose — see the --lt-* token
 * comment in globals.css.
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

                <Reveal className="device-grid reveal-stag reveal">
                    {/* PHONE */}
                    <div className="device-tile">
                        <div className="device-stage">
                            <div className="dv-phone">
                                <div className="dv-phone-screen">
                                    <div className="dv-ph-head">
                                        <b>Housekeeping</b>
                                        <span className="d" />
                                    </div>
                                    <div className="dv-ph-pills">
                                        <span className="dv-ph-pill active">
                                            Needs Attention&nbsp;10
                                        </span>
                                        <span className="dv-ph-pill ghost">
                                            <Icon
                                                name="sparkles"
                                                className="icon"
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    color: "var(--lt-danger)",
                                                }}
                                            />
                                            Needs Cleaning&nbsp;5
                                        </span>
                                    </div>
                                    <div className="dv-ph-label">
                                        <span>LIVE QUEUE</span>
                                        <span>10 ROOMS</span>
                                    </div>
                                    <div className="dv-ph-rows">
                                        <div className="dv-ph-row">
                                            <div className="rt">
                                                <span>
                                                    4&nbsp;&nbsp;Floor 1 ·
                                                    Standard King
                                                </span>
                                                <span>★★★★</span>
                                            </div>
                                            <div className="rs">
                                                Walk-in waiting at reception
                                            </div>
                                            <div
                                                className="rs"
                                                style={{
                                                    color: "var(--lt-text)",
                                                    fontWeight: 700,
                                                    marginTop: 3,
                                                }}
                                            >
                                                Blessing Olaitan
                                            </div>
                                        </div>
                                        <div className="dv-ph-row">
                                            <div className="rt">
                                                <span>
                                                    3&nbsp;&nbsp;Floor 2 ·
                                                    Executive Suite
                                                </span>
                                                <span>★★★</span>
                                            </div>
                                            <div className="rs">
                                                VIP arriving in 45 minutes
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dv-badge">
                                    <span className="d" />
                                    Queue synced
                                </div>
                                <div className="dv-live">
                                    <span className="d" />
                                    Live
                                </div>
                            </div>
                        </div>
                        <div className="device-copy">
                            <h4>Phone</h4>
                            <p>
                                Housekeeping and front desk staff open the
                                same assistant from the phones already in
                                their pockets — no separate install.
                            </p>
                        </div>
                    </div>

                    {/* DESKTOP */}
                    <div className="device-tile">
                        <div className="device-stage">
                            <div className="dv-laptop">
                                <div className="dv-lap-screen">
                                    <div className="dv-lap-inner">
                                        <div className="dv-lap-head">
                                            <b>Live Room Board</b>
                                            <span className="pill">
                                                All · 10
                                            </span>
                                        </div>
                                        <div className="dv-lap-cols">
                                            <div>
                                                <div className="dv-lap-col-head">
                                                    <span>
                                                        Needs Cleaning
                                                    </span>
                                                    <span>4</span>
                                                </div>
                                                <div className="dv-lap-card">
                                                    <div className="n">
                                                        104
                                                    </div>
                                                    <div className="t">
                                                        Floor 1 · King
                                                    </div>
                                                    <div className="btn" />
                                                </div>
                                                <div className="dv-lap-card">
                                                    <div className="n">
                                                        218
                                                    </div>
                                                    <div className="t">
                                                        Floor 2 · Suite
                                                    </div>
                                                    <div className="btn" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="dv-lap-col-head">
                                                    <span>Cleaning</span>
                                                    <span>3</span>
                                                </div>
                                                <div className="dv-lap-card">
                                                    <div className="n">
                                                        204
                                                    </div>
                                                    <div className="t">
                                                        Floor 2 · Deluxe
                                                    </div>
                                                    <div className="btn ghost" />
                                                </div>
                                                <div className="dv-lap-card">
                                                    <div className="n">
                                                        402
                                                    </div>
                                                    <div className="t">
                                                        Floor 4 · Suite
                                                    </div>
                                                    <div className="btn ghost" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="dv-lap-col-head">
                                                    <span>Inspection</span>
                                                    <span>2</span>
                                                </div>
                                                <div className="dv-lap-card">
                                                    <div className="n">
                                                        105
                                                    </div>
                                                    <div className="t">
                                                        Floor 1 · King
                                                    </div>
                                                    <div className="btn ghost" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="dv-lap-col-head">
                                                    <span>Ready</span>
                                                    <span>1</span>
                                                </div>
                                                <div className="dv-lap-card">
                                                    <div className="n">
                                                        301
                                                    </div>
                                                    <div className="t">
                                                        Floor 3
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dv-lap-notch" />
                                <div className="dv-lap-base" />
                            </div>
                        </div>
                        <div className="device-copy">
                            <h4>Desktop</h4>
                            <p>
                                Managers get the full room board and
                                reconciliation view at the front desk, side
                                by side with everything else they run.
                            </p>
                        </div>
                    </div>

                    {/* VOICE */}
                    <div className="device-tile">
                        <div className="device-stage">
                            <div className="dv-voice">
                                <div className="dv-mic-ring">
                                    <Icon name="mic" size={22} />
                                </div>
                                <div className="dv-wave">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <span key={i} />
                                    ))}
                                </div>
                                <div className="dv-listening">
                                    <span className="d" />
                                    Listening…
                                </div>
                            </div>
                        </div>
                        <div className="device-copy">
                            <h4>Voice — coming soon</h4>
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
