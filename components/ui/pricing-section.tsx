"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, ArrowUpRight, BadgeCheck, Shield, Zap } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type PlanKey = "monthly" | "semi" | "annual";

interface Plan {
  key: PlanKey;
  label: string;
  sublabel: string;
  price: string;
  period: string;
  saving?: string;
  popular?: boolean;
  description: string;
  features: { group: string; items: string[] }[];
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const individualPlans: Plan[] = [
  {
    key: "monthly",
    label: "شهري",
    sublabel: "ابدأ الآن",
    price: "199",
    period: "شهريًا",
    description: "مثالية للبدء السريع وتجربة المنصة بدون التزامات طويلة",
    features: [
      {
        group: "الوصول والخدمات",
        items: ["الوصول إلى جميع الخدمات", "5 طلبات شهريًا", "تصفح شركات التسويق", "البحث والمقارنة"],
      },
      {
        group: "الدعم والتقارير",
        items: ["دعم فني عبر واتساب", "تقارير أساسية", "إشعارات العروض", "لوحة تحكم بسيطة"],
      },
    ],
  },
  {
    key: "semi",
    label: "نصف سنوي",
    sublabel: "الأكثر طلبًا",
    price: "799",
    period: "6 أشهر",
    saving: "وفّر 20%",
    popular: true,
    description: "الخيار الأمثل لأصحاب المشاريع الذين يريدون نتائج مستمرة",
    features: [
      {
        group: "الوصول والخدمات",
        items: ["الوصول إلى جميع الخدمات", "15 طلب شهريًا", "أولوية في عرض الطلبات", "الاستشارات المجانية"],
      },
      {
        group: "الدعم والتقارير",
        items: ["دعم فني 24/7", "تقارير متقدمة", "تنبيهات ذكية", "لوحة تحكم متقدمة"],
      },
    ],
  },
  {
    key: "annual",
    label: "سنوي",
    sublabel: "أفضل قيمة",
    price: "999",
    period: "سنويًا",
    saving: "وفّر 40%",
    description: "أفضل قيمة للراغبين في الاستفادة الكاملة من منصة سنترَا",
    features: [
      {
        group: "الوصول والخدمات",
        items: ["الوصول الكامل لجميع الخدمات", "طلبات غير محدودة", "ظهور مميز في النتائج", "باقة استشارات مجانية"],
      },
      {
        group: "الدعم والتقارير",
        items: ["دعم فني VIP", "تقارير شاملة وتفصيلية", "مدير حساب خاص", "وصول مبكر للميزات"],
      },
    ],
  },
];

const companyPlans: Plan[] = [
  {
    key: "monthly",
    label: "شهري",
    sublabel: "ابدأ الآن",
    price: "499",
    period: "شهريًا",
    description: "للشركات التي تبحث عن تواجد فعّال على المنصة",
    features: [
      {
        group: "الحضور والظهور",
        items: ["حساب شركة موثق", "الظهور في قائمة الشركات", "10 عروض شهريًا", "صفحة شركة مخصصة"],
      },
      {
        group: "الإدارة والدعم",
        items: ["لوحة تحكم متقدمة", "إحصائيات الزيارات", "دعم فني مخصص", "إدارة العروض"],
      },
    ],
  },
  {
    key: "semi",
    label: "نصف سنوي",
    sublabel: "الأكثر طلبًا",
    price: "1,999",
    period: "6 أشهر",
    saving: "وفّر 20%",
    popular: true,
    description: "للشركات التي ترغب في ظهور مميز وتقارير متقدمة",
    features: [
      {
        group: "الحضور والظهور",
        items: ["ظهور مميز في النتائج", "30 عرض شهريًا", "شارة الشركة الموثوقة", "إعلان في الصفحة الرئيسية"],
      },
      {
        group: "الإدارة والدعم",
        items: ["تقارير وإحصائيات متقدمة", "دعم أولوية 24/7", "إدارة العروض بالجملة", "تحليلات العملاء"],
      },
    ],
  },
  {
    key: "annual",
    label: "سنوي",
    sublabel: "أفضل قيمة",
    price: "2,999",
    period: "سنويًا",
    saving: "وفّر 40%",
    description: "الحل الشامل للشركات الكبيرة مع إدارة مخصصة",
    features: [
      {
        group: "الحضور والظهور",
        items: ["ظهور في الصفحة الرئيسية", "عروض غير محدودة", "حساب VIP موثق", "تسويق مجاني للشركة"],
      },
      {
        group: "الإدارة والدعم",
        items: ["مدير حساب مخصص", "تقارير تفصيلية شاملة", "API متكامل مع الأنظمة", "أولوية قصوى في الدعم"],
      },
    ],
  },
];

// ─── Individual / Company pill toggle ─────────────────────────────────────────
function TypeToggle({ isCompany, onChange }: { isCompany: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex justify-center">
      <div className="relative flex rounded-full bg-white border border-gray-200 p-1 shadow-sm">
        {(["individual", "company"] as const).map((type) => {
          const active = type === "company" ? isCompany : !isCompany;
          return (
            <button
              key={type}
              onClick={() => onChange(type === "company")}
              className={`relative z-10 h-10 rounded-full px-7 text-[14px] font-semibold transition-colors duration-300 ${
                active ? "text-white" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="type-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-primary-light to-primary"
                  style={{ boxShadow: "0 4px 16px rgba(5,139,127,0.30)" }}
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                />
              )}
              <span className="relative">{type === "individual" ? "الأفراد" : "الشركات"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Plan pill selector ────────────────────────────────────────────────────────
function PlanPills({ plans, activeKey, onChange }: { plans: Plan[]; activeKey: PlanKey; onChange: (k: PlanKey) => void }) {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {plans.map((plan) => {
        const isActive = plan.key === activeKey;
        return (
          <button
            key={plan.key}
            onClick={() => onChange(plan.key)}
            className="relative flex items-center gap-2 h-11 rounded-full px-5 text-[13px] font-bold transition-all duration-300"
            style={{
              background: isActive ? "linear-gradient(135deg, #058B7F, #0FAE9E)" : "#ffffff",
              color: isActive ? "#ffffff" : "#5A5A5A",
              border: isActive ? "none" : "1.5px solid #e5e7eb",
              boxShadow: isActive
                ? "0 4px 20px rgba(5,139,127,0.30)"
                : "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {/* Always rendered — opacity controls visibility to avoid insertBefore reconciliation error */}
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary text-[9px] font-black px-2 py-0.5 rounded-full whitespace-nowrap border border-primary/20 pointer-events-none transition-opacity duration-200"
              style={{ opacity: plan.popular && isActive ? 1 : 0 }}
            >
              ⭐ الأشهر
            </span>
            {plan.label}
            {plan.saving && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: isActive ? "rgba(255,255,255,0.25)" : "rgba(5,139,127,0.08)",
                  color: isActive ? "#fff" : "#058B7F",
                }}
              >
                {plan.saving}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Price Orb ─────────────────────────────────────────────────────────────────
function PriceOrb({ plan }: { plan: Plan }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outermost glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "320px", height: "320px",
          background: "radial-gradient(circle, rgba(5,139,127,0.10) 0%, transparent 70%)",
        }}
      />
      {/* Outer dashed orbit */}
      <div
        className="absolute rounded-full border border-dashed border-primary/15"
        style={{ width: "280px", height: "280px" }}
      />
      {/* Mid ring */}
      <div
        className="absolute rounded-full border border-primary/10"
        style={{ width: "230px", height: "230px" }}
      />

      {/* Main orb */}
      <motion.div
        key={plan.key}
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative flex flex-col items-center justify-center"
        style={{
          width: "192px", height: "192px",
          borderRadius: "50%",
          background: "linear-gradient(145deg, #058B7F 0%, #046E65 100%)",
          boxShadow: "0 16px 56px rgba(5,139,127,0.38), 0 2px 0 rgba(255,255,255,0.15) inset",
        }}
      >
        {/* Inner shimmer ring */}
        <div
          className="absolute inset-3 rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(255,255,255,0.14)" }}
        />

        {/* Price text */}
        <div className="flex flex-col items-center" dir="ltr">
          <span className="text-[11px] font-semibold text-white/60 mb-1">ريال سعودي</span>
          <span className="text-[46px] font-black text-white leading-none tracking-tight">
            {plan.price}
          </span>
          <span className="text-[11px] text-white/60 mt-1">/ {plan.period}</span>
        </div>
      </motion.div>

      {/* Floating badge: popular */}
      {plan.popular && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="absolute -top-3 right-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: "#fff",
            border: "1.5px solid rgba(5,139,127,0.2)",
            boxShadow: "0 4px 14px rgba(5,139,127,0.14)",
            fontSize: "11px", fontWeight: 700, color: "#058B7F",
          }}
        >
          <Zap className="w-3 h-3" />
          الأكثر طلبًا
        </motion.div>
      )}

      {/* Floating badge: saving */}
      {plan.saving && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="absolute -bottom-2 left-6 px-3 py-1.5 rounded-full"
          style={{
            background: "linear-gradient(135deg, #058B7F, #0FAE9E)",
            color: "#fff",
            fontSize: "11px", fontWeight: 700,
            boxShadow: "0 4px 14px rgba(5,139,127,0.28)",
          }}
        >
          {plan.saving}
        </motion.div>
      )}

      {/* Floating orbit dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 2 === 0 ? "6px" : "4px",
            height: i % 2 === 0 ? "6px" : "4px",
            background: i % 2 === 0 ? "rgba(5,139,127,0.25)" : "rgba(5,139,127,0.12)",
            transform: `rotate(${deg}deg) translateY(-128px)`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Feature pills panel ───────────────────────────────────────────────────────
function FeaturePills({ plan }: { plan: Plan }) {
  return (
    <div className="flex flex-col gap-6">
      {plan.features.map((group, gi) => (
        <div key={gi}>
          {/* Group label — pill shape */}
          <div className="flex items-center gap-2 mb-4 justify-end">
            <span className="text-[11px] font-black text-primary uppercase tracking-widest">
              {group.group}
            </span>
            <div
              className="h-5 px-2 rounded-full flex items-center"
              style={{ background: "rgba(5,139,127,0.08)" }}
            >
              <BadgeCheck className="w-3 h-3 text-primary" />
            </div>
          </div>

          {/* Feature items — each a pill row */}
          <ul className="flex flex-col gap-2.5">
            {group.items.map((item, ii) => (
              <motion.li
                key={`${plan.key}-${gi}-${ii}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, delay: gi * 0.1 + ii * 0.06, ease: "easeOut" }}
                className="flex items-center justify-end gap-3"
              >
                {/* Text */}
                <span className="text-[14px] text-text-secondary leading-snug">{item}</span>
                {/* Check pill */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "24px", height: "24px",
                    borderRadius: "50%",
                    background: "rgba(5,139,127,0.09)",
                    border: "1.5px solid rgba(5,139,127,0.20)",
                  }}
                >
                  <Check className="w-3 h-3 text-primary" strokeWidth={2.8} />
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Soft separator between groups — wavy pill shape */}
          {gi < plan.features.length - 1 && (
            <div
              className="mt-5 mx-auto"
              style={{
                height: "2px", width: "60%",
                background: "linear-gradient(to left, transparent, rgba(5,139,127,0.12), transparent)",
                borderRadius: "999px",
              }}
            />
          )}
        </div>
      ))}

      {/* CTA section — no box, just floated */}
      <div className="mt-2 flex flex-col items-end gap-3">
        <button
          className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[15px] text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          style={{
            background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
            boxShadow: "0 6px 28px rgba(5,139,127,0.36)",
          }}
        >
          اشترك الآن
          <ArrowUpRight className="w-4 h-4" />
        </button>
        <p className="text-[11px] text-text-secondary/45">بدون رسوم خفية · إلغاء في أي وقت</p>
      </div>
    </div>
  );
}

// ─── Main pricing display ──────────────────────────────────────────────────────
function PricingDisplay({ plan }: { plan: Plan }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${plan.key}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-5xl mx-auto"
      >
        {/* Plan description pill — centred above layout */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] text-text-secondary/70"
            style={{
              background: "#F7F9F9",
              border: "1px solid rgba(5,139,127,0.12)",
            }}
          >
            <Shield className="w-3.5 h-3.5 text-primary/60" />
            {plan.description}
          </div>
        </div>

        {/* Orb + Features — two-column, no enclosing box */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: Price Orb */}
          <div className="w-full lg:w-[42%] flex justify-center">
            <PriceOrb plan={plan} />
          </div>

          {/* Right: Feature pills */}
          <div className="w-full lg:w-[58%]">
            <FeaturePills plan={plan} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Fade-up variant ───────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.58, ease: "easeOut" as const, delay: d },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [isCompany, setIsCompany] = useState(false);
  const [activePlanKey, setActivePlanKey] = useState<PlanKey>("semi");

  const plans = isCompany ? companyPlans : individualPlans;
  const activePlan = plans.find((p) => p.key === activePlanKey) ?? plans[1];

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative py-20 sm:py-24 md:py-28 px-5 sm:px-6 overflow-hidden"
      style={{ background: "#F7F9F9" }}
    >
      {/* Ambient blobs — all ellipses, no rectangles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(5,139,127,0.06) 0%, transparent 68%)" }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(15,174,158,0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-10">
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.07] border border-primary/20 text-primary text-[13px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              الأسعار
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.08}
            className="text-[26px] sm:text-[32px] md:text-[40px] font-extrabold text-text-primary leading-[1.28] tracking-tight mb-4"
          >
            اختر الخطة{" "}
            <span style={{ background: "linear-gradient(110deg, #058B7F 20%, #0FAE9E 60%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              المناسبة لك
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.14}
            className="text-[14px] sm:text-[15px] text-text-secondary/70 max-w-lg mx-auto leading-relaxed"
          >
            باقات مرنة تناسب الأفراد والشركات — ابدأ الآن وحقق أهدافك بسهولة
          </motion.p>
        </div>

        {/* ── Type toggle ── */}
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.2} className="mb-7">
          <TypeToggle isCompany={isCompany} onChange={setIsCompany} />
        </motion.div>

        {/* ── Plan pill selector ── */}
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.26} className="mb-12">
          <PlanPills plans={plans} activeKey={activePlanKey} onChange={setActivePlanKey} />
        </motion.div>

        {/* ── Orb + features (no card wrapper) ── */}
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.32}>
          <PricingDisplay plan={activePlan} />
        </motion.div>

        {/* ── Reassurance row ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.42}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
        >
          {["بدون عقود ملزمة", "إلغاء في أي وقت", "دفع آمن ومشفّر", "دعم متواصل"].map((t) => (
            <div key={t} className="flex items-center gap-1.5 text-[12px] text-text-secondary/45">
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(5,139,127,0.08)" }}>
                <Check className="w-2.5 h-2.5 text-primary" strokeWidth={3} />
              </div>
              {t}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
