'use client';
import React from 'react';
import { useMaintenanceStore } from '../stores/useMaintenanceStore';
import { useMaintenanceQuery } from '../queries/useMaintenanceQuery';
import { STATUS_META, STATUS_COLOR } from '../queries/mock-projections';
import { healthLevel } from '../utils/helpers';
import { DynamicIcon } from './DynamicIcon';

export function FeedList() {
    const state = useMaintenanceStore();
    const { data } = useMaintenanceQuery();
    if (!data) return null;
    const list = data.feed;

    if (!list.length) {
        return <div className="p-10 text-center text-text-disabled text-xs">Nothing matches this filter.</div>;
    }

    return (
        <div className="flex-1 overflow-y-auto px-3 py-2 pb-4 max-h-180 max-lg:max-h-85">
            {list.map(it => {
                const sm = STATUS_META[it.status as keyof typeof STATUS_META];
                const col = STATUS_COLOR[sm.color as keyof typeof STATUS_COLOR];
                const h = it.health;

                return (
                    <button
                        key={it.id}
                        className={`flex gap-3 px-3 py-3.5 rounded-md cursor-pointer w-full text-left items-start transition-all duration-200 ${state.selectedId === it.id ? 'bg-accent-soft' : 'hover:bg-canvas'}`}
                        onClick={() => state.setSelectedId(it.id)}
                    >
                        <span className="w-2.5 h-2.5 rounded-full flex-none mt-1.25" style={{ background: col.text }}></span>
                        <span className="flex-1 min-w-0">
                            <span className="flex items-baseline gap-2">
                                <span className="font-bold text-sm text-text-primary overflow-hidden text-ellipsis whitespace-nowrap">{it.room}</span>
                                <span className="ml-auto text-xs text-text-disabled flex-none whitespace-nowrap">{it.reportedRel}</span>
                            </span>
                            <div className="text-xs text-text-secondary mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap">{it.title}</div>
                            <span className="text-xs font-semibold mt-1.5 inline-flex items-center gap-1.25" style={{ color: col.text }}>
                                <DynamicIcon name={sm.icon} className="w-2.75 h-2.75" />
                                {sm.short}
                                {it.roomBlocked && <span className="inline-flex items-center gap-1 text-xs font-bold text-danger bg-danger-soft rounded-1.5 px-1.75 py-0.5 ml-2">Blocked</span>}
                                {h && h.score < 70 && (
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-bold ml-1.5 ${healthLevel(h.score) === 'warn' ? 'bg-warning-soft text-warning-text' : 'bg-danger-soft text-danger'}`}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" className="flex-none" style={{ transform: 'rotate(-90deg)' }}>
                                            <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--border-muted)" strokeWidth="3" />
                                            <circle cx="7" cy="7" r="5.5" fill="none" stroke={h.score >= 80 ? 'var(--success-text)' : h.score >= 60 ? 'var(--warning-text)' : 'var(--danger)'} strokeWidth="3" strokeLinecap="round" strokeDasharray={2 * Math.PI * 5.5} strokeDashoffset={(2 * Math.PI * 5.5) * (1 - h.score / 100)} />
                                        </svg>
                                        {h.score}
                                    </span>
                                )}
                            </span>
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
