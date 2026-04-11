import {
  LayoutDashboard, Users, GraduationCap, CreditCard, Briefcase,
  Megaphone, Building2, Lightbulb, Video, Bell, MessageSquare,
  Inbox, AlertTriangle, BarChart3, Settings,
} from "lucide-react";

export const NAVY = "#0e2453";
export const TEAL = "#058B7F";

export const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "نظرة عامة",   badge: null, id: "overview" },
  { icon: Users,           label: "المستخدمين",   badge: null, id: "users" },
  { icon: GraduationCap,  label: "الدورات",       badge: "18", id: "courses" },
  { icon: CreditCard,     label: "المدفوعات",     badge: "0",  id: "payments" },
  { icon: Briefcase,      label: "الوظائف",       badge: "1",  id: "jobs" },
  { icon: Megaphone,      label: "الخدمات",       badge: "20", id: "services" },
  { icon: Building2,      label: "الشركات",       badge: "12", id: "companies" },
  { icon: Lightbulb,      label: "المستشارين",    badge: "0",  id: "consultants" },
  { icon: Video,          label: "صناع المحتوى",  badge: "0",  id: "creators" },
  { icon: Bell,           label: "التنبيهات",     badge: null, id: "alerts" },
  { icon: MessageSquare,  label: "الرسائل",       badge: null, id: "messages" },
  { icon: Inbox,          label: "الطلبات",       badge: null, id: "requests" },
  { icon: AlertTriangle,  label: "النزاعات",      badge: "8",  id: "disputes" },
  { icon: BarChart3,      label: "التقارير",      badge: null, id: "reports" },
  { icon: Settings,       label: "الإعدادات",     badge: null, id: "settings" },
] as const;

export type TabId = typeof SIDEBAR_ITEMS[number]["id"];

export const IMPLEMENTED_TABS: TabId[] = [
  "overview", "users", "courses", "payments", "jobs", "services",
];
