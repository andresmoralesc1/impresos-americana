"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Printer,
  Boxes,
  Camera,
  Layers,
  Gauge,
  Scissors,
  Truck,
} from "lucide-react";
import { IALogoMark } from "./Logo";
import { triggerHaptic } from "@/lib/haptics";

export function Hero() {
  const substrates = [
    {
      id: "corrugado",
      name: "Microcorrugado 4mm",
      category: "Material POP Estructural",
      src: "/images/real/exhibidor-bebidas.jpg",
      badge: "POP de Alto Impacto",
      specs: ["Cartón Corrugado Flauta E", "Carga hasta 45 kg", "Barniz UV Sectorizado"],
      tolerance: "Corte Zünd ±0.01 mm",
      turnaround: "Prototipado en 24h",
    },
    {
      id: "supermercados",
      name: "Góndolas & Valla UV",
      category: "Retail Nacional & Exterior",
      src: "/images/real/pop-supermercados.jpg",
      badge: "Cadenas de Supermercados",
      specs: ["Lona Blackout 13oz + Cama Plana", "Resolución 1440 DPI", "Tintas UV 3 Años Exterior"],
      tolerance: "Ancho continuo 3.20m",
      turnaround: "Despacho Express Nacional",
    },
    {
      id: "papeleria",
      name: "Propalcote 300g",
      category: "Litografía & Empaques",
      src: "/images/real/litografia-papeleria.jpg",
      badge: "Offset Heidelberg",
      specs: ["Propalcote 300g Calibrado", "Laminado Mate Soft Touch", "Estampado Foil Oro"],
      tolerance: "Color FOGRA39 / GMG",
      turnaround: "Tiraje 15.000 pliegos/h",
    },
  ];

  const industrialMetrics = [
    { label: "Velocidad Offset", value: "15.000", unit: "pliegos/h", icon: Gauge, note: "Heidelberg Speedmaster" },
    { label: "Precisión de Corte", value: "±0.01", unit: "mm", icon: Scissors, note: "Mesa Digital Suiza Zünd G3" },
    { label: "Producción Retail", value: "+1.2M", unit: "unidades/año", icon: Printer, note: "Material POP & Empaques" },
    { label: "Prototipado CAD", value: "24", unit: "horas", icon: Layers, note: "Muestra Estructural Previa" },
    { label: "Cobertura de Carga", value: "32", unit: "deptos", icon: Truck, note: "Despacho Diario Nacional" },
  ];

  const [activeSubstrateIdx, setActiveSubstrateIdx] = useState(0);
  const currentSubstrate = substrates[activeSubstrateIdx];

  // Spotlight card state
  const stageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden bg-white"
    >
      {/* Subtle Architectural Dot Grid Background */}
      <div className="absolute inset-0 bg-faceted-pattern opacity-70 pointer-events-none" />

      {/* Soft Ambient Warm Red Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-[#E30613]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-red-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Swiss Editorial Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left"
          >
            {/* Top Badge: Industry Leadership */}
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-red-50/80 border border-red-200/80 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-zinc-900 mb-6 shadow-xs max-w-full">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E30613] animate-pulse shrink-0" />
              <span className="font-semibold text-zinc-900">Planta Directa • San Nicolás, Cali</span>
              <span className="text-zinc-400 font-normal hidden sm:inline">|</span>
              <span className="text-[#E30613] font-bold hidden sm:inline">NIT 900.384.912-4</span>
            </div>

            {/* Main Headline - Swiss Editorial Clean Minimalist */}
            <h1 className="text-4xl sm:text-6xl xl:text-[4.2rem] font-montserrat font-black tracking-[-0.035em] text-zinc-950 uppercase leading-[1.03] mb-5 sm:mb-6">
              FABRICACIÓN DE <br />
              <span className="text-zinc-950">MATERIAL POP &</span> <br />
              <span className="text-[#E30613] relative inline-block">
                GRAN FORMATO
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#E30613]/25 rounded-full" />
              </span>
            </h1>

            {/* Subheading / Commercial Description */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 max-w-2xl font-normal leading-relaxed mb-8">
              Planta de producción gráfica directa en Cali con despachos diarios a todo el país. Desarrollamos{" "}
              <strong className="text-zinc-950 font-bold">
                Exhibidores POP de piso y mostrador
              </strong>
              , impresión cama plana UV sobre rígidos, empaques en microcorrugado y litografía comercial de alto tiraje con factura electrónica DIAN.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link
                href="/cotizador"
                onClick={() => triggerHaptic(10)}
                className="group relative inline-flex items-center justify-center gap-2.5 bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-md shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 min-h-[48px]"
              >
                <span>Configurar Cotización Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20solicito%20asesor%C3%ADa%20para%20un%20proyecto%20de%20branding%20y%20material%20POP."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200/90 font-montserrat font-bold text-xs sm:text-sm px-6 py-3.5 sm:py-4 rounded-xl shadow-xs hover:border-zinc-300 hover:shadow-sm transition-all duration-200 min-h-[48px]"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Asesor Comercial Inmediato</span>
              </a>
            </div>

            {/* Key Trust Checkpoints */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-zinc-200 text-xs font-semibold text-zinc-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sin Intermediarios</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Muestra Previa 3D</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Despacho Nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Factura DIAN 19%</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Substrate Swatchbook Showcase with Cursor Spotlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Central Hero Display Stage Card with Dynamic Spotlight */}
              <div
                ref={stageRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative rounded-3xl bg-white p-5 sm:p-6 border border-zinc-200/90 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                {/* Subtle Cursor Spotlight Glow */}
                <div
                  className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(227, 6, 19, 0.05), transparent 45%)`,
                  }}
                />

                {/* Header of Preview Box */}
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-3 relative z-20">
                  <div className="flex items-center gap-2.5">
                    <IALogoMark className="w-7 h-7" showSpeedLines={false} />
                    <div>
                      <span className="font-montserrat font-bold text-xs uppercase text-zinc-950 block leading-none">
                        {currentSubstrate.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {currentSubstrate.category}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-[#E30613] border border-red-200 uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                    <Camera className="w-3 h-3" />
                    <span>Fotografía Real</span>
                  </span>
                </div>

                {/* Substrate Stage Image with Soft Depth */}
                <div className="relative h-64 sm:h-80 w-full rounded-2xl bg-zinc-100 border border-zinc-200/80 overflow-hidden group shadow-inner relative z-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSubstrate.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.35 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={currentSubstrate.src}
                        alt={currentSubstrate.name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/20 to-transparent pointer-events-none" />

                      {/* Floating Spec Tags */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                        <div className="bg-white/95 backdrop-blur-md border border-zinc-200 px-2.5 py-1 rounded-lg text-[10px] font-mono text-zinc-800 shadow-sm">
                          <span className="text-[#E30613] font-bold">ESPECIFICACIÓN:</span> {currentSubstrate.tolerance}
                        </div>
                        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded-lg text-[9px] font-mono font-bold uppercase shadow-sm">
                          {currentSubstrate.turnaround}
                        </div>
                      </div>

                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-zinc-200 px-2.5 py-0.5 rounded-lg text-[9px] font-mono text-zinc-900 font-bold uppercase shadow-sm">
                        {currentSubstrate.badge}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Interactive Substrate Selector Tabs (Swatchbook) */}
                <div className="mt-3.5 pt-3 border-t border-zinc-100 relative z-20">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2">
                    <span className="font-semibold uppercase tracking-wider">MUESTRARIO TÁCTIL DE SUSTRATOS:</span>
                    <span className="text-[#E30613] font-bold">{activeSubstrateIdx + 1} / {substrates.length}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {substrates.map((sub, sIdx) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          setActiveSubstrateIdx(sIdx);
                          triggerHaptic(8);
                        }}
                        className={`relative p-2 rounded-xl border text-left transition-all ${
                          activeSubstrateIdx === sIdx
                            ? "border-[#E30613] bg-red-50/60 ring-2 ring-red-500/25 shadow-xs"
                            : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300"
                        }`}
                      >
                        <span className="block text-[11px] font-montserrat font-bold text-zinc-950 truncate">
                          {sub.name}
                        </span>
                        <span className="block text-[9px] font-mono text-zinc-500 truncate mt-0.5">
                          {sub.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Specifications Bar */}
                <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-700 relative z-20">
                  <span className="flex items-center gap-1.5 text-zinc-800 font-semibold text-xs">
                    <Boxes className="w-3.5 h-3.5 text-[#E30613]" />
                    Muestrario Físico Gratis
                  </span>
                  <Link
                    href="/cotizador"
                    onClick={() => triggerHaptic(8)}
                    className="bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition-all"
                  >
                    <span>Cotizar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md border border-zinc-200 p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20 hidden sm:flex"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#E30613]">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-montserrat font-black text-zinc-950 leading-tight">
                    +25.000 m² / mes
                  </div>
                  <div className="text-xs text-zinc-500 font-mono font-medium">
                    Capacidad UV Cama Plana & Offset
                  </div>
                </div>
              </motion.div>

              {/* Floating Quality Seal Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md border border-emerald-200 p-2.5 rounded-xl shadow-lg flex items-center gap-2 z-20"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-semibold text-zinc-800">Garantía Color GMG</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Minimalist Industrial Metric Ticker Bar */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-zinc-200/80">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {industrialMetrics.map((metric, mIdx) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={mIdx}
                  className="p-4 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 hover:bg-white hover:shadow-sm hover:border-zinc-300 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <IconComponent className="w-3.5 h-3.5 text-[#E30613]" />
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                      {metric.label}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-montserrat font-black text-zinc-950 tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 font-medium">
                      {metric.unit}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-1 truncate">
                    {metric.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
