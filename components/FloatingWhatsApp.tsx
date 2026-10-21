"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Show a polite invitation tooltip after 4 seconds if user hasn't closed it
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTooltip(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleCloseTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowTooltip(false);
    setHasInteracted(true);
  };

  const whatsappUrl =
    "https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20deseo%20asesor%C3%ADa%20personalizada%20para%20mi%20proyecto%20gr%C3%A1fico.";

  return (
    <aside
      aria-label="Atención al cliente por WhatsApp"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-none select-none"
    >
      {/* Speech Bubble / Tooltip */}
      {showTooltip && (
        <div className="pointer-events-auto mb-3 max-w-xs bg-[#181822]/95 backdrop-blur-md border border-emerald-500/30 text-white p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            type="button"
            onClick={handleCloseTooltip}
            className="absolute top-2 right-2 text-zinc-400 hover:text-white p-1 rounded-full transition-colors"
            aria-label="Cerrar notificación"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Asesoría Comercial en Vivo
            </span>
          </div>
          <p className="text-xs text-zinc-200 leading-snug font-sans pr-4">
            ¿Tienes dudas con tu archivo o cotización? Escríbenos directamente al{" "}
            <strong className="text-white">+57 316 320 0181</strong>.
          </p>
        </div>
      )}

      {/* Main Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp a +57 316 320 0181"
        className="pointer-events-auto relative group flex items-center justify-center p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-[#20ba59] to-[#25D366] hover:from-[#1eb054] hover:to-[#22c55e] text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_35px_rgba(37,211,102,0.75)] transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
      >
        {/* Pulsing beacon indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#121212]" />
        </span>

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white/20 stroke-white stroke-[2.2]" />

        {/* Hover Pill Label (Desktop) */}
        <span className="hidden md:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out group-hover:pl-2 text-xs font-montserrat font-bold tracking-wide">
          Chatear (+57 316 320 0181)
        </span>
      </a>
    </aside>
  );
}
