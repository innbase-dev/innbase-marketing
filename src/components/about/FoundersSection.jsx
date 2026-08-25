"use client"
import Reveal from "@/components/Reveal";
import { FOUNDERS } from "@/data/aboutData";
import Link from "next/link";

export default function FoundersSection() {
    return (
        <section className="sec" id="founders">
            <div className="dot-grain" />
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Who&apos;s building it</span>
                    <h2 className="sec-h2">
                        Two people, two disciplines, one product.
                    </h2>
                    <p className="sec-sub">
                        Innbase isn&apos;t a faceless software company.
                        It&apos;s built by two founders who split the work along
                        product and engineering, and agree on almost everything
                        else.
                    </p>
                </Reveal>

                <Reveal className="fq-list reveal-stag reveal">
                    {FOUNDERS.map((f) => (
                        <div className="fq-card" key={f.name}>
                            {f.image ? (
                                <img
                                    className="fq-avatar"
                                    src={f.image}
                                    alt={f.name}
                                    style={{ objectFit: "cover" }}
                                />
                            ) : (
                                <span
                                    className="fq-avatar"
                                    style={{ background: f.color }}
                                >
                                    {f.initials}
                                </span>
                            )}
                            <div className="fq-body">
                                <p className="fq-quote">{f.quote}</p>
                                <div className="fq-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {f.name}
                                    {f.linkedin && (
                                        <Link
                                            href={f.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="fq-linkedin"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                <rect x="2" y="9" width="4" height="12"></rect>
                                                <circle cx="4" cy="4" r="2"></circle>
                                            </svg>
                                        </Link>
                                    )}
                                </div>
                                <div className="fq-role">
                                    Founder &amp; {f.role} of Innbase
                                </div>
                                <div className="fq-sign">
                                    {f.name.split("")}
                                </div>
                            </div>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
