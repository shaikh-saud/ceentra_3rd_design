"use client";

import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function FinalCTA() {
  return (
    <section className="px-5 sm:px-6 py-20 pb-28 bg-bg-light" dir="rtl">
      <div className="relative overflow-hidden w-full max-w-[1100px] mx-auto rounded-3xl py-14 md:py-20 px-6 md:px-14 bg-primary text-white shadow-[0_12px_40px_rgba(5,139,127,0.25)] border mt-10">

        {/* Animated Grid Overlay Left */}
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={0.15}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_left,white,rgba(255,255,255,0.4),transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 fill-white/20 stroke-white/20"
          )}
        />

        {/* Animated Grid Overlay Right */}
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={0.15}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_top_right,white,rgba(255,255,255,0.4),transparent)]",
            "inset-x-0 inset-y-0 h-[200%] skew-y-12 fill-white/20 stroke-white/20"
          )}
        />

        <div className="relative z-10 flex flex-col gap-4 items-center text-center">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug tracking-tight">
            هل أنت مستعد لبدء رحلتك نحو النجاح؟
          </h3>
          <p className="mt-2 text-[16px] sm:text-[18px] text-white/85 max-w-2xl leading-relaxed">
            انضم إلى مئات رواد الأعمال والشركات على منصة سنترا، واكتشف أفضل خدمات التسويق الرقمي المصممة خصيصًا لتنمية أعمالك وتحقيق نتائج حقيقية.
          </p>
        </div>

        <div className="relative z-10 mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-white text-primary hover:bg-gray-50 text-[16px] font-bold rounded-full shadow-lg transition-transform hover:-translate-y-0.5">
            ابدأ الآن مجانًا <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white text-[16px] font-bold rounded-full transition-transform hover:-translate-y-0.5">
            تواصل معنا <MessageCircle className="mr-2 h-5 w-5" />
          </Button>
        </div>

      </div>
    </section>
  );
}
