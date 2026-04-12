"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { useRouter } from "next/navigation";
import { X, LogOut, Bell, Building2 } from "lucide-react";
import { COMPANY_SIDEBAR_ITEMS } from "../constants";

const NAVY = "#0e2453";

interface CompanySidebarProps {
  activeTab: string;
  open: boolean;
  onClose: () => void;
  onTabChange: (id: string) => void;
}

export default function CompanySidebar({
  activeTab,
  open,
  onClose,
  onTabChange,
}: CompanySidebarProps) {
  const router = useRouter();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 right-0 z-50
          w-[280px] flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
        style={{ background: `linear-gradient(180deg, ${NAVY} 0%, #0a1b40 100%)` }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 pt-7 pb-5">
          <img
            src="/ceentra-logo.png"
            alt="Ceentra Logo"
            className="h-8 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <button
            onClick={onClose}
            className="lg:hidden text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="space-y-0.5">
            {COMPANY_SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); onClose(); }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold
                    transition-all duration-200 relative
                    ${isActive
                      ? "bg-[#058B7F] text-white shadow-[0_4px_20px_rgba(5,139,127,0.35)]"
                      : "text-white/50 hover:bg-white/[0.06] hover:text-white/80 hover:translate-x-[-4px]"
                    }
                  `}
                >
                  <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={isActive ? 2 : 1.5} />
                  <span className="flex-1 text-right">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/50"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer: company identity + notifications */}
        <div className="px-4 pb-6 pt-3 border-t border-white/[0.06] space-y-2">
          {/* Company info */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#058B7F] to-[#0FAE9E] flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-extrabold text-white/80 truncate leading-none">Digital Creative Co</p>
              <p className="text-[10px] text-white/30 font-medium mt-0.5">شركة موثقة</p>
            </div>
            <div className="relative shrink-0">
              <Bell className="w-4 h-4 text-white/40" />
              <span className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-extrabold flex items-center justify-center">3</span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => router.push("/login")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}
