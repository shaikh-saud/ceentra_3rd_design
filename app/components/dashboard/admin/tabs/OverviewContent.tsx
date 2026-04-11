"use client";

import React from "react";
import {
  Users, Building2, Lightbulb, TrendingUp,
  AlertTriangle, FileCheck, UserPlus, Banknote,
  Download, Send, Clock, ChevronRight,
} from "lucide-react";
import StatCard from "../ui/StatCard";

const STATS_CARDS = [
  { title:"إجمالي المستخدمين", value:"72",   subtitle:"36 عميل نشط",         icon:Users,     gradient:"from-[#0e2453] to-[#1a3a7a]", change:"+12%" },
  { title:"الشركات",           value:"27",   subtitle:"شركة مسجلة",           icon:Building2, gradient:"from-[#058B7F] to-[#0FAE9E]", change:"+5" },
  { title:"المستشارين",        value:"1",    subtitle:"0 طلب معلق",           icon:Lightbulb, gradient:"from-[#0e2453] to-[#058B7F]", change:"جديد" },
  { title:"الإيرادات",         value:"850K", subtitle:"ريال سعودي / شهرياً", icon:TrendingUp, gradient:"from-[#058B7F] to-[#047a6f]", change:"+18%" },
];

const ACTIVITIES = [
  { icon:FileCheck,     text:"تم توثيق شركة الإبداع الرقمي",              time:"منذ 5 دقائق",  color:"bg-green-500" },
  { icon:UserPlus,      text:"مستخدم جديد أحمد محمد سجل في المنصة",       time:"منذ 20 دقيقة", color:"bg-blue-500" },
  { icon:AlertTriangle, text:"نزاع جديد في مشروع #1234",                  time:"منذ 45 دقيقة", color:"bg-amber-500" },
  { icon:Banknote,      text:"تم إطلاق دفعة 25,000 ر.س لشركة #A12",      time:"منذ ساعة",     color:"bg-teal-500" },
];

const QUICK_ACTIONS = [
  { label:"مراجعة طلبات التوثيق", badge:"12", icon:FileCheck },
  { label:"معالجة النزاعات",      badge:"8",  icon:AlertTriangle },
  { label:"تصدير تقرير شهري",     badge:null, icon:Download },
  { label:"إرسال إشعار عام",      badge:null, icon:Send },
];

const SYSTEM_ALERTS = [
  { text:"3 نزاعات تحتاج مراجعة عاجلة",  severity:"high" },
  { text:"5 شركات بانتظار التوثيق",       severity:"medium" },
  { text:"تقرير الأسبوع جاهز للمراجعة",   severity:"low" },
];

export default function OverviewContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS_CARDS.map((card, i) => (
          <StatCard key={i} {...card} delay={i * 60} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="space-y-6">

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6">
            <h3 className="text-[16px] font-extrabold text-[#0e2453] mb-5">إجراءات سريعة</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={i}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gray-200 text-[#0e2453] font-bold text-[13px] transition-all duration-200 hover:bg-[#058B7F] hover:text-white hover:border-[#058B7F] hover:-translate-y-0.5 hover:shadow-md group"
                  >
                    <Icon className="w-4 h-4 shrink-0 group-hover:text-white" />
                    <span className="flex-1 text-right">{action.label}</span>
                    {action.badge && (
                      <span className="text-[10px] font-bold bg-[#058B7F]/10 text-[#058B7F] px-2 py-0.5 rounded-md group-hover:bg-white/20 group-hover:text-white transition-colors">
                        {action.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6">
            <h3 className="text-[16px] font-extrabold text-[#0e2453] mb-5 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              تنبيهات النظام
            </h3>
            <div className="space-y-3">
              {SYSTEM_ALERTS.map((alert, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-colors ${
                    alert.severity === "high"   ? "bg-red-50/60 border-red-100 text-red-700" :
                    alert.severity === "medium" ? "bg-amber-50/60 border-amber-100 text-amber-700" :
                    "bg-[#058B7F]/[0.04] border-[#058B7F]/10 text-[#058B7F]"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    alert.severity === "high" ? "bg-red-500" :
                    alert.severity === "medium" ? "bg-amber-500" : "bg-[#058B7F]"
                  }`} />
                  <span className="text-[13px] font-bold flex-1">{alert.text}</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 h-fit">
          <h3 className="text-[16px] font-extrabold text-[#0e2453] mb-5 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#058B7F]" />
            آخر الأنشطة
          </h3>
          <div className="space-y-1">
            {ACTIVITIES.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex gap-3 py-3 relative">
                  {i < ACTIVITIES.length - 1 && (
                    <div className="absolute right-[19px] top-[48px] w-[2px] h-[calc(100%-24px)] bg-gray-100" />
                  )}
                  <div className={`w-10 h-10 rounded-xl ${activity.color}/10 flex items-center justify-center shrink-0 relative z-10`}>
                    <Icon className={`w-4 h-4 ${activity.color.replace("bg-", "text-")}`} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#0e2453]/80 leading-relaxed">{activity.text}</p>
                    <span className="text-[11px] text-[#0e2453]/40 font-medium">{activity.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
