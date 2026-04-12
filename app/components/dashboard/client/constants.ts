import {
  LayoutDashboard, Megaphone, Briefcase, GraduationCap,
  Lightbulb, Video, CreditCard, Package, ShoppingBag,
  MessageSquare, Bell, Settings, ClipboardList,
} from "lucide-react";

export const CLIENT_SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "نظرة عامة",           badge: null, id: "overview" },
  { icon: Megaphone,       label: "شركات التسويق",       badge: null, id: "marketing" },
  { icon: ClipboardList,   label: "طلبات العملاء",        badge: "1",  id: "requests" },
  { icon: Briefcase,       label: "الوظائف",              badge: null, id: "jobs" },
  { icon: GraduationCap,   label: "الدورات والتدريب",     badge: null, id: "courses" },
  { icon: Lightbulb,       label: "الاستشارات",           badge: null, id: "consultations" },
  { icon: Video,           label: "منصة الإنتاج المرئي", badge: null, id: "visual" },
  { icon: CreditCard,      label: "المدفوعات",            badge: null, id: "payments" },
  { icon: Package,         label: "الاشتراكات",           badge: null, id: "subscriptions" },
  { icon: ShoppingBag,     label: "المشتريات",            badge: null, id: "purchases" },
  { icon: MessageSquare,   label: "الرسائل",              badge: null, id: "messages" },
  { icon: Bell,            label: "الإشعارات",            badge: null, id: "notifications" },
  { icon: Settings,        label: "الإعدادات",            badge: null, id: "settings" },
] as const;

export type ClientTabId = typeof CLIENT_SIDEBAR_ITEMS[number]["id"];
