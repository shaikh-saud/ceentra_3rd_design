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

// ─── CountUp ──────────────────────────────────────────────────────────────────
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

// ─── Bullets — alternating navy / teal check icons ───────────────────────────
const bullets = [
  { text: "أكثر من 200 شركة تسويق موثقة ومعتمدة",   color: "#0e2453" },
  { text: "مقارنة شفافة للعروض والأسعار",            color: "#058B7F" },
  { text: "بيئة آمنة تضمن حقوق جميع الأطراف",       color: "#0e2453" },
  { text: "دعم فني متاح على مدار الساعة",            color: "#058B7F" },
];

// ─── Stats — navy / teal / navy alternating ──────────────────────────────────
const stats = [
  { value: 200, suffix: "+", label: "شركة موثقة",  color: "#0e2453" },
  { value: 500, suffix: "+", label: "مشروع ناجح",  color: "#058B7F" },
  { value: 98,  suffix: "%", label: "رضا العملاء", color: "#0e2453" },
];

// ─── Floating cards — mix navy & teal ────────────────────────────────────────
const floatingCards = [
  {
    icon: ShieldCheck,
    title: "شركات موثوقة ومعتمدة",
    sub: "200+ شركة مدققة",
    iconBg: "rgba(14,36,83,0.10)",
    iconColor: "#0e2453",
    subColor: "#0e2453",
    rotate: "-6deg", x: "0%", y: "0%", delay: 0, zIndex: 3,
  },
  {
    icon: BarChart3,
    title: "نتائج قابلة للقياس",
    sub: "تتبّع أداء حملاتك",
    iconBg: "rgba(5,139,127,0.10)",
    iconColor: "#058B7F",
    subColor: "#058B7F",
    rotate: "4deg", x: "18%", y: "30%", delay: 0.6, zIndex: 4,
  },
  {
    icon: Users,
    title: "مجتمع الأعمال",
    sub: "آلاف أصحاب الأعمال",
    iconBg: "rgba(14,36,83,0.10)",
    iconColor: "#0e2453",
    subColor: "#0e2453",
    rotate: "-3deg", x: "-8%", y: "58%", delay: 1.1, zIndex: 3,
  },
  {
    icon: Zap,
    title: "تنفيذ سريع وفعّال",
    sub: "ابدأ خلال 24 ساعة",
    iconBg: "rgba(5,139,127,0.10)",
    iconColor: "#0FAE9E",
    subColor: "#058B7F",
    rotate: "6deg", x: "26%", y: "66%", delay: 1.5, zIndex: 2,
  },
];

// ─── Floating visual panel ─────────────────────────────────────────────────────
function FloatingVisual({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative w-full h-full min-h-120 flex items-center justify-center">

      {/* Dual ambient blobs — navy + teal */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(14,36,83,0.07) 0%, transparent 65%), " +
            "radial-gradient(ellipse 60% 50% at 70% 65%, rgba(5,139,127,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Orbit rings — navy outer, teal inner */}
      <div
        className="absolute w-72 h-72 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ border: "1px solid rgba(14,36,83,0.08)" }}
      />
      <div
        className="absolute w-52 h-52 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ border: "1px solid rgba(5,139,127,0.12)" }}
      />

      {/* Central badge — navy gradient with teal icon accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "linear-gradient(145deg, #0e2453 0%, #091a3e 100%)",
          boxShadow: "0 12px 40px rgba(14,36,83,0.40), 0 0 0 4px rgba(5,139,127,0.18)",
        }}
      >
        <TrendingUp className="w-8 h-8 mb-1" style={{ color: "#0FAE9E" }} />
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
            style={{ left: card.x, top: card.y, zIndex: card.zIndex }}
          >
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
              <div
                className="flex items-center gap-3 px-4 py-3 select-none"
                style={{
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: `1px solid ${i % 2 === 0 ? "rgba(14,36,83,0.12)" : "rgba(5,139,127,0.12)"}`,
                  boxShadow: `0 8px 32px ${i % 2 === 0 ? "rgba(14,36,83,0.10)" : "rgba(5,139,127,0.10)"}, 0 1px 0 rgba(255,255,255,0.6) inset`,
                  minWidth: "175px",
                }}
              >
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{ width: "38px", height: "38px", borderRadius: "50%", background: card.iconBg }}
                >
                  <Icon style={{ width: "18px", height: "18px", color: card.iconColor }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold leading-snug" style={{ color: "#0e2453" }}>{card.title}</span>
                  <span className="text-[10px] font-semibold mt-0.5" style={{ color: card.subColor, opacity: 0.75 }}>{card.sub}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Rating pill — bottom centre (teal stars) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 1.2 }}
        className="absolute bottom-4 right-1/2 translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 select-none"
        style={{
          borderRadius: "999px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(5,139,127,0.14)",
          boxShadow: "0 4px 20px rgba(5,139,127,0.12)",
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
            <Star key={i} className="w-3 h-3" style={{ fill: "#058B7F", color: "#058B7F" }} />
          ))}
        </div>
        <span className="text-[11px] font-bold" style={{ color: "#0e2453" }}>98% رضا العملاء</span>
      </motion.div>

      {/* Verified badge — teal gradient (top) */}
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
      {/* Navy ambient blob — top right */}
      <div
        className="absolute -top-32 -right-32 w-125 h-125 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,36,83,0.05) 0%, transparent 65%)" }}
      />
      {/* Teal ambient blob — bottom left */}
      <div
        className="absolute -bottom-24 -left-24 w-90 h-90 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(5,139,127,0.06) 0%, transparent 65%)" }}
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

            {/* Badge — navy tinted */}
            <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0} className="mb-5">
              <span
                className="inline-flex items-center gap-2 rounded-full py-1.5 px-4 text-[13px] font-semibold"
                style={{
                  background: "rgba(14,36,83,0.07)",
                  border: "1px solid rgba(14,36,83,0.14)",
                  color: "#0e2453",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                  style={{ background: "#058B7F" }}
                />
                من نحن
              </span>
            </motion.div>

            {/* Heading — navy with teal gradient phrase */}
            <motion.h2
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.08}
              className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-extrabold tracking-tight leading-[1.35] mb-5"
              style={{ color: "#0e2453" }}
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

            {/* Paragraph — navy/60 */}
            <motion.p
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.14}
              className="text-[14px] sm:text-[15px] md:text-[16px] leading-[1.95] max-w-120 mb-7"
              style={{ color: "rgba(14,36,83,0.58)" }}
            >
              سنترَا منصة متخصصة تربط أصحاب الأعمال بشركات التسويق الرقمي الموثوقة
              في المملكة العربية السعودية، من خلال بيئة آمنة وشفافة تضمن جودة النتائج
              وسهولة التواصل.
            </motion.p>

            {/* Bullet points — alternating navy / teal check icons */}
            <motion.ul
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.2}
              className="flex flex-col gap-3 mb-9 w-full max-w-120"
            >
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 justify-center lg:justify-end">
                  <span
                    className="text-[14px] leading-snug"
                    style={{ color: "rgba(14,36,83,0.72)" }}
                  >
                    {b.text}
                  </span>
                  <div
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: `${b.color}18` }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: b.color }} />
                  </div>
                </li>
              ))}
            </motion.ul>

            {/* CTA — navy button with teal glow */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.26}
              className="mb-10"
            >
              <a
                href="/register"
                className="inline-flex items-center gap-2 text-white font-bold text-[14px] sm:text-[15px] px-8 py-4 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #0e2453 0%, #162d6e 100%)",
                  boxShadow: "0 4px 22px rgba(14,36,83,0.32), 0 0 0 1.5px rgba(5,139,127,0.30)",
                }}
              >
                تواصل معنا
                <ArrowUpRight className="w-4 h-4" style={{ color: "#0FAE9E" }} />
              </a>
            </motion.div>

            {/* Stats row — alternating navy / teal / navy */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.32}
              className="flex items-center gap-0 w-full max-w-120 justify-center lg:justify-end"
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center lg:items-end px-5 sm:px-6 ${i < stats.length - 1 ? "border-l border-gray-200" : ""}`}
                >
                  <span
                    className="text-[26px] sm:text-[30px] font-extrabold leading-none"
                    dir="ltr"
                    style={{ color: s.color }}
                  >
                    {s.suffix === "%" ? (
                      <>
                        <CountUp to={s.value} startWhen={isInView} duration={2} className="inline" />
                        <span className="text-[18px] font-bold" style={{ color: s.color, opacity: 0.55 }}>%</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[18px] font-bold" style={{ color: s.color, opacity: 0.55 }}>+</span>
                        <CountUp to={s.value} startWhen={isInView} duration={2} className="inline" />
                      </>
                    )}
                  </span>
                  <span className="text-[11px] sm:text-[12px] mt-1 font-medium whitespace-nowrap" style={{ color: "rgba(14,36,83,0.45)" }}>
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
