"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Globe, Languages, Bell, UserCircle, Menu } from "lucide-react";

interface CompanyTopBarProps {
  onMenuOpen: () => void;
  notificationCount?: number;
}

export default function CompanyTopBar({
  onMenuOpen,
  notificationCount = 3,
}: CompanyTopBarProps) {
  const router = useRouter();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0">

      {/* LEFT: Home button (desktop) + mobile menu toggle */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={onMenuOpen}
          className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Home button */}
        <button
          onClick={() => router.push("/")}
          className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[13px] font-semibold text-blue-600 border border-blue-400 hover:bg-blue-50 transition-colors duration-150"
        >
          <Globe className="w-3.5 h-3.5" />
          Home
        </button>
      </div>

      {/* RIGHT: actions + user */}
      <div className="flex items-center gap-3">

        {/* Language switcher */}
        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#0e2453] hover:bg-gray-100 rounded-lg transition-colors duration-150">
          <Languages className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#0e2453] hover:bg-gray-100 rounded-lg transition-colors duration-150">
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center leading-none">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200" />

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
            <UserCircle className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <span className="hidden sm:block text-[13px] font-semibold text-gray-700 group-hover:text-[#0e2453] transition-colors">
            Digital Creative Co
          </span>
        </div>
      </div>
    </header>
  );
}
