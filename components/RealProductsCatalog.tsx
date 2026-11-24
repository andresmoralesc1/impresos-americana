"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, MessageCircle, Eye, Search, X, Copy, Check } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { PRODUCTS_QUERY, CATEGORIES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

type CatalogCategory = string;

interface SiteSettingsData {
  whatsappNumber?: string;
  contactEmail?: string;
  address?: string;
  businessHours?: string;
  announcementActive?: boolean;
  announcementBadge?: string;
  announcementText?: string;
  announcementLink?: string;
  catalogPdfMaestroUrl?: string;
  catalogPdfEsferosUrl?: string;
  catalogPdfEspecialesUrl?: string;
}

interface ProductCatalogItem {
  id: string;
  name: string;
  reference: string;
  category: CatalogCategory;
  categoryLabel: string;
  priceCOP: string;
  imageSrc: string;
  gallery?: string[];
  specs: string[];
  minOrder: string;
}

const formatPriceCOP = (price?: string) => {
  if (!price) return "$0 COP";
  const trimmed = price.trim();
  if (trimmed.includes("$") || trimmed.toUpperCase().includes("COP")) return trimmed;
  const num = Number(trimmed.replace(/[^0-9]/g, ""));
  if (!isNaN(num) && num > 0) {
    return `$${new Intl.NumberFormat("es-CO").format(num)} COP`;
  }
  return trimmed;
};

const defaultCategories = [
  { id: "todos", label: "Todos los Productos" },
  { id: "termos", label: "Termos & Botellas" },
  { id: "agendas", label: "Agendas & Libretas" },
  { id: "esferos", label: "Esferos & Bolígrafos" },
  { id: "llaveros-usb", label: "Llaveros & USBs" },
];

const defaultProducts: ProductCatalogItem[] = [
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

export function RealProductsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<CatalogCategory>("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewProduct, setPreviewProduct] = useState<ProductCatalogItem | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);
  const [copiedRefId, setCopiedRefId] = useState<string | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null);
  const [categories, setCategories] = useState(defaultCategories);
  const [productsList, setProductsList] = useState<ProductCatalogItem[]>(defaultProducts);
  const [isFromSanity, setIsFromSanity] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(null);

  const handleCopyReference = (refText: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic(10);
    navigator.clipboard.writeText(refText);
    setCopiedRefId(id);
    setTimeout(() => setCopiedRefId(null), 2000);
  };

  const handlePdfDownloadClick = (pdfName: string) => {
    triggerHaptic(12);
    setDownloadingPdf(pdfName);
    setTimeout(() => setDownloadingPdf(null), 2500);
  };

  useEffect(() => {
    if (!previewProduct) return;
    setActiveModalImage(previewProduct.imageSrc);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewProduct(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewProduct]);

  useEffect(() => {
    if (!isSanityConfigured || !client) return;

    let isMounted = true;

    Promise.all([
      client.fetch<Array<{ id: string; label: string }>>(CATEGORIES_QUERY),
      client.fetch<
        Array<{
          id: string;
          name: string;
          slug?: string;
          reference?: string;
          category?: string;
          categoryLabel?: string;
          priceCOP?: string;
          image?: Parameters<typeof urlForImage>[0];
          gallery?: Array<Parameters<typeof urlForImage>[0]>;
          specs?: string[];
          minOrder?: string;
        }>
      >(PRODUCTS_QUERY),
      client.fetch<SiteSettingsData>(SITE_SETTINGS_QUERY),
    ])
      .then(([sanityCategories, sanityProducts, sanitySettings]) => {
        if (!isMounted) return;

        if (sanitySettings) {
          setSiteSettings(sanitySettings);
        }

        if (sanityProducts && sanityProducts.length > 0) {
          // Dynamic category detection
          const foundCategories = new Map<string, string>();
          defaultCategories.forEach((c) => {
            if (c.id !== "todos") foundCategories.set(c.id, c.label);
          });
          if (sanityCategories && sanityCategories.length > 0) {
            sanityCategories.forEach((c) => foundCategories.set(c.id, c.label));
          }
          sanityProducts.forEach((p) => {
            if (p.category && !foundCategories.has(p.category)) {
              foundCategories.set(p.category, p.categoryLabel || p.category);
            }
          });

          setCategories([
            { id: "todos", label: "Todos los Productos" },
            ...Array.from(foundCategories.entries()).map(([id, label]) => ({
              id,
              label,
            })),
          ]);

          const mapped: ProductCatalogItem[] = sanityProducts.map((p) => {
            const imgUrl = p.image ? urlForImage(p.image)?.width(800).url() : null;
            const galleryUrls = Array.isArray(p.gallery)
              ? p.gallery
                  .map((g) => (g ? urlForImage(g)?.width(800).url() : null))
                  .filter((url): url is string => Boolean(url))
              : [];

            return {
              id: p.id || p.slug || Math.random().toString(),
              name: p.name,
              reference: p.reference || "Ref. Oficial",
              category: p.category || "termos",
              categoryLabel: p.categoryLabel || "General",
              priceCOP: formatPriceCOP(p.priceCOP),
              imageSrc: imgUrl || "/products/termo-temperatura.jpg",
              gallery: galleryUrls.length > 0 ? galleryUrls : undefined,
              specs: Array.isArray(p.specs) ? p.specs : [],
              minOrder: p.minOrder || "Mínimo 25 uds",
            };
          });

          setProductsList(mapped);
          setIsFromSanity(true);
        }
      })
      .catch((err) => {
        console.warn("Sanity fetch skipped (using default catalog):", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = productsList.filter((p) => {
    const matchesCategory = selectedCategory === "todos" || p.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.reference.toLowerCase().includes(query) ||
      p.specs.some((s) => s.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const generateWhatsAppInquiry = (prod: ProductCatalogItem) => {
    const rawNumber = siteSettings?.whatsappNumber?.replace(/[^0-9]/g, "") || "573163200181";
    const text = `*CONSULTA DE PRODUCTO - IMPRESOS AMERICANA*
---------------------------------------
• *Artículo:* ${prod.name}
• *Referencia Oficial:* ${prod.reference}
• *Precio de Catálogo:* ${prod.priceCOP}
• *Tiraje Mínimo:* ${prod.minOrder}
---------------------------------------
_Visto en el catálogo web oficial de Impresos Americana._ Deseo consultar disponibilidad de colores y tiempos de despacho con mi logo impreso.`;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="catalogo" className="py-24 bg-white relative overflow-hidden border-t border-zinc-200">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E30613]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {siteSettings?.announcementActive && siteSettings?.announcementText && (
          <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-zinc-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-red-500/30">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-[#E30613] text-white font-mono font-bold text-[10px] tracking-wider uppercase shrink-0">
                {siteSettings.announcementBadge || "AVISO"}
              </span>
              <p className="text-xs sm:text-sm font-medium text-zinc-200">
                {siteSettings.announcementText}
              </p>
            </div>
            {siteSettings.announcementLink && (
              <a
                href={siteSettings.announcementLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-montserrat font-bold whitespace-nowrap transition-colors"
              >
                Ver más →
              </a>
            )}
          </div>
        )}

        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E30613] font-bold block mb-2">
            CATÁLOGO OFICIAL DE ARTÍCULOS PUBLICITARIOS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-none mb-4">
            PRODUCTOS CORPORATIVOS & MERCHANDISING
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Referencias reales extraídas de nuestros catálogos impresos oficiales de producción 2024.
            Marcación con tampografía, grabado láser, sublimación o impresión UV directa.
          </p>

          {isFromSanity && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sincronizado en vivo con Panel CMS
            </div>
          )}

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mt-6">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, referencia (ej. termo, libreta)..."
                className="w-full pl-11 pr-10 py-2.5 text-base sm:text-sm bg-zinc-50 border border-zinc-200 rounded-full text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613] transition-all font-montserrat shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 p-1 text-zinc-400 hover:text-zinc-700 transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills with Item Count Badges */}
          <div className="flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 mt-8 overflow-x-auto pb-2 sm:pb-0 px-1 -mx-4 sm:mx-0 px-4 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === "todos"
                ? productsList.length
                : productsList.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    triggerHaptic(10);
                    setSelectedCategory(cat.id as CatalogCategory);
                  }}
                  className={`relative px-4 sm:px-5 py-2.5 min-h-[44px] shrink-0 rounded-full text-xs font-montserrat font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "bg-[#E30613] text-white shadow-[0_4px_16px_rgba(227,6,19,0.3)] scale-[1.02]"
                      : "bg-zinc-100/90 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80 border border-zinc-200"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Counter info */}
          <div className="mt-4 text-xs font-mono text-zinc-500">
            Mostrando <span className="font-bold text-zinc-900">{filteredProducts.length}</span> referencias industriales
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-zinc-200 mb-16">
            <p className="text-zinc-600 font-montserrat text-sm mb-3">
              No se encontraron productos para &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("todos");
              }}
              className="px-4 py-2 text-xs font-semibold text-[#E30613] hover:text-[#b8000b] underline underline-offset-4"
            >
              Restablecer filtros de búsqueda
            </button>
          </div>
        ) : (
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
                  className="group rounded-2xl bg-white border border-zinc-200 hover:border-[#E30613]/50 transition-all duration-300 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between corner-slash-red"
                >
                {/* Product Image Stage */}
                <div
                  className="relative h-60 w-full bg-zinc-50 overflow-hidden border-b border-zinc-100 flex items-center justify-center p-3 cursor-pointer"
                  onClick={() => {
                    triggerHaptic(10);
                    setPreviewProduct(prod);
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Image
                      src={prod.imageSrc}
                      alt={prod.name}
                      width={480}
                      height={320}
                      className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Top Reference Badge with 1-click Copy */}
                  <div className="absolute top-3 left-3 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleCopyReference(prod.reference, prod.id, e)}
                      title="Copiar referencia al portapapeles"
                      className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-[#E30613] hover:text-white hover:bg-[#E30613] font-bold border border-zinc-200 shadow-sm flex items-center gap-1.5 transition-colors"
                    >
                      {copiedRefId === prod.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copiada</span>
                        </>
                      ) : (
                        <>
                          <span>{prod.reference}</span>
                          <Copy className="w-2.5 h-2.5 opacity-60" />
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerHaptic(10);
                      setPreviewProduct(prod);
                    }}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-zinc-900/80 hover:bg-[#E30613] text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    title="Ampliar vista del producto"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#E30613] font-bold">
                        {prod.categoryLabel}
                      </span>
                      <span className="text-[11px] text-zinc-500 font-mono">
                        {prod.minOrder}
                      </span>
                    </div>

                    <h3
                      onClick={() => setPreviewProduct(prod)}
                      className="font-montserrat font-bold text-base text-zinc-900 group-hover:text-[#E30613] transition-colors mb-2 leading-snug cursor-pointer"
                    >
                      {prod.name}
                    </h3>

                    {/* Specs Pills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {prod.specs.map((sp, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 block">
                        Desde:
                      </span>
                      <span className="font-montserrat font-black text-lg text-zinc-950">
                        {prod.priceCOP}
                      </span>
                    </div>

                    <a
                      href={generateWhatsAppInquiry(prod)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_4px_14px_rgba(227,6,19,0.25)] hover:shadow-[0_6px_20px_rgba(227,6,19,0.35)] active:scale-95"
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
        )}

        {/* Official PDF Catalogs Download Center */}
        <div className="rounded-2xl bg-zinc-50/80 border border-zinc-200 p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#E30613] text-white flex items-center justify-center font-montserrat font-black shadow-[0_4px_14px_rgba(227,6,19,0.3)]">
              PDF
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#E30613] font-bold uppercase tracking-widest block">
                DOCUMENTACIÓN Y TARIFARIOS OFICIALES
              </span>
              <h3 className="font-montserrat font-bold text-xl text-zinc-950">
                Descarga Nuestros Catálogos Completos de Producción
              </h3>
            </div>
          </div>

          <p className="text-xs text-zinc-600 max-w-3xl mb-6 leading-relaxed">
            Si eres director de mercadeo, agencia o compras institucionales, descarga los
            documentos oficiales con todas las referencias, medidas técnicas y escalas de precios al por mayor.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Catalog 1 */}
            <div className="p-5 rounded-xl bg-white border border-zinc-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold">116 Páginas • 6.6 MB (Optimizado)</span>
                <h4 className="font-montserrat font-bold text-sm text-zinc-900 mt-1 mb-2">
                  Catálogo Maestro Impresos Americana
                </h4>
                <p className="text-[11px] text-zinc-500">
                  Material POP, oficina, termos de temperatura, agendas y tecnología.
                </p>
              </div>
              <a
                href={siteSettings?.catalogPdfMaestroUrl || "/catalogos/catalogo-impresos-americana.pdf"}
                download="Catalogo_Impresos_Americana.pdf"
                onClick={() => handlePdfDownloadClick("maestro")}
                className="mt-4 w-full py-2.5 px-3 rounded-lg bg-zinc-100 hover:bg-[#E30613] text-zinc-800 hover:text-white font-montserrat font-semibold text-xs flex items-center justify-center gap-2 border border-zinc-200 transition-colors"
              >
                {downloadingPdf === "maestro" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>¡Descargando Catálogo!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar PDF (6.6 MB)</span>
                  </>
                )}
              </a>
            </div>

            {/* Catalog 2 */}
            <div className="p-5 rounded-xl bg-white border border-zinc-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold">Edición 2024 • 24 MB (Optimizado)</span>
                <h4 className="font-montserrat font-bold text-sm text-zinc-900 mt-1 mb-2">
                  Esferos y Llaveros Publicitarios
                </h4>
                <p className="text-[11px] text-zinc-500">
                  Línea completa de lapiceros plásticos, metálicos, ecológicos y llaveros en aluminio.
                </p>
              </div>
              <a
                href={siteSettings?.catalogPdfEsferosUrl || "/catalogos/esferos-y-llaveros-2024.pdf"}
                download="Catalogo_Esferos_Llaveros_2024.pdf"
                onClick={() => handlePdfDownloadClick("esferos")}
                className="mt-4 w-full py-2.5 px-3 rounded-lg bg-zinc-100 hover:bg-[#E30613] text-zinc-800 hover:text-white font-montserrat font-semibold text-xs flex items-center justify-center gap-2 border border-zinc-200 transition-colors"
              >
                {downloadingPdf === "esferos" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>¡Descargando Catálogo!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar PDF (24 MB)</span>
                  </>
                )}
              </a>
            </div>

            {/* Catalog 3 */}
            <div className="p-5 rounded-xl bg-white border border-zinc-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold">Regalos & POP • 31 MB (Optimizado)</span>
                <h4 className="font-montserrat font-bold text-sm text-zinc-900 mt-1 mb-2">
                  Productos Publicitarios Especiales
                </h4>
                <p className="text-[11px] text-zinc-500">
                  Bolsas ecológicas, paraguas, artículos de viaje y kits corporativos para eventos.
                </p>
              </div>
              <a
                href={siteSettings?.catalogPdfEspecialesUrl || "/catalogos/productos-publicitarios.pdf"}
                download="Catalogo_Productos_Publicitarios.pdf"
                onClick={() => handlePdfDownloadClick("especiales")}
                className="mt-4 w-full py-2.5 px-3 rounded-lg bg-zinc-100 hover:bg-[#E30613] text-zinc-800 hover:text-white font-montserrat font-semibold text-xs flex items-center justify-center gap-2 border border-zinc-200 transition-colors"
              >
                {downloadingPdf === "especiales" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>¡Descargando Catálogo!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar PDF (31 MB)</span>
                  </>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Rich Product Details & Lightbox Modal */}
      {previewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/75 backdrop-blur-md"
          onClick={() => setPreviewProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-zinc-200 shadow-2xl p-5 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E30613] font-bold block">
                  {previewProduct.categoryLabel} • {previewProduct.reference}
                </span>
                <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-zinc-950">
                  {previewProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewProduct(null)}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <div className="relative h-64 bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden flex items-center justify-center p-4">
                  <Image
                    src={activeModalImage || previewProduct.imageSrc}
                    alt={previewProduct.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
                {previewProduct.gallery && previewProduct.gallery.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    <button
                      type="button"
                      onClick={() => setActiveModalImage(previewProduct.imageSrc)}
                      className={`relative w-12 h-12 rounded-lg border overflow-hidden shrink-0 transition-all ${
                        (activeModalImage || previewProduct.imageSrc) === previewProduct.imageSrc
                          ? "border-[#E30613] ring-2 ring-[#E30613]/20"
                          : "border-zinc-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={previewProduct.imageSrc}
                        alt="Foto principal"
                        fill
                        className="object-cover"
                      />
                    </button>
                    {previewProduct.gallery.map((imgUrl, gIdx) => (
                      <button
                        key={gIdx}
                        type="button"
                        onClick={() => setActiveModalImage(imgUrl)}
                        className={`relative w-12 h-12 rounded-lg border overflow-hidden shrink-0 transition-all ${
                          activeModalImage === imgUrl
                            ? "border-[#E30613] ring-2 ring-[#E30613]/20"
                            : "border-zinc-200 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={imgUrl}
                          alt={`Foto galería ${gIdx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-zinc-500 uppercase block">Precio Referencial</span>
                  <span className="font-montserrat font-black text-2xl text-zinc-950">{previewProduct.priceCOP}</span>
                  <span className="text-xs font-mono text-zinc-500 block mt-0.5">({previewProduct.minOrder})</span>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold uppercase text-zinc-700 block mb-2">Especificaciones de Fabricación</span>
                  <div className="flex flex-wrap gap-1.5">
                    {previewProduct.specs.map((sp, idx) => (
                      <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2">
                  <a
                    href={generateWhatsAppInquiry(previewProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-montserrat font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Cotizar este producto por WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={(e) => handleCopyReference(previewProduct.reference, previewProduct.id, e)}
                    className="w-full py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-montserrat font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-zinc-200"
                  >
                    {copiedRefId === previewProduct.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Referencia Copiada</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Copiar Referencia ({previewProduct.reference})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
