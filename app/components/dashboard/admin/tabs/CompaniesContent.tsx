"use client";

import React, { useState, useMemo } from "react";
import {
  Building2, Clock, CheckCircle, XCircle, Eye,
  Search, Filter, ChevronDown, Hash, FileText,
  ShieldCheck, ShieldAlert, ShieldX, Users,
} from "lucide-react";
import TableCard from "../ui/TableCard";
import PaginationRow from "../ui/PaginationRow";
import ActionBtn from "../ui/ActionBtn";

/* ─── Types ─── */
type VerifStatus = "pending" | "verified" | "rejected";

interface Company {
  id: number;
  name: string;
  nameEn: string;
  crNumber: string;
  taxNumber: string;
  owner: string;
  date: string;
  status: VerifStatus;
  color: string;
  initials: string;
}

/* ─── Mock data ─── */
const MOCK_COMPANIES: Company[] = [
  { id:1,  name:"شركة الإبداع الرقمي",       nameEn:"Digital Creativity Co.",    crNumber:"1010123456", taxNumber:"300123456700003", owner:"محمد العتيبي",    date:"2024-03-01", status:"pending",  color:"from-blue-500 to-indigo-600",    initials:"إر" },
  { id:2,  name:"مجموعة النخيل للتقنية",     nameEn:"Nakheel Tech Group",        crNumber:"4030987654", taxNumber:"300987654300003", owner:"فيصل الدوسري",    date:"2024-03-03", status:"verified", color:"from-teal-500 to-emerald-600",   initials:"نخ" },
  { id:3,  name:"شركة تقني للحلول",          nameEn:"Taqni Solutions Co.",       crNumber:"2050456789", taxNumber:"300456789100003", owner:"سارة القحطاني",   date:"2024-03-05", status:"pending",  color:"from-purple-500 to-violet-600",  initials:"تق" },
  { id:4,  name:"مؤسسة الريادة الرقمية",     nameEn:"Digital Leadership Est.",   crNumber:"1030321654", taxNumber:"300321654500003", owner:"خالد الحربي",     date:"2024-03-07", status:"pending",  color:"from-orange-500 to-amber-600",   initials:"رق" },
  { id:5,  name:"شركة مستقبل الأعمال",       nameEn:"Future Business Co.",       crNumber:"4010654321", taxNumber:"300654321200003", owner:"نورة الشمري",     date:"2024-03-09", status:"verified", color:"from-sky-500 to-cyan-600",       initials:"مأ" },
  { id:6,  name:"مجموعة الخليج للاستشارات",  nameEn:"Gulf Consulting Group",     crNumber:"3010111222", taxNumber:"300111222900003", owner:"عمر الزهراني",    date:"2024-03-10", status:"rejected", color:"from-red-500 to-rose-600",       initials:"خج" },
  { id:7,  name:"شركة إتقان الإلكترونية",    nameEn:"Itqan Electronics Co.",     crNumber:"1020333444", taxNumber:"300333444100003", owner:"ريم السعدي",      date:"2024-03-12", status:"pending",  color:"from-pink-500 to-fuchsia-600",   initials:"إت" },
  { id:8,  name:"مؤسسة الإبتكار التقني",     nameEn:"Tech Innovation Est.",      crNumber:"2030555666", taxNumber:"300555666700003", owner:"وليد مصطفى",      date:"2024-03-14", status:"pending",  color:"from-green-500 to-teal-500",     initials:"إب" },
  { id:9,  name:"شركة الأفق للبرمجيات",      nameEn:"Horizon Software Co.",      crNumber:"4040777888", taxNumber:"300777888200003", owner:"دانة الرشيد",     date:"2024-03-15", status:"verified", color:"from-blue-400 to-blue-600",      initials:"أف" },
  { id:10, name:"مجموعة قمة للخدمات",        nameEn:"Qimma Services Group",      crNumber:"1050999000", taxNumber:"300999000300003", owner:"هند الشريف",      date:"2024-03-16", status:"pending",  color:"from-indigo-500 to-purple-500",  initials:"قم" },
  { id:11, name:"شركة المعرفة الرقمية",      nameEn:"Digital Knowledge Co.",     crNumber:"3020112233", taxNumber:"300112233600003", owner:"أحمد الجهني",     date:"2024-03-18", status:"pending",  color:"from-cyan-500 to-blue-500",      initials:"مع" },
  { id:12, name:"مؤسسة التميز للتطوير",      nameEn:"Excellence Dev. Est.",      crNumber:"2010445566", taxNumber:"300445566800003", owner:"لمى القحطاني",    date:"2024-03-20", status:"pending",  color:"from-amber-500 to-orange-600",   initials:"تم" },
];

const STATUS_CONFIG: Record<VerifStatus, { label: string; dot: string; pill: string }> = {
  pending:  { label:"معلق",   dot:"bg-yellow-400", pill:"bg-yellow-50 text-yellow-700 border-yellow-200" },
  verified: { label:"موثق",   dot:"bg-green-500",  pill:"bg-green-50 text-green-700 border-green-200" },
  rejected: { label:"مرفوض", dot:"bg-red-500",    pill:"bg-red-50 text-red-600 border-red-100" },
};

const FILTER_OPTIONS = [
  { value:"all",      label:"جميع الحالات" },
  { value:"pending",  label:"معلق" },
  { value:"verified", label:"موثق" },
  { value:"rejected", label:"مرفوض" },
];

const COLS = ["الشركة", "رقم السجل التجاري", "الرقم الضريبي", "التاريخ", "الحالة", "الإجراءات"];
const PAGE_SIZE = 8;

/* ─── Stat mini-card (local, not shared StatCard — different gradient style) ─── */
function MiniStat({ label, value, icon: Icon, bg, text }: {
  label: string; value: number; icon: React.ElementType; bg: string; text: string;
}) {
  return (
    <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${bg} transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}>
      <div className={`w-11 h-11 rounded-xl ${text}/10 flex items-center justify-center shrink-0`}>
        <Icon className={`w-5 h-5 ${text}`} strokeWidth={1.8} />
      </div>
      <div>
        <p className={`text-2xl font-extrabold ${text} leading-none`}>{value}</p>
        <p className={`text-[12px] font-bold mt-0.5 ${text}/70`}>{label}</p>
      </div>
    </div>
  );
}

export default function CompaniesContent() {
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setPage]      = useState(1);

  const totalAll      = MOCK_COMPANIES.length;
  const totalPending  = MOCK_COMPANIES.filter((c) => c.status === "pending").length;
  const totalVerified = MOCK_COMPANIES.filter((c) => c.status === "verified").length;
  const totalRejected = MOCK_COMPANIES.filter((c) => c.status === "rejected").length;

  const filtered = useMemo(() =>
    MOCK_COMPANIES.filter((c) => {
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchSearch = !search || c.name.includes(search) || c.nameEn.toLowerCase().includes(search.toLowerCase()) || c.crNumber.includes(search) || c.owner.includes(search);
      return matchStatus && matchSearch;
    }), [search, statusFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilter = (v: string) => { setStatus(v); setFilterOpen(false); setPage(1); };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setPage(1); };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-1.5">
            <div className="w-10 h-10 rounded-xl bg-[#0e2453]/[0.07] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#0e2453]" strokeWidth={1.8} />
            </div>
            <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">
              طلبات توثيق الشركات
            </h1>
            {/* Yellow pending badge */}
            {totalPending > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-extrabold bg-yellow-400/20 text-yellow-700 border border-yellow-300/60 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                {totalPending} معلق
              </span>
            )}
          </div>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">لوحة إدارة منصة سنترا</p>
        </div>

        {/* Header action — total badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <Building2 className="w-4 h-4 text-navy" />
            <span className="text-[13px] font-extrabold text-[#0e2453]">{totalAll} شركة</span>
          </div>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat label="إجمالي الطلبات" value={totalAll}      icon={Building2}   bg="bg-white border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" text="text-[#0e2453]" />
        <MiniStat label="معلقة"           value={totalPending}  icon={Clock}       bg="bg-yellow-50 border-yellow-200/60"                             text="text-yellow-700" />
        <MiniStat label="موثقة"           value={totalVerified} icon={ShieldCheck} bg="bg-green-50 border-green-200/60"                               text="text-green-700" />
        <MiniStat label="مرفوضة"          value={totalRejected} icon={ShieldX}     bg="bg-red-50 border-red-200/60"                                   text="text-red-600" />
      </div>

      {/* ── Table Card ── */}
      <TableCard
        toolbar={
          <>
            {/* Left: title + pending chip */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-navy" />
              </div>
              <div>
                <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">قائمة طلبات التوثيق</p>
                <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{filtered.length} نتيجة</p>
              </div>
            </div>

            {/* Right: search + filter */}
            <div className="flex items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0e2453]/30 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="بحث عن شركة..."
                  className="pr-9 pl-4 h-9 w-[200px] rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none focus:border-navy/50 focus:ring-2 focus:ring-navy/10 transition-all duration-200"
                />
              </div>
              {/* Status filter */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 h-9 px-4 rounded-xl border border-gray-200 bg-white text-[13px] font-bold text-[#0e2453]/70 hover:border-navy hover:text-navy hover:bg-navy/5 transition-all duration-200"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">{FILTER_OPTIONS.find((o) => o.value === statusFilter)?.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`} />
                </button>
                {filterOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setFilterOpen(false)} />
                    <div className="absolute left-0 top-[calc(100%+6px)] w-40 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 py-1.5 z-30 animate-[fadeSlideUp_0.2s_ease-out]">
                      {FILTER_OPTIONS.map((opt) => (
                        <button key={opt.value} onClick={() => handleFilter(opt.value)}
                          className={`w-full text-right px-4 py-2.5 text-[13px] font-bold transition-colors ${statusFilter === opt.value ? "bg-navy/10 text-navy" : "text-[#0e2453]/70 hover:bg-gray-50"}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        }
        footer={
          <PaginationRow
            currentPage={currentPage} totalPages={totalPages}
            totalItems={filtered.length} pageSize={PAGE_SIZE}
            itemLabel="شركة" onPageChange={setPage}
          />
        }
      >

        {/* ── Desktop Table ── */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-[#f8fafc]">
                {COLS.map((col) => (
                  <th key={col} className="px-5 py-3.5 text-right text-[12px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((company, idx) => {
                const sc = STATUS_CONFIG[company.status];
                return (
                  <tr
                    key={company.id}
                    className={`border-b border-gray-50 transition-all duration-150 group animate-[fadeSlideUp_0.4s_ease-out]
                      ${company.status === "pending"
                        ? "hover:bg-yellow-50/40"
                        : company.status === "verified"
                        ? "hover:bg-green-50/30"
                        : "hover:bg-red-50/30"
                      }`}
                    style={{ animationDelay: `${idx * 40}ms`, animationFillMode: "both" }}
                  >
                    {/* Company */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-[12px] font-extrabold shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                          {company.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[14px] font-extrabold text-[#0e2453] truncate leading-snug">{company.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Users className="w-3 h-3 text-[#0e2453]/30 shrink-0" />
                            <span className="text-[11px] font-medium text-[#0e2453]/40 truncate">{company.owner}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* CR Number */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-[#0e2453]/30 shrink-0" />
                        <span className="text-[13px] font-bold text-[#0e2453]/70 font-mono tracking-wide">{company.crNumber}</span>
                      </div>
                    </td>

                    {/* Tax Number — accented */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-pink-400/60 shrink-0" />
                        <span className="text-[13px] font-bold text-pink-600/80 font-mono tracking-wide">{company.taxNumber}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-[13px] font-medium text-[#0e2453]/45">
                        {new Date(company.date).toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"numeric" })}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold border ${sc.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${company.status === "pending" ? "animate-pulse" : ""}`} />
                        {sc.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <ActionBtn icon={Eye}         title="عرض التفاصيل" base="border-blue-200 text-blue-500"   hover="hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_4px_12px_rgba(59,130,246,0.35)]" />
                        {company.status === "pending" && (
                          <>
                            <ActionBtn icon={CheckCircle} title="قبول الطلب"   base="border-green-200 text-green-500" hover="hover:bg-green-500 hover:text-white hover:border-green-500 hover:shadow-[0_4px_12px_rgba(34,197,94,0.35)]" />
                            <ActionBtn icon={XCircle}     title="رفض الطلب"    base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_4px_12px_rgba(239,68,68,0.35)]" />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-[#0e2453]/[0.04] flex items-center justify-center">
                        <Building2 className="w-7 h-7 text-[#0e2453]/20" />
                      </div>
                      <p className="text-[14px] font-bold text-[#0e2453]/30">لا توجد نتائج مطابقة</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Mobile Cards ── */}
        <div className="lg:hidden divide-y divide-gray-50">
          {paginated.map((company, idx) => {
            const sc = STATUS_CONFIG[company.status];
            return (
              <div
                key={company.id}
                className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
                style={{ animationDelay: `${idx * 40}ms`, animationFillMode: "both" }}
              >
                {/* Top row */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-[13px] font-extrabold shrink-0 shadow-sm`}>
                    {company.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-extrabold text-[#0e2453] truncate">{company.name}</p>
                    <p className="text-[12px] text-[#0e2453]/40 font-medium">{company.owner}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold border shrink-0 ${sc.pill}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${company.status === "pending" ? "animate-pulse" : ""}`} />
                    {sc.label}
                  </span>
                </div>

                {/* Data rows */}
                <div className="flex flex-col gap-1.5 mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5 text-[#0e2453]/30 shrink-0" />
                    <span className="text-[12px] font-bold text-[#0e2453]/60 font-mono">{company.crNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-pink-400/60 shrink-0" />
                    <span className="text-[12px] font-bold text-pink-600/70 font-mono">{company.taxNumber}</span>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#0e2453]/40 font-medium">
                    {new Date(company.date).toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"numeric" })}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <ActionBtn icon={Eye}         title="عرض"  base="border-blue-200 text-blue-500"   hover="hover:bg-blue-500 hover:text-white hover:border-blue-500"   size="sm" />
                    {company.status === "pending" && (
                      <>
                        <ActionBtn icon={CheckCircle} title="قبول" base="border-green-200 text-green-500" hover="hover:bg-green-500 hover:text-white hover:border-green-500" size="sm" />
                        <ActionBtn icon={XCircle}     title="رفض"  base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500"     size="sm" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {paginated.length === 0 && (
            <div className="py-16 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0e2453]/[0.04] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#0e2453]/20" />
              </div>
              <p className="text-[14px] font-bold text-[#0e2453]/30">لا توجد نتائج مطابقة</p>
            </div>
          )}
        </div>
      </TableCard>

      {/* ── Info Banner ── */}
      <div className="flex items-start gap-4 px-5 py-4 rounded-2xl bg-[#0e2453]/[0.03] border border-[#0e2453]/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-[#0e2453]/[0.07] flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4 text-[#0e2453]" strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-[13px] font-extrabold text-[#0e2453] mb-0.5">معايير التوثيق</p>
          <p className="text-[12px] font-medium text-[#0e2453]/50 leading-relaxed">
            يتطلب توثيق الشركات التحقق من صحة السجل التجاري والرقم الضريبي وفق متطلبات وزارة التجارة والهيئة العامة للزكاة والضريبة والجمارك في المملكة العربية السعودية.
          </p>
        </div>
      </div>
    </div>
  );
}
