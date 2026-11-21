"use client";

import { useRef, useState } from "react";
import { ArrowRight, Ban, Check, CircleDashed, Landmark, RotateCcw, TriangleAlert, UserRoundCheck } from "lucide-react";
import { PAY_SCENARIOS } from "@/data/paymentsData";
import { SectionHeading } from "../Primitives";
import styles from "./Payments.module.css";
import demo from "../feature/FeatureDemo.module.css";

const naira = (n) => `₦${n.toLocaleString("en-NG")}`;

// An order's four figures: [owed, claimed, verified, settled].
const order = (id, table, amount, figures, status) => ({ id, table, amount, figures, status });

const T08 = (f, s) => order("#1042", "Table 08", 18000, f, s);
const T11 = (f, s) => order("#1047", "Table 11", 18000, f, s);
const T03 = (f, s) => order("#1051", "Table 03", 32500, f, s);

const FLOWS = {
  exact: [
    {
      orders: [T08([18000, 0, 0, 0], ["Unpaid", "neutral"])],
      transfer: null, match: null,
      record: ["Sale recorded · order #1042 · Ada"],
      action: "The guest pays by transfer",
      note: "Ada records the sale and the payment method. The order carries its own payment reference: DIN-1042.",
    },
    {
      orders: [T08([18000, 18000, 0, 0], ["Awaiting verification", "amber"])],
      transfer: null, match: ["Waiting for the transfer", "neutral"],
      record: ["Sale recorded · order #1042 · Ada", "Transfer claimed · DIN-1042 · Ada"],
      action: "The transfer arrives",
      note: "The claim is recorded, not counted. The order is still owed ₦18,000.",
    },
    {
      orders: [T08([0, 18000, 18000, 18000], ["Settled", "sage"])],
      transfer: { amount: 18000, ref: "DIN-1042", time: "8:47 pm" }, match: ["Reference matches order #1042 exactly", "sage"],
      record: ["Sale recorded · order #1042 · Ada", "Transfer claimed · DIN-1042 · Ada", "Transfer received · ₦18,000 · DIN-1042", "Applied by exact reference match"],
      next: "ambiguous",
      note: "The money arrived with the order’s own reference, so Innbase applied it. Nobody had to search an alert.",
    },
  ],
  ambiguous: [
    {
      orders: [T08([18000, 18000, 0, 0], ["Awaiting verification", "amber"]), T11([18000, 18000, 0, 0], ["Awaiting verification", "amber"])],
      transfer: null, match: ["Waiting for the transfer", "neutral"],
      record: ["Transfer claimed · order #1042 · no reference", "Transfer claimed · order #1047 · no reference"],
      action: "A ₦18,000 transfer arrives",
      note: "Two tables, same bill, both paying by transfer, neither with a reference. It happens every Friday.",
    },
    {
      orders: [T08([18000, 18000, 0, 0], ["Awaiting verification", "amber"]), T11([18000, 18000, 0, 0], ["Awaiting verification", "amber"])],
      transfer: { amount: 18000, ref: "No reference", time: "9:12 pm" }, match: ["Two orders could own this transfer · flagged for review", "amber"],
      record: ["Transfer claimed · order #1042 · no reference", "Transfer claimed · order #1047 · no reference", "Transfer received · ₦18,000 · no reference", "Flagged: more than one possible order"],
      tryAction: { label: "Apply it to the first order", refusal: "Not allowed. Two orders fit equally well, so Innbase won’t guess." },
      action: "Funmi resolves it to Table 11",
      note: "Innbase applies nothing it can’t be sure of. The transfer waits for a person.",
    },
    {
      orders: [T08([18000, 18000, 0, 0], ["Awaiting verification", "amber"]), T11([0, 18000, 18000, 18000], ["Settled", "sage"])],
      transfer: { amount: 18000, ref: "No reference", time: "9:12 pm" }, match: ["Resolved to order #1047 by Funmi, manager", "sage"], manual: true,
      record: ["Transfer claimed · order #1042 · no reference", "Transfer claimed · order #1047 · no reference", "Transfer received · ₦18,000 · no reference", "Flagged: more than one possible order", "Resolved by Funmi · closes the flagged match"],
      next: "claim",
      note: "Table 11 is settled. Table 08 is still owed, and its transfer is still awaited. Nothing was assumed.",
    },
  ],
  claim: [
    {
      orders: [T03([32500, 32500, 0, 0], ["Awaiting verification", "amber"])],
      transfer: null, match: ["Nothing received for ₦32,500 yet", "neutral"], screenshot: true,
      record: ["Sale recorded · order #1051 · Kunle", "Transfer claimed · DIN-1051 · guest showed a screenshot"],
      tryAction: { label: "Mark it as paid", refusal: "Not possible. A claim isn’t proof of payment, so the order stays owed until the money is seen." },
      next: "exact",
      note: "A screenshot can be edited, or shown twice. The claim is on record, and so is the fact that the money hasn’t arrived.",
    },
  ],
};

const FIGURE_LABELS = ["Owed", "Claimed", "Verified", "Settled"];

function MatchIcon({ tone }) {
  if (tone === "sage") return <Check size={15} aria-hidden="true" />;
  if (tone === "amber") return <TriangleAlert size={15} aria-hidden="true" />;
  return <CircleDashed size={15} aria-hidden="true" />;
}

export default function PaymentsDesk() {
  const [scenario, setScenario] = useState("exact");
  const [step, setStep] = useState(0);
  const [tried, setTried] = useState(false);
  const tabs = useRef([]);
  const actionRef = useRef(null);
  const s = FLOWS[scenario][step];

  function choose(key) {
    setScenario(key);
    setStep(0);
    setTried(false);
  }

  function keydown(e, i) {
    const n = PAY_SCENARIOS.length;
    const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i + n - 1) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    choose(PAY_SCENARIOS[next].key);
    tabs.current[next]?.focus();
  }

  function advance() {
    setTried(false);
    setStep(step + 1);
    requestAnimationFrame(() => actionRef.current?.focus({ preventScroll: true }));
  }

  function goNext() {
    const i = PAY_SCENARIOS.findIndex((x) => x.key === s.next);
    choose(s.next);
    requestAnimationFrame(() => tabs.current[i]?.focus({ preventScroll: true }));
  }

  const nextLabel = s.next && PAY_SCENARIOS.find((x) => x.key === s.next).label;

  return (
    <section className={`ib-section ib-experience ${demo.surface}`} id="desk">
      <div className="ib-container">
        <SectionHeading eyebrow="FOLLOW A PAYMENT" title={<>A claim is not<br /><em>a payment.</em></>}>
          <p>Follow a transfer from the table to the record, then see what happens when two tables pay the same amount, or a guest shows a screenshot.</p>
        </SectionHeading>

        <div className="ib-scenario-tabs" role="tablist" aria-label="Choose a payment">
          {PAY_SCENARIOS.map(({ key, label }, i) => (
            <button key={key} type="button" role="tab" id={`pay-tab-${key}`} aria-controls="pay-desk" aria-selected={scenario === key} tabIndex={scenario === key ? 0 : -1} ref={(el) => { tabs.current[i] = el; }} onClick={() => choose(key)} onKeyDown={(e) => keydown(e, i)}>
              {label}
            </button>
          ))}
        </div>

        <div className="ib-demo-stage" id="pay-desk" role="tabpanel" aria-labelledby={`pay-tab-${scenario}`}>
          <div className="ib-demo-topline"><span>FROM THE TABLE TO THE RECORD</span></div>

          <div className={styles.deskGrid}>
            <div className={styles.side}>
              <div className="ib-demo-label"><span>01 / THE ORDER</span><span>Restaurant · evening shift</span></div>
              <div className={styles.panel}>
                {s.orders.map((o) => (
                  <div key={o.id} className={styles.order}>
                    <div className={styles.orderHead}>
                      <div><small>ORDER {o.id}</small><b>{o.table} · {naira(o.amount)}</b></div>
                      <span className={`${styles.pill} ${styles[`pill_${o.status[1]}`]}`}>{o.status[0]}</span>
                    </div>
                    <dl className={styles.figures}>
                      {FIGURE_LABELS.map((label, i) => (
                        <div key={label} className={o.figures[i] ? styles.figureOn : ""}><dt>{label}</dt><dd>{naira(o.figures[i])}</dd></div>
                      ))}
                    </dl>
                  </div>
                ))}
                {s.screenshot && (
                  <div className={styles.screenshot} aria-label="The guest's screenshot">
                    <small>GUEST’S SCREENSHOT</small>
                    <b>Transfer successful</b>
                    <span>₦32,500 · DIN-1051</span>
                  </div>
                )}

                <div className={styles.actions}>
                  {s.action && <button type="button" className="ib-button ib-button-dark" ref={actionRef} onClick={advance}>{s.action}<ArrowRight size={16} aria-hidden="true" /></button>}
                  {s.next && <button type="button" className="ib-button ib-button-dark" ref={s.action ? undefined : actionRef} onClick={goNext}>Next: {nextLabel}<ArrowRight size={16} aria-hidden="true" /></button>}
                  {s.tryAction && !tried && <button type="button" className={styles.tryButton} onClick={() => setTried(true)}>Try: {s.tryAction.label}</button>}
                  {s.tryAction && tried && <p className={styles.refusal} role="status"><Ban size={15} aria-hidden="true" /><span>{s.tryAction.refusal}</span></p>}
                </div>
              </div>
            </div>

            <div className="ib-demo-connector" aria-hidden="true"><span /><ArrowRight size={24} /><span /></div>

            <div className={styles.side}>
              <div className="ib-demo-label"><span>02 / THE MONEY</span><span>Innbase</span></div>
              <div className={styles.money}>
                <div key={`${scenario}-${step}-t`} className={`${styles.transfer} ${s.transfer ? "" : styles.transferEmpty}`}>
                  <span className={styles.transferIcon} aria-hidden="true"><Landmark size={18} /></span>
                  {s.transfer
                    ? <div><small>TRANSFER RECEIVED · {s.transfer.time}</small><b>{naira(s.transfer.amount)}</b><p>Reference: {s.transfer.ref}</p></div>
                    : <div><small>FROM YOUR PAYMENT PROVIDER</small><b>No transfer yet</b><p>Transfers appear here when they arrive.</p></div>}
                </div>
                {s.match && (
                  <p key={`${scenario}-${step}-m`} className={`${styles.match} ${styles[`match_${s.match[1]}`]}`}>
                    {s.manual ? <UserRoundCheck size={15} aria-hidden="true" /> : <MatchIcon tone={s.match[1]} />}{s.match[0]}
                  </p>
                )}
                <div className={styles.record}>
                  <small>THE RECORD</small>
                  <ol>
                    {s.record.map((r, i) => <li key={r} className={i === s.record.length - 1 && step > 0 ? styles.recordNew : ""}>{r}</li>)}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="ib-demo-bottom">
            <p>{s.note}</p>
            <button type="button" className="ib-reset" onClick={() => choose(scenario)}><RotateCcw size={15} aria-hidden="true" />Start again</button>
          </div>
          <p className={styles.visuallyHidden} aria-live="polite">{s.match ? `${s.match[0]}. ` : ""}{s.note}</p>
        </div>
      </div>
    </section>
  );
}
