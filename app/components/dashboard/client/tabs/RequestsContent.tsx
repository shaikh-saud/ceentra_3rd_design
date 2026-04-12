"use client";

import React from "react";
import { ClipboardList, ChevronRight, CheckCircle, Clock } from "lucide-react";
import StatCard from "../../admin/ui/StatCard";
import TableCard, { TableHead } from "../../admin/ui/TableCard";

interface Props {
  onBack?: () => void;
}

const STATS = [
  { title:"الإجمالي", value:"1", icon:ClipboardList, gradient:"from-[#0e2453] to-[#1a3a7a]", change:"طلب",    changeStyle:"plain" as const },
  { title:"المعلقة",  value:"0", icon:Clock,         gradient:"from-[#b45309] to-[#d97706]", change:"—",      changeStyle:"plain" as const },
  { title:"المقبولة", value:"0", icon:CheckCircle,   gradient:"from-[#058B7F] to-[#0FAE9E]", change:"—",      changeStyle:"plain" as const },
];

const REQUESTS = [
  { subject:"تصميم هوية بصرية للشركة", consultant:"Dr. Ahmed Al-Rashid", status:"مرفوض" },
];

const COLS = ["الموضوع", "المستشار", "الحالة"];

export default function ClientRequestsContent({ onBack }: Props) {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
              <ClipboardList className="w-4 h-4 text-[#058B7F]" />
            </div>
            <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">طلبات العملاء</h1>
          </div>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">تابع طلباتك وحالات الاستجابة المرتبطة بها.</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {STATS.map((card, i) => (
          <StatCard key={i} {...card} delay={i * 80} />
        ))}
      </div>

      {/* Table */}
      <TableCard
        toolbar={
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <ClipboardList className="w-4 h-4 text-[#058B7F]" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">طلبات العملاء</p>
              <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{REQUESTS.length} طلب</p>
            </div>
          </div>
        }
      >
        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <TableHead columns={COLS} />
            <tbody>
              {REQUESTS.map((req, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-50 transition-all duration-150 hover:bg-[#0e2453]/[0.018] animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
                >
                  <td className="px-5 py-4">
                    <p className="text-[14px] font-extrabold text-[#0e2453]">{req.subject}</p>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-[13px] font-medium text-[#0e2453]/60">{req.consultant}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-gray-100 text-gray-500 border border-gray-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="lg:hidden divide-y divide-gray-50">
          {REQUESTS.map((req, idx) => (
            <div
              key={idx}
              className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
              style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <p className="text-[14px] font-extrabold text-[#0e2453]">{req.subject}</p>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-gray-100 text-gray-500 border border-gray-200 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  {req.status}
                </span>
              </div>
              <p className="text-[12px] text-[#0e2453]/50 font-medium">{req.consultant}</p>
            </div>
          ))}
        </div>
      </TableCard>
    </div>
  );
}
