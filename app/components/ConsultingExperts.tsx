"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star,
  CalendarCheck,
  MessageSquare,
  ChevronDown,
  X,
  Users2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Expert {
  id:             number;
  name:           string;
  title:          string;
  specialization: string;
  experience:     number;
  rating:         number;
  sessions:       number;
  price:          number;
  online:         boolean;
  avatarGradient: [string, string];
  initials:       string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const ALL_EXPERTS: Expert[] = [
  {
    id: 1, name: "د. أحمد الرشيد",   title: "خبير تسويق رقمي", specialization: "استراتيجية التسويق",
    experience: 15, rating: 4.9, sessions: 320, price: 500, online: true,
    avatarGradient: ["#058B7F", "#0FAE9E"], initials: "أر",
  },
  {
    id: 2, name: "م. سارة العتيبي",  title: "مديرة إعلانات",    specialization: "الحملات الإعلانية",
    experience: 8,  rating: 4.8, sessions: 187, price: 400, online: false,
    avatarGradient: ["#0e2453", "#162d6e"], initials: "سع",
  },
  {
    id: 3, name: "أ. محمد الشمري",  title: "خبير تجارة إلكترونية", specialization: "التجارة الإلكترونية",
    experience: 10, rating: 4.7, sessions: 245, price: 450, online: true,
    avatarGradient: ["#046E65", "#058B7F"], initials: "مش",
  },
  {
    id: 4, name: "م. نورة القحطاني", title: "مصممة هوية بصرية",  specialization: "الهوية البصرية",
    experience: 6,  rating: 4.6, sessions:  98, price: 350, online: true,
    avatarGradient: ["#091a3e", "#0e2453"], initials: "نق",
  },
  {
    id: 5, name: "د. فهد المالكي",   title: "استشاري تسويقي أول", specialization: "استراتيجية التسويق",
    experience: 12, rating: 4.9, sessions: 410, price: 600, online: false,
    avatarGradient: ["#058B7F", "#091a3e"], initials: "فم",
  },
  {
    id: 6, name: "أ. خالد الدوسري", title: "متخصص إعلانات رقمية", specialization: "الحملات الإعلانية",
    experience: 7,  rating: 4.7, sessions: 156, price: 380, online: true,
    avatarGradient: ["#0e2453", "#046E65"], initials: "خد",
  },
];

const SPECIALIZATIONS = ["جميع التخصصات", "استراتيجية التسويق", "الحملات الإعلانية", "الهوية البصرية", "التجارة الإلكترونية"];
const SORT_OPTIONS    = ["الأعلى تقييمًا", "الأكثر جلسات", "الأقل سعرًا", "الأكثر خبرة"];

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function Dropdown({
  value, options, onChange, placeholder,
}: { value: string; options: string[]; onChange: (v: string) => void; placeholder: string }) {
  const [open, setOpen] = useState(false);
  const active = value !== placeholder && value !== options[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 h-10 px-4 rounded-full text-[13px] font-semibold transition-all duration-200 whitespace-nowrap"
        style={{
          background: active ? "rgba(5,139,127,0.09)" : "rgba(14,36,83,0.04)",
          border:     active ? "1px solid rgba(5,139,127,0.28)" : "1px solid rgba(14,36,83,0.12)",
          color:      active ? "#058B7F" : "#0e2453",
        }}
      >
        {value || placeholder}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.2}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute top-full mt-2 right-0 z-50 min-w-[200px] rounded-2xl py-1.5 overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(14,36,83,0.08)",
                boxShadow: "0 12px 40px rgba(14,36,83,0.10)",
              }}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className="w-full text-right px-4 py-2.5 text-[13px] flex items-center justify-between gap-3 transition-colors duration-120"
                  style={{
                    color:      opt === value ? "#058B7F" : "#0e2453",
                    background: opt === value ? "rgba(5,139,127,0.07)" : "transparent",
                    fontWeight: opt === value ? 700 : 500,
                  }}
                >
                  {opt}
                  {opt === value && (
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#058B7F" }} />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Expert Card ──────────────────────────────────────────────────────────────
function ExpertCard({ expert, index }: { expert: Expert; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.50, ease: "easeOut", delay: index * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="cursor-pointer"
      dir="rtl"
    >
      <div
        style={{
          borderRadius: "20px",
          background: "#ffffff",
          border: hovered
            ? "1px solid rgba(5,139,127,0.28)"
            : "1px solid rgba(14,36,83,0.07)",
          boxShadow: hovered
            ? "0 20px 56px rgba(14,36,83,0.09), 0 0 0 1px rgba(15,174,158,0.22), 0 0 28px rgba(5,139,127,0.09)"
            : "0 4px 20px rgba(14,36,83,0.06)",
          transition: "all 0.28s ease",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          padding: "22px",
        }}
      >
        {/* Avatar row */}
        <div className="flex items-start justify-between mb-5">
          {/* Avatar + online */}
          <div className="relative shrink-0">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-[17px]"
              style={{
                background: `linear-gradient(135deg, ${expert.avatarGradient[0]} 0%, ${expert.avatarGradient[1]} 100%)`,
                boxShadow: hovered ? `0 4px 18px rgba(5,139,127,0.30)` : "none",
                transition: "box-shadow 0.28s",
              }}
            >
              {expert.initials}
            </div>
            {/* Online dot */}
            <span
              className="absolute -bottom-0.5 -left-0.5 w-3.5 h-3.5 rounded-full"
              style={{
                background: expert.online ? "#22c55e" : "#94a3b8",
                border: "2px solid #ffffff",
                boxShadow: expert.online ? "0 0 6px rgba(34,197,94,0.50)" : "none",
              }}
            />
          </div>

          {/* Rating badge */}
          <span
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
            style={{
              background: "rgba(251,191,36,0.10)",
              color: "#d97706",
              border: "1px solid rgba(251,191,36,0.25)",
            }}
          >
            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" strokeWidth={0} />
            {expert.rating}
          </span>
        </div>

        {/* Name + title */}
        <h3
          className="font-extrabold text-[15.5px] leading-snug mb-0.5 transition-colors duration-250"
          style={{ color: hovered ? "#058B7F" : "#0e2453" }}
        >
          {expert.name}
        </h3>
        <p className="text-[12px] font-semibold mb-1" style={{ color: "rgba(14,36,83,0.50)" }}>
          {expert.title}
        </p>

        {/* Specialization tag */}
        <div className="mb-4">
          <span
            className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
            style={{
              background: "rgba(15,174,158,0.10)",
              color: "#0FAE9E",
              border: "1px solid rgba(15,174,158,0.22)",
            }}
          >
            {expert.specialization}
          </span>
        </div>

        {/* Experience + sessions */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[12px] font-semibold" style={{ color: "rgba(14,36,83,0.55)" }}>
            {expert.experience} سنة خبرة
          </span>
          <span className="flex items-center gap-1 text-[12px]" style={{ color: "rgba(14,36,83,0.45)" }}>
            <CalendarCheck className="w-3.5 h-3.5" strokeWidth={1.8} />
            {expert.sessions} جلسة
          </span>
        </div>

        {/* Divider */}
        <div className="my-3" style={{ borderTop: "1px solid rgba(14,36,83,0.07)" }} />

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[18px] font-black" style={{ color: hovered ? "#0FAE9E" : "#058B7F" }}>
              {expert.price.toFixed(2)}
            </span>
            <span className="text-[12px] font-semibold mr-1" style={{ color: "rgba(14,36,83,0.45)" }}>
              ر.س / ساعة
            </span>
          </div>
          {expert.online ? (
            <span
              className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(34,197,94,0.10)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.22)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
              متاح الآن
            </span>
          ) : (
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(14,36,83,0.06)", color: "rgba(14,36,83,0.50)", border: "1px solid rgba(14,36,83,0.12)" }}
            >
              غير متاح
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            className="flex-1 h-10 rounded-full font-bold text-[13px] transition-all duration-250 flex items-center justify-center gap-1.5"
            style={{
              background: hovered
                ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                : "rgba(5,139,127,0.08)",
              color:  hovered ? "#ffffff" : "#058B7F",
              border: "1px solid rgba(15,174,158,0.25)",
              boxShadow: hovered ? "0 4px 18px rgba(5,139,127,0.32)" : "none",
            }}
          >
            <CalendarCheck className="w-3.5 h-3.5" strokeWidth={2} />
            احجز جلسة
          </button>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-250"
            style={{
              background: hovered ? "rgba(14,36,83,0.08)" : "rgba(14,36,83,0.04)",
              border: "1px solid rgba(14,36,83,0.12)",
              color: "#0e2453",
            }}
          >
            <MessageSquare className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Background blobs ─────────────────────────────────────────────────────────
function BgBlobs() {
  return (
    <>
      <div
        className="absolute -top-28 -right-28 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,174,158,0.06) 0%, transparent 65%)", filter: "blur(52px)" }}
      />
      <div
        className="absolute bottom-0 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(5,139,127,0.05) 0%, transparent 60%)", filter: "blur(48px)" }}
      />
    </>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.52, ease: "easeOut" as const, delay: d },
  }),
};

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ConsultingExperts() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [spec, setSpec] = useState("جميع التخصصات");
  const [sort, setSort] = useState("الأعلى تقييمًا");

  const filtered = useMemo(() => {
    let list = ALL_EXPERTS.filter((e) =>
      spec === "جميع التخصصات" || e.specialization === spec
    );
    if (sort === "الأعلى تقييمًا")   list = [...list].sort((a, b) => b.rating    - a.rating);
    if (sort === "الأكثر جلسات")     list = [...list].sort((a, b) => b.sessions  - a.sessions);
    if (sort === "الأقل سعرًا")      list = [...list].sort((a, b) => a.price     - b.price);
    if (sort === "الأكثر خبرة")      list = [...list].sort((a, b) => b.experience - a.experience);
    return list;
  }, [spec, sort]);

  const hasFilter = spec !== "جميع التخصصات";

  return (
    <section
      ref={ref}
      id="experts"
      className="relative py-20 sm:py-24 overflow-hidden"
      style={{ background: "#F7F9F9" }}
      dir="rtl"
    >
      <BgBlobs />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}
              className="mb-3"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold"
                style={{
                  background: "rgba(5,139,127,0.08)",
                  border: "1px solid rgba(5,139,127,0.20)",
                  color: "#058B7F",
                }}
              >
                <Users2 className="w-3.5 h-3.5" strokeWidth={2} />
                خبراء موثقون
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.08}
              className="font-extrabold leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", color: "#0e2453" }}
            >
              المستشارون
            </motion.h2>
            <motion.p
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.14}
              className="mt-2 text-[14.5px]"
              style={{ color: "rgba(14,36,83,0.52)" }}
            >
              اختر المستشار المناسب لك
            </motion.p>
          </div>

          {/* Controls */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0.20}
            className="flex items-center gap-2.5 flex-wrap"
          >
            <Dropdown
              value={spec}
              options={SPECIALIZATIONS}
              onChange={(v) => setSpec(v)}
              placeholder="جميع التخصصات"
            />
            <Dropdown
              value={sort}
              options={SORT_OPTIONS}
              onChange={(v) => setSort(v)}
              placeholder="الترتيب"
            />
            {hasFilter && (
              <button
                onClick={() => setSpec("جميع التخصصات")}
                className="flex items-center gap-1.5 h-10 px-3 rounded-full text-[12px] font-semibold"
                style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", color: "#ef4444" }}
              >
                <X className="w-3 h-3" strokeWidth={2.5} />
                مسح
              </button>
            )}
            <span className="text-[12px]" style={{ color: "rgba(14,36,83,0.42)" }}>
              {filtered.length} مستشار
            </span>
          </motion.div>
        </div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${spec}-${sort}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center py-16 text-center"
              >
                <Users2 className="w-10 h-10 mb-3" style={{ color: "rgba(14,36,83,0.25)" }} strokeWidth={1.5} />
                <p className="font-semibold text-[15px] mb-1" style={{ color: "#0e2453" }}>
                  لا يوجد مستشارون
                </p>
                <p className="text-[13px]" style={{ color: "rgba(14,36,83,0.48)" }}>
                  جرّب تغيير التخصص
                </p>
              </motion.div>
            ) : (
              filtered.map((expert, i) => (
                <ExpertCard key={expert.id} expert={expert} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
