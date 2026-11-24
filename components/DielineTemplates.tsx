"use client";

import React, { useState } from "react";
import { Download, Ruler, Eye, Check, X, CheckSquare, Square, Sparkles } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";
import confetti from "canvas-confetti";

interface DielineItem {
  id: string;
  name: string;
  category: string;
  dimensions: string;
  scale: string;
  bleed: string;
  format: string;
  weight: string;
  svgContent: string;
}

export function DielineTemplates() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<DielineItem | null>(null);

  // Interactive Preflight Checklist State
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    curvas: true,
    cmyk: false,
    dpi: false,
    sangrado: true,
    capas: false,
  });

  const checklistItems = [
    { id: "curvas", label: "Textos en curvas / contornos", shortcut: "Ctrl + Shift + O", tip: "Evita sustitución accidental de fuentes tipográficas" },
    { id: "cmyk", label: "Espacio de color CMYK (FOGRA39)", shortcut: "Sin colores RGB", tip: "Garantiza fidelidad cromática sin corrimiento" },
    { id: "dpi", label: "Imágenes incrustadas a 300 DPI", shortcut: "Escala 1:1", tip: "Máxima nitidez en tramado litográfico e impresión UV" },
    { id: "sangrado", label: "Sangría perimetral de 5 mm", shortcut: "Bleed exterior", tip: "Evita filos blancos durante el corte y guillotina" },
    { id: "capas", label: "Capa de troquel en tinta spot", shortcut: "Nombre: DIE-LINE", tip: "Corte perimetral en rojo y hendidos en azul punteado" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const isAllChecked = checkedCount === checklistItems.length;

  const toggleChecklist = (id: string) => {
    triggerHaptic(10);
    setChecklist((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const newCount = Object.values(next).filter(Boolean).length;
      if (newCount === checklistItems.length) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#E30613", "#111827", "#10B981"],
        });
      }
      return next;
    });
  };

  const templates: DielineItem[] = [
    {
      id: "pop-piso-160",
      name: "Exhibidor POP de Piso Modular",
      category: "Material POP",
      dimensions: "160 cm x 55 cm x 40 cm",
      scale: "1:1 (Escala Real)",
      bleed: "5 mm perimetral",
      format: ".AI & .PDF (Curvas)",
      weight: "Plantilla 4.2 MB",
      svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="800" height="1200">
        <rect width="800" height="1200" fill="#0f172a"/>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="800" height="1200" fill="url(#grid)"/>
        <text x="400" y="50" font-family="Montserrat, Arial" font-size="20" font-weight="900" text-anchor="middle" fill="#E30613">PLANTILLA DE TROQUEL - EXHIBIDOR POP 160x55cm</text>
        <text x="400" y="80" font-family="monospace" font-size="12" text-anchor="middle" fill="#94a3b8">Impresos Americana S.A.S. • Capas: Rojo (Corte) / Azul (Hendido)</text>
        <rect x="100" y="120" width="600" height="1000" fill="none" stroke="#E30613" stroke-width="2.5"/>
        <line x1="100" y1="350" x2="700" y2="350" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8,6"/>
        <line x1="100" y1="650" x2="700" y2="650" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8,6"/>
        <line x1="100" y1="950" x2="700" y2="950" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8,6"/>
      </svg>`,
    },
    {
      id: "caja-rigida-imantada",
      name: "Caja Rígida Imantada con Solapa",
      category: "Empaques de Lujo",
      dimensions: "25 cm x 20 cm x 8 cm",
      scale: "1:1 (Escala Real)",
      bleed: "5 mm perimetral",
      format: ".AI & .PDF (Curvas)",
      weight: "Plantilla 2.8 MB",
      svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
        <rect width="800" height="800" fill="#0f172a"/>
        <defs>
          <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="800" height="800" fill="url(#grid2)"/>
        <text x="400" y="50" font-family="Montserrat, Arial" font-size="20" font-weight="900" text-anchor="middle" fill="#E30613">TROQUEL CAJA RIGIDA IMANTADA 25x20x8cm</text>
        <rect x="150" y="150" width="500" height="500" fill="none" stroke="#E30613" stroke-width="2.5"/>
        <rect x="250" y="250" width="300" height="300" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8,6"/>
      </svg>`,
    },
    {
      id: "carpeta-corporativa",
      name: "Carpeta Corporativa con Bolsillo Troquelado",
      category: "Litografía Comercial",
      dimensions: "23 cm x 31 cm (Cerrada)",
      scale: "1:1 (Escala Real)",
      bleed: "3 mm perimetral",
      format: ".AI & .PDF (Curvas)",
      weight: "Plantilla 1.9 MB",
      svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
        <rect width="1000" height="700" fill="#0f172a"/>
        <defs>
          <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="1000" height="700" fill="url(#grid3)"/>
        <text x="500" y="50" font-family="Montserrat, Arial" font-size="20" font-weight="900" text-anchor="middle" fill="#E30613">TROQUEL CARPETA CORPORATIVA CON PORTA-TARJETA</text>
        <rect x="100" y="100" width="800" height="500" fill="none" stroke="#E30613" stroke-width="2.5"/>
        <line x1="500" y1="100" x2="500" y2="600" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8,6"/>
      </svg>`,
    },
    {
      id: "rollup-85-200",
      name: "Pendón Roll-Up de Aluminio",
      category: "Gran Formato",
      dimensions: "85 cm x 200 cm",
      scale: "1:10 o 1:1 a 150 DPI",
      bleed: "10 mm superior / 50 mm base",
      format: ".AI & .PDF",
      weight: "Plantilla 1.4 MB",
      svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 900" width="400" height="900">
        <rect width="400" height="900" fill="#0f172a"/>
        <defs>
          <pattern id="grid4" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="400" height="900" fill="url(#grid4)"/>
        <text x="200" y="40" font-family="Montserrat, Arial" font-size="14" font-weight="900" text-anchor="middle" fill="#E30613">PLANTILLA ROLL-UP 85x200cm</text>
        <rect x="50" y="60" width="300" height="780" fill="none" stroke="#E30613" stroke-width="2.5"/>
      </svg>`,
    },
  ];

  const handleDownload = (tpl: DielineItem) => {
    triggerHaptic(12);
    const blob = new Blob([tpl.svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Troquel_Impresos_Americana_${tpl.id}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(tpl.id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <section id="plantillas" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E30613] font-bold block mb-2">
            CENTRO DE DESCARGAS DE PREPRENSA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-none mb-4">
            PLANTILLAS Y PLANOS DE TROQUEL
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Descarga planos mecánicos aprobados para producción industrial. Listos con guías
            de corte, líneas de hendido y áreas de sangrado para Adobe Illustrator y PDF.
          </p>
        </div>

        {/* Templates Grid with Blueprint Preview & Instant Download */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="p-6 rounded-2xl bg-white border border-zinc-200 hover:border-[#E30613]/50 transition-all flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#E30613] font-bold uppercase tracking-wider block">
                    {tpl.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic(8);
                      setPreviewTemplate(tpl);
                    }}
                    className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                    title="Vista previa del plano técnico"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-montserrat font-bold text-base text-zinc-900 group-hover:text-[#E30613] transition-colors mb-3">
                  {tpl.name}
                </h3>

                <div className="space-y-1.5 text-xs text-zinc-600 font-mono mb-6">
                  <div className="flex items-center gap-1.5 text-zinc-600">
                    <Ruler className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Medidas: {tpl.dimensions}</span>
                  </div>
                  <div>• Escala: {tpl.scale}</div>
                  <div>• Sangrado: {tpl.bleed}</div>
                  <div>• Formato: {tpl.format}</div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleDownload(tpl)}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-[#E30613] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-95"
                >
                  {downloadSuccess === tpl.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>¡Descargado!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                      <span>Descargar Troquel</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic(8);
                    setPreviewTemplate(tpl);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-600 font-montserrat text-[11px] font-semibold border border-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3 h-3 text-zinc-400" />
                  <span>Ver Esquema Técnico</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Preflight Checklist Component */}
        <div className="rounded-3xl bg-zinc-900 text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-800 text-[10px] font-mono font-bold text-red-400 mb-2">
                <Sparkles className="w-3 h-3 text-[#E30613]" />
                CHECKLIST DE PREPRENSA INTERACTIVO
              </div>
              <h3 className="text-xl sm:text-2xl font-montserrat font-black uppercase tracking-tight text-white">
                Verificación Pre-Vuelo para Salida a Planchas & Mesa Zünd
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
                Marca cada requisito técnico antes de enviar tu arte final para asegurar cero errores de impresión y calibración.
              </p>
            </div>

            {/* Live Progress Ring */}
            <div className="shrink-0 flex items-center gap-3 bg-zinc-800/80 px-4 py-3 rounded-2xl border border-zinc-700/80">
              <div className="text-right font-mono">
                <span className="text-lg font-black text-white">{checkedCount} / {checklistItems.length}</span>
                <span className="text-[10px] text-zinc-400 block uppercase">
                  {isAllChecked ? "100% Listo" : "Requisitos"}
                </span>
              </div>
              <div className={`w-3 h-3 rounded-full ${isAllChecked ? "bg-emerald-500 animate-ping" : "bg-[#E30613]"}`} />
            </div>
          </div>

          {/* Checklist Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-6 relative z-10">
            {checklistItems.map((item) => {
              const isChecked = checklist[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                      : "bg-zinc-800/50 border-zinc-700/70 hover:border-zinc-500 text-zinc-300"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-zinc-500" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-montserrat font-bold flex items-center gap-2">
                      <span className={isChecked ? "line-through text-zinc-400" : "text-white"}>{item.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 block mt-0.5">
                      {item.shortcut} • {item.tip}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 relative z-10">
            <span>Planta Litográfica & Gran Formato • San Nicolás, Cali</span>
            <a
              href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20tengo%20un%20archivo%20listo%20con%20el%20checklist%20de%20preprensa%20completo%20para%20revisi%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white text-zinc-900 font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
            >
              Enviar Archivo por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Blueprint Visual Preview Modal */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4 text-white">
              <div>
                <span className="text-[10px] font-mono text-[#E30613] font-bold uppercase tracking-widest block">
                  ESQUEMA TÉCNICO VECTORIAL
                </span>
                <h3 className="font-montserrat font-bold text-lg text-white">
                  {previewTemplate.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                aria-label="Cerrar modal de troquel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded SVG Blueprint Rendering */}
            <div
              className="w-full h-80 rounded-2xl overflow-hidden bg-slate-950 border border-zinc-800 flex items-center justify-center p-4"
              dangerouslySetInnerHTML={{ __html: previewTemplate.svgContent }}
            />

            <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-mono text-zinc-400">
                {previewTemplate.dimensions} • {previewTemplate.format}
              </span>
              <button
                type="button"
                onClick={() => {
                  handleDownload(previewTemplate);
                  setPreviewTemplate(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#E30613] hover:bg-[#c50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Archivo SVG</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
