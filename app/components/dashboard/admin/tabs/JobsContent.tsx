"use client";

import React, { useState, useMemo } from "react";
import {
  Briefcase, Clock, Users, Pin, MapPin, Building2,
  Eye, CheckCircle, XCircle, Trash2, Search, UserSearch, ExternalLink,
} from "lucide-react";
import PageHeader from "../ui/PageHeader";
import TableCard from "../ui/TableCard";
import PaginationRow from "../ui/PaginationRow";
import ActionBtn from "../ui/ActionBtn";

type JobType   = "دوام كامل" | "دوام جزئي" | "عن بعد" | "عقد" | "عمل حر";
type JobStatus = "منشور" | "معلق";

interface Job {
  id: number; title: string; category: string; company: string;
  location: string; type: JobType; status: JobStatus; pinned: boolean; date: string;
}

interface Seeker {
  id: number; name: string; specialty: string;
  location: string; type: JobType; status: JobStatus; pinned: boolean; date: string;
}

const MOCK_JOBS: Job[] = [
  { id:1, title:"مدير حسابات التواصل الاجتماعي", category:"social_media",    company:"شركة الإبداع الرقمي",    location:"الرياض",  type:"دوام كامل", status:"معلق",  pinned:true,  date:"2024-03-01" },
  { id:2, title:"مطور واجهات أمامية",             category:"frontend_dev",    company:"مجموعة النخيل للتقنية",  location:"جدة",     type:"دوام كامل", status:"منشور", pinned:true,  date:"2024-03-03" },
  { id:3, title:"مصمم جرافيك إبداعي",            category:"graphic_design",  company:"شركة تقني للحلول",        location:"عن بعد",  type:"عن بعد",    status:"منشور", pinned:false, date:"2024-03-05" },
  { id:4, title:"محلل بيانات أول",               category:"data_analysis",   company:"الإبداع الرقمي",          location:"الدمام",  type:"دوام كامل", status:"منشور", pinned:false, date:"2024-03-07" },
  { id:5, title:"مدير مشاريع تقنية",             category:"project_mgmt",    company:"نخيل للتقنية",            location:"الرياض",  type:"عقد",       status:"منشور", pinned:false, date:"2024-03-09" },
  { id:6, title:"كاتب محتوى رقمي",              category:"content_writing", company:"تقني للحلول",             location:"عن بعد",  type:"عمل حر",    status:"منشور", pinned:false, date:"2024-03-11" },
  { id:7, title:"مهندس شبكات وأمن معلومات",     category:"cybersecurity",   company:"الإبداع الرقمي",          location:"الرياض",  type:"دوام كامل", status:"منشور", pinned:false, date:"2024-03-13" },
  { id:8, title:"أخصائي تسويق رقمي",            category:"digital_mktg",    company:"نخيل للتقنية",            location:"جدة",     type:"دوام جزئي", status:"منشور", pinned:false, date:"2024-03-15" },
];

const MOCK_SEEKERS: Seeker[] = [
  { id:1, name:"أحمد خالد العتيبي",    specialty:"مطور ويب متكامل",    location:"الرياض", type:"دوام كامل", status:"معلق",  pinned:false, date:"2024-03-02" },
  { id:2, name:"سارة محمد القحطاني",  specialty:"مصممة UI/UX",         location:"جدة",    type:"دوام كامل", status:"منشور", pinned:false, date:"2024-03-04" },
  { id:3, name:"فيصل عبدالله الدوسري",specialty:"محلل بيانات",         location:"الدمام", type:"عقد",       status:"منشور", pinned:false, date:"2024-03-06" },
  { id:4, name:"نورة وليد الشمري",    specialty:"مديرة تسويق رقمي",   location:"عن بعد", type:"عن بعد",    status:"منشور", pinned:false, date:"2024-03-08" },
];

const JOB_STATS = [
  { label:"وظائف معلقة",    value:"1",  icon:Clock,      bg:"bg-navy" },
  { label:"وظائف منشورة",   value:"64", icon:Briefcase,  bg:"bg-primary" },
  { label:"باحثين معلقين",  value:"1",  icon:UserSearch, bg:"bg-navy" },
  { label:"باحثين منشورين", value:"53", icon:Users,      bg:"bg-primary" },
  { label:"إعلانات مثبتة",  value:"2",  icon:Pin,        bg:"bg-navy" },
];

const JOB_TYPE_CONFIG: Record<JobType, string> = {
  "دوام كامل": "bg-blue-50 text-blue-600 border-blue-100",
  "دوام جزئي": "bg-purple-50 text-purple-600 border-purple-100",
  "عن بعد":    "bg-teal-50 text-teal-600 border-teal-100",
  "عقد":       "bg-orange-50 text-orange-600 border-orange-100",
  "عمل حر":   "bg-gray-100 text-gray-600 border-gray-200",
};

const JOB_STATUS_CONFIG: Record<JobStatus, string> = {
  "منشور": "bg-green-50 text-green-600 border-green-100",
  "معلق":  "bg-yellow-50 text-yellow-600 border-yellow-100",
};

const PAGE_SIZE = 6;
const JOB_COLS     = ["#", "الوظيفة", "الشركة", "الموقع", "النوع", "الحالة", "مثبت", "التاريخ", "الإجراءات"];
const SEEKER_COLS  = ["#", "الاسم", "التخصص", "الموقع", "النوع", "الحالة", "مثبت", "التاريخ", "الإجراءات"];

export default function JobsContent() {
  const [activeSegment, setActiveSegment] = useState<"jobs" | "seekers">("jobs");
  const [search, setSearch]               = useState("");
  const [currentPage, setCurrentPage]     = useState(1);

  const filteredJobs    = useMemo(() => MOCK_JOBS.filter((j)    => !search || j.title.includes(search)   || j.company.includes(search)),   [search]);
  const filteredSeekers = useMemo(() => MOCK_SEEKERS.filter((s) => !search || s.name.includes(search)    || s.specialty.includes(search)),  [search]);

  const activeList    = activeSegment === "jobs" ? filteredJobs : filteredSeekers;
  const totalPages    = Math.max(1, Math.ceil(activeList.length / PAGE_SIZE));
  const paginatedJobs    = filteredJobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const paginatedSeekers = filteredSeekers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSegment = (seg: "jobs" | "seekers") => { setActiveSegment(seg); setCurrentPage(1); setSearch(""); };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">
      <PageHeader
        title="إدارة الوظائف"
        subtitle="إدارة إعلانات الوظائف والباحثين عن عمل"
        badge="65 وظيفة"
        action={
          <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-navy shadow-[0_4px_16px_rgba(14,36,83,0.25)] hover:shadow-[0_8px_24px_rgba(14,36,83,0.35)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 shrink-0">
            <ExternalLink className="w-4 h-4" />
            عرض الصفحة
          </a>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {JOB_STATS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className={`${card.bg} rounded-2xl p-5 text-white relative overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-default`}>
              <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full bg-white/[0.07] group-hover:bg-white/[0.12] transition-colors" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-white/[0.04]" />
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight mb-0.5">{card.value}</h3>
                <p className="text-white/75 text-[12px] font-bold leading-tight">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Segmented Control + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          {(["jobs", "seekers"] as const).map((seg) => (
            <button
              key={seg}
              onClick={() => handleSegment(seg)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-extrabold transition-all duration-200 ${
                activeSegment === seg
                  ? "bg-navy text-white shadow-[0_2px_10px_rgba(14,36,83,0.3)]"
                  : "text-navy/50 hover:text-navy"
              }`}
            >
              {seg === "jobs" ? <Briefcase className="w-4 h-4" /> : <UserSearch className="w-4 h-4" />}
              {seg === "jobs" ? "إعلانات الوظائف" : "الباحثين عن عمل"}
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${activeSegment === seg ? "bg-white/20 text-white" : "bg-gray-100 text-[#0e2453]/50"}`}>
                {seg === "jobs" ? filteredJobs.length : filteredSeekers.length}
              </span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0e2453]/30 pointer-events-none" />
          <input
            type="text" value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder={activeSegment === "jobs" ? "بحث عن وظيفة..." : "بحث عن باحث..."}
            className="pr-10 pl-4 h-10 w-[220px] rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-navy placeholder:text-navy/30 outline-none focus:border-navy/50 focus:ring-2 focus:ring-navy/10 transition-all duration-200"
          />
        </div>
      </div>

      {/* Table Card */}
      <TableCard
        footer={
          <PaginationRow
            currentPage={currentPage} totalPages={totalPages}
            totalItems={activeList.length} pageSize={PAGE_SIZE}
            itemLabel={activeSegment === "jobs" ? "وظيفة" : "باحث"}
            onPageChange={setCurrentPage}
          />
        }
      >
        {/* ── JOBS ── */}
        {activeSegment === "jobs" && (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#f8fafc]">
                    {JOB_COLS.map((col) => (
                      <th key={col} className="px-5 py-3.5 text-right text-[12px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobs.map((job, idx) => (
                    <tr key={job.id}
                      className="border-b border-gray-50 transition-all duration-150 hover:bg-[#0e2453]/[0.018] animate-[fadeSlideUp_0.4s_ease-out]"
                      style={{ animationDelay: `${idx * 45}ms`, animationFillMode: "both" }}>
                      <td className="px-5 py-4 text-[13px] font-bold text-[#0e2453]/40 whitespace-nowrap">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                      <td className="px-5 py-4 max-w-[240px]">
                        <p className="text-[14px] font-extrabold text-[#0e2453] truncate leading-snug">{job.title}</p>
                        <p className="text-[11px] font-medium text-[#0e2453]/40 mt-0.5 font-mono">{job.category}</p>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#0e2453]/[0.06] flex items-center justify-center shrink-0">
                            <Building2 className="w-3.5 h-3.5 text-[#0e2453]/50" strokeWidth={1.5} />
                          </div>
                          <span className="text-[13px] font-bold text-[#0e2453]/70 truncate max-w-[120px]">{job.company}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#0e2453]/60">
                          <MapPin className="w-3.5 h-3.5 text-navy/50 shrink-0" />{job.location}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${JOB_TYPE_CONFIG[job.type]}`}>{job.type}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${JOB_STATUS_CONFIG[job.status]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${job.status === "منشور" ? "bg-green-500" : "bg-yellow-500"}`} />{job.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-center">
                        {job.pinned
                          ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-[#0e2453]/[0.07] text-[#0e2453]/60 border border-[#0e2453]/10"><Pin className="w-3 h-3" />مثبت</span>
                          : <span className="text-[#0e2453]/20 font-bold text-[14px]">—</span>}
                      </td>
                      <td className="px-5 py-4 text-[13px] font-medium text-[#0e2453]/50 whitespace-nowrap">
                        {new Date(job.date).toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"numeric" })}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <ActionBtn icon={Eye}         title="عرض"  base="border-blue-200 text-blue-500"   hover="hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_4px_10px_rgba(59,130,246,0.3)]" />
                          <ActionBtn icon={CheckCircle} title="قبول" base="border-green-200 text-green-500" hover="hover:bg-green-500 hover:text-white hover:border-green-500 hover:shadow-[0_4px_10px_rgba(34,197,94,0.3)]" />
                          <ActionBtn icon={XCircle}     title="رفض"  base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_4px_10px_rgba(239,68,68,0.3)]" />
                          <ActionBtn icon={Trash2}      title="حذف"  base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_4px_10px_rgba(239,68,68,0.3)]" />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedJobs.length === 0 && (
                    <tr><td colSpan={9} className="px-5 py-16 text-center text-[14px] font-bold text-[#0e2453]/30">لا توجد نتائج مطابقة</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile jobs */}
            <div className="lg:hidden divide-y divide-gray-50">
              {paginatedJobs.map((job, idx) => (
                <div key={job.id} className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ animationDelay: `${idx * 45}ms`, animationFillMode: "both" }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-[14px] font-extrabold text-[#0e2453]">{job.title}</p>
                      <p className="text-[11px] text-[#0e2453]/40 font-mono">{job.category}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${JOB_STATUS_CONFIG[job.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${job.status === "منشور" ? "bg-green-500" : "bg-yellow-500"}`} />{job.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="flex items-center gap-1 text-[12px] text-[#0e2453]/50"><Building2 className="w-3.5 h-3.5" />{job.company}</span>
                    <span className="flex items-center gap-1 text-[12px] text-[#0e2453]/50"><MapPin className="w-3.5 h-3.5 text-[#058B7F]/60" />{job.location}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${JOB_TYPE_CONFIG[job.type]}`}>{job.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#0e2453]/40">{new Date(job.date).toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"numeric" })}</span>
                    <div className="flex items-center gap-1.5">
                      <ActionBtn icon={Eye}         title="عرض"  base="border-blue-200 text-blue-500"   hover="hover:bg-blue-500 hover:text-white hover:border-blue-500"   size="sm" />
                      <ActionBtn icon={CheckCircle} title="قبول" base="border-green-200 text-green-500" hover="hover:bg-green-500 hover:text-white hover:border-green-500" size="sm" />
                      <ActionBtn icon={XCircle}     title="رفض"  base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500"     size="sm" />
                      <ActionBtn icon={Trash2}      title="حذف"  base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500"     size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── SEEKERS ── */}
        {activeSegment === "seekers" && (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#f8fafc]">
                    {SEEKER_COLS.map((col) => (
                      <th key={col} className="px-5 py-3.5 text-right text-[12px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedSeekers.map((seeker, idx) => (
                    <tr key={seeker.id}
                      className="border-b border-gray-50 transition-all duration-150 hover:bg-[#0e2453]/[0.018] animate-[fadeSlideUp_0.4s_ease-out]"
                      style={{ animationDelay: `${idx * 45}ms`, animationFillMode: "both" }}>
                      <td className="px-5 py-4 text-[13px] font-bold text-[#0e2453]/40 whitespace-nowrap">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center text-white text-[12px] font-extrabold shrink-0">
                            {seeker.name.slice(0, 2)}
                          </div>
                          <span className="text-[14px] font-extrabold text-[#0e2453]">{seeker.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[13px] font-medium text-[#0e2453]/60 whitespace-nowrap">{seeker.specialty}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#0e2453]/60">
                          <MapPin className="w-3.5 h-3.5 text-navy/50 shrink-0" />{seeker.location}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${JOB_TYPE_CONFIG[seeker.type]}`}>{seeker.type}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${JOB_STATUS_CONFIG[seeker.status]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${seeker.status === "منشور" ? "bg-green-500" : "bg-yellow-500"}`} />{seeker.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-center">
                        {seeker.pinned
                          ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-[#0e2453]/[0.07] text-[#0e2453]/60 border border-[#0e2453]/10"><Pin className="w-3 h-3" />مثبت</span>
                          : <span className="text-[#0e2453]/20 font-bold text-[14px]">—</span>}
                      </td>
                      <td className="px-5 py-4 text-[13px] font-medium text-[#0e2453]/50 whitespace-nowrap">
                        {new Date(seeker.date).toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"numeric" })}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <ActionBtn icon={Eye}         title="عرض"  base="border-blue-200 text-blue-500"   hover="hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_4px_10px_rgba(59,130,246,0.3)]" />
                          <ActionBtn icon={CheckCircle} title="قبول" base="border-green-200 text-green-500" hover="hover:bg-green-500 hover:text-white hover:border-green-500 hover:shadow-[0_4px_10px_rgba(34,197,94,0.3)]" />
                          <ActionBtn icon={XCircle}     title="رفض"  base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_4px_10px_rgba(239,68,68,0.3)]" />
                          <ActionBtn icon={Trash2}      title="حذف"  base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_4px_10px_rgba(239,68,68,0.3)]" />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedSeekers.length === 0 && (
                    <tr><td colSpan={9} className="px-5 py-16 text-center text-[14px] font-bold text-[#0e2453]/30">لا توجد نتائج مطابقة</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile seekers */}
            <div className="lg:hidden divide-y divide-gray-50">
              {paginatedSeekers.map((seeker, idx) => (
                <div key={seeker.id} className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ animationDelay: `${idx * 45}ms`, animationFillMode: "both" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center text-white text-[13px] font-extrabold shrink-0">
                      {seeker.name.slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-extrabold text-[#0e2453]">{seeker.name}</p>
                      <p className="text-[12px] text-[#0e2453]/50">{seeker.specialty}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${JOB_STATUS_CONFIG[seeker.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${seeker.status === "منشور" ? "bg-green-500" : "bg-yellow-500"}`} />{seeker.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1 text-[12px] text-[#0e2453]/50"><MapPin className="w-3.5 h-3.5 text-[#058B7F]/60" />{seeker.location}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${JOB_TYPE_CONFIG[seeker.type]}`}>{seeker.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ActionBtn icon={Eye}         title="عرض"  base="border-blue-200 text-blue-500"   hover="hover:bg-blue-500 hover:text-white hover:border-blue-500"   size="sm" />
                      <ActionBtn icon={CheckCircle} title="قبول" base="border-green-200 text-green-500" hover="hover:bg-green-500 hover:text-white hover:border-green-500" size="sm" />
                      <ActionBtn icon={XCircle}     title="رفض"  base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500"     size="sm" />
                      <ActionBtn icon={Trash2}      title="حذف"  base="border-red-200 text-red-400"     hover="hover:bg-red-500 hover:text-white hover:border-red-500"     size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </TableCard>
    </div>
  );
}
