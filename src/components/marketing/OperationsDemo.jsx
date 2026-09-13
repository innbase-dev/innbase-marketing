"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check, CircleAlert, RotateCcw, ReceiptText, Package, Wallet } from "lucide-react";

const TABS = [
  { id: "sales", label: "Follow a sale", Icon: ReceiptText, text: "One order. A complete trail.", note: "The sale keeps its items, staff member, payment, and shift together." },
  { id: "payments", label: "Check a payment", Icon: Wallet, text: "A proposed match. Your decision.", note: "Review the source records, then confirm or flag the suggested match." },
  { id: "stock", label: "Explain the stock", Icon: Package, text: "Count it. Compare it. Understand it.", note: "Opening stock and recorded sales establish what should be left at closeout." },
];

export default function OperationsDemo() {
  const [tab, setTab] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [decision, setDecision] = useState(null);
  const [count, setCount] = useState(34);
  const refs = useRef([]);
  const active = TABS[tab];
  const validCount = count !== "" && Number.isInteger(Number(count)) && Number(count) >= 0;
  const variance = validCount ? Number(count) - 36 : null;
  function choose(i) { setTab(i); setExpanded(false); setDecision(null); setCount(34); }
  function keydown(e, i) {
    const next = { ArrowRight: (i + 1) % 3, ArrowLeft: (i + 2) % 3, Home: 0, End: 2 }[e.key];
    if (next === undefined) return;
    e.preventDefault(); choose(next); refs.current[next]?.focus();
  }
  return <div className="ib-operations-demo"><div className="ib-workspace-bar"><span><span className="ib-dot" />Innbase <b>/ Evening shift</b></span><small>Illustrative data · interactive demo</small></div><div className="ib-operations-inner"><div className="ib-operations-tabs" role="tablist" aria-label="Explore a sample shift">{TABS.map(({ id, label, Icon }, i) => <button key={id} id={`ib-operation-tab-${id}`} role="tab" type="button" aria-selected={tab === i} aria-controls="ib-operation-panel" tabIndex={tab === i ? 0 : -1} onKeyDown={e => keydown(e, i)} ref={el => { refs.current[i] = el; }} onClick={() => choose(i)}><Icon size={19} aria-hidden="true" /><span>0{i + 1}<b>{label}</b></span><ArrowRight size={17} aria-hidden="true" /></button>)}<p>Same shift.<br /><em>Every side of the story.</em></p></div><div className="ib-operation-panel" role="tabpanel" id="ib-operation-panel" aria-labelledby={`ib-operation-tab-${active.id}`}><div className="ib-operation-heading"><span className="ib-label">{active.id.toUpperCase()} / SAMPLE WORKSPACE</span><h3>{active.text}</h3><p>{active.note}</p></div>
      {tab === 0 && <div><div className="ib-demo-sale"><div><span>ORDER #1042 · TABLE 08</span><h4>Dinner at the restaurant</h4><p>Recorded by Ada · Evening shift</p></div><strong>₦18,000</strong></div><div className="ib-receipt-items"><p><span>2 × Jollof rice & chicken</span><b>₦14,000</b></p><p><span>2 × Fresh juice</span><b>₦4,000</b></p></div><button type="button" className="ib-button ib-button-dark" aria-expanded={expanded} aria-controls="ib-sale-trail" onClick={() => setExpanded(!expanded)}>{expanded ? "Hide the trail" : "Trace this sale"}<ArrowRight size={16} aria-hidden="true" /></button><div id="ib-sale-trail" hidden={!expanded} className="ib-sale-trail"><span><Check size={14} />Order recorded</span><span><Check size={14} />Payment attached</span><span><Check size={14} />Shift linked</span></div></div>}
      {tab === 1 && <div><div className="ib-match-pair"><article><span>RECORDED SALE</span><h4>₦18,000</h4><p>Order #1042 · Transfer<br />Reference: DIN-1042</p></article><span className="ib-match-sign" aria-hidden="true">↔</span><article><span>BANK STATEMENT</span><h4>₦18,000</h4><p>Incoming transfer<br />Reference: DIN-1042</p></article></div><p className="ib-match-reason">Why this suggestion? The amount and reference agree. Review before confirming.</p><div className="ib-match-actions">{!decision ? <><button type="button" className="ib-button ib-button-dark" onClick={() => setDecision("confirmed")}><Check size={16} aria-hidden="true" />Confirm example match</button><button type="button" className="ib-reset" onClick={() => setDecision("flagged")}><CircleAlert size={16} aria-hidden="true" />Flag for review</button></> : <><p className="ib-decision" role="status">{decision === "confirmed" ? "Example match confirmed. Your decision stays with the record." : "Flagged for review. This example remains unresolved."}</p><button type="button" className="ib-reset" onClick={() => setDecision(null)}><RotateCcw size={15} aria-hidden="true" />Try again</button></>}</div></div>}
      {tab === 2 && <div><div className="ib-stock-equation"><div><span>OPENING</span><strong>48</strong><small>bottles</small></div><b aria-hidden="true">−</b><div><span>SOLD</span><strong>12</strong><small>recorded</small></div><b aria-hidden="true">=</b><div><span>EXPECTED</span><strong>36</strong><small>at closeout</small></div></div><div className="ib-stock-count"><label htmlFor="ib-count">What did the team count?<small>Change the count to see the variance.</small></label><input id="ib-count" type="number" min="0" step="1" value={count} onChange={e => setCount(e.target.value)} aria-describedby="ib-stock-result" /></div><p className={`ib-stock-result ${variance === 0 ? "is-balanced" : ""}`} id="ib-stock-result" role="status">{variance === null ? "Enter a whole number of bottles, zero or above." : variance === 0 ? "Count matches the expected stock. No variance." : `${Math.abs(variance)} ${Math.abs(variance) === 1 ? "bottle" : "bottles"} ${variance < 0 ? "short" : "over"}. A visible difference for the team to investigate.`}</p></div>}
    </div></div></div>;
}
