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
        "Diseño y fabricación de exhibidores modulares de alta resistencia estructural para supermercados y farmacias. Resistencia de 15 a 40 kg por entrepaño y ensamble rápido sin herramientas.",
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
    <section id="servicios-principales" className="py-20 bg-[#0E0E12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-mono font-bold text-red-300 mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#E30613]" />
            PLANTA INDUSTRIAL DIRECTA • SAN NICOLÁS, CALI
          </div>
          <h2 className="text-3xl sm:text-4xl font-montserrat font-black uppercase text-white tracking-tight leading-tight mb-3">
            SERVICIOS DE MANUFACTURA GRÁFICA
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Capacidad instalada para atender proyectos de retail, gran formato y tirajes masivos sin intermediarios comerciales.
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl p-5 bg-[#14141B] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group hover:bg-[#181822] overflow-hidden"
            >
              <div>
                {/* Real Photo Thumbnail */}
                <div className="relative h-36 w-full rounded-xl overflow-hidden mb-4 bg-[#0A0A0E] border border-white/5">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-transparent to-transparent pointer-events-none" />

                  {/* Step & Badge inside image */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-white/10 text-white font-montserrat font-black text-xs">
                    {service.step}
                  </div>
                  <div className="absolute top-2.5 right-2.5 text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-zinc-300 border border-white/10 font-bold">
                    {service.badge}
                  </div>
                </div>

                <h3 className="text-base font-montserrat font-bold text-white group-hover:text-red-400 transition-colors leading-snug mb-1">
                  {service.title}
                </h3>
                <p className="text-[11px] text-zinc-400 font-mono mb-2.5">
                  {service.tagline}
                </p>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div>
                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-white/5">
                  {service.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href={service.ctaLink}
                  onClick={() => triggerHaptic(8)}
                  className="inline-flex items-center gap-1.5 text-xs font-montserrat font-bold uppercase tracking-wider text-red-400 group-hover:text-white transition-colors"
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Subpage Hub Bar */}
        <div className="p-6 rounded-2xl bg-[#14141B] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 hidden sm:block" />
            <div>
              <p className="text-sm font-montserrat font-bold text-white">
                ¿Buscas artículos promocionales o calcular un empaque en 3D?
              </p>
              <p className="text-xs text-zinc-400">
                Consulta el catálogo de referencias con fotos y precios o ingresa al cotizador interactivo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/catalogo"
              onClick={() => triggerHaptic(8)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/10"
            >
              <Boxes className="w-3.5 h-3.5 text-zinc-400" />
              <span>Ver Catálogo</span>
            </Link>
            <Link
              href="/cotizador"
              onClick={() => triggerHaptic(8)}
              className="px-4 py-2 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cotizador 3D</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
