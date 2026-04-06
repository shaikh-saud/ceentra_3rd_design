"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "اكتشف وابدأ",
    description: "ابدأ بإنشاء حسابك وتحديد احتياجاتك التسويقية بسهولة.",
  },
  {
    number: "02",
    title: "أضف طلبك",
    description:
      "حدد نوع الخدمة، الميزانية، والمدة المطلوبة للوصول إلى أفضل النتائج.",
  },
  {
    number: "03",
    title: "استلم العروض",
    description:
      "تلقى عروضًا من شركات تسويق موثوقة وقارن بينها بكل شفافية.",
  },
  {
    number: "04",
    title: "اختر وابدأ التنفيذ",
    description: "اختر العرض المناسب وابدأ العمل مع الشركة لتحقيق أهدافك.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative py-24 sm:py-28 md:py-32 lg:py-36 px-5 sm:px-6 overflow-hidden"
      style={{ background: "#FAFBFB" }}
    >
      {/* Soft radial accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(5,139,127,0.035) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] text-primary py-1.5 px-4 text-[13px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
              آلية العمل
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.08}
            className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[46px] font-extrabold tracking-tight text-text-primary leading-[1.25]"
          >
            كيف تبدأ مع سنترَا
          </motion.h2>
        </div>

        {/* ── Timeline + Steps ── */}
        <div className="relative">
          {/* Horizontal connecting line — lg+ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.15}
            className="hidden lg:block absolute top-[7px] left-[12.5%] right-[12.5%] h-[2px] z-0"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-l from-primary/5 via-primary/15 to-primary/5" />
          </motion.div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 sm:gap-y-16 lg:gap-y-0 lg:gap-x-0 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.18 + index * 0.1}
                className="flex flex-col items-center text-center group"
              >
                {/* ── Dot ── */}
                <div className="relative mb-10 sm:mb-12">
                  {/* Outer ring */}
                  <div className="w-[15px] h-[15px] rounded-full border-[2.5px] border-primary/25 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-400">
                    <div className="w-[7px] h-[7px] rounded-full bg-primary group-hover:scale-[1.3] transition-transform duration-300" />
                  </div>
                </div>

                {/* ── Step Number ── */}
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-text-secondary/40 mb-5">
                  خطوة {step.number}
                </span>

                {/* ── Large BG Number ── */}
                <div className="relative mb-4">
                  <span className="text-[72px] sm:text-[80px] font-black leading-none text-text-primary/[0.035] select-none group-hover:text-primary/55 transition-colors duration-500">
                    {step.number}
                  </span>
                </div>

                {/* ── Title ── */}
                <h3 className="text-[18px] sm:text-[20px] font-bold text-text-primary leading-snug mb-3 group-hover:text-primary transition-colors duration-400">
                  {step.title}
                </h3>

                {/* ── Description ── */}
                <p className="text-[14px] sm:text-[15px] text-text-secondary/65 leading-[1.8] max-w-[240px] mx-auto font-normal">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
