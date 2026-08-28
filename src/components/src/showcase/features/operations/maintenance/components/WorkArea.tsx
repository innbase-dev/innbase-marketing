'use client';
import React from 'react';
import { useMaintenanceStore } from '../stores/useMaintenanceStore';
import { ISSUES, STATUS_ORDER, STATUS_META, AREAS, AREA_ICON } from '../queries/mock-projections';
import { DynamicIcon } from './DynamicIcon';
import { FeedList } from './FeedList';
import { DetailPanel } from './DetailPanel';
import { Input } from '@headlessui/react';

export function WorkArea() {
    const { status, area, query, setStatus, setArea, setQuery } = useMaintenanceStore();

    const Q = [
        { id: 'all', label: 'All', count: ISSUES.length },
        ...STATUS_ORDER.map(s => ({ id: s, label: STATUS_META[s as keyof typeof STATUS_META].short, count: ISSUES.filter(i => i.status === s).length }))
    ];

    const per = AREAS.map(a => ({ name: a, n: ISSUES.filter(i => i.area === a).length }));

    return (
        <section className="bg-surface border border-border rounded-1.5 transition-all duration-200 hover:shadow-hover hover:border-border-strong flex flex-col">
            <div className="flex flex-col px-6 pt-5 border-b border-border-muted">
                <div className="flex gap-2 flex-wrap pb-3.5">
                    {Q.map(q => (
                        <button key={q.id} className={`relative inline-flex items-center gap-1.75 border border-border rounded-full px-3.5 py-1.5 font-semibold text-xs transition-all duration-200 ${status === q.id ? 'bg-surface-inverse border-surface-inverse text-text-inverse' : 'text-text-tertiary bg-surface hover:bg-canvas hover:text-text-primary hover:border-border-strong'}`} onClick={() => setStatus(q.id)}>
                            {q.label}<span className={`min-w-4.5 h-4.5 rounded-full inline-grid place-items-center text-xs font-bold px-1.5 ${status === q.id ? 'bg-surface/20 text-text-inverse' : 'bg-color-surface-inverse/10'}`}>{q.count}</span>
                        </button>
                    ))}
                </div>
                <div className="flex gap-2 flex-wrap pb-4">
                    <button className={`inline-flex items-center gap-1.75 px-3 py-1.5 rounded-full border font-semibold text-xs transition-all duration-200 ${area === 'all' ? 'bg-surface-inverse text-text-inverse border-surface-inverse' : 'border-border text-text-tertiary bg-surface hover:bg-canvas hover:text-text-primary hover:border-border-strong'}`} onClick={() => setArea('all')}>
                        <DynamicIcon name="layout-grid" className="w-3 h-3" />All Areas
                    </button>
                    {per.map(a => (
                        <button key={a.name} className={`inline-flex items-center gap-1.75 px-3 py-1.5 rounded-full border font-semibold text-xs transition-all duration-200 ${area === a.name ? 'bg-surface-inverse text-text-inverse border-surface-inverse' : 'border-border text-text-tertiary bg-surface hover:bg-canvas hover:text-text-primary hover:border-border-strong'}`} onClick={() => setArea(a.name)}>
                            <DynamicIcon name={AREA_ICON[a.name as keyof typeof AREA_ICON]} className="w-3 h-3" />
                            {a.name}<span className="opacity-55 font-bold">{a.n}</span>
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 border border-border rounded-md px-3 h-9.5 min-w-55 bg-surface shadow-sm mb-4 w-fit">
                    <DynamicIcon name="search" className="w-3.75 h-3.75 text-text-disabled" />
                    <Input className="border-none outline-none flex-1 text-xs bg-transparent" placeholder="Search room, issue, artisan…" value={query} onChange={e => setQuery(e.target.value)} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] items-stretch min-h-140">
                <div className="flex flex-col min-w-0 border-b lg:border-b-0 lg:border-r border-border-muted">
                    <FeedList />
                </div>
                <div className="flex flex-col min-w-0">
                    <DetailPanel />
                </div>
            </div>
        </section>
    );
}
