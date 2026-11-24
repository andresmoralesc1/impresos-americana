"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import {
  UploadCloud,
  Edit3,
  Trash2,
  Printer,
  Share2,
  ExternalLink,
  Camera,
  Layers,
  HelpCircle,
  Check,
  ArrowRight,
  EyeOff,
  Phone,
  FileDown,
  Megaphone,
  Smartphone,
  Copy,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

export default function GuiaAdminPage() {
  const [activeTab, setActiveTab] = useState<
    "crear" | "editar" | "fotos" | "eliminar" | "faq"
  >("crear");
  const [shared, setShared] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handlePrint = () => {
    triggerHaptic(10);
    window.print();
  };

  const handleCopyLink = () => {
    triggerHaptic(10);
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : "https://impresosamericana.com/guia-admin";
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = () => {
    triggerHaptic(10);
    const message = `*Manual de Administración — Impresos Americana*\nGuía paso a paso para subir productos, modificar precios y gestionar catálogos en la web:\n${
      typeof window !== "undefined"
        ? window.location.href
        : "https://impresosamericana.com/guia-admin"
    }\n\nPanel administrativo: https://impresosamericana.com/admin`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden relative bg-gradient-to-br from-slate-100 via-zinc-50 to-stone-100 text-zinc-900 selection:bg-[#E30613] selection:text-white">
      {/* Specular Ambient Glow & Ultra-Glossy Glass Lighting (No Green) */}
      <div className="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
      <div className="absolute -top-32 left-1/3 w-[650px] h-[550px] bg-red-500/7 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-[550px] h-[550px] bg-slate-300/30 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-red-600/4 rounded-full blur-[180px] pointer-events-none" />

      {/* 1. Header */}
      <PageHeader
        badge="ADMINISTRACIÓN & CONTENIDOS"
        title="Manual del Panel de Catálogo"
        description="Procedimientos claros para subir artículos, actualizar precios en Pesos Colombianos, renovar fotografías y gestionar catálogos PDF en la web de Impresos Americana."
        breadcrumbs={[
          { label: "Catálogo", href: "/catalogo" },
          { label: "Manual de Administración" },
        ]}
      />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 space-y-6 sm:space-y-8 min-w-0">
        {/* Glassmorphism Quick Actions Top Bar */}
        <div className="w-full p-4 sm:p-5 rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] ring-1 ring-zinc-950/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 min-w-0">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E30613] animate-pulse shrink-0" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700">
                Panel Sanity Studio v4
              </span>
            </div>
            <p className="text-xs text-zinc-600 truncate">
              Ruta directa de acceso:{" "}
              <code className="px-2 py-0.5 rounded-md bg-white/90 border border-zinc-200 font-mono text-zinc-950 font-bold text-[11px] shadow-2xs">
                /admin
              </code>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/90 hover:bg-white text-zinc-800 border border-white/90 text-xs font-semibold transition-all shadow-2xs hover:shadow-xs"
            >
              {copiedLink ? (
                <Check className="w-3.5 h-3.5 text-[#E30613]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-zinc-500" />
              )}
              <span>{copiedLink ? "Copiado" : "Copiar enlace"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/90 hover:bg-white text-zinc-800 border border-white/90 text-xs font-semibold transition-all shadow-2xs hover:shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-500" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-zinc-300" />
              <span>{shared ? "Abierto" : "WhatsApp"}</span>
            </button>

            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-red-500/20 ml-auto md:ml-0"
            >
              <span>Entrar a /admin</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation (Exact 5 Tabs in Glossy Grid, 100% visible on all viewports without truncation) */}
        <div className="w-full p-1.5 sm:p-2 rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] ring-1 ring-zinc-950/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab("crear");
            }}
            className={`w-full px-3 py-3 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-montserrat transition-all duration-200 text-center ${
              activeTab === "crear"
                ? "bg-zinc-950 text-white shadow-md font-bold scale-[1.01]"
                : "bg-white/60 hover:bg-white text-zinc-700 hover:text-zinc-950 border border-white/80 font-semibold shadow-2xs"
            }`}
          >
            <UploadCloud className="w-4 h-4 text-[#E30613] shrink-0" />
            <span className="truncate">1. Subir Producto</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab("editar");
            }}
            className={`w-full px-3 py-3 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-montserrat transition-all duration-200 text-center ${
              activeTab === "editar"
                ? "bg-zinc-950 text-white shadow-md font-bold scale-[1.01]"
                : "bg-white/60 hover:bg-white text-zinc-700 hover:text-zinc-950 border border-white/80 font-semibold shadow-2xs"
            }`}
          >
            <Edit3 className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="truncate">2. Precios &amp; Textos</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab("fotos");
            }}
            className={`w-full px-3 py-3 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-montserrat transition-all duration-200 text-center ${
              activeTab === "fotos"
                ? "bg-zinc-950 text-white shadow-md font-bold scale-[1.01]"
                : "bg-white/60 hover:bg-white text-zinc-700 hover:text-zinc-950 border border-white/80 font-semibold shadow-2xs"
            }`}
          >
            <Camera className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="truncate">3. Fotos &amp; Galería</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab("eliminar");
            }}
            className={`w-full px-3 py-3 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-montserrat transition-all duration-200 text-center ${
              activeTab === "eliminar"
                ? "bg-zinc-950 text-white shadow-md font-bold scale-[1.01]"
                : "bg-white/60 hover:bg-white text-zinc-700 hover:text-zinc-950 border border-white/80 font-semibold shadow-2xs"
            }`}
          >
            <Trash2 className="w-4 h-4 text-red-500 shrink-0" />
            <span className="truncate">4. Pausar / Eliminar</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab("faq");
            }}
            className={`w-full sm:col-span-2 lg:col-span-1 px-3 py-3 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-montserrat transition-all duration-200 text-center ${
              activeTab === "faq"
                ? "bg-zinc-950 text-white shadow-md font-bold scale-[1.01]"
                : "bg-white/60 hover:bg-white text-zinc-700 hover:text-zinc-950 border border-white/80 font-semibold shadow-2xs"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#E30613] shrink-0" />
            <span className="truncate">5. Preguntas &amp; Ajustes</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: SUBIR UN PRODUCTO                                       */}
        {/* ============================================================== */}
        {activeTab === "crear" && (
          <div className="space-y-6 w-full min-w-0">
            {/* 3 Step Cards in Frosted Glass */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
              <div className="p-5 sm:p-6 rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-zinc-950/5 space-y-2 hover:bg-white/90 transition-all min-w-0">
                <span className="font-mono text-xs font-bold text-[#E30613] block">
                  PASO 1
                </span>
                <h4 className="font-montserrat font-bold text-sm text-zinc-950">
                  Ingresa al panel
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed break-words">
                  Abre{" "}
                  <Link
                    href="/admin"
                    className="text-[#E30613] font-mono hover:underline font-semibold"
                  >
                    /admin
                  </Link>{" "}
                  en tu navegador. En la columna izquierda, pulsa en{" "}
                  <strong>Producto del Catálogo</strong>.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-zinc-950/5 space-y-2 hover:bg-white/90 transition-all min-w-0">
                <span className="font-mono text-xs font-bold text-[#E30613] block">
                  PASO 2
                </span>
                <h4 className="font-montserrat font-bold text-sm text-zinc-950">
                  Completa los datos técnicos
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed break-words">
                  Indica nombre comercial, referencia interna de fábrica, precio
                  en COP, tiraje mínimo requerido y categoría.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-zinc-950/5 space-y-2 hover:bg-white/90 transition-all min-w-0">
                <span className="font-mono text-xs font-bold text-[#E30613] block">
                  PASO 3
                </span>
                <h4 className="font-montserrat font-bold text-sm text-zinc-950">
                  Publica el cambio
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed break-words">
                  Haz clic en el botón <strong>Publish</strong> en la
                  esquina inferior derecha. El artículo queda visible
                  inmediatamente en{" "}
                  <Link
                    href="/catalogo"
                    className="text-[#E30613] font-mono hover:underline font-semibold"
                  >
                    /catalogo
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Visual Mapping: Field in Studio -> Public Catalog Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] ring-1 ring-zinc-950/5 space-y-6 min-w-0">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E30613] block mb-1">
                  CORRESPONDENCIA DE CAMPOS
                </span>
                <h3 className="font-montserrat font-bold text-lg sm:text-xl text-zinc-950">
                  ¿Cómo se refleja cada campo en la tarjeta pública?
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Cada dato ingresado en el editor alimenta la ficha interactiva
                  del producto y el mensaje automático generado para WhatsApp.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start min-w-0">
                {/* Form fields summary */}
                <div className="lg:col-span-7 space-y-2.5 text-xs min-w-0">
                  <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-zinc-200/70 shadow-2xs flex items-start justify-between gap-3 min-w-0">
                    <div className="min-w-0">
                      <strong className="text-zinc-950 block font-semibold">
                        1. Nombre del Producto
                      </strong>
                      <span className="text-zinc-500 text-[11px] block truncate">
                        Título principal del artículo visible para los clientes.
                      </span>
                    </div>
                    <code className="text-[11px] font-mono text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 shrink-0">
                      name
                    </code>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-zinc-200/70 shadow-2xs flex items-start justify-between gap-3 min-w-0">
                    <div className="min-w-0">
                      <strong className="text-zinc-950 block font-semibold">
                        2. Referencia de Producción
                      </strong>
                      <span className="text-zinc-500 text-[11px] block truncate">
                        Código de catálogo que el cliente copia al cotizar.
                      </span>
                    </div>
                    <code className="text-[11px] font-mono text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 shrink-0">
                      reference
                    </code>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-zinc-200/70 shadow-2xs flex items-start justify-between gap-3 min-w-0">
                    <div className="min-w-0">
                      <strong className="text-zinc-950 block font-semibold">
                        3. Precio Unitario en COP
                      </strong>
                      <span className="text-zinc-500 text-[11px] block break-words">
                        Ej: $25.635 COP. Si escribes 25000, la web lo formatea
                        automáticamente.
                      </span>
                    </div>
                    <code className="text-[11px] font-mono text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 shrink-0 font-bold">
                      priceCOP
                    </code>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-zinc-200/70 shadow-2xs flex items-start justify-between gap-3 min-w-0">
                    <div className="min-w-0">
                      <strong className="text-zinc-950 block font-semibold">
                        4. Tiraje Mínimo de Pedido
                      </strong>
                      <span className="text-zinc-500 text-[11px] block truncate">
                        Cantidad mínima de fabricación industrial (ej: Mínimo 50
                        uds).
                      </span>
                    </div>
                    <code className="text-[11px] font-mono text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 shrink-0">
                      minOrder
                    </code>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-zinc-200/70 shadow-2xs flex items-start justify-between gap-3 min-w-0">
                    <div className="min-w-0">
                      <strong className="text-zinc-950 block font-semibold">
                        5. Especificaciones Técnicas (Viñetas)
                      </strong>
                      <span className="text-zinc-500 text-[11px] block break-words">
                        Materiales, capacidades y técnicas de marcado (Láser,
                        Tampografía, UV).
                      </span>
                    </div>
                    <code className="text-[11px] font-mono text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 shrink-0">
                      specs
                    </code>
                  </div>
                </div>

                {/* Simulated Glass Product Card */}
                <div className="lg:col-span-5 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-zinc-950/5 space-y-4 min-w-0 w-full">
                  <div className="relative h-48 rounded-2xl bg-zinc-50/80 border border-zinc-200/70 overflow-hidden flex items-center justify-center p-4">
                    <Image
                      src="/products/termo-temperatura.jpg"
                      alt="Ejemplo Ficha Producto"
                      width={200}
                      height={160}
                      className="object-contain"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-950/90 backdrop-blur-xs text-white">
                      TERMOS &amp; BOTELLAS
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 font-mono text-[11px]">
                        Ref. Termo Temperatura 500 ml
                      </span>
                      <span className="text-zinc-500 font-mono text-[11px]">
                        Mínimo 50 uds
                      </span>
                    </div>

                    <h4 className="font-montserrat font-bold text-sm text-zinc-900 leading-snug">
                      Termo Inteligente Digital con Sensor LED
                    </h4>

                    <div className="flex flex-wrap gap-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                        Acero 304
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                        Sensor LED
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                        500 ml
                      </span>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500 font-mono block">
                          Desde:
                        </span>
                        <span className="font-montserrat font-black text-base text-zinc-950">
                          $25.635 COP
                        </span>
                      </div>
                      <span className="px-3 py-1.5 rounded-xl bg-[#E30613] text-white font-montserrat font-bold text-[11px] uppercase tracking-wider">
                        Cotizar
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: EDITAR PRECIOS & TEXTOS                                 */}
        {/* ============================================================== */}
        {activeTab === "editar" && (
          <div className="space-y-6 w-full min-w-0">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] ring-1 ring-zinc-950/5 space-y-5 min-w-0">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E30613] block mb-1">
                  ACTUALIZACIÓN DE PRECIOS
                </span>
                <h3 className="font-montserrat font-bold text-lg sm:text-xl text-zinc-950">
                  ¿Cómo cambiar el precio de un artículo en vivo?
                </h3>
                <p className="text-xs text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                  Los precios en la plataforma soportan tanto montos directos
                  como rangos según volumen de pedido.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 min-w-0">
                <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/70 shadow-2xs space-y-2 min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block">
                    Caso 1 • Precio fijo unitario
                  </span>
                  <h4 className="font-montserrat font-bold text-sm text-zinc-950">
                    Escribir el valor en el campo priceCOP
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Puedes escribir <code>$25.635 COP</code> o simplemente{" "}
                    <code>25000</code>. La web se encarga de formatear los
                    puntos de miles y la sigla COP automáticamente.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/70 shadow-2xs space-y-2 min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block">
                    Caso 2 • Escala de volumen
                  </span>
                  <h4 className="font-montserrat font-bold text-sm text-zinc-950">
                    Rangos según cantidad requerida
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Si el costo disminuye por escala (ej: esferos publicitarios),
                    puedes ingresar: <code>$500 - $580 COP</code>.
                  </p>
                </div>
              </div>

              {/* Step by step instructions */}
              <div className="p-5 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 space-y-3 min-w-0">
                <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-zinc-900">
                  Instrucciones paso a paso:
                </h4>
                <ol className="list-decimal pl-4 space-y-1.5 text-xs text-zinc-600">
                  <li>
                    Entra a{" "}
                    <Link
                      href="/admin"
                      className="font-semibold text-[#E30613] hover:underline"
                    >
                      /admin
                    </Link>{" "}
                    y haz clic sobre el producto que deseas actualizar.
                  </li>
                  <li>
                    Modifica el campo <strong>Precio en COP (priceCOP)</strong>.
                  </li>
                  <li>
                    Si deseas actualizar las especificaciones, agrega o edita los
                    elementos del listado de viñetas.
                  </li>
                  <li>
                    Pulsa <strong>Publish</strong>. La actualización impacta la
                    web en milisegundos.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: FOTOS & GALERÍA                                         */}
        {/* ============================================================== */}
        {activeTab === "fotos" && (
          <div className="space-y-6 w-full min-w-0">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] ring-1 ring-zinc-950/5 space-y-5 min-w-0">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E30613] block mb-1">
                  GESTIÓN MULTIMEDIA
                </span>
                <h3 className="font-montserrat font-bold text-lg sm:text-xl text-zinc-950">
                  Fotografía de producto y galería secundaria
                </h3>
                <p className="text-xs text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                  Para que el catálogo luzca impecable y profesional, sigue estas
                  recomendaciones de encuadre y formato.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 min-w-0">
                <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/70 shadow-2xs space-y-2 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <h4 className="font-montserrat font-bold text-xs text-zinc-950 uppercase">
                    1. Proporción cuadrada o 4:3
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Fotografía con fondo blanco o neutro para que el artículo sea
                    el protagonista en la tarjeta y en la ficha de producto.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/70 shadow-2xs space-y-2 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="font-montserrat font-bold text-xs text-zinc-950 uppercase">
                    2. Galería de fotos extra
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Dentro del campo <strong>Galería Secundaria</strong> puedes
                    subir fotos de detalle: acercamiento del logo, textura del
                    sustrato o empaque.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/70 shadow-2xs space-y-2 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h4 className="font-montserrat font-bold text-xs text-zinc-950 uppercase">
                    3. Fotos desde el celular
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Puedes ingresar a <code>/admin</code> desde tu celular y
                    subir fotos tomadas directamente en planta con la cámara.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-900 text-white shadow-xl space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold block">
                CONSEJO TÉCNICO DE PRODUCCIÓN
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                El panel administrativo es totalmente compatible con teléfonos
                móviles. Puedes ingresar desde Chrome o Safari en tu smartphone,
                tomar la fotografía directamente con la cámara del dispositivo y
                publicarla al instante; el servidor la comprime y optimiza a
                formato WebP sin saturar la red.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: PAUSAR O ELIMINAR                                      */}
        {/* ============================================================== */}
        {activeTab === "eliminar" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-0">
            {/* Opción A: Desactivar (Recomendada) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] ring-1 ring-zinc-950/5 space-y-4 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-mono font-bold">
                <EyeOff className="w-3.5 h-3.5 text-[#E30613]" />
                OPCIÓN RECOMENDADA
              </div>

              <h4 className="font-montserrat font-bold text-base text-zinc-950">
                Pausar producto (Agotado temporal)
              </h4>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Si un artículo se quedó sin inventario o cambió de temporada,
                desmarca la casilla{" "}
                <strong>&ldquo;¿Producto Activo / Visible?&rdquo;</strong> y
                presiona <em>Publish</em>.
              </p>

              <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 text-xs text-zinc-700 space-y-1.5 min-w-0">
                <strong className="text-zinc-950 block font-semibold">
                  Ventajas:
                </strong>
                <ul className="list-disc pl-4 space-y-1 text-zinc-600 text-[11px]">
                  <li>El producto desaparece al instante de la web pública.</li>
                  <li>
                    Conservas la fotografía, especificaciones y precios para
                    reactivarlo en un clic cuando vuelva a entrar inventario.
                  </li>
                </ul>
              </div>
            </div>

            {/* Opción B: Eliminar definitivamente */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] ring-1 ring-zinc-950/5 space-y-4 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-mono font-bold">
                <Trash2 className="w-3.5 h-3.5 text-[#E30613]" />
                BORRADO PERMANENTE
              </div>

              <h4 className="font-montserrat font-bold text-base text-zinc-950">
                Eliminar artículo definitivamente
              </h4>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Para artículos descontinuados que no volverán a producirse:
              </p>

              <ol className="list-decimal pl-4 space-y-1.5 text-xs text-zinc-600">
                <li>
                  Abre el documento en{" "}
                  <Link
                    href="/admin"
                    className="font-medium text-zinc-900 hover:underline"
                  >
                    /admin
                  </Link>
                  .
                </li>
                <li>
                  Haz clic en los tres puntos horizontales (<code>...</code>) en
                  la esquina inferior derecha.
                </li>
                <li>
                  Selecciona <strong>Delete</strong> y confirma.
                </li>
              </ol>

              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900">
                Nota: Esta acción borra el registro de la base de datos de Sanity
                y no se puede deshacer.
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: PREGUNTAS FRECUENTES (FAQ) & AJUSTES GLOBALES           */}
        {/* ============================================================== */}
        {activeTab === "faq" && (
          <div className="space-y-6 w-full min-w-0">
            {/* Global Settings Sub-Panel */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] ring-1 ring-zinc-950/5 space-y-5 min-w-0">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E30613] block mb-1">
                  AJUSTES GLOBALES DE CONTACTO &amp; TARIFARIOS
                </span>
                <h3 className="font-montserrat font-bold text-lg sm:text-xl text-zinc-950">
                  Control de WhatsApp, Catálogos PDF y Avisos
                </h3>
                <p className="text-xs text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                  En el panel, dentro de{" "}
                  <strong>Configuración General de la Web</strong>, puedes
                  modificar datos corporativos clave sin requerir intervención de
                  programación.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 min-w-0">
                <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/70 shadow-2xs space-y-2 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <h4 className="font-montserrat font-bold text-xs text-zinc-950 uppercase">
                    1. Línea de WhatsApp
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Si el asesor comercial de planta cambia de línea, actualiza
                    el número con código de país (ej: <code>573163200181</code>).
                    Todas las cotizaciones del catálogo se dirigen a la nueva
                    línea.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/70 shadow-2xs space-y-2 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <FileDown className="w-4 h-4" />
                  </div>
                  <h4 className="font-montserrat font-bold text-xs text-zinc-950 uppercase">
                    2. Catálogos en PDF
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Sube las nuevas ediciones del Catálogo Maestro o de Esferos.
                    Los botones de descarga pública entregarán el nuevo
                    documento inmediatamente.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/70 shadow-2xs space-y-2 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <h4 className="font-montserrat font-bold text-xs text-zinc-950 uppercase">
                    3. Barra de Anuncios
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Activa la casilla para mostrar avisos de temporada
                    (&ldquo;Cierre de pedidos fin de año&rdquo;, promociones por
                    volumen) en la cabecera del catálogo.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
              <div className="p-5 sm:p-6 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-zinc-950/5 space-y-2 min-w-0">
                <h4 className="font-montserrat font-bold text-xs sm:text-sm text-zinc-950">
                  ¿Cuánto tiempo tarda en reflejarse un cambio en la web?
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  El reflejo es instantáneo. Al pulsar <strong>Publish</strong> en
                  el panel de Sanity, cualquier cliente que visite o recargue{" "}
                  <Link
                    href="/catalogo"
                    className="text-[#E30613] hover:underline font-mono"
                  >
                    /catalogo
                  </Link>{" "}
                  verá los nuevos precios, fotos o referencias de inmediato.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-zinc-950/5 space-y-2 min-w-0">
                <h4 className="font-montserrat font-bold text-xs sm:text-sm text-zinc-950">
                  ¿Puedo crear nuevas categorías de productos?
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Sí. Puedes ingresar a la sección <strong>Categorías</strong> del
                  panel o hacer clic en el botón <strong>+</strong> dentro del
                  selector de categoría de cualquier producto para añadir una nueva
                  sección (ej: &ldquo;Gorras &amp; Textil Corporativo&rdquo;).
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-zinc-950/5 space-y-2 min-w-0">
                <h4 className="font-montserrat font-bold text-xs sm:text-sm text-zinc-950">
                  ¿Qué formato de imagen es el más adecuado?
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Formatos JPG, PNG o WebP tomados con buena iluminación. El CMS
                  redimensiona y optimiza el archivo de forma automática para que
                  cargue velozmente en conexiones móviles.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-zinc-950/5 space-y-2 min-w-0">
                <h4 className="font-montserrat font-bold text-xs sm:text-sm text-zinc-950">
                  ¿Cómo agregar más usuarios al panel?
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Desde{" "}
                  <a
                    href="https://sanity.io/manage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E30613] hover:underline font-mono"
                  >
                    sanity.io/manage
                  </a>{" "}
                  puedes invitar a otros miembros del equipo comercial con su
                  correo electrónico de Google o corporativo sin costo adicional.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 min-w-0">
          <Link
            href="/catalogo"
            className="text-xs font-montserrat font-bold text-zinc-600 hover:text-zinc-950 uppercase tracking-wider transition-colors inline-flex items-center gap-1"
          >
            ← Volver al Catálogo Público
          </Link>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
          >
            <span>Ir al Editor de Catálogo (/admin)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E30613]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
