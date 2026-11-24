"use client";

import React, { useState } from "react";
import Link from "next/link";
import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing";
import { MessageCircle, Sparkles, UserCheck, Layers } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

interface LithoPosterHeroProps {
  initialShowCharacter?: boolean;
}

export function LithoPosterHero({ initialShowCharacter = false }: LithoPosterHeroProps) {
  const [showCharacter, setShowCharacter] = useState(initialShowCharacter);

  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-zinc-200">
      {/* Dynamic Typography Poster Canvas */}
      <div className="relative w-full h-[85vh] sm:h-[90vh] min-h-[580px] max-h-[860px]">
        <WavingPortfolioLanding
          name="Impresos Americana S.A.S."
          year="Cali • Colombia"
          roles={["Material POP & Gran Formato", "Litografía Offset Heidelberg"]}
          lettersLeft={["P", "LIT"]}
          giantLetter="O"
          lettersRight={["P", "GRAFIA"]}
          title="Impresos Americana - Fabricación de Material POP y Litografía Comercial"
          signature="IA/CALI"
          accent="#E30613"
          paper="#FFFFFF"
          ink="#141414"
          intro={true}
          showCharacter={showCharacter}
          height="100%"
        />

        {/* Ambient Top Subtle Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Character Toggle Pill (Top-Right under Navbar) */}
        <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-20">
          <button
            type="button"
            onClick={() => {
              triggerHaptic(8);
              setShowCharacter(!showCharacter);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 text-[11px] font-mono font-medium text-zinc-700 hover:text-zinc-950 shadow-xs transition-colors cursor-pointer"
            title={showCharacter ? "Ocultar ilustración (Solo letras)" : "Mostrar personaje animado"}
          >
            {showCharacter ? (
              <>
                <Layers className="w-3.5 h-3.5 text-[#E30613]" />
                <span className="hidden sm:inline">Modo Solo Tipografía</span>
                <span className="sm:hidden">Letras</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden sm:inline">Activar Personaje</span>
                <span className="sm:hidden">Personaje</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Floating Glass Action Strip */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 right-4 z-20 max-w-3xl mx-auto">
          <div className="p-3.5 sm:p-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] ring-1 ring-zinc-950/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left pl-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E30613] block">
                Planta Directa • Barrio San Nicolás, Cali
              </span>
              <p className="text-xs font-montserrat font-bold text-zinc-900 mt-0.5">
                Pasa el mouse sobre las letras para re-girarlas o haz clic en los dados
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <Link
                href="/cotizador"
                onClick={() => triggerHaptic(10)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cotizar en Línea</span>
              </Link>

              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20vi%20su%20p%C3%A1gina%20y%20deseo%20asesor%C3%ADa%20para%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic(8)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-montserrat font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default LithoPosterHero;
