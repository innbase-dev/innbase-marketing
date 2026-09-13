"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Check, RotateCcw } from "lucide-react";
import { REASONS, REASON_ORDER, IMPROVE_CHIPS, ISSUE_TYPES, PARTNER_TYPES } from "@/data/contactData";
import { Eyebrow } from "./Primitives";

export default function ContactPage() {
  const [reason, setReason] = useState("sales");
  const [plan, setPlan] = useState("");
  const [draft, setDraft] = useState(null);
  const draftHeading = useRef(null);
  const formHeading = useRef(null);
  const cfg = REASONS[reason];
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    // URL values arrive only in the browser; sync optional CTA context once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (REASON_ORDER.includes(query.get("reason"))) setReason(query.get("reason"));
    if (["boutique", "base", "growth", "enterprise"].includes(query.get("plan"))) setPlan(query.get("plan"));
  }, []);
  function prepare(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const labels = { name: "Name", business: "Hotel / business", email: "Email", phone: "Phone", rooms: "Rooms", staff: "Staff", using: "Currently using", issue: "Issue", organization: "Organization", partnership: "Partnership type", message: "Message" };
    const lines = Object.entries(labels).filter(([key]) => data.get(key)?.trim()).map(([key, label]) => `${label}: ${data.get(key).trim()}`);
    const improvements = data.getAll("improve");
    if (improvements.length) lines.push(`Looking to improve: ${improvements.join(", ")}`);
    if (plan) lines.push(`Plan of interest: ${plan}`);
    const subject = `Innbase ${reason === "sales" ? "demo enquiry" : reason === "support" ? "support request" : reason === "partnership" ? "partnership enquiry" : "enquiry"}`;
    setDraft({ subject, body: lines.join("\n\n") });
    requestAnimationFrame(() => draftHeading.current?.focus());
  }
  function edit() { setDraft(null); requestAnimationFrame(() => formHeading.current?.focus()); }
  return <section className="ib-contact-section"><div className="ib-container ib-contact-layout"><aside className="ib-contact-intro"><Eyebrow>LET’S TALK</Eyebrow><h1>Your hotel.<br />Your questions.<br /><em>We’re listening.</em></h1><p>Whether you’re exploring Innbase, need a hand, or see a way to work together — start here.</p><div className="ib-contact-note"><span>FOR A PRODUCT CONVERSATION</span><h2>Bring us your<br /><em>everyday challenges.</em></h2><ol><li><span>01</span>Tell us how your operation works.</li><li><span>02</span>Walk through what Innbase can do.</li><li><span>03</span>Find the right next step together.</li></ol></div><div className="ib-contact-direct"><a href="mailto:hello@innbase.co"><Mail size={19} aria-hidden="true" />hello@innbase.co<ArrowUpRight size={16} aria-hidden="true" /></a><a href="https://wa.me/2349064169441"><MessageCircle size={19} aria-hidden="true" />Start a conversation on WhatsApp<ArrowUpRight size={16} aria-hidden="true" /></a></div></aside>
    <div className="ib-contact-form-area"><div hidden={Boolean(draft)}><fieldset className="ib-contact-reasons"><legend>What brings you here?</legend>{REASON_ORDER.map(key => <label key={key}><input type="radio" name="contact-reason" value={key} checked={reason === key} onChange={() => setReason(key)} /><span><b>{REASONS[key].label}</b><small>{REASONS[key].labelSub}</small></span></label>)}</fieldset><div className="ib-contact-form"><div className="ib-contact-form-head"><h2 ref={formHeading} tabIndex={-1}>{cfg.title}</h2><p>A little context helps us make the conversation useful.</p>{plan && <span className="ib-interest-tag">Exploring the {plan} plan</span>}</div>{reason === "support" && <p className="ib-form-note">Already in Innbase? Help &amp; Support inside your workspace has your hotel and account context. <a href="https://app.innbase.co/login">Open Innbase ↗</a></p>}<form onSubmit={prepare}>
      <div className="ib-field-row"><label className="ib-field">Your name<input name="name" autoComplete="name" required placeholder="Full name" /></label><label className="ib-field">Work email<input name="email" type="email" autoComplete="email" required placeholder="you@yourhotel.com" /></label></div><div className="ib-field-row"><label className="ib-field">Hotel / business<input name="business" autoComplete="organization" placeholder="Your hotel or business name" /></label><label className="ib-field">Phone / WhatsApp <small>Optional</small><input name="phone" type="tel" autoComplete="tel" placeholder="+234 …" /></label></div>
      {reason === "sales" && <><div className="ib-field-row"><label className="ib-field">Number of rooms <small>Optional</small><input name="rooms" type="number" min="0" placeholder="e.g. 24" /></label><label className="ib-field">Number of staff <small>Optional</small><input name="staff" type="number" min="0" placeholder="e.g. 12" /></label></div><fieldset className="ib-improvements"><legend>What would you like to improve? <small>Pick any</small></legend>{IMPROVE_CHIPS.map(chip => <label key={chip}><input type="checkbox" name="improve" value={chip} /><span>{chip}</span></label>)}</fieldset><label className="ib-field">What are you currently using? <small>Optional</small><input name="using" placeholder="Paper, spreadsheets, another system…" /></label></>}
      {reason === "support" && <label className="ib-field">How can we help?<select name="issue" defaultValue=""><option value="">Choose an issue type</option>{ISSUE_TYPES.map(issue => <option key={issue}>{issue}</option>)}</select></label>}
      {reason === "partnership" && <><label className="ib-field">Organization<input name="organization" placeholder="Your company or organization" /></label><label className="ib-field">Partnership type<select name="partnership" defaultValue=""><option value="">Choose a partnership type</option>{PARTNER_TYPES.map(type => <option key={type}>{type}</option>)}</select></label></>}
      <label className="ib-field">{cfg.messageLabel}<textarea name="message" placeholder={cfg.placeholder} rows={5} required /></label><button type="submit" className="ib-button ib-button-dark">Prepare my message<ArrowRight size={17} aria-hidden="true" /></button><p className="ib-form-disclosure">Review your message, then send it through your email app or WhatsApp. This form does not submit it automatically.</p><p className="ib-form-privacy">How we handle your information: <Link href="/legal#privacy">Privacy policy</Link>.</p>
    </form></div></div>
    {draft && <div className="ib-contact-draft"><span className="ib-success-icon"><Check size={27} aria-hidden="true" /></span><h2 ref={draftHeading} tabIndex={-1}>Your message is ready.</h2><p>Nothing has been sent yet. Choose where you’d like to send it.</p><label className="ib-field">Message preview<textarea readOnly value={draft.body} rows={12} /></label><a className="ib-button ib-button-dark" href={`mailto:hello@innbase.co?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}><Mail size={18} aria-hidden="true" />Open email app</a><a className="ib-text-link" href={`https://wa.me/2349064169441?text=${encodeURIComponent(draft.subject + "\n\n" + draft.body)}`} target="_blank" rel="noopener noreferrer">Continue on WhatsApp<ArrowUpRight size={17} aria-hidden="true" /></a><button type="button" className="ib-reset" onClick={edit}><RotateCcw size={16} aria-hidden="true" />Edit your message</button><small>You send the message from the app you choose. If it doesn’t open, you can copy the preview and email hello@innbase.co.</small></div>}
    </div></div></section>;
}
