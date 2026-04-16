"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  unit?: string;
  icon: React.ElementType;
  gradient: string;
  change?: string;
  /** "arrow" shows ArrowUpRight icon next to change. "plain" shows text only. */
  changeStyle?: "arrow" | "plain";
  delay?: number;
}

export default function StatCard({
  title,
  value,
  subtitle,
  unit,
  icon: Icon,
  gradient,
  change,
  changeStyle = "arrow",
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className={`${gradient} rounded-2xl p-6 text-white relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-default`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/[0.07] group-hover:bg-white/[0.12] transition-colors" />
      <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/[0.04]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <Icon className="w-5 h-5" strokeWidth={1.5} />
          </div>
          {change && (
            <span className="text-[11px] font-bold bg-white/15 px-2.5 py-1 rounded-lg flex items-center gap-1">
              {changeStyle === "arrow" && <ArrowUpRight className="w-3 h-3" />}
              {change}
            </span>
          )}
        </div>

        {unit ? (
          <div className="flex items-end gap-1.5 mb-1">
            <h3 className="text-3xl font-extrabold tracking-tight">{value}</h3>
            <span className="text-[14px] font-bold text-white/70 mb-0.5">{unit}</span>
          </div>
        ) : (
          <h3 className="text-3xl font-extrabold mb-1 tracking-tight">{value}</h3>
        )}

        <p className="text-white/90 text-[13px] font-bold">{title}</p>
        {subtitle && (
          <p className="text-white/50 text-[11px] font-medium mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
