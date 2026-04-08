"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Users2, CalendarCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: d },
  }),
};

const STATS = [
  { icon: Users2,       value: "50+",   label: "مستشار متخصص"   },
  { icon: CalendarCheck, value: "1,000+", label: "جلسة استشارية" },
];

export default function ConsultingHero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-24 md:py-28"
      style={{
        background: "linear-gradient(135deg, #091a3e 0%, #0e2453 42%, #046E65 100%)",
      }}
      dir="rtl"
    >
      {/* Centre radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 115%, rgba(5,139,127,0.40) 0%, transparent 60%)",
        }}
      />
      {/* Top-right large blob */}
      <div
        className="absolute -top-28 -right-28 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(15,174,158,0.16) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      {/* Bottom-left blob */}
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(5,139,127,0.24) 0%, transparent 65%)",
          filter: "blur(48px)",
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.09,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.80) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Decorative rings */}
      <div className="absolute top-8  left-[7%]  w-24 h-24 rounded-full pointer-events-none hidden sm:block" style={{ border: "1.5px solid rgba(255,255,255,0.07)" }} />
      <div className="absolute bottom-10 right-[9%] w-36 h-36 rounded-full pointer-events-none hidden sm:block" style={{ border: "1.5px solid rgba(255,255,255,0.06)" }} />
      <div className="absolute top-1/3 left-[20%] w-8  h-8  rounded-full pointer-events-none hidden lg:block" style={{ background: "rgba(15,174,158,0.18)" }} />
      <div className="absolute top-1/4 right-[24%] w-5 h-5  rounded-full pointer-events-none hidden lg:block" style={{ background: "rgba(255,255,255,0.10)" }} />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Tag */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}
          className="mb-4"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-[13px] font-semibold"
            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            منصة الاستشارات المتخصصة
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.08}
          className="font-extrabold text-white leading-tight tracking-tight"
          style={{ fontSize: "clamp(2rem, 4.8vw, 3.4rem)" }}
        >
          الاستشارات
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.16}
          className="mt-4 text-[15px] sm:text-[16px] leading-relaxed max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.68)" }}
        >
          احصل على استشارات تسويقية من خبراء متخصصين لتطوير أعمالك
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.24}
          className="mt-8"
        >
          <button
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full font-bold text-[15px] transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: "#ffffff",
              color: "#058B7F",
              boxShadow: "0 8px 28px rgba(0,0,0,0.16)",
            }}
          >
            <Search className="w-4.5 h-4.5" strokeWidth={2.2} />
            ابحث عن مستشار
          </button>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.32}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 340, damping: 20 }}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl w-full sm:w-auto sm:min-w-[200px]"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.20)" }}
              >
                <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
              </div>
              <div className="text-right">
                <p className="text-[22px] font-black text-white leading-none">{value}</p>
                <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
