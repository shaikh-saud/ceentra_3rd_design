"use client";

import React from "react";
import { Construction } from "lucide-react";

interface Props {
  tab: string;
}

export default function TrainerPlaceholderContent({ tab }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-[fadeSlideUp_0.45s_ease-out]">
      <div className="w-16 h-16 rounded-2xl bg-[#058B7F]/8 flex items-center justify-center mb-5"
           style={{ background: "rgba(5,139,127,0.08)" }}>
        <Construction className="w-8 h-8 text-[#058B7F]/50" />
      </div>
      <p className="text-[18px] font-extrabold text-[#0e2453] mb-2">قيد التطوير</p>
      <p className="text-[13px] text-[#0e2453]/40 font-medium">
        صفحة <span className="font-bold text-[#0e2453]/60">{tab}</span> ستكون متاحة قريباً
      </p>
    </div>
  );
}
