'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Wallet, Receipt, Megaphone, Copy, Thermometer, Scale, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const NOTIFICATIONS = [
    { id: 'al1', sev: 'crit', icon: Wallet, title: 'Outstanding payment', sub: 'Andrew Nweke · Room 305 · ₦18,500 due by checkout', time: '12m ago', unread: true, group: 'new' },
    { id: 'al6', sev: 'warn', icon: Receipt, title: 'Restaurant tab exceeds room deposit', sub: 'Room 305 · tab ₦42,000 vs deposit ₦30,000', time: '38m ago', unread: true, group: 'new' },
    { id: 'INC-238', sev: 'warn', icon: Megaphone, title: 'Noise complaint — Room 305', sub: 'Andrew Nweke · 3rd complaint in 6 months · investigating', time: '1h ago', unread: true, group: 'new' },
    { id: 'al7', sev: 'warn', icon: Copy, title: 'Duplicate booking detected', sub: 'Aisha Bello · same dates, two references', time: 'Today, 9:15 AM', unread: false, group: 'earlier' },
    { id: 'INC-237', sev: 'low', icon: Thermometer, title: 'AC unit failed again — Room 410', sub: '6th report in 60 days · part on order', time: 'Today, 8:10 AM', unread: false, group: 'earlier' },
    { id: 'al10', sev: 'low', icon: Scale, title: 'POS reconciliation pending', sub: 'Bar 2 · yesterday’s till still open', time: 'Yesterday', unread: false, group: 'earlier' },
];

export function NotificationPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [tab, setTab] = useState<'all' | 'unread'>('all');
    const [readIds, setReadIds] = useState<Set<string>>(new Set());

    const unreadCount = NOTIFICATIONS.filter(n => n.unread && !readIds.has(n.id)).length;
    const visibleNotifs = tab === 'unread' ? NOTIFICATIONS.filter(n => n.unread && !readIds.has(n.id)) : NOTIFICATIONS;

    const newNotifs = visibleNotifs.filter(n => n.group === 'new');
    const earlierNotifs = visibleNotifs.filter(n => n.group === 'earlier');

    const markAllRead = () => {
        const newReadIds = new Set(readIds);
        NOTIFICATIONS.forEach(n => newReadIds.add(n.id));
        setReadIds(newReadIds);
    };

    const handleRead = (id: string) => {
        const newReadIds = new Set(readIds);
        newReadIds.add(id);
        setReadIds(newReadIds);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-89 bg-transparent" onClick={onClose} />
            <div className="fixed top-5 left-21.5 w-98 max-w-[calc(100vw-106px)] bg-surface border border-border rounded-3.5 shadow-lg z-90 flex flex-col max-h-[min(640px,calc(100vh-40px))] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div className="flex items-center gap-2.5 px-4.5 py-3.5 border-b border-border-muted flex-none">
                    <h3 className="text-sm font-bold text-text-primary m-0 leading-none">Notifications</h3>
                    {unreadCount > 0 && (
                        <span className="text-xs font-bold text-danger bg-danger-soft rounded-full px-2 py-0.5">{unreadCount} new</span>
                    )}
                    <button onClick={markAllRead} className="ml-auto text-xs font-semibold text-accent-strong hover:underline cursor-pointer">Mark all read</button>
                </div>

                <div className="flex gap-1 px-3.5 pt-2.5 flex-none">
                    <button onClick={() => setTab('all')} className={clsx("px-3 py-1.5 rounded-md font-semibold text-xs transition-colors cursor-pointer", tab === 'all' ? "bg-canvas-subtle text-accent-strong" : "text-text-tertiary hover:bg-canvas hover:text-text-primary")}>All</button>
                    <button onClick={() => setTab('unread')} className={clsx("px-3 py-1.5 rounded-md font-semibold text-xs transition-colors cursor-pointer", tab === 'unread' ? "bg-canvas-subtle text-accent-strong" : "text-text-tertiary hover:bg-canvas hover:text-text-primary")}>Unread</button>
                </div>

                <div className="overflow-y-auto flex-1 px-2 py-1.5">
                    {visibleNotifs.length === 0 ? (
                        <div className="py-11 px-5 text-center text-text-disabled text-xs">You&apos;re all caught up.</div>
                    ) : (
                        <>
                            {newNotifs.length > 0 && (
                                <>
                                    <div className="text-xs font-bold text-text-disabled uppercase tracking-[0.06em] px-2.5 pt-3 pb-1.5">New</div>
                                    {newNotifs.map(n => <NotifItem key={n.id} n={n} read={readIds.has(n.id)} onClick={() => handleRead(n.id)} />)}
                                </>
                            )}
                            {earlierNotifs.length > 0 && (
                                <>
                                    <div className="text-xs font-bold text-text-disabled uppercase tracking-[0.06em] px-2.5 pt-3 pb-1.5">Earlier</div>
                                    {earlierNotifs.map(n => <NotifItem key={n.id} n={n} read={readIds.has(n.id)} onClick={() => handleRead(n.id)} />)}
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className="border-t border-border-muted p-3 flex-none">
                    <Link href="/dashboard/alerts" className="flex items-center justify-center gap-2 w-full p-2.5 rounded-md font-semibold text-xs text-text-primary hover:bg-canvas transition-colors">
                        <ExternalLink className="w-3.25 h-3.25 text-text-tertiary" />
                        View all in Alerts & Events
                    </Link>
                </div>
            </div>
        </>
    );
}

function NotifItem({ n, read, onClick }: any) {
    const isUnread = n.unread && !read;
    const sevClasses = {
        crit: "bg-danger-soft text-danger border-danger-soft",
        warn: "bg-warning-soft text-accent-warm border-warning-soft",
        low: "bg-canvas text-text-tertiary border-border-muted"
    };

    return (
        <button onClick={onClick} className={clsx("flex items-start gap-3 w-full text-left p-2.5 rounded-2.5 relative transition-colors hover:bg-canvas group cursor-pointer")}>
            {isUnread && <span className="absolute left-0.75 top-4.5 w-1.5 h-1.5 rounded-full bg-accent-strong" />}

            <div className={clsx("w-8 h-8 rounded-md grid place-items-center flex-none border", sevClasses[n.sev as keyof typeof sevClasses])}>
                <n.icon className="w-3.75 h-3.75" strokeWidth={2} />
            </div>

            <div className="flex-1 min-w-0 pr-2">
                <div className="font-bold text-xs text-text-primary leading-[1.35]">{n.title}</div>
                <div className="text-xs text-text-tertiary mt-0.5 leading-[1.4]">{n.sub}</div>
            </div>

            <div className="text-xs text-text-disabled whitespace-nowrap flex-none pt-0.5">{n.time}</div>
        </button>
    );
}
