"use client";

import { useState } from "react";
import BankDetailsModal from "./BankDetailsModal";
import { useClerk } from "@clerk/nextjs";
import { usePortal } from "./PortalContext";

export default function AccountPage() {
  const { referrer, beneficiary, saveBeneficiary } = usePortal();
  const { signOut } = useClerk();
  const [bankOpen, setBankOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");
  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    setError("");
    try { await signOut({ redirectUrl: "/refer" }); }
    catch { setError("We could not sign you out. Please try again."); }
    finally { setSigningOut(false); }
  };

  return (
    <div>
      <div className="pf-greeting">
        <h1>Account</h1>
        <p>Your details, bank account, and notification preferences.</p>
      </div>

      <div className="pf-section-title"><h2>Personal details</h2></div>
      <div className="pf-list" style={{ marginBottom: 32 }}>
        <div className="pf-account-row"><span>Name</span><span>{referrer.displayName}</span></div>
        <div className="pf-account-row"><span>Email</span><span>{referrer.email}</span></div>
        <div className="pf-account-row"><span>Referral link</span><span>{referrer.referralLink}</span></div>
        <div className="pf-account-row">
          <span>Status</span>
          <span className={`pf-pill pf-pill-${referrer.status === "ACTIVE" ? "success" : "closed"}`}>
            {referrer.status === "ACTIVE" ? "Active" : referrer.status}
          </span>
        </div>
      </div>

      <div className="pf-section-title"><h2>Bank account</h2></div>
      <div className="pf-list" style={{ marginBottom: 32 }}>
        {beneficiary ? (
          <>
            <div className="pf-account-row"><span>Bank</span><span>{beneficiary.bankName}</span></div>
            <div className="pf-account-row"><span>Account</span><span>····{beneficiary.accountNumber.slice(-4)}</span></div>
            <div className="pf-account-row">
              <span>Account name</span>
              <span>{beneficiary.accountName}</span>
            </div>
          </>
        ) : (
          <div className="pf-account-row">
            <span>No bank account added yet</span>
            <button type="button" className="pf-btn pf-btn-outline" onClick={() => setBankOpen(true)}>Add bank account</button>
          </div>
        )}
        {beneficiary && (
          <div className="pf-account-row">
            <span />
            <button type="button" className="pf-btn pf-btn-outline" onClick={() => setBankOpen(true)}>Change bank account</button>
          </div>
        )}
      </div>

      <div className="pf-section-title"><h2>Notifications</h2></div>
      <div className="pf-list" style={{ marginBottom: 32 }}>
        <div className="pf-account-row"><span>Referral updates</span><span>WhatsApp &amp; email</span></div>
        <div className="pf-account-row"><span>Reward alerts</span><span>WhatsApp &amp; email</span></div>
      </div>

      <button
        type="button"
        className="pf-btn pf-btn-outline"
        onClick={handleSignOut}
        disabled={signingOut}
      >
        {signingOut ? "Signing out…" : "Sign out"}
      </button>
      {error && <p role="alert" className="pf-field-error">{error}</p>}
      {bankOpen && <BankDetailsModal initial={beneficiary} onCancel={() => setBankOpen(false)} submitLabel="Save bank details" onSubmit={(fields) => { saveBeneficiary(fields); setBankOpen(false); }} />}
    </div>
  );
}
