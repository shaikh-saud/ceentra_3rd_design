import {
  LayoutDashboard, ClipboardList, FileText,
  FolderOpen, DollarSign, MessageSquare, Settings,
} from "lucide-react";

export const COMPANY_SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "نظرة عامة",     badge: null, id: "overview" },
  { icon: ClipboardList,   label: "طلبات متاحة",   badge: "15", id: "requests" },
  { icon: FileText,        label: "عروضي",         badge: null, id: "offers" },
  { icon: FolderOpen,      label: "مشاريعي",       badge: null, id: "projects" },
  { icon: DollarSign,      label: "الأرباح",       badge: null, id: "earnings" },
  { icon: MessageSquare,   label: "الرسائل",       badge: null, id: "messages" },
  { icon: Settings,        label: "الإعدادات",     badge: null, id: "settings" },
] as const;

export type CompanyTabId = typeof COMPANY_SIDEBAR_ITEMS[number]["id"];
