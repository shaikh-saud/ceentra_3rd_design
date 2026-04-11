"use client";

import React, { useState, useMemo } from "react";
import { GraduationCap, BookOpen, TrendingUp, Tag, Users, Eye, Pencil, PauseCircle, Trash2 } from "lucide-react";
import { Plus } from "lucide-react";
import { UserCheck } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import StatCard from "../ui/StatCard";
import SearchInput from "../ui/SearchInput";
import FilterDropdown from "../ui/FilterDropdown";
import TableCard, { TableHead, EmptyRow, StatusBadge, Badge } from "../ui/TableCard";
import PaginationRow from "../ui/PaginationRow";
import ActionBtn from "../ui/ActionBtn";

type CourseLevel  = "مبتدئ" | "متوسط" | "متقدم";
type CourseStatus = "active" | "paused";

interface Course {
  id: number; title: string; category: string; instructor: string;
  price: number; originalPrice: number | null;
  level: CourseLevel; lessons: number; enrollments: number;
  status: CourseStatus; color: string;
}

const MOCK_COURSES: Course[] = [
  { id:1,  title:"أساسيات البرمجة بـ Python",        category:"تقنية المعلومات",   instructor:"د. خالد العتيبي",  price:449, originalPrice:599, level:"مبتدئ",  lessons:32, enrollments:214, status:"active", color:"from-blue-500 to-indigo-600" },
  { id:2,  title:"تصميم واجهات المستخدم UI/UX",      category:"التصميم",           instructor:"م. نورة الشمري",   price:349, originalPrice:499, level:"متوسط",  lessons:28, enrollments:187, status:"active", color:"from-pink-500 to-rose-600" },
  { id:3,  title:"إدارة المشاريع الاحترافية",        category:"الأعمال",           instructor:"أ. فيصل الدوسري",  price:599, originalPrice:null, level:"متقدم",  lessons:40, enrollments:95,  status:"active", color:"from-teal-500 to-emerald-600" },
  { id:4,  title:"التسويق الرقمي المتكامل",          category:"التسويق",           instructor:"د. سارة القحطاني", price:299, originalPrice:399, level:"مبتدئ",  lessons:24, enrollments:342, status:"active", color:"from-orange-500 to-amber-600" },
  { id:5,  title:"تطوير تطبيقات الجوال بـ Flutter",  category:"تقنية المعلومات",   instructor:"م. عمر الزهراني",  price:699, originalPrice:899, level:"متقدم",  lessons:56, enrollments:78,  status:"active", color:"from-purple-500 to-violet-600" },
  { id:6,  title:"مهارات القيادة وبناء الفريق",      category:"التطوير الذاتي",    instructor:"أ. ريم السعدي",    price:199, originalPrice:299, level:"مبتدئ",  lessons:18, enrollments:521, status:"active", color:"from-cyan-500 to-blue-500" },
  { id:7,  title:"الذكاء الاصطناعي للمبتدئين",      category:"تقنية المعلومات",   instructor:"د. وليد الحربي",   price:799, originalPrice:999, level:"متوسط",  lessons:48, enrollments:156, status:"active", color:"from-indigo-500 to-purple-600" },
  { id:8,  title:"المحاسبة المالية للشركات",         category:"المالية",           instructor:"أ. هند الشريف",    price:449, originalPrice:null, level:"متوسط",  lessons:36, enrollments:67,  status:"paused", color:"from-green-500 to-teal-600" },
  { id:9,  title:"فن التفاوض والإقناع",              category:"التطوير الذاتي",    instructor:"م. دانة الرشيد",   price:249, originalPrice:349, level:"مبتدئ",  lessons:16, enrollments:289, status:"active", color:"from-rose-500 to-pink-600" },
  { id:10, title:"تطوير المواقع بـ Next.js",         category:"تقنية المعلومات",   instructor:"د. أحمد العمر",    price:549, originalPrice:749, level:"متقدم",  lessons:44, enrollments:134, status:"active", color:"from-sky-500 to-cyan-600" },
];

const COURSE_STATS = [
  { title:"إجمالي الكورسات",  value:"18", icon:BookOpen,      gradient:"from-[#0e2453] to-[#1a3a7a]", change:"+2" },
  { title:"كورسات نشطة",     value:"18", icon:GraduationCap,  gradient:"from-[#058B7F] to-[#0FAE9E]", change:"100%" },
  { title:"إجمالي التسجيلات", value:"8",  icon:UserCheck,      gradient:"from-[#0e2453] to-[#058B7F]", change:"+3" },
  { title:"إيرادات الكورسات", value:"0",  icon:TrendingUp,     gradient:"from-[#058B7F] to-[#047a6f]", change:"ر.س" },
];

const LEVEL_CONFIG: Record<CourseLevel, string> = {
  "مبتدئ": "bg-green-50 text-green-600 border-green-100",
  "متوسط": "bg-yellow-50 text-yellow-600 border-yellow-100",
  "متقدم": "bg-red-50 text-red-500 border-red-100",
};

const LEVEL_OPTIONS = [
  { value:"all",   label:"جميع المستويات" },
  { value:"مبتدئ", label:"مبتدئ" },
  { value:"متوسط", label:"متوسط" },
  { value:"متقدم", label:"متقدم" },
];

const COLS = ["#", "الكورس", "السعر", "المستوى", "التسجيلات", "الحالة", "الإجراءات"];
const PAGE_SIZE = 7;

export default function CoursesContent() {
  const [search, setSearch]       = useState("");
  const [levelFilter, setLevel]   = useState("all");
  const [currentPage, setPage]    = useState(1);

  const filtered = useMemo(() => MOCK_COURSES.filter((c) => {
    const matchLevel  = levelFilter === "all" || c.level === levelFilter;
    const matchSearch = !search || c.title.includes(search) || c.category.includes(search) || c.instructor.includes(search);
    return matchLevel && matchSearch;
  }), [search, levelFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilter = (v: string) => { setLevel(v); setPage(1); };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setPage(1); };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">
      <PageHeader
        title="إدارة الكورسات"
        subtitle="إدارة ومتابعة جميع الكورسات على المنصة"
        badge="18 كورس"
        action={
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] shadow-[0_4px_16px_rgba(5,139,127,0.3)] hover:shadow-[0_8px_24px_rgba(5,139,127,0.45)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95">
            <Plus className="w-4 h-4" />
            إضافة كورس
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {COURSE_STATS.map((card, i) => (
          <StatCard key={i} {...card} delay={i * 60} changeStyle="plain" />
        ))}
      </div>

      <TableCard
        toolbar={
          <>
            <p className="text-[14px] font-extrabold text-[#0e2453]">قائمة الكورسات</p>
            <div className="flex items-center gap-3">
              <SearchInput value={search} onChange={handleSearch} placeholder="بحث عن كورس..." />
              <FilterDropdown value={levelFilter} options={LEVEL_OPTIONS} onChange={handleFilter} />
            </div>
          </>
        }
        footer={
          <PaginationRow
            currentPage={currentPage} totalPages={totalPages}
            totalItems={filtered.length} pageSize={PAGE_SIZE} itemLabel="كورس"
            onPageChange={setPage}
          />
        }
      >
        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <TableHead columns={COLS} />
            <tbody>
              {paginated.map((course, idx) => (
                <tr
                  key={course.id}
                  className="border-b border-gray-50 transition-all duration-150 hover:bg-[#0e2453]/[0.018] group animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ animationDelay: `${idx * 45}ms`, animationFillMode: "both" }}
                >
                  <td className="px-5 py-4 text-[13px] font-bold text-[#0e2453]/40 whitespace-nowrap">
                    {(currentPage - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="px-5 py-4 max-w-[300px]">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shrink-0 shadow-sm`}>
                        <GraduationCap className="w-5 h-5 text-white" strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-extrabold text-[#0e2453] leading-snug truncate">{course.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1 text-[11px] font-medium text-[#0e2453]/40">
                            <Tag className="w-3 h-3" />{course.category}
                          </span>
                          <span className="text-[#0e2453]/20">·</span>
                          <span className="text-[11px] font-medium text-[#0e2453]/40">{course.instructor}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-extrabold text-[#058B7F]">{course.price} ر.س</span>
                      {course.originalPrice && (
                        <span className="text-[11px] font-medium text-[#0e2453]/35 line-through">{course.originalPrice} ر.س</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <Badge label={course.level} classes={LEVEL_CONFIG[course.level]} />
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5">
                      <span className="inline-flex items-center gap-1 text-[13px] font-extrabold text-[#0e2453]">
                        <Users className="w-3.5 h-3.5 text-[#058B7F]" />{course.enrollments}
                      </span>
                      <span className="text-[11px] font-medium text-[#0e2453]/40">{course.lessons} درس</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <StatusBadge active={course.status === "active"} inactiveLabel="متوقف" />
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ActionBtn icon={Eye}         title="عرض"   base="border-blue-200 text-blue-500"    hover="hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_4px_12px_rgba(59,130,246,0.35)]" />
                      <ActionBtn icon={Pencil}      title="تعديل" base="border-amber-200 text-amber-500"  hover="hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:shadow-[0_4px_12px_rgba(245,158,11,0.35)]" />
                      <ActionBtn icon={PauseCircle} title="إيقاف" base="border-orange-200 text-orange-400" hover="hover:bg-orange-400 hover:text-white hover:border-orange-400 hover:shadow-[0_4px_12px_rgba(251,146,60,0.35)]" />
                      <ActionBtn icon={Trash2}      title="حذف"   base="border-red-200 text-red-400"      hover="hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_4px_12px_rgba(239,68,68,0.35)]" />
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && <EmptyRow colSpan={7} />}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="lg:hidden divide-y divide-gray-50">
          {paginated.map((course, idx) => (
            <div key={course.id} className="p-4 hover:bg-gray-50/60 transition-colors animate-[fadeSlideUp_0.4s_ease-out]"
              style={{ animationDelay: `${idx * 45}ms`, animationFillMode: "both" }}>
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shrink-0 shadow-sm`}>
                  <GraduationCap className="w-5 h-5 text-white" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-extrabold text-[#0e2453] truncate">{course.title}</p>
                  <p className="text-[12px] text-[#0e2453]/40 font-medium">{course.category} · {course.instructor}</p>
                </div>
                <Badge label={course.level} classes={LEVEL_CONFIG[course.level]} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-[14px] font-extrabold text-[#058B7F]">{course.price} ر.س</span>
                    {course.originalPrice && <span className="text-[11px] text-[#0e2453]/35 line-through mr-1">{course.originalPrice} ر.س</span>}
                  </div>
                  <span className="text-[12px] font-bold text-[#0e2453]/50">{course.enrollments} طالب</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ActionBtn icon={Eye}         title="عرض"   base="border-blue-200 text-blue-500"    hover="hover:bg-blue-500 hover:text-white hover:border-blue-500"   size="sm" />
                  <ActionBtn icon={Pencil}      title="تعديل" base="border-amber-200 text-amber-500"  hover="hover:bg-amber-500 hover:text-white hover:border-amber-500" size="sm" />
                  <ActionBtn icon={PauseCircle} title="إيقاف" base="border-orange-200 text-orange-400" hover="hover:bg-orange-400 hover:text-white hover:border-orange-400" size="sm" />
                  <ActionBtn icon={Trash2}      title="حذف"   base="border-red-200 text-red-400"      hover="hover:bg-red-500 hover:text-white hover:border-red-500"     size="sm" />
                </div>
              </div>
            </div>
          ))}
          {paginated.length === 0 && <p className="py-16 text-center text-[14px] font-bold text-[#0e2453]/30">لا توجد نتائج مطابقة</p>}
        </div>
      </TableCard>
    </div>
  );
}
