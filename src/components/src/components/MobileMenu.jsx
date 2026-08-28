"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
import { COMPANY_MENU_ITEMS } from "@/data/companyMenuData";

export default function MobileMenu({ open, onClose, pathname }) {
    const isCurrent = (path) => pathname === path;

    return (
        <div
            className={`mobile-menu${open ? " open" : ""}`}
            hidden={!open}
            onClick={(e) => {
                if (e.target === e.currentTarget || e.target.closest("a"))
                    onClose();
            }}
        >
            <div
                className="mobile-menu-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
            >
                <div className="mobile-menu-head">
                    <Link href="/" className="mobile-menu-brand" aria-label="Innbase home">
                        <Image
                            src="/images/innbase-light.svg"
                            alt="Innbase"
                            width={132}
                            height={28}
                            priority
                        />
                    </Link>
                    <button
                        type="button"
                        className="mobile-menu-close"
                        aria-label="Close menu"
                        onClick={onClose}
                    >
                        <X className="icon" strokeWidth={1.8} />
                    </button>
                </div>

                <div className="mobile-menu-scroll">
                    <span className="mobile-menu-label">Product</span>
                    <Link href="/#product">
                        How it works
                        <ChevronRight className="mm-chevron" />
                    </Link>
                    <Link href="/#demo">
                        Try the live demo
                        <ChevronRight className="mm-chevron" />
                    </Link>
                    <Link href="/#reconciliation">
                        Why it&apos;s trustworthy
                        <ChevronRight className="mm-chevron" />
                    </Link>

                    <span className="mobile-menu-label">Company</span>
                    {COMPANY_MENU_ITEMS.map((item) => (
                        <Link
                            href={item.href}
                            key={item.key}
                            className={isCurrent(item.href) ? "current" : undefined}
                        >
                            {item.title}
                            <ChevronRight className="mm-chevron" />
                        </Link>
                    ))}

                    <span className="mobile-menu-label">More</span>
                    <Link
                        href="/pricing"
                        className={isCurrent("/pricing") ? "current" : undefined}
                    >
                        Pricing
                        <ChevronRight className="mm-chevron" />
                    </Link>
                    <Link href="/#faq">
                        FAQ
                        <ChevronRight className="mm-chevron" />
                    </Link>
                </div>

                <div className="mm-cta-row">
                    <a href="https://app.innbase.co/login" className="btn btn-ghost-dark">
                        Log in
                    </a>
                    <Link href="/contact" className="btn btn-brass">
                        Book a demo
                    </Link>
                </div>
            </div>
        </div>
    );
}