"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Quote, Star } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface AnimatedTestimonialsProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  testimonials?: Testimonial[];
  autoRotateInterval?: number;
  trustedCompanies?: string[];
  trustedCompaniesTitle?: string;
  className?: string;
}

export function AnimatedTestimonials({
  title = "ماذا يقول عملاؤنا",
  subtitle = "آراء حقيقية من عملاء استفادوا من خدمات المنصة وحققوا نتائج ملموسة.",
  badgeText = "آراء العملاء",
  testimonials = [],
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = "شركاء النجاح",
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotateInterval, testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`py-20 sm:py-24 md:py-28 overflow-hidden bg-white ${className || ""}`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20 items-center"
        >
          {/* Right side (RTL): Heading and navigation */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center text-right order-1">
            <div className="space-y-5">
              {badgeText && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/7 text-primary text-[13px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {badgeText}
                </span>
              )}

              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-extrabold text-text-primary leading-snug">
                {title}
              </h2>

              <p className="max-w-[500px] text-text-secondary text-[15px] sm:text-[16px] leading-relaxed">
                {subtitle}
              </p>

              {/* Dot nav */}
              <div className="flex items-center gap-2.5 pt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === index
                        ? "w-10 bg-primary"
                        : "w-2.5 bg-gray-200 hover:bg-gray-300"
                    }`}
                    aria-label={`عرض التقييم ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Left side (RTL): Testimonial cards */}
          <motion.div
            variants={itemVariants}
            className="relative min-h-[340px] sm:min-h-[380px] order-2"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: -80 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : -80,
                  scale: activeIndex === index ? 1 : 0.92,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ zIndex: activeIndex === index ? 10 : 0 }}
              >
                <div className="bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-2xl p-7 sm:p-8 h-full flex flex-col text-right">
                  {/* Stars */}
                  <div className="mb-5 flex gap-1.5 justify-end">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4.5 w-4.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6 flex-1">
                    <Quote className="absolute -top-1 -right-1 h-7 w-7 text-primary/15 rotate-180" />
                    <p className="relative z-10 text-[15px] sm:text-[16px] font-medium leading-[1.85] text-text-primary pr-4">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </div>

                  <Separator className="my-4 bg-gray-100" />

                  {/* User */}
                  <div className="flex items-center gap-3.5 justify-end">
                    <div className="text-right">
                      <h3 className="font-bold text-[15px] text-text-primary">
                        {testimonial.name}
                      </h3>
                      <p className="text-[13px] text-text-secondary">
                        {testimonial.role}{testimonial.company ? `، ${testimonial.company}` : ""}
                      </p>
                    </div>
                    <Avatar className="h-11 w-11 border-2 border-primary/10">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative corners */}
            <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-xl bg-primary/[0.04] -z-10" />
            <div className="absolute -top-4 -left-4 h-20 w-20 rounded-xl bg-primary/[0.04] -z-10" />
          </motion.div>
        </motion.div>

        {/* Trusted companies */}
        {trustedCompanies.length > 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="mt-20 text-center"
          >
            <h3 className="text-[13px] font-semibold text-text-secondary/50 mb-8 tracking-wide">
              {trustedCompaniesTitle}
            </h3>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-5">
              {trustedCompanies.map((company) => (
                <div
                  key={company}
                  className="text-xl sm:text-2xl font-bold text-gray-200"
                >
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
