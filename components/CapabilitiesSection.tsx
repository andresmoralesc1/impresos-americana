"use client";

import React, { useState } from "react";
import { CheckCircle, Copy, Check, ArrowRight } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

export function CapabilitiesSection() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [selectedSubstrateTab, setSelectedSubstrateTab] = useState<string>("todos");

  const handleCopySubstrate = (name: string) => {
    triggerHaptic(10);
    navigator.clipboard.writeText(name);
    setCopiedItem(name);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const machinery = [
    {
      id: "uv-cama-plana",
      name: "Cama Plana UV Industrial (3.20m)",
      brand: "HP Scitex / EFI VUTEk",
      status: "Operación Continua 24h",
      specs: "Impresión directa rígidos hasta 50mm (Acrílico, MDF, Corrugado, Polionda)",
      feature: "Tintas UV curables ultra-resistentes al exterior",
      leadTime: "Tirajes cortos en 24h",
    },
    {
      id: "offset-speedmaster",
      name: "Offset Comercial de Alta Velocidad",
      brand: "Heidelberg Speedmaster 5 Tintas + Torre de Barniz",
      status: "Espectrofotometría Activa",
      specs: "Hasta 15.000 pliegos/hora en pliego y medio pliego (Propalcote, Sulfatada)",
      feature: "Registro electrónico y espectrofotometría en línea",
      leadTime: "Capacidad 50.000+ pliegos/día",
    },
    {
      id: "zund-cnc",
      name: "Mesa de Corte Digital CNC",
      brand: "Zünd G3 Digital Cutter 3XL",
      status: "Corte Micrométrico Activo",
      specs: "Corte y hendido micrométrico sin troqueles de madera para muestras y tirajes cortos",
      feature: "Fresado de acrílicos y cuchilla oscilante para cartón",
      leadTime: "Prototipado en 4 horas",
    },
    {
      id: "bobst-troqueladora",
      name: "Troquelado & Plegado Automático",
      brand: "Bobst Automatic Die-Cutter",
      status: "Precisión Quirúrgica",
      specs: "Troquelado masivo de cajas plegadizas, exhibidores y empaques hasta 7.000 hojas/hora",
      feature: "Descartone automático y precisión quirúrgica",
      leadTime: "Tirajes masivos certificados",
    },
  ];

  const substrates = [
    {
      id: "pop",
      category: "Material POP & Rígidos",
      items: [
        "Cartón Corrugado Simple (Flauta C y B)",
        "Microcorrugado Onda E (Alta definición gráfica)",
        "Acrílico Cristal 3mm a 10mm (Corte láser)",
        "MDF Grabado y Ruteado CNC 6mm / 9mm",
        "Polionda (Polipropileno Corrugado) 4mm",
      ],
    },
    {
      id: "exterior",
      category: "Gran Formato & Publicidad Exterior",
      items: [
        "Lona Banner 13oz Frontlight y Blackout",
        "Vinilo Adhesivo Premium (Arlon / 3M)",
        "Lona Microperforada Mesh para Fachadas",
        "Panaflex Traslúcido para Cajas de Luz",
        "Vinilo Floor Graphic con Laminado Antideslizante",
      ],
    },
    {
      id: "litografia",
      category: "Litografía & Papelería",
      items: [
        "Propalcote C2S 150g, 200g, 240g, 300g",
        "Cartulina Sulfatada Calibre 14, 16, 18 pt",
        "Papel EarthPact (100% Bagazo de Caña)",
        "Papel Bond 75g y 90g para Facturas y Papelería",
        "Cartón Paja y Cartón Gris Rígido para Cuadernos",
      ],
    },
    {
      id: "acabados",
      category: "Acabados & Ennoblecimiento",
      items: [
        "Laminado Plastificado Mate y Brillante Térmico",
        "Barniz UV Total y Sectorizado (Spot UV)",
        "Estampado Metalizado al Calor (Hot-Stamping Foil)",
        "Repujado y Alto Relieve Seco (Embossing)",
        "Encuadernación Rústica Cosida, Hot-Melt y Argollado Doble O",
      ],
    },
  ];

  const filteredSubstrates = selectedSubstrateTab === "todos"
    ? substrates
    : substrates.filter((s) => s.id === selectedSubstrateTab);

  return (
    <section id="servicios" className="py-24 bg-white relative overflow-hidden border-t border-b border-zinc-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E30613] font-bold block mb-2">
            INFRAESTRUCTURA Y PARQUE DE MAQUINARIA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-none mb-4">
            POTENCIA INDUSTRIAL DE IMPRESIÓN
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Nuestra planta en Cali cuenta con tecnología alemana, suiza y japonesa de última
            generación para garantizar tiempos de respuesta inalcanzables para talleres convencionales.
          </p>
        </div>

        {/* Machinery Grid with Micro-Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {machinery.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-3xl bg-zinc-50/70 border border-zinc-200 hover:border-[#E30613]/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#E30613] font-bold uppercase tracking-wider">
                    {item.brand}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono text-emerald-700 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{item.status}</span>
                  </div>
                </div>

                <h3 className="font-montserrat font-bold text-lg text-zinc-950 group-hover:text-[#E30613] transition-colors mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4 font-normal">
                  {item.specs}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 font-medium text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item.feature}</span>
                </div>

                <a
                  href={`https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20quisiera%20cotizar%20un%20proyecto%20para%20producir%20en%20su%20l%C3%ADnea%20de%20${encodeURIComponent(item.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-montserrat font-bold text-zinc-600 hover:text-[#E30613] transition-colors shrink-0"
                >
                  <span>Cotizar en esta línea</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Substrates Matrix with Interactive Tabs */}
        <div className="rounded-3xl bg-white border border-zinc-200/90 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-zinc-200 pb-4">
            <div>
              <h3 className="font-montserrat font-black text-xl text-zinc-950 uppercase">
                Matriz de Sustratos & Acabados Industriales
              </h3>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Especificaciones de stock permanente en almacén central • Toca para copiar sustrato
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "todos", label: "Todos" },
                { id: "pop", label: "POP" },
                { id: "exterior", label: "Exterior" },
                { id: "litografia", label: "Litografía" },
                { id: "acabados", label: "Acabados" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    triggerHaptic(8);
                    setSelectedSubstrateTab(tab.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-montserrat font-semibold transition-all ${
                    selectedSubstrateTab === tab.id
                      ? "bg-[#E30613] text-white shadow-2xs"
                      : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSubstrates.map((sub, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E30613] border-b border-zinc-200 pb-2">
                  {sub.category}
                </h4>
                <ul className="space-y-2">
                  {sub.items.map((item, itemIdx) => {
                    const isCopied = copiedItem === item;
                    return (
                      <li
                        key={itemIdx}
                        onClick={() => handleCopySubstrate(item)}
                        className="text-xs text-zinc-700 hover:text-zinc-950 p-1.5 rounded-lg hover:bg-zinc-50 border border-transparent hover:border-zinc-200 flex items-start justify-between gap-2 leading-tight cursor-pointer transition-colors group"
                        title="Clic para copiar sustrato al portapapeles"
                      >
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E30613] mt-1 shrink-0" />
                          <span>{item}</span>
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          {isCopied ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-zinc-400" />
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
