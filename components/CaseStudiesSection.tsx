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
    <section className="py-24 bg-white relative overflow-hidden border-t border-zinc-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E30613] font-bold block mb-2">
            MÉTRICAS Y RESULTADOS COMPROBADOS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-none mb-4">
            IMPACTO REAL EN EL PUNTO DE VENTA
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            No solo imprimimos sustratos: diseñamos soluciones de ingeniería gráfica que
            aceleran la decisión de compra del consumidor y resisten la operación física del retail.
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((cs, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-50/70 border border-zinc-200/90 hover:border-zinc-300 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between shadow-2xs relative overflow-hidden group"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#E30613] font-bold tracking-wider block mb-3">
                  {cs.brand}
                </span>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl sm:text-5xl font-montserrat font-black text-zinc-950 group-hover:text-[#E30613] transition-colors">
                    {cs.metric}
                  </span>
                  <span className="text-xs font-mono text-zinc-500 font-semibold uppercase">
                    {cs.metricLabel}
                  </span>
                </div>

                <h3 className="font-montserrat font-bold text-lg text-zinc-950 mb-3 leading-snug">
                  {cs.headline}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed mb-6 font-normal">
                  {cs.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cs.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200/60 flex items-center gap-2 text-xs font-medium text-emerald-700">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{cs.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
