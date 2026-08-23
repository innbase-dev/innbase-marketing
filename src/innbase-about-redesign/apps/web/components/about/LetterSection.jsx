import Reveal from "@/components/ui/Reveal";
import { QuoteMarkIcon } from "@/components/about/icons";

export default function LetterSection() {
    return (
        <section className="py-28 bg-ink-soft border-y border-ink-line" id="letter">
            <div className="wrap">
                <Reveal className="sec-head">
                    <span className="sec-eyebrow">A note from us</span>
                    <h2 className="sec-h2">Before you go.</h2>
                </Reveal>

                <Reveal
                    className="mt-12 relative border border-ink-line rounded-[20px] p-8 sm:p-12 overflow-hidden"
                    style={{ background: "linear-gradient(165deg, #171d23, #0e1214)" }}
                >
                    <div
                        className="absolute -top-24 -right-16 w-72 h-72 rounded-full blur-[70px] pointer-events-none opacity-[0.16]"
                        style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)" }}
                    />

                    <QuoteMarkIcon className="relative mb-4 text-brass opacity-50" />

                    <p className="relative font-bold tracking-[-0.015em] max-w-[700px]" style={{ fontSize: "clamp(19px, 2.2vw, 25px)" }}>
                        To every hotel owner trying to keep it all together,
                    </p>

                    <div className="relative mt-5 text-[15.5px] leading-[1.85] text-white/75 max-w-[680px] space-y-4">
                        <p>
                            We know the feeling of asking &quot;what happened last night?&quot; and getting
                            three different answers from three different people — none of them wrong,
                            exactly, just incomplete.
                        </p>
                        <p>
                            We&apos;re not here to add another system for your staff to fight with during a
                            busy shift. We&apos;re here because we think that feeling is solvable, and worth
                            solving properly, not with a quick patch.
                        </p>
                        <p>
                            That means slower, more careful work than a flashy launch would suggest.
                            We&apos;re building this for the long term, one hotel at a time, and we&apos;d
                            rather earn your trust than ask for it upfront.
                        </p>
                    </div>

                    <div className="relative flex items-center gap-3.5 mt-8">
                        <div className="flex">
                            <span
                                className="w-8 h-8 rounded-full grid place-items-center text-[11px] font-extrabold text-white border-2"
                                style={{ background: "var(--brass)", borderColor: "#171d23" }}
                            >
                                EO
                            </span>
                            <span
                                className="w-8 h-8 rounded-full grid place-items-center text-[11px] font-extrabold text-white border-2 -ml-2.5"
                                style={{ background: "var(--teal)", borderColor: "#171d23" }}
                            >
                                CO
                            </span>
                        </div>
                        <div>
                            <div className="text-[13.5px] font-bold text-text-dark">Efe &amp; Chibeze</div>
                            <div className="text-[12px] text-muted-dark">Founders, Innbase</div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
