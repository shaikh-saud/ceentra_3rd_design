"use client";

import React, { useState, useMemo } from "react";
import { Users, Search, Filter, Mail, BookOpen, Calendar, BarChart2 } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  course_name: string;
  joined_at: string;
  progress: number;
}

const STUDENTS: Student[] = [];

export default function TrainerStudentsContent() {
  const [search, setSearch]           = useState("");
  const [courseFilter, setCourseFilter] = useState("الكل");

  const courses = useMemo(
    () => ["الكل", ...Array.from(new Set(STUDENTS.map((s) => s.course_name)))],
    []
  );

  const filtered = useMemo(
    () =>
      STUDENTS.filter((s) => {
        const matchSearch = s.name.includes(search) || s.email.includes(search);
        const matchCourse = courseFilter === "الكل" || s.course_name === courseFilter;
        return matchSearch && matchCourse;
      }),
    [search, courseFilter]
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
          <Users className="w-4 h-4 text-[#058B7F]" />
        </div>
        <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">الطلاب المسجلين</h1>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-50 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#058B7F]" />
            </div>
            <p className="text-[14px] font-extrabold text-[#0e2453]">قائمة الطلاب</p>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-[#0e2453]/50">
              {STUDENTS.length}
            </span>
          </div>

          {STUDENTS.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0e2453]/30 pointer-events-none" />
                <input
                  type="text"
                  placeholder="بحث بالاسم أو الإيميل..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-52 pr-8 pl-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-[12px] font-medium text-[#0e2453] placeholder:text-[#0e2453]/30 focus:outline-none focus:border-[#058B7F]/40 focus:bg-white transition-all"
                />
              </div>

              <div className="relative">
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0e2453]/30 pointer-events-none" />
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="appearance-none pr-8 pl-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-[12px] font-medium text-[#0e2453] focus:outline-none focus:border-[#058B7F]/40 focus:bg-white transition-all cursor-pointer"
                >
                  {courses.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                 style={{ background: "rgba(5,139,127,0.08)" }}>
              <Users className="w-8 h-8 text-[#058B7F]/40" />
            </div>
            <p className="text-[16px] font-extrabold text-[#0e2453] mb-2">لا يوجد طلاب مسجلين بعد</p>
            <p className="text-[13px] text-[#0e2453]/40 font-medium">
              سيظهر هنا الطلاب بعد نشر كورساتك وتسجيلهم فيها
            </p>
          </div>
        )}

        {/* Table (shown when data exists) */}
        {filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  {["اسم الطالب", "البريد الإلكتروني", "الكورس", "تاريخ التسجيل", "التقدم", "الإجراءات"].map((h) => (
                    <th key={h} className="px-5 py-3 text-right text-[11px] font-extrabold text-[#0e2453]/40 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((student, i) => (
                  <tr
                    key={student.id}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                      i === filtered.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#058B7F] to-[#0FAE9E] flex items-center justify-center text-white text-[12px] font-extrabold shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <p className="text-[13px] font-extrabold text-[#0e2453]">{student.name}</p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#0e2453]/25 shrink-0" />
                        <span className="text-[12px] font-medium text-[#0e2453]/50" dir="ltr">{student.email}</span>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#058B7F]/60 shrink-0" />
                        <span className="text-[12px] font-bold text-[#0e2453]/70">{student.course_name}</span>
                      </div>
                    </td>

                    {/* Joined */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0e2453]/25 shrink-0" />
                        <span className="text-[12px] font-medium text-[#0e2453]/50">{student.joined_at}</span>
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-l from-[#058B7F] to-[#0FAE9E] transition-all duration-700"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart2 className="w-3 h-3 text-[#0e2453]/25" />
                          <span className="text-[11px] font-bold text-[#0e2453]/50">{student.progress}%</span>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#058B7F] bg-[#058B7F]/6 hover:bg-[#058B7F]/12 transition-colors whitespace-nowrap"
                              style={{ background: "rgba(5,139,127,0.06)" }}>
                        <Mail className="w-3 h-3" />
                        مراسلة
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
