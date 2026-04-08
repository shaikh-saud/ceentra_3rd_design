"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

const PERKS = [
  "الوصول لمئات العملاء الجاهزين",
  "ملف شركة موثق ومميز",
  "تقارير أداء تفصيلية",
];

export default function MarketingCompaniesCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-24" style={{ background: "#F7F9F9" }} dir="rtl">
      <div className="px-4 sm:px-6">
        <div
          className="relative overflow-hidden w-full max-w-screen-lg mx-auto rounded-3xl py-14 md:py-20 px-8 md:px-16 shadow-2xl"
          style={{ background: "#058B7F" }}
        >
          {/* Animated grid patterns */}
          <AnimatedGridPattern
            numSquares={38}
            maxOpacity={0.10}
            duration={3}
            className={cn(
              "[mask-image:radial-gradient(520px_circle_at_right,white,rgba(255,255,255,0.6),transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
            style={{ fill: "rgba(255,255,255,0.08)", stroke: "rgba(255,255,255,0.08)" }}
          />
          <AnimatedGridPattern
            numSquares={38}
            maxOpacity={0.10}
            duration={3}
            className={cn(
              "[mask-image:radial-gradient(520px_circle_at_top_left,white,rgba(255,255,255,0.6),transparent)]",
              "inset-x-0 inset-y-0 h-[200%] skew-y-12"
            )}
            style={{ fill: "rgba(255,255,255,0.08)", stroke: "rgba(255,255,255,0.08)" }}
          />

          {/* Glow blobs */}
          <div
            className="absolute -top-12 -left-12 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(15,174,158,0.30) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(4,110,101,0.25) 0%, transparent 70%)",
              filter: "blur(36px)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            {/* Tag */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold text-white"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                للشركات
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.08}
              className="font-extrabold text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 3.8vw, 2.6rem)" }}
            >
              هل أنت شركة تسويق؟
            </motion.h3>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.16}
              className="text-[15px] leading-relaxed max-w-xl"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              انضم إلى منصة سنترا واحصل على عملاء جدد — أنشئ ملفك التعريفي الموثق اليوم
              وابدأ في استقبال الطلبات.
            </motion.p>

            {/* Perks */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.22}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-1"
            >
              {PERKS.map((perk) => (
                <span
                  key={perk}
                  className="flex items-center gap-1.5 text-[13px]"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(255,255,255,0.70)" }} strokeWidth={2} />
                  {perk}
                </span>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.30}
              className="mt-4 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center"
            >
              <button
                className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-full font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group"
                style={{
                  background: "#ffffff",
                  color: "#058B7F",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                انضم الآن
                <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              </button>

              <button
                className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-full font-semibold text-[14px] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.28)",
                }}
              >
                تعرف على المزايا
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
