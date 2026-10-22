import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { ShieldCheck, Truck, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Cotizador en Tiempo Real & Visor 3D WebGL",
  description:
    "Configura y cotiza en línea exhibidores POP, empaques y gran formato con cálculo instantáneo en Pesos Colombianos (COP), descuentos por volumen y descarga de PDF formal.",
};

export default function CotizadorPage() {
  return (
    <div>
      <PageHeader
        badge="COTIZADOR DE PLANTA EN TIEMPO REAL"
        title="COTIZA TU PROYECTO INDUSTRIAL"
        description="Calcula el valor exacto de tus piezas gráficas en Pesos Colombianos (COP) según sustrato, acabados y volumen. Visualiza tu pieza en 3D orbital y descarga tu documento oficial en PDF con IVA 19%."
        breadcrumbs={[{ label: "Cotizador Online" }]}
      />

      {/* Main Interactive Live Configurator */}
      <QuoteCalculator />

      {/* Industrial Guarantees Strip */}
      <section className="py-16 bg-[#111116] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#181820] border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-sm text-white uppercase mb-1">
                  Facturación Electrónica DIAN
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Cada cotización y orden incluye factura electrónica legal con IVA 19%, emitida bajo el NIT 900.384.912-4 conforme al estatuto tributario colombiano.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#181820] border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#E30613]/15 text-red-400 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-sm text-white uppercase mb-1">
                  Despachos Consolidados
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Envíos diarios desde nuestra planta en Cali hacia Bogotá, Medellín, Barranquilla, Bucaramanga y todas las ciudades con guías de carga rastreables.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#181820] border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-500/15 text-blue-400 shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-sm text-white uppercase mb-1">
                  Auditoría Preflight Digital
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Revisamos resolución (300 DPI), modo de color CMYK FOGRA39, líneas de troquel y sangrías antes de enviar a planchas CTP térmicas o mesa de corte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
