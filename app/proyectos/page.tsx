import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BentoGrid } from "@/components/BentoGrid";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";

export const metadata: Metadata = {
  title: "Casos Reales en Retail & Portafolio de Proyectos",
  description:
    "Proyectos destacados de material POP, stands de piso, exhibidores de mostrador y señalética fabricados para Éxito, Carulla, Jumbo y marcas líderes en Colombia.",
};

export default function ProyectosPage() {
  return (
    <div>
      <PageHeader
        badge="CASOS REALES EN RETAIL COLOMBIANO"
        title="PORTAFOLIO DE PROYECTOS EN ACCIÓN"
        description="Soluciones de ingeniería gráfica e impacto visual fabricadas e instaladas en puntos de venta nacionales. Explora especificaciones técnicas, materiales y detalles constructivos."
        breadcrumbs={[{ label: "Proyectos" }]}
      />

      {/* Interactive Filterable Bento Grid Showcase */}
      <BentoGrid />

      {/* Quantitative Case Studies & ROI Metrics */}
      <CaseStudiesSection />
    </div>
  );
}
