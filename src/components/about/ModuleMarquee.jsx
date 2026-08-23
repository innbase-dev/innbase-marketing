import { aboutModules } from "@/utils/data";

/**
 * components/about/ModuleMarquee.jsx
 * ─────────────────────────────────────────────────────────────────────────
 * Sits between the hero and "Why Innbase exists" as a visual bridge: the
 * operational surface (front desk, inventory, housekeeping, ...) that used
 * to live in separate notebooks and spreadsheets, now shown as one
 * continuous, connected strip. Pure CSS animation (no JS needed) — see the
 * `marquee` keyframe added in styles/about-theme.css.
 */
export default function ModuleMarquee() {
    const loop = [...aboutModules, ...aboutModules];

    return (
        <section className="relative py-10 border-y border-ink-line bg-ink-soft overflow-hidden">
            <div className="wrap mb-6">
                <p className="text-center font-mono text-[11px] uppercase tracking-[0.08em] text-muted-dark">
                    Everything that used to live in different notebooks, spreadsheets, and heads
                </p>
            </div>
            <div
                className="group relative"
                style={{
                    maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
                }}
            >
                <div className="flex gap-3.5 w-max animate-[marquee_34s_linear_infinite] group-hover:[animation-play-state:paused]">
                    {loop.map((m, i) => (
                        <span
                            key={`${m.label}-${i}`}
                            className="flex-none inline-flex items-center gap-2.5 border border-ink-line bg-ink rounded-full px-4 py-2.5 text-[13px] font-semibold text-text-dark"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-bright" />
                            {m.label}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
