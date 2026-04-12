"use client";

import React, { useState, useMemo } from "react";
import { Star, BookOpen, Calendar, Filter } from "lucide-react";

interface Review {
  id: string;
  student_name: string;
  rating: number;
  comment: string;
  date: string;
  course_name: string;
}

const REVIEWS: Review[] = [];

export default function TrainerReviewsContent() {
  const [courseFilter, setCourseFilter] = useState("الكل");

  const courses = useMemo(
    () => ["الكل", ...Array.from(new Set(REVIEWS.map((r) => r.course_name)))],
    []
  );

  const filtered = useMemo(
    () => REVIEWS.filter((r) => courseFilter === "الكل" || r.course_name === courseFilter),
    [courseFilter]
  );

  const avgRating = filtered.length
    ? (filtered.reduce((sum, r) => sum + r.rating, 0) / filtered.length).toFixed(1)
    : "0.0";

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
          <Star className="w-4 h-4 text-amber-500" />
        </div>
        <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">تقييمات الطلاب</h1>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-50 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-[14px] font-extrabold text-[#0e2453]">تقييمات الطلاب</p>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-[#0e2453]/50">
              {REVIEWS.length}
            </span>
          </div>

          {REVIEWS.length > 0 && (
            <div className="flex items-center gap-3">
              {/* Avg rating badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-100">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-[13px] font-extrabold text-amber-600">{avgRating}</span>
              </div>

              {/* Course filter */}
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
                 style={{ background: "rgba(245,158,11,0.08)" }}>
              <Star className="w-8 h-8 text-amber-400/40" />
            </div>
            <p className="text-[16px] font-extrabold text-[#0e2453] mb-2">لا توجد تقييمات بعد</p>
            <p className="text-[13px] text-[#0e2453]/40 font-medium max-w-xs">
              ستظهر هنا تقييمات طلابك بعد إتمامهم للكورسات
            </p>
          </div>
        )}

        {/* Review cards (shown when data exists) */}
        {filtered.length > 0 && (
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((review) => (
              <div
                key={review.id}
                className="border border-gray-100 rounded-xl p-5 hover:border-amber-200 hover:shadow-md transition-all duration-200 flex flex-col gap-3"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                  <span className="mr-1.5 text-[12px] font-extrabold text-amber-500">{review.rating}.0</span>
                </div>

                {/* Comment */}
                <p className="text-[13px] font-medium text-[#0e2453]/70 leading-relaxed line-clamp-3">
                  {review.comment}
                </p>

                {/* Meta */}
                <div className="pt-3 border-t border-gray-50 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#0e2453]/25" />
                      <span className="text-[11px] font-medium text-[#0e2453]/40">{review.date}</span>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#058B7F] to-[#0FAE9E] flex items-center justify-center text-white text-[11px] font-extrabold shrink-0">
                      {review.student_name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#058B7F]/50" />
                    <span className="text-[11px] font-bold text-[#0e2453]/50">{review.course_name}</span>
                  </div>
                  <p className="text-[12px] font-extrabold text-[#0e2453]">{review.student_name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
