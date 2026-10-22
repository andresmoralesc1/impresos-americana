import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { FinishComparator } from "@/components/FinishComparator";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Líneas de Producción & Sustratos Industriales",
  description:
    "Descubre nuestra infraestructura litográfica y de gran formato en Cali: Heidelberg Speedmaster, mesa Zünd CNC, cama plana UV de 3.20m y troquelado automático con cobertura nacional.",
};

export default function ServiciosPage() {
  return (
    <div>
      <PageHeader
        badge="INFRAESTRUCTURA & TECNOLOGÍA PROPIA"
        title="LÍNEAS DE PRODUCCIÓN & SUSTRATOS"
        description="Planta litográfica e industrial en Cali con tecnología alemana, suiza y japonesa. Fabricamos exhibidores POP, gran formato exterior, litografía comercial y empaques rígidos."
        breadcrumbs={[{ label: "Servicios" }]}
      />

      {/* Parque de Maquinaria y Matriz de Sustratos */}
      <CapabilitiesSection />

      {/* Laboratorio Interactivo de Acabados (Laminado Mate vs Brillo UV) */}
      <FinishComparator />

      {/* Casos Reales y Rendimiento en Retail */}
      <CaseStudiesSection />

      {/* Bottom Conversion Callout */}
      <section className="py-16 bg-[#0E0E12] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#8F0008] via-[#E30613] to-[#B3000B] text-white shadow-2xl relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-montserrat font-black uppercase tracking-tight mb-2">
              ¿Listo para cotizar tu producción industrial?
            </h2>
            <p className="text-white/90 text-sm max-w-xl mx-auto mb-6">
              Ingresa al cotizador en tiempo real con visor 3D para calcular cantidades, sustratos y acabados en Pesos Colombianos.
            </p>
            <Link
              href="/cotizador"
              className="inline-flex items-center gap-2 bg-white text-[#121212] hover:bg-zinc-100 font-montserrat font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-[#E30613]" />
              <span>Ir al Cotizador en Línea</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
