import { useQuery } from '@tanstack/react-query';
import { ISSUES, VENDORS, AREAS, STATUS_ORDER, STATUS_META } from './mock-projections';
import { roomHealth, allRoomNames, counts, computeConnections, vendorFor } from '../utils/helpers';
import { useMaintenanceStore } from '../stores/useMaintenanceStore';

let MOCK_ISSUES = [...ISSUES];
export const getMockIssues = () => MOCK_ISSUES;
export const setMockIssues = (issues: any) => { MOCK_ISSUES = issues; };

export function useMaintenanceQuery() {
    const { status, area, query, selectedId } = useMaintenanceStore();

    return useQuery({
        queryKey: ['maintenanceWorkspace'],
        queryFn: async () => {
            // Mock network delay
            await new Promise((resolve) => setTimeout(resolve, 300));
            return MOCK_ISSUES;
        },
        select: (issues) => {
            const _counts = counts(issues);
            
            let list = [...issues];
            if(status !== 'all') list = list.filter(i => i.status === status);
            if(area !== 'all') list = list.filter(i => i.area === area);
            const q = query.trim().toLowerCase();
            if(q) list = list.filter(i => (i.room + i.title + i.category + vendorFor(i).name).toLowerCase().includes(q));
            
            const rank = Object.fromEntries(STATUS_ORDER.map((s,i) => [s,i])) as Record<string, number>;
            const feed = list.sort((a,b) => (rank[a.status] || 0) - (rank[b.status] || 0)).map(it => ({
                ...it,
                health: it.area === 'Rooms' ? roomHealth(it.room) : null,
                vendor: vendorFor(it)
            }));

            const roomsHealth = allRoomNames(issues).map(r => ({
                room: r, 
                ...roomHealth(r)
            })).sort((a,b) => a.score - b.score).slice(0, 5);

            const recentlyResolved = issues.filter(i => i.status === 'completed').map(it => ({
                ...it,
                vendor: vendorFor(it)
            }));

            const vendorsStats = Object.values(VENDORS).sort((a,b) => a.avgResponseDays - b.avgResponseDays);

            const selectedIssue = issues.find(x => x.id === selectedId);
            const detail = selectedIssue ? {
                ...selectedIssue,
                vendor: vendorFor(selectedIssue),
                health: selectedIssue.area === 'Rooms' ? roomHealth(selectedIssue.room) : null,
                connections: computeConnections(selectedIssue),
                repeatCount: (selectedIssue.repeatHistory || []).length,
                spendOnAsset: (selectedIssue.costHistory || []).reduce((a:any,c:any) => a + c.amount, 0) + (selectedIssue.cost.actual != null ? selectedIssue.cost.actual : selectedIssue.cost.estimate)
            } : null;

            return {
                counts: _counts,
                feed,
                roomsHealth,
                recentlyResolved,
                vendorsStats,
                detail
            };
        }
    });
}
