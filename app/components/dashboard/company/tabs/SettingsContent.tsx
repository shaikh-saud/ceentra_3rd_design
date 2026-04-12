"use client";

import React, { useState } from "react";
import { Settings, Zap, Save, CheckCircle, Building2, Mail, Phone } from "lucide-react";

interface FormState {
  name:  string;
  email: string;
  phone: string;
}

interface Errors {
  email?: string;
  phone?: string;
}

export default function CompanySettingsContent() {
  const [form, setForm]       = useState<FormState>({
    name:  "Digital Creative Marketing Co",
    email: "company@sentra.com",
    phone: "0500000003",
  });
  const [errors, setErrors]   = useState<Errors>({});
  const [saving, setSaving]   = useState(false);
  const [saved,  setSaved]    = useState(false);

  function validate(): boolean {
    const e: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "صيغة البريد الإلكتروني غير صحيحة";
    }
    if (!/^05\d{8}$/.test(form.phone)) {
      e.phone = "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  }

  const field = (
    id: keyof FormState,
    label: string,
    icon: React.ElementType,
    type = "text",
  ) => {
    const Icon = icon;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-[13px] font-extrabold text-[#0e2453]/70">
          {label}
        </label>
        <div className="relative">
          <Icon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0e2453]/25 pointer-events-none" />
          <input
            id={id}
            type={type}
            dir={id === "email" ? "ltr" : "rtl"}
            value={form[id]}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, [id]: e.target.value }));
              setErrors((prev) => ({ ...prev, [id]: undefined }));
            }}
            className={`w-full pr-10 pl-4 py-3 rounded-xl border text-[13px] font-medium text-[#0e2453] placeholder:text-[#0e2453]/25 bg-gray-50/60 focus:outline-none focus:bg-white transition-all duration-200 ${
              errors[id as keyof Errors]
                ? "border-red-300 focus:border-red-400"
                : "border-gray-200 focus:border-[#058B7F]/50 focus:shadow-[0_0_0_3px_rgba(5,139,127,0.08)]"
            }`}
          />
        </div>
        {errors[id as keyof Errors] && (
          <p className="text-[11px] font-bold text-red-500">{errors[id as keyof Errors]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Company header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#0e2453] leading-tight mb-1">
            مرحباً، Digital Creative Marketing Co
          </h1>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">إدارة طلباتك، عروضك، ومشاريعك الحالية</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-green-50 text-green-700 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            شركة موثقة
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
            <Zap className="w-3 h-3" />
            سريعة الرد
          </span>
        </div>
      </div>

      {/* Settings card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
          <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
            <Settings className="w-4 h-4 text-[#058B7F]" />
          </div>
          <p className="text-[14px] font-extrabold text-[#0e2453]">إعدادات الحساب</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {field("name",  "اسم الشركة",        Building2)}
            {field("email", "البريد الإلكتروني", Mail, "email")}
            {field("phone", "رقم الجوال",        Phone, "tel")}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="text-[12px] text-[#0e2453]/35 font-medium">
              سيتم تطبيق التغييرات على ملف الشركة فوراً بعد الحفظ.
            </p>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0"
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  حفظ التغييرات
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success toast */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-green-600 text-white shadow-xl shadow-green-600/30 transition-all duration-300 ${
          saved ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <CheckCircle className="w-5 h-5 shrink-0" />
        <p className="text-[13px] font-extrabold">تم حفظ التغييرات بنجاح</p>
      </div>
    </div>
  );
}
