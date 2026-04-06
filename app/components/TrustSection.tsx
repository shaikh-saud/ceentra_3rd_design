"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, FileText, Lightbulb, Briefcase, GraduationCap, Video } from "lucide-react";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";

const SERVICES = [
  {
    title: "شركات التسويق",
    description:
      "تصفح أفضل شركات التسويق الرقمي الموثوقة في المملكة واختر الأنسب لاحتياجاتك.",
    icon: <Building2 className="w-7 h-7" strokeWidth={1.6} />,
  },
  {
    title: "طلبات العملاء",
    description:
      "أنشئ طلبك بسهولة واحصل على عروض من شركات متخصصة في مختلف المجالات.",
    icon: <FileText className="w-7 h-7" strokeWidth={1.6} />,
  },
  {
    title: "الاستشارات",
    description:
      "احصل على استشارات تسويقية احترافية من خبراء معتمدين.",
    icon: <Lightbulb className="w-7 h-7" strokeWidth={1.6} />,
  },
  {
    title: "الوظائف",
    description:
      "اكتشف فرص العمل المتاحة في مجال التسويق الرقمي وابدأ مسيرتك المهنية.",
    icon: <Briefcase className="w-7 h-7" strokeWidth={1.6} />,
  },
  {
    title: "الدورات والتدريب",
    description:
      "طوّر مهاراتك من خلال برامج تدريبية متخصصة في التسويق الرقمي.",
    icon: <GraduationCap className="w-7 h-7" strokeWidth={1.6} />,
  },
  {
    title: "الإنتاج المرئي",
    description:
      "احصل على خدمات تصوير وإنتاج محتوى احترافي يعزز من حضور علامتك التجارية.",
    icon: <Video className="w-7 h-7" strokeWidth={1.6} />,
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

export default function TrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-[#F8FAFC]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/7 text-primary text-[13px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              خدماتنا
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.06}
            className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-extrabold text-text-primary leading-snug"
          >
            اختر الخدمة التي تناسب احتياجاتك
          </motion.h2>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.15}
        >
          <FeaturesSectionWithHoverEffects features={SERVICES} />
        </motion.div>
      </div>
    </section>
  );
}
