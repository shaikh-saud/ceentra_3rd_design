"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle, DollarSign, ToggleRight, AlignRight } from "lucide-react";

interface FormState {
  rate:         string;
  availability: "متاح" | "غير متاح";
  bio:          string;
}

export default function ConsultantSettingsContent() {
  const [form, setForm]   = useState<FormState>({
    rate:         "500.00",
    availability: "متاح",
    bio:          "خبير في استراتيجيات التسويق مع خبرة 15 عاماً في التسويق الرقمي وتطوير العلامات التجارية.",
  });
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  const [errors, setErrors] = useState<{ rate?: string }>({});

  function validate(): boolean {
    const e: { rate?: string } = {};
    if (!form.rate || parseFloat(form.rate) <= 0) {
      e.rate = "يجب أن يكون سعر الساعة أكبر من 0";
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

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
          <Settings className="w-4 h-4 text-[#058B7F]" />
        </div>
        <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">الإعدادات</h1>
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

        <div className="p-6 space-y-6">

          {/* Two-col row: rate + availability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Rate */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-extrabold text-[#0e2453]/70">
                سعر الساعة (ر.س)
              </label>
              <div className="relative">
                <DollarSign className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0e2453]/25 pointer-events-none" />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.rate}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, rate: e.target.value }));
                    setErrors((p) => ({ ...p, rate: undefined }));
                  }}
                  className={`w-full pr-10 pl-4 py-3 rounded-xl border text-[13px] font-medium text-[#0e2453] bg-gray-50/60 focus:outline-none focus:bg-white transition-all duration-200 ${
                    errors.rate
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200 focus:border-[#058B7F]/50 focus:shadow-[0_0_0_3px_rgba(5,139,127,0.08)]"
                  }`}
                  dir="ltr"
                />
              </div>
              {errors.rate && (
                <p className="text-[11px] font-bold text-red-500">{errors.rate}</p>
              )}
            </div>

            {/* Availability */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-extrabold text-[#0e2453]/70">التوفر</label>
              <div className="relative">
                <ToggleRight className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0e2453]/25 pointer-events-none" />
                <select
                  value={form.availability}
                  onChange={(e) => setForm((p) => ({ ...p, availability: e.target.value as FormState["availability"] }))}
                  className="w-full appearance-none pr-10 pl-4 py-3 rounded-xl border border-gray-200 bg-gray-50/60 text-[13px] font-medium text-[#0e2453] focus:outline-none focus:bg-white focus:border-[#058B7F]/50 focus:shadow-[0_0_0_3px_rgba(5,139,127,0.08)] transition-all duration-200 cursor-pointer"
                >
                  <option>متاح</option>
                  <option>غير متاح</option>
                </select>
                {/* Availability indicator */}
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                  form.availability === "متاح" ? "bg-green-500" : "bg-gray-400"
                }`} />
              </div>
            </div>
          </div>

          {/* Bio textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-extrabold text-[#0e2453]/70">نبذة عنك</label>
            <div className="relative">
              <AlignRight className="absolute right-3.5 top-3.5 w-4 h-4 text-[#0e2453]/25 pointer-events-none" />
              <textarea
                rows={4}
                value={form.bio}
                onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 bg-gray-50/60 text-[13px] font-medium text-[#0e2453] leading-relaxed resize-none focus:outline-none focus:bg-white focus:border-[#058B7F]/50 focus:shadow-[0_0_0_3px_rgba(5,139,127,0.08)] transition-all duration-200"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="text-[12px] text-[#0e2453]/35 font-medium">
              سيتم تطبيق التغييرات على ملفك الشخصي ونظام الحجز فور الحفظ.
            </p>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
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
                  حفظ
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
