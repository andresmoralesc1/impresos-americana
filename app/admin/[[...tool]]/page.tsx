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
    <div className="min-h-screen bg-[#111116] text-white p-4 sm:p-8 lg:p-12 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-xs font-mono font-bold text-red-300">
            <span className="w-2 h-2 rounded-full bg-[#E30613] animate-pulse" />
            PANEL DE ADMINISTRACIÓN DE CATÁLOGO
          </div>
          <h1 className="text-3xl sm:text-4xl font-montserrat font-black uppercase tracking-tight text-white">
            EDITOR DE PRODUCTOS & CMS
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Desde este panel administrativo tú o tu cliente podrán <strong>subir nuevos productos</strong>, <strong>editar precios y fotos</strong>, o <strong>eliminar artículos</strong> del catálogo público sin tocar código.
          </p>
        </div>

        {/* 3 Core Capabilities Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Subir */}
          <div className="p-6 rounded-2xl bg-[#181822] border border-white/10 hover:border-emerald-500/40 transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="font-montserrat font-bold text-base text-white uppercase tracking-wider">
              1. Subir Productos
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Crea artículos en segundos: añade el nombre, referencia, precio en Pesos Colombianos, cantidad mínima y sube la foto directamente desde el celular o computador.
            </p>
            <div className="pt-1 text-[11px] font-mono text-emerald-400">
              ✓ Subida y compresión CDN automática
            </div>
          </div>

          {/* 2. Editar */}
          <div className="p-6 rounded-2xl bg-[#181822] border border-white/10 hover:border-blue-500/40 transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Edit3 className="w-6 h-6" />
            </div>
            <h3 className="font-montserrat font-bold text-base text-white uppercase tracking-wider">
              2. Editar en Vivo
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Modifica cualquier dato en cualquier momento: cambia precios en COP, renueva fotos, actualiza características o reordena la posición en el catálogo.
            </p>
            <div className="pt-1 text-[11px] font-mono text-blue-400">
              ✓ Reflejado inmediato en la web
            </div>
          </div>

          {/* 3. Eliminar / Ocultar */}
          <div className="p-6 rounded-2xl bg-[#181822] border border-white/10 hover:border-red-500/40 transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-montserrat font-bold text-base text-white uppercase tracking-wider">
              3. Eliminar u Ocultar
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong>Ocultar sin borrar:</strong> Desmarca la casilla &ldquo;¿Visible?&rdquo; para pausar un producto agotado. O haz clic en <em>Delete</em> para borrarlo definitivamente.
            </p>
            <div className="pt-1 text-[11px] font-mono text-red-400">
              ✓ Control total de disponibilidad
            </div>
          </div>
        </div>

        {/* Step-by-Step Activation / Setup Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1A1A26] border border-white/15 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-mono font-bold uppercase mb-1">
                <ShieldAlert className="w-4 h-4" />
                PASO FINAL: VINCULACIÓN DE CUENTA GRATUITA (1 MINUTO)
              </div>
              <h2 className="text-xl font-montserrat font-black text-white uppercase tracking-tight">
                ¿Cómo activar el panel en tu proyecto?
              </h2>
            </div>

            <a
              href="https://www.sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white text-xs font-montserrat font-black uppercase tracking-wider transition-all shadow-lg shrink-0"
            >
              <span>Abrir Sanity.io Gratis</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 3 Simple Setup Steps */}
          <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-white/10 text-white font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-white">Crea tu proyecto gratuito en Sanity:</strong> Entra a{" "}
                <a
                  href="https://www.sanity.io/manage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:underline font-mono"
                >
                  sanity.io/manage
                </a>{" "}
                con tu cuenta de Google o correo y haz clic en <em>&ldquo;Create project&rdquo;</em> (ej: <code>impresos-americana</code>).
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-white/10 text-white font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-white">Copia tu Project ID y agrégalo en Vercel (o en tu archivo .env.local):</strong>
                <div className="mt-2 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs flex items-center justify-between text-zinc-200">
                  <span>NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id</span>
                  <button
                    onClick={handleCopyEnv}
                    className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                  >
                    {copiedKey ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
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
              <span className="w-6 h-6 rounded-full bg-white/10 text-white font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-white">Habilita CORS en Sanity:</strong> En el panel de Sanity ve a <em>API &gt; CORS Origins &gt; Add CORS origin</em> y añade <code>http://localhost:3000</code> y tu dominio de Vercel marcando la casilla <em>&ldquo;Allow credentials&rdquo;</em>.
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-400">
              Una vez añadas el <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>, al recargar esta página se abrirá directamente el estudio visual de Sanity.
            </p>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-xs font-montserrat font-bold text-zinc-300 hover:text-white uppercase transition-colors shrink-0"
            >
              <span>Volver al Catálogo Público</span>
              <ArrowRight className="w-4 h-4 text-red-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
