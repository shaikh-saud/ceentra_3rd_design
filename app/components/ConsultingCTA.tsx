"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, CheckCircle, Star, Users2 } from "lucide-react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: d },
  }),
};

const PERKS = [
  "وصول لمئات العملاء المحتملين",
  "جدول مواعيد مرن بالكامل",
  "مدفوعاتك محمية ومضمونة",
  "ملف احترافي موثق ومميز",
];

const TRUST_STATS = [
  { icon: Star,   value: "4.9",  label: "تقييم متوسط"   },
  { icon: Users2, value: "50+",  label: "مستشار نشط"     },
];

export default function ConsultingCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24"
      style={{ background: "#F7F9F9" }}
      dir="rtl"
    >
      <div className="px-4 sm:px-6">
        <div
          className="relative overflow-hidden w-full max-w-screen-lg mx-auto rounded-3xl py-14 md:py-20 px-8 md:px-16"
          style={{ background: "linear-gradient(135deg, #091a3e 0%, #0e2453 50%, #046E65 100%)" }}
        >
          {/* Animated grid overlays */}
          <AnimatedGridPattern
            numSquares={36}
            maxOpacity={0.09}
            duration={3}
            className={cn(
              "[mask-image:radial-gradient(540px_circle_at_right,white,rgba(255,255,255,0.55),transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
            style={{ fill: "rgba(255,255,255,0.06)", stroke: "rgba(255,255,255,0.06)" }}
          />
          <AnimatedGridPattern
            numSquares={36}
            maxOpacity={0.09}
            duration={3}
            className={cn(
              "[mask-image:radial-gradient(540px_circle_at_top_left,white,rgba(255,255,255,0.55),transparent)]",
              "inset-x-0 inset-y-0 h-[200%] skew-y-12"
            )}
            style={{ fill: "rgba(255,255,255,0.06)", stroke: "rgba(255,255,255,0.06)" }}
          />

          {/* Teal glow blob */}
          <div
            className="absolute -top-16 -left-16 w-60 h-60 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(15,174,158,0.28) 0%, transparent 70%)",
              filter: "blur(44px)",
            }}
          />
          <div
            className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(5,139,127,0.22) 0%, transparent 70%)",
              filter: "blur(36px)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5 text-center">
            {/* Tag */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-[12px] font-semibold"
                style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                للخبراء والمستشارين
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.08}
              className="font-extrabold text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.6rem, 3.8vw, 2.8rem)" }}
            >
              هل أنت خبير في التسويق؟
            </motion.h3>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.15}
              className="text-[15px] leading-relaxed max-w-xl"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              انضم كمستشار وساعد الآخرين في تطوير أعمالهم — ابنِ مسيرتك المهنية وحقق دخلاً
              مستقلاً من خبرتك
            </motion.p>

            {/* Perks grid */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.22}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-1"
            >
              {PERKS.map((perk) => (
                <span
                  key={perk}
                  className="flex items-center gap-2 text-[13px]"
                  style={{ color: "rgba(255,255,255,0.82)" }}
                >
                  <CheckCircle
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: "#0FAE9E" }}
                    strokeWidth={2.2}
                  />
                  {perk}
                </span>
              ))}
            </motion.div>

            {/* Trust mini-stats */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.28}
              className="flex items-center gap-5 flex-wrap justify-center"
            >
              {TRUST_STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)" }}
                >
                  <Icon className="w-3.5 h-3.5 text-white" strokeWidth={1.8} />
                  <span className="text-[13px] font-black text-white">{value}</span>
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.58)" }}>{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.35}
              className="mt-3 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center"
            >
              <button
                className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-full font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group"
                style={{
                  background: "#ffffff",
                  color: "#0e2453",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
                  height: "52px",
                }}
              >
                سجل كمستشار
                <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-full font-semibold text-[14px] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  height: "52px",
                }}
              >
                اعرف المزيد
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
