"use client";

import React from "react";
import Link from "next/link";
import {
  Boxes,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  accentColor: string;
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

export function ServicesOverview() {

  const services: ServiceItem[] = [
    {
      id: "pop",
      badge: "Línea Estrella Retail",
      title: "Material POP & Exhibidores de Piso",
      tagline: "Ingeniería de cartón corrugado, microcorrugado y combinaciones con MDF.",
      description:
        "Diseñamos y fabricamos exhibidores modulares de alta resistencia estructural para puntos de venta en supermercados, farmacias y tiendas por departamento. Cada pieza se entrega lista para armar en menos de 2 minutos sin herramientas.",
      features: [
        "Resistencia de carga garantizada de 15 a 40 kg por entrepaño",
        "Prototipado previo en mesa de corte digital Zünd en 24 horas",
        "Impresión offset full color acoplada a corrugado flauta B y C",
        "Embalaje plano individual para optimización logística de fletes",
      ],
      specs: [
        { label: "Sustratos", value: "Corrugado / Microcorrugado / MDF" },
        { label: "Armado", value: "Fácil ensamble en 120 seg" },
        { label: "Tirajes", value: "Desde 25 hasta 10.000+ uds" },
      ],
      accentColor: "#E30613",
      ctaText: "Cotizar Exhibidor POP",
      ctaLink: "/cotizador",
      popular: true,
    },
    {
      id: "gran-formato",
      badge: "Cama Plana UV 3.20m",
      title: "Gran Formato & Publicidad Exterior",
      tagline: "Impresión directa sobre rígidos y flexibles con tintas curables UV LED.",
      description:
        "Soluciones gráficas de gran escala para fachadas, vitrinas comerciales, eventos corporativos y señalización arquitectónica. Tecnología de cama plana industrial que permite imprimir directamente sobre tableros rígidos de hasta 5 cm de grosor.",
      features: [
        "Impresión directa sobre Acrílico, MDF, Polionda, PVC Espumado y Alucobond",
        "Lonas banner 13oz frontlight y blackout con costuras vulcanizadas",
        "Vinilos adhesivos para vitrinas, corte computarizado y floor graphics",
        "Tintas ecológicas de secado UV instantáneo resistentes a lluvia y rayos solares",
      ],
      specs: [
        { label: "Ancho Máximo", value: "3.20 metros continuo" },
        { label: "Grosor Rígidos", value: "Hasta 50 mm (5 cm)" },
        { label: "Durabilidad", value: "Hasta 36 meses exterior" },
      ],
      accentColor: "#2563EB",
      ctaText: "Consultar Gran Formato",
      ctaLink: "/contacto",
    },
    {
      id: "empaques",
      badge: "Ingeniería Estructural",
      title: "Cajas, Plegadizas & Empaques Rígidos",
      tagline: "Protección premium y presentación de alto impacto para marcas y productos.",
      description:
        "Desarrollamos soluciones de empaque a la medida: desde cajas plegadizas para farmacia, alimentos y cosmética, hasta cajas rígidas para kits corporativos con cierre magnético y nido interior termoformado o en espuma EVA.",
      features: [
        "Cajas plegadizas en cartulina sulfatada calibres 14, 16 y 18 pt",
        "Cajas e-commerce reforzadas en microcorrugado onda E anti-impacto",
        "Acabados especiales: Barniz UV sectorizado, hot stamping dorado/plateado",
        "Troquelado automático de alta velocidad y pegado lineal mecanizado",
      ],
      specs: [
        { label: "Formatos", value: "Plegadizas / Rígidas / Autoarmables" },
        { label: "Troqueles", value: "Planos vectoriales descargables" },
        { label: "Seguridad", value: "Solapas de seguridad y fajas" },
      ],
      accentColor: "#D97706",
      ctaText: "Ver Planos de Troquel",
      ctaLink: "/plantillas",
    },
    {
      id: "litografia",
      badge: "Heidelberg Speedmaster",
      title: "Litografía Comercial & Editorial",
      tagline: "Impresión offset masiva de alta definición con registro espectrofotométrico.",
      description:
        "Capacidad de producción continua para catálogos comerciales, revistas, carpetas corporativas, afiches y folletos publicitarios. Garantizamos fidelidad cromática exacta bajo estándares internacionales de color FOGRA39.",
      features: [
        "Velocidad de hasta 15.000 pliegos/hora en pliego y medio pliego",
        "Papeles esmaltados propalcote desde 115g hasta 300g y ecológicos de caña",
        "Plastificado térmico mate o brillante con tacto aterciopelado (Soft-Touch)",
        "Encuadernación rústica cosida al hilo, pegado hot-melt y grapa caballete",
      ],
      specs: [
        { label: "Velocidad", value: "15.000 pliegos/hora" },
        { label: "Norma Color", value: "FOGRA39 / ISO 12647" },
        { label: "Tirajes", value: "Desde 1.000 hasta 500.000+ ejemplares" },
      ],
      accentColor: "#10B981",
      ctaText: "Solicitar Muestrario",
      ctaLink: "/contacto",
    },
  ];

  return (
    <section id="servicios-principales" className="py-20 bg-[#121217] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#E30613]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-xs font-mono font-bold text-red-300 mb-3 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#E30613]" />
            CAPACIDAD DE PRODUCCIÓN DIRECTA • CALI, COLOMBIA
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-white tracking-tight leading-none mb-4">
            NUESTROS SERVICIOS INDUSTRIALES
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Planta de manufactura gráfica integrada: desde el prototipo estructural hasta el despacho nacional. Fabricación directa en Cali sin intermediarios comerciales.
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border relative overflow-hidden ${
                service.popular
                  ? "bg-[#181822] border-[#E30613]/50 shadow-[0_10px_35px_rgba(227,6,19,0.15)]"
                  : "bg-[#16161E] border-white/10 hover:border-white/20 hover:bg-[#1A1A24]"
              }`}
            >
              {/* Corner accent for popular service */}
              {service.popular && (
                <div className="absolute top-0 right-0 bg-[#E30613] text-white text-[10px] font-montserrat font-black uppercase px-4 py-1 rounded-bl-xl shadow-md">
                  Alta Demanda en Retail
                </div>
              )}

              <div>
                {/* Badge & Title */}
                <div className="mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 block mb-1">
                    {service.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-montserrat font-black uppercase text-white tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    {service.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Highlights / Features */}
                <div className="space-y-2.5 mb-6">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Specifications Pills */}
                <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-[#101015] border border-white/5 mb-6">
                  {service.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="text-center">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                        {spec.label}
                      </span>
                      <strong className="text-[11px] font-montserrat font-bold text-white block mt-0.5">
                        {spec.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={service.ctaLink}
                  onClick={() => triggerHaptic(10)}
                  className={`inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-wider transition-all px-5 py-2.5 rounded-xl ${
                    service.popular
                      ? "bg-[#E30613] hover:bg-[#C50510] text-white shadow-md"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Garantía de Planta</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Other Dedicated Subpages Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#171722] via-[#1A1A28] to-[#171722] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
              ¿BUSCAS ARTÍCULOS O PRECIOS INMEDIATOS?
            </span>
            <h3 className="text-xl sm:text-2xl font-montserrat font-black uppercase text-white tracking-tight">
              CATÁLOGO DE PRODUCTOS & COTIZADOR ONLINE 3D
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl leading-relaxed">
              Hemos organizado el catálogo con fotos reales, precios en COP y planos de troquel en páginas independientes para que encuentres exactamente lo que necesitas.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/catalogo"
              onClick={() => triggerHaptic(10)}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-white/10"
            >
              <Boxes className="w-4 h-4 text-amber-400" />
              <span>Ver Catálogo Completo</span>
            </Link>

            <Link
              href="/cotizador"
              onClick={() => triggerHaptic(10)}
              className="px-5 py-3 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(227,6,19,0.4)] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Abrir Cotizador 3D</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
