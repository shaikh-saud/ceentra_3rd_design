"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: d },
  }),
};

export default function HomeContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-20 sm:py-24 md:py-28 overflow-hidden"
      style={{ background: "#ffffff" }}
      dir="rtl"
    >
      {/* Ambient blob */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(5,139,127,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

          {/* ══ LEFT — info + map ══ */}
          <div className="flex-1 flex flex-col gap-8">

            {/* Email icon card */}
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
                  boxShadow: "0 8px 24px rgba(5,139,127,0.30), 0 2px 4px rgba(0,0,0,0.08)",
                }}
              >
                <Mail className="w-7 h-7 text-white" strokeWidth={1.8} />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0.07}
            >
              <h2
                className="font-extrabold leading-tight tracking-tight text-text-primary"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
              >
                تواصل معنا
              </h2>
              <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-text-secondary/60 leading-[1.85] max-w-sm">
                نحن دائمًا نسعى لتحسين خدماتنا. تواصل معنا وأخبرنا كيف يمكننا مساعدتك في تحقيق أهدافك التسويقية.
              </p>
            </motion.div>

            {/* Contact links */}
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0.13}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-text-secondary/55"
            >
              <a href="mailto:support@centra.sa" className="flex items-center gap-1.5 hover:text-primary transition-colors duration-200">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
                support@centra.sa
              </a>
              <span className="w-1 h-1 rounded-full bg-text-secondary/25" />
              <a href="tel:+966920000000" className="flex items-center gap-1.5 hover:text-primary transition-colors duration-200" dir="ltr">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
                +966 920 000 000
              </a>
              <span className="w-1 h-1 rounded-full bg-text-secondary/25" />
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
                الرياض، المملكة العربية السعودية
              </span>
            </motion.div>

            {/* World map */}
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0.18}
              className="relative mt-2"
            >
              <div className="relative overflow-hidden rounded-2xl" style={{ height: "220px" }}>
                {/* Map image */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png"
                  alt="خريطة العالم"
                  className="w-full h-full object-cover object-center"
                  style={{ filter: "opacity(0.12) sepia(1) hue-rotate(130deg) saturate(2)", mixBlendMode: "multiply" }}
                />
                {/* Map background */}
                <div className="absolute inset-0 rounded-2xl" style={{ background: "#f0f8f7", zIndex: -1 }} />

                {/* Saudi Arabia pin — positioned roughly center-right for Middle East */}
                <div
                  className="absolute flex flex-col items-center"
                  style={{ right: "35%", top: "42%", zIndex: 10 }}
                >
                  {/* Tooltip */}
                  <div
                    className="px-3 py-1.5 rounded-full text-[11px] font-bold text-text-primary mb-1.5 whitespace-nowrap"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                      border: "1px solid rgba(5,139,127,0.15)",
                    }}
                  >
                    نحن هنا 📍
                  </div>

                  {/* Pin stem */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className="w-3.5 h-3.5 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #058B7F, #0FAE9E)",
                        boxShadow: "0 0 0 4px rgba(5,139,127,0.2), 0 0 0 8px rgba(5,139,127,0.08)",
                      }}
                    />
                    {/* Ripple */}
                    <div
                      className="absolute w-3.5 h-3.5 rounded-full animate-ping"
                      style={{ background: "rgba(5,139,127,0.35)" }}
                    />
                  </div>
                </div>

                {/* Subtle grid overlay */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(5,139,127,0.08) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>
            </motion.div>

          </div>

          {/* ══ RIGHT — form card ══ */}
          <motion.div
            variants={fadeUp} initial="hidden"
            animate={isInView ? "visible" : "hidden"} custom={0.1}
            className="w-full lg:w-[520px] shrink-0"
          >
            <div
              className="relative rounded-3xl p-7 sm:p-8 overflow-hidden"
              style={{
                background: "#f4f7f7",
                border: "1px solid rgba(5,139,127,0.1)",
              }}
            >
              {/* Dot grid decoration — top left (RTL) */}
              <div
                className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(5,139,127,0.18) 1.5px, transparent 1.5px)",
                  backgroundSize: "14px 14px",
                  maskImage: "radial-gradient(ellipse at top left, white 30%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(ellipse at top left, white 30%, transparent 75%)",
                }}
              />

              <form className="relative z-10 flex flex-col gap-5">

                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[12.5px] font-semibold text-text-secondary/65">الاسم الكامل</Label>
                  <Input
                    type="text"
                    placeholder="محمد العتيبي"
                    className="h-11 rounded-xl bg-white border-0 text-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] focus-visible:ring-primary/40"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[12.5px] font-semibold text-text-secondary/65">البريد الإلكتروني</Label>
                  <Input
                    type="email"
                    dir="ltr"
                    placeholder="example@email.com"
                    className="h-11 rounded-xl bg-white border-0 text-[14px] text-right shadow-[0_1px_3px_rgba(0,0,0,0.08)] focus-visible:ring-primary/40"
                  />
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[12.5px] font-semibold text-text-secondary/65">الشركة أو المشروع</Label>
                  <Input
                    type="text"
                    placeholder="اسم شركتك أو مشروعك"
                    className="h-11 rounded-xl bg-white border-0 text-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] focus-visible:ring-primary/40"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[12.5px] font-semibold text-text-secondary/65">رسالتك</Label>
                  <Textarea
                    placeholder="اكتب رسالتك هنا..."
                    className="rounded-xl bg-white border-0 min-h-[120px] text-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] resize-none focus-visible:ring-primary/40"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="h-11 w-auto self-start px-8 rounded-full text-[14px] font-bold cursor-pointer"
                  style={{
                    background: "#1a2e2d",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                  }}
                >
                  إرسال الرسالة
                </Button>

              </form>
            </div>

            {/* WhatsApp nudge below card */}
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0.25}
              className="mt-4 flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(37,211,102,0.08), rgba(37,211,102,0.04))",
                border: "1px solid rgba(37,211,102,0.2)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "#25D366" }}
                >
                  <MessageCircle className="w-4.5 h-4.5 text-white" fill="white" strokeWidth={0} />
                </div>
                <p className="text-[13px] font-semibold text-[#075E54]">تواصل سريع عبر واتساب</p>
              </div>
              <a
                href="https://wa.me/966920000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] font-bold px-4 py-1.5 rounded-full text-white shrink-0 transition-opacity hover:opacity-90"
                style={{ background: "#25D366" }}
              >
                ابدأ ←
              </a>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
