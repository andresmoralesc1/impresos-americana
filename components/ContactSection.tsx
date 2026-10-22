"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

export function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    ciudad: "Cali",
    producto: "Exhibidores POP de Piso",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic(15);
    setSubmitted(true);

    const text = `*NUEVO CONTACTO COMERCIAL DESDE LA WEB*
---------------------------------------
• *Nombre:* ${formData.nombre}
• *Empresa:* ${formData.empresa || "Particular / No especifica"}
• *Teléfono:* ${formData.telefono}
• *Ciudad:* ${formData.ciudad}
• *Interés:* ${formData.producto}
• *Requerimiento:* ${formData.mensaje}
---------------------------------------
_Solicitud generada a través del formulario de contacto oficial de Impresos Americana._`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/573163200181?text=${encoded}`, "_blank");
  };

  const cities = [
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
    "Neiva",
    "Armenia",
  ];

  return (
    <section className="py-16 bg-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Plant Info & Address */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold block mb-2">
                SEDE INDUSTRIAL CALI
              </span>
              <h2 className="text-2xl sm:text-3xl font-montserrat font-black uppercase text-white tracking-tight">
                PLANTA DE PRODUCCIÓN & OFICINAS
              </h2>
              <p className="mt-3 text-zinc-300 text-sm leading-relaxed">
                Nuestras instalaciones industriales albergan maquinaria offset de alta velocidad, camas planas UV y mesas de corte CNC para fabricar tirajes corporativos sin intermediarios.
              </p>
            </div>

            {/* Contact details cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#181820] border border-white/10 flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-montserrat font-bold text-sm text-white">Dirección de Planta</h3>
                  <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                    Calle 16 # 4-37, Barrio San Nicolás <br />
                    Cali, Valle del Cauca, Colombia • Código Postal 760010
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#181820] border border-white/10 flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-montserrat font-bold text-sm text-white">Líneas de Atención</h3>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    PBX Planta: (602) 885-4000 <br />
                    Línea Directa / WhatsApp: +57 316 320 0181
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#181820] border border-white/10 flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-montserrat font-bold text-sm text-white">Correo Institucional</h3>
                  <p className="text-xs text-zinc-300 mt-0.5 font-mono">
                    cotizaciones@impresosamericana.com <br />
                    datos@impresosamericana.com
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#181820] border border-white/10 flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-montserrat font-bold text-sm text-white">Horario de Operación</h3>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    Lunes a Viernes: 7:30 AM a 5:30 PM (Jornada Continua) <br />
                    Despachos y recepción de mercancía en muelle propio.
                  </p>
                </div>
              </div>
            </div>

            {/* National Dispatch Coverage Pills */}
            <div className="p-5 rounded-2xl bg-[#16161E] border border-white/10">
              <div className="flex items-center gap-2 mb-2 text-white font-montserrat font-bold text-xs uppercase">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Despachos Diarios Coordinados a Nivel Nacional</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cities.map((city, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101015] text-zinc-300 border border-white/5"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct Contact Form */}
          <div className="lg:col-span-7 bg-[#1A1A22] rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl relative">
            <div className="border-b border-white/10 pb-4 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                RESPUESTA EN MENOS DE 2 HORAS HÁBILES
              </span>
              <h3 className="text-xl sm:text-2xl font-montserrat font-black uppercase text-white tracking-tight">
                SOLICITUD DE COTIZACIÓN O ASESORÍA
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Completa los datos técnicos de tu proyecto y uno de nuestros ingenieros de empaque se comunicará contigo.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-montserrat font-bold text-xl text-white uppercase">
                  ¡Mensaje Preparado y Transferido!
                </h4>
                <p className="text-xs text-zinc-300 max-w-md mx-auto">
                  Se ha generado el resumen de tu solicitud y abierto tu chat de WhatsApp oficial. Si no abrió automáticamente, contáctanos al <strong>+57 316 320 0181</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-montserrat font-bold uppercase transition-colors"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-zinc-300 block mb-1.5">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Ej. Carlos Martínez"
                      className="w-full bg-[#121217] border border-white/20 rounded-xl px-4 py-3 text-white text-xs font-sans focus:outline-none focus:border-[#E30613] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-zinc-300 block mb-1.5">
                      Empresa / Razón Social
                    </label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder="Ej. Distribuidora Andina S.A.S."
                      className="w-full bg-[#121217] border border-white/20 rounded-xl px-4 py-3 text-white text-xs font-sans focus:outline-none focus:border-[#E30613] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-zinc-300 block mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="Ej. 316 320 0181"
                      className="w-full bg-[#121217] border border-white/20 rounded-xl px-4 py-3 text-white text-xs font-sans focus:outline-none focus:border-[#E30613] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-zinc-300 block mb-1.5">
                      Ciudad de Destino
                    </label>
                    <select
                      value={formData.ciudad}
                      onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                      className="w-full bg-[#121217] border border-white/20 rounded-xl px-4 py-3 text-white text-xs font-sans focus:outline-none focus:border-[#E30613] transition-colors cursor-pointer"
                    >
                      <option value="Cali">Cali (Valle del Cauca)</option>
                      <option value="Bogotá D.C.">Bogotá D.C.</option>
                      <option value="Medellín">Medellín (Antioquia)</option>
                      <option value="Barranquilla">Barranquilla (Atlántico)</option>
                      <option value="Bucaramanga">Bucaramanga (Santander)</option>
                      <option value="Otra ciudad">Otra ciudad / Municipio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-zinc-300 block mb-1.5">
                    Línea de Interés Principal
                  </label>
                  <select
                    value={formData.producto}
                    onChange={(e) => setFormData({ ...formData, producto: e.target.value })}
                    className="w-full bg-[#121217] border border-white/20 rounded-xl px-4 py-3 text-white text-xs font-sans focus:outline-none focus:border-[#E30613] transition-colors cursor-pointer"
                  >
                    <option value="Exhibidores POP de Piso">Exhibidores POP de Piso (Cartón Corrugado / MDF)</option>
                    <option value="Exhibidores de Mostrador">Exhibidores de Mostrador / Glorificadores</option>
                    <option value="Gran Formato UV">Gran Formato UV (Lona Banner, Vinilo Adhesivo, Vallas)</option>
                    <option value="Cajas & Empaques">Cajas Rígidas, Plegadizas & Empaques Estructurales</option>
                    <option value="Litografía Comercial">Litografía Comercial (Catálogos, Carpetas, Folletos)</option>
                    <option value="Merchandising & Regalos">Artículos Publicitarios & Merchandising Corporativo</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-zinc-300 block mb-1.5">
                    Detalles del Requerimiento (Cantidades, Medidas, Fecha de Entrega) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="Descríbenos tu proyecto: cantidad de unidades requeridas, tipo de punto de venta, si cuentas con artes listos o requieres diseño estructural..."
                    className="w-full bg-[#121217] border border-white/20 rounded-xl p-4 text-white text-xs font-sans focus:outline-none focus:border-[#E30613] transition-colors resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C50510] via-[#E30613] to-[#FF1E27] hover:from-[#E30613] hover:to-[#C50510] text-white font-montserrat font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(227,6,19,0.5)] transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Consulta Comercial Inmediata</span>
                  </button>
                </div>

                <p className="text-[11px] text-zinc-400 text-center pt-2 font-mono">
                  🔒 Sus datos están protegidos bajo la Ley 1581 de 2012 y serán tratados exclusivamente con fines de cotización industrial.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
