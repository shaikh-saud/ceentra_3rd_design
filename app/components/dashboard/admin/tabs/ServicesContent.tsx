"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag, CheckCircle, ToggleLeft, Percent,
  Megaphone, Lightbulb, GraduationCap, Briefcase, CreditCard, Video, Box,
  Plus, Pencil, PauseCircle, Trash2,
} from "lucide-react";
import PageHeader from "../ui/PageHeader";
import SearchInput from "../ui/SearchInput";
import FilterDropdown from "../ui/FilterDropdown";
import TableCard from "../ui/TableCard";
import PaginationRow from "../ui/PaginationRow";
import ActionBtn from "../ui/ActionBtn";

type ServiceCategory = "عام" | "التسويق" | "الاستشارات" | "الدورات" | "الوظائف" | "الاشتراكات" | "الإنتاج المرئي";
type PriceType       = "ثابت" | "نسبة مئوية" | "لكل استخدام" | "شهري" | "سنوي";
type ServiceStatus   = "نشط" | "معطل";

interface Service {
  id: number; title: string; description: string;
  category: ServiceCategory; price: number; originalPrice: number | null;
  priceType: PriceType; status: ServiceStatus;
}

const MOCK_SERVICES: Service[] = [
  { id:1,  title:"رسوم التسجيل",                  description:"رسوم التسجيل الأولية في المنصة",           category:"عام",            price:0,     originalPrice:null, priceType:"ثابت",         status:"نشط" },
  { id:2,  title:"نشر إعلان وظيفة",               description:"نشر إعلان توظيف على المنصة لمدة 30 يوم",   category:"الوظائف",        price:299,   originalPrice:399,  priceType:"ثابت",         status:"نشط" },
  { id:3,  title:"باقة التسويق الأساسية",         description:"خدمات تسويق رقمي شاملة للشركات الناشئة",   category:"التسويق",        price:1490,  originalPrice:1990, priceType:"شهري",         status:"نشط" },
  { id:4,  title:"جلسة استشارة فردية",            description:"جلسة استشارة مع خبير معتمد لمدة ساعة",      category:"الاستشارات",     price:450,   originalPrice:null, priceType:"لكل استخدام",  status:"نشط" },
  { id:5,  title:"نشر كورس تعليمي",              description:"نشر وإدارة كورس على منصة سنترا",            category:"الدورات",        price:199,   originalPrice:299,  priceType:"ثابت",         status:"نشط" },
  { id:6,  title:"اشتراك المنصة السنوي",          description:"وصول كامل لجميع خدمات المنصة طوال العام",   category:"الاشتراكات",     price:2390,  originalPrice:2990, priceType:"سنوي",         status:"نشط" },
  { id:7,  title:"إنتاج فيديو احترافي",           description:"تصوير ومونتاج مقاطع الفيديو التسويقية",    category:"الإنتاج المرئي", price:3500,  originalPrice:null, priceType:"ثابت",         status:"نشط" },
  { id:8,  title:"باقة التسويق المتقدمة",         description:"استراتيجية تسويق متكاملة مع تحليل أداء",   category:"التسويق",        price:3990,  originalPrice:4990, priceType:"شهري",         status:"نشط" },
  { id:9,  title:"عمولة الإشارة والتوصية",        description:"نسبة مئوية على كل إحالة ناجحة",            category:"عام",            price:10,    originalPrice:null, priceType:"نسبة مئوية",   status:"نشط" },
  { id:10, title:"حزمة الاستشارات الشهرية",       description:"جلسات استشارية متعددة خلال الشهر",          category:"الاستشارات",     price:1800,  originalPrice:2200, priceType:"شهري",         status:"نشط" },
  { id:11, title:"تصوير منتجات",                  description:"تصوير احترافي للمنتجات وتحريرها",           category:"الإنتاج المرئي", price:850,   originalPrice:null, priceType:"لكل استخدام",  status:"نشط" },
  { id:12, title:"حملة تسويق إعلامي",             description:"إدارة حملة إعلانية على منصات التواصل",     category:"التسويق",        price:2500,  originalPrice:3200, priceType:"ثابت",         status:"نشط" },
  { id:13, title:"كورس مسجل – باقة الوصول",       description:"وصول غير محدود لمكتبة الكورسات المسجلة",   category:"الدورات",        price:990,   originalPrice:1490, priceType:"سنوي",         status:"نشط" },
  { id:14, title:"إعلان وظيفة مميز (مثبت)",       description:"تثبيت إعلان الوظيفة في أعلى نتائج البحث",  category:"الوظائف",        price:149,   originalPrice:null, priceType:"ثابت",         status:"نشط" },
  { id:15, title:"تقرير تحليل أداء",              description:"تقرير شهري مفصل عن أداء خدماتك",           category:"عام",            price:350,   originalPrice:450,  priceType:"شهري",         status:"نشط" },
  { id:16, title:"اشتراك بريميوم شهري",           description:"خدمات مميزة مع دعم أولوي على مدار الساعة",  category:"الاشتراكات",     price:599,   originalPrice:799,  priceType:"شهري",         status:"نشط" },
  { id:17, title:"جلسة تدريبية جماعية",           description:"تدريب مجموعة على مهارة متخصصة",            category:"الدورات",        price:280,   originalPrice:null, priceType:"لكل استخدام",  status:"نشط" },
  { id:18, title:"موشن جرافيك – 30 ثانية",        description:"إنتاج فيديو موشن جرافيك احترافي",           category:"الإنتاج المرئي", price:1200,  originalPrice:1600, priceType:"ثابت",         status:"نشط" },
  { id:19, title:"استشارة أعمال متقدمة",           description:"استشارة استراتيجية لتطوير وتوسيع الأعمال", category:"الاستشارات",     price:900,   originalPrice:null, priceType:"لكل استخدام",  status:"نشط" },
  { id:20, title:"باقة التوظيف الشهرية",          description:"نشر غير محدود لإعلانات الوظائف شهرياً",    category:"الوظائف",        price:799,   originalPrice:999,  priceType:"شهري",         status:"نشط" },
];

const SERVICE_CATEGORY_CONFIG: Record<ServiceCategory, string> = {
  "عام":            "bg-gray-100 text-gray-600 border-gray-200",
  "التسويق":        "bg-blue-50 text-blue-600 border-blue-100",
  "الاستشارات":     "bg-teal-50 text-teal-600 border-teal-100",
  "الدورات":        "bg-purple-50 text-purple-600 border-purple-100",
  "الوظائف":        "bg-orange-50 text-orange-600 border-orange-100",
  "الاشتراكات":     "bg-green-50 text-green-600 border-green-100",
  "الإنتاج المرئي": "bg-pink-50 text-pink-600 border-pink-100",
};

const PRICE_TYPE_CONFIG: Record<PriceType, string> = {
  "ثابت":          "bg-blue-50 text-blue-600 border-blue-100",
  "نسبة مئوية":    "bg-purple-50 text-purple-600 border-purple-100",
  "لكل استخدام":   "bg-teal-50 text-teal-600 border-teal-100",
  "شهري":          "bg-green-50 text-green-600 border-green-100",
  "سنوي":          "bg-orange-50 text-orange-600 border-orange-100",
};

const CATEGORY_ICON_MAP: Record<ServiceCategory, React.ElementType> = {
  "عام":            Box,
  "التسويق":        Megaphone,
  "الاستشارات":     Lightbulb,
  "الدورات":        GraduationCap,
  "الوظائف":        Briefcase,
  "الاشتراكات":     CreditCard,
  "الإنتاج المرئي": Video,
};

const CATEGORY_FILTER_OPTIONS = [
  { value:"all",             label:"جميع الفئات" },
  { value:"عام",             label:"عام" },
  { value:"التسويق",         label:"التسويق" },
  { value:"الاستشارات",      label:"الاستشارات" },
  { value:"الدورات",         label:"الدورات" },
  { value:"الوظائف",         label:"الوظائف" },
  { value:"الاشتراكات",      label:"الاشتراكات" },
  { value:"الإنتاج المرئي",  label:"الإنتاج المرئي" },
];

const TABLE_COLS  = ["#", "الخدمة", "الفئة", "السعر", "نوع السعر", "الحالة", "الإجراءات"];
const PAGE_SIZE   = 8;

export default function ServicesContent() {
  const [search, setSearch]       = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [currentPage, setPage]    = useState(1);

  const totalServices    = MOCK_SERVICES.length;
  const activeServices   = MOCK_SERVICES.filter((s) => s.status === "نشط").length;
  const disabledServices = totalServices - activeServices;

  const filtered = useMemo(() =>
    MOCK_SERVICES.filter((s) => {
      const matchCat    = catFilter === "all" || s.category === catFilter;
      const matchSearch = !search || s.title.includes(search) || s.description.includes(search) || s.category.includes(search);
      return matchCat && matchSearch;
    }), [search, catFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleCatFilter = (v: string) => { setCatFilter(v); setPage(1); };
  const handleSearch    = (e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setPage(1); };

  const SERVICE_STATS = [
    { label:"إجمالي الخدمات", value: totalServices,    icon: ShoppingBag, gradient:"from-[#0e2453] to-[#1a3a7a]", tag:"الكل"    },
    { label:"خدمات نشطة",     value: activeServices,   icon: CheckCircle, gradient:"from-[#058B7F] to-[#0FAE9E]", tag:"نشطة"    },
    { label:"خدمات معطلة",    value: disabledServices, icon: ToggleLeft,  gradient: disabledServices > 0 ? "from-[#b91c1c] to-[#ef4444]" : "from-[#6b7280] to-[#9ca3af]", tag:"معطلة" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">
      <PageHeader
        title="إدارة الخدمات الإلكترونية"
        subtitle="إدارة وتسعير جميع الخدمات الإلكترونية على المنصة"
        badge={`${totalServices} خدمة`}
        action={
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#0e2453] to-[#1a3a7a] shadow-[0_4px_16px_rgba(14,36,83,0.3)] hover:shadow-[0_8px_24px_rgba(14,36,83,0.45)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 shrink-0">
            <Plus className="w-4 h-4" />
            إضافة خدمة
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {SERVICE_STATS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-6 text-white relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-default`}>
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/[0.07] group-hover:bg-white/[0.12] transition-colors" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/[0.04]" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] font-bold bg-white/15 px-2.5 py-1 rounded-lg">{card.tag}</span>
                </div>
                <h3 className="text-4xl font-extrabold mb-1 tracking-tight">{card.value}</h3>
                <p className="text-white/80 text-[13px] font-bold">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Card */}
      <TableCard
        toolbar={
          <>
            <p className="text-[14px] font-extrabold text-[#0e2453]">قائمة الخدمات</p>
            <div className="flex items-center gap-3">
              <SearchInput value={search} onChange={handleSearch} placeholder="بحث عن خدمة..." />
              <FilterDropdown value={catFilter} options={CATEGORY_FILTER_OPTIONS} onChange={handleCatFilter} />
            </div>
          </>
        }
        footer={
          <PaginationRow
            currentPage={currentPage} totalPages={totalPages}
            totalItems={filtered.length} pageSize={PAGE_SIZE}
            itemLabel="خدمة" onPageChange={setPage}
          />
        }
      >
        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f8fafc]">
                {TABLE_COLS.map((col) => (
                  <th key={col} className="px-5 py-3.5 text-right text-[12px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((service, idx) => {
                const CatIcon = CATEGORY_ICON_MAP[service.category];
                return (
                  <tr key={service.id}
                    className="border-b border-gray-50 transition-all duration-150 hover:bg-[#0e2453]/[0.018] group animate-[fadeSlideUp_0.4s_ease-out]"
                    style={{ animationDelay: `${idx * 40}ms`, animationFillMode: "both" }}>
                    <td className="px-5 py-4 text-[13px] font-bold text-[#0e2453]/40 whitespace-nowrap">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                    <td className="px-5 py-4 max-w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0e2453]/[0.05] flex items-center justify-center shrink-0 group-hover:bg-[#058B7F]/10 transition-colors">
                          <CatIcon className="w-4 h-4 text-[#0e2453]/50 group-hover:text-[#058B7F] transition-colors" strokeWidth={1.6} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[14px] font-extrabold text-[#0e2453] truncate leading-snug">{service.title}</p>
                          <p className="text-[11px] font-medium text-[#0e2453]/40 mt-0.5 truncate max-w-[220px]">{service.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border ${SERVICE_CATEGORY_CONFIG[service.category]}`}>{service.category}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {service.priceType === "نسبة مئوية" ? (
                        <div className="flex items-center gap-1">
                          <span className="text-[16px] font-extrabold text-[#058B7F]">{service.price}</span>
                          <Percent className="w-3.5 h-3.5 text-[#058B7F]" />
                        </div>
                      ) : service.price === 0 ? (
                        <span className="text-[14px] font-extrabold text-green-600">مجاني</span>
                      ) : (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[15px] font-extrabold text-[#058B7F]">{service.price.toLocaleString("ar-SA")} ر.س</span>
                          {service.originalPrice && (
                            <span className="text-[11px] font-medium text-[#0e2453]/35 line-through">{service.originalPrice.toLocaleString("ar-SA")} ر.س</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border ${PRICE_TYPE_CONFIG[service.priceType]}`}>{service.priceType}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {service.status === "نشط" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50 text-green-600 border border-green-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />نشط
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-500 border border-red-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />معطل
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ActionBtn icon={Pencil}      title="تعديل" base="border-blue-200 text-blue-500"   hover="hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_4px_10px_rgba(59,130,246,0.3)]" />
                        <ActionBtn icon={PauseCircle} title="تعطيل" base="border-amber-200 text-amber-500" hover="hover:bg-amber-400 hover:text-white hover:border-amber-400 hover:shadow-[0_4px_10px_rgba(245,158,11,0.3)]" />
                        <ActionBtn icon={Trash2}      title="حذف"   base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_4px_10px_rgba(239,68,68,0.3)]" />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-16 text-center text-[14px] font-bold text-[#0e2453]/30">لا توجد نتائج مطابقة</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="lg:hidden divide-y divide-gray-50">
          {paginated.map((service, idx) => {
            const CatIcon = CATEGORY_ICON_MAP[service.category];
            return (
              <div key={service.id} className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
                style={{ animationDelay: `${idx * 40}ms`, animationFillMode: "both" }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0e2453]/[0.05] flex items-center justify-center shrink-0">
                    <CatIcon className="w-4 h-4 text-[#0e2453]/50" strokeWidth={1.6} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-extrabold text-[#0e2453] truncate">{service.title}</p>
                    <p className="text-[11px] text-[#0e2453]/40 truncate">{service.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {service.status === "نشط" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />نشط
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-500 border border-red-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />معطل
                      </span>
                    )}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold border ${SERVICE_CATEGORY_CONFIG[service.category]}`}>{service.category}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {service.priceType === "نسبة مئوية" ? (
                      <span className="text-[14px] font-extrabold text-[#058B7F]">{service.price}%</span>
                    ) : service.price === 0 ? (
                      <span className="text-[14px] font-extrabold text-green-600">مجاني</span>
                    ) : (
                      <>
                        <span className="text-[14px] font-extrabold text-[#058B7F]">{service.price.toLocaleString("ar-SA")} ر.س</span>
                        {service.originalPrice && <span className="text-[11px] text-[#0e2453]/35 line-through">{service.originalPrice.toLocaleString("ar-SA")} ر.س</span>}
                      </>
                    )}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold border mt-1 w-fit ${PRICE_TYPE_CONFIG[service.priceType]}`}>{service.priceType}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ActionBtn icon={Pencil}      title="تعديل" base="border-blue-200 text-blue-500"   hover="hover:bg-blue-500 hover:text-white hover:border-blue-500"   size="sm" />
                    <ActionBtn icon={PauseCircle} title="تعطيل" base="border-amber-200 text-amber-500" hover="hover:bg-amber-400 hover:text-white hover:border-amber-400" size="sm" />
                    <ActionBtn icon={Trash2}      title="حذف"   base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500"     size="sm" />
                  </div>
                </div>
              </div>
            );
          })}
          {paginated.length === 0 && (
            <div className="py-16 text-center text-[14px] font-bold text-[#0e2453]/30">لا توجد نتائج مطابقة</div>
          )}
        </div>
      </TableCard>
    </div>
  );
}
