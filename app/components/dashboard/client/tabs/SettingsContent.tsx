"use client";

import React from "react";
import { Settings, UserCircle, Bell, CreditCard, ChevronLeft, Info } from "lucide-react";

interface Props {
  onBack?: () => void;
  onTabChange?: (id: string) => void;
}

const QUICK_ACTIONS = [
  { label:"تعديل الملف الشخصي", icon:UserCircle, tab: null },
  { label:"الإشعارات",           icon:Bell,       tab: "notifications" },
  { label:"المدفوعات",           icon:CreditCard, tab: "payments" },
];

const NOTES = [
  "تأكد من تحديث البريد الإلكتروني ورقم الهاتف.",
  "راجع المدفوعات والاشتراكات بشكل دوري.",
  "استخدم الإشعارات لتتبع التحديثات المهمة.",
];

export default function ClientSettingsContent({ onTabChange }: Props) {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
              <Settings className="w-4 h-4 text-[#058B7F]" />
            </div>
            <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">الإعدادات</h1>
          </div>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">إدارة الحساب والتنبيهات وبيانات الملف الشخصي</p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200 active:scale-95 shrink-0">
          <UserCircle className="w-4 h-4" />
          فتح الملف الشخصي
        </button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ── Quick Settings ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <Settings className="w-4 h-4 text-[#058B7F]" />
            </div>
            <p className="text-[14px] font-extrabold text-[#0e2453]">إعدادات سريعة</p>
          </div>

          <div className="p-5 space-y-3">
            {QUICK_ACTIONS.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => action.tab && onTabChange?.(action.tab)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-gray-200 text-[13px] font-extrabold text-[#0e2453]/80 bg-gray-50/50 hover:border-[#058B7F]/30 hover:bg-[#058B7F]/[0.03] hover:text-[#058B7F] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 active:scale-[0.98] animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ animationDelay: `${idx * 70}ms`, animationFillMode: "both" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0e2453]/5 flex items-center justify-center">
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <span>{action.label}</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 opacity-40" />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Account Notes ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden self-start">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <Info className="w-4 h-4 text-[#058B7F]" />
            </div>
            <p className="text-[14px] font-extrabold text-[#0e2453]">ملاحظات الحساب</p>
          </div>

          <div className="p-5 space-y-3">
            {NOTES.map((note, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#058B7F]/[0.04] border border-[#058B7F]/10 animate-[fadeSlideUp_0.4s_ease-out]"
                style={{ animationDelay: `${idx * 80}ms`, animationFillMode: "both" }}
              >
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#058B7F] shrink-0" />
                <p className="text-[13px] font-medium text-[#0e2453]/70 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
