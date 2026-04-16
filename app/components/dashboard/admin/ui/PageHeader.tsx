"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  icon?: React.ElementType;
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  badge,
  icon: Icon,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-navy/10 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-navy" />
            </div>
          )}
          <h1 className="text-[24px] font-extrabold text-navy leading-tight">{title}</h1>
          {badge && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-navy/8 text-navy border border-navy/15">
              {badge}
            </span>
          )}
        </div>
        <p className="text-[13px] text-[#0e2453]/50 font-medium">{subtitle}</p>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
