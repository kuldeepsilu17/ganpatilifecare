"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND_COLORS } from "@/lib/brand";

const DURATION = 30;
const GREEN = BRAND_COLORS.green;
type Scene = {
  start: number;
  end: number;
  draw: (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    t: number,
    progress: number
  ) => void;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function drawGradientBase(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number
) {
  const g = ctx.createLinearGradient(0, 0, w, h);
  const shift = Math.sin(t * 0.4) * 0.08;
  g.addColorStop(0, `rgb(0, ${Math.floor(120 + shift * 40)}, 60)`);
  g.addColorStop(0.45, GREEN);
  g.addColorStop(0.75, `rgb(20, ${Math.floor(140 + shift * 30)}, 80)`);
  g.addColorStop(1, `rgb(200, ${Math.floor(100 + shift * 50)}, 40)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  count: number
) {
  for (let i = 0; i < count; i++) {
    const seed = i * 1.618;
    const x = ((Math.sin(t * 0.3 + seed) * 0.5 + 0.5) * w + seed * 40) % w;
    const y = ((Math.cos(t * 0.25 + seed * 2) * 0.5 + 0.5) * h + seed * 20) % h;
    const r = 1.5 + (i % 3);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.08 + (i % 5) * 0.03})`;
    ctx.fill();
  }
}

function drawManufacturing(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number
) {
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  const offset = progress * 80;
  for (let x = -offset % 60; x < w; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = -offset % 50; y < h; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  const camX = lerp(-w * 0.1, w * 0.05, easeInOut(progress));
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(camX, h * 0.2, w * 0.9, h * 0.55);
}


const SCENES: Scene[] = [
  {
    start: 0,
    end: 5,
    draw: (ctx, w, h, _t, p) => {
      drawManufacturing(ctx, w, h, p);
    },
  },
  {
    start: 5,
    end: 10,
    draw: (ctx, w, h, _t, p) => {
      drawManufacturing(ctx, w, h, p);
    },
  },
  {
    start: 10,
    end: 14,
    draw: (ctx, w, h, _t, p) => {
      drawManufacturing(ctx, w, h, p);
    },
  },
  {
    start: 14,
    end: 18,
    draw: (ctx, w, h, _t, p) => {
      drawManufacturing(ctx, w, h, p);
    },
  },
  {
    start: 18,
    end: 22,
    draw: (ctx, w, h, _t, p) => {
      drawManufacturing(ctx, w, h, p * 0.5 + 0.5);
    },
  },
  {
    start: 22,
    end: 26,
    draw: (ctx, w, h, _t, p) => {
      drawManufacturing(ctx, w, h, p);
    },
  },
  {
    start: 26,
    end: 28,
    draw: () => {
      // Just background
    },
  },
  {
    start: 28,
    end: 30,
    draw: () => {
      // Just background
    },
  },
];

export function CinematicHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setTimeout(() => {
      setReducedMotion(mq.matches);
    }, 0);
    const fn = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const frame = (now: number) => {
      const elapsed = ((now - start) / 1000) % DURATION;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const t = elapsed;

      drawGradientBase(ctx, w, h, t);
      drawParticles(ctx, w, h, t, 48);

      const scene = SCENES.find((s) => t >= s.start && t < s.end);
      if (scene) {
        const local = (t - scene.start) / (scene.end - scene.start);
        const fade =
          local < 0.15
            ? local / 0.15
            : local > 0.85
              ? (1 - local) / 0.15
              : 1;
        ctx.save();
        ctx.globalAlpha = fade;
        scene.draw(ctx, w, h, t, easeInOut(Math.min(1, local * 1.2)));
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <div className="absolute inset-0 gradient-hero" aria-hidden />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden
    />
  );
}
