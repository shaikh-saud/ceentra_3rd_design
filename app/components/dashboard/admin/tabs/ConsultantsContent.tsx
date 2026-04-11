"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import TableCard from "../ui/TableCard";
import EmptyState from "../ui/EmptyState";

const COLS = ["الاسم", "التخصص", "الخبرة", "السعر / ساعة", "التاريخ", "الحالة", "الإجراءات"];

export default function ConsultantsContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">
      <PageHeader
        title="طلبات المستشارين"
        subtitle="مراجعة وإدارة طلبات الانضمام كمستشار على المنصة"
        badge="0 معلق"
        icon={Lightbulb}
      />

      <TableCard
        toolbar={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-[#058B7F]" />
            </div>
            <p className="text-[14px] font-extrabold text-[#0e2453]">قائمة الطلبات</p>
          </div>
        }
      >
        {/* Dimmed column headers */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f8fafc]">
                {COLS.map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3.5 text-right text-[12px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        <EmptyState
          icon={Lightbulb}
          title="لا توجد طلبات بعد"
          subtitle="ستظهر هنا طلبات الانضمام كمستشار فور تقديمها"
        />
      </TableCard>
    </div>
  );
}
