"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

interface FeaturedItem {
  id: string;
  title: string;
  category: string;
  clientSector: string;
  specs: string[];
  image: string;
  badge: string;
}

export function FeaturedProjects() {
  const featured: FeaturedItem[] = [
    {
      id: "stand-modular",
      title: "Stands & Exhibidores Modulares de Punto de Venta",
      category: "Material POP & Stands",
      clientSector: "Consumo Masivo & Retail Nacional",
      specs: ["Cartón Corrugado 4mm", "Cabezote Curvo UV", "Ensamble Rápido"],
      image: "/images/real/exhibidor-3d-stand.jpg",
      badge: "Instalación en Retail",
    },
    {
      id: "bebidas",
      title: "Exhibidores de Piso en Cartón Estructural",
      category: "Ingeniería POP",
      clientSector: "Bebidas & Licores",
      specs: ["Carga 45 kg por Entrepaño", "Sin Pegantes", "Ensamble 2 min"],
      image: "/images/real/exhibidor-bebidas.jpg",
      badge: "Punto de Venta Real",
    },
    {
      id: "litografia-catalogos",
      title: "Papelería Corporativa & Carpetas de Lujo",
      category: "Litografía Comercial",
      clientSector: "Sector Corporativo & Banca",
      specs: ["Propalcote 300g", "Foil Estampado", "Sobres & Carpetas"],
      image: "/images/real/litografia-papeleria.jpg",
      badge: "Branding Físico",
    },
  ];

  return (
    <section className="py-24 bg-zinc-50/70 border-t border-zinc-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E30613] font-bold mb-2">
              <Camera className="w-3.5 h-3.5 text-[#E30613]" />
              <span>PRODUCCIÓN FÍSICA REAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-black uppercase text-zinc-950 tracking-tight">
              TRABAJOS INSTALADOS EN RETAIL
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
              Fotografías reales de proyectos fabricados en nuestra planta de Cali e instalados en puntos de venta a nivel nacional.
            </p>
          </div>
          <Link
            href="/proyectos"
            onClick={() => triggerHaptic(8)}
            className="inline-flex items-center justify-center gap-2 text-xs font-montserrat font-bold uppercase tracking-wider text-zinc-800 hover:text-zinc-950 transition-colors shrink-0 py-2.5 px-4 rounded-xl bg-white border border-zinc-200/90 hover:border-zinc-300 shadow-xs min-h-[44px] w-full sm:w-auto"
          >
            <span>Ver portafolio completo</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E30613]" />
          </Link>
        </div>

        {/* 3 Curated Cards Grid with REAL PHOTOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-white border border-zinc-200/90 hover:border-zinc-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Real Photography Container */}
              <div className="relative h-56 bg-zinc-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Badge top-right */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-zinc-200 text-[10px] font-mono font-bold text-zinc-800 shadow-xs">
                  {item.badge}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="text-[#E30613] font-bold uppercase">{item.category}</span>
                    <span className="text-zinc-500">{item.clientSector}</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-base text-zinc-950 group-hover:text-[#E30613] transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Specs Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100">
                  {item.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200/60"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
