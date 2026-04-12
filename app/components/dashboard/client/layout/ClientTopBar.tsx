"use client";

import React from "react";
import { Menu, Bell, Globe } from "lucide-react";

interface ClientTopBarProps {
  onMenuOpen: () => void;
}

export default function ClientTopBar({ onMenuOpen }: ClientTopBarProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-6 lg:px-8 h-[72px] flex items-center justify-between shrink-0 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuOpen}
          className="lg:hidden text-[#0e2453]/60 hover:text-[#0e2453] transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-[16px] font-extrabold text-[#0e2453]">مرحباً، Ahmed Mohammed</h2>
          <p className="text-[12px] text-[#0e2453]/50 font-medium">إدارة الخدمات، الطلبات، المدفوعات والاشتراكات من مكان واحد</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#0e2453]/60 hover:bg-[#058B7F]/10 hover:text-[#058B7F] transition-all">
          <Globe className="w-[18px] h-[18px]" />
        </button>
        <button className="relative w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#0e2453]/60 hover:bg-[#058B7F]/10 hover:text-[#058B7F] transition-all">
          <Bell className="w-[18px] h-[18px]" />
        </button>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-[13px] mr-1 shadow-md">
          أح
        </div>
      </div>
    </header>
  );
}
