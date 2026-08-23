import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function AboutHero() {
    return (
        <header className="relative pt-[150px] pb-20 overflow-hidden bg-ink text-text-dark">
            <div
                className="absolute -top-32 left-[6%] w-[480px] h-[480px] rounded-full blur-[90px] opacity-[0.16] pointer-events-none animate-[drift_22s_ease-in-out_infinite]"
                style={{ background: "radial-gradient(circle, var(--amber) 0%, transparent 70%)" }}
            />
            <div
                className="absolute -top-16 right-[8%] w-[400px] h-[400px] rounded-full blur-[90px] opacity-[0.13] pointer-events-none animate-[drift_22s_ease-in-out_infinite]"
                style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)", animationDelay: "-6s" }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                    maskImage: "linear-gradient(180deg, rgba(0,0,0,.9), transparent 75%)",
                    WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,.9), transparent 75%)",
                }}
            />

            <div className="wrap relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
                <div className="max-w-[620px]">
                    <Reveal as="span" className="inline-flex items-center gap-2 border border-ink-line rounded-full pl-2 pr-4 py-1.5 text-[12px] font-semibold text-muted-dark bg-surface">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass shadow-[0_0_0_4px_var(--amber-soft)]" />
                        Why we&apos;re building Innbase
                    </Reveal>

                    <Reveal
                        as="h1"
                        delay={0.05}
                        className="mt-7 font-bold tracking-[-0.035em] leading-[1.03]"
                        style={{ fontSize: "clamp(38px, 6vw, 68px)" }}
                    >
                        We&apos;re building the hotel software we{" "}
                        <em
                            className="not-italic bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(120deg, var(--amber-bright), var(--brass) 55%, var(--teal-bright))" }}
                        >
                            wish existed
                        </em>
                        .
                    </Reveal>

                    <Reveal as="p" delay={0.14} className="mt-6 text-[17px] leading-[1.6] text-muted-dark max-w-[560px]">
                        Innbase started with a simple frustration: hotels generate enormous amounts of
                        information every single day — and almost none of it stays connected.
                        We&apos;re a small team trying to fix that, carefully, for the long term.
                    </Reveal>

                    <Reveal delay={0.22} className="mt-8 flex flex-wrap gap-3">
                        <Link href="/#product" className="btn btn-brass">
                            See Innbase in action
                        </Link>
                        <a
                            href="mailto:hello@innbase.co?subject=Hello%20from%20the%20About%20page"
                            className="btn btn-ghost-dark"
                        >
                            Talk to the team
                        </a>
                    </Reveal>

                    <Reveal delay={0.3} className="mt-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.02em] text-muted-dark">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-bright shadow-[0_0_0_3px_var(--teal-soft)]" />
                        ONE PRODUCT MIND · ONE ENGINEERING MIND · BUILT FROM NIGERIA
                    </Reveal>
                </div>

                {/* Bold founder placeholders — honest about being placeholders, not shy about it */}
                <Reveal delay={0.36}>
                    <div
                        className="rounded-[20px] p-3.5 border border-white/10 shadow-[var(--shadow-deep)]"
                        style={{ background: "linear-gradient(165deg, #171d23, #0e1214)" }}
                    >
                        <div className="grid grid-cols-2 gap-2.5">
                            <FounderPlaceholder initials="EO" name="Efe Great Ojadua" role="CEO" accentVar="--brass" />
                            <FounderPlaceholder initials="CO" name="Chibeze Endurance Ochonogor" role="CTO" accentVar="--teal" />
                        </div>
                        <div className="flex items-center justify-between mt-3 px-1 pt-3 border-t border-white/5">
                            <span className="text-[11.5px] text-white/45">Photos — to be added</span>
                            <span className="font-mono text-[10px] text-white/30">FOUNDERS</span>
                        </div>
                    </div>
                </Reveal>
            </div>
        </header>
    );
}

function FounderPlaceholder({ initials, name, role, accentVar }) {
    return (
        <div
            className="rounded-2xl border border-ink-line flex flex-col items-center justify-center gap-3 text-center p-5 relative overflow-hidden"
            style={{
                aspectRatio: "4 / 5",
                backgroundColor: "var(--surface-hover)",
                backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgba(255,255,255,.08), transparent 55%), radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
                backgroundSize: "auto, 16px 16px",
            }}
        >
            <span
                className="w-16 h-16 rounded-full grid place-items-center font-extrabold text-xl text-white shadow-[0_1px_0_rgba(255,255,255,.2)_inset]"
                style={{ background: `var(${accentVar})` }}
            >
                {initials}
            </span>
            <div>
                <div className="text-[13px] font-bold text-text-dark">{name}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-dark mt-1">{role}</div>
            </div>
        </div>
    );
}
