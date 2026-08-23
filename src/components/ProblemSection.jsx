import Icon from "./Icon";
import Reveal from "./Reveal";

export default function ProblemSection() {
    return (
        <section className="sec">
            <div className="dot-grain" />
            <div
                className="sec-blob"
                style={{
                    width: 460,
                    height: 460,
                    background:
                        "radial-gradient(circle,#7a3b30 0%,transparent 70%)",
                    opacity: ".2",
                    top: "-120px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            />
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">
                        The 11pm question every owner asks
                    </span>
                    <h2 className="sec-h2">Where did the money go?</h2>
                    <p className="sec-sub">
                        Most hotels and bars find out something&apos;s wrong
                        days later — a short till, a missing case of beer, a
                        guest who never actually paid. By then it&apos;s a
                        guess, not an answer.
                    </p>
                </Reveal>
                <Reveal className="problem-grid reveal-stag reveal">
                    <div className="problem-card">
                        <span className="p-ico">
                            <Icon name="banknote" className="icon" />
                        </span>
                        <h3>Cash short at close-out</h3>
                        <p>
                            The till doesn&apos;t match the sales log, and
                            nobody can say why — or who was even on that
                            register.
                        </p>
                    </div>
                    <div className="problem-card">
                        <span className="p-ico">
                            <Icon name="package-search" className="icon" />
                        </span>
                        <h3>Stock that never quite matches</h3>
                        <p>
                            Opening count, sales, and what&apos;s left on the
                            shelf tell three different stories by the end of the
                            week.
                        </p>
                    </div>
                    <div className="problem-card">
                        <span className="p-ico">
                            <Icon name="users" className="icon" />
                        </span>
                        <h3>Handovers built on guesses</h3>
                        <p>
                            The next shift starts with &quot;I think it was
                            fine&quot; instead of an actual record of what
                            happened.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
