"use client";

import React from "react";

interface MessageItemProps {
  name: string;
  preview: string;
  unread: number;
  delay?: number;
}

export default function MessageItem({ name, preview, unread, delay = 0 }: MessageItemProps) {
  const hasUnread = unread > 0;

  return (
    <div
      className="flex items-center gap-3.5 px-5 py-4 hover:bg-[#058B7F]/[0.03] transition-colors duration-200 cursor-pointer animate-[fadeSlideUp_0.4s_ease-out]"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#058B7F] to-[#0FAE9E] flex items-center justify-center text-white text-[13px] font-extrabold shrink-0 shadow-sm">
        {name.charAt(0)}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-[14px] leading-tight truncate ${hasUnread ? "font-extrabold text-[#0e2453]" : "font-bold text-[#0e2453]/80"}`}>
          {name}
        </p>
        <p className={`text-[12px] mt-0.5 truncate ${hasUnread ? "text-[#0e2453]/65 font-medium" : "text-[#0e2453]/40 font-normal"}`}>
          {preview}
        </p>
      </div>

      {/* Unread badge */}
      {hasUnread ? (
        <span className="shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center">
          {unread}
        </span>
      ) : (
        <span className="shrink-0 w-5 h-5 rounded-full bg-gray-100 border border-gray-200 text-[10px] font-bold text-gray-400 flex items-center justify-center">
          0
        </span>
      )}
    </div>
  );
}
