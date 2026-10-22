import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DielineTemplates } from "@/components/DielineTemplates";

export const metadata: Metadata = {
  title: "Centro de Descargas de Preprensa & Planos de Troquel",
  description:
    "Descarga planos mecánicos vectoriales para Illustrator y PDF: exhibidores POP de piso, cajas rígidas imantadas, carpetas corporativas y roll-ups con capas de corte y hendido.",
};

export default function PlantillasPage() {
  return (
    <div>
      <PageHeader
        badge="CENTRO DE DESCARGAS DE PREPRENSA"
        title="PLANTILLAS & PLANOS DE TROQUEL"
        description="Planos mecánicos certificados para agencias, diseñadores y directores de arte. Descarga directa en formato vectorial (.AI y .PDF) con capas diferenciadas de corte perimetral y pliegues."
        breadcrumbs={[{ label: "Plantillas" }]}
      />

      {/* Dieline Blueprint Downloader & Technical Preflight Checklist */}
      <DielineTemplates />
    </div>
  );
}
