"use client";

import React from "react";
import { Clock, DollarSign } from "lucide-react";

interface RequestItemProps {
  title: string;
  category: string;
  time: string;
  price: string;
  delay?: number;
}

const CATEGORY_STYLES: Record<string, string> = {
  "إعلانات مدفوعة": "bg-blue-50 text-blue-600 border-blue-200",
  "محتوى":          "bg-purple-50 text-purple-600 border-purple-200",
  "SEO":            "bg-amber-50 text-amber-600 border-amber-200",
};

export default function RequestItem({ title, category, time, price, delay = 0 }: RequestItemProps) {
  const badgeCls = CATEGORY_STYLES[category] ?? "bg-gray-100 text-gray-500 border-gray-200";

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:border-[#058B7F]/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-[fadeSlideUp_0.4s_ease-out]"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <p className="text-[14px] font-extrabold text-[#0e2453] truncate">{title}</p>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${badgeCls}`}>
            {category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#0e2453]/40 font-medium">
            <Clock className="w-3 h-3" />
            {time}
          </span>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1 text-[#058B7F]">
          <DollarSign className="w-3.5 h-3.5" />
          <span className="text-[14px] font-extrabold" dir="ltr">{price}</span>
        </div>
        <button className="px-4 py-2 rounded-lg text-[12px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:shadow-md hover:shadow-[#058B7F]/25 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 whitespace-nowrap">
          تقديم عرض
        </button>
      </div>
    </div>
  );
}
