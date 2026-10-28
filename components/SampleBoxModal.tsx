"use client";

import React, { useState } from "react";
import { X, Box, Check, MessageCircle, MapPin, Building, User, Phone } from "lucide-react";

interface SampleBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SampleBoxModal({ isOpen, onClose }: SampleBoxModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Cali");
  const [selectedSamples, setSelectedSamples] = useState<string[]>([
    "Cartón Corrugado 4mm",
    "Laminado Mate + Barniz UV",
  ]);

  if (!isOpen) return null;

  const sampleTypes = [
    "Cartón Corrugado 4mm (Kraft)",
    "Microcorrugado Onda E Blanco",
    "Acrílico Cristal 3mm / 6mm",
    "Laminado Mate + Barniz UV",
    "Estampado Metalizado (Foil Oro)",
    "Lona Banner 13oz Blackout",
    "Vinilo Adhesivo Arlon Laminado",
  ];

  const toggleSample = (sample: string) => {
    if (selectedSamples.includes(sample)) {
      setSelectedSamples(selectedSamples.filter((s) => s !== sample));
    } else {
      setSelectedSamples([...selectedSamples, sample]);
    }
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `*SOLICITUD DE KIT DE MUESTRAS FÍSICAS (SAMPLE BOX)*
---------------------------------------
• *Empresa:* ${companyName || "No indicada"}
• *Contacto:* ${contactName || "No indicado"}
• *Teléfono:* ${phone || "No indicado"}
• *Ciudad de Despacho:* ${city}
• *Muestras Solicitadas:* 
${selectedSamples.map((s) => `  - ${s}`).join("\n")}
---------------------------------------
_Solicitado desde impresosamericana.com para evaluación de calidades técnicas._`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/573163200181?text=${encoded}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#181820] border border-white/15 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-zinc-400 hover:text-white bg-white/5 border border-white/10 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#E30613]/20 border border-[#E30613]/40 flex items-center justify-center text-[#E30613]">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E30613] font-bold block">
              MUESTRARIO TÉCNICO A DOMICILIO
            </span>
            <h3 className="font-montserrat font-bold text-lg text-white">
              Solicitar Sample Box Corporativa
            </h3>
          </div>
        </div>

        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
          Enviamos sin costo a empresas, agencias de publicidad y departamentos de compras
          un kit con muestras físicas reales de sustratos, acabados UV y cartón corrugado.
        </p>

        <form onSubmit={handleSendRequest} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-zinc-300 block mb-1">
                Empresa o Marca:
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Ej: Colombina S.A."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#121216] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E30613]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-300 block mb-1">
                Nombre de Contacto / Cargo:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Ej: Andrea Gómez (Trade Mkt)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-[#121216] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E30613]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-zinc-300 block mb-1">
                Teléfono / WhatsApp:
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  required
                  placeholder="+57 300 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#121216] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E30613]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-zinc-300 block mb-1">
                Ciudad de Entrega:
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#121216] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E30613] appearance-none"
                >
                  <option value="Cali">Cali (Mismo día)</option>
                  <option value="Bogotá D.C.">Bogotá D.C. (24 horas)</option>
                  <option value="Medellín">Medellín (24 horas)</option>
                  <option value="Barranquilla">Barranquilla (48 horas)</option>
                  <option value="Otra Ciudad Nacional">Otra Ciudad (Colombia)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sample Swatches Checkboxes */}
          <div>
            <label className="text-[11px] font-mono text-zinc-300 block mb-2">
              Selecciona las muestras físicas que deseas incluir:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sampleTypes.map((sample) => {
                const isSelected = selectedSamples.includes(sample);
                return (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => toggleSample(sample)}
                    className={`flex items-center gap-2.5 p-2.5 min-h-[44px] rounded-xl border text-left text-xs transition-colors ${
                      isSelected
                        ? "border-[#E30613] bg-[#E30613]/15 text-white font-medium"
                        : "border-white/10 bg-[#121216] text-zinc-300 hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] shrink-0 ${
                        isSelected
                          ? "bg-[#E30613] border-[#E30613] text-white"
                          : "border-zinc-600"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{sample}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-zinc-400 font-mono">
              Envío coordinado por transportadora sin costo comercial
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(227,6,19,0.5)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirmar Envío por WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
