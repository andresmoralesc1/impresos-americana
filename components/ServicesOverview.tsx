"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Boxes,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

interface ServiceItem {
  id: string;
  step: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  ctaText: string;
  ctaLink: string;
}

export function ServicesOverview() {
  const services: ServiceItem[] = [
    {
      id: "pop",
      step: "01",
      badge: "Línea Retail",
      title: "Material POP & Exhibidores de Piso",
      tagline: "Ingeniería de cartón corrugado y MDF",
      description:
        "Diseño y fabricación de exhibidores modulares de alta resistencia estructural para retail comercial y farmacias. Resistencia de 15 a 40 kg por entrepaño y ensamble rápido sin herramientas.",
      image: "/images/real/exhibidor-bebidas.jpg",
      highlights: ["Corrugado & MDF", "Muestra Zünd 24h", "Tirajes 25 a 10.000+ uds"],
      ctaText: "Cotizar POP",
      ctaLink: "/cotizador",
    },
    {
      id: "gran-formato",
      step: "02",
      badge: "Cama Plana UV 3.20m",
      title: "Gran Formato & Publicidad Exterior",
      tagline: "Impresión directa sobre rígidos y flexibles",
      description:
        "Soluciones a gran escala para fachadas, vitrinas y eventos. Impresión directa sobre acrílico, MDF, polionda, PVC espumado y alucobond de hasta 50 mm con tintas UV curables.",
      image: "/images/real/pop-supermercados.jpg",
      highlights: ["Ancho 3.20m continuo", "Rígidos hasta 50mm", "Exterior 36 meses"],
      ctaText: "Consultar",
      ctaLink: "/contacto",
    },
    {
      id: "empaques",
      step: "03",
      badge: "Ingeniería Estructural",
      title: "Cajas, Plegadizas & Empaques",
      tagline: "Protección y presencia de marca",
      description:
        "Cajas plegadizas en sulfatada calibres 14 a 18 pt y cajas e-commerce en microcorrugado anti-impacto. Acabados con barniz UV sectorizado, estampado foil y kits corporativos.",
      image: "/images/real/kit-corporativo.jpg",
      highlights: ["Sulfatada 14-18 pt", "Microcorrugado Onda E", "Planos vectoriales"],
      ctaText: "Ver Troqueles",
      ctaLink: "/plantillas",
    },
    {
      id: "litografia",
      step: "04",
      badge: "Heidelberg Speedmaster",
      title: "Litografía Comercial & Editorial",
      tagline: "Alta velocidad con registro cromático exacto",
      description:
        "Producción continua de catálogos corporativos, revistas, carpetas y afiches. Hasta 15.000 pliegos/hora con fidelidad cromática certificada bajo norma FOGRA39 / ISO 12647.",
      image: "/images/real/litografia-papeleria.jpg",
      highlights: ["15.000 pliegos/hora", "Propalcote 115g a 300g", "Norma FOGRA39"],
      ctaText: "Solicitar Muestra",
      ctaLink: "/contacto",
    },
  ];

  return (
    <section id="servicios-principales" className="py-24 bg-zinc-50/70 border-b border-zinc-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-mono font-bold text-red-800 mb-3 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-[#E30613]" />
            PLANTA INDUSTRIAL DIRECTA • SAN NICOLÁS, CALI
          </div>
          <h2 className="text-3xl sm:text-4xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-tight mb-3">
            SERVICIOS DE MANUFACTURA GRÁFICA
          </h2>
          <p className="text-zinc-600 text-sm leading-relaxed">
            Capacidad instalada para atender proyectos de retail, gran formato y tirajes masivos sin intermediarios comerciales.
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl p-5 bg-white border border-zinc-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.08)] hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Real Photo Thumbnail */}
                <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-4 bg-zinc-100 border border-zinc-200/80 shadow-inner">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />

                  {/* Step & Badge inside image */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-white/95 backdrop-blur-sm border border-zinc-200 text-zinc-950 font-montserrat font-black text-xs shadow-xs">
                    {service.step}
                  </div>
                  <div className="absolute top-2.5 right-2.5 text-[9px] font-mono uppercase px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-sm text-zinc-700 border border-zinc-200 font-bold shadow-xs">
                    {service.badge}
                  </div>
                </div>

                <h3 className="text-base font-montserrat font-bold text-zinc-950 group-hover:text-[#E30613] transition-colors leading-snug mb-1">
                  {service.title}
                </h3>
                <p className="text-[11px] text-zinc-500 font-mono mb-2.5">
                  {service.tagline}
                </p>

                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div>
                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-zinc-100">
                  {service.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href={service.ctaLink}
                  onClick={() => triggerHaptic(8)}
                  className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-2 text-xs font-montserrat font-bold uppercase tracking-wider text-red-800 hover:text-red-950 transition-colors py-2.5 px-3.5 sm:p-0 rounded-xl bg-red-50/80 sm:bg-transparent border border-red-200 sm:border-0 min-h-[42px] sm:min-h-0"
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Subpage Hub Bar */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 hidden sm:block" />
            <div>
              <p className="text-sm font-montserrat font-bold text-zinc-950">
                ¿Buscas artículos promocionales o calcular un empaque en 3D?
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Consulta el catálogo de referencias con fotos y precios o ingresa al cotizador interactivo.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/catalogo"
              onClick={() => triggerHaptic(8)}
              className="px-4.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-montserrat font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-zinc-200 min-h-[44px]"
            >
              <Boxes className="w-3.5 h-3.5 text-zinc-600" />
              <span>Ver Catálogo</span>
            </Link>
            <Link
              href="/cotizador"
              onClick={() => triggerHaptic(8)}
              className="px-5 py-2.5 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all shadow-sm shadow-red-500/20 hover:shadow-md flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-white/90" />
              <span>Cotizador 3D</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
