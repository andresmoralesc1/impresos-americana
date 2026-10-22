import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contacto & Planta Industrial Cali | Impresos Americana",
  description:
    "Comunícate directamente con nuestra planta litográfica en Cali (Calle 16 # 4-37 San Nicolás). PBX (602) 885-4000 y WhatsApp +57 316 320 0181 para cotizaciones a nivel nacional.",
};

export default function ContactoPage() {
  return (
    <div>
      <PageHeader
        badge="PLANTA INDUSTRIAL & ATENCIÓN DIRECTA"
        title="CONTÁCTANOS & VISITA NUESTRA PLANTA"
        description="Sede principal en el tradicional sector litográfico de San Nicolás en Cali. Atención telefónica, WhatsApp directo y cotizaciones institucionales para empresas y agencias de toda Colombia."
        breadcrumbs={[{ label: "Contacto" }]}
      />

      {/* Main Contact Section */}
      <ContactSection />
    </div>
  );
}
