"use client";

import { useRef } from "react";
import { ArrowRight, Check, CheckCheck, MapPin, RotateCcw, Utensils, BellRing, Bath, Wrench, Hotel, MessageCircle } from "lucide-react";
import { GUEST_SCENARIOS } from "@/data/guestDemo";
import { SectionHeading } from "./Primitives";

export const GUEST_SERVICES = [
  { key: "food", label: "Food & drinks", Icon: Utensils }, { key: "room", label: "Room service", Icon: BellRing },
  { key: "housekeeping", label: "Housekeeping", Icon: Bath }, { key: "maintenance", label: "Maintenance", Icon: Wrench },
  { key: "services", label: "Hotel services", Icon: Hotel }, { key: "help", label: "A little help", Icon: MessageCircle },
];

export default function GuestDemo({ selected, onSelect, stage, setStage }) {
  const tabs = useRef([]);
  const teamAction = useRef(null);
  const sendAction = useRef(null);
  const resetAction = useRef(null);
  const s = GUEST_SCENARIOS[selected];
  const ServiceIcon = GUEST_SERVICES.find(item => item.key === selected).Icon;
  const status = ["Preview", "New request", "In progress", "Completed"][stage];
  const event = ["Send the guest’s request to see it arrive here.", `Request received with ${s.location.toLowerCase()} context. Ready for ${s.department}.`, `${s.department} has accepted the request and is taking care of it.`, s.complete][stage];
  function choose(key) { setStage(0); onSelect(key); }
  function keydown(e, i) {
    const next = { ArrowRight: (i + 1) % 6, ArrowLeft: (i + 5) % 6, Home: 0, End: 5 }[e.key];
    if (next === undefined) return;
    e.preventDefault(); choose(GUEST_SERVICES[next].key); tabs.current[next]?.focus();
  }
  function send() { if (stage !== 0) return; setStage(1); requestAnimationFrame(() => teamAction.current?.focus({ preventScroll: true })); }
  function advance() { if (stage !== 1 && stage !== 2) return; setStage(stage + 1); if (stage === 2) requestAnimationFrame(() => resetAction.current?.focus({ preventScroll: true })); }
  function reset() { setStage(0); requestAnimationFrame(() => sendAction.current?.focus({ preventScroll: true })); }

  return <section className="ib-section ib-experience" id="experience"><div className="ib-container">
    <SectionHeading eyebrow="THE GUEST EXPERIENCE" title={<>Little things make<br /><em>a great stay.</em></>}><p>A drink after a long journey. A fresh set of towels. Help when it matters. See how a small request becomes a clear next step for your team.</p></SectionHeading>
    <div className="ib-scenario-tabs" role="tablist" aria-label="Choose a guest request">{GUEST_SERVICES.map(({ key, label, Icon }, i) => <button key={key} type="button" role="tab" id={`ib-tab-${key}`} aria-controls="ib-guest-demo" aria-selected={selected === key} tabIndex={selected === key ? 0 : -1} ref={el => { tabs.current[i] = el; }} onKeyDown={e => keydown(e, i)} onClick={() => choose(key)}><Icon size={18} aria-hidden="true" />{label}</button>)}</div>
    <div className="ib-demo-stage" id="ib-guest-demo" role="tabpanel" aria-labelledby={`ib-tab-${selected}`}>
      <div className="ib-demo-topline"><span>TRY IT FROM BOTH SIDES</span><span>Illustrative demo · no real request is sent</span></div>
      <div className="ib-demo-grid"><div className="ib-guest-panel"><div className="ib-demo-label"><span>01 / THE GUEST</span><span><MapPin size={13} aria-hidden="true" />{s.location}</span></div><div className="ib-guest-device"><div className="ib-device-top"><b>Your stay.</b><span>Guest Companion</span></div>
        {stage === 0 ? <div className="ib-request-content"><span className="ib-service-icon"><ServiceIcon size={26} aria-hidden="true" /></span><h3>{s.heading}</h3><p>{s.subtitle}</p><div className="ib-request-item"><strong>{s.item}</strong><span>{s.quantity}</span></div><div className="ib-request-detail"><span>{s.detailLabel}</span><b>{s.detail}</b></div><button className="ib-button ib-button-dark ib-send" type="button" ref={sendAction} onClick={send}>Send example request <ArrowRight size={17} aria-hidden="true" /></button><small>{s.footnote}</small></div> : <div className="ib-request-success"><span className="ib-success-icon"><CheckCheck size={28} aria-hidden="true" /></span><h3>{stage === 3 ? "Taken care of." : "You’re all set."}</h3><p>{s.record}<br />{s.location}</p><span className="ib-status">{stage === 3 ? "Completed" : stage === 2 ? "Your team is on it" : "Your hotel has your request"}</span><small>{stage === 3 ? "That’s one less thing to think about." : "Now try the team’s side of the experience."}</small></div>}
      </div></div><div className="ib-demo-connector" aria-hidden="true"><span /><ArrowRight size={24} /><span /></div>
      <div className="ib-team-panel"><div className="ib-demo-label"><span>02 / THE HOTEL TEAM</span><span>Innbase operations</span></div><div className={`ib-team-workspace ib-stage-${stage}`}><div className="ib-record-bar"><span>{s.recordKind}</span><span className={`ib-status ${stage === 3 ? "is-complete" : ""}`}>{status}</span></div><div className="ib-record-body"><h3>{s.record}</h3><p className="ib-record-context">{s.location} · Guest Companion</p><dl><div><dt>Assigned to</dt><dd>{s.department}</dd></div><div><dt>{s.teamDetailLabel}</dt><dd>{s.teamDetail}</dd></div></dl><ol className="ib-progress">{["Received", "In progress", "Completed"].map((label, i) => <li key={label} className={stage > i ? "is-active" : ""}><span>{stage > i ? <Check size={12} aria-hidden="true" /> : i + 1}</span>{label}</li>)}</ol><p className="ib-record-event" role="status" aria-live="polite" aria-atomic="true">{event}</p><button type="button" ref={teamAction} className="ib-button ib-button-dark" disabled={stage === 0 || stage === 3} onClick={advance}>{["Waiting for the guest’s request", s.start, s.finish, "Example complete"][stage]}{stage > 0 && stage < 3 && <ArrowRight size={17} aria-hidden="true" />}</button></div><div className="ib-record-footer">Guest context, service, and completion — together.</div></div></div></div>
      <div className="ib-demo-bottom"><p>{s.note}</p><button type="button" className="ib-reset" ref={resetAction} onClick={reset}><RotateCcw size={15} aria-hidden="true" />Reset example</button></div>
    </div>
  </div></section>;
}
