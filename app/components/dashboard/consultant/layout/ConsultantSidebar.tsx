"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { useRouter } from "next/navigation";
import { X, LogOut } from "lucide-react";
import { CONSULTANT_SIDEBAR_ITEMS } from "../constants";

const NAVY = "#0e2453";

interface Props {
  activeTab: string;
  open: boolean;
  onClose: () => void;
  onTabChange: (id: string) => void;
}

export default function ConsultantSidebar({ activeTab, open, onClose, onTabChange }: Props) {
  const router = useRouter();

  return (
    <>
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

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="space-y-0.5">
            {CONSULTANT_SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); onClose(); }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold
                    transition-all duration-200
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

        {/* Footer */}
        <div className="px-4 pb-6 pt-2 border-t border-white/[0.06]">
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
