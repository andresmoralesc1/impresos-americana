"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Sparkles,
  MessageCircle,
  Check,
  ChevronRight,
  Box,
  FileCheck2,
  Pause,
  Play,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";
import type { PreflightReport } from "./PreflightModal";

const SampleBoxModal = dynamic(
  () => import("./SampleBoxModal").then((m) => m.SampleBoxModal),
  { ssr: false }
);

const PreflightModal = dynamic(
  () => import("./PreflightModal").then((m) => m.PreflightModal),
  { ssr: false }
);

interface ShowcaseSlide {
  id: string;
  tabLabel: string;
  tag: string;
  title: string;
  subtitle: string;
  src: string;
  specs: { label: string; value: string }[];
  hotspots: { x: number; y: number; title: string; desc: string }[];
  quoteQuery: string;
}

export function Hero() {
  const router = useRouter();

  const slides: ShowcaseSlide[] = [
    {
      id: "pop",
      tabLabel: "01 / Material POP",
      tag: "Exhibidores & Displays",
      title: "Exhibidores de Piso en Cartón Estructural",
      subtitle: "Ingeniería de empaque modular sin adhesivos para retail masivo. Resistencia probada hasta 45 kg con troquelado de alta precisión.",
      src: "/images/real/exhibidor-bebidas.jpg",
      specs: [
        { label: "Sustrato", value: "Microcorrugado Flauta E" },
        { label: "Corte Digital", value: "Zünd G3 (±0.01 mm)" },
        { label: "Acabado", value: "Barniz UV Sectorizado" },
        { label: "Tiempo", value: "Prototipo en 24h" },
      ],
      hotspots: [
        { x: 30, y: 35, title: "Cabezote Curvo", desc: "Impresión full color 1440 DPI con barniz UV" },
        { x: 65, y: 60, title: "Bandejas Reforzadas", desc: "Soporte estructural hasta 45 kg sin deformación" },
      ],
      quoteQuery: "Exhibidor POP de Piso Modular",
    },
    {
      id: "gran-formato",
      tabLabel: "02 / Gran Formato",
      tag: "Cama Plana UV & Fachadas",
      title: "Gran Formato UV & Activación en Supermercados",
      subtitle: "Producción de góndolas, cabezotes y publicidad exterior con tintas UV curables resistentes a la intemperie y radiación solar.",
      src: "/images/real/pop-supermercados.jpg",
      specs: [
        { label: "Tecnología", value: "Cama Plana UV 3.20m" },
        { label: "Resolución", value: "1440 DPI Ultra HD" },
        { label: "Durabilidad", value: "3 Años Exterior" },
        { label: "Cobertura", value: "Despacho Diario Nacional" },
      ],
      hotspots: [
        { x: 45, y: 40, title: "Impresión Rígida", desc: "Curado UV instantáneo sobre polionda y MDF" },
        { x: 75, y: 70, title: "Montaje Rápido", desc: "Sistemas modulares para instalación ágil" },
      ],
      quoteQuery: "Góndolas y Gran Formato UV",
    },
    {
      id: "litografia",
      tabLabel: "03 / Litografía Offset",
      tag: "Alta Tirada Comercial",
      title: "Catálogos Corporativos & Empaques Rígidos",
      subtitle: "Velocidad de hasta 15.000 pliegos/hora en Heidelberg Speedmaster. Colorimetría certificada bajo estándar FOGRA39 / ISO 12647.",
      src: "/images/real/litografia-papeleria.jpg",
      specs: [
        { label: "Prensa", value: "Heidelberg Speedmaster" },
        { label: "Velocidad", value: "15.000 pliegos/h" },
        { label: "Acabados", value: "Foil Estampado + Mate" },
        { label: "Norma", value: "FOGRA39 Certificado" },
      ],
      hotspots: [
        { x: 50, y: 50, title: "Registro Espectrofotométrico", desc: "Cero variación cromática entre pliegos" },
      ],
      quoteQuery: "Litografía Comercial y Catálogos",
    },
    {
      id: "merchandising",
      tabLabel: "04 / Merchandising",
      tag: "Artículos Corporativos",
      title: "Kits Corporativos & Tecnología con Marcación",
      subtitle: "Termos inteligentes con pantalla LED de temperatura, libretas de cuero ecológico y empaques rígidos para eventos y fidelización.",
      src: "/images/real/kit-corporativo.jpg",
      specs: [
        { label: "Técnicas", value: "Láser, UV & Tampografía" },
        { label: "Pedido Mínimo", value: "Desde 25 unidades" },
        { label: "Garantía", value: "Marcación Permanente" },
        { label: "Entrega", value: "3 a 5 días hábiles" },
      ],
      hotspots: [
        { x: 35, y: 55, title: "Grabado Láser", desc: "Precisión micrométrica sobre acero y cuero" },
      ],
      quoteQuery: "Kits Corporativos y Merchandising",
    },
  ];

  const metrics = [
    { value: "15.000", unit: "pliegos/h", label: "Velocidad Offset", note: "Heidelberg Speedmaster" },
    { value: "±0.01", unit: "mm", label: "Tolerancia de Corte", note: "Mesa Suiza Zünd G3" },
    { value: "24", unit: "horas", label: "Prototipado Estructural", note: "Muestra física previa" },
    { value: "+1.2M", unit: "piezas/año", label: "Producción Anual", note: "POP, empaques y retail" },
    { value: "32", unit: "departamentos", label: "Despacho Diario", note: "Cobertura nacional" },
  ];

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isSampleBoxOpen, setIsSampleBoxOpen] = useState(false);
  const [isPreflightOpen, setIsPreflightOpen] = useState(false);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentSlide = slides[activeSlideIdx];

  // Auto-progreso sutil del slider (cada 6.5s) con pausa interactiva
  useEffect(() => {
    if (isAutoPlayPaused || activeHotspot !== null || isSampleBoxOpen || isPreflightOpen) {
      return;
    }

    const duration = 6500;
    const intervalTime = 50;
    const increment = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSlideIdx((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutoPlayPaused, activeHotspot, isSampleBoxOpen, isPreflightOpen, slides.length]);

  const handleTabChange = (idx: number) => {
    triggerHaptic(10);
    setActiveSlideIdx(idx);
    setActiveHotspot(null);
    setProgress(0);
  };

  const handleFileApproved = (file: File, report: PreflightReport) => {
    setIsPreflightOpen(false);
    triggerHaptic(15);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("last_preflight_file", file.name);
        sessionStorage.setItem("last_preflight_score", String(report.overallScore));
      } catch {
        // Ignorado en caso de cuota de storage
      }
    }
    router.push("/cotizador");
  };

  return (
    <>
      <section
        id="hero"
        className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-white text-zinc-950"
      >
        {/* Modern Hairline Architectural Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Soft Ambient Red Energy Core */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Top Operational Status Pill */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900 text-white text-[11px] font-mono shadow-xs border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-300 font-medium">PLANTA DIRECTA EN CALI</span>
              <span className="text-zinc-600">•</span>
              <span className="text-red-400 font-bold uppercase tracking-wider">SAN NICOLÁS</span>
            </div>
          </div>

          {/* Central Display Typography (Punchy, Editorial & Compact - SSR First Paint) */}
          <div className="text-center max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-montserrat font-black uppercase tracking-[-0.035em] text-zinc-950 leading-[1.02] sm:leading-[0.98]">
              INGENIERÍA GRÁFICA & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-[#E30613] to-red-600">
                PRODUCCIÓN INDUSTRIAL
              </span>
            </h1>

            <p className="mt-4 text-xs sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Fabricación directa de material POP de alto impacto, gran formato UV y litografía de alta tirada. Desde prototipo estructural en 24h hasta distribución masiva en toda Colombia sin intermediarios.
            </p>

            {/* Primary Action CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/cotizador"
                onClick={() => triggerHaptic(12)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-200 active:scale-95 group"
              >
                <span>Configurar Cotización Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20quisiera%20asesor%C3%ADa%20técnica%20directa%20con%20planta."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic(8)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200/90 font-montserrat font-semibold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>Asesor de Planta Inmediato</span>
              </a>
            </div>

            {/* High-Value B2B Lead Magnet Tools Bar */}
            <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic(8);
                  setIsSampleBoxOpen(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-full bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300/80 text-xs font-mono font-medium shadow-2xs hover:border-[#E30613] hover:text-[#E30613] transition-all cursor-pointer"
              >
                <Box className="w-4 h-4 text-[#E30613] shrink-0" />
                <span>Solicitar Muestrario Físico a tu Empresa</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic(8);
                  setIsPreflightOpen(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-full bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300/80 text-xs font-mono font-medium shadow-2xs hover:border-emerald-600 hover:text-emerald-700 transition-all cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pre-chequeo Técnico de Archivo / PDF</span>
              </button>
            </div>

            {/* Micro Trust Strip */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sin intermediarios</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Prototipado CAD en 24h</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Factura Electrónica DIAN</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Despacho a 32 departamentos</span>
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* EXPANSIVE INTERACTIVE SHOWCASE DECK (The Modern Stage)   */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onMouseEnter={() => setIsAutoPlayPaused(true)}
            onMouseLeave={() => setIsAutoPlayPaused(false)}
            className="mt-8 rounded-3xl bg-white border border-zinc-200 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden relative"
          >
            {/* Ambient Subdued Edge Glow (Hardware Accelerated CSS) */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-red-500/10 via-zinc-200/40 to-red-500/10 rounded-3xl pointer-events-none -z-10" />

            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
              {/* Top Navigation Tabs with Dynamic Progress Indicator */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                  {slides.map((slide, idx) => {
                    const isActive = activeSlideIdx === idx;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => handleTabChange(idx)}
                        className={`relative px-4 sm:px-5 py-2.5 rounded-xl font-montserrat text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 overflow-hidden ${
                          isActive
                            ? "bg-zinc-950 text-white shadow-md"
                            : "bg-zinc-100/80 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/70"
                        }`}
                      >
                        <span>{slide.tabLabel}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
                        )}

                        {/* Progress bar inside active tab button */}
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-zinc-800">
                            <div
                              className="h-full bg-[#E30613] transition-[width] duration-75 ease-linear"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Autoplay Pause / Play indicator button */}
                <button
                  type="button"
                  onClick={() => setIsAutoPlayPaused(!isAutoPlayPaused)}
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors shrink-0"
                  title={isAutoPlayPaused ? "Reanudar rotación automática" : "Pausar rotación automática"}
                >
                  {isAutoPlayPaused ? (
                    <>
                      <Play className="w-3 h-3 text-[#E30613]" />
                      <span>Reanudar</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3 text-zinc-400" />
                      <span>Pausar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Stage Body: High Resolution Media + Telemetry HUD */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Details Panel */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 border border-red-200 text-[10px] font-mono font-bold text-red-800 uppercase tracking-wider mb-2.5">
                      <Sparkles className="w-3 h-3" />
                      <span>{currentSlide.tag}</span>
                    </div>

                    <h2 className="font-montserrat font-black text-xl sm:text-2xl lg:text-3xl text-zinc-950 uppercase leading-tight tracking-tight">
                      {currentSlide.title}
                    </h2>

                    <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {currentSlide.subtitle}
                    </p>
                  </div>

                  {/* Technical Specs Matrix */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                    {currentSlide.specs.map((spec, spIdx) => (
                      <div key={spIdx} className="space-y-0.5">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                          {spec.label}
                        </span>
                        <span className="text-xs font-montserrat font-bold text-zinc-950 block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Row - Specific to this product category */}
                  <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                    <Link
                      href={`/cotizador`}
                      onClick={() => triggerHaptic(8)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-950 hover:bg-[#E30613] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs"
                    >
                      <span>Cotizar esta línea</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic(8);
                        setIsSampleBoxOpen(true);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200/90 font-montserrat font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
                    >
                      <Box className="w-3.5 h-3.5 text-[#E30613]" />
                      <span>Pedir Muestra de Sustrato</span>
                    </button>
                  </div>
                </div>

                {/* Right Media Stage with Interactive Hotspots */}
                <div className="lg:col-span-7">
                  <div className="relative h-72 sm:h-96 w-full rounded-2xl bg-zinc-100 border border-zinc-200/90 overflow-hidden shadow-inner group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={currentSlide.src}
                          alt={currentSlide.title}
                          fill
                          priority
                          fetchPriority="high"
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

                        {/* Floating Real Camera Indicator */}
                        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-zinc-900 border border-zinc-200 shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
                          <span>PRODUCCIÓN REAL EN PLANTA</span>
                        </div>

                        {/* Interactive Hotspots with Safe Edge Popover Positioning */}
                        {currentSlide.hotspots.map((spot, hIdx) => {
                          const isOpen = activeHotspot === hIdx;
                          return (
                            <div
                              key={hIdx}
                              style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  triggerHaptic(8);
                                  setActiveHotspot(isOpen ? null : hIdx);
                                }}
                                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/95 text-zinc-900 shadow-lg border border-zinc-200 hover:scale-110 active:scale-95 transition-all group/btn cursor-pointer"
                                aria-label={spot.title}
                              >
                                <span className="w-2.5 h-2.5 rounded-full bg-[#E30613] animate-ping absolute" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#E30613] relative z-10" />
                              </button>

                              {/* Hotspot Popover Tooltip with Responsive Horizontal Edge Handling */}
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 8 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 8 }}
                                    transition={{ duration: 0.2 }}
                                    className={`absolute bottom-10 z-30 w-52 p-3 rounded-xl bg-zinc-950/95 text-white backdrop-blur-md shadow-2xl border border-zinc-800 text-left ${
                                      spot.x > 50 ? "right-0 translate-x-2" : "left-0 -translate-x-2"
                                    }`}
                                  >
                                    <span className="text-[10px] font-mono text-[#E30613] font-bold block uppercase tracking-wider">
                                      DETALLE TÉCNICO
                                    </span>
                                    <span className="font-montserrat font-bold text-xs block text-white mt-0.5">
                                      {spot.title}
                                    </span>
                                    <span className="text-[11px] text-zinc-400 block mt-1 leading-snug">
                                      {spot.desc}
                                    </span>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}

                        {/* Bottom Overlay Label */}
                        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs font-mono">
                          <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                            {currentSlide.title}
                          </span>
                          <span className="text-zinc-300 text-[11px] hidden sm:inline">
                            Toca los puntos para ver detalles
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* REFINED INDUSTRIAL METRICS BAR (Minimalist Hairline)     */}
          {/* ======================================================== */}
          <div className="mt-14 pt-8 border-t border-zinc-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
              {metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-montserrat font-black text-2xl sm:text-3xl text-zinc-950 tracking-tight">
                      {metric.value}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#E30613]">
                      {metric.unit}
                    </span>
                  </div>
                  <div className="font-montserrat font-bold text-xs text-zinc-800 uppercase tracking-wider">
                    {metric.label}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500">
                    {metric.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Muestrario Físico (Sample Box) */}
      <SampleBoxModal
        isOpen={isSampleBoxOpen}
        onClose={() => setIsSampleBoxOpen(false)}
      />

      {/* Modal de Preflight Técnico de Archivos */}
      <PreflightModal
        isOpen={isPreflightOpen}
        onClose={() => setIsPreflightOpen(false)}
        onFileApproved={handleFileApproved}
      />
    </>
  );
}