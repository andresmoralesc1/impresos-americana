"use client";

import React, { useState, useRef } from "react";
import { Sparkles, SlidersHorizontal, CheckCircle2, Shield } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

export function FinishComparator() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeItem, setActiveItem] = useState<"pop" | "catalogo" | "empaque">("pop");
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const [isDraggingActive, setIsDraggingActive] = useState<boolean>(false);
  const lastDetentCrossed = useRef<number>(50);

  const handlePointerDown = () => {
    isDragging.current = true;
    setIsDraggingActive(true);
    triggerHaptic(10);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    
    // Tactile detent at midpoint (50%) and boundaries (25%, 75%)
    if (
      (percent === 50 && lastDetentCrossed.current !== 50) ||
      (Math.abs(percent - 50) < 2 && lastDetentCrossed.current !== 50)
    ) {
      triggerHaptic(15);
      lastDetentCrossed.current = 50;
    } else if (Math.abs(percent - 50) > 4) {
      lastDetentCrossed.current = percent;
    }

    setSliderPos(percent);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setIsDraggingActive(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
      triggerHaptic(5);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
      triggerHaptic(5);
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPos(0);
      triggerHaptic(10);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPos(100);
      triggerHaptic(10);
    }
  };

  const selectTab = (item: "pop" | "catalogo" | "empaque") => {
    setActiveItem(item);
    triggerHaptic(12);
  };

  return (
    <section className="py-24 bg-zinc-50/70 relative overflow-hidden border-t border-b border-zinc-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E30613] font-bold block mb-2">
            LABORATORIO DE ACABADOS INDUSTRIALES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-none mb-4">
            LAMINADO MATE VS. BRILLO UV SECTORIZADO
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Arrastra el divisor interactivo para apreciar el contraste óptico y táctil
            entre la elegancia antirreflejo del mate y el impacto refractivo del barniz UV de alto relieve.
          </p>

          {/* Preset Product Selector */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => selectTab("pop")}
              className={`px-4.5 py-2 rounded-full text-xs font-montserrat font-bold transition-all ${
                activeItem === "pop"
                  ? "bg-[#E30613] text-white shadow-sm shadow-red-500/20"
                  : "bg-white text-zinc-700 hover:text-zinc-950 border border-zinc-200 shadow-2xs"
              }`}
            >
              Exhibidor POP
            </button>
            <button
              onClick={() => selectTab("catalogo")}
              className={`px-4.5 py-2 rounded-full text-xs font-montserrat font-bold transition-all ${
                activeItem === "catalogo"
                  ? "bg-[#E30613] text-white shadow-sm shadow-red-500/20"
                  : "bg-white text-zinc-700 hover:text-zinc-950 border border-zinc-200 shadow-2xs"
              }`}
            >
              Portada Catálogo
            </button>
            <button
              onClick={() => selectTab("empaque")}
              className={`px-4.5 py-2 rounded-full text-xs font-montserrat font-bold transition-all ${
                activeItem === "empaque"
                  ? "bg-[#E30613] text-white shadow-sm shadow-red-500/20"
                  : "bg-white text-zinc-700 hover:text-zinc-950 border border-zinc-200 shadow-2xs"
              }`}
            >
              Caja Rígida
            </button>
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            tabIndex={0}
            role="slider"
            aria-label="Comparador interactivo de acabados: Laminado Mate vs Barniz UV Sectorizado"
            aria-valuenow={sliderPos}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-zinc-200 shadow-xl select-none cursor-ew-resize touch-none bg-white focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:ring-offset-2"
          >
            {/* Background Layer: Right Side - Barniz UV Sectorizado (High Gloss & Reflective Shine) */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-zinc-50 to-white flex items-center justify-center p-8">
              <div className="relative w-full max-w-md h-52 sm:h-64 rounded-2xl bg-white border border-zinc-200 p-6 flex flex-col justify-between shadow-xl">
                {/* Shiny UV Gloss Simulation Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent rounded-2xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E30613] flex items-center justify-center text-white font-montserrat font-black shadow-xs">
                    iA
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200 font-bold shadow-2xs">
                    Brillo Refractivo + Relieve
                  </span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-montserrat font-black text-zinc-950 uppercase tracking-tight">
                    IMPACTO ULTRA BRILLANTE
                  </h4>
                  <p className="text-xs text-zinc-600 font-mono mt-1">
                    Capa UV con curado instantáneo y reflexión de luz tipo espejo
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#E30613] font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Destaque de logo y fotos con barniz sectorizado</span>
                </div>
              </div>

              {/* Label Top Right */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-mono font-bold text-zinc-900 uppercase flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#E30613]" />
                Barniz UV Sectorizado
              </div>
            </div>

            {/* Foreground Layer (Clipped): Left Side - Laminado Mate Suave */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-zinc-200/70 via-zinc-100 to-zinc-50 flex items-center justify-center p-8 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <div className="relative w-full max-w-md h-52 sm:h-64 rounded-2xl bg-zinc-50 border border-zinc-200 p-6 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-white font-montserrat font-black">
                    iA
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md border border-zinc-200 font-bold">
                    Soft-Touch Antirreflejo
                  </span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-montserrat font-bold text-zinc-900 uppercase tracking-tight">
                    ELEGANCIA MATE PURA
                  </h4>
                  <p className="text-xs text-zinc-600 font-mono mt-1">
                    Película térmica antirreflejo suave al tacto y libre de huellas
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
                  <Shield className="w-4 h-4 text-zinc-500" />
                  <span>Máxima durabilidad contra rayones y humedad</span>
                </div>
              </div>

              {/* Label Top Left */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-mono font-bold text-zinc-800 uppercase flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                Laminado Mate Térmico
              </div>
            </div>

            {/* Draggable Divider Line & Knob with Micro-Interaction Tooltip */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#E30613] z-30 shadow-md transition-all pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Floating Percentage Indicator while dragging or hovering */}
              <div
                className={`absolute top-4 -translate-x-1/2 px-2.5 py-1 rounded-full bg-zinc-950/90 text-white font-mono text-[10px] font-bold shadow-lg transition-opacity duration-200 whitespace-nowrap backdrop-blur-sm border border-white/20 ${
                  isDraggingActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                {sliderPos}% Mate • {100 - sliderPos}% UV
              </div>

              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#E30613] text-white border-2 border-white shadow-lg flex items-center justify-center transition-transform duration-150 ${
                  isDraggingActive ? "scale-115 shadow-red-500/40 shadow-xl" : "hover:scale-110 shadow-md"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Comparison Specs Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-950 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-600" />
                Cuándo Elegir Laminado Mate:
              </h4>
              <ul className="text-xs text-zinc-600 space-y-1.5">
                <li>• Ambientes con iluminación directa intensa en tienda para evitar reflejos.</li>
                <li>• Packaging de lujo, productos gourmet y cosméticos de alta gama.</li>
                <li>• Tacto sedoso premium que protege contra grasa y huellas dactilares.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-red-200/80 shadow-2xs">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E30613] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E30613]" />
                Cuándo Elegir Brillo UV Sectorizado:
              </h4>
              <ul className="text-xs text-zinc-600 space-y-1.5">
                <li>• Para resaltar el logotipo de marca, títulos o fotografías de producto.</li>
                <li>• Exhibidores POP en retail donde la luz cenital crea destellos comerciales.</li>
                <li>• Combinado sobre base mate crea un contraste táctil inolvidable.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
