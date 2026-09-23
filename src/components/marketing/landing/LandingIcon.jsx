import {
  BedDouble,
  Building2,
  Clock3,
  MessageCircle,
  Package,
  ReceiptText,
  Sparkles,
  Users,
  Utensils,
  Wallet,
  Wine,
} from "lucide-react";

const ICONS = {
  payments: Wallet,
  sales: ReceiptText,
  inventory: Package,
  shifts: Clock3,
  rooms: BedDouble,
  guest: MessageCircle,
  assistant: Sparkles,
  restaurants: Utensils,
  bars: Wine,
  properties: Building2,
  owners: Users,
};

export default function LandingIcon({ name, size = 24, ...props }) {
  const Icon = ICONS[name] || ReceiptText;
  return <Icon size={size} strokeWidth={1.4} aria-hidden="true" {...props} />;
}
