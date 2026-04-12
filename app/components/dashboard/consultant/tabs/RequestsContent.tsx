"use client";

import React, { useState, useMemo } from "react";
import { ClipboardList, Search, ChevronDown } from "lucide-react";

interface Order {
  clientName:  string;
  clientEmail: string;
  subject:     string;
  date:        string;
  status:      "مقبول" | "مكتمل" | "مرفوض" | "معلق";
}

const ORDERS: Order[] = [
  { clientName:"محمد أحمد 18", clientEmail:"user18@example.com", subject:"تطوير نموذج العمل التجاري",          date:"2026-03-15", status:"مقبول"  },
  { clientName:"محمد أحمد 1",  clientEmail:"user1@example.com",  subject:"إدارة التدفقات النقدية",             date:"2026-03-15", status:"مكتمل"  },
  { clientName:"محمد أحمد 29", clientEmail:"user29@example.com", subject:"تطوير سياسات الموارد البشرية",       date:"2026-03-15", status:"مقبول"  },
  { clientName:"محمد أحمد 22", clientEmail:"user22@example.com", subject:"بناء خطة تسويقية متكاملة",           date:"2026-03-15", status:"مرفوض"  },
  { clientName:"محمد أحمد 5",  clientEmail:"user5@example.com",  subject:"تطوير سياسات الموارد البشرية",       date:"2026-03-14", status:"مكتمل"  },
  { clientName:"محمد أحمد 21", clientEmail:"user21@example.com", subject:"تصميم مواد تسويقية احترافية",        date:"2026-03-14", status:"مرفوض"  },
  { clientName:"محمد أحمد 2",  clientEmail:"user2@example.com",  subject:"استراتيجيات التوظيف والاستقطاب",    date:"2026-03-13", status:"مقبول"  },
  { clientName:"محمد أحمد 17", clientEmail:"user17@example.com", subject:"مراجعة العقود والاتفاقيات",          date:"2026-03-13", status:"مقبول"  },
];

const STATUS_BADGE: Record<Order["status"], string> = {
  "مقبول":  "bg-green-50 text-green-700 border-green-200",
  "مكتمل":  "bg-blue-50  text-blue-700  border-blue-200",
  "مرفوض":  "bg-red-50   text-red-700   border-red-200",
  "معلق":   "bg-amber-50 text-amber-700 border-amber-200",
};
const STATUS_DOT: Record<Order["status"], string> = {
  "مقبول":  "bg-green-500",
  "مكتمل":  "bg-blue-500",
  "مرفوض":  "bg-red-500",
  "معلق":   "bg-amber-400",
};

const FILTER_OPTIONS = ["الكل", "مقبول", "مكتمل", "مرفوض", "معلق"];
const COLS = ["العميل", "الموضوع", "التاريخ", "الحالة", "الإجراءات"];

function initials(name: string) {
  const parts = name.trim().split(" ");
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0][0];
}

const AVATAR_GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-teal-500 to-emerald-600",
  "from-purple-500 to-violet-600",
  "from-orange-500 to-amber-600",
  "from-sky-500 to-cyan-600",
  "from-rose-500 to-pink-600",
  "from-[#0e2453] to-[#1a3a7a]",
  "from-[#058B7F] to-[#0FAE9E]",
];

export default function ConsultantRequestsContent() {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("الكل");

  const rows = useMemo(() =>
    ORDERS.filter((o) => {
      const matchFilter = filter === "الكل" || o.status === filter;
      const matchSearch = o.clientName.includes(search) || o.subject.includes(search);
      return matchFilter && matchSearch;
    }),
    [search, filter]
  );

  const pendingCount = ORDERS.filter((o) => o.status === "معلق" || o.status === "مقبول").length;

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
          <ClipboardList className="w-4 h-4 text-[#058B7F]" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">الطلبات</h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {pendingCount} معلق
          </span>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-50 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <ClipboardList className="w-4 h-4 text-[#058B7F]" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">قائمة الطلبات</p>
              <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{rows.length} طلب</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0e2453]/30 pointer-events-none" />
              <input
                type="text"
                placeholder="بحث..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-9 pl-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-[13px] font-medium text-[#0e2453] placeholder:text-[#0e2453]/30 focus:outline-none focus:border-[#058B7F]/40 focus:bg-white transition-colors w-[180px]"
              />
            </div>

            {/* Filter */}
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
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-[14px] font-extrabold text-[#0e2453]/30">
                    لا توجد طلبات مطابقة
                  </td>
                </tr>
              ) : rows.map((order, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-50 hover:bg-[#058B7F]/[0.025] transition-colors duration-150 animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ animationDelay: `${idx * 50}ms`, animationFillMode: "both" }}
                >
                  {/* Client */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white text-[11px] font-extrabold shrink-0`}>
                        {initials(order.clientName)}
                      </div>
                      <div>
                        <p className="text-[13px] font-extrabold text-[#0e2453] leading-none">{order.clientName}</p>
                        <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5" dir="ltr">{order.clientEmail}</p>
                      </div>
                    </div>
                  </td>

                  {/* Subject */}
                  <td className="px-5 py-4 max-w-[220px]">
                    <p className="text-[13px] font-bold text-[#0e2453]/80 truncate">{order.subject}</p>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-[12px] font-medium text-[#0e2453]/50" dir="ltr">{order.date}</span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${STATUS_BADGE[order.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[order.status]}`} />
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <button className="px-4 py-1.5 rounded-lg text-[12px] font-extrabold text-[#058B7F] border border-[#058B7F]/30 bg-[#058B7F]/5 hover:bg-[#058B7F] hover:text-white hover:border-[#058B7F] transition-all duration-200 active:scale-95">
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden divide-y divide-gray-50">
          {rows.length === 0 && (
            <p className="px-5 py-12 text-center text-[14px] font-extrabold text-[#0e2453]/30">لا توجد طلبات مطابقة</p>
          )}
          {rows.map((order, idx) => (
            <div
              key={idx}
              className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
              style={{ animationDelay: `${idx * 50}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white text-[11px] font-extrabold shrink-0`}>
                    {initials(order.clientName)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-extrabold text-[#0e2453] truncate">{order.clientName}</p>
                    <p className="text-[11px] text-[#0e2453]/40 font-medium" dir="ltr">{order.clientEmail}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold border shrink-0 ${STATUS_BADGE[order.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[order.status]}`} />
                  {order.status}
                </span>
              </div>
              <p className="text-[13px] font-bold text-[#0e2453]/70 mb-1">{order.subject}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#0e2453]/40 font-medium" dir="ltr">{order.date}</span>
                <button className="px-4 py-1.5 rounded-lg text-[12px] font-extrabold text-[#058B7F] border border-[#058B7F]/30 bg-[#058B7F]/5 hover:bg-[#058B7F] hover:text-white transition-all duration-200">
                  عرض
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
