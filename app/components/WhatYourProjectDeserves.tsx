"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const POINTS = [
  "متجر يبيع فعلاً",
  "هوية تُحترم",
  "إعلانات تجلب العملاء",
  "بداية صحيحة",
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

export default function WhatYourProjectDeserves() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/7 text-primary text-[13px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              مشروعك يستحق
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.06}
            className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-extrabold text-text-primary leading-snug"
          >
            مشروعك يستحق أكثر من مجرد تصميم
          </motion.h2>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left — Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
            className="group w-full lg:w-[50%] shrink-0"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_6px_28px_rgba(0,0,0,0.08)] transition-shadow duration-500 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
              <Image
                src="/bg2.png"
                alt="ريادة الأعمال في السعودية"
                width={720}
                height={480}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                quality={85}
              />
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="flex-1 text-center lg:text-right">
            {/* Checklist */}
            <div className="flex flex-col gap-5 sm:gap-6 mb-8 sm:mb-10 max-w-sm mx-auto lg:mx-0">
              {POINTS.map((text, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={0.2 + i * 0.09}
                  className="flex items-center gap-4"
                >
                  <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary shrink-0">
                    <Check
                      className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white"
                      strokeWidth={2.5}
                    />
                  </span>
                  <span className="text-[18px] sm:text-[20px] md:text-[21px] font-bold text-text-primary">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Supporting line */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.58}
              className="text-[15px] sm:text-[17px] md:text-[18px] font-medium text-text-secondary leading-relaxed mb-7 sm:mb-8"
            >
              وهذا بالضبط ما نبنيه في{" "}
              <span className="text-primary font-bold">Brandgo</span>.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.66}
              className="flex justify-center lg:justify-start"
            >
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-bold text-white rounded-full bg-primary shadow-[0_4px_16px_rgba(5,139,127,0.25)] transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_8px_28px_rgba(5,139,127,0.35)]"
              >
                ابدأ مشروعك مع Brandgo
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
