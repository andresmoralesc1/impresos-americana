"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Printer,
  Boxes,
} from "lucide-react";
import { IALogoMark } from "./Logo";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden bg-[#121212]"
    >
      {/* Faceted / Low-Poly Geometric Background with Red Ambience */}
      <div className="absolute inset-0 bg-faceted-pattern opacity-90 pointer-events-none" />

      {/* Radial Red Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#E30613]/18 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-[#E30613]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Angled Geometric Polygon Shapes */}
      <div className="absolute -top-12 -right-12 w-96 h-96 border border-white/5 rotate-45 rounded-3xl pointer-events-none opacity-40" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 border border-[#E30613]/20 rotate-12 rounded-3xl pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & High-Converting Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left"
          >
            {/* Top Badge: Industry Leadership */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E1E26] border border-white/15 text-xs font-mono uppercase tracking-wider text-zinc-200 mb-6 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E30613] animate-pulse" />
              <span className="font-semibold">Planta Industrial Directa • San Nicolás, Cali</span>
              <span className="text-red-400 font-bold">| NIT 900.384.912-4</span>
            </div>

            {/* Main Headline - High-converting Colombian Commercial Print Plant */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-montserrat font-black tracking-tight text-white uppercase leading-[1.06] mb-6">
              FABRICACIÓN DE <br />
              <span className="text-white">
                MATERIAL POP &
              </span>{" "}
              <br />
              <span className="text-[#FF2A36] drop-shadow-[0_0_35px_rgba(227,6,19,0.6)]">
                GRAN FORMATO
              </span>
            </h1>

            {/* Subheading / Commercial Description with High Contrast */}
            <p className="text-base sm:text-lg text-zinc-100 max-w-2xl font-normal leading-relaxed mb-8">
              Planta de producción gráfica directa en Cali con despachos diarios a todo el país. Desarrollamos{" "}
              <strong className="text-white font-bold underline decoration-[#E30613] decoration-2 underline-offset-4">
                Exhibidores POP de piso y mostrador
              </strong>
              , impresión cama plana UV sobre rígidos, empaques en microcorrugado y litografía comercial de alto tiraje con factura electrónica DIAN.
            </p>

            {/* Dual CTAs & Instant Quotation launcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href="#cotizador"
                className="group relative inline-flex items-center justify-center gap-3 bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(227,6,19,0.5)] hover:shadow-[0_0_45px_rgba(227,6,19,0.8)] transition-all duration-300"
              >
                <span>Configurar Cotización Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
                </div>
              </a>

              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20solicito%20asesor%C3%ADa%20para%20un%20proyecto%20de%20branding%20y%20material%20POP."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#1E1E24] hover:bg-[#282832] text-white border border-white/15 hover:border-white/30 font-montserrat font-bold text-sm px-6 py-4 rounded-xl transition-all duration-200"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Asesor Comercial Inmediato</span>
              </a>
            </div>

            {/* Key Trust Checkpoints - High Contrast */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-xs font-semibold text-zinc-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sin Intermediarios</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Muestra Previa 3D</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Despacho Nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Factura DIAN 19%</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Layered 3D Showcase of POP Displays & Corporate Brand Identity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Container with realistic 3D perspective & drop shadow */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Central Hero Display Stage Card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#1E1E24]/90 to-[#15151A]/95 p-6 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(227,6,19,0.15)] backdrop-blur-md corner-slash-red">
                {/* Header of Preview Box */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <IALogoMark className="w-7 h-7" showSpeedLines={false} />
                    <div>
                      <span className="font-montserrat font-bold text-xs uppercase text-white block leading-none">
                        Exhibidor POP Modular
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        Ref: IA-POP-160CR • Cartón Estructural
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E30613] text-white uppercase tracking-wider">
                    Showcase
                  </span>
                </div>

                {/* 3D Realistic Rendering of POP Stand and Merchandise */}
                <div className="relative h-72 sm:h-80 w-full rounded-xl bg-[#0F0F13] border border-white/5 flex items-center justify-center overflow-hidden group">
                  {/* Subtle Grid floor for depth */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1C1C24] to-transparent opacity-40" />

                  {/* SVG POP Display Mockup with Realistic Perspective, Branding & Shelf Layers */}
                  <svg
                    viewBox="0 0 340 380"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4/5 h-4/5 filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                  >
                    {/* Shadow base on floor */}
                    <ellipse
                      cx="170"
                      cy="355"
                      rx="95"
                      ry="16"
                      fill="rgba(0,0,0,0.7)"
                      filter="blur(4px)"
                    />

                    {/* Left Outer Side Panel of POP Floor Stand (Americana Red with geometric cut) */}
                    <path
                      d="M90 70L80 340L145 350L145 110L90 70Z"
                      fill="#C50510"
                    />
                    <path
                      d="M90 70L80 340L100 343L110 85Z"
                      fill="#8F0008"
                    />

                    {/* Back interior panel (Natural kraft / dark corrugated cardboard tone) */}
                    <path
                      d="M90 70L240 70L240 330L145 350L90 70Z"
                      fill="#C9A375"
                    />

                    {/* Right Outer Side Panel */}
                    <path
                      d="M240 70L250 330L185 345L185 105L240 70Z"
                      fill="#E30613"
                    />

                    {/* Shelf 1 (Top) */}
                    <polygon
                      points="110,140 220,140 205,170 125,170"
                      fill="#DEBA91"
                    />
                    <polygon
                      points="125,170 205,170 205,182 125,182"
                      fill="#B88A58"
                    />
                    {/* Shelf 1 Front Red Lip */}
                    <rect x="125" y="178" width="80" height="5" fill="#E30613" />

                    {/* Shelf 2 (Middle) */}
                    <polygon
                      points="102,205 228,205 212,240 118,240"
                      fill="#DEBA91"
                    />
                    <polygon
                      points="118,240 212,240 212,252 118,252"
                      fill="#B88A58"
                    />
                    {/* Shelf 2 Front Red Lip */}
                    <rect x="118" y="248" width="94" height="5" fill="#E30613" />

                    {/* Shelf 3 (Bottom) */}
                    <polygon
                      points="95,275 235,275 220,312 110,312"
                      fill="#DEBA91"
                    />
                    <polygon
                      points="110,312 220,312 220,326 110,326"
                      fill="#B88A58"
                    />
                    {/* Shelf 3 Front Red Lip */}
                    <rect x="110" y="322" width="110" height="6" fill="#E30613" />

                    {/* Header Crowner (Cabezote superior) with Brand Identity */}
                    <path
                      d="M80 40C80 34 84 30 90 30H240C246 30 250 34 250 40V75H80V40Z"
                      fill="#E30613"
                    />
                    {/* Crowner branding text and logo */}
                    <circle cx="115" cy="52" r="8" fill="#FFFFFF" />
                    <text
                      x="130"
                      y="56"
                      fill="#FFFFFF"
                      fontSize="11"
                      fontFamily="Montserrat, sans-serif"
                      fontWeight="900"
                      letterSpacing="1"
                    >
                      IMPRESOS AMERICANA
                    </text>
                    <text
                      x="130"
                      y="66"
                      fill="#FFD2D5"
                      fontSize="7"
                      fontFamily="sans-serif"
                      fontWeight="600"
                    >
                      EXHIBIDOR PREMIUM
                    </text>

                    {/* Products on Shelves (bottles/boxes for scale) */}
                    <rect x="135" y="145" width="14" height="25" rx="2" fill="#FFFFFF" />
                    <rect x="155" y="142" width="16" height="28" rx="2" fill="#E30613" />
                    <rect x="178" y="145" width="14" height="25" rx="2" fill="#121212" />

                    <rect x="130" y="212" width="18" height="28" rx="2" fill="#E30613" />
                    <rect x="154" y="210" width="18" height="30" rx="2" fill="#FFFFFF" />
                    <rect x="178" y="212" width="18" height="28" rx="2" fill="#1E1E24" />

                    {/* Base Kickplate with Bold Logo */}
                    <path
                      d="M85 330L245 330L235 365L95 365Z"
                      fill="#1E1E24"
                    />
                    <text
                      x="165"
                      y="352"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontFamily="Montserrat, sans-serif"
                      fontWeight="800"
                      letterSpacing="2"
                    >
                      ALTA CAPACIDAD • 35 KG
                    </text>
                  </svg>

                  {/* Hotspot Floating Dimension Callouts */}
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-300">
                    <span className="text-[#E30613] font-bold">DIM:</span> 160 x 55 x 40 cm
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-300">
                    <span className="text-emerald-400 font-bold">SUSTRATO:</span> Corrugado 4mm
                  </div>
                </div>

                {/* Bottom Specifications Bar - High Contrast */}
                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-zinc-200">
                  <span className="flex items-center gap-1.5 text-zinc-100 font-semibold">
                    <Boxes className="w-4 h-4 text-red-400" />
                    Tiraje Mínimo: 25 Uds
                  </span>
                  <a
                    href="#cotizador"
                    className="bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all"
                  >
                    Personalizar
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Floating Stat Badge: Real-time Production Metric */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-[#18181F]/98 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-2xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E30613]/25 border border-[#E30613]/60 flex items-center justify-center text-red-400">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-montserrat font-black text-white leading-tight">
                    +25.000 m² / mes
                  </div>
                  <div className="text-xs text-zinc-300 font-mono font-medium">
                    Capacidad UV Cama Plana & Offset
                  </div>
                </div>
              </motion.div>

              {/* Floating Quality Seal Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-5 -right-5 bg-[#18181F]/95 backdrop-blur-md border border-emerald-500/30 p-2.5 rounded-xl shadow-2xl flex items-center gap-2 z-20"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-semibold text-white">Garantía Color GMG</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
