"use client";

import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Waves } from "@/components/ui/wave-background";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" dir="rtl">

        {/* Wave animated background */}
        <Waves
          backgroundColor="#058B7F"
          strokeColor="rgba(255,255,255,0.22)"
          pointerSize={0.4}
        />

        {/* Extra radial glow overlays for depth */}
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(4,110,101,0.55) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(15,174,158,0.30) 0%, transparent 55%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4 items-center text-center px-5 sm:px-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12.5px] font-semibold mb-2"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            ابدأ رحلتك اليوم
          </span>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug tracking-tight text-white">
            هل أنت مستعد لبدء رحلتك نحو النجاح؟
          </h3>
          <p className="mt-2 text-[15px] sm:text-[17px] leading-relaxed max-w-2xl"
            style={{ color: "rgba(255,255,255,0.80)" }}>
            انضم إلى مئات رواد الأعمال والشركات على منصة سنترَا، واكتشف أفضل خدمات التسويق الرقمي المصممة خصيصًا لتنمية أعمالك وتحقيق نتائج حقيقية.
          </p>
        </div>

        <div className="relative z-10 mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="w-full sm:w-auto h-14 px-8 bg-white text-primary hover:bg-gray-50 text-[15px] font-bold rounded-full shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            ابدأ الآن مجانًا <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-14 px-8 text-[15px] font-bold rounded-full transition-transform hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1.5px solid rgba(255,255,255,0.30)",
              color: "#fff",
            }}
          >
            تواصل معنا <MessageCircle className="mr-2 h-5 w-5" />
          </Button>
        </div>

    </section>
  );
}
