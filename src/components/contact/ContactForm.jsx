"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import {
    REASONS,
    REASON_ORDER,
    IMPROVE_CHIPS,
    ISSUE_TYPES,
    PARTNER_TYPES,
} from "@/data/contactData";

export default function ContactForm() {
    const [reason, setReason] = useState("sales");
    const [improve, setImprove] = useState(new Set());
    const [issueType, setIssueType] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [ref, setRef] = useState("");

    const cfg = REASONS[reason];

    function toggleChip(chip) {
        setImprove((prev) => {
            const next = new Set(prev);
            next.has(chip) ? next.delete(chip) : next.add(chip);
            return next;
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setRef("INQ-" + Math.floor(10000 + Math.random() * 89999));
        setSubmitted(true);
    }

    function handleNewInquiry() {
        setSubmitted(false);
        setReason("sales");
        setImprove(new Set());
        setIssueType(null);
    }

    return (
        <div>
            <span className="reason-label">What brings you here?</span>
            <div
                className="reason-grid"
                role="radiogroup"
                aria-label="Reason for contacting Innbase"
            >
                {REASON_ORDER.map((key) => {
                    const r = REASONS[key];
                    const active = reason === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            className={`reason-card${active ? " active" : ""}`}
                            role="radio"
                            aria-checked={active}
                            onClick={() => setReason(key)}
                        >
                            <span className="r-ico">
                                <Icon
                                    name={r.icon}
                                    className="icon"
                                    style={{ width: 17, height: 17 }}
                                />
                            </span>
                            <b>{r.label}</b>
                            <span>{r.labelSub}</span>
                        </button>
                    );
                })}
            </div>

            <div className="form-card">
                {!submitted ? (
                    <div>
                        <div className="form-head">
                            <div>
                                <h2>{cfg.title}</h2>
                                <p>{cfg.sub}</p>
                            </div>
                            <span className="r-ico">
                                <Icon name={cfg.icon} className="icon" />
                            </span>
                        </div>

                        {cfg.note && (
                            <div className="form-note">
                                <Icon name="info" className="icon" />
                                <div>
                                    <strong>Already inside Innbase?</strong> For
                                    faster help with your day-to-day operations,
                                    use Help &amp; Support inside your workspace
                                    — it already knows your hotel, account, and
                                    history.
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {reason === "sales" && (
                                <div>
                                    <div className="field-row">
                                        <div className="field">
                                            <label htmlFor="rooms">
                                                Number of rooms{" "}
                                                <span className="opt">
                                                    (optional)
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                id="rooms"
                                                name="rooms"
                                                placeholder="e.g. 24"
                                                min={0}
                                            />
                                        </div>
                                        <div className="field">
                                            <label htmlFor="staff">
                                                Number of staff{" "}
                                                <span className="opt">
                                                    (optional)
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                id="staff"
                                                name="staff"
                                                placeholder="e.g. 12"
                                                min={0}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>
                                            What are you looking to improve?{" "}
                                            <span className="opt">
                                                (optional — pick any)
                                            </span>
                                        </label>
                                        <div className="chip-group">
                                            {IMPROVE_CHIPS.map((chip) => (
                                                <button
                                                    key={chip}
                                                    type="button"
                                                    className={`chip${improve.has(chip) ? " active" : ""}`}
                                                    onClick={() =>
                                                        toggleChip(chip)
                                                    }
                                                >
                                                    {chip}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="using">
                                            What are you currently using?{" "}
                                            <span className="opt">
                                                (optional)
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="using"
                                            name="using"
                                            placeholder="Paper, spreadsheets, another system..."
                                        />
                                    </div>
                                </div>
                            )}

                            {reason === "support" && (
                                <div>
                                    <div className="field">
                                        <label>How can we help?</label>
                                        <div className="radio-group">
                                            {ISSUE_TYPES.map((issue) => (
                                                <label
                                                    className={`radio-opt${issueType === issue ? " active" : ""}`}
                                                    key={issue}
                                                    onClick={() =>
                                                        setIssueType(issue)
                                                    }
                                                >
                                                    <input
                                                        type="radio"
                                                        name="issueType"
                                                        value={issue}
                                                        checked={
                                                            issueType === issue
                                                        }
                                                        onChange={() =>
                                                            setIssueType(issue)
                                                        }
                                                    />
                                                    {issue}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="hotelName">Hotel</label>
                                        <input
                                            type="text"
                                            id="hotelName"
                                            name="hotelName"
                                            placeholder="Your hotel or business name"
                                        />
                                    </div>
                                </div>
                            )}

                            {reason === "partnership" && (
                                <div>
                                    <div className="field">
                                        <label htmlFor="orgName">
                                            Company / organization
                                        </label>
                                        <input
                                            type="text"
                                            id="orgName"
                                            name="orgName"
                                            placeholder="Your company name"
                                        />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="partnerType">
                                            What kind of partnership?{" "}
                                            <span className="opt">
                                                (optional)
                                            </span>
                                        </label>
                                        <select
                                            id="partnerType"
                                            name="partnerType"
                                            defaultValue=""
                                        >
                                            <option value="">Select one</option>
                                            {PARTNER_TYPES.map((t) => (
                                                <option key={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="field-row">
                                <div className="field">
                                    <label htmlFor="name">Your name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Full name"
                                        required
                                    />
                                </div>
                                {reason !== "partnership" && (
                                    <div className="field">
                                        <label htmlFor="business">
                                            Hotel / Business{" "}
                                            <span className="opt">
                                                (optional)
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="business"
                                            name="business"
                                            placeholder="e.g. Cruizze Hotel & Lounge"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="field-row">
                                <div className="field">
                                    <label htmlFor="phone">
                                        Phone / WhatsApp
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="+234 ..."
                                    />
                                    <p className="field-hint">
                                        We may reach out on WhatsApp or by phone
                                        about your enquiry.
                                    </p>
                                </div>
                                <div className="field">
                                    <label htmlFor="email">Work email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="you@yourhotel.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="message">
                                    {cfg.messageLabel}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder={cfg.placeholder}
                                />
                            </div>

                            <div className="form-footer">
                                <button type="submit" className="btn btn-brass">
                                    <span>{cfg.submit}</span>
                                    <Icon
                                        name="arrow-right"
                                        className="icon"
                                        style={{ width: 15, height: 15 }}
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="confirm-state">
                        <div className="confirm-tick">
                            <Icon name="check" className="icon" />
                        </div>
                        <h2>Message received</h2>
                        <p>
                            {reason === "support"
                                ? "Thanks — we've received your request and will follow up using the contact details you provided."
                                : "Thanks — we've received your enquiry and will get back to you using the contact details you provided."}
                        </p>
                        <div className="confirm-ref">
                            <span>Reference</span> <span>{ref}</span>
                        </div>
                        <div className="confirm-actions">
                            <a
                                href="https://wa.me/2349064169441"
                                target="_blank"
                                rel="noopener"
                                className="btn btn-brass"
                            >
                                <Icon
                                    name="message-circle"
                                    className="icon"
                                    style={{ width: 15, height: 15 }}
                                />
                                Continue on WhatsApp
                            </a>
                            <button
                                type="button"
                                className="btn btn-ghost-dark"
                                onClick={handleNewInquiry}
                            >
                                Send another enquiry
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
