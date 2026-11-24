import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Configuración General de la Web",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nombre del Negocio",
      type: "string",
      initialValue: "Impresos Americana",
      readOnly: true,
      description: "Documento maestro de configuración global del sitio.",
    }),
    defineField({
      name: "whatsappNumber",
      title: "Línea Oficial de WhatsApp",
      type: "string",
      description: "Número con código de país para cotizaciones y asesoría (ej: 573163200181).",
      initialValue: "573163200181",
    }),
    defineField({
      name: "contactEmail",
      title: "Correo Corporativo de Contacto",
      type: "string",
      description: "Correo visible en el pie de página y botones de contacto.",
      initialValue: "contacto@impresosamericana.com",
    }),
    defineField({
      name: "address",
      title: "Dirección de Planta y Showroom",
      type: "string",
      description: "Ubicación física en Bogotá para entregas y visitas.",
      initialValue: "Bogotá D.C., Colombia — Despachos a nivel nacional",
    }),
    defineField({
      name: "businessHours",
      title: "Horario de Atención",
      type: "string",
      description: "Horario de atención a clientes y recepción de archivos.",
      initialValue: "Lunes a Viernes: 8:00 AM - 5:30 PM | Sábados: 8:30 AM - 1:00 PM",
    }),
    // Announcement Bar
    defineField({
      name: "announcementActive",
      title: "¿Activar Barra de Avisos / Promociones?",
      type: "boolean",
      description: "Muestra u oculta la barra superior de anuncios en todo el sitio web.",
      initialValue: false,
    }),
    defineField({
      name: "announcementBadge",
      title: "Etiqueta del Anuncio",
      type: "string",
      description: "Texto corto para la cápsula (ej: 'AVISO', 'TEMPORADA', 'OFERTA').",
      initialValue: "TEMPORADA 2025",
      hidden: ({ parent }) => !parent?.announcementActive,
    }),
    defineField({
      name: "announcementText",
      title: "Mensaje del Anuncio",
      type: "string",
      description: "Texto visible para los clientes en la parte superior de la página.",
      hidden: ({ parent }) => !parent?.announcementActive,
    }),
    defineField({
      name: "announcementLink",
      title: "Enlace del Anuncio (Opcional)",
      type: "url",
      description: "URL a la que redirige al hacer clic (ej: enlace a WhatsApp o catálogo).",
      hidden: ({ parent }) => !parent?.announcementActive,
    }),
    // Downloadable PDFs
    defineField({
      name: "catalogPdfMaestro",
      title: "PDF: Catálogo Maestro General",
      type: "file",
      description: "Sube aquí el PDF actualizado del Catálogo Maestro para reemplazar el archivo por defecto.",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "catalogPdfEsferos",
      title: "PDF: Catálogo de Esferos y Bolígrafos",
      type: "file",
      description: "Sube el PDF de la línea de escritura y llaveros.",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "catalogPdfEspeciales",
      title: "PDF: Catálogo de Artículos Publicitarios",
      type: "file",
      description: "Sube el PDF de artículos promocionales y material corporativo.",
      options: {
        accept: ".pdf",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "whatsappNumber",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Configuración del Sitio",
        subtitle: subtitle ? `WhatsApp: +${subtitle}` : "Sin WhatsApp configurado",
      };
    },
  },
});
