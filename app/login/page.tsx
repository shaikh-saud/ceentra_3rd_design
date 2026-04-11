"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  UserCircle, 
  Building2, 
  GraduationCap, 
  Lightbulb, 
  Video,
  Info
} from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

const DEMO_ACCOUNTS = [
  {
    role: "Admin",
    title: "مدير النظام",
    email: "admin@sentra.com",
    icon: ShieldCheck,
    color: "bg-red-500",
    lightColor: "bg-red-500/10",
    textColor: "text-red-600",
    borderColor: "border-red-200 hover:border-red-400"
  },
  {
    role: "Client",
    title: "عميل",
    email: "client@sentra.com",
    icon: UserCircle,
    color: "bg-blue-500",
    lightColor: "bg-blue-500/10",
    textColor: "text-blue-600",
    borderColor: "border-blue-200 hover:border-blue-400"
  },
  {
    role: "Company",
    title: "شركة تسويق",
    email: "company@sentra.com",
    icon: Building2,
    color: "bg-teal-500",
    lightColor: "bg-teal-500/10",
    textColor: "text-teal-600",
    borderColor: "border-teal-200 hover:border-teal-400"
  },
  {
    role: "Consultant",
    title: "مستشار",
    email: "consultant@sentra.com",
    icon: Lightbulb,
    color: "bg-amber-500",
    lightColor: "bg-amber-500/10",
    textColor: "text-amber-600",
    borderColor: "border-amber-200 hover:border-amber-400"
  },
  {
    role: "Trainer",
    title: "مدرب",
    email: "trainer@sentra.com",
    icon: GraduationCap,
    color: "bg-purple-500",
    lightColor: "bg-purple-500/10",
    textColor: "text-purple-600",
    borderColor: "border-purple-200 hover:border-purple-400"
  },
  {
    role: "Creator",
    title: "صانع محتوى",
    email: "creator@sentra.com",
    icon: Video,
    color: "bg-pink-500",
    lightColor: "bg-pink-500/10",
    textColor: "text-pink-600",
    borderColor: "border-pink-200 hover:border-pink-400"
  }
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const fillDemoAccount = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Role-based mock redirect
    const account = DEMO_ACCOUNTS.find((a) => a.email === email);
    if (account?.role === "Admin") {
      router.push("/dashboard/admin");
    } else {
      // Future: redirect other roles to their dashboards
      router.push("/");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen relative overflow-hidden bg-[#F7F9F9] pt-32 pb-24" dir="rtl">
        
        {/* Animated Grid & Glows */}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.04}
          duration={3}
          className="text-[#0e2453]"
        />
        <div className="absolute top-10 right-[-5%] w-[400px] h-[400px] rounded-full bg-[#058B7F] opacity-[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#0e2453] opacity-[0.02] blur-[100px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0e2453] mb-3">تسجيل الدخول</h1>
            <p className="text-[#0e2453]/60 text-[15px]">أدخل بياناتك للوصول إلى حسابك</p>
          </div>

          <div className="grid md:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
            
            {/* Right Section: Login Form (Visually Right, Code block first due to RTL framework layouts) */}
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10">
              
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#0e2453] px-1">البريد الإلكتروني</label>
                  <div className="relative flex items-center">
                    <span className="absolute right-4 text-[#0e2453]/40">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full h-13 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10 text-left dir-ltr"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1 mb-1">
                    <label className="text-[13px] font-bold text-[#0e2453]">كلمة المرور</label>
                    <Link href="/#forgot" className="text-[12px] text-[#058B7F] font-semibold hover:underline">
                      نسيت كلمة المرور؟
                    </Link>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute right-4 text-[#0e2453]/40">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-13 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-11 text-[14px] text-[#0e2453] outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10 tracking-widest font-sans text-left dir-ltr"
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

                <div className="flex items-center gap-2 pt-1">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded cursor-pointer transition-all checked:bg-[#058B7F] checked:border-[#058B7F]"
                    />
                    <svg className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <label htmlFor="remember" className="text-[13px] font-medium text-[#0e2453]/70 cursor-pointer select-none">
                    تذكرني
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full mt-2 text-white font-bold h-13 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(5,139,127,0.25)] hover:shadow-[0_8px_30px_rgba(5,139,127,0.35)] hover:-translate-y-0.5 bg-gradient-to-l from-[#058B7F] to-[#0FAE9E]"
                >
                  تسجيل الدخول
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-[14px] text-[#0e2453]/70">
                  ليس لديك حساب؟ <Link href="/register" className="text-[#058B7F] font-bold hover:underline">إنشاء حساب جديد</Link>
                </p>
              </div>

            </div>

            {/* Left Section: Demo Accounts (Visually Left, Code block second due to RTL) */}
            <div className="bg-white/60 backdrop-blur-xl border border-white rounded-3xl p-8 md:p-10 flex flex-col justify-between h-full shadow-[0_8px_40px_rgba(14,36,83,0.03)]">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#0e2453]">حسابات تجريبية</h2>
                  <p className="text-[13px] text-[#0e2453]/60 mt-1">للتطوير والاختبار - اضغط للدخول السريع</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {DEMO_ACCOUNTS.map((account) => {
                    const Icon = account.icon;
                    return (
                      <button
                        key={account.role}
                        type="button"
                        onClick={() => fillDemoAccount(account.email)}
                        className={`flex items-center gap-3 p-3 bg-white rounded-2xl border transition-all duration-300 group ${account.borderColor} shadow-sm hover:shadow-md hover:-translate-y-0.5`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${account.lightColor} ${account.textColor}`}>
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div className="text-right">
                          <h4 className="font-bold text-[13px] text-[#0e2453] leading-none mb-1">{account.title}</h4>
                          <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 font-sans tracking-wide">
                            {account.role}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Login Info Box */}
              <div className="mt-8 bg-[#0e2453]/[0.03] border border-[#0e2453]/10 rounded-2xl p-5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#0e2453]/10 flex items-center justify-center shrink-0 text-[#0e2453]">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0e2453] text-[14px]">معلومات الدخول التعسفية</h4>
                  <p className="text-[13px] text-[#0e2453]/70 mt-1 font-sans font-medium" dir="ltr">
                    Password: <span className="text-[#058B7F] font-bold bg-white px-2 py-0.5 rounded border border-gray-200">password</span>
                  </p>
                  <p className="text-[11.5px] text-[#0e2453]/50 mt-2">
                    اضغط على أي حساب من الأعلى لتعبئة البيانات تلقائياً وتسهيل الدخول السريع أثناء المعاينة.
                  </p>
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
