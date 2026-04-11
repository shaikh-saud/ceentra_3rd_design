"use client";

import React from "react";
import { Inbox } from "lucide-react";

export default function RequestsContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Header */}
      <div>
        <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">مرحباً، System Admin</h1>
        <p className="text-[13px] text-[#0e2453]/50 font-medium mt-0.5">لوحة إدارة منصة سنترا</p>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-10 flex flex-col items-center justify-center gap-4 text-center transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
        <div className="w-14 h-14 rounded-2xl bg-[#058B7F]/10 flex items-center justify-center">
          <Inbox className="w-7 h-7 text-[#058B7F]" strokeWidth={1.6} />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-[20px] font-extrabold text-[#0e2453]">إدارة الطلبات</h2>
          <p className="text-[14px] font-medium text-[#0e2453]/45 max-w-[360px] leading-relaxed">
            عرض وإدارة جميع طلبات الخدمات على المنصة
          </p>
        </div>
      </div>
    </div>
  );
}
