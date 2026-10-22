import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RealProductsCatalog } from "@/components/RealProductsCatalog";

export const metadata: Metadata = {
  title: "Catálogo Oficial de Artículos Publicitarios & PDFs",
  description:
    "Catálogo oficial de merchandising corporativo: termos con pantalla LED de temperatura, libretas de cuero ecológico, esferos publicitarios y descarga de catálogos maestros en PDF.",
};

export default function CatalogoPage() {
  return (
    <div>
      <PageHeader
        badge="CATÁLOGO OFICIAL DE ARTÍCULOS PUBLICITARIOS"
        title="PRODUCTOS CORPORATIVOS & MERCHANDISING"
        description="Referencias reales extraídas de nuestros catálogos oficiales de producción. Marcación industrial con tampografía, grabado láser, sublimación o impresión UV directa con despacho nacional."
        breadcrumbs={[{ label: "Catálogo" }]}
      />

      {/* Catalog Grid and PDF Download Center */}
      <RealProductsCatalog />
    </div>
  );
}
