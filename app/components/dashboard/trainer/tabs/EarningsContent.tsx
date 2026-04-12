"use client";

import React, { useState, useMemo } from "react";
import { DollarSign, ShoppingBag, TrendingUp, Wallet, BookOpen, User, Calendar, Filter } from "lucide-react";

interface Sale {
  id: string;
  course_name: string;
  student_name: string;
  price: number;
  date: string;
}

const SALES: Sale[] = [];

const STAT_CARDS = [
  {
    label: "إجمالي الأرباح",
    value: "0",
    unit: "ر.س",
    icon: DollarSign,
    from: "from-green-500",
    to: "to-emerald-600",
    shadow: "shadow-green-500/25",
  },
  {
    label: "إجمالي المبيعات",
    value: "0",
    unit: "",
    icon: ShoppingBag,
    from: "from-blue-500",
    to: "to-blue-600",
    shadow: "shadow-blue-500/25",
  },
  {
    label: "متوسط سعر البيع",
    value: "0",
    unit: "ر.س",
    icon: TrendingUp,
    from: "from-cyan-500",
    to: "to-teal-500",
    shadow: "shadow-cyan-500/25",
  },
];

export default function TrainerEarningsContent() {
  const [courseFilter, setCourseFilter] = useState("الكل");

  const courses = useMemo(
    () => ["الكل", ...Array.from(new Set(SALES.map((s) => s.course_name)))],
    []
  );

  const filtered = useMemo(
    () => SALES.filter((s) => courseFilter === "الكل" || s.course_name === courseFilter),
    [courseFilter]
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
          <DollarSign className="w-4 h-4 text-green-600" />
        </div>
        <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">الأرباح والمبيعات</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {STAT_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`bg-gradient-to-br ${card.from} ${card.to} rounded-2xl p-6 text-white shadow-lg ${card.shadow} hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200`}
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-bold bg-white/15 px-2.5 py-1 rounded-lg">{card.label}</span>
              </div>
              <p className="text-[30px] font-extrabold leading-none">
                {card.value}
                {card.unit && (
                  <span className="text-[16px] font-bold opacity-80 mr-1">{card.unit}</span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* Sales table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-50 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-[14px] font-extrabold text-[#0e2453]">آخر المبيعات</p>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-[#0e2453]/50">
              {SALES.length}
            </span>
          </div>

          {SALES.length > 0 && (
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0e2453]/30 pointer-events-none" />
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="appearance-none pr-8 pl-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-[12px] font-medium text-[#0e2453] focus:outline-none focus:border-[#058B7F]/40 focus:bg-white transition-all cursor-pointer"
              >
                {courses.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                 style={{ background: "rgba(34,197,94,0.08)" }}>
              <Wallet className="w-8 h-8 text-green-500/40" />
            </div>
            <p className="text-[16px] font-extrabold text-[#0e2453] mb-2">لا توجد مبيعات بعد</p>
            <p className="text-[13px] text-[#0e2453]/40 font-medium">
              ستظهر هنا مبيعاتك بعد اشتراك الطلاب في كورساتك
            </p>
          </div>
        )}

        {/* Table (shown when data exists) */}
        {filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  {["اسم الكورس", "الطالب", "السعر", "التاريخ"].map((h) => (
                    <th key={h} className="px-5 py-3 text-right text-[11px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((sale, i) => (
                  <tr
                    key={sale.id}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                      i === filtered.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-[#058B7F]/50 shrink-0" />
                        <span className="text-[13px] font-extrabold text-[#0e2453]">{sale.course_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#058B7F] to-[#0FAE9E] flex items-center justify-center text-white text-[11px] font-extrabold shrink-0">
                          {sale.student_name.charAt(0)}
                        </div>
                        <span className="text-[13px] font-bold text-[#0e2453]/70">{sale.student_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[13px] font-extrabold text-green-600">
                        {sale.price} <span className="text-[11px] font-bold">ر.س</span>
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0e2453]/25" />
                        <span className="text-[12px] font-medium text-[#0e2453]/50">{sale.date}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
