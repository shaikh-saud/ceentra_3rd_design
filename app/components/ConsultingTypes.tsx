"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Megaphone, Palette, ShoppingCart, ArrowLeft } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: d },
  }),
};

const TYPES = [
  {
    icon: TrendingUp,
    title: "استراتيجية التسويق",
    description: "ضع استراتيجية تسويقية متكاملة مع خبراء متخصصين يساعدونك في تحليل السوق وتحديد الفرص.",
    price: "من 500 ر.س / ساعة",
    gradient: ["#058B7F", "#0FAE9E"],
    iconBg: "rgba(5,139,127,0.10)",
    iconBorder: "rgba(5,139,127,0.22)",
    iconColor: "#058B7F",
  },
  {
    icon: Megaphone,
    title: "الحملات الإعلانية",
    description: "احصل على استشارة متخصصة لإعداد وتحسين حملاتك الإعلانية على جوجل وميتا وغيرها.",
    price: "من 400 ر.س / ساعة",
    gradient: ["#0e2453", "#162d6e"],
    iconBg: "rgba(14,36,83,0.08)",
    iconBorder: "rgba(14,36,83,0.18)",
    iconColor: "#0e2453",
  },
  {
    icon: Palette,
    title: "الهوية البصرية",
    description: "طور هوية بصرية احترافية لعلامتك التجارية بتوجيه مباشر من مصممين ذوي خبرة عالية.",
    price: "من 350 ر.س / ساعة",
    gradient: ["#046E65", "#058B7F"],
    iconBg: "rgba(4,110,101,0.10)",
    iconBorder: "rgba(4,110,101,0.22)",
    iconColor: "#046E65",
  },
  {
    icon: ShoppingCart,
    title: "التجارة الإلكترونية",
    description: "ابنِ متجرك الإلكتروني وطور أداء مبيعاتك بمساعدة خبراء متخصصين في التجارة الرقمية.",
    price: "من 450 ر.س / ساعة",
    gradient: ["#091a3e", "#0e2453"],
    iconBg: "rgba(9,26,62,0.08)",
    iconBorder: "rgba(9,26,62,0.18)",
    iconColor: "#091a3e",
  },
];

function TypeCard({ item, index }: { item: typeof TYPES[0]; index: number }) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={index * 0.08 + 0.1}
      whileHover="hovered"
      className="group cursor-pointer h-full"
      dir="rtl"
    >
      <motion.div
        variants={{
          hovered: { y: -6, scale: 1.02 },
          hidden:  { y: 0,  scale: 1    },
          visible: { y: 0,  scale: 1    },
        }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="flex flex-col h-full"
        style={{
          borderRadius: "20px",
          background: "#ffffff",
          border: "1px solid rgba(14,36,83,0.07)",
          boxShadow: "0 4px 20px rgba(14,36,83,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Gradient accent top bar */}
        <div
          className="h-1 w-full shrink-0"
          style={{ background: `linear-gradient(90deg, ${item.gradient[0]}, ${item.gradient[1]})` }}
        />

        {/* Glow on hover (CSS transition via shadow) */}
        <motion.div
          variants={{
            hovered: {
              boxShadow: "0 20px 56px rgba(14,36,83,0.09), 0 0 0 1.5px rgba(15,174,158,0.25), 0 0 28px rgba(5,139,127,0.10)",
            },
            visible: { boxShadow: "none" },
            hidden:  { boxShadow: "none" },
          }}
          transition={{ duration: 0.28 }}
          className="flex flex-col flex-1 p-6"
        >
          {/* Icon */}
          <motion.div
            variants={{ hovered: { scale: 1.15, rotate: 6 }, visible: { scale: 1, rotate: 0 }, hidden: { scale: 1, rotate: 0 } }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 shrink-0"
            style={{
              background: item.iconBg,
              border: `1.5px solid ${item.iconBorder}`,
              width: "52px",
              height: "52px",
            }}
          >
            <Icon className="w-6 h-6" style={{ color: item.iconColor }} strokeWidth={1.8} />
          </motion.div>

          {/* Title */}
          <motion.h3
            variants={{ hovered: { color: "#058B7F" }, visible: { color: "#0e2453" }, hidden: { color: "#0e2453" } }}
            transition={{ duration: 0.22 }}
            className="font-extrabold text-[16px] mb-2.5"
          >
            {item.title}
          </motion.h3>

          {/* Description */}
          <p className="text-[13px] leading-[1.78] mb-5 flex-1" style={{ color: "rgba(14,36,83,0.54)" }}>
            {item.description}
          </p>

          {/* Price + arrow */}
          <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid rgba(14,36,83,0.07)" }}>
            <span className="text-[13px] font-bold" style={{ color: "#058B7F" }}>
              {item.price}
            </span>
            <motion.div
              variants={{ hovered: { x: -4, opacity: 1 }, visible: { x: 0, opacity: 0.5 }, hidden: { x: 0, opacity: 0.5 } }}
              transition={{ duration: 0.22 }}
            >
              <ArrowLeft className="w-4 h-4" style={{ color: "#058B7F" }} strokeWidth={2.2} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ConsultingTypes() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden"
      style={{ background: "#ffffff" }}
      dir="rtl"
    >
      {/* Ambient blobs */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,174,158,0.05) 0%, transparent 65%)", filter: "blur(48px)" }}
      />
      <div
        className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,36,83,0.04) 0%, transparent 60%)", filter: "blur(40px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}
            className="mb-3"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold"
              style={{
                background: "rgba(5,139,127,0.08)",
                border: "1px solid rgba(5,139,127,0.20)",
                color: "#058B7F",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#058B7F" }} />
              تخصصات متنوعة
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.08}
            className="font-extrabold leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", color: "#0e2453" }}
          >
            أنواع الاستشارات
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.15}
            className="mt-3 text-[14.5px] sm:text-[15px]"
            style={{ color: "rgba(14,36,83,0.52)" }}
          >
            اختر نوع الاستشارة المناسب لاحتياجاتك
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TYPES.map((item, i) => (
            <TypeCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
