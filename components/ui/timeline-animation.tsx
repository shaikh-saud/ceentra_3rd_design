"use client";

import { motion, useInView, Variants } from "framer-motion";
import React, { useRef, RefObject } from "react";

interface TimelineContentProps {
  children: React.ReactNode;
  animationNum: number;
  timelineRef: RefObject<HTMLDivElement | null>;
  as?: React.ElementType;
  className?: string;
  customVariants?: Variants;
}

export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  as: Component = "div",
  className,
  customVariants,
}: TimelineContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const variants = customVariants || defaultVariants;

  return (
    <motion.div
      ref={ref}
      custom={animationNum}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}
