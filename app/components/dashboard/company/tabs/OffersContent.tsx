"use client";

import React, { useState, useMemo } from "react";
import { FileText, Zap, ChevronDown } from "lucide-react";

interface Offer {
  request:  string;
  price:    string;
  duration: string;
  status:   "مقبول" | "قيد المراجعة" | "مرفوض";
  date:     string;
}

const OFFERS: Offer[] = [
  { request:"حملة إعلانات مطعم",  price:"15,000 ر.س", duration:"4 أسابيع", status:"مقبول",        date:"15 نوفمبر" },
  { request:"إدارة محتوى متجر",   price:"25,000 ر.س", duration:"6 أسابيع", status:"قيد المراجعة", date:"20 نوفمبر" },
  { request:"تحسين SEO عيادة",   price:"12,000 ر.س", duration:"3 أسابيع", status:"قيد المراجعة", date:"22 نوفمبر" },
];

const STATUS_BADGE: Record<Offer["status"], string> = {
  "مقبول":        "bg-green-50 text-green-700 border-green-200",
  "قيد المراجعة": "bg-amber-50 text-amber-700 border-amber-200",
  "مرفوض":        "bg-red-50 text-red-700 border-red-200",
};

const STATUS_DOT: Record<Offer["status"], string> = {
  "مقبول":        "bg-green-500",
  "قيد المراجعة": "bg-amber-400",
  "مرفوض":        "bg-red-500",
};

const FILTER_OPTIONS = ["جميع العروض", "مقبول", "قيد المراجعة", "مرفوض"];
const COLS = ["الطلب", "السعر", "المدة", "الحالة", "التاريخ", "الإجراءات"];

export default function CompanyOffersContent() {
  const [filter, setFilter] = useState("جميع العروض");

  const rows = useMemo(() =>
    filter === "جميع العروض"
      ? OFFERS
      : OFFERS.filter((o) => o.status === filter),
    [filter]
  );

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

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 gap-4 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#058B7F]" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">عروضي المقدمة</p>
              <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{rows.length} عرض</p>
            </div>
          </div>

          {/* Filter dropdown */}
          <div className="relative">
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0e2453]/30 pointer-events-none" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none pr-4 pl-8 py-2 rounded-xl border border-gray-200 bg-gray-50 text-[13px] font-bold text-[#0e2453]/80 focus:outline-none focus:border-[#058B7F]/40 transition-colors cursor-pointer"
            >
              {FILTER_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/60">
                {COLS.map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3 text-right text-[11px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((offer, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-50 transition-all duration-150 hover:bg-[#058B7F]/[0.025] animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
                >
                  {/* Request */}
                  <td className="px-5 py-4">
                    <p className="text-[14px] font-extrabold text-[#0e2453]">{offer.request}</p>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-[13px] font-bold text-[#058B7F]" dir="ltr">{offer.price}</span>
                  </td>

                  {/* Duration */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-[13px] font-medium text-[#0e2453]/60">{offer.duration}</span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${STATUS_BADGE[offer.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[offer.status]}`} />
                      {offer.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-[13px] font-medium text-[#0e2453]/50">{offer.date}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    {offer.status === "مقبول" ? (
                      <button className="px-4 py-1.5 rounded-lg text-[12px] font-extrabold text-[#058B7F] border border-[#058B7F]/30 bg-[#058B7F]/5 hover:bg-[#058B7F] hover:text-white hover:border-[#058B7F] transition-all duration-200 active:scale-95">
                        عرض
                      </button>
                    ) : (
                      <button className="px-4 py-1.5 rounded-lg text-[12px] font-extrabold text-[#0e2453]/70 border border-gray-200 bg-gray-50 hover:border-[#058B7F]/30 hover:text-[#058B7F] hover:bg-[#058B7F]/5 transition-all duration-200 active:scale-95">
                        تعديل
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <p className="text-[14px] font-extrabold text-[#0e2453]/30">لا توجد عروض مطابقة للفلتر المحدد</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden divide-y divide-gray-50">
          {rows.length === 0 && (
            <p className="px-5 py-12 text-center text-[14px] font-extrabold text-[#0e2453]/30">
              لا توجد عروض مطابقة
            </p>
          )}
          {rows.map((offer, idx) => (
            <div
              key={idx}
              className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
              style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-[14px] font-extrabold text-[#0e2453]">{offer.request}</p>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold border shrink-0 ${STATUS_BADGE[offer.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[offer.status]}`} />
                  {offer.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-[#0e2453]/50 font-medium mb-3">
                <span className="font-bold text-[#058B7F]" dir="ltr">{offer.price}</span>
                <span>{offer.duration}</span>
                <span>{offer.date}</span>
              </div>
              {offer.status === "مقبول" ? (
                <button className="px-4 py-1.5 rounded-lg text-[12px] font-extrabold text-[#058B7F] border border-[#058B7F]/30 bg-[#058B7F]/5 hover:bg-[#058B7F] hover:text-white transition-all duration-200">
                  عرض
                </button>
              ) : (
                <button className="px-4 py-1.5 rounded-lg text-[12px] font-extrabold text-[#0e2453]/70 border border-gray-200 bg-gray-50 hover:border-[#058B7F]/30 hover:text-[#058B7F] transition-all duration-200">
                  تعديل
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
