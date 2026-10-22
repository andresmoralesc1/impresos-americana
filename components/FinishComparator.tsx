"use client";

import React, { useState, useRef } from "react";
import { Sparkles, SlidersHorizontal, CheckCircle2, Shield } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

export function FinishComparator() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeItem, setActiveItem] = useState<"pop" | "catalogo" | "empaque">("pop");
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const lastDetentCrossed = useRef<number>(50);

  const handlePointerDown = () => {
    isDragging.current = true;
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
  };

  const selectTab = (item: "pop" | "catalogo" | "empaque") => {
    setActiveItem(item);
    triggerHaptic(12);
  };

  return (
    <section className="py-20 bg-[#0E0E12] relative overflow-hidden border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-400 font-bold block mb-2">
            LABORATORIO DE ACABADOS INDUSTRIALES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-white tracking-tight leading-none mb-4">
            LAMINADO MATE VS. BRILLO UV SECTORIZADO
          </h2>
          <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
            Arrastra el divisor interactivo para apreciar el contraste óptico y táctil
            entre la elegancia antirreflejo del mate y el impacto refractivo del barniz UV de alto relieve.
          </p>

          {/* Preset Product Selector */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => selectTab("pop")}
              className={`px-4 py-1.5 rounded-full text-xs font-montserrat font-bold transition-all ${
                activeItem === "pop"
                  ? "bg-[#E30613] text-white shadow-[0_0_15px_rgba(227,6,19,0.5)]"
                  : "bg-[#181820] text-zinc-300 hover:text-white"
              }`}
            >
              Exhibidor POP
            </button>
            <button
              onClick={() => selectTab("catalogo")}
              className={`px-4 py-1.5 rounded-full text-xs font-montserrat font-bold transition-all ${
                activeItem === "catalogo"
                  ? "bg-[#E30613] text-white shadow-[0_0_15px_rgba(227,6,19,0.5)]"
                  : "bg-[#181820] text-zinc-300 hover:text-white"
              }`}
            >
              Portada Catálogo
            </button>
            <button
              onClick={() => selectTab("empaque")}
              className={`px-4 py-1.5 rounded-full text-xs font-montserrat font-bold transition-all ${
                activeItem === "empaque"
                  ? "bg-[#E30613] text-white shadow-[0_0_15px_rgba(227,6,19,0.5)]"
                  : "bg-[#181820] text-zinc-300 hover:text-white"
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
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl select-none cursor-ew-resize touch-none"
          >
            {/* Background Layer: Right Side - Barniz UV Sectorizado (High Gloss & Reflective Shine) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C24] via-[#15151D] to-[#0A0A0D] flex items-center justify-center p-8">
              <div className="relative w-full max-w-md h-52 sm:h-64 rounded-xl bg-[#1A1A24] border border-white/20 p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(227,6,19,0.25)]">
                {/* Shiny UV Gloss Simulation Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent rounded-xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#E30613] flex items-center justify-center text-white font-montserrat font-black shadow-[0_0_20px_#E30613]">
                    iA
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                    Brillo Refractivo + Relieve
                  </span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-montserrat font-black text-white uppercase tracking-tight">
                    IMPACTO ULTRA BRILLANTE
                  </h4>
                  <p className="text-xs text-zinc-300 font-mono mt-1">
                    Capa UV con curado instantáneo y reflexión de luz tipo espejo
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#E30613]">
                  <Sparkles className="w-4 h-4" />
                  <span>Destaque de logo y fotos con barniz sectorizado</span>
                </div>
              </div>

              {/* Label Top Right */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E30613]" />
                Barniz UV Sectorizado
              </div>
            </div>

            {/* Foreground Layer (Clipped): Left Side - Laminado Mate Suave */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#16161D] via-[#121217] to-[#08080B] flex items-center justify-center p-8 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <div className="relative w-full max-w-md h-52 sm:h-64 rounded-xl bg-[#14141A] border border-white/10 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#99000C] flex items-center justify-center text-white/90 font-montserrat font-black">
                    iA
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-white/10 text-zinc-300 px-2 py-0.5 rounded border border-white/10 font-bold">
                    Soft-Touch Antirreflejo
                  </span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-montserrat font-bold text-zinc-200 uppercase tracking-tight">
                    ELEGANCIA MATE PURA
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    Película térmica antirreflejo suave al tacto y libre de huellas
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <Shield className="w-4 h-4" />
                  <span>Máxima durabilidad contra rayones y humedad</span>
                </div>
              </div>

              {/* Label Top Left */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono font-bold text-zinc-300 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                Laminado Mate Térmico
              </div>
            </div>

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white z-30 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#E30613] text-white border-2 border-white shadow-xl flex items-center justify-center">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Comparison Specs Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-[#181820] border border-white/10">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-300" />
                Cuándo Elegir Laminado Mate:
              </h4>
              <ul className="text-xs text-zinc-200 space-y-1.5">
                <li>• Ambientes con iluminación directa intensa en tienda para evitar reflejos.</li>
                <li>• Packaging de lujo, productos gourmet y cosméticos de alta gama.</li>
                <li>• Tacto sedoso premium que protege contra grasa y huellas dactilares.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#181820] border border-[#E30613]/30">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-400" />
                Cuándo Elegir Brillo UV Sectorizado:
              </h4>
              <ul className="text-xs text-zinc-200 space-y-1.5">
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
