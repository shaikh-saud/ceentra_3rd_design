"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StaggerTestimonials, TestimonialItem } from "@/components/ui/stagger-testimonials";

// ─── Arabic testimonials ───────────────────────────────────────────────────────
const TESTIMONIALS: TestimonialItem[] = [
  {
    tempId: 0,
    testimonial: "من أفضل المنصات التي تعاملت معها. وجدت شريكي التسويقي المثالي في أقل من يوم واحد وأطلقنا حملتنا بنجاح.",
    by: "محمد الغامدي",
    role: "مدير تنفيذي · شركة نمو",
    imgSrc: "https://i.pravatar.cc/150?img=11",
    rating: 5,
  },
  {
    tempId: 1,
    testimonial: "المنصة وفّرت عليّ الكثير من الوقت. بدلاً من البحث العشوائي وجدت كل شيء في مكان واحد بعروض واضحة وشفافة.",
    by: "عبدالله الحربي",
    role: "صاحب متجر إلكتروني",
    imgSrc: "https://i.pravatar.cc/150?img=33",
    rating: 5,
  },
  {
    tempId: 2,
    testimonial: "استطعت المقارنة بين عشر شركات تسويق واخترت الأنسب لميزانيتنا بكل ثقة وشفافية. تجربة لا مثيل لها.",
    by: "سارة العتيبي",
    role: "مديرة تسويق · متجر إبداع",
    imgSrc: "https://i.pravatar.cc/150?img=5",
    rating: 5,
  },
  {
    tempId: 3,
    testimonial: "الاستشارات التسويقية التي حصلت عليها من خلال سنترَا كانت نقطة تحول حقيقية. أنصح كل رائد أعمال باستخدامها.",
    by: "خالد الدوسري",
    role: "رائد أعمال · مؤسسة الرقمي",
    imgSrc: "https://i.pravatar.cc/150?img=22",
    rating: 5,
  },
  {
    tempId: 4,
    testimonial: "تجربة احترافية من البداية للنهاية. الدعم الفني متجاوب دائماً وشعرت بثقة كاملة أثناء التعامل مع الشركات.",
    by: "نورة القحطاني",
    role: "مديرة منتج · شركة تقنية",
    imgSrc: "https://i.pravatar.cc/150?img=47",
    rating: 5,
  },
  {
    tempId: 5,
    testimonial: "وجدت المصمم المثالي لهويتنا البصرية في وقت قياسي. جودة الشركات الموجودة على المنصة لا مثيل لها في السوق.",
    by: "فهد المالكي",
    role: "مؤسس · براند ستوديو",
    imgSrc: "https://i.pravatar.cc/150?img=60",
    rating: 5,
  },
  {
    tempId: 6,
    testimonial: "سنترَا غيّرت طريقة عملنا كلياً. الآن نصل لشركاء التسويق المناسبين بسرعة وكفاءة لم نكن نتخيلها من قبل.",
    by: "ريم الشهري",
    role: "مديرة نمو · شركة ريادة",
    imgSrc: "https://i.pravatar.cc/150?img=49",
    rating: 5,
  },
  {
    tempId: 7,
    testimonial: "أطلقنا حملتنا التسويقية الأولى عبر المنصة وكانت النتائج مذهلة. العائد على الاستثمار تجاوز توقعاتنا بكثير.",
    by: "عمر السلمان",
    role: "مدير تسويق · مجموعة البدر",
    imgSrc: "https://i.pravatar.cc/150?img=15",
    rating: 5,
  },
];

// ─── Animation ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.58, ease: "easeOut" as const, delay: d },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
export default function Testimonials() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-20 sm:py-24 md:py-28"
      style={{ background: "#F7F9F9" }}
    >
      {/* Navy blob top-left, teal blob bottom-right */}
      <div
        className="absolute top-0 left-0 w-96 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(14,36,83,0.06) 0%, transparent 70%)", filter: "blur(50px)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(5,139,127,0.07) 0%, transparent 70%)", filter: "blur(50px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.div
            variants={fadeUp} initial="hidden"
            animate={isInView ? "visible" : "hidden"} custom={0}
            className="mb-4"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold"
              style={{ background: "rgba(14,36,83,0.07)", border: "1px solid rgba(14,36,83,0.14)", color: "#0e2453" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#058B7F" }} />
              آراء العملاء
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp} initial="hidden"
            animate={isInView ? "visible" : "hidden"} custom={0.08}
            className="font-extrabold leading-tight tracking-tight"
            style={{ 
              color: "#0e2453",
              fontSize: "clamp(1.6rem, 3.8vw, 2.8rem)" 
            }}
          >
            ماذا يقول{" "}
            <span
              style={{
                background: "linear-gradient(110deg, #058B7F 20%, #0FAE9E 60%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              عملاؤنا
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden"
            animate={isInView ? "visible" : "hidden"} custom={0.14}
            className="mt-4 text-[14px] sm:text-[15px] leading-[1.85] max-w-lg mx-auto"
            style={{ color: "rgba(14,36,83,0.50)" }}
          >
            أكثر من 500 عميل راضٍ شاركوا تجربتهم مع سنترَا — اقرأ بعض قصص نجاحهم
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp} initial="hidden"
            animate={isInView ? "visible" : "hidden"} custom={0.20}
            className="mt-8 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { value: "98%",   label: "رضا العملاء",    color: "#0e2453" },
              { value: "+500",  label: "تقييم إيجابي",   color: "#058B7F" },
              { value: "4.9★",  label: "متوسط التقييم",  color: "#0e2453" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-[26px] font-black leading-none" style={{ color: s.color }}>
                  {s.value}
                </span>
                <span className="text-[12px]" style={{ color: "rgba(14,36,83,0.45)" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Stagger cards ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isInView ? "visible" : "hidden"} custom={0.26}
        >
          <StaggerTestimonials items={TESTIMONIALS} />
        </motion.div>

      </div>
    </section>
  );
}
