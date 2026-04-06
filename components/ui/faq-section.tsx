"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function FAQWithSpiral() {
  const spiralRef = useRef<HTMLDivElement | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Spiral configuration
  const [cfg, setCfg] = useState({
    points: 700,
    dotRadius: 1.8,
    duration: 3.0,
    color: "#ffffff",
    gradient: "neon" as
      | "none"
      | "rainbow"
      | "sunset"
      | "ocean"
      | "fire"
      | "neon"
      | "pastel"
      | "grayscale",
    pulseEffect: true,
    opacityMin: 0.25,
    opacityMax: 0.9,
    sizeMin: 0.5,
    sizeMax: 1.4,
    background: "#174B47", // soft modern dark teal bg
  });

  // Gradient presets
  const gradients: Record<string, string[]> = useMemo(
    () => ({
      none: [],
      rainbow: ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#0099ff", "#6633ff"],
      sunset: ["#ff0000", "#ff9900", "#ffcc00"],
      ocean: ["#058B7F", "#00ccff", "#00ffcc"], // customized for brand
      fire: ["#ff0000", "#ff6600", "#ffcc00"],
      neon: ["#058B7F", "#00ffff", "#00ffcc"], // customized for brand
      pastel: ["#ffcccc", "#ccffcc", "#ccccff"],
      grayscale: ["#ffffff", "#999999", "#333333"],
    }),
    []
  );

  useEffect(() => {
    try {
      console.assert(Array.isArray(gradients.none) && gradients.none.length === 0, "Gradient 'none' must be an empty array");
      console.assert(cfg.sizeMin <= cfg.sizeMax, "sizeMin should be <= sizeMax");
      console.assert(cfg.opacityMin <= cfg.opacityMax, "opacityMin should be <= opacityMax");
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "h") setPanelOpen((v) => !v);
      if (k === "r") randomize();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Generate spiral SVG and mount
  useEffect(() => {
    if (!spiralRef.current) return;

    const SIZE = 560; // larger presence
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = cfg.points;
    const DOT = cfg.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    // Gradient
    if (cfg.gradient !== "none") {
      const defs = document.createElementNS(svgNS, "defs");
      const g = document.createElementNS(svgNS, "linearGradient");
      g.setAttribute("id", "spiralGradient");
      g.setAttribute("gradientUnits", "userSpaceOnUse");
      g.setAttribute("x1", "0%");
      g.setAttribute("y1", "0%");
      g.setAttribute("x2", "100%");
      g.setAttribute("y2", "100%");
      gradients[cfg.gradient].forEach((color, idx, arr) => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", `${(idx * 100) / (arr.length - 1)}%`);
        stop.setAttribute("stop-color", color);
        g.appendChild(stop);
      });
      defs.appendChild(g);
      svg.appendChild(defs);
    }

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute("fill", cfg.gradient === "none" ? cfg.color : "url(#spiralGradient)");
      c.setAttribute("opacity", "0.6");

      if (cfg.pulseEffect) {
        const animR = document.createElementNS(svgNS, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute("values", `${DOT * cfg.sizeMin};${DOT * cfg.sizeMax};${DOT * cfg.sizeMin}`);
        animR.setAttribute("dur", `${cfg.duration}s`);
        animR.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animR.setAttribute("repeatCount", "indefinite");
        animR.setAttribute("calcMode", "spline");
        animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animR);

        const animO = document.createElementNS(svgNS, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute("values", `${cfg.opacityMin};${cfg.opacityMax};${cfg.opacityMin}`);
        animO.setAttribute("dur", `${cfg.duration}s`);
        animO.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animO.setAttribute("repeatCount", "indefinite");
        animO.setAttribute("calcMode", "spline");
        animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animO);
      }

      svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, [cfg, gradients]);

  const randomize = () => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const lightColors = ["#ffffff"];
    const darkColors = ["#222222", "#111111"];
    const useLightBg = Math.random() > 0.5;

    setCfg((c) => ({
      ...c,
      points: Math.floor(rand(300, 1600)),
      dotRadius: rand(0.8, 3.2),
      duration: rand(1.2, 7.5),
      pulseEffect: Math.random() > 0.35,
      opacityMin: rand(0.1, 0.4),
      opacityMax: rand(0.6, 1.0),
      sizeMin: rand(0.4, 0.9),
      sizeMax: rand(1.2, 2.2),
      background: useLightBg ? "#f5f5f5" : "#000000",
      color: useLightBg
        ? darkColors[Math.floor(Math.random() * darkColors.length)]
        : lightColors[Math.floor(Math.random() * lightColors.length)],
      gradient:
        Math.random() > 0.6
          ? (["rainbow", "ocean", "grayscale", "neon"] as const)[
              Math.floor(Math.random() * 4)
            ]
          : "none",
    }));
  };

  const faqs = [
    {
      q: "كيف يمكنني البدء باستخدام المنصة؟",
      a: "يمكنك البدء بسهولة من خلال إنشاء حساب مجاني، ثم إضافة طلبك وتحديد تفاصيل الخدمة المطلوبة. بعد ذلك ستتلقى عروضًا من شركات متخصصة ويمكنك اختيار الأنسب لك.",
    },
    {
      q: "هل التسجيل في المنصة مجاني؟",
      a: "نعم، التسجيل في المنصة مجاني تمامًا، ويمكنك تصفح الخدمات وإنشاء الطلبات دون أي رسوم مبدئية.",
    },
    {
      q: "كيف أختار أفضل شركة تسويق لمشروعي؟",
      a: "يمكنك مقارنة العروض المقدمة من الشركات بناءً على الخبرة، التقييمات، والأسعار. كما يمكنك التواصل مع الشركات مباشرة لاتخاذ القرار المناسب.",
    },
    {
      q: "هل تقدم المنصة ضمانًا على الخدمات؟",
      a: "نحرص على التعامل مع شركات موثوقة ومعتمدة، كما نوفر بيئة آمنة تضمن حقوق جميع الأطراف وتساعد في تقديم خدمات عالية الجودة.",
    },
    {
      q: "ما هي طرق الدفع المتاحة؟",
      a: "توفر المنصة عدة وسائل دفع آمنة وسهلة، ويتم تحديد طرق الدفع المتاحة حسب الباقة أو الخدمة المختارة.",
    },
    {
      q: "هل يمكنني إلغاء الطلب بعد نشره؟",
      a: "نعم، يمكنك إلغاء الطلب وفقًا لسياسة المنصة، مع مراعاة حالة الطلب والاتفاق مع مزود الخدمة.",
    },
  ];

  const filtered = query
    ? faqs.filter(({ q, a }) => (q + a).toLowerCase().includes(query.toLowerCase()))
    : faqs;

  return (
    <div
      className="relative min-h-[80vh] w-full overflow-hidden text-white"
      style={{ backgroundColor: cfg.background }}
      dir="rtl"
    >
      {/* Background Spiral */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30 [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,1),rgba(255,255,255,0.1)_60%,transparent_75%)]"
        style={{ mixBlendMode: "screen", top: "-20%" }}
      >
        <div ref={spiralRef} />
      </div>

      {/* Layout */}
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 z-10">
        {/* Header */}
        <header className="mb-14 flex flex-col md:flex-row items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white">الأسئلة الشائعة</h1>
            <p className="mt-3 text-sm md:text-base text-white/60 leading-relaxed max-w-lg">
              نجيب على أهم استفساراتك حول استخدام المنصة والخدمات المتاحة
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن سؤالك..."
              className="h-12 w-full md:w-64 rounded-xl border border-white/20 bg-black/20 backdrop-blur-sm px-4 text-sm text-white placeholder-white/40 outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/60"
            />
          </div>
        </header>

        {/* Content */}
        <section className="relative">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i + 1} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-white/50">لا توجد أسئلة تطابق بحثك</div>
          )}
        </section>
      </div>

      {/* Control Panel (Development only, hidden natively or kept functional via shortcut) */}
      {panelOpen && (
        <aside className="fixed left-4 top-4 z-50 w-[320px] rounded-2xl border border-white/15 bg-black/70 p-4 backdrop-blur text-left" dir="ltr">
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-white/80">Spiral Controls</h3>
          <div className="space-y-3 text-xs">
            <Slider label="Points" min={100} max={2000} step={50} value={cfg.points} onChange={(v)=> setCfg({...cfg, points: v})} />
            <Slider label="Dot radius" min={0.5} max={5} step={0.1} value={cfg.dotRadius} onChange={(v)=> setCfg({...cfg, dotRadius: v})} />
            <Slider label="Duration" min={1} max={10} step={0.1} value={cfg.duration} onChange={(v)=> setCfg({...cfg, duration: v})} />

            <Toggle label="Pulse" value={cfg.pulseEffect} onChange={(v)=> setCfg({...cfg, pulseEffect: v})} />
            <Slider label="Opacity min" min={0} max={1} step={0.05} value={cfg.opacityMin} onChange={(v)=> setCfg({...cfg, opacityMin: v})} />
            <Slider label="Opacity max" min={0} max={1} step={0.05} value={cfg.opacityMax} onChange={(v)=> setCfg({...cfg, opacityMax: v})} />
            <Slider label="Size min" min={0.1} max={2} step={0.1} value={cfg.sizeMin} onChange={(v)=> setCfg({...cfg, sizeMin: v})} />
            <Slider label="Size max" min={0.1} max={3} step={0.1} value={cfg.sizeMax} onChange={(v)=> setCfg({...cfg, sizeMax: v})} />

            <Select
              label="Gradient"
              value={cfg.gradient}
              options={[
                { label: "None", value: "none" },
                { label: "Rainbow", value: "rainbow" },
                { label: "Sunset", value: "sunset" },
                { label: "Ocean", value: "ocean" },
                { label: "Fire", value: "fire" },
                { label: "Neon", value: "neon" },
                { label: "Pastel", value: "pastel" },
                { label: "Grayscale", value: "grayscale" },
              ]}
              onChange={(v)=> setCfg({...cfg, gradient: v as any})}
            />

            <div className="flex gap-2">
              <button
                onClick={randomize}
                className="w-full rounded-xl border border-white/20 px-3 py-2 text-xs hover:border-white/50"
              >
                Randomize (R)
              </button>
              <button
                onClick={() => setPanelOpen(false)}
                className="w-full rounded-xl border border-white/20 px-3 py-2 text-xs hover:border-white/50"
              >
                Close (H)
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-right"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4 text-right pl-4">
          <span className="text-sm font-bold text-primary/80 shrink-0">{String(index).padStart(2, "0")}</span>
          <h3 className="text-[15px] sm:text-[16px] font-bold text-white leading-tight">{q}</h3>
        </div>
        <span className="text-white/60 transition group-hover:text-white shrink-0 text-xl font-light">{open ? "–" : "+"}</span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${open ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden pr-10">
          <p className="text-[14px] leading-[1.8] text-white/70 font-medium">{a}</p>
        </div>
      </div>
      {/* Hover halo */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
        <div
          className="absolute -inset-1 rounded-2xl border border-primary/20"
          style={{ maskImage: "radial-gradient(200px_200px_at_var(--x,50%)_var(--y,50%),white,transparent)" }}
        />
      </div>
    </div>
  );
}

// ... internal controls components below

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between">
        <span>{label}</span>
        <span className="tabular-nums text-white/50">{value?.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </label>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between">
      <span>{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`h-6 w-10 rounded-full border border-white/20 transition ${value ? "bg-white" : "bg-transparent"}`}
        aria-pressed={value}
      >
        <span className={`block h-5 w-5 translate-x-0.5 rounded-full bg-black transition ${value ? "translate-x-4" : "translate-x-0"}`} />
      </button>
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/20 bg-black px-3 py-2 text-xs outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">▾</span>
      </div>
    </label>
  );
}
