"use client";

import React from "react";
import { Settings } from "lucide-react";

export default function SettingsContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">
      <div>
        <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">الإعدادات</h1>
        <p className="text-[13px] text-[#0e2453]/50 font-medium mt-0.5">لوحة إدارة منصة سنترا</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-14 flex flex-col items-center justify-center gap-5 text-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-navy/5 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-navy/8 flex items-center justify-center">
              <Settings className="w-7 h-7 text-navy/40" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-[20px] font-extrabold text-[#0e2453]">هذه الصفحة قيد التطوير</h2>
          <p className="text-[14px] font-medium text-[#0e2453]/45 max-w-[360px] leading-relaxed">
            سيتم إضافة إعدادات المنصة قريباً
          </p>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-navy/20 animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-navy/15 animate-pulse" style={{ animationDelay: "150ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-navy/10 animate-pulse" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
