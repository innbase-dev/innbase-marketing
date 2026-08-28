import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';
import { clsx } from 'clsx';

export interface KpiCardProps {
    label: React.ReactNode;
    value: React.ReactNode;
    valueClassName?: string;
    negative?: boolean; // Matches the sales-kpi-strip logic
    trend?: {
        direction?: 'up' | 'down' | 'neutral' | 'none';
        percentage?: React.ReactNode;
        description?: React.ReactNode;
        // Allows overriding trend colors for edge cases
        trendClassName?: string;
        textClassName?: string;
    };
    icon?: React.ReactNode; // Optional icon before label
    options?: React.ReactNode; // Optional action buttons/dropdowns in top right
    sub?: React.ReactNode; // Optional subtext below the value
}

export function KpiCard({ label, value, valueClassName, negative, trend, icon, options, sub }: KpiCardProps) {
    return (
        <div className="bg-surface border border-border rounded-md p-4 flex flex-col justify-between hover:shadow-sm transition-shadow duration-200 group">
            <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-start justify-between">
                    <span className="text-xs text-text-tertiary font-medium flex items-center gap-1.5">
                        {/* {icon && <span className="text-text-disabled">{icon}</span>} */}
                        {label}
                    </span>
                    {options && <div>{options}</div>}
                </div>
                <span
                    className={clsx(
                        "text-2xl font-bold tracking-tight",
                        negative ? "text-danger" : "text-text-primary",
                        valueClassName
                    )}
                >
                    {value}
                </span>
            </div>

            {trend && (
                <div className="flex items-center gap-2 mt-auto">
                    <div
                        className={clsx(
                            "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                            trend.trendClassName ? trend.trendClassName : {
                                'bg-success-soft text-success-text': trend.direction === 'up',
                                'bg-danger-soft text-danger': trend.direction === 'down',
                                'bg-surface-sunken text-text-secondary': trend.direction === 'neutral' || trend.direction === 'none',
                            }
                        )}
                    >
                        {!trend.trendClassName && trend.direction === 'up' && <ArrowUpIcon className="w-3 h-3" />}
                        {!trend.trendClassName && trend.direction === 'down' && <ArrowDownIcon className="w-3 h-3" />}
                        {!trend.trendClassName && trend.direction === 'neutral' && <MinusIcon className="w-3 h-3" />}
                        <span className={trend.textClassName}>{trend.percentage}</span>
                    </div>
                    {trend.description && (
                        <span className="text-xs text-text-tertiary">{trend.description}</span>
                    )}
                </div>
            )}
            {sub && (
                <div className="text-xs text-text-tertiary mt-auto">{sub}</div>
            )}
        </div>
    );
}
