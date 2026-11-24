import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contacto & Planta en Cali | Impresos Americana S.A.S.",
  description:
    "Comunícate directamente con nuestra planta litográfica y de empaques en San Nicolás, Cali. PBX (602) 885-4000 y WhatsApp +57 316 320 0181 para cotizaciones a nivel nacional.",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50">
      <PageHeader
        badge="SAN NICOLÁS, CALI"
        title="HABLEMOS DE TU PRÓXIMO PROYECTO"
        description="Estamos en el corazón gráfico de Cali. Visítanos en planta, escríbenos por WhatsApp para cotizaciones ágiles o comunícate con nuestra central para atención corporativa."
        breadcrumbs={[{ label: "Contacto" }]}
      />

      {/* Main Contact Section */}
      <ContactSection />
    </div>
  );
}
