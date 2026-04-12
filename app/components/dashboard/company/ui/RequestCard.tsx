"use client";

import React, { useState } from "react";
import { Clock, MapPin, Timer, Bookmark, BookmarkCheck } from "lucide-react";

export interface RequestCardData {
  title: string;
  category: string;
  price: string;
  description: string;
  duration: string;
  location: string;
  time: string;
}

const CATEGORY_STYLES: Record<string, string> = {
  "إعلانات مدفوعة": "bg-blue-50 text-blue-600 border-blue-200",
  "محتوى":          "bg-purple-50 text-purple-600 border-purple-200",
  "SEO":            "bg-amber-50 text-amber-600 border-amber-200",
  "فيديو":          "bg-rose-50 text-rose-600 border-rose-200",
  "سوشيال ميديا":  "bg-sky-50 text-sky-600 border-sky-200",
  "هوية بصرية":    "bg-teal-50 text-teal-600 border-teal-200",
};

interface Props {
  data: RequestCardData;
  delay?: number;
}

export default function RequestCard({ data, delay = 0 }: Props) {
  const [saved, setSaved] = useState(false);
  const badgeCls = CATEGORY_STYLES[data.category] ?? "bg-gray-100 text-gray-500 border-gray-200";

  return (
    <div
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#058B7F]/20 transition-all duration-200 overflow-hidden flex flex-col animate-[fadeSlideUp_0.4s_ease-out]"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Card body */}
      <div className="p-5 flex flex-col gap-3 flex-1">

        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-extrabold text-[#0e2453] leading-snug">{data.title}</h3>
          <button
            onClick={() => setSaved(!saved)}
            className="shrink-0 text-gray-300 hover:text-[#058B7F] transition-colors mt-0.5"
          >
            {saved
              ? <BookmarkCheck className="w-4.5 h-4.5 text-[#058B7F]" />
              : <Bookmark className="w-4.5 h-4.5" />
            }
          </button>
        </div>

        {/* Category + price row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${badgeCls}`}>
            {data.category}
          </span>
          <span className="text-[14px] font-extrabold text-[#058B7F]" dir="ltr">{data.price}</span>
        </div>

        {/* Description */}
        <p className="text-[12px] text-[#0e2453]/50 font-medium leading-relaxed line-clamp-2 flex-1">
          {data.description}
        </p>

        {/* Info row */}
        <div className="flex items-center gap-4 text-[11px] text-[#0e2453]/40 font-medium flex-wrap">
          <span className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 shrink-0" />
            {data.duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {data.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            {data.time}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <button className="w-full py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:shadow-lg hover:shadow-[#058B7F]/25 hover:-translate-y-0.5 transition-all duration-200 active:scale-95">
          تقديم عرض
        </button>
      </div>
    </div>
  );
}
