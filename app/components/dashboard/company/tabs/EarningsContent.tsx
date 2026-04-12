"use client";

import React from "react";
import { DollarSign, TrendingUp, Zap, Wallet } from "lucide-react";

interface EarningRow {
  project:    string;
  amount:     string;
  commission: string;
  net:        string;
  status:     "مستلم" | "معلق";
}

const ROWS: EarningRow[] = [
  { project:"حملة إعلانات مطعم", amount:"15,000 ر.س", commission:"-1,200 ر.س", net:"13,800 ر.س", status:"مستلم" },
  { project:"إدارة محتوى متجر",  amount:"25,000 ر.س", commission:"-2,000 ر.س", net:"23,000 ر.س",  status:"معلق" },
];

const STATUS_BADGE = {
  "مستلم": "bg-green-50 text-green-700 border-green-200",
  "معلق":  "bg-amber-50 text-amber-700 border-amber-200",
};
const STATUS_DOT = {
  "مستلم": "bg-green-500",
  "معلق":  "bg-amber-400",
};

const COLS = ["المشروع", "المبلغ", "العمولة", "الصافي", "الحالة"];

const SUMMARY = [
  { label:"هذا الشهر",    value:"125,000 ر.س", style:"text-green-600 text-[22px]",  sub:"+15% عن الشهر الماضي" },
  { label:"الشهر الماضي", value:"108,000 ر.س",  style:"text-[#0e2453] text-[18px]",  sub:null },
  { label:"المجموع الكلي", value:"485,000 ر.س",  style:"text-[#058B7F] text-[20px]",  sub:"منذ بداية النشاط" },
];

export default function CompanyEarningsContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

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

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

        {/* ── Earnings Table ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-[#058B7F]" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">سجل الأرباح</p>
              <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{ROWS.length} عمليات</p>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/60">
                  {COLS.map((col) => (
                    <th key={col} className="px-5 py-3 text-right text-[11px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-50 transition-all duration-150 hover:bg-[#058B7F]/[0.025] animate-[fadeSlideUp_0.4s_ease-out]"
                    style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
                  >
                    <td className="px-5 py-4">
                      <p className="text-[14px] font-extrabold text-[#0e2453]">{row.project}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-[13px] font-bold text-[#0e2453]/70" dir="ltr">{row.amount}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-[13px] font-bold text-red-500" dir="ltr">{row.commission}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-[13px] font-extrabold text-green-600" dir="ltr">{row.net}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${STATUS_BADGE[row.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[row.status]}`} />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden divide-y divide-gray-50">
            {ROWS.map((row, idx) => (
              <div
                key={idx}
                className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
                style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-[14px] font-extrabold text-[#0e2453]">{row.project}</p>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold border shrink-0 ${STATUS_BADGE[row.status]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[row.status]}`} />
                    {row.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[12px]">
                  <div>
                    <p className="text-[#0e2453]/35 font-medium mb-0.5">المبلغ</p>
                    <p className="font-bold text-[#0e2453]/70" dir="ltr">{row.amount}</p>
                  </div>
                  <div>
                    <p className="text-[#0e2453]/35 font-medium mb-0.5">العمولة</p>
                    <p className="font-bold text-red-500" dir="ltr">{row.commission}</p>
                  </div>
                  <div>
                    <p className="text-[#0e2453]/35 font-medium mb-0.5">الصافي</p>
                    <p className="font-extrabold text-green-600" dir="ltr">{row.net}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Summary Card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden self-start">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#058B7F]" />
            </div>
            <p className="text-[14px] font-extrabold text-[#0e2453]">ملخص الأرباح</p>
          </div>

          <div className="p-5 space-y-4">
            {SUMMARY.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border animate-[fadeSlideUp_0.4s_ease-out] ${
                  idx === 0
                    ? "bg-green-50/60 border-green-100"
                    : idx === 2
                    ? "bg-[#058B7F]/[0.04] border-[#058B7F]/10"
                    : "bg-gray-50/60 border-gray-100"
                }`}
                style={{ animationDelay: `${idx * 80}ms`, animationFillMode: "both" }}
              >
                <p className="text-[11px] font-bold text-[#0e2453]/45 mb-1">{item.label}</p>
                <p className={`font-extrabold leading-tight ${item.style}`} dir="ltr">{item.value}</p>
                {item.sub && (
                  <p className="text-[10px] font-medium text-[#0e2453]/35 mt-1">{item.sub}</p>
                )}
              </div>
            ))}

            {/* Wallet total visual */}
            <div className="flex items-center gap-2.5 pt-2 border-t border-gray-50">
              <div className="w-8 h-8 rounded-lg bg-[#0e2453]/5 flex items-center justify-center shrink-0">
                <Wallet className="w-4 h-4 text-[#0e2453]/40" />
              </div>
              <p className="text-[11px] font-medium text-[#0e2453]/35 leading-snug">
                الأرباح الكلية تشمل جميع المشاريع المنتهية والمستلمة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
