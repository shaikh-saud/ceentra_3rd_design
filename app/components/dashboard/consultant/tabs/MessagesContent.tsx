"use client";

import React from "react";
import { MessageSquare, MessagesSquare, EyeOff, Wifi } from "lucide-react";

const BOTTOM_STATS = [
  { label:"إجمالي المحادثات",  value:"0", icon:MessagesSquare, bg:"bg-blue-50",          text:"text-blue-600",  border:"border-blue-100"  },
  { label:"رسائل غير مقروءة", value:"0", icon:EyeOff,         bg:"bg-red-50",           text:"text-red-500",   border:"border-red-100"   },
  { label:"الحالة",            value:"",  icon:Wifi,           bg:"bg-green-50",         text:"text-green-600", border:"border-green-100" },
];

export default function ConsultantMessagesContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-5 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4 text-[#058B7F]" />
        </div>
        <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">المحادثات</h1>
      </div>

      {/* 2-column chat layout */}
      <div className="flex h-[540px] bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.05)] overflow-hidden">

        {/* ══ RIGHT: Conversations list ══ */}
        <div className="w-[260px] shrink-0 border-l border-gray-100 flex flex-col">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <h2 className="text-[14px] font-extrabold text-[#0e2453]">المحادثات</h2>
            <span className="text-[11px] font-bold bg-[#0e2453]/[0.06] text-[#0e2453]/50 px-2 py-0.5 rounded-md">0</span>
          </div>

          {/* Empty conversations */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#058B7F]/[0.07] flex items-center justify-center mb-3">
              <MessagesSquare className="w-5 h-5 text-[#058B7F]/40" strokeWidth={1.5} />
            </div>
            <p className="text-[12px] font-extrabold text-[#0e2453]/35">لا توجد محادثات</p>
          </div>
        </div>

        {/* ══ Left: Chat area ══ */}
        <div className="flex-1 flex flex-col bg-[#f8fafc]">

          {/* Chat top bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-white border-b border-gray-100 shadow-[0_1px_0_rgba(14,36,83,0.05)]">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#058B7F] to-[#0FAE9E] flex items-center justify-center text-white shrink-0">
                <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">اختر محادثة</p>
              <p className="text-[11px] text-green-500 font-bold mt-0.5">متصل</p>
            </div>
          </div>

          {/* Empty state */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8 animate-[fadeSlideUp_0.55s_ease-out]">
            <div className="relative mb-7">
              <div className="w-28 h-28 rounded-full bg-[#058B7F]/[0.06] flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#058B7F]/[0.08] flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#058B7F]/[0.10] flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-[#058B7F]/50" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <span className="absolute top-2 right-1 w-2.5 h-2.5 rounded-full bg-[#058B7F]/20" />
              <span className="absolute bottom-3 left-1 w-2 h-2 rounded-full bg-[#0e2453]/10" />
              <span className="absolute top-6 -left-3 w-1.5 h-1.5 rounded-full bg-[#058B7F]/15" />
            </div>

            <h3 className="text-[20px] font-extrabold text-[#0e2453]/60 mb-2 text-center">
              مرحباً بك في الرسائل
            </h3>
            <p className="text-[13px] font-medium text-[#0e2453]/35 text-center max-w-[280px] leading-relaxed">
              اختر محادثة من القائمة للبدء
            </p>

            {/* Ghost skeleton */}
            <div className="mt-10 flex flex-col gap-2.5 w-full max-w-[400px] opacity-[0.18] pointer-events-none select-none">
              {[72, 88, 60].map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-300 shrink-0 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                  <div className="h-8 rounded-xl bg-gray-200 animate-pulse" style={{ width: `${w}%`, animationDelay: `${i * 150}ms` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {BOTTOM_STATS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${card.bg} ${card.border} hover:scale-[1.02] hover:shadow-md transition-all duration-200 animate-[fadeSlideUp_0.45s_ease-out]`}
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
            >
              <div className={`w-10 h-10 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center shrink-0`}>
                {card.label === "الحالة"
                  ? <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  : <Icon className={`w-5 h-5 ${card.text}`} strokeWidth={1.8} />
                }
              </div>
              <div>
                <p className={`text-[17px] font-extrabold ${card.text} leading-none`}>
                  {card.label === "الحالة" ? "متصل الآن" : card.value}
                </p>
                <p className={`text-[12px] font-bold mt-0.5 ${card.text} opacity-70`}>{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
