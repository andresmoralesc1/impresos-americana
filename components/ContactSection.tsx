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
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
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

  const handleCopyPhone = () => {
    triggerHaptic(10);
    navigator.clipboard.writeText("+57 602 885 4000");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleCopyEmail = () => {
    triggerHaptic(10);
    navigator.clipboard.writeText("cotizaciones@impresosamericana.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
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
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Quick Status & Emergency Bar */}
        <div className="mb-10 p-5 rounded-3xl bg-zinc-50 border border-zinc-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span
                className={`w-3.5 h-3.5 rounded-full ${
                  isOpenNow ? "bg-emerald-500 animate-ping" : "bg-amber-500"
                } opacity-75 absolute`}
              />
              <span
                className={`w-3 h-3 rounded-full ${
                  isOpenNow ? "bg-emerald-500" : "bg-amber-500"
                } relative`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-montserrat font-bold text-xs sm:text-sm text-zinc-950 uppercase tracking-wider">
                  {isOpenNow ? "Planta de Producción Operativa" : "Fuera de Jornada de Planta"}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-200/70 text-zinc-700 font-semibold">
                  L-V 7:30 AM - 5:30 PM
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {isOpenNow
                  ? "Atención presencial en San Nicolás, despachos activos y línea telefónica disponible."
                  : "Dejanos tu requerimiento en el formulario o WhatsApp; te responderemos a primera hora (7:30 AM)."}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
            <a
              href="tel:+576028854000"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 text-xs font-montserrat font-bold transition-all min-h-[44px] shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#E30613]" />
              <span>PBX (602) 885-4000</span>
            </a>
            <a
              href="https://wa.me/573163200181?text=Hola%20Impresos%20Americana,%20deseo%20comunicarme%20con%20un%20asesor%20comercial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-montserrat font-bold transition-all min-h-[44px] shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Direct Plant Info & Address */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E30613] font-bold block mb-2">
                CORAZÓN LITOGRÁFICO DE CALI
              </span>
              <h2 className="text-2xl sm:text-3xl font-montserrat font-black uppercase text-zinc-950 tracking-tight">
                PLANTA & SALA DE VENTAS
              </h2>
              <p className="mt-3 text-zinc-600 text-sm leading-relaxed">
                Ubicados en el tradicional sector de San Nicolás en Cali. Contamos con 3 líneas continuas de impresión offset, mesa de corte digital Zünd y cama plana UV de gran formato.
              </p>
            </div>

            {/* Contact details cards */}
            <div className="space-y-3.5">
              {/* Address Card with Copy Action */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex items-start justify-between gap-3 group hover:border-zinc-300 transition-colors">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-zinc-950">
                      Dirección Oficial de Planta
                    </h3>
                    <p className="text-sm font-semibold text-zinc-900 mt-1 leading-snug">
                      Calle 16 # 4-37, Barrio San Nicolás
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Cali, Valle del Cauca, Colombia • C.P. 760010
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  title="Copiar dirección al portapapeles"
                  className="shrink-0 p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 transition-all flex items-center gap-1.5 text-xs font-mono"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] text-emerald-700 font-bold hidden sm:inline">Copiada</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-[10px] text-zinc-600 hidden sm:inline font-medium">Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* PBX and WhatsApp Card */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex items-start justify-between gap-3 group hover:border-zinc-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-zinc-950">
                      Central Telefónica & WhatsApp
                    </h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-xs text-zinc-600">
                        PBX:{" "}
                        <a
                          href="tel:+576028854000"
                          className="text-zinc-950 hover:text-[#E30613] font-bold underline underline-offset-2 transition-colors font-mono"
                        >
                          (602) 885-4000
                        </a>
                      </p>
                      <p className="text-xs text-zinc-600">
                        WhatsApp:{" "}
                        <a
                          href="https://wa.me/573163200181"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:underline font-bold font-mono"
                        >
                          +57 316 320 0181
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  title="Copiar teléfono al portapapeles"
                  className="shrink-0 p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 transition-all flex items-center gap-1.5 text-xs font-mono"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] text-emerald-700 font-bold hidden sm:inline">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-[10px] text-zinc-600 hidden sm:inline font-medium">Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex items-start justify-between gap-3 group hover:border-zinc-300 transition-colors">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-zinc-950">
                      Correos de Departamento
                    </h3>
                    <p className="text-xs text-zinc-700 mt-1 font-mono">
                      <a href="mailto:cotizaciones@impresosamericana.com" className="hover:text-[#E30613] transition-colors font-semibold">
                        cotizaciones@impresosamericana.com
                      </a>{" "}
                      <span className="text-zinc-400">•</span>{" "}
                      <a href="mailto:ventas@impresosamericana.com" className="hover:text-[#E30613] transition-colors font-semibold">
                        ventas@impresosamericana.com
                      </a>
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Recepción de órdenes de compra, artes en alta resolución y licitaciones.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copiar correo al portapapeles"
                  className="shrink-0 p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 transition-all flex items-center gap-1.5 text-xs font-mono"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] text-emerald-700 font-bold hidden sm:inline">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-[10px] text-zinc-600 hidden sm:inline font-medium">Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Facilities specs */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-montserrat font-bold text-zinc-950 uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-[#E30613]" />
                  <span>Infraestructura de Entrega & Despacho</span>
                </div>
                <ul className="text-xs text-zinc-600 space-y-1.5 pl-6 list-disc marker:text-[#E30613]">
                  <li>Muelle exclusivo de carga y descarga para camiones medianos y pesados.</li>
                  <li>Zona de parqueo para clientes y recogida de pruebas de color impresas.</li>
                  <li>Ubicación estratégica a 3 cuadras del Corredor del MIO (Estación Centro).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct Quotation & Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-xl relative">
            <div className="border-b border-zinc-200 pb-4 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[10px] font-mono font-bold text-red-800 mb-2 shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-[#E30613]" />
                RESPUESTA FORMAL DE PLANTA EN &lt; 2 HORAS HÁBILES
              </div>
              <h3 className="text-xl sm:text-2xl font-montserrat font-black uppercase text-zinc-950 tracking-tight">
                COTIZACIÓN DIRECTA & ATENCIÓN A EMPRESAS
              </h3>
              <p className="text-xs text-zinc-600 mt-1">
                Envía las especificaciones de tu proyecto para recibir propuesta económica con IVA discriminado (19%) y tiempos garantizados de entrega.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-montserrat font-bold text-xl text-zinc-950 uppercase">
                  ¡Mensaje Preparado y Transferido!
                </h4>
                <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
                  Se ha generado el resumen formal de tu requerimiento y abierto tu chat de WhatsApp oficial. Si tu navegador bloqueó la ventana emergente, puedes escribirnos directamente al <strong>+57 316 320 0181</strong>.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-montserrat font-bold uppercase transition-colors"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Quick product selectors */}
                <div>
                  <label className="text-[11px] font-mono font-bold uppercase text-zinc-700 block mb-2">
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
                          className={`text-xs px-3 py-1.5 rounded-xl font-montserrat transition-all duration-200 border ${
                            isSelected
                              ? "bg-[#E30613] text-white border-[#E30613] shadow-xs font-bold"
                              : "bg-zinc-100 text-zinc-700 hover:text-zinc-950 border-zinc-200 hover:bg-zinc-200"
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
                    <label className="text-xs font-mono font-bold uppercase text-zinc-700 block mb-1.5">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Ej. Carlos Martínez"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-xs font-sans focus:bg-white focus:outline-none focus:border-[#E30613] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-zinc-700 block mb-1.5">
                      Empresa / Razón Social
                    </label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder="Ej. Distribuidora Andina S.A.S."
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-xs font-sans focus:bg-white focus:outline-none focus:border-[#E30613] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-zinc-700 block mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="Ej. 316 320 0181"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-xs font-sans focus:bg-white focus:outline-none focus:border-[#E30613] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-zinc-700 block mb-1.5">
                      Ciudad de Destino *
                    </label>
                    <select
                      value={formData.ciudad}
                      onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-xs font-sans focus:bg-white focus:outline-none focus:border-[#E30613] transition-colors cursor-pointer"
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
                  <label className="text-xs font-mono font-bold uppercase text-zinc-700 block mb-1.5">
                    Detalles del Requerimiento (Cantidades, Medidas, Fecha Deseada) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="Descríbenos tu proyecto: cantidad de unidades requeridas, tipo de sustrato (cartón corrugado, MDF, acrílico, plegadiza), medidas aproximadas, si cuentas con arte listo en PDF/AI..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-zinc-900 text-xs font-sans focus:bg-white focus:outline-none focus:border-[#E30613] transition-colors resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#E30613] hover:bg-[#C50510] text-white font-montserrat font-black text-xs uppercase tracking-wider shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Requerimiento a Ingeniería de Planta</span>
                  </button>
                </div>

                <p className="text-[11px] text-zinc-500 text-center pt-2 font-mono">
                  🔒 Sus datos están protegidos bajo la Ley 1581 de 2012 (Habeas Data) y se usarán estrictamente con fines de cotización y despacho.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Full-Width Interactive Google Maps & Route Navigator Card */}
        <div className="mb-14 rounded-3xl bg-white border border-zinc-200 overflow-hidden shadow-xl">
          {/* Card Header with Real-World GPS Actions */}
          <div className="p-5 sm:p-6 bg-zinc-50 border-b border-zinc-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[10px] font-mono font-bold text-red-800 mb-2 shadow-2xs">
                <MapPin className="w-3 h-3 text-[#E30613]" />
                GEOLOCALIZACIÓN DE PLANTA EN TIEMPO REAL
              </div>
              <h3 className="text-xl sm:text-2xl font-montserrat font-black text-zinc-950 uppercase tracking-tight">
                UBICACIÓN EN GOOGLE MAPS — BARRIO SAN NICOLÁS
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Calle 16 # 4-37, Cali, Valle del Cauca • Coordenadas GPS: 3.4475° N, 76.5284° W
              </p>
            </div>

            {/* GPS Navigation Links (Google Maps & Waze apps) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Calle+16+%23+4-37+San+Nicolas+Cali+Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 text-xs font-montserrat font-bold uppercase transition-all shadow-xs min-h-[44px]"
              >
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <a
                href="https://waze.com/ul?q=Calle%2016%204-37%20San%20Nicolas%20Cali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-montserrat font-bold uppercase transition-all shadow-2xs min-h-[44px]"
              >
                <Car className="w-3.5 h-3.5 text-blue-600" />
                <span>Navegar con Waze</span>
                <ExternalLink className="w-3 h-3 text-blue-400" />
              </a>
            </div>
          </div>

          {/* Embedded Google Maps Container */}
          <div className="relative w-full h-[380px] sm:h-[460px] bg-zinc-100">
            <iframe
              title="Ubicación de Planta Impresos Americana - Calle 16 # 4-37, San Nicolás, Cali"
              src="https://maps.google.com/maps?q=Calle+16+%23+4-37,+San+Nicol%C3%A1s,+Cali,+Valle+del+Cauca,+Colombia&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Glassmorphic Location Pin Card */}
            <div className="hidden sm:block absolute top-4 left-4 z-20 max-w-xs bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-zinc-200 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-montserrat font-bold text-zinc-950 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-[#E30613] animate-ping" />
                <span>Impresos Americana S.A.S.</span>
              </div>
              <p className="text-[11px] text-zinc-600 font-medium">
                Calle 16 # 4-37, Barrio San Nicolás, Cali
              </p>
              <div className="mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>Sector Gráfico & Litográfico</span>
                <span className="text-emerald-700 font-bold">Muelle de Carga</span>
              </div>
            </div>
          </div>

          {/* Quick Transit & Access Tips */}
          <div className="p-5 sm:p-6 bg-zinc-50/70 border-t border-zinc-200 grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="flex items-start gap-3">
              <Car className="w-5 h-5 text-[#E30613] shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-950 block font-montserrat font-bold">Acceso Vehicular</strong>
                <p className="text-zinc-600 text-[11px] mt-0.5 leading-relaxed">
                  Fácil acceso por Carrera 4 o Calle 15. Bahía de estacionamiento momentáneo disponible.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-950 block font-montserrat font-bold">Muelle de Carga & Envíos</strong>
                <p className="text-zinc-600 text-[11px] mt-0.5 leading-relaxed">
                  Recepción de camiones de paquetería (Coordinadora, Servientrega, Envia, TCC).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-950 block font-montserrat font-bold">Horario de Despachos</strong>
                <p className="text-zinc-600 text-[11px] mt-0.5 leading-relaxed">
                  Lunes a Viernes continuo: 7:30 AM a 5:30 PM.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* National Dispatch Coverage Grid */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 text-zinc-950 font-montserrat font-black text-sm uppercase tracking-wide">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>RED DE DISTRIBUCIÓN & DESPACHO A TODA COLOMBIA</span>
              </div>
              <p className="text-xs text-zinc-600 mt-1">
                Garantizamos embalaje industrial reforzado para que exhibidores, material publicitario y cajas lleguen intactos a cualquier ciudad.
              </p>
            </div>

            <div className="text-[11px] font-mono text-zinc-600 shrink-0 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-2xs font-medium">
              Tiempos: 24h Eje Cafetero / 24-48h Bogotá & Medellín / 48-72h Costa
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {cities.map((city, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white text-zinc-700 border border-zinc-200 flex items-center gap-1.5 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
