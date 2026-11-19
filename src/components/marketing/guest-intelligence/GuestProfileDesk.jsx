"use client";

import { useRef, useState } from "react";
import { ArrowRight, Ban, Check, CircleDashed, Lock, MapPin, MessageSquareText, RotateCcw, Smartphone, UserRound } from "lucide-react";
import { GUEST } from "@/data/guestIntelligenceData";
import { SectionHeading } from "../Primitives";
import styles from "./GuestIntelligence.module.css";

const QUIET = { label: "Quiet room", source: "Told the front desk", Icon: MessageSquareText };
const HIGH = { label: "High floor", source: "Shared it herself", Icon: Smartphone };
const FIRM = { label: "Firm pillow", source: "Shared it herself", Icon: Smartphone };

// One guest across two stays. `side` says who acts at each step.
const STEPS = [
  {
    side: "team", action: "Front desk notes: “a quiet room, please”",
    stay: ["First stay · in house", "neutral"], prefs: [], consent: null, guest: "home",
    note: "Her first stay. Nothing is known yet, and nothing is guessed.",
  },
  {
    side: "guest", action: "Amaka adds a high floor and a firm pillow",
    stay: ["First stay · in house", "neutral"], prefs: [QUIET], consent: null, guest: "prefs",
    note: "A preference the guest tells your team is recorded as exactly that: told to the front desk.",
  },
  {
    side: "guest", action: "Amaka agrees",
    stay: ["First stay · in house", "neutral"], prefs: [QUIET, HIGH, FIRM], consent: ["Personalisation · not asked yet", "neutral"], guest: "notice",
    tryAction: { label: "Record her agreement for her", refusal: "Not allowed. Staff can’t agree on a guest’s behalf. Only Amaka can, from her own verified session." },
    note: "What she shares herself is marked as hers. Using it to personalise her stays needs her agreement.",
  },
  {
    side: "team", action: "Amaka books again",
    stay: ["First stay · in house", "neutral"], prefs: [QUIET, HIGH, FIRM], consent: ["Personalisation · agreed · this hotel only", "sage"], guest: "agreed",
    note: "She agreed after seeing your notice. The agreement covers this hotel only.",
  },
  {
    side: "guest", action: "Amaka changes her mind",
    stay: ["Returning guest · 2 completed stays", "sage"], prefs: [QUIET, HIGH, FIRM], consent: ["Personalisation · agreed · this hotel only", "sage"], guest: "welcome",
    note: "She’s back. The team sees her preferences and her completed stays before she has to ask.",
  },
  {
    side: null,
    stay: ["Returning guest · 2 completed stays", "sage"], prefs: [QUIET, HIGH, FIRM], consent: ["Personalisation · withdrawn", "neutral"], guest: "withdrawn",
    note: "Withdrawing is as easy as agreeing. From that moment, her preferences are no longer used to personalise her stays.",
  },
];

function GuestPhone({ view }) {
  const top = <div className="ib-device-top"><b>Your stay.</b><span>Guest Companion</span></div>;
  const body = {
    home: <><span className={styles.location}><MapPin size={12} aria-hidden="true" />Room 204</span><h3>Welcome to<br /><em>your stay.</em></h3><p>Order, request or reach the team from here.</p></>,
    prefs: <><span className={styles.location}><MapPin size={12} aria-hidden="true" />Room 204</span><h3>How do you<br /><em>like your stay?</em></h3>
      <ul className={styles.choices}>
        <li><span>Floor</span><b>High</b><b className={styles.off}>Low</b></li>
        <li><span>Pillow</span><b>Firm</b><b className={styles.off}>Soft</b></li>
      </ul></>,
    notice: <><span className={styles.location}><MapPin size={12} aria-hidden="true" />Room 204</span><h3>Use your preferences<br /><em>next time?</em></h3>
      <p className={styles.notice}>We’ll use your room, floor, pillow and check-in preferences to prepare your stays at this hotel only. You can change this at any time.</p></>,
    agreed: <><span className={styles.location}><MapPin size={12} aria-hidden="true" />Room 204</span><div className={styles.done}><span><Check size={22} aria-hidden="true" /></span><h3>Thank you.</h3><p>We’ll remember for your next stay here.</p></div></>,
    welcome: <><span className={styles.location}><MapPin size={12} aria-hidden="true" />Room 512</span><h3>Welcome back,<br /><em>Amaka.</em></h3>
      <div className={styles.setting}><span>Use my preferences for my stays</span><b className={styles.toggleOn} aria-hidden="true" /></div></>,
    withdrawn: <><span className={styles.location}><MapPin size={12} aria-hidden="true" />Room 512</span><h3>Your choice,<br /><em>always.</em></h3>
      <div className={styles.setting}><span>Use my preferences for my stays</span><b className={styles.toggleOff} aria-hidden="true" /></div></>,
  }[view];
  return <div className={`ib-guest-device ${styles.phone}`}>{top}<div className={styles.phoneBody}>{body}</div></div>;
}

export default function GuestProfileDesk() {
  const [step, setStep] = useState(0);
  const [viewer, setViewer] = useState("desk");
  const [tried, setTried] = useState(false);
  const actionRef = useRef(null);
  const s = STEPS[step];
  const last = step === STEPS.length - 1;

  function advance() {
    setTried(false);
    setStep(step + 1);
    requestAnimationFrame(() => actionRef.current?.focus({ preventScroll: true }));
  }

  function reset() {
    setTried(false);
    setStep(0);
    setViewer("desk");
  }

  const actionButton = (
    <button type="button" className="ib-button ib-button-dark" ref={actionRef} onClick={last ? reset : advance}>
      {last ? <>Start again<RotateCcw size={15} aria-hidden="true" /></> : <>{s.action}<ArrowRight size={16} aria-hidden="true" /></>}
    </button>
  );

  return (
    <section className={`ib-section ib-experience ${styles.desk}`} id="desk">
      <div className="ib-container">
        <SectionHeading eyebrow="THE RETURNING GUEST" title={<>One guest. Two stays.<br /><em>Her choice throughout.</em></>}>
          <p>Follow Amaka from her first stay to her return. See what the team records, what she shares herself, and what changes when she says no.</p>
        </SectionHeading>

        <div className="ib-demo-stage">
          <div className="ib-demo-topline"><span>TRY IT FROM BOTH SIDES</span><span>Illustrative demo · sample guest, rooms and dates</span></div>

          <div className={styles.deskGrid}>
            <div className={styles.side}>
              <div className="ib-demo-label"><span>01 / THE GUEST</span><span><Smartphone size={13} aria-hidden="true" />Guest Companion</span></div>
              <GuestPhone view={s.guest} />
              {(s.side === "guest" || last) && <div className={styles.sideAction}>{actionButton}</div>}
            </div>

            <div className="ib-demo-connector" aria-hidden="true"><span /><ArrowRight size={24} /><span /></div>

            <div className={styles.side}>
              <div className="ib-demo-label"><span>02 / THE HOTEL TEAM</span><span>Step {step + 1} of {STEPS.length}</span></div>
              <div className={styles.profile}>
                <div className={styles.viewer} role="radiogroup" aria-label="View the profile as">
                  {[["desk", "Front desk manager"], ["none", "Staff without access"]].map(([key, label]) => (
                    <button key={key} type="button" role="radio" aria-checked={viewer === key} onClick={() => setViewer(key)}>{label}</button>
                  ))}
                </div>

                <div className={styles.profileHead}>
                  <span className={styles.avatar} aria-hidden="true"><UserRound size={20} /></span>
                  <div><small>GUEST PROFILE</small><b>{GUEST}</b></div>
                  {viewer === "desk" && <span className={`${styles.pill} ${styles[`pill_${s.stay[1]}`]}`}>{s.stay[0]}</span>}
                </div>

                {viewer === "none" ? (
                  <div className={styles.locked} role="status">
                    <Lock size={22} strokeWidth={1.4} aria-hidden="true" />
                    <p><b>No access to guest preferences.</b>An administrator decides which staff can see them.</p>
                  </div>
                ) : (
                  <>
                    {step === 4 || step === 5 ? (
                      <dl className={styles.visits}>
                        <div><dt>Completed stays</dt><dd>2</dd></div>
                        <div><dt>Last checkout</dt><dd>14 Sept</dd></div>
                        <div><dt>From</dt><dd>Bookings</dd></div>
                      </dl>
                    ) : null}
                    <p className={styles.listTitle}>Preferences</p>
                    {s.prefs.length === 0 ? (
                      <p className={styles.none}>None recorded yet.</p>
                    ) : (
                      <ul className={styles.prefs}>
                        {s.prefs.map(({ label, source, Icon }) => (
                          <li key={label}><b>{label}</b><span><Icon size={13} aria-hidden="true" />{source}</span></li>
                        ))}
                      </ul>
                    )}
                    {s.consent && <p className={`${styles.consent} ${styles[`consent_${s.consent[1]}`]}`}>{s.consent[1] === "sage" ? <Check size={14} aria-hidden="true" /> : <CircleDashed size={14} aria-hidden="true" />}{s.consent[0]}</p>}
                  </>
                )}

                {viewer === "desk" && s.side === "team" && <div className={styles.sideAction}>{actionButton}</div>}
                {viewer === "desk" && s.tryAction && !tried && <button type="button" className={styles.tryButton} onClick={() => setTried(true)}>Try: {s.tryAction.label}</button>}
                {viewer === "desk" && s.tryAction && tried && <p className={styles.refusal} role="status"><Ban size={15} aria-hidden="true" /><span>{s.tryAction.refusal}</span></p>}
                {viewer === "none" && s.side === "team" && <p className={styles.switchHint}>Switch back to the front desk manager to continue.</p>}
              </div>
            </div>
          </div>

          <div className="ib-demo-bottom">
            <p>{s.note}</p>
            <button type="button" className="ib-reset" onClick={reset}><RotateCcw size={15} aria-hidden="true" />Reset example</button>
          </div>
          <p className={styles.visuallyHidden} aria-live="polite">{viewer === "none" ? "Viewing as staff without access. Preferences are hidden." : s.note}</p>
        </div>
      </div>
    </section>
  );
}

