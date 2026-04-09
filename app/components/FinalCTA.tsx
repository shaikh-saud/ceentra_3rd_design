"use client";

import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NAVY = "#0e2453";
const TEAL = "#058B7F";

export default function FinalCTA() {
  return (
    <section className="relative py-20 bg-[#F7F9F9]" dir="rtl">
      <div className="px-6">
        <div
          className="relative overflow-hidden w-full max-w-screen-lg mx-auto rounded-3xl py-14 md:py-20 px-8 md:px-14 shadow-2xl"
          style={{ background: "#058B7F", color: "#ffffff" }}
        >
          {/* Animated Background Grids themed with TEAL */}
          <AnimatedGridPattern
            numSquares={40}
            maxOpacity={0.12}
            duration={3}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_right,white,rgba(255,255,255,0.7),transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
            style={{ fill: "rgba(255,255,255,0.08)", stroke: "rgba(255,255,255,0.08)" }}
          />
          <AnimatedGridPattern
            numSquares={40}
            maxOpacity={0.12}
            duration={3}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_top_left,white,rgba(255,255,255,0.7),transparent)]",
              "inset-x-0 inset-y-0 h-[200%] skew-y-12"
            )}
            style={{ fill: "rgba(255,255,255,0.08)", stroke: "rgba(255,255,255,0.08)" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5 text-center pt-2">
            <h3 className="text-3xl md:text-[40px] font-extrabold leading-tight tracking-tight">
              هل أنت مستعد لبدء رحلتك نحو النجاح؟
            </h3>
            
            <p className="mt-2 text-base md:text-lg max-w-2xl leading-relaxed text-white/80">
              انضم إلى مئات رواد الأعمال والشركات على منصة سنترَا، واكتشف أفضل خدمات التسويق الرقمي المصممة خصيصًا لتنمية أعمالك وتحقيق نتائج حقيقية.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-14 px-8 text-[15px] font-bold rounded-full transition-all hover:-translate-y-0.5 w-full sm:w-auto group hover:bg-gray-50"
                  style={{
                    background: "#ffffff",
                    color: "#058B7F",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                >
                  ابدأ الآن مجانًا
                  <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-[15px] font-bold rounded-full transition-all hover:-translate-y-0.5 w-full sm:w-auto hover:bg-white/10 hover:text-white border border-white/30"
                  style={{
                    background: "transparent",
                    color: "#fff",
                  }}
                >
                  <MessageCircle className="ml-2 h-5 w-5" />
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
