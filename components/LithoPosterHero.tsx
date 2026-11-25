"use client";

import React, { useMemo, useState, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

// #region Condensed Monoline Capital Glyphs
const WIDE: Record<string, number> = { A: 1.04, M: 1.3, N: 1.04, Q: 1.02, V: 1.04, W: 1.44, X: 1.02 };

function glyphWidth(ch: string, w: number, s: number): number {
  if (ch === "I") return s;
  if (ch === " ") return w * 0.5;
  return w * (WIDE[ch] ?? 1);
}

function glyphPath(ch: string, w: number, h: number, s: number): string {
  const i = s / 2;
  const x0 = i;
  const x1 = w - i;
  const y0 = i;
  const y1 = h - i;
  const xm = w / 2;
  const ym = h / 2;
  const bw = x1 - x0;
  const bh = y1 - y0;
  const r = bw / 2;
  const c = Math.min(bw * 0.62, bh / 4);
  const q = (...parts: (string | number)[]) =>
    parts.map((p) => (typeof p === "number" ? String(Math.round(p * 10) / 10) : p)).join(" ");
  const arc = (rad: number, sweep: 0 | 1, x: number, y: number) => q("A", rad, rad, 0, 0, sweep, x, y);
  const stadium = q("M", x0, y0 + r) + arc(r, 1, x1, y0 + r) + q("L", x1, y1 - r) + arc(r, 1, x0, y1 - r) + "Z";
  const open = q("M", x1, y0 + r) + arc(r, 0, x0, y0 + r) + q("L", x0, y1 - r) + arc(r, 0, x1, y1 - r);
  const bowl = (yb: number) => {
    const k = Math.min(c, (yb - y0) / 2);
    return q("M", x0, y1, "L", x0, y0, "L", x1 - k, y0) + arc(k, 1, x1, y0 + k) + q("L", x1, yb - k) + arc(k, 1, x1 - k, yb) + q("L", x0, yb);
  };
  switch (ch) {
    case "A": {
      const ay = y0 + bh * 0.64;
      const t = (y1 - ay) / bh;
      return q("M", x0, y1, "L", xm, y0, "L", x1, y1, "M", x0 + (xm - x0) * t, ay, "L", x1 - (x1 - xm) * t, ay);
    }
    case "B": {
      const yb = y0 + bh * 0.47;
      const xt = x1 - s * 0.4;
      const ct = Math.min(c, (yb - y0) / 2, xt - x0);
      const cb = Math.min(c, (y1 - yb) / 2, bw);
      return (
        q("M", x0, yb, "L", xt - ct, yb) + arc(ct, 0, xt, yb - ct) + q("L", xt, y0 + ct) + arc(ct, 0, xt - ct, y0) +
        q("L", x0, y0, "L", x0, y1, "L", x1 - cb, y1) + arc(cb, 0, x1, y1 - cb) + q("L", x1, yb + cb) + arc(cb, 0, x1 - cb, yb) +
        q("L", x0, yb)
      );
    }
    case "C":
      return open;
    case "D": {
      const k = Math.min(bw * 0.75, bh / 2);
      return q("M", x0, y0, "L", x1 - k, y0) + arc(k, 1, x1, y0 + k) + q("L", x1, y1 - k) + arc(k, 1, x1 - k, y1) + q("L", x0, y1) + "Z";
    }
    case "E":
      return q("M", x1, y0, "L", x0, y0, "L", x0, y1, "L", x1, y1, "M", x0, ym, "L", x1 - bw * 0.12, ym);
    case "F":
      return q("M", x1, y0, "L", x0, y0, "L", x0, y1, "M", x0, ym - bh * 0.02, "L", x1 - bw * 0.12, ym - bh * 0.02);
    case "G":
      return open + q("L", x1, ym + bh * 0.04, "L", xm, ym + bh * 0.04);
    case "H":
      return q("M", x0, y0, "L", x0, y1, "M", x1, y0, "L", x1, y1, "M", x0, ym, "L", x1, ym);
    case "I":
      return q("M", xm, y0, "L", xm, y1);
    case "J":
      return q("M", x1, y0, "L", x1, y1 - r) + arc(r, 1, x0, y1 - r) + q("L", x0, y1 - r - bh * 0.06);
    case "K":
      return q("M", x0, y0, "L", x0, y1, "M", x1, y0, "L", x0, y0 + bh * 0.62, "M", x0 + bw * 0.28, y0 + bh * 0.47, "L", x1, y1);
    case "L":
      return q("M", x0, y0, "L", x0, y1, "L", x1, y1);
    case "M":
      return q("M", x0, y1, "L", x0, y0, "L", xm, y0 + bh * 0.55, "L", x1, y0, "L", x1, y1);
    case "N":
      return q("M", x0, y1, "L", x0, y0, "L", x1, y1, "L", x1, y0);
    case "O":
      return stadium;
    case "P":
      return bowl(y0 + bh * 0.52);
    case "Q":
      return stadium + q("M", xm + bw * 0.1, y1 - bh * 0.16, "L", x1 + s * 0.2, y1 + s * 0.3);
    case "R":
      return bowl(y0 + bh * 0.5) + q("M", x0 + bw * 0.42, y0 + bh * 0.5, "L", x1, y1);
    case "S":
      return q("M", x1, y0 + r) + arc(r, 0, x0, y0 + r) + q("C", x0, ym - bh * 0.02, x1, ym + bh * 0.02, x1, y1 - r) + arc(r, 1, x0, y1 - r);
    case "T":
      return q("M", x0, y0, "L", x1, y0, "M", xm, y0, "L", xm, y1);
    case "U":
      return q("M", x0, y0, "L", x0, y1 - r) + arc(r, 0, x1, y1 - r) + q("L", x1, y0);
    case "V":
      return q("M", x0, y0, "L", xm, y1, "L", x1, y0);
    case "W": {
      const k = bw * 0.24;
      return q("M", x0, y0, "L", x0 + k, y1, "L", xm, y0 + bh * 0.3, "L", x1 - k, y1, "L", x1, y0);
    }
    case "X":
      return q("M", x0, y0, "L", x1, y1, "M", x1, y0, "L", x0, y1);
    case "Y":
      return q("M", x0, y0, "L", xm, ym - bh * 0.04, "L", x1, y0, "M", xm, ym - bh * 0.04, "L", xm, y1);
    case "Z":
      return q("M", x0, y0, "L", x1, y0, "L", x0, y1, "L", x1, y1);
    default:
      return "";
  }
}
// #endregion

const AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Word pool focused specifically on Impresos Americana identity
const LITHO_WORDS = [
  "LITOGRAFIA",
  "OFFSET",
  "HEIDELBERG",
  "MATERIALPOP",
  "EXHIBIDORES",
  "EMPAQUES",
  "CALI",
  "IMPRESOS",
  "AMERICANA",
  "GRANFORMATO",
  "TROQUEL",
  "PLIEGOS",
  "PRODUCCION",
  "COLOR",
  "FOGRA",
];

type BurstBit = { ch: string; dx: number; dy: number; rot: number };
type Burst = { id: number; x: number; y: number; bits: BurstBit[] };

export function LithoPosterHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const burstId = useRef(0);

  // Generate 8 continuous streaming typographic lanes
  const rows = useMemo(() => {
    return Array.from({ length: 8 }, (_, row) => {
      let x = 0;
      const half: { ch: string; x: number; w: number }[] = [];
      const wordSource = LITHO_WORDS[row % LITHO_WORDS.length] + AZ;

      // 36 characters per lane
      for (let k = 0; k < 36; k++) {
        const ch = wordSource[Math.floor(hash(row * 89 + k * 17) * wordSource.length)] || "A";
        const w = glyphWidth(ch, 56, 10);
        half.push({ ch, x, w });
        x += w + 24;
      }
      return {
        row,
        half,
        span: x,
        duration: 22 + (row % 4) * 6, // Smooth, hypnotic, cinematic speed
        dir: row % 2 === 0 ? "l" : "r",
      };
    });
  }, []);

  // Throw interactive letters on click/touch on the background canvas
  const handleThrowLetters = (e: React.PointerEvent) => {
    // Only fire if clicking on the background, not on interactive links or buttons
    const target = e.target as HTMLElement;
    if (target.closest("a, button, input")) return;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pool = "POPLITOGRAFIAIMPRESOS";
    const bits: BurstBit[] = Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const d = 50 + Math.random() * 80;
      return {
        ch: pool[Math.floor(Math.random() * pool.length)],
        dx: Math.cos(a) * d,
        dy: Math.sin(a) * d,
        rot: (Math.random() - 0.5) * 60,
      };
    });

    const id = ++burstId.current;
    setBursts((cur) => [...cur.slice(-4), { id, x, y, bits }]);
    setTimeout(() => {
      setBursts((cur) => cur.filter((b) => b.id !== id));
    }, 950);
  };

  return (
    <section
      ref={containerRef}
      onPointerDown={handleThrowLetters}
      className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-zinc-50 border-b border-zinc-200/80 min-h-[640px] lg:min-h-[720px] flex items-center justify-center py-16 sm:py-20 select-none"
    >
      {/* ============================================================== */}
      {/* 1. CONTINUOUS STREAMING TYPOGRAPHY BACKGROUND (LIGHT PAPER)   */}
      {/* ============================================================== */}
      <div
        className="absolute inset-[-20%] pointer-events-none flex flex-col justify-center gap-4 sm:gap-6 opacity-[0.22] rotate-[-5deg] overflow-hidden z-0"
        aria-hidden="true"
      >
        {rows.map(({ row, half, span, duration, dir }) => (
          <div key={row} className={`h-16 sm:h-20 flex-none overflow-visible ${row >= 4 ? "hidden md:block" : ""}`}>
            <svg
              className={`block h-full w-auto max-w-none ${
                dir === "l" ? "animate-litho-marq-left" : "animate-litho-marq-right"
              }`}
              viewBox={`0 -4 ${span * 2} 148`}
              style={{ animationDuration: `${duration}s` }}
              fill="none"
              strokeLinecap="square"
              strokeMiterlimit={4}
            >
              {[0, span].map((off) =>
                half.map((g, k) => {
                  const d = glyphPath(g.ch, g.w, 140, 10);
                  const isRed = (row + k) % 4 === 0;
                  return (
                    <g key={`${off}-${k}`} transform={`translate(${off + g.x} 0)`}>
                      <path
                        d={d}
                        stroke={isRed ? "#E30613" : "#0F172A"}
                        strokeWidth={10}
                      />
                      {row % 2 === 1 && (
                        <path d={d} stroke="#FFFFFF" strokeWidth={3} />
                      )}
                    </g>
                  );
                })
              )}
            </svg>
          </div>
        ))}
      </div>

      {/* Subtle Specular Ambient Highlights for Depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-64 bg-red-500/5 rounded-full blur-[140px] pointer-events-none z-1" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-slate-300/20 rounded-full blur-[140px] pointer-events-none z-1" />

      {/* Subtle Technical Grid Dots overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none z-1" />

      {/* ============================================================== */}
      {/* 2. FOREGROUND CONTENT (LOCALIZED & HIGH-CONTRAST LIGHT)        */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        {/* Main Central Presentation Card with Frosted Glossy Backdrop */}
        <div className="w-full bg-gradient-to-b from-white/70 via-white/40 to-white/50 backdrop-blur-md rounded-3xl border border-white/80 shadow-[0_8px_32px_0_rgba(15,23,42,0.06)] ring-1 ring-white/60 p-6 sm:p-10 md:p-12 flex flex-col items-center">
          {/* Main Headline: Clean, Punchy & High Contrast */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-montserrat font-black uppercase tracking-tight text-zinc-950 leading-[1.08] mb-5">
            Ingeniería Gráfica &amp; <span className="text-[#E30613]">Producción Industrial</span>
          </h1>

          {/* Value Proposition Description */}
          <p className="text-sm sm:text-base lg:text-lg text-zinc-700 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            Fabricación directa en San Nicolás, Cali: exhibidores de piso reforzados, cajas rígidas, catálogos en offset y gran formato UV con despacho coordinado a toda Colombia sin intermediarios.
          </p>

          {/* Action Buttons (CTAs) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <Link
              href="/cotizador"
              onClick={() => triggerHaptic(10)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl bg-[#E30613] hover:bg-[#c50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/25 transition-all transform hover:scale-[1.02] active:scale-95 min-h-[46px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Cotizar Proyecto en 3D</span>
            </Link>

            <div className="grid grid-cols-2 gap-2.5 w-full sm:flex sm:w-auto">
              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20deseo%20asesor%C3%ADa%20directa%20en%20planta%20para%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic(8)}
                className="inline-flex items-center justify-center gap-2 px-3 py-3 sm:px-7 sm:py-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-montserrat font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 text-center min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="truncate">WhatsApp</span>
              </a>

              <Link
                href="/proyectos"
                onClick={() => triggerHaptic(8)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-3 sm:px-6 sm:py-4 rounded-xl bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200/90 font-montserrat font-semibold text-[11px] sm:text-xs uppercase tracking-wider shadow-2xs hover:border-zinc-300 transition-all text-center min-h-[44px]"
              >
                <span>Proyectos</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E30613] shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. BURST PARTICLES ON CANVAS CLICK                             */}
      {/* ============================================================== */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="absolute pointer-events-none z-20"
          style={{ left: b.x, top: b.y }}
          aria-hidden="true"
        >
          {b.bits.map((bit, n) => (
            <svg
              key={n}
              className="absolute left-[-9px] top-[-18px] w-6 h-9 overflow-visible animate-litho-bit"
              viewBox="-3 -3 26 38"
              style={
                {
                  "--dx": `${bit.dx}px`,
                  "--dy": `${bit.dy}px`,
                  "--rot": `${bit.rot}deg`,
                } as React.CSSProperties
              }
            >
              <path
                d={glyphPath(bit.ch, glyphWidth(bit.ch, 14, 3.4), 32, 3.4)}
                fill="none"
                stroke={n % 2 === 0 ? "#E30613" : "#0F172A"}
                strokeWidth={3.4}
                strokeLinecap="square"
              />
            </svg>
          ))}
        </div>
      ))}
    </section>
  );
}
