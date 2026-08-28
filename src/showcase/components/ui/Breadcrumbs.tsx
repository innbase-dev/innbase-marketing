import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
    label: string | React.ReactNode;
    href?: string;
    isBack?: boolean;
}

export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <div className="flex items-center gap-3">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                
                let content;
                if (item.isBack) {
                    content = (
                        <Link href={item.href || '#'} className="inline-flex items-center gap-1.5 font-medium text-text-tertiary text-xs px-2.5 py-1.5 rounded-md transition-colors duration-200 hover:text-text-primary hover:bg-canvas">
                            <ArrowLeft className="w-3.75 h-3.75" />
                            {item.label}
                        </Link>
                    );
                } else if (item.href) {
                    content = (
                        <Link href={item.href} className="text-text-tertiary text-sm font-medium hover:text-text-primary transition-colors">
                            {item.label}
                        </Link>
                    );
                } else {
                    if (isLast) {
                        content = <span className="text-text-primary text-sm font-bold tracking-tight">{item.label}</span>;
                    } else {
                        content = <span className="text-text-tertiary text-sm font-medium">{item.label}</span>;
                    }
                }

                return (
                    <React.Fragment key={index}>
                        {content}
                        {!isLast && <span className="text-border text-xl font-light flex-none">/</span>}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
