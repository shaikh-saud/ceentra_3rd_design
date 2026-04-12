"use client";

import React from "react";
import {
  Star, DollarSign, Trophy, CalendarDays,
  ClipboardList, Calendar, RefreshCw, User,
} from "lucide-react";

interface StatCardProps {
  value: string;
  title: string;
  icon: React.ElementType;
  gradient: string;
  delay?: number;
}

function StatCard({ value, title, icon: Icon, gradient, delay = 0 }: StatCardProps) {
  return (
    <div
      className="relative rounded-2xl p-5 text-white overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-[fadeSlideUp_0.5s_ease-out]"
      style={{ background: `linear-gradient(135deg, ${gradient})`, animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-white/[0.07]" />
      <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/[0.05]" />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-[28px] font-extrabold leading-none mb-1">{value}</p>
          <p className="text-[13px] font-bold opacity-85">{title}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}

const STATS = [
  { value:"4.9",    title:"التقييم",           icon:Star,         gradient:"#058B7F, #0FAE9E", delay:0   },
  { value:"0 ر.س", title:"إجمالي الأرباح",    icon:DollarSign,   gradient:"#0e2453, #1a3a7a", delay:80  },
  { value:"17",     title:"الطلبات المعلقة",   icon:Trophy,       gradient:"#b45309, #d97706", delay:160 },
  { value:"320",    title:"إجمالي الجلسات",    icon:CalendarDays, gradient:"#7c3aed, #9333ea", delay:240 },
];

const QUICK_ACTIONS = [
  { label:"عرض الطلبات (17)",  icon:ClipboardList, tab:"requests", cls:"border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400" },
  { label:"إدارة المواعيد",    icon:Calendar,      tab:"calendar", cls:"border-blue-300  text-blue-700  hover:bg-blue-50  hover:border-blue-400"  },
  { label:"تحديث التوفر",      icon:RefreshCw,     tab:"calendar", cls:"border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400" },
];

interface Props {
  onTabChange?: (id: string) => void;
}

export default function ConsultantOverviewContent({ onTabChange }: Props) {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ── LEFT: Quick Actions + Profile ── */}
        <div className="space-y-5">

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-[#058B7F]" />
              </div>
              <p className="text-[14px] font-extrabold text-[#0e2453]">إجراءات سريعة</p>
            </div>
            <div className="p-4 space-y-2.5">
              {QUICK_ACTIONS.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => onTabChange?.(action.tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-white text-[13px] font-extrabold hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 active:scale-[0.98] ${action.cls}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <User className="w-4 h-4 text-[#058B7F]" />
              </div>
              <p className="text-[14px] font-extrabold text-[#0e2453]">ملفك الشخصي</p>
            </div>
            <div className="p-5 flex flex-col items-center text-center gap-3">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-[22px] font-extrabold shadow-md">
                أح
              </div>

              <div>
                <p className="text-[16px] font-extrabold text-[#0e2453]">د. أحمد الراشد</p>
                <p className="text-[12px] font-mono text-[#0e2453]/40 mt-0.5">marketing_strategy</p>
              </div>

              <div className="flex items-center gap-3 flex-wrap justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-[#0e2453]/[0.06] text-[#0e2453]/60 border border-[#0e2453]/10">
                  <CalendarDays className="w-3 h-3" />
                  15 سنة خبرة
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-[#058B7F]/[0.08] text-[#058B7F] border border-[#058B7F]/15">
                  <DollarSign className="w-3 h-3" />
                  500.00 ر.س / ساعة
                </span>
              </div>

              <button className="w-full py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200 active:scale-95 mt-1">
                تعديل الملف الشخصي
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Today's Appointments ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-[#058B7F]" />
              </div>
              <div>
                <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">مواعيد اليوم</p>
                <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">0 موعد</p>
              </div>
            </div>
            <button
              onClick={() => onTabChange?.("calendar")}
              className="text-[12px] font-extrabold text-[#058B7F] hover:text-[#0e2453] transition-colors"
            >
              إدارة التقويم
            </button>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-16 px-6 animate-[fadeSlideUp_0.6s_ease-out]">
            <div className="relative mb-5">
              <div className="w-20 h-20 rounded-full bg-[#058B7F]/[0.06] flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#058B7F]/[0.08] flex items-center justify-center">
                  <CalendarDays className="w-7 h-7 text-[#058B7F]/40" strokeWidth={1.5} />
                </div>
              </div>
              <span className="absolute top-1 left-0 w-2.5 h-2.5 rounded-full bg-[#058B7F]/20" />
              <span className="absolute bottom-1 right-0 w-2 h-2 rounded-full bg-[#0e2453]/10" />
            </div>
            <p className="text-[16px] font-extrabold text-[#0e2453]/50 mb-1">لا توجد مواعيد اليوم</p>
            <p className="text-[12px] font-medium text-[#0e2453]/30 text-center max-w-[220px] leading-relaxed">
              لم يتم جدولة أي جلسات لهذا اليوم. تحقق من التقويم لإدارة مواعيدك.
            </p>
            <button
              onClick={() => onTabChange?.("calendar")}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-extrabold text-[#058B7F] border border-[#058B7F]/25 bg-[#058B7F]/5 hover:bg-[#058B7F] hover:text-white hover:border-[#058B7F] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              فتح التقويم
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
