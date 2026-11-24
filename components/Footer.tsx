"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  MessageCircle,
  Award,
  X,
} from "lucide-react";
import { IALogo } from "./Logo";

export function Footer() {
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null);

  // Lock body scroll when legal modal is open
  useEffect(() => {
    if (activeLegalModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeLegalModal]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeLegalModal) {
        setActiveLegalModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLegalModal]);

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
            <Link
              href="/"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] rounded-lg p-0.5"
              aria-label="Página de inicio Impresos Americana"
            >
              <IALogo size="md" theme="light" />
            </Link>
            <p className="text-zinc-600 text-xs leading-relaxed max-w-sm">
              <strong className="text-zinc-950 font-bold">Impresos Americana S.A.S.</strong> — Planta industrial de producción gráfica, material POP, empaques y gran formato. Litografía offset Heidelberg, corte digital Zünd y cama plana UV en Cali con despachos a todo el país.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-zinc-700">
                <MapPin className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                <span>
                  Calle 16 # 4-37, Barrio San Nicolás <br />
                  <span className="text-zinc-600">Cali, Valle del Cauca, Colombia • C.P. 760010</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-700">
                <Phone className="w-4 h-4 text-[#E30613] shrink-0" />
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span>
                    PBX:{" "}
                    <a
                      href="tel:+576028854000"
                      aria-label="Llamar a PBX planta Cali (602) 885-4000"
                      className="hover:text-[#E30613] hover:underline transition-colors font-mono focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
                    >
                      (602) 885-4000
                    </a>
                  </span>
                  <span className="text-zinc-400">•</span>
                  <span>
                    Móvil:{" "}
                    <a
                      href="tel:+573163200181"
                      aria-label="Llamar al móvil corporativo +57 316 320 0181"
                      className="hover:text-[#E30613] hover:underline transition-colors font-mono focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
                    >
                      +57 316 320 0181
                    </a>
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-700">
                <Mail className="w-4 h-4 text-[#E30613] shrink-0" />
                <a
                  href="mailto:cotizaciones@impresosamericana.com"
                  aria-label="Enviar correo a cotizaciones@impresosamericana.com"
                  className="hover:text-[#E30613] hover:underline transition-colors break-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
                >
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
            <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-zinc-950">
              Líneas de Producción
            </h3>
            <nav aria-label="Líneas de producción gráfica">
              <ul className="space-y-1.5 text-xs text-zinc-600">
                <li>
                  <Link
                    href="/cotizador"
                    className="inline-block py-0.5 hover:text-[#E30613] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
                  >
                    Exhibidores POP de Piso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios"
                    className="inline-block py-0.5 hover:text-[#E30613] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
                  >
                    Gran Formato UV Cama Plana
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cotizador"
                    className="inline-block py-0.5 hover:text-[#E30613] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
                  >
                    Cajas Rígidas & Plegadizas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios"
                    className="inline-block py-0.5 hover:text-[#E30613] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
                  >
                    Litografía Comercial Offset
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalogo"
                    className="inline-block py-0.5 hover:text-[#E30613] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
                  >
                    Catálogo de Merchandising
                  </Link>
                </li>
                <li>
                  <Link
                    href="/plantillas"
                    className="inline-block py-0.5 hover:text-[#E30613] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
                  >
                    Planos & Troqueles (.AI / .PDF)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/proyectos"
                    className="inline-block py-0.5 hover:text-[#E30613] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
                  >
                    Casos de Éxito en Retail
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Colombian Department Delivery Coverage */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-zinc-950">
              Cobertura Nacional de Despachos
            </h3>
            <p className="text-[11px] text-zinc-600 leading-relaxed">
              Envíos diarios coordinados con transportadoras de carga y guías con seguimiento en tiempo real:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {coverageCities.map((city, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white text-zinc-800 border border-zinc-200/90 shadow-2xs font-medium"
                >
                  {city}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600 font-medium font-mono pt-1">
              • Tiempos habituales: 24h a 48h hábiles en ciudades principales.
            </p>
          </div>

          {/* Instant Contact & DIAN compliance badge */}
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-2xl bg-white border border-zinc-200 p-5 shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-1">
                Atención Inmediata
              </span>
              <p className="text-xs text-zinc-950 font-semibold mb-3">
                ¿Necesitas cotización de urgencia para licitación o campaña?
              </p>
              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20necesito%20cotizaci%C3%B3n%20urgente%20para%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0f7648] hover:bg-[#0c5c38] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-xs hover:shadow-md min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f7648]"
              >
                <MessageCircle className="w-4 h-4" />
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
        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600 font-medium font-mono">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Impresos Americana S.A.S. • NIT 900.384.912-4 • Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs">
            <button
              onClick={() => setActiveLegalModal("terms")}
              className="text-zinc-600 hover:text-zinc-950 transition-colors underline py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
            >
              Términos de Fabricación
            </button>
            <span className="text-zinc-300 hidden sm:inline">•</span>
            <button
              onClick={() => setActiveLegalModal("privacy")}
              className="text-zinc-600 hover:text-zinc-950 transition-colors underline py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
            >
              Política de Datos (Ley 1581)
            </button>
            <span className="text-zinc-300 hidden sm:inline">•</span>
            <button
              onClick={() => setActiveLegalModal("quality")}
              className="text-zinc-700 hover:text-[#E30613] font-semibold flex items-center gap-1 py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E30613] rounded"
            >
              <Award className="w-3.5 h-3.5 text-[#E30613]" />
              Garantía de Calidad ISO
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Legal Modal */}
      {activeLegalModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveLegalModal(null)}
        >
          <div
            className="bg-white border border-zinc-200 rounded-3xl max-w-lg w-full p-6 text-left text-zinc-700 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
              <h3 id="legal-modal-title" className="font-montserrat font-bold text-base text-zinc-950 pr-6">
                {activeLegalModal === "terms" && "Términos y Condiciones de Fabricación Gráfica"}
                {activeLegalModal === "privacy" && "Política de Tratamiento de Datos (Ley 1581 de 2012)"}
                {activeLegalModal === "quality" && "Compromiso de Calidad & Estándares de Producción"}
              </h3>
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                aria-label="Cerrar ventana emergente"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="text-xs space-y-3 max-h-72 overflow-y-auto pr-2 text-zinc-600 font-sans leading-relaxed">
              {activeLegalModal === "terms" && (
                <>
                  <p>
                    1. <strong>Aprobación de Artes:</strong> Todo tiraje industrial inicia una vez el cliente aprueba formalmente el arte final digital o muestra física calibrada.
                  </p>
                  <p>
                    2. <strong>Fidelidad Cromática:</strong> Nos regimos bajo el estándar ISO 12647-2 y perfiles CMYK certificados (FOGRA39). Variaciones menores inherentes a diferentes lotes de sustrato corrugado o cartulina están dentro de la tolerancia técnica de la industria gráfica.
                  </p>
                  <p>
                    3. <strong>Facturación DIAN:</strong> Todos los precios y órdenes generan factura electrónica legal con IVA del 19% conforme al estatuto tributario colombiano.
                  </p>
                </>
              )}

              {activeLegalModal === "privacy" && (
                <>
                  <p>
                    En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia, Impresos Americana S.A.S. informa que los datos personales suministrados a través de este portal serán tratados de forma confidencial con fines exclusivos de cotización, despacho y servicio posventa.
                  </p>
                  <p>
                    Usted puede ejercer sus derechos de conocer, actualizar o suprimir su información enviando solicitud a <code>datos@impresosamericana.com</code>.
                  </p>
                </>
              )}

              {activeLegalModal === "quality" && (
                <>
                  <p>
                    1. <strong>Tecnología de Vanguardia:</strong> Operamos prensas offset Heidelberg Speedmaster con control densitométrico espectral y mesa de corte digital CNC Zünd G3 para troquelado de precisión milimétrica sin desvíos.
                  </p>
                  <p>
                    2. <strong>Auditoría Preflight de Archivos:</strong> Todos los archivos recibidos pasan por validación digital de resolución (300 DPI), sangrías de 5 mm y separación de tintas antes de la bajada de planchas CTP térmicas.
                  </p>
                  <p>
                    3. <strong>Embalaje Industrial para Transporte:</strong> Cada lote de exhibidores o impresos se paletiza con esquineros rígidos y termoencogible para garantizar que llegue intacto a cualquier municipio de Colombia.
                  </p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-[10px] text-zinc-400 font-mono">Impresos Americana S.A.S.</span>
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-montserrat font-bold rounded-xl uppercase transition-colors shadow-xs"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
