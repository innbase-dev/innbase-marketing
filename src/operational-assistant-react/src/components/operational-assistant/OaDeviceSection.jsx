import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { OA_DEVICE_CARDS } from "@/data/operationalAssistantData";

/**
 * smartphone / monitor / mic aren't in the shared Icon.jsx map (it only
 * covers the lucide names already in use elsewhere on the site). Rather
 * than guess at iconsax-react export names and risk breaking the shared
 * Icon component, these three render local, dependency-free glyphs.
 * If iconsax-react does export equivalents, these can move into Icon.jsx's
 * ICONS map later and this local file can be deleted.
 */
const DEVICE_GLYPHS = {
    smartphone: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
            <path d="M11 18.2h2" />
        </svg>
    ),
    monitor: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="12" rx="1.5" />
            <path d="M8 20h8M12 16v4" />
        </svg>
    ),
    mic: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="2.5" width="6" height="11" rx="3" />
            <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6" />
        </svg>
    ),
};

function DeviceGlyph({ name }) {
    return (
        <span className="icon" style={{ display: "inline-flex" }}>
            {DEVICE_GLYPHS[name]}
        </span>
    );
}

export default function OaDeviceSection() {
    return (
        <section className="sec sec-alt" id="devices">
            <div className="wrap">
                <Reveal className="sec-head center reveal">
                    <span className="sec-eyebrow">Wherever your team already works</span>
                    <h2 className="sec-h2">One assistant. Not tied to one screen.</h2>
                    <p className="sec-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>
                        Whether staff are at the front desk, moving between floors, or checking in from their
                        phone, the Assistant is designed to be available where the work actually happens.
                    </p>
                </Reveal>

                <Reveal className="device-wrap reveal">
                    <div className="device-row">
                        {OA_DEVICE_CARDS.map((d) => (
                            <div className="device-card" key={d.title}>
                                <span className="d-ico">
                                    <DeviceGlyph name={d.icon} />
                                </span>
                                <h4>{d.title}</h4>
                                <p>{d.body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="device-connector" />
                    <div className="device-node">
                        <Icon name="sparkles" className="icon" />
                        Innbase Assistant
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
