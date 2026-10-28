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
      id: "supermercados",
      title: "Campaña Nacional en Supermercados & Vallas",
      category: "Material POP & Gran Formato",
      clientSector: "Consumo Masivo / Retail Nacional",
      specs: ["Cartón Corrugado 4mm", "Góndolas & Cabezotes", "Valla Exterior UV"],
      image: "/images/real/pop-supermercados.jpg",
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
    <section className="py-20 bg-[#101015] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400 font-bold mb-2">
              <Camera className="w-3.5 h-3.5 text-[#E30613]" />
              <span>PRODUCCIÓN FÍSICA REAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-black uppercase text-white tracking-tight">
              TRABAJOS INSTALADOS EN RETAIL
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Fotografías reales de proyectos fabricados en nuestra planta de Cali e instalados en puntos de venta a nivel nacional.
            </p>
          </div>
          <Link
            href="/proyectos"
            onClick={() => triggerHaptic(8)}
            className="inline-flex items-center justify-center gap-2 text-xs font-montserrat font-bold uppercase tracking-wider text-zinc-200 hover:text-white transition-colors shrink-0 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 min-h-[44px] w-full sm:w-auto"
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
              className="group rounded-2xl bg-[#16161E] border border-white/10 hover:border-[#E30613]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Real Photography Container */}
              <div className="relative h-56 bg-[#0D0D12] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16161E] via-transparent to-black/30 pointer-events-none" />

                {/* Badge top-right */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-zinc-200">
                  {item.badge}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                    <span className="text-red-400 font-bold uppercase">{item.category}</span>
                    <span>{item.clientSector}</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-base text-white group-hover:text-red-400 transition-colors mb-3">
                    {item.title}
                  </h3>
                </div>

                {/* Specs Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {item.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5"
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
