"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, PlayCircle, Users2, TrendingUp } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

const STATS = [
  { icon: GraduationCap, value: "18",    label: "دورة متاحة"   },
  { icon: Users2,        value: "3,200+", label: "طالب مسجّل"  },
  { icon: PlayCircle,    value: "520+",   label: "درس فيديو"    },
  { icon: TrendingUp,    value: "4.8 ★",  label: "متوسط التقييم" },
];

export default function CoursesHero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} dir="rtl">
      {/* ── Hero band ── */}
      <section
        className="relative overflow-hidden py-16 sm:py-20 md:py-24"
        style={{
          background: "linear-gradient(135deg, #091a3e 0%, #0e2453 45%, #046E65 100%)",
        }}
      >
        {/* Radial glow — centre-bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(5,139,127,0.38) 0%, transparent 60%)",
          }}
        />

        {/* Large ambient circle — top-right */}
        <div
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(15,174,158,0.14) 0%, transparent 65%)",
            filter: "blur(64px)",
          }}
        />

        {/* Small ambient circle — bottom-left */}
        <div
          className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(5,139,127,0.22) 0%, transparent 65%)",
            filter: "blur(48px)",
          }}
        />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.10,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative floating rings */}
        <div
          className="absolute top-10 left-[8%] w-20 h-20 rounded-full pointer-events-none hidden sm:block"
          style={{
            border: "1.5px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 40px rgba(15,174,158,0.10)",
          }}
        />
        <div
          className="absolute bottom-12 right-[10%] w-32 h-32 rounded-full pointer-events-none hidden sm:block"
          style={{ border: "1.5px solid rgba(255,255,255,0.07)" }}
        />
        <div
          className="absolute top-1/3 left-[18%] w-10 h-10 rounded-full pointer-events-none hidden lg:block"
          style={{
            background: "rgba(15,174,158,0.15)",
            backdropFilter: "blur(4px)",
          }}
        />
        <div
          className="absolute top-1/4 right-[22%] w-6 h-6 rounded-full pointer-events-none hidden lg:block"
          style={{ background: "rgba(255,255,255,0.10)" }}
        />

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
              <GraduationCap className="w-3.5 h-3.5" strokeWidth={2} />
              منصة التعلم الرقمي
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.08}
            className="font-extrabold text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 4.8vw, 3.3rem)" }}
          >
            الدورات التدريبية
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.16}
            className="mt-3 text-[15px] sm:text-[16px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.68)" }}
          >
            طور مهاراتك مع أفضل الدورات في التسويق الرقمي والإعلانات
          </motion.p>

          {/* Count pill */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.22}
            className="mt-5 flex justify-center"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-bold"
              style={{
                background: "rgba(15,174,158,0.20)",
                border: "1px solid rgba(15,174,158,0.35)",
                color: "#fff",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#0FAE9E", boxShadow: "0 0 6px #0FAE9E" }}
              />
              18 دورة متاحة
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div
        className="bg-white"
        style={{ borderBottom: "1px solid rgba(14,36,83,0.07)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.30}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 sm:divide-x sm:divide-x-reverse divide-[rgba(14,36,83,0.08)]"
          >
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-3 py-1.5 sm:px-6"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(5,139,127,0.09)", border: "1px solid rgba(5,139,127,0.16)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#058B7F" }} strokeWidth={1.8} />
                </div>
                <div className="text-right">
                  <span className="text-[15px] font-black" style={{ color: "#0e2453" }}>
                    {value}
                  </span>
                  <span className="text-[11.5px] mr-1.5" style={{ color: "rgba(14,36,83,0.48)" }}>
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
