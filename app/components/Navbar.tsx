"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Info,
  Lightbulb,
  CreditCard,
  Settings,
  Users,
  MessageCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "الرئيسية", href: "#home", icon: Home },
  { label: "كيف تعمل المنصة", href: "#how-it-works", icon: Settings },
  { label: "من نحن", href: "#about", icon: Info },
  { label: "الخدمات", href: "#services", icon: Lightbulb },
  { label: "الأسعار", href: "#pricing", icon: CreditCard },
  { label: "طلبات العملاء", href: "#jobs", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isClickScrolling.current) return;

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      let currentSection = activeSection;
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 180) {
            const distance = 180 - rect.top;
            if (distance < minDistance) {
              minDistance = distance;
              currentSection = `#${section}`;
            }
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isActive = useCallback(
    (href: string) => activeSection === href,
    [activeSection],
  );

  const closeMobile = useCallback(() => setIsMobileMenuOpen(false), []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const elem = document.getElementById(targetId);
    
    if (elem) {
      isClickScrolling.current = true;
      setActiveSection(href);
      
      window.scrollTo({
        top: elem.offsetTop - 90,
        behavior: "smooth",
      });

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    }
    closeMobile();
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-6 pt-3 pb-2">
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "bg-white rounded-full border border-gray-200/60 transition-shadow duration-300",
              isScrolled
                ? "shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
                : "shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
            )}
          >
            <div className="flex items-center justify-between h-[72px] px-5 lg:px-8">
              {/* Logo */}
              <Link href="/" className="shrink-0 flex items-center">
                <Image
                  src="/footer_icon.png"
                  alt="Centra"
                  width={140}
                  height={40}
                  className="h-9 lg:h-10 w-auto"
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-0.5">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={cn(
                        "relative px-4 py-[7px] text-[14px] font-semibold rounded-full transition-colors duration-200 select-none cursor-pointer",
                        active
                          ? "text-white"
                          : "text-text-primary group hover:text-primary",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-pill"
                          className="absolute inset-0 z-0 bg-primary rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      {!active && (
                        <span className="absolute bottom-[2px] right-4 left-4 h-[2px] bg-primary rounded-full origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                      )}

                      <span className="relative z-10">{link.label}</span>
                    </a>
                  );
                })}
              </nav>

              {/* Desktop CTA */}
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="hidden lg:inline-flex items-center justify-center px-7 py-2.5 text-[14px] font-bold text-white rounded-full bg-primary shadow-[0_2px_8px_rgba(5,139,127,0.25)] transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_6px_20px_rgba(5,139,127,0.35)] cursor-pointer"
                >
                  ابدأ الآن
                </a>
              </motion.div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-black/5"
                aria-label="Menu"
              >
                <div className="w-[22px] flex flex-col gap-[5px]">
                  <span className="block h-[2px] w-full bg-text-primary rounded-full" />
                  <span className="block h-[2px] w-full bg-text-primary rounded-full" />
                  <span className="block h-[2px] w-full bg-text-primary rounded-full" />
                </div>
              </button>
            </div>
          </motion.nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={closeMobile}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 z-50 h-full w-[85%] max-w-[380px] bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 h-[72px] border-b border-black/5">
                  <Image
                    src="/footer_icon.png"
                    alt="Centra"
                    width={120}
                    height={36}
                    className="h-8 w-auto"
                  />
                  <button
                    onClick={closeMobile}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-text-secondary" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-4">
                  {NAV_LINKS.map((link, index) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04, duration: 0.3 }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className={cn(
                            "flex items-center gap-3 py-3 px-4 rounded-xl text-[15px] font-semibold transition-all duration-200 mb-1 cursor-pointer",
                            active
                              ? "bg-primary text-white"
                              : "text-text-primary hover:bg-bg-light",
                          )}
                        >
                          <Icon
                            className="w-5 h-5 shrink-0"
                            strokeWidth={active ? 2.5 : 1.8}
                          />
                          {link.label}
                        </a>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="p-5 space-y-3 border-t border-black/5">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <a
                      href="#contact"
                      onClick={(e) => handleLinkClick(e, "#contact")}
                      className="block w-full py-3.5 text-center text-[15px] font-bold text-white rounded-xl bg-primary transition-colors hover:bg-primary-dark cursor-pointer"
                    >
                      ابدأ الآن
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                  >
                    <a
                      href="https://wa.me/966XXXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-3 text-[14px] font-semibold rounded-xl border border-[#25D366]/30 text-[#25D366] transition-colors hover:bg-[#25D366]/5"
                    >
                      <MessageCircle className="w-[18px] h-[18px]" />
                      تواصل عبر واتساب
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
