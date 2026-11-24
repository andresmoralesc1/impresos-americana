"use client";

import React, { useState, useEffect } from "react";
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
  Lock,
  Eye,
  EyeOff,
  LogOut,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

const ADMIN_PASSWORD = "Lamismadesiempre";
const AUTH_STORAGE_KEY = "ia_admin_auth";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  // Check session storage on client mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (stored === "true") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    triggerHaptic(10);
    setErrorMsg(null);

    if (passwordInput.trim() === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      } catch {
        // fallback
      }
      setIsAuthenticated(true);
      setPasswordInput("");
    } else {
      triggerHaptic(20);
      setErrorMsg("Contraseña incorrecta. Verifica la clave proporcionada.");
    }
  };

  const handleLogout = () => {
    triggerHaptic(10);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // fallback
    }
    setIsAuthenticated(false);
    setPasswordInput("");
    setErrorMsg(null);
  };

  const handleCopyEnv = () => {
    triggerHaptic(10);
    const envText = `NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id_aqui\nNEXT_PUBLIC_SANITY_DATASET=production\nNEXT_PUBLIC_SANITY_API_VERSION=2024-01-01`;
    navigator.clipboard.writeText(envText);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  // Prevent hydration flicker while checking session
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Login Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white flex items-center justify-center p-4 selection:bg-[#E30613] selection:text-white overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-md w-full relative z-10 space-y-6">
          {/* Card */}
          <div className="p-7 sm:p-8 rounded-3xl bg-zinc-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono font-bold text-red-400">
                <Lock className="w-3.5 h-3.5 text-[#E30613]" />
                PANEL PROTEGIDO
              </div>
              <h1 className="text-2xl sm:text-3xl font-montserrat font-black uppercase tracking-tight text-white">
                Impresos Americana
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ingresa la contraseña de administración para acceder al editor de catálogo y configuración.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                  Contraseña del Administrador
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="••••••••••••••••"
                    autoFocus
                    required
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-zinc-800/80 border border-white/10 text-white placeholder-zinc-500 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-[#E30613] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2 animate-shake">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#E30613] hover:bg-[#c50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Desbloquear Panel</span>
              </button>
            </form>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <Link
                href="/"
                className="hover:text-white transition-colors"
              >
                ← Volver al sitio
              </Link>
              <Link
                href="/guia-admin"
                className="text-red-400 hover:text-red-300 font-semibold transition-colors"
              >
                Guía de Admin →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated: If Sanity is connected with a real Project ID, render NextStudio directly with logout bar
  if (isSanityConfigured) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="absolute top-2 right-4 z-[999999] flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-900 text-white text-xs font-montserrat font-semibold shadow-lg backdrop-blur-md transition-all"
            title="Cerrar Sesión de Administrador"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
        <NextStudio config={config} />
      </div>
    );
  }

  // Authenticated: Sanity setup & instruction dashboard
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 p-4 sm:p-8 lg:p-12 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        {/* Top Session Bar */}
        <div className="flex items-center justify-between p-3 px-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-700">
            <ShieldCheck className="w-4 h-4 text-[#E30613]" />
            <span>Sesión activa como Administrador</span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-montserrat font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5 text-zinc-500" />
            <span>Cerrar Sesión</span>
          </button>
        </div>

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
          <div className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-red-500/50 transition-all space-y-3 shadow-sm group">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E30613] border border-red-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h3 className="font-montserrat font-bold text-sm text-zinc-950 uppercase tracking-wider">
              1. Subir Productos
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Crea artículos en segundos con nombre, referencia, precio en COP, pedido mínimo y fotos con compresión automática CDN.
            </p>
            <div className="pt-1 text-[11px] font-mono text-[#E30613]">
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
                        <Check className="w-3.5 h-3.5 text-[#E30613]" />
                        <span className="text-[#E30613] font-semibold">Copiado</span>
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
