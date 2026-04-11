"use client";

import React from "react";
import { Filter, ChevronDown } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export default function FilterDropdown({
  value,
  options,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 h-9 px-4 rounded-xl border border-gray-200 bg-white text-[13px] font-bold text-[#0e2453]/70 hover:border-[#058B7F] hover:text-[#058B7F] hover:bg-[#058B7F]/5 transition-all duration-200"
      >
        <Filter className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:block">{selected?.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-[calc(100%+6px)] min-w-[176px] bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 py-1.5 z-30 animate-[fadeSlideUp_0.2s_ease-out]">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-right px-4 py-2.5 text-[13px] font-bold transition-colors ${
                  value === opt.value
                    ? "bg-[#058B7F]/10 text-[#058B7F]"
                    : "text-[#0e2453]/70 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
