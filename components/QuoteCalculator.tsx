"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  UploadCloud,
  Check,
  ChevronDown,
  Sparkles,
  Clock,
  Plus,
  Minus,
  Truck,
  Download,
  Printer,
  TrendingDown,
} from "lucide-react";
import { ThreePOPViewer } from "./ThreePOPViewer";
import { generateQuotePDF } from "@/lib/generateQuotePDF";
import { PreflightModal } from "./PreflightModal";
import { triggerHaptic } from "@/lib/haptics";
import confetti from "canvas-confetti";

type ProductCategory = "pop" | "gran-formato" | "litografia" | "empaques";

interface SubstrateOption {
  id: string;
  name: string;
  basePriceCOP: number;
  recommended?: boolean;
  leadTime: string;
}

interface FinishOption {
  id: string;
  name: string;
  extraPriceCOP: number;
}

export function QuoteCalculator() {
  const [category, setCategory] = useState<ProductCategory>("pop");
  const [substrate, setSubstrate] = useState<string>("carton-4mm");
  const [finishes, setFinishes] = useState<string[]>(["laminado-mate", "brillo-uv"]);
  const [quantity, setQuantity] = useState<number>(50);
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [customerCity, setCustomerCity] = useState<string>("Cali");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);

  const categories: { id: ProductCategory; label: string; desc: string }[] = [
    {
      id: "pop",
      label: "Exhibidores & Material POP",
      desc: "Stands de piso, exhibidores de mostrador, cabezotes y glorificadores",
    },
    {
      id: "gran-formato",
      label: "Gran Formato & Publicidad Exterior",
      desc: "Lona banner 13oz, vinilo adhesivo microperforado, panaflex y vallas",
    },
    {
      id: "litografia",
      label: "Litografía Comercial & Editorial",
      desc: "Catálogos, carpetas corporativas, folletos, volantes y plegables",
    },
    {
      id: "empaques",
      label: "Cajas Rígidas & Empaques Plegadizos",
      desc: "Cajas microcorrugadas, empaques de lujo con ventana y fajillas",
    },
  ];

  const substratesByCategory: Record<ProductCategory, SubstrateOption[]> = {
    pop: [
      { id: "carton-4mm", name: "Cartón Corrugado 4mm", basePriceCOP: 58000, recommended: true, leadTime: "3-4 días" },
      { id: "mdf-madera", name: "MDF / Madera 6mm", basePriceCOP: 85000, leadTime: "5-7 días" },
      { id: "acrilico", name: "Acrílico / Plástico Termoformado", basePriceCOP: 110000, leadTime: "4-6 días" },
    ],
    "gran-formato": [
      { id: "banner-13oz", name: "Lona Banner 13oz Blackout", basePriceCOP: 32000, recommended: true, leadTime: "2-3 días" },
      { id: "vinilo-adhesivo", name: "Vinilo Adhesivo + Laminado UV", basePriceCOP: 42000, leadTime: "2-3 días" },
      { id: "polionda", name: "Polionda 4mm Corrugado Plástico", basePriceCOP: 48000, leadTime: "3-4 días" },
    ],
    litografia: [
      { id: "propalcote-300", name: "Propalcote 300g", basePriceCOP: 1800, recommended: true, leadTime: "3-4 días" },
      { id: "bond-75", name: "Papel Bond 75g / 90g", basePriceCOP: 950, leadTime: "2-3 días" },
      { id: "kraft-natural", name: "Earth Pact / Kraft 250g", basePriceCOP: 1450, leadTime: "3-4 días" },
    ],
    empaques: [
      { id: "microcorrugado", name: "Cartón Microcorrugado Onda E", basePriceCOP: 14500, recommended: true, leadTime: "4-5 días" },
      { id: "cartulina-sulfatada", name: "Cartulina Sulfatada 16pt", basePriceCOP: 9800, leadTime: "3-4 días" },
      { id: "caja-rigida", name: "Cartón Paja Rígido Forrado", basePriceCOP: 22000, leadTime: "6-8 días" },
    ],
  };

  const finishesList: FinishOption[] = [
    { id: "laminado-mate", name: "Laminado Mate", extraPriceCOP: 3500 },
    { id: "brillo-uv", name: "Brillo UV Parcial", extraPriceCOP: 4200 },
    { id: "troquelado", name: "Troquelado Especial", extraPriceCOP: 2800 },
    { id: "estampado-foil", name: "Estampado Metalizado (Foil)", extraPriceCOP: 5500 },
  ];

  const toggleFinish = (id: string) => {
    triggerHaptic(10);
    if (finishes.includes(id)) {
      setFinishes(finishes.filter((f) => f !== id));
    } else {
      setFinishes([...finishes, id]);
    }
  };

  const selectSubstrate = (id: string) => {
    triggerHaptic(10);
    setSubstrate(id);
  };

  const changeCategory = (newCat: ProductCategory) => {
    triggerHaptic(12);
    setCategory(newCat);
    setSubstrate(substratesByCategory[newCat][0].id);
  };

  const changeQuantity = (newQty: number) => {
    triggerHaptic(10);
    setQuantity(newQty);
  };

  const selectCity = (city: string) => {
    triggerHaptic(10);
    setCustomerCity(city);
  };

  const handlePrint = () => {
    triggerHaptic(12);
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Tier discount calculation
  let discountPercentage = 0;
  if (quantity >= 500) discountPercentage = 30;
  else if (quantity >= 250) discountPercentage = 25;
  else if (quantity >= 100) discountPercentage = 20;
  else if (quantity >= 50) discountPercentage = 15;
  else if (quantity >= 25) discountPercentage = 10;

  const currentCategoryData = categories.find((c) => c.id === category);
  const currentSubstrates = substratesByCategory[category];
  const activeSubstrateObj =
    currentSubstrates.find((s) => s.id === substrate) || currentSubstrates[0];
  const activeSubstrateName = activeSubstrateObj.name;

  // Real-time Pricing Calculations in COP
  const finishesCostPerUnit = finishes.reduce((acc, fId) => {
    const fin = finishesList.find((f) => f.id === fId);
    return acc + (fin ? fin.extraPriceCOP : 0);
  }, 0);

  const baseUnitRaw = activeSubstrateObj.basePriceCOP + finishesCostPerUnit;
  const unitPriceAfterDiscountCOP = Math.round(baseUnitRaw * (1 - discountPercentage / 100));
  const totalSubtotalCOP = unitPriceAfterDiscountCOP * quantity;
  const totalSavingsCOP = (baseUnitRaw - unitPriceAfterDiscountCOP) * quantity;
  const totalIVACOP = Math.round(totalSubtotalCOP * 0.19);
  const totalConIVACOP = totalSubtotalCOP + totalIVACOP;

  const selectedFinishNames = finishes
    .map((fId) => finishesList.find((f) => f.id === fId)?.name)
    .filter(Boolean)
    .join(", ");

  // Confetti micro-interaction burst
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#E30613", "#FFFFFF", "#1E1E24", "#FF3B30", "#F4F5F7"],
    });
  };

  // Download PDF Handler
  const handleDownloadPDF = () => {
    setIsGeneratingPDF(true);
    triggerConfetti();
    try {
      generateQuotePDF({
        categoryName: currentCategoryData?.label || "Material POP",
        substrateName: activeSubstrateName,
        finishes: selectedFinishNames,
        quantity: quantity,
        unitPriceCOP: unitPriceAfterDiscountCOP,
        totalCOP: totalSubtotalCOP,
        discountPercent: discountPercentage,
        customerCity: customerCity,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsGeneratingPDF(false), 800);
    }
  };

  // WhatsApp Payload Encoder with exact COP prices
  const generateWhatsAppLink = () => {
    const message = `*SOLICITUD DE COTIZACIÓN FORMAL - IMPRESOS AMERICANA*
---------------------------------------
• *Producto:* ${currentCategoryData?.label}
• *Sustrato:* ${activeSubstrateName}
• *Acabados:* ${selectedFinishNames || "Estándar"}
• *Cantidad:* ${quantity} unidades
• *Valor Estimado Unitario:* $${unitPriceAfterDiscountCOP.toLocaleString("es-CO")} COP
• *Descuento Volumen:* ${discountPercentage > 0 ? `${discountPercentage}% OFF` : "Tarifa base"} (Ahorro: $${totalSavingsCOP.toLocaleString("es-CO")} COP)
• *Subtotal Neto:* $${totalSubtotalCOP.toLocaleString("es-CO")} COP (+ IVA 19% DIAN)
• *Ciudad de Entrega:* ${customerCity}
• *Archivo Adjunto:* ${uploadedFile ? `Sí (${uploadedFile.name})` : "Pendiente por transferir"}
---------------------------------------
_Generado desde la plataforma web oficial de Impresos Americana._ Deseo confirmar disponibilidad de planta y formalizar orden.`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/573163200181?text=${encoded}`;
  };

  return (
    <section id="cotizador" className="py-24 bg-zinc-50/70 border-b border-zinc-200/70 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-500/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-mono font-bold text-red-800 mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E30613]" />
            COTIZADOR DE PLANTA EN TIEMPO REAL
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black uppercase text-zinc-950 tracking-tight leading-none">
            COTIZA TU PROYECTO INDUSTRIAL
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-normal leading-relaxed">
            Selecciona el sustrato, acabados y volumen deseado. Obtén el valor exacto en Pesos Colombianos (COP), descarga tu cotización formal en PDF con membrete oficial o transfierela a un asesor técnico por WhatsApp.
          </p>
        </div>

        {/* Main 2-Column Configurator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 3D Mockup Visualizer with WebGL Orbit Mode */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200/90 p-6 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] relative">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4">
              <div>
                <h3 className="font-montserrat font-bold text-lg text-zinc-950 leading-tight">
                  {category === "pop" && "Exhibidor POP para Tiendas"}
                  {category === "gran-formato" && "Valla / Bastidor Gran Formato"}
                  {category === "litografia" && "Pieza Litográfica Comercial"}
                  {category === "empaques" && "Caja Rígida & Empaque Estructural"}
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">
                  Ref: IA-2026-PRO • {activeSubstrateName}
                </span>
              </div>

              {/* Toggle 3D WebGL vs 2D Schematic */}
              <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200">
                <button
                  type="button"
                  onClick={() => setViewMode("3d")}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded-lg font-bold transition-colors ${
                    viewMode === "3d" ? "bg-[#E30613] text-white shadow-2xs" : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  3D WebGL
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("2d")}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded-lg font-bold transition-colors ${
                    viewMode === "2d" ? "bg-[#E30613] text-white shadow-2xs" : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  2D Cotas
                </button>
              </div>
            </div>

            {/* Display Stage */}
            {viewMode === "3d" ? (
              <ThreePOPViewer
                materialType={substrate}
                hasUVVarnish={finishes.includes("brillo-uv")}
              />
            ) : (
              <div className="relative h-80 sm:h-96 w-full rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center overflow-hidden shadow-inner">
                <svg
                  viewBox="0 0 320 360"
                  fill="none"
                  className="w-full h-full max-h-80 drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)]"
                >
                  <ellipse cx="160" cy="335" rx="85" ry="14" fill="rgba(0,0,0,0.15)" filter="blur(4px)" />
                  <path d="M85 70L75 320L135 330L135 110L85 70Z" fill="#8F0008" />
                  <path d="M85 70L75 320L100 324L110 85Z" fill="#C50510" />
                  <path d="M85 70L225 70L225 315L135 330L85 70Z" fill="#C9A375" />
                  <path d="M225 70L235 315L175 330L175 105L225 70Z" fill="#E30613" />
                  {/* Shelves */}
                  <polygon points="105,130 205,130 190,160 115,160" fill="#DEBA91" />
                  <polygon points="98,190 212,190 198,225 110,225" fill="#DEBA91" />
                  <polygon points="92,255 218,255 205,290 102,290" fill="#DEBA91" />
                  {/* Crowner */}
                  <path d="M75 40C75 35 79 32 84 32H226C231 32 235 35 235 40V75H75V40Z" fill="#E30613" />
                  <circle cx="110" cy="52" r="7" fill="#FFFFFF" />
                  <text x="125" y="56" fill="#FFFFFF" fontSize="10" fontFamily="Montserrat" fontWeight="900">
                    IMPRESOS AMERICANA
                  </text>
                  <path d="M80 305L230 305L220 340L90 340Z" fill="#CBD5E1" />
                </svg>

                {/* Hotspot callouts */}
                <div className="absolute top-10 right-4 text-right z-20 pointer-events-none">
                  <span className="text-[10px] font-mono font-bold text-zinc-800 uppercase bg-white/95 px-2.5 py-1 rounded-md border border-zinc-200 shadow-xs">
                    Material: {activeSubstrateName}
                  </span>
                </div>
                <div className="absolute top-1/3 left-4 text-left z-20 pointer-events-none">
                  <span className="text-[10px] font-mono font-bold text-zinc-800 uppercase bg-white/95 px-2.5 py-1 rounded-md border border-zinc-200 shadow-xs">
                    Altura: 160 cm
                  </span>
                </div>
              </div>
            )}

            {/* Live Pricing Summary Box inside left column */}
            <div className="mt-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">
                  Valor Estimado Unitario:
                </span>
                <span className="text-xl sm:text-2xl font-montserrat font-black text-zinc-950">
                  ${unitPriceAfterDiscountCOP.toLocaleString("es-CO")}{" "}
                  <span className="text-xs text-zinc-500 font-sans font-normal">COP</span>
                </span>
              </div>

              {discountPercentage > 0 && (
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold shadow-2xs">
                    -{discountPercentage}% Volumen
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                    Ahorras ${totalSavingsCOP.toLocaleString("es-CO")} COP
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Step-by-Step Configurator Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)] relative">
            <div className="space-y-6">
              {/* STEP 1: Categoría de Producto */}
              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#E30613] block mb-2">
                  PASO 1: Categoría de Producto
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => changeCategory(e.target.value as ProductCategory)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 font-montserrat font-bold text-sm appearance-none focus:bg-white focus:outline-none focus:border-[#E30613] transition-colors cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id} className="bg-white text-zinc-900">
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* STEP 2: Material y Sustrato */}
              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#E30613] block mb-2">
                  PASO 2: Material y Sustrato
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentSubstrates.map((s) => {
                    const isSelected = substrate === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => selectSubstrate(s.id)}
                        className={`p-3.5 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? "border-[#E30613] bg-red-50 ring-2 ring-red-500/20 text-zinc-950"
                            : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300 text-zinc-700"
                        }`}
                      >
                        <span
                          className={`text-xs font-montserrat font-bold leading-tight ${
                            isSelected ? "text-zinc-950" : "text-zinc-800"
                          }`}
                        >
                          {s.name}
                        </span>
                        {s.recommended && (
                          <span className="text-[10px] font-mono text-[#E30613] font-bold mt-2 block">
                            (Recomendado)
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Acabados Especiales */}
              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#E30613] block mb-2">
                  PASO 3: Acabados Especiales
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {finishesList.map((finish) => {
                    const isChecked = finishes.includes(finish.id);
                    return (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => toggleFinish(finish.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                          isChecked
                            ? "bg-red-50/80 border-[#E30613] text-zinc-950 font-medium"
                            : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-[#E30613] border-[#E30613] text-white"
                              : "border-zinc-400 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold">{finish.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 4: Cantidad con Volume Discount Badges */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#E30613]">
                    PASO 4: Cantidad
                  </label>
                  <span className="text-xs text-zinc-500 font-mono font-medium">
                    Escala de Descuento por Volumen
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {/* Stepper buttons (44x44px touch targets) */}
                  <div className="flex items-center bg-zinc-100 border border-zinc-200 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => changeQuantity(Math.max(10, quantity - 25))}
                      className="w-11 h-11 flex items-center justify-center hover:bg-zinc-200 active:bg-zinc-300 text-zinc-900 rounded-lg transition-colors font-bold"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center font-montserrat font-black text-xl text-zinc-950">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQuantity(quantity + 25)}
                      className="w-11 h-11 flex items-center justify-center hover:bg-zinc-200 active:bg-zinc-300 text-zinc-900 rounded-lg transition-colors font-bold"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-sm font-semibold text-zinc-700">unidades</span>

                  {discountPercentage > 0 && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-montserrat font-bold shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ahorra {discountPercentage}%</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 w-full sm:w-auto sm:ml-auto pt-2 sm:pt-0">
                    {[25, 50, 100, 250, 500].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => changeQuantity(tier)}
                        className={`flex-1 sm:flex-none text-xs font-mono font-bold py-2 px-3 rounded-lg border transition-colors min-h-[40px] flex items-center justify-center ${
                          quantity === tier
                            ? "bg-[#E30613] text-white border-[#E30613] shadow-xs"
                            : "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200"
                        }`}
                      >
                        {tier}u
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Scale Economy Curve */}
                <div className="mt-3.5 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600 mb-2">
                    <span className="font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                      Economía de Escala Industrial
                    </span>
                    <span className="text-emerald-700 font-bold">Hasta -30% por volumen</span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {[
                      { qty: 25, disc: 10 },
                      { qty: 50, disc: 15 },
                      { qty: 100, disc: 20 },
                      { qty: 250, disc: 25 },
                      { qty: 500, disc: 30 },
                    ].map((tierItem) => {
                      const tierUnitPrice = Math.round(baseUnitRaw * (1 - tierItem.disc / 100));
                      const isSelected = quantity === tierItem.qty;
                      return (
                        <button
                          key={tierItem.qty}
                          type="button"
                          onClick={() => changeQuantity(tierItem.qty)}
                          className={`p-2 rounded-xl text-center border transition-all ${
                            isSelected
                              ? "bg-white border-[#E30613] shadow-sm ring-2 ring-red-500/20 scale-[1.03]"
                              : "bg-white/80 border-zinc-200 hover:border-zinc-300 hover:bg-white"
                          }`}
                        >
                          <span className={`block font-montserrat font-bold text-xs ${isSelected ? "text-[#E30613]" : "text-zinc-800"}`}>
                            {tierItem.qty}u
                          </span>
                          <span className="block text-[10px] font-mono text-emerald-600 font-bold mt-0.5">
                            -{tierItem.disc}%
                          </span>
                          <span className="block text-[9px] font-mono text-zinc-500 truncate mt-0.5">
                            ${Math.round(tierUnitPrice / 1000)}k/u
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Delivery destination selector */}
              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 block mb-1.5 font-semibold">
                  Ciudad de Despacho (Colombia)
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Cali (Planta Principal)", "Bogotá D.C.", "Medellín", "Barranquilla", "Nacional"].map(
                    (city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => selectCity(city)}
                        className={`text-xs px-3.5 py-2.5 min-h-[42px] rounded-xl border transition-all flex items-center font-medium ${
                          customerCity === city
                            ? "bg-zinc-900 border-zinc-900 text-white font-bold shadow-xs"
                            : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300"
                        }`}
                      >
                        {city}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Price & CTA Floating Panel */}
        <div className="mt-8 rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Summary Box with exact COP Totals */}
            <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-zinc-200 pb-4 md:pb-0 md:pr-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E30613] font-bold block mb-1">
                Resumen de Configuración & Cotización Formal
              </span>
              <h4 className="text-xl font-montserrat font-bold text-zinc-950 mb-2">
                {currentCategoryData?.label} x {quantity} uds
              </h4>
              <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                • <strong className="text-zinc-900">Sustrato:</strong> {activeSubstrateName} <br />
                • <strong className="text-zinc-900">Acabados:</strong> {selectedFinishNames || "Estándar"} <br />
                • <strong className="text-zinc-900">Subtotal:</strong> ${totalSubtotalCOP.toLocaleString("es-CO")} COP <br />
                • <strong className="text-zinc-900">Total con IVA (19% DIAN):</strong>{" "}
                <span className="text-zinc-950 font-bold text-sm bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
                  ${totalConIVACOP.toLocaleString("es-CO")} COP
                </span>
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  Entrega: 3-5 días hábiles
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-zinc-700 font-semibold">
                  <Truck className="w-3.5 h-3.5 text-[#E30613]" />
                  {customerCity}
                </span>
              </div>
            </div>

            {/* Middle Upload Design Trigger */}
            <div className="md:col-span-3">
              <button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className="w-full h-full p-4 rounded-2xl border border-dashed border-zinc-300 hover:border-[#E30613] bg-zinc-50/70 hover:bg-red-50/20 transition-all flex flex-col items-center justify-center text-center group min-h-[96px]"
              >
                <UploadCloud className="w-6 h-6 text-zinc-500 group-hover:text-[#E30613] transition-colors mb-1.5" />
                <span className="text-xs font-montserrat font-bold text-zinc-950 block">
                  {uploadedFile ? uploadedFile.name : "Subir mi Diseño (Preflight)"}
                </span>
                <span className="text-[11px] text-zinc-500 font-mono mt-0.5">
                  {uploadedFile ? "Arte Validado ✓" : "(.PDF, .AI, .CDR a 300 DPI)"}
                </span>
              </button>
            </div>

            {/* Right Giant WhatsApp Action Button + Download PDF + Print Button */}
            <div className="md:col-span-4 space-y-2.5">
              <a
                href={generateWhatsAppLink()}
                onClick={() => {
                  triggerConfetti();
                  triggerHaptic(20);
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full relative group overflow-hidden bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-black text-sm sm:text-base uppercase tracking-wider py-4 px-6 rounded-xl shadow-md shadow-red-500/20 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.01]"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  <MessageCircle className="w-5 h-5 text-white fill-white/20" />
                  <span>ENVIAR COTIZACIÓN A WHATSAPP</span>
                </span>
                <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Download Formal PDF Quote Button */}
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic(12);
                    handleDownloadPDF();
                  }}
                  disabled={isGeneratingPDF}
                  className="w-full py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-montserrat font-bold text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-zinc-200"
                >
                  <Download className="w-4 h-4 text-[#E30613] shrink-0" />
                  <span className="truncate">
                    {isGeneratingPDF ? "Generando..." : "Descargar PDF"}
                  </span>
                </button>

                {/* Print Sheet Button */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-montserrat font-bold text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-zinc-200"
                  title="Imprimir resumen de cotización (Ctrl+P)"
                >
                  <Printer className="w-4 h-4 text-zinc-600 shrink-0" />
                  <span>Imprimir Ficha</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preflight Preprensa & Vector Quality Validator Modal */}
      <PreflightModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onFileApproved={(file) => {
          setUploadedFile(file);
          setShowUploadModal(false);
          triggerConfetti();
        }}
      />
    </section>
  );
}
