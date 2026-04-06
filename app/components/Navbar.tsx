"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Home, Settings, Info, Lightbulb, CreditCard, Users } from "lucide-react";

const NAV_LINKS = [
  { label: "الرئيسية",  href: "#home",         icon: Home       },
  { label: "كيف تعمل", href: "#how-it-works", icon: Settings   },
  { label: "من نحن",   href: "#about",        icon: Info       },
  { label: "الخدمات",  href: "#services",     icon: Lightbulb  },
  { label: "الأسعار",  href: "#pricing",      icon: CreditCard },
  { label: "الطلبات",  href: "#jobs",         icon: Users      },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");
  const isClickScrolling = useRef(false);
  const scrollTimeout    = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (isClickScrolling.current) return;
      let current = activeSection;
      let minDist = Infinity;
      for (const link of NAV_LINKS) {
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
  }, [activeSection]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.substring(1));
    if (el) {
      isClickScrolling.current = true;
      setActiveSection(href);
      window.scrollTo({ top: el.offsetTop - 90, behavior: "smooth" });
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => { isClickScrolling.current = false; }, 1000);
    }
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-4">
        {NAV_LINKS.map((link) => {
          const active = activeSection === link.href;
          const Icon   = link.icon;
          return (
            <li
              key={link.href}
              className={`relative flex items-center justify-center h-15 rounded-full cursor-pointer overflow-hidden transition-all duration-500 group
                ${active ? "w-40 shadow-none" : "w-15 hover:w-40 hover:shadow-none"}`}
              style={{
                background: active
                  ? "linear-gradient(135deg, #058B7F, #0FAE9E)"
                  : "#ffffff",
                boxShadow: active
                  ? "0 8px 24px rgba(5,139,127,0.40)"
                  : "0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
              }}
              onClick={(e) => handleClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, link.href)}
            >
              {/* Hover gradient bg — inactive only */}
              {!active && (
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ background: "linear-gradient(135deg, #058B7F, #0FAE9E)" }}
                />
              )}
              {/* Glow */}
              {!active && (
                <span
                  className="absolute top-2.5 inset-x-0 h-full rounded-full blur-[15px] -z-10 opacity-0 group-hover:opacity-50 transition-all duration-500"
                  style={{ background: "linear-gradient(135deg, #058B7F, #0FAE9E)" }}
                />
              )}

              {/* Icon — visible, shrinks to 0 on hover */}
              <span className="relative z-10 transition-all duration-500 group-hover:scale-0 group-hover:opacity-0"
                style={{ display: active ? "none" : "flex" }}>
                <Icon className="w-6 h-6" style={{ color: "#94a3b8" }} strokeWidth={1.8} />
              </span>

              {/* Label — always visible when active, appears on hover for inactive */}
              <span
                className="absolute z-10 text-white text-[13px] font-bold whitespace-nowrap transition-all duration-500"
                style={{
                  opacity:         active ? 1 : 0,
                  transform:       active ? "scale(1)" : "scale(0)",
                  transitionDelay: "150ms",
                }}
              >
                {link.label}
              </span>

              {/* Hover label for inactive */}
              {!active && (
                <span
                  className="absolute z-10 text-white text-[13px] font-bold whitespace-nowrap scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"
                  style={{ transitionDelay: "150ms" }}
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
