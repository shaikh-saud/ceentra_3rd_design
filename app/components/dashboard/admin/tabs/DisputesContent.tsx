"use client";

import React from "react";
import { AlertTriangle, Eye, ClipboardCheck, Shield } from "lucide-react";

const DISPUTES = [
  { id:1, amount:"20,000", project:"حملة إعلانات مطعم",         client:"#1231", company:"#A12" },
  { id:2, amount:"8,500",  project:"تصميم هوية بصرية",          client:"#1198", company:"#B07" },
  { id:3, amount:"15,000", project:"تطوير تطبيق جوال",          client:"#1245", company:"#C03" },
  { id:4, amount:"3,200",  project:"إدارة حسابات التواصل",      client:"#1162", company:"#A19" },
  { id:5, amount:"30,000", project:"إنتاج فيديو إعلاني",        client:"#1309", company:"#D11" },
  { id:6, amount:"12,750", project:"حملة تسويق رقمي شامل",      client:"#1187", company:"#B22" },
  { id:7, amount:"6,000",  project:"تصوير منتجات تجارية",       client:"#1274", company:"#C08" },
  { id:8, amount:"22,500", project:"استشارة استراتيجية أعمال",  client:"#1330", company:"#A31" },
];

export default function DisputesContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">مرحباً، System Admin</h1>
          <p className="text-[13px] text-[#0e2453]/50 font-medium mt-0.5">لوحة إدارة منصة سنترا</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] shrink-0 self-start">
          <Shield className="w-4 h-4 text-[#058B7F]" strokeWidth={1.8} />
          <span className="text-[13px] font-extrabold text-[#0e2453]">مدير النظام</span>
        </div>
      </div>

      {/* ── Section title + badge ── */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-4 h-4 text-red-500" strokeWidth={1.8} />
        </div>
        <h2 className="text-[20px] font-extrabold text-[#0e2453]">النزاعات المفتوحة</h2>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-extrabold bg-red-500 text-white shadow-[0_2px_8px_rgba(239,68,68,0.35)]">
          <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
          8 نزاعات
        </span>
      </div>

      {/* ── Cards grid ── */}
      <div className="grid sm:grid-cols-2 gap-5">
        {DISPUTES.map((dispute, idx) => (
          <div
            key={dispute.id}
            className="bg-white rounded-2xl border border-red-100 shadow-[0_4px_20px_rgba(239,68,68,0.06)] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(239,68,68,0.12)] hover:border-red-200 animate-[fadeSlideUp_0.4s_ease-out] group"
            style={{ animationDelay: `${idx * 55}ms`, animationFillMode: "both" }}
          >
            {/* Card top row */}
            <div className="flex items-start justify-between mb-4">
              {/* Dispute number badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-red-50 text-red-500 border border-red-100">
                <AlertTriangle className="w-3 h-3" />
                نزاع #{dispute.id}
              </span>

              {/* Amount badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-[12px] font-extrabold bg-yellow-400/20 text-yellow-700 border border-yellow-300/60">
                {dispute.amount} ر.س
              </span>
            </div>

            {/* Project info */}
            <div className="mb-5">
              <p className="text-[15px] font-extrabold text-[#0e2453] leading-snug mb-1.5">
                مشروع: {dispute.project}
              </p>
              <p className="text-[12px] font-medium text-[#0e2453]/45">
                العميل: {dispute.client} &nbsp;|&nbsp; الشركة: {dispute.company}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-4" />

            {/* Action buttons */}
            <div className="flex items-center gap-2.5">
              <button className="flex-1 flex items-center justify-center gap-2 h-9 rounded-xl text-[13px] font-extrabold border border-gray-200 text-[#0e2453]/60 hover:border-[#0e2453]/30 hover:text-[#0e2453] hover:bg-gray-50 transition-all duration-200 active:scale-95">
                <Eye className="w-3.5 h-3.5" />
                التفاصيل
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-9 rounded-xl text-[13px] font-extrabold text-white bg-[#0e2453] hover:bg-[#162d6e] hover:shadow-[0_4px_16px_rgba(14,36,83,0.35)] transition-all duration-200 active:scale-95">
                <ClipboardCheck className="w-3.5 h-3.5" />
                مراجعة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
