import {
  LayoutDashboard, BookOpen, Users,
  MessageSquare, Star, DollarSign,
} from "lucide-react";

export const TRAINER_SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "نظرة عامة",  badge: null, id: "overview"  },
  { icon: BookOpen,        label: "كورساتي",    badge: "0",  id: "courses"   },
  { icon: Users,           label: "الطلاب",     badge: null, id: "students"  },
  { icon: MessageSquare,   label: "الرسائل",    badge: null, id: "messages"  },
  { icon: Star,            label: "التقييمات",  badge: null, id: "reviews"   },
  { icon: DollarSign,      label: "الأرباح",    badge: null, id: "earnings"  },
] as const;

export type TrainerTabId = typeof TRAINER_SIDEBAR_ITEMS[number]["id"];
