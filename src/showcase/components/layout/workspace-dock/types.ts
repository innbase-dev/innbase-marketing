import type { DockRole, QuickCreateItem, WorkspaceDockView } from '../../../queries/useWorkspaceDock';
import type { LucideIcon } from 'lucide-react';

export interface WorkspaceAction {
    id: string;
    label: string;
    icon: LucideIcon;
    onSelect: () => void;
}

export interface SearchItem {
    label: string;
    icon: LucideIcon;
    onSelect: () => void;
}

export type PopoverId = 'role' | 'capture' | 'scratchpad' | 'support' | 'health' | null;
