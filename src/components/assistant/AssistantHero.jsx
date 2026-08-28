"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

export default function AssistantHero() {
    const [typingProgress, setTypingProgress] = useState(0);
    const fullText = "Innbase, create a maintenance task for room 204. The AC isn't cooling.";
    
    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setTypingProgress(i + 1);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 40); // typing speed
        return () => clearInterval(typingInterval);
    }, []);

    const showResponse = typingProgress === fullText.length;

    return (
        <section className="sec" id="hero" style={{ paddingTop: '80px', paddingBottom: '80px', overflow: 'hidden' }}>
            <div className="wrap">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 800, margin: '0 auto', gap: '24px' }}>
                    <Reveal>
                        <h1 className="sec-h2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '24px' }}>
                            Meet your hotel's <br/><span style={{ color: 'var(--brand-brass)' }}>Operational Assistant</span>
                        </h1>
                        <p className="sec-sub" style={{ fontSize: '1.25rem', color: 'var(--fg-sub)', marginBottom: '40px' }}>
                            The extra pair of hands that never gets tired of the routine. From creating tasks and updating records to answering operational questions, Innbase works alongside your team so they can spend less time pushing data around and more time running the hotel.
                        </p>
                    </Reveal>

                    {/* Console Simulation */}
                    <Reveal delay={0.2} style={{ width: '100%', maxWidth: '640px' }}>
                        <div style={{ 
                            background: 'var(--ink-soft)', 
                            border: '1px solid var(--ink-line)', 
                            borderRadius: '16px', 
                            overflow: 'hidden',
                            boxShadow: '0 24px 40px -12px rgba(0,0,0,0.5)'
                        }}>
                            {/* Window Header */}
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                padding: '12px 16px', 
                                borderBottom: '1px solid var(--ink-line)',
                                background: 'rgba(0,0,0,0.2)'
                            }}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }}></div>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }}></div>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }}></div>
                                </div>
                                <span style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: '12px', color: 'var(--fg-dim)', fontFamily: 'monospace' }}>innbase-assistant</span>
                            </div>

                            {/* Chat Body */}
                            <div style={{ padding: '24px', textAlign: 'left', minHeight: '200px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* User Prompt */}
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Icon name="user" className="icon" style={{ width: 14, height: 14, color: 'var(--fg-sub)' }} />
                                    </div>
                                    <div style={{ background: 'var(--ink-line)', padding: '12px 16px', borderRadius: '0 16px 16px 16px', color: 'var(--fg-base)', fontSize: '15px', lineHeight: 1.5 }}>
                                        {fullText.substring(0, typingProgress)}
                                        {typingProgress < fullText.length && <span style={{ opacity: 0.5 }}>|</span>}
                                    </div>
                                </div>

                                {/* Assistant Response */}
                                {showResponse && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.4 }}
                                        style={{ display: 'flex', gap: '12px', marginTop: '8px' }}
                                    >
                                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--brand-brass)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Icon name="sparkles" className="icon" style={{ width: 14, height: 14, color: '#fff' }} />
                                        </div>
                                        <div style={{ border: '1px solid var(--ink-line)', padding: '16px', borderRadius: '0 16px 16px 16px', color: 'var(--fg-base)', fontSize: '15px', lineHeight: 1.5, background: 'rgba(255,255,255,0.02)', width: '100%' }}>
                                            <div style={{ fontWeight: 600, marginBottom: '8px' }}>Done.</div>
                                            <p style={{ color: 'var(--fg-sub)', marginBottom: '12px' }}>Maintenance task created for Room 204.</p>
                                            
                                            <div style={{ display: 'flex', gap: '8px', fontSize: '13px' }}>
                                                <span style={{ padding: '4px 8px', background: 'var(--ink-soft)', borderRadius: '4px', border: '1px solid var(--ink-line)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#27c93f' }}></div> Open
                                                </span>
                                                <span style={{ padding: '4px 8px', background: 'var(--ink-soft)', borderRadius: '4px', border: '1px solid var(--ink-line)' }}>
                                                    Priority: Normal
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
