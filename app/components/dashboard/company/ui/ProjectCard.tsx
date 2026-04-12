"use client";

import React, { useEffect, useRef, useState } from "react";
import { DollarSign, Timer, MessageSquare, ExternalLink } from "lucide-react";

export interface ProjectCardData {
  title:    string;
  id:       string;
  progress: number;
  price:    string;
  duration: string;
}

interface Props {
  data: ProjectCardData;
  delay?: number;
}

export default function ProjectCard({ data, delay = 0 }: Props) {
  const [bar, setBar] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  /* Animate progress bar on mount */
  useEffect(() => {
    const timer = setTimeout(() => setBar(data.progress), delay + 150);
    return () => clearTimeout(timer);
  }, [data.progress, delay]);

  return (
    <div
      ref={ref}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#058B7F]/20 transition-all duration-200 overflow-hidden flex flex-col animate-[fadeSlideUp_0.4s_ease-out]"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {/* Top accent */}
      <div className="h-0.5 w-full bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-extrabold text-[#0e2453] leading-snug">{data.title}</h3>
          <span className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#0e2453]/[0.06] text-[#0e2453]/50 border border-[#0e2453]/10">
            {data.id}
          </span>
        </div>

        {/* Status badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-green-50 text-green-700 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            نشط
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#0e2453]/50">التقدم</span>
            <span className="text-[12px] font-extrabold text-amber-600">{data.progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-l from-amber-400 to-yellow-300 transition-all duration-700 ease-out"
              style={{ width: `${bar}%` }}
            />
          </div>
        </div>

        {/* Info row */}
        <div className="flex items-center gap-4 text-[12px] text-[#0e2453]/50 font-medium">
          <span className="flex items-center gap-1.5 font-bold text-[#058B7F]">
            <DollarSign className="w-3.5 h-3.5 shrink-0" />
            <span dir="ltr">{data.price}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Timer className="w-3.5 h-3.5 shrink-0" />
            {data.duration}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 flex items-center gap-2.5">
        <button className="flex-1 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:shadow-lg hover:shadow-[#058B7F]/25 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
          <ExternalLink className="w-3.5 h-3.5" />
          فتح
        </button>
        <button className="w-10 h-10 rounded-xl border border-gray-200 bg-gray-50 text-[#0e2453]/50 hover:border-[#058B7F]/30 hover:text-[#058B7F] hover:bg-[#058B7F]/5 transition-all duration-200 active:scale-95 flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
