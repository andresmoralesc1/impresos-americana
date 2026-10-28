"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { IALogoMark } from "./Logo";
import { triggerHaptic } from "@/lib/haptics";

export function Hero() {
  const realPhotos = [
    {
      id: "supermercados",
      title: "Góndolas & Valla Nacional",
      subtitle: "Supermercados & Gran Formato",
      src: "/images/real/pop-supermercados.jpg",
      badge: "Retail Real",
      tag: "Valla 3.20m + Góndola",
    },
    {
      id: "exhibidor",
      title: "Exhibidor de Cartón Estructural",
      subtitle: "Carga 45 kg en Pasillo Retail",
      src: "/images/real/exhibidor-bebidas.jpg",
      badge: "Punto de Venta",
      tag: "Cartón Corrugado 4mm",
    },
    {
      id: "papeleria",
      title: "Papelería & Carpetas Corporativas",
      subtitle: "Offset de Alta Definición FOGRA39",
      src: "/images/real/litografia-papeleria.jpg",
      badge: "Litografía Comercial",
      tag: "Propalcote 300g + Foil",
    },
  ];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const currentPhoto = realPhotos[activePhotoIdx];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden bg-[#121212]"
    >
      {/* Faceted Geometric Background with Red Ambience */}
      <div className="absolute inset-0 bg-faceted-pattern opacity-90 pointer-events-none" />

      {/* Radial Red Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#E30613]/18 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-[#E30613]/10 rounded-full blur-[120px] pointer-events-none" />

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

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-montserrat font-black tracking-tight text-white uppercase leading-[1.06] mb-6">
              FABRICACIÓN DE <br />
              <span className="text-white">MATERIAL POP &</span> <br />
              <span className="text-[#FF2A36] drop-shadow-[0_0_35px_rgba(227,6,19,0.6)]">
                GRAN FORMATO
              </span>
            </h1>

            {/* Subheading / Commercial Description */}
            <p className="text-base sm:text-lg text-zinc-100 max-w-2xl font-normal leading-relaxed mb-8">
              Planta de producción gráfica directa en Cali con despachos diarios a todo el país. Desarrollamos{" "}
              <strong className="text-white font-bold underline decoration-[#E30613] decoration-2 underline-offset-4">
                Exhibidores POP de piso y mostrador
              </strong>
              , impresión cama plana UV sobre rígidos, empaques en microcorrugado y litografía comercial de alto tiraje con factura electrónica DIAN.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <Link
                href="/cotizador"
                onClick={() => triggerHaptic(10)}
                className="group relative inline-flex items-center justify-center gap-3 bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(227,6,19,0.5)] hover:shadow-[0_0_45px_rgba(227,6,19,0.8)] transition-all duration-300"
              >
                <span>Configurar Cotización Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

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

            {/* Key Trust Checkpoints */}
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

          {/* Right Column: Interactive Real Photography Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Central Hero Display Stage Card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#1E1E24]/95 to-[#15151A]/95 p-5 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(227,6,19,0.15)] backdrop-blur-md">
                {/* Header of Preview Box */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <IALogoMark className="w-7 h-7" showSpeedLines={false} />
                    <div>
                      <span className="font-montserrat font-bold text-xs uppercase text-white block leading-none">
                        {currentPhoto.title}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {currentPhoto.subtitle}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E30613] text-white uppercase tracking-wider flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    <span>Foto Real</span>
                  </span>
                </div>

                {/* Real Photography Stage */}
                <div className="relative h-72 sm:h-80 w-full rounded-xl bg-[#0F0F13] border border-white/10 overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPhoto.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.35 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={currentPhoto.src}
                        alt={currentPhoto.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                      {/* Floating metadata badges */}
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm border border-white/15 px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-200">
                        <span className="text-red-400 font-bold">SUSTRATO:</span> {currentPhoto.tag}
                      </div>

                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-white/15 px-2 py-0.5 rounded-md text-[9px] font-mono text-emerald-400 font-bold uppercase">
                        {currentPhoto.badge}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Interactive Real Photos Selector Thumbnails */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                    <span>EXPLORAR TRABAJOS REALES:</span>
                    <span className="text-red-400 font-bold">{activePhotoIdx + 1} / {realPhotos.length}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {realPhotos.map((photo, pIdx) => (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => {
                          setActivePhotoIdx(pIdx);
                          triggerHaptic(8);
                        }}
                        className={`relative h-14 rounded-lg overflow-hidden border transition-all text-left ${
                          activePhotoIdx === pIdx
                            ? "border-[#E30613] ring-2 ring-red-500/40 opacity-100"
                            : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.title}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Specifications Bar */}
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-zinc-200">
                  <span className="flex items-center gap-1.5 text-zinc-100 font-semibold text-xs">
                    <Boxes className="w-3.5 h-3.5 text-red-400" />
                    Fabricación a Medida en Cali
                  </span>
                  <Link
                    href="/cotizador"
                    onClick={() => triggerHaptic(8)}
                    className="bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all"
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
                className="absolute -bottom-6 -left-6 bg-[#18181F]/98 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-2xl flex items-center gap-3 z-20 hidden sm:flex"
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
