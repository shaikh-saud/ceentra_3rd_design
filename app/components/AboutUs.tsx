"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Users,
  BarChart3,
  BadgeCheck,
  Star,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

// ─── CountUp (preserved from original) ────────────────────────────────────────
function CountUp({
  to, from = 0, direction = "up", delay = 0, duration = 2,
  className = "", startWhen = true, separator = "",
}: {
  to: number; from?: number; direction?: "up" | "down"; delay?: number;
  duration?: number; className?: string; startWhen?: boolean; separator?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });

  const getDecimalPlaces = (num: number) => {
    const str = num.toString();
    if (str.includes(".")) {
      const decimals = str.split(".")[1];
      if (parseInt(decimals) !== 0) return decimals.length;
    }
    return 0;
  };
  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));
  const formatValue = useCallback((latest: number) => {
    const options = {
      useGrouping: !!separator,
      minimumFractionDigits: maxDecimals > 0 ? maxDecimals : 0,
      maximumFractionDigits: maxDecimals > 0 ? maxDecimals : 0,
    };
    const n = Intl.NumberFormat("en-US", options).format(latest);
    return separator ? n.replace(/,/g, separator) : n;
  }, [maxDecimals, separator]);

  useEffect(() => {
    if (ref.current) ref.current.textContent = formatValue(direction === "down" ? to : from);
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (startWhen) {
      const t = setTimeout(() => motionValue.set(direction === "down" ? from : to), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [startWhen, motionValue, direction, from, to, delay]);

  useEffect(() => {
    const unsub = springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = formatValue(latest);
    });
    return () => unsub();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}

// ─── Bullet points ─────────────────────────────────────────────────────────────
const bullets = [
  "أكثر من 200 شركة تسويق موثقة ومعتمدة",
  "مقارنة شفافة للعروض والأسعار",
  "بيئة آمنة تضمن حقوق جميع الأطراف",
  "دعم فني متاح على مدار الساعة",
];

// ─── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: 200, suffix: "+", label: "شركة موثقة" },
  { value: 500, suffix: "+", label: "مشروع ناجح" },
  { value: 98,  suffix: "%", label: "رضا العملاء" },
];

// ─── Floating cards data ───────────────────────────────────────────────────────
const floatingCards = [
  {
    icon: ShieldCheck,
    title: "شركات موثوقة ومعتمدة",
    sub: "200+ شركة مدققة",
    color: "#058B7F",
    rotate: "-6deg",
    x: "0%",
    y: "0%",
    delay: 0,
    zIndex: 3,
  },
  {
    icon: BarChart3,
    title: "نتائج قابلة للقياس",
    sub: "تتبّع أداء حملاتك",
    color: "#0FAE9E",
    rotate: "4deg",
    x: "18%",
    y: "30%",
    delay: 0.6,
    zIndex: 4,
  },
  {
    icon: Users,
    title: "مجتمع الأعمال",
    sub: "آلاف أصحاب الأعمال",
    color: "#046E65",
    rotate: "-3deg",
    x: "-8%",
    y: "58%",
    delay: 1.1,
    zIndex: 3,
  },
  {
    icon: Zap,
    title: "تنفيذ سريع وفعّال",
    sub: "ابدأ خلال 24 ساعة",
    color: "#058B7F",
    rotate: "6deg",
    x: "26%",
    y: "66%",
    delay: 1.5,
    zIndex: 2,
  },
];

// ─── Float keyframe is defined in globals.css — using CSS animation ────────────
// We define per-card float offset via animationDelay

// ─── Floating visual panel ─────────────────────────────────────────────────────
function FloatingVisual({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative w-full h-full min-h-120 flex items-center justify-center">

      {/* Background blob */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(5,139,127,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Decorative orbit rings */}
      <div className="absolute w-72 h-72 rounded-full border border-primary/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-52 h-52 rounded-full border border-primary/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Central badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "linear-gradient(145deg, #058B7F, #046E65)",
          boxShadow: "0 12px 40px rgba(5,139,127,0.40)",
        }}
      >
        <TrendingUp className="w-8 h-8 text-white mb-1" />
        <span className="text-white text-[10px] font-bold text-center leading-tight px-2">نمو أعمالك</span>
      </motion.div>

      {/* Floating cards */}
      {floatingCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.3 + card.delay * 0.5, ease: "easeOut" }}
            className="absolute"
            style={{
              left: card.x,
              top: card.y,
              zIndex: card.zIndex,
            }}
          >
            {/*
              Rotation + float animation live on an inner div so Framer Motion's
              transform pipeline (y, scale) never conflicts with rotate or
              the CSS floatCard keyframe.
            */}
            <div
              style={{
                rotate: card.rotate,
                animationName: isInView ? "floatCard" : "none",
                animationDuration: `${3.5 + i * 0.4}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDirection: "alternate",
                animationDelay: `${i * 0.7}s`,
              }}
            >
            {/* Glass card */}
            <div
              className="flex items-center gap-3 px-4 py-3 select-none"
              style={{
                borderRadius: "16px",
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(5,139,127,0.14)",
                boxShadow: "0 8px 32px rgba(5,139,127,0.12), 0 1px 0 rgba(255,255,255,0.6) inset",
                minWidth: "175px",
              }}
            >
              {/* Icon bubble */}
              <div
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: `rgba(5,139,127,0.1)`,
                }}
              >
                <Icon style={{ width: "18px", height: "18px", color: card.color }} />
              </div>
              {/* Text */}
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-text-primary leading-snug">{card.title}</span>
                <span className="text-[10px] text-primary/70 font-semibold mt-0.5">{card.sub}</span>
              </div>
            </div>
            </div>{/* end rotation/float wrapper */}
          </motion.div>
        );
      })}

      {/* Rating pill — bottom centre */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 1.2 }}
        className="absolute bottom-4 right-1/2 translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 select-none"
        style={{
          borderRadius: "999px",
          background: "rgba(255,255,255,0.90)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(5,139,127,0.12)",
          boxShadow: "0 4px 20px rgba(5,139,127,0.10)",
          animationName: isInView ? "floatCard" : "none",
          animationDuration: "4s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          animationDelay: "1s",
        }}
      >
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
          ))}
        </div>
        <span className="text-[11px] font-bold text-text-primary">98% رضا العملاء</span>
      </motion.div>

      {/* Verified badge — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="absolute top-6 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 select-none"
        style={{
          borderRadius: "999px",
          background: "linear-gradient(135deg, #058B7F, #0FAE9E)",
          boxShadow: "0 4px 16px rgba(5,139,127,0.35)",
          animationName: isInView ? "floatCard" : "none",
          animationDuration: "3.8s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          animationDelay: "0.5s",
        }}
      >
        <BadgeCheck className="w-3.5 h-3.5 text-white" />
        <span className="text-[10px] font-bold text-white">منصة موثوقة</span>
      </motion.div>
    </div>
  );
}

// ─── Fade-up variant ───────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.62, ease: "easeOut" as const, delay: d },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 px-5 sm:px-6 overflow-hidden bg-white"
    >
      {/* Subtle top-left background shape */}
      <div
        className="absolute -top-32 -right-32 w-125 h-125 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(5,139,127,0.04) 0%, transparent 65%)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-90 h-90 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,174,158,0.05) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-300 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* ══════ LEFT — Floating visual ══════ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
            className="order-2 lg:order-1 w-full"
          >
            <FloatingVisual isInView={isInView} />
          </motion.div>

          {/* ══════ RIGHT — Text content ══════ */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end text-center lg:text-right">

            {/* Badge */}
            <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0} className="mb-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] text-primary py-1.5 px-4 text-[13px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
                من نحن
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.08}
              className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-extrabold tracking-tight text-text-primary leading-[1.35] mb-5"
            >
              نحن نربطك بأفضل
              <br />
              <span
                style={{
                  background: "linear-gradient(110deg, #058B7F 15%, #0FAE9E 55%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                خبراء التسويق الرقمي
              </span>
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.14}
              className="text-[14px] sm:text-[15px] md:text-[16px] leading-[1.95] text-text-secondary/75 max-w-120 mb-7"
            >
              سنترَا منصة متخصصة تربط أصحاب الأعمال بشركات التسويق الرقمي الموثوقة
              في المملكة العربية السعودية، من خلال بيئة آمنة وشفافة تضمن جودة النتائج
              وسهولة التواصل.
            </motion.p>

            {/* Bullet points */}
            <motion.ul
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.2}
              className="flex flex-col gap-3 mb-9 w-full max-w-120"
            >
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 justify-center lg:justify-end">
                  <span className="text-[14px] text-text-secondary/80 leading-snug">{b}</span>
                  <div className="shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                </li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.26}
              className="mb-10"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold text-[14px] sm:text-[15px] px-8 py-4 rounded-full hover:bg-primary-dark transition-all duration-300"
                style={{ boxShadow: "0 4px 22px rgba(5,139,127,0.32)" }}
              >
                تواصل معنا
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.32}
              className="flex items-center gap-0 w-full max-w-120 justify-center lg:justify-end"
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center lg:items-end px-5 sm:px-6 ${i < stats.length - 1 ? "border-l border-border/60" : ""}`}
                >
                  <span className="text-[26px] sm:text-[30px] font-extrabold text-primary leading-none" dir="ltr">
                    {s.suffix === "%" ? (
                      <>
                        <CountUp to={s.value} startWhen={isInView} duration={2} className="inline" />
                        <span className="text-primary/60 text-[18px] font-bold">%</span>
                      </>
                    ) : (
                      <>
                        <span className="text-primary/60 text-[18px] font-bold">+</span>
                        <CountUp to={s.value} startWhen={isInView} duration={2} className="inline" />
                      </>
                    )}
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-text-secondary/55 mt-1 font-medium whitespace-nowrap">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
