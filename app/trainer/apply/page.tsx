"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Clock, 
  Banknote, 
  UploadCloud, 
  CheckCircle2,
  Info,
  Send,
  GraduationCap
} from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export default function TrainerApplyPage() {
  const [dragActiveCV, setDragActiveCV] = useState(false);
  const [dragActiveCerts, setDragActiveCerts] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [certFiles, setCertFiles] = useState<File[]>([]);

  // Drag Handlers for CV
  const handleDragCV = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActiveCV(true);
    else if (e.type === "dragleave") setDragActiveCV(false);
  };
  const handleDropCV = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActiveCV(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setCvFile(e.dataTransfer.files[0]);
  };

  // Drag Handlers for Certificates
  const handleDragCerts = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActiveCerts(true);
    else if (e.type === "dragleave") setDragActiveCerts(false);
  };
  const handleDropCerts = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActiveCerts(false);
    if (e.dataTransfer.files) {
      setCertFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <div 
        className="pt-32 pb-16 relative overflow-hidden" 
        style={{ background: "linear-gradient(135deg, #0e2453 0%, #058B7F 100%)" }}
        dir="rtl"
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 mb-6 backdrop-blur-sm text-white">
            <GraduationCap className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            انضم كمدرب
          </h1>
          <p className="text-white/80 text-[16px] md:text-lg max-w-2xl mx-auto leading-relaxed">
            شارك خبرتك التدريبية وساعد الآخرين في تطوير مهاراتهم
          </p>
        </div>
      </div>

      <main className="min-h-screen bg-[#F7F9F9] py-16 relative overflow-hidden" dir="rtl">
        {/* Floating blobs & Grids */}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.03}
          duration={3}
          className="text-[#0e2453]"
        />
        <div className="absolute top-10 right-[-5%] w-[400px] h-[400px] rounded-full bg-[#058B7F] opacity-[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#0e2453] opacity-[0.03] blur-[100px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 max-w-4xl">
          
          <div className="bg-white rounded-[24px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-12 mb-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-12">

              {/* Section 1: Personal Info */}
              <section>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#058B7F]">
                    <User className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0e2453]">المعلومات الشخصية</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 min-w-0">
                    <label className="text-[13px] font-bold text-[#0e2453] px-1">الاسم الكامل <span className="text-[#058B7F]">*</span></label>
                    <div className="relative flex items-center">
                      <span className="absolute right-4 text-[#0e2453]/40"><User className="w-4 h-4" /></span>
                      <input 
                        type="text" 
                        placeholder="محمد عبدالله"
                        className="w-full h-13 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <label className="text-[13px] font-bold text-[#0e2453] px-1">البريد الإلكتروني <span className="text-[#058B7F]">*</span></label>
                    <div className="relative flex items-center">
                      <span className="absolute right-4 text-[#0e2453]/40"><Mail className="w-4 h-4" /></span>
                      <input 
                        type="email" 
                        placeholder="example@email.com"
                        className="w-full h-13 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10 text-left dir-ltr"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <label className="text-[13px] font-bold text-[#0e2453] px-1">رقم الهاتف <span className="text-[#058B7F]">*</span></label>
                    <div className="relative flex items-center">
                      <span className="absolute right-4 text-[#0e2453]/40"><Phone className="w-4 h-4" /></span>
                      <input 
                        type="tel" 
                        placeholder="05XXXXXXXX"
                        className="w-full h-13 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] placeholder:text-[#0e2453]/30 outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10 text-left dir-ltr"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <label className="text-[13px] font-bold text-[#0e2453] px-1">التخصص <span className="text-[#058B7F]">*</span></label>
                    <div className="relative flex items-center">
                      <span className="absolute right-4 text-[#0e2453]/40"><Briefcase className="w-4 h-4" /></span>
                      <select className="w-full h-13 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10 appearance-none">
                        <option value="" disabled selected>اختر التخصص</option>
                        <option value="marketing">التسويق والمبيعات</option>
                        <option value="management">تطوير الأعمال والقيادة</option>
                        <option value="finance">المالية والمحاسبة</option>
                        <option value="tech">التقنية والبرمجة</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Experience & Qualifications */}
              <section>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#058B7F]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0e2453]">الخبرة والمؤهلات</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-[#0e2453] px-1">سنوات الخبرة <span className="text-[#058B7F]">*</span></label>
                    <input 
                      type="number" 
                      placeholder="أدخل عدد السنوات"
                      min="1"
                      className="w-full h-13 bg-gray-50/50 border border-gray-200 rounded-xl px-4 text-[14px] text-[#0e2453] outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] font-bold text-[#0e2453] px-1">سعر الساعة (ريال سعودي) <span className="text-[#058B7F]">*</span></label>
                      <span className="text-[10px] text-[#0e2453]/40 px-1 font-medium bg-gray-50 rounded">سعر الساعة للدورات التدريبية</span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="absolute right-4 text-[#0e2453]/40"><Banknote className="w-4 h-4" /></span>
                      <input 
                        type="number" 
                        defaultValue={500}
                        min="1"
                        className="w-full h-13 bg-gray-50/50 border border-gray-200 rounded-xl pr-11 pl-4 text-[14px] text-[#0e2453] outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between mb-1">
                    <label className="text-[13px] font-bold text-[#0e2453] px-1">نبذة عنك <span className="text-[#058B7F]">*</span></label>
                    <span className="text-[10px] text-[#0e2453]/40 px-1 font-medium bg-gray-50 rounded">يجب أن تكون النبذة 50 حرف على الأقل</span>
                  </div>
                  <textarea 
                    placeholder="اكتب نبذة مختصرة عن خبراتك ومهاراتك في مجال التدريب..."
                    rows={5}
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 text-[14px] text-[#0e2453] outline-none transition-all focus:border-[#058B7F] focus:bg-white focus:ring-4 focus:ring-[#058B7F]/10 resize-y min-h-[140px]"
                  />
                </div>
              </section>

              {/* Section 3: Documents */}
              <section>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#058B7F]">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0e2453]">المستندات المطلوبة</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* CV Upload */}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-[#0e2453] px-1">السيرة الذاتية <span className="text-[#058B7F]">*</span></label>
                    <div 
                      onDragEnter={handleDragCV} onDragLeave={handleDragCV} onDragOver={handleDragCV} onDrop={handleDropCV}
                      className={`relative w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 min-h-[160px] cursor-pointer
                        ${dragActiveCV ? "border-[#058B7F] bg-[#058B7F]/5 scale-[1.02]" : "border-gray-200 bg-gray-50/50 hover:border-[#058B7F]/40 hover:bg-[#058B7F]/[0.02]"}
                      `}
                    >
                      <input type="file" id="cv-upload" accept=".pdf,.doc,.docx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => e.target.files && setCvFile(e.target.files[0])} />
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#058B7F] mb-3">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      {cvFile ? (
                        <p className="text-[13px] font-bold text-[#058B7F] text-center w-full truncate px-4">{cvFile.name}</p>
                      ) : (
                        <div className="text-center">
                          <h4 className="font-bold text-[#0e2453] text-[13px] mb-1">اسحب وأفلت الملف هنا</h4>
                          <span className="mt-1 inline-block text-[10px] bg-[#0e2453]/5 text-[#0e2453]/60 px-2 py-0.5 rounded font-medium tracking-wide">PDF أو Word - الحد الأقصى 5MB</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Certs Upload */}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-[#0e2453] px-1">الشهادات <span className="text-[#0e2453]/40 font-normal">(اختياري)</span></label>
                    <div 
                      onDragEnter={handleDragCerts} onDragLeave={handleDragCerts} onDragOver={handleDragCerts} onDrop={handleDropCerts}
                      className={`relative w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 min-h-[160px] cursor-pointer
                        ${dragActiveCerts ? "border-[#058B7F] bg-[#058B7F]/5 scale-[1.02]" : "border-gray-200 bg-gray-50/50 hover:border-[#058B7F]/40 hover:bg-[#058B7F]/[0.02]"}
                      `}
                    >
                      <input type="file" id="cert-upload" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => e.target.files && setCertFiles([...certFiles, ...Array.from(e.target.files)])} />
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#058B7F] mb-3">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      {certFiles.length > 0 ? (
                        <p className="text-[13px] font-bold text-[#058B7F] text-center w-full truncate px-4">{certFiles.length} ملفات مدرجة</p>
                      ) : (
                        <div className="text-center">
                          <h4 className="font-bold text-[#0e2453] text-[13px] mb-1">اسحب وأفلت الملفات هنا</h4>
                          <span className="mt-1 inline-block text-[10px] bg-[#0e2453]/5 text-[#0e2453]/60 px-2 py-0.5 rounded font-medium tracking-wide leading-relaxed">
                            يمكنك رفع عدة شهادات - الحد الأقصى 5MB لكل ملف
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Terms and Actions */}
              <div className="pt-6 border-t border-gray-100 space-y-8">
                
                <div className="flex items-start gap-3">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded cursor-pointer transition-all checked:bg-[#058B7F] checked:border-[#058B7F]"
                    />
                    <CheckCircle2 className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <label htmlFor="terms" className="text-[13px] text-[#0e2453]/70 leading-relaxed cursor-pointer select-none">
                    أوافق على <Link href="/terms" className="text-[#058B7F] font-bold hover:underline">الشروط والأحكام</Link> و <Link href="/#privacy" className="text-[#058B7F] font-bold hover:underline">سياسة الخصوصية</Link> الخاصة بالمنصة <span className="text-red-500">*</span>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 text-white font-bold h-14 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(5,139,127,0.25)] hover:shadow-[0_8px_30px_rgba(5,139,127,0.35)] hover:-translate-y-0.5 bg-gradient-to-l from-[#058B7F] to-[#0FAE9E]"
                >
                  إرسال الطلب
                  <Send className="w-4 h-4 mr-2 rotate-180" />
                </button>

              </div>
            </form>
          </div>

          {/* Notes Section */}
          <div className="bg-[#0e2453]/[0.02] border border-[#0e2453]/10 rounded-[24px] p-8 mt-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-[#058B7F]/10 flex items-center justify-center text-[#058B7F] shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-[#0e2453]">ملاحظات هامة</h3>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 pl-2">
              {[
                "سيتم مراجعة طلبك خلال 2-3 أيام عمل",
                "سيتم التواصل معك عبر البريد الإلكتروني",
                "تأكد من صحة جميع البيانات المدخلة",
                "كلمة المرور الافتراضية بعد القبول: password123"
              ].map((note, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#058B7F] mt-2 shrink-0" />
                  <span className="text-[14px] text-[#0e2453]/70 font-medium leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
