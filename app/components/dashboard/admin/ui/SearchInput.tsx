"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "بحث...",
  width = "w-[200px]",
  disabled = false,
}: SearchInputProps) {
  return (
    <div className={`relative ${disabled ? "opacity-40 pointer-events-none" : ""}`}>
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0e2453]/30 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={disabled}
        className={`
          pr-10 pl-4 h-9 ${width} rounded-xl border border-gray-200 bg-white
          text-[13px] font-medium text-[#0e2453]
          placeholder:text-[#0e2453]/30
          outline-none focus:border-[#058B7F] focus:ring-2 focus:ring-[#058B7F]/20
          transition-all duration-200
          ${disabled ? "cursor-not-allowed bg-gray-50" : ""}
        `}
      />
    </div>
  );
}
