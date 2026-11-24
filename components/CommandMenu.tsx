"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  Download,
  ArrowRight,
  Box,
  FileText,
  Package,
} from "lucide-react";

interface SearchResultItem {
  id: string;
  title: string;
  category: "Producto" | "Troquel" | "Catálogo PDF" | "Acción";
  description: string;
  actionUrl: string;
  isExternal?: boolean;
}

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSampleModal?: () => void;
}

export function CommandMenu({ isOpen, onClose, onOpenSampleModal }: CommandMenuProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items: SearchResultItem[] = [
    {
      id: "termo-temp",
      title: "Termo Inteligente con Pantalla LED (500 ml)",
      category: "Producto",
      description: "$25.635 COP • Acero 304 con sensor táctil de temperatura",
      actionUrl: "/catalogo",
    },
    {
      id: "termo-subli",
      title: "Termo de Sublimación Doble Pared (500 ml)",
      category: "Producto",
      description: "$10.881 COP • Sublimación full color perimetral",
      actionUrl: "/catalogo",
    },
    {
      id: "libreta-ejec",
      title: "Libreta Ejecutiva de Cuero Ecológico 14x21",
      category: "Producto",
      description: "$14.500 COP • 80 hojas rayadas con elástico y cinta",
      actionUrl: "/catalogo",
    },
    {
      id: "esfero-calima",
      title: "Lapicero Plástico Calima con Grip",
      category: "Producto",
      description: "$500 a $580 COP • Marcación en tampografía",
      actionUrl: "/catalogo",
    },
    {
      id: "tarjeta-usb",
      title: "Memoria USB Tipo Tarjeta Ultradelgada",
      category: "Producto",
      description: "$18.500 COP • Impresión UV digital 2 caras",
      actionUrl: "/catalogo",
    },
    {
      id: "exhibidor-pop",
      title: "Exhibidor POP de Piso Modular 160 cm",
      category: "Producto",
      description: "Cartón Corrugado 4mm estructural • Capacidad 35 kg",
      actionUrl: "/cotizador",
    },
    {
      id: "cat-maestro-pdf",
      title: "Descargar Catálogo Maestro Impresos Americana (PDF)",
      category: "Catálogo PDF",
      description: "116 páginas • 6.6 MB optimizado con inventario completo 2024",
      actionUrl: "/catalogos/catalogo-impresos-americana.pdf",
      isExternal: true,
    },
    {
      id: "cat-esferos-pdf",
      title: "Descargar Catálogo Esferos y Llaveros 2024 (PDF)",
      category: "Catálogo PDF",
      description: "24 MB optimizado • Toda la línea de bolígrafos y llaveros en aluminio",
      actionUrl: "/catalogos/esferos-y-llaveros-2024.pdf",
      isExternal: true,
    },
    {
      id: "accion-cotizar",
      title: "Configurar Cotización Online en Tiempo Real",
      category: "Acción",
      description: "Calcula precios en COP, sustratos y acabados UV",
      actionUrl: "/cotizador",
    },
    {
      id: "accion-servicios",
      title: "Infraestructura & Parque de Maquinaria Industrial",
      category: "Acción",
      description: "Offset Heidelberg, Zünd CNC y cama plana UV 3.20m",
      actionUrl: "/servicios",
    },
    {
      id: "accion-proyectos",
      title: "Ver Proyectos Reales & Casos en Retail",
      category: "Acción",
      description: "Éxito, Jumbo, Carulla, ferias y stands comerciales",
      actionUrl: "/proyectos",
    },
    {
      id: "accion-contacto",
      title: "Contacto & Ubicación de Planta en Cali",
      category: "Acción",
      description: "Calle 16 # 4-37 San Nicolás • PBX (602) 885-4000",
      actionUrl: "/contacto",
    },
    {
      id: "accion-admin",
      title: "Panel Administrativo Sanity Studio (/admin)",
      category: "Acción",
      description: "Acceso al panel CMS para gestionar productos, tarifas y PDFs",
      actionUrl: "/admin",
    },
    {
      id: "accion-guia-admin",
      title: "Manual de Administración del Catálogo",
      category: "Acción",
      description: "Guía paso a paso para subir productos, modificar precios y fotos",
      actionUrl: "/guia-admin",
    },
    {
      id: "accion-muestras",
      title: "Solicitar Muestrario Físico Corporativo (Sample Box)",
      category: "Acción",
      description: "Despacho gratuito de muestras reales a Cali, Bogotá, Medellín",
      actionUrl: "modal-samples",
    },
    {
      id: "accion-whatsapp",
      title: "Hablar con un Asesor Comercial en WhatsApp (+57 316 320 0181)",
      category: "Acción",
      description: "Atención inmediata por ingenieros técnicos de planta • +57 316 320 0181",
      actionUrl: "https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20deseo%20asesor%C3%ADa.",
      isExternal: true,
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = useCallback(
    (item: SearchResultItem) => {
      onClose();
      if (item.actionUrl === "modal-samples" && onOpenSampleModal) {
        onOpenSampleModal();
      } else if (item.isExternal) {
        window.open(item.actionUrl, "_blank");
      } else if (item.actionUrl.startsWith("/")) {
        router.push(item.actionUrl);
      } else {
        window.location.href = item.actionUrl;
      }
    },
    [onClose, onOpenSampleModal, router]
  );

  // Keyboard navigation & global Cmd+K trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
        );
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredItems[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems, onClose, handleSelect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-md">
      <div
        className="bg-white border border-zinc-200 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-200 bg-zinc-50/70">
          <Search className="w-5 h-5 text-[#E30613]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos, sustratos, troqueles, catálogos PDF o cotizar..."
            className="w-full bg-transparent border-none text-zinc-900 placeholder-zinc-400 focus:outline-none text-sm font-sans"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-[11px] font-mono text-zinc-500 hover:text-zinc-900 px-2 py-1 rounded-md bg-white border border-zinc-200 shadow-2xs"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-zinc-500">
              <Package className="w-8 h-8 mx-auto mb-2 opacity-40 text-zinc-400" />
              <p className="text-sm font-medium text-zinc-800">No encontramos resultados para &quot;{query}&quot;</p>
              <p className="text-xs text-zinc-500 mt-1 font-mono">
                Intenta con: termo, libreta, acrílico, troquel, o cotizar
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-red-50/90 border border-red-200 text-zinc-950"
                      : "hover:bg-zinc-50 border border-transparent text-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#E30613] text-white shadow-xs"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {item.category === "Producto" && <Box className="w-4 h-4" />}
                      {item.category === "Troquel" && <FileText className="w-4 h-4" />}
                      {item.category === "Catálogo PDF" && <Download className="w-4 h-4" />}
                      {item.category === "Acción" && <Sparkles className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-montserrat font-bold text-zinc-950">
                          {item.title}
                        </span>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-600 font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "translate-x-1 text-[#E30613]" : "opacity-0"
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-5 py-2.5 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ para navegar</span>
            <span>↵ para seleccionar</span>
          </div>
          <span>Atajo: ⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
}
