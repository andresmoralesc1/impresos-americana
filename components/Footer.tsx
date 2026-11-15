"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { IALogo } from "./Logo";

export function Footer() {
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null);

  const coverageCities = [
    "Cali (Sede Principal)",
    "Bogotá D.C.",
    "Medellín",
    "Barranquilla",
    "Bucaramanga",
    "Pereira",
    "Manizales",
    "Cartagena",
    "Ibagué",
    "Pasto",
  ];

  return (
    <footer id="contacto" className="bg-zinc-50 border-t border-zinc-200 text-zinc-600 text-xs relative pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          {/* Brand Info & Address */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <IALogo size="md" theme="light" />
            </Link>
            <p className="text-zinc-600 text-xs leading-relaxed max-w-sm">
              <strong className="text-zinc-950 font-bold">Impresos Americana S.A.S.</strong> — Planta industrial de producción gráfica, material POP, empaques y gran formato. Litografía offset Heidelberg, corte digital Zünd y cama plana UV en Cali, despachos a nivel nacional.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-zinc-700">
                <MapPin className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                <span>
                  Calle 16 # 4-37, Barrio San Nicolás <br />
                  <span className="text-zinc-500">Cali, Valle del Cauca, Colombia • C.P. 760010</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-700">
                <Phone className="w-4 h-4 text-[#E30613] shrink-0" />
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span>PBX: <a href="tel:+576028854000" className="hover:text-[#E30613] underline underline-offset-2 transition-colors font-mono">(602) 885-4000</a></span>
                  <span className="text-zinc-400">•</span>
                  <span>Móvil: <a href="tel:+573163200181" className="hover:text-[#E30613] underline underline-offset-2 transition-colors font-mono">+57 316 320 0181</a></span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-700">
                <Mail className="w-4 h-4 text-[#E30613] shrink-0" />
                <a href="mailto:cotizaciones@impresosamericana.com" className="hover:text-[#E30613] underline underline-offset-2 transition-colors break-all">
                  cotizaciones@impresosamericana.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-700">
                <Clock className="w-4 h-4 text-[#E30613] shrink-0" />
                <span>Lunes a Viernes: 7:30 AM a 5:30 PM (Jornada Continua)</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-zinc-950">
              Líneas de Producción
            </h4>
            <ul className="space-y-1 text-xs text-zinc-600">
              <li>
                <Link href="/cotizador" className="inline-block py-1 hover:text-[#E30613] transition-colors">
                  Exhibidores POP de Piso
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="inline-block py-1 hover:text-[#E30613] transition-colors">
                  Gran Formato UV Cama Plana
                </Link>
              </li>
              <li>
                <Link href="/cotizador" className="inline-block py-1 hover:text-[#E30613] transition-colors">
                  Cajas Rígidas & Plegadizas
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="inline-block py-1 hover:text-[#E30613] transition-colors">
                  Litografía Comercial Offset
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="inline-block py-1 hover:text-[#E30613] transition-colors">
                  Catálogo de Merchandising
                </Link>
              </li>
              <li>
                <Link href="/plantillas" className="inline-block py-1 hover:text-[#E30613] transition-colors">
                  Planos & Troqueles (.AI / .PDF)
                </Link>
              </li>
              <li>
                <Link href="/guia-admin" className="inline-block py-1 text-zinc-500 hover:text-[#E30613] transition-colors">
                  Manual del Editor CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Colombian Department Delivery Coverage */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-zinc-950">
              Cobertura Nacional de Despachos
            </h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Envíos diarios coordinados con transportadoras de carga y guías con seguimiento en tiempo real:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {coverageCities.map((city, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white text-zinc-700 border border-zinc-200/90 shadow-2xs font-medium"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Instant Contact & DIAN compliance badge */}
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-2xl bg-white border border-zinc-200 p-5 shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold block mb-1">
                Atención Inmediata
              </span>
              <p className="text-xs text-zinc-950 font-semibold mb-3">
                ¿Necesitas cotización de urgencia para licitación o campaña?
              </p>
              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20necesito%20cotizaci%C3%B3n%20urgente%20para%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors shadow-xs min-h-[44px]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Directo
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-[11px] text-zinc-600 bg-white p-3.5 rounded-xl border border-zinc-200 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong className="text-zinc-950">Factura Electrónica DIAN</strong> emitida en cada orden según normativa colombiana vigente.
              </span>
            </div>
          </div>
        </div>

        {/* DIAN and Legal Footer Bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Impresos Americana S.A.S. • NIT 900.384.912-4 • Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs">
            <button
              onClick={() => setActiveLegalModal("terms")}
              className="text-zinc-600 hover:text-zinc-950 transition-colors underline py-1"
            >
              Términos de Fabricación
            </button>
            <span className="text-zinc-300 hidden sm:inline">•</span>
            <button
              onClick={() => setActiveLegalModal("privacy")}
              className="text-zinc-600 hover:text-zinc-950 transition-colors underline py-1"
            >
              Política de Datos (Ley 1581)
            </button>
            <span className="text-zinc-300 hidden sm:inline">•</span>
            <Link
              href="/progress"
              className="text-[#E30613] hover:text-[#C50510] hover:underline font-bold flex items-center gap-1 py-1"
            >
              <Sparkles className="w-3 h-3" />
              Auditoría & Progreso
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-zinc-200 rounded-3xl max-w-lg w-full p-6 text-left text-zinc-700 shadow-2xl">
            <h3 className="font-montserrat font-bold text-base text-zinc-950 mb-2">
              {activeLegalModal === "terms"
                ? "Términos y Condiciones de Fabricación Gráfica"
                : "Política de Tratamiento de Datos (Ley 1581 de 2012)"}
            </h3>
            <div className="text-xs space-y-2.5 max-h-64 overflow-y-auto pr-2 text-zinc-600 font-sans leading-relaxed">
              {activeLegalModal === "terms" ? (
                <>
                  <p>
                    1. <strong>Aprobación de Artes:</strong> Todo tiraje industrial inicia una vez el cliente aprueba formalmente el arte final digital o muestra física.
                  </p>
                  <p>
                    2. <strong>Fidelidad Cromática:</strong> Nos regimos bajo el estándar ISO 12647-2 y perfiles CMYK certificados. Variaciones menores inherentes a diferentes lotes de sustrato corrugado o cartulina están dentro de la tolerancia técnica de la industria.
                  </p>
                  <p>
                    3. <strong>Facturación DIAN:</strong> Todos los precios y órdenes generan factura electrónica con IVA del 19% conforme al estatuto tributario colombiano.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia, Impresos Americana S.A.S. informa que los datos personales suministrados a través de este portal serán tratados de forma confidencial con fines exclusivos de cotización, despacho y servicio posventa.
                  </p>
                  <p>
                    Usted puede ejercer sus derechos de conocer, actualizar o suprimir su información enviando solicitud a datos@impresosamericana.com.
                  </p>
                </>
              )}
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2.5 bg-[#E30613] hover:bg-[#C50510] text-white text-xs font-montserrat font-bold rounded-xl uppercase shadow-xs transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
