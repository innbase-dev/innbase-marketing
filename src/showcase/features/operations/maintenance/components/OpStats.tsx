'use client';
import React from 'react';
import { useMaintenanceQuery } from '../queries/useMaintenanceQuery';
import { DynamicIcon } from './DynamicIcon';
import { KpiCard } from '../../../../components/ui/kpi-card';

export function OpStats() {
    const { data } = useMaintenanceQuery();
    if (!data) return null;
    const c = data.counts;
    const cards = [
        { label: 'Active Issues', icon: 'wrench', value: c.active, textCls: c.active ? 'text-danger' : '' },
        { label: 'Rooms Blocked', icon: 'door-closed', value: c.blocked, textCls: c.blocked ? 'text-warning' : '', sub: 'Removed from bookable inventory' },
        { label: 'Awaiting Artisan', icon: 'phone-call', value: c.awaitingArtisan, textCls: '', sub: 'Reported, quoted or waiting' },
        { label: 'Rooms at Risk', icon: 'heart-pulse', value: c.atRisk, textCls: c.atRisk ? 'text-warning' : '', sub: 'Health score below 70' },
        { label: 'Fixed (7 days)', icon: 'check-circle-2', value: c.completed, textCls: 'text-success-text' },
    ];

    return (
        <section className="grid grid-cols-2 xl:grid-cols-5 gap-5" aria-label="Maintenance summary">
            {cards.map((x, i) => (
                <KpiCard
                    key={i}
                    label={x.label}
                    value={x.value}
                    valueClassName={x.textCls}
                    icon={<DynamicIcon name={x.icon} className="w-3.25 h-3.25" />}
                    sub={x.sub}
                />
            ))}
        </section>
    );
}
