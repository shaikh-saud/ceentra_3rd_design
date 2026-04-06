"use client";

import { useCallback, useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "قبل",
  afterLabel = "بعد",
  className = "",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPosition(Number(e.target.value));
    },
    [],
  );

  return (
    <div
      dir="ltr"
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl select-none ${className}`}
    >
      {/* After image (base layer, sets dimensions) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="block w-full aspect-[4/3] sm:aspect-square object-cover"
        draggable={false}
      />

      {/* Before image (overlaid, clipped from the right) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={beforeImage}
        alt={beforeLabel}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />

      {/* Range input (invisible, covers whole area) */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={handleInput}
        aria-label="Percentage of before photo shown"
        className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-20"
      />

      {/* Slider line */}
      <div
        className="absolute inset-y-0 w-[2px] bg-white pointer-events-none z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />

      {/* Slider handle — smaller on mobile */}
      <div
        className="absolute z-10 bg-white text-black p-1.5 sm:p-2 rounded-full grid place-items-center pointer-events-none shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
        style={{
          top: "50%",
          left: `${position}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <line
            x1="128" y1="40" x2="128" y2="216"
            fill="none" stroke="currentColor"
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"
          />
          <line
            x1="96" y1="128" x2="16" y2="128"
            fill="none" stroke="currentColor"
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"
          />
          <polyline
            points="48 160 16 128 48 96"
            fill="none" stroke="currentColor"
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"
          />
          <line
            x1="160" y1="128" x2="240" y2="128"
            fill="none" stroke="currentColor"
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"
          />
          <polyline
            points="208 96 240 128 208 160"
            fill="none" stroke="currentColor"
            strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"
          />
        </svg>
      </div>
    </div>
  );
}
