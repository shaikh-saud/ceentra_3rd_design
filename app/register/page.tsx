"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  UserCircle, 
  GraduationCap, 
  Lightbulb, 
  Video, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle2
} from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Account Types
const ACCOUNT_TYPES = [
  {
    id: "client",
    title: "عميل",
    description: "أبحث عن خدمات تسويقية",
    icon: UserCircle,
  },
  {
    id: "company",
    title: "شركة / مزود خدمة",
    description: "أقدم خدمات تسويقية",
    icon: Building2,
  },
  {
    id: "trainer",
    title: "مدرب",
    description: "تقديم دورات تدريبية",
    icon: GraduationCap,
  },
  {
    id: "consultant",
    title: "مستشار",
    description: "تقديم استشارات استراتيجية",
    icon: Lightbulb,
  },
  {
    id: "creator",
    title: "صانع محتوى",
    description: "UGC / مؤثر",
    icon: Video,
  },
];

export default function RegisterPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F9F9] pt-32 pb-24 relative overflow-hidden flex items-center justify-center" dir="rtl">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#058B7F] opacity-[0.03] blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#0e2453] opacity-[0.03] blur-[120px] pointer-events-none z-0" />
        
        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-[1.2fr_450px] min-h-[600px]">
              
              {/* Form Section */}
              <div className="p-8 md:p-12">
                <div className="mb-10 text-center md:text-right">
                  <h1 className="text-3xl font-extrabold text-[#0e2453] mb-3 tracking-tight">إنشاء حساب جديد</h1>
                  <p className="text-[#0e2453]/60 text-[15px]">انضم إلى منصة سنترا اليوم وابدأ رحلة نجاحك.</p>
                </div>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

                  {/* 1. Account Selection */}
                  <div>
                    <h2 className="text-[#0e2453] font-bold text-base mb-4 flex items-center gap-2">
                       اختر نوع الحساب <span className="text-[#058B7F]">*</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {ACCOUNT_TYPES.map((type) => {
                        const isSelected = selectedType === type.id;
                        const Icon = type.icon;
                        
                        return (
                          <div
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`relative cursor-pointer transition-all duration-300 rounded-2xl border p-4 flex flex-col items-center text-center gap-3 group
                              ${isSelected 
                                ? "border-[#058B7F] bg-[#058B7F]/[0.02]" 
                                : "border-gray-100 bg-white hover:border-[#058B7F]/30 hover:bg-gray-50"
                              }`}
                            style={{
                              boxShadow: isSelected ? "0 4px 20px rgba(5,139,127,0.05)" : "none"
                            }}
                          >
                            {isSelected && (
                              <div className="absolute top-2 right-2 text-[#058B7F]">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                            )}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300
                              ${isSelected ? "bg-[#058B7F] text-white" : "bg-gray-100 text-[#0e2453]/60 group-hover:bg-[#058B7F]/10 group-hover:text-[#058B7F]"}`}>
                              <Icon className="w-5 h-5" strokeWidth={1.8} />
                            </div>
                            <div>
                              <h3 className={`font-bold text-[13px] mb-1 transition-colors ${isSelected ? "text-[#058B7F]" : "text-[#0e2453]"}`}>
                                {type.title}
                              </h3>
                              <p className="text-[11px] text-[#0e2453]/50 leading-snug">
                                {type.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-100" />

                  {/* 2. Personal Info */}
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-[#0e2453] px-1">الاسم الكامل <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center">
                          <span className="absolute right-4 text-[#0e2453]/40">
                            <User className="w-4 h-4" />
                          </span>
                          <input 
                            type="text" 
                            placeholder="محمد عبدالله"
                            className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-[#0e2453] px-1">رقم الجوال</label>
                        <div className="relative flex items-center">
                          <span className="absolute right-4 text-[#0e2453]/40">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input 
                            type="tel" 
                            placeholder="05X XXX XXXX"
                            className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10 text-left dir-ltr"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-[#0e2453] px-1">البريد الإلكتروني <span className="text-red-500">*</span></label>
                      <div className="relative flex items-center">
                        <span className="absolute right-4 text-[#0e2453]/40">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input 
                          type="email" 
                          placeholder="example@domain.com"
                          className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Password */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Password input */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-[#0e2453] px-1">كلمة المرور <span className="text-red-500">*</span></label>
                      <div className="relative flex items-center cursor-text">
                        <span className="absolute right-4 text-[#0e2453]/40">
                          <Lock className="w-4 h-4" />
                        </span>
                        <input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                          className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-11 text-[14px] text-[#0e2453] outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10 tracking-widest font-sans"
                          dir="ltr"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-4 text-[#0e2453]/40 hover:text-[#058B7F] transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password input */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-[#0e2453] px-1">تأكيد كلمة المرور <span className="text-red-500">*</span></label>
                      <div className="relative flex items-center cursor-text">
                        <span className="absolute right-4 text-[#0e2453]/40">
                          <Lock className="w-4 h-4" />
                        </span>
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="••••••••"
                          className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-11 text-[14px] text-[#0e2453] outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10 tracking-widest font-sans"
                          dir="ltr"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute left-4 text-[#0e2453]/40 hover:text-[#058B7F] transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        defaultChecked
                        className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded cursor-pointer transition-all checked:bg-[#058B7F] checked:border-[#058B7F]"
                      />
                      <CheckCircle2 className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <label htmlFor="terms" className="text-[13px] text-[#0e2453]/70 leading-relaxed cursor-pointer select-none">
                      من خلال التسجيل، أنت توافق على <Link href="/#terms" className="text-[#058B7F] font-bold hover:underline">الشروط والأحكام</Link> و <Link href="/#privacy" className="text-[#058B7F] font-bold hover:underline">سياسة الخصوصية</Link> الخاصة بالمنصة.
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={!selectedType}
                      className="w-full text-white font-bold h-12 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(5,139,127,0.25)] hover:shadow-[0_8px_30px_rgba(5,139,127,0.35)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none bg-gradient-to-l from-[#058B7F] to-[#0FAE9E]"
                    >
                      إنشاء حساب جديد
                    </button>
                    
                    <p className="text-center mt-6 text-[14px] text-[#0e2453]/70 font-medium">
                      لديك حساب بالفعل؟ <Link href="/#login" className="text-[#058B7F] font-bold hover:underline ml-1">سجل دخولك الآن</Link>
                    </p>
                  </div>

                </form>
              </div>

              {/* Graphical App Sidebar (Hidden on mobile) */}
              <div className="hidden md:flex relative bg-gradient-to-br from-[#0e2453] to-[#1a3875] p-10 flex-col justify-between overflow-hidden">
                {/* Abstract pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                
                {/* Colored flares */}
                <div className="absolute top-[-10%] right-[-10%] w-[200px] h-[200px] rounded-full bg-[#058B7F] opacity-50 blur-[80px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] rounded-full bg-[#0FAE9E] opacity-20 blur-[80px]" />

                <div className="relative z-10 flex justify-end">
                  <Image src="/ceentra-logo.png" alt="Centra" width={100} height={35} className="brightness-0 invert opacity-90 object-contain" />
                </div>

                <div className="relative z-10 mt-20">
                  <h3 className="text-white text-2xl font-bold leading-snug mb-4">
                    اكتشف أفضل الكفاءات التسويقية في الشرق الأوسط
                  </h3>
                  <div className="space-y-4">
                    {[
                      "وصول مباشر لآلاف المتخصصين",
                      "منصة آمنة وموثوقة بنسبة 100%",
                      "دعم فني متواصل وحلول تخصصية"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#058B7F]/20 border border-[#058B7F]/40 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-[#058B7F]" />
                        </div>
                        <span className="text-white/80 text-[13px]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mt-16 pt-8 border-t border-white/10">
                  <p className="text-white/60 text-[12px] leading-relaxed">
                    "منصة سنترا سهّلت علينا الوصول للشركات التسويقية وإدارة ميزانيتنا بالكامل من خلال واجهة واحدة بسيطة."
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 p-1">
                      <div className="w-full h-full rounded-full bg-white/20" />
                    </div>
                    <div>
                      <h4 className="text-white text-[12px] font-bold">عبدالله التميمي</h4>
                      <p className="text-[#058B7F] text-[10px]">مدير تسويق - شركة رائدة</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
