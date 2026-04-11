"use client";

import React from "react";

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

export default function EmptyState({ icon: Icon, title, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 animate-[fadeSlideUp_0.6s_ease-out]">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-[#058B7F]/[0.06] flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#058B7F]/[0.08] flex items-center justify-center">
            <Icon className="w-8 h-8 text-[#058B7F]/40" strokeWidth={1.5} />
          </div>
        </div>
        <span className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-[#058B7F]/20" />
        <span className="absolute bottom-2 right-0 w-2 h-2 rounded-full bg-[#0e2453]/10" />
        <span className="absolute top-4 -right-2 w-1.5 h-1.5 rounded-full bg-[#058B7F]/15" />
      </div>

      <h3 className="text-[18px] font-extrabold text-[#0e2453]/60 mb-2">{title}</h3>
      <p className="text-[13px] font-medium text-[#0e2453]/35 text-center max-w-[320px] leading-relaxed">
        {subtitle}
      </p>

      <div className="mt-10 flex flex-col gap-2.5 w-full max-w-[480px] opacity-[0.25] pointer-events-none select-none">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-11 rounded-xl bg-gray-100 animate-pulse"
            style={{ animationDelay: `${n * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
