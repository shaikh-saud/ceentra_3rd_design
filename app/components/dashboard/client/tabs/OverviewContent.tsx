"use client";

import React from "react";
import {
  ClipboardList, CreditCard, GraduationCap, Bell,
  Megaphone, Briefcase, Lightbulb, Video,
  ChevronRight,
} from "lucide-react";
import StatCard from "../../admin/ui/StatCard";
import TableCard from "../../admin/ui/TableCard";
import EmptyState from "../../admin/ui/EmptyState";

/* ── Stats ── */
const STATS = [
  { title:"الطلبات",    value:"1", icon:ClipboardList, gradient:"from-[#0e2453] to-[#1a3a7a]", change:"نشط",   changeStyle:"plain" as const },
  { title:"المدفوعات",  value:"0", icon:CreditCard,    gradient:"from-[#058B7F] to-[#0FAE9E]", change:"ر.س",   changeStyle:"plain" as const },
  { title:"الدورات",    value:"0", icon:GraduationCap, gradient:"from-[#0e2453] to-[#058B7F]", change:"—",     changeStyle:"plain" as const },
  { title:"الإشعارات",  value:"0", icon:Bell,          gradient:"from-[#b45309] to-[#d97706]", change:"—",     changeStyle:"plain" as const },
];

/* ── Recent requests data ── */
const REQUESTS = [
  { subject:"تصميم هوية بصرية للشركة", consultant:"Dr. Ahmed Al-Rashid", status:"مرفوض" },
];

/* ── Quick shortcuts ── */
const SHORTCUTS = [
  { label:"شركات التسويق",      icon:Megaphone },
  { label:"الوظائف",            icon:Briefcase },
  { label:"الاستشارات",         icon:Lightbulb },
  { label:"الإنتاج المرئي",     icon:Video },
];

/* ── Payment table cols ── */
const PAYMENT_COLS  = ["العملية", "النوع", "المبلغ", "الحالة"];
const REQUEST_COLS  = ["الموضوع", "المستشار", "الحالة"];

export default function ClientOverviewContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map((card, i) => (
          <StatCard key={i} {...card} delay={i * 60} />
        ))}
      </div>

      {/* ── Main content grid ── */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">

        {/* ══ LEFT: main content ══ */}
        <div className="space-y-5">

          {/* Recent payments */}
          <TableCard
            toolbar={
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-[#058B7F]" />
                </div>
                <p className="text-[14px] font-extrabold text-[#0e2453]">آخر المدفوعات</p>
              </div>
            }
          >
            {/* Dimmed column headers */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#f8fafc]">
                    {PAYMENT_COLS.map((col) => (
                      <th key={col} className="px-5 py-3.5 text-right text-[12px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>
            <EmptyState
              icon={CreditCard}
              title="لا توجد مدفوعات بعد"
              subtitle="ستظهر هنا جميع عمليات الدفع عند إجرائها"
            />
          </TableCard>

          {/* Recent requests */}
          <TableCard
            toolbar={
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0e2453]/[0.07] flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-[#0e2453]" />
                </div>
                <p className="text-[14px] font-extrabold text-[#0e2453]">آخر الطلبات</p>
              </div>
            }
          >
            {/* Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#f8fafc]">
                    {REQUEST_COLS.map((col) => (
                      <th key={col} className="px-5 py-3.5 text-right text-[12px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REQUESTS.map((req, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-50 hover:bg-[#0e2453]/[0.018] transition-all duration-150 animate-[fadeSlideUp_0.4s_ease-out]"
                      style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
                    >
                      <td className="px-5 py-4">
                        <p className="text-[14px] font-extrabold text-[#0e2453] truncate max-w-[260px]">{req.subject}</p>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="text-[13px] font-medium text-[#0e2453]/60">{req.consultant}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-red-50 text-red-500 border border-red-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
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
                <div key={idx} className="p-4 hover:bg-gray-50/60 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <p className="text-[14px] font-extrabold text-[#0e2453]">{req.subject}</p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-red-50 text-red-500 border border-red-100 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {req.status}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#0e2453]/50 font-medium">{req.consultant}</p>
                </div>
              ))}
            </div>
          </TableCard>
        </div>

        {/* ══ RIGHT: sidebar content ══ */}
        <div className="space-y-5">

          {/* Recent courses */}
          <TableCard
            toolbar={
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#058B7F]" />
                </div>
                <p className="text-[14px] font-extrabold text-[#0e2453]">آخر الدورات</p>
              </div>
            }
          >
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#058B7F]/[0.07] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#058B7F]/40" strokeWidth={1.5} />
              </div>
              <p className="text-[13px] font-bold text-[#0e2453]/30">لا توجد دورات مسجلة بعد</p>
            </div>
          </TableCard>

          {/* Quick shortcuts */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-[#058B7F]" />
              </div>
              <p className="text-[14px] font-extrabold text-[#0e2453]">اختصارات سريعة</p>
            </div>
            <div className="p-4 space-y-2.5">
              {SHORTCUTS.map((shortcut, i) => {
                const Icon = shortcut.icon;
                return (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-[13px] font-extrabold text-[#0e2453]/70 transition-all duration-200 hover:bg-[#058B7F] hover:text-white hover:border-[#058B7F] hover:-translate-y-0.5 hover:shadow-md active:scale-95 group"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <Icon className="w-4 h-4 shrink-0 group-hover:text-white transition-colors" />
                    <span className="flex-1 text-right">{shortcut.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-[-2px] transition-all duration-200" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
