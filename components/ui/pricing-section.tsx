"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, ArrowUpRight, BadgeCheck, Shield, Zap } from "lucide-react";

const NAVY  = "#0e2453";
const NAVY2 = "#091a3e";
const TEAL  = "#058B7F";
const TEAL_L = "#0FAE9E";

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
  features: { group: string; items: string[]; accent: "navy" | "teal" }[];
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
      { group: "الوصول والخدمات", accent: "navy", items: ["الوصول إلى جميع الخدمات", "5 طلبات شهريًا", "تصفح شركات التسويق", "البحث والمقارنة"] },
      { group: "الدعم والتقارير",  accent: "teal", items: ["دعم فني عبر واتساب", "تقارير أساسية", "إشعارات العروض", "لوحة تحكم بسيطة"] },
    ],
  },
  {
    key: "semi",
    label: "6 أشهر",
    sublabel: "الأكثر طلبًا",
    price: "799",
    period: "6 أشهر",
    saving: "وفّر 20%",
    popular: true,
    description: "الخيار الأمثل لأصحاب المشاريع الذين يريدون نتائج مستمرة",
    features: [
      { group: "الوصول والخدمات", accent: "navy", items: ["الوصول إلى جميع الخدمات", "15 طلب شهريًا", "أولوية في عرض الطلبات", "الاستشارات المجانية"] },
      { group: "الدعم والتقارير",  accent: "teal", items: ["دعم فني 24/7", "تقارير متقدمة", "تنبيهات ذكية", "لوحة تحكم متقدمة"] },
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
      { group: "الوصول والخدمات", accent: "navy", items: ["الوصول الكامل لجميع الخدمات", "طلبات غير محدودة", "ظهور مميز في النتائج", "باقة استشارات مجانية"] },
      { group: "الدعم والتقارير",  accent: "teal", items: ["دعم فني VIP", "تقارير شاملة وتفصيلية", "مدير حساب خاص", "وصول مبكر للميزات"] },
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
      { group: "الحضور والظهور", accent: "navy", items: ["حساب شركة موثق", "الظهور في قائمة الشركات", "10 عروض شهريًا", "صفحة شركة مخصصة"] },
      { group: "الإدارة والدعم",  accent: "teal", items: ["لوحة تحكم متقدمة", "إحصائيات الزيارات", "دعم فني مخصص", "إدارة العروض"] },
    ],
  },
  {
    key: "semi",
    label: "6 أشهر",
    sublabel: "الأكثر طلبًا",
    price: "1,999",
    period: "6 أشهر",
    saving: "وفّر 20%",
    popular: true,
    description: "للشركات التي ترغب في ظهور مميز وتقارير متقدمة",
    features: [
      { group: "الحضور والظهور", accent: "navy", items: ["ظهور مميز في النتائج", "30 عرض شهريًا", "شارة الشركة الموثوقة", "إعلان في الصفحة الرئيسية"] },
      { group: "الإدارة والدعم",  accent: "teal", items: ["تقارير وإحصائيات متقدمة", "دعم أولوية 24/7", "إدارة العروض بالجملة", "تحليلات العملاء"] },
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
      { group: "الحضور والظهور", accent: "navy", items: ["ظهور في الصفحة الرئيسية", "عروض غير محدودة", "حساب VIP موثق", "تسويق مجاني للشركة"] },
      { group: "الإدارة والدعم",  accent: "teal", items: ["مدير حساب مخصص", "تقارير تفصيلية شاملة", "API متكامل مع الأنظمة", "أولوية قصوى في الدعم"] },
    ],
  },
];

// ─── Individual / Company pill toggle ─────────────────────────────────────────
function TypeToggle({ isCompany, onChange }: { isCompany: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex justify-center">
      <div
        className="relative flex rounded-full p-1"
        style={{ background: "#fff", border: `1.5px solid rgba(14,36,83,0.12)`, boxShadow: "0 2px 8px rgba(14,36,83,0.08)" }}
      >
        {(["individual", "company"] as const).map((type) => {
          const active = type === "company" ? isCompany : !isCompany;
          return (
            <button
              key={type}
              onClick={() => onChange(type === "company")}
              className={`relative z-10 h-10 rounded-full px-7 text-[14px] font-semibold transition-colors duration-300`}
              style={{ color: active ? "#fff" : NAVY }}
            >
              {active && (
                <motion.span
                  layoutId="type-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 100%)`,
                    boxShadow: `0 4px 16px rgba(14,36,83,0.30)`,
                  }}
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
              background: isActive ? `linear-gradient(135deg, ${TEAL}, ${TEAL_L})` : "#ffffff",
              color: isActive ? "#ffffff" : NAVY,
              border: isActive ? "none" : `1.5px solid rgba(14,36,83,0.12)`,
              boxShadow: isActive ? `0 4px 20px rgba(14,36,83,0.30)` : "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-black px-2 py-0.5 rounded-full whitespace-nowrap pointer-events-none transition-opacity duration-200"
              style={{
                opacity: plan.popular && isActive ? 1 : 0,
                background: "#fff",
                color: TEAL,
                border: `1px solid ${TEAL}30`,
              }}
            >
              ⭐ الأشهر
            </span>
            {plan.label}
            {plan.saving && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: isActive ? "rgba(255,255,255,0.25)" : `rgba(14,36,83,0.07)`,
                  color: isActive ? "#fff" : NAVY,
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

// ─── Price Orb — navy gradient ─────────────────────────────────────────────────
function PriceOrb({ plan }: { plan: Plan }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow — navy */}
      <div
        className="absolute rounded-full"
        style={{
          width: "320px", height: "320px",
          background: `radial-gradient(circle, rgba(14,36,83,0.10) 0%, transparent 70%)`,
        }}
      />
      {/* Dashed orbit — teal */}
      <div
        className="absolute rounded-full"
        style={{ width: "280px", height: "280px", border: `1px dashed rgba(14,36,83,0.20)` }}
      />
      {/* Mid ring — navy */}
      <div
        className="absolute rounded-full"
        style={{ width: "230px", height: "230px", border: `1px solid rgba(14,36,83,0.10)` }}
      />

      {/* Main orb — navy gradient */}
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
          background: `linear-gradient(145deg, ${NAVY} 0%, ${NAVY2} 100%)`,
          boxShadow: `0 16px 56px rgba(14,36,83,0.42), 0 0 0 1.5px rgba(14,36,83,0.25), 0 2px 0 rgba(255,255,255,0.10) inset`,
        }}
      >
        {/* Teal inner shimmer ring */}
        <div
          className="absolute inset-3 rounded-full pointer-events-none"
          style={{ border: `1px solid rgba(22,45,110,0.20)` }}
        />
        {/* Price */}
        <div className="flex flex-col items-center" dir="ltr">
          <span className="text-[11px] font-semibold mb-1" style={{ color: "rgba(255,255,255,0.50)" }}>ريال سعودي</span>
          <span className="text-[46px] font-black text-white leading-none tracking-tight">{plan.price}</span>
          <span className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.50)" }}>/ {plan.period}</span>
        </div>
      </motion.div>

      {/* Popular badge — teal */}
      {plan.popular && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="absolute -top-3 right-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${TEAL}, ${TEAL_L})`,
            color: "#fff",
            fontSize: "11px", fontWeight: 700,
            boxShadow: `0 4px 14px rgba(14,36,83,0.32)`,
          }}
        >
          <Zap className="w-3 h-3" />
          الأكثر طلبًا
        </motion.div>
      )}

      {/* Saving badge — white pill with navy text */}
      {plan.saving && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="absolute -bottom-2 left-6 px-3 py-1.5 rounded-full"
          style={{
            background: "#fff",
            color: NAVY,
            fontSize: "11px", fontWeight: 800,
            border: `1.5px solid rgba(14,36,83,0.14)`,
            boxShadow: "0 4px 14px rgba(14,36,83,0.12)",
          }}
        >
          {plan.saving}
        </motion.div>
      )}

      {/* Orbit dots — alternating navy / teal */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 2 === 0 ? "6px" : "4px",
            height: i % 2 === 0 ? "6px" : "4px",
            background: i % 2 === 0 ? `rgba(14,36,83,0.25)` : `rgba(14,36,83,0.30)`,
            transform: `rotate(${deg}deg) translateY(-128px)`,
          }}
        />
      ))}
    </div>
  );
}

function FeaturePills({ plan }: { plan: Plan }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
      {plan.features.map((group, gi) => {
        const color = group.accent === "navy" ? NAVY : TEAL;
        const colorLight = group.accent === "navy" ? "rgba(14,36,83,0.04)" : "rgba(5,139,127,0.04)";
        const borderColor = group.accent === "navy" ? "rgba(14,36,83,0.12)" : "rgba(5,139,127,0.14)";
        const headerBg = group.accent === "navy"
          ? "linear-gradient(135deg, rgba(14,36,83,0.06) 0%, rgba(14,36,83,0.03) 100%)"
          : "linear-gradient(135deg, rgba(5,139,127,0.07) 0%, rgba(5,139,127,0.03) 100%)";
        return (
          <div
            key={gi}
            className="rounded-2xl overflow-hidden h-full flex flex-col"
            style={{
              background: "#ffffff",
              border: `1.5px solid ${borderColor}`,
              boxShadow: "0 2px 12px rgba(14,36,83,0.05)",
            }}
          >
            {/* Group header bar */}
            <div
              className="flex items-center gap-2 justify-end px-5 py-3 shrink-0"
              style={{
                background: headerBg,
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              <span
                className="text-[12px] font-black uppercase tracking-widest"
                style={{ color }}
              >
                {group.group}
              </span>
              <div
                className="h-6 w-6 rounded-full flex items-center justify-center"
                style={{ background: `${color}15` }}
              >
                <BadgeCheck className="w-3.5 h-3.5" style={{ color }} />
              </div>
            </div>

            {/* Feature items */}
            <ul className="flex flex-col gap-3 px-5 py-5 flex-1">
              {group.items.map((item, ii) => (
                <motion.li
                  key={`${plan.key}-${gi}-${ii}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.38, delay: gi * 0.1 + ii * 0.06, ease: "easeOut" }}
                  className="flex items-center justify-end gap-3"
                >
                  <span className="text-[14px] leading-snug text-right" style={{ color: "rgba(14,36,83,0.70)" }}>{item}</span>
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: "24px", height: "24px",
                      borderRadius: "50%",
                      background: `${color}10`,
                      border: `1.5px solid ${color}25`,
                    }}
                  >
                    <Check className="w-3 h-3" style={{ color }} strokeWidth={2.8} />
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// ─── Plan description pill ─────────────────────────────────────────────────────
function PricingDisplay({ plan }: { plan: Plan }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={plan.key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-5xl mx-auto"
      >
        <div className="flex justify-center mb-16 mt-4">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px]"
            style={{
              background: "#fff",
              border: `1px solid rgba(14,36,83,0.10)`,
              color: "rgba(14,36,83,0.60)",
              boxShadow: "0 1px 4px rgba(14,36,83,0.06)",
            }}
          >
            <Shield className="w-3.5 h-3.5" style={{ color: TEAL, opacity: 0.7 }} />
            {plan.description}
          </div>
        </div>

        <div className="flex flex-col items-center gap-20 mb-10">
          <div className="w-full flex justify-center py-8">
            <PriceOrb plan={plan} />
          </div>
          <div className="w-full max-w-4xl mx-auto">
            <FeaturePills plan={plan} />
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex justify-center mt-4 mb-4">
          <div className="flex flex-col items-center gap-3">
            <button
              className="flex items-center gap-2 px-10 py-4 rounded-full font-bold text-[16px] text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_L} 100%)`,
                boxShadow: `0 6px 28px rgba(14,36,83,0.36)`,
              }}
            >
              اشترك الآن
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-[12px]" style={{ color: "rgba(14,36,83,0.45)" }}>بدون رسوم خفية · إلغاء في أي وقت</p>
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
      {/* Ambient blobs — navy top, teal bottom */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-175 h-125 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, rgba(14,36,83,0.06) 0%, transparent 68%)` }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, rgba(14,36,83,0.06) 0%, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0} className="mb-4">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold"
              style={{
                background: "rgba(14,36,83,0.07)",
                border: "1px solid rgba(14,36,83,0.14)",
                color: NAVY,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TEAL }} />
              الأسعار
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.08}
            className="font-extrabold leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: NAVY }}
          >
            اختر الخطة{" "}
            <span style={{
              background: `linear-gradient(110deg, ${TEAL} 20%, ${TEAL_L} 60%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              المناسبة لك
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.14}
            className="text-[14px] sm:text-[15px] max-w-lg mx-auto leading-relaxed"
            style={{ color: "rgba(14,36,83,0.50)" }}
          >
            باقات مرنة تناسب الأفراد والشركات — ابدأ الآن وحقق أهدافك بسهولة
          </motion.p>
        </div>

        {/* ── Type toggle ── */}
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.2} className="mb-7">
          <TypeToggle isCompany={isCompany} onChange={setIsCompany} />
        </motion.div>

        {/* ── Plan pills ── */}
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.26} className="mb-12">
          <PlanPills plans={plans} activeKey={activePlanKey} onChange={setActivePlanKey} />
        </motion.div>

        {/* ── Display ── */}
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.32}>
          <PricingDisplay plan={activePlan} />
        </motion.div>

        {/* ── Reassurance row — alternating navy/teal checks ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.42}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
        >
          {[
            { text: "بدون عقود ملزمة", accent: NAVY },
            { text: "إلغاء في أي وقت",  accent: TEAL },
            { text: "دفع آمن ومشفّر",   accent: NAVY },
            { text: "دعم متواصل",       accent: TEAL },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-1.5 text-[12px]" style={{ color: "rgba(14,36,83,0.45)" }}>
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: `${t.accent}12` }}
              >
                <Check className="w-2.5 h-2.5" style={{ color: t.accent }} strokeWidth={3} />
              </div>
              {t.text}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
