"use client";

export default function MobileMenu({ open, onClose }) {
  return (
    <div
      className={`mobile-menu${open ? " open" : ""}`}
      hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target.closest("a")) onClose();
      }}
    >
      <div className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Site menu">
        <span className="mobile-menu-label">Product</span>
        <a href="#product">How it works</a>
        <a href="#demo">Try the live demo</a>
        <a href="#reconciliation">Why it&apos;s trustworthy</a>
        <span className="mobile-menu-label">Company</span>
        <a href="#roles">Who it&apos;s for</a>
        <a href="#stories">Customers</a>
        <a href="pricing.html">Pricing</a>
        <a href="#faq">FAQ</a>
        <div className="mm-cta-row">
          <a href="auth.html" className="btn btn-ghost-dark">
            Log in
          </a>
          <a href="#cta" className="btn btn-brass">
            Book a demo
          </a>
        </div>
      </div>
    </div>
  );
}
