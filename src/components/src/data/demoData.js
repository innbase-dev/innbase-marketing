export const DEMO_TABS = [
  { key: "payments", label: "Payments" },
  { key: "inventory", label: "Inventory" },
  { key: "shift", label: "Shift" },
  { key: "guests", label: "Guests" },
];

export const DEMO_DATA = {
  payments: {
    kpis: [
      { k: "RECEIVED", v: "₦1.03M" },
      { k: "COMPLETED", v: "₦924.5K", color: "#2dd4bf" },
      { k: "ATTENTION", v: "₦108K", color: "#fbbf24" },
      { k: "OUTSTANDING", v: "₦112.5K", color: "#f87171" },
    ],
    rows: [
      { ava: "#3a4250", label: "Andrew Nweke · Bank Transfer", chipBg: "rgba(248,113,113,.15)", chipColor: "#f87171", chip: "Needs review · 96%" },
      { ava: "#6b4258", label: "Chioma Eze · Bank Transfer", chipBg: "rgba(248,113,113,.15)", chipColor: "#f87171", chip: "Needs review · 92%" },
      { ava: "#5e4f94", label: "Sunday Olu · POS", chipBg: "rgba(45,212,191,.15)", chipColor: "#2dd4bf", chip: "Completed" },
      { ava: "#1a5a36", label: "Walk-in · Cash", chipBg: "rgba(251,191,36,.15)", chipColor: "#fbbf24", chip: "Awaiting match" },
    ],
  },
  inventory: {
    kpis: [
      { k: "HEALTH", v: "96%", color: "#2dd4bf" },
      { k: "ATTENTION", v: "8", color: "#fbbf24" },
      { k: "CRITICAL", v: "2", color: "#f87171" },
      { k: "STOCKOUT", v: "Today" },
    ],
    rows: [
      { ava: "#8a5a22", square: true, label: "Guinness Extra Stout", chipBg: "rgba(255,255,255,.08)", chipColor: "#9ca3af", chip: "Out of stock" },
      { ava: "#b5811a", square: true, label: "Heineken 33cl", chipBg: "rgba(248,113,113,.15)", chipColor: "#f87171", chip: "Investigate · −3" },
      { ava: "#2d7aa5", square: true, label: "Aquafina Water", chipBg: "rgba(251,191,36,.15)", chipColor: "#fbbf24", chip: "Low stock" },
      { ava: "#6b4258", square: true, label: "Four Cousins Wine", chipBg: "rgba(45,212,191,.15)", chipColor: "#2dd4bf", chip: "Healthy" },
    ],
  },
  shift: {
    kpis: [
      { k: "SCHEDULED", v: "18" },
      { k: "WORKING NOW", v: "3", color: "#2dd4bf" },
      { k: "CONFLICTS", v: "2", color: "#f87171" },
      { k: "COVERAGE", v: "92%" },
    ],
    rows: [
      { ava: "rgba(255,255,255,.1)", label: "Blessing Olaitan · Bar Attendant", chipBg: "rgba(255,255,255,.1)", chipColor: "#fff", chip: "Clocked in" },
      { ava: "rgba(255,255,255,.1)", label: "Musa Nuhu · Maintenance", chipBg: "rgba(251,191,36,.15)", chipColor: "#fbbf24", chip: "Overtime · 6th shift" },
      { ava: "rgba(255,255,255,.1)", label: "Juliet Offor · Kitchen", chipBg: "rgba(248,113,113,.15)", chipColor: "#f87171", chip: "Scheduled on leave" },
      { ava: "rgba(255,255,255,.1)", label: "Precious Emmanuel · Housekeeping", chipBg: "rgba(248,113,113,.15)", chipColor: "#f87171", chip: "Double booked" },
    ],
  },
  guests: {
    kpis: [
      { k: "OUTSTANDING", v: "₦9,950.00", color: "#f87171" },
      { k: "ROOM", v: "305" },
      { k: "STAY", v: "Night 4 of 5" },
      { k: "STATUS", v: "Checking out", small: true },
    ],
    rows: [
      { ava: "#60a5fa", square: true, label: "Room Charge", chipBg: "rgba(255,255,255,.08)", chipColor: "#9ca3af", chip: "₦250.00" },
      { ava: "#fbbf24", square: true, label: "Restaurant", chipBg: "rgba(255,255,255,.08)", chipColor: "#9ca3af", chip: "₦80.00" },
      { ava: "#b67af1", square: true, label: "Laundry", chipBg: "rgba(255,255,255,.08)", chipColor: "#9ca3af", chip: "₦150.00" },
      { ava: "#2dd4bf", square: true, label: "Payment received", chipBg: "rgba(45,212,191,.15)", chipColor: "#2dd4bf", chip: "−₦400.50" },
    ],
  },
};
