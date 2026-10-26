"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import {
  UploadCloud,
  Edit3,
  Trash2,
  CheckCircle2,
  Printer,
  Share2,
  ExternalLink,
  Camera,
  EyeOff,
  HelpCircle,
  FileCheck,
  ChevronRight,
  Layers,
  Check,
  AlertTriangle,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

export default function GuiaAdminPage() {
  const [activeTab, setActiveTab] = useState<"crear" | "editar" | "eliminar" | "fotos" | "faq">("crear");
  const [shared, setShared] = useState(false);

  const handlePrint = () => {
    triggerHaptic(10);
    window.print();
  };

  const handleShareWhatsApp = () => {
    triggerHaptic(10);
    const message = `*MANUAL DEL CLIENTE - EDITOR DE CATÁLOGO IMPRESOS AMERICANA*
---------------------------------------
Aquí tienes la guía visual paso a paso con capturas para subir, editar y eliminar productos de tu catálogo web:
${typeof window !== "undefined" ? window.location.href : "https://impresosamericana.com/guia-admin"}
---------------------------------------
Acceso al panel administrativo: https://impresosamericana.com/admin`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#111116] text-white">
      {/* 1. Header */}
      <PageHeader
        badge="MANUAL OPERATIVO PARA EL CLIENTE"
        title="GUÍA VISUAL DEL EDITOR DE PRODUCTOS & CMS"
        description="Instructivo paso a paso con capturas simuladas del panel para subir artículos nuevos, actualizar precios en Pesos Colombianos, subir fotografías reales y gestionar la disponibilidad en la web sin tocar código."
        breadcrumbs={[
          { label: "Catálogo", href: "/catalogo" },
          { label: "Guía Administrativa" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 space-y-12">
        {/* Action Quickbar (Print, Share, Go to Admin) */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#181822] border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-montserrat font-bold text-sm text-white uppercase tracking-wider">
                Instructivo Oficial de Administración
              </h2>
              <p className="text-xs text-zinc-400">
                Diseñado para el equipo de ventas, mercadeo y administración de Impresos Americana.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 text-xs font-montserrat font-bold transition-all"
            >
              <Printer className="w-4 h-4 text-zinc-400" />
              <span>Imprimir / Guardar PDF</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 border border-[#25D366]/40 text-xs font-montserrat font-bold transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>{shared ? "¡Abierto en WhatsApp!" : "Compartir por WhatsApp"}</span>
            </button>

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white text-xs font-montserrat font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(227,6,19,0.4)]"
            >
              <span>Abrir Panel /admin</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tab Selectors (Sticky Navigation) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab("crear");
            }}
            className={`px-5 py-3 rounded-t-xl text-xs sm:text-sm font-montserrat font-bold flex items-center gap-2 transition-all whitespace-nowrap border-b-2 ${
              activeTab === "crear"
                ? "bg-[#1C1C26] text-white border-[#E30613]"
                : "text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-white/5"
            }`}
          >
            <UploadCloud className="w-4 h-4 text-emerald-400" />
            <span>1. Cómo Subir un Producto</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab("editar");
            }}
            className={`px-5 py-3 rounded-t-xl text-xs sm:text-sm font-montserrat font-bold flex items-center gap-2 transition-all whitespace-nowrap border-b-2 ${
              activeTab === "editar"
                ? "bg-[#1C1C26] text-white border-[#E30613]"
                : "text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-white/5"
            }`}
          >
            <Edit3 className="w-4 h-4 text-blue-400" />
            <span>2. Cómo Editar Precios y Textos</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab("eliminar");
            }}
            className={`px-5 py-3 rounded-t-xl text-xs sm:text-sm font-montserrat font-bold flex items-center gap-2 transition-all whitespace-nowrap border-b-2 ${
              activeTab === "eliminar"
                ? "bg-[#1C1C26] text-white border-[#E30613]"
                : "text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-white/5"
            }`}
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>3. Ocultar (Agotado) o Eliminar</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab("fotos");
            }}
            className={`px-5 py-3 rounded-t-xl text-xs sm:text-sm font-montserrat font-bold flex items-center gap-2 transition-all whitespace-nowrap border-b-2 ${
              activeTab === "fotos"
                ? "bg-[#1C1C26] text-white border-[#E30613]"
                : "text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-white/5"
            }`}
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>4. Fotos & Buenas Prácticas</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic(10);
              setActiveTab("faq");
            }}
            className={`px-5 py-3 rounded-t-xl text-xs sm:text-sm font-montserrat font-bold flex items-center gap-2 transition-all whitespace-nowrap border-b-2 ${
              activeTab === "faq"
                ? "bg-[#1C1C26] text-white border-[#E30613]"
                : "text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-white/5"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>5. Preguntas Frecuentes</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: SUBIR UN PRODUCTO NUEVO                                */}
        {/* ============================================================== */}
        {activeTab === "crear" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Steps overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#181822] border border-white/10 space-y-1">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center mb-2">
                  1
                </span>
                <strong className="text-white text-xs sm:text-sm block">Ingresa a /admin</strong>
                <p className="text-[11px] text-zinc-400">
                  Abre tu navegador y entra con tu cuenta de Google o correo autorizado.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181822] border border-white/10 space-y-1">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center mb-2">
                  2
                </span>
                <strong className="text-white text-xs sm:text-sm block">Clic en Nuevo (+)</strong>
                <p className="text-[11px] text-zinc-400">
                  Selecciona &ldquo;Producto del Catálogo&rdquo; y presiona el botón &ldquo;+&rdquo; o &ldquo;Crear&rdquo;.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181822] border border-white/10 space-y-1">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center mb-2">
                  3
                </span>
                <strong className="text-white text-xs sm:text-sm block">Llena los Datos</strong>
                <p className="text-[11px] text-zinc-400">
                  Escribe nombre, referencia, precio en COP, sube la foto y selecciona categoría.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181822] border border-white/10 space-y-1">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center mb-2">
                  4
                </span>
                <strong className="text-white text-xs sm:text-sm block">Clic en &ldquo;Publish&rdquo;</strong>
                <p className="text-[11px] text-zinc-400">
                  Presiona el botón verde inferior. El producto aparece al instante en la web.
                </p>
              </div>
            </div>

            {/* High-Fidelity Studio UI Visual Mockup */}
            <div className="rounded-2xl bg-[#0D0D12] border border-white/15 overflow-hidden shadow-2xl">
              {/* Browser bar */}
              <div className="px-4 py-3 bg-[#171720] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-3 text-[11px] font-mono text-zinc-400 bg-[#0E0E14] px-3 py-1 rounded-md border border-white/5">
                    https://impresosamericana.com/admin/structure/product;create
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold hidden sm:inline">
                  ● EN VIVO (SANITY STUDIO)
                </span>
              </div>

              {/* Studio Workspace Simulation */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                {/* Left Panel Sidebar */}
                <div className="lg:col-span-3 bg-[#13131A] border-r border-white/10 p-4 space-y-4">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                    CONTENIDO DEL CMS
                  </div>
                  <div className="space-y-1 text-xs font-montserrat">
                    <div className="p-2.5 rounded-lg bg-[#E30613] text-white font-bold flex items-center justify-between shadow-md">
                      <span className="flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        Producto del Catálogo
                      </span>
                      <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded font-mono">14</span>
                    </div>
                    <div className="p-2.5 rounded-lg text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
                      <Layers className="w-4 h-4" />
                      Categorías de Producto
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] space-y-1">
                      <strong className="block text-emerald-400 font-bold">Paso 1:</strong>
                      Haz clic en el botón <strong className="text-white">+ Crear</strong> en la barra superior del panel.
                    </div>
                  </div>
                </div>

                {/* Center / Right: Interactive Document Form Mockup */}
                <div className="lg:col-span-9 p-6 bg-[#181824] space-y-6">
                  {/* Form Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                        NUEVO DOCUMENTO
                      </span>
                      <h3 className="text-lg font-montserrat font-black text-white">
                        Creando: Producto del Catálogo
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Borrador (No publicado)
                      </span>
                    </div>
                  </div>

                  {/* Form Fields Simulation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    {/* Left form column */}
                    <div className="space-y-4">
                      {/* Field 1: Name */}
                      <div className="p-3 rounded-xl bg-[#111116] border border-white/10 space-y-1 relative">
                        <div className="flex items-center justify-between">
                          <label className="font-mono font-bold text-zinc-300 uppercase">
                            Nombre del Producto *
                          </label>
                          <span className="text-[10px] text-red-400 font-bold">Obligatorio</span>
                        </div>
                        <input
                          type="text"
                          readOnly
                          value="Termo Inteligente con Pantalla LED 500ml"
                          className="w-full bg-[#1A1A22] border border-white/10 rounded-lg px-3 py-2 text-white font-sans text-xs"
                        />
                        <p className="text-[10px] text-zinc-400">
                          Nombre comercial claro que leerá el cliente final.
                        </p>
                      </div>

                      {/* Field 2: Reference */}
                      <div className="p-3 rounded-xl bg-[#111116] border border-white/10 space-y-1">
                        <label className="font-mono font-bold text-zinc-300 uppercase">
                          Referencia de Producción / Código *
                        </label>
                        <input
                          type="text"
                          readOnly
                          value="Ref. Termo Temperatura 500 ml"
                          className="w-full bg-[#1A1A22] border border-white/10 rounded-lg px-3 py-2 text-white font-sans text-xs"
                        />
                      </div>

                      {/* Field 3: Category Dropdown */}
                      <div className="p-3 rounded-xl bg-[#111116] border border-white/10 space-y-1">
                        <label className="font-mono font-bold text-zinc-300 uppercase">
                          Categoría (Menú Directo) *
                        </label>
                        <select
                          disabled
                          className="w-full bg-[#1A1A22] border border-white/10 rounded-lg px-3 py-2 text-white font-sans text-xs"
                        >
                          <option>Termos &amp; Botellas</option>
                        </select>
                        <p className="text-[10px] text-zinc-400">
                          Selecciona la sección donde se agrupará en el catálogo.
                        </p>
                      </div>

                      {/* Field 4: Price COP */}
                      <div className="p-3 rounded-xl bg-[#111116] border border-white/10 space-y-1">
                        <label className="font-mono font-bold text-zinc-300 uppercase">
                          Precio Unitario en COP *
                        </label>
                        <input
                          type="text"
                          readOnly
                          value="$25.635 COP"
                          className="w-full bg-[#1A1A22] border border-white/10 rounded-lg px-3 py-2 text-emerald-400 font-mono font-bold text-xs"
                        />
                        <p className="text-[10px] text-zinc-400">
                          Escribe el valor formateado (ej: $25.635 COP).
                        </p>
                      </div>
                    </div>

                    {/* Right form column */}
                    <div className="space-y-4">
                      {/* Field 5: Image Upload */}
                      <div className="p-3 rounded-xl bg-[#111116] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="font-mono font-bold text-zinc-300 uppercase">
                            Fotografía Real del Producto *
                          </label>
                          <span className="text-[10px] text-emerald-400 font-mono font-bold">
                            JPG / PNG / WebP
                          </span>
                        </div>

                        <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center space-y-2 bg-[#171720]">
                          <div className="w-10 h-10 rounded-full bg-white/10 text-zinc-300 flex items-center justify-center mx-auto">
                            <Camera className="w-5 h-5 text-red-400" />
                          </div>
                          <p className="text-xs text-zinc-300">
                            Arrastra tu imagen aquí o haz clic en <strong>&ldquo;Upload&rdquo;</strong>
                          </p>
                          <span className="text-[10px] text-zinc-500 block">
                            Recomendado: 1200 x 1200 px con fondo blanco o neutro.
                          </span>
                        </div>
                      </div>

                      {/* Field 6: Specs */}
                      <div className="p-3 rounded-xl bg-[#111116] border border-white/10 space-y-2">
                        <label className="font-mono font-bold text-zinc-300 uppercase block">
                          Especificaciones Técnicas (Viñetas)
                        </label>
                        <div className="space-y-1">
                          <div className="px-2.5 py-1 rounded bg-[#1C1C26] text-zinc-300 font-mono text-[11px] flex items-center justify-between">
                            <span>• Acero Inoxidable 304 Grado Alimenticio</span>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <div className="px-2.5 py-1 rounded bg-[#1C1C26] text-zinc-300 font-mono text-[11px] flex items-center justify-between">
                            <span>• Pantalla Táctil LED Indicadora de Temperatura</span>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled
                          className="w-full py-1.5 rounded bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-mono"
                        >
                          + Add item (Añadir otra característica)
                        </button>
                      </div>

                      {/* Field 7: Active Checkbox */}
                      <div className="p-3 rounded-xl bg-[#111116] border border-white/10 flex items-center justify-between">
                        <div>
                          <strong className="text-xs text-white block">¿Producto Activo / Visible?</strong>
                          <span className="text-[10px] text-zinc-400">
                            Marcado = Visible en la web.
                          </span>
                        </div>
                        <div className="w-5 h-5 rounded bg-emerald-500 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Bar (The crucial Publish button) */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#13131B] -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Todos los cambios guardados automáticamente como borrador.</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-montserrat font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Publish (Publicar en Vivo)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: EDITAR PRECIOS Y TEXTOS                                */}
        {/* ============================================================== */}
        {activeTab === "editar" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-[#181822] border border-white/10 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-blue-400 text-xs font-mono font-bold uppercase">
                <Edit3 className="w-4 h-4" />
                MODIFICAR PRECIOS O FOTOGRAFÍAS EN TIEMPO REAL
              </div>
              <h3 className="text-xl sm:text-2xl font-montserrat font-black text-white uppercase tracking-tight">
                ¿Cómo cambiar el precio de un producto en 15 segundos?
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
                Los precios de los productos en Colombia cambian por tirajes, dólar o promociones. Con este panel, tu cliente o tú pueden cambiar cualquier precio instantáneamente sin esperar despliegues ni programadores:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#121217] border border-white/10 space-y-2">
                  <span className="text-blue-400 font-mono font-bold text-xs block">PASO 1</span>
                  <strong className="text-white text-xs sm:text-sm block">Abre la lista de productos</strong>
                  <p className="text-xs text-zinc-400">
                    En la columna izquierda de `/admin`, haz clic sobre el producto que deseas actualizar (ej. <em>Termo Temperatura 500 ml</em>).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121217] border border-white/10 space-y-2">
                  <span className="text-blue-400 font-mono font-bold text-xs block">PASO 2</span>
                  <strong className="text-white text-xs sm:text-sm block">Edita el valor o la foto</strong>
                  <p className="text-xs text-zinc-400">
                    Borra el valor anterior y escribe el nuevo (ej: de <code>$25.635 COP</code> a <code>$23.900 COP</code>).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121217] border border-white/10 space-y-2">
                  <span className="text-blue-400 font-mono font-bold text-xs block">PASO 3</span>
                  <strong className="text-white text-xs sm:text-sm block">Presiona &ldquo;Publish&rdquo;</strong>
                  <p className="text-xs text-zinc-400">
                    Al hacer clic en el botón verde inferior, la página pública en <code>/catalogo</code> mostrará el nuevo precio de inmediato.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual comparison mockup */}
            <div className="p-6 rounded-2xl bg-[#151520] border border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  EDICIÓN EN VIVO
                </span>
                <h4 className="text-xl font-montserrat font-bold text-white uppercase">
                  Reemplazo de Fotografía en 1 Clic
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Si tomaste una mejor foto con tu celular o un fotógrafo profesional te entregó nuevas tomas de producto:
                </p>
                <ul className="text-xs text-zinc-300 space-y-2 pl-5 list-disc marker:text-blue-400">
                  <li>Pasa el cursor sobre la foto actual en el formulario.</li>
                  <li>Haz clic en los tres puntos <code>...</code> en la esquina de la foto.</li>
                  <li>Selecciona <strong>&ldquo;Replace&rdquo; (Reemplazar)</strong> y sube la nueva foto.</li>
                  <li>Presiona <strong>Publish</strong>. La foto antigua se elimina del CDN y se muestra la nueva en alta calidad.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E0E14] border border-white/15 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/10 pb-2">
                  <span>ACCIONES SOBRE LA FOTO</span>
                  <span className="text-blue-400">Editor Sanity</span>
                </div>
                <div className="relative h-44 w-full rounded-xl bg-[#1A1A24] overflow-hidden flex items-center justify-center border border-white/10">
                  <Image
                    src="/products/termo-temperatura.jpg"
                    alt="Ejemplo Termo"
                    width={220}
                    height={160}
                    className="object-contain"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono border border-white/20 text-white">
                    <span>Edit</span>
                    <span>•</span>
                    <span className="text-red-400">Replace</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 text-center font-mono">
                  ✨ Sanity recorta y genera automáticamente versiones WebP optimizadas para móviles y PC.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: OCULTAR O ELIMINAR                                     */}
        {/* ============================================================== */}
        {activeTab === "eliminar" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option A: Ocultar temporalmente (Recomendada) */}
              <div className="p-6 rounded-2xl bg-[#181822] border border-white/10 hover:border-amber-500/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <EyeOff className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                    MÉTODO RECOMENDADO
                  </span>
                  <h3 className="text-lg font-montserrat font-bold text-white uppercase">
                    Ocultar Producto Agotado (Sin Borrar)
                  </h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Si un termo, libreta o esfero se agotó temporalmente en bodega, <strong>NO es necesario borrarlo</strong>. Puedes pausarlo para no perder los textos ni la foto:
                </p>

                <div className="p-3.5 rounded-xl bg-[#111116] border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-zinc-300">¿Producto Activo / Visible?</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                      DESMARCADO
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    1. Desmarca la casilla en el formulario. <br />
                    2. Haz clic en <strong>Publish</strong>. <br />
                    3. El producto se oculta de la web al instante. Cuando vuelvas a tener inventario, simplemente vuelve a marcar la casilla y presiona <em>Publish</em>.
                  </p>
                </div>
              </div>

              {/* Option B: Eliminar permanentemente */}
              <div className="p-6 rounded-2xl bg-[#181822] border border-white/10 hover:border-red-500/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
                    ELIMINACIÓN DEFINITIVA
                  </span>
                  <h3 className="text-lg font-montserrat font-bold text-white uppercase">
                    Borrar un Producto de la Base de Datos
                  </h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Si una referencia fue descontinuada de fábrica y nunca volverá a producirse, puedes borrarla por completo:
                </p>

                <div className="p-3.5 rounded-xl bg-[#111116] border border-white/10 space-y-2 text-xs">
                  <strong className="text-white block font-mono">Paso a paso:</strong>
                  <ol className="text-[11px] text-zinc-300 space-y-1.5 pl-4 list-decimal">
                    <li>Abre el producto en el editor de `/admin`.</li>
                    <li>En la esquina inferior derecha (al lado del botón verde <em>Publish</em>), haz clic en el botón de tres puntos horizontales <code>...</code>.</li>
                    <li>Selecciona la opción en rojo <strong>&ldquo;Delete&rdquo; (Eliminar)</strong>.</li>
                    <li>Confirma la eliminación. El artículo se borrará de forma permanente.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Tip Alert */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-300 leading-relaxed">
                <strong className="text-amber-300 block mb-0.5">Consejo para ventas:</strong>
                Recomendamos preferir <strong>desmarcar &ldquo;¿Producto Activo?&rdquo;</strong> en lugar de eliminar, para que el cliente conserve el historial de referencias cotizadas y precios históricos.
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: BUENAS PRÁCTICAS DE FOTOGRAFÍA                         */}
        {/* ============================================================== */}
        {activeTab === "fotos" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#181822] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
                  1. FONDO LIMPIO
                </span>
                <h4 className="font-montserrat font-bold text-white uppercase text-sm">
                  Fondo Blanco o Neutro
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Toma las fotografías sobre una mesa con fondo blanco, cartulina o caja de luz. Evita fondos con elementos que distraigan la atención de tu logo y producto.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#181822] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
                  2. PROPORCIÓN CUADRADA
                </span>
                <h4 className="font-montserrat font-bold text-white uppercase text-sm">
                  Resolución 1200 x 1200 px
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Las fotos cuadradas (1:1) o ligeramente rectangulares (4:3) se adaptan perfectamente tanto a computadores como a pantallas de celular sin recortar los bordes.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#181822] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
                  3. FORMATOS COMPATIBLES
                </span>
                <h4 className="font-montserrat font-bold text-white uppercase text-sm">
                  JPG, PNG o WebP
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Puedes subir fotos tomadas directamente con tu celular (iPhone o Android). El CMS se encarga automáticamente de comprimir y optimizar el peso sin perder nitidez.
                </p>
              </div>
            </div>

            {/* Practical Checklist */}
            <div className="p-6 rounded-2xl bg-[#151520] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-sm font-montserrat font-bold text-white uppercase">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Checklist de Calidad para el Catálogo</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#101017] border border-white/5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>El producto está bien iluminado y sin sombras duras.</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#101017] border border-white/5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>El precio en COP incluye el símbolo de pesos ($).</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#101017] border border-white/5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Se especifica la cantidad mínima (ej. Mínimo 25 o 50 uds).</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#101017] border border-white/5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Las especificaciones indican el material (Acero, Cartón, Poliéster).</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: PREGUNTAS FRECUENTES (FAQ)                              */}
        {/* ============================================================== */}
        {activeTab === "faq" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-5 rounded-xl bg-[#181822] border border-white/10 space-y-2">
              <strong className="text-white text-sm block font-montserrat">
                ¿Cuánto tiempo tarda en verse un cambio en la página web?
              </strong>
              <p className="text-xs text-zinc-300 leading-relaxed">
                ¡Es instantáneo! En el momento en que haces clic en <strong>Publish</strong> en el panel de `/admin`, cualquier persona que entre a la web o refresque la página verá los nuevos productos, precios o fotos de inmediato.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#181822] border border-white/10 space-y-2">
              <strong className="text-white text-sm block font-montserrat">
                ¿Puedo usar el panel desde mi celular?
              </strong>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Sí. La interfaz de Sanity Studio es 100% responsiva. Puedes abrir <code>tu-web.com/admin</code> desde Chrome o Safari en tu smartphone, tomar una foto con la cámara del celular y publicarla directamente.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#181822] border border-white/10 space-y-2">
              <strong className="text-white text-sm block font-montserrat">
                ¿Tiene algún costo mensual mantener este panel?
              </strong>
              <p className="text-xs text-zinc-300 leading-relaxed">
                No. El plan gratuito de Sanity incluye hasta 20 usuarios administradores, 500.000 lecturas al mes y 100 GB de fotos en CDN, lo cual es más que suficiente para catálogos corporativos sin pagar un solo peso.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#181822] border border-white/10 space-y-2">
              <strong className="text-white text-sm block font-montserrat">
                ¿Qué pasa si borro un producto por error?
              </strong>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Sanity guarda un historial de revisiones. Sin embargo, para evitar accidentes, siempre recomendamos usar la casilla <strong>&ldquo;¿Producto Activo?&rdquo;</strong> para desmarcarlo en lugar de eliminarlo permanentemente.
              </p>
            </div>
          </div>
        )}

        {/* Bottom Navigation CTA */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/catalogo"
            className="text-xs font-montserrat font-bold text-zinc-400 hover:text-white uppercase transition-colors"
          >
            ← Volver al Catálogo Público
          </Link>

          <Link
            href="/admin"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C50510] via-[#E30613] to-[#FF1E27] text-white font-montserrat font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(227,6,19,0.4)] transition-all flex items-center gap-2"
          >
            <span>Ir al Editor de Catálogo (/admin)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
