import Reveal from "./Reveal";
import { LEDGER } from "@/data/ledgerData";

function Chip({ item }) {
    return (
        <span className={`ledger-chip ${item.t}`}>
            <span className="lc-dot" />
            {item.label} <b>{item.amt}</b>
        </span>
    );
}

export default function ReconciliationSection() {
    // Duplicated once so the CSS marquee animation can loop seamlessly.
    const chips = [...LEDGER, ...LEDGER];

    return (
        <section className="section recon" id="reconciliation">
            <div className="wrap">
                <Reveal className="recon-head reveal">
                    <span className="sec-eyebrow">
                        Why owners trust the numbers
                    </span>
                    <h2 className="sec-h2">
                        Every number traces back to something real.
                    </h2>
                    <p className="sec-sub">
                        No estimates, no rounded totals. If a figure appears on
                        a dashboard, Innbase can show you the exact sale,
                        payment, or shift that produced it.
                    </p>
                </Reveal>
            </div>
            <Reveal className="ticker-wrap reveal reveal-d2" aria-hidden="true">
                <div className="ticker-track" id="tickerTrack">
                    {chips.map((item, i) => (
                        <Chip item={item} key={i} />
                    ))}
                </div>
            </Reveal>
            <Reveal as="div" className="wrap recon-proof reveal reveal-d3">
                <p className="proof-line">
                    Tap any figure on your dashboard and Innbase shows you the
                    exact sale, payment, or shift behind it.{" "}
                    <b>
                        If a number can&apos;t prove itself, it never reaches
                        your screen.
                    </b>
                </p>
            </Reveal>
        </section>
    );
}
