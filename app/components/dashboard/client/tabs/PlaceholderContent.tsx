"use client";

import React from "react";
import { LayoutDashboard } from "lucide-react";
import { CLIENT_SIDEBAR_ITEMS } from "../constants";

export default function ClientPlaceholderContent({ tab }: { tab: string }) {
  const label = CLIENT_SIDEBAR_ITEMS.find((s) => s.id === tab)?.label ?? tab;
  return (
    <div className="max-w-[1400px] mx-auto animate-[fadeSlideUp_0.45s_ease-out]">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-16 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#058B7F]/10 flex items-center justify-center">
          <LayoutDashboard className="w-8 h-8 text-[#058B7F]" />
        </div>
        <h2 className="text-[20px] font-extrabold text-[#0e2453]">{label}</h2>
        <p className="text-[14px] text-[#0e2453]/40 font-medium">هذه الصفحة قيد التطوير</p>
      </div>
    </div>
  );
}
