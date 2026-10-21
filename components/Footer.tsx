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
    <footer id="contacto" className="bg-[#0A0A0D] border-t border-white/10 text-zinc-400 text-xs relative pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E30613]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          {/* Brand Info & Address */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <IALogo size="md" />
            </Link>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              <strong className="text-white">Impresos Americana S.A.S.</strong> — Planta industrial de producción gráfica, material POP, empaques y gran formato. Más de 18 años transformando ideas en impacto visual para marcas líderes en Colombia.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-zinc-300">
                <MapPin className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
                <span>
                  Calle 25 # 4-38, Barrio San Nicolás / Zona Industrial <br />
                  <span className="text-zinc-400">Cali, Valle del Cauca, Colombia • C.P. 760010</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-300">
                <Phone className="w-4 h-4 text-[#E30613] shrink-0" />
                <span>PBX Planta: (602) 885-4000 • Móvil / WhatsApp: +57 316 320 0181</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-300">
                <Mail className="w-4 h-4 text-[#E30613] shrink-0" />
                <span>cotizaciones@impresosamericana.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-300">
                <Clock className="w-4 h-4 text-[#E30613] shrink-0" />
                <span>Lunes a Viernes: 7:30 AM a 5:30 PM (Jornada Continua)</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-white">
              Líneas de Producción
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">
                  Exhibidores POP de Piso
                </a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">
                  Exhibidores de Mostrador
                </a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">
                  Gran Formato UV Cama Plana
                </a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">
                  Banners & Vallas Exteriores
                </a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">
                  Cajas Rígidas & Plegadizas
                </a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">
                  Litografía Comercial & Catálogos
                </a>
              </li>
            </ul>
          </div>

          {/* Colombian Department Delivery Coverage */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-white">
              Cobertura Nacional de Despachos
            </h4>
            <p className="text-[11px] text-zinc-400 leading-tight">
              Envíos diarios coordinados con transportadoras de carga y guías con seguimiento en tiempo real:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {coverageCities.map((city, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16161D] text-zinc-300 border border-white/5"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Instant Contact & DIAN compliance badge */}
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-xl bg-[#16161F] border border-white/10 p-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                Atención Inmediata
              </span>
              <p className="text-xs text-white font-semibold mb-2">
                ¿Necesitas cotización de urgencia para licitación o campaña?
              </p>
              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20necesito%20cotizaci%C3%B3n%20urgente%20para%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Directo
              </a>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-white/5 p-2.5 rounded-lg border border-white/5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>Factura Electrónica DIAN</strong> emitida en cada orden según normativa colombiana vigente.
              </span>
            </div>
          </div>
        </div>

        {/* DIAN and Legal Footer Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} Impresos Americana S.A.S. • NIT 900.384.912-4 • Todos los derechos reservados.
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <button
              onClick={() => setActiveLegalModal("terms")}
              className="hover:text-zinc-300 transition-colors underline"
            >
              Términos de Fabricación
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveLegalModal("privacy")}
              className="hover:text-zinc-300 transition-colors underline"
            >
              Política de Datos (Ley 1581)
            </button>
            <span>•</span>
            <Link
              href="/progress"
              className="text-[#E30613] hover:underline font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Auditoría & Progreso
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#181820] border border-white/15 rounded-2xl max-w-lg w-full p-6 text-left text-zinc-300">
            <h3 className="font-montserrat font-bold text-base text-white mb-2">
              {activeLegalModal === "terms"
                ? "Términos y Condiciones de Fabricación Gráfica"
                : "Política de Tratamiento de Datos (Ley 1581 de 2012)"}
            </h3>
            <div className="text-xs space-y-2 max-h-64 overflow-y-auto pr-2 text-zinc-400 font-sans leading-relaxed">
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
                className="px-4 py-2 bg-[#E30613] text-white text-xs font-montserrat font-bold rounded-lg uppercase"
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
