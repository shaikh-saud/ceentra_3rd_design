"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Target } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

const CARDS = [
  {
    icon: Eye,
    heading: "رؤيتنا",
    body: "أن نكون الشريك الرقمي الأول لأصحاب المشاريع في السعودية،\nوأن نساعد رواد الأعمال على إطلاق مشاريعهم بطريقة احترافية\nوتحقيق نمو حقيقي في السوق.",
    accent: "from-primary/4 to-primary/8",
  },
  {
    icon: Target,
    heading: "رسالتنا",
    body: "نساعد المشاريع على النمو بثقة\nمن خلال بناء متاجر احترافية،\nوإطلاق استراتيجيات تسويق فعالة،\nوصناعة هوية قوية تعكس قيمة المشروع.",
    accent: "from-primary/8 to-primary/4",
  },
];

export default function AboutMissionVision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-10 sm:py-14 md:py-20 lg:py-24 xl:py-28 bg-bg-light">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-8 lg:gap-10">
          {CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.08 + idx * 0.12}
                className="group relative rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-7 md:p-9 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-shadow duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" strokeWidth={1.8} />
                  </div>

                  <h3 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-extrabold text-text-primary leading-snug mb-2 sm:mb-3 md:mb-4">
                    {card.heading}
                  </h3>

                  <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-text-secondary leading-[1.9] whitespace-pre-line">
                    {card.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
