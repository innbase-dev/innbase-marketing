"use client";

import { useRef, useState } from "react";
import { ArrowRight, Ban, Building2, Check, FileCheck2, FileLock2, Landmark, Lock, MessageCircle, RotateCcw, ScanSearch, ShieldCheck, TriangleAlert } from "lucide-react";
import { AMOUNT, PROPERTY, SCENARIOS, SUPPLIER, TRANSFER_REF } from "@/data/procurementData";
import { SectionHeading } from "../Primitives";
import demo from "../feature/FeatureDemo.module.css";
import styles from "./Procurement.module.css";

const APPROVED_ACCOUNT = { number: "•••• 4417", name: "EKO BEVERAGES LTD", nameTone: "sage", nameNote: "Matches the supplier", submitted: "Chidi · Accounts", approval: ["Approved by Funmi · Owner", "sage"] };

// Each step describes both sides of the desk. `try` is an action the
// visitor can attempt that Innbase refuses, with the reason it gives.
const FLOWS = {
  new: [
    {
      status: ["Pending approval", "amber"], property: ["Pending approval", "amber"],
      outside: { kind: "idle", text: "Nothing has been paid. A pending supplier is not an approved one." },
      action: "Owner approves for the Main hotel",
      note: "A new supplier starts as pending. It only counts as approved once someone with authority signs it off.",
    },
    {
      status: ["Approved supplier", "sage"], property: ["Approved", "sage"],
      outside: { kind: "idle", text: "Approved for the Main hotel only. Another property makes its own decision." },
      action: "Accounts adds the bank details",
      note: "Approval is per property: approving Eko Beverages here doesn’t approve it anywhere else.",
    },
    {
      status: ["Approved supplier", "sage"], property: ["Approved", "sage"],
      account: { ...APPROVED_ACCOUNT, approval: ["Waiting for a second person", "amber"] },
      outside: { kind: "idle", text: "The bank returned the name on the account. It matches the supplier." },
      try: { label: "Chidi approves it himself", refusal: "Not allowed. Whoever entered the bank details can’t approve them." },
      action: "Funmi, the owner, approves",
      note: "The bank returns the name on the account, so everyone can see it matches before anyone approves it.",
    },
    {
      status: ["Ready to pay", "sage"], property: ["Approved", "sage"],
      account: APPROVED_ACCOUNT,
      outside: { kind: "idle", text: "This is the one account your team pays for Eko Beverages at the Main hotel." },
      next: "pay",
      note: "One approved account per supplier per property, with a record of who entered it and who approved it.",
    },
  ],
  pay: [
    {
      status: ["Ready to pay", "sage"], property: ["Approved", "sage"], account: APPROVED_ACCOUNT,
      outside: { kind: "bankForm" },
      action: "Pay from your bank",
      note: "Payments happen in your bank, the way they do today. Innbase never initiates, holds or moves them.",
    },
    {
      status: ["Ready to pay", "sage"], property: ["Approved", "sage"], account: APPROVED_ACCOUNT,
      outside: { kind: "bankSent" },
      action: "Record it in Innbase",
      note: "Nothing changes in Innbase until your team records what happened.",
    },
    {
      status: ["Payment reported", "amber"], property: ["Approved", "sage"], account: APPROVED_ACCOUNT,
      payment: { state: ["Reported · not verified", "amber"], receipt: null },
      outside: { kind: "bankSent" },
      action: "Attach the receipt",
      note: "A recorded payment is your team’s report of a transfer. Innbase keeps it marked as reported, not verified.",
    },
    {
      status: ["Payment reported", "amber"], property: ["Approved", "sage"], account: APPROVED_ACCOUNT,
      payment: { state: ["Reported · not verified", "amber"], receipt: ["Locked · scanning for malware", "neutral", ScanSearch] },
      outside: { kind: "bankSent" },
      action: "The scan finishes",
      note: "Every receipt is encrypted and stays locked until a malware scan clears it.",
    },
    {
      status: ["Payment reported", "amber"], property: ["Approved", "sage"], account: APPROVED_ACCOUNT,
      payment: { state: ["Reported · not verified", "amber"], receipt: ["Clean · encrypted", "sage", FileLock2] },
      outside: { kind: "bankSent" },
      try: { label: "Record the same transfer again", refusal: `Already recorded. ${TRANSFER_REF} is already recorded for this property.` },
      action: "Funmi opens the receipt",
      note: "The same transfer reference can’t be recorded twice for a property, so one payment can’t become two.",
    },
    {
      status: ["Payment reported", "amber"], property: ["Approved", "sage"], account: APPROVED_ACCOUNT,
      payment: { state: ["Reported · not verified", "amber"], receipt: ["Opened by Funmi · Owner · logged", "sage", FileCheck2] },
      outside: { kind: "bankSent" },
      next: "change",
      note: "Every time someone opens a receipt, it’s recorded: who, and when.",
    },
  ],
  change: [
    {
      status: ["Ready to pay", "sage"], property: ["Approved", "sage"], account: APPROVED_ACCOUNT,
      outside: { kind: "message" },
      action: "Accounts submits the new account",
      note: "Invoice redirection often starts exactly like this: a friendly message with new bank details.",
    },
    {
      status: ["Change waiting for approval", "amber"], property: ["Approved", "sage"], account: APPROVED_ACCOUNT,
      candidate: { number: "•••• 9035", name: "KAYODE ADEBAYO", nameTone: "red", nameNote: "Doesn’t match the supplier", approval: ["Waiting for a second person", "amber"] },
      outside: { kind: "message" },
      action: "Funmi reviews the change",
      note: "The bank returns the real name on the new account. It doesn’t match Eko Beverages.",
    },
    {
      status: ["Ready to pay", "sage"], property: ["Approved", "sage"], account: APPROVED_ACCOUNT,
      candidate: { number: "•••• 9035", name: "KAYODE ADEBAYO", nameTone: "red", nameNote: "Doesn’t match the supplier", approval: ["Rejected by Funmi · kept in history", "neutral"] },
      outside: { kind: "call" },
      next: "new",
      note: "The approved account didn’t change, and the rejected details stay in the history as a record of the attempt.",
    },
  ],
};

function Pill({ children, tone }) {
  return <span className={`${styles.pill} ${styles[`pill_${tone}`]}`}>{children}</span>;
}

function Account({ title, account }) {
  return (
    <div className={styles.account}>
      <div className={styles.accountHead}><span>{title}</span><Pill tone={account.approval[1]}>{account.approval[0]}</Pill></div>
      <dl>
        <div><dt>Account</dt><dd>{account.number}</dd></div>
        <div>
          <dt>Name at the bank</dt>
          <dd className={styles[`name_${account.nameTone}`]}>
            {account.nameTone === "red" ? <TriangleAlert size={14} aria-hidden="true" /> : <Check size={14} aria-hidden="true" />}
            {account.name}<small>{account.nameNote}</small>
          </dd>
        </div>
        {account.submitted && <div><dt>Entered by</dt><dd>{account.submitted}</dd></div>}
      </dl>
    </div>
  );
}

function Outside({ view }) {
  if (view.kind === "message" || view.kind === "call") {
    return (
      <div className={styles.inbox}>
        <span className={styles.outsideTag}><MessageCircle size={13} aria-hidden="true" />Message · unknown number</span>
        <div className={styles.inboxBubble}>
          <b>Eko Beverages?</b>
          <p>Good morning. We’ve changed banks. Please pay this month’s invoice into the account ending in 9035.</p>
        </div>
        {view.kind === "call" && (
          <p className={styles.outsideNote}><ShieldCheck size={15} aria-hidden="true" />Your team calls Eko Beverages on the number they already had. The supplier never changed banks.</p>
        )}
      </div>
    );
  }
  if (view.kind === "bankForm" || view.kind === "bankSent") {
    const sent = view.kind === "bankSent";
    return (
      <div className={styles.bankApp}>
        <span className={styles.outsideTag}><Landmark size={13} aria-hidden="true" />Your banking app</span>
        <div className={styles.transfer}>
          <small>{sent ? "Transfer sent" : "New transfer"}</small>
          <b>{AMOUNT}</b>
          <dl>
            <div><dt>To</dt><dd>EKO BEVERAGES LTD</dd></div>
            <div><dt>Account</dt><dd>•••• 4417</dd></div>
            <div><dt>Reference</dt><dd>{TRANSFER_REF}</dd></div>
          </dl>
          <span className={sent ? styles.transferDone : styles.transferPending}>{sent ? <><Check size={13} aria-hidden="true" />Sent from your account</> : "Waiting for you to authorise"}</span>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.idle}>
      <Lock size={22} strokeWidth={1.4} aria-hidden="true" />
      <p>{view.text}</p>
    </div>
  );
}

export default function SupplierDesk() {
  const [scenario, setScenario] = useState("change");
  const [step, setStep] = useState(0);
  const [tried, setTried] = useState(false);
  const tabs = useRef([]);
  const actionRef = useRef(null);
  const flow = FLOWS[scenario];
  const s = flow[step];

  function choose(key) {
    setScenario(key);
    setStep(0);
    setTried(false);
  }

  function keydown(e, i) {
    const n = SCENARIOS.length;
    const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i + n - 1) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    choose(SCENARIOS[next].key);
    tabs.current[next]?.focus();
  }

  function advance() {
    setTried(false);
    setStep(step + 1);
    requestAnimationFrame(() => actionRef.current?.focus({ preventScroll: true }));
  }

  function goNext() {
    const i = SCENARIOS.findIndex((x) => x.key === s.next);
    choose(s.next);
    requestAnimationFrame(() => tabs.current[i]?.focus({ preventScroll: true }));
  }

  const nextLabel = s.next && SCENARIOS.find((x) => x.key === s.next).label;

  return (
    <section className={`ib-section ib-experience ${demo.surface}`} id="desk">
      <div className="ib-container">
        <SectionHeading eyebrow="THE SUPPLIER CONTROL DESK" title={<>The account changed.<br /><em>Who checked it?</em></>}>
          <p>Approve a supplier, pay them from your bank, and handle the message every hotel eventually gets. See what Innbase records, and what stays with your bank.</p>
        </SectionHeading>

        <div className="ib-scenario-tabs" role="tablist" aria-label="Choose a supplier situation">
          {SCENARIOS.map(({ key, label }, i) => (
            <button key={key} type="button" role="tab" id={`proc-tab-${key}`} aria-controls="proc-desk" aria-selected={scenario === key} tabIndex={scenario === key ? 0 : -1} ref={(el) => { tabs.current[i] = el; }} onClick={() => choose(key)} onKeyDown={(e) => keydown(e, i)}>
              {label}
            </button>
          ))}
        </div>

        <div className="ib-demo-stage" id="proc-desk" role="tabpanel" aria-labelledby={`proc-tab-${scenario}`}>
          <div className="ib-demo-topline"><span>SUPPLIER ACCOUNT REVIEW</span></div>

          <div className={styles.deskGrid}>
            <div className={styles.side}>
              <div className="ib-demo-label"><span>01 / IN INNBASE</span><span>Step {step + 1} of {flow.length}</span></div>
              <div className={styles.record}>
                <div className={styles.recordHead}>
                  <span className={styles.recordIcon} aria-hidden="true"><Building2 size={20} /></span>
                  <div><small>SUPPLIER</small><b>{SUPPLIER}</b></div>
                  <Pill tone={s.status[1]}>{s.status[0]}</Pill>
                </div>
                <div className={styles.recordRow}><span>{PROPERTY}</span><Pill tone={s.property[1]}>{s.property[0]}</Pill></div>
                {s.account && <Account title={s.account.approval[1] === "sage" ? "APPROVED BANK ACCOUNT" : "BANK ACCOUNT · AWAITING APPROVAL"} account={s.account} />}
                {s.candidate && <Account title="NEW ACCOUNT · REQUESTED CHANGE" account={s.candidate} />}
                {s.payment && (
                  <div className={styles.payment}>
                    <div className={styles.accountHead}><span>PAYMENT · {TRANSFER_REF}</span><Pill tone={s.payment.state[1]}>{s.payment.state[0]}</Pill></div>
                    <div className={styles.paymentBody}>
                      <b>{AMOUNT}</b><span>Paid from your bank · recorded by Chidi</span>
                      {s.payment.receipt && (() => { const [text, tone, Icon] = s.payment.receipt; return <p className={`${styles.receipt} ${styles[`receipt_${tone}`]}`}><Icon size={15} aria-hidden="true" />Receipt: {text}</p>; })()}
                    </div>
                  </div>
                )}
                {!s.account && !s.payment && <p className={styles.empty}>No bank account yet.</p>}

                <div className={styles.actions}>
                  {s.action && <button type="button" className="ib-button ib-button-dark" ref={actionRef} onClick={advance}>{s.action}<ArrowRight size={16} aria-hidden="true" /></button>}
                  {s.next && <button type="button" className="ib-button ib-button-dark" ref={actionRef} onClick={goNext}>Next: {nextLabel.replace(/[“”]/g, "")}<ArrowRight size={16} aria-hidden="true" /></button>}
                  {s.try && !tried && <button type="button" className={styles.tryButton} onClick={() => setTried(true)}>Try: {s.try.label}</button>}
                  {s.try && tried && <p className={styles.refusal} role="status"><Ban size={15} aria-hidden="true" /><span>{s.try.refusal}</span></p>}
                </div>
              </div>
            </div>

            <div className="ib-demo-connector" aria-hidden="true"><span /><ArrowRight size={24} /><span /></div>

            <div className={styles.side}>
              <div className="ib-demo-label"><span>02 / OUTSIDE INNBASE</span><span>Your bank · your messages</span></div>
              <div className={styles.outside}><Outside view={s.outside} /></div>
            </div>
          </div>

          <div className="ib-demo-bottom">
            <p>{s.note}</p>
            <button type="button" className="ib-reset" onClick={() => choose(scenario)}><RotateCcw size={15} aria-hidden="true" />Restart review</button>
          </div>
          <p className={styles.visuallyHidden} aria-live="polite">{s.note}</p>
        </div>
      </div>
    </section>
  );
}
