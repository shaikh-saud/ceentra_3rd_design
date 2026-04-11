"use client";

import React, { useState } from "react";
import {
  MessageSquare, Plus, User, AlertCircle,
  Shield, Users, EyeOff, MessagesSquare,
} from "lucide-react";

/* ─── Single conversation item ─── */
const CONVERSATION = {
  id: 1,
  name: "أحمد محمد",
  role: "عميل",
  time: "منذ 3 أسابيع",
  preview: "بالتأكيد! لدينا الكثير من...",
  initials: "أح",
  avatarColor: "from-blue-500 to-blue-600",
  unread: 0,
};

/* ─── Bottom stat cards ─── */
const STATS = [
  { label:"مدير النظام",  value:"System Admin", icon:Shield,         bg:"bg-[#0e2453]/[0.05]",  text:"text-[#0e2453]",  border:"border-[#0e2453]/10" },
  { label:"المستخدمون",   value:"72",           icon:Users,          bg:"bg-[#058B7F]/[0.06]",  text:"text-[#058B7F]", border:"border-[#058B7F]/15" },
  { label:"غير مقروءة",   value:"0",            icon:EyeOff,         bg:"bg-gray-100/80",       text:"text-gray-500",  border:"border-gray-200" },
  { label:"المحادثات",    value:"1",            icon:MessagesSquare, bg:"bg-indigo-50",         text:"text-indigo-600",border:"border-indigo-100" },
];

export default function MessagesContent() {
  const [activeConv, setActiveConv] = useState<number | null>(null);

  return (
    <div className="max-w-[1400px] mx-auto space-y-5 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* ── Page Header ── */}
      <div>
        <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">مرحباً، System Admin</h1>
        <p className="text-[13px] text-[#0e2453]/50 font-medium mt-0.5">لوحة إدارة منصة سنترا</p>
      </div>

      {/* ── Main 2-column chat layout ── */}
      <div className="flex h-[580px] bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.05)] overflow-hidden">

        {/* ══ RIGHT: Conversations Panel ══ */}
        <div className="w-[290px] shrink-0 border-l border-gray-100 flex flex-col">

          {/* Panel header */}
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[14px] font-extrabold text-[#0e2453]">المحادثات</h2>
              <span className="text-[11px] font-bold bg-[#0e2453]/[0.06] text-[#0e2453]/50 px-2 py-0.5 rounded-md">1</span>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] shadow-[0_4px_12px_rgba(5,139,127,0.25)] hover:shadow-[0_6px_20px_rgba(5,139,127,0.4)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95">
              <Plus className="w-4 h-4" />
              محادثة جديدة
            </button>
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
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${CONVERSATION.avatarColor} flex items-center justify-center text-white text-[12px] font-extrabold shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                {CONVERSATION.initials}
              </div>
              {/* Content */}
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

        {/* ══ LEFT: Chat Area (empty state) ══ */}
        <div className="flex-1 flex flex-col bg-[#f8fafc]">

          {/* Alert banner */}
          <div className="mx-4 mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200/70 shadow-sm animate-[fadeSlideUp_0.4s_ease-out]">
            <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-[13px] font-extrabold text-red-600">اختر محادثة</p>
          </div>

          {/* Empty state */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8 animate-[fadeSlideUp_0.55s_ease-out]">

            {/* Icon stack */}
            <div className="relative mb-7">
              <div className="w-28 h-28 rounded-full bg-[#058B7F]/[0.06] flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#058B7F]/[0.08] flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#058B7F]/[0.10] flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-[#058B7F]/50" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              {/* Decorative dots */}
              <span className="absolute top-2 right-1 w-2.5 h-2.5 rounded-full bg-[#058B7F]/20" />
              <span className="absolute bottom-3 left-1 w-2 h-2 rounded-full bg-[#0e2453]/10" />
              <span className="absolute top-6 -left-3 w-1.5 h-1.5 rounded-full bg-[#058B7F]/15" />
            </div>

            <h3 className="text-[20px] font-extrabold text-[#0e2453]/60 mb-2 text-center">
              مرحباً بك في الرسائل
            </h3>
            <p className="text-[13px] font-medium text-[#0e2453]/35 text-center max-w-[300px] leading-relaxed">
              اختر محادثة من القائمة أو ابدأ محادثة جديدة
            </p>

            {/* Ghost rows */}
            <div className="mt-10 flex flex-col gap-2.5 w-full max-w-[420px] opacity-[0.18] pointer-events-none select-none">
              {[72, 88, 60].map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-300 shrink-0 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                  <div className="h-8 rounded-xl bg-gray-200 animate-pulse flex-1" style={{ width: `${w}%`, animationDelay: `${i * 150}ms` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${card.bg} ${card.border} transition-all duration-200 hover:scale-[1.03] hover:shadow-md cursor-default animate-[fadeSlideUp_0.45s_ease-out]`}
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
            >
              <div className={`w-10 h-10 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${card.text}`} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className={`text-[17px] font-extrabold ${card.text} leading-none`}>{card.value}</p>
                <p className={`text-[12px] font-bold mt-0.5 ${card.text}/70 truncate`}>{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
