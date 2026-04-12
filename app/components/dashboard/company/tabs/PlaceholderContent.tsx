"use client";

import React from "react";
import { Construction } from "lucide-react";

const LABELS: Record<string, string> = {
  requests: "طلبات متاحة",
  offers:   "عروضي",
  projects: "مشاريعي",
  earnings: "الأرباح",
  messages: "الرسائل",
  settings: "الإعدادات",
};

export default function CompanyPlaceholderContent({ tab }: { tab: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 px-6 animate-[fadeSlideUp_0.5s_ease-out]">
      <div className="w-20 h-20 rounded-2xl bg-[#058B7F]/[0.07] flex items-center justify-center mb-5">
        <Construction className="w-9 h-9 text-[#058B7F]/40" strokeWidth={1.5} />
      </div>
      <h3 className="text-[20px] font-extrabold text-[#0e2453]/50 mb-2">
        {LABELS[tab] ?? tab}
      </h3>
      <p className="text-[13px] font-medium text-[#0e2453]/30 text-center max-w-[280px]">
        هذه الصفحة قيد التطوير وستكون متاحة قريباً.
      </p>
    </div>
  );
}
