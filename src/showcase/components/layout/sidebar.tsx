'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { LucideIcon, Clock, X, ChevronsUpDown } from 'lucide-react';

export interface SidebarItem {
    label: string;
    href: string;
    icon: LucideIcon;
    active?: boolean;
}

interface SidebarProps {
    items?: SidebarItem[];
}

export function Sidebar({ items = [] }: SidebarProps) {
    const pathname = usePathname();
    const [trialDismissed, setTrialDismissed] = useState(false);

    return (
        <nav
            className="sticky top-0 flex h-full w-65 flex-none flex-col gap-0.5 border-r border-border bg-surface px-4 pb-5 pt-6 font-medium max-225:hidden"
            aria-label="Sections"
        >
            {items.map((item) => {
                const isActive = item.active !== undefined ? item.active : pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                            'group flex w-full items-center gap-3 rounded-md px-3.5 py-2.5 text-left text-sm transition-colors duration-200',
                            isActive
                                ? 'bg-canvas-subtle font-semibold text-accent-strong'
                                : 'font-medium text-text-tertiary hover:bg-canvas hover:text-text-primary',
                        )}
                    >
                        <item.icon
                            className={clsx(
                                'h-4.5 w-4.5 transition-colors duration-200',
                                isActive ? 'text-accent-strong' : 'text-text-disabled group-hover:text-text-primary',
                            )}
                            strokeWidth={1.8}
                        />
                        {item.label}
                    </Link>
                );
            })}

            <div className="flex-1" />

            {!trialDismissed && (
                <div className="relative mb-4 rounded-md border border-border bg-surface p-4 shadow-sm">
                    <span className="inline-flex items-center gap-1.75 rounded-full bg-surface-inverse px-3 py-1.5 text-xs font-semibold text-text-inverse">
                        <Clock className="h-3.25 w-3.25" strokeWidth={1.8} />
                        20 days left
                    </span>
                    <button
                        onClick={() => setTrialDismissed(true)}
                        className="absolute right-3.5 top-3.5 grid h-6.5 w-6.5 place-items-center rounded-md bg-canvas text-text-disabled transition-colors duration-200 hover:bg-danger-soft hover:text-danger"
                        aria-label="Dismiss"
                    >
                        <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </button>
                    <p className="my-3 text-xs leading-relaxed text-text-tertiary">
                        Upgrade to premium and enjoy full access
                    </p>
                    <button className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-xs font-semibold text-text-primary transition-colors duration-200 hover:border-surface-inverse hover:bg-surface-inverse hover:text-text-inverse">
                        View Plan
                    </button>
                </div>
            )}

            <div className="mb-8 flex items-center gap-3 rounded-md border border-border bg-surface px-3.5 py-3 shadow-sm">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-linear-to-br from-accent-warm to-accent-warm font-bold text-text-inverse">
                    GE
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-text-primary">
                        Grand Emperium Hotel
                    </span>
                    <span className="text-xs text-text-tertiary">inn-987332h</span>
                </span>
                <ChevronsUpDown className="h-4 w-4 text-text-disabled" strokeWidth={1.8} />
            </div>
        </nav>
    );
}