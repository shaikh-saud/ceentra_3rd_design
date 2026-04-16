"use client";

import React, { useState } from "react";
import {
  Bell, Send, Eye, FileText, Info,
  Lightbulb, Database, Mail, Smartphone, MessageSquare, Webhook, Users,
} from "lucide-react";

/* ─── Reusable form primitives ─── */
function SectionCard({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon?: React.ElementType }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
            <Icon className="w-3.5 h-3.5 text-navy" />
          </div>
        )}
        <h2 className="text-[14px] font-extrabold text-[#0e2453]">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="block text-[13px] font-extrabold text-[#0e2453]/80 mb-1.5">
      {label}
      {required && <span className="text-red-500 mr-0.5">*</span>}
    </label>
  );
}

const inputCls = "w-full h-10 px-4 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none focus:border-navy/50 focus:ring-2 focus:ring-navy/10 transition-all duration-200";
const selectCls = "w-full h-10 px-4 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-[#0e2453] outline-none focus:border-navy/50 focus:ring-2 focus:ring-navy/10 transition-all duration-200 cursor-pointer appearance-none";
const textareaCls = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none focus:border-navy/50 focus:ring-2 focus:ring-navy/10 transition-all duration-200 resize-none";

function SelectField({ label, required, options, defaultValue }: {
  label: string; required?: boolean; options: string[]; defaultValue?: string;
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <select className={selectCls} defaultValue={defaultValue}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#0e2453]/40">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </div>
  );
}

function CheckOption({ label, defaultChecked, icon: Icon }: { label: string; defaultChecked?: boolean; icon?: React.ElementType }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 select-none ${checked ? "bg-navy/5 border-navy/20" : "bg-white border-gray-200 hover:border-navy/20 hover:bg-gray-50/60"}`}>
      <div
        onClick={() => setChecked(!checked)}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${checked ? "bg-navy border-navy" : "border-gray-300"}`}
      >
        {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
      </div>
      {Icon && <Icon className={`w-4 h-4 shrink-0 ${checked ? "text-navy" : "text-navy/40"}`} strokeWidth={1.8} />}
      <span className={`text-[13px] font-bold ${checked ? "text-navy" : "text-navy/70"}`}>{label}</span>
    </label>
  );
}

function RadioOption({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:border-navy/20 hover:bg-gray-50/60 transition-all duration-200 select-none group">
      <input type="radio" name={name} defaultChecked={defaultChecked}
        className="w-4 h-4 accent-navy shrink-0 cursor-pointer" />
      <span className="text-[13px] font-bold text-navy/70 group-has-[:checked]:text-navy">{label}</span>
    </label>
  );
}

function HelperText({ text }: { text: string }) {
  return <p className="mt-1.5 text-[11px] font-medium text-[#0e2453]/40" dir="ltr">{text}</p>;
}

const LOG_COLS = ["العنوان", "النوع", "القنوات", "الهدف", "المرسِل", "التاريخ"];

export default function AlertsContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-navy/10 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4 text-navy" />
            </div>
            <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">إنشاء تنبيه جديد</h1>
          </div>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">لوحة إدارة منصة سنترا</p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-[#0e2453]/60 bg-white border border-gray-200 hover:border-gray-300 hover:text-[#0e2453] transition-all duration-200 active:scale-95">
            إلغاء
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-navy shadow-[0_4px_16px_rgba(14,36,83,0.25)] hover:shadow-[0_8px_24px_rgba(14,36,83,0.35)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95">
            <Send className="w-4 h-4" />
            حفظ وإرسال
          </button>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">

        {/* ══ LEFT COLUMN — form ══ */}
        <div className="space-y-5">

          {/* Section 1: Basic data */}
          <SectionCard title="البيانات الأساسية" icon={FileText}>
            <div className="space-y-4">
              <div>
                <FieldLabel label="اسم التنبيه" required />
                <input type="text" placeholder="اسم التنبيه..." className={inputCls} />
              </div>
              <div>
                <FieldLabel label="الاسم (إنجليزي)" />
                <input type="text" placeholder="اختياري..." className={inputCls} dir="ltr" />
              </div>
              <div>
                <FieldLabel label="الوصف" />
                <textarea rows={3} placeholder="وصف مختصر للتنبيه..." className={textareaCls} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField label="نوع التنبيه" required options={["يدوي", "تلقائي", "مجدوَل"]} defaultValue="يدوي" />
                <SelectField label="الأولوية" required options={["عادي", "متوسط", "عالٍ", "عاجل"]} defaultValue="عادي" />
              </div>
            </div>
          </SectionCard>

          {/* Section 2: Catalyst and scheduling */}
          <SectionCard title="المحفّز والجدولة" icon={Bell}>
            <SelectField label="نوع المحفّز" required options={["فوري", "عند حدث", "مجدوَل"]} defaultValue="فوري" />
          </SectionCard>

          {/* Section 3: Transmission channels */}
          <SectionCard title="قنوات الإرسال" icon={Send}>
            <p className="text-[12px] font-bold text-[#0e2453]/40 mb-3">اختر قناة واحدة على الأقل *</p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              <CheckOption label="قاعدة البيانات"     icon={Database}       defaultChecked />
              <CheckOption label="البريد الإلكتروني"  icon={Mail} />
              <CheckOption label="إشعارات الجوال"      icon={Smartphone} />
              <CheckOption label="واتساب"              icon={MessageSquare} />
              <CheckOption label="رسائل SMS"           icon={MessageSquare} />
              <CheckOption label="Webhook"             icon={Webhook} />
            </div>
          </SectionCard>

          {/* Section 4: Message content */}
          <SectionCard title="محتوى الرسالة" icon={MessageSquare}>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField label="استخدام قالب" options={["بدون قالب (محتوى مخصص)", "قالب ترحيب", "قالب تذكير"]} defaultValue="بدون قالب (محتوى مخصص)" />
                <SelectField label="نوع الرسالة" options={["معلوماتي", "تحذير", "نجاح", "خطأ"]} defaultValue="معلوماتي" />
              </div>
              <div>
                <FieldLabel label="عنوان الرسالة" required />
                <input type="text" className={inputCls} />
                <HelperText text="You can use {{user_name}}" />
              </div>
              <div>
                <FieldLabel label="محتوى الرسالة" required />
                <textarea rows={4} className={textareaCls} />
                <HelperText text="You can use {{user_name}}, {{app_name}}" />
              </div>
            </div>
          </SectionCard>

          {/* Section 5: Recipients */}
          <SectionCard title="المستلمون" icon={Users}>
            <p className="text-[12px] font-bold text-[#0e2453]/40 mb-3">نوع المستلمين *</p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              <RadioOption label="جميع المستخدمين" name="recipients" defaultChecked />
              <RadioOption label="مستخدمون محددون"  name="recipients" />
              <RadioOption label="العملاء"           name="recipients" />
              <RadioOption label="المستشارون"        name="recipients" />
              <RadioOption label="الشركات"           name="recipients" />
              <RadioOption label="المدراء"           name="recipients" />
            </div>
          </SectionCard>

          {/* Section 6: Options */}
          <SectionCard title="الخيارات" icon={Info}>
            <div className="grid sm:grid-cols-2 gap-2.5">
              <CheckOption label="نشط"         defaultChecked />
              <CheckOption label="إرسال فوري"  defaultChecked />
            </div>
          </SectionCard>

        </div>

        {/* ══ RIGHT COLUMN — info sidebar ══ */}
        <div className="space-y-5">

          {/* Section 7: Advice */}
          <div className="bg-navy/4 rounded-2xl border border-navy/10 p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                <Lightbulb className="w-3.5 h-3.5 text-navy" />
              </div>
              <h3 className="text-[13px] font-extrabold text-navy">نصائح</h3>
            </div>
            <ul className="space-y-3">
              {[
                "التنبيه اليدوي يتطلب الضغط على زر الإرسال.",
                "التنبيهات التلقائية تُرسَل عند وقوع حدث محدد.",
                "التنبيه المجدوَل يُرسَل في الوقت المحدد.",
                "يمكنك استخدام متغيرات في الرسالة مثل {{user_name}}",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-navy/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[9px] font-extrabold text-navy">{i + 1}</span>
                  </span>
                  <p className="text-[12px] font-medium text-[#0e2453]/60 leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 8: Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label:"الإشعارات المرسَلة", value:0, icon:Send, bg:"bg-navy" },
              { label:"غير مقروءة",         value:0, icon:Eye,  bg:"bg-primary" },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className={`${card.bg} rounded-2xl p-4 text-white relative overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-default`}>
                  <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/[0.07]" />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white/[0.04]" />
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-extrabold tracking-tight mb-0.5">{card.value}</h3>
                    <p className="text-white/75 text-[11px] font-bold leading-tight">{card.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section 9: Notification log */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                  <Bell className="w-3.5 h-3.5 text-navy" />
                </div>
                <h3 className="text-[13px] font-extrabold text-[#0e2453]">سجل الإشعارات</h3>
              </div>
              <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-[#0e2453]/[0.06] text-[#0e2453]/50">
                0 إشعار
              </span>
            </div>

            {/* Dimmed headers */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50 bg-[#f8fafc]">
                    {LOG_COLS.map((col) => (
                      <th key={col} className="px-4 py-2.5 text-right text-[10px] font-extrabold text-[#0e2453]/35 uppercase tracking-wide whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-10 gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-navy/7 flex items-center justify-center">
                <Bell className="w-5 h-5 text-navy/35" strokeWidth={1.5} />
              </div>
              <p className="text-[12px] font-bold text-[#0e2453]/30">لم يُرسَل أي إشعار بعد</p>
            </div>
          </div>

          {/* Section 10: Latest records */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0e2453]/[0.06] flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5 text-[#0e2453]/60" />
              </div>
              <h3 className="text-[13px] font-extrabold text-[#0e2453]">آخر السجلات</h3>
            </div>
            <div className="flex flex-col items-center justify-center py-10 gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e2453]/[0.04] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#0e2453]/20" strokeWidth={1.5} />
              </div>
              <p className="text-[12px] font-bold text-[#0e2453]/30">لا توجد سجلات</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
