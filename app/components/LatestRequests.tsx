"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Clock,
  ArrowLeft,
  ChevronLeft,
  Megaphone,
  Briefcase,
  Lightbulb,
  Palette,
  LayoutGrid,
  TrendingUp,
} from "lucide-react";

const NAVY  = "#0e2453";
const TEAL  = "#058B7F";
const TEAL_L = "#0FAE9E";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: "الكل",     icon: LayoutGrid },
  { label: "تسويق",   icon: Megaphone  },
  { label: "استشارات",icon: Lightbulb  },
  { label: "وظائف",   icon: Briefcase  },
  { label: "تصميم",   icon: Palette    },
];

interface Request {
  id: string;
  title: string;
  description: string;
  user: string;
  avatar: string;
  time: string;
  category: string;
  budget?: string;
  urgency?: "عاجل" | "عادي";
}

const ALL_REQUESTS: Request[] = [
  {
    id: "r1",
    title: "تحليل القوائم المالية",
    description: "أبحث عن مستشار مالي لتحليل القوائم المالية وتقديم توصيات لتحسين الأداء المالي للشركة.",
    user: "محمد أحمد",
    avatar: "https://i.pravatar.cc/40?img=11",
    time: "منذ شهر",
    category: "استشارات",
    budget: "2,000 ر.س",
  },
  {
    id: "r2",
    title: "إنشاء حملة تسويقية لمتجر إلكتروني",
    description: "أحتاج فريق تسويق لإطلاق حملة شاملة على منصات التواصل الاجتماعي لمتجري الجديد.",
    user: "سارة العتيبي",
    avatar: "https://i.pravatar.cc/40?img=5",
    time: "منذ 3 أسابيع",
    category: "تسويق",
    budget: "5,000 ر.س",
    urgency: "عاجل",
  },
  {
    id: "r3",
    title: "مدير تسويق رقمي بدوام كامل",
    description: "نبحث عن مدير تسويق رقمي ذو خبرة لا تقل عن 3 سنوات للانضمام لفريقنا في الرياض.",
    user: "شركة نمو",
    avatar: "https://i.pravatar.cc/40?img=22",
    time: "منذ أسبوعين",
    category: "وظائف",
    budget: "12,000 ر.س / شهر",
  },
  {
    id: "r4",
    title: "تصميم بروفايل احترافي للشركة",
    description: "أبحث عن مصمم لتصميم بروفايل شركة احترافي يعكس هويتنا التجارية بشكل مميز.",
    user: "خالد الدوسري",
    avatar: "https://i.pravatar.cc/40?img=33",
    time: "منذ شهر",
    category: "تصميم",
    budget: "1,500 ر.س",
  },
  {
    id: "r5",
    title: "استشارة في استراتيجية المحتوى",
    description: "أحتاج خبير محتوى لوضع استراتيجية محتوى شاملة لمنصاتنا الرقمية خلال الربع القادم.",
    user: "نورة القحطاني",
    avatar: "https://i.pravatar.cc/40?img=47",
    time: "منذ 5 أسابيع",
    category: "استشارات",
    budget: "3,500 ر.س",
    urgency: "عاجل",
  },
  {
    id: "r6",
    title: "إدارة إعلانات سناب شات",
    description: "أبحث عن متخصص في إعلانات سناب شات لإدارة حملات إعلانية بميزانية شهرية محددة.",
    user: "فهد المالكي",
    avatar: "https://i.pravatar.cc/40?img=60",
    time: "منذ شهرين",
    category: "تسويق",
    budget: "4,000 ر.س",
  },
  {
    id: "r7",
    title: "مصمم جرافيك للعمل عن بُعد",
    description: "نبحث عن مصمم جرافيك موهوب للعمل عن بُعد على مشاريع متنوعة بشكل مستمر.",
    user: "وكالة إبداع",
    avatar: "https://i.pravatar.cc/40?img=15",
    time: "منذ 6 أسابيع",
    category: "وظائف",
    budget: "8,000 ر.س / شهر",
  },
  {
    id: "r8",
    title: "تصميم عرض تقديمي للمستثمرين",
    description: "أحتاج تصميم عرض تقديمي احترافي باللغتين العربية والإنجليزية لجولة استثمارية.",
    user: "عبدالله الشمري",
    avatar: "https://i.pravatar.cc/40?img=70",
    time: "منذ شهر",
    category: "تصميم",
    budget: "2,800 ر.س",
    urgency: "عاجل",
  },
];

// ─── Category colour map — navy for استشارات, teal for تسويق ──────────────────
const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  تسويق:    { bg: `rgba(14,36,83,0.09)`,  text: TEAL,            border: `rgba(14,36,83,0.20)`  },
  استشارات: { bg: `rgba(14,36,83,0.07)`,   text: NAVY,            border: `rgba(14,36,83,0.16)`   },
  وظائف:    { bg: "rgba(245,158,11,0.09)", text: "#D97706",       border: "rgba(245,158,11,0.18)" },
  تصميم:    { bg: "rgba(236,72,153,0.09)", text: "#DB2777",       border: "rgba(236,72,153,0.18)" },
};

// ─── Animation ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: d },
  }),
};

// ─── Request Card ──────────────────────────────────────────────────────────────
function RequestCard({ request, index }: { request: Request; index: number }) {
  const [hovered, setHovered] = useState(false);
  const c = CAT_COLORS[request.category] ?? CAT_COLORS["تسويق"];
  // Alternate card accent: even = navy, odd = teal
  const cardAccent = index % 2 === 0 ? NAVY : TEAL;
  const cardAccentLight = index % 2 === 0 ? "rgba(14,36,83,0.28)" : "rgba(14,36,83,0.28)";
  const cardGlow = index % 2 === 0
    ? "0 12px 40px rgba(14,36,83,0.10), 0 2px 8px rgba(0,0,0,0.04)"
    : "0 12px 40px rgba(14,36,83,0.12), 0 2px 8px rgba(0,0,0,0.04)";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.38, ease: "easeOut", delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col gap-4 bg-white rounded-3xl px-6 py-5 cursor-pointer overflow-hidden"
      style={{
        border: hovered ? `1.5px solid ${cardAccentLight}` : "1.5px solid rgba(0,0,0,0.055)",
        boxShadow: hovered ? cardGlow : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease",
      }}
    >
      {/* Top accent stripe on hover — navy or teal per card */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl transition-opacity duration-500"
        style={{
          background: index % 2 === 0
            ? `linear-gradient(90deg, transparent, ${NAVY}, ${TEAL}, transparent)`
            : `linear-gradient(90deg, transparent, ${TEAL}, ${NAVY}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ── Top row: category + urgency ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="text-[11.5px] font-bold px-3 py-1 rounded-full"
            style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
          >
            {request.category}
          </span>
          {request.urgency && (
            <span
              className="text-[10.5px] font-bold px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(239,68,68,0.09)",
                color: "#DC2626",
                border: "1px solid rgba(239,68,68,0.18)",
              }}
            >
              {request.urgency}
            </span>
          )}
        </div>
        <span className="flex items-center gap-1 text-[11px]" style={{ color: "rgba(14,36,83,0.40)" }}>
          <Clock className="w-3 h-3 shrink-0" />
          {request.time}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 text-right">
        <h3
          className="text-[15.5px] font-extrabold mb-1.5 leading-snug transition-colors duration-200"
          style={{ color: hovered ? NAVY : TEAL }}
        >
          {request.title}
        </h3>
        <p className="text-[13px] leading-[1.75] line-clamp-2" style={{ color: "rgba(14,36,83,0.52)" }}>
          {request.description}
        </p>
      </div>

      {/* ── Footer ── */}
      <div
        className="flex items-center justify-between mt-auto pt-4"
        style={{ borderTop: "1px dashed rgba(14,36,83,0.08)" }}
      >
        {/* User */}
        <div className="flex items-center gap-2">
          <img
            src={request.avatar}
            alt={request.user}
            className="w-7 h-7 rounded-full object-cover shrink-0"
            style={{ border: `1.5px solid ${cardAccent}30` }}
          />
          <span className="text-[12px] font-semibold" style={{ color: "rgba(14,36,83,0.55)" }}>{request.user}</span>
        </div>

        {/* Budget + CTA */}
        <div className="flex items-center gap-2">
          {request.budget && (
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-full"
              style={{
                background: index % 2 === 0 ? "rgba(14,36,83,0.07)" : "rgba(14,36,83,0.07)",
                color: cardAccent,
                border: `1px solid ${cardAccent}25`,
              }}
            >
              {request.budget}
            </span>
          )}
          <span
            className="inline-flex items-center gap-1 text-[12px] font-bold px-3 py-1.5 rounded-full transition-all duration-200"
            style={{
              background: hovered ? cardAccent : `${cardAccent}12`,
              color: hovered ? "#fff" : cardAccent,
            }}
          >
            عرض
            <ChevronLeft className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function LatestRequests() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filtered =
    activeCategory === "الكل"
      ? ALL_REQUESTS
      : ALL_REQUESTS.filter((r) => r.category === activeCategory);

  return (
    <section
      ref={ref}
      id="latest-requests"
      className="relative py-20 sm:py-24 md:py-28 overflow-hidden"
      style={{ background: "#F7F9F9" }}
    >
      {/* Navy blob — top right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(14,36,83,0.06) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      {/* Teal blob — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(14,36,83,0.07) 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">

          <div className="text-right">
            {/* Badge — navy tinted */}
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0}
              className="mb-3"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold"
                style={{
                  background: "rgba(14,36,83,0.07)",
                  border: "1px solid rgba(14,36,83,0.14)",
                  color: NAVY,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TEAL }} />
                أحدث الطلبات
              </span>
            </motion.div>

            {/* Heading — navy with teal gradient */}
            <motion.h2
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0.07}
              className="font-extrabold leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.4rem)", color: NAVY }}
            >
              تصفح أحدث{" "}
              <span style={{
                background: `linear-gradient(110deg, ${TEAL} 20%, ${TEAL_L} 60%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                طلبات العملاء
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0.13}
              className="mt-2 text-[13.5px] leading-relaxed"
              style={{ color: "rgba(14,36,83,0.50)" }}
            >
              قدّم عرضك على الطلبات المتاحة وابدأ التعاون مع عملاء حقيقيين اليوم
            </motion.p>
          </div>

          {/* View-all CTA — navy outline */}
          <motion.div
            variants={fadeUp} initial="hidden"
            animate={isInView ? "visible" : "hidden"} custom={0.18}
            className="shrink-0"
          >
            <a
              href="#all-requests"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-[13px] transition-all duration-200 hover:text-white"
              style={{
                color: NAVY,
                border: `1.5px solid rgba(14,36,83,0.25)`,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = NAVY; (e.currentTarget as HTMLElement).style.borderColor = NAVY; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(14,36,83,0.25)"; }}
            >
              عرض الكل
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* ── Filter pills — navy active ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isInView ? "visible" : "hidden"} custom={0.22}
          className="flex flex-wrap justify-end gap-2 mb-8"
        >
          <LayoutGroup id="cat-filter">
            {CATEGORIES.map(({ label, icon: Icon }) => {
              const isActive = activeCategory === label;
              return (
                <button
                  key={label}
                  onClick={() => setActiveCategory(label)}
                  className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    color: isActive ? "#fff" : NAVY,
                    background: isActive
                      ? `linear-gradient(135deg, ${NAVY} 0%, #162d6e 100%)`
                      : "rgba(255,255,255,0.9)",
                    border: isActive ? `1.5px solid ${NAVY}` : "1.5px solid rgba(14,36,83,0.12)",
                    boxShadow: isActive
                      ? "0 4px 14px rgba(14,36,83,0.22)"
                      : "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  <Icon
                    className="w-3.5 h-3.5 shrink-0"
                    strokeWidth={2}
                    style={{ color: isActive ? TEAL_L : NAVY }}
                  />
                  {label}
                </button>
              );
            })}
          </LayoutGroup>
        </motion.div>

        {/* ── Card Grid ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isInView ? "visible" : "hidden"} custom={0.28}
        >
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((request, i) => (
                <RequestCard key={request.id} request={request} index={i} />
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-[14px]"
              style={{ color: "rgba(14,36,83,0.40)" }}
            >
              لا توجد طلبات في هذا التصنيف حالياً
            </motion.div>
          )}
        </motion.div>

        {/* ── Bottom stats — alternating navy / teal / navy ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isInView ? "visible" : "hidden"} custom={0.38}
          className="mt-14 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: TrendingUp, value: "+500", label: "طلب نشط",          accent: NAVY  },
            { icon: Briefcase,  value: "+200", label: "شركة مسجلة",       accent: TEAL  },
            { icon: Clock,      value: "24 ساعة", label: "متوسط وقت الرد", accent: NAVY  },
          ].map(({ icon: Icon, value, label, accent }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: `${accent}12`,
                  border: `1px solid ${accent}25`,
                }}
              >
                <Icon className="w-4.5 h-4.5" style={{ color: accent }} strokeWidth={1.8} />
              </div>
              <span className="text-[20px] font-extrabold leading-none" style={{ color: accent }}>{value}</span>
              <span className="text-[12px]" style={{ color: "rgba(14,36,83,0.45)" }}>{label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
