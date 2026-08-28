'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import {
    LayoutGrid,
    CalendarCog,
    Landmark,
    Truck,
    Users,
    PieChart,
    Bell,
    Settings,
    Info,
} from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { NotificationPanel } from './notification-panel';

const MAIN_NAV = [
    { icon: LayoutGrid, href: '/dashboard', label: 'Dashboard' },
    { icon: CalendarCog, href: '/operations/rooms', label: 'Operations' },
    { icon: Landmark, href: '/commerce/sales', label: 'Commerce' },
    { icon: Truck, href: '/inventory', label: 'Inventory' },
    { icon: Users, href: '/workforce/shift', label: 'Workforce' },
    { icon: PieChart, href: '/reports', label: 'Reports' },
];

/** Icon-rail button wrapper that shows a small dark tooltip to the right on hover/focus. */
function RailTooltip({ label, children }: { label: string; children: ReactNode }) {
    const [show, setShow] = useState(false);

    return (
        <div
            className="relative flex"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onFocus={() => setShow(true)}
            onBlur={() => setShow(false)}
        >
            {children}
            <span
                role="tooltip"
                className={clsx(
                    'pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-surface-inverse px-2.5 py-2.5 text-sm font-semibold text-text-inverse shadow-lg transition-all duration-150',
                    'before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-rail',
                    show ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0',
                )}
            >
                {label}
            </span>
        </div>
    );
}

export function IconRail({ activeHref }: { activeHref?: string } = {}) {
    const pathname = usePathname();
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    return (
        <aside
            className="flex h-full w-19 flex-none sticky top-0 bottom-0 z-50 flex-col items-center gap-1.5 bg-rail py-5"
            aria-label="Primary"
        >
            <div className="mb-6 grid h-10 w-10 place-items-center rounded-2.5" aria-label="Innbase">
                <Image src="/innbase-logo-lt.svg" alt="Innbase" width={40} height={40} />
            </div>

            {MAIN_NAV.map((item) => {
                const isActive = activeHref !== undefined ? activeHref === item.href : pathname === item.href;
                return (
                    <RailTooltip key={item.href} label={item.label}>
                        <Link
                            href={item.href}
                            className={clsx(
                                'group grid h-11 w-11 place-items-center rounded-md transition-colors duration-200',
                                isActive
                                    ? 'bg-rail text-accent-strong'
                                    : 'text-text-disabled hover:bg-rail hover:text-text-inverse',
                            )}
                            aria-label={item.label}
                        >
                            <item.icon className="h-5 w-5" strokeWidth={1.8} />
                        </Link>
                    </RailTooltip>
                );
            })}

            <hr className="my-3 w-8 border-none border-t border-rail-hover" />

            <RailTooltip label="Notifications">
                <button
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className="relative grid h-11 w-11 place-items-center rounded-md text-text-disabled transition-colors duration-200 hover:bg-rail hover:text-text-inverse cursor-pointer"
                    aria-label="Notifications"
                >
                    <Bell className="h-5 w-5" strokeWidth={1.8} />
                    <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-rail bg-accent-warm" />
                </button>
            </RailTooltip>
            <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

            <RailTooltip label="Settings">
                <Link
                    href="/settings"
                    className={clsx(
                        'grid h-11 w-11 place-items-center rounded-md transition-colors duration-200',
                        pathname === '/settings'
                            ? 'bg-rail text-accent-strong'
                            : 'text-text-disabled hover:bg-rail hover:text-text-inverse',
                    )}
                    aria-label="Settings"
                >
                    <Settings className="h-5 w-5" strokeWidth={1.8} />
                </Link>
            </RailTooltip>

            <RailTooltip label="Help">
                <button
                    className="grid h-11 w-11 place-items-center rounded-md text-text-disabled transition-colors duration-200 hover:bg-rail hover:text-text-inverse"
                    aria-label="Help"
                >
                    <Info className="h-5 w-5" strokeWidth={1.8} />
                </button>
            </RailTooltip>

            <div className="flex-1" />

            <RailTooltip label="Your profile">
                <button
                    className="mb-8 grid h-10 w-10 flex-none place-items-center rounded-full border-2 border-rail bg-linear-to-br from-info to-ai text-base text-text-inverse"
                    aria-label="Your profile"
                >
                    A
                </button>
            </RailTooltip>
        </aside>
    );
}