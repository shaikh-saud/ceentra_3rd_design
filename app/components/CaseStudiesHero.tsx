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

export default function CaseStudiesHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative py-10 sm:py-14 md:py-18 lg:py-20 xl:py-24 bg-primary overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(15,174,158,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="mb-2 sm:mb-3"
        >
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 text-white text-[12px] sm:text-[13px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            قصص النجاح
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.08}
          className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[44px] font-extrabold text-white leading-tight"
        >
          مشاريع بدأت بفكرة… وأصبحت واقع
        </motion.h1>
      </div>
    </section>
  );
}
