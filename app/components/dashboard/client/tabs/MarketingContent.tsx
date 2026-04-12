"use client";

import React from "react";
import { Megaphone, Building2, ChevronRight, Mail } from "lucide-react";
import StatCard from "../../admin/ui/StatCard";
import TableCard, { TableHead } from "../../admin/ui/TableCard";

interface Props {
  onBack?: () => void;
}

const COMPANIES = [
  { name:"Innovation Co",              email:"innovation@co.com",    initials:"IN", color:"from-blue-500 to-indigo-600" },
  { name:"Excellence Agency",          email:"excellence@agency.com", initials:"EA", color:"from-teal-500 to-emerald-600" },
  { name:"Digital Creativity Agency",  email:"digital@creative.com",  initials:"DC", color:"from-purple-500 to-violet-600" },
  { name:"Summit Marketing",           email:"summit@marketing.com",  initials:"SM", color:"from-orange-500 to-amber-600" },
  { name:"Pioneer Foundation",         email:"pioneer@foundation.com",initials:"PF", color:"from-sky-500 to-cyan-600" },
  { name:"Elite Marketing Co",         email:"elite@marketing.com",   initials:"EM", color:"from-rose-500 to-pink-600" },
  { name:"شركة التسويق رقم 20",         email:"company20@example.com", initials:"٢٠", color:"from-[#0e2453] to-[#1a3a7a]" },
  { name:"شركة التسويق رقم 18",         email:"company18@example.com", initials:"١٨", color:"from-[#058B7F] to-[#0FAE9E]" },
];

const COLS = ["الشركة", "البريد", "الحالة"];

const STATS = [
  { title:"شركات نشطة",  value:"8",  icon:Building2, gradient:"from-[#058B7F] to-[#0FAE9E]", change:"نشطة", changeStyle:"plain" as const },
  { title:"كل الشركات",  value:"27", icon:Megaphone, gradient:"from-[#0e2453] to-[#1a3a7a]", change:"+3",   changeStyle:"plain" as const },
];

export default function MarketingContent({ onBack }: Props) {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
              <Megaphone className="w-4 h-4 text-[#058B7F]" />
            </div>
            <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">شركات التسويق</h1>
          </div>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">استعرض الشركات النشطة وتواصل معها من مكان واحد.</p>
        </div>

        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-[#0e2453]/70 bg-white border border-gray-200 hover:border-[#058B7F]/40 hover:text-[#058B7F] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 active:scale-95 shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
          العودة للوحة
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {STATS.map((card, i) => (
          <StatCard key={i} {...card} delay={i * 80} />
        ))}
      </div>

      {/* Table */}
      <TableCard
        toolbar={
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-[#058B7F]" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">شركات التسويق</p>
              <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{COMPANIES.length} شركة</p>
            </div>
          </div>
        }
      >
        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <TableHead columns={COLS} />
            <tbody>
              {COMPANIES.map((company, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-50 transition-all duration-150 hover:bg-[#058B7F]/[0.025] group animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ animationDelay: `${idx * 45}ms`, animationFillMode: "both" }}
                >
                  {/* Company */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-[11px] font-extrabold shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                        {company.initials}
                      </div>
                      <span className="text-[14px] font-extrabold text-[#0e2453]">{company.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#0e2453]/25 shrink-0" />
                      <span className="text-[13px] font-medium text-[#0e2453]/55" dir="ltr">{company.email}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-green-50 text-green-700 border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      نشطة
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="lg:hidden divide-y divide-gray-50">
          {COMPANIES.map((company, idx) => (
            <div
              key={idx}
              className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
              style={{ animationDelay: `${idx * 45}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-[12px] font-extrabold shrink-0 shadow-sm`}>
                  {company.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-extrabold text-[#0e2453] truncate">{company.name}</p>
                  <p className="text-[12px] text-[#0e2453]/45 font-medium truncate" dir="ltr">{company.email}</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-green-50 text-green-700 border border-green-200 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  نشطة
                </span>
              </div>
            </div>
          ))}
        </div>
      </TableCard>
    </div>
  );
}
