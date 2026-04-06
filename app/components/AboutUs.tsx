"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useCallback } from "react";
import { ShieldCheck, Fingerprint, Headset } from "lucide-react";
import Image from "next/image";

/* ─────────── Data ─────────── */
const counters = [
  { value: 200, suffix: "+", label: "شركة موثقة" },
  { value: 500, suffix: "+", label: "مشروع ناجح" },
  { value: 98, suffix: "%", label: "رضا العملاء" },
  { value: 24, suffix: "/7", label: "دعم فني" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "شركات موثوقة",
    description: "نعمل فقط مع شركات معتمدة لضمان الجودة",
  },
  {
    icon: Fingerprint,
    title: "تجربة آمنة",
    description: "نوفر بيئة آمنة تضمن حقوق جميع الأطراف",
  },
  {
    icon: Headset,
    title: "دعم مستمر",
    description: "فريق دعم متاح لمساعدتك في أي وقت",
  },
];

function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
}: {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const getDecimalPlaces = (num: number) => {
    const str = num.toString();
    if (str.includes(".")) {
      const decimals = str.split(".")[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;
      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };
      const formattedNumber = Intl.NumberFormat("en-US", options).format(latest);
      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === "down" ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (startWhen) {
      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [startWhen, motionValue, direction, from, to, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix?: string;
  isInView: boolean;
}) {
  return (
    <span className="text-[28px] sm:text-[32px] font-extrabold text-primary leading-none" dir="ltr">
      {suffix !== "%" && suffix !== "/7" && <span className="text-primary/60 text-[20px] sm:text-[22px] font-bold">+</span>}
      <CountUp to={value} startWhen={isInView} duration={2} className="inline" />
      {suffix === "%" && <span className="text-primary/60 text-[20px] sm:text-[22px] font-bold">%</span>}
      {suffix === "/7" && <span className="text-primary/60 text-[20px] sm:text-[22px] font-bold">/7</span>}
    </span>
  );
}

/* ─────── Fade animation ─────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

/* ═══════════ ABOUT US SECTION ═══════════ */
export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 px-5 sm:px-6 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* ══════ Main: Image + Text ══════ */}
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-14 xl:gap-20 mb-16 sm:mb-20">
          {/* ── Image (Left in LTR / visually left) ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
            className="flex-1 w-full order-1 lg:order-2 self-stretch"
          >
            <div className="relative w-full h-[300px] sm:h-[360px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <Image
                src="/about-office.png"
                alt="Centra Office"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* ── Text Content (Right in RTL) ── */}
          <div className="flex-1 w-full order-2 lg:order-1 text-center lg:text-right">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="mb-5 flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] text-primary py-1.5 px-4 text-[13px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
                من نحن
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.06}
              className="text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px] font-extrabold tracking-tight text-text-primary leading-[1.35] mb-5"
            >
              منصة سنترَا لربطك بأفضل
              <br />
              <span className="text-primary">شركات التسويق الرقمي</span>
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.12}
              className="text-[14px] sm:text-[15px] md:text-[16px] leading-[1.9] text-text-secondary/75 max-w-[500px] mx-auto lg:mx-0 mb-7"
            >
              سنترَا هي منصة متخصصة تربط أصحاب الأعمال بشركات التسويق الرقمي
              الموثوقة في المملكة العربية السعودية. نهدف إلى تسهيل الوصول إلى
              خدمات تسويقية احترافية من خلال بيئة آمنة وشفافة تضمن جودة النتائج
              وسهولة التواصل.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.18}
              className="flex justify-center lg:justify-start mb-10"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-full hover:bg-primary-dark transition-colors duration-300 shadow-[0_4px_16px_rgba(5,139,127,0.25)] hover:shadow-[0_6px_24px_rgba(5,139,127,0.35)]"
              >
                تواصل معنا
              </a>
            </motion.div>

            {/* ── Counters Row (directly under CTA) ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.24}
              className="grid grid-cols-4 gap-0"
            >
              {counters.map((counter, index) => (
                <div
                  key={index}
                  className={`text-center lg:text-right px-2 sm:px-3 ${
                    index < counters.length - 1
                      ? "border-l border-border/60"
                      : ""
                  }`}
                >
                  <AnimatedCounter
                    value={counter.value}
                    suffix={counter.suffix}
                    isInView={isInView}
                  />
                  <p className="text-[11px] sm:text-[13px] text-text-secondary/55 mt-1.5 font-medium whitespace-nowrap">
                    {counter.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ══════ Feature Cards ══════ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.35 + index * 0.1}
                className="group bg-[#F7F9F9] hover:bg-white border border-border/50 hover:border-primary/20 rounded-2xl p-6 sm:p-7 text-center transition-all duration-400 hover:shadow-[0_8px_32px_rgba(5,139,127,0.08)] cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/[0.08] group-hover:bg-primary/[0.14] flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Icon
                    className="w-5 h-5 text-primary"
                    strokeWidth={1.8}
                  />
                </div>
                <h3 className="text-[15px] sm:text-[16px] font-bold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-text-secondary/60 leading-[1.75] max-w-[240px] mx-auto">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
