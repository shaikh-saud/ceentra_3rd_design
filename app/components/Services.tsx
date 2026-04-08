"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Building2,
  FileText,
  Lightbulb,
  Briefcase,
  GraduationCap,
  Video,
} from "lucide-react";

// Navy on odd indices, teal on even — both colors visible across the grid
const features = [
  {
    title: "شركات التسويق",
    description: "تصفح أفضل شركات التسويق الرقمي الموثوقة في المملكة",
    icon: Building2,
    accent: "navy",
  },
  {
    title: "طلبات العملاء",
    description: "أنشئ طلبك واحصل على عروض من شركات متخصصة",
    icon: FileText,
    accent: "teal",
  },
  {
    title: "الاستشارات",
    description: "احصل على استشارات تسويقية من خبراء معتمدين",
    icon: Lightbulb,
    accent: "navy",
  },
  {
    title: "الوظائف",
    description: "استعرض فرص العمل في مجال التسويق الرقمي",
    icon: Briefcase,
    accent: "teal",
  },
  {
    title: "الدورات والتدريب",
    description: "طوّر مهاراتك من خلال برامج تدريبية متخصصة",
    icon: GraduationCap,
    accent: "navy",
  },
  {
    title: "الإنتاج المرئي",
    description: "خدمات تصوير وإنتاج محتوى احترافي لعلامتك التجارية",
    icon: Video,
    accent: "teal",
  },
];

const NAVY  = "#0e2453";
const TEAL  = "#058B7F";
const TEAL_L = "#0FAE9E";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: d },
  }),
};

// ─── Single feature card ───────────────────────────────────────────────────────
type FeatureProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  accent: "navy" | "teal";
  index: number;
  total: number;
  isInView: boolean;
};

const Feature = ({ title, description, icon: Icon, accent, index, total, isInView }: FeatureProps) => {
  const color      = accent === "navy" ? NAVY : TEAL;
  const colorLight = accent === "navy" ? TEAL_L : TEAL;   // teal glow for navy cards, same teal for teal cards
  const iconBg     = accent === "navy"
    ? "rgba(14,36,83,0.07)"
    : "rgba(5,139,127,0.07)";
  const hoverBg    = accent === "navy"
    ? "linear-gradient(160deg, rgba(14,36,83,0.04) 0%, rgba(5,139,127,0.025) 100%)"
    : "linear-gradient(160deg, rgba(5,139,127,0.05) 0%, rgba(15,174,158,0.025) 100%)";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={0.15 + index * 0.08}
      className={cn(
        "flex flex-col items-center text-center py-12 px-6 sm:px-8 relative group/feature border-gray-100 transition-all duration-300",
        // Desktop (6 cols)
        index < total - 1 && "xl:border-l xl:border-b-0",
        // Tablet (3 cols)
        "lg:border-b-0 lg:border-l",
        (index + 1) % 3 === 0 && "lg:border-l-0",
        index < 3 && "lg:border-b",
        // Mobile
        "border-b",
        index === total - 1 && "border-b-0 sm:border-b-0"
      )}
    >
      {/* Hover gradient wash */}
      <div
        className="opacity-0 group-hover/feature:opacity-100 transition duration-500 absolute inset-0 w-full h-full pointer-events-none"
        style={{ background: hoverBg }}
      />

      {/* Icon circle */}
      <motion.div
        className="mb-6 relative z-10 flex items-center justify-center transition-transform duration-300 group-hover/feature:scale-110"
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "18px",
          background: iconBg,
          border: `1.5px solid ${color}18`,
        }}
        whileHover={{ scale: 1.12 }}
      >
        <Icon
          style={{ width: "28px", height: "28px", color }}
          strokeWidth={1.6}
        />
      </motion.div>

      {/* Title with colored left-bar indicator */}
      <div className="text-[17px] sm:text-[18px] font-bold mb-3 relative z-10" style={{ color: NAVY }}>
        <div
          className="absolute right-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tl-full rounded-bl-full transition-all duration-200 origin-center -mr-6 sm:-mr-8"
          style={{ background: `linear-gradient(180deg, ${color}, ${colorLight})` }}
        />
        <span className="group-hover/feature:-translate-x-1 transition duration-200 inline-block">
          {title}
        </span>
      </div>

      <p className="text-[13px] sm:text-[14px] leading-relaxed max-w-50 relative z-10" style={{ color: "rgba(14,36,83,0.52)" }}>
        {description}
      </p>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="services"
      className="py-20 sm:py-24 relative overflow-hidden"
      style={{ background: "#F7F9F9" }}
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-16">

          {/* Badge — navy tinted */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0}
            className="mb-5"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full py-1.5 px-4 text-[13px] font-semibold"
              style={{
                background: "rgba(14,36,83,0.07)",
                border: "1px solid rgba(14,36,83,0.14)",
                color: NAVY,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                style={{ background: TEAL }}
              />
              خدماتنا
            </span>
          </motion.div>

          {/* Heading — navy with teal gradient on key word */}
          <motion.h2
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.08}
            className="font-extrabold tracking-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: NAVY }}
          >
            اختر الخدمة التي{" "}
            <span style={{
              background: `linear-gradient(110deg, ${TEAL} 10%, ${TEAL_L} 60%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              تناسب احتياجاتك
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.14}
            className="mt-4 text-[15px] leading-relaxed max-w-lg mx-auto"
            style={{ color: "rgba(14,36,83,0.50)" }}
          >
            منصة سنترَا توفر لك مجموعة متكاملة من الخدمات لدعم نمو أعمالك الرقمية.
          </motion.p>
        </div>

        {/* ── Grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 bg-white"
          style={{
            borderRadius: "20px",
            border: "1px solid rgba(14,36,83,0.08)",
            boxShadow: "0 4px 32px rgba(14,36,83,0.06), 0 1px 4px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          {features.map((feature, index) => (
            <Feature
              key={feature.title}
              {...feature}
              index={index}
              total={features.length}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ── Bottom dual-color accent line ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.65}
          className="mt-6 mx-auto"
          style={{
            height: "3px",
            width: "160px",
            borderRadius: "999px",
            background: `linear-gradient(90deg, ${NAVY}, ${TEAL}, ${TEAL_L})`,
          }}
        />

      </div>
    </section>
  );
}
