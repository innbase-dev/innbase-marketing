import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function AboutCta() {
    return (
        <section className="py-28 bg-ink-soft text-center relative overflow-hidden" id="cta">
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[100px] pointer-events-none opacity-10"
                style={{ background: "radial-gradient(circle, var(--amber) 0%, transparent 70%)" }}
            />
            <div className="wrap relative">
                <Reveal as="h2" className="font-bold tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 4vw, 46px)" }}>
                    We&apos;ve shown you who we are.
                    <br />
                    Now come see what we&apos;re building.
                </Reveal>
                <Reveal as="p" delay={0.08} className="mt-4 text-[15.5px] text-muted-dark max-w-[480px] mx-auto leading-[1.6]">
                    No card, no consultants, no six-week rollout — just an honest look at whether Innbase
                    fits how your hotel actually runs.
                </Reveal>
                <Reveal delay={0.16} className="flex gap-3 justify-center mt-8 flex-wrap">
                    <Link href="/#product" className="btn btn-brass">
                        See Innbase in action
                    </Link>
                    <a
                        href="mailto:hello@innbase.co?subject=Question%20about%20Innbase"
                        className="btn btn-ghost-dark"
                    >
                        Talk to the team
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
