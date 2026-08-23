import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";
import { aboutFounders, aboutFounderStats } from "@/utils/data";

export default function FoundersSection() {
    return (
        <section className="py-28 relative bg-ink" id="founders">
            <div className="wrap">
                <Reveal className="sec-head">
                    <span className="sec-eyebrow">Who&apos;s building it</span>
                    <h2 className="sec-h2">Two people, two disciplines, one product.</h2>
                    <p className="sec-sub">
                        Innbase isn&apos;t a faceless software company. It&apos;s built by two founders who
                        split the work along product and engineering, and agree on almost everything else.
                    </p>
                </Reveal>

                <Reveal className="flex flex-wrap gap-10 mt-10 pb-10 border-b border-ink-line">
                    {aboutFounderStats.map((stat) => (
                        <StatCounter key={stat.label} value={stat.value} label={stat.label} />
                    ))}
                </Reveal>

                <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    {aboutFounders.map((f) => (
                        <RevealItem key={f.id} as="article" className="rounded-2xl border border-ink-line bg-ink-soft p-8 flex flex-col gap-5">
                            <div className="grid grid-cols-[88px_1fr] gap-4 items-center">
                                <div
                                    className="rounded-2xl border border-ink-line flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        aspectRatio: "4 / 5",
                                        backgroundColor: "var(--surface-hover)",
                                        backgroundImage:
                                            "radial-gradient(circle at 30% 20%, rgba(255,255,255,.08), transparent 55%), radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
                                        backgroundSize: "auto, 16px 16px",
                                    }}
                                >
                                    <span
                                        className="w-12 h-12 rounded-full grid place-items-center font-extrabold text-[15px] text-white"
                                        style={{ background: `var(--${f.accent})` }}
                                    >
                                        {f.initials}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-[17px] font-bold tracking-[-0.01em] text-text-dark">{f.name}</div>
                                    <div className="font-mono text-[10.5px] font-semibold uppercase tracking-wider mt-1 text-brass-bright">
                                        {f.role}
                                    </div>
                                </div>
                            </div>

                            <p className="text-[13.5px] text-muted-dark leading-[1.6]">
                                <b className="text-text-dark font-semibold">{f.focusLabel}</b>
                                {f.focus}
                            </p>

                            <p className="border-t border-ink-line pt-4 text-[14px] italic text-white/60 leading-[1.65]">
                                &ldquo;{f.quote}&rdquo;
                            </p>

                            {f.isPlaceholderQuote && (
                                <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-wide text-muted-dark border border-dashed border-ink-line rounded-md px-2 py-1 w-fit">
                                    Placeholder — pending approval
                                </span>
                            )}
                        </RevealItem>
                    ))}
                </RevealStagger>
            </div>
        </section>
    );
}
