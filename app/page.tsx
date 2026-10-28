import React from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ServicesOverview } from "@/components/ServicesOverview";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { FinishComparator } from "@/components/FinishComparator";
import { ProcessSection } from "@/components/ProcessSection";
import { BentoGrid } from "@/components/BentoGrid";
import {
  Boxes,
  Layers,
  Sparkles,
  Download,
  PhoneCall,
  ArrowRight,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export default function Home() {
  const portalCards = [
    {
      title: "Catálogo de Artículos & Merchandising",
      badge: "Precios 2024 en COP",
      desc: "Termos con pantalla LED, libretas ejecutivas, esferos y descarga de catálogos maestros en PDF.",
      href: "/catalogo",
      icon: Boxes,
      highlight: true,
    },
    {
      title: "Cotizador en Vivo & Visor 3D",
      badge: "Cálculo en Tiempo Real",
      desc: "Configura exhibidores POP y empaques con visor orbital 360°, preflight e IVA DIAN del 19%.",
      href: "/cotizador",
      icon: Sparkles,
      highlight: true,
    },
    {
      title: "Portafolio Retail & Casos Reales",
      badge: "Cadenas Nacionales",
      desc: "Campañas fabricadas e instaladas para Éxito, Jumbo, Carulla, ferias y sedes corporativas.",
      href: "/proyectos",
      icon: Layers,
    },
    {
      title: "Centro de Planos & Troqueles",
      badge: "Descarga .AI / .PDF / .SVG",
      desc: "Planos mecánicos vectoriales para preprensa con guías de sangrado, hendido y corte perimetral.",
      href: "/plantillas",
      icon: Download,
    },
    {
      title: "Planta Industrial & Contacto Cali",
      badge: "San Nicolás",
      desc: "Calle 16 # 4-37, PBX (602) 885-4000, mapa interactivo de Google Maps y WhatsApp directo.",
      href: "/contacto",
      icon: PhoneCall,
    },
    {
      title: "Manual del Cliente & Editor CMS",
      badge: "Guía Paso a Paso",
      desc: "Instructivo visual con capturas simuladas para subir, editar precios y eliminar productos del catálogo.",
      href: "/guia-admin",
      icon: BookOpen,
    },
  ];

  return (
    <div className="text-white selection:bg-[#E30613] selection:text-white">
      {/* 1. Hero Principal */}
      <Hero />

      {/* 2. Sección Principal de Servicios Industriales (Requerimiento del cliente) */}
      <ServicesOverview />

      {/* 3. Infraestructura, Parque de Maquinaria Propia y Matriz de Sustratos */}
      <CapabilitiesSection />

      {/* 4. Laboratorio Interactivo de Acabados (Laminado Mate vs Brillo UV) */}
      <FinishComparator />

      {/* 5. Flujo de Trabajo Industrial en 4 Pasos */}
      <ProcessSection />

      {/* 6. Casos Reales y Trabajo en Acción en Retail */}
      <BentoGrid />

      {/* 7. Directorio hacia las demás páginas especializadas (Catálogo, Cotizador, etc.) */}
      <section className="py-20 bg-[#0E0E12] border-t border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-bold block mb-2">
                PÁGINAS ESPECIALIZADAS & CATÁLOGO
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-black uppercase text-white tracking-tight">
                EXPLORA LAS DEMÁS ÁREAS DE LA PLATAFORMA
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md leading-relaxed">
              Accede a nuestro catálogo de referencias con fotos reales, configura tu presupuesto en 3D, descarga planos de troquel o visita nuestra sede.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portalCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={idx}
                  href={card.href}
                  className={`group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    card.highlight
                      ? "bg-gradient-to-br from-[#1C1C28] to-[#14141A] border-[#E30613]/50 hover:border-[#E30613] shadow-[0_0_25px_rgba(227,6,19,0.2)] hover:scale-[1.01]"
                      : "bg-[#16161D] border-white/10 hover:border-white/25 hover:bg-[#1A1A24]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                          card.highlight
                            ? "bg-[#E30613] text-white shadow-lg shadow-red-600/30"
                            : "bg-[#22222D] text-zinc-200 group-hover:text-white group-hover:bg-[#E30613]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10 font-bold">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="font-montserrat font-bold text-base sm:text-lg text-white group-hover:text-red-400 transition-colors mb-2 flex items-center gap-1.5">
                      <span>{card.title}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                    </h3>

                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-white/5 flex items-center text-xs font-montserrat font-bold uppercase tracking-wider text-red-400 group-hover:text-white transition-colors">
                    <span>Abrir página</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
