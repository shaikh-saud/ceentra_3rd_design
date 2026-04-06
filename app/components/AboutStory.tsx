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

export default function AboutStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-10 sm:py-14 md:py-20 lg:py-24 xl:py-28 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-10 lg:gap-16 xl:gap-20">
          {/* Video side */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="w-full max-w-xs sm:max-w-sm md:max-w-none md:w-4/12 lg:w-5/12"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-[4/5] sm:aspect-square md:aspect-[3/4] object-cover"
              >
                <source src="/robot.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.12}
            className="w-full md:w-8/12 lg:w-7/12 text-center md:text-right"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/7 text-primary text-[12px] sm:text-[13px] font-semibold mb-2 sm:mb-3 md:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              من نحن
            </div>

            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[34px] xl:text-[38px] font-extrabold text-text-primary leading-snug mb-4 sm:mb-5 md:mb-6">
              عن Brandgo
            </h2>

            <div className="space-y-3 sm:space-y-4 md:space-y-5 max-w-md sm:max-w-lg mx-auto md:mx-0">
              <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-primary font-bold leading-relaxed">
                تأسس Brandgo بفكرة بسيطة.
              </p>

              <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-text-secondary leading-[1.9]">
                كثير من أصحاب المشاريع لديهم أفكار قوية،
                <br />
                لكنهم يحتاجون الشريك الصحيح لتنفيذها بطريقة احترافية.
              </p>

              <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-text-secondary leading-[1.9]">
                في Brandgo لا نقدم مجرد خدمات تصميم أو إعلانات،
                <br />
                بل نبني نظامًا متكاملًا يساعد مشروعك على الظهور بشكل احترافي
                <br />
                وجذب العملاء الحقيقيين.
              </p>

              <p className="text-[14px] sm:text-[15px] md:text-[17px] lg:text-[18px] font-extrabold text-primary leading-relaxed">
                نحن نؤمن أن البداية الصحيحة هي ما يصنع الفرق.
              </p>

              <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-text-secondary leading-[1.9]">
                ولهذا نعمل معك خطوة بخطوة
                <br />
                لنحول فكرتك إلى مشروع حقيقي قادر على النمو.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
