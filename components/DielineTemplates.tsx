"use client";

import React, { useState } from "react";
import { Download, AlertTriangle, Ruler } from "lucide-react";

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
        <rect width="800" height="1200" fill="#f8f9fa"/>
        <text x="400" y="50" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" fill="#E30613">PLANTILLA DE TROQUEL - EXHIBIDOR POP 160x55cm</text>
        <text x="400" y="80" font-family="Arial" font-size="12" text-anchor="middle" fill="#555">Impresos Americana S.A.S. • Capas: Rojo (Corte) / Azul punteado (Hendido / Pliegue)</text>
        <rect x="100" y="120" width="600" height="1000" fill="none" stroke="#E30613" stroke-width="2"/>
        <line x1="100" y1="350" x2="700" y2="350" stroke="#0055ff" stroke-width="2" stroke-dasharray="6,4"/>
        <line x1="100" y1="650" x2="700" y2="650" stroke="#0055ff" stroke-width="2" stroke-dasharray="6,4"/>
        <line x1="100" y1="950" x2="700" y2="950" stroke="#0055ff" stroke-width="2" stroke-dasharray="6,4"/>
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
        <rect width="800" height="800" fill="#f8f9fa"/>
        <text x="400" y="50" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" fill="#E30613">TROQUEL CAJA RIGIDA IMANTADA 25x20x8cm</text>
        <rect x="150" y="150" width="500" height="500" fill="none" stroke="#E30613" stroke-width="2"/>
        <rect x="250" y="250" width="300" height="300" fill="none" stroke="#0055ff" stroke-width="2" stroke-dasharray="6,4"/>
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
        <rect width="1000" height="700" fill="#f8f9fa"/>
        <text x="500" y="50" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" fill="#E30613">TROQUEL CARPETA CORPORATIVA CON PORTA-TARJETA</text>
        <rect x="100" y="100" width="800" height="500" fill="none" stroke="#E30613" stroke-width="2"/>
        <line x1="500" y1="100" x2="500" y2="600" stroke="#0055ff" stroke-width="2" stroke-dasharray="6,4"/>
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
        <rect width="400" height="900" fill="#f8f9fa"/>
        <text x="200" y="40" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#E30613">PLANTILLA ROLL-UP 85x200cm</text>
        <rect x="50" y="60" width="300" height="780" fill="none" stroke="#E30613" stroke-width="2"/>
      </svg>`,
    },
  ];

  const handleDownload = (tpl: DielineItem) => {
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
    <section id="plantillas" className="py-24 bg-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-400 font-bold block mb-2">
            CENTRO DE DESCARGAS DE PREPRENSA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-white tracking-tight leading-none mb-4">
            PLANTILLAS Y PLANOS DE TROQUEL
          </h2>
          <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
            Descarga planos mecánicos aprobados para producción industrial. Listos con guías
            de corte, líneas de hendido y áreas de sangrado para Adobe Illustrator y PDF.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="p-6 rounded-2xl bg-[#181820] border border-white/10 hover:border-red-500/50 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block mb-1">
                  {tpl.category}
                </span>
                <h3 className="font-montserrat font-bold text-base text-white mb-3">
                  {tpl.name}
                </h3>

                <div className="space-y-1.5 text-xs text-zinc-200 font-mono mb-6">
                  <div className="flex items-center gap-1.5 text-zinc-200">
                    <Ruler className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Medidas: {tpl.dimensions}</span>
                  </div>
                  <div>• Escala: {tpl.scale}</div>
                  <div>• Sangrado: {tpl.bleed}</div>
                  <div>• Formato: {tpl.format}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDownload(tpl)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#22222B] hover:bg-[#E30613] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group"
              >
                <Download className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
                <span>
                  {downloadSuccess === tpl.id ? "¡Descargado!" : "Descargar Troquel"}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Technical Checklist Box */}
        <div className="rounded-2xl bg-[#16161D] border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#E30613]/10 text-red-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-montserrat font-bold text-sm text-white uppercase">
                Guía Rápida de Envío de Archivos a Máquina
              </h4>
              <p className="text-xs text-zinc-200 mt-1 max-w-2xl leading-relaxed">
                1. Textos convertidos a curvas (Ctrl+Shift+O) • 2. Perfil de color CMYK FOGRA39 (sin RGB ni tintas directas sin especificar) • 3. Imágenes incrustadas a 300 DPI • 4. Sangría mínima de 5 mm por lado.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20necesito%20ayuda%20del%20departamento%20de%20dise%C3%B1o%20con%20un%20plano%20de%20troquel."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#1E1E26] hover:bg-white/10 text-white font-montserrat font-semibold text-xs border border-white/15 transition-colors"
          >
            Asistencia con Preprensa
          </a>
        </div>
      </div>
    </section>
  );
}
