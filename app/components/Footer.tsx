"use client";

import Link from "next/link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Send, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "الدعم",
    links: [
      { id: 1, title: "مركز المساعدة", url: "#" },
      { id: 2, title: "تواصل معنا", url: "#contact" },
      { id: 3, title: "الأسئلة الشائعة", url: "#faq" },
      { id: 4, title: "الشروط والأحكام", url: "#" },
    ],
  },
  {
    title: "انضم إلينا",
    links: [
      { id: 5, title: "انضم كمستشار", url: "#" },
      { id: 6, title: "انضم كمدرب", url: "#" },
      { id: 7, title: "انضم كصانع محتوى", url: "#" },
      { id: 8, title: "إنشاء حساب", url: "#" },
      { id: 9, title: "كيفية العمل", url: "#how-we-work" },
    ],
  },
  {
    title: "للشركات",
    links: [
      { id: 10, title: "تسجيل شركة", url: "#" },
      { id: 11, title: "توثيق الشركة", url: "#" },
      { id: 12, title: "الوثائق والتسجيل", url: "#" },
      { id: 13, title: "الأسعار", url: "#pricing" },
    ],
  },
  {
    title: "روابط سريعة",
    links: [
      { id: 14, title: "الرئيسية", url: "/" },
      { id: 15, title: "كيف تعمل المنصة؟", url: "#how-we-work" },
      { id: 16, title: "الطلبات", url: "#requests" },
      { id: 17, title: "الاشتراكات", url: "#subscriptions" },
    ],
  },
];


export default function Footer() {

  return (
    <footer className="w-full" dir="rtl">
      {/* Main footer */}
      <div className="relative bg-primary overflow-hidden">

        {/* World map background layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
            style={{
              opacity: 0.07,
              filter: "brightness(0) invert(1)",
              mixBlendMode: "overlay",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-325 px-6 sm:px-8 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-8">
            
            {/* Brand column */}
            <div className="flex flex-col items-start gap-4 max-w-[280px] shrink-0">
              <Link href="/">
                {/* Fallback to text if logo.svg is absent, but keeping image as requested by design */}
                <span className="text-white font-black text-2xl tracking-tight">Centra</span>
              </Link>
              <p className="text-[13px] leading-relaxed text-white/55">
                منصة سنترا - وسيط موثوق بين العملاء وشركات التسويق. نضمن لك تجربة آمنة وموثوقة.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Linkedin className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Twitter className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>

            {/* Link columns */}
            <div className="flex-1 w-full md:w-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6">
                {FOOTER_LINKS.map((column) => (
                  <ul key={column.title} className="flex flex-col gap-2.5">
                    <li className="mb-1.5 text-[14px] font-bold text-white">
                      {column.title}
                    </li>
                    {column.links.map((link) => (
                      <li
                        key={link.id}
                        className="group inline-flex cursor-pointer items-center gap-1 text-[13px] text-white/55 transition-colors hover:text-white/90"
                      >
                        <Link href={link.url}>{link.title}</Link>
                        <div className="flex size-4 items-center justify-center rounded border border-white/15 translate-x-0 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
                          <ChevronLeftIcon className="h-3.5 w-3.5 text-white/70" />
                        </div>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="shrink-0 w-full sm:w-auto sm:min-w-[240px]">
              <h4 className="text-[14px] font-bold text-white mb-2">النشرة البريدية</h4>
              <p className="text-[13px] text-white/50 mb-3 leading-relaxed">
                اشترك ليصلك كل جديد
              </p>
              <div className="flex items-center bg-white/10 rounded-full overflow-hidden border border-white/15">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent px-4 py-2.5 text-[13px] text-white placeholder:text-white/40 outline-none min-w-0 font-sans"
                  dir="ltr"
                />
                <button className="shrink-0 w-9 h-9 flex items-center justify-center bg-white/15 hover:bg-white/25 transition-colors duration-200 rounded-full m-0.5">
                  <Send className="w-4 h-4 text-white rotate-180" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Divider & Bottom Bar */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/40">
            <span>سياسة الخصوصية | دعم فني سريع عبر واتساب</span>
            <span>© {new Date().getFullYear()} Centra Platform. جميع الحقوق محفوظة.</span>
          </div>
        </div>
      </div>

      {/* Embossed brand name */}
      <div className="w-full bg-white overflow-hidden pointer-events-none select-none flex items-center justify-center py-2">
        <span
          style={{
            fontSize: "clamp(72px, 17vw, 210px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "#efefef",
            textShadow:
              "3px 3px 7px rgba(180,180,192,0.55), -2px -2px 5px rgba(255,255,255,1)",
            fontFamily: "inherit",
          }}
        >
          Centra
        </span>
      </div>
    </footer>
  );
}
