"use client";

import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Clock,
  Send,
  Truck,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Building,
  Car,
  FileText,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

export function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    correo: "",
    producto: "Material POP & Exhibidores",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const productOptions = [
    "Material POP & Exhibidores",
    "Cajas & Empaques",
    "Litografía & Catálogos",
    "Gran Formato UV",
    "Merchandising Corporativo",
    "Otro proyecto especial",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic(15);
    setSubmitted(true);

    const text = `*SOLICITUD DE COTIZACIÓN — WEB*
---------------------------------------
• *Contacto:* ${formData.nombre}
${formData.empresa ? `• *Empresa:* ${formData.empresa}` : ""}
• *Teléfono:* ${formData.telefono}
${formData.correo ? `• *Correo:* ${formData.correo}` : ""}
• *Línea:* ${formData.producto}
• *Detalles:* ${formData.mensaje}
---------------------------------------
_Enviado desde impresosamericana.com_`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/573163200181?text=${encoded}`, "_blank");
  };

  return (
    <section className="py-12 sm:py-16 bg-zinc-50/60 text-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* 1. Tres Canales de Atención Directa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Canal A: WhatsApp Comercial */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6 fill-emerald-600 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 block">
                  Respuesta Inmediata
                </span>
                <h3 className="font-montserrat font-black text-lg text-zinc-950 mt-0.5">
                  Línea Comercial WhatsApp
                </h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Para cotizaciones ágiles, consultas de stock, envío de muestras fotográficas y seguimiento de órdenes.
              </p>
              <div className="pt-1">
                <span className="font-mono text-base font-bold text-zinc-950 block">
                  +57 316 320 0181
                </span>
                <span className="text-[11px] text-zinc-500">Lunes a Viernes, 7:30 a.m. – 5:30 p.m.</span>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20quisiera%20cotizar%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic(10)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <span>Chatear por WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Canal B: Visita en Planta */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-sm flex flex-col justify-between hover:border-[#E30613]/50 transition-all group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E30613] flex items-center justify-center border border-red-100 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E30613] block">
                  Sede San Nicolás
                </span>
                <h3 className="font-montserrat font-black text-lg text-zinc-950 mt-0.5">
                  Planta & Sala de Muestras
                </h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Ven a revisar muestras físicas de papeles, acabados de barniz UV y prototipos de cartón corrugado.
              </p>
              <div className="pt-1">
                <span className="font-mono text-xs font-bold text-zinc-950 block leading-snug">
                  Calle 16 # 4-37, Barrio San Nicolás
                </span>
                <span className="text-[11px] text-zinc-500">Cali, Valle del Cauca, Colombia</span>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://maps.google.com/maps?q=impresos+americana,+Cl.+16+%234-37,+COMUNA+3,+Cali,+Valle+del+Cauca"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic(10)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <span>Ver en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Canal C: Atención Corporativa */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-all group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 block">
                  Licitaciones & Facturación
                </span>
                <h3 className="font-montserrat font-black text-lg text-zinc-950 mt-0.5">
                  Canal Corporativo
                </h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Para compras por volumen, órdenes de compra institucionales, contratos empresariales y facturación electrónica.
              </p>
              <div className="pt-1 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-zinc-500">PBX:</span>
                  <a href="tel:+576028854000" className="text-zinc-950 font-bold hover:underline">
                    (602) 885-4000
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-zinc-500">Email:</span>
                  <a href="mailto:cotizaciones@impresosamericana.com" className="text-zinc-950 font-bold hover:text-[#E30613] truncate">
                    cotizaciones@impresosamericana.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="mailto:cotizaciones@impresosamericana.com"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-montserrat font-bold text-xs uppercase tracking-wider transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Escribir Correo Formal</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. Formulario Directo de Requerimientos */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-10 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E30613] block mb-1">
              Cotización Directa
            </span>
            <h2 className="font-montserrat font-black text-2xl sm:text-3xl text-zinc-950 tracking-tight">
              Cuéntanos sobre tu Proyecto
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed">
              Completa los datos clave de tu pedido. Te responderemos con especificaciones técnicas, propuesta económica formal con IVA discriminado y tiempos de despacho.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3 bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-montserrat font-bold text-lg text-zinc-950">
                ¡Solicitud Lista en WhatsApp!
              </h3>
              <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
                Se ha generado el resumen y abierto tu conversación de WhatsApp. Si no se abrió automáticamente, puedes escribirnos directamente al <strong>+57 316 320 0181</strong>.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-800 text-xs font-semibold hover:bg-zinc-100 transition-colors"
                >
                  Enviar otra solicitud
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selector de Producto */}
              <div>
                <label className="text-xs font-montserrat font-bold text-zinc-800 block mb-2">
                  ¿Qué tipo de producto requieres cotizar?
                </label>
                <div className="flex flex-wrap gap-2">
                  {productOptions.map((prod) => {
                    const isSelected = formData.producto === prod;
                    return (
                      <button
                        key={prod}
                        type="button"
                        onClick={() => {
                          triggerHaptic(8);
                          setFormData({ ...formData, producto: prod });
                        }}
                        className={`text-xs px-3.5 py-2 rounded-xl font-montserrat transition-all border ${
                          isSelected
                            ? "bg-zinc-950 text-white border-zinc-950 font-bold shadow-xs"
                            : "bg-zinc-50 text-zinc-700 hover:text-zinc-950 border-zinc-200 hover:bg-zinc-100 font-medium"
                        }`}
                      >
                        {prod}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Campos Principales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-zinc-600 block mb-1">
                    Tu Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej. Carolina Pérez"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#E30613] transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-zinc-600 block mb-1">
                    Empresa o Marca
                  </label>
                  <input
                    type="text"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    placeholder="Ej. Distribuciones Andina"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#E30613] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold uppercase text-zinc-600 block mb-1">
                    Teléfono o WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="Ej. 316 320 0181"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#E30613] transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-zinc-600 block mb-1">
                    Correo Electrónico (opcional)
                  </label>
                  <input
                    type="email"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    placeholder="Ej. compras@empresa.com"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#E30613] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase text-zinc-600 block mb-1">
                  Detalles del Requerimiento *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  placeholder="Describe cantidades aproximadas, medidas requeridas, si cuentas con arte en PDF/AI y ciudad de entrega..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-zinc-900 text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#E30613] transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#E30613] hover:bg-[#c50510] text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Cotización por WhatsApp</span>
                </button>

                <span className="text-[11px] text-zinc-500">
                  Tus datos se usan exclusivamente para responder tu cotización.
                </span>
              </div>
            </form>
          )}
        </div>

        {/* 3. Mapa Interactivo de San Nicolás & Accesos */}
        <div className="rounded-3xl bg-white border border-zinc-200/90 overflow-hidden shadow-sm space-y-0">
          {/* Encabezado del Mapa */}
          <div className="p-6 sm:p-7 border-b border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E30613] block mb-0.5">
                Ubicación Satelital
              </span>
              <h3 className="font-montserrat font-black text-xl text-zinc-950">
                Planta de Producción en San Nicolás
              </h3>
              <p className="text-xs text-zinc-600 mt-0.5">
                Calle 16 # 4-37, Cali, Valle del Cauca • A 3 cuadras de la estación del MIO
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://maps.google.com/maps?q=impresos+americana,+Cl.+16+%234-37,+COMUNA+3,+Cali,+Valle+del+Cauca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-montserrat font-semibold transition-colors"
              >
                <span>Cómo llegar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Iframe del Mapa - Limpio, 100% visible sin ningún elemento flotante que lo tape */}
          <div className="relative w-full h-[360px] sm:h-[440px] bg-zinc-100">
            <iframe
              title="Ubicación oficial de Impresos Americana en Google Maps"
              src="https://maps.google.com/maps?q=impresos+americana,+Cl.+16+%234-37,+COMUNA+3,+Cali,+Valle+del+Cauca&t=&z=16&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-full border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Tips de Acceso y Logística */}
          <div className="p-5 sm:p-6 bg-zinc-50/80 border-t border-zinc-200/80 grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-zinc-600">
            <div className="flex items-start gap-3">
              <Car className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-950 block font-bold mb-0.5">Acceso y Parqueo</strong>
                <p className="text-[11px] leading-relaxed">
                  Ingreso directo por Carrera 4 o Calle 15. Bahía para retiro de pedidos y clientes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-950 block font-bold mb-0.5">Muelle de Carga Nacional</strong>
                <p className="text-[11px] leading-relaxed">
                  Recepción y despacho diario de camiones (Coordinadora, TCC, Envía y Servientrega).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-950 block font-bold mb-0.5">Horario de Operación</strong>
                <p className="text-[11px] leading-relaxed">
                  Lunes a Viernes continuo: 7:30 a.m. a 5:30 p.m. Sábados bajo cita previa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Ficha Institucional y Datos de Facturación */}
        <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 text-xs text-zinc-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="font-montserrat font-bold text-zinc-950 block">
                Impresos Americana S.A.S. — NIT 900.xxx.xxx-x
              </span>
              <span className="text-[11px] text-zinc-500">
                Régimen Común • Facturación Electrónica DIAN • Cali, Valle del Cauca
              </span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 shrink-0">
            Cobertura: Cali • Bogotá • Medellín • Eje Cafetero • Costa y todo el país
          </div>
        </div>

      </div>
    </section>
  );
}
