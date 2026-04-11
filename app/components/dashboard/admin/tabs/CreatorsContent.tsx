"use client";

import React from "react";
import { Video, Eye } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import TableCard from "../ui/TableCard";
import ActionBtn from "../ui/ActionBtn";

type CreatorPath   = "UGC" | "مؤثر / مدوّن";
type CreatorStatus = "معتمد" | "مسودة";
type CreatorCat    = "الجمال" | "التقنية" | "التصوير";

interface Creator {
  id: number;
  name: string;
  email: string;
  path: CreatorPath;
  category: CreatorCat;
  status: CreatorStatus;
  updatedAt: string;
}

const CREATORS: Creator[] = [
  { id:1, name:"نورة العتيبي",      email:"ugc.noura@sentra.com",         path:"UGC",           category:"الجمال",   status:"معتمد",  updatedAt:"2026-03-15" },
  { id:2, name:"فيصل القحطاني",     email:"influencer.faisal@sentra.com", path:"مؤثر / مدوّن",  category:"التقنية",  status:"معتمد",  updatedAt:"2026-03-15" },
  { id:3, name:"منشئ المحتوى المرئي", email:"creator@sentra.com",          path:"UGC",           category:"التصوير",  status:"مسودة",  updatedAt:"2026-03-17" },
];

const PATH_CONFIG: Record<CreatorPath, string> = {
  "UGC":          "bg-[#058B7F]/10 text-[#058B7F] border-[#058B7F]/20",
  "مؤثر / مدوّن": "bg-yellow-50 text-yellow-700 border-yellow-200",
};

const STATUS_CONFIG: Record<CreatorStatus, { dot: string; pill: string }> = {
  "معتمد": { dot:"bg-green-500",  pill:"bg-green-50 text-green-700 border-green-200" },
  "مسودة": { dot:"bg-gray-400",   pill:"bg-gray-100 text-gray-500 border-gray-200" },
};

const COLS = ["الاسم", "المسار", "الفئة", "الحالة", "آخر تحديث", "الإجراءات"];

const CAT_COLORS: Record<CreatorCat, string> = {
  "الجمال":   "bg-pink-50 text-pink-600 border-pink-100",
  "التقنية":  "bg-blue-50 text-blue-600 border-blue-100",
  "التصوير":  "bg-purple-50 text-purple-600 border-purple-100",
};

export default function CreatorsContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Header — badge styled red for "under review" */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
              <Video className="w-4 h-4 text-[#058B7F]" />
            </div>
            <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">
              طلبات اعتماد صناع المحتوى
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-extrabold bg-red-50 text-red-600 border border-red-200">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              0 قيد المراجعة
            </span>
          </div>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">لوحة إدارة منصة سنترا</p>
        </div>
      </div>

      {/* Table Card */}
      <TableCard
        toolbar={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <Video className="w-4 h-4 text-[#058B7F]" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">قائمة الطلبات</p>
              <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{CREATORS.length} طلب</p>
            </div>
          </div>
        }
      >
        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f8fafc]">
                {COLS.map((col) => (
                  <th key={col} className="px-5 py-3.5 text-right text-[12px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CREATORS.map((creator, idx) => {
                const sc = STATUS_CONFIG[creator.status];
                const pc = PATH_CONFIG[creator.path];
                const cc = CAT_COLORS[creator.category];
                return (
                  <tr
                    key={creator.id}
                    className="border-b border-gray-50 transition-all duration-150 hover:bg-[#0e2453]/[0.018] group animate-[fadeSlideUp_0.4s_ease-out]"
                    style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
                  >
                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0e2453] to-[#058B7F] flex items-center justify-center text-white text-[12px] font-extrabold shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                          {creator.name.slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[14px] font-extrabold text-[#0e2453] truncate leading-snug">{creator.name}</p>
                          <p className="text-[11px] font-medium text-[#0e2453]/40 truncate mt-0.5" dir="ltr">{creator.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Path */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-extrabold border ${pc}`}>
                        {creator.path}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border ${cc}`}>
                        {creator.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold border ${sc.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {creator.status}
                      </span>
                    </td>

                    {/* Last update */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-[13px] font-medium text-[#0e2453]/45">
                        {new Date(creator.updatedAt).toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"numeric" })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <ActionBtn
                        icon={Eye}
                        title="عرض"
                        base="border-blue-200 text-blue-500"
                        hover="hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_4px_12px_rgba(59,130,246,0.35)]"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="lg:hidden divide-y divide-gray-50">
          {CREATORS.map((creator, idx) => {
            const sc = STATUS_CONFIG[creator.status];
            const pc = PATH_CONFIG[creator.path];
            const cc = CAT_COLORS[creator.category];
            return (
              <div
                key={creator.id}
                className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
                style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0e2453] to-[#058B7F] flex items-center justify-center text-white text-[13px] font-extrabold shrink-0 shadow-sm">
                    {creator.name.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-extrabold text-[#0e2453] truncate">{creator.name}</p>
                    <p className="text-[11px] text-[#0e2453]/40 truncate" dir="ltr">{creator.email}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold border shrink-0 ${sc.pill}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {creator.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap mb-3 px-1">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${pc}`}>{creator.path}</span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold border ${cc}`}>{creator.category}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#0e2453]/40 font-medium">
                    {new Date(creator.updatedAt).toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"numeric" })}
                  </span>
                  <ActionBtn icon={Eye} title="عرض" base="border-blue-200 text-blue-500" hover="hover:bg-blue-500 hover:text-white hover:border-blue-500" size="sm" />
                </div>
              </div>
            );
          })}
        </div>
      </TableCard>
    </div>
  );
}
