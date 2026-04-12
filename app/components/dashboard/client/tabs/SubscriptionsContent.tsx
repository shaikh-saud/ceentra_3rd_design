"use client";

import React from "react";
import { Package, ChevronRight, CheckCircle, Play, BookOpen } from "lucide-react";
import StatCard from "../../admin/ui/StatCard";
import TableCard, { TableHead } from "../../admin/ui/TableCard";
import EmptyState from "../../admin/ui/EmptyState";

interface Props {
  onBack?: () => void;
}

const STATS = [
  { title:"الاشتراكات", value:"0", icon:Package,      gradient:"from-[#0e2453] to-[#1a3a7a]", change:"—", changeStyle:"plain" as const },
  { title:"النشطة",     value:"0", icon:Play,         gradient:"from-[#058B7F] to-[#0FAE9E]", change:"—", changeStyle:"plain" as const },
  { title:"المكتملة",   value:"0", icon:CheckCircle,  gradient:"from-[#b45309] to-[#d97706]", change:"—", changeStyle:"plain" as const },
];

const COLS = ["الاشتراك", "التقدم", "الحالة"];

export default function ClientSubscriptionsContent({ onBack }: Props) {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-[#058B7F]" />
            </div>
            <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">الاشتراكات</h1>
          </div>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">تابع خططك ودوراتك النشطة والمكتملة.</p>
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
              <Package className="w-4 h-4 text-[#058B7F]" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">الاشتراكات</p>
              <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">0 اشتراك</p>
            </div>
          </div>
        }
      >
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <TableHead columns={COLS} />
          </table>
        </div>

        <EmptyState
          icon={Package}
          title="لا توجد اشتراكات حالياً."
          subtitle="اشترك في إحدى خططنا أو دوراتنا لتظهر هنا."
        />

        <div className="flex justify-center pb-6">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200 active:scale-95">
            <BookOpen className="w-4 h-4" />
            تصفح الدورات
          </button>
        </div>
      </TableCard>
    </div>
  );
}
