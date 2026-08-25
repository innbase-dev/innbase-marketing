import Reveal from "@/components/Reveal";

export default function LetterSection() {
    return (
        <section className="sec" id="letter">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">A note from us</span>
                    <h2 className="sec-h2">Before you go.</h2>
                </Reveal>
                <Reveal className="letter-card reveal">
                    <div className="letter-glow" />
                    <p className="letter-salute">
                        To every hotel owner trying to keep it all together,
                    </p>
                    <div className="letter-body">
                        <p>
                            We know the feeling of asking &quot;what happened
                            last night?&quot; and getting three different
                            answers from three different people — none of them
                            wrong, exactly, just incomplete.
                        </p>
                        <p>
                            We&apos;re not here to add another system for your
                            staff to fight with during a busy shift. We&apos;re
                            here because we think that feeling is solvable, and
                            worth solving properly, not with a quick patch.
                        </p>
                        <p>
                            That means slower, more careful work than a flashy
                            launch would suggest. We&apos;re building this for
                            the long term, one hotel at a time, and we&apos;d
                            rather earn your trust than ask for it upfront.
                        </p>
                    </div>
                    <div className="letter-sign">
                        <div className="letter-sign-avas">
                            <span style={{ background: "var(--brass)" }}>
                                EO
                            </span>
                            <span style={{ background: "var(--teal)" }}>
                                CO
                            </span>
                        </div>
                        <div className="letter-sign-text">
                            <b>Efe &amp; Chibeze</b>
                            <span>Founders, Innbase</span>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
