"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  MessageCircle,
  PlusIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

const SERVICE_OPTIONS = [
  "إنشاء متجر إلكتروني",
  "تصميم هوية بصرية",
  "إدارة إعلانات",
  "تسويق رقمي",
  "أخرى",
];

const CONTACT_INFO = [
  { icon: MailIcon, label: "البريد الإلكتروني", value: "info@brandigo.sa" },
  { icon: PhoneIcon, label: "رقم الهاتف", value: "+966 50 000 0000" },
  { icon: MapPinIcon, label: "الموقع", value: "المملكة العربية السعودية" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          <div className="relative bg-card rounded-2xl sm:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden">
            <PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-gray-300" />
            <PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-gray-300" />
            <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-gray-300" />
            <PlusIcon className="absolute -bottom-3 -right-3 h-6 w-6 text-gray-300" />

            <div className="px-5 py-8 sm:p-8 md:p-10 lg:p-12 space-y-6 sm:space-y-8">
              {/* Header */}
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px] font-extrabold text-foreground leading-tight">
                  تواصل معنا
                </h2>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] text-muted-foreground leading-relaxed max-w-xl">
                  إذا كان لديك أي استفسار أو تحتاج مساعدة في مشروعك، أرسل لنا وسنرد خلال يوم عمل واحد.
                </p>
              </div>

              {/* Contact info row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {CONTACT_INFO.map((info, i) => (
                  <div key={i} className="flex items-center gap-3 py-3">
                    <div className="bg-muted rounded-lg p-3 shrink-0">
                      <info.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] sm:text-[14px] font-semibold text-foreground">{info.label}</p>
                      <p className="text-[12px] sm:text-[13px] text-muted-foreground truncate">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Form */}
              <form className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-2">
                    <Label className="text-[13px] sm:text-[14px] font-bold">الاسم</Label>
                    <Input
                      type="text"
                      placeholder="أدخل اسمك الكامل"
                      className="h-11 rounded-xl bg-background"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-[13px] sm:text-[14px] font-bold">رقم الهاتف</Label>
                    <Input
                      type="tel"
                      dir="ltr"
                      placeholder="05xxxxxxxx"
                      className="h-11 rounded-xl bg-background text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-2">
                    <Label className="text-[13px] sm:text-[14px] font-bold">البريد الإلكتروني</Label>
                    <Input
                      type="email"
                      dir="ltr"
                      placeholder="example@email.com"
                      className="h-11 rounded-xl bg-background text-left"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-[13px] sm:text-[14px] font-bold">نوع الخدمة</Label>
                    <select
                      defaultValue=""
                      className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-muted-foreground"
                    >
                      <option value="" disabled>
                        اختر نوع الخدمة
                      </option>
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-[13px] sm:text-[14px] font-bold">تفاصيل المشروع</Label>
                  <Textarea
                    placeholder="اكتب تفاصيل مشروعك هنا..."
                    className="rounded-xl bg-background min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 sm:h-12 rounded-xl text-[14px] sm:text-[15px] font-bold shadow-[0_4px_16px_rgba(5,139,127,0.25)] hover:shadow-[0_8px_24px_rgba(5,139,127,0.35)]"
                >
                  إرسال الطلب
                </Button>

                <a
                  href="https://wa.me/966"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-5 py-3 bg-[#25D366]/10 hover:bg-[#25D366]/15 rounded-xl transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" strokeWidth={2} />
                  <span className="text-[13px] sm:text-[14px] font-bold text-[#25D366]">
                    تواصل عبر WhatsApp
                  </span>
                </a>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
