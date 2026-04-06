"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Store,
  BadgeCheck,
  Target,
  BarChart3,
  ChevronLeft,
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "نبني الأساس",
    desc: "نصمم وننشئ متجرك الإلكتروني بتجربة تخلي العميل يشعر بالثقة من أول زيارة.\nكل صفحة، كل تفصيلة، مصممة لهدف واحد: تحويل الزائر إلى عميل.",
    icon: Store,
  },
  {
    num: "02",
    title: "نصنع الهوية",
    desc: "نصمم هوية تعبر عنك،\nوهوية تعطي انطباع أنك مشروع يُؤخذ بجدية.",
    icon: BadgeCheck,
  },
  {
    num: "03",
    title: "نجلب العملاء",
    desc: "نطلق حملات إعلانية مدروسة\nعلى Google و Meta،\nونوصل لمين يبحث عنك فعلاً.",
    icon: Target,
  },
  {
    num: "04",
    title: "نطور الأداء",
    desc: "نراقب الأداء، نحلل النتائج، ونحسن الحملات باستمرار،\nلأن النمو الحقيقي يحتاج متابعة مستمرة.",
    icon: BarChart3,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

export default function BrandgoSystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-bg-light"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(5,139,127,0.04) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/7 text-primary text-[13px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              نظام Brandgo
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.08}
            className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] font-extrabold text-text-primary leading-snug"
          >
            كيف نحول فكرتك إلى مشروع جاهز للنمو
          </motion.h2>
        </div>

        {/* Steps Row — uses flex so we can interleave cards and connectors */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-stretch gap-5 sm:gap-5 lg:gap-0 mb-12 sm:mb-14 lg:mb-16">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;

            return (
              <div key={step.num} className="contents">
                {/* Card */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={0.15 + i * 0.1}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col flex-1 bg-white border border-gray-100 hover:border-primary/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(5,139,127,0.10)] cursor-default"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/6 group-hover:bg-primary/12 flex items-center justify-center transition-colors duration-300">
                      <Icon
                        className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-primary/70 group-hover:text-primary transition-colors duration-300"
                        strokeWidth={1.6}
                      />
                    </div>

                    <span
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white text-[12px] font-bold tracking-wide"
                      dir="ltr"
                    >
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-[17px] sm:text-[18px] font-bold text-text-primary mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-[13px] sm:text-[14px] leading-[1.8] text-text-secondary whitespace-pre-line mt-auto">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Flow connector — desktop only, sits between cards as its own flex item */}
                {!isLast && (
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={0.3 + i * 0.1}
                    className="hidden lg:flex items-center justify-center shrink-0 w-10"
                  >
                    <div className="flex items-center">
                      <span className="block w-2 h-[2px] bg-primary/15 rounded-full" />
                      <div className="w-6 h-6 rounded-full bg-white border-[1.5px] border-primary/20 flex items-center justify-center shadow-[0_2px_6px_rgba(5,139,127,0.08)]">
                        <ChevronLeft
                          className="w-3 h-3 text-primary/40"
                          strokeWidth={2.5}
                        />
                      </div>
                      <span className="block w-2 h-[2px] bg-primary/15 rounded-full" />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.7}
          className="text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-bold text-white rounded-full bg-primary shadow-[0_4px_16px_rgba(5,139,127,0.25)] transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_8px_28px_rgba(5,139,127,0.35)]"
          >
            اكتشف كيف نقدر نساعدك
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
