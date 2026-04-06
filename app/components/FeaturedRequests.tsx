"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue } from "framer-motion";
import {
  Clock, ArrowLeft, Star, Megaphone, PenTool,
  BarChart3, Share2, Camera, Search, ArrowUpRight,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────
const requests = [
  {
    title: "إعداد خطة تسويق متكاملة",
    description: "أبحث عن شركة متخصصة لإعداد خطة تسويق شاملة لمشروعي تشمل تحليل السوق واستراتيجية النمو.",
    user: "محمد أحمد",
    time: "منذ 3 ساعات",
    category: "استراتيجية",
    budget: "5,000 – 10,000 ريال",
    icon: BarChart3,
    featured: true,
    rotate: "-2deg",
  },
  {
    title: "إدارة حسابات التواصل الاجتماعي",
    description: "أحتاج شركة تدير حساباتي على تويتر وإنستقرام بشكل احترافي مع محتوى يومي وتقارير أسبوعية.",
    user: "سارة العتيبي",
    time: "منذ 5 ساعات",
    category: "سوشال ميديا",
    budget: "3,000 ريال / شهر",
    icon: Share2,
    featured: true,
    rotate: "1.5deg",
  },
  {
    title: "تصميم هوية بصرية كاملة",
    description: "أبحث عن مصمم محترف لتصميم هوية بصرية شاملة تتضمن الشعار والألوان والخطوط.",
    user: "عبدالله الشمري",
    time: "منذ يوم",
    category: "تصميم",
    budget: "2,500 ريال",
    icon: PenTool,
    featured: false,
    rotate: "-1deg",
  },
  {
    title: "حملة إعلانية على قوقل",
    description: "أحتاج خبير إعلانات قوقل لإدارة حملة إعلانية بميزانية محددة لمتجري الإلكتروني.",
    user: "نورة القحطاني",
    time: "منذ يومين",
    category: "إعلانات",
    budget: "8,000 ريال",
    icon: Megaphone,
    featured: true,
    rotate: "2deg",
  },
  {
    title: "تصوير منتجات احترافي",
    description: "أبحث عن مصور محترف لتصوير منتجات متجري بجودة عالية مناسبة للإعلانات والسوشال ميديا.",
    user: "فهد المالكي",
    time: "منذ 3 أيام",
    category: "إنتاج مرئي",
    budget: "1,800 ريال",
    icon: Camera,
    featured: false,
    rotate: "-1.5deg",
  },
  {
    title: "تحسين محركات البحث SEO",
    description: "أحتاج متخصص SEO لتحسين ترتيب موقعي في نتائج البحث وزيادة الزيارات العضوية.",
    user: "خالد الدوسري",
    time: "منذ 4 أيام",
    category: "SEO",
    budget: "4,000 ريال / شهر",
    icon: Search,
    featured: false,
    rotate: "1deg",
  },
];

// ─── Glass Card ────────────────────────────────────────────────────────────────
function RequestCard({ request, index }: { request: typeof requests[0]; index: number }) {
  const Icon = request.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, rotate: request.rotate, scale: 1 }}
      animate={{
        opacity: 1,
        y: hovered ? -6 : 0,
        rotate: hovered ? "0deg" : request.rotate,
        scale: hovered ? 1.03 : 1,
      }}
      transition={{
        opacity: { duration: 0.55, delay: 0.1 + index * 0.07, ease: "easeOut" },
        y: { type: "spring", stiffness: 280, damping: 22 },
        rotate: { type: "spring", stiffness: 280, damping: 22 },
        scale: { type: "spring", stiffness: 280, damping: 22 },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative shrink-0 cursor-pointer select-none"
      style={{ width: "300px" }}
    >
      {/* Card shell — glassmorphism */}
      <div
        style={{
          borderRadius: "24px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: hovered
            ? "1px solid rgba(255,255,255,0.30)"
            : "1px solid rgba(255,255,255,0.12)",
          boxShadow: hovered
            ? "0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(15,174,158,0.30), 0 0 40px rgba(5,139,127,0.18)"
            : "0 8px 32px rgba(0,0,0,0.24)",
          transition: "border 0.35s, box-shadow 0.35s",
          padding: "24px",
          minHeight: "260px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top row: category + featured */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            {/* Icon bubble */}
            <div
              className="w-9 h-9 flex items-center justify-center rounded-full"
              style={{ background: "rgba(15,174,158,0.18)", border: "1px solid rgba(15,174,158,0.25)" }}
            >
              <Icon className="w-4.25 h-4.25" style={{ color: "#0FAE9E" }} strokeWidth={1.8} />
            </div>
            {/* Category pill */}
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(15,174,158,0.14)",
                color: "#0FAE9E",
                border: "1px solid rgba(15,174,158,0.22)",
              }}
            >
              {request.category}
            </span>
          </div>

          {request.featured && (
            <span
              className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full"
              style={{ background: "rgba(251,191,36,0.15)", color: "#FBBF24", border: "1px solid rgba(251,191,36,0.25)" }}
            >
              <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
              مميز
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-extrabold text-right leading-snug mb-2"
          style={{
            fontSize: "16px",
            color: hovered ? "#ffffff" : "rgba(255,255,255,0.95)",
            transition: "color 0.3s",
          }}
        >
          {request.title}
        </h3>

        {/* Description */}
        <p
          className="text-right leading-[1.75] line-clamp-2 mb-auto"
          style={{ fontSize: "13px", color: "rgba(255,255,255,0.52)" }}
        >
          {request.description}
        </p>

        {/* Budget */}
        <div className="mt-4 mb-4 flex justify-end">
          <span
            className="text-[12px] font-bold px-3 py-1 rounded-full"
            style={{
              background: "rgba(5,139,127,0.22)",
              color: "#0FAE9E",
              border: "1px solid rgba(5,139,127,0.30)",
            }}
          >
            {request.budget}
          </span>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* CTA */}
          <button
            className="flex items-center gap-1.5 rounded-full font-bold transition-all duration-300"
            style={{
              padding: "8px 16px",
              fontSize: "12px",
              background: hovered
                ? "linear-gradient(135deg, #058B7F, #0FAE9E)"
                : "rgba(5,139,127,0.22)",
              color: "#ffffff",
              border: "1px solid rgba(15,174,158,0.30)",
              boxShadow: hovered ? "0 4px 18px rgba(5,139,127,0.40)" : "none",
            }}
          >
            عرض التفاصيل
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Time */}
          <span
            className="flex items-center gap-1"
            style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)" }}
          >
            <Clock className="w-3 h-3" />
            {request.time}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Draggable carousel ────────────────────────────────────────────────────────
function DraggableCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Constrain drag to track width
  const getConstraints = () => {
    if (!trackRef.current) return { left: 0, right: 0 };
    const trackW = trackRef.current.scrollWidth;
    const containerW = trackRef.current.parentElement?.clientWidth ?? 0;
    return { left: -(trackW - containerW + 48), right: 0 };
  };

  return (
    <div className="overflow-hidden cursor-grab active:cursor-grabbing px-6 sm:px-10 lg:px-16 -mx-6 sm:-mx-10 lg:-mx-16">
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={getConstraints()}
        dragElastic={0.08}
        dragMomentum={true}
        style={{ x }}
        className="flex gap-5 py-6 w-max"
        whileTap={{ cursor: "grabbing" }}
      >
        {requests.map((req, i) => (
          <RequestCard key={i} request={req} index={i} />
        ))}
        {/* Fade-out sentinel */}
        <div className="shrink-0 w-8" />
      </motion.div>
    </div>
  );
}

// ─── Blob decorations ─────────────────────────────────────────────────────────
function BackgroundBlobs() {
  return (
    <>
      {/* Top-right large glow */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,174,158,0.18) 0%, transparent 65%)", filter: "blur(40px)" }}
      />
      {/* Bottom-left medium glow */}
      <div
        className="absolute bottom-0 -left-16 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(5,139,127,0.20) 0%, transparent 60%)", filter: "blur(50px)" }}
      />
      {/* Centre subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(4,110,101,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      {/* Dot grid overlay — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </>
  );
}

// ─── Fade-up ───────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.58, ease: "easeOut" as const, delay: d },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
export default function FeaturedRequests() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="jobs"
      className="relative py-20 sm:py-24 md:py-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0B2E2B 0%, #0F3532 40%, #092422 100%)" }}
    >
      <BackgroundBlobs />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">

          {/* Left: text */}
          <div className="flex flex-col items-end text-right">
            <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0} className="mb-4">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold"
                style={{
                  background: "rgba(15,174,158,0.12)",
                  border: "1px solid rgba(15,174,158,0.25)",
                  color: "#0FAE9E",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
                الطلبات المميزة ⭐
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.08}
              className="font-extrabold leading-[1.28] tracking-tight text-white"
              style={{ fontSize: "clamp(1.6rem, 3.8vw, 2.6rem)" }}
            >
              أحدث طلبات العملاء
            </motion.h2>

            <motion.p
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.14}
              className="mt-3 text-[14px] sm:text-[15px]"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              قدّم عرضك الآن وابدأ العمل مع عملاء حقيقيين
            </motion.p>
          </div>

          {/* Right: CTA + drag hint */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.18}
            className="flex flex-col items-end gap-3 shrink-0"
          >
            <a
              href="#latest-requests"
              className="inline-flex items-center gap-2 rounded-full font-semibold text-[14px] transition-all duration-300 hover:scale-[1.03]"
              style={{
                padding: "10px 22px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              عرض كل الطلبات
              <ArrowLeft className="w-4 h-4" />
            </a>
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.28)" }}>
              اسحب للتصفح ←
            </span>
          </motion.div>
        </div>

        {/* ── Draggable cards strip ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.22}
        >
          <DraggableCarousel />
        </motion.div>

        {/* ── Bottom stats strip ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.32}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3"
        >
          {[
            { value: "500+", label: "طلب منشور" },
            { value: "200+", label: "شركة جاهزة للتقديم" },
            { value: "24h", label: "متوسط وقت الاستجابة" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2.5">
              <span
                className="text-[22px] font-black"
                style={{ color: "#0FAE9E" }}
              >
                {s.value}
              </span>
              <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.40)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
