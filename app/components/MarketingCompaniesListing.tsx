"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  SlidersHorizontal,
  X,
  Star,
  MapPin,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Search,
} from "lucide-react";

// ─── Mock data ──────────────────────────────────────────────────────────────────
const ALL_COMPANIES = [
  {
    id: 1,
    code: "#A01",
    name: "ميديا بلس للتسويق",
    specialization: "سوشال ميديا",
    city: "الرياض",
    rating: 4.9,
    projects: 87,
    verified: true,
    description: "متخصصون في إدارة حسابات التواصل الاجتماعي وبناء الهوية الرقمية للعلامات التجارية.",
  },
  {
    id: 2,
    code: "#A02",
    name: "نيو فيجن للإعلان",
    specialization: "إعلانات رقمية",
    city: "جدة",
    rating: 4.8,
    projects: 112,
    verified: true,
    description: "خبراء في حملات جوجل وميتا الإعلانية مع تحقيق أعلى عائد على الإنفاق الإعلاني.",
  },
  {
    id: 3,
    code: "#A03",
    name: "كريتف هاوس",
    specialization: "تصميم هوية",
    city: "الرياض",
    rating: 4.7,
    projects: 65,
    verified: true,
    description: "تصميم هويات بصرية احترافية وشعارات فريدة تعكس روح علامتك التجارية.",
  },
  {
    id: 4,
    code: "#A04",
    name: "ديجيتال رايز",
    specialization: "SEO",
    city: "الدمام",
    rating: 4.6,
    projects: 43,
    verified: true,
    description: "تحسين ظهور مواقعك في محركات البحث وزيادة الزيارات العضوية بشكل مستدام.",
  },
  {
    id: 5,
    code: "#A05",
    name: "فيجوال ستوديو",
    specialization: "إنتاج مرئي",
    city: "جدة",
    rating: 4.9,
    projects: 58,
    verified: true,
    description: "إنتاج فيديوهات احترافية وتصوير منتجات عالي الجودة لمنصات التواصل والإعلانات.",
  },
  {
    id: 6,
    code: "#A06",
    name: "كونتنت كينج",
    specialization: "إدارة محتوى",
    city: "مكة المكرمة",
    rating: 4.5,
    projects: 39,
    verified: true,
    description: "كتابة محتوى تسويقي مقنع وإستراتيجي يحوّل الزوار إلى عملاء فعليين.",
  },
  {
    id: 7,
    code: "#A07",
    name: "بيكسل برو",
    specialization: "تصميم هوية",
    city: "الرياض",
    rating: 4.8,
    projects: 74,
    verified: true,
    description: "حلول تصميم متكاملة من الهوية البصرية إلى تصميم واجهات المستخدم الرقمية.",
  },
  {
    id: 8,
    code: "#A08",
    name: "ترافيك بوست",
    specialization: "إعلانات رقمية",
    city: "الدمام",
    rating: 4.7,
    projects: 91,
    verified: true,
    description: "استراتيجيات إعلانية متطورة لرفع معدلات التحويل وتوليد عملاء محتملين عاليي الجودة.",
  },
  {
    id: 9,
    code: "#A09",
    name: "سوشال إيدج",
    specialization: "سوشال ميديا",
    city: "جدة",
    rating: 4.6,
    projects: 55,
    verified: true,
    description: "إدارة كاملة لحضورك الرقمي على جميع منصات التواصل مع تقارير أداء أسبوعية.",
  },
  {
    id: 10,
    code: "#A10",
    name: "رانك ماستر",
    specialization: "SEO",
    city: "الرياض",
    rating: 4.9,
    projects: 33,
    verified: true,
    description: "بناء استراتيجيات SEO مخصصة وتقنيات متقدمة للوصول إلى الصفحة الأولى من جوجل.",
  },
  {
    id: 11,
    code: "#A11",
    name: "موشن كرافت",
    specialization: "إنتاج مرئي",
    city: "الرياض",
    rating: 4.8,
    projects: 47,
    verified: true,
    description: "موشن جرافيك ورسوم متحركة احترافية تُحيي علامتك التجارية وتجذب انتباه جمهورك.",
  },
  {
    id: 12,
    code: "#A12",
    name: "ووردز فاكتوري",
    specialization: "إدارة محتوى",
    city: "المدينة المنورة",
    rating: 4.5,
    projects: 28,
    verified: true,
    description: "فريق من كُتّاب المحتوى المتخصصين في صناعة محتوى عربي أصيل يحقق نتائج قابلة للقياس.",
  },
];

const SPECIALIZATIONS = ["الكل", "إعلانات رقمية", "سوشال ميديا", "تصميم هوية", "SEO", "إنتاج مرئي", "إدارة محتوى"];
const CITIES = ["الكل", "الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة"];
const RATINGS = ["الكل", "5 نجوم", "4 نجوم فأعلى", "3 نجوم فأعلى"];
const SORT_OPTIONS = ["الأحدث", "الأعلى تقييمًا", "الأكثر مشاريع", "الأبجدية"];

const CARDS_PER_PAGE = 9;

// ─── Specialization color map ───────────────────────────────────────────────────
const SPEC_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "سوشال ميديا":   { bg: "rgba(15,174,158,0.12)",  text: "#0FAE9E", border: "rgba(15,174,158,0.22)" },
  "إعلانات رقمية": { bg: "rgba(5,139,127,0.12)",   text: "#058B7F", border: "rgba(5,139,127,0.22)" },
  "تصميم هوية":    { bg: "rgba(14,36,83,0.08)",    text: "#0e2453", border: "rgba(14,36,83,0.18)" },
  "SEO":           { bg: "rgba(251,191,36,0.12)",  text: "#d97706", border: "rgba(251,191,36,0.25)" },
  "إنتاج مرئي":   { bg: "rgba(139,92,246,0.10)",  text: "#7c3aed", border: "rgba(139,92,246,0.22)" },
  "إدارة محتوى":  { bg: "rgba(234,88,12,0.10)",   text: "#ea580c", border: "rgba(234,88,12,0.22)" },
};

// ─── Filter Dropdown ────────────────────────────────────────────────────────────
function FilterDropdown({
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
  const isActive = value !== "الكل" && value !== "الأحدث";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 h-10 px-4 rounded-full text-[13px] font-semibold transition-all duration-200 whitespace-nowrap"
        style={{
          background: isActive ? "rgba(5,139,127,0.09)" : "rgba(14,36,83,0.04)",
          border: isActive ? "1px solid rgba(5,139,127,0.30)" : "1px solid rgba(14,36,83,0.12)",
          color: isActive ? "#058B7F" : "#0e2453",
        }}
      >
        <span>{isActive ? value : label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.2}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.17, ease: "easeOut" }}
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
                  className="w-full text-right px-4 py-2.5 text-[13px] transition-colors duration-150 flex items-center justify-between gap-3"
                  style={{
                    color: opt === value ? "#058B7F" : "#0e2453",
                    background: opt === value ? "rgba(5,139,127,0.07)" : "transparent",
                    fontWeight: opt === value ? 700 : 500,
                  }}
                >
                  <span>{opt}</span>
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

// ─── Company Card ───────────────────────────────────────────────────────────────
function CompanyCard({ company, index }: { company: typeof ALL_COMPANIES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const specColor = SPEC_COLORS[company.specialization] ?? SPEC_COLORS["سوشال ميديا"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.50, ease: "easeOut", delay: index * 0.06 }}
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
            ? "1px solid rgba(5,139,127,0.28)"
            : "1px solid rgba(14,36,83,0.07)",
          boxShadow: hovered
            ? "0 20px 56px rgba(14,36,83,0.08), 0 0 0 1px rgba(15,174,158,0.25), 0 0 32px rgba(5,139,127,0.12)"
            : "0 4px 20px rgba(14,36,83,0.05)",
          transition: "border 0.30s, box-shadow 0.30s, transform 0.30s",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          padding: "22px 22px 18px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          {/* Company initial avatar */}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-[16px] text-white shrink-0"
              style={{
                background: hovered
                  ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                  : "linear-gradient(135deg, rgba(5,139,127,0.75) 0%, rgba(15,174,158,0.75) 100%)",
                transition: "background 0.30s",
              }}
            >
              {company.name.charAt(0)}
            </div>
            <span className="text-[11px] font-bold" style={{ color: "rgba(14,36,83,0.35)" }}>
              {company.code}
            </span>
          </div>

          {/* Verified badge */}
          {company.verified && (
            <span
              className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0"
              style={{
                background: "rgba(251,191,36,0.12)",
                color: "#d97706",
                border: "1px solid rgba(251,191,36,0.28)",
              }}
            >
              <BadgeCheck className="w-3 h-3" strokeWidth={2.2} />
              موثقة
            </span>
          )}
        </div>

        {/* Company name */}
        <h3
          className="font-extrabold leading-snug mb-1.5 transition-colors duration-300"
          style={{
            fontSize: "16px",
            color: hovered ? "#058B7F" : "#0e2453",
          }}
        >
          {company.name}
        </h3>

        {/* Description */}
        <p
          className="text-[12.5px] leading-[1.72] line-clamp-2 mb-4"
          style={{ color: "rgba(14,36,83,0.52)" }}
        >
          {company.description}
        </p>

        {/* Specialization tag */}
        <div className="mb-4">
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{
              background: specColor.bg,
              color: specColor.text,
              border: `1px solid ${specColor.border}`,
            }}
          >
            {company.specialization}
          </span>
        </div>

        {/* Divider */}
        <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(14,36,83,0.06)" }}>
          <div className="flex items-center justify-between">
            {/* Rating + projects */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" strokeWidth={0} />
                <span className="text-[12px] font-bold" style={{ color: "#0e2453" }}>
                  {company.rating}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" style={{ color: "rgba(14,36,83,0.35)" }} strokeWidth={1.8} />
                <span className="text-[12px]" style={{ color: "rgba(14,36,83,0.50)" }}>
                  {company.projects} مشروع
                </span>
              </span>
            </div>

            {/* City */}
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" style={{ color: "rgba(14,36,83,0.35)" }} strokeWidth={1.8} />
              <span className="text-[12px]" style={{ color: "rgba(14,36,83,0.50)" }}>
                {company.city}
              </span>
            </span>
          </div>

          {/* CTA */}
          <button
            className="mt-3 w-full h-9 rounded-full font-bold text-[12.5px] transition-all duration-300 flex items-center justify-center gap-1.5"
            style={{
              background: hovered
                ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                : "rgba(5,139,127,0.07)",
              color: hovered ? "#ffffff" : "#058B7F",
              border: "1px solid rgba(15,174,158,0.25)",
              boxShadow: hovered ? "0 4px 18px rgba(5,139,127,0.35)" : "none",
            }}
          >
            عرض الملف التعريفي
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Skeleton Card ───────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="rounded-[20px] p-6 animate-pulse"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(14,36,83,0.07)",
        boxShadow: "0 4px 20px rgba(14,36,83,0.04)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl" style={{ background: "rgba(14,36,83,0.07)" }} />
          <div className="w-10 h-3 rounded-full" style={{ background: "rgba(14,36,83,0.07)" }} />
        </div>
        <div className="w-14 h-5 rounded-full" style={{ background: "rgba(14,36,83,0.07)" }} />
      </div>
      <div className="w-3/4 h-5 rounded mb-2" style={{ background: "rgba(14,36,83,0.07)" }} />
      <div className="w-full h-3 rounded mb-1.5" style={{ background: "rgba(14,36,83,0.05)" }} />
      <div className="w-5/6 h-3 rounded mb-4" style={{ background: "rgba(14,36,83,0.05)" }} />
      <div className="w-20 h-5 rounded-full mb-4" style={{ background: "rgba(14,36,83,0.06)" }} />
      <div className="pt-3 mt-auto" style={{ borderTop: "1px solid rgba(14,36,83,0.06)" }}>
        <div className="flex justify-between mb-3">
          <div className="w-20 h-4 rounded" style={{ background: "rgba(14,36,83,0.06)" }} />
          <div className="w-16 h-4 rounded" style={{ background: "rgba(14,36,83,0.06)" }} />
        </div>
        <div className="w-full h-9 rounded-full" style={{ background: "rgba(14,36,83,0.06)" }} />
      </div>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
      dir="rtl"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "rgba(14,36,83,0.05)", border: "1px solid rgba(14,36,83,0.08)" }}
      >
        <Search className="w-7 h-7" style={{ color: "rgba(14,36,83,0.30)" }} strokeWidth={1.6} />
      </div>
      <h3 className="font-bold text-[17px] mb-2" style={{ color: "#0e2453" }}>
        لا توجد نتائج
      </h3>
      <p className="text-[13px] mb-5 max-w-xs" style={{ color: "rgba(14,36,83,0.50)" }}>
        لم نجد شركات تطابق معايير البحث الحالية. جرّب تعديل الفلاتر.
      </p>
      <button
        onClick={onReset}
        className="h-10 px-6 rounded-full text-[13px] font-bold transition-all duration-200 hover:scale-[1.03]"
        style={{
          background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
          color: "#ffffff",
          boxShadow: "0 4px 16px rgba(5,139,127,0.35)",
        }}
      >
        مسح الفلاتر
      </button>
    </motion.div>
  );
}

// ─── Pagination ──────────────────────────────────────────────────────────────────
function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-12" dir="rtl">
      {/* Previous */}
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: "rgba(14,36,83,0.04)",
          border: "1px solid rgba(14,36,83,0.12)",
          color: "#0e2453",
        }}
      >
        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.2} />
        السابق
      </button>

      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-10 h-10 rounded-full text-[13px] font-bold transition-all duration-200 hover:scale-[1.06]"
          style={{
            background:
              p === current
                ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                : "rgba(14,36,83,0.04)",
            color: p === current ? "#ffffff" : "#0e2453",
            border: p === current ? "none" : "1px solid rgba(14,36,83,0.12)",
            boxShadow: p === current ? "0 4px 14px rgba(5,139,127,0.35)" : "none",
          }}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
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

// ─── Background Blobs ────────────────────────────────────────────────────────────
function BackgroundBlobs() {
  return (
    <>
      <div
        className="absolute -top-28 -right-28 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(15,174,158,0.07) 0%, transparent 65%)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute bottom-0 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(5,139,127,0.07) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />
    </>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────────
interface Props {
  searchQuery: string;
}

export default function MarketingCompaniesListing({ searchQuery }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [specialization, setSpecialization] = useState("الكل");
  const [city, setCity] = useState("الكل");
  const [rating, setRating] = useState("الكل");
  const [sort, setSort] = useState("الأحدث");
  const [page, setPage] = useState(1);
  const [loading] = useState(false);

  const hasActiveFilters =
    specialization !== "الكل" || city !== "الكل" || rating !== "الكل";

  const resetFilters = () => {
    setSpecialization("الكل");
    setCity("الكل");
    setRating("الكل");
    setSort("الأحدث");
    setPage(1);
  };

  // Filter + sort
  const filtered = useMemo(() => {
    let list = ALL_COMPANIES.filter((c) => {
      const matchSpec = specialization === "الكل" || c.specialization === specialization;
      const matchCity = city === "الكل" || c.city === city;
      const matchRating =
        rating === "الكل" ||
        (rating === "5 نجوم" && c.rating >= 4.95) ||
        (rating === "4 نجوم فأعلى" && c.rating >= 4.0) ||
        (rating === "3 نجوم فأعلى" && c.rating >= 3.0);
      const matchSearch =
        !searchQuery ||
        c.name.includes(searchQuery) ||
        c.specialization.includes(searchQuery) ||
        c.city.includes(searchQuery);
      return matchSpec && matchCity && matchRating && matchSearch;
    });

    if (sort === "الأعلى تقييمًا") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === "الأكثر مشاريع") list = [...list].sort((a, b) => b.projects - a.projects);
    else if (sort === "الأبجدية") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "ar"));

    return list;
  }, [specialization, city, rating, sort, searchQuery]);

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const pageData = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleFilterChange = (key: string, val: string) => {
    if (key === "specialization") setSpecialization(val);
    if (key === "city") setCity(val);
    if (key === "rating") setRating(val);
    if (key === "sort") setSort(val);
    setPage(1);
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#F7F9F9" }}
    >
      <BackgroundBlobs />

      {/* ── Sticky Filters Bar ── */}
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

          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-3 flex-wrap">
            <span className="text-[13px] font-bold shrink-0" style={{ color: "#0e2453" }}>
              تصفية:
            </span>

            <FilterDropdown
              label="التخصص"
              value={specialization}
              options={SPECIALIZATIONS}
              onChange={(v) => handleFilterChange("specialization", v)}
            />
            <FilterDropdown
              label="المدينة"
              value={city}
              options={CITIES}
              onChange={(v) => handleFilterChange("city", v)}
            />
            <FilterDropdown
              label="التقييم"
              value={rating}
              options={RATINGS}
              onChange={(v) => handleFilterChange("rating", v)}
            />

            <div className="h-5 w-px mx-1" style={{ background: "rgba(14,36,83,0.12)" }} />

            <FilterDropdown
              label="الترتيب"
              value={sort}
              options={SORT_OPTIONS}
              onChange={(v) => handleFilterChange("sort", v)}
            />

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 h-10 px-4 rounded-full text-[12.5px] font-semibold transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "rgba(239,68,68,0.07)",
                  border: "1px solid rgba(239,68,68,0.20)",
                  color: "#ef4444",
                }}
              >
                <X className="w-3 h-3" strokeWidth={2.5} />
                مسح الفلاتر
              </button>
            )}

            <span className="mr-auto text-[12px]" style={{ color: "rgba(14,36,83,0.42)" }}>
              {filtered.length} شركة
            </span>
          </div>

          {/* Mobile */}
          <MobileFilters
            specialization={specialization}
            city={city}
            rating={rating}
            sort={sort}
            total={filtered.length}
            hasActive={hasActiveFilters}
            onChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.52, ease: "easeOut" }}
          className="mb-8"
          dir="rtl"
        >
          <h2 className="font-extrabold leading-tight" style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", color: "#0e2453" }}>
            الشركات الموثقة
          </h2>
          <p className="mt-1.5 text-[13.5px]" style={{ color: "rgba(14,36,83,0.52)" }}>
            جميع الشركات المدرجة خضعت لعملية توثيق وتحقق من هوية الشركة
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : pageData.length === 0 ? (
          <div className="grid grid-cols-1">
            <EmptyState onReset={resetFilters} />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${specialization}-${city}-${rating}-${sort}-${page}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {pageData.map((company, i) => (
                <CompanyCard key={company.id} company={company} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {!loading && pageData.length > 0 && (
          <Pagination current={page} total={totalPages} onChange={handlePageChange} />
        )}
      </div>
    </section>
  );
}

// ─── Mobile filters drawer ───────────────────────────────────────────────────────
function MobileFilters({
  specialization,
  city,
  rating,
  sort,
  total,
  hasActive,
  onChange,
  onReset,
}: {
  specialization: string;
  city: string;
  rating: string;
  sort: string;
  total: number;
  hasActive: boolean;
  onChange: (key: string, val: string) => void;
  onReset: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden" dir="rtl">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex items-center gap-2 h-9 px-4 rounded-full text-[13px] font-semibold transition-all duration-200"
          style={{
            background: open ? "rgba(5,139,127,0.09)" : "rgba(14,36,83,0.04)",
            border: open ? "1px solid rgba(5,139,127,0.25)" : "1px solid rgba(14,36,83,0.12)",
            color: open ? "#058B7F" : "#0e2453",
          }}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={2} />
          الفلاتر
          {hasActive && (
            <span className="w-2 h-2 rounded-full" style={{ background: "#058B7F" }} />
          )}
        </button>
        <span className="text-[12px]" style={{ color: "rgba(14,36,83,0.42)" }}>
          {total} شركة
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2.5 pt-3 pb-1">
              <FilterDropdown label="التخصص" value={specialization} options={SPECIALIZATIONS} onChange={(v) => onChange("specialization", v)} />
              <FilterDropdown label="المدينة" value={city} options={CITIES} onChange={(v) => onChange("city", v)} />
              <FilterDropdown label="التقييم" value={rating} options={RATINGS} onChange={(v) => onChange("rating", v)} />
              <FilterDropdown label="الترتيب" value={sort} options={SORT_OPTIONS} onChange={(v) => onChange("sort", v)} />
              {hasActive && (
                <button
                  onClick={onReset}
                  className="flex items-center gap-1.5 h-9 px-4 rounded-full text-[12px] font-semibold w-fit"
                  style={{
                    background: "rgba(239,68,68,0.07)",
                    border: "1px solid rgba(239,68,68,0.20)",
                    color: "#ef4444",
                  }}
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
