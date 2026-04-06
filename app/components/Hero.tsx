"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, Shield, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

// ─── Gradient Bars Background ────────────────────────────────────────────────
const GradientBars: React.FC = () => {
  const numBars = 18;

  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    return 28 + 72 * Math.pow(distanceFromCenter * 2, 1.15);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="flex h-full w-full">
        {Array.from({ length: numBars }).map((_, index) => (
          <div
            key={index}
            style={{
              flex: `1 0 calc(100% / ${numBars})`,
              maxWidth: `calc(100% / ${numBars})`,
              height: "100%",
              background:
                "linear-gradient(to top, #058B7F 0%, rgba(5,139,127,0.4) 40%, transparent 100%)",
              transform: `scaleY(${calculateHeight(index, numBars) / 100})`,
              transformOrigin: "bottom",
              animation: `pulseBar 3.5s ease-in-out infinite alternate`,
              animationDelay: `${index * 0.13}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Trust Pill ──────────────────────────────────────────────────────────────
const TrustPill: React.FC = () => {
  const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  ];

  return (
    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-2 px-4">
      {/* Avatars — forced LTR so overlap direction is consistent */}
      <div className="flex" style={{ direction: "ltr" }}>
        {avatars.map((src, i) => (
          <div
            key={i}
            className="h-8 w-8 rounded-full overflow-hidden border-2 border-bg-dark -ml-2 first:ml-0"
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <p className="text-white/90 text-sm font-semibold whitespace-nowrap">
        <span className="text-primary-light">+200</span> شركة موثّقة ومسجّلة
      </p>
    </div>
  );
};

// ─── Bottom Stats ─────────────────────────────────────────────────────────────
const statItems = [
  { icon: Shield, label: "شركات موثّقة ومعتمدة" },
  { icon: CheckCircle2, label: "تجربة آمنة وشفافة" },
  { icon: Search, label: "سهولة البحث والمقارنة" },
  { icon: Star, label: "98% رضا العملاء" },
];

// ─── Animation Helper ─────────────────────────────────────────────────────────
const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const, delay },
});

// ═══════════════════════════════════════════════════════════════════════════════
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 bg-bg-dark"
    >
      {/* ── Gradient Bars ── */}
      <GradientBars />

      {/* ── Multi-layer overlay: keep bars visible at bottom, fade to dark at top ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-transparent via-bg-dark/40 to-bg-dark/85 pointer-events-none" />

      {/* ── Ambient radial glow centred on content ── */}
      <div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(circle, rgba(5,139,127,0.16) 0%, transparent 65%)",
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center">

        {/* Trust Pill */}
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <TrustPill />
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-extrabold leading-[1.3] tracking-tight text-white"
          style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.6rem)" }}
        >
          <span className="block">منصتك الموثوقة للعثور على</span>
          <span
            className="block mt-2"
            style={{
              background: "linear-gradient(100deg, #0FAE9E 20%, #ffffff 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            أفضل شركات التسويق الرقمي
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          {...fadeUp(0.32)}
          className="mt-6 leading-[1.95] text-white/60 max-w-2xl mx-auto"
          style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.12rem)" }}
        >
          اكتشف بسهولة شركات تسويق موثوقة، قارن الخدمات، وابدأ في تنمية أعمالك
          بثقة. سنترَا توفر لك تجربة آمنة وسلسة للتواصل مع أفضل الشركات
          وتحقيق نتائج حقيقية.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.44)}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm mx-auto"
        >
          {/* Primary */}
          <Link
            href="#contact"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-[15px] rounded-full bg-primary text-white font-bold text-[15px] transition-all duration-300 hover:bg-primary-dark hover:scale-[1.03]"
            style={{ boxShadow: "0 4px 24px rgba(5,139,127,0.45)" }}
          >
            ابدأ الآن
            <ArrowUpRight className="h-5 w-5" />
          </Link>

          {/* Secondary (glass) */}
          <Link
            href="#solutions"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-[15px] rounded-full bg-white/10 hover:bg-white/18 border border-white/25 hover:border-white/50 text-white font-bold text-[15px] transition-all duration-300 backdrop-blur-sm hover:scale-[1.03]"
          >
            <Search className="h-5 w-5" />
            استكشف الخدمات
          </Link>
        </motion.div>

        {/* Divider */}
        <motion.div
          {...fadeUp(0.52)}
          className="mt-12 w-px h-8 bg-white/15 mx-auto"
        />

        {/* Stats Row */}
        <motion.div
          {...fadeUp(0.58)}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {statItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-white/45 text-[13px]"
            >
              <item.icon className="w-[15px] h-[15px] text-primary-light/60 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
