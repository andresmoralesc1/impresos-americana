import React from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { ProcessSection } from "@/components/ProcessSection";
import {
  Boxes,
  Layers,
  Sparkles,
  Download,
  PhoneCall,
  ArrowRight,
  Printer,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const portalCards = [
    {
      title: "Servicios & Maquinaria",
      badge: "Offset & UV 3.20m",
      desc: "Heidelberg Speedmaster, cama plana UV y mesa de corte Zünd CNC.",
      href: "/servicios",
      icon: Printer,
    },
    {
      title: "Cotizador en Vivo & 3D",
      badge: "Cálculo en COP",
      desc: "Configura exhibidores POP y empaques con visor orbital 360° e IVA DIAN.",
      href: "/cotizador",
      icon: Sparkles,
      highlight: true,
    },
    {
      title: "Portafolio Retail",
      badge: "Casos Reales",
      desc: "Campañas fabricadas e instaladas para Éxito, Jumbo, Carulla y ferias.",
      href: "/proyectos",
      icon: Layers,
    },
    {
      title: "Catálogo de Merchandising",
      badge: "Precios 2024",
      desc: "Termos con pantalla LED, libretas ecológicas y descarga de PDFs.",
      href: "/catalogo",
      icon: Boxes,
    },
    {
      title: "Planos de Troquel",
      badge: "Descarga .AI / .PDF",
      desc: "Dielines vectoriales con capas de corte perimetral, hendido y sangrías.",
      href: "/plantillas",
      icon: Download,
    },
    {
      title: "Contacto & Planta Cali",
      badge: "San Nicolás",
      desc: "Calle 25 # 4-38, PBX (602) 885-4000 y atención inmediata en WhatsApp.",
      href: "/contacto",
      icon: PhoneCall,
    },
  ];

  return (
    <div className="text-white selection:bg-[#E30613] selection:text-white">
      {/* 1. Hero Section with 3D Mockups & Faceted Backdrop */}
      <Hero />

      {/* 2. Interactive Section Navigation Hub */}
      <section className="py-12 bg-[#0E0E12] border-t border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-bold block mb-1">
                SECCIONES DE LA PLATAFORMA
              </span>
              <h2 className="text-2xl sm:text-3xl font-montserrat font-black uppercase text-white tracking-tight">
                EXPLORA NUESTRO ECOSISTEMA INDUSTRIAL
              </h2>
            </div>
            <p className="text-xs text-zinc-300 max-w-md">
              Navega a través de nuestras áreas especializadas de producción, cotización, ingeniería de troquel y catálogo de referencias.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portalCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={idx}
                  href={card.href}
                  className={`group p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    card.highlight
                      ? "bg-gradient-to-br from-[#1A1A24] to-[#121217] border-[#E30613]/50 hover:border-[#E30613] shadow-[0_0_20px_rgba(227,6,19,0.2)]"
                      : "bg-[#16161D] border-white/10 hover:border-white/25 hover:bg-[#1A1A22]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          card.highlight
                            ? "bg-[#E30613] text-white"
                            : "bg-[#22222D] text-zinc-200 group-hover:text-white group-hover:bg-[#E30613]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10 font-bold">
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="font-montserrat font-bold text-base text-white group-hover:text-red-400 transition-colors mb-1.5 flex items-center gap-1.5">
                      <span>{card.title}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-white/5 flex items-center text-xs font-montserrat font-bold uppercase tracking-wider text-red-400 group-hover:text-white transition-colors">
                    <span>Acceder a la sección</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Bento Grid Showcase ('Nuestro Trabajo en Acción') */}
      <BentoGrid />

      {/* 4. Live Interactive Quote Configurator with 3D WebGL Orbit */}
      <QuoteCalculator />

      {/* 5. Industrial Workflow & Trust Pipeline */}
      <ProcessSection />
    </div>
  );
}
