"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import MessageItem from "../ui/MessageItem";

const MESSAGES = [
  {
    name:    "Visual Creator",
    preview: "اهلا صانع المحتوى visual",
    unread:  0,
  },
  {
    name:    "Digital Creative Co",
    preview: "تبدأ الباقات من 2000 ريال شهرياً. سأرسل لك عرض سعر مفصل.",
    unread:  0,
  },
  {
    name:    "Dr. Ahmed Al-Rashid",
    preview: "ممتاز! يمكنني مساعدتك في وضع استراتيجية تسويقية شاملة. هل يمكنك حجز موعد للاستشا...",
    unread:  1,
  },
  {
    name:    "System Admin",
    preview: "بالتأكيد! لدينا العديد من الشركات المتخصصة في التسويق. يمكنك تصفح قسم الشركات وا...",
    unread:  1,
  },
];

const totalUnread = MESSAGES.reduce((sum, m) => sum + m.unread, 0);

export default function ClientMessagesContent() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-[fadeSlideUp_0.45s_ease-out]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#058B7F]/10 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-[#058B7F]" />
            </div>
            <h1 className="text-[24px] font-extrabold text-[#0e2453] leading-tight">الرسائل</h1>
            {totalUnread > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-red-500 text-white">
                {totalUnread}
              </span>
            )}
          </div>
          <p className="text-[13px] text-[#0e2453]/50 font-medium">محادثاتك مع الشركات والمستشارين</p>
        </div>
      </div>

      {/* Conversations card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#058B7F]/10 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-[#058B7F]" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#0e2453] leading-none">المحادثات</p>
              <p className="text-[11px] text-[#0e2453]/40 font-medium mt-0.5">{MESSAGES.length} محادثة</p>
            </div>
          </div>

          {totalUnread > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-red-50 text-red-600 border border-red-200">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {totalUnread} غير مقروء
            </span>
          )}
        </div>

        {/* Message list */}
        <div className="divide-y divide-gray-50">
          {MESSAGES.map((msg, idx) => (
            <MessageItem
              key={idx}
              name={msg.name}
              preview={msg.preview}
              unread={msg.unread}
              delay={idx * 60}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
