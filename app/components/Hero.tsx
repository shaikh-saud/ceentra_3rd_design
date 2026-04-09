"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ParticleData {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
}

// ─── Typing animation hook ──────────────────────────────────────────────────────
const TYPING_SPEED = 88;
const DELETING_SPEED = 48;
const PAUSE_AFTER = 2400;
const PAUSE_BEFORE = 380;

const WORDS = [
  "شركات التسويق الرقمي",
  "وكالات التسويق الرقمي",
  "خبراء التسويق الرقمي",
  "حلول التسويق الرقمي",
  "خدمات التسويق الرقمي",
];

interface TypingState {
  displayed: string;
  wordIndex: number;
  isDeleting: boolean;
}

const useTypingAnimation = () => {
  const [state, setState] = React.useState<TypingState>({
    displayed: "",
    wordIndex: 0,
    isDeleting: false,
  });

  React.useEffect(() => {
    const { displayed, wordIndex, isDeleting } = state;
    const currentWord = WORDS[wordIndex];

    if (!isDeleting && displayed === currentWord) {
      const t = setTimeout(
        () => setState((s) => ({ ...s, isDeleting: true })),
        PAUSE_AFTER
      );
      return () => clearTimeout(t);
    }

    if (isDeleting && displayed === "") {
      const t = setTimeout(
        () =>
          setState({
            displayed: "",
            wordIndex: (wordIndex + 1) % WORDS.length,
            isDeleting: false,
          }),
        PAUSE_BEFORE
      );
      return () => clearTimeout(t);
    }

    const next = isDeleting
      ? currentWord.slice(0, displayed.length - 1)
      : currentWord.slice(0, displayed.length + 1);

    const t = setTimeout(
      () => setState((s) => ({ ...s, displayed: next })),
      isDeleting ? DELETING_SPEED : TYPING_SPEED
    );
    return () => clearTimeout(t);
  }, [state]);

  return state.displayed;
};

// ─── Particle Canvas (navy dark bg) ───────────────────────────────────────────
const ParticleCanvas: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let particles: ParticleData[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 180 };

    const draw = (p: ParticleData) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(15,174,158,0.45)";
      ctx.fill();
    };

    const update = (p: ParticleData) => {
      if (p.x > canvas.width || p.x < 0) p.directionX = -p.directionX;
      if (p.y > canvas.height || p.y < 0) p.directionY = -p.directionY;
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < mouse.radius + p.size) {
          const f = (mouse.radius - d) / mouse.radius;
          p.x -= (dx / d) * f * 4;
          p.y -= (dy / d) * f * 4;
        }
      }
      p.x += p.directionX;
      p.y += p.directionY;
      draw(p);
    };

    const init = () => {
      particles = [];
      const n = Math.floor((canvas.width * canvas.height) / 9500);
      for (let i = 0; i < n; i++) {
        const s = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * (canvas.width - s * 4) + s * 2,
          y: Math.random() * (canvas.height - s * 4) + s * 2,
          directionX: (Math.random() * 0.4) - 0.2,
          directionY: (Math.random() * 0.4) - 0.2,
          size: s,
        });
      }
    };

    const connect = () => {
      const threshold = (canvas.width / 7) * (canvas.height / 7);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dSq = dx * dx + dy * dy;
          if (dSq < threshold) {
            const op = 1 - dSq / threshold;
            let near = false;
            if (mouse.x !== null && mouse.y !== null) {
              const mx = particles[a].x - mouse.x;
              const my = particles[a].y - mouse.y;
              near = Math.sqrt(mx * mx + my * my) < mouse.radius;
            }
            ctx.strokeStyle = near
              ? `rgba(5,139,127,${op * 0.75})`
              : `rgba(15,174,158,${op * 0.22})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      // Clear canvas so section gradient shows through
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(update);
      connect();
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// ─── Trust Pill ────────────────────────────────────────────────────────────────
const TrustPill: React.FC = () => {
  const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  ];
  return (
    <div className="inline-flex items-center gap-3 rounded-full py-2 px-4"
      style={{
        background: "rgba(14,36,83,0.06)",
        border: "1px solid rgba(14,36,83,0.14)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex" style={{ direction: "ltr" }}>
        {avatars.map((src, i) => (
          <div
            key={i}
            className="h-7 w-7 rounded-full overflow-hidden -ml-2 first:ml-0"
            style={{ border: "2px solid rgba(14,36,83,0.15)", boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <p className="text-[13px] font-semibold whitespace-nowrap" style={{ color: "rgba(14,36,83,0.75)" }}>
        <span className="font-bold" style={{ color: "#0FAE9E" }}>+200</span> شركة موثّقة ومسجّلة
      </p>
    </div>
  );
};

// ─── Motion variants ───────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18 + 0.25, duration: 0.72, ease: "easeOut" as const },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
export default function Hero() {
  const typedText = useTypingAnimation();

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "#ffffff" }}
    >
      {/* Particle canvas */}
      <ParticleCanvas />



      {/* ── Content stack ── */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center">

        {/* Badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(15,174,158,0.15)",
              border: "1px solid rgba(15,174,158,0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: "#0FAE9E" }} />
            <span className="text-[13px] font-semibold" style={{ color: "#0FAE9E" }}>
              منصة سنترَا — شريكك الموثوق في التسويق الرقمي
            </span>
          </div>
        </motion.div>

        {/* ── Heading with typing effect ── */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-extrabold tracking-tight w-full"
          style={{
            color: "#0e2453",
            fontSize: "clamp(1.35rem, 3.8vw, 3rem)",
            lineHeight: 1.32
          }}
        >
          <span className="block whitespace-nowrap">منصتك الموثوقة للعثور على أفضل</span>

          <span
            className="block mt-2"
            style={{ minHeight: "1.35em" }}
            aria-live="polite"
            aria-atomic="true"
          >
            <span
              style={{
                background: "linear-gradient(110deg, #0FAE9E 10%, #058B7F 52%, #0dcfbc 92%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {typedText}
            </span>
            {/* Blinking cursor */}
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "3px",
                height: "0.88em",
                borderRadius: "2px",
                background: "#0FAE9E",
                marginRight: "4px",
                verticalAlign: "middle",
                animation: "cursorBlink 1.1s ease-in-out infinite",
              }}
            />
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-7 leading-[1.95] max-w-2xl mx-auto"
          style={{ fontSize: "clamp(0.95rem, 2.1vw, 1.1rem)", color: "rgba(14,36,83,0.55)" }}
        >
          اكتشف بسهولة شركات تسويق موثوقة، قارن الخدمات، وابدأ في تنمية أعمالك
          بثقة. منصة سنترَا توفر لك تجربة آمنة وسلسة للتواصل مع أفضل الشركات
          وتحقيق نتائج حقيقية.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary teal CTA */}
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-[15px] text-white transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #058B7F 0%, #0FAE9E 100%)",
              boxShadow: "0 4px 24px rgba(5,139,127,0.45)",
            }}
          >
            ابدأ الآن مجانًا
            <ArrowUpRight className="h-5 w-5" />
          </Link>

          {/* Ghost secondary CTA */}
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[15px] transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
            style={{
              color: "#0e2453",
              border: "1px solid rgba(14,36,83,0.20)",
              background: "rgba(14,36,83,0.05)",
              backdropFilter: "blur(8px)",
            }}
          >
            كيف تعمل؟
          </Link>
        </motion.div>

        {/* Trust pill */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10"
        >
          <TrustPill />
        </motion.div>
      </div>

      {/* Bottom wave divider into next section */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden leading-none">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "56px" }}>
          <path d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" fill="#F7F9F9" />
        </svg>
      </div>
    </section>
  );
}
