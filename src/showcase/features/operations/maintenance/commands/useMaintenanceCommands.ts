import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getMockIssues, setMockIssues } from '../queries/useMaintenanceQuery';

export function useMaintenanceCommands() {
    const queryClient = useQueryClient();

    const changeStatus = useMutation({
        mutationFn: async ({ id, status }: { id: number, status: string }) => {
            await new Promise(res => setTimeout(res, 300));
            return { id, status };
        },
        onMutate: async ({ id, status }) => {
            await queryClient.cancelQueries({ queryKey: ['maintenanceWorkspace'] });
            
            const issues = getMockIssues();
            const newIssues = issues.map(i => 
                i.id === id ? { ...i, status } : i
            );
            setMockIssues(newIssues);
            
            queryClient.setQueryData(['maintenanceWorkspace'], newIssues);
        }
    });

    const approveEstimate = useMutation({
        mutationFn: async (id: number) => {
            await new Promise(res => setTimeout(res, 300));
            return id;
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['maintenanceWorkspace'] });
            
            const issues = getMockIssues();
            const newIssues = issues.map(i => 
                i.id === id ? { ...i, cost: { ...i.cost, approved: true } } : i
            );
            setMockIssues(newIssues);
            
            queryClient.setQueryData(['maintenanceWorkspace'], newIssues);
        }
    });

    const recordPayment = useMutation({
        mutationFn: async (id: number) => {
            await new Promise(res => setTimeout(res, 300));
            return id;
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['maintenanceWorkspace'] });
            
            const issues = getMockIssues();
            const newIssues = issues.map(i => 
                i.id === id ? { 
                    ...i, 
                    cost: { ...i.cost, actual: i.cost.estimate, payment: 'Credit Card (Stripe)' } 
                } : i
            );
            setMockIssues(newIssues);
            
            queryClient.setQueryData(['maintenanceWorkspace'], newIssues);
        }
    });

    const toggleRoomBlock = useMutation({
        mutationFn: async ({ id, blocked }: { id: number, blocked: boolean }) => {
            await new Promise(res => setTimeout(res, 300));
            return { id, blocked };
        },
        onMutate: async ({ id, blocked }) => {
            await queryClient.cancelQueries({ queryKey: ['maintenanceWorkspace'] });
            
            const issues = getMockIssues();
            const newIssues = issues.map(i => 
                i.id === id ? { ...i, roomBlocked: blocked } : i
            );
            setMockIssues(newIssues);
            
            queryClient.setQueryData(['maintenanceWorkspace'], newIssues);
        }
    });

    const notifyHousekeeping = useMutation({
        mutationFn: async ({ id, needsCleaning }: { id: number, needsCleaning: boolean }) => {
            await new Promise(res => setTimeout(res, 300));
            return { id, needsCleaning };
        },
        onMutate: async ({ id, needsCleaning }) => {
            await queryClient.cancelQueries({ queryKey: ['maintenanceWorkspace'] });
            
            const issues = getMockIssues();
            const newIssues = issues.map(i => 
                i.id === id ? { ...i, needsCleaning, cleaningAsked: true } : i
            );
            setMockIssues(newIssues);
            
            queryClient.setQueryData(['maintenanceWorkspace'], newIssues);
        }
    });

    const logCommunication = useMutation({
        mutationFn: async ({ id, type, note }: { id: number, type: string, note: string }) => {
            await new Promise(res => setTimeout(res, 300));
            return { id, type, note };
        },
        onMutate: async ({ id, type, note }) => {
            await queryClient.cancelQueries({ queryKey: ['maintenanceWorkspace'] });
            
            const issues = getMockIssues();
            const newIssues = issues.map(i => {
                if (i.id === id) {
                    const now = new Date();
                    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'pm' : 'am'} (Just now)`;
                    return {
                        ...i,
                        commLog: [{ type, time: timeStr, note }, ...i.commLog]
                    };
                }
                return i;
            });
            setMockIssues(newIssues);
            
            queryClient.setQueryData(['maintenanceWorkspace'], newIssues);
        }
    });

    return {
        changeStatus,
        approveEstimate,
        recordPayment,
        toggleRoomBlock,
        notifyHousekeeping,
        logCommunication
    };
}
