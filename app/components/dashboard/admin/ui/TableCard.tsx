"use client";

import React from "react";

interface TableCardProps {
  /** Optional toolbar rendered above the table */
  toolbar?: React.ReactNode;
  children: React.ReactNode;
  /** Optional footer (e.g. pagination) */
  footer?: React.ReactNode;
}

export default function TableCard({ toolbar, children, footer }: TableCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
      {toolbar && (
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
          {toolbar}
        </div>
      )}
      {children}
      {footer}
    </div>
  );
}

/** Shared table <thead> column headers */
export function TableHead({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr className="border-b border-gray-100 bg-[#f8fafc]">
        {columns.map((col) => (
          <th
            key={col}
            className="px-5 py-4 text-right text-[12px] font-extrabold text-[#0e2453]/50 uppercase tracking-wide whitespace-nowrap"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

/** Empty row shown when no data matches */
export function EmptyRow({ colSpan, message = "لا توجد نتائج مطابقة" }: { colSpan: number; message?: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-5 py-16 text-center text-[14px] font-bold text-[#0e2453]/30">
        {message}
      </td>
    </tr>
  );
}

/** Status pill (active/paused) */
export function StatusBadge({ active, activeLabel = "نشط", inactiveLabel = "متوقف" }: {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}) {
  return active ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50 text-green-600 border border-green-100">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      {activeLabel}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-50 text-orange-500 border border-orange-100">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
      {inactiveLabel}
    </span>
  );
}

/** Coloured pill badge */
export function Badge({ label, classes }: { label: string; classes: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border ${classes}`}>
      {label}
    </span>
  );
}
