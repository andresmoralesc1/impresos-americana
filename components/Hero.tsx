"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Printer,
  Camera,
  Layers,
  Gauge,
  Scissors,
  Truck,
} from "lucide-react";
import { IALogoMark } from "./Logo";
import { triggerHaptic } from "@/lib/haptics";
import { ShaderBackground } from "@/components/ui/green-border";

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

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-28 pb-16 lg:pt-36 lg:pb-20 flex flex-col justify-center overflow-hidden bg-white"
    >
      {/* Subtle Architectural Dot Grid Background */}
      <div className="absolute inset-0 bg-faceted-pattern opacity-60 pointer-events-none" />

      {/* Soft Ambient Warm Red Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] bg-[#E30613]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Swiss Editorial Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left"
          >
            {/* Top Badge: Direct Plant */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50/80 border border-red-200/70 text-xs font-mono uppercase tracking-wider text-zinc-900 mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#E30613] animate-pulse shrink-0" />
              <span className="font-semibold text-zinc-800">Planta Directa • San Nicolás, Cali</span>
            </div>

            {/* Main Headline - Swiss Editorial Clean Minimalist */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-montserrat font-black tracking-[-0.035em] text-zinc-950 uppercase leading-[1.04] mb-5">
              FABRICACIÓN DE <br />
              <span className="text-zinc-950">MATERIAL POP &</span> <br />
              <span className="text-[#E30613]">GRAN FORMATO</span>
            </h1>

            {/* Subheading / Commercial Description */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 max-w-xl font-normal leading-relaxed mb-8">
              Planta de producción gráfica directa en Cali. Exhibidores POP de piso y mostrador, impresión UV sobre rígidos y litografía comercial de alto tiraje con despacho diario nacional.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
              <Link
                href="/cotizador"
                onClick={() => triggerHaptic(10)}
                className="group relative inline-flex items-center justify-center gap-2.5 bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 min-h-[46px]"
              >
                <span>Configurar Cotización Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20solicito%20asesor%C3%ADa%20para%20un%20proyecto%20de%20branding%20y%20material%20POP."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 font-montserrat font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-2xs hover:border-zinc-300 transition-all duration-200 min-h-[46px]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Asesor Comercial Inmediato</span>
              </a>
            </div>

            {/* Key Trust Checkpoints */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-5 border-t border-zinc-100 text-xs font-medium text-zinc-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Sin Intermediarios</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Prototipado 3D</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Facturación DIAN</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Despacho Nacional</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column: Hero Stage with Interactive WebGL Pulsing Shader Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Card with Interactive WebGL Pulsing Border Shader */}
              <div className="relative rounded-3xl p-[2px] overflow-hidden group shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06)]">
                {/* Reactive WebGL Pulsing Shader Border Background */}
                <div className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <ShaderBackground className="w-full h-full" palette="brand" />
                </div>

                {/* Inner Card Content */}
                <div className="relative rounded-[22px] bg-white p-5 sm:p-6 border border-zinc-200/60 z-10">
                  {/* Header of Preview Box */}
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-3">
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
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-50 text-zinc-700 border border-zinc-200 uppercase tracking-wider flex items-center gap-1">
                      <Camera className="w-3 h-3 text-[#E30613]" />
                      <span>Fotografía Real</span>
                    </span>
                  </div>

                  {/* Substrate Stage Image with Soft Depth */}
                  <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-zinc-100 border border-zinc-200/80 overflow-hidden shadow-inner">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSubstrate.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.25 }}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />

                        {/* Floating Spec Tags */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                          <div className="bg-white/95 backdrop-blur-md border border-zinc-200 px-2.5 py-1 rounded-lg text-[10px] font-mono text-zinc-800 shadow-sm">
                            <span className="text-[#E30613] font-bold">CALIDAD:</span> {currentSubstrate.tolerance}
                          </div>
                          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded-lg text-[9px] font-mono font-bold uppercase shadow-sm">
                            {currentSubstrate.turnaround}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Interactive Substrate Selector Tabs (Swatchbook) */}
                  <div className="mt-3.5 pt-3 border-t border-zinc-100">
                    <div className="grid grid-cols-3 gap-2">
                      {substrates.map((sub, sIdx) => {
                        const isActive = activeSubstrateIdx === sIdx;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              setActiveSubstrateIdx(sIdx);
                              triggerHaptic(8);
                            }}
                            className={`relative p-2 rounded-xl border text-left transition-all ${
                              isActive
                                ? "border-[#E30613] bg-red-50/70 shadow-xs"
                                : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100"
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeSubstrateRing"
                                className="absolute inset-0 rounded-xl ring-2 ring-[#E30613]/30 pointer-events-none"
                                transition={{ type: "spring", stiffness: 450, damping: 30 }}
                              />
                            )}
                            <span className="block text-[11px] font-montserrat font-bold text-zinc-950 truncate">
                              {sub.name}
                            </span>
                            <span className="block text-[9px] font-mono text-zinc-500 truncate mt-0.5">
                              {sub.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Minimalist Industrial Metric Ticker Bar */}
        <div className="mt-14 sm:mt-16 pt-6 border-t border-zinc-100">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {industrialMetrics.map((metric, mIdx) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={mIdx}
                  className="p-3.5 rounded-xl bg-zinc-50/60 border border-zinc-200/70 hover:bg-white hover:border-zinc-300 transition-all duration-150"
                >
                  <div className="flex items-center gap-1.5 text-zinc-500 mb-0.5">
                    <IconComponent className="w-3.5 h-3.5 text-[#E30613]" />
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                      {metric.label}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-montserrat font-black text-zinc-950 tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 font-medium">
                      {metric.unit}
                    </span>
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
