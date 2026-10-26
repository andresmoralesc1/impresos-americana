import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Producto del Catálogo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del Producto",
      type: "string",
      description: "Nombre comercial visible en el catálogo (ej: Termo Inteligente con Pantalla LED)",
      validation: (rule) => rule.required().error("El nombre del producto es obligatorio"),
    }),
    defineField({
      name: "reference",
      title: "Referencia de Producción / Código",
      type: "string",
      description: "Código interno o de catálogo (ej: Ref. Termo Temperatura 500 ml)",
      validation: (rule) => rule.required().error("La referencia es obligatoria"),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      description: "Selecciona a qué sección pertenece este producto",
      options: {
        list: [
          { title: "Termos & Botellas", value: "termos" },
          { title: "Agendas & Libretas", value: "agendas" },
          { title: "Esferos & Bolígrafos", value: "esferos" },
          { title: "Llaveros & USBs", value: "llaveros-usb" },
          { title: "Bolsas & Empaques", value: "bolsas" },
          { title: "Tecnología & Accesorios", value: "tecnologia" },
          { title: "Otros Artículos", value: "otros" },
        ],
      },
      initialValue: "termos",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceCOP",
      title: "Precio Unitario en COP",
      type: "string",
      description: "Precio visible para los clientes (ej: $25.635 COP)",
      validation: (rule) => rule.required().error("Debes indicar un precio de referencia"),
    }),
    defineField({
      name: "minOrder",
      title: "Cantidad Mínima de Pedido",
      type: "string",
      description: "Tiraje mínimo requerido para producción (ej: Mínimo 25 uds)",
      initialValue: "Mínimo 25 uds",
    }),
    defineField({
      name: "image",
      title: "Fotografía Real del Producto",
      type: "image",
      description: "Sube una imagen nítida en formato JPG, PNG o WebP. Se optimizará automáticamente.",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error("Debes subir una fotografía del producto"),
    }),
    defineField({
      name: "specs",
      title: "Especificaciones Técnicas (Viñetas)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Haz clic en 'Add item' para añadir viñetas (ej: 'Acero Inoxidable 304', 'Capacidad 500 ml', 'Grabado Láser').",
    }),
    defineField({
      name: "active",
      title: "¿Producto Activo / Visible?",
      type: "boolean",
      description: "Si lo desmarcas, el producto se ocultará de la web sin necesidad de borrarlo.",
      initialValue: true,
    }),
    defineField({
      name: "slug",
      title: "Identificador Web (Slug)",
      type: "slug",
      description: "Opcional. Haz clic en 'Generate' para crearlo automáticamente a partir del nombre.",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "order",
      title: "Prioridad en Catálogo (Número)",
      type: "number",
      description: "Usa números bajos (1, 2, 3...) para que aparezca de primero.",
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "priceCOP",
      media: "image",
    },
  },
});
