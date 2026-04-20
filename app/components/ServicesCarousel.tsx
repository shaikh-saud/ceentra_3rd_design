"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/carousel-marketing.png",
    title: "منصة سنترا للتسويق",
    description: "ارفع طلبك واحصل على أفضل العروض من الشركات الموثوقة بكل سهولة",
    buttons: [
      { text: "إنشاء طلب", primary: true },
      { text: "تصفح الشركات", primary: false },
    ],
  },
  {
    id: 2,
    image: "/images/carousel-learning.png",
    title: "ابدأ رحلتك التعليمية",
    description: "تعلّم من خبراء المجال وطور مهاراتك من خلال دورات احترافية",
    buttons: [
      { text: "تصفح الدورات", primary: true },
      { text: "ابدأ الآن", primary: false },
    ],
  },
  {
    id: 3,
    image: "/images/carousel-consulting.png",
    title: "استشارات احترافية لنمو أعمالك",
    description: "تواصل مع مستشارين متخصصين واحصل على حلول تساعدك على النجاح",
    buttons: [
      { text: "احجز استشارة", primary: true },
      { text: "استكشف المستشارين", primary: false },
    ],
  },
];

export default function ServicesCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-[#F7F9F9] overflow-hidden" dir="rtl">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-6 z-10 relative">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] group bg-gray-900">
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slides[current].image}
                alt={slides[current].title}
                fill
                className="object-cover opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-6">
                <div className="max-w-xl">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-white text-3xl md:text-4xl font-extrabold mb-4 leading-tight"
                  >
                    {slides[current].title}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-white/85 text-base md:text-lg mb-8 leading-relaxed"
                  >
                    {slides[current].description}
                  </motion.p>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex gap-4 justify-center"
                  >
                    {slides[current].buttons.map((btn, idx) => (
                      <button
                        key={idx}
                        className={`px-7 py-3 rounded-full font-bold text-sm md:text-[15px] transition-transform duration-300 hover:scale-105 active:scale-95 ${
                          btn.primary 
                            ? "bg-[#0e2453] text-white shadow-lg" 
                            : "border-2 border-white/80 text-white hover:bg-white hover:text-[#0e2453]"
                        }`}
                      >
                        {btn.text}
                      </button>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === idx ? "bg-[#0FAE9E] w-8" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
