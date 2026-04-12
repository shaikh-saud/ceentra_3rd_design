"use client";

import React, { useState } from "react";
import { CalendarDays, DollarSign, Clock, Calendar, Plus } from "lucide-react";

type FilterTab = "الكل" | "مجدول" | "مكتمل" | "ملغي";

const FILTER_TABS: FilterTab[] = ["الكل", "مجدول", "مكتمل", "ملغي"];

const STATS = [
  { label:"مجدول", count:0, dot:"bg-amber-400",  badge:"bg-amber-50 text-amber-700 border-amber-200" },
  { label:"مكتمل", count:0, dot:"bg-green-500",  badge:"bg-green-50 text-green-700 border-green-200" },
  { label:"ملغي",  count:0, dot:"bg-red-500",    badge:"bg-red-50   text-red-700   border-red-200"   },
];

const WORKING_HOURS = [
  { day:"الأحد - الخميس", hours:"09:00 - 17:00", open:true  },
  { day:"الجمعة",          hours:"مغلق",           open:false },
  { day:"السبت",           hours:"10:00 - 14:00", open:true  },
];

export default function ConsultantCalendarContent() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("الكل");

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
            <CalendarDays className="w-4 h-4 text-[#058B7F]" />
          </div>
          <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">إدارة المواعيد</h1>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200 active:scale-95 shrink-0">
          <Plus className="w-4 h-4" />
          إضافة موعد
        </button>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5">

        {/* ── LEFT SIDEBAR ── */}
        <div className="space-y-5">

          {/* Stats card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-[#058B7F]" />
              </div>
              <p className="text-[14px] font-extrabold text-[#0e2453]">إحصائيات المواعيد</p>
            </div>
            <div className="p-4 space-y-2.5">
              {STATS.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gray-50/60 border border-gray-100 animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className="text-[13px] font-bold text-[#0e2453]/70">{s.label}</span>
                  </div>
                  <span className={`text-[12px] font-extrabold px-2.5 py-0.5 rounded-full border ${s.badge}`}>
                    {s.count}
                  </span>
                </div>
              ))}

              <div className="h-px bg-gray-100 my-1" />

              {/* Earnings */}
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#058B7F]/[0.04] border border-[#058B7F]/10">
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4 text-[#058B7F]" />
                  <span className="text-[13px] font-bold text-[#0e2453]/70">إجمالي الأرباح</span>
                </div>
                <span className="text-[13px] font-extrabold text-[#058B7F]" dir="ltr">0 ر.س</span>
              </div>
            </div>
          </div>

          {/* Upcoming appointments */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#058B7F]" />
              </div>
              <p className="text-[14px] font-extrabold text-[#0e2453]">المواعيد القادمة</p>
            </div>
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#058B7F]/[0.07] flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5 text-[#058B7F]/40" strokeWidth={1.5} />
              </div>
              <p className="text-[13px] font-extrabold text-[#0e2453]/40">لا توجد مواعيد قادمة</p>
            </div>
          </div>

          {/* Working hours */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#058B7F]" />
              </div>
              <p className="text-[14px] font-extrabold text-[#0e2453]">ساعات العمل</p>
            </div>
            <div className="p-4 space-y-2.5">
              {WORKING_HOURS.map((wh, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
                >
                  <span className="text-[13px] font-bold text-[#0e2453]/70">{wh.day}</span>
                  <span className={`text-[12px] font-extrabold px-2.5 py-1 rounded-lg border ${
                    wh.open
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-100 text-gray-400 border-gray-200"
                  }`} dir="ltr">
                    {wh.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT MAIN PANEL ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">

          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-[#058B7F]" />
              </div>
              <p className="text-[14px] font-extrabold text-[#0e2453]">إدارة المواعيد</p>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 bg-gray-100/80 rounded-xl p-1">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-[12px] font-extrabold transition-all duration-200 ${
                    activeFilter === tab
                      ? "bg-white text-[#058B7F] shadow-sm"
                      : "text-[#0e2453]/50 hover:text-[#0e2453]/80"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Empty state */}
          <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 animate-[fadeSlideUp_0.55s_ease-out]">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-[#058B7F]/[0.06] flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#058B7F]/[0.08] flex items-center justify-center">
                  <CalendarDays className="w-8 h-8 text-[#058B7F]/40" strokeWidth={1.5} />
                </div>
              </div>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#058B7F]/20" />
              <span className="absolute bottom-2 left-0 w-2 h-2 rounded-full bg-[#0e2453]/10" />
              <span className="absolute top-5 -left-3 w-1.5 h-1.5 rounded-full bg-[#058B7F]/15" />
            </div>

            <h3 className="text-[18px] font-extrabold text-[#0e2453]/50 mb-2">لا توجد مواعيد حتى الآن</h3>
            <p className="text-[13px] font-medium text-[#0e2453]/30 text-center max-w-[280px] leading-relaxed">
              {activeFilter === "الكل"
                ? "لم يتم جدولة أي مواعيد بعد. أضف موعدك الأول للبدء."
                : `لا توجد مواعيد بحالة "${activeFilter}" حتى الآن.`}
            </p>

            <button className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200 active:scale-95">
              <Plus className="w-4 h-4" />
              إضافة موعد جديد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
