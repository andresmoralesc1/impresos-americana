"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

type ProjectCategory = "Todos" | "Material POP" | "Gran Formato" | "Litografía" | "Merchandising";

interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  specs: string[];
  clientSector: string;
  imageAlt: string;
  size: "large" | "medium" | "small";
  gradient: string;
  badge?: string;
}

export function BentoGrid() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Todos");

  const categories: ProjectCategory[] = [
    "Todos",
    "Material POP",
    "Gran Formato",
    "Litografía",
    "Merchandising",
  ];

  const projects: ProjectItem[] = [
    {
      id: "supermercados",
      title: "Campaña de Lanzamiento - Supermercados",
      category: "Material POP",
      categoryLabel: "Material POP & Gran Formato",
      specs: ["Cartón Corrugado 4mm", "Góndolas & Cabezotes", "Barniz UV Brillante"],
      clientSector: "Consumo Masivo / Retail Nacional",
      imageAlt: "Exhibidores de supermercado y vallas de gran formato para cadena de retail",
      size: "large",
      gradient: "from-zinc-900 via-neutral-900 to-black",
      badge: "Caso de Éxito",
    },
    {
      id: "bebidas",
      title: "Exhibidores de Piso para Bebidas",
      category: "Material POP",
      categoryLabel: "Material POP",
      specs: ["Capacidad 45 kg", "Troquelado Modular", "Fácil Armado Sin Pegante"],
      clientSector: "Bebidas & Licores",
      imageAlt: "Exhibidores de piso en cartón corrugado estructural con logo impreso",
      size: "medium",
      gradient: "from-stone-900 via-zinc-900 to-black",
      badge: "Alta Resistencia",
    },
    {
      id: "acrilico",
      title: "Señalética e Impresión en Acrílico",
      category: "Gran Formato",
      categoryLabel: "Gran Formato",
      specs: ["Acrílico Cristal 6mm", "Cama Plana UV", "Corte Láser CNC"],
      clientSector: "Banca & Corporativo",
      imageAlt: "Señalética corporativa con acabados de acrílico cristal y corte láser",
      size: "small",
      gradient: "from-slate-900 via-zinc-900 to-black",
      badge: "PREMIUM IMPRESIÓN",
    },
    {
      id: "kit-corporativo",
      title: "Kit Corporativo de Fin de Año",
      category: "Merchandising",
      categoryLabel: "Merchandising",
      specs: ["Caja Rígida Imantada", "Agenda Cuero Ecológico", "Mug Cerámica Mate"],
      clientSector: "Tecnología & Finanzas",
      imageAlt: "Kit de merchandising corporativo negro mate con acentos rojos y termo",
      size: "small",
      gradient: "from-red-950/40 via-zinc-900 to-black",
      badge: "Edición Limitada",
    },
    {
      id: "litografia-catalogos",
      title: "Catálogos de Lujo & Papelería Ejecutiva",
      category: "Litografía",
      categoryLabel: "Litografía",
      specs: ["Propalcote 300g", "Foil Estampado Oro", "Encuadernación Hot-Melt"],
      clientSector: "Automotriz & Moda",
      imageAlt: "Catálogos litográficos con acabados de lujo y barniz sectorizado",
      size: "medium",
      gradient: "from-neutral-900 via-zinc-900 to-black",
      badge: "Color Certificado",
    },
    {
      id: "vallas-gran-formato",
      title: "Vallas & Fachadas Comerciales",
      category: "Gran Formato",
      categoryLabel: "Gran Formato",
      specs: ["Lona Banner 13oz Blackout", "Tintas UV Exterior 3 Años", "Soldadura Térmica"],
      clientSector: "Inmobiliario & Centros Comerciales",
      imageAlt: "Impresión de gran formato y vallas publicitarias en lona de alta durabilidad",
      size: "large",
      gradient: "from-zinc-950 via-zinc-900 to-black",
      badge: "Resistencia UV",
    },
  ];

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="proyectos" className="py-24 bg-[#121212] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#E30613]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header matching Image 2 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/40 text-xs font-mono font-bold text-red-300 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E30613]" />
            CASOS REALES EN RETAIL COLOMBIANO
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-white tracking-tight leading-none mb-4">
            NUESTRO TRABAJO EN ACCIÓN
          </h2>
          <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
            Fabricaciones e instalaciones reales en cadenas de supermercados, retail farmacéutico, eventos feriales y sedes corporativas en toda Colombia.
          </p>

          {/* Category Filter Pills (Mobile horizontal scroll + 44px touch target) */}
          <div className="flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 mt-8 overflow-x-auto pb-2 sm:pb-0 px-1 -mx-4 sm:mx-0 px-4 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    triggerHaptic(10);
                    setActiveCategory(cat);
                  }}
                  className={`px-5 py-2.5 min-h-[44px] shrink-0 rounded-full text-xs font-montserrat font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[#E30613] text-white shadow-[0_0_15px_rgba(227,6,19,0.5)] scale-105"
                      : "bg-[#1E1E24] text-zinc-300 hover:text-white hover:bg-[#282832] border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const isLarge = project.size === "large" && index === 0;

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative rounded-2xl bg-gradient-to-b ${project.gradient} border border-white/10 hover:border-[#E30613]/50 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between corner-slash-red ${
                    isLarge ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  {/* Decorative corner slash in bottom right */}
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-style-solid border-b-[34px] border-l-[34px] border-b-[#E30613] border-l-transparent z-10 pointer-events-none" />

                  {/* Visual Simulation Stage representing the physical product */}
                  <div className={`relative w-full ${isLarge ? "h-64 sm:h-72" : "h-56"} bg-[#15151B] overflow-hidden flex items-center justify-center p-6 border-b border-white/5`}>
                    {/* Realistic Visual Mockup Illustrations */}
                    {project.id === "supermercados" && (
                      <div className="w-full h-full relative flex items-center justify-center">
                        {/* Supermarket gondola header & floor stand setup */}
                        <svg viewBox="0 0 460 220" fill="none" className="w-full h-full max-h-56">
                          {/* Background supermarket shelf lines */}
                          <line x1="20" y1="40" x2="440" y2="40" stroke="#252530" strokeWidth="2" />
                          <line x1="20" y1="90" x2="440" y2="90" stroke="#252530" strokeWidth="2" />
                          <line x1="20" y1="140" x2="440" y2="140" stroke="#252530" strokeWidth="2" />

                          {/* Gondola Endcap display banner */}
                          <rect x="40" y="20" width="160" height="90" rx="4" fill="#E30613" />
                          <rect x="46" y="26" width="148" height="78" rx="2" fill="#181820" />
                          <text x="120" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontFamily="Montserrat" fontWeight="900">
                            PUNTO DE VENTA
                          </text>
                          <text x="120" y="74" textAnchor="middle" fill="#E30613" fontSize="9" fontFamily="Inter" fontWeight="700">
                            IMPACTO NACIONAL
                          </text>

                          {/* Big Floor POP Stand right side */}
                          <path d="M260 50L360 40L380 200L250 210Z" fill="#C50510" />
                          <path d="M280 60L350 50L360 190L270 200Z" fill="#1E1E24" />
                          {/* Shelves */}
                          <polygon points="280,100 350,92 345,108 276,116" fill="#C9A375" />
                          <polygon points="277,140 347,132 342,148 273,156" fill="#C9A375" />
                          <polygon points="274,180 344,172 339,188 270,196" fill="#C9A375" />

                          {/* Overhead billboard / gran formato banner */}
                          <rect x="180" y="10" width="220" height="30" rx="3" fill="#E30613" />
                          <text x="290" y="29" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="Montserrat" fontWeight="800">
                            CAMPAÑA NACIONAL DE VERANO
                          </text>
                        </svg>
                      </div>
                    )}

                    {project.id === "bebidas" && (
                      <div className="w-full h-full relative flex items-center justify-center">
                        <svg viewBox="0 0 240 200" fill="none" className="h-full">
                          {/* Kraft cardboard floor stand for beverages */}
                          <path d="M60 30L180 30L170 190L70 190Z" fill="#B38656" />
                          <path d="M60 30L180 30L175 60H65Z" fill="#E30613" />
                          <text x="120" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Montserrat" fontWeight="800">
                            BEBIDAS PREMIUM
                          </text>
                          {/* Shelf 1 */}
                          <rect x="75" y="90" width="90" height="8" rx="1" fill="#8C6239" />
                          <rect x="85" y="70" width="12" height="20" rx="2" fill="#E30613" />
                          <rect x="105" y="70" width="12" height="20" rx="2" fill="#FFFFFF" />
                          <rect x="125" y="70" width="12" height="20" rx="2" fill="#1E1E24" />
                          <rect x="145" y="70" width="12" height="20" rx="2" fill="#E30613" />
                          {/* Shelf 2 */}
                          <rect x="73" y="140" width="94" height="8" rx="1" fill="#8C6239" />
                          <rect x="83" y="120" width="12" height="20" rx="2" fill="#FFFFFF" />
                          <rect x="103" y="120" width="12" height="20" rx="2" fill="#E30613" />
                          <rect x="123" y="120" width="12" height="20" rx="2" fill="#FFFFFF" />
                          <rect x="143" y="120" width="12" height="20" rx="2" fill="#1E1E24" />
                          {/* Base brand mark */}
                          <text x="120" y="178" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="Montserrat" fontWeight="800">
                            IMPRESOS AMERICANA
                          </text>
                        </svg>
                      </div>
                    )}

                    {project.id === "acrilico" && (
                      <div className="w-full h-full relative flex items-center justify-center">
                        <svg viewBox="0 0 240 180" fill="none" className="h-full">
                          {/* Acrylic stand sign with 3D drop shadow */}
                          <rect x="40" y="30" width="160" height="110" rx="8" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                          {/* Metal standoff bolts */}
                          <circle cx="55" cy="45" r="4" fill="#CCCCCC" />
                          <circle cx="185" cy="45" r="4" fill="#CCCCCC" />
                          <circle cx="55" cy="125" r="4" fill="#CCCCCC" />
                          <circle cx="185" cy="125" r="4" fill="#CCCCCC" />
                          {/* Red brand icon and text printed on acrylic */}
                          <circle cx="85" cy="75" r="10" fill="#E30613" />
                          <text x="105" y="80" fill="#FFFFFF" fontSize="12" fontFamily="Montserrat" fontWeight="800">
                            SEÑALÉTICA UV
                          </text>
                          <text x="105" y="95" fill="#94A3B8" fontSize="8" fontFamily="Inter">
                            Acrílico Cristal 6mm
                          </text>
                          <line x1="60" y1="110" x2="180" y2="110" stroke="#E30613" strokeWidth="2" />
                        </svg>
                      </div>
                    )}

                    {project.id === "kit-corporativo" && (
                      <div className="w-full h-full relative flex items-center justify-center p-2">
                        <Image
                          src="/products/libreta-ejecutiva.jpg"
                          alt="Kit Corporativo de Agendas y Termos Impresos Americana"
                          width={480}
                          height={320}
                          className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {project.id === "litografia-catalogos" && (
                      <div className="w-full h-full relative flex items-center justify-center p-2">
                        <Image
                          src="/products/catalogo-cover.jpg"
                          alt="Catálogo Litográfico Impresos Americana"
                          width={480}
                          height={320}
                          className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}


                    {project.id === "vallas-gran-formato" && (
                      <div className="w-full h-full relative flex items-center justify-center">
                        <svg viewBox="0 0 360 200" fill="none" className="w-full h-full">
                          {/* Highway billboard structure */}
                          <line x1="180" y1="80" x2="180" y2="180" stroke="#444455" strokeWidth="8" />
                          <rect x="60" y="30" width="240" height="90" rx="3" fill="#181820" stroke="#333345" strokeWidth="3" />
                          <rect x="65" y="35" width="230" height="80" fill="#E30613" />
                          <text x="180" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontFamily="Montserrat" fontWeight="900">
                            GRAN FORMATO UV
                          </text>
                          <text x="180" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Inter" fontWeight="600">
                            ALTA RESOLUCIÓN • 1440 DPI
                          </text>
                        </svg>
                      </div>
                    )}

                    {/* Badge top-right */}
                    {project.badge && (
                      <div className="absolute top-3 right-3 bg-[#18181F]/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[10px] font-montserrat font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
                        {project.badge}
                      </div>
                    )}
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
                          {project.categoryLabel}
                        </span>
                        <span className="text-[11px] text-zinc-300 font-mono">
                          {project.clientSector}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-montserrat font-bold text-white group-hover:text-red-400 transition-colors mb-3 leading-snug">
                        {project.title}
                      </h3>

                      {/* Technical Specs tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.specs.map((spec, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2.5 py-1 rounded bg-[#18181F] text-zinc-200 border border-white/10 font-mono"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA to quote this exact product */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <a
                        href="#cotizador"
                        className="inline-flex items-center gap-1.5 text-xs font-montserrat font-bold uppercase tracking-wider text-zinc-100 group-hover:text-white transition-colors"
                      >
                        <span>Cotizar Proyecto Similar</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                      <span className="text-[11px] text-zinc-300 font-mono">
                        Producción Industrial
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner matching Image 2 */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#8F0008] via-[#E30613] to-[#B3000B] p-6 sm:p-8 shadow-[0_15px_40px_rgba(227,6,19,0.35)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-montserrat font-black text-white uppercase tracking-tight leading-tight">
              ¿LISTO PARA EXHIBIR TU MARCA EN PUNTOS DE VENTA NACIONALES?
            </h3>
            <p className="text-white text-sm font-medium mt-1 max-w-xl">
              Ingeniería de empaque, prototipado estructural en 24h y despacho industrial desde Cali a toda Colombia.
            </p>
          </div>

          <a
            href="#cotizador"
            className="relative z-10 shrink-0 bg-white hover:bg-zinc-100 text-[#121212] font-montserrat font-black text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
          >
            Cotizar Producción Industrial
          </a>
        </div>
      </div>
    </section>
  );
}
