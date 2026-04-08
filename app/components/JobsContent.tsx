"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Briefcase,
  Wifi,
  FileText,
  Users2,
  Megaphone,
  Code2,
  Palette,
  ShoppingCart,
  HeadphonesIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type JobType     = "دوام كامل" | "دوام جزئي" | "عقد" | "عن بعد";
type JobCategory = "تسويق" | "برمجة" | "تصميم" | "مبيعات" | "خدمة عملاء";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: JobType;
  category: JobCategory;
  salary: string;
  posted: string;
  views: number;
  featured: boolean;
  description: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const ALL_JOBS: Job[] = [
  {
    id: 1,
    title: "مدير تسويق رقمي",
    company: "شركة نمو للتقنية",
    location: "الرياض",
    type: "دوام كامل",
    category: "تسويق",
    salary: "12,000 – 16,000 ر.س",
    posted: "منذ 3 أسابيع",
    views: 248,
    featured: true,
    description: "نبحث عن مدير تسويق رقمي ذو خبرة لا تقل عن 3 سنوات لقيادة استراتيجية التسويق الرقمي وإدارة الحملات الإعلانية.",
  },
  {
    id: 2,
    title: "مطور واجهات أمامية",
    company: "ميديا بلس",
    location: "جدة",
    type: "عن بعد",
    category: "برمجة",
    salary: "14,000 – 20,000 ر.س",
    posted: "منذ أسبوعين",
    views: 312,
    featured: true,
    description: "فرصة للانضمام إلى فريق تقني متميز لتطوير واجهات مستخدم احترافية باستخدام React وNext.js.",
  },
  {
    id: 3,
    title: "مصمم جرافيك أول",
    company: "كريتف هاوس",
    location: "الرياض",
    type: "دوام كامل",
    category: "تصميم",
    salary: "8,000 – 12,000 ر.س",
    posted: "منذ 4 أيام",
    views: 189,
    featured: false,
    description: "فرصة للانضمام لوكالة إبداعية رائدة وتصميم هويات بصرية واجهات رقمية لعملاء متنوعين.",
  },
  {
    id: 4,
    title: "أخصائي مبيعات",
    company: "سنترا للخدمات",
    location: "الدمام",
    type: "دوام كامل",
    category: "مبيعات",
    salary: "6,000 + عمولة",
    posted: "منذ يومين",
    views: 97,
    featured: false,
    description: "نبحث عن موظف مبيعات نشيط لتنمية قاعدة عملاء الشركة وتحقيق أهداف الإيرادات الشهرية.",
  },
  {
    id: 5,
    title: "متخصص SEO",
    company: "رانك ماستر",
    location: "جدة",
    type: "عن بعد",
    category: "تسويق",
    salary: "8,000 – 11,000 ر.س",
    posted: "منذ 5 أيام",
    views: 143,
    featured: false,
    description: "نحتاج متخصص SEO لتحسين ظهور مواقع عملائنا في محركات البحث وتنفيذ استراتيجيات المحتوى.",
  },
  {
    id: 6,
    title: "مطور تطبيقات جوال",
    company: "تيك سبارك",
    location: "الرياض",
    type: "عقد",
    category: "برمجة",
    salary: "قابل للتفاوض",
    posted: "منذ أسبوع",
    views: 221,
    featured: false,
    description: "مشروع 6 أشهر لبناء تطبيق جوال متكامل على iOS وAndroid باستخدام Flutter.",
  },
  {
    id: 7,
    title: "ممثل خدمة عملاء",
    company: "دعم برو",
    location: "مكة المكرمة",
    type: "دوام جزئي",
    category: "خدمة عملاء",
    salary: "4,000 ر.س",
    posted: "منذ 3 أيام",
    views: 76,
    featured: false,
    description: "فرصة بدوام جزئي (4 ساعات يوميًا) للرد على استفسارات العملاء عبر الهاتف والإيميل.",
  },
  {
    id: 8,
    title: "مدير حسابات التواصل",
    company: "سوشال إيدج",
    location: "جدة",
    type: "دوام كامل",
    category: "تسويق",
    salary: "9,000 – 13,000 ر.س",
    posted: "منذ أسبوع",
    views: 168,
    featured: false,
    description: "إدارة حسابات التواصل الاجتماعي لعملاء الوكالة وإنشاء محتوى إبداعي يومي.",
  },
];

const JOB_CATEGORIES: { label: string; icon: React.ElementType }[] = [
  { label: "الكل",        icon: Briefcase      },
  { label: "تسويق",      icon: Megaphone      },
  { label: "برمجة",      icon: Code2          },
  { label: "تصميم",      icon: Palette        },
  { label: "مبيعات",     icon: ShoppingCart   },
  { label: "خدمة عملاء", icon: HeadphonesIcon },
];

const JOB_TYPES: JobType[] = ["دوام كامل", "دوام جزئي", "عقد", "عن بعد"];
const LOCATIONS = ["الكل", "الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة"];

const JOBS_PER_PAGE = 4;

// ─── Color maps ───────────────────────────────────────────────────────────────
const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "دوام كامل": { bg: "rgba(14,36,83,0.07)",   text: "#0e2453", border: "rgba(14,36,83,0.15)" },
  "دوام جزئي": { bg: "rgba(139,92,246,0.09)", text: "#7c3aed", border: "rgba(139,92,246,0.20)" },
  "عقد":       { bg: "rgba(251,191,36,0.10)", text: "#d97706", border: "rgba(251,191,36,0.22)" },
  "عن بعد":    { bg: "rgba(5,139,127,0.09)",  text: "#058B7F", border: "rgba(5,139,127,0.20)" },
};

const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "تسويق":      { bg: "rgba(15,174,158,0.10)",  text: "#0FAE9E",  border: "rgba(15,174,158,0.22)" },
  "برمجة":      { bg: "rgba(14,36,83,0.08)",    text: "#0e2453",  border: "rgba(14,36,83,0.18)" },
  "تصميم":      { bg: "rgba(234,88,12,0.08)",   text: "#ea580c",  border: "rgba(234,88,12,0.18)" },
  "مبيعات":     { bg: "rgba(251,191,36,0.10)",  text: "#d97706",  border: "rgba(251,191,36,0.22)" },
  "خدمة عملاء": { bg: "rgba(139,92,246,0.09)",  text: "#7c3aed",  border: "rgba(139,92,246,0.20)" },
};

// ─── Pill tag ─────────────────────────────────────────────────────────────────
function Tag({ label, colors }: { label: string; colors: { bg: string; text: string; border: string } }) {
  return (
    <span
      className="text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      {label}
    </span>
  );
}

// ─── Featured Job Card ────────────────────────────────────────────────────────
function FeaturedJobCard({ job, index }: { job: Job; index: number }) {
  const [hovered, setHovered] = useState(false);
  const typeColor = TYPE_COLORS[job.type] ?? TYPE_COLORS["دوام كامل"];
  const catColor  = CAT_COLORS[job.category] ?? CAT_COLORS["تسويق"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.50, ease: "easeOut", delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative cursor-pointer"
      dir="rtl"
    >
      <div
        style={{
          borderRadius: "20px",
          background: "#ffffff",
          border: hovered
            ? "1.5px solid rgba(15,174,158,0.50)"
            : "1.5px solid rgba(15,174,158,0.30)",
          boxShadow: hovered
            ? "0 16px 48px rgba(5,139,127,0.14), 0 0 0 1px rgba(15,174,158,0.22), 0 0 28px rgba(5,139,127,0.10)"
            : "0 6px 28px rgba(5,139,127,0.10), 0 0 0 0.5px rgba(15,174,158,0.15)",
          transition: "all 0.28s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          padding: "22px",
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          {/* Company avatar */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-[15px] text-white shrink-0"
            style={{
              background: hovered
                ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                : "linear-gradient(135deg, rgba(5,139,127,0.80) 0%, rgba(15,174,158,0.80) 100%)",
              transition: "background 0.28s",
            }}
          >
            {job.company.charAt(0)}
          </div>
          {/* مميز badge */}
          <span
            className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(251,191,36,0.12)",
              color: "#d97706",
              border: "1px solid rgba(251,191,36,0.28)",
            }}
          >
            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" strokeWidth={0} />
            مميز
          </span>
        </div>

        {/* Job title */}
        <h3
          className="font-extrabold leading-snug mb-1 transition-colors duration-250"
          style={{ fontSize: "16px", color: hovered ? "#058B7F" : "#0e2453" }}
        >
          {job.title}
        </h3>

        {/* Company name */}
        <p className="text-[13px] font-semibold mb-3" style={{ color: "rgba(14,36,83,0.55)" }}>
          {job.company}
        </p>

        {/* Description */}
        <p className="text-[12.5px] leading-[1.72] line-clamp-2 mb-4" style={{ color: "rgba(14,36,83,0.50)" }}>
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Tag label={job.type}     colors={typeColor} />
          <Tag label={job.category} colors={catColor}  />
        </div>

        {/* Divider */}
        <div className="pt-3" style={{ borderTop: "1px solid rgba(14,36,83,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            {/* Salary */}
            <span
              className="text-[12px] font-bold px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(5,139,127,0.09)",
                color: "#058B7F",
                border: "1px solid rgba(5,139,127,0.20)",
              }}
            >
              {job.salary}
            </span>
            {/* Meta */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1" style={{ color: "rgba(14,36,83,0.40)", fontSize: "11px" }}>
                <Clock   className="w-3 h-3" strokeWidth={1.8} />
                {job.posted}
              </span>
              <span className="flex items-center gap-1" style={{ color: "rgba(14,36,83,0.40)", fontSize: "11px" }}>
                <Eye     className="w-3 h-3" strokeWidth={1.8} />
                {job.views}
              </span>
              <span className="flex items-center gap-1" style={{ color: "rgba(14,36,83,0.40)", fontSize: "11px" }}>
                <MapPin  className="w-3 h-3" strokeWidth={1.8} />
                {job.location}
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            className="w-full h-9 rounded-full font-bold text-[13px] transition-all duration-250 flex items-center justify-center gap-1.5"
            style={{
              background: hovered
                ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                : "rgba(5,139,127,0.07)",
              color: hovered ? "#ffffff" : "#058B7F",
              border: "1px solid rgba(15,174,158,0.25)",
              boxShadow: hovered ? "0 4px 18px rgba(5,139,127,0.32)" : "none",
            }}
          >
            قدّم طلبك
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Horizontal Job Card ──────────────────────────────────────────────────────
function JobCard({ job, index }: { job: Job; index: number }) {
  const [hovered, setHovered] = useState(false);
  const typeColor = TYPE_COLORS[job.type] ?? TYPE_COLORS["دوام كامل"];
  const catColor  = CAT_COLORS[job.category] ?? CAT_COLORS["تسويق"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="cursor-pointer"
      dir="rtl"
    >
      <div
        style={{
          borderRadius: "16px",
          background: "#ffffff",
          border: hovered
            ? "1px solid rgba(5,139,127,0.28)"
            : "1px solid rgba(14,36,83,0.07)",
          boxShadow: hovered
            ? "0 12px 40px rgba(14,36,83,0.07), 0 0 0 1px rgba(15,174,158,0.18)"
            : "0 2px 12px rgba(14,36,83,0.05)",
          transition: "all 0.26s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          padding: "18px 20px",
        }}
      >
        <div className="flex items-start gap-4">
          {/* Company avatar */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-[14px] text-white shrink-0 mt-0.5"
            style={{
              background: hovered
                ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                : "linear-gradient(135deg, rgba(14,36,83,0.55) 0%, rgba(14,36,83,0.80) 100%)",
              transition: "background 0.26s",
            }}
          >
            {job.company.charAt(0)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title + salary row */}
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h3
                className="font-extrabold text-[15px] leading-snug transition-colors duration-250 truncate"
                style={{ color: hovered ? "#058B7F" : "#0e2453" }}
              >
                {job.title}
              </h3>
              <span
                className="text-[11.5px] font-bold px-2.5 py-1 rounded-full shrink-0"
                style={{
                  background: "rgba(5,139,127,0.09)",
                  color: "#058B7F",
                  border: "1px solid rgba(5,139,127,0.18)",
                }}
              >
                {job.salary}
              </span>
            </div>

            {/* Company + location */}
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[12.5px] font-semibold" style={{ color: "rgba(14,36,83,0.55)" }}>
                {job.company}
              </span>
              <span className="flex items-center gap-1" style={{ color: "rgba(14,36,83,0.38)", fontSize: "12px" }}>
                <MapPin className="w-3 h-3" strokeWidth={1.8} />
                {job.location}
              </span>
            </div>

            {/* Tags + meta */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex flex-wrap gap-1.5">
                <Tag label={job.type}     colors={typeColor} />
                <Tag label={job.category} colors={catColor}  />
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1" style={{ color: "rgba(14,36,83,0.38)", fontSize: "11px" }}>
                  <Clock className="w-3 h-3" strokeWidth={1.8} />
                  {job.posted}
                </span>
                <span className="flex items-center gap-1" style={{ color: "rgba(14,36,83,0.38)", fontSize: "11px" }}>
                  <Eye className="w-3 h-3" strokeWidth={1.8} />
                  {job.views}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Filter Dropdown ──────────────────────────────────────────────────────────
function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = value !== "الكل" && value !== "";

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-2 h-10 px-4 rounded-xl text-[13px] font-semibold transition-all duration-200"
        style={{
          background: isActive ? "rgba(5,139,127,0.07)" : "#ffffff",
          border: isActive ? "1px solid rgba(5,139,127,0.28)" : "1px solid rgba(14,36,83,0.14)",
          color: isActive ? "#058B7F" : "#0e2453",
        }}
      >
        <span>{isActive ? value : label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.2}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute top-full mt-1.5 right-0 w-full z-50 rounded-xl py-1.5 overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(14,36,83,0.09)",
                boxShadow: "0 10px 36px rgba(14,36,83,0.10)",
              }}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className="w-full text-right px-4 py-2 text-[13px] flex items-center justify-between gap-2 transition-colors duration-120"
                  style={{
                    color: opt === value ? "#058B7F" : "#0e2453",
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

// ─── Filter Sidebar ───────────────────────────────────────────────────────────
function FilterSidebar({
  search, setSearch,
  catFilter, setCatFilter,
  typeFilter, setTypeFilter,
  cityFilter, setCityFilter,
  onSearch, onReset,
  hasActive,
}: {
  search: string; setSearch: (v: string) => void;
  catFilter: string; setCatFilter: (v: string) => void;
  typeFilter: string; setTypeFilter: (v: string) => void;
  cityFilter: string; setCityFilter: (v: string) => void;
  onSearch: () => void; onReset: () => void;
  hasActive: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-5 sticky top-24"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(14,36,83,0.07)",
        boxShadow: "0 4px 20px rgba(14,36,83,0.05)",
      }}
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-extrabold text-[15px]" style={{ color: "#0e2453" }}>
          تصفية النتائج
        </h3>
        {hasActive && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-semibold transition-opacity hover:opacity-70"
            style={{ color: "#ef4444" }}
          >
            <X className="w-3 h-3" strokeWidth={2.5} />
            مسح
          </button>
        )}
      </div>

      {/* Search input */}
      <div className="mb-4">
        <label className="block text-[12px] font-bold mb-1.5" style={{ color: "rgba(14,36,83,0.55)" }}>
          البحث
        </label>
        <div
          className="flex items-center gap-2 h-10 px-3 rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(14,36,83,0.14)", background: "#ffffff" }}
        >
          <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(14,36,83,0.35)" }} strokeWidth={2} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="ابحث عن وظيفة..."
            className="flex-1 bg-transparent text-[13px] outline-none font-[inherit] min-w-0"
            style={{ color: "#0e2453" }}
            dir="rtl"
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-[12px] font-bold mb-1.5" style={{ color: "rgba(14,36,83,0.55)" }}>
          التصنيف
        </label>
        <FilterSelect
          label="اختر التصنيف"
          value={catFilter}
          options={["الكل", "تسويق", "برمجة", "تصميم", "مبيعات", "خدمة عملاء"]}
          onChange={setCatFilter}
        />
      </div>

      {/* Job type */}
      <div className="mb-4">
        <label className="block text-[12px] font-bold mb-1.5" style={{ color: "rgba(14,36,83,0.55)" }}>
          نوع الوظيفة
        </label>
        <FilterSelect
          label="اختر النوع"
          value={typeFilter}
          options={["الكل", ...JOB_TYPES]}
          onChange={setTypeFilter}
        />
      </div>

      {/* City */}
      <div className="mb-5">
        <label className="block text-[12px] font-bold mb-1.5" style={{ color: "rgba(14,36,83,0.55)" }}>
          الموقع
        </label>
        <FilterSelect
          label="اختر الموقع"
          value={cityFilter}
          options={LOCATIONS}
          onChange={setCityFilter}
        />
      </div>

      {/* Search button */}
      <button
        onClick={onSearch}
        className="w-full h-10 rounded-xl font-bold text-[13.5px] text-white flex items-center justify-center gap-2 transition-all duration-250 hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
          boxShadow: "0 4px 16px rgba(5,139,127,0.35)",
        }}
      >
        <Search className="w-3.5 h-3.5" strokeWidth={2.2} />
        بحث
      </button>
    </div>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonJobCard() {
  return (
    <div
      className="rounded-2xl p-5 animate-pulse"
      style={{ background: "#ffffff", border: "1px solid rgba(14,36,83,0.06)" }}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl shrink-0" style={{ background: "rgba(14,36,83,0.07)" }} />
        <div className="flex-1">
          <div className="flex justify-between mb-1.5">
            <div className="w-2/5 h-4 rounded" style={{ background: "rgba(14,36,83,0.07)" }} />
            <div className="w-1/4 h-5 rounded-full" style={{ background: "rgba(14,36,83,0.05)" }} />
          </div>
          <div className="w-1/3 h-3 rounded mb-2.5" style={{ background: "rgba(14,36,83,0.05)" }} />
          <div className="flex gap-2">
            <div className="w-16 h-5 rounded-full" style={{ background: "rgba(14,36,83,0.05)" }} />
            <div className="w-14 h-5 rounded-full" style={{ background: "rgba(14,36,83,0.05)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyJobs({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
      dir="rtl"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "rgba(14,36,83,0.05)", border: "1px solid rgba(14,36,83,0.08)" }}
      >
        <Briefcase className="w-6 h-6" style={{ color: "rgba(14,36,83,0.30)" }} strokeWidth={1.6} />
      </div>
      <h3 className="font-bold text-[16px] mb-2" style={{ color: "#0e2453" }}>
        لا توجد وظائف
      </h3>
      <p className="text-[13px] mb-4 max-w-xs" style={{ color: "rgba(14,36,83,0.48)" }}>
        لم نجد وظائف تطابق معايير البحث. جرّب تعديل الفلاتر.
      </p>
      <button
        onClick={onReset}
        className="h-9 px-6 rounded-full font-bold text-[13px] text-white transition-all hover:scale-[1.03]"
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
    <div className="flex items-center justify-center gap-2 mt-8" dir="rtl">
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: "rgba(14,36,83,0.04)",
          border: "1px solid rgba(14,36,83,0.12)",
          color: "#0e2453",
        }}
      >
        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.2} />
        السابق
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-9 h-9 rounded-full text-[13px] font-bold transition-all duration-200 hover:scale-[1.06]"
          style={{
            background: p === current ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)" : "rgba(14,36,83,0.04)",
            color: p === current ? "#ffffff" : "#0e2453",
            border: p === current ? "none" : "1px solid rgba(14,36,83,0.12)",
            boxShadow: p === current ? "0 4px 14px rgba(5,139,127,0.35)" : "none",
          }}
        >
          {p}
        </button>
      ))}
      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: "rgba(14,36,83,0.04)",
          border: "1px solid rgba(14,36,83,0.12)",
          color: "#0e2453",
        }}
      >
        التالي
        <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.2} />
      </button>
    </div>
  );
}

// ─── Mobile filter drawer toggle ──────────────────────────────────────────────
function MobileFilterDrawer({
  search, setSearch, catFilter, setCatFilter,
  typeFilter, setTypeFilter, cityFilter, setCityFilter,
  onSearch, onReset, hasActive,
}: {
  search: string; setSearch: (v: string) => void;
  catFilter: string; setCatFilter: (v: string) => void;
  typeFilter: string; setTypeFilter: (v: string) => void;
  cityFilter: string; setCityFilter: (v: string) => void;
  onSearch: () => void; onReset: () => void;
  hasActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden mb-4" dir="rtl">
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
        تصفية النتائج
        {hasActive && <span className="w-2 h-2 rounded-full" style={{ background: "#058B7F" }} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden mt-3"
          >
            <FilterSidebar
              search={search} setSearch={setSearch}
              catFilter={catFilter} setCatFilter={setCatFilter}
              typeFilter={typeFilter} setTypeFilter={setTypeFilter}
              cityFilter={cityFilter} setCityFilter={setCityFilter}
              onSearch={() => { onSearch(); setOpen(false); }}
              onReset={() => { onReset(); setOpen(false); }}
              hasActive={hasActive}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Background blobs ─────────────────────────────────────────────────────────
function BgBlobs() {
  return (
    <>
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,174,158,0.06) 0%, transparent 65%)", filter: "blur(50px)" }}
      />
      <div
        className="absolute bottom-0 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,36,83,0.04) 0%, transparent 60%)", filter: "blur(48px)" }}
      />
    </>
  );
}

// ─── Fade-up variant ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.50, ease: "easeOut" as const, delay: d },
  }),
};

// ─── Main export ──────────────────────────────────────────────────────────────
export default function JobsContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Filter state
  const [search,     setSearch]     = useState("");
  const [catFilter,  setCatFilter]  = useState("الكل");
  const [typeFilter, setTypeFilter] = useState("الكل");
  const [cityFilter, setCityFilter] = useState("الكل");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);

  const hasActive = catFilter !== "الكل" || typeFilter !== "الكل" || cityFilter !== "الكل" || appliedSearch !== "";

  const resetAll = () => {
    setSearch(""); setAppliedSearch("");
    setCatFilter("الكل"); setTypeFilter("الكل"); setCityFilter("الكل");
    setPage(1);
  };

  const applySearch = () => { setAppliedSearch(search); setPage(1); };

  // Derived data
  const featured = ALL_JOBS.filter((j) => j.featured);

  const filtered = useMemo(() => {
    return ALL_JOBS.filter((j) => {
      const matchCat   = catFilter  === "الكل" || j.category === catFilter;
      const matchType  = typeFilter === "الكل" || j.type === typeFilter;
      const matchCity  = cityFilter === "الكل" || j.location === cityFilter;
      const matchSearch = !appliedSearch || j.title.includes(appliedSearch) || j.company.includes(appliedSearch);
      return matchCat && matchType && matchCity && matchSearch;
    });
  }, [catFilter, typeFilter, cityFilter, appliedSearch]);

  const totalPages = Math.ceil(filtered.length / JOBS_PER_PAGE);
  const pageData   = filtered.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE);

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#F7F9F9" }}
    >
      <BgBlobs />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* ── Featured jobs ── */}
        {featured.length > 0 && (
          <div className="mb-12" dir="rtl">
            <motion.div
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0}
              className="flex items-center gap-3 mb-6"
            >
              <h2 className="font-extrabold text-[#0e2453]" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)" }}>
                الإعلانات المميزة
              </h2>
              <span
                className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(251,191,36,0.12)",
                  color: "#d97706",
                  border: "1px solid rgba(251,191,36,0.28)",
                }}
              >
                <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" strokeWidth={0} />
                {featured.length} إعلان
              </span>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {featured.map((job, i) => (
                <FeaturedJobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── Split layout: list + sidebar ── */}
        <div className="flex flex-col lg:flex-row gap-6" dir="rtl">

          {/* ── Filter Sidebar (right in RTL = first in DOM) ── */}
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <FilterSidebar
              search={search} setSearch={setSearch}
              catFilter={catFilter} setCatFilter={setCatFilter}
              typeFilter={typeFilter} setTypeFilter={setTypeFilter}
              cityFilter={cityFilter} setCityFilter={setCityFilter}
              onSearch={applySearch}
              onReset={resetAll}
              hasActive={hasActive}
            />
          </aside>

          {/* ── Main jobs list (left in RTL = second in DOM) ── */}
          <div className="flex-1 min-w-0">

            {/* Mobile filter toggle */}
            <MobileFilterDrawer
              search={search} setSearch={setSearch}
              catFilter={catFilter} setCatFilter={setCatFilter}
              typeFilter={typeFilter} setTypeFilter={setTypeFilter}
              cityFilter={cityFilter} setCityFilter={setCityFilter}
              onSearch={applySearch}
              onReset={resetAll}
              hasActive={hasActive}
            />

            {/* List header */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.1}
              className="flex items-center justify-between mb-5"
            >
              <h2 className="font-extrabold text-[#0e2453]" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)" }}>
                جميع الوظائف
              </h2>
              <span className="text-[12px]" style={{ color: "rgba(14,36,83,0.42)" }}>
                {filtered.length} وظيفة
              </span>
            </motion.div>

            {/* Category chips */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.16}
              className="flex flex-wrap gap-2 mb-6"
            >
              {JOB_CATEGORIES.map(({ label, icon: Icon }) => {
                const active = catFilter === label || (label === "الكل" && catFilter === "الكل");
                return (
                  <button
                    key={label}
                    onClick={() => { setCatFilter(label); setPage(1); }}
                    className="flex items-center gap-1.5 h-8 px-3.5 rounded-full text-[12px] font-semibold transition-all duration-200"
                    style={{
                      background: active
                        ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                        : "rgba(14,36,83,0.05)",
                      color: active ? "#ffffff" : "rgba(14,36,83,0.60)",
                      border: active ? "none" : "1px solid rgba(14,36,83,0.10)",
                      boxShadow: active ? "0 3px 12px rgba(5,139,127,0.28)" : "none",
                    }}
                  >
                    <Icon className="w-3 h-3" strokeWidth={active ? 2 : 1.8} />
                    {label}
                  </button>
                );
              })}
            </motion.div>

            {/* Job cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${catFilter}-${typeFilter}-${cityFilter}-${appliedSearch}-${page}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-3"
              >
                {pageData.length === 0 ? (
                  <EmptyJobs onReset={resetAll} />
                ) : (
                  pageData.map((job, i) => (
                    <JobCard key={job.id} job={job} index={i} />
                  ))
                )}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {pageData.length > 0 && (
              <Pagination current={page} total={totalPages} onChange={handlePageChange} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
