"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Settings, Info, Lightbulb, CreditCard, Users } from "lucide-react";

const NAV_LINKS = [
  { label: "الرئيسية",  href: "#home",         icon: Home       },
  { label: "كيف تعمل", href: "/how-it-works", icon: Settings   },
  { label: "من نحن",   href: "#about",        icon: Info       },
  { label: "الخدمات",  href: "#services",     icon: Lightbulb  },
  { label: "الأسعار",  href: "#pricing",      icon: CreditCard },
  { label: "الطلبات",  href: "#jobs",         icon: Users      },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");
  const isClickScrolling = useRef(false);
  const scrollTimeout    = useRef<NodeJS.Timeout | null>(null);
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only apply scroll spy on the main page.
    if (pathname !== "/") return;

    const onScroll = () => {
      if (isClickScrolling.current) return;
      let current = activeSection;
      let minDist = Infinity;
      for (const link of NAV_LINKS) {
        if (!link.href.startsWith("#")) continue;
        const el = document.getElementById(link.href.substring(1));
        if (el) {
          const { top } = el.getBoundingClientRect();
          if (top <= 180) {
            const d = 180 - top;
            if (d < minDist) { minDist = d; current = link.href; }
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSection, pathname]);

  const handleClick = useCallback((href: string) => {
    // If it's a direct page route
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }

    // If it's an anchor and we are not on the home page
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    
    // Smooth scrolling on the home page for anchors
    const el = document.getElementById(href.substring(1));
    if (el) {
      isClickScrolling.current = true;
      setActiveSection(href);
      window.scrollTo({ top: el.offsetTop - 90, behavior: "smooth" });
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => { isClickScrolling.current = false; }, 1000);
    }
  }, [pathname, router]);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <ul
        className="flex items-center gap-2 px-2 py-2 rounded-full" dir="rtl"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(14,36,83,0.10)",
          boxShadow: "0 8px 32px rgba(14,36,83,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo — right side (RTL leading) */}
        <li className="flex items-center justify-center h-11 px-3 shrink-0">
          <Link href="/">
            <Image
              src="/ceentra-logo.png"
              alt="Centra"
              width={96}
              height={32}
              className="object-contain cursor-pointer"
            />
          </Link>
        </li>

        {/* Divider */}
        <li className="h-6 w-px shrink-0" style={{ background: "rgba(14,36,83,0.15)" }} />

        {NAV_LINKS.map((link) => {
          // Highlight active only on home page if it matches scroll section
          const active = pathname === "/" ? activeSection === link.href : false;
          const Icon   = link.icon;
          return (
            <li
              key={link.href}
              className={`relative flex items-center justify-center h-11 rounded-full cursor-pointer overflow-hidden transition-all duration-500 group
                ${active ? "w-36" : "w-11 hover:w-36"}`}
              style={{
                background: active
                  ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
                  : "transparent",
                boxShadow: active
                  ? "0 4px 16px rgba(5,139,127,0.40)"
                  : "none",
              }}
              onClick={() => handleClick(link.href)}
            >
              {/* Hover teal gradient bg — inactive only */}
              {!active && (
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)" }}
                />
              )}

              {/* Icon — shrinks to 0 on hover */}
              <span
                className="relative z-10 transition-all duration-500 group-hover:scale-0 group-hover:opacity-0"
                style={{ display: active ? "none" : "flex" }}
              >
                <Icon className="w-5 h-5" style={{ color: "rgba(14,36,83,0.55)" }} strokeWidth={1.8} />
              </span>

              {/* Label — always visible when active */}
              {active && (
                <span className="absolute z-10 text-white text-[13px] font-bold whitespace-nowrap">
                  {link.label}
                </span>
              )}

              {/* Hover label for inactive */}
              {!active && (
                <span
                  className="absolute z-10 text-white text-[13px] font-bold whitespace-nowrap scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"
                  style={{ transitionDelay: "120ms" }}
                >
                  {link.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
