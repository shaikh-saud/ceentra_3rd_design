import React from "react";
import Link from "next/link";
import { 
  Smartphone, 
  Video, 
  Star, 
  Megaphone,
  ArrowLeft,
  Sparkles
} from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export default function VisualProductionJoinPage() {
  return (
    <>
      <Navbar />

      {/* Header Section */}
      <div 
        className="pt-32 pb-24 relative overflow-hidden" 
        style={{ background: "linear-gradient(135deg, #0e2453 0%, #058B7F 100%)" }}
        dir="rtl"
      >
        {/* Thematic Content Creation Background */}
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#ffffff 1.5px, transparent 1.5px)", backgroundSize: "30px 30px" }} />
        
        <div className="container relative z-10 mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 mb-8 backdrop-blur-md text-white shadow-xl">
            <Sparkles className="w-8 h-8 animate-pulse" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-[50px] font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-md">
            انضم لأول منصة مختصة بالتسويق الإلكتروني في السعودية
          </h1>
          <p className="text-white/80 text-[18px] md:text-xl max-w-3xl mx-auto leading-relaxed">
            اختر تخصصك وابدأ بناء ملفك المهني للانضمام إلى منصة الإنتاج المرئي وصناعة التأثير.
          </p>
        </div>
      </div>

      {/* Main Selection Section */}
      <main className="min-h-screen bg-[#F7F9F9] py-20 relative overflow-hidden" dir="rtl">
        {/* Floating Background Effects */}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.03}
          duration={3}
          className="text-[#0e2453]"
        />
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-[#058B7F] opacity-[0.03] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] rounded-full bg-[#0e2453] opacity-[0.03] blur-[120px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 max-w-5xl pt-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Card 1: UGC Creator */}
            <Link href="/register?role=ugc" className="block group outline-none">
              <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border-2 border-transparent transition-all duration-300 p-8 md:p-10 h-full flex flex-col group-hover:-translate-y-2 group-hover:scale-[1.01] group-hover:border-[#058B7F] group-hover:shadow-[0_20px_60px_rgba(5,139,127,0.12)]">
                
                <div className="relative w-20 h-20 mb-8">
                  <div className="absolute inset-0 bg-[#058B7F]/10 rounded-2xl group-hover:bg-[#058B7F]/20 transition-colors duration-300 rotate-6 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center text-[#058B7F] z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1">
                    <Smartphone className="w-8 h-8" strokeWidth={1.5} />
                    <Video className="w-4 h-4 absolute bottom-3 left-3 text-[#0e2453]" strokeWidth={2} />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-extrabold text-[#0e2453] mb-4 group-hover:text-[#058B7F] transition-colors">
                    أنا صانع محتوى UGC
                  </h2>
                  <p className="text-[16px] text-[#0e2453]/70 leading-relaxed font-medium">
                    أبحث عن مشاريع إعلانية لإنتاج فيديوهات مراجعة وتجارب حقيقية تعكس جودة الخدمات والمحفزات للمنتجات.
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[17px] font-bold text-[#058B7F]">تسجيل كـ UGC</span>
                  <div className="w-10 h-10 rounded-full bg-[#058B7F]/10 flex items-center justify-center text-[#058B7F] group-hover:bg-[#058B7F] group-hover:text-white transition-all duration-300">
                    <ArrowLeft className="w-5 h-5" />
                  </div>
                </div>

              </div>
            </Link>

            {/* Card 2: Influencer / Blogger */}
            <Link href="/register?role=influencer" className="block group outline-none">
              <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border-2 border-transparent transition-all duration-300 p-8 md:p-10 h-full flex flex-col group-hover:-translate-y-2 group-hover:scale-[1.01] group-hover:border-[#0e2453] group-hover:shadow-[0_20px_60px_rgba(14,36,83,0.12)]">
                
                <div className="relative w-20 h-20 mb-8">
                  <div className="absolute inset-0 bg-[#0e2453]/10 rounded-2xl group-hover:bg-[#0e2453]/20 transition-colors duration-300 -rotate-6 group-hover:-rotate-12" />
                  <div className="absolute inset-0 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center text-[#0e2453] z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <Star className="w-8 h-8" strokeWidth={1.5} />
                    <Megaphone className="w-4 h-4 absolute bottom-3 right-3 text-[#058B7F]" strokeWidth={2} />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-extrabold text-[#0e2453] mb-4 group-hover:text-[#0e2453] transition-colors">
                    أنا مؤثر / بلوقر
                  </h2>
                  <p className="text-[16px] text-[#0e2453]/70 leading-relaxed font-medium">
                    أبحث عن حملات تعاون مع العلامات التجارية وحملات انتشار موسعة للترويج للشركات والمؤتمرات الكبرى.
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[17px] font-bold text-[#0e2453]">تسجيل كمؤثر</span>
                  <div className="w-10 h-10 rounded-full bg-[#0e2453]/5 flex items-center justify-center text-[#0e2453] group-hover:bg-[#0e2453] group-hover:text-white transition-all duration-300">
                    <ArrowLeft className="w-5 h-5" />
                  </div>
                </div>

              </div>
            </Link>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
