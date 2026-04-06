"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowLeft, Star, Megaphone, PenTool, BarChart3, Share2, Camera, Search } from "lucide-react";

/* ─────────── Request Data ─────────── */
const requests = [
  {
    title: "إعداد خطة تسويق متكاملة",
    description: "أبحث عن شركة متخصصة لإعداد خطة تسويق شاملة لمشروعي تشمل تحليل السوق واستراتيجية النمو.",
    user: "محمد أحمد",
    time: "منذ 3 ساعات",
    category: "استراتيجية",
    icon: BarChart3,
    featured: true,
  },
  {
    title: "إدارة حسابات التواصل الاجتماعي",
    description: "أحتاج شركة تدير حساباتي على تويتر وإنستقرام بشكل احترافي مع محتوى يومي وتقارير أسبوعية.",
    user: "سارة العتيبي",
    time: "منذ 5 ساعات",
    category: "سوشال ميديا",
    icon: Share2,
    featured: true,
  },
  {
    title: "تصميم هوية بصرية كاملة",
    description: "أبحث عن مصمم محترف لتصميم هوية بصرية شاملة تتضمن الشعار والألوان والخطوط.",
    user: "عبدالله الشمري",
    time: "منذ يوم",
    category: "تصميم",
    icon: PenTool,
    featured: false,
  },
  {
    title: "حملة إعلانية على قوقل",
    description: "أحتاج خبير إعلانات قوقل لإدارة حملة إعلانية بميزانية محددة لمتجري الإلكتروني.",
    user: "نورة القحطاني",
    time: "منذ يومين",
    category: "إعلانات",
    icon: Megaphone,
    featured: true,
  },
  {
    title: "تصوير منتجات احترافي",
    description: "أبحث عن مصور محترف لتصوير منتجات متجري بجودة عالية مناسبة للإعلانات والسوشال ميديا.",
    user: "فهد المالكي",
    time: "منذ 3 أيام",
    category: "إنتاج مرئي",
    icon: Camera,
    featured: false,
  },
  {
    title: "تحسين محركات البحث SEO",
    description: "أحتاج متخصص SEO لتحسين ترتيب موقعي في نتائج البحث وزيادة الزيارات العضوية.",
    user: "خالد الدوسري",
    time: "منذ 4 أيام",
    category: "SEO",
    icon: Search,
    featured: false,
  },
];

/* ─────────── Animation ─────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

/* ─────────── Component ─────────── */
export default function FeaturedRequests() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="jobs"
      className="relative py-20 sm:py-24 md:py-28 px-5 sm:px-6 bg-white overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute bottom-0 left-[10%] right-[10%] w-[80%] h-[60%] z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse at center bottom, rgba(5,139,127,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 sm:mb-14">
          <div className="text-center sm:text-right">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/7 text-primary text-[13px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                الطلبات المميزة ⭐
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.06}
              className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold text-text-primary leading-snug"
            >
              أحدث طلبات العملاء
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.1}
              className="text-[14px] sm:text-[15px] text-text-secondary mt-2"
            >
              قدّم عرضك الآن وابدأ العمل مع عملاء حقيقيين
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.14}
          >
            <a
              href="#all-requests"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/20 text-primary text-[14px] font-semibold hover:bg-primary/5 transition-colors duration-300 whitespace-nowrap"
            >
              عرض كل الطلبات
              <ArrowLeft className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {requests.map((request, index) => {
            const Icon = request.icon;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.15 + index * 0.08}
                className="group relative bg-white border border-gray-100 hover:border-primary/25 rounded-2xl p-6 transition-all duration-300 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(5,139,127,0.08)] hover:-translate-y-1 cursor-pointer"
              >
                {/* Featured badge */}
                {request.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-600 text-[11px] font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      مميز
                    </span>
                  </div>
                )}

                {/* Category tag */}
                <div className="flex items-center justify-end gap-2 mb-4">
                  <span className="text-[12px] font-medium text-primary/70 bg-primary/[0.06] px-2.5 py-1 rounded-full">
                    {request.category}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-primary/[0.07] flex items-center justify-center">
                    <Icon className="w-[18px] h-[18px] text-primary/70" strokeWidth={1.7} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[16px] sm:text-[17px] font-bold text-text-primary text-right mb-2.5 leading-snug group-hover:text-primary transition-colors duration-300">
                  {request.title}
                </h3>

                {/* Description (clamped to 2 lines) */}
                <p className="text-[13px] sm:text-[14px] leading-[1.75] text-text-secondary/70 text-right mb-5 line-clamp-2">
                  {request.description}
                </p>

                {/* Footer: user info + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:text-primary-dark transition-colors duration-200"
                  >
                    عرض التفاصيل
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-2 text-[12px] text-text-secondary/55">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {request.time}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-text-secondary/70">{request.user}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
