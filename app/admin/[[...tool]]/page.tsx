"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/lib/client";
import {
  UploadCloud,
  Edit3,
  Trash2,
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  Copy,
  Check,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

export default function AdminPage() {
  const [copiedKey, setCopiedKey] = useState(false);

  // If Sanity is already connected with a real Project ID, render Sanity Studio directly
  if (isSanityConfigured) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <NextStudio config={config} />
      </div>
    );
  }

  const handleCopyEnv = () => {
    triggerHaptic(10);
    const envText = `NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id_aqui\nNEXT_PUBLIC_SANITY_DATASET=production\nNEXT_PUBLIC_SANITY_API_VERSION=2024-01-01`;
    navigator.clipboard.writeText(envText);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 p-4 sm:p-8 lg:p-12 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-mono font-bold text-[#E30613]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
            PANEL DE CATÁLOGO
          </div>
          <h1 className="text-3xl sm:text-4xl font-montserrat font-black uppercase tracking-tight text-zinc-950">
            Administración del Catálogo
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Gestor de contenido para actualizar productos, tarifas en Pesos Colombianos, fotografías reales y catálogos en PDF.
          </p>

          <div className="pt-2">
            <Link
              href="/guia-admin"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 text-xs font-montserrat font-semibold transition-all shadow-xs"
            >
              <span>Ver manual de uso paso a paso</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E30613]" />
            </Link>
          </div>
        </div>

        {/* 4 Core Capabilities Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Subir */}
          <div className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-500/50 transition-all space-y-3 shadow-sm group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h3 className="font-montserrat font-bold text-sm text-zinc-950 uppercase tracking-wider">
              1. Subir Productos
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Crea artículos en segundos con nombre, referencia, precio en COP, pedido mínimo y fotos con compresión automática CDN.
            </p>
            <div className="pt-1 text-[11px] font-mono text-emerald-600">
              ✓ Galería de fotos múltiples
            </div>
          </div>

          {/* 2. Editar */}
          <div className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-blue-500/50 transition-all space-y-3 shadow-sm group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Edit3 className="w-5 h-5" />
            </div>
            <h3 className="font-montserrat font-bold text-sm text-zinc-950 uppercase tracking-wider">
              2. Editar en Vivo
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Modifica precios en COP, fotos, descripciones o crea categorías nuevas que se reflejan de inmediato en la web.
            </p>
            <div className="pt-1 text-[11px] font-mono text-blue-600">
              ✓ Categorías dinámicas
            </div>
          </div>

          {/* 3. Eliminar / Ocultar */}
          <div className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-red-500/50 transition-all space-y-3 shadow-sm group">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E30613] border border-red-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="font-montserrat font-bold text-sm text-zinc-950 uppercase tracking-wider">
              3. Ocultar o Borrar
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Desmarca &ldquo;¿Visible?&rdquo; para pausar artículos agotados sin perder el historial, o bórralos permanentemente en un clic.
            </p>
            <div className="pt-1 text-[11px] font-mono text-[#E30613]">
              ✓ Control de disponibilidad
            </div>
          </div>

          {/* 4. WhatsApp y PDFs */}
          <div className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-purple-500/50 transition-all space-y-3 shadow-sm group">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ExternalLink className="w-5 h-5" />
            </div>
            <h3 className="font-montserrat font-bold text-sm text-zinc-950 uppercase tracking-wider">
              4. WhatsApp &amp; PDFs
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Actualiza la línea de WhatsApp corporativa, sube nuevos PDFs del catálogo y publica anuncios de temporada sin tocar código.
            </p>
            <div className="pt-1 text-[11px] font-mono text-purple-600">
              ✓ Configuración global
            </div>
          </div>
        </div>

        {/* Step-by-Step Activation / Setup Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-zinc-600 text-xs font-mono font-semibold uppercase mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                VINCULACIÓN INICIAL DE SANITY
              </div>
              <h2 className="text-xl font-montserrat font-black text-zinc-950 uppercase tracking-tight">
                Conectar con tu cuenta de Sanity
              </h2>
            </div>

            <a
              href="https://www.sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-montserrat font-bold uppercase tracking-wider transition-colors shadow-xs shrink-0"
            >
              <span>Abrir Sanity.io</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 3 Simple Setup Steps */}
          <div className="space-y-4 text-xs sm:text-sm text-zinc-700">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-zinc-950">Crea tu proyecto gratuito en Sanity:</strong> Entra a{" "}
                <a
                  href="https://www.sanity.io/manage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E30613] hover:underline font-mono"
                >
                  sanity.io/manage
                </a>{" "}
                con tu cuenta de Google o correo y haz clic en <em>&ldquo;Create project&rdquo;</em> (ej: <code>impresos-americana</code>).
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-zinc-950">Copia tu Project ID y agrégalo en Vercel (o en tu archivo .env.local):</strong>
                <div className="mt-2 p-3 rounded-xl bg-zinc-50 border border-zinc-200 font-mono text-xs flex items-center justify-between text-zinc-800">
                  <span>NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id</span>
                  <button
                    onClick={handleCopyEnv}
                    className="p-1.5 rounded-md bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-700 transition-colors flex items-center gap-1 text-[11px] shadow-sm"
                  >
                    {copiedKey ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Variables</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-zinc-950">Habilita CORS en Sanity:</strong> En el panel de Sanity ve a <em>API &gt; CORS Origins &gt; Add CORS origin</em> y añade <code>http://localhost:3000</code> y tu dominio de Vercel marcando la casilla <em>&ldquo;Allow credentials&rdquo;</em>.
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-500">
              Una vez añadas el <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>, al recargar esta página se abrirá directamente el estudio visual de Sanity.
            </p>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-xs font-montserrat font-bold text-zinc-700 hover:text-zinc-950 uppercase transition-colors shrink-0"
            >
              <span>Volver al Catálogo Público</span>
              <ArrowRight className="w-4 h-4 text-[#E30613]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
