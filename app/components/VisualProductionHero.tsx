"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, UserPlus, Play, Aperture, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.60, ease: "easeOut" as const, delay: d },
  }),
};

export default function VisualProductionHero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "88vh", display: "flex", alignItems: "center" }}
      dir="rtl"
    >
      {/* ── Cinematic dark background ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, #030c1a 0%, #091a3e 38%, #0a2a28 72%, #041612 100%)",
        }}
      />

      {/* Studio spotlight — top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 55% at 50% 0%, rgba(15,174,158,0.22) 0%, transparent 70%)",
          filter: "blur(1px)",
        }}
      />
      {/* Right warm glow */}
      <div
        className="absolute top-1/3 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(5,139,127,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      {/* Left cool glow */}
      <div
        className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14,36,83,0.55) 0%, transparent 65%)",
          filter: "blur(52px)",
        }}
      />

      {/* Subtle film-grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.80) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating aperture rings (decorative) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[12%] right-[6%] w-32 h-32 rounded-full pointer-events-none hidden lg:block"
        style={{ border: "1px solid rgba(15,174,158,0.12)" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[15%] left-[8%] w-44 h-44 rounded-full pointer-events-none hidden lg:block"
        style={{ border: "1px dashed rgba(5,139,127,0.10)" }}
      />
      <div className="absolute top-[20%] right-[14%] w-3 h-3 rounded-full hidden lg:block" style={{ background: "rgba(15,174,158,0.35)", boxShadow: "0 0 12px rgba(15,174,158,0.50)" }} />
      <div className="absolute bottom-[25%] left-[18%] w-2 h-2 rounded-full hidden lg:block" style={{ background: "rgba(255,255,255,0.25)" }} />
      <div className="absolute top-[40%] right-[4%]  w-1.5 h-1.5 rounded-full hidden lg:block" style={{ background: "rgba(15,174,158,0.45)" }} />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left text column */}
        <div className="flex-1 text-right">
          {/* Sub-label */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}
            className="mb-4"
          >
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase"
              style={{
                background: "rgba(15,174,158,0.14)",
                border: "1px solid rgba(15,174,158,0.28)",
                color: "#0FAE9E",
                letterSpacing: "0.08em",
              }}
            >
              <Aperture className="w-3 h-3" strokeWidth={2} />
              الإنتاج المرئي — Subsection 1
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.09}
            className="font-extrabold text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}
          >
            Photography{" "}
            <span
              style={{
                background: "linear-gradient(110deg, #0FAE9E 10%, #058B7F 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              & advertising
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.18}
            className="mt-5 text-[15px] sm:text-[16px] leading-[1.85] max-w-xl"
            style={{ color: "rgba(255,255,255,0.60)" }}
          >
            تصوير المنتجات والتصوير التجاري وتوثيق الفعاليات بتوجيه سينمائي واحترافي عالي الجودة —
            Product photography, commercial photography, and event documentation with cinematic
            direction and high production value quality.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.26}
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <button
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full font-bold text-[14px] text-white transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
                boxShadow: "0 6px 28px rgba(5,139,127,0.45)",
              }}
            >
              <UserPlus className="w-4 h-4" strokeWidth={2} />
              انضم كمتخصص تصوير
            </button>
            <button
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold text-[14px] transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Play className="w-3.5 h-3.5 fill-current" strokeWidth={0} />
              شاهد أعمالنا
            </button>
          </motion.div>
        </div>

        {/* Right — Glass card panel */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.14}
          className="w-full lg:w-[400px] shrink-0"
        >
          <div
            className="relative rounded-3xl overflow-hidden p-7"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.08) inset",
            }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(15,174,158,0.14) 0%, transparent 60%)" }}
            />

            {/* Camera icon header */}
            <div className="relative z-10 flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
                  boxShadow: "0 4px 20px rgba(5,139,127,0.40)",
                }}
              >
                <Camera className="w-6 h-6 text-white" strokeWidth={1.8} />
              </div>
              <div className="text-right">
                <p className="font-bold text-white text-[14px]">الإنتاج المرئي</p>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.50)" }}>Visual Production Platform</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="relative z-10 grid grid-cols-2 gap-3 mb-6">
              {[
                { value: "200+",  label: "مشروع منجز" },
                { value: "50+",   label: "مبدع موثق"  },
                { value: "98%",   label: "رضا العملاء" },
                { value: "4.9★",  label: "متوسط التقييم" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl px-3.5 py-3 text-right"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <p className="text-[18px] font-black text-white leading-none">{s.value}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.48)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Services list */}
            <div className="relative z-10 space-y-2.5">
              {[
                "تصوير المنتجات التجاري",
                "توثيق الفعاليات السينمائي",
                "UGC — محتوى المستخدمين",
                "حملات المؤثرين الرقمية",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#0FAE9E", boxShadow: "0 0 6px rgba(15,174,158,0.60)" }}
                  />
                  <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.70)" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Bottom glow strip */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(15,174,158,0.45), transparent)" }}
            />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full"
            style={{
              background: "rgba(5,139,127,0.90)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(15,174,158,0.45)",
              boxShadow: "0 4px 18px rgba(5,139,127,0.35)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.8} />
            <span className="text-[11px] font-bold text-white whitespace-nowrap">إنتاج احترافي</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
