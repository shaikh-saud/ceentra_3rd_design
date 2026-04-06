"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Check, Palette } from "lucide-react";

const INCLUDES = [
  "تصميم الهوية",
  "تصميم المتجر",
  "تصميم الإعلانات",
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

export default function SolutionDesign() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-bg-light lg:sticky lg:top-0 lg:z-3 lg:h-screen lg:flex lg:items-center lg:py-0 lg:shadow-[0_-30px_80px_rgba(0,0,0,0.15)]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
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
                <Palette className="w-3.5 h-3.5" strokeWidth={2} />
                التصميم والهوية
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.06}
              className="text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[42px] font-extrabold text-text-primary leading-snug mb-3 sm:mb-4 md:mb-5"
            >
              نصمم هوية تليق بمشروعك
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.12}
              className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-text-secondary leading-[1.8] mb-5 sm:mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0"
            >
              <p>الهوية هي أول رسالة يراها العميل.</p>
              <p className="font-semibold text-text-primary mt-2">
                نحرص أنها تكون رسالة قوية.
              </p>
            </motion.div>

            <div className="flex flex-col gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8 max-w-md mx-auto lg:mx-0">
              {INCLUDES.map((text, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={0.2 + i * 0.07}
                  className="flex items-center gap-2.5 sm:gap-3"
                >
                  <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" strokeWidth={2.5} />
                  </span>
                  <span className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium text-text-primary">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.48}
              className="flex justify-center lg:justify-start"
            >
              <motion.a
                href="/contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-[13px] sm:text-[14px] md:text-[15px] font-bold text-white rounded-full bg-primary shadow-[0_4px_16px_rgba(5,139,127,0.25)] transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_8px_28px_rgba(5,139,127,0.35)]"
              >
                صمم هويتك معنا
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
                src="/ui-ux.png"
                alt="التصميم والهوية"
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
