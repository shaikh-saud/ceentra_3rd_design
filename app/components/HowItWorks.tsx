"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 12H7M7 12L11 8M7 12L11 16"
          stroke="#0e2453"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.22"
        />
      </svg>
    </div>
  );
}

// ─── Shared smooth transition ─────────────────────────────────────────────────
const DURATION = 3000;
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

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const init = setTimeout(() => {
      const id = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % steps.length);
      }, DURATION);
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
      {/* Subtle navy ambient blob top-right */}
      <div
        className="absolute top-0 right-0 w-130 h-105 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(14,36,83,0.055) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Teal ambient blob bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-105 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(5,139,127,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-20">
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
              آلية العمل
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.1}
            className="font-extrabold tracking-tight leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "#0e2453",
            }}
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
            className="mt-4 text-[15px] sm:text-[16px] leading-[1.85] max-w-xl mx-auto"
            style={{ color: "rgba(14,36,83,0.55)" }}
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
                  <div
                    className="relative w-full flex flex-col items-center overflow-hidden"
                    style={{
                      borderRadius: "999px",
                      padding: "44px 28px",
                      height: "340px",
                      background: "#ffffff",
                      border: "1.5px solid rgba(14,36,83,0.10)",
                    }}
                  >
                    {/* Light gray layer — fades in when active */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        borderRadius: "999px",
                        background: "linear-gradient(175deg, #f6f8fa 0%, #eef1f5 100%)",
                      }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={T}
                    />

                    {/* Teal top-edge glow when active */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
                      style={{
                        borderRadius: "999px 999px 0 0",
                        background: "linear-gradient(90deg, #058B7F, #0FAE9E)",
                      }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={T}
                    />

                    {/* Shadow */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ borderRadius: "999px" }}
                      animate={{
                        boxShadow: isActive
                          ? "0 18px 56px rgba(14,36,83,0.12)"
                          : "0 4px 20px rgba(0,0,0,0.06)",
                      }}
                      transition={T}
                    />

                    {/* Inner decorative ring on active */}
                    <motion.div
                      className="absolute inset-4 pointer-events-none"
                      style={{ borderRadius: "999px", border: "1px solid rgba(255,255,255,0.07)" }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={T}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center w-full h-full">

                      {/* ── Icon circle ── */}
                      <div
                        className="relative mb-5 flex items-center justify-center shrink-0"
                        style={{ width: "68px", height: "68px", borderRadius: "50%" }}
                      >
                        {/* Inactive bg — teal tint */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ background: "rgba(5,139,127,0.10)" }}
                          animate={{ opacity: isActive ? 0 : 1 }}
                          transition={T}
                        />
                        {/* Active bg — teal ring on navy */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ background: "rgba(15,174,158,0.18)", border: "1.5px solid rgba(15,174,158,0.35)" }}
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={T}
                        />

                        {/* Icon color cross-fade */}
                        <span className="relative z-10" style={{ width: "26px", height: "26px", display: "block" }}>
                          <motion.span
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ opacity: isActive ? 0 : 1 }}
                            transition={T}
                          >
                            <Icon style={{ width: "26px", height: "26px", color: "#058B7F" }} />
                          </motion.span>
                          <motion.span
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ opacity: isActive ? 1 : 0 }}
                            transition={T}
                          >
                            <Icon style={{ width: "26px", height: "26px", color: "#0FAE9E" }} />
                          </motion.span>
                        </span>
                      </div>

                      {/* ── Label pill ── */}
                      <div
                        className="mb-4 px-3 py-0.5 text-[11px] font-bold tracking-wide relative"
                        style={{ borderRadius: "999px" }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          style={{ borderRadius: "999px", background: "rgba(14,36,83,0.07)" }}
                          animate={{ opacity: isActive ? 0 : 1 }}
                          transition={T}
                        />
                        <motion.div
                          className="absolute inset-0"
                          style={{ borderRadius: "999px", background: "rgba(15,174,158,0.20)" }}
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={T}
                        />
                        <motion.span
                          className="relative z-10 block"
                          animate={{ color: isActive ? "#0FAE9E" : "#0e2453" }}
                          transition={T}
                        >
                          {step.label}
                        </motion.span>
                      </div>

                      {/* ── Title ── */}
                      <motion.h3
                        className="font-extrabold leading-snug mb-3 relative z-10"
                        animate={{ color: isActive ? "#0e2453" : "#0e2453" }}
                        transition={T}
                        style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}
                      >
                        {step.title}
                      </motion.h3>

                      {/* ── Description ── */}
                      <motion.p
                        className="text-[13px] leading-[1.85] relative z-10"
                        animate={{ color: isActive ? "rgba(14,36,83,0.55)" : "rgba(14,36,83,0.55)" }}
                        transition={T}
                      >
                        {step.description}
                      </motion.p>

                      {/* ── Watermark number ── */}
                      <motion.span
                        className="absolute bottom-7 select-none pointer-events-none font-black leading-none"
                        animate={{ color: isActive ? "rgba(14,36,83,0.04)" : "rgba(14,36,83,0.04)" }}
                        transition={T}
                        style={{ fontSize: "72px" }}
                      >
                        {step.number}
                      </motion.span>
                    </div>

                    {/* ── Progress bar (teal on navy card) ── */}
                    <div
                      className="absolute bottom-0 left-0 right-0 overflow-hidden"
                      style={{ borderRadius: "0 0 999px 999px", height: "4px" }}
                    >
                      {isActive && (
                        <motion.div
                          key={activeIndex}
                          className="h-full"
                          style={{
                            background: "linear-gradient(90deg, #058B7F, #0FAE9E)",
                            transformOrigin: "right",
                          }}
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
                background: activeIndex === i
                  ? "linear-gradient(90deg, #058B7F, #0FAE9E)"
                  : "rgba(14,36,83,0.18)",
              }}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
