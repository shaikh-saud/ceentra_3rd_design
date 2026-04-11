"use client";

import React from "react";

interface ActionBtnProps {
  icon: React.ElementType;
  title: string;
  base: string;
  hover: string;
  size?: "sm" | "md";
  onClick?: () => void;
}

export default function ActionBtn({
  icon: Icon,
  title,
  base,
  hover,
  size = "md",
  onClick,
}: ActionBtnProps) {
  const dim = size === "sm" ? "w-7 h-7" : "w-8 h-8";
  const ico = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

  return (
    <button
      title={title}
      onClick={onClick}
      className={`
        ${dim} rounded-lg border flex items-center justify-center
        transition-all duration-200 hover:scale-110 active:scale-95
        ${base} ${hover}
      `}
    >
      <Icon className={ico} strokeWidth={2.2} />
    </button>
  );
}
