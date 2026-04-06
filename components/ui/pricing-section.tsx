"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

/* ─────────── Plan Data ─────────── */
type Plan = {
  name: string;
  description: string;
  price: string;
  period: string;
  buttonText: string;
  popular?: boolean;
  features: string[];
};

const individualPlans: Plan[] = [
  {
    name: "الباقة الشهرية",
    description: "مثالية لمن يريد تجربة المنصة والبدء بسرعة",
    price: "199",
    period: "شهريًا",
    buttonText: "اشترك الآن",
    features: [
      "الوصول إلى جميع الخدمات",
      "دعم فني عبر واتساب",
      "5 طلبات شهريًا",
      "تقارير أساسية",
    ],
  },
  {
    name: "الباقة نصف السنوية",
    description: "الأنسب لأصحاب المشاريع الذين يبحثون عن نتائج مستمرة",
    price: "799",
    period: "6 أشهر",
    buttonText: "اشترك الآن",
    popular: true,
    features: [
      "الوصول إلى جميع الخدمات",
      "دعم فني 24/7",
      "15 طلب شهريًا",
      "تقارير متقدمة",
      "أولوية في العروض",
    ],
  },
  {
    name: "الباقة السنوية",
    description: "أفضل قيمة للراغبين في الاستفادة الكاملة من المنصة",
    price: "999",
    period: "سنويًا",
    buttonText: "اشترك الآن",
    features: [
      "الوصول الكامل لجميع الخدمات",
      "دعم فني VIP",
      "طلبات غير محدودة",
      "تقارير شاملة",
      "مدير حساب خاص",
    ],
  },
];

const companyPlans: Plan[] = [
  {
    name: "الباقة الشهرية",
    description: "للشركات التي تبحث عن تواجد فعّال على المنصة",
    price: "499",
    period: "شهريًا",
    buttonText: "اشترك الآن",
    features: [
      "حساب شركة موثق",
      "الظهور في قائمة الشركات",
      "10 عروض شهريًا",
      "لوحة تحكم متقدمة",
    ],
  },
  {
    name: "الباقة نصف السنوية",
    description: "للشركات التي ترغب في ظهور مميز وتقارير متقدمة",
    price: "1,999",
    period: "6 أشهر",
    buttonText: "اشترك الآن",
    popular: true,
    features: [
      "حساب شركة موثق",
      "ظهور مميز",
      "30 عرض شهريًا",
      "تقارير وإحصائيات",
      "دعم أولوية",
    ],
  },
  {
    name: "الباقة السنوية",
    description: "الحل الشامل للشركات الكبيرة مع إدارة مخصصة",
    price: "2,999",
    period: "سنويًا",
    buttonText: "اشترك الآن",
    features: [
      "حساب VIP",
      "ظهور في الصفحة الرئيسية",
      "عروض غير محدودة",
      "مدير حساب مخصص",
      "تقارير تفصيلية",
    ],
  },
];

/* ─────────── Tab Switch ─────────── */
const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-50 mx-auto flex w-fit rounded-full bg-white border border-gray-200 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={`relative z-10 w-fit sm:h-12 h-10 rounded-full sm:px-8 px-4 sm:py-2 py-1 font-semibold transition-colors ${selected === "0"
              ? "text-white"
              : "text-muted-foreground hover:text-text-primary"
            }`}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"pricing-switch"}
              className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm shadow-primary/40 border-primary bg-gradient-to-t from-primary via-primary-light to-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">الأفراد</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={`relative z-10 w-fit sm:h-12 h-10 flex-shrink-0 rounded-full sm:px-8 px-4 sm:py-2 py-1 font-semibold transition-colors ${selected === "1"
              ? "text-white"
              : "text-muted-foreground hover:text-text-primary"
            }`}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"pricing-switch"}
              className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm shadow-primary/40 border-primary bg-gradient-to-t from-primary via-primary-light to-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">الشركات</span>
        </button>
      </div>
    </div>
  );
};

/* ─────────── Main Section ─────────── */
export default function PricingSection() {
  const [isCompany, setIsCompany] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const toggleTab = (value: string) =>
    setIsCompany(Number.parseInt(value) === 1);

  const activePlans = isCompany ? companyPlans : individualPlans;

  return (
    <div
      id="pricing"
      className="px-4 py-20 sm:py-24 md:py-28 mx-auto relative bg-bg-light overflow-hidden"
      ref={pricingRef}
    >
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, #058B7F 0%, transparent 70%)`,
          opacity: 0.06,
          mixBlendMode: "multiply",
        }}
      />

      {/* Header */}
      <div className="text-center mb-8 max-w-3xl mx-auto relative z-10">
        <TimelineContent
          as="div"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/7 text-primary text-[13px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            الأسعار
          </span>
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-extrabold text-text-primary leading-snug mb-4"
        >
          اختر الخطة المناسبة لك
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={2}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="sm:text-base text-sm text-text-secondary sm:w-[70%] w-[80%] mx-auto"
        >
          باقات مرنة تناسب الأفراد والشركات، ابدأ الآن وحقق أهدافك بسهولة
        </TimelineContent>
      </div>

      {/* Toggle */}
      <TimelineContent
        as="div"
        animationNum={3}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="relative z-10"
      >
        <PricingSwitch onSwitch={toggleTab} />
      </TimelineContent>

      {/* Cards */}
      <div className="grid md:grid-cols-3 max-w-7xl gap-5 py-8 mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {activePlans.map((plan, index) => (
            <motion.div
              key={`${isCompany ? "company" : "individual"}-${plan.name}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <Card
                className={`relative border-gray-200 rounded-2xl h-full ${plan.popular
                    ? "ring-2 ring-primary bg-primary/[0.03]"
                    : "bg-white"
                  }`}
              >
                <CardHeader className="text-right">
                  <div className="flex justify-between items-start">
                    <div>
                      {plan.popular && (
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          الأكثر طلبًا
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-end gap-2">
                    <span className="text-text-secondary text-sm">
                      / {plan.period}
                    </span>
                    <span className="text-[13px] text-text-secondary">ريال</span>
                    <span className="text-4xl font-bold text-text-primary" dir="ltr">
                      {plan.price}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <button
                    className={`w-full mb-6 p-4 text-lg font-bold rounded-xl transition-all duration-300 cursor-pointer ${plan.popular
                        ? "bg-gradient-to-t from-primary to-primary-light shadow-lg shadow-primary/25 border border-primary text-white hover:shadow-primary/40"
                        : "bg-gradient-to-t from-bg-dark to-[#1a3d3b] shadow-lg shadow-bg-dark/30 border border-bg-dark/60 text-white hover:shadow-bg-dark/50"
                      }`}
                  >
                    {plan.buttonText}
                  </button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 justify-end"
                      >
                        <span className="text-sm text-text-secondary">
                          {feature}
                        </span>
                        <span className="h-6 w-6 bg-primary/10 border border-primary/30 rounded-full grid place-content-center shrink-0">
                          <CheckCheck className="h-3.5 w-3.5 text-primary" />
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
