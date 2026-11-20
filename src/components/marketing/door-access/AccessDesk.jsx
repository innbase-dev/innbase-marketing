"use client";

import { useRef, useState } from "react";
import { ArrowRight, Ban, Check, CircleDashed, KeyRound, Lock, LockOpen, RotateCcw, ShieldCheck, UserRoundCheck, X } from "lucide-react";
import { ACCESS_SCENARIOS, GUEST, ROOM, WINDOW } from "@/data/doorAccessData";
import { SectionHeading } from "../Primitives";
import demo from "../feature/FeatureDemo.module.css";
import styles from "./DoorAccess.module.css";

const PENDING = ["pending", "Not checked yet"];
const PASS_CHECKS = {
  booking: ["pass", "Confirmed"],
  room: ["pass", `Room ${ROOM} assigned`],
  payment: ["pass", "Deposit confirmed"],
  risk: ["pass", "None known"],
  window: ["pass", WINDOW],
};
const NOT_CHECKED = { booking: PENDING, room: PENDING, payment: PENDING, risk: PENDING, window: PENDING };

const FLOWS = {
  late: [
    { checks: NOT_CHECKED, decision: ["Not checked yet", "neutral"], arrival: "waiting", action: "Check the stay", note: "A confirmed booking alone doesn’t open a door. Innbase checks the whole stay first." },
    {
      checks: PASS_CHECKS, decision: ["Access granted for this stay", "sage"], grant: true, arrival: "ready", action: "Tunde arrives at 1:40 a.m.",
      tryAction: { label: "Request the grant again", refusal: "Already granted. Asking again returns the same grant; a second one isn’t created." },
      note: "Every check passed. The grant is recorded once: one guest, one room, one stay.",
    },
    { checks: PASS_CHECKS, decision: ["Access granted for this stay", "sage"], grant: true, arrival: "open", action: "Tunde checks out", note: "Nobody waited in the lobby while the night desk finished another job." },
    { checks: PASS_CHECKS, decision: ["Access ended at checkout", "neutral"], grant: true, ended: true, arrival: "ended", next: "unpaid", note: "Access is built to end with the stay. The next guest gets a room nobody else can open." },
  ],
  unpaid: [
    {
      checks: { ...PASS_CHECKS, payment: ["fail", "Not confirmed yet"] }, decision: ["Not granted · payment not confirmed", "amber"], arrival: "refused",
      action: "Duty manager approves an exception", note: "No confirmed payment, no access, unless someone with authority decides otherwise.",
    },
    {
      checks: { ...PASS_CHECKS, payment: ["fail", "Still owed"] }, exception: true, decision: ["Granted on an approved exception", "sage"], grant: true, arrival: "ready", next: "cancelled",
      note: "The exception lets the guest in for this stay. It doesn’t record a payment: the balance is still owed.",
    },
  ],
  cancelled: [
    {
      checks: { ...PASS_CHECKS, booking: ["fail", "Cancelled"], payment: ["pending", "Not relevant"] }, decision: ["Not granted · booking cancelled", "red"], arrival: "refused", next: "late",
      tryAction: { label: "Approve an exception anyway", refusal: "Not allowed. A cancelled booking can’t be overridden, by anyone." },
      note: "Some answers are final. Cancellations and known risks can’t be overridden by an exception.",
    },
  ],
};

const CHECK_LABELS = [["booking", "Booking"], ["room", "Room"], ["payment", "Payment"], ["risk", "Known risk"], ["window", "Access window"]];

function CheckIcon({ state }) {
  if (state === "pass") return <Check size={14} aria-hidden="true" />;
  if (state === "fail") return <X size={14} aria-hidden="true" />;
  return <CircleDashed size={14} aria-hidden="true" />;
}

function Arrival({ state, onOpen }) {
  const open = state === "open";
  const phone = {
    waiting: ["Your stay", "Your key will appear here when your stay is ready."],
    ready: [`Room ${ROOM}`, "Your key is ready for this stay."],
    open: [`Room ${ROOM}`, "Opened at 1:40 a.m."],
    ended: ["Thank you for staying", "Your stay has ended."],
    refused: ["Almost there", "Please see the front desk."],
  }[state];
  return (
    <div className={styles.arrival}>
      <div className={`${styles.door} ${open ? styles.doorOpen : ""}`} aria-hidden="true">
        <span className={styles.plate}>{ROOM}</span>
        <span className={styles.lock}>{open ? <LockOpen size={16} /> : <Lock size={16} />}<i className={open ? styles.ledGreen : state === "refused" ? styles.ledRed : styles.ledOff} /></span>
        <span className={styles.handle} />
      </div>
      <div className={styles.phone}>
        <span className={styles.phoneTop}><KeyRound size={13} aria-hidden="true" />Room key</span>
        <b>{phone[0]}</b>
        <p>{phone[1]}</p>
        {onOpen && <button type="button" className={styles.keyButton} onClick={onOpen}>Open Room {ROOM}</button>}
        {open && <span className={styles.keyStatus}><Check size={13} aria-hidden="true" />Door opened</span>}
      </div>
      <p className={styles.doorStatus}>Room {ROOM}: {open ? "unlocked for Tunde" : "locked"}</p>
    </div>
  );
}

export default function AccessDesk() {
  const [scenario, setScenario] = useState("late");
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
    const n = ACCESS_SCENARIOS.length;
    const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i + n - 1) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    choose(ACCESS_SCENARIOS[next].key);
    tabs.current[next]?.focus();
  }

  function advance() {
    setTried(false);
    setStep(step + 1);
    requestAnimationFrame(() => actionRef.current?.focus({ preventScroll: true }));
  }

  function goNext() {
    const i = ACCESS_SCENARIOS.findIndex((x) => x.key === s.next);
    choose(s.next);
    requestAnimationFrame(() => tabs.current[i]?.focus({ preventScroll: true }));
  }

  const nextLabel = s.next && ACCESS_SCENARIOS.find((x) => x.key === s.next).label;

  return (
    <section className={`ib-section ib-experience ${demo.surface}`} id="desk">
      <div className="ib-container">
        <SectionHeading eyebrow="THE ARRIVAL" title={<>The stay decides<br /><em>who gets in.</em></>}>
          <p>Follow a late arrival from booking to checkout, then see what happens when the payment hasn’t landed, or the booking was cancelled.</p>
        </SectionHeading>

        <div className="ib-scenario-tabs" role="tablist" aria-label="Choose an arrival">
          {ACCESS_SCENARIOS.map(({ key, label }, i) => (
            <button key={key} type="button" role="tab" id={`door-tab-${key}`} aria-controls="door-desk" aria-selected={scenario === key} tabIndex={scenario === key ? 0 : -1} ref={(el) => { tabs.current[i] = el; }} onClick={() => choose(key)} onKeyDown={(e) => keydown(e, i)}>
              {label}
            </button>
          ))}
        </div>

        <div className="ib-demo-stage" id="door-desk" role="tabpanel" aria-labelledby={`door-tab-${scenario}`}>
          <div className="ib-demo-topline"><span>GUEST ACCESS RECORD</span><span>Room {ROOM}</span></div>

          <div className={styles.deskGrid}>
            <div className={styles.side}>
              <div className="ib-demo-label"><span>01 / THE ACCESS DECISION</span><span>Innbase</span></div>
              <div className={styles.record}>
                <div className={styles.recordHead}>
                  <span className={styles.recordIcon} aria-hidden="true"><ShieldCheck size={20} /></span>
                  <div><small>GUEST ACCESS · ROOM {ROOM}</small><b>{GUEST}</b></div>
                </div>
                <ul className={styles.checks}>
                  {CHECK_LABELS.map(([key, label]) => {
                    const [state, text] = s.checks[key];
                    return <li key={key} className={styles[`check_${state}`]}><span>{label}</span><b><CheckIcon state={state} />{text}</b></li>;
                  })}
                </ul>
                {s.exception && <p className={styles.exception}><UserRoundCheck size={15} aria-hidden="true" /><span><b>Exception approved by Funmi, duty manager.</b> For this stay only, at this property.</span></p>}
                <p className={`${styles.decision} ${styles[`decision_${s.decision[1]}`]}`}>{s.decision[0]}</p>
                {s.grant && <p className={styles.grant}>Grant recorded · {GUEST} · Room {ROOM} · this stay{s.ended ? " · ended at checkout" : ""}</p>}

                <div className={styles.actions}>
                  {s.action && <button type="button" className="ib-button ib-button-dark" ref={actionRef} onClick={advance}>{s.action}<ArrowRight size={16} aria-hidden="true" /></button>}
                  {s.next && <button type="button" className="ib-button ib-button-dark" ref={actionRef} onClick={goNext}>Next: {nextLabel}<ArrowRight size={16} aria-hidden="true" /></button>}
                  {s.tryAction && !tried && <button type="button" className={styles.tryButton} onClick={() => setTried(true)}>Try: {s.tryAction.label}</button>}
                  {s.tryAction && tried && <p className={styles.refusal} role="status"><Ban size={15} aria-hidden="true" /><span>{s.tryAction.refusal}</span></p>}
                </div>
              </div>
            </div>

            <div className="ib-demo-connector" aria-hidden="true"><span /><ArrowRight size={24} /><span /></div>

            <div className={styles.side}>
              <div className="ib-demo-label"><span>02 / THE DOOR AND THE GUEST</span><span>Room {ROOM}</span></div>
              <div className={styles.arrivalFrame}>
                <Arrival state={s.arrival} onOpen={scenario === "late" && s.arrival === "ready" ? advance : undefined} />
                <p className={styles.partnerNote}>Mobile keys require a compatible connected lock.</p>
              </div>
            </div>
          </div>

          <div className="ib-demo-bottom">
            <p>{s.note}</p>
            <button type="button" className="ib-reset" onClick={() => choose(scenario)}><RotateCcw size={15} aria-hidden="true" />Restart arrival</button>
          </div>
          <p className={styles.visuallyHidden} aria-live="polite">{s.decision[0]}. {s.note}</p>
        </div>
      </div>
    </section>
  );
}
