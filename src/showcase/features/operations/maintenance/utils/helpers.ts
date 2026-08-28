import { ISSUES, VENDORS, STATUS_ORDER } from '../queries/mock-projections';

export const fmt = (v: number) => '₦' + Math.round(v).toLocaleString('en-NG');

export const initials = (n: string) => n.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();

export function vendorFor(it: any) { 
    return VENDORS[it.vendorKey as keyof typeof VENDORS] || {name:'Unassigned', jobs:0, completionRate:0, avgResponseDays:0, lastVisit:'—', recentJobs:[]}; 
}

export function roomHealth(room: string, issuesList = ISSUES) {
    const related = issuesList.filter(i=>i.room===room);
    const incidentCount = related.length;
    const totalSpend = related.reduce((sum,i)=>{
        const current = i.cost.actual!=null ? i.cost.actual : i.cost.estimate;
        const history = (i.costHistory||[]).reduce((a:any,h:any)=>a+h.amount,0);
        return sum + current + history;
    },0);
    const currentlyBlocked = related.some(i=>i.roomBlocked===true && i.status!=='completed');
    let score = 100;
    const reasons: string[] = [];
    if(incidentCount>1){ score -= (incidentCount-1)*9; reasons.push(`${incidentCount} incidents on file`); }
    if(totalSpend>0){ const pen = Math.min(22, Math.round(totalSpend/8000)); score -= pen; if(totalSpend>=40000) reasons.push(`${fmt(totalSpend)} spent on repairs`); }
    if(currentlyBlocked){ score -= 8; reasons.push('Currently blocked from booking'); }
    const repeatMax = Math.max(0, ...related.map(i=>(i.repeatHistory||[]).length));
    if(repeatMax>=3) reasons.push('Recurring failure pattern');
    score = Math.max(8, Math.min(98, Math.round(score)));
    return { score, reasons: reasons.length?reasons:['No issues on file'], incidentCount, totalSpend };
}

export function healthLevel(score: number){ return score>=80?'good':score>=60?'warn':'bad'; }

export function allRoomNames(issuesList = ISSUES){ 
    return [...new Set(issuesList.filter(i=>i.area==='Rooms').map(i=>i.room))]; 
}

export function computeConnections(it: any){
    const chips: { icon: string; html: string }[] = [];
    if(it.area==='Rooms' && it.status!=='completed'){
        chips.push({icon:'brush-cleaning', html:`<b>Housekeeping</b> — ${it.room} marked unavailable until resolved`});
        chips.push({icon: it.roomBlocked?'door-closed':'door-open', html: it.roomBlocked ? `<b>Rooms</b> — blocked by Maintenance #MT-${String(it.id).padStart(3,'0')}` : `<b>Rooms</b> — ${it.room} remains bookable`});
        chips.push({icon:'concierge-bell', html:`<b>Front Desk</b> — estimated return ${it.etaText||'not yet confirmed'}`});
    }
    if(it.status==='parts' && it.partsNeeded){
        chips.push({icon:'package-search', html:`<b>Inventory</b> — waiting on ${it.partsNeeded}`});
    }
    return chips;
}

export function counts(issuesList = ISSUES){
    const active = (s: string) => issuesList.filter(i=>i.status===s).length;
    const notDone = issuesList.filter(i=>i.status!=='completed');
    const blocked = issuesList.filter(i=>i.roomBlocked===true && i.status!=='completed').length;
    const awaitingArtisan = notDone.filter(i=>['reported','quote','waiting'].includes(i.status)).length;
    const atRisk = allRoomNames(issuesList).filter(r=>roomHealth(r, issuesList).score<70).length;
    return { all: issuesList.length, active: notDone.length, completed: active('completed'), blocked, awaitingArtisan, atRisk };
}

export function visibleIssues(issuesList = ISSUES, state: { status: string, area: string, query: string }) {
    let list = [...issuesList];
    if(state.status!=='all') list = list.filter(i=>i.status===state.status);
    if(state.area!=='all') list = list.filter(i=>i.area===state.area);
    const q = state.query.trim().toLowerCase();
    if(q) list = list.filter(i=>(i.room+i.title+i.category+vendorFor(i).name).toLowerCase().includes(q));
    const rank = Object.fromEntries(STATUS_ORDER.map((s,i)=>[s,i])) as Record<string, number>;
    return list.sort((a,b)=> (rank[a.status] || 0) - (rank[b.status] || 0));
}
