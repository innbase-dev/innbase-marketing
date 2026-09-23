"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function PortalDialog({ title, onClose, busy = false, children }) {
  return (
    <Dialog open onClose={() => { if (!busy) onClose(); }} className="pf pf-dialog-root">
      <div className="pf-modal-overlay">
        <DialogPanel className="pf-modal" aria-busy={busy}>
          <div className="pf-modal-head">
            <DialogTitle as="h2">{title}</DialogTitle>
            <button type="button" className="pf-modal-close" onClick={onClose} disabled={busy} aria-label="Close">×</button>
          </div>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
