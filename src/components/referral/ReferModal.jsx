"use client";

import { useRef, useState } from "react";
import { usePortal } from "./PortalContext";
import PortalDialog from "./PortalDialog";

export default function ReferModal() {
  const { closeReferModal, referrer, referHotel, isReferHotelPending } = usePortal();
  const [copyMessage, setCopyMessage] = useState("");
  const [businessDisplayName, setBusinessDisplayName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [submittedName, setSubmittedName] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const linkInput = useRef(null);
  const link = referrer.referralLink;
  const whatsappText = encodeURIComponent(`I think your hotel could use Innbase — here's my referral link: ${link}`);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopyMessage("Link copied.");
    } catch {
      linkInput.current?.focus();
      linkInput.current?.select();
      setCopyMessage("Select and copy the link above.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!businessDisplayName.trim() || isReferHotelPending) return;
    setSubmitError(null);
    const name = businessDisplayName.trim();
    try {
      await referHotel({ businessDisplayName: name, contactName: contactName.trim() || null, contactPhone: contactPhone.trim() || null });
      setSubmittedName(name);
    } catch (error) {
      setSubmitError(error?.message ?? "We could not submit this referral. Please try again.");
    }
  };

  return (
    <PortalDialog title="Know a hotel that could use Innbase?" onClose={closeReferModal} busy={isReferHotelPending}>
      <p>Send them your referral link, or just tell them to mention your name.</p>
      <div className="pf-copy-row">
        <input ref={linkInput} aria-label="Your referral link" readOnly value={link} onFocus={(event) => event.target.select()} />
        <button type="button" onClick={handleCopy}>Copy link</button>
      </div>
      <p className="pf-help-text" role="status">{copyMessage}</p>
      <div className="pf-share-row">
        <a className="pf-btn pf-btn-dark" href={`https://wa.me/?text=${whatsappText}`} target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
      </div>
      <div className="pf-alt-note"><strong>Don&apos;t have their contact details? That&apos;s okay.</strong>Tell them to mention your name when they speak with Innbase — we&apos;ll confirm the referral with you.</div>
      <div className="pf-section-title" style={{ marginTop: 24 }}><h3>Or tell us directly</h3></div>
      {submittedName ? (
        <p role="status">Thanks — we&apos;ve logged <strong>{submittedName}</strong>. You&apos;ll see it appear in your referrals shortly.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isReferHotelPending}>
            <div className="pf-field"><label htmlFor="refer-business-name">Hotel name</label><input id="refer-business-name" required value={businessDisplayName} onChange={(event) => setBusinessDisplayName(event.target.value)} placeholder="e.g. Royal Suites Hotel" /></div>
            <div className="pf-field"><label htmlFor="refer-contact-name">Contact name (optional)</label><input id="refer-contact-name" autoComplete="name" value={contactName} onChange={(event) => setContactName(event.target.value)} /></div>
            <div className="pf-field"><label htmlFor="refer-contact-phone">Contact phone (optional)</label><input id="refer-contact-phone" type="tel" autoComplete="tel" value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} /></div>
            {submitError && <p className="pf-field-error" role="alert">{submitError}</p>}
            <button type="submit" className="pf-btn pf-btn-primary pf-full-width" disabled={!businessDisplayName.trim()}>{isReferHotelPending ? "Submitting…" : "Submit referral"}</button>
          </fieldset>
        </form>
      )}
    </PortalDialog>
  );
}
