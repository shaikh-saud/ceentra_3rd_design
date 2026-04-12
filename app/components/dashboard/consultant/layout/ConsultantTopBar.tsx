"use client";

import React from "react";
import { Menu, Bell } from "lucide-react";

interface Props {
  onMenuOpen: () => void;
}

export default function ConsultantTopBar({ onMenuOpen }: Props) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-5 lg:px-8 shrink-0 shadow-[0_1px_0_rgba(14,36,83,0.06)]">

      {/* Mobile menu */}
      <button
        onClick={onMenuOpen}
        className="lg:hidden w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#0e2453]/60 hover:text-[#058B7F] hover:border-[#058B7F]/30 transition-all"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Greeting (desktop) */}
      <div className="hidden lg:block">
        <p className="text-[15px] font-extrabold text-[#0e2453] leading-none">مرحباً، د. أحمد الراشد</p>
        <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">لوحة تحكم المستشار</p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#0e2453]/50 hover:text-[#058B7F] hover:border-[#058B7F]/30 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-extrabold flex items-center justify-center">3</span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block text-left">
            <p className="text-[13px] font-extrabold text-[#0e2453] leading-none">د. أحمد الراشد</p>
            <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">مستشار معتمد</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-[13px] font-extrabold shadow-sm">
            أح
          </div>
        </div>
      </div>
    </header>
  );
}
