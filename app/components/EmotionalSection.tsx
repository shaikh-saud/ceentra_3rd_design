"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingBag, Megaphone, Palette } from "lucide-react";

const PAIN_POINTS = [
  { text: "مو كل متجر يبيع", icon: ShoppingBag },
  { text: "مو كل إعلان يجيب عميل", icon: Megaphone },
  { text: "مو كل تصميم يبني ثقة", icon: Palette },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

/* ─────────── Growth Illustration ─────────── */
function GrowthIllustration({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" as const }}
      className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[540px] xl:max-w-[580px] mx-auto lg:mx-0"
    >
      <motion.div
        animate={isInView ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <svg viewBox="0 0 460 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="areaGrad" x1="230" y1="50" x2="230" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.14" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="50" y1="270" x2="400" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.35" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.18" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Orbit rings */}
          <circle cx="230" cy="180" r="160" stroke="white" strokeOpacity="0.04" strokeWidth="1" fill="none" />
          <circle cx="230" cy="180" r="110" stroke="white" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="3 7" fill="none" />

          {/* Grid */}
          {[300, 240, 180, 120, 60].map((y, i) => (
            <line key={y} x1="50" y1={y} x2="410" y2={y} stroke="white" strokeOpacity={i === 0 ? "0.08" : "0.03"} strokeWidth="1" strokeDasharray={i === 0 ? "0" : "2 8"} />
          ))}

          {/* Area fill */}
          <motion.path
            d="M70 280 C110 265, 140 250, 170 220 C200 190, 220 170, 250 140 C280 110, 310 85, 350 65 L390 48 L390 300 L70 300 Z"
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Growth curve */}
          <motion.path
            d="M70 280 C110 265, 140 250, 170 220 C200 190, 220 170, 250 140 C280 110, 310 85, 350 65 L390 48"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
          />

          {/* Data points */}
          {[
            { cx: 70, cy: 280, d: 0.5 },
            { cx: 170, cy: 220, d: 0.8 },
            { cx: 250, cy: 140, d: 1.0 },
            { cx: 390, cy: 48, d: 1.3 },
          ].map((dot, i) => (
            <motion.g key={i} initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: dot.d }}>
              <circle cx={dot.cx} cy={dot.cy} r="16" fill="url(#dotGlow)" />
              <circle cx={dot.cx} cy={dot.cy} r="5.5" fill="white" opacity="0.1" />
              <circle cx={dot.cx} cy={dot.cy} r="3" fill="white" />
            </motion.g>
          ))}

          {/* Card: Growth rate */}
          <motion.g initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 1.4 }}>
            <rect x="280" y="8" width="155" height="50" rx="14" fill="white" opacity="0.08" />
            <rect x="280" y="8" width="155" height="50" rx="14" stroke="white" strokeOpacity="0.1" strokeWidth="0.7" fill="none" />
            <circle cx="415" cy="33" r="11" fill="white" opacity="0.1" />
            <path d="M412 37 L415 30 L418 37" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            <text x="370" y="28" textAnchor="middle" fill="white" opacity="0.4" fontSize="9" fontFamily="inherit">معدل النمو</text>
            <text x="370" y="44" textAnchor="middle" fill="white" opacity="0.9" fontSize="15" fontWeight="800" fontFamily="inherit" direction="ltr" unicodeBidi="embed">+127%</text>
          </motion.g>

          {/* Card: System */}
          <motion.g initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 1.1 }}>
            <rect x="15" y="120" width="140" height="50" rx="14" fill="white" opacity="0.08" />
            <rect x="15" y="120" width="140" height="50" rx="14" stroke="white" strokeOpacity="0.1" strokeWidth="0.7" fill="none" />
            <circle cx="135" cy="145" r="11" fill="white" opacity="0.1" />
            <circle cx="135" cy="145" r="3.5" stroke="white" strokeWidth="1.2" fill="none" opacity="0.5" />
            <circle cx="135" cy="145" r="1.2" fill="white" opacity="0.7" />
            <text x="85" y="139" textAnchor="middle" fill="white" opacity="0.4" fontSize="9" fontFamily="inherit">النظام</text>
            <text x="85" y="155" textAnchor="middle" fill="white" opacity="0.9" fontSize="12" fontWeight="700" fontFamily="inherit">متكامل وفعّال</text>
          </motion.g>

          {/* Bottom flow */}
          {[
            { cx: 115, label: "هوية", d: 1.5 },
            { cx: 230, label: "تسويق", d: 1.6 },
            { cx: 345, label: "نمو", d: 1.7 },
          ].map((n) => (
            <motion.g key={n.label} initial={{ opacity: 0, y: 6 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: n.d }}>
              <rect x={n.cx - 32} y={360} width="64" height="26" rx="13" fill="white" opacity="0.06" stroke="white" strokeOpacity="0.1" strokeWidth="0.7" />
              <text x={n.cx} y={377} textAnchor="middle" fill="white" opacity="0.65" fontSize="11" fontWeight="600" fontFamily="inherit">{n.label}</text>
            </motion.g>
          ))}
          {[163, 278].map((x, i) => (
            <motion.g key={x} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.8 + i * 0.08 }}>
              <line x1={x} y1={373} x2={x + 14} y2={373} stroke="white" strokeOpacity="0.15" strokeWidth="1" />
              <polygon points={`${x + 14},371 ${x + 14},375 ${x + 18},373`} fill="white" opacity="0.15" />
            </motion.g>
          ))}

          {/* Particles */}
          {[
            { cx: 420, cy: 110, r: 1.5 },
            { cx: 45, cy: 70, r: 1.2 },
            { cx: 380, cy: 240, r: 1.2 },
            { cx: 130, cy: 320, r: 1.5 },
          ].map((p, i) => (
            <motion.circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="white" initial={{ opacity: 0 }} animate={isInView ? { opacity: [0, 0.25, 0.1] } : {}} transition={{ duration: 3, delay: 0.8 + i * 0.3, repeat: Infinity, repeatType: "reverse" as const }} />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════ EMOTIONAL SECTION ═══════════ */
export default function EmotionalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #058B7F 0%, #046E65 100%)",
      }}
    >
      {/* Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] bg-white/2 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        {/* Two-Column: content right, illustration left (RTL) */}
        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-14 xl:gap-20">

          {/* ── Content Column ── */}
          <div className="flex-1 order-1 w-full text-center lg:text-right">
            <div className="max-w-[620px] mx-auto lg:mx-0">
              {/* Headline */}
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0}
                className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] font-extrabold text-white leading-snug mb-4 sm:mb-5"
              >
                نعرف شعورك لما تبدأ مشروعك
              </motion.h2>

              {/* Intro */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.1}
                className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] text-white/65 max-w-[480px] mx-auto lg:mx-0 mb-2 sm:mb-3"
              >
                نعرف قد إيش تعبت على فكرتك،
                <br />
                وفكرت كثير كيف تطلقها بالشكل الصحيح.
              </motion.p>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.17}
                className="text-[13px] sm:text-[14px] text-white/35 font-semibold mb-5 sm:mb-6"
              >
                لكن الواقع يقول:
              </motion.p>

              {/* Cards: 1 col mobile, 3 col sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 sm:mb-7">
                {PAIN_POINTS.map((point, i) => {
                  const Icon = point.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      custom={0.24 + i * 0.08}
                      whileHover={{ y: -4 }}
                      className="group flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:gap-0 min-h-0 sm:min-h-[105px] bg-white/6 hover:bg-white/10 border border-white/8 hover:border-white/20 rounded-xl py-3 sm:py-4 px-4 sm:px-3 sm:text-center cursor-default transition-all duration-300"
                    >
                      <div className="w-9 h-9 sm:mb-2.5 rounded-lg bg-white/8 group-hover:bg-white/12 flex items-center justify-center shrink-0 transition-colors duration-300">
                        <Icon className="w-[18px] h-[18px] text-white/50 group-hover:text-white transition-colors duration-300" strokeWidth={1.6} />
                      </div>
                      <p className="text-[14px] sm:text-[13px] md:text-[14px] font-bold text-white leading-snug">
                        {point.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Insight */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.5}
                className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] font-extrabold text-white leading-snug mb-3 sm:mb-4"
              >
                الفرق الحقيقي… هو النظام اللي خلف المشروع.
              </motion.p>

              {/* Solution */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.6}
                className="text-[14px] sm:text-[15px] md:text-[16px] leading-[1.85] text-white/60 max-w-[500px] mx-auto lg:mx-0"
              >
                <p className="mb-2.5 sm:mb-3">
                  في{" "}
                  <span className="font-bold text-white border-b border-white/20 pb-0.5">
                    Brandgo
                  </span>
                  ، نبني لك هذا النظام من البداية.
                </p>
                <p className="text-white/45">
                  نظام يخلي مشروعك يظهر باحتراف، ويجذب العملاء الصح، ويعطيك بداية تليق بطموحك.
                </p>
              </motion.div>
            </div>
          </div>

          {/* ── Illustration Column ── */}
          <div className="flex-1 w-full lg:w-auto order-2 flex items-center justify-center">
            <GrowthIllustration isInView={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
}
