"use client";

import React from "react";
import { CheckCircle, Factory } from "lucide-react";

export function CapabilitiesSection() {
  const machinery = [
    {
      name: "Cama Plana UV Industrial (3.20m)",
      brand: "HP Scitex / EFI VUTEk",
      specs: "Impresión directa rígidos hasta 50mm (Acrílico, MDF, Corrugado, Polionda)",
      feature: "Tintas UV curables ultra-resistentes al exterior",
    },
    {
      name: "Offset Comercial de Alta Velocidad",
      brand: "Heidelberg Speedmaster 5 Tintas + Torre de Barniz",
      specs: "Hasta 15.000 pliegos/hora en pliego y medio pliego (Propalcote, Sulfatada)",
      feature: "Registro electrónico y espectrofotometría en línea",
    },
    {
      name: "Mesa de Corte Digital CNC",
      brand: "Zünd G3 Digital Cutter 3XL",
      specs: "Corte y hendido micrométrico sin troqueles de madera para muestras y tirajes cortos",
      feature: "Fresado de acrílicos y cuchilla oscilante para cartón",
    },
    {
      name: "Troquelado & Plegado Automático",
      brand: "Bobst Automatic Die-Cutter",
      specs: "Troquelado masivo de cajas plegadizas, exhibidores y empaques hasta 7.000 hojas/hora",
      feature: "Descartone automático y precisión quirúrgica",
    },
  ];

  const substrates = [
    {
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

  return (
    <section id="servicios" className="py-24 bg-[#0F0F14] relative overflow-hidden border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E30613] font-bold block mb-2">
            INFRAESTRUCTURA Y PARQUE DE MAQUINARIA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-white tracking-tight leading-none mb-4">
            POTENCIA INDUSTRIAL DE IMPRESIÓN
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Nuestra planta en Cali cuenta con tecnología alemana, suiza y japonesa de última
            generación para garantizar tiempos de respuesta inalcanzables para talleres convencionales.
          </p>
        </div>

        {/* Machinery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {machinery.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#16161D] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#E30613] font-bold uppercase tracking-wider">
                    {item.brand}
                  </span>
                  <Factory className="w-4 h-4 text-zinc-500" />
                </div>
                <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {item.specs}
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-medium text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{item.feature}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Substrates Matrix */}
        <div className="rounded-2xl bg-[#181820] border border-white/10 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-montserrat font-black text-xl text-white uppercase">
                Matriz de Sustratos & Acabados Industriales
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Especificaciones de stock permanente en almacén central
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono bg-white/5 text-zinc-300 px-3 py-1 rounded-full border border-white/10">
              Certificaciones FSC & ISO 14001
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {substrates.map((sub, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E30613] border-b border-white/10 pb-2">
                  {sub.category}
                </h4>
                <ul className="space-y-2">
                  {sub.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-xs text-zinc-300 flex items-start gap-2 leading-tight"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
