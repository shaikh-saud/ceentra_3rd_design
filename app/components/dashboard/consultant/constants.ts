import {
  LayoutDashboard, ClipboardList, CalendarDays,
  MessageSquare, DollarSign, Settings,
} from "lucide-react";

export const CONSULTANT_SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "نظرة عامة",  badge: null, id: "overview"  },
  { icon: ClipboardList,   label: "الطلبات",    badge: "17", id: "requests"  },
  { icon: CalendarDays,    label: "التقويم",    badge: null, id: "calendar"  },
  { icon: MessageSquare,   label: "الرسائل",    badge: null, id: "messages"  },
  { icon: DollarSign,      label: "الأرباح",    badge: null, id: "earnings"  },
  { icon: Settings,        label: "الإعدادات",  badge: null, id: "settings"  },
] as const;

export type ConsultantTabId = typeof CONSULTANT_SIDEBAR_ITEMS[number]["id"];
