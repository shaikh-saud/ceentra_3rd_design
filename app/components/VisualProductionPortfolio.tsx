"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Eye,
  Download,
  CreditCard,
  MessageSquare,
  Play,
  UserPlus,
  Camera,
  Video,
  Users2,
  ChevronDown,
  X,
  Search,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type WorkType = "UGC Fast Ad" | "Influencer Campaign" | "Commercial Production";

interface PortfolioItem {
  id:          number;
  type:        WorkType;
  title:       string;
  description: string;
  creator:     string;
  views:       number;
  isFree:      boolean;
  price:       number;
  hasVideo:    boolean;
  gradient:    [string, string];
  icon:        React.ElementType;
  span?:       "wide";
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const ALL_ITEMS: PortfolioItem[] = [
  {
    id: 1, type: "UGC Fast Ad",
    title: "إعلان سريع — منتج عناية بشرة",
    description: "فيديو UGC سريع بتجربة حقيقية من العميلة يُظهر نتيجة المنتج خلال 30 ثانية.",
    creator: "نورة العتيبي", views: 22508, isFree: true, price: 0, hasVideo: true,
    gradient: ["#046E65", "#0FAE9E"], icon: Video,
  },
  {
    id: 2, type: "Influencer Campaign",
    title: "حملة مؤثرة — علامة رياضية",
    description: "سلسلة محتوى مع 4 مؤثرين في مجال الرياضة لإطلاق كولكشن جديد.",
    creator: "فيصل القحطاني", views: 45320, isFree: false, price: 350, hasVideo: false,
    gradient: ["#0e2453", "#162d6e"], icon: Users2, span: "wide",
  },
  {
    id: 3, type: "Commercial Production",
    title: "تصوير منتجات — مجوهرات فاخرة",
    description: "جلسة تصوير استوديو احترافية بإضاءة درامية لمجموعة مجوهرات موسم الشتاء.",
    creator: "خالد الشمري", views: 18760, isFree: false, price: 150, hasVideo: false,
    gradient: ["#058B7F", "#046E65"], icon: Camera,
  },
  {
    id: 4, type: "UGC Fast Ad",
    title: "ريلز سريع — تجربة مطعم",
    description: "توثيق تجربة عشاء فاخرة بأسلوب UGC عفوي يعزز الثقة ويدفع الحجوزات.",
    creator: "سارة المطيري", views: 31200, isFree: true, price: 0, hasVideo: true,
    gradient: ["#091a3e", "#058B7F"], icon: Video,
  },
  {
    id: 5, type: "Commercial Production",
    title: "فيديو إعلاني — تطبيق موبايل",
    description: "موشن جرافيك + تصوير حقيقي لإطلاق تطبيق بمستوى إنتاج سينمائي.",
    creator: "أحمد الرشيد", views: 56780, isFree: false, price: 500, hasVideo: true,
    gradient: ["#0FAE9E", "#058B7F"], icon: Camera, span: "wide",
  },
  {
    id: 6, type: "Influencer Campaign",
    title: "حملة رمضان — علامة عطور",
    description: "تعاون مع 8 مؤثرين في مجال الموضة لحملة رمضانية واسعة الانتشار.",
    creator: "نورة العتيبي", views: 89340, isFree: false, price: 800, hasVideo: false,
    gradient: ["#162d6e", "#0e2453"], icon: Users2,
  },
  {
    id: 7, type: "UGC Fast Ad",
    title: "Unboxing — منتج تقني",
    description: "فيديو تجربة فتح علبة جهاز تقني جديد بردود فعل حقيقية وتعليق عفوي.",
    creator: "محمد الدوسري", views: 14600, isFree: true, price: 0, hasVideo: true,
    gradient: ["#046E65", "#091a3e"], icon: Video,
  },
  {
    id: 8, type: "Commercial Production",
    title: "تغطية حفل إطلاق — شركة ناشئة",
    description: "توثيق شامل لحفل الإطلاق بتصوير احترافي وهايلايت سينمائي 3 دقائق.",
    creator: "خالد الشمري", views: 9870, isFree: false, price: 250, hasVideo: true,
    gradient: ["#058B7F", "#0e2453"], icon: Camera,
  },
];

const TYPE_FILTERS: { label: string; value: string }[] = [
  { label: "الكل",                  value: "الكل"                  },
  { label: "UGC Fast Ad",           value: "UGC Fast Ad"           },
  { label: "Influencer Campaign",   value: "Influencer Campaign"   },
  { label: "Commercial Production", value: "Commercial Production" },
];

const SORT_OPTS = ["الأكثر مشاهدة", "الأحدث", "الأقل سعرًا", "المجاني أولاً"];

// ─── Badge colors per type ────────────────────────────────────────────────────
const TYPE_BADGE: Record<WorkType, { bg: string; text: string; border: string }> = {
  "UGC Fast Ad":           { bg: "rgba(15,174,158,0.14)", text: "#0FAE9E",  border: "rgba(15,174,158,0.28)" },
  "Influencer Campaign":   { bg: "rgba(14,36,83,0.10)",  text: "#0e2453",  border: "rgba(14,36,83,0.22)"   },
  "Commercial Production": { bg: "rgba(5,139,127,0.12)", text: "#058B7F",  border: "rgba(5,139,127,0.25)"  },
};

// ─── Format views ─────────────────────────────────────────────────────────────
function fmtViews(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

// ─── Filter Dropdown ──────────────────────────────────────────────────────────
function FilterDrop({ label, value, options, onChange }: {
  label: string; value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const cur   = options.find((o) => o.value === value);
  const active = value !== "الكل" && value !== SORT_OPTS[0];

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
        {active ? cur?.label ?? label : label}
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
              className="absolute top-full mt-2 right-0 z-50 min-w-[190px] rounded-2xl py-1.5 overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(14,36,83,0.08)",
                boxShadow: "0 12px 40px rgba(14,36,83,0.10)",
              }}
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className="w-full text-right px-4 py-2.5 text-[13px] flex items-center justify-between gap-3 transition-colors"
                  style={{
                    color:      opt.value === value ? "#058B7F" : "#0e2453",
                    background: opt.value === value ? "rgba(5,139,127,0.07)" : "transparent",
                    fontWeight: opt.value === value ? 700 : 500,
                  }}
                >
                  {opt.label}
                  {opt.value === value && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#058B7F" }} />
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

// ─── Portfolio Card ───────────────────────────────────────────────────────────
function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon       = item.icon;
  const badgeColor = TYPE_BADGE[item.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.50, ease: "easeOut", delay: index * 0.06 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`cursor-pointer ${item.span === "wide" ? "md:col-span-2" : ""}`}
      dir="rtl"
    >
      <div
        style={{
          borderRadius: "20px",
          background: "#ffffff",
          border: hovered ? "1px solid rgba(5,139,127,0.28)" : "1px solid rgba(14,36,83,0.07)",
          boxShadow: hovered
            ? "0 20px 56px rgba(14,36,83,0.10), 0 0 0 1px rgba(15,174,158,0.20)"
            : "0 4px 20px rgba(14,36,83,0.06)",
          transition: "all 0.28s ease",
          overflow: "hidden",
        }}
      >
        {/* ── Thumbnail ── */}
        <div
          className="relative overflow-hidden"
          style={{ height: item.span === "wide" ? "200px" : "168px" }}
        >
          {/* Gradient bg */}
          <div
            className="absolute inset-0 transition-transform duration-500"
            style={{
              background: `linear-gradient(135deg, ${item.gradient[0]} 0%, ${item.gradient[1]} 100%)`,
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />

          {/* Dot texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.10,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Ring decorations */}
          <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full pointer-events-none" style={{ border: "1.5px solid rgba(255,255,255,0.10)" }} />
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full pointer-events-none" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />

          {/* Centre icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: hovered ? 1.12 : 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.16)",
                border: "1.5px solid rgba(255,255,255,0.22)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={1.7} />
            </motion.div>
          </div>

          {/* Play overlay for video */}
          {item.hasVideo && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: "rgba(0,0,0,0.20)",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.28s",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                }}
              >
                <Play className="w-5 h-5 fill-current text-[#058B7F] mr-[-2px]" strokeWidth={0} />
              </div>
            </div>
          )}

          {/* Video indicator (always visible) */}
          {item.hasVideo && !hovered && (
            <div
              className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold text-white"
              style={{ background: "rgba(0,0,0,0.40)", backdropFilter: "blur(4px)" }}
            >
              <Play className="w-2.5 h-2.5 fill-current" strokeWidth={0} />
              فيديو
            </div>
          )}

          {/* Type badge */}
          <div className="absolute top-3 right-3">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(0,0,0,0.45)",
                color: "#ffffff",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {item.type}
            </span>
          </div>

          {/* Hover action bar */}
          <motion.div
            animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.24 }}
            className="absolute bottom-0 left-0 right-0 flex items-center justify-end gap-2 px-3 pb-3 pt-6"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
            }}
          >
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.22)" }}
            >
              <MessageSquare className="w-3.5 h-3.5 text-white" strokeWidth={1.8} />
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.22)" }}
            >
              <Eye className="w-3.5 h-3.5 text-white" strokeWidth={1.8} />
            </button>
          </motion.div>
        </div>

        {/* ── Card body ── */}
        <div className="p-4">
          {/* Type badge (body) */}
          <span
            className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full"
            style={{ background: badgeColor.bg, color: badgeColor.text, border: `1px solid ${badgeColor.border}` }}
          >
            {item.type}
          </span>

          {/* Title */}
          <h3
            className="font-extrabold text-[14.5px] leading-snug mt-2 mb-1 transition-colors duration-250"
            style={{ color: hovered ? "#058B7F" : "#0e2453" }}
          >
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-[12px] leading-[1.70] line-clamp-2 mb-3" style={{ color: "rgba(14,36,83,0.50)" }}>
            {item.description}
          </p>

          {/* Creator + views */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11.5px] font-semibold" style={{ color: "rgba(14,36,83,0.55)" }}>
              {item.creator}
            </span>
            <span className="flex items-center gap-1 text-[11px]" style={{ color: "rgba(14,36,83,0.40)" }}>
              <Eye className="w-3 h-3" strokeWidth={1.8} />
              {fmtViews(item.views)} مشاهدة
            </span>
          </div>

          {/* Price + CTA */}
          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: "1px solid rgba(14,36,83,0.06)" }}
          >
            {item.isFree ? (
              <span
                className="text-[13px] font-black px-2.5 py-0.5 rounded-full"
                style={{ background: "rgba(5,139,127,0.10)", color: "#058B7F", border: "1px solid rgba(5,139,127,0.22)" }}
              >
                مجاني
              </span>
            ) : (
              <span className="text-[15px] font-black" style={{ color: hovered ? "#0FAE9E" : "#058B7F" }}>
                {item.price.toFixed(2)}{" "}
                <span className="text-[11px] font-semibold" style={{ color: "rgba(14,36,83,0.45)" }}>ر.س</span>
              </span>
            )}

            <button
              className="flex items-center gap-1.5 h-8 px-4 rounded-full font-bold text-[12px] transition-all duration-250"
              style={{
                background: hovered
                  ? item.isFree
                    ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                    : "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                  : "rgba(5,139,127,0.08)",
                color:  hovered ? "#ffffff" : "#058B7F",
                border: "1px solid rgba(15,174,158,0.25)",
                boxShadow: hovered ? "0 3px 14px rgba(5,139,127,0.30)" : "none",
              }}
            >
              {item.isFree ? (
                <>
                  <Download className="w-3 h-3" strokeWidth={2.2} />
                  تحميل مجاني
                </>
              ) : (
                <>
                  <CreditCard className="w-3 h-3" strokeWidth={2} />
                  اشترِ الآن
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard({ wide }: { wide?: boolean }) {
  return (
    <div
      className={`rounded-[20px] overflow-hidden animate-pulse ${wide ? "md:col-span-2" : ""}`}
      style={{ background: "#ffffff", border: "1px solid rgba(14,36,83,0.06)" }}
    >
      <div style={{ height: wide ? "200px" : "168px", background: "rgba(14,36,83,0.07)" }} />
      <div className="p-4">
        <div className="w-24 h-4 rounded-full mb-2" style={{ background: "rgba(14,36,83,0.06)" }} />
        <div className="w-4/5 h-5 rounded mb-1" style={{ background: "rgba(14,36,83,0.06)" }} />
        <div className="w-full h-3 rounded mb-1" style={{ background: "rgba(14,36,83,0.05)" }} />
        <div className="w-2/3 h-3 rounded mb-3" style={{ background: "rgba(14,36,83,0.05)" }} />
        <div className="flex justify-between mb-4">
          <div className="w-20 h-3 rounded" style={{ background: "rgba(14,36,83,0.05)" }} />
          <div className="w-16 h-3 rounded" style={{ background: "rgba(14,36,83,0.05)" }} />
        </div>
        <div className="flex justify-between pt-3" style={{ borderTop: "1px solid rgba(14,36,83,0.05)" }}>
          <div className="w-14 h-5 rounded" style={{ background: "rgba(14,36,83,0.06)" }} />
          <div className="w-24 h-8 rounded-full" style={{ background: "rgba(14,36,83,0.06)" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Background blobs ─────────────────────────────────────────────────────────
function BgBlobs() {
  return (
    <>
      <div className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,174,158,0.06) 0%, transparent 65%)", filter: "blur(52px)" }} />
      <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,36,83,0.04) 0%, transparent 60%)", filter: "blur(44px)" }} />
    </>
  );
}

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.52, ease: "easeOut" as const, delay: d },
  }),
};

// ─── Main export ──────────────────────────────────────────────────────────────
export default function VisualProductionPortfolio() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [typeFilter, setTypeFilter] = useState("الكل");
  const [sort,       setSort]       = useState("الأكثر مشاهدة");
  const [search,     setSearch]     = useState("");

  const hasActive = typeFilter !== "الكل" || search !== "";

  const filtered = useMemo(() => {
    let list = ALL_ITEMS.filter((item) => {
      const matchType   = typeFilter === "الكل" || item.type === typeFilter;
      const matchSearch = !search || item.title.includes(search) || item.creator.includes(search);
      return matchType && matchSearch;
    });
    if (sort === "الأكثر مشاهدة")    list = [...list].sort((a, b) => b.views - a.views);
    if (sort === "الأقل سعرًا")      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "المجاني أولاً")    list = [...list].sort((a) => a.isFree ? -1 : 1);
    return list;
  }, [typeFilter, sort, search]);

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden"
      style={{ background: "#ffffff" }}
      dir="rtl"
    >
      <BgBlobs />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}
              className="mb-3"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold"
                style={{ background: "rgba(5,139,127,0.08)", border: "1px solid rgba(5,139,127,0.20)", color: "#058B7F" }}
              >
                <Camera className="w-3.5 h-3.5" strokeWidth={2} />
                أعمال المبدعين
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.08}
              className="font-extrabold leading-tight"
              style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.2rem)", color: "#0e2453" }}
            >
              أعمال المؤثرين والإنتاج المرئي
            </motion.h2>

            <motion.p
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.14}
              className="mt-1.5 text-[13.5px]"
              style={{ color: "rgba(14,36,83,0.50)" }}
            >
              معرض ديناميكي من قاعدة البيانات
            </motion.p>
          </div>

          {/* Join CTA */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.20}
          >
            <button
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full font-bold text-[13px] text-white transition-all duration-300 hover:scale-[1.03] whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
                boxShadow: "0 4px 18px rgba(5,139,127,0.38)",
              }}
            >
              <UserPlus className="w-3.5 h-3.5" strokeWidth={2} />
              انضم كمؤثر
            </button>
          </motion.div>
        </div>

        {/* ── Filter / Sort bar ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.22}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 h-10 px-4 rounded-full overflow-hidden"
            style={{ background: "#F7F9F9", border: "1px solid rgba(14,36,83,0.12)", minWidth: "180px" }}
          >
            <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(14,36,83,0.38)" }} strokeWidth={2} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن عمل..."
              className="flex-1 bg-transparent text-[13px] outline-none font-[inherit] min-w-0"
              style={{ color: "#0e2453" }}
              dir="rtl"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X className="w-3 h-3" style={{ color: "rgba(14,36,83,0.38)" }} strokeWidth={2.5} />
              </button>
            )}
          </div>

          <FilterDrop
            label="نوع المحتوى"
            value={typeFilter}
            options={TYPE_FILTERS}
            onChange={(v) => setTypeFilter(v)}
          />
          <FilterDrop
            label="الترتيب"
            value={sort}
            options={SORT_OPTS.map((o) => ({ label: o, value: o }))}
            onChange={(v) => setSort(v)}
          />

          {hasActive && (
            <button
              onClick={() => { setTypeFilter("الكل"); setSearch(""); }}
              className="flex items-center gap-1.5 h-10 px-4 rounded-full text-[12.5px] font-semibold"
              style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", color: "#ef4444" }}
            >
              <X className="w-3 h-3" strokeWidth={2.5} />
              مسح
            </button>
          )}

          <span className="mr-auto text-[12px]" style={{ color: "rgba(14,36,83,0.42)" }}>
            {filtered.length} عمل
          </span>
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${typeFilter}-${sort}-${search}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center py-20 text-center"
              >
                <Camera className="w-10 h-10 mb-3" style={{ color: "rgba(14,36,83,0.22)" }} strokeWidth={1.5} />
                <p className="font-semibold text-[15px] mb-1" style={{ color: "#0e2453" }}>لا توجد أعمال</p>
                <p className="text-[13px]" style={{ color: "rgba(14,36,83,0.45)" }}>جرّب تعديل الفلتر أو مصطلح البحث</p>
              </motion.div>
            ) : (
              filtered.map((item, i) => (
                <PortfolioCard key={item.id} item={item} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom load more ── */}
        {filtered.length > 0 && (
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.6}
            className="mt-12 text-center"
          >
            <button
              className="inline-flex items-center gap-2 h-11 px-8 rounded-full font-semibold text-[13.5px] transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "rgba(14,36,83,0.04)",
                border: "1px solid rgba(14,36,83,0.14)",
                color: "#0e2453",
              }}
            >
              تحميل المزيد من الأعمال
              <ChevronDown className="w-4 h-4" strokeWidth={2.2} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
