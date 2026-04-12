"use client";

import React from "react";
import { BookOpen, Users, DollarSign, GraduationCap, Star } from "lucide-react";

interface Props {
  onTabChange?: (id: string) => void;
}

export default function TrainerOverviewContent({ onTabChange }: Props) {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Courses */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0e2453]/8 flex items-center justify-center shrink-0"
               style={{ background: "rgba(14,36,83,0.08)" }}>
            <BookOpen className="w-5 h-5 text-[#0e2453]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#0e2453]/40 uppercase tracking-wide">إجمالي الكورسات</p>
            <p className="text-[26px] font-extrabold text-[#0e2453] leading-none mt-0.5">0</p>
            <p className="text-[11px] font-medium text-[#0e2453]/40 mt-0.5">0 نشط</p>
          </div>
        </div>

        {/* Students */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
               style={{ background: "rgba(34,197,94,0.1)" }}>
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#0e2453]/40 uppercase tracking-wide">إجمالي الطلاب</p>
            <p className="text-[26px] font-extrabold text-[#0e2453] leading-none mt-0.5">0</p>
            <p className="text-[11px] font-medium text-[#0e2453]/40 mt-0.5">0 تسجيل جديد</p>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
               style={{ background: "rgba(245,158,11,0.1)" }}>
            <DollarSign className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#0e2453]/40 uppercase tracking-wide">الأرباح</p>
            <p className="text-[26px] font-extrabold text-[#0e2453] leading-none mt-0.5">
              0 <span className="text-[14px] font-bold text-[#0e2453]/50">ر.س</span>
            </p>
            <p className="text-[11px] font-medium text-[#0e2453]/40 mt-0.5">+0 هذا الأسبوع</p>
          </div>
        </div>
      </div>

      {/* Main content: 2-col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* My Courses */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-[#058B7F]" />
              </div>
              <p className="text-[14px] font-extrabold text-[#0e2453]">كورساتي</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#058B7F]/8 flex items-center justify-center mb-4"
                 style={{ background: "rgba(5,139,127,0.08)" }}>
              <GraduationCap className="w-7 h-7 text-[#058B7F]/50" />
            </div>
            <p className="text-[14px] font-extrabold text-[#0e2453] mb-1">لا توجد كورسات بعد</p>
            <p className="text-[12px] text-[#0e2453]/40 font-medium mb-5">ابدأ بإنشاء أول كورس لك وشارك معرفتك</p>
            <button
              onClick={() => onTabChange?.("courses")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200"
            >
              <span>إنشاء كورس جديد</span>
              <span className="text-white/70">+</span>
            </button>
          </div>
        </div>

        {/* Latest Reviews */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-[14px] font-extrabold text-[#0e2453]">آخر التقييمات</p>
          </div>

          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/8 flex items-center justify-center mb-4"
                 style={{ background: "rgba(245,158,11,0.08)" }}>
              <Star className="w-7 h-7 text-amber-400/50" />
            </div>
            <p className="text-[14px] font-extrabold text-[#0e2453] mb-1">لا توجد تقييمات بعد</p>
            <p className="text-[12px] text-[#0e2453]/40 font-medium">ستظهر هنا تقييمات طلابك بعد نشر الكورسات</p>
          </div>
        </div>
      </div>
    </div>
  );
}
