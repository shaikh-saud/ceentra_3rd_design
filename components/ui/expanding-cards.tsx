"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  tag?: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<HTMLUListElement, ExpandingCardsProps>(
  ({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState<number>(defaultActiveIndex);
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
      const check = () => setIsDesktop(window.innerWidth >= 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

    const gridStyle = React.useMemo(() => {
      if (isDesktop) {
        return {
          gridTemplateColumns: items
            .map((_, i) => (i === activeIndex ? "4.5fr" : "1fr"))
            .join(" "),
          gridTemplateRows: "1fr",
        };
      }
      return {
        gridTemplateColumns: "1fr",
        gridTemplateRows: items
          .map((_, i) => (i === activeIndex ? "4.5fr" : "1fr"))
          .join(" "),
      };
    }, [activeIndex, items.length, isDesktop]);

    return (
      <ul
        ref={ref}
        className={cn(
          "w-full grid gap-2",
          "h-[640px] md:h-[520px]",
          "transition-[grid-template-columns,grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          className,
        )}
        style={gridStyle}
        {...props}
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={item.id}
              className={cn(
                "group relative cursor-pointer overflow-hidden",
                "rounded-2xl min-h-0 min-w-0",
                "border transition-all duration-500",
                isActive
                  ? "border-primary/30 shadow-[0_8px_40px_rgba(5,139,127,0.20)]"
                  : "border-primary/10 shadow-sm hover:border-primary/20",
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              tabIndex={0}
              onFocus={() => setActiveIndex(index)}
            >
              {/* Background image */}
              <img
                src={item.imgSrc}
                alt={item.title}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
                  isActive ? "scale-100 grayscale-0" : "scale-110 grayscale-[30%]",
                )}
              />

              {/* Gradient overlay — heavier at bottom for text legibility */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(4,110,101,0.92) 0%, rgba(5,139,127,0.55) 45%, rgba(5,139,127,0.15) 100%)"
                    : "linear-gradient(to top, rgba(4,110,101,0.80) 0%, rgba(5,139,127,0.30) 60%, rgba(0,0,0,0.10) 100%)",
                }}
              />

              {/* Collapsed state — rotated title (desktop only) */}
              <h3
                className={cn(
                  "absolute bottom-6 left-1/2 -translate-x-1/2",
                  "hidden md:block origin-center rotate-90",
                  "text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 whitespace-nowrap",
                  "transition-opacity duration-300",
                  isActive ? "opacity-0" : "opacity-100",
                )}
              >
                {item.title}
              </h3>

              {/* Expanded content */}
              <article className="absolute inset-0 flex flex-col justify-end gap-3 p-6">

                {/* Tag pill */}
                {item.tag && (
                  <div
                    className={cn(
                      "self-start transition-all duration-300 delay-75",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                    )}
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide"
                      style={{ background: "rgba(255,255,255,0.18)", color: "#ffffff", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}>
                      {item.tag}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 delay-100",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                  )}
                  style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.22)" }}
                >
                  <span className="text-white">{item.icon}</span>
                </div>

                {/* Title */}
                <h3
                  className={cn(
                    "text-[22px] font-extrabold text-white leading-snug transition-all duration-300 delay-150",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                  )}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className={cn(
                    "text-[13.5px] text-white/80 leading-[1.8] max-w-xs transition-all duration-300 delay-200",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                  )}
                >
                  {item.description}
                </p>

                {/* CTA link */}
                <div
                  className={cn(
                    "transition-all duration-300 delay-[250ms]",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                  )}
                >
                  <span
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold text-white/90 hover:text-white"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: "1px" }}
                  >
                    اكتشف المزيد
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: "rotate(180deg)" }}>
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    );
  },
);
ExpandingCards.displayName = "ExpandingCards";
