"use client";

import React from "react";
import { Clapperboard, ChevronRight, ExternalLink, ShoppingBag, Globe } from "lucide-react";

interface Props {
  onBack?: () => void;
}

const WORKS = [
  {
    title:       "تصوير احترافي",
    platform:    "منصة عامة",
    description: "تصوير احترافي",
  },
  {
    title:       "رابط الصورة المصغرة",
    platform:    "منصة عامة",
    description: '<table style="border-collapse: collapse; width: 99.9642%;" border="1"><colgroup><col style...',
  },
  {
    title:       "مراجعة عطر فاخر - UGC",
    platform:    "TikTok",
    description: "فيديو مراجعة عفوي يوضح المميزات وتجربة الرائحة مع CTA واضح للشراء.",
  },
  {
    title:       "تصوير منتجات تجميل بإضاءة استوديو",
    platform:    "Instagram Reels",
    description: "إخراج فوتوغرافي وفيديو قصير لمنتجات Cosmetics بجودة High Production Value.",
  },
  {
    title:       "حملة إطلاق هاتف جديد مع مؤثرين",
    platform:    "Instagram + Snapchat",
    description: "تغطية ميدانية + Stories + Reels لتعزيز Awareness خلال أسبوع الإطلاق.",
  },
  {
    title:       "تجربة حقيقية لمنتج إلكتروني",
    platform:    "TikTok",
    description: "فيديو testimonial يوضح الاستخدام اليومي ويرفع الثقة قبل الشراء.",
  },
];

const PRODUCTS = [
  { title:"تصوير احترافي",      price:"150.00 SAR" },
  { title:"رابط الصورة المصغرة", price:"0.00 SAR" },
];

const PLATFORM_COLORS: Record<string, string> = {
  "TikTok":              "bg-black/5 text-black/60 border-black/10",
  "Instagram Reels":     "bg-pink-50 text-pink-600 border-pink-200",
  "Instagram + Snapchat":"bg-yellow-50 text-yellow-600 border-yellow-200",
  "منصة عامة":           "bg-[#0e2453]/[0.06] text-[#0e2453]/55 border-[#0e2453]/10",
};

function PlatformBadge({ platform }: { platform: string }) {
  const cls = PLATFORM_COLORS[platform] ?? "bg-gray-100 text-gray-500 border-gray-200";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${cls}`}>
      <Globe className="w-2.5 h-2.5 shrink-0" />
      {platform}
    </span>
  );
}

export default function ClientVisualProductionContent({ onBack }: Props) {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
              <Clapperboard className="w-4 h-4 text-[#058B7F]" />
            </div>
            <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">منصة الإنتاج المرئي</h1>
          </div>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">الأعمال المنشورة والمنتجات الرقمية المتاحة</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200 active:scale-95">
            <ExternalLink className="w-4 h-4" />
            استعراض المنصة
          </button>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-[#0e2453]/70 bg-white border border-gray-200 hover:border-[#058B7F]/40 hover:text-[#058B7F] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
            العودة للوحة
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

        {/* ── SECTION 1: Published Works ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
                <Clapperboard className="w-4 h-4 text-[#058B7F]" />
              </div>
              <div>
                <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">الأعمال المنشورة</p>
                <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{WORKS.length} عمل</p>
              </div>
            </div>
          </div>

          {/* Works grid */}
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WORKS.map((work, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-gray-100 bg-gray-50/50 p-4 hover:bg-white hover:border-[#058B7F]/20 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-[fadeSlideUp_0.4s_ease-out]"
                style={{ animationDelay: `${idx * 55}ms`, animationFillMode: "both" }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-[14px] font-extrabold text-[#0e2453] leading-snug line-clamp-2">{work.title}</p>
                  <PlatformBadge platform={work.platform} />
                </div>
                <p className="text-[12px] text-[#0e2453]/45 font-medium leading-relaxed line-clamp-2">
                  {work.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 2: Digital Products ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden self-start">
          {/* Toolbar */}
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#058B7F]" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">المنتجات الرقمية</p>
              <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{PRODUCTS.length} منتج</p>
            </div>
          </div>

          {/* Product list */}
          <div className="divide-y divide-gray-50">
            {PRODUCTS.map((product, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
                style={{ animationDelay: `${idx * 70}ms`, animationFillMode: "both" }}
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-extrabold text-[#0e2453] truncate">{product.title}</p>
                  <p className="text-[11px] font-bold text-[#058B7F] mt-0.5" dir="ltr">{product.price}</p>
                </div>
                <button className="shrink-0 px-3.5 py-1.5 rounded-lg text-[12px] font-extrabold text-[#058B7F] bg-[#058B7F]/8 border border-[#058B7F]/20 hover:bg-[#058B7F] hover:text-white hover:border-[#058B7F] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 active:scale-95">
                  فتح
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
