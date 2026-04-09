"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Building2, 
  Mail, 
  Lock, 
  ShieldCheck, 
  FileText, 
  Hash, 
  UploadCloud, 
  CheckCircle2,
  Phone
} from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function VerifyCompanyPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <>
      <Navbar />

      {/* Header Background Theme Region */}
      <div 
        className="pt-32 pb-16 relative overflow-hidden" 
        style={{ background: "linear-gradient(135deg, #0e2453 0%, #058B7F 100%)" }}
        dir="rtl"
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        
        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-white max-w-2xl text-center md:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[13px] font-medium mb-6">
                <ShieldCheck className="w-4 h-4 text-[#4cdbc4]" />
                <span>حماية وتوثيق حسابات الشركات</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">المصادقة وتوثيق الشركات</h1>
              <p className="text-white/80 text-[16px] md:text-lg leading-relaxed">
                تسجيل بريد/جوال، تحقق MFA اختياري، وتوثيق سجل تجاري/نشاط/رقم ضريبي بخطوات سريعة وآمنة.
              </p>
            </div>
            
            <div className="hidden md:flex flex-shrink-0 relative">
              <div className="w-48 h-48 rounded-full bg-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl" />
              <ShieldCheck className="w-40 h-40 text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-pulse" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>

      <main className="min-h-screen bg-[#F7F9F9] py-16 relative overflow-hidden" dir="rtl">
        {/* Floating blobs */}
        <div className="absolute top-10 right-[-5%] w-[400px] h-[400px] rounded-full bg-[#058B7F] opacity-[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#0e2453] opacity-[0.03] blur-[100px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Right Section: Login (Visual Right, Code First child for RTL) */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#0e2453]">
                  <Mail className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0e2453]">تسجيل الدخول</h2>
                  <p className="text-[#0e2453]/50 text-[13px]">أدخل بيانات حسابك للمتابعة</p>
                </div>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#0e2453] px-1">البريد الإلكتروني أو الجوال</label>
                  <div className="relative flex items-center">
                    <span className="absolute right-4 text-[#0e2453]/40">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="email@example.com"
                      className="w-full h-13 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#0e2453] px-1">كلمة المرور</label>
                  <div className="relative flex items-center">
                    <span className="absolute right-4 text-[#0e2453]/40">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full h-13 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10 tracking-widest font-sans text-left dir-ltr"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      id="mfa" 
                      className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded cursor-pointer transition-all checked:bg-[#058B7F] checked:border-[#058B7F]"
                    />
                    <CheckCircle2 className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <label htmlFor="mfa" className="text-[13px] font-bold text-[#0e2453] cursor-pointer select-none">
                    تفعيل التحقق متعدد العوامل (MFA)
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full mt-6 text-white font-bold h-13 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(14,36,83,0.15)] hover:shadow-[0_8px_30px_rgba(14,36,83,0.25)] hover:-translate-y-0.5 bg-[#0e2453]"
                >
                  تسجيل الدخول
                </button>
              </form>
            </div>


            {/* Left Section: Verification (Visual Left, Code Second child for RTL) */}
            <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10 relative overflow-hidden">
              {/* Optional Decoration inside Card */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#058B7F]/5 rounded-br-full pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#058B7F]/10 flex items-center justify-center text-[#058B7F]">
                  <Building2 className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0e2453]">توثيق شركة</h2>
                  <p className="text-[#0e2453]/50 text-[13px]">ارفع مستنداتك لتوثيق الكيان التجاري</p>
                </div>
              </div>

              <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#0e2453] px-1">اسم الشركة</label>
                  <div className="relative flex items-center">
                    <span className="absolute right-4 text-[#0e2453]/40">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="اكتب اسم الشركة التجاري"
                      className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-[#0e2453] px-1">رقم السجل التجاري</label>
                    <div className="relative flex items-center">
                      <span className="absolute right-4 text-[#0e2453]/40">
                        <FileText className="w-4 h-4" />
                      </span>
                      <input 
                        type="text" 
                        placeholder="700XXXXXXX"
                        className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-[#0e2453] px-1">الرقم الضريبي</label>
                    <div className="relative flex items-center">
                      <span className="absolute right-4 text-[#0e2453]/40">
                        <Hash className="w-4 h-4" />
                      </span>
                      <input 
                        type="text" 
                        placeholder="3000XXXXXX"
                        className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#0e2453] px-1">النشاط</label>
                  <input 
                    type="text" 
                    placeholder="مثال: التسويق الرقمي، الدعاية والإعلان..."
                    className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl px-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10"
                  />
                </div>

                {/* File Upload Box */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-[13px] font-bold text-[#0e2453] px-1">مرفقات التوثيق <span className="text-[#0e2453]/40 font-normal">(السجل، الشهادة الضريبية)</span></label>
                  
                  <div 
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer
                      ${dragActive ? "border-[#058B7F] bg-[#058B7F]/5 scale-[1.02]" : "border-gray-200 bg-gray-50/50 hover:border-[#058B7F]/40 hover:bg-[#058B7F]/[0.02]"}
                    `}
                  >
                    <input 
                      type="file" 
                      id="file-upload" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => e.target.files && setUploadedFile(e.target.files[0])}
                    />
                    
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#058B7F] mb-3">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    
                    {uploadedFile ? (
                      <p className="text-[13px] font-bold text-[#058B7F] text-center w-full truncate px-4">
                        {uploadedFile.name}
                      </p>
                    ) : (
                      <>
                        <h4 className="font-bold text-[#0e2453] text-[14px] mb-1">اسحب وأفلت الملفات هنا</h4>
                        <p className="text-[12px] text-[#0e2453]/50">أو انقر بالماوس لتصفح الملفات (PDF, JPG, PNG)</p>
                        <span className="mt-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded">No file chosen</span>
                      </>
                    )}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full mt-6 text-white font-bold h-13 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(5,139,127,0.25)] hover:shadow-[0_8px_30px_rgba(5,139,127,0.35)] hover:-translate-y-0.5 bg-gradient-to-l from-[#058B7F] to-[#0FAE9E]"
                >
                  إرسال التوثيق
                </button>

              </form>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
