"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FeatureSteps } from "@/components/ui/feature-section";

const PROCESS_STEPS = [
  {
    step: "الخطوة 1",
    title: "نفهمك",
    content: "نجلس معك، نفهم فكرتك، أهدافك، ورؤيتك.",
    image: "/step1.png",
  },
  {
    step: "الخطوة 2",
    title: "نبني مشروعك",
    content: "ننشئ المتجر، نصمم الهوية، ونجهز كل شيء لإطلاق مشروعك.",
    image: "/step2.png",
  },
  {
    step: "الخطوة 3",
    title: "نطلقك للسوق",
    content: "نطلق حملات إعلانية تستهدف عملاءك الحقيقيين.",
    image: "/step3.jpeg",
  },
  {
    step: "الخطوة 4",
    title: "نكبر معك",
    content: "نراقب النتائج، نحلل الأداء، ونساعدك تحقق نمو مستمر.",
    image: "/step4.jpeg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-we-work"
      ref={ref}
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-primary"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[13px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              آلية العمل
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.06}
            className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-extrabold text-white leading-snug"
          >
            رحلتك معنا، خطوة بخطوة
          </motion.h2>
        </div>

        {/* Feature Steps */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.15}
        >
          <FeatureSteps
            features={PROCESS_STEPS}
            title=""
            autoPlayInterval={4000}
            className="p-0 md:p-0"
            variant="dark"
          />
        </motion.div>
      </div>
    </section>
  );
}
