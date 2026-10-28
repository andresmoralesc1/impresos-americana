import React from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
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
    <div className="text-white selection:bg-[#E30613] selection:text-white">
      {/* 1. Hero Principal con Showcase de Fotos Reales */}
      <Hero />

      {/* 2. Franja de Confianza / Sectores Atendidos (Minimalist Trust Strip) */}
      <div className="border-t border-b border-white/5 bg-[#0B0B0E] py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 font-bold shrink-0">
              PRODUCCIÓN DIRECTA PARA
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-xs font-mono text-zinc-300">
              {sectors.map((sector, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
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
      <section className="py-20 bg-[#0B0B0E] border-t border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-mono font-bold text-red-300 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
            PLANTA INDUSTRIAL: CALLE 16 # 4-37, SAN NICOLÁS, CALI
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-white tracking-tight leading-none mb-4">
            ¿TIENES UN PROYECTO O LICITACIÓN EN CURSO?
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Habla directamente con nuestros ingenieros y asesores gráficos. Prototipado rápido, producción continua y entregas certificadas con factura electrónica DIAN.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20tengo%20un%20proyecto%20para%20cotizar%20directamente%20con%20planta."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-montserrat font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(37,211,102,0.3)] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Chatear por WhatsApp (+57 316 320 0181)</span>
            </a>

            <Link
              href="/contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/15 font-montserrat font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all"
            >
              <span>Ver Ubicación & Planta en Cali</span>
              <ArrowRight className="w-4 h-4 text-red-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
