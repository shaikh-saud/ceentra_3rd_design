"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users2, Video, Camera, ArrowLeft, CheckCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: d },
  }),
};

const SERVICES = [
  {
    icon: Users2,
    title: "التسويق بالمؤثرين",
    subtitle: "Influencer Marketing",
    description:
      "ربطك بمؤثرين موثقين لتنفيذ حملات تسويقية مؤثرة وموثوقة تصل لجمهورك المستهدف بفاعلية عالية.",
    points: [
      "قاعدة مؤثرين موثقة ومتنوعة",
      "حملات مقاسة بمؤشرات أداء واضحة",
      "محتوى أصيل يعكس هوية علامتك",
      "تقارير أداء تفصيلية",
    ],
    gradient: ["#058B7F", "#0FAE9E"],
    accentBg: "rgba(5,139,127,0.08)",
    accentBorder: "rgba(5,139,127,0.20)",
    accentColor: "#058B7F",
  },
  {
    icon: Video,
    title: "تجربة العملاء (UGC)",
    subtitle: "User Generated Content",
    description:
      "محتوى أصيل من عملاء حقيقيين وإعلانات سريعة عالية التحويل تُبنى على تجارب حقيقية وقصص موثوقة.",
    points: [
      "إعلانات UGC سريعة عالية التحويل",
      "محتوى موثوق من تجارب حقيقية",
      "أنواع متعددة: ريلز، تيك توك، يوتيوب",
      "توريد المنتج وتنسيق الصور",
    ],
    gradient: ["#0e2453", "#162d6e"],
    accentBg: "rgba(14,36,83,0.07)",
    accentBorder: "rgba(14,36,83,0.18)",
    accentColor: "#0e2453",
  },
  {
    icon: Camera,
    title: "التصوير والإعلانات",
    subtitle: "Photography & Advertising",
    description:
      "تصوير منتجات وإعلانات تجارية بجودة سينمائية عالية تعزز صورة علامتك وتدفع معدلات التحويل للأمام.",
    points: [
      "تصوير منتجات بجودة استوديو",
      "توثيق فعاليات وإنتاج مرئي",
      "توجيه إبداعي وتحرير احترافي",
      "تسليم سريع وملفات عالية الدقة",
    ],
    gradient: ["#046E65", "#058B7F"],
    accentBg: "rgba(4,110,101,0.08)",
    accentBorder: "rgba(4,110,101,0.20)",
    accentColor: "#046E65",
  },
];

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const Icon = svc.icon;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={index * 0.09 + 0.10}
      whileHover="hovered"
      className="cursor-pointer h-full"
      dir="rtl"
    >
      <motion.div
        variants={{
          hovered: {
            y: -6,
            scale: 1.018,
            boxShadow: "0 24px 60px rgba(14,36,83,0.10), 0 0 0 1.5px rgba(15,174,158,0.25), 0 0 32px rgba(5,139,127,0.10)",
          },
          visible: {
            y: 0,
            scale: 1,
            boxShadow: "0 4px 20px rgba(14,36,83,0.06)",
          },
          hidden: {
            y: 0,
            scale: 1,
            boxShadow: "0 4px 20px rgba(14,36,83,0.06)",
          },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="flex flex-col h-full"
        style={{
          borderRadius: "20px",
          background: "#ffffff",
          border: "1px solid rgba(14,36,83,0.07)",
          overflow: "hidden",
        }}
      >
        {/* Gradient top bar */}
        <div
          className="h-1 w-full shrink-0"
          style={{ background: `linear-gradient(90deg, ${svc.gradient[0]}, ${svc.gradient[1]})` }}
        />

        <div className="flex flex-col flex-1 p-6">
          {/* Icon + titles */}
          <div className="flex items-start gap-4 mb-5">
            <motion.div
              variants={{
                hovered: { scale: 1.12, rotate: 8 },
                visible: { scale: 1,    rotate: 0 },
                hidden:  { scale: 1,    rotate: 0 },
              }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: `linear-gradient(135deg, ${svc.gradient[0]} 0%, ${svc.gradient[1]} 100%)`,
                boxShadow: `0 6px 20px ${svc.accentColor}33`,
                width: "52px",
                height: "52px",
              }}
            >
              <Icon className="w-6 h-6 text-white" strokeWidth={1.7} />
            </motion.div>

            <div className="text-right">
              <motion.h3
                variants={{ hovered: { color: "#058B7F" }, visible: { color: "#0e2453" }, hidden: { color: "#0e2453" } }}
                transition={{ duration: 0.20 }}
                className="font-extrabold text-[16px] leading-snug"
              >
                {svc.title}
              </motion.h3>
              <p className="text-[11px] font-semibold mt-0.5" style={{ color: "rgba(14,36,83,0.40)" }}>
                {svc.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13.5px] leading-[1.78] mb-5" style={{ color: "rgba(14,36,83,0.54)" }}>
            {svc.description}
          </p>

          {/* Bullet points */}
          <ul className="space-y-2 mb-6 flex-1">
            {svc.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2.5">
                <CheckCircle
                  className="w-3.5 h-3.5 mt-0.5 shrink-0"
                  style={{ color: svc.accentColor }}
                  strokeWidth={2.2}
                />
                <span className="text-[12.5px]" style={{ color: "rgba(14,36,83,0.60)" }}>
                  {pt}
                </span>
              </li>
            ))}
          </ul>

          {/* Footer CTA */}
          <div
            className="mt-auto pt-4 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(14,36,83,0.07)" }}
          >
            <motion.button
              whileHover={{ x: -3 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-1.5 text-[13px] font-bold transition-colors duration-200"
              style={{ color: svc.accentColor }}
            >
              اعرف المزيد
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.2} />
            </motion.button>
            <span
              className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: svc.accentBg, color: svc.accentColor, border: `1px solid ${svc.accentBorder}` }}
            >
              متاح الآن
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function VisualProductionServices() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden"
      style={{ background: "#F7F9F9" }}
      dir="rtl"
    >
      {/* Ambient blobs */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,174,158,0.06) 0%, transparent 65%)", filter: "blur(48px)" }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,36,83,0.04) 0%, transparent 60%)", filter: "blur(44px)" }}
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
              style={{ background: "rgba(5,139,127,0.08)", border: "1px solid rgba(5,139,127,0.20)", color: "#058B7F" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#058B7F" }} />
              خدمات متخصصة
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.08}
            className="font-extrabold leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", color: "#0e2453" }}
          >
            خدماتنا في الإنتاج المرئي
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.15}
            className="mt-3 text-[14.5px]"
            style={{ color: "rgba(14,36,83,0.52)" }}
          >
            ثلاثة محاور أساسية لبناء حضور بصري متكامل لعلامتك التجارية
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
