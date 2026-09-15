"use client";

import { usePortal } from "./PortalContext";

export default function AccountPage() {
  const { referrer } = usePortal();

  return (
    <div>
      <div className="pf-greeting">
        <h1>Account</h1>
        <p>Your details, bank account, and notification preferences.</p>
      </div>

      <div className="pf-section-title"><h2>Personal details</h2></div>
      <div className="pf-list" style={{ marginBottom: 32 }}>
        <div className="pf-account-row"><span>Name</span><span>{referrer.fullName}</span></div>
        <div className="pf-account-row"><span>Referral code</span><span>{referrer.referralCode}</span></div>
      </div>

      <div className="pf-section-title"><h2>Bank account</h2></div>
      <div className="pf-list" style={{ marginBottom: 32 }}>
        <div className="pf-account-row"><span>Bank</span><span>{referrer.bank.bankName}</span></div>
        <div className="pf-account-row"><span>Account</span><span>····{referrer.bank.last4}</span></div>
        <div className="pf-account-row">
          <span>Status</span>
          <span className="pf-pill pf-pill-success">Verified</span>
        </div>
      </div>

      <div className="pf-section-title"><h2>Notifications</h2></div>
      <div className="pf-list" style={{ marginBottom: 32 }}>
        <div className="pf-account-row"><span>Referral updates</span><span>WhatsApp &amp; email</span></div>
        <div className="pf-account-row"><span>Reward alerts</span><span>WhatsApp &amp; email</span></div>
      </div>

      <button type="button" className="pf-btn pf-btn-outline">Sign out</button>
    </div>
  );
}
