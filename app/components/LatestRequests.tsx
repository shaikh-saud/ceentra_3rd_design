"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Clock, User, ArrowLeft, ChevronLeft } from "lucide-react";

/* ─────────── Data ─────────── */
const categories = ["الكل", "تسويق", "استشارات", "وظائف", "تصميم"];

const allRequests = [
  {
    title: "تحليل القوائم المالية",
    description: "أبحث عن مستشار مالي لتحليل القوائم المالية وتقديم توصيات لتحسين الأداء.",
    user: "محمد أحمد",
    time: "منذ شهر",
    category: "استشارات",
  },
  {
    title: "إنشاء حملة تسويقية لمتجر إلكتروني",
    description: "أحتاج فريق تسويق لإطلاق حملة شاملة على منصات التواصل الاجتماعي لمتجري الجديد.",
    user: "سارة العتيبي",
    time: "منذ 3 أسابيع",
    category: "تسويق",
  },
  {
    title: "مدير تسويق رقمي بدوام كامل",
    description: "نبحث عن مدير تسويق رقمي ذو خبرة لا تقل عن 3 سنوات للانضمام لفريقنا في الرياض.",
    user: "شركة نمو",
    time: "منذ أسبوعين",
    category: "وظائف",
  },
  {
    title: "تصميم بروفايل احترافي للشركة",
    description: "أبحث عن مصمم لتصميم بروفايل شركة احترافي يعكس هويتنا التجارية بشكل مميز.",
    user: "خالد الدوسري",
    time: "منذ شهر",
    category: "تصميم",
  },
  {
    title: "استشارة في استراتيجية المحتوى",
    description: "أحتاج خبير محتوى لوضع استراتيجية محتوى شاملة لمنصاتنا الرقمية خلال الربع القادم.",
    user: "نورة القحطاني",
    time: "منذ 5 أسابيع",
    category: "استشارات",
  },
  {
    title: "إدارة إعلانات سناب شات",
    description: "أبحث عن متخصص في إعلانات سناب شات لإدارة حملات إعلانية بميزانية شهرية محددة.",
    user: "فهد المالكي",
    time: "منذ شهرين",
    category: "تسويق",
  },
  {
    title: "مصمم جرافيك للعمل عن بُعد",
    description: "نبحث عن مصمم جرافيك موهوب للعمل عن بُعد على مشاريع متنوعة بشكل مستمر.",
    user: "وكالة إبداع",
    time: "منذ 6 أسابيع",
    category: "وظائف",
  },
  {
    title: "تصميم عرض تقديمي للمستثمرين",
    description: "أحتاج تصميم عرض تقديمي احترافي باللغتين العربية والإنجليزية لجولة استثمارية.",
    user: "عبدالله الشمري",
    time: "منذ شهر",
    category: "تصميم",
  },
];

/* ─────────── Animation ─────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const, delay },
  }),
};

/* ─────────── Component ─────────── */
export default function LatestRequests() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filtered =
    activeCategory === "الكل"
      ? allRequests
      : allRequests.filter((r) => r.category === activeCategory);

  return (
    <section
      ref={ref}
      id="latest-requests"
      className="relative py-20 sm:py-24 md:py-28 px-5 sm:px-6 bg-bg-light overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="text-center sm:text-right">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="mb-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/7 text-primary text-[13px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                أحدث الطلبات
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.05}
              className="text-[24px] sm:text-[30px] md:text-[34px] font-extrabold text-text-primary leading-snug"
            >
              تصفح أحدث طلبات العملاء
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.08}
              className="text-[13px] sm:text-[14px] text-text-secondary mt-1.5"
            >
              ابدأ بتقديم عروضك والعمل مع عملاء حقيقيين
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
          >
            <a
              href="#all-requests"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 text-primary text-[13px] font-semibold hover:bg-primary/5 transition-colors duration-300 whitespace-nowrap"
            >
              عرض الكل
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* ── Filter Tabs ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.12}
          className="flex flex-wrap justify-center sm:justify-end gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer ${activeCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-text-secondary border border-gray-200 hover:border-primary/30 hover:text-primary"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── List ── */}
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((request, index) => (
              <motion.div
                key={`${request.title}-${activeCategory}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white border border-gray-100 hover:border-primary/20 rounded-xl px-5 sm:px-6 py-5 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(5,139,127,0.06)] hover:-translate-y-[1px] cursor-pointer"
              >
                {/* Right: Content */}
                <div className="flex-1 min-w-0 text-right">
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-text-primary mb-1 group-hover:text-primary transition-colors duration-200 truncate">
                    {request.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-text-secondary/65 line-clamp-1 sm:line-clamp-2">
                    {request.description}
                  </p>
                  <div className="flex items-center justify-end gap-3 mt-2.5 text-[11px] sm:text-[12px] text-text-secondary/50">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {request.time}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 font-medium text-text-secondary/65">
                      <User className="w-3 h-3" />
                      {request.user}
                    </span>
                  </div>
                </div>

                {/* Left: CTA */}
                <div className="shrink-0 self-end sm:self-center">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] sm:text-[13px] font-semibold text-primary bg-primary/[0.06] hover:bg-primary/[0.12] transition-colors duration-200 whitespace-nowrap"
                  >
                    عرض التفاصيل
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-text-secondary/50 text-[14px]">
              لا توجد طلبات في هذا التصنيف حالياً
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
