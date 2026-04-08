"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
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

// Contact links: alternating navy / teal
const CONTACT_LINKS = [
  {
    href: "mailto:support@centra.sa",
    label: "support@centra.sa",
    icon: Mail,
    color: "#0e2453",
  },
  {
    href: "tel:+966920000000",
    label: "+966 920 000 000",
    icon: Phone,
    color: "#058B7F",
    ltr: true,
  },
  {
    href: "#",
    label: "الرياض، المملكة العربية السعودية",
    icon: MapPin,
    color: "#0e2453",
  },
];

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
      {/* Navy blob — top right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14,36,83,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Teal blob — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-80 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(5,139,127,0.08) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

          {/* ══ LEFT — info + map ══ */}
          <div className="flex-1 flex flex-col gap-8">

            {/* Badge icon card — navy gradient */}
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #0e2453 0%, #162d6e 100%)",
                  boxShadow: "0 8px 24px rgba(14,36,83,0.25), 0 2px 4px rgba(0,0,0,0.08)",
                }}
              >
                <Mail className="w-7 h-7" strokeWidth={1.8} style={{ color: "#0FAE9E" }} />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0.07}
            >
              {/* Badge pill */}
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold mb-4"
                style={{
                  background: "rgba(14,36,83,0.07)",
                  border: "1px solid rgba(14,36,83,0.14)",
                  color: "#0e2453",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#058B7F" }}
                />
                تواصل معنا
              </span>

              <h2
                className="font-extrabold leading-tight tracking-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#0e2453" }}
              >
                نحن هنا{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #058B7F 20%, #0FAE9E 60%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  لمساعدتك
                </span>
              </h2>
              <p
                className="mt-3 text-[14.5px] sm:text-[15.5px] leading-[1.85] max-w-sm"
                style={{ color: "rgba(14,36,83,0.52)" }}
              >
                نحن دائمًا نسعى لتحسين خدماتنا. تواصل معنا وأخبرنا كيف يمكننا مساعدتك في تحقيق أهدافك التسويقية.
              </p>
            </motion.div>

            {/* Contact links — alternating navy / teal */}
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0.13}
              className="flex flex-col gap-3"
            >
              {CONTACT_LINKS.map(({ href, label, icon: Icon, color, ltr }) => (
                <a
                  key={label}
                  href={href}
                  dir={ltr ? "ltr" : undefined}
                  className="flex items-center gap-3 group w-fit"
                  style={{ color: "rgba(14,36,83,0.55)" }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background: color === "#0e2453"
                        ? "rgba(14,36,83,0.08)"
                        : "rgba(5,139,127,0.10)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} style={{ color }} />
                  </span>
                  <span
                    className="text-[13.5px] transition-colors duration-200 group-hover:opacity-90"
                    style={{ color: "rgba(14,36,83,0.60)" }}
                  >
                    {label}
                  </span>
                </a>
              ))}
            </motion.div>

            {/* Location image */}
            <motion.div
              variants={fadeUp} initial="hidden"
              animate={isInView ? "visible" : "hidden"} custom={0.18}
              className="relative mt-2 rounded-2xl overflow-hidden"
              style={{
                height: "240px",
                border: "1.5px solid rgba(14,36,83,0.12)",
                boxShadow: "0 4px 20px rgba(14,36,83,0.07)",
              }}
            >
              <Image
                src="/map-location.png"
                alt="موقعنا في الرياض"
                fill
                className="object-cover object-center"
              />
              {/* Subtle navy tint overlay on map */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent 60%, rgba(14,36,83,0.18) 100%)",
                }}
              />
            </motion.div>

          </div>

          {/* ══ RIGHT — form card ══ */}
          <motion.div
            variants={fadeUp} initial="hidden"
            animate={isInView ? "visible" : "hidden"} custom={0.1}
            className="w-full lg:w-130 shrink-0"
          >
            <div
              className="relative rounded-3xl p-7 sm:p-8 overflow-hidden"
              style={{
                background: "#f4f7f9",
                border: "1.5px solid rgba(14,36,83,0.10)",
                boxShadow: "0 4px 24px rgba(14,36,83,0.07)",
              }}
            >
              {/* Navy dot grid — top left (RTL) */}
              <div
                className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(14,36,83,0.16) 1.5px, transparent 1.5px)",
                  backgroundSize: "14px 14px",
                  maskImage: "radial-gradient(ellipse at top left, white 30%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(ellipse at top left, white 30%, transparent 75%)",
                }}
              />
              {/* Teal dot grid — bottom right */}
              <div
                className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(5,139,127,0.18) 1.5px, transparent 1.5px)",
                  backgroundSize: "14px 14px",
                  maskImage: "radial-gradient(ellipse at bottom right, white 30%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(ellipse at bottom right, white 30%, transparent 75%)",
                }}
              />

              <form className="relative z-10 flex flex-col gap-5">

                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    className="text-[12.5px] font-semibold"
                    style={{ color: "rgba(14,36,83,0.65)" }}
                  >
                    الاسم الكامل
                  </Label>
                  <Input
                    type="text"
                    placeholder="محمد العتيبي"
                    className="h-11 rounded-xl bg-white border-0 text-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] focus-visible:ring-2"
                    style={{ "--tw-ring-color": "rgba(14,36,83,0.25)" } as React.CSSProperties}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    className="text-[12.5px] font-semibold"
                    style={{ color: "rgba(14,36,83,0.65)" }}
                  >
                    البريد الإلكتروني
                  </Label>
                  <Input
                    type="email"
                    dir="ltr"
                    placeholder="example@email.com"
                    className="h-11 rounded-xl bg-white border-0 text-[14px] text-right shadow-[0_1px_3px_rgba(0,0,0,0.08)] focus-visible:ring-2"
                    style={{ "--tw-ring-color": "rgba(5,139,127,0.30)" } as React.CSSProperties}
                  />
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    className="text-[12.5px] font-semibold"
                    style={{ color: "rgba(14,36,83,0.65)" }}
                  >
                    الشركة أو المشروع
                  </Label>
                  <Input
                    type="text"
                    placeholder="اسم شركتك أو مشروعك"
                    className="h-11 rounded-xl bg-white border-0 text-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] focus-visible:ring-2"
                    style={{ "--tw-ring-color": "rgba(14,36,83,0.25)" } as React.CSSProperties}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    className="text-[12.5px] font-semibold"
                    style={{ color: "rgba(14,36,83,0.65)" }}
                  >
                    رسالتك
                  </Label>
                  <Textarea
                    placeholder="اكتب رسالتك هنا..."
                    className="rounded-xl bg-white border-0 min-h-30 text-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] resize-none focus-visible:ring-2"
                    style={{ "--tw-ring-color": "rgba(5,139,127,0.30)" } as React.CSSProperties}
                  />
                </div>

                {/* Submit — navy gradient with teal icon */}
                <Button
                  type="submit"
                  className="h-11 w-auto self-start px-8 rounded-full text-[14px] font-bold cursor-pointer flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #0e2453 0%, #162d6e 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(14,36,83,0.28), 0 1px 4px rgba(0,0,0,0.10)",
                  }}
                >
                  إرسال الرسالة
                  <Send className="w-4 h-4 shrink-0" style={{ color: "#0FAE9E" }} strokeWidth={2} />
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
                <p className="text-[13px] font-semibold" style={{ color: "#075E54" }}>تواصل سريع عبر واتساب</p>
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
