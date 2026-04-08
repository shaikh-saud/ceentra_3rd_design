"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const NAVY  = "#0e2453";
const TEAL  = "#058B7F";
const TEAL_L = "#0FAE9E";

// ─── Data ─────────────────────────────────────────────────────────────────────
const FAQ_DATA: Record<string, { q: string; a: string }[]> = {
  عام: [
    { q: "كيف يمكنني البدء باستخدام المنصة؟", a: "يمكنك البدء بسهولة من خلال إنشاء حساب مجاني، ثم إضافة طلبك وتحديد تفاصيل الخدمة المطلوبة. بعد ذلك ستتلقى عروضًا من شركات متخصصة ويمكنك اختيار الأنسب لك في وقت قصير." },
    { q: "هل التسجيل في المنصة مجاني؟", a: "نعم، التسجيل في المنصة مجاني تمامًا ويمكنك تصفح الخدمات وإنشاء الطلبات دون أي رسوم مبدئية. تُفرض رسوم فقط عند اختيار الباقات المدفوعة." },
    { q: "كيف أختار أفضل شركة تسويق لمشروعي؟", a: "يمكنك مقارنة العروض المقدمة من الشركات بناءً على الخبرة، التقييمات، والأسعار. كما يمكنك التواصل مع الشركات مباشرة قبل اتخاذ قرارك النهائي." },
    { q: "هل تقدم المنصة ضمانًا على الخدمات؟", a: "نحرص على التعامل مع شركات موثوقة ومعتمدة، كما نوفر بيئة آمنة تضمن حقوق جميع الأطراف وتساعد في تقديم خدمات عالية الجودة مع وجود آلية لحل النزاعات." },
    { q: "ما هي أوقات الدعم الفني؟", a: "يتوفر الدعم الفني على مدار الساعة طوال أيام الأسبوع عبر المحادثة الفورية والبريد الإلكتروني، مع وقت استجابة لا يتجاوز 24 ساعة." },
  ],
  الخدمات: [
    { q: "ما هي أنواع الخدمات المتاحة على المنصة؟", a: "تشمل المنصة خدمات التسويق الرقمي، إدارة وسائل التواصل الاجتماعي، تحسين محركات البحث (SEO)، الإعلانات المدفوعة، تصميم الهوية البصرية، إنتاج المحتوى، والاستشارات التسويقية." },
    { q: "كيف أنشر طلب خدمة تسويقية؟", a: "بعد تسجيل الدخول، انقر على 'إنشاء طلب'، حدد نوع الخدمة وميزانيتك والمدة الزمنية المطلوبة، ثم انشر الطلب لتستقبل عروضًا من الشركات خلال 24 ساعة." },
    { q: "هل يمكنني طلب أكثر من خدمة في آن واحد؟", a: "نعم، يمكنك إنشاء عدة طلبات في نفس الوقت لخدمات مختلفة وإدارتها جميعًا من لوحة تحكم واحدة." },
    { q: "كيف تتم عملية التفاوض مع الشركات؟", a: "بعد استلام العروض، يمكنك مراسلة الشركات مباشرة عبر المنصة لمناقشة التفاصيل والأسعار والمدة قبل إتمام الاتفاق." },
  ],
  الاشتراكات: [
    { q: "ما هي الباقات المتاحة؟", a: "تقدم المنصة ثلاث باقات: الباقة الأساسية المجانية، الباقة المتقدمة للأفراد والمشاريع الصغيرة، وباقة الشركات للمؤسسات الكبيرة مع مزايا حصرية." },
    { q: "هل يمكنني تغيير باقتي في أي وقت؟", a: "نعم، يمكنك الترقية أو التخفيض في باقتك في أي وقت. التغييرات تسري فورًا وتُحسب التكاليف بشكل تناسبي." },
    { q: "ما هي طرق الدفع المتاحة؟", a: "تقبل المنصة الدفع عبر بطاقات الائتمان (Visa/Mastercard)، تحويل بنكي، ومدى، مع تشفير كامل لجميع المعاملات المالية." },
    { q: "هل يمكنني إلغاء الاشتراك بعد الدفع؟", a: "نعم، يمكنك إلغاء الاشتراك في أي وقت مع الاحتفاظ بمزايا الباقة حتى نهاية فترة الاشتراك المدفوع." },
  ],
  الشركات: [
    { q: "كيف يمكن لشركتي التسجيل كمزود خدمة؟", a: "يمكن للشركات التسجيل من خلال اختيار 'أنا شركة تسويق' عند التسجيل، ثم تعبئة بيانات الشركة ووثائق التحقق. يستغرق الموافقة على الحساب من 1-3 أيام عمل." },
    { q: "ما هي متطلبات توثيق الشركة؟", a: "تحتاج لتقديم: السجل التجاري ساري المفعول، هوية المسؤول، ورقم الحساب البنكي لاستقبال المدفوعات. يضمن التوثيق ثقة العملاء في خدماتك." },
    { q: "كيف تصلني طلبات العملاء؟", a: "ستصلك إشعارات فورية بالطلبات المناسبة لتخصصك عبر التطبيق والبريد الإلكتروني، ويمكنك تقديم عرضك مباشرة من لوحة تحكم الشركة." },
    { q: "ما العمولة التي تأخذها المنصة؟", a: "تأخذ المنصة نسبة عمولة تنافسية من قيمة كل صفقة مكتملة، يمكن الاطلاع على التفاصيل الكاملة في صفحة الأسعار أو التواصل مع فريق المبيعات." },
  ],
  الأمان: [
    { q: "كيف تحمون بيانات المستخدمين؟", a: "نستخدم تشفيرًا من الدرجة المصرفية (SSL/TLS 256-bit) لجميع البيانات، مع التزام تام بأنظمة حماية البيانات الشخصية المعمول بها في المملكة العربية السعودية." },
    { q: "هل معلوماتي المالية آمنة؟", a: "نعم، لا نخزن أي معلومات بطاقة ائتمانية على خوادمنا. جميع المعاملات تتم عبر بوابات دفع معتمدة ومشفرة بالكامل." },
    { q: "ماذا يحدث في حال وجود نزاع بين الطرفين؟", a: "توفر المنصة فريق وساطة متخصص لحل النزاعات، مع نظام تحكيم واضح يضمن الوصول لحل عادل لجميع الأطراف خلال 7 أيام عمل." },
  ],
};

const CATEGORIES = Object.keys(FAQ_DATA);

// ─── FAQ Accordion Item ────────────────────────────────────────────────────────
function FAQItem({ q, a, isOpen, onToggle, index }: {
  q: string; a: string; isOpen: boolean; onToggle: () => void; index: number;
}) {
  // On white bg — use teal for open highlight, navy for closed
  const questionColor = isOpen ? TEAL : NAVY;
  const dividerColor  = isOpen ? "rgba(5,139,127,0.30)" : "rgba(14,36,83,0.10)";

  return (
    <div
      className="border-b transition-colors duration-200"
      style={{ borderColor: dividerColor }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-right"
        aria-expanded={isOpen}
      >
        <h3
          className="text-[14.5px] sm:text-[15.5px] font-bold leading-snug flex-1 text-right transition-colors duration-200"
          style={{ color: questionColor }}
        >
          {q}
        </h3>
        <div
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? TEAL : "rgba(14,36,83,0.05)",
            border: `1.5px solid ${isOpen ? TEAL : "rgba(14,36,83,0.12)"}`,
          }}
        >
          {isOpen
            ? <Minus className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            : <Plus className="w-3.5 h-3.5" style={{ color: NAVY }} strokeWidth={2.5} />
          }
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-1 text-[13.5px] leading-[1.9]" style={{ color: "rgba(14,36,83,0.65)" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Animation ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: d },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
export default function FAQWithSpiral() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const currentFAQs = FAQ_DATA[activeCategory] ?? [];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setOpenIndex(0);
  };

  return (
    <section
      ref={ref}
      id="faq"
      className="relative py-20 sm:py-24 md:py-28 overflow-hidden"
      style={{ background: "#F7F9F9" }}
    >
      {/* Navy blob — top right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(14,36,83,0.06) 0%, transparent 70%)`, filter: "blur(60px)" }}
      />
      {/* Teal blob — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(5,139,127,0.07) 0%, transparent 70%)`, filter: "blur(50px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* ══ LEFT PANEL — badge + heading + category nav ══ */}
          <div className="lg:w-72 xl:w-80 shrink-0">
            <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0}>

              {/* Badge — navy tinted */}
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold mb-4"
                style={{ background: "rgba(14,36,83,0.07)", border: "1px solid rgba(14,36,83,0.14)", color: NAVY }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TEAL }} />
                لديك سؤال؟
              </span>

              {/* Heading — navy with teal gradient on keyword */}
              <h2
                className="font-extrabold leading-tight tracking-tight mb-2"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: NAVY }}
              >
                الأسئلة
                <br />
                <span style={{
                  background: `linear-gradient(110deg, ${TEAL} 20%, ${TEAL_L} 60%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  الشائعة
                </span>
              </h2>

              <p className="text-[13px] leading-relaxed mb-8 max-w-55" style={{ color: "rgba(14,36,83,0.50)" }}>
                نجيب على أهم استفساراتك حول المنصة وخدماتها
              </p>

              {/* Category label — teal */}
              <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: TEAL }}>
                تصفح حسب الموضوع
              </p>

              {/* Category nav — active uses navy */}
              <nav className="flex flex-col gap-1">
                {CATEGORIES.map((cat, i) => {
                  const isActive = activeCategory === cat;
                  return (
                    <motion.button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      variants={fadeUp} initial="hidden"
                      animate={isInView ? "visible" : "hidden"} custom={0.06 + i * 0.04}
                      className="relative flex items-center gap-3 px-4 py-2.5 text-right w-full rounded-xl transition-all duration-200"
                      style={{
                        background: isActive ? "rgba(14,36,83,0.10)" : "transparent",
                        color: isActive ? NAVY : "rgba(14,36,83,0.50)",
                      }}
                    >
                      {/* Navy active indicator bar */}
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full transition-all duration-200"
                        style={{ background: isActive ? NAVY : "transparent" }}
                      />
                      <span
                        className="text-[14px] font-semibold transition-colors duration-200"
                        style={{ color: isActive ? NAVY : undefined }}
                      >
                        {cat}
                      </span>
                      {/* Teal dot on active — contrast against navy text */}
                      {isActive && (
                        <motion.div
                          layoutId="cat-dot"
                          className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: TEAL }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Contact nudge — navy tinted box, teal link */}
              <motion.div
                variants={fadeUp} initial="hidden"
                animate={isInView ? "visible" : "hidden"} custom={0.45}
                className="mt-10 p-4 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(14,36,83,0.07), rgba(14,36,83,0.04))",
                  border: "1px solid rgba(14,36,83,0.12)",
                }}
              >
                <p className="text-[12.5px] leading-relaxed text-right mb-3" style={{ color: "rgba(14,36,83,0.55)" }}>
                  لم تجد إجابة لسؤالك؟ تواصل مع فريق الدعم
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold hover:underline"
                  style={{ color: TEAL }}
                >
                  تواصل معنا ←
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* ══ RIGHT PANEL — accordion ══ */}
          <div className="flex-1 min-w-0">

            {/* FAQ accordion card — navy→teal gradient bg */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "#ffffff",
                  boxShadow: "0 16px 48px rgba(14,36,83,0.08), 0 4px 12px rgba(14,36,83,0.04)",
                  border: "1px solid rgba(14,36,83,0.06)",
                }}
              >
                {/* Category heading row — inside card */}
                <motion.div
                  variants={fadeUp} initial="hidden"
                  animate={isInView ? "visible" : "hidden"} custom={0.1}
                  className="px-6 pt-6 pb-4 flex items-center justify-between"
                  style={{ borderBottom: "1px solid rgba(14,36,83,0.08)" }}
                >
                  <span className="text-[12px]" style={{ color: "rgba(14,36,83,0.45)" }}>
                    {currentFAQs.length} سؤال
                  </span>
                  <h3 className="text-[18px] font-extrabold" style={{ color: NAVY }}>
                    {activeCategory}
                  </h3>
                </motion.div>

                <div className="px-6">
                {currentFAQs.map((item, i) => (
                  <FAQItem
                    key={i}
                    q={item.q}
                    a={item.a}
                    index={i}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
