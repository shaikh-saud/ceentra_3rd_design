"use client";

import React, { useState } from "react";
import { GraduationCap, Pencil, Trash2, Eye, Search, Filter } from "lucide-react";

interface Course {
  id: string;
  title: string;
  price: number;
  students_count: number;
  status: "نشط" | "غير نشط";
  created_at: string;
}

const COURSES: Course[] = [];

export default function TrainerCoursesContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"الكل" | "نشط" | "غير نشط">("الكل");

  const filtered = COURSES.filter((c) => {
    const matchSearch = c.title.includes(search);
    const matchStatus = statusFilter === "الكل" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Page header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4 text-[#058B7F]" />
          </div>
          <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">إدارة الكورسات والدروس</h1>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200 active:scale-95">
          <span>إنشاء كورس جديد</span>
          <span className="text-white/70 text-[15px]">+</span>
        </button>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-50 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-[#058B7F]" />
            </div>
            <p className="text-[14px] font-extrabold text-[#0e2453]">كورساتي</p>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-[#0e2453]/50">
              {COURSES.length}
            </span>
          </div>

          {COURSES.length > 0 && (
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0e2453]/30 pointer-events-none" />
                <input
                  type="text"
                  placeholder="بحث..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-44 pr-8 pl-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-[12px] font-medium text-[#0e2453] placeholder:text-[#0e2453]/30 focus:outline-none focus:border-[#058B7F]/40 focus:bg-white transition-all"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0e2453]/30 pointer-events-none" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                  className="appearance-none pr-8 pl-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-[12px] font-medium text-[#0e2453] focus:outline-none focus:border-[#058B7F]/40 focus:bg-white transition-all cursor-pointer"
                >
                  <option>الكل</option>
                  <option>نشط</option>
                  <option>غير نشط</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#058B7F]/8 flex items-center justify-center mb-5"
                 style={{ background: "rgba(5,139,127,0.08)" }}>
              <GraduationCap className="w-8 h-8 text-[#058B7F]/40" />
            </div>
            <p className="text-[16px] font-extrabold text-[#0e2453] mb-2">لم تقم بإنشاء أي كورسات بعد</p>
            <p className="text-[13px] text-[#0e2453]/40 font-medium mb-7">
              ابدأ بإنشاء أول كورس لك وشارك معرفتك مع الطلاب
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-extrabold text-white bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#058B7F]/25 transition-all duration-200 active:scale-95">
              <span>إنشاء كورس جديد</span>
              <span className="text-white/70 text-[15px]">+</span>
            </button>
          </div>
        )}

        {/* Course cards (shown when data exists) */}
        {filtered.length > 0 && (
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="border border-gray-100 rounded-xl p-5 hover:border-[#058B7F]/30 hover:shadow-md transition-all duration-200"
              >
                {/* Status + title */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                    course.status === "نشط"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-[#0e2453]/50"
                  }`}>
                    {course.status}
                  </span>
                  <p className="text-[14px] font-extrabold text-[#0e2453] text-right leading-snug">{course.title}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#058B7F]" />
                    <span className="text-[12px] font-bold text-[#0e2453]/50">{course.students_count} طالب</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-[12px] font-bold text-[#0e2453]/50">{course.price} ر.س</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-bold text-[#058B7F] bg-[#058B7F]/6 hover:bg-[#058B7F]/12 transition-colors"
                          style={{ background: "rgba(5,139,127,0.06)" }}>
                    <Eye className="w-3.5 h-3.5" />
                    عرض
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-bold text-[#0e2453]/60 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                    تعديل
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-bold text-red-400 bg-red-50 hover:bg-red-100 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
