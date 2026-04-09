"use client";

import React, { useEffect, useState } from "react";
import { 
  FileText, 
  AlertTriangle, 
  Mail, 
  PhoneCall, 
  MapPin, 
  ChevronLeft,
  CheckCircle2
} from "lucide-react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

const TOC_SECTIONS = [
  { id: "intro", title: "مقدمة" },
  { id: "definitions", title: "التعريفات" },
  { id: "account", title: "التسجيل والحساب" },
  { id: "services", title: "الخدمات" },
  { id: "payments", title: "الدفع والمالية" },
  { id: "rights", title: "الحقوق والواجبات" },
  { id: "privacy", title: "الخصوصية" },
  { id: "disputes", title: "النزاعات" },
  { id: "termination", title: "إنهاء الخدمة" },
  { id: "contact", title: "التواصل" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("intro");

  // Intersection Observer to highlight the active section in the sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" } // Adjust trigger point to slightly below the top
    );

    TOC_SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for sticky navbar
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <div 
        className="pt-32 pb-16 relative overflow-hidden" 
        style={{ background: "linear-gradient(135deg, #F7F9F9 0%, #E6F0F0 100%)" }}
        dir="rtl"
      >
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={0.06}
          duration={3}
          className="text-[#058B7F]"
        />
        
        {/* Soft Theme Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#058B7F] opacity-[0.05] blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#0e2453] opacity-[0.05] blur-[100px] pointer-events-none z-0" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl shadow-[#058B7F]/10 mb-6 text-[#058B7F]">
            <FileText className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0e2453] mb-4 tracking-tight">
            الشروط والأحكام
          </h1>
          <p className="text-[#0e2453]/60 font-medium text-[15px]">
            آخر تحديث: 1 يناير 2026
          </p>
        </div>
      </div>

      <main className="bg-[#F7F9F9] pb-24 relative" dir="rtl">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start relative mt-[-20px] lg:mt-[-40px] z-20">
            
            {/* Right Sidebar: Table of Contents (Visual Right out of 2 cols) */}
            <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-[100px]">
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
                <h3 className="font-extrabold justify-center md:justify-start text-[#0e2453] text-[18px] mb-5 flex items-center gap-2">
                  المحتويات
                </h3>
                <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                  {TOC_SECTIONS.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        onClick={(e) => scrollToSection(e, section.id)}
                        className={`flex items-center justify-between whitespace-nowrap lg:whitespace-normal px-4 py-3 rounded-xl transition-all duration-300 text-[14px] font-bold shrink-0
                          ${isActive 
                            ? "bg-[#058B7F]/10 text-[#058B7F]" 
                            : "text-[#0e2453]/60 hover:bg-gray-50 hover:text-[#0e2453]"
                          }`}
                      >
                        {section.title}
                        {isActive && <ChevronLeft className="w-4 h-4 hidden lg:block" />}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Left Main Content */}
            <div className="flex-1 min-w-0 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 mb-8">
              
              <div className="prose prose-slate max-w-none text-[#0e2453]/80 leading-loose">
                
                {/* 1. مقدمة */}
                <section id="intro" className="scroll-mt-32 mb-14">
                  <h2 className="text-2xl font-bold text-[#0e2453] mb-4 pb-2 border-b border-gray-100">1. مقدمة</h2>
                  <p className="text-[15px] mb-4">
                    مرحباً بك في منصة سنترا الشاملة للخدمات الرقمية. تحكم هذه الشروط والأحكام وصولك واستخدامك لمنصة سنترا بجميع أقسامها والخدمات والمحتوى والميزات المتوفرة بها. يخضع استخدامك للمنصة لالتزامك بهذه الشروط.
                  </p>
                  <p className="text-[15px]">
                    يرجى قراءة هذه الوثيقة بعناية تامة. في حال عدم موافقتك على أي جزء من هذه الشروط، يجب عليك التوقف فوراً عن استخدام المنصة وخدماتها.
                  </p>
                </section>

                {/* 2. التعريفات */}
                <section id="definitions" className="scroll-mt-32 mb-14">
                  <h2 className="text-2xl font-bold text-[#0e2453] mb-4 pb-2 border-b border-gray-100">2. التعريفات</h2>
                  <ul className="list-disc list-inside space-y-3 text-[15px] marker:text-[#058B7F]">
                    <li><strong className="text-[#0e2453]">المنصة:</strong> تشير إلى تطبيق سنترا وموقعها الإلكتروني.</li>
                    <li><strong className="text-[#0e2453]">المستخدم:</strong> أي شخص طبيعي أو اعتباري يقوم بالدخول للمنصة واستخدام خدماتها.</li>
                    <li><strong className="text-[#0e2453]">مزود الخدمة:</strong> الشركة أو المستشار أو المدرب الذي يقدم خدماته من خلال المنصة للعملاء.</li>
                    <li><strong className="text-[#0e2453]">الخدمات:</strong> جميع الخدمات والمنتجات الرقمية المعروضة والمقدمة عبر المنصة.</li>
                  </ul>
                </section>

                {/* 3. التسجيل والحساب */}
                <section id="account" className="scroll-mt-32 mb-14">
                  <h2 className="text-2xl font-bold text-[#0e2453] mb-4 pb-2 border-b border-gray-100">3. التسجيل والحساب</h2>
                  <p className="text-[15px] mb-6">
                    يتطلب استخدام بعض ميزات المنصة إنشاء حساب وتوفير بيانات دقيقة ومحدثة. يقر المستخدم بصحة جميع المعلومات المقدمة ويتحمل المسؤولية كاملة بشأنها. 
                  </p>

                  <div className="bg-[#058B7F]/5 border border-[#058B7F]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#058B7F]/10 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-6 h-6 text-[#058B7F]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0e2453] mb-1">ملاحظة هامة</h4>
                      <p className="text-[#0e2453]/70 text-[14px]">
                        أنت مسؤول بالكامل عن الحفاظ على سرية معلومات حسابك وكلمة المرور، وأنت مسؤول عن جميع الأنشطة التي تتم من خلال حسابك. يجب إخطارنا فوراً بأي استخدام غير مصرح به.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 4. الخدمات */}
                <section id="services" className="scroll-mt-32 mb-14">
                  <h2 className="text-2xl font-bold text-[#0e2453] mb-4 pb-2 border-b border-gray-100">4. الخدمات</h2>
                  <p className="text-[15px] mb-4">
                    تعمل المنصة كوسيط إلكتروني يجمع بين طالبي الخدمة ومقدميها، ولا نمثل أي من الطرفين ولا نتحمل مسؤولية فشل مقدم الخدمة في الوفاء بالتزاماته. كما نحتفظ بالحق في تعديل أو تعليق الخدمات في أي وقت دون إشعار مسبق.
                  </p>
                </section>

                {/* 5. الدفع والمالية */}
                <section id="payments" className="scroll-mt-32 mb-14">
                  <h2 className="text-2xl font-bold text-[#0e2453] mb-4 pb-2 border-b border-gray-100">5. الدفع والمالية</h2>
                  <ul className="list-disc list-inside space-y-3 text-[15px] marker:text-[#058B7F]">
                    <li>تخضع جميع الأسعار المعروضة للرسوم الضريبية المعمول بها في النطاق الجغرافي للمنصة.</li>
                    <li>تتم جميع عمليات الدفع من خلال بوابات دفع إلكترونية آمنة ومعتمدة.</li>
                    <li>يحق للمنصة الاحتفاظ بنسبة من قيمة الخدمات المعروضة كرسوم استخدام.</li>
                    <li>لا يمكن استرداد المبالغ المدفوعة بمجرد تسليم الخدمة المطلوبة مالم يخل مقدم الخدمة بشروط العقد.</li>
                  </ul>
                </section>

                {/* 6. الحقوق والواجبات */}
                <section id="rights" className="scroll-mt-32 mb-14">
                  <h2 className="text-2xl font-bold text-[#0e2453] mb-4 pb-2 border-b border-gray-100">6. الحقوق والواجبات</h2>
                  <p className="text-[15px] mb-4">
                    جميع محتويات المنصة من نصوص، تصاميم، شعارات، ورموز هي ملكية فكرية خالصة لمنصة سنترا ومحمية بقوانين حقوق الطبع والنشر. يُحظر استخدام أي محتوى تجاريًا دون الحصول على موافقة خطية مسبقة. وتلتزم كمستخدم بعدم الإساءة لشخصيات أو مؤسسات داخل بيئة المنصة.
                  </p>
                </section>

                {/* 7. الخصوصية */}
                <section id="privacy" className="scroll-mt-32 mb-14">
                  <h2 className="text-2xl font-bold text-[#0e2453] mb-4 pb-2 border-b border-gray-100">7. الخصوصية</h2>
                  <p className="text-[15px] mb-4">
                    نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. يتم جمع واستخدام البيانات فقط لغرض تحسين الخدمات ومعالجة المعاملات كما هو مفصل في سياسة الخصوصية التابعة لنا والمكملة لهذه الشروط. لا يتم بيع أي بيانات لأطراف ثالثة خارجية تحت أي ظرف.
                  </p>
                </section>

                {/* 8. النزاعات */}
                <section id="disputes" className="scroll-mt-32 mb-14">
                  <h2 className="text-2xl font-bold text-[#0e2453] mb-4 pb-2 border-b border-gray-100">8. النزاعات</h2>
                  <p className="text-[15px] mb-4">
                    تخضع هذه الشروط والأحكام وتفسر وفقاً للأنظمة المعمول بها في المملكة العربية السعودية. وفي حال نشوء أي نزاع يتصل بالمنصة، يتم حله ودياً في البداية، وإذا تعذر ذلك، تختص المحاكم السعودية بفض هذه النزاعات.
                  </p>
                </section>

                {/* 9. إنهاء الخدمة */}
                <section id="termination" className="scroll-mt-32 mb-14">
                  <h2 className="text-2xl font-bold text-[#0e2453] mb-4 pb-2 border-b border-gray-100">9. إنهاء الخدمة</h2>
                  <p className="text-[15px] mb-4">
                    نحتفظ بالحق في إيقاف أو إنهاء وصولك إلى المنصة أو تعليق الحساب فورًا ودون إشعار مسبق في حال انتهاكك لأي بند من الشروط المذكورة هنا، أو في حالة رصد نشاط مشبوه يهدد أمان وموثوقية المنصة والمستخدمين الآخرين.
                  </p>
                </section>

                {/* 10. التواصل */}
                <section id="contact" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-[#0e2453] mb-6 pb-2 border-b border-gray-100">10. التواصل</h2>
                  <p className="text-[15px] mb-6">
                    إذا كان لديك أي أسئلة، استفسارات، أو إبلاغات بخصوص هذه الشروط والأحكام، يرجى عدم التردد في التواصل معنا عبر القنوات الرسمية المتوفرة طوال أيام العمل:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-200">
                      <Mail className="w-6 h-6 text-[#058B7F] mb-3" />
                      <span className="text-[12px] text-[#0e2453]/60 mb-1">البريد الإلكتروني</span>
                      <a href="mailto:legal@centra.sa" className="font-bold text-[#0e2453] font-sans hover:text-[#058B7F]">legal@centra.sa</a>
                    </div>
                    <div className="bg-gray-50 flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-200">
                      <PhoneCall className="w-6 h-6 text-[#058B7F] mb-3" />
                      <span className="text-[12px] text-[#0e2453]/60 mb-1">الهاتف الموحد</span>
                      <a href="tel:920000000" className="font-bold text-[#0e2453] font-sans hover:text-[#058B7F]" dir="ltr">920000000</a>
                    </div>
                    <div className="bg-gray-50 flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-200">
                      <MapPin className="w-6 h-6 text-[#058B7F] mb-3" />
                      <span className="text-[12px] text-[#0e2453]/60 mb-1">المقر الرئيسي</span>
                      <span className="font-bold text-[#0e2453]">الرياض، المملكة العربية السعودية</span>
                    </div>
                  </div>
                </section>

              </div>
            </div>

          </div>

          {/* Bottom Confirmation Box */}
          <div className="bg-gradient-to-l from-[#0e2453] to-[#162a5c] rounded-2xl shadow-xl overflow-hidden mt-8 max-w-7xl mx-auto border border-[#1a3875]">
            <div className="bg-[#058B7F]/10 px-8 py-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
              <div className="w-12 h-12 bg-[#058B7F]/20 rounded-full flex items-center justify-center shrink-0 border border-[#058B7F]/30">
                <CheckCircle2 className="w-6 h-6 text-[#058B7F]" />
              </div>
              <p className="text-white text-[15px] sm:text-[16px] font-medium leading-relaxed flex-1">
                باستخدامك للمنصة، فإنك تقر وتصرح بأنك قد قرأت وفهمت وصادقت بالكامل على جميع البنود الواردة في هذه الوثيقة (الشروط والأحكام).
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
