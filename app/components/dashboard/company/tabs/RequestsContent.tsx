"use client";

import React, { useState, useMemo } from "react";
import { ClipboardList, Search, SlidersHorizontal, Zap } from "lucide-react";
import RequestCard, { RequestCardData } from "../ui/RequestCard";

const ALL_REQUESTS: RequestCardData[] = [
  {
    title:       "حملة إعلانات مطعم",
    category:    "إعلانات مدفوعة",
    price:       "20,000 ر.س",
    description: "إدارة حملة إعلانية متكاملة على منصات Meta وGoogle لزيادة الحجوزات والوعي بالعلامة التجارية للمطعم.",
    duration:    "5 أسابيع",
    location:    "الرياض",
    time:        "منذ 1 ساعة",
  },
  {
    title:       "حملة محتوى متجر",
    category:    "محتوى",
    price:       "25,000 ر.س",
    description: "إنتاج محتوى إبداعي شامل لمتجر إلكتروني يشمل تصوير المنتجات وكتابة المحتوى التسويقي.",
    duration:    "6 أسابيع",
    location:    "الرياض",
    time:        "منذ 2 ساعات",
  },
  {
    title:       "حملة SEO عيادة",
    category:    "SEO",
    price:       "30,000 ر.س",
    description: "تحسين ظهور موقع عيادة طبية في محركات البحث وزيادة الزيارات العضوية والمواعيد المحجوزة.",
    duration:    "7 أسابيع",
    location:    "الرياض",
    time:        "منذ 3 ساعات",
  },
  {
    title:       "حملة فيديو تطبيق",
    category:    "فيديو",
    price:       "35,000 ر.س",
    description: "إنتاج فيديوهات ترويجية احترافية لتطبيق جوال تشمل explainer video وإعلانات قصيرة.",
    duration:    "8 أسابيع",
    location:    "الرياض",
    time:        "منذ 4 ساعات",
  },
  {
    title:       "حملة سوشيال ميديا",
    category:    "سوشيال ميديا",
    price:       "40,000 ر.س",
    description: "إدارة حسابات التواصل الاجتماعي بشكل كامل مع إنتاج المحتوى وجدولته وتحليل الأداء أسبوعياً.",
    duration:    "9 أسابيع",
    location:    "الرياض",
    time:        "منذ 5 ساعات",
  },
  {
    title:       "حملة تصميم هوية",
    category:    "هوية بصرية",
    price:       "45,000 ر.س",
    description: "تصميم هوية بصرية متكاملة تشمل الشعار والألوان والخطوط وكافة مواد التسويق المطبوعة والرقمية.",
    duration:    "10 أسابيع",
    location:    "الرياض",
    time:        "منذ 6 ساعات",
  },
];

const SERVICE_TYPES = ["الكل", "إعلانات مدفوعة", "محتوى", "SEO", "فيديو", "سوشيال ميديا", "هوية بصرية"];
const BUDGETS       = ["الكل", "أقل من 25,000", "25,000 – 35,000", "أكثر من 35,000"];

export default function CompanyRequestsContent() {
  const [search,      setSearch]      = useState("");
  const [serviceType, setServiceType] = useState("الكل");
  const [budget,      setBudget]      = useState("الكل");

  const filtered = useMemo(() => {
    return ALL_REQUESTS.filter((r) => {
      const matchSearch  = r.title.includes(search) || r.category.includes(search);
      const matchService = serviceType === "الكل" || r.category === serviceType;
      return matchSearch && matchService;
    });
  }, [search, serviceType]);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Company header */}
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

      {/* Page title + count */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
          <ClipboardList className="w-4 h-4 text-[#058B7F]" />
        </div>
        <div>
          <h2 className="text-[20px] font-extrabold text-[#0e2453] leading-tight">الطلبات المفتوحة</h2>
          <p className="text-[12px] text-[#0e2453]/40 font-medium">{filtered.length} طلب متاح</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Service type */}
        <div className="relative">
          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0e2453]/30 pointer-events-none" />
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="appearance-none pr-8 pl-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[13px] font-bold text-[#0e2453]/80 focus:outline-none focus:border-[#058B7F]/40 transition-colors cursor-pointer"
          >
            {SERVICE_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        {/* Budget */}
        <div className="relative">
          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0e2453]/30 pointer-events-none" />
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="appearance-none pr-8 pl-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[13px] font-bold text-[#0e2453]/80 focus:outline-none focus:border-[#058B7F]/40 transition-colors cursor-pointer"
          >
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>

        {/* Search */}
        <div className="relative flex-1 sm:max-w-[280px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0e2453]/30 pointer-events-none" />
          <input
            type="text"
            placeholder="بحث..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-[#0e2453] placeholder:text-[#0e2453]/30 focus:outline-none focus:border-[#058B7F]/40 transition-colors"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((req, idx) => (
            <RequestCard key={idx} data={req} delay={idx * 60} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#058B7F]/[0.07] flex items-center justify-center mb-4">
            <ClipboardList className="w-7 h-7 text-[#058B7F]/40" strokeWidth={1.5} />
          </div>
          <p className="text-[16px] font-extrabold text-[#0e2453]/40 mb-1">لا توجد طلبات مطابقة</p>
          <p className="text-[12px] text-[#0e2453]/25 font-medium">جرّب تغيير معايير البحث أو الفلتر</p>
        </div>
      )}
    </div>
  );
}
