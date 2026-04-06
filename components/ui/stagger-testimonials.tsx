"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

export interface TestimonialItem {
  tempId: number | string;
  testimonial: string;
  by: string;
  role: string;
  imgSrc: string;
  rating?: number;
}

interface TestimonialCardProps {
  position: number;
  testimonial: TestimonialItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className="absolute left-1/2 top-1/2 cursor-pointer transition-all duration-500 ease-in-out"
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(44px 0%, calc(100% - 44px) 0%, 100% 44px, 100% 100%, calc(100% - 44px) 100%, 44px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.55) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        zIndex: isCenter ? 10 : 0,
        background: isCenter
          ? "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)"
          : "rgba(255,255,255,0.96)",
        border: isCenter
          ? "2px solid #058B7F"
          : "2px solid rgba(5,139,127,0.15)",
        boxShadow: isCenter
          ? "0px 8px 0px 4px rgba(5,139,127,0.25), 0 20px 50px rgba(5,139,127,0.20)"
          : "0 4px 20px rgba(0,0,0,0.06)",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Corner cut diagonal line */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 42,
          width: SQRT_5000,
          height: 2,
          background: isCenter ? "rgba(255,255,255,0.30)" : "rgba(5,139,127,0.18)",
        }}
      />

      {/* Avatar */}
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by}
        className="mb-4 object-cover object-top rounded-sm"
        style={{
          width: 48,
          height: 56,
          boxShadow: isCenter
            ? "3px 3px 0px rgba(255,255,255,0.25)"
            : "3px 3px 0px rgba(5,139,127,0.12)",
        }}
      />

      {/* Stars */}
      {testimonial.rating && (
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-3.5 h-3.5"
              fill={i < testimonial.rating! ? (isCenter ? "#ffffff" : "#058B7F") : "transparent"}
              stroke={isCenter ? "rgba(255,255,255,0.5)" : "rgba(5,139,127,0.35)"}
              strokeWidth={1.5}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
        </div>
      )}

      {/* Quote */}
      <h3
        className="text-[15px] sm:text-[17px] font-bold leading-[1.65] text-right flex-1"
        style={{
          color: isCenter ? "#ffffff" : "#1a2e2d",
        }}
      >
        "{testimonial.testimonial}"
      </h3>

      {/* Author */}
      <div className="mt-3 text-right">
        <p
          className="text-[13px] font-bold"
          style={{ color: isCenter ? "rgba(255,255,255,0.95)" : "#058B7F" }}
        >
          {testimonial.by}
        </p>
        <p
          className="text-[11.5px] mt-0.5"
          style={{ color: isCenter ? "rgba(255,255,255,0.65)" : "rgba(5,139,127,0.6)" }}
        >
          {testimonial.role}
        </p>
      </div>
    </div>
  );
};

interface StaggerTestimonialsProps {
  items: TestimonialItem[];
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({ items }) => {
  const [cardSize, setCardSize] = useState(355);
  const [list, setList] = useState(items);

  const handleMove = (steps: number) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const sm = window.matchMedia("(min-width: 640px)").matches;
      const md = window.matchMedia("(min-width: 768px)").matches;
      setCardSize(md ? 360 : sm ? 320 : 280);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 580 }}>
      {/* Subtle bg tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(5,139,127,0.05) 0%, transparent 70%)",
        }}
      />

      {list.map((t, index) => {
        const position =
          list.length % 2
            ? index - (list.length + 1) / 2
            : index - list.length / 2;
        return (
          <TestimonialCard
            key={t.tempId}
            testimonial={t}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      {/* Nav buttons */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center transition-all duration-200",
            "rounded-full border-2 bg-white",
          )}
          style={{ borderColor: "rgba(5,139,127,0.25)", color: "#058B7F" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#058B7F";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#058B7F";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#fff";
            (e.currentTarget as HTMLButtonElement).style.color = "#058B7F";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(5,139,127,0.25)";
          }}
          aria-label="السابق"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center transition-all duration-200",
            "rounded-full border-2 bg-white",
          )}
          style={{ borderColor: "rgba(5,139,127,0.25)", color: "#058B7F" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#058B7F";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#058B7F";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#fff";
            (e.currentTarget as HTMLButtonElement).style.color = "#058B7F";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(5,139,127,0.25)";
          }}
          aria-label="التالي"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
