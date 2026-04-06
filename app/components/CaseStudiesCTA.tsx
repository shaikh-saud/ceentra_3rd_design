"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

export default function CaseStudiesCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div
        className="relative mx-auto max-w-5xl rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{ background: "#174b47" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.1]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 45% 55% at 30% 40%, rgba(5,139,127,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 px-5 sm:px-8 md:px-10 lg:px-14 py-10 sm:py-12 md:py-16 lg:py-20 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[40px] font-extrabold text-white leading-snug mb-4 sm:mb-5"
          >
            خلنا نحول فكرتك إلى مشروع حقيقي
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.12}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-bold text-primary rounded-full bg-white shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,255,255,0.25)]"
            >
              ابدأ الآن مع Brandigo
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
