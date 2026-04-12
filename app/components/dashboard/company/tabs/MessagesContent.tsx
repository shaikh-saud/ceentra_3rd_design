"use client";

import React, { useState } from "react";
import {
  MessageSquare, MessagesSquare, EyeOff, Wifi,
  Zap,
} from "lucide-react";

const CONVERSATION = {
  id:          1,
  name:        "Ahmed Mohammed",
  role:        "عميل",
  time:        "3 weeks",
  preview:     "تبدأ الباقات من 2000 ريال شهري...",
  initials:    "AM",
  avatarColor: "from-blue-500 to-blue-600",
  unread:      0,
};

const BOTTOM_STATS = [
  { label:"إجمالي المحادثات",  value:"1",           icon:MessagesSquare, bg:"bg-[#058B7F]/[0.06]",  text:"text-[#058B7F]", border:"border-[#058B7F]/15" },
  { label:"رسائل غير مقروءة", value:"0",           icon:EyeOff,         bg:"bg-gray-100/80",       text:"text-gray-500",  border:"border-gray-200" },
  { label:"متصل الآن",        value:"●",           icon:Wifi,           bg:"bg-green-50",          text:"text-green-600", border:"border-green-100" },
];

export default function CompanyMessagesContent() {
  const [activeConv, setActiveConv] = useState<number | null>(null);

  return (
    <div className="max-w-[1400px] mx-auto space-y-5 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Company header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0e2453] leading-tight mb-1">
            مرحباً، Digital Creative Marketing Co
          </h1>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">إدارة طلباتك، عروضك، ومشاريعك الحالية</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-green-50 text-green-700 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            شركة موثقة
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
            <Zap className="w-3 h-3" />
            سريعة الرد
          </span>
        </div>
      </div>

      {/* ── 2-column chat layout ── */}
      <div className="flex h-[560px] bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.05)] overflow-hidden">

        {/* ══ RIGHT: Conversations panel ══ */}
        <div className="w-[280px] shrink-0 border-l border-gray-100 flex flex-col">
          {/* Header */}
          <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[14px] font-extrabold text-[#0e2453]">المحادثات</h2>
            <span className="text-[11px] font-bold bg-[#0e2453]/[0.06] text-[#0e2453]/50 px-2 py-0.5 rounded-md">1</span>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto py-2">
            <button
              onClick={() => setActiveConv(CONVERSATION.id)}
              className={`w-full text-right px-4 py-3.5 flex items-start gap-3 transition-all duration-200 group ${
                activeConv === CONVERSATION.id
                  ? "bg-[#058B7F]/[0.07] border-r-2 border-[#058B7F]"
                  : "hover:bg-gray-50/80 border-r-2 border-transparent"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${CONVERSATION.avatarColor} flex items-center justify-center text-white text-[12px] font-extrabold shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                {CONVERSATION.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[13px] font-extrabold text-[#0e2453] truncate">{CONVERSATION.name}</span>
                  <span className="text-[10px] font-medium text-[#0e2453]/35 shrink-0">{CONVERSATION.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                    {CONVERSATION.role}
                  </span>
                  <p className="text-[12px] text-[#0e2453]/40 font-medium truncate">{CONVERSATION.preview}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* ══ LEFT: Chat area ══ */}
        <div className="flex-1 flex flex-col bg-[#f8fafc]">

          {/* Chat top bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-white border-b border-gray-100 shadow-[0_1px_0_rgba(14,36,83,0.05)]">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#058B7F] to-[#0FAE9E] flex items-center justify-center text-white text-[11px] font-extrabold shadow-sm">
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
            <p className="text-[13px] font-medium text-[#0e2453]/35 text-center max-w-[300px] leading-relaxed">
              اختر محادثة من القائمة للبدء في الرد على العملاء
            </p>

            {/* Ghost rows */}
            <div className="mt-10 flex flex-col gap-2.5 w-full max-w-[420px] opacity-[0.18] pointer-events-none select-none">
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

      {/* ── Bottom stat cards ── */}
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
                {card.label === "متصل الآن"
                  ? <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  : <Icon className={`w-5 h-5 ${card.text}`} strokeWidth={1.8} />
                }
              </div>
              <div>
                <p className={`text-[17px] font-extrabold ${card.text} leading-none`}>
                  {card.label === "متصل الآن" ? "متصل الآن" : card.value}
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
