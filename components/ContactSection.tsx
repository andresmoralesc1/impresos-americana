"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Navigation,
  Car,
  Building2,
  ShieldCheck,
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
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  // Real-time plant operation check (Mon-Fri 7:30 AM - 5:30 PM Colombian Time UTC-5)
  useEffect(() => {
    const checkPlantOpen = () => {
      const now = new Date();
      // Colombian time (UTC-5)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const colombianDate = new Date(utc - 3600000 * 5);
      const day = colombianDate.getDay(); // 0 is Sunday, 6 is Saturday
      const hour = colombianDate.getHours();
      const minutes = colombianDate.getMinutes();
      const timeInMinutes = hour * 60 + minutes;

      // Monday to Friday (1-5), 7:30 (450 mins) to 17:30 (1050 mins)
      const isWeekday = day >= 1 && day <= 5;
      const isWorkHours = timeInMinutes >= 450 && timeInMinutes <= 1050;
      setIsOpenNow(isWeekday && isWorkHours);
    };

    checkPlantOpen();
    const interval = setInterval(checkPlantOpen, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = () => {
    triggerHaptic(10);
    navigator.clipboard.writeText("Calle 16 # 4-37, Barrio San Nicolás, Cali, Valle del Cauca, Colombia");
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

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
_Solicitud generada a través del formulario oficial de contacto de Impresos Americana._`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/573163200181?text=${encoded}`, "_blank");
  };

  const cities = [
    "Cali (Planta Matriz)",
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
    "Popayán",
    "Santa Marta",
  ];

  const quickProducts = [
    "Exhibidores POP de Piso",
    "Cajas & Empaques Rígidos",
    "Gran Formato UV",
    "Litografía & Catálogos",
    "Merchandising Corporativo",
  ];

  return (
    <section className="py-16 bg-[#121212] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#E30613]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-red-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Quick Status & Emergency Bar */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#181822] border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span
                className={`w-3.5 h-3.5 rounded-full ${
                  isOpenNow ? "bg-emerald-500 animate-ping" : "bg-amber-500"
                } opacity-75 absolute`}
              />
              <span
                className={`w-3 h-3 rounded-full ${
                  isOpenNow ? "bg-emerald-400" : "bg-amber-400"
                } relative`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-montserrat font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                  {isOpenNow ? "Planta de Producción Operativa" : "Fuera de Jornada de Planta"}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                  L-V 7:30 AM - 5:30 PM
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                {isOpenNow
                  ? "Atención presencial en San Nicolás, despachos activos y línea telefónica disponible."
                  : "Dejanos tu requerimiento en el formulario o WhatsApp; te responderemos a primera hora (7:30 AM)."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+576028854000"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 text-xs font-montserrat font-bold transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>PBX (602) 885-4000</span>
            </a>
            <a
              href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20deseo%20comunicarme%20con%20un%20asesor%20comercial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 border border-[#25D366]/40 text-xs font-montserrat font-bold transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left Column: Direct Plant Info & Address */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold block mb-2">
                CORAZÓN LITOGRÁFICO DE CALI
              </span>
              <h2 className="text-2xl sm:text-3xl font-montserrat font-black uppercase text-white tracking-tight">
                PLANTA & SALA DE VENTAS
              </h2>
              <p className="mt-3 text-zinc-300 text-sm leading-relaxed">
                Ubicados en el tradicional sector de San Nicolás en Cali. Contamos con 3 líneas continuas de impresión offset, mesa de corte digital Zünd y cama plana UV de gran formato.
              </p>
            </div>

            {/* Contact details cards */}
            <div className="space-y-3.5">
              {/* Address Card with Copy Action */}
              <div className="p-4 rounded-xl bg-[#181822] border border-white/10 flex items-start justify-between gap-3 group hover:border-red-500/40 transition-colors">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-white">
                      Dirección Oficial de Planta
                    </h3>
                    <p className="text-sm font-semibold text-zinc-100 mt-1 leading-snug">
                      Calle 16 # 4-37, Barrio San Nicolás
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Cali, Valle del Cauca, Colombia • C.P. 760010
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  title="Copiar dirección al portapapeles"
                  className="shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 text-xs font-mono"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">Copiada</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-[10px] text-zinc-400 hidden sm:inline">Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* PBX and WhatsApp Card */}
              <div className="p-4 rounded-xl bg-[#181822] border border-white/10 flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="w-full">
                  <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-white">
                    Central Telefónica & WhatsApp
                  </h3>
                  <div className="mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-zinc-300">
                        PBX: <strong className="text-white">(602) 885-4000</strong>
                      </p>
                      <p className="text-xs text-zinc-300">
                        WhatsApp: <strong className="text-emerald-400">+57 316 320 0181</strong>
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 w-fit">
                      Atención Rápida
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-xl bg-[#181822] border border-white/10 flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-white">
                    Correos de Departamento
                  </h3>
                  <p className="text-xs text-zinc-200 mt-1 font-mono">
                    <a href="mailto:cotizaciones@impresosamericana.com" className="hover:text-red-400 transition-colors">
                      cotizaciones@impresosamericana.com
                    </a>{" "}
                    <span className="text-zinc-500">•</span>{" "}
                    <a href="mailto:ventas@impresosamericana.com" className="hover:text-red-400 transition-colors">
                      ventas@impresosamericana.com
                    </a>
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Recepción de órdenes de compra, artes en alta resolución y licitaciones.
                  </p>
                </div>
              </div>

              {/* Facilities specs */}
              <div className="p-4 rounded-xl bg-[#15151C] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-montserrat font-bold text-white uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-red-400" />
                  <span>Infraestructura de Entrega & Despacho</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-1.5 pl-6 list-disc marker:text-red-500">
                  <li>Muelle exclusivo de carga y descarga para camiones medianos y pesados.</li>
                  <li>Zona de parqueo para clientes y recogida de pruebas de color impresas.</li>
                  <li>Ubicación estratégica a 3 cuadras del Corredor del MIO (Estación Centro).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct Quotation & Contact Form */}
          <div className="lg:col-span-7 bg-[#1A1A24] rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl relative">
            <div className="border-b border-white/10 pb-4 mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/30 text-[10px] font-mono font-bold text-red-300 mb-2">
                <ShieldCheck className="w-3 h-3 text-red-400" />
                RESPUESTA FORMAL DE PLANTA EN &lt; 2 HORAS HÁBILES
              </div>
              <h3 className="text-xl sm:text-2xl font-montserrat font-black uppercase text-white tracking-tight">
                COTIZACIÓN DIRECTA & ATENCIÓN A EMPRESAS
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Envía las especificaciones de tu proyecto para recibir propuesta económica con IVA discriminado (19%) y tiempos garantizados de entrega.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-montserrat font-bold text-xl text-white uppercase">
                  ¡Mensaje Preparado y Transferido!
                </h4>
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Se ha generado el resumen formal de tu requerimiento y abierto tu chat de WhatsApp oficial. Si tu navegador bloqueó la ventana emergente, puedes escribirnos directamente al <strong>+57 316 320 0181</strong>.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-montserrat font-bold uppercase transition-colors"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Quick product selectors */}
                <div>
                  <label className="text-[11px] font-mono font-bold uppercase text-zinc-300 block mb-2">
                    Selecciona tu línea de interés principal:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {quickProducts.map((prod) => {
                      const isSelected = formData.producto === prod;
                      return (
                        <button
                          key={prod}
                          type="button"
                          onClick={() => {
                            triggerHaptic(10);
                            setFormData({ ...formData, producto: prod });
                          }}
                          className={`text-xs px-3 py-1.5 rounded-lg font-montserrat transition-all duration-200 border ${
                            isSelected
                              ? "bg-[#E30613] text-white border-[#E30613] shadow-[0_0_10px_rgba(227,6,19,0.4)] font-bold"
                              : "bg-[#14141A] text-zinc-300 hover:text-white border-white/10 hover:border-white/20"
                          }`}
                        >
                          {prod}
                        </button>
                      );
                    })}
                  </div>
                </div>

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
                      Ciudad de Destino *
                    </label>
                    <select
                      value={formData.ciudad}
                      onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                      className="w-full bg-[#121217] border border-white/20 rounded-xl px-4 py-3 text-white text-xs font-sans focus:outline-none focus:border-[#E30613] transition-colors cursor-pointer"
                    >
                      <option value="Cali">Cali (Sede Principal / Retiro en Planta)</option>
                      <option value="Bogotá D.C.">Bogotá D.C.</option>
                      <option value="Medellín">Medellín (Antioquia)</option>
                      <option value="Barranquilla">Barranquilla (Atlántico)</option>
                      <option value="Bucaramanga">Bucaramanga (Santander)</option>
                      <option value="Pereira">Pereira (Eje Cafetero)</option>
                      <option value="Manizales">Manizales (Caldas)</option>
                      <option value="Pasto">Pasto (Nariño)</option>
                      <option value="Popayán">Popayán (Cauca)</option>
                      <option value="Otra ciudad">Otra ciudad de Colombia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold uppercase text-zinc-300 block mb-1.5">
                    Detalles del Requerimiento (Cantidades, Medidas, Fecha Deseada) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="Descríbenos tu proyecto: cantidad de unidades requeridas, tipo de sustrato (cartón corrugado, MDF, acrílico, plegadiza), medidas aproximadas, si cuentas con arte listo en PDF/AI..."
                    className="w-full bg-[#121217] border border-white/20 rounded-xl p-4 text-white text-xs font-sans focus:outline-none focus:border-[#E30613] transition-colors resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C50510] via-[#E30613] to-[#FF1E27] hover:from-[#E30613] hover:to-[#C50510] text-white font-montserrat font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(227,6,19,0.5)] transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Requerimiento a Ingeniería de Planta</span>
                  </button>
                </div>

                <p className="text-[11px] text-zinc-400 text-center pt-2 font-mono">
                  🔒 Sus datos están protegidos bajo la Ley 1581 de 2012 (Habeas Data) y se usarán estrictamente con fines de cotización y despacho.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Full-Width Interactive Google Maps & Route Navigator Card */}
        <div className="mb-14 rounded-2xl bg-[#161620] border border-white/15 overflow-hidden shadow-2xl">
          {/* Card Header with Real-World GPS Actions */}
          <div className="p-5 sm:p-6 bg-[#1A1A24] border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-[10px] font-mono font-bold text-red-300 mb-2">
                <MapPin className="w-3 h-3 text-[#E30613]" />
                GEOLOCALIZACIÓN DE PLANTA EN TIEMPO REAL
              </div>
              <h3 className="text-xl sm:text-2xl font-montserrat font-black text-white uppercase tracking-tight">
                UBICACIÓN EN GOOGLE MAPS — BARRIO SAN NICOLÁS
              </h3>
              <p className="text-xs text-zinc-300 mt-0.5">
                Calle 16 # 4-37, Cali, Valle del Cauca • Coordenadas GPS: 3.4475° N, 76.5284° W
              </p>
            </div>

            {/* GPS Navigation Links (Google Maps & Waze apps) */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Calle+16+%23+4-37+San+Nicolas+Cali+Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-montserrat font-bold uppercase transition-all shadow-md"
              >
                <Navigation className="w-3.5 h-3.5 text-blue-400" />
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <a
                href="https://waze.com/ul?q=Calle%2016%204-37%20San%20Nicolas%20Cali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/40 text-blue-200 border border-blue-500/30 text-xs font-montserrat font-bold uppercase transition-all shadow-md"
              >
                <Car className="w-3.5 h-3.5 text-blue-400" />
                <span>Navegar con Waze</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Embedded Google Maps Container */}
          <div className="relative w-full h-[380px] sm:h-[460px] bg-[#121217]">
            <iframe
              title="Ubicación de Planta Impresos Americana - Calle 16 # 4-37, San Nicolás, Cali"
              src="https://maps.google.com/maps?q=Calle+16+%23+4-37,+San+Nicol%C3%A1s,+Cali,+Valle+del+Cauca,+Colombia&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Glassmorphic Location Pin Card */}
            <div className="hidden sm:block absolute top-4 left-4 z-20 max-w-xs bg-[#121218]/90 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-montserrat font-bold text-white uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-[#E30613] animate-ping" />
                <span>Impresos Americana S.A.S.</span>
              </div>
              <p className="text-[11px] text-zinc-300 font-medium">
                Calle 16 # 4-37, Barrio San Nicolás, Cali
              </p>
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>Sector Gráfico & Litográfico</span>
                <span className="text-emerald-400 font-bold">Muelle de Carga</span>
              </div>
            </div>
          </div>

          {/* Quick Transit & Access Tips */}
          <div className="p-4 sm:p-5 bg-[#14141D] border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <Car className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-montserrat font-bold">Acceso Vehicular</strong>
                <p className="text-zinc-300 text-[11px] mt-0.5">
                  Fácil acceso por Carrera 4 o Calle 15. Bahía de estacionamiento momentáneo disponible.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-montserrat font-bold">Muelle de Carga & Envíos</strong>
                <p className="text-zinc-300 text-[11px] mt-0.5">
                  Recepción de camiones de paquetería (Coordinadora, Servientrega, Envia, TCC).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-montserrat font-bold">Horario de Despachos</strong>
                <p className="text-zinc-300 text-[11px] mt-0.5">
                  Lunes a Viernes continuo: 7:30 AM a 5:30 PM.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* National Dispatch Coverage Grid */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#15151F] border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 text-white font-montserrat font-black text-sm uppercase tracking-wide">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>RED DE DISTRIBUCIÓN & DESPACHO A TODA COLOMBIA</span>
              </div>
              <p className="text-xs text-zinc-300 mt-1">
                Garantizamos embalaje industrial reforzado para que exhibidores, material publicitario y cajas lleguen intactos a cualquier ciudad.
              </p>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 shrink-0 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
              Tiempos: 24h Eje Cafetero / 24-48h Bogotá & Medellín / 48-72h Costa
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {cities.map((city, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0E0E13] text-zinc-200 border border-white/10 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
