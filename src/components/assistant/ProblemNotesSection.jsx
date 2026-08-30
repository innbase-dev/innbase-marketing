import Reveal from "../Reveal";

/**
 * Option B — "the problem today", sticky-note visual.
 * Static (no client state needed) — reveal timing/stagger comes entirely
 * from the shared .reveal / .reveal-stag CSS driven by <Reveal>.
 */
export default function ProblemNotesSection() {
    return (
        <section className="sec sec-alt" id="problem-notes">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow danger">
                        <span className="dot" />
                        The problem today
                    </span>
                    <h2 className="sec-h2">
                        Your staff already know what&apos;s wrong.{" "}
                        <s
                            style={{
                                textDecorationColor: "var(--danger)",
                                textDecorationThickness: "2px",
                            }}
                        >
                            Writing it down
                        </s>{" "}
                        twice is the problem.
                    </h2>
                    <p className="sec-sub">
                        A guest mentions a broken AC. It gets scribbled on
                        paper, remembered until the end of a shift, then
                        typed into the system later — if at all. By the time
                        anyone looks, the details are fuzzy and the task is
                        half-forgotten.
                    </p>
                </Reveal>

                <Reveal className="notes-row reveal-stag reveal">
                    <div className="notes-connector" />
                    <div className="note n1">
                        <span className="pin" />
                        <p>AC broken in 214!!</p>
                    </div>
                    <div className="note n2">
                        <span className="pin" />
                        <p>told the night guy, he&apos;ll pass it on</p>
                    </div>
                    <div className="note n3">
                        <span className="pin" />
                        <p>...wait, where&apos;d I put that note</p>
                    </div>
                    <div className="note ghost">
                        <span className="pin" />
                        <p>
                            never
                            <br />
                            found
                        </p>
                    </div>
                </Reveal>

                <Reveal as="p" className="notes-caption reveal">
                    4 handoffs · 1 lost note · 0 record in the system
                </Reveal>
            </div>
        </section>
    );
}
