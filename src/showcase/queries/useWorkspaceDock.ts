import { useQuery } from '@tanstack/react-query';
import type { LucideIcon } from 'lucide-react';
import {
    ShieldCheck, Flag, ConciergeBell, LogIn, ScanFace,
    Martini, ShoppingCart, Barcode, Boxes, ClipboardCheck, FileText,
    UserPlus, CalendarPlus, FilePlus2, Truck, Wrench, CheckSquare, ArrowLeftRight
} from 'lucide-react';

export type RoleKey = 'manager' | 'frontdesk' | 'bartender' | 'inventory';

export interface DockRole {
    id: RoleKey;
    label: string;
    icon: LucideIcon;
    desc: string;
    action: { icon: LucideIcon; label: string; qcId: string };
    scanner: { icon: LucideIcon; title: string; sub: string; toastLabel: string } | null;
    suggested: string[];
}

export interface QuickCreateItem {
    id: string;
    label: string;
    icon: LucideIcon;
    isSuggested?: boolean;
}

export interface HealthRow {
    label: string;
    value: string;
    tone?: 'ok' | 'warn';
}

export interface WorkspaceDockView {
    consistencyClass: 'EVENTUAL';
    generatedAt: string;
    projectionVersion: string;
    
    roles: DockRole[];
    health: { score: number; rows: HealthRow[]; circumference: number; ringOffset: number };
    suggestedQuestions: string[];
    quickCaptureItems: QuickCreateItem[]; // Pre-sorted and mapped for the current role
}

// ─────────────────────────────────────────────────────────────
// MOCK PROJECTION DATA
// ─────────────────────────────────────────────────────────────
const ROLES: Record<RoleKey, DockRole> = {
    manager: {
        id: 'manager', label: 'Manager', icon: ShieldCheck, desc: 'Full oversight',
        action: { icon: Flag, label: 'Log Incident', qcId: 'incident' },
        scanner: null,
        suggested: ['incident', 'task', 'report'],
    },
    frontdesk: {
        id: 'frontdesk', label: 'Front Desk', icon: ConciergeBell, desc: 'Reception & guest care',
        action: { icon: LogIn, label: 'Check-in', qcId: 'checkin' },
        scanner: { icon: ScanFace, title: 'Scan ID card', sub: 'Point the camera at a guest ID to verify identity and prefill their profile.', toastLabel: 'ID verified and attached to guest record' },
        suggested: ['checkin', 'booking', 'guest'],
    },
    bartender: {
        id: 'bartender', label: 'Bar & POS', icon: Martini, desc: 'Sales & tabs',
        action: { icon: ShoppingCart, label: 'Quick Sale', qcId: 'sale' },
        scanner: { icon: Barcode, title: 'Scan barcode', sub: 'Scan a drink or product barcode to ring it up instantly.', toastLabel: 'Item added to the current sale' },
        suggested: ['sale', 'guest'],
    },
    inventory: {
        id: 'inventory', label: 'Inventory', icon: Boxes, desc: 'Stock & suppliers',
        action: { icon: ClipboardCheck, label: 'Stock Count', qcId: 'count' },
        scanner: { icon: FileText, title: 'Scan delivery note', sub: 'Scan a supplier invoice or delivery note to log it straight to stock.', toastLabel: 'Delivery note logged to inventory' },
        suggested: ['count', 'purchase', 'transfer'],
    },
};

const QC_ITEMS: Record<string, { label: string; icon: LucideIcon }> = {
    incident: { label: 'New Incident', icon: Flag },
    checkin: { label: 'New Check-in', icon: LogIn },
    guest: { label: 'New Guest', icon: UserPlus },
    booking: { label: 'New Booking', icon: CalendarPlus },
    sale: { label: 'New Sale', icon: ShoppingCart },
    purchase: { label: 'New Purchase', icon: FilePlus2 },
    supplier: { label: 'New Supplier', icon: Truck },
    maintenance: { label: 'New Maintenance', icon: Wrench },
    task: { label: 'New Task', icon: CheckSquare },
    count: { label: 'New Stock Count', icon: ClipboardCheck },
    transfer: { label: 'New Transfer', icon: ArrowLeftRight },
    report: { label: 'New Report Note', icon: FileText },
};

const DEFAULT_HEALTH = {
    score: 92,
    rows: [
        { label: 'Critical alerts open', value: '0', tone: 'ok' as const },
        { label: 'Incidents overdue SLA', value: '1', tone: 'warn' as const },
        { label: 'Open incidents', value: '5' },
        { label: 'Average resolution time', value: '46 min' },
    ],
};

const DEFAULT_SUGGESTED_QUESTIONS = [
    'Which rooms have open issues right now?',
    "What's the status on Room 105?",
    'Which vendor responds fastest?',
];

export function useWorkspaceDock(activeRole: RoleKey = 'manager') {
    return useQuery<WorkspaceDockView>({
        queryKey: ['workspace-dock', activeRole],
        queryFn: async () => {
            // Compute health ring logic in the projection layer
            const circumference = 2 * Math.PI * 9;
            const ringOffset = circumference * (1 - DEFAULT_HEALTH.score / 100);
            
            const role = ROLES[activeRole];
            
            // Map and sort quick capture items
            const quickCaptureItems: QuickCreateItem[] = Object.entries(QC_ITEMS)
                .map(([id, item]) => ({
                    id,
                    ...item,
                    isSuggested: role.suggested.includes(id)
                }))
                .sort((a, b) => Number(b.isSuggested) - Number(a.isSuggested));
                
            return {
                consistencyClass: 'EVENTUAL',
                generatedAt: new Date().toISOString(),
                projectionVersion: '1.0.0',
                
                roles: Object.values(ROLES),
                health: {
                    ...DEFAULT_HEALTH,
                    circumference,
                    ringOffset
                },
                suggestedQuestions: DEFAULT_SUGGESTED_QUESTIONS,
                quickCaptureItems
            };
        },
        staleTime: 60000,
    });
}
