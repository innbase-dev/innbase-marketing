import { create } from 'zustand';
import { ISSUES } from '../queries/mock-projections';

interface MaintenanceState {
  status: string;
  area: string;
  query: string;
  selectedId: number;
  contactType: string;
  contactNote: string;
  setStatus: (status: string) => void;
  setArea: (area: string) => void;
  setQuery: (query: string) => void;
  setSelectedId: (id: number) => void;
  setContactType: (type: string) => void;
  setContactNote: (note: string) => void;
  
  isNewIssueDrawerOpen: boolean;
  setIsNewIssueDrawerOpen: (open: boolean) => void;
}

export const useMaintenanceStore = create<MaintenanceState>((set) => ({
  status: 'all',
  area: 'all',
  query: '',
  selectedId: ISSUES[0]?.id || 1,
  contactType: 'call',
  contactNote: '',
  setStatus: (status) => set({ status }),
  setArea: (area) => set({ area }),
  setQuery: (query) => set({ query }),
  setSelectedId: (selectedId) => set({ selectedId }),
  setContactType: (contactType) => set({ contactType }),
  setContactNote: (contactNote) => set({ contactNote }),
  
  isNewIssueDrawerOpen: false,
  setIsNewIssueDrawerOpen: (isOpen) => set({ isNewIssueDrawerOpen: isOpen }),
}));
