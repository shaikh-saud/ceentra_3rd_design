"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { TrendingUp, BarChart3, Users, Target, RefreshCcw } from "lucide-react";

const PILLARS = [
  { icon: Target, text: "استهداف العملاء المناسبين" },
  { icon: BarChart3, text: "تحليل البيانات والأداء" },
  { icon: RefreshCcw, text: "تحسين مستمر للحملات" },
  { icon: Users, text: "بناء قاعدة عملاء حقيقية" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

export default function SolutionMarketing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-white lg:sticky lg:top-0 lg:z-4 lg:h-screen lg:flex lg:items-center lg:py-0 lg:shadow-[0_-30px_80px_rgba(0,0,0,0.15)]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-right order-2 lg:order-1">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="mb-3 sm:mb-4"
            >
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/7 text-primary text-[12px] sm:text-[13px] font-semibold">
                <TrendingUp className="w-3.5 h-3.5" strokeWidth={2} />
                التسويق الرقمي
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.06}
              className="text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[42px] font-extrabold text-text-primary leading-snug mb-3 sm:mb-4 md:mb-5"
            >
              نبني نظام يجلب لك العملاء باستمرار
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.12}
              className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-text-secondary leading-[1.8] mb-5 sm:mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0"
            >
              <p>هدفنا مو مجرد إطلاق مشروعك.</p>
              <p className="font-semibold text-text-primary mt-2">
                هدفنا نساعدك تنميه.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8 max-w-md mx-auto lg:mx-0">
              {PILLARS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={0.2 + i * 0.07}
                    className="flex items-center gap-2.5 sm:gap-3 bg-bg-light rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3"
                  >
                    <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 shrink-0">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" strokeWidth={2} />
                    </span>
                    <span className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-medium text-text-primary">
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.52}
              className="flex justify-center lg:justify-start"
            >
              <motion.a
                href="/contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-[13px] sm:text-[14px] md:text-[15px] font-bold text-white rounded-full bg-primary shadow-[0_4px_16px_rgba(5,139,127,0.25)] transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_8px_28px_rgba(5,139,127,0.35)]"
              >
                ابدأ رحلة النمو
              </motion.a>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
            className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-none order-1 lg:order-2"
          >
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/digital-marketing.png"
                alt="التسويق الرقمي"
                width={720}
                height={480}
                className="w-full h-auto object-cover"
                quality={90}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
