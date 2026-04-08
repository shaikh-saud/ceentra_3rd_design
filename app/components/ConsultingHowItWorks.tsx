"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserSearch, CalendarDays, ShieldCheck, Video } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: UserSearch,
    title: "اختر المستشار",
    description: "تصفح قائمة مستشارينا الموثقين واختر الخبير الذي يناسب مجال عملك واحتياجاتك.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "احجز موعد",
    description: "اختر الوقت المناسب لك من جدول المستشار وأكّد حجز الجلسة مباشرة من المنصة.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "ادفع بأمان",
    description: "اسدد رسوم الجلسة عبر بوابة دفع آمنة ومشفرة. المال محجوز حتى إتمام الجلسة.",
  },
  {
    number: "04",
    icon: Video,
    title: "ابدأ الجلسة",
    description: "انضم إلى جلستك عبر الفيديو في الوقت المحدد وابدأ رحلتك نحو النجاح.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: d },
  }),
};

function Step({
  step,
  index,
  isLast,
}: {
  step: typeof STEPS[0];
  index: number;
  isLast: boolean;
}) {
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col items-center text-center flex-1">
      {/* Connector line (desktop) — sits between steps */}
      {!isLast && (
        <div
          className="hidden md:block absolute top-8 right-[-50%] w-full h-px pointer-events-none z-0"
          style={{
            background: "linear-gradient(90deg, rgba(15,174,158,0.35) 0%, rgba(14,36,83,0.15) 100%)",
            backgroundSize: "12px 2px",
          }}
        />
      )}

      {/* Number + Icon circle */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        custom={index * 0.12 + 0.1}
        whileHover={{ scale: 1.10 }}
        transition={{ type: "spring", stiffness: 340, damping: 20 }}
        className="relative z-10 mb-5 flex flex-col items-center"
      >
        {/* Step number */}
        <span
          className="text-[11px] font-black mb-2 tracking-widest"
          style={{ color: "rgba(5,139,127,0.60)" }}
        >
          {step.number}
        </span>

        {/* Circle */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
            boxShadow: "0 6px 24px rgba(5,139,127,0.32), 0 2px 8px rgba(5,139,127,0.18)",
          }}
        >
          <Icon className="w-7 h-7 text-white" strokeWidth={1.7} />
        </div>

        {/* Connector line (mobile) */}
        {!isLast && (
          <div
            className="md:hidden mt-4 w-px h-8"
            style={{ background: "linear-gradient(180deg, rgba(5,139,127,0.40) 0%, rgba(5,139,127,0.10) 100%)" }}
          />
        )}
      </motion.div>

      {/* Text */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        custom={index * 0.12 + 0.22}
      >
        <h3
          className="font-extrabold text-[15.5px] mb-2"
          style={{ color: "#0e2453" }}
        >
          {step.title}
        </h3>
        <p
          className="text-[13px] leading-[1.75] max-w-[200px] mx-auto"
          style={{ color: "rgba(14,36,83,0.52)" }}
        >
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function ConsultingHowItWorks() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden"
      style={{ background: "#ffffff" }}
      dir="rtl"
    >
      {/* Subtle gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(5,139,127,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}
            className="mb-3"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold"
              style={{
                background: "rgba(14,36,83,0.06)",
                border: "1px solid rgba(14,36,83,0.14)",
                color: "#0e2453",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#058B7F" }} />
              4 خطوات فقط
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.08}
            className="font-extrabold leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", color: "#0e2453" }}
          >
            كيف تعمل الاستشارات؟
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.14}
            className="mt-3 text-[14.5px]"
            style={{ color: "rgba(14,36,83,0.52)" }}
          >
            احجز جلستك الاستشارية في دقائق وابدأ رحلة التطوير
          </motion.p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-start md:items-start gap-10 md:gap-4">
          {STEPS.map((step, i) => (
            <Step key={step.number} step={step} index={i} isLast={i === STEPS.length - 1} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.55}
          className="mt-14 text-center"
        >
          <button
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full font-bold text-[14px] text-white transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
              boxShadow: "0 6px 24px rgba(5,139,127,0.40)",
            }}
          >
            ابحث عن مستشار الآن
          </button>
        </motion.div>
      </div>
    </section>
  );
}
