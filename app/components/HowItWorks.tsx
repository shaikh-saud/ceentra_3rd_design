"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { UserPlus, FileText, BarChart3, Rocket } from "lucide-react";

// ─── Step data ────────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    label: "الخطوة الأولى",
    title: "أنشئ حسابك",
    description: "سجّل في سنترَا خلال دقيقة وحدّد احتياجاتك التسويقية بسهولة تامة.",
    icon: UserPlus,
  },
  {
    number: "02",
    label: "الخطوة الثانية",
    title: "أضف طلبك",
    description: "حدد نوع الخدمة والميزانية والمدة المطلوبة للوصول إلى أفضل النتائج.",
    icon: FileText,
  },
  {
    number: "03",
    label: "الخطوة الثالثة",
    title: "قارن العروض",
    description: "تلقَّ عروضًا من شركات موثوقة وقارن بينها بشفافية كاملة.",
    icon: BarChart3,
  },
  {
    number: "04",
    label: "الخطوة الرابعة",
    title: "ابدأ التنفيذ",
    description: "اختر العرض الأنسب وابدأ العمل مباشرة مع الشركة لتحقيق أهدافك.",
    icon: Rocket,
  },
];

// ─── RTL connector arrow ──────────────────────────────────────────────────────
function Connector() {
  return (
    <div className="hidden lg:flex items-center justify-center shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 12H7M7 12L11 8M7 12L11 16"
          stroke="#058B7F"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

// ─── Progress ring (SVG) ──────────────────────────────────────────────────────
// Draws a circular countdown border that drains over 3s
const DURATION = 3000; // ms per card
const R = 36; // radius
const CIRCUMFERENCE = 2 * Math.PI * R;

function ProgressRing({ active }: { active: boolean }) {
  const [offset, setOffset] = useState(CIRCUMFERENCE);

  useEffect(() => {
    if (!active) {
      setOffset(CIRCUMFERENCE);
      return;
    }
    setOffset(CIRCUMFERENCE);
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      setOffset(CIRCUMFERENCE * (1 - progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ borderRadius: "999px" }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* We don't want a ring here — just the card border animation handled via CSS */}
    </svg>
  );
}

// ─── Shared smooth transition ─────────────────────────────────────────────────
// One config used everywhere — prevents elements finishing at different times
const T = { duration: 0.75, ease: [0.4, 0, 0.2, 1] as const };

// ─── Animation ───────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const, delay },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  // Auto-cycle active card every 4s — gives enough read time
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Small initial delay so the page finishes loading before cycling starts
    const init = setTimeout(() => {
      const id = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % steps.length);
      }, DURATION);
      // store interval id for cleanup — returned via closure
      (window as any).__howItWorksInterval = id;
    }, 800);
    return () => {
      clearTimeout(init);
      clearInterval((window as any).__howItWorksInterval);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 sm:py-28 md:py-32 px-5 sm:px-6 overflow-hidden"
      style={{ background: "#F7F9F9" }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[860px] h-[560px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(5,139,127,0.05) 0%, transparent 68%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-20">
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0} className="mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] text-primary py-1.5 px-4 text-[13px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
              آلية العمل
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.1}
            className="text-[28px] sm:text-[34px] md:text-[42px] font-extrabold tracking-tight text-text-primary leading-[1.25]"
          >
            كيف تبدأ مع{" "}
            <span style={{
              background: "linear-gradient(110deg, #058B7F 20%, #0FAE9E 60%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              سنترَا
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.18}
            className="mt-4 text-[15px] sm:text-[16px] text-text-secondary leading-[1.85] max-w-xl mx-auto"
          >
            أربع خطوات بسيطة تفصلك عن إيجاد شريك التسويق المثالي لنمو أعمالك.
          </motion.p>
        </div>

        {/* ── Pill cards row ── */}
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 lg:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className="flex items-center gap-3 lg:gap-5 w-full sm:w-auto sm:flex-1 lg:flex-none"
              >
                {/* ── Pill card ── */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={0.22 + index * 0.12}
                  onClick={() => setActiveIndex(index)}
                  className="relative flex flex-col items-center text-center w-full cursor-pointer"
                  style={{ maxWidth: "220px", marginLeft: "auto", marginRight: "auto" }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 240, damping: 28 }}
                >
                  {/*
                    ── Pill shell ──
                    Two background layers stacked:
                      • Bottom: white card (always present)
                      • Top:    teal gradient overlay — opacity 0→1
                    Animating only `opacity` gives perfectly smooth cross-fade
                    because it never tries to interpolate between gradient ↔ solid.
                  */}
                  <div
                    className="relative w-full flex flex-col items-center overflow-hidden"
                    style={{
                      borderRadius: "999px",
                      padding: "44px 28px",
                      height: "340px",
                      background: "#ffffff",
                      border: "1.5px solid rgba(5,139,127,0.16)",
                    }}
                  >
                    {/* Teal gradient layer — fades in/out */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        borderRadius: "999px",
                        background: "linear-gradient(175deg, #058B7F 0%, #046E65 100%)",
                      }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={T}
                    />

                    {/* Shadow overlay — separate so it doesn't fight the bg */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ borderRadius: "999px" }}
                      animate={{
                        boxShadow: isActive
                          ? "0 18px 56px rgba(5,139,127,0.34)"
                          : "0 4px 20px rgba(0,0,0,0.07)",
                      }}
                      transition={T}
                    />

                    {/* Inner decorative ring on teal */}
                    <motion.div
                      className="absolute inset-4 pointer-events-none"
                      style={{ borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)" }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={T}
                    />

                    {/* All content sits above the overlay layers */}
                    <div className="relative z-10 flex flex-col items-center w-full h-full">

                      {/* ── Icon circle ── */}
                      <div className="relative mb-5 flex items-center justify-center shrink-0"
                           style={{ width: "68px", height: "68px", borderRadius: "50%" }}>
                        {/* Teal bg (inactive) */}
                        <motion.div className="absolute inset-0 rounded-full"
                          style={{ background: "rgba(5,139,127,0.09)" }}
                          animate={{ opacity: isActive ? 0 : 1 }} transition={T} />
                        {/* White bg (active) */}
                        <motion.div className="absolute inset-0 rounded-full"
                          style={{ background: "rgba(255,255,255,0.22)" }}
                          animate={{ opacity: isActive ? 1 : 0 }} transition={T} />
                        {/* Icon — cross-fade color via two spans */}
                        <span className="relative z-10" style={{ width: "26px", height: "26px", display: "block" }}>
                          <motion.span className="absolute inset-0 flex items-center justify-center"
                            animate={{ opacity: isActive ? 0 : 1 }} transition={T}>
                            <Icon style={{ width: "26px", height: "26px", color: "#058B7F" }} />
                          </motion.span>
                          <motion.span className="absolute inset-0 flex items-center justify-center"
                            animate={{ opacity: isActive ? 1 : 0 }} transition={T}>
                            <Icon style={{ width: "26px", height: "26px", color: "#ffffff" }} />
                          </motion.span>
                        </span>
                      </div>

                      {/* ── Label pill ── */}
                      <div className="mb-4 px-3 py-0.5 text-[11px] font-bold tracking-wide relative"
                           style={{ borderRadius: "999px" }}>
                        <motion.div className="absolute inset-0" style={{ borderRadius: "999px", background: "rgba(5,139,127,0.08)" }}
                          animate={{ opacity: isActive ? 0 : 1 }} transition={T} />
                        <motion.div className="absolute inset-0" style={{ borderRadius: "999px", background: "rgba(255,255,255,0.16)" }}
                          animate={{ opacity: isActive ? 1 : 0 }} transition={T} />
                        <motion.span className="relative z-10 block"
                          animate={{ color: isActive ? "rgba(255,255,255,0.9)" : "#058B7F" }} transition={T}>
                          {step.label}
                        </motion.span>
                      </div>

                      {/* ── Title ── */}
                      <motion.h3
                        className="font-extrabold leading-snug mb-3 relative z-10"
                        animate={{ color: isActive ? "#ffffff" : "#1A1A1A" }}
                        transition={T}
                        style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}
                      >
                        {step.title}
                      </motion.h3>

                      {/* ── Description ── */}
                      <motion.p
                        className="text-[13px] leading-[1.85] relative z-10"
                        animate={{ color: isActive ? "rgba(255,255,255,0.72)" : "#5A5A5A" }}
                        transition={T}
                      >
                        {step.description}
                      </motion.p>

                      {/* ── Faint watermark number ── */}
                      <motion.span
                        className="absolute bottom-7 select-none pointer-events-none font-black leading-none"
                        animate={{ color: isActive ? "rgba(255,255,255,0.07)" : "rgba(5,139,127,0.05)" }}
                        transition={T}
                        style={{ fontSize: "72px" }}
                      >
                        {step.number}
                      </motion.span>
                    </div>

                    {/* ── Progress bar ── */}
                    <div className="absolute bottom-0 left-0 right-0 overflow-hidden"
                         style={{ borderRadius: "0 0 999px 999px", height: "4px" }}>
                      {isActive && (
                        <motion.div
                          key={activeIndex}
                          className="h-full"
                          style={{ background: "rgba(255,255,255,0.45)", transformOrigin: "right" }}
                          initial={{ scaleX: 1 }}
                          animate={{ scaleX: 0 }}
                          transition={{ duration: DURATION / 1000, ease: "linear" }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Connector between cards */}
                {index < steps.length - 1 && <Connector />}
              </div>
            );
          })}
        </div>

        {/* ── Dot indicators ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.7}
          className="flex items-center justify-center gap-2 mt-12"
        >
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="transition-all duration-400 rounded-full"
              style={{
                width:  activeIndex === i ? "24px" : "8px",
                height: "8px",
                background: activeIndex === i ? "#058B7F" : "rgba(5,139,127,0.25)",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
