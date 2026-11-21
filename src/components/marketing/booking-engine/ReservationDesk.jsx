"use client";

import { useRef, useState } from "react";
import { ArrowRight, Ban, Building2, Check, CheckCheck, Hourglass, Landmark, MessageCircle, Phone, RotateCcw } from "lucide-react";
import { DEPOSIT, DESK_STEPS, GUEST, HELD_ROOM, HOLD_ENDS, REQUEST_NIGHTS, TOTAL } from "@/data/bookingEngineData";
import { SectionHeading } from "../Primitives";
import AvailabilityBoard from "./AvailabilityBoard";
import demo from "../feature/FeatureDemo.module.css";
import styles from "./BookingEngine.module.css";

// One weekend booking, acted out step by step. Stages:
// enquiry → checked → held → claimed → confirmed, with two other endings
// from the hold: expired (no deposit in time) and credit (approved account).
const STAGES = {
  enquiry: {
    step: 0,
    status: ["Enquiry", "neutral"],
    note: "Every enquiry is answered from the same live availability, whoever picks up the phone.",
    event: "A new WhatsApp enquiry for a Deluxe room, Friday and Saturday.",
  },
  checked: {
    step: 0,
    status: ["Room available", "neutral"],
    note: "Only a room that is free on every night of the stay is offered. 203 and 206 are each taken on one of the two nights.",
    event: "Deluxe 204 is free on Friday and Saturday.",
  },
  held: {
    step: 1,
    status: [`On hold until ${HOLD_ENDS}`, "amber"],
    note: "While the hold runs, nobody else can sell Deluxe 204 for those nights. Your property sets how long a hold lasts.",
    event: `Deluxe 204 is on hold for ${GUEST} until ${HOLD_ENDS}.`,
  },
  claimed: {
    step: 2,
    status: ["Transfer claimed · not verified", "amber"],
    note: "A claim isn’t money yet. The room stays held, not confirmed, until the transfer is verified.",
    event: "Transfer claimed. The booking is still on hold, waiting for verification.",
  },
  confirmed: {
    step: 3,
    status: ["Confirmed", "sage"],
    note: "Confirmed means the deposit has been verified. The balance is still owed, and the booking knows exactly how much.",
    event: "Transfer verified. The booking is confirmed.",
  },
  expired: {
    step: 1,
    status: ["Hold ended · back on sale", "neutral"],
    note: "No deposit arrived by the time the property set, so the room went back on sale. Nobody had to remember to release it.",
    event: "The hold ended. Deluxe 204 is back on sale.",
  },
  credit: {
    step: 3,
    status: ["Confirmed on approved credit", "sage"],
    note: "Confirming without a deposit needs someone with authority to approve it. The full amount stays owed to the hotel.",
    event: "Approved by the general manager. Confirmed on the company account.",
  },
};

function boardFor(stage) {
  const nights = REQUEST_NIGHTS;
  const cells = {};
  const set = (state, label) => nights.forEach((n) => { cells[`${HELD_ROOM}:${n}`] = { state, label }; });
  if (stage === "held" || stage === "claimed") set("held", "Hold");
  if (stage === "confirmed") set("new", "Bello");
  if (stage === "credit") set("new", "Harbour & Co.");
  if (stage === "expired") set("released", "");
  const focus = stage === "enquiry" ? null : "Deluxe";
  return {
    cells,
    focusType: focus,
    offered: stage === "checked" ? HELD_ROOM : null,
    unavailable: stage === "checked" ? ["203", "206"] : [],
  };
}

function Bubble({ from, children, time }) {
  return (
    <div className={`${styles.bubble} ${from === "desk" ? styles.bubbleDesk : from === "system" ? styles.bubbleSystem : ""}`}>
      <p>{children}</p>
      {time && <small>{time}{from === "desk" && <CheckCheck size={13} aria-hidden="true" />}</small>}
    </div>
  );
}

export default function ReservationDesk() {
  const [stage, setStage] = useState("enquiry");
  const [competitor, setCompetitor] = useState(false);
  const actionRef = useRef(null);
  const s = STAGES[stage];
  const board = boardFor(stage);
  const ended = stage === "confirmed" || stage === "expired" || stage === "credit";

  function go(next) {
    setStage(next);
    if (next !== "held") setCompetitor(false);
    requestAnimationFrame(() => actionRef.current?.focus({ preventScroll: true }));
  }

  function reset() {
    setCompetitor(false);
    go("enquiry");
  }

  const corporate = stage === "credit";

  return (
    <section className={`ib-section ib-experience ${demo.surface}`} id="desk">
      <div className="ib-container">
        <SectionHeading eyebrow="THE RESERVATION DESK" title={<>One weekend.<br /><em>One room. Every outcome.</em></>}>
          <p>Take a WhatsApp enquiry, hold the room, and decide what happens next. Watch the availability board answer for every step.</p>
        </SectionHeading>

        <div className="ib-demo-stage">
          <div className="ib-demo-topline"><span>FRONT DESK ENQUIRY</span><span>Friday to Sunday</span></div>

          <div className={styles.deskGrid}>
            <div className={styles.frontDesk}>
              <div className="ib-demo-label"><span>01 / THE FRONT DESK</span><span><MessageCircle size={13} aria-hidden="true" />WhatsApp</span></div>
              <div className={styles.chat}>
                <div className={styles.chatHead}>
                  <span className={styles.avatar} aria-hidden="true">{corporate ? "H" : "AB"}</span>
                  <div><b>{corporate ? "Harbour & Co. · Travel desk" : GUEST}</b><small>{corporate ? "Corporate account" : "New enquiry"}</small></div>
                </div>
                <div className={styles.chatBody}>
                  {corporate ? (
                    <Bubble from="guest" time="2:14 pm">Please book a Deluxe room for our guest, Friday and Saturday, on the company account.</Bubble>
                  ) : (
                    <Bubble from="guest" time="2:14 pm">Good afternoon. Do you have a deluxe room for Friday and Saturday night?</Bubble>
                  )}
                  {stage !== "enquiry" && !corporate && <Bubble from="desk" time="2:15 pm">Yes, Deluxe 204 is free both nights at ₦45,000 a night.</Bubble>}
                  {["held", "claimed", "confirmed", "expired"].includes(stage) && <Bubble from="desk" time="2:16 pm">I’ve held it for you until {HOLD_ENDS}. A {DEPOSIT} deposit confirms it.</Bubble>}
                  {(stage === "claimed" || stage === "confirmed") && <Bubble from="guest" time="3:02 pm">I’ve sent it. Please check.</Bubble>}
                  {stage === "confirmed" && <Bubble from="desk" time="3:20 pm">Received, thank you. You’re confirmed for Friday and Saturday.</Bubble>}
                  {stage === "expired" && <Bubble from="system">{HOLD_ENDS} · Hold ended. No deposit received.</Bubble>}
                  {corporate && <Bubble from="system">No deposit · approved by the general manager</Bubble>}
                </div>

                {stage !== "enquiry" && <p className={styles.deskAnswer}>
                  <strong>{s.status[0]}</strong><span>{s.event}</span>
                </p>}
                <div className={styles.actions}>
                  {stage === "enquiry" && <button type="button" className="ib-button ib-button-dark" ref={actionRef} onClick={() => go("checked")}>Check Deluxe availability<ArrowRight size={16} aria-hidden="true" /></button>}
                  {stage === "checked" && <button type="button" className="ib-button ib-button-dark" ref={actionRef} onClick={() => go("held")}>Hold Deluxe 204 for Amaka<ArrowRight size={16} aria-hidden="true" /></button>}
                  {stage === "held" && (
                    <>
                      <p className={styles.actionsLabel} ref={actionRef} tabIndex={-1}>What happens next?</p>
                      <div className={styles.branches}>
                        <button type="button" onClick={() => go("claimed")}><Landmark size={18} aria-hidden="true" /><span>Amaka sends a transfer</span></button>
                        <button type="button" onClick={() => go("expired")}><Hourglass size={18} aria-hidden="true" /><span>The hold runs out</span></button>
                        <button type="button" onClick={() => go("credit")}><Building2 size={18} aria-hidden="true" /><span>It’s a corporate booking</span></button>
                      </div>
                    </>
                  )}
                  {stage === "claimed" && <button type="button" className="ib-button ib-button-dark" ref={actionRef} onClick={() => go("confirmed")}>Accounts verifies the transfer<ArrowRight size={16} aria-hidden="true" /></button>}
                  {ended && <button type="button" className="ib-button ib-button-dark" ref={actionRef} onClick={reset}>Take another booking<RotateCcw size={15} aria-hidden="true" /></button>}
                </div>

                {stage === "held" && (
                  <div className={styles.competitor}>
                    <div className={styles.competitorHead}><Phone size={15} aria-hidden="true" /><span><b>Meanwhile, a phone call.</b> Tolu wants a Deluxe room for Friday and Saturday.</span></div>
                    {!competitor ? (
                      <button type="button" className={styles.competitorButton} onClick={() => setCompetitor(true)}>Try to offer Tolu Deluxe 204</button>
                    ) : (
                      <p className={styles.refusal} role="status"><Ban size={15} aria-hidden="true" /><span><b>Not available.</b> 204 is on hold for Amaka until {HOLD_ENDS}, and 203 and 206 are each taken on one night. Suite 301 is free both nights.</span></p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="ib-demo-connector" aria-hidden="true"><span /><ArrowRight size={24} /><span /></div>

            <div className={styles.boardPanel}>
              <div className="ib-demo-label"><span>02 / THE AVAILABILITY BOARD</span><span>Innbase Booking</span></div>
              <div className={styles.workspace}>
                <ol className={styles.steps} aria-label="Booking progress">
                  {DESK_STEPS.map((label, i) => (
                    <li key={label} className={i < s.step || (i === s.step && ended && stage !== "expired") ? styles.stepDone : i === s.step ? styles.stepNow : ""} aria-current={i === s.step ? "step" : undefined}>
                      <span>{i < s.step || (i === s.step && ended && stage !== "expired") ? <Check size={12} aria-hidden="true" /> : i + 1}</span>{label}
                    </li>
                  ))}
                </ol>

                <AvailabilityBoard caption="Availability for six rooms over four nights" {...board} />

                <div className={styles.record}>
                  <div className={styles.recordHead}>
                    <span>BOOKING · BK-2041</span>
                    <span className={`${styles.pill} ${styles[`pill_${s.status[1]}`]}`}>{s.status[0]}</span>
                  </div>
                  <dl>
                    <div><dt>Guest</dt><dd>{corporate ? "Guest of Harbour & Co." : GUEST}</dd></div>
                    <div><dt>Room</dt><dd>{stage === "enquiry" ? "Deluxe · to assign" : "Deluxe 204 · Fri, Sat"}</dd></div>
                    <div><dt>Total</dt><dd>{TOTAL}</dd></div>
                    <div>
                      <dt>{corporate ? "Payment" : "Deposit"}</dt>
                      <dd>{{
                        enquiry: "—",
                        checked: "—",
                        held: `${DEPOSIT} due by ${HOLD_ENDS}`,
                        claimed: `${DEPOSIT} claimed · awaiting verification`,
                        confirmed: `${DEPOSIT} verified · ₦45,000 due at check-in`,
                        expired: "Not received",
                        credit: `${TOTAL} owed on approved credit`,
                      }[stage]}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="ib-demo-bottom">
            <p>{s.note}</p>
            <button type="button" className="ib-reset" onClick={reset}><RotateCcw size={15} aria-hidden="true" />Reset booking</button>
          </div>
          <p className={styles.visuallyHidden} role="status">{s.event}</p>
        </div>
      </div>
    </section>
  );
}
