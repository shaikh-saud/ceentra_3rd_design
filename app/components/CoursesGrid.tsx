"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Star,
  Clock,
  BookOpen,
  Users2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  GraduationCap,
  Megaphone,
  Palette,
  TrendingUp,
  Share2,
  BarChart3,
  PlayCircle,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Level    = "مبتدئ" | "متوسط" | "متقدم";
type Category = "تسويق رقمي" | "إعلانات" | "تصميم" | "SEO" | "سوشال ميديا" | "تحليلات";

interface Course {
  id:        number;
  title:     string;
  category:  Category;
  level:     Level;
  hours:     number;
  lessons:   number;
  rating:    number;
  reviews:   number;
  price:     number;
  oldPrice:  number | null;
  featured:  boolean;
  enrolled:  number;
  icon:      React.ElementType;
  gradient:  [string, string];
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const ALL_COURSES: Course[] = [
  { id:  1, title: "أساسيات التسويق الرقمي",       category: "تسويق رقمي",  level: "مبتدئ",  hours: 20, lessons: 45, rating: 4.8, reviews: 128, price: 299, oldPrice: 499, featured: true,  enrolled: 1240, icon: TrendingUp,  gradient: ["#058B7F","#0FAE9E"] },
  { id:  2, title: "الإعلانات على فيسبوك وإنستقرام", category: "إعلانات",    level: "متوسط",  hours: 15, lessons: 32, rating: 4.7, reviews:  86, price: 399, oldPrice: null, featured: true,  enrolled:  876, icon: Megaphone,   gradient: ["#0e2453","#162d6e"] },
  { id:  3, title: "تحسين محركات البحث SEO",        category: "SEO",         level: "متوسط",  hours: 25, lessons: 55, rating: 4.9, reviews: 203, price: 449, oldPrice: 649, featured: false, enrolled: 2100, icon: BarChart3,   gradient: ["#046E65","#058B7F"] },
  { id:  4, title: "تصميم الهوية البصرية",           category: "تصميم",       level: "متوسط",  hours: 18, lessons: 40, rating: 4.6, reviews:  64, price: 349, oldPrice: null, featured: false, enrolled:  543, icon: Palette,     gradient: ["#091a3e","#0e2453"] },
  { id:  5, title: "إدارة حسابات سوشال ميديا",      category: "سوشال ميديا", level: "مبتدئ",  hours: 12, lessons: 28, rating: 4.5, reviews:  91, price: 249, oldPrice: 399, featured: false, enrolled:  987, icon: Share2,      gradient: ["#0e2453","#058B7F"] },
  { id:  6, title: "إعلانات جوجل المتقدمة",         category: "إعلانات",    level: "متقدم",  hours: 30, lessons: 68, rating: 4.8, reviews: 157, price: 599, oldPrice: null, featured: true,  enrolled:  689, icon: Megaphone,   gradient: ["#0e2453","#0FAE9E"] },
  { id:  7, title: "كتابة المحتوى التسويقي",         category: "تسويق رقمي",  level: "مبتدئ",  hours: 10, lessons: 22, rating: 4.4, reviews:  45, price: 199, oldPrice: 299, featured: false, enrolled:  432, icon: BookOpen,    gradient: ["#046E65","#0e2453"] },
  { id:  8, title: "تحليل البيانات التسويقية",       category: "تحليلات",     level: "متقدم",  hours: 28, lessons: 60, rating: 4.7, reviews: 112, price: 499, oldPrice: null, featured: false, enrolled:  321, icon: BarChart3,   gradient: ["#091a3e","#046E65"] },
  { id:  9, title: "تصميم واجهات المستخدم UI/UX",   category: "تصميم",       level: "متوسط",  hours: 22, lessons: 50, rating: 4.8, reviews: 178, price: 399, oldPrice: 549, featured: false, enrolled: 1560, icon: Palette,     gradient: ["#0e2453","#058B7F"] },
  { id: 10, title: "استراتيجية التسويق بالمحتوى",   category: "تسويق رقمي",  level: "متوسط",  hours: 16, lessons: 35, rating: 4.6, reviews:  73, price: 329, oldPrice: null, featured: false, enrolled:  654, icon: TrendingUp,  gradient: ["#058B7F","#091a3e"] },
  { id: 11, title: "إنتاج الفيديو للسوشال ميديا",   category: "سوشال ميديا", level: "مبتدئ",  hours: 14, lessons: 30, rating: 4.5, reviews:  58, price: 279, oldPrice: 399, featured: false, enrolled:  789, icon: PlayCircle,  gradient: ["#046E65","#0FAE9E"] },
  { id: 12, title: "إتقان حملات البريد الإلكتروني", category: "تسويق رقمي",  level: "متوسط",  hours:  8, lessons: 18, rating: 4.3, reviews:  34, price: 149, oldPrice: null, featured: false, enrolled:  267, icon: Zap,         gradient: ["#0e2453","#046E65"] },
];

const CATEGORIES = ["الكل", "تسويق رقمي", "إعلانات", "تصميم", "SEO", "سوشال ميديا", "تحليلات"];
const LEVELS     = ["الكل", "مبتدئ", "متوسط", "متقدم"];
const SORT_OPTS  = ["الأحدث", "الأعلى تقييمًا", "الأكثر طلاب", "الأقل سعرًا", "الأعلى سعرًا"];

const PER_PAGE = 9;

// ─── Level badge colors ───────────────────────────────────────────────────────
const LEVEL_COLORS: Record<Level, { bg: string; text: string; border: string }> = {
  "مبتدئ":  { bg: "rgba(5,139,127,0.09)",   text: "#058B7F",  border: "rgba(5,139,127,0.20)"  },
  "متوسط":  { bg: "rgba(14,36,83,0.07)",    text: "#0e2453",  border: "rgba(14,36,83,0.16)"   },
  "متقدم":  { bg: "rgba(251,191,36,0.10)",  text: "#d97706",  border: "rgba(251,191,36,0.24)" },
};

// ─── Star rating helper ───────────────────────────────────────────────────────
function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1,2,3,4,5].map((s) => (
          <Star
            key={s}
            className="w-3 h-3"
            strokeWidth={0}
            style={{
              fill: s <= Math.floor(rating) ? "#FBBF24"
                  : s === Math.ceil(rating) && rating % 1 >= 0.5 ? "#FBBF24"
                  : "rgba(14,36,83,0.15)",
            }}
          />
        ))}
      </div>
      <span className="text-[12px] font-bold" style={{ color: "#d97706" }}>{rating}</span>
      <span className="text-[11px]" style={{ color: "rgba(14,36,83,0.38)" }}>({reviews})</span>
    </div>
  );
}

// ─── Filter dropdown ──────────────────────────────────────────────────────────
function FilterDrop({
  label, value, options, onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const active = value !== "الكل" && value !== "الأحدث";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 h-10 px-4 rounded-full text-[13px] font-semibold transition-all duration-200 whitespace-nowrap"
        style={{
          background: active ? "rgba(5,139,127,0.09)" : "rgba(14,36,83,0.04)",
          border:     active ? "1px solid rgba(5,139,127,0.28)" : "1px solid rgba(14,36,83,0.12)",
          color:      active ? "#058B7F" : "#0e2453",
        }}
      >
        {active ? value : label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.2}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute top-full mt-2 right-0 z-50 min-w-[170px] rounded-2xl py-1.5 overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(14,36,83,0.08)",
                boxShadow: "0 12px 40px rgba(14,36,83,0.10)",
              }}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className="w-full text-right px-4 py-2.5 text-[13px] flex items-center justify-between gap-3 transition-colors duration-120"
                  style={{
                    color:      opt === value ? "#058B7F" : "#0e2453",
                    background: opt === value ? "rgba(5,139,127,0.07)" : "transparent",
                    fontWeight: opt === value ? 700 : 500,
                  }}
                >
                  {opt}
                  {opt === value && (
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#058B7F" }} />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────────
function CourseCard({ course, index }: { course: Course; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon       = course.icon;
  const levelColor = LEVEL_COLORS[course.level];
  const discount   = course.oldPrice
    ? Math.round((1 - course.price / course.oldPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.50, ease: "easeOut", delay: index * 0.055 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="cursor-pointer flex flex-col h-full"
      dir="rtl"
    >
      <div
        className="flex flex-col h-full"
        style={{
          borderRadius: "20px",
          background: "#ffffff",
          border: hovered
            ? "1px solid rgba(5,139,127,0.30)"
            : "1px solid rgba(14,36,83,0.07)",
          boxShadow: hovered
            ? "0 20px 56px rgba(14,36,83,0.09), 0 0 0 1px rgba(15,174,158,0.22), 0 0 30px rgba(5,139,127,0.10)"
            : "0 4px 20px rgba(14,36,83,0.06)",
          transition: "all 0.28s ease",
          transform: hovered ? "translateY(-5px) scale(1.015)" : "translateY(0) scale(1)",
          overflow: "hidden",
        }}
      >
        {/* ── Thumbnail ── */}
        <div
          className="relative h-40 flex items-center justify-center shrink-0 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${course.gradient[0]} 0%, ${course.gradient[1]} 100%)`,
          }}
        >
          {/* Dot grid on thumbnail */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.12,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.80) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Rings */}
          <div
            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
            style={{ border: "1.5px solid rgba(255,255,255,0.10)" }}
          />
          <div
            className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
            style={{ border: "1.5px solid rgba(255,255,255,0.08)" }}
          />

          {/* Icon */}
          <div
            className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.18)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            }}
          >
            <Icon className="w-7 h-7 text-white" strokeWidth={1.7} />
          </div>

          {/* Badges overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end z-20">
            {course.featured && (
              <span
                className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(5,139,127,0.90)",
                  color: "#ffffff",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <Star className="w-2.5 h-2.5 fill-white text-white" strokeWidth={0} />
                مميز
              </span>
            )}
            {discount !== null && (
              <span
                className="text-[10px] font-black px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(239,68,68,0.90)",
                  color: "#ffffff",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
              >
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 p-5">
          {/* Category + Level */}
          <div className="flex items-center justify-between mb-2.5">
            <span
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(15,174,158,0.10)",
                color: "#0FAE9E",
                border: "1px solid rgba(15,174,158,0.20)",
              }}
            >
              {course.category}
            </span>
            <span
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              style={{
                background: levelColor.bg,
                color:      levelColor.text,
                border:     `1px solid ${levelColor.border}`,
              }}
            >
              {course.level}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-extrabold leading-snug mb-3 transition-colors duration-250"
            style={{
              fontSize: "15px",
              color: hovered ? "#058B7F" : "#0e2453",
              lineHeight: 1.45,
            }}
          >
            {course.title}
          </h3>

          {/* Meta row */}
          <div className="flex items-center gap-4 mb-3">
            <span className="flex items-center gap-1.5" style={{ color: "rgba(14,36,83,0.48)", fontSize: "12px" }}>
              <Clock    className="w-3.5 h-3.5" strokeWidth={1.8} />
              {course.hours} ساعة
            </span>
            <span className="flex items-center gap-1.5" style={{ color: "rgba(14,36,83,0.48)", fontSize: "12px" }}>
              <BookOpen className="w-3.5 h-3.5" strokeWidth={1.8} />
              {course.lessons} درس
            </span>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <StarRating rating={course.rating} reviews={course.reviews} />
          </div>

          {/* Divider */}
          <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(14,36,83,0.06)" }}>
            {/* Price */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="text-[17px] font-black"
                  style={{ color: hovered ? "#0FAE9E" : "#058B7F" }}
                >
                  {course.price} ر.س
                </span>
                {course.oldPrice && (
                  <span
                    className="text-[13px] font-semibold line-through"
                    style={{ color: "rgba(14,36,83,0.30)" }}
                  >
                    {course.oldPrice}
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1" style={{ color: "rgba(14,36,83,0.40)", fontSize: "11px" }}>
                <Users2 className="w-3 h-3" strokeWidth={1.8} />
                {course.enrolled.toLocaleString("ar")}
              </span>
            </div>

            {/* Enroll button */}
            <button
              className="w-full h-9 rounded-full font-bold text-[13px] transition-all duration-250 flex items-center justify-center gap-1.5"
              style={{
                background: hovered
                  ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                  : "rgba(5,139,127,0.08)",
                color:  hovered ? "#ffffff" : "#058B7F",
                border: "1px solid rgba(15,174,158,0.25)",
                boxShadow: hovered ? "0 4px 18px rgba(5,139,127,0.32)" : "none",
              }}
            >
              سجّل الآن
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="rounded-[20px] overflow-hidden animate-pulse"
      style={{ background: "#ffffff", border: "1px solid rgba(14,36,83,0.06)" }}
    >
      <div className="h-40" style={{ background: "rgba(14,36,83,0.06)" }} />
      <div className="p-5">
        <div className="flex justify-between mb-2.5">
          <div className="w-20 h-5 rounded-full" style={{ background: "rgba(14,36,83,0.06)" }} />
          <div className="w-14 h-5 rounded-full" style={{ background: "rgba(14,36,83,0.06)" }} />
        </div>
        <div className="w-4/5 h-5 rounded mb-1.5" style={{ background: "rgba(14,36,83,0.06)" }} />
        <div className="w-3/5 h-4 rounded mb-3"   style={{ background: "rgba(14,36,83,0.05)" }} />
        <div className="flex gap-4 mb-3">
          <div className="w-16 h-3 rounded" style={{ background: "rgba(14,36,83,0.05)" }} />
          <div className="w-14 h-3 rounded" style={{ background: "rgba(14,36,83,0.05)" }} />
        </div>
        <div className="w-24 h-4 rounded mb-4"   style={{ background: "rgba(14,36,83,0.05)" }} />
        <div className="pt-4" style={{ borderTop: "1px solid rgba(14,36,83,0.05)" }}>
          <div className="flex justify-between mb-3">
            <div className="w-20 h-5 rounded" style={{ background: "rgba(14,36,83,0.06)" }} />
            <div className="w-12 h-4 rounded" style={{ background: "rgba(14,36,83,0.05)" }} />
          </div>
          <div className="w-full h-9 rounded-full" style={{ background: "rgba(14,36,83,0.06)" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyCourses({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
      dir="rtl"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "rgba(14,36,83,0.05)", border: "1px solid rgba(14,36,83,0.08)" }}
      >
        <GraduationCap className="w-7 h-7" style={{ color: "rgba(14,36,83,0.28)" }} strokeWidth={1.6} />
      </div>
      <h3 className="font-bold text-[17px] mb-2" style={{ color: "#0e2453" }}>
        لا توجد دورات
      </h3>
      <p className="text-[13px] mb-5 max-w-xs" style={{ color: "rgba(14,36,83,0.48)" }}>
        لم نجد دورات تطابق معايير البحث الحالية. جرّب تعديل الفلاتر.
      </p>
      <button
        onClick={onReset}
        className="h-10 px-6 rounded-full font-bold text-[13px] text-white transition-all hover:scale-[1.03]"
        style={{
          background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
          boxShadow: "0 4px 14px rgba(5,139,127,0.32)",
        }}
      >
        مسح الفلاتر
      </button>
    </motion.div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-12" dir="rtl">
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: "rgba(14,36,83,0.04)", border: "1px solid rgba(14,36,83,0.12)", color: "#0e2453" }}
      >
        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.2} />
        السابق
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-10 h-10 rounded-full text-[13px] font-bold transition-all duration-200 hover:scale-[1.07]"
          style={{
            background: p === current
              ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
              : "rgba(14,36,83,0.04)",
            color:  p === current ? "#ffffff" : "#0e2453",
            border: p === current ? "none" : "1px solid rgba(14,36,83,0.12)",
            boxShadow: p === current ? "0 4px 14px rgba(5,139,127,0.38)" : "none",
          }}
        >
          {p}
        </button>
      ))}

      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: "rgba(14,36,83,0.04)", border: "1px solid rgba(14,36,83,0.12)", color: "#0e2453" }}
      >
        التالي
        <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.2} />
      </button>
    </div>
  );
}

// ─── Mobile filter drawer ─────────────────────────────────────────────────────
function MobileFilters({
  search, setSearch, catFilter, setCatFilter,
  levelFilter, setLevelFilter, sort, setSort,
  onSearch, onReset, hasActive,
}: {
  search: string; setSearch: (v: string) => void;
  catFilter: string; setCatFilter: (v: string) => void;
  levelFilter: string; setLevelFilter: (v: string) => void;
  sort: string; setSort: (v: string) => void;
  onSearch: () => void; onReset: () => void;
  hasActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sm:hidden" dir="rtl">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex items-center gap-2 h-9 px-4 rounded-full text-[13px] font-semibold"
          style={{
            background: open ? "rgba(5,139,127,0.09)" : "rgba(14,36,83,0.04)",
            border: open ? "1px solid rgba(5,139,127,0.25)" : "1px solid rgba(14,36,83,0.12)",
            color: open ? "#058B7F" : "#0e2453",
          }}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={2} />
          الفلاتر
          {hasActive && <span className="w-2 h-2 rounded-full" style={{ background: "#058B7F" }} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden mt-3"
          >
            <div className="flex flex-col gap-2.5">
              {/* Search */}
              <div
                className="flex items-center gap-2 h-10 px-3 rounded-xl"
                style={{ border: "1px solid rgba(14,36,83,0.14)", background: "#ffffff" }}
              >
                <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(14,36,83,0.35)" }} strokeWidth={2} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSearch()}
                  placeholder="ابحث عن دورة..."
                  className="flex-1 bg-transparent text-[13px] outline-none font-[inherit] min-w-0"
                  style={{ color: "#0e2453" }}
                />
              </div>
              <FilterDrop label="التصنيف" value={catFilter}   options={CATEGORIES} onChange={setCatFilter} />
              <FilterDrop label="المستوى" value={levelFilter} options={LEVELS}      onChange={setLevelFilter} />
              <FilterDrop label="الترتيب" value={sort}        options={SORT_OPTS}   onChange={setSort} />
              {hasActive && (
                <button
                  onClick={() => { onReset(); setOpen(false); }}
                  className="flex items-center gap-1.5 h-9 px-4 rounded-full text-[12px] font-semibold w-fit"
                  style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.20)", color: "#ef4444" }}
                >
                  <X className="w-3 h-3" strokeWidth={2.5} />
                  مسح الفلاتر
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Background decoration ────────────────────────────────────────────────────
function BgBlobs() {
  return (
    <>
      <div
        className="absolute -top-28 -right-28 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,174,158,0.05) 0%, transparent 65%)", filter: "blur(52px)" }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,36,83,0.04) 0%, transparent 60%)", filter: "blur(48px)" }}
      />
    </>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.50, ease: "easeOut" as const, delay: d },
  }),
};

// ─── Main export ──────────────────────────────────────────────────────────────
export default function CoursesGrid() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [search,       setSearch]       = useState("");
  const [appliedSearch,setAppliedSearch]= useState("");
  const [catFilter,    setCatFilter]    = useState("الكل");
  const [levelFilter,  setLevelFilter]  = useState("الكل");
  const [sort,         setSort]         = useState("الأحدث");
  const [page,         setPage]         = useState(1);

  const hasActive = catFilter !== "الكل" || levelFilter !== "الكل" || appliedSearch !== "";

  const resetAll = () => {
    setSearch(""); setAppliedSearch("");
    setCatFilter("الكل"); setLevelFilter("الكل"); setSort("الأحدث");
    setPage(1);
  };

  const applySearch = () => { setAppliedSearch(search); setPage(1); };

  const filtered = useMemo(() => {
    let list = ALL_COURSES.filter((c) => {
      const matchCat   = catFilter   === "الكل" || c.category === catFilter;
      const matchLevel = levelFilter === "الكل" || c.level    === levelFilter;
      const matchSearch = !appliedSearch || c.title.includes(appliedSearch) || c.category.includes(appliedSearch);
      return matchCat && matchLevel && matchSearch;
    });

    if (sort === "الأعلى تقييمًا") list = [...list].sort((a, b) => b.rating  - a.rating);
    if (sort === "الأكثر طلاب")    list = [...list].sort((a, b) => b.enrolled - a.enrolled);
    if (sort === "الأقل سعرًا")    list = [...list].sort((a, b) => a.price   - b.price);
    if (sort === "الأعلى سعرًا")   list = [...list].sort((a, b) => b.price   - a.price);

    return list;
  }, [catFilter, levelFilter, sort, appliedSearch]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageData   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handlePage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleFilterChange = (key: string, val: string) => {
    if (key === "cat")   { setCatFilter(val);   }
    if (key === "level") { setLevelFilter(val);  }
    if (key === "sort")  { setSort(val);          }
    setPage(1);
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#F7F9F9" }}
    >
      <BgBlobs />

      {/* ── Sticky filter bar ── */}
      <div
        className="sticky top-0 z-30"
        style={{
          background: "rgba(247,249,249,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(14,36,83,0.07)",
        }}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Desktop filters */}
          <div className="hidden sm:flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div
              className="flex items-center gap-2 h-10 px-4 rounded-full overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(14,36,83,0.13)",
                minWidth: "200px",
              }}
            >
              <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(14,36,83,0.38)" }} strokeWidth={2} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") applySearch(); }}
                placeholder="ابحث عن دورة..."
                className="flex-1 bg-transparent text-[13px] outline-none font-[inherit] min-w-0"
                style={{ color: "#0e2453" }}
                dir="rtl"
              />
              {search && (
                <button onClick={() => { setSearch(""); setAppliedSearch(""); setPage(1); }}>
                  <X className="w-3 h-3" style={{ color: "rgba(14,36,83,0.35)" }} strokeWidth={2.5} />
                </button>
              )}
            </div>

            <FilterDrop
              label="التصنيف"
              value={catFilter}
              options={CATEGORIES}
              onChange={(v) => handleFilterChange("cat", v)}
            />
            <FilterDrop
              label="المستوى"
              value={levelFilter}
              options={LEVELS}
              onChange={(v) => handleFilterChange("level", v)}
            />

            <div className="h-5 w-px mx-1" style={{ background: "rgba(14,36,83,0.12)" }} />

            <FilterDrop
              label="الترتيب"
              value={sort}
              options={SORT_OPTS}
              onChange={(v) => handleFilterChange("sort", v)}
            />

            {hasActive && (
              <button
                onClick={resetAll}
                className="flex items-center gap-1.5 h-10 px-4 rounded-full text-[12.5px] font-semibold transition-all hover:scale-[1.02]"
                style={{
                  background: "rgba(239,68,68,0.07)",
                  border: "1px solid rgba(239,68,68,0.20)",
                  color: "#ef4444",
                }}
              >
                <X className="w-3 h-3" strokeWidth={2.5} />
                مسح
              </button>
            )}

            <span className="mr-auto text-[12px]" style={{ color: "rgba(14,36,83,0.42)" }}>
              {filtered.length} دورة
            </span>
          </div>

          {/* Mobile */}
          <MobileFilters
            search={search} setSearch={setSearch}
            catFilter={catFilter} setCatFilter={(v) => handleFilterChange("cat", v)}
            levelFilter={levelFilter} setLevelFilter={(v) => handleFilterChange("level", v)}
            sort={sort} setSort={(v) => handleFilterChange("sort", v)}
            onSearch={applySearch}
            onReset={resetAll}
            hasActive={hasActive}
          />
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Section heading */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}
          className="flex items-center justify-between mb-8"
          dir="rtl"
        >
          <div>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(1.2rem, 2.6vw, 1.65rem)", color: "#0e2453" }}>
              جميع الدورات
            </h2>
            <p className="mt-1 text-[13px]" style={{ color: "rgba(14,36,83,0.50)" }}>
              اختر الدورة التي تناسب مستواك واهتماماتك
            </p>
          </div>
          {/* Featured-only toggle */}
          <button
            onClick={() => handleFilterChange("cat", catFilter === "الكل" ? "الكل" : "الكل")}
            className="hidden sm:flex items-center gap-2 h-9 px-4 rounded-full text-[12.5px] font-semibold transition-all duration-200"
            style={{
              background: "rgba(251,191,36,0.09)",
              border: "1px solid rgba(251,191,36,0.25)",
              color: "#d97706",
            }}
          >
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" strokeWidth={0} />
            الدورات المميزة فقط
          </button>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${catFilter}-${levelFilter}-${sort}-${appliedSearch}-${page}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {pageData.length === 0 ? (
              <EmptyCourses onReset={resetAll} />
            ) : (
              pageData.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {pageData.length > 0 && (
          <Pagination current={page} total={totalPages} onChange={handlePage} />
        )}
      </div>
    </section>
  );
}
