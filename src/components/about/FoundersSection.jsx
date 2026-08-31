"use client"
import Reveal from "@/components/Reveal";
import { FOUNDERS } from "@/data/aboutData";
import Link from "next/link";

function LinkedinIcon({ size = 16 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

function XIcon({ size = 15 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.988l4.26 5.632 4.746-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
        </svg>
    );
}

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
                                            aria-label={`${f.name} on LinkedIn`}
                                        >
                                            <LinkedinIcon size={16} />
                                        </Link>
                                    )}
                                    {f.twitter && (
                                        <Link
                                            href={f.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="fq-linkedin"
                                            aria-label={`${f.name} on X (Twitter)`}
                                        >
                                            <XIcon size={15} />
                                        </Link>
                                    )}
                                </div>
                                <div className="fq-role">
                                    Co-Founder
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
