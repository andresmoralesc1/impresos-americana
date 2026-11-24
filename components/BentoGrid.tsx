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
  imageSrc: string;
  imageAlt: string;
  size: "large" | "medium" | "small";
  gradient: string;
  badge?: string;
  description: string;
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
      id: "stand-modular",
      title: "Stands & Exhibidores Modulares de Punto de Venta",
      category: "Material POP",
      categoryLabel: "Material POP & Stands",
      specs: ["Cartón Corrugado 4mm", "Cabezote Curvo UV", "Ensamble Sin Herramientas"],
      clientSector: "Consumo Masivo & Retail",
      imageSrc: "/images/real/exhibidor-3d-stand.jpg",
      imageAlt: "Exhibidor modular de piso en cartón corrugado estructural con bandejas reforzadas",
      size: "large",
      gradient: "from-white to-zinc-50/50",
      badge: "Destacado POP",
      description:
        "Ingeniería estructural en cartón corrugado de alta densidad con capacidad de carga distribuida, impresión litográfica directa y barniz de protección UV.",
    },
    {
      id: "bebidas",
      title: "Exhibidores de Piso para Bebidas & Licores",
      category: "Material POP",
      categoryLabel: "Material POP Estructural",
      specs: ["Capacidad 45 kg por Nivel", "Tratamiento Anti-Humedad", "Troquelado de Precisión"],
      clientSector: "Bebidas & Alimentos",
      imageSrc: "/images/real/exhibidor-bebidas.jpg",
      imageAlt: "Exhibidor de piso reforzado para botellas y licores fabricado en Cali",
      size: "medium",
      gradient: "from-white to-zinc-50/50",
      badge: "Alta Resistencia",
      description:
        "Estructura reforzada con tratamiento hidrófugo para resistir condensación y peso elevado. Cero pandeo tras periodos prolongados de exhibición en punto de venta.",
    },
    {
      id: "acrilico",
      title: "Señalética Corporativa & Acrílico Cristal",
      category: "Gran Formato",
      categoryLabel: "Gran Formato & Acrílico",
      specs: ["Acrílico Cristal 6mm", "Cama Plana UV 1440 DPI", "Distanciadores en Acero Inoxidable"],
      clientSector: "Banca, Salud & Corporativo",
      imageSrc: "/images/real/senaletica-acrilico.jpg",
      imageAlt: "Señalética corporativa en acrílico cristal cortado con láser CNC e impresión UV",
      size: "small",
      gradient: "from-white to-zinc-50/50",
      badge: "Acabado Premium",
      description:
        "Corte láser de bordes pulidos y pulido a la llama con impresión de tinta UV flexible en reverso. Máxima durabilidad en interiores y áreas de recepción.",
    },
    {
      id: "kit-corporativo",
      title: "Kits de Bienvenida & Merchandising Ejecutivo",
      category: "Merchandising",
      categoryLabel: "Merchandising Corporativo",
      specs: ["Caja Rígida de Cierre Imantado", "Libreta Cuero Sintético", "Termo Aislado con Grabado Láser"],
      clientSector: "Tecnología & Banca",
      imageSrc: "/images/real/kit-corporativo.jpg",
      imageAlt: "Kit de bienvenida y merchandising corporativo con termo, libreta y bolígrafo grabado",
      size: "small",
      gradient: "from-white to-zinc-50/50",
      badge: "Edición Ejecutiva",
      description:
        "Conjunto de bienvenida premium personalizado con estampado metalizado, grabado láser de fibra y estuche de cartón rígido con forro plastificado mate.",
    },
    {
      id: "litografia-catalogos",
      title: "Papelería Corporativa & Carpetas de Presentación",
      category: "Litografía",
      categoryLabel: "Litografía Comercial",
      specs: ["Propalcote 300g", "Bolsillo Troquelado", "Plastificado Mate & Brillo UV"],
      clientSector: "Automotriz & Moda",
      imageSrc: "/images/real/litografia-papeleria.jpg",
      imageAlt: "Carpetas corporativas y papelería litográfica de alta gama producida en Cali",
      size: "medium",
      gradient: "from-white to-zinc-50/50",
      badge: "Color Certificado",
      description:
        "Impresión offset con fidelidad de color según estándares de manual de marca. Acabados especiales en barniz sectorizado y troqueles funcionales para tarjetas de presentación.",
    },
    {
      id: "esferos-publicitarios",
      title: "Artículos Publicitarios & Bolígrafos Grabados",
      category: "Merchandising",
      categoryLabel: "Merchandising & Artículos Publicitarios",
      specs: ["Cuerpo Metálico Soft-Touch", "Grabado Láser de Fibra", "Tinta Gel de Alta Duración"],
      clientSector: "Campañas Institucionales & Eventos",
      imageSrc: "/images/real/esferos-metalicos.jpg",
      imageAlt: "Bolígrafos y esferos metálicos grabados con tecnología láser de fibra óptica",
      size: "large",
      gradient: "from-white to-zinc-50/50",
      badge: "Grabado Láser",
      description:
        "Bolígrafos metálicos de gama ejecutiva con grabado permanente por ablación láser. Presentación en estuches individuales o en paquetes corporativos por volumen.",
    },
  ];

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="proyectos" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#E30613]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-mono font-bold text-[#E30613] mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E30613]" />
            PRODUCCIONES REALES EN PUNTO DE VENTA
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-none mb-4">
            NUESTRO TRABAJO EN ACCIÓN
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal">
            Fabricaciones e instalaciones industriales para exhibición comercial, stands modulares, eventos feriales y dotación corporativa en toda Colombia.
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

        {/* Bento Grid layout with real photography */}
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

        {/* Bottom Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#8F0008] via-[#E30613] to-[#B3000B] p-6 sm:p-8 shadow-[0_15px_40px_rgba(227,6,19,0.35)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-montserrat font-black text-white uppercase tracking-tight leading-tight">
              ¿LISTO PARA EXHIBIR TU MARCA CON CALIDAD INDUSTRIAL?
            </h3>
            <p className="text-white/90 text-xs sm:text-sm font-medium mt-1.5 max-w-xl">
              Ingeniería estructural, prototipado rápido en 24h y despacho coordinado desde Cali a cualquier ciudad de Colombia.
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
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-zinc-200 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
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
                className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors shrink-0"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Modal Image */}
              <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
                <Image
                  src={selectedProject.imageSrc}
                  alt={selectedProject.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {selectedProject.description}
              </p>

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
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-montserrat font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                  <span>Cotizar por WhatsApp</span>
                </a>

                <Link
                  href="/cotizador"
                  className="py-3.5 px-6 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
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

      {/* Real Photography Container */}
      <div
        className={`relative w-full ${isLarge ? "h-64 sm:h-72" : "h-56"} bg-zinc-100 overflow-hidden flex items-center justify-center p-3 border-b border-zinc-100 cursor-pointer`}
        onClick={onSelect}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900/5">
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Badge top-right */}
        {project.badge && (
          <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md border border-zinc-200 px-2.5 py-1 rounded-md text-[10px] font-montserrat font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
            {project.badge}
          </div>
        )}

        {/* Copy Specs Button top-left */}
        <button
          type="button"
          onClick={onCopySpecs}
          title="Copiar ficha técnica al portapapeles"
          className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md border border-zinc-200 px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 flex items-center gap-1.5 shadow-sm transition-colors"
        >
          {isCopied ? (
            <>
              <Check className="w-3 h-3 text-[#E30613]" />
              <span className="text-[#E30613] font-bold">Copiado</span>
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

        {/* Bottom CTA to view details */}
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
