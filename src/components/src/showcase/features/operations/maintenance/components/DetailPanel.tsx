'use client';
import React, { useState } from 'react';
import { useMaintenanceQuery } from '../queries/useMaintenanceQuery';
import { STATUS_META, STATUS_COLOR, STATUS_ORDER } from '../queries/mock-projections';
import { fmt } from '../utils/helpers';
import { DynamicIcon } from './DynamicIcon';
import { useMaintenanceCommands } from '../commands/useMaintenanceCommands';
import { useMaintenanceStore } from '../stores/useMaintenanceStore';
import { Input, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';

/* ─── Private helper ───────────────────────────────────────────────────── */

type LBOption = { value: string; label: string };

const CONTACT_TYPES: LBOption[] = [
    { value: 'call', label: 'Called' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'mail', label: 'Email' },
];

function AppListbox({
    value,
    onChange,
    options,
    className,
}: {
    value: string;
    onChange: (v: string) => void;
    options: LBOption[];
    className?: string;
}) {
    const selected = options.find(o => o.value === value) ?? options[0];
    return (
        <Listbox value={value} onChange={onChange}>
            <div className="relative flex-none">
                <ListboxButton
                    className={`flex items-center justify-between gap-1.5 border border-border rounded-smpx-2.5 py-2 text-xs bg-surface text-text-primary focus:border-accent outline-none data-open:border-accent ${className ?? ''}`}
                >
                    <span>{selected?.label}</span>
                    <ChevronDown className="w-3 h-3 text-text-disabled" />
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom start"
                    className="w-(--button-width) mt-1 max-h-48 overflow-auto rounded-smborder border-border bg-surface shadow-lg z-70 outline-none"
                >
                    {options.map(opt => (
                        <ListboxOption
                            key={opt.value}
                            value={opt.value}
                            className="flex items-center gap-2 px-3 py-2 text-xs text-text-primary cursor-pointer data-[focus]:bg-canvas data-selected:font-semibold"
                        >
                            <Check className="w-3 h-3 shrink-0 invisible data-selected:visible text-accent-strong" />
                            {opt.label}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}

export function DetailPanel() {
    const { data } = useMaintenanceQuery();
    const { contactType, contactNote, setContactType, setContactNote } = useMaintenanceStore();
    const { changeStatus, approveEstimate, recordPayment, toggleRoomBlock, notifyHousekeeping, logCommunication } = useMaintenanceCommands();

    if (!data) return null;
    const it = data?.detail;

    if (!it) {
        return <div className="flex flex-col items-center justify-center h-full text-text-disabled text-xs text-center gap-2 py-15 px-5"><DynamicIcon name="wrench" className="w-6.5 h-6.5 text-text-disabled" />Select an issue from the feed to see its full history.</div>;
    }

    const sm = STATUS_META[it.status as keyof typeof STATUS_META];
    const col = STATUS_COLOR[sm.color as keyof typeof STATUS_COLOR];
    const v = it.vendor;
    const h = it.health;

    return (
        <div className="flex-1 overflow-y-auto px-6 py-5 pb-6 max-h-180">
            <div className="flex items-start gap-3.5">
                <div className="flex-1 min-w-0">
                    <div className="text-lg font-extrabold text-text-primary tracking-[-0.01em]">{it.room}</div>
                    <div className="text-xs text-text-tertiary mt-1">{it.category} · Reported by {it.reportedBy} · {it.reportedAt}{it.propertyWide ? ' · Property-wide impact' : ''}</div>
                    <div className="flex gap-2 mt-2.5 flex-wrap">
                        <span className="text-xs font-bold rounded-full px-3 py-1 inline-flex items-center gap-1.25" style={{ background: col.bg, color: col.text }}>
                            <DynamicIcon name={sm.icon} className="w-2.75 h-2.75" />
                            {sm.label}
                        </span>
                        <span className={`text-xs font-bold rounded-full px-3 py-1 ${it.priority === 'high' ? 'bg-danger-soft text-danger' : it.priority === 'medium' ? 'bg-warning-soft text-warning-text' : 'bg-canvas text-text-tertiary'}`}>{it.priority ? it.priority.charAt(0).toUpperCase() + it.priority.slice(1) : 'Normal'} priority</span>
                    </div>

                    <div className="flex items-start mt-4.5 gap-0">
                        {STATUS_ORDER.map((s, i) => {
                            const meta = STATUS_META[s as keyof typeof STATUS_META];
                            const idx = STATUS_ORDER.indexOf(it.status);
                            const done = i < idx;
                            const current = i === idx;
                            return (
                                <div key={s} className="flex flex-col items-center flex-1 relative min-w-0 group">
                                    {i > 0 && <span className={`absolute top-3.25 left-[-50%] w-full h-0.5 z-0 ${done ? 'bg-accent-strong' : 'bg-border'}`}></span>}
                                    <button className={`w-6.5 h-6.5 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-200 cursor-pointer hover:border-accent-strong ${done ? 'bg-accent-strong border-accent-strong text-text-inverse' : current ? 'bg-surface border-accent-strong text-accent-strong shadow-[0_0_0_3px_var(--success-soft)]' : 'bg-surface border-border text-text-disabled'}`} title={`Set to ${meta.label}`} onClick={() => changeStatus.mutate({ id: it.id, status: s })}>
                                        {done ? <DynamicIcon name="check" className="w-3 h-3" /> : <DynamicIcon name={meta.icon} className="w-3 h-3" />}
                                    </button>
                                    <span className={`text-xs font-bold mt-1.75 text-center leading-[1.3] px-1 max-w-19.5 ${done || current ? 'text-text-primary' : 'text-text-disabled'}`}>{meta.short}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {it.roomBlocked === null && (
                <div className="border border-success-soft bg-accent-soft rounded-md p-3.5 px-4 mt-4 animate-[aiFade_0.28s_ease_both]">
                    <div className="flex items-center gap-2 font-bold text-xs text-accent-strong"><DynamicIcon name="sparkles" className="w-3.5 h-3.5" />Should {it.room} be removed from inventory?</div>
                    <p className="text-xs text-text-secondary my-2 leading-relaxed">This issue is still open — decide whether the space should be blocked from booking while it's being fixed.</p>
                    <div className="flex gap-2">
                        <button className="flex-1 justify-center inline-flex items-center gap-1.5 rounded-smp-2 font-bold text-xs bg-surface-inverse text-text-inverse hover:bg-surface-inverse" onClick={() => toggleRoomBlock.mutate({ id: it.id, blocked: true })}>Yes, block it</button>
                        <button className="flex-1 justify-center inline-flex items-center gap-1.5 rounded-smp-2 font-bold text-xs bg-surface border border-border text-text-primary hover:bg-canvas" onClick={() => toggleRoomBlock.mutate({ id: it.id, blocked: false })}>No, keep it open</button>
                    </div>
                </div>
            )}

            {it.status === 'completed' && !it.cleaningAsked && (
                <div className="border border-success-soft bg-accent-soft rounded-md p-3.5 px-4 mt-4 animate-[aiFade_0.28s_ease_both]">
                    <div className="flex items-center gap-2 font-bold text-xs text-accent-strong"><DynamicIcon name="sparkles" className="w-3.5 h-3.5" />Cleaning required before reopening?</div>
                    <p className="text-xs text-text-secondary my-2 leading-relaxed">The repair is marked complete. Confirm whether housekeeping needs to clean before the space goes back into service.</p>
                    <div className="flex gap-2">
                        <button className="flex-1 justify-center inline-flex items-center gap-1.5 rounded-smp-2 font-bold text-xs bg-surface-inverse text-text-inverse hover:bg-surface-inverse" onClick={() => notifyHousekeeping.mutate({ id: it.id, needsCleaning: true })}>Yes, notify housekeeping</button>
                        <button className="flex-1 justify-center inline-flex items-center gap-1.5 rounded-smp-2 font-bold text-xs bg-surface border border-border text-text-primary hover:bg-canvas" onClick={() => notifyHousekeeping.mutate({ id: it.id, needsCleaning: false })}>No, ready now</button>
                    </div>
                </div>
            )}

            {it.repeatCount >= 3 && (
                <div className="border border-danger-soft bg-danger-soft rounded-md p-3.5 px-4 mt-4 animate-[aiFade_0.28s_ease_both]">
                    <div className="flex items-center gap-2 font-bold text-xs text-danger"><DynamicIcon name="repeat" className="w-3.5 h-3.5" />Recurring issue detected</div>
                    <div className="flex gap-1.5 mt-2.5 flex-wrap">
                        {it.repeatHistory.map((r: any, i: number) => <span key={i} className="text-xs font-bold text-danger bg-surface border border-danger-soft rounded-1.5 px-2 py-0.5">{r.when}</span>)}
                    </div>
                    <p className="text-xs text-text-secondary mt-2 leading-relaxed">This {it.category.toLowerCase()} has failed <b className="text-text-primary">{it.repeatCount} times</b>. Cumulative spend on this asset is <b className="text-text-primary">{fmt(it.spendOnAsset)}</b>{it.asset.estReplacement ? ` against a replacement cost of ~${fmt(it.asset.estReplacement)}` : ''}. {it.spendOnAsset >= it.asset.estReplacement * 0.5 ? <b className="text-text-primary">Recommend permanent replacement</b> : `Worth a conversation with ${v.name} about whether repair still makes sense.`}</p>
                </div>
            )}

            {it.connections.length > 0 && (
                <>
                    <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-widest mt-6 mb-2.5"><DynamicIcon name="git-branch" className="w-3.5 h-3.5 text-text-tertiary" />Connected Elsewhere</div>
                    <div className="flex flex-col gap-2">
                        {it.connections.map((c: any, i: number) => (
                            <div key={i} className="flex items-center gap-2.5 border border-border-muted bg-canvas rounded-md px-3.5 py-2.5 text-xs text-text-secondary">
                                <DynamicIcon name={c.icon} className="w-3.5 h-3.5 text-text-tertiary flex-none" />
                                <span dangerouslySetInnerHTML={{ __html: c.html }}></span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {h && (
                <>
                    <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-widest mt-6 mb-2.5"><DynamicIcon name="heart-pulse" className="w-3.5 h-3.5 text-text-tertiary" />Room Health — {it.room}</div>
                    <div className="flex items-center gap-3.5 p-3.5 px-4 border border-border-muted rounded-md bg-canvas">
                        <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: 'rotate(-90deg)', flex: 'none' }}>
                            <circle cx="22" cy="22" r="19.5" fill="none" stroke="var(--border-muted)" strokeWidth="5" />
                            <circle cx="22" cy="22" r="19.5" fill="none" stroke={h.score >= 80 ? 'var(--success-text)' : h.score >= 60 ? 'var(--warning-text)' : 'var(--danger)'} strokeWidth="5" strokeLinecap="round" strokeDasharray={2 * Math.PI * 19.5} strokeDashoffset={(2 * Math.PI * 19.5) * (1 - h.score / 100)} />
                        </svg>
                        <div className="flex-1 min-w-0">
                            <div className="text-xl font-extrabold text-text-primary tracking-[-0.02em]">{h.score}<span className="text-xs color-[var(--text-tertiary)] font-semibold"> / 100</span></div>
                            <div className="text-xs text-text-tertiary font-semibold mt-px">{h.score >= 80 ? 'Healthy' : h.score >= 60 ? 'Needs watching' : 'Becoming expensive'}</div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {h.reasons.map((r: any, i: number) => <span key={i} className="text-xs font-semibold text-text-secondary bg-surface border border-border rounded-1.75 px-2 py-1">{r}</span>)}
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-widest mt-6 mb-2.5"><DynamicIcon name="phone" className="w-3.5 h-3.5 text-text-tertiary" />External Contact</div>
            <div className="border border-border-muted rounded-md overflow-hidden p-3 px-3.5">
                <div className="flex items-center gap-3 py-1">
                    <span className="w-9.5 h-9.5 rounded-md bg-canvas border border-border flex items-center justify-center text-text-primary flex-none"><DynamicIcon name="hard-hat" className="w-4 h-4" /></span>
                    <span className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-text-primary">{v.name}</div>
                        <div className="text-xs text-text-tertiary mt-0.5">Prefers {it.preferred} · {v.jobs} jobs · <span className={`font-extrabold ${v.completionRate >= 90 ? 'text-success-text' : 'text-warning-text'}`}>{v.completionRate}% completed</span> · avg response {v.avgResponseDays}d · last visit {v.lastVisit}</div>
                    </span>
                    <span className="flex gap-2 flex-none">
                        <button className="border border-border rounded-smpx-3 py-1.5 font-semibold text-xs bg-surface text-text-primary transition-all duration-200 inline-flex items-center gap-1.5 hover:bg-canvas hover:border-border-strong"><DynamicIcon name="phone-call" className="w-3 h-3" />Call</button>
                        <button className="bg-surface-inverse text-text-inverse rounded-smpx-3 py-1.5 font-semibold text-xs transition-all duration-200 inline-flex items-center gap-1.5 hover:bg-surface-inverse"><DynamicIcon name="message-circle" className="w-3 h-3" />WhatsApp</button>
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-widest mt-6 mb-2.5"><DynamicIcon name="messages-square" className="w-3.5 h-3.5 text-text-tertiary" />Calls &amp; Messages</div>
            <div className="border border-border-muted rounded-md px-4 py-1 bg-canvas">
                {it.commLog.length ? it.commLog.map((c: any, i: number) => (
                    <div key={i} className="flex gap-3 py-3 border-b border-dashed border-border [&:last-child]:border-b-0">
                        <span className="w-7 h-7 rounded-smbg-surface border border-border flex items-center justify-center text-text-tertiary flex-none mt-px"><DynamicIcon name={c.type === 'call' ? 'phone-call' : c.type === 'whatsapp' ? 'message-circle' : 'mail'} className="w-3 h-3" /></span>
                        <span className="flex-1 min-w-0">
                            <div className="font-extrabold text-xs text-text-primary">{c.time}</div>
                            <div className="text-xs text-text-secondary mt-0.75 leading-relaxed">{c.note}</div>
                        </span>
                    </div>
                )) : <div className="py-4 text-center text-text-disabled text-xs">No contact logged yet.</div>}
            </div>
            <div className="flex gap-2 mt-2.5">
                <AppListbox value={contactType} onChange={setContactType} options={CONTACT_TYPES} />
                <Input className="flex-1 border border-border rounded-smpx-3 py-2 text-xs outline-none bg-canvas text-text-primary focus:border-accent focus:bg-surface" placeholder="What happened? e.g. Coming tomorrow 9am" value={contactNote} onChange={(e) => setContactNote(e.target.value)} />
                <button className="bg-surface-inverse text-text-inverse rounded-smpx-3.5 py-2 font-bold text-xs flex-none hover:bg-surface-inverse" onClick={() => {
                    if (contactNote.trim()) {
                        logCommunication.mutate({ id: it.id, type: contactType, note: contactNote.trim() });
                        setContactNote('');
                    }
                }}>Log</button>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-widest mt-6 mb-2.5"><DynamicIcon name="banknote" className="w-3.5 h-3.5 text-text-tertiary" />Cost — This Repair</div>
            <div className="border border-border-muted rounded-md overflow-hidden flex flex-col gap-0">
                {it.lineItems.map((li: any, i: number) => (
                    <div key={i} className="flex justify-between px-3.5 py-2.5 text-xs border-b border-border-muted [&:last-child]:border-b-0">
                        <span className="text-text-secondary font-medium">{li.label}</span>
                        <span className="font-bold text-text-primary">{fmt(li.amount)}</span>
                    </div>
                ))}
                <div className="flex justify-between px-3.5 py-2.5 text-xs border-b border-border-muted [&:last-child]:border-b-0 bg-canvas font-extrabold"><span className="text-text-secondary font-medium">Estimate</span><span className="font-bold text-text-primary">{fmt(it.cost.estimate)}</span></div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mt-2.5">
                <div className="bg-canvas border border-border-muted rounded-md px-3 py-3"><div className="text-xs text-text-tertiary font-semibold">Approved</div><div className={`font-bold text-sm text-text-primary mt-1 ${it.cost.approved === false ? 'text-text-disabled text-xs' : ''}`}>{it.cost.approved === null ? 'Pending' : (it.cost.approved ? 'Yes' : 'Awaiting approval')}</div></div>
                <div className="bg-canvas border border-border-muted rounded-md px-3 py-3"><div className="text-xs text-text-tertiary font-semibold">Actual Cost</div><div className={`font-bold text-sm text-text-primary mt-1 ${it.cost.actual === null ? 'text-text-disabled text-xs' : ''}`}>{it.cost.actual === null ? 'Not yet paid' : fmt(it.cost.actual)}</div></div>
                <div className="bg-canvas border border-border-muted rounded-md px-3 py-3"><div className="text-xs text-text-tertiary font-semibold">Payment</div><div className={`font-bold text-sm text-text-primary mt-1 ${it.cost.payment === null ? 'text-text-disabled text-xs' : ''}`}>{it.cost.payment || 'Not yet paid'}</div></div>
            </div>
            {it.cost.approved === false && <div className="mt-2.5"><button className="bg-surface-inverse text-text-inverse rounded-smpx-3 py-1.5 font-semibold text-xs inline-flex items-center gap-1.5 transition-all duration-200 hover:bg-surface-inverse" onClick={() => approveEstimate.mutate(it.id)}><DynamicIcon name="check" className="w-3 h-3" />Approve estimate</button></div>}
            {(it.status === 'completed' && it.cost.actual === null) && <div className="mt-2.5"><button className="bg-surface-inverse text-text-inverse rounded-smpx-3 py-1.5 font-semibold text-xs inline-flex items-center gap-1.5 transition-all duration-200 hover:bg-surface-inverse" onClick={() => recordPayment.mutate(it.id)}><DynamicIcon name="banknote" className="w-3 h-3" />Record payment</button></div>}

            <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-widest mt-6 mb-2.5"><DynamicIcon name="history" className="w-3.5 h-3.5 text-text-tertiary" />Cost History — This Asset</div>
            {(it.costHistory || []).length > 0 ? (
                <>
                    <div className="flex flex-col mt-0.5">
                        {it.costHistory.map((c: any, i: number) => (
                            <div key={i} className="flex items-center gap-2.5 py-2 border-b border-border-muted text-xs [&:last-child]:border-b-0">
                                <span className="w-22 flex-none text-text-tertiary font-semibold">{c.when}</span>
                                <span className="flex-1 text-text-secondary">{c.note}</span>
                                <span className="font-bold text-text-primary flex-none">{fmt(c.amount)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center py-2.5 pb-1 text-xs font-extrabold text-text-primary"><span>Total spent on this asset</span><span>{fmt(it.spendOnAsset)}</span></div>
                    {it.spendOnAsset >= (it.asset.estReplacement || 99999999) * 0.5 && (
                        <div className="border border-warning bg-warning-soft rounded-md p-3.5 px-4 mt-3">
                            <div className="flex items-center gap-2 font-bold text-xs text-warning-text"><DynamicIcon name="lightbulb" className="w-3.5 h-3.5" />Replacement may be cheaper now</div>
                            <p className="text-xs text-text-secondary mt-2 leading-relaxed">You've spent <b className="text-text-primary">{fmt(it.spendOnAsset)}</b> repairing this {it.category.toLowerCase()} this year — close to half the ~{fmt(it.asset.estReplacement!)} cost of a new unit.</p>
                        </div>
                    )}
                </>
            ) : <div className="text-text-disabled text-xs py-1.5">No prior repairs on file for this asset.</div>}

            <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-widest mt-6 mb-2.5"><DynamicIcon name="door-open" className="w-3.5 h-3.5 text-text-tertiary" />Room Impact</div>
            <div className="flex flex-col gap-0 border border-border-muted rounded-md overflow-hidden">
                <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border-muted text-xs [&:last-child]:border-b-0">
                    <span className="text-text-secondary font-medium">Blocked from booking</span>
                    <div className="inline-flex border border-border rounded-smoverflow-hidden">
                        <button className={`px-3 py-1 font-bold text-xs ${it.roomBlocked === true ? 'bg-danger text-text-inverse' : 'bg-surface text-text-tertiary'}`}>Yes</button>
                        <button className={`px-3 py-1 font-bold text-xs ${it.roomBlocked === false ? 'bg-surface-inverse text-text-inverse' : 'bg-surface text-text-tertiary'}`}>No</button>
                    </div>
                </div>
                <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border-muted text-xs [&:last-child]:border-b-0">
                    <span className="text-text-secondary font-medium">Guest relocation needed</span>
                    <span className="text-text-tertiary font-semibold text-xs">{it.status === 'completed' ? 'Not needed' : 'No — vacant'}</span>
                </div>
                {it.status === 'completed' && (
                    <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border-muted text-xs [&:last-child]:border-b-0">
                        <span className="text-text-secondary font-medium">Cleaning before reopening</span>
                        <span className={`font-bold text-xs ${it.needsCleaning ? 'text-warning-text' : 'text-success-text'}`}>
                            {it.needsCleaning === null ? 'Not yet confirmed' : (it.needsCleaning ? 'Requested from Housekeeping' : 'Not required')}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-widest mt-6 mb-2.5"><DynamicIcon name="paperclip" className="w-3.5 h-3.5 text-text-tertiary" />Attachments</div>
            <div className="flex gap-2 flex-wrap">
                {it.attachments.map((a: any, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1.75 border border-border bg-surface rounded-smpx-3 py-2 text-xs font-semibold text-text-primary hover:bg-canvas">
                        <DynamicIcon name={a.type === 'photo' ? 'image' : a.type === 'video' ? 'video' : 'file-text'} className="w-3.25 h-3.25 text-text-tertiary" />
                        {a.name}
                    </span>
                ))}
                <button className="border-2 border-dashed border-border rounded-smpx-3 py-2 text-xs font-semibold text-text-disabled inline-flex items-center gap-1.5 hover:border-border-strong hover:text-text-primary"><DynamicIcon name="plus" className="w-3 h-3" />Add photo</button>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-widest mt-6 mb-2.5"><DynamicIcon name="history" className="w-3.5 h-3.5 text-text-tertiary" />Timeline</div>
            <div className="mt-0.5">
                {it.timeline.map((t: any, i: number) => (
                    <div key={i} className="flex gap-3 py-2.5 relative">
                        {i < it.timeline.length - 1 && <span className="absolute left-3.25 top-8 bottom--0.5 w-px bg-border-muted z-0"></span>}
                        <span className="w-6.75 h-6.75 rounded-smborder border-success-soft bg-success-soft text-success-text flex items-center justify-center flex-none z-10"><DynamicIcon name={t.icon} className="w-3.25 h-3.25" /></span>
                        <span className="flex-1 min-w-0 pt-0.75">
                            <div className="font-semibold text-xs text-text-primary">{t.label}</div>
                            <div className="text-xs text-text-tertiary mt-px">{t.time}</div>
                        </span>
                    </div>
                ))}
            </div>

            {it.repeatHistory.length > 0 && (
                <>
                    <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-widest mt-6 mb-2.5"><DynamicIcon name="rotate-ccw" className="w-3.5 h-3.5 text-text-tertiary" />Previous Incidents · {it.room}</div>
                    <div className="flex flex-col gap-0 border border-border-muted rounded-md overflow-hidden">
                        {it.repeatHistory.map((r: any, i: number) => (
                            <div key={i} className="flex justify-between items-center px-3.5 py-2.5 border-b border-border-muted text-xs [&:last-child]:border-b-0">
                                <span className="font-semibold text-text-primary">{r.label}</span>
                                <span className="text-text-tertiary">{r.when}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-widest mt-6 mb-2.5"><DynamicIcon name="box" className="w-3.5 h-3.5 text-text-tertiary" />Asset</div>
            <div className="flex flex-col gap-0 border border-border-muted rounded-md overflow-hidden">
                <div className="flex justify-between items-center px-3.5 py-2.5 border-b border-border-muted text-xs [&:last-child]:border-b-0"><span className="text-text-tertiary font-medium">Asset</span><span className="font-bold text-text-primary text-right">{it.asset.name}</span></div>
                <div className="flex justify-between items-center px-3.5 py-2.5 border-b border-border-muted text-xs [&:last-child]:border-b-0"><span className="text-text-tertiary font-medium">Installed</span><span className="font-bold text-text-primary text-right">{it.asset.installed}</span></div>
                <div className="flex justify-between items-center px-3.5 py-2.5 border-b border-border-muted text-xs [&:last-child]:border-b-0"><span className="text-text-tertiary font-medium">Warranty</span><span className="font-bold text-text-primary text-right">{it.asset.warranty}</span></div>
                <div className="flex justify-between items-center px-3.5 py-2.5 border-b border-border-muted text-xs [&:last-child]:border-b-0"><span className="text-text-tertiary font-medium">Est. replacement cost</span><span className="font-bold text-text-primary text-right">{it.asset.estReplacement ? fmt(it.asset.estReplacement) : '—'}</span></div>
                <div className="flex justify-between items-center px-3.5 py-2.5 border-b border-border-muted text-xs [&:last-child]:border-b-0"><span className="text-text-tertiary font-medium">Vendor</span><span className="font-bold text-text-primary text-right">{v.name}</span></div>
            </div>
        </div>
    );
}
