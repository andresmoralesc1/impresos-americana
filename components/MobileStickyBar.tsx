"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls past hero section (~350px)
      setIsVisible(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Acciones rápidas de cotización móvil"
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-lg border-t border-zinc-200 px-4 py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] transition-all duration-300 pb-[max(12px,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center gap-3 max-w-md mx-auto">
        {/* Direct WhatsApp Callout */}
        <a
          href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20estoy%20en%20su%20web%20m%C3%B3vil%20y%20deseo%20asesor%C3%ADa%20inmediata."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[46px] rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center gap-2 px-3 text-xs font-montserrat font-bold transition-colors shadow-2xs"
          title="Chatear con un asesor comercial (+57 316 320 0181)"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <MessageCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span className="truncate">WhatsApp Directo</span>
        </a>

        {/* High-Impact Red Cotizar Action */}
        <Link
          href="/cotizador"
          className="flex-1 min-h-[46px] rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white flex items-center justify-center gap-2 px-3 text-xs font-montserrat font-black uppercase tracking-wider shadow-xs transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-white/90" />
          <span className="truncate">Cotizar en Línea</span>
        </Link>
      </div>
    </aside>
  );
}
