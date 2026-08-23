import Reveal, { RevealStagger, RevealItem } from "@/components/Reveal";
import { ROLE_ICONS } from "@/components/about/icons";
import { aboutRoleCards } from "@/utils/data";

export default function WhoForSection() {
    return (
        <section className="py-28 bg-ink-soft border-y border-ink-line" id="who-for">
            <div className="wrap">
                <Reveal className="sec-head">
                    <span className="sec-eyebrow">Who we&apos;re building for</span>
                    <h2 className="sec-h2">Built for the people who actually run hotels.</h2>
                    <p className="sec-sub">
                        Sometimes the booking comes from a phone call. Sometimes payment is cash. Sometimes
                        it&apos;s a bank transfer, confirmed over WhatsApp. Sometimes the owner is checking
                        the numbers from home while the hotel is still running, three departments deep into
                        a Friday night.
                    </p>
                    <p className="sec-sub">That&apos;s not an edge case to us. That&apos;s the environment we&apos;re building for.</p>
                </Reveal>

                <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 mt-14">
                    {aboutRoleCards.map((card) => {
                        const RoleIcon = ROLE_ICONS[card.icon];
                        return (
                            <RevealItem
                                key={card.id}
                                as="article"
                                className="rounded-2xl border border-ink-line bg-ink p-6 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-[var(--surface-hover)]"
                            >
                                <span className="w-10 h-10 rounded-[11px] grid place-items-center bg-white/[0.06] text-text-dark">
                                    <RoleIcon />
                                </span>
                                <h4 className="mt-4 text-[14.5px] font-bold text-text-dark">{card.title}</h4>
                                <div className="mt-2.5 text-[11px] font-mono uppercase tracking-wide text-[var(--danger)]">
                                    {card.pain}
                                </div>
                                <p className="mt-1.5 text-[12.5px] text-muted-dark leading-[1.55]">{card.fix}</p>
                            </RevealItem>
                        );
                    })}
                </RevealStagger>

                <Reveal as="p" className="mt-11 text-[19px] font-semibold text-text-dark max-w-[640px] leading-[1.55]">
                    We build for the environment hotels actually operate in —{" "}
                    <span className="font-medium text-muted-dark">not an idealized version of hospitality.</span>
                </Reveal>
            </div>
        </section>
    );
}
