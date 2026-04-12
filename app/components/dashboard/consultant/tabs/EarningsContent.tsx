"use client";

import React from "react";
import { DollarSign, CalendarDays, Clock } from "lucide-react";

const CARDS = [
  {
    title:    "إجمالي الأرباح",
    value:    "0 ر.س",
    icon:     DollarSign,
    bg:       "bg-green-50",
    border:   "border-green-100",
    iconBg:   "bg-green-100",
    iconText: "text-green-600",
    valueText:"text-green-700",
    delay:    0,
  },
  {
    title:    "إجمالي الجلسات",
    value:    "320",
    icon:     CalendarDays,
    bg:       "bg-blue-50",
    border:   "border-blue-100",
    iconBg:   "bg-blue-100",
    iconText: "text-blue-600",
    valueText:"text-blue-700",
    delay:    80,
  },
  {
    title:    "سعر الساعة",
    value:    "500.00 ر.س",
    icon:     Clock,
    bg:       "bg-cyan-50",
    border:   "border-cyan-100",
    iconBg:   "bg-cyan-100",
    iconText: "text-cyan-600",
    valueText:"text-cyan-700",
    delay:    160,
  },
];

export default function ConsultantEarningsContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
          <DollarSign className="w-4 h-4 text-[#058B7F]" />
        </div>
        <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">الأرباح</h1>
      </div>

      {/* 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`${card.bg} border ${card.border} rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 animate-[fadeSlideUp_0.5s_ease-out]`}
              style={{ animationDelay: `${card.delay}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-[14px] font-extrabold text-[#0e2453]/60">{card.title}</p>
                <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.iconText}`} strokeWidth={1.75} />
                </div>
              </div>
              <p className={`text-[32px] font-extrabold leading-none ${card.valueText}`} dir="ltr">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
