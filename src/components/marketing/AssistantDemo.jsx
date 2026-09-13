"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check, FileText, RotateCcw, Sparkles } from "lucide-react";
import { OA_SCENARIOS } from "@/data/operationalAssistantData";

export default function AssistantDemo() {
  const [selected, setSelected] = useState(0);
  const [sent, setSent] = useState(false);
  const [record, setRecord] = useState(false);
  const refs = useRef([]);
  const scenario = OA_SCENARIOS[selected];
  function choose(i) { setSelected(i); setSent(false); setRecord(false); }
  function keydown(e, i) {
    const next = { ArrowRight: (i + 1) % 5, ArrowLeft: (i + 4) % 5, Home: 0, End: 4 }[e.key];
    if (next === undefined) return;
    e.preventDefault(); choose(next); refs.current[next]?.focus();
  }
  return <div className="ib-assistant-demo"><div className="ib-day-tabs" role="tablist" aria-label="Explore the assistant during a hotel day">{OA_SCENARIOS.map((s, i) => <button type="button" key={s.time} role="tab" id={`ib-day-tab-${i}`} aria-controls="ib-assistant-thread" aria-selected={i === selected} tabIndex={i === selected ? 0 : -1} onClick={() => choose(i)} onKeyDown={e => keydown(e, i)} ref={el => { refs.current[i] = el; }}><span>{s.time}</span>{s.role.split(" · ")[0]}</button>)}</div><div className="ib-assistant-workspace" id="ib-assistant-thread" role="tabpanel" aria-labelledby={`ib-day-tab-${selected}`}><div className="ib-assistant-sidebar"><span className="ib-label">YOUR HOTEL / INNBASE</span><Sparkles size={30} strokeWidth={1.2} aria-hidden="true" /><h3>Operational<br /><em>Assistant</em></h3><p>A question from the floor. An answer connected to the operation.</p><span className="ib-assistant-role">{scenario.role}</span><small>Illustrative scenario.<br />No live AI or hotel connection.</small></div><div className="ib-chat-panel"><div className="ib-chat-top"><span>ONE DAY. A CLEARER PICTURE.</span><small>{scenario.time}</small></div><p className="ib-chat-prompt-label">TRY THIS REQUEST</p><div className="ib-user-bubble">{scenario.user}</div><div className="ib-assistant-reply" aria-live="polite" aria-atomic="true">{sent ? <><span className="ib-reply-label"><Sparkles size={15} aria-hidden="true" />INNBASE ASSISTANT</span><p>{scenario.bot}</p><button className="ib-record-toggle" type="button" aria-expanded={record} aria-controls="ib-assistant-record" onClick={() => setRecord(!record)}><FileText size={16} aria-hidden="true" />{record ? "Hide linked example" : "View linked example"}<ArrowRight size={15} aria-hidden="true" /></button><div className="ib-linked-record" id="ib-assistant-record" hidden={!record}><span>MAINTENANCE / ROOM 105</span><h4>Air conditioner not cooling</h4><dl><div><dt>Assigned artisan</dt><dd>Kunle AC Repairs</dd></div><div><dt>Status</dt><dd>Waiting for Artisan</dd></div><div><dt>Source</dt><dd>Example operational record</dd></div></dl></div></> : <p className="ib-chat-waiting">See how a plain-language request connects to work inside Innbase.</p>}</div><div className="ib-chat-actions">{sent ? <button className="ib-reset" type="button" onClick={() => { setSent(false); setRecord(false); }}><RotateCcw size={15} aria-hidden="true" />Reset conversation</button> : <button className="ib-button ib-button-dark" type="button" onClick={() => setSent(true)}>Send example request<ArrowRight size={18} aria-hidden="true" /></button>}<span><Check size={13} aria-hidden="true" />Your team starts the conversation</span></div></div></div><p className="ib-assistant-caption">{scenario.caption}</p></div>;
}
