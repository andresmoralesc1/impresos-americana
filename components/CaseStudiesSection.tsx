"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

export function CaseStudiesSection() {
  const cases = [
    {
      brand: "Líder de Consumo Masivo en Supermercados",
      metric: "+28%",
      metricLabel: "Rotación en Góndola",
      headline: "Despliegue Nacional de 320 Exhibidores Modulares",
      description:
        "Fabricación y distribución coordinada de exhibidores de piso en cartón corrugado estructural 4mm con cabezote curvo y barniz UV para tiendas Éxito, Jumbo y Carulla.",
      tags: ["Cartón Corrugado 4mm", "320 Puntos de Venta", "Cali / Bogotá / Medellín"],
      highlight: "Tiempo de entrega récord: 6 días hábiles",
    },
    {
      brand: "Compañía Nacional de Bebidas & Licores",
      metric: "45 kg",
      metricLabel: "Capacidad por Bandeja",
      headline: "Resistencia Estructural en Ambientes de Alta Humedad",
      description:
        "Ingeniería de empaque con flauta tratada anti-humedad y diseño de ensamble sin adhesivos. Cero pandeo estructural tras 90 días en retail continuo.",
      tags: ["Anti-Humedad", "Ensamble Sin Pegante", "Carga Pesada"],
      highlight: "0% devoluciones por falla mecánica",
    },
    {
      brand: "Sector Financiero & Asegurador",
      metric: "96 h",
      metricLabel: "Despliegue Simultáneo",
      headline: "Renovación de Señalética en Acrílico en 140 Sucursales",
      description:
        "Corte láser CNC sobre acrílico cristal de 6mm con impresión de cama plana UV directa y fijación con distanciadores de acero inoxidable en sedes a nivel nacional.",
      tags: ["Acrílico Cristal 6mm", "Corte Láser CNC", "140 Sucursales"],
      highlight: "100% de cumplimiento en cronograma",
    },
  ];

  return (
    <section className="py-24 bg-[#0B0B0E] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E30613] font-bold block mb-2">
            MÉTRICAS Y RESULTADOS COMPROBADOS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-white tracking-tight leading-none mb-4">
            IMPACTO REAL EN EL PUNTO DE VENTA
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            No solo imprimimos sustratos: diseñamos soluciones de ingeniería gráfica que
            aceleran la decisión de compra del consumidor y resisten la operación física del retail.
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((cs, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#15151D] border border-white/10 hover:border-[#E30613]/50 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden group corner-slash-red"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#E30613] font-bold tracking-wider block mb-3">
                  {cs.brand}
                </span>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl sm:text-5xl font-montserrat font-black text-white group-hover:text-red-400 transition-colors">
                    {cs.metric}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 font-semibold uppercase">
                    {cs.metricLabel}
                  </span>
                </div>

                <h3 className="font-montserrat font-bold text-lg text-white mb-3 leading-snug">
                  {cs.headline}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {cs.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cs.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1C1C26] text-zinc-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-medium text-emerald-400">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{cs.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
