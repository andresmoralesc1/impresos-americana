import React from "react";
import Link from "next/link";
import { LithoPosterHero } from "@/components/LithoPosterHero";
import { ServicesOverview } from "@/components/ServicesOverview";
import { ProcessSection } from "@/components/ProcessSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ProductShowcase } from "@/components/ProductShowcase";
import { MessageCircle, MapPin, ArrowRight } from "lucide-react";

export default function Home() {
  const sectors = [
    "Consumo Masivo & Retail",
    "Farmacéutico & Salud",
    "Cosmética & Cuidado Personal",
    "Alimentos & Bebidas",
    "Sector Automotriz & Banca",
    "Agencias de Publicidad",
  ];

  return (
    <div className="text-zinc-900 selection:bg-[#E30613] selection:text-white">
      {/* 1. Hero Principal con Tipografía Viva Litográfica & POP */}
      <LithoPosterHero />

      {/* 2. Franja de Confianza / Sectores Atendidos (Modern Trust Strip) */}
      <div className="border-t border-b border-zinc-200/80 bg-zinc-50/70 py-4 sm:py-5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-[10px] font-mono font-bold text-red-800 shrink-0 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E30613] animate-pulse" />
              <span>PRODUCCIÓN DIRECTA PARA</span>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-2.5">
              {sectors.map((sector, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-zinc-200/90 text-xs font-montserrat font-semibold text-zinc-800 shadow-2xs hover:border-[#E30613]/50 hover:text-zinc-950 transition-all duration-200 whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E30613] shrink-0" />
                  <span>{sector}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Servicios Industriales Principales (4 Pilares con Fotos Reales) */}
      <ServicesOverview />

      {/* 4. Flujo de Trabajo Industrial en 4 Pasos */}
      <ProcessSection />

      {/* 5. Trabajos Instalados en Retail (Fotos Reales de Proyectos) */}
      <FeaturedProjects />

      {/* 6. Catálogo de Artículos & Merchandising (Fotos Reales de Producto) */}
      <ProductShowcase />

      {/* 7. Banner de Conversión Directo y Contacto de Planta */}
      <section className="py-24 bg-gradient-to-b from-white via-zinc-50/50 to-zinc-100/60 border-t border-zinc-200 relative overflow-hidden">
        {/* Soft Ambient Red Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-mono font-bold text-red-800 mb-5 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
            PLANTA INDUSTRIAL: CALLE 16 # 4-37, SAN NICOLÁS, CALI
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-none mb-4">
            ¿TIENES UN PROYECTO O LICITACIÓN EN CURSO?
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto mb-9 leading-relaxed font-normal">
            Habla directamente con nuestros ingenieros y asesores gráficos. Prototipado rápido, producción continua y entregas certificadas con factura electrónica DIAN.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20tengo%20un%20proyecto%20para%20cotizar%20directamente%20con%20planta."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0f7648] hover:bg-[#0c5c38] text-white font-montserrat font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-md shadow-emerald-800/20 hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chatear por WhatsApp (+57 316 320 0181)</span>
            </a>

            <Link
              href="/contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200/90 font-montserrat font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-xs hover:border-zinc-300 transition-all"
            >
              <span>Ver Ubicación & Planta en Cali</span>
              <ArrowRight className="w-4 h-4 text-[#E30613]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
