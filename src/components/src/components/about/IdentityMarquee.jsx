import { IDENTITY_MARQUEE } from "@/data/aboutData";

const DOT_COLORS = ["var(--brass)", "var(--teal-bright)"];

export default function IdentityMarquee() {
    // Duplicated once so the track can loop seamlessly at translateX(-50%).
    const loop = [...IDENTITY_MARQUEE, ...IDENTITY_MARQUEE];

    return (
        <div className="identity-marquee" role="presentation" aria-hidden="true">
            <div className="identity-track">
                {loop.map((phrase, i) => (
                    <span className="identity-item" key={`${phrase}-${i}`}>
                        <span
                            className="mk"
                            style={{
                                background: DOT_COLORS[i % DOT_COLORS.length],
                            }}
                        />
                        {phrase}
                    </span>
                ))}
            </div>
        </div>
    );
}
