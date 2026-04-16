"use client";

import React from "react";
import { Banknote, Clock, CreditCard, BarChart3, ChevronRight, ChevronLeft } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import StatCard from "../ui/StatCard";
import EmptyState from "../ui/EmptyState";
import SearchInput from "../ui/SearchInput";
import TableCard from "../ui/TableCard";

const PAYMENT_STATS = [
  { title:"إجمالي الإيرادات", value:"0", unit:"ر.س",  icon:Banknote,  gradient:"bg-navy",    change:"—", changeStyle:"plain" as const },
  { title:"مدفوعات معلقة",   value:"0", unit:"عملية", icon:Clock,     gradient:"bg-primary", change:"—", changeStyle:"plain" as const },
  { title:"آخر المدفوعات",   value:"0", unit:"ر.س",   icon:CreditCard, gradient:"bg-navy",   change:"—", changeStyle:"plain" as const },
  { title:"نسبة الضريبة",    value:"15", unit:"%",    icon:BarChart3,  gradient:"bg-primary", change:"VAT", changeStyle:"plain" as const },
];

const PAYMENT_COLS = ["رقم العملية","المستخدم","الخدمة","المبلغ","البوابة","الحالة","التاريخ","الإجراءات"];

export default function PaymentsContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">
      <PageHeader
        title="إدارة المدفوعات"
        subtitle="متابعة وإدارة جميع عمليات الدفع على المنصة"
        badge="0 عملية"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {PAYMENT_STATS.map((card, i) => (
          <StatCard key={i} {...card} delay={i * 60} />
        ))}
      </div>

      <TableCard
        toolbar={
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-navy" />
              </div>
              <p className="text-[14px] font-extrabold text-[#0e2453]">آخر المدفوعات</p>
            </div>
            <SearchInput value="" onChange={() => {}} placeholder="بحث..." width="w-[180px]" disabled />
          </>
        }
        footer={
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[12px] font-medium text-[#0e2453]/30">0 عملية دفع</p>
            <div className="flex items-center gap-1.5 opacity-30 pointer-events-none">
              <div className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-[#0e2453]/40" />
              </div>
              <div className="w-9 h-9 rounded-xl border border-navy bg-navy flex items-center justify-center">
                <span className="text-[13px] font-bold text-white">1</span>
              </div>
              <div className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-[#0e2453]/40" />
              </div>
            </div>
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
          title="لا توجد مدفوعات"
          subtitle="سيتم عرض جميع عمليات الدفع هنا عند توفرها"
        />
      </TableCard>

      {/* VAT Info Banner */}
      <div className="flex items-start gap-4 px-5 py-4 rounded-2xl bg-[#058B7F]/[0.04] border border-[#058B7F]/10">
        <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center shrink-0 mt-0.5">
          <Banknote className="w-4 h-4 text-[#058B7F]" />
        </div>
        <div>
          <p className="text-[13px] font-extrabold text-[#058B7F] mb-0.5">ضريبة القيمة المضافة</p>
          <p className="text-[12px] font-medium text-[#0e2453]/50 leading-relaxed">
            تُطبَّق نسبة ضريبة 15% على جميع المعاملات المالية وفق أنظمة الهيئة العامة للزكاة والضريبة والجمارك في المملكة العربية السعودية.
          </p>
        </div>
      </div>
    </div>
  );
}
