"use client";

import { useState } from "react";
import { usePortal } from "./PortalContext";

export default function ReferModal() {
  const { referModalOpen, closeReferModal, referrer } = usePortal();
  const [copied, setCopied] = useState(false);

  if (!referModalOpen) return null;

  const link = `https://${referrer.referralLink}`;
  const whatsappText = encodeURIComponent(
    `I think your hotel could use Innbase — here's my referral link: ${link}`
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="pf-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="refer-modal-title"
      onClick={(e) => e.target === e.currentTarget && closeReferModal()}
    >
      <div className="pf-modal">
        <div className="pf-modal-head">
          <h2 id="refer-modal-title">Know a hotel that could use Innbase?</h2>
          <button type="button" className="pf-modal-close" onClick={closeReferModal} aria-label="Close">
            ×
          </button>
        </div>
        <p>Send them your referral link, or just tell them to mention your name.</p>

        <div className="pf-copy-row">
          <span>{referrer.referralLink}</span>
          <button type="button" onClick={handleCopy}>{copied ? "Copied" : "Copy link"}</button>
        </div>

        <div className="pf-share-row">
          <a
            className="pf-btn pf-btn-dark"
            href={`https://wa.me/?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on WhatsApp
          </a>
        </div>

        <div className="pf-alt-note">
          <strong>Don&apos;t have their contact details? That&apos;s okay.</strong>
          Tell them to mention your name when they speak with Innbase — we&apos;ll link the referral to you either way.
        </div>
      </div>
    </div>
  );
}
