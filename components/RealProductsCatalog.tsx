"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, MessageCircle, Eye } from "lucide-react";

type CatalogCategory = "todos" | "termos" | "agendas" | "esferos" | "llaveros-usb";

interface ProductCatalogItem {
  id: string;
  name: string;
  reference: string;
  category: CatalogCategory;
  categoryLabel: string;
  priceCOP: string;
  imageSrc: string;
  specs: string[];
  minOrder: string;
}

export function RealProductsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<CatalogCategory>("todos");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const categories = [
    { id: "todos", label: "Todos los Productos" },
    { id: "termos", label: "Termos & Botellas" },
    { id: "agendas", label: "Agendas & Libretas" },
    { id: "esferos", label: "Esferos & Bolígrafos" },
    { id: "llaveros-usb", label: "Llaveros & USBs" },
  ];

  const products: ProductCatalogItem[] = [
    {
      id: "termo-digital",
      name: "Termo Inteligente con Pantalla LED de Temperatura",
      reference: "Ref. Termo Temperatura 500 ml",
      category: "termos",
      categoryLabel: "Termos & Botellas",
      priceCOP: "$25.635 COP",
      imageSrc: "/products/termo-temperatura.jpg",
      specs: ["Acero Inoxidable 304", "Pantalla Táctil LED", "Capacidad 500 ml"],
      minOrder: "Mínimo 25 uds",
    },
    {
      id: "termo-sublimacion",
      name: "Termo de Sublimación Doble Pared",
      reference: "Ref. Termo Sublimación 500 ml",
      category: "termos",
      categoryLabel: "Termos & Botellas",
      priceCOP: "$10.881 COP",
      imageSrc: "/products/termo-sublimacion.jpg",
      specs: ["Apto Sublimación Full Color", "Tapa Antiderrame", "500 ml"],
      minOrder: "Mínimo 50 uds",
    },
    {
      id: "termo-drop",
      name: "Botella Deportiva Translúcida Drop",
      reference: "Ref. Termo Drop 500 ml",
      category: "termos",
      categoryLabel: "Termos & Botellas",
      priceCOP: "$5.000 COP",
      imageSrc: "/products/termo-drop.jpg",
      specs: ["Polímero Libre de BPA", "Tapa Rosca con Mosquetón", "500 ml"],
      minOrder: "Mínimo 100 uds",
    },
    {
      id: "libreta-ejecutiva",
      name: "Libreta Ejecutiva de Cuero Ecológico 14x21",
      reference: "Ref. Libreta 14x21 cm",
      category: "agendas",
      categoryLabel: "Agendas & Libretas",
      priceCOP: "$14.500 COP",
      imageSrc: "/products/libreta-ejecutiva.jpg",
      specs: ["Pasta Dura Cuerotex", "80 Hojas Rayadas", "Cierre con Resorte"],
      minOrder: "Mínimo 50 uds",
    },
    {
      id: "libreta-mini",
      name: "Libreta de Bolsillo Compacta con Portabolígrafo",
      reference: "Ref. Libreta Mini 14x9 cm",
      category: "agendas",
      categoryLabel: "Agendas & Libretas",
      priceCOP: "$8.900 COP",
      imageSrc: "/products/libreta-mini.jpg",
      specs: ["Formato 14 x 9 cm", "Separador de Cinta", "Hojas Bond 75g"],
      minOrder: "Mínimo 100 uds",
    },
    {
      id: "planeador-corporativo",
      name: "Planeador Semanal de Escritorio",
      reference: "Ref. Planeador 21x14 cm",
      category: "agendas",
      categoryLabel: "Agendas & Libretas",
      priceCOP: "$12.000 COP",
      imageSrc: "/products/planeador-corporativo.jpg",
      specs: ["Argollado Doble O", "52 Semanas no Fechadas", "Base Rígida"],
      minOrder: "Mínimo 50 uds",
    },
    {
      id: "esfero-calima",
      name: "Lapicero Plástico Calima con Grip Ergonómico",
      reference: "Ref. Calima",
      category: "esferos",
      categoryLabel: "Esferos & Bolígrafos",
      priceCOP: "$500 - $580 COP",
      imageSrc: "/products/esfero-calima.jpg",
      specs: ["Tinta Seca 1.0mm", "Variedad de Colores", "Impresión Tampografía"],
      minOrder: "Mínimo 200 uds",
    },
    {
      id: "esfero-pastel",
      name: "Lapicero Soft Pastel de Tinta Gel",
      reference: "Ref. Pastel",
      category: "esferos",
      categoryLabel: "Esferos & Bolígrafos",
      priceCOP: "$750 - $870 COP",
      imageSrc: "/products/esfero-pastel.jpg",
      specs: ["Tonos Pastel Tendencia", "Cuerpo Soft-Touch", "Clip Metálico"],
      minOrder: "Mínimo 100 uds",
    },
    {
      id: "esfero-grecia",
      name: "Bolígrafo Metálico Ejecutivo Grecia",
      reference: "Ref. Grecia Metálico",
      category: "esferos",
      categoryLabel: "Esferos & Bolígrafos",
      priceCOP: "$950 - $1.218 COP",
      imageSrc: "/products/esfero-grecia.jpg",
      specs: ["Cuerpo en Aluminio Anodizado", "Grabado Láser Permanente", "Mina Tipo Parker"],
      minOrder: "Mínimo 50 uds",
    },
    {
      id: "tarjeta-usb",
      name: "Memoria USB Tipo Tarjeta de Crédito",
      reference: "Ref. Tarjeta USB",
      category: "llaveros-usb",
      categoryLabel: "Llaveros & USBs",
      priceCOP: "$18.500 COP",
      imageSrc: "/products/tarjeta-usb.jpg",
      specs: ["Capacidad 16GB / 32GB", "Impresión UV Digital 2 Caras", "Ultra Delgada 2mm"],
      minOrder: "Mínimo 50 uds",
    },
    {
      id: "llavero-metalico",
      name: "Llavero Metálico con Placa Grabable",
      reference: "Ref. Placa Metálica",
      category: "llaveros-usb",
      categoryLabel: "Llaveros & USBs",
      priceCOP: "$3.800 COP",
      imageSrc: "/products/llavero-metalico.jpg",
      specs: ["Aleación Zinc Zamak", "Argolla Plana Reforzada", "Grabado Láser o Doming"],
      minOrder: "Mínimo 100 uds",
    },
  ];

  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const generateWhatsAppInquiry = (prod: ProductCatalogItem) => {
    const text = `*CONSULTA DE PRODUCTO - IMPRESOS AMERICANA*
---------------------------------------
• *Artículo:* ${prod.name}
• *Referencia Oficial:* ${prod.reference}
• *Precio de Catálogo:* ${prod.priceCOP}
• *Tiraje Mínimo:* ${prod.minOrder}
---------------------------------------
_Visto en el catálogo web oficial de Impresos Americana._ Deseo consultar disponibilidad de colores y tiempos de despacho con mi logo impreso.`;
    return `https://wa.me/573163200181?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="catalogo" className="py-24 bg-[#111116] relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E30613]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E30613] font-bold block mb-2">
            CATÁLOGO OFICIAL DE ARTÍCULOS PUBLICITARIOS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-white tracking-tight leading-none mb-4">
            PRODUCTOS CORPORATIVOS & MERCHANDISING
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Referencias reales extraídas de nuestros catálogos impresos oficiales de producción 2024.
            Marcación con tampografía, grabado láser, sublimación o impresión UV directa.
          </p>

          {/* Category Filter Pills (Mobile swipeable + 44px touch targets) */}
          <div className="flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 mt-8 overflow-x-auto pb-2 sm:pb-0 px-1 -mx-4 sm:mx-0 px-4 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as CatalogCategory)}
                  className={`px-5 py-2.5 min-h-[44px] shrink-0 rounded-full text-xs font-montserrat font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[#E30613] text-white shadow-[0_0_15px_rgba(227,6,19,0.5)] scale-105"
                      : "bg-[#1A1A22] text-zinc-300 hover:text-white hover:bg-[#252530] border border-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence>
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl bg-[#181820] border border-white/10 hover:border-[#E30613]/50 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between corner-slash-red"
              >
                {/* Product Image Stage */}
                <div className="relative h-60 w-full bg-[#121217] overflow-hidden border-b border-white/5 flex items-center justify-center p-3">
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Image
                      src={prod.imageSrc}
                      alt={prod.name}
                      width={480}
                      height={320}
                      className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-[#E30613] font-bold border border-white/10">
                    {prod.reference}
                  </div>

                  <button
                    onClick={() => setPreviewImage(prod.imageSrc)}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/75 hover:bg-[#E30613] text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Ampliar vista del catálogo"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#E30613] font-semibold">
                        {prod.categoryLabel}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {prod.minOrder}
                      </span>
                    </div>

                    <h3 className="font-montserrat font-bold text-base text-white group-hover:text-red-400 transition-colors mb-2 leading-snug">
                      {prod.name}
                    </h3>

                    {/* Specs Pills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {prod.specs.map((sp, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131318] text-zinc-300 border border-white/5"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 block">
                        Desde:
                      </span>
                      <span className="font-montserrat font-black text-lg text-white">
                        {prod.priceCOP}
                      </span>
                    </div>

                    <a
                      href={generateWhatsAppInquiry(prod)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(227,6,19,0.4)]"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Cotizar</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Official PDF Catalogs Download Center */}
        <div className="rounded-2xl bg-gradient-to-r from-[#1E1E26] via-[#1A1A22] to-[#16161D] border border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#E30613] text-white flex items-center justify-center font-montserrat font-black shadow-[0_0_20px_#E30613]">
              PDF
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#E30613] font-bold uppercase tracking-widest block">
                DOCUMENTACIÓN Y TARIFARIOS OFICIALES
              </span>
              <h3 className="font-montserrat font-bold text-xl text-white">
                Descarga Nuestros Catálogos Completos de Producción
              </h3>
            </div>
          </div>

          <p className="text-xs text-zinc-300 max-w-3xl mb-6 leading-relaxed">
            Si eres director de mercadeo, agencia o compras institucionales, descarga los
            documentos oficiales con todas las referencias, medidas técnicas y escalas de precios al por mayor.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Catalog 1 */}
            <div className="p-4 rounded-xl bg-[#121217] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">116 Páginas • 98 MB</span>
                <h4 className="font-montserrat font-bold text-sm text-white mt-1 mb-2">
                  Catálogo Maestro Impresos Americana
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Material POP, oficina, termos de temperatura, agendas y tecnología.
                </p>
              </div>
              <a
                href="/catalogos/catalogo-impresos-americana.pdf"
                download="Catalogo_Impresos_Americana.pdf"
                className="mt-4 w-full py-2 px-3 rounded-lg bg-[#22222D] hover:bg-[#E30613] text-white font-montserrat font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar PDF</span>
              </a>
            </div>

            {/* Catalog 2 */}
            <div className="p-4 rounded-xl bg-[#121217] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Edición 2024 • 192 MB</span>
                <h4 className="font-montserrat font-bold text-sm text-white mt-1 mb-2">
                  Esferos y Llaveros Publicitarios
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Línea completa de lapiceros plásticos, metálicos, ecológicos y llaveros en aluminio.
                </p>
              </div>
              <a
                href="/catalogos/esferos-y-llaveros-2024.pdf"
                download="Catalogo_Esferos_Llaveros_2024.pdf"
                className="mt-4 w-full py-2 px-3 rounded-lg bg-[#22222D] hover:bg-[#E30613] text-white font-montserrat font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar PDF</span>
              </a>
            </div>

            {/* Catalog 3 */}
            <div className="p-4 rounded-xl bg-[#121217] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Regalos & POP • 188 MB</span>
                <h4 className="font-montserrat font-bold text-sm text-white mt-1 mb-2">
                  Productos Publicitarios Especiales
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Bolsas ecológicas, paraguas, artículos de viaje y kits corporativos para eventos.
                </p>
              </div>
              <a
                href="/catalogos/productos-publicitarios.pdf"
                download="Catalogo_Productos_Publicitarios.pdf"
                className="mt-4 w-full py-2 px-3 rounded-lg bg-[#22222D] hover:bg-[#E30613] text-white font-montserrat font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Lightbox Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20">
            <Image
              src={previewImage}
              alt="Vista detallada del catálogo"
              width={1200}
              height={800}
              className="w-full h-full object-contain max-h-[85vh]"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded-full font-mono text-xs hover:bg-[#E30613]"
            >
              Cerrar (ESC)
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
