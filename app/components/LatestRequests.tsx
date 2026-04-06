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

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: "الكل", icon: LayoutGrid },
  { label: "تسويق", icon: Megaphone },
  { label: "استشارات", icon: Lightbulb },
  { label: "وظائف", icon: Briefcase },
  { label: "تصميم", icon: Palette },
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
    description:
      "أبحث عن مستشار مالي لتحليل القوائم المالية وتقديم توصيات لتحسين الأداء المالي للشركة.",
    user: "محمد أحمد",
    avatar: "https://i.pravatar.cc/40?img=11",
    time: "منذ شهر",
    category: "استشارات",
    budget: "2,000 ر.س",
  },
  {
    id: "r2",
    title: "إنشاء حملة تسويقية لمتجر إلكتروني",
    description:
      "أحتاج فريق تسويق لإطلاق حملة شاملة على منصات التواصل الاجتماعي لمتجري الجديد.",
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
    description:
      "نبحث عن مدير تسويق رقمي ذو خبرة لا تقل عن 3 سنوات للانضمام لفريقنا في الرياض.",
    user: "شركة نمو",
    avatar: "https://i.pravatar.cc/40?img=22",
    time: "منذ أسبوعين",
    category: "وظائف",
    budget: "12,000 ر.س / شهر",
  },
  {
    id: "r4",
    title: "تصميم بروفايل احترافي للشركة",
    description:
      "أبحث عن مصمم لتصميم بروفايل شركة احترافي يعكس هويتنا التجارية بشكل مميز.",
    user: "خالد الدوسري",
    avatar: "https://i.pravatar.cc/40?img=33",
    time: "منذ شهر",
    category: "تصميم",
    budget: "1,500 ر.س",
  },
  {
    id: "r5",
    title: "استشارة في استراتيجية المحتوى",
    description:
      "أحتاج خبير محتوى لوضع استراتيجية محتوى شاملة لمنصاتنا الرقمية خلال الربع القادم.",
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
    description:
      "أبحث عن متخصص في إعلانات سناب شات لإدارة حملات إعلانية بميزانية شهرية محددة.",
    user: "فهد المالكي",
    avatar: "https://i.pravatar.cc/40?img=60",
    time: "منذ شهرين",
    category: "تسويق",
    budget: "4,000 ر.س",
  },
  {
    id: "r7",
    title: "مصمم جرافيك للعمل عن بُعد",
    description:
      "نبحث عن مصمم جرافيك موهوب للعمل عن بُعد على مشاريع متنوعة بشكل مستمر.",
    user: "وكالة إبداع",
    avatar: "https://i.pravatar.cc/40?img=15",
    time: "منذ 6 أسابيع",
    category: "وظائف",
    budget: "8,000 ر.س / شهر",
  },
  {
    id: "r8",
    title: "تصميم عرض تقديمي للمستثمرين",
    description:
      "أحتاج تصميم عرض تقديمي احترافي باللغتين العربية والإنجليزية لجولة استثمارية.",
    user: "عبدالله الشمري",
    avatar: "https://i.pravatar.cc/40?img=70",
    time: "منذ شهر",
    category: "تصميم",
    budget: "2,800 ر.س",
    urgency: "عاجل",
  },
];

// ─── Category colour map ───────────────────────────────────────────────────────
const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  تسويق:     { bg: "rgba(5,139,127,0.09)",   text: "#058B7F", border: "rgba(5,139,127,0.18)"  },
  استشارات:  { bg: "rgba(99,102,241,0.09)",  text: "#6366F1", border: "rgba(99,102,241,0.18)" },
  وظائف:     { bg: "rgba(245,158,11,0.09)",  text: "#D97706", border: "rgba(245,158,11,0.18)" },
  تصميم:     { bg: "rgba(236,72,153,0.09)",  text: "#DB2777", border: "rgba(236,72,153,0.18)" },
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
        border: hovered ? "1.5px solid rgba(5,139,127,0.28)" : "1.5px solid rgba(0,0,0,0.055)",
        boxShadow: hovered
          ? "0 12px 40px rgba(5,139,127,0.12), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease",
      }}
    >
      {/* Subtle teal top glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, #058B7F, transparent)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ── Top row: category + urgency ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Category pill */}
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

        {/* Time */}
        <span className="flex items-center gap-1 text-[11px] text-text-secondary/45">
          <Clock className="w-3 h-3 shrink-0" />
          {request.time}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 text-right">
        <h3
          className="text-[15.5px] font-extrabold text-text-primary mb-1.5 leading-snug transition-colors duration-200"
          style={{ color: hovered ? "#058B7F" : undefined }}
        >
          {request.title}
        </h3>
        <p className="text-[13px] text-text-secondary/60 leading-[1.75] line-clamp-2">
          {request.description}
        </p>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between mt-auto pt-4"
        style={{ borderTop: "1px dashed rgba(0,0,0,0.07)" }}
      >
        {/* User */}
        <div className="flex items-center gap-2">
          <img
            src={request.avatar}
            alt={request.user}
            className="w-7 h-7 rounded-full object-cover shrink-0"
            style={{ border: "1.5px solid rgba(5,139,127,0.2)" }}
          />
          <span className="text-[12px] font-semibold text-text-secondary/65">{request.user}</span>
        </div>

        {/* Right side: budget + CTA */}
        <div className="flex items-center gap-2">
          {request.budget && (
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(5,139,127,0.07)",
                color: "#058B7F",
                border: "1px solid rgba(5,139,127,0.15)",
              }}
            >
              {request.budget}
            </span>
          )}
          <span
            className="inline-flex items-center gap-1 text-[12px] font-bold px-3 py-1.5 rounded-full transition-all duration-200"
            style={{
              background: hovered ? "#058B7F" : "rgba(5,139,127,0.08)",
              color: hovered ? "#fff" : "#058B7F",
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
      {/* Ambient blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(5,139,127,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(5,139,127,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">

          {/* Text block */}
          <div className="text-right">
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0}
              className="mb-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.07] border border-primary/20 text-primary text-[13px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                أحدث الطلبات
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0.07}
              className="font-extrabold leading-[1.28] tracking-tight text-text-primary"
              style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.4rem)" }}
            >
              تصفح أحدث{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #058B7F 20%, #0FAE9E 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                طلبات العملاء
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0.13}
              className="mt-2 text-[13.5px] text-text-secondary/65 leading-relaxed"
            >
              قدّم عرضك على الطلبات المتاحة وابدأ التعاون مع عملاء حقيقيين اليوم
            </motion.p>
          </div>

          {/* View-all CTA */}
          <motion.div
            variants={fadeUp} initial="hidden"
            animate={isInView ? "visible" : "hidden"} custom={0.18}
            className="shrink-0"
          >
            <a
              href="#all-requests"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-[13px] text-primary transition-all duration-200 hover:bg-primary hover:text-white"
              style={{ border: "1.5px solid rgba(5,139,127,0.3)" }}
            >
              عرض الكل
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* ── Filter pills ── */}
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
                  className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors duration-200 cursor-pointer"
                  style={{
                    color: isActive ? "#fff" : "#6B7280",
                    background: isActive ? "#058B7F" : "rgba(255,255,255,0.9)",
                    border: isActive ? "1.5px solid #058B7F" : "1.5px solid rgba(0,0,0,0.08)",
                    boxShadow: isActive ? "0 4px 14px rgba(5,139,127,0.25)" : "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {filtered.map((request, i) => (
                <RequestCard key={request.id} request={request} index={i} />
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-text-secondary/45 text-[14px]"
            >
              لا توجد طلبات في هذا التصنيف حالياً
            </motion.div>
          )}
        </motion.div>

        {/* ── Bottom stats bar ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isInView ? "visible" : "hidden"} custom={0.38}
          className="mt-14 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: TrendingUp, value: "+500", label: "طلب نشط" },
            { icon: Briefcase, value: "+200", label: "شركة مسجلة" },
            { icon: Clock, value: "24 ساعة", label: "متوسط وقت الرد" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(5,139,127,0.09)", border: "1px solid rgba(5,139,127,0.16)" }}
              >
                <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.8} />
              </div>
              <span className="text-[20px] font-extrabold text-text-primary leading-none">{value}</span>
              <span className="text-[12px] text-text-secondary/55">{label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
