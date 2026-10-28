"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

interface FeaturedItem {
  id: string;
  title: string;
  category: string;
  clientSector: string;
  specs: string[];
}

export function FeaturedProjects() {
  const featured: FeaturedItem[] = [
    {
      id: "supermercados",
      title: "Campaña Nacional en Supermercados",
      category: "Material POP",
      clientSector: "Consumo Masivo / Retail",
      specs: ["Cartón Corrugado 4mm", "Góndolas & Cabezotes", "Barniz UV"],
    },
    {
      id: "bebidas",
      title: "Exhibidores de Piso de Alta Resistencia",
      category: "Ingeniería POP",
      clientSector: "Bebidas & Licores",
      specs: ["Carga 45 kg por Entrepaño", "Sin Pegantes", "Ensamble 2 min"],
    },
    {
      id: "litografia-catalogos",
      title: "Catálogos Corporativos de Lujo",
      category: "Litografía Comercial",
      clientSector: "Automotriz & Moda",
      specs: ["Propalcote 300g", "Soft-Touch", "Norma FOGRA39"],
    },
  ];

  return (
    <section className="py-20 bg-[#101015] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400 font-bold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>PROYECTOS DESTACADOS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-black uppercase text-white tracking-tight">
              TRABAJOS REALES EN RETAIL
            </h2>
          </div>
          <Link
            href="/proyectos"
            onClick={() => triggerHaptic(8)}
            className="inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
          >
            <span>Ver portafolio completo</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E30613]" />
          </Link>
        </div>

        {/* 3 Curated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-[#16161E] border border-white/10 hover:border-[#E30613]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Visual Mockup Stage */}
              <div className="relative h-48 bg-[#0D0D12] flex items-center justify-center p-4 border-b border-white/5 overflow-hidden">
                {item.id === "supermercados" && (
                  <svg viewBox="0 0 320 180" fill="none" className="w-full h-full max-h-40 group-hover:scale-105 transition-transform duration-500">
                    <line x1="20" y1="30" x2="300" y2="30" stroke="#252530" strokeWidth="1.5" />
                    <line x1="20" y1="80" x2="300" y2="80" stroke="#252530" strokeWidth="1.5" />
                    <line x1="20" y1="130" x2="300" y2="130" stroke="#252530" strokeWidth="1.5" />
                    <rect x="30" y="25" width="120" height="70" rx="4" fill="#E30613" />
                    <rect x="35" y="30" width="110" height="60" rx="2" fill="#181820" />
                    <text x="90" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Montserrat" fontWeight="900">
                      PUNTO DE VENTA
                    </text>
                    <text x="90" y="72" textAnchor="middle" fill="#E30613" fontSize="8" fontFamily="Inter" fontWeight="700">
                      RETAIL NACIONAL
                    </text>
                    <path d="M190 40L260 35L275 160L180 165Z" fill="#C50510" />
                    <path d="M205 48L255 42L262 152L195 158Z" fill="#1E1E24" />
                    <polygon points="205,80 255,74 250,86 202,92" fill="#C9A375" />
                    <polygon points="202,110 252,104 247,116 199,122" fill="#C9A375" />
                    <polygon points="199,140 249,134 244,146 196,152" fill="#C9A375" />
                  </svg>
                )}

                {item.id === "bebidas" && (
                  <svg viewBox="0 0 240 180" fill="none" className="h-full max-h-40 group-hover:scale-105 transition-transform duration-500">
                    <path d="M60 25L180 25L170 165L70 165Z" fill="#B38656" />
                    <path d="M60 25L180 25L175 50H65Z" fill="#E30613" />
                    <text x="120" y="42" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="Montserrat" fontWeight="800">
                      BEBIDAS PREMIUM
                    </text>
                    <rect x="75" y="75" width="90" height="7" rx="1" fill="#8C6239" />
                    <rect x="85" y="58" width="10" height="17" rx="2" fill="#E30613" />
                    <rect x="105" y="58" width="10" height="17" rx="2" fill="#FFFFFF" />
                    <rect x="125" y="58" width="10" height="17" rx="2" fill="#1E1E24" />
                    <rect x="145" y="58" width="10" height="17" rx="2" fill="#E30613" />
                    <rect x="73" y="115" width="94" height="7" rx="1" fill="#8C6239" />
                    <rect x="83" y="98" width="10" height="17" rx="2" fill="#FFFFFF" />
                    <rect x="103" y="98" width="10" height="17" rx="2" fill="#E30613" />
                    <rect x="123" y="98" width="10" height="17" rx="2" fill="#FFFFFF" />
                    <rect x="143" y="98" width="10" height="17" rx="2" fill="#1E1E24" />
                  </svg>
                )}

                {item.id === "litografia-catalogos" && (
                  <svg viewBox="0 0 240 180" fill="none" className="h-full max-h-40 group-hover:scale-105 transition-transform duration-500">
                    <polygon points="40,140 100,50 190,70 130,160" fill="#1C1C24" stroke="#333340" strokeWidth="2" />
                    <polygon points="55,145 115,55 205,75 145,165" fill="#111116" stroke="#444455" strokeWidth="1.5" />
                    <rect x="100" y="80" width="50" height="3" fill="#E30613" />
                    <rect x="100" y="90" width="35" height="2" fill="#888899" />
                    <rect x="100" y="96" width="40" height="2" fill="#888899" />
                    <circle cx="150" cy="120" r="12" fill="#E30613" opacity="0.8" />
                  </svg>
                )}
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
