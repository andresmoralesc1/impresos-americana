"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Copy, Check, X, MessageCircle, Sparkles } from "lucide-react";
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
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [copiedProjectId, setCopiedProjectId] = useState<string | null>(null);

  const categories: ProjectCategory[] = [
    "Todos",
    "Material POP",
    "Gran Formato",
    "Litografía",
    "Merchandising",
  ];

  const handleCopySpecs = (project: ProjectItem, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic(10);
    const text = `${project.title} (${project.categoryLabel}) - Sector: ${project.clientSector} - Materiales: ${project.specs.join(", ")}`;
    navigator.clipboard.writeText(text);
    setCopiedProjectId(project.id);
    setTimeout(() => setCopiedProjectId(null), 2000);
  };

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
      gradient: "from-white to-zinc-50/50",
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
      gradient: "from-white to-zinc-50/50",
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
      gradient: "from-white to-zinc-50/50",
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
      gradient: "from-white to-zinc-50/50",
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
      gradient: "from-white to-zinc-50/50",
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
      gradient: "from-white to-zinc-50/50",
      badge: "Resistencia UV",
    },
  ];

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="proyectos" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#E30613]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-mono font-bold text-[#E30613] mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E30613]" />
            CASOS REALES EN RETAIL COLOMBIANO
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-none mb-4">
            NUESTRO TRABAJO EN ACCIÓN
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal">
            Fabricaciones e instalaciones reales en cadenas de supermercados, retail farmacéutico, eventos feriales y sedes corporativas en toda Colombia.
          </p>

          {/* Category Filter Pills with Item Counts */}
          <div className="flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 mt-8 overflow-x-auto pb-2 sm:pb-0 px-1 -mx-4 sm:mx-0 px-4 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === "Todos"
                ? projects.length
                : projects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    triggerHaptic(10);
                    setActiveCategory(cat);
                  }}
                  className={`px-4 sm:px-5 py-2.5 min-h-[44px] shrink-0 rounded-full text-xs font-montserrat font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "bg-[#E30613] text-white shadow-[0_4px_16px_rgba(227,6,19,0.3)] scale-[1.02]"
                      : "bg-zinc-100/90 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80 border border-zinc-200"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid layout with interactive Cursor Spotlight */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const isLarge = project.size === "large" && index === 0;
              return (
                <BentoCard
                  key={project.id}
                  project={project}
                  isLarge={isLarge}
                  onSelect={() => {
                    triggerHaptic(10);
                    setSelectedProject(project);
                  }}
                  onCopySpecs={(e) => handleCopySpecs(project, e)}
                  isCopied={copiedProjectId === project.id}
                />
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

          <Link
            href="/cotizador"
            className="relative z-10 shrink-0 bg-white hover:bg-zinc-100 text-[#121212] font-montserrat font-black text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
          >
            Cotizar Producción Industrial
          </Link>
        </div>
      </div>

      {/* Rich Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-zinc-200 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E30613] font-bold block">
                  {selectedProject.categoryLabel} • {selectedProject.clientSector}
                </span>
                <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-zinc-950 mt-0.5">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                <span className="text-xs font-mono font-bold uppercase text-zinc-500 block mb-2">
                  Especificaciones Técnicas & Materiales
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.specs.map((sp, idx) => (
                    <span key={idx} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 font-semibold shadow-2xs">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-zinc-500 block mb-0.5">Sector Cliente:</span>
                  <span className="font-bold text-zinc-900">{selectedProject.clientSector}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-zinc-500 block mb-0.5">Planta Fabricación:</span>
                  <span className="font-bold text-zinc-900">Cali (San Nicolás)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20estoy%20interesado%20en%20un%20proyecto%20similar%20a%20${encodeURIComponent(selectedProject.title)}%20(${encodeURIComponent(selectedProject.categoryLabel)}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-montserrat font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Cotizar por WhatsApp</span>
                </a>

                <Link
                  href="/cotizador"
                  className="py-3.5 px-6 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ir al Cotizador 3D</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function BentoCard({
  project,
  isLarge,
  onSelect,
  onCopySpecs,
  isCopied,
}: {
  project: ProjectItem;
  isLarge: boolean;
  onSelect: () => void;
  onCopySpecs: (e: React.MouseEvent) => void;
  isCopied: boolean;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-3xl bg-white border border-zinc-200/90 hover:border-[#E30613]/50 transition-all duration-300 overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 flex flex-col justify-between corner-slash-red ${
        isLarge ? "md:col-span-2 lg:col-span-2" : ""
      }`}
    >
      {/* Subtle cursor spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(227, 6, 19, 0.05), transparent 45%)`,
        }}
      />

      {/* Decorative corner slash in bottom right */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-style-solid border-b-[34px] border-l-[34px] border-b-[#E30613] border-l-transparent z-10 pointer-events-none" />

      {/* Visual Simulation Stage */}
      <div className={`relative w-full ${isLarge ? "h-64 sm:h-72" : "h-56"} bg-zinc-50 overflow-hidden flex items-center justify-center p-6 border-b border-zinc-100`}>
        {project.id === "supermercados" && (
          <div className="w-full h-full relative flex items-center justify-center">
            <svg viewBox="0 0 460 220" fill="none" className="w-full h-full max-h-56">
              <line x1="20" y1="40" x2="440" y2="40" stroke="#E2E8F0" strokeWidth="2" />
              <line x1="20" y1="90" x2="440" y2="90" stroke="#E2E8F0" strokeWidth="2" />
              <line x1="20" y1="140" x2="440" y2="140" stroke="#E2E8F0" strokeWidth="2" />

              <rect x="40" y="20" width="160" height="90" rx="4" fill="#E30613" />
              <rect x="46" y="26" width="148" height="78" rx="2" fill="#0F172A" />
              <text x="120" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontFamily="Montserrat" fontWeight="900">
                PUNTO DE VENTA
              </text>
              <text x="120" y="74" textAnchor="middle" fill="#E30613" fontSize="9" fontFamily="Inter" fontWeight="700">
                IMPACTO NACIONAL
              </text>

              <path d="M260 50L360 40L380 200L250 210Z" fill="#C50510" />
              <path d="M280 60L350 50L360 190L270 200Z" fill="#334155" />
              <polygon points="280,100 350,92 345,108 276,116" fill="#D97706" />
              <polygon points="277,140 347,132 342,148 273,156" fill="#D97706" />
              <polygon points="274,180 344,172 339,188 270,196" fill="#D97706" />

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
              <path d="M60 30L180 30L170 190L70 190Z" fill="#D97706" />
              <path d="M60 30L180 30L175 60H65Z" fill="#E30613" />
              <text x="120" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Montserrat" fontWeight="800">
                BEBIDAS PREMIUM
              </text>
              <rect x="75" y="90" width="90" height="8" rx="1" fill="#B45309" />
              <rect x="85" y="70" width="12" height="20" rx="2" fill="#E30613" />
              <rect x="105" y="70" width="12" height="20" rx="2" fill="#FFFFFF" />
              <rect x="125" y="70" width="12" height="20" rx="2" fill="#1E293B" />
              <rect x="145" y="70" width="12" height="20" rx="2" fill="#E30613" />
              <rect x="73" y="140" width="94" height="8" rx="1" fill="#B45309" />
              <rect x="83" y="120" width="12" height="20" rx="2" fill="#FFFFFF" />
              <rect x="103" y="120" width="12" height="20" rx="2" fill="#E30613" />
              <rect x="123" y="120" width="12" height="20" rx="2" fill="#FFFFFF" />
              <rect x="143" y="120" width="12" height="20" rx="2" fill="#1E293B" />
              <text x="120" y="178" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="Montserrat" fontWeight="800">
                IMPRESOS AMERICANA
              </text>
            </svg>
          </div>
        )}

        {project.id === "acrilico" && (
          <div className="w-full h-full relative flex items-center justify-center">
            <svg viewBox="0 0 240 180" fill="none" className="h-full">
              <rect x="40" y="30" width="160" height="110" rx="8" fill="rgba(241,245,249,0.8)" stroke="#CBD5E1" strokeWidth="2" />
              <circle cx="55" cy="45" r="4" fill="#94A3B8" />
              <circle cx="185" cy="45" r="4" fill="#94A3B8" />
              <circle cx="55" cy="125" r="4" fill="#94A3B8" />
              <circle cx="185" cy="125" r="4" fill="#94A3B8" />
              <circle cx="85" cy="75" r="10" fill="#E30613" />
              <text x="105" y="80" fill="#0F172A" fontSize="12" fontFamily="Montserrat" fontWeight="800">
                SEÑALÉTICA UV
              </text>
              <text x="105" y="95" fill="#64748B" fontSize="8" fontFamily="Inter">
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
              <line x1="180" y1="80" x2="180" y2="180" stroke="#94A3B8" strokeWidth="8" />
              <rect x="60" y="30" width="240" height="90" rx="3" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
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
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-zinc-200 px-2.5 py-1 rounded-md text-[10px] font-montserrat font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
            {project.badge}
          </div>
        )}

        {/* Copy Specs Button top-left */}
        <button
          type="button"
          onClick={onCopySpecs}
          title="Copiar ficha técnica al portapapeles"
          className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-zinc-200 px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 flex items-center gap-1.5 shadow-sm transition-colors"
        >
          {isCopied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-zinc-500" />
              <span>Copiar Ficha</span>
            </>
          )}
        </button>
      </div>

      {/* Card Content Footer */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E30613] font-bold">
              {project.categoryLabel}
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">
              {project.clientSector}
            </span>
          </div>

          <h3
            onClick={onSelect}
            className="text-lg sm:text-xl font-montserrat font-bold text-zinc-950 group-hover:text-[#E30613] transition-colors mb-3 leading-snug cursor-pointer"
          >
            {project.title}
          </h3>

          {/* Technical Specs tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.specs.map((spec, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/80 font-mono"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA to quote this exact product */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onSelect}
            className="inline-flex items-center gap-1.5 text-xs font-montserrat font-bold uppercase tracking-wider text-zinc-700 hover:text-[#E30613] transition-colors"
          >
            <span>Ver Ficha Técnica</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#E30613] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <span className="text-[11px] text-zinc-400 font-mono">
            Producción Industrial
          </span>
        </div>
      </div>
    </motion.div>
  );
}
