"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

const TIMELINE_EVENTS = [
    {
        time: "07:30",
        label: "Morning Briefing",
        prompt: "What's outstanding from yesterday?",
        response: "There are 3 unresolved maintenance tickets from the night shift and 2 VIP arrivals pending room assignments.",
    },
    {
        time: "09:15",
        label: "Front Desk Rush",
        prompt: "Create a housekeeping task to check 204.",
        response: "Task created for Housekeeping: Inspect Room 204. Status: Pending.",
    },
    {
        time: "12:40",
        label: "Maintenance Check",
        prompt: "Has the AC issue in 302 been resolved?",
        response: "Yes. Maintenance logged the repair at 11:15 AM. Ticket #4092 is closed.",
    },
    {
        time: "16:20",
        label: "Management Review",
        prompt: "Show me today's outstanding tasks.",
        response: "You have 4 open tasks: 2 maintenance requests, 1 guest complaint follow-up, and 1 inventory check.",
    },
    {
        time: "22:10",
        label: "Shift Close",
        prompt: "What still needs attention tonight?",
        response: "All critical tasks are closed. Reminder: Security walk scheduled for 23:00.",
    }
];

function TimelineEvent({ event, index }) {
    return (
        <div style={{ display: 'flex', gap: '32px', position: 'relative', paddingBottom: index === TIMELINE_EVENTS.length - 1 ? 0 : '80px' }}>
            
            {/* Timeline Line & Dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--brand-brass)', border: '4px solid var(--ink-base)', zIndex: 2 }}></div>
                {index !== TIMELINE_EVENTS.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: 'var(--ink-line)', marginTop: '8px', marginBottom: '8px' }}></div>
                )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, paddingBottom: '32px', marginTop: '-4px' }}>
                <Reveal>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '24px', fontFamily: 'monospace', color: 'var(--brand-brass)', fontWeight: 600 }}>{event.time}</span>
                        <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-sub)' }}>{event.label}</span>
                    </div>
                </Reveal>

                {/* Chat Interaction */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.4 }}
                        style={{ alignSelf: 'flex-start', background: 'var(--ink-soft)', padding: '16px 20px', borderRadius: '16px 16px 16px 0', border: '1px solid var(--ink-line)', color: 'var(--fg-base)', fontSize: '15px', maxWidth: '80%' }}
                    >
                        "{event.prompt}"
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        style={{ alignSelf: 'flex-start', background: 'rgba(201, 147, 46, 0.1)', padding: '16px 20px', borderRadius: '0 16px 16px 16px', border: '1px solid rgba(201, 147, 46, 0.3)', color: 'var(--fg-base)', fontSize: '15px', maxWidth: '80%', display: 'flex', gap: '12px' }}
                    >
                        <Icon name="sparkles" className="icon" style={{ color: 'var(--brand-brass)', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ lineHeight: 1.5 }}>{event.response}</span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default function DayInTheLifeTimeline() {
    return (
        <section className="sec" id="timeline" style={{ padding: '100px 0', background: 'var(--ink-base)' }}>
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">A day in the life</span>
                    <h2 className="sec-h2">
                        One assistant. <br/>A full hotel day.
                    </h2>
                    <p className="sec-sub">
                        See how the Operational Assistant seamlessly fits into every stage of your team's shift, keeping operations moving without friction.
                    </p>
                </Reveal>

                <div style={{ maxWidth: 640, margin: '80px auto 0' }}>
                    {TIMELINE_EVENTS.map((event, index) => (
                        <TimelineEvent key={event.time} event={event} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
