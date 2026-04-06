"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Send, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

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

function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setValue(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return value;
}

export default function Footer() {
  const tablet = useMediaQuery("(max-width: 1024px)");

  return (
    <footer className="w-full" dir="rtl">
      {/* Main footer */}
      <div className="bg-primary">
        <div className="mx-auto max-w-[1300px] px-6 sm:px-8 py-12 sm:py-16">
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

      {/* Flickering brand name */}
      <div className="w-full h-40 md:h-56 relative bg-white overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white z-10 from-30%" />
        <div className="absolute inset-0 mx-4 sm:mx-6 flex items-center justify-center">
          <FlickeringGrid
            text={tablet ? "Centra" : "Centra"}
            fontSize={tablet ? 100 : 180}
            fontWeight={800}
            className="h-full w-full"
            squareSize={2}
            gridGap={tablet ? 2 : 3}
            color="#058B7F"
            maxOpacity={0.25}
            flickerChance={0.1}
          />
        </div>
      </div>
    </footer>
  );
}
