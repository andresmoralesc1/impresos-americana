"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileCheck2,
  Box,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Asesoría & Preprensa Digital",
      subtitle: "Revisión técnica de artes y planos mecánicos",
      desc: "Validamos perfiles de color CMYK (FOGRA39 / GRACoL), líneas de sangrado, registro de troquel y resolución mínima de 300 DPI para asegurar cero errores en máquina.",
      icon: FileCheck2,
      time: "2 a 4 horas",
      deliverable: "Checklist de Preprensa Aprobado",
    },
    {
      number: "02",
      title: "Muestra Física / Dummy 3D",
      subtitle: "Validación estructural y resistencia real",
      desc: "Generamos simulación tridimensional o prototipo en blanco cortado en mesa CNC Zünd para testear capacidad de carga, ensamble y ergonomía en el punto de venta.",
      icon: Box,
      time: "24 a 48 horas",
      deliverable: "Prototipo Físico Funcional",
    },
    {
      number: "03",
      title: "Producción & Acabados",
      subtitle: "Impresión offset & UV de alta velocidad",
      desc: "Tiro industrial en planta propia con monitoreo espectrofotométrico continuo. Aplicación de barnices UV selectivos, plastificado mate/brillante y troquelado computarizado.",
      icon: Printer,
      time: "3 a 5 días hábiles",
      deliverable: "Lote Inspeccionado 100%",
    },
    {
      number: "04",
      title: "Despacho & Instalación",
      subtitle: "Cobertura en Cali, Bogotá, Medellín y todo el país",
      desc: "Embalaje termoencogible con protección esquinera. Despachos consolidados con transportadoras de carga pesada y cuadrillas de instalación certificadas en retail.",
      icon: Truck,
      time: "Despacho Inmediato",
      deliverable: "Guía de Envío / Acta de Entrega",
    },
  ];

  return (
    <section id="proceso" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background grid and glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-500/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E30613] font-bold block mb-2">
            FLUJO INDUSTRIAL CERTIFICADO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-none mb-4">
            DE LA IDEA AL PUNTO DE VENTA
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Un pipeline de ingeniería gráfica estructurado para eliminar reprocesos,
            garantizar fidelidad cromática y cumplir fechas de lanzamiento corporativas.
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative rounded-3xl bg-zinc-50/70 border border-zinc-200/80 hover:border-zinc-300 p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-xl hover:bg-white"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-montserrat font-black text-3xl text-zinc-300 group-hover:text-red-300 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 text-zinc-900 group-hover:bg-[#E30613] group-hover:text-white group-hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg text-zinc-950 mb-1 group-hover:text-[#E30613] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-[#E30613] font-bold mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-6 font-normal">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Metadata Badges */}
                <div className="pt-4 border-t border-zinc-200/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      Tiempo estimado:
                    </span>
                    <span className="text-zinc-900 font-semibold">{step.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Entregable:
                    </span>
                    <span className="text-zinc-800 font-medium">{step.deliverable}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quality Assurance Statement Banner */}
        <div className="mt-12 rounded-2xl bg-zinc-50 border border-zinc-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="text-xs sm:text-sm text-zinc-700 font-medium">
              <strong className="text-zinc-950 font-bold">Política de Cero Desperdicio:</strong> Si el producto final presenta discrepancia técnica con la muestra física aprobada, reimprimimos el lote sin costo adicional.
            </p>
          </div>
          <Link
            href="/cotizador"
            className="w-full sm:w-auto shrink-0 text-xs font-montserrat font-bold uppercase text-[#E30613] hover:text-[#C50510] flex items-center justify-center gap-1.5 tracking-wider transition-colors py-2.5 px-4 rounded-xl bg-red-50 sm:bg-transparent border border-red-200 sm:border-0 min-h-[44px] sm:min-h-0"
          >
            <span>Solicitar Muestra Técnica</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
