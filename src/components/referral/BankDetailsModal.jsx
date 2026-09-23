"use client";

import { useId, useState } from "react";
import PortalDialog from "./PortalDialog";

export default function BankDetailsModal({ initial, onCancel, onSubmit, submitLabel = "Continue" }) {
  const id = useId();
  const [bankName, setBankName] = useState(initial?.bankName ?? "");
  const [accountNumber, setAccountNumber] = useState(initial?.accountNumber ?? "");
  const [accountName, setAccountName] = useState(initial?.accountName ?? "");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!bankName.trim() || !accountName.trim() || !/^\d{10}$/.test(accountNumber)) {
      setError("Enter your bank, account name, and a 10-digit account number.");
      return;
    }
    onSubmit({ bankName: bankName.trim(), accountNumber, accountName: accountName.trim() });
  };

  return (
    <PortalDialog title="Your bank account" onClose={onCancel}>
      <p>These details are remembered in this browser for your account. Saving them does not verify the account or send money.</p>
      <form onSubmit={handleSubmit}>
        <div className="pf-field"><label htmlFor={`${id}-bank`}>Bank name</label><input id={`${id}-bank`} required value={bankName} onChange={(event) => setBankName(event.target.value)} placeholder="e.g. GTBank" /></div>
        <div className="pf-field"><label htmlFor={`${id}-number`}>Account number</label><input id={`${id}-number`} required pattern="[0-9]{10}" maxLength={10} inputMode="numeric" value={accountNumber} onChange={(event) => setAccountNumber(event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10 digits" /></div>
        <div className="pf-field"><label htmlFor={`${id}-name`}>Account name</label><input id={`${id}-name`} required value={accountName} onChange={(event) => setAccountName(event.target.value)} placeholder="As it appears on your bank account" /></div>
        {error && <p className="pf-field-error" role="alert">{error}</p>}
        <button type="submit" className="pf-btn pf-btn-primary pf-full-width">{submitLabel}</button>
      </form>
    </PortalDialog>
  );
}
