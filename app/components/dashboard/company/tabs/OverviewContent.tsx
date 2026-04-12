"use client";

import React from "react";
import {
  ClipboardList, FileText, FolderOpen, DollarSign,
  Star, Zap, Building2, ChevronLeft,
} from "lucide-react";
import RequestItem from "../ui/RequestItem";

interface StatCardProps {
  value: string;
  title: string;
  sub: string;
  icon: React.ElementType;
  gradient: string;
  delay?: number;
}

function StatCard({ value, title, sub, icon: Icon, gradient, delay = 0 }: StatCardProps) {
  return (
    <div
      className="relative rounded-2xl p-5 text-white overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-[fadeSlideUp_0.5s_ease-out]"
      style={{ background: `linear-gradient(135deg, ${gradient})`, animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-white/[0.07]" />
      <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/[0.05]" />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-[28px] font-extrabold leading-none mb-1">{value}</p>
          <p className="text-[13px] font-bold opacity-90 mb-1">{title}</p>
          <p className="text-[11px] font-medium opacity-60">{sub}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}

const STATS = [
  { value:"15",   title:"طلبات متاحة",      sub:"5 جديدة",           icon:ClipboardList, gradient:"#058B7F, #0FAE9E", delay:0 },
  { value:"28",   title:"عروض مقدمة",       sub:"12 قيد المراجعة",   icon:FileText,      gradient:"#0e2453, #1a3a7a", delay:80 },
  { value:"12",   title:"مشاريع نشطة",      sub:"معدل نجاح 95%",     icon:FolderOpen,    gradient:"#b45309, #d97706", delay:160 },
  { value:"125K", title:"ر.س أرباح الشهر", sub:"+15%",               icon:DollarSign,    gradient:"#7c3aed, #9333ea", delay:240 },
];

const REQUESTS = [
  { title:"حملة إعلانات مطعم",              category:"إعلانات مدفوعة", time:"منذ 2 ساعة",  price:"20,000 ر.س" },
  { title:"إدارة محتوى متجر إلكتروني",      category:"محتوى",          time:"منذ 4 ساعات", price:"15,000 ر.س" },
  { title:"تحسين SEO لموقع عيادة",         category:"SEO",            time:"منذ 6 ساعات", price:"12,000 ر.س" },
];

export default function CompanyOverviewContent({ onTabChange }: { onTabChange?: (id: string) => void }) {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Header */}
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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

        {/* ── Latest Requests ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-[#058B7F]" />
              </div>
              <div>
                <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">أحدث الطلبات المتاحة</p>
                <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{REQUESTS.length} طلبات</p>
              </div>
            </div>
            <button
              onClick={() => onTabChange?.("requests")}
              className="inline-flex items-center gap-1 text-[12px] font-extrabold text-[#058B7F] hover:text-[#0e2453] transition-colors"
            >
              عرض الكل
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {REQUESTS.map((req, idx) => (
              <RequestItem key={idx} {...req} delay={idx * 70} />
            ))}
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-5">

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#058B7F]" />
              </div>
              <p className="text-[14px] font-extrabold text-[#0e2453]">إجراءات سريعة</p>
            </div>
            <div className="p-4 space-y-2.5">
              <button
                onClick={() => onTabChange?.("requests")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200 active:scale-95"
              >
                <ClipboardList className="w-4 h-4" />
                تصفح الطلبات
              </button>
              <button
                onClick={() => onTabChange?.("settings")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[13px] font-extrabold text-[#0e2453]/80 bg-gray-50 border border-gray-200 hover:border-[#058B7F]/30 hover:bg-[#058B7F]/[0.03] hover:text-[#058B7F] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 active:scale-[0.98]"
              >
                <Building2 className="w-4 h-4" />
                تحديث ملف الشركة
              </button>
            </div>
          </div>

          {/* Company Rating */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Star className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-[14px] font-extrabold text-[#0e2453]">تقييم الشركة</p>
            </div>
            <div className="p-5 flex flex-col items-center text-center gap-3">
              <p className="text-[48px] font-extrabold text-[#0e2453] leading-none">4.8</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= 4 ? "text-amber-400 fill-amber-400" : "text-amber-200 fill-amber-100"}`}
                    strokeWidth={1}
                  />
                ))}
              </div>
              <p className="text-[12px] text-[#0e2453]/40 font-medium">من 156 تقييم</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
