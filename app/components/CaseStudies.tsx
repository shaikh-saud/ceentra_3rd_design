"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Store, Rocket } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface CaseStudy {
  icon: React.ElementType;
  title: string;
  before: string;
  after: string;
  beforeImage: string;
  afterImage: string;
}

const CASES: CaseStudy[] = [
  {
    icon: Store,
    title: "المشروع: متجر إلكتروني",
    before: "كان مجرد فكرة بدون متجر",
    after: "متجر احترافي جاهز للعمل",
    beforeImage: "/before-store.png",
    afterImage: "/after-store.png",
  },
  {
    icon: Rocket,
    title: "المشروع: مشروع ناشئ",
    before: "لا يوجد حضور رقمي",
    after: "هوية قوية + إطلاق رقمي كامل",
    beforeImage: "/before-brandigo.png",
    afterImage: "/after-brandigo.png",
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

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-10 sm:py-14 md:py-20 lg:py-24 xl:py-28 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-14 sm:gap-18 md:gap-20 lg:gap-24">
          {CASES.map((cs, idx) => {
            const Icon = cs.icon;
            const reversed = idx % 2 !== 0;

            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.1 + idx * 0.15}
                className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 sm:gap-10 md:gap-10 lg:gap-14 xl:gap-16`}
              >
                {/* Slider side */}
                <div className="w-full md:w-1/2 lg:flex-1 max-w-[520px] md:max-w-none">
                  <BeforeAfterSlider
                    beforeImage={cs.beforeImage}
                    afterImage={cs.afterImage}
                    className="shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
                  />
                </div>

                {/* Text side */}
                <div className="w-full md:w-1/2 lg:flex-1 text-center md:text-right">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/7 text-primary text-[12px] sm:text-[13px] font-semibold mb-3 sm:mb-4">
                    <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                    قصة نجاح {idx + 1}
                  </div>

                  <h3 className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[30px] xl:text-[32px] font-extrabold text-text-primary leading-snug mb-4 sm:mb-5">
                    {cs.title}
                  </h3>

                  <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6 lg:mb-7 max-w-sm sm:max-w-md mx-auto md:mx-0">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <span className="shrink-0 mt-1 sm:mt-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400" />
                      <div>
                        <span className="text-[11px] sm:text-[12px] font-bold text-red-500 block mb-0.5">
                          قبل Brandigo
                        </span>
                        <p className="text-[13px] sm:text-[14px] md:text-[15px] text-text-secondary leading-relaxed">
                          {cs.before}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <span className="shrink-0 mt-1 sm:mt-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
                      <div>
                        <span className="text-[11px] sm:text-[12px] font-bold text-green-600 block mb-0.5">
                          بعد Brandigo
                        </span>
                        <p className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-text-primary leading-relaxed">
                          {cs.after}
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.a
                    href="#contact"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 text-[13px] sm:text-[14px] font-bold text-primary rounded-full border-2 border-primary/20 hover:bg-primary/5 transition-all duration-300"
                  >
                    اقرأ التفاصيل
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
