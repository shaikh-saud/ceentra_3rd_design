"use client";

import React from "react";
import { Briefcase, ChevronRight, FileText } from "lucide-react";
import StatCard from "../../admin/ui/StatCard";
import TableCard, { TableHead } from "../../admin/ui/TableCard";

interface Props {
  onBack?: () => void;
}

const STATS = [
  { title:"الوظائف النشطة", value:"8", icon:Briefcase, gradient:"from-[#058B7F] to-[#0FAE9E]", change:"نشطة", changeStyle:"plain" as const },
  { title:"طلباتي",          value:"0", icon:FileText,  gradient:"from-[#0e2453] to-[#1a3a7a]", change:"—",     changeStyle:"plain" as const },
];

const JOBS = [
  { title:"كاتب محتوى إبداعي",       company:"وكالة المحتوى",              salary:"قابل للتفاوض" },
  { title:"مطور ويب Full Stack",      company:"تقنية المستقبل",              salary:"12,000 - 18,000 ر.س" },
  { title:"مدير تسويق رقمي",          company:"مجموعة النجاح",               salary:"15,000 - 20,000 ر.س" },
  { title:"مصمم جرافيك محترف",        company:"شركة الإبداع الرقمي",         salary:"8,000 - 12,000 ر.س" },
  { title:"منسق تسويق",               company:"مجموعة النجاح التجارية",      salary:"7,712 - 11,155 ر.س" },
  { title:"مدير حملات إعلانية",       company:"مؤسسة التميز للخدمات",        salary:"قابل للتفاوض" },
  { title:"مدير تسويق",               company:"مؤسسة الإبداع للتصميم",       salary:"5,369 - 9,618 ر.س" },
  { title:"مدير حملات إعلانية",       company:"شركة التقنية الحديثة",        salary:"قابل للتفاوض" },
];

const COLS = ["الوظيفة", "الشركة", "الراتب"];

export default function ClientJobsContent({ onBack }: Props) {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4 text-[#058B7F]" />
            </div>
            <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">الوظائف</h1>
          </div>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">استعرض الوظائف النشطة وطلبات التقديم الخاصة بك.</p>
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
              <Briefcase className="w-4 h-4 text-[#058B7F]" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">الوظائف</p>
              <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{JOBS.length} وظيفة</p>
            </div>
          </div>
        }
      >
        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <TableHead columns={COLS} />
            <tbody>
              {JOBS.map((job, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-50 transition-all duration-200 hover:bg-[#058B7F]/[0.025] group animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ animationDelay: `${idx * 45}ms`, animationFillMode: "both" }}
                >
                  <td className="px-5 py-4">
                    <p className="text-[14px] font-extrabold text-[#0e2453]">{job.title}</p>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-[13px] font-medium text-[#0e2453]/60">{job.company}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    {job.salary === "قابل للتفاوض" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#058B7F]/10 text-[#058B7F] border border-[#058B7F]/20">
                        {job.salary}
                      </span>
                    ) : (
                      <span className="text-[13px] font-bold text-[#0e2453]" dir="ltr">{job.salary}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="lg:hidden divide-y divide-gray-50">
          {JOBS.map((job, idx) => (
            <div
              key={idx}
              className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
              style={{ animationDelay: `${idx * 45}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <p className="text-[14px] font-extrabold text-[#0e2453]">{job.title}</p>
                {job.salary === "قابل للتفاوض" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#058B7F]/10 text-[#058B7F] border border-[#058B7F]/20 shrink-0">
                    {job.salary}
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-[#0e2453] shrink-0" dir="ltr">{job.salary}</span>
                )}
              </div>
              <p className="text-[12px] text-[#0e2453]/50 font-medium">{job.company}</p>
            </div>
          ))}
        </div>
      </TableCard>
    </div>
  );
}
