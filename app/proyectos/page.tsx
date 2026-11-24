import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BentoGrid } from "@/components/BentoGrid";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";

export const metadata: Metadata = {
  title: "Portafolio de Proyectos & Casos Reales | Impresos Americana",
  description:
    "Proyectos destacados de material POP, stands modulares, exhibidores de piso, litografía comercial, gran formato y merchandising corporativo fabricados en Cali para toda Colombia.",
};

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        badge="INGENIERÍA GRÁFICA & PRODUCCIÓN REAL"
        title="PORTAFOLIO DE PROYECTOS EN ACCIÓN"
        description="Soluciones de exhibición comercial, stands modulares, señalética y litografía industrial fabricadas en nuestra planta de Cali con cobertura y despacho a nivel nacional."
        breadcrumbs={[{ label: "Proyectos" }]}
      />

      {/* Interactive Filterable Bento Grid Showcase */}
      <BentoGrid />

      {/* Quantitative Case Studies & ROI Metrics */}
      <CaseStudiesSection />
    </div>
  );
}
