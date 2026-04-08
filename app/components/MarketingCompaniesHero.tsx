"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Search } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

interface Props {
  onSearch: (query: string) => void;
}

export default function MarketingCompaniesHero({ onSearch }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [query, setQuery] = useState("");

  const handleSearch = () => onSearch(query);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden"
      style={{ background: "#058B7F" }}
      dir="rtl"
    >
      {/* Radial centre glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 75% at 50% 50%, rgba(15,174,158,0.22) 0%, transparent 70%)",
        }}
      />
      {/* Top-right blob */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(15,174,158,0.20) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      {/* Bottom-left blob */}
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(4,110,101,0.22) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Tag pill */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="mb-4"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-[13px] font-semibold"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            دليل الشركات الموثقة
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.08}
          className="font-extrabold text-white leading-tight tracking-tight"
          style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)" }}
        >
          شركات التسويق
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.16}
          className="mt-3 text-[15px] sm:text-[16px] leading-relaxed max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          تصفح أفضل شركات التسويق الموثقة في المملكة
        </motion.p>

        {/* Search bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.24}
          className="mt-8 max-w-2xl mx-auto"
        >
          <div
            className="flex items-center rounded-full overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.98)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ابحث عن شركة..."
              className="flex-1 bg-transparent px-5 py-3.5 text-[15px] outline-none min-w-0 font-[inherit]"
              style={{ color: "#0e2453" }}
              dir="rtl"
            />
            <button
              onClick={handleSearch}
              className="shrink-0 m-1.5 h-10 px-5 flex items-center gap-2 rounded-full font-bold text-[13px] text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
                boxShadow: "0 4px 16px rgba(5,139,127,0.45)",
              }}
            >
              <Search className="w-4 h-4" strokeWidth={2.2} />
              بحث
            </button>
          </div>
        </motion.div>

        {/* Stats pills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.32}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { value: "120+", label: "شركة موثقة" },
            { value: "15", label: "مدينة" },
            { value: "4.8 ★", label: "متوسط التقييم" },
            { value: "800+", label: "مشروع منجز" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <span className="text-[14px] font-black text-white">{s.value}</span>
              <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.65)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
