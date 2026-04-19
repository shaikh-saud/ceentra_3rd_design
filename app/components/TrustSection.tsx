"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  FileText,
  Lightbulb,
  Briefcase,
  GraduationCap,
  Video,
} from "lucide-react";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";

// ─── Service cards ────────────────────────────────────────────────────────────
const SERVICES: CardItem[] = [
  {
    id: "marketing",
    title: "شركات التسويق",
    description:
      "تصفح أفضل شركات التسويق الرقمي الموثوقة في المملكة واختر الشريك الأنسب لأهدافك التجارية.",
    imgSrc:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    icon: <Building2 className="w-5 h-5" strokeWidth={1.8} />,
    tag: "الأكثر طلبًا",
    href: "/marketing-companies",
  },
  {
    id: "requests",
    title: "طلبات العملاء",
    description:
      "أنشئ طلبك التسويقي بدقيقة واحدة واستقبل عروضًا من شركات متخصصة بشفافية كاملة.",
    imgSrc:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    icon: <FileText className="w-5 h-5" strokeWidth={1.8} />,
    tag: "سريع وسهل",
    href: "/solutions",
  },
  {
    id: "consulting",
    title: "الاستشارات",
    description:
      "احصل على استشارات تسويقية احترافية من خبراء معتمدين لتحقيق أقصى عائد على استثماراتك.",
    imgSrc:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    icon: <Lightbulb className="w-5 h-5" strokeWidth={1.8} />,
    tag: "خبراء معتمدون",
    href: "/consulting",
  },
  {
    id: "jobs",
    title: "الوظائف",
    description:
      "اكتشف فرص العمل المتاحة في مجال التسويق الرقمي وانطلق في مسيرتك المهنية الآن.",
    imgSrc:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    icon: <Briefcase className="w-5 h-5" strokeWidth={1.8} />,
    tag: "فرص حصرية",
    href: "/jobs",
  },
  {
    id: "courses",
    title: "الدورات والتدريب",
    description:
      "طوّر مهاراتك بدورات تدريبية متخصصة في التسويق الرقمي مع نخبة من المدربين المعتمدين.",
    imgSrc:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    icon: <GraduationCap className="w-5 h-5" strokeWidth={1.8} />,
    tag: "تعلّم واحترف",
    href: "/courses",
  },
  {
    id: "production",
    title: "الإنتاج المرئي",
    description:
      "احصل على خدمات تصوير وإنتاج محتوى احترافي يعزز حضور علامتك التجارية ويجذب جمهورك.",
    imgSrc:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    icon: <Video className="w-5 h-5" strokeWidth={1.8} />,
    tag: "محتوى إبداعي",
    href: "/visual-production",
  },
];

// ─── Animation ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: "easeOut" as const, delay: d },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
export default function TrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-20 sm:py-24 md:py-28 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <motion.div
            variants={fadeUp} initial="hidden"
            animate={isInView ? "visible" : "hidden"} custom={0}
            className="mb-4"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold"
              style={{
                background: "rgba(14,36,83,0.07)",
                border: "1px solid rgba(14,36,83,0.14)",
                color: "#0e2453",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#162d6e" }} />
              خدماتنا
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp} initial="hidden"
            animate={isInView ? "visible" : "hidden"} custom={0.08}
            className="font-extrabold leading-tight tracking-tight text-[#0e2453]"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}
          >
            اختر الخدمة التي{" "}
            <span
              style={{
                background: "linear-gradient(110deg, #058B7F 20%, #0FAE9E 70%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              تناسب احتياجاتك
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden"
            animate={isInView ? "visible" : "hidden"} custom={0.15}
            className="mt-4 text-[14px] sm:text-[15px] leading-[1.85] max-w-xl mx-auto"
            style={{ color: "rgba(14,36,83,0.65)" }}
          >
            منصة سنترَا تجمع أبرز خدمات التسويق الرقمي في مكان واحد — مرّر على أي خدمة لتكتشف المزيد.
          </motion.p>
        </div>

        {/* ── Expanding cards ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isInView ? "visible" : "hidden"} custom={0.22}
        >
          <ExpandingCards
            items={SERVICES}
            defaultActiveIndex={0}
            className="mx-auto"
          />
        </motion.div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isInView ? "visible" : "hidden"} custom={0.32}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {[
            { text: "200+ شركة موثقة",    dot: "#162d6e" },
            { text: "98% رضا العملاء",    dot: "rgba(14,36,83,0.70)" },
            { text: "خدمة 24/7",          dot: "#162d6e" },
            { text: "بيئة آمنة ومضمونة", dot: "rgba(14,36,83,0.70)" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-[12.5px]" style={{ color: "rgba(14,36,83,0.65)" }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.dot }} />
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
