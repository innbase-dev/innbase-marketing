import { ReactNode } from 'react';
import { IconRail } from './icon-rail';
import { Sidebar, SidebarItem } from './sidebar';
import { WorkspaceDock } from './workspace-dock';

interface AppShellProps {
    children: ReactNode;
    sidebarItems?: SidebarItem[];
    /** Showcase-only additions: override rail highlighting and wire scripted assistant answers. */
    activeHref?: string;
    onAsk?: (question: string) => string | Promise<string>;
}

export function AppShell({ children, sidebarItems, activeHref, onAsk }: AppShellProps) {
    return (
        <div className="flex h-full bg-canvas font-medium pb-11">
            <IconRail activeHref={activeHref} />
            <Sidebar items={sidebarItems} />
            <main className="flex-1 bg-canvas px-6 py-8 pb-8 min-w-0">
                {children}
            </main>
            <WorkspaceDock onAsk={onAsk} />
        </div>
    );
}
