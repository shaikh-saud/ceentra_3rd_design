"use client";

import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface PaginationRowProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
}

function PaginationBtn({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-navy/50 hover:bg-navy hover:text-white hover:border-navy disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-navy/50 disabled:hover:border-gray-200 transition-all duration-200"
    >
      {children}
    </button>
  );
}

export default function PaginationRow({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  itemLabel = "عنصر",
  onPageChange,
}: PaginationRowProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
      <p className="text-[12px] font-medium text-[#0e2453]/40">
        عرض {start}–{end} من {totalItems} {itemLabel}
      </p>

      <div className="flex items-center gap-1.5">
        <PaginationBtn
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronRight className="w-4 h-4" />
        </PaginationBtn>

        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-xl text-[13px] font-bold border transition-all duration-200 ${
              currentPage === p
                ? "bg-navy text-white border-navy shadow-[0_4px_12px_rgba(14,36,83,0.3)]"
                : "border-gray-200 text-navy/60 hover:bg-navy hover:text-white hover:border-navy"
            }`}
          >
            {p}
          </button>
        ))}

        <PaginationBtn
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronLeft className="w-4 h-4" />
        </PaginationBtn>
      </div>
    </div>
  );
}
