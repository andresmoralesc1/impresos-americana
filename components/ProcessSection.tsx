"use client";

import React from "react";
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
    <section id="proceso" className="py-24 bg-[#121212] relative overflow-hidden">
      {/* Decorative background grid and glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#E30613]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E30613] font-bold block mb-2">
            FLUJO INDUSTRIAL CERTIFICADO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-white tracking-tight leading-none mb-4">
            DE LA IDEA AL PUNTO DE VENTA
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
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
                className="group relative rounded-2xl bg-[#18181F] border border-white/10 hover:border-[#E30613]/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl corner-slash-red"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-montserrat font-black text-3xl text-white/20 group-hover:text-[#E30613] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#23232C] group-hover:bg-[#E30613] text-white flex items-center justify-center transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg text-white mb-1 group-hover:text-red-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-[#E30613] font-semibold mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Metadata Badges */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      Tiempo estimado:
                    </span>
                    <span className="text-zinc-200 font-semibold">{step.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Entregable:
                    </span>
                    <span className="text-zinc-300">{step.deliverable}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quality Assurance Statement Banner */}
        <div className="mt-12 rounded-xl bg-[#16161D] border border-white/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <p className="text-xs sm:text-sm text-zinc-300 font-medium">
              <strong className="text-white">Política de Cero Desperdicio:</strong> Si el producto final presenta discrepancia técnica con la muestra física aprobada, reimprimimos el lote sin costo adicional.
            </p>
          </div>
          <a
            href="#cotizador"
            className="shrink-0 text-xs font-montserrat font-bold uppercase text-[#E30613] hover:text-white flex items-center gap-1 tracking-wider"
          >
            Solicitar Muestra Técnica
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
