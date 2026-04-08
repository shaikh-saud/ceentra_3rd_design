"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Users, Plus, UserPlus } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

const STATS = [
  { icon: Briefcase, value: "62", label: "فرصة عمل", color: "#058B7F" },
  { icon: Users,    value: "45", label: "باحث عن عمل", color: "#0e2453" },
];

export default function JobsHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} dir="rtl">
      {/* ── Hero band ── */}
      <section
        className="relative overflow-hidden py-16 sm:py-20 md:py-24"
        style={{
          background: "linear-gradient(135deg, #091a3e 0%, #0e2453 45%, #046E65 100%)",
        }}
      >
        {/* Radial centre glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 110%, rgba(5,139,127,0.35) 0%, transparent 65%)",
          }}
        />
        {/* Top-right teal blob */}
        <div
          className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(15,174,158,0.18) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
        {/* Bottom-left navy blob */}
        <div
          className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(14,36,83,0.40) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.10]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Tag */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0}
            className="mb-4"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-[13px] font-semibold"
              style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              سوق العمل
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.08}
            className="font-extrabold text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)" }}
          >
            فرص العمل والتوظيف
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.16}
            className="mt-3 text-[15px] sm:text-[16px] leading-relaxed max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.68)" }}
          >
            ابحث عن فرصة عمل أو أعلن عن وظيفة شاغرة
          </motion.p>
        </div>
      </section>

      {/* ── Stats + Actions bar ── */}
      <div className="bg-white" style={{ borderBottom: "1px solid rgba(14,36,83,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.26}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-wrap"
          >
            {/* Stat pills */}
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl shrink-0"
                  style={{
                    background: "rgba(14,36,83,0.04)",
                    border: "1px solid rgba(14,36,83,0.09)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `rgba(5,139,127,0.10)`, border: "1px solid rgba(5,139,127,0.18)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: stat.color }} strokeWidth={1.8} />
                  </div>
                  <div className="text-right">
                    <span className="text-[15px] font-black" style={{ color: "#0e2453" }}>
                      {stat.value}
                    </span>
                    <span className="text-[12px] mr-1.5" style={{ color: "rgba(14,36,83,0.52)" }}>
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Divider */}
            <div
              className="hidden sm:block self-stretch w-px"
              style={{ background: "rgba(14,36,83,0.10)" }}
            />

            {/* Action buttons */}
            <div className="flex items-center gap-2.5 sm:mr-auto flex-wrap">
              <button
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full font-bold text-[13px] text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
                  boxShadow: "0 4px 18px rgba(5,139,127,0.38)",
                }}
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                أعلن عن وظيفة
              </button>
              <button
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full font-semibold text-[13px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                style={{
                  background: "rgba(14,36,83,0.05)",
                  border: "1px solid rgba(14,36,83,0.18)",
                  color: "#0e2453",
                }}
              >
                <UserPlus className="w-3.5 h-3.5" strokeWidth={1.8} />
                سجل كباحث عن عمل
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
